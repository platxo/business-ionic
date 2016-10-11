var dataControllers = angular.module('dataControllers', []);

dataControllers.controller('dataListCtrl', [
  '$scope',
  '$ionicLoading',
  'dataService',
  function(
    $scope,
    $ionicLoading,
    dataService
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

	  dataService.list()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
          $scope.datas = res
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

    $scope.refresh = function () {
      dataService.list()
        .$promise
          .then(function (res) {
            $ionicLoading.hide();
            $scope.datas = res
            $scope.$broadcast('scroll.refreshComplete');
          }, function (err) {

          })
    }

	  $scope.$on('$stateChangeSuccess', function() {
      dataService.list()
        .$promise
          .then(function (res) {
            $ionicLoading.hide();
            $scope.datas = res
          }, function (err) {
            $ionicLoading.hide();
            $ionicLoading.show({
              template: 'Network Error',
              scope: $scope
            })
          })
	  })

	}
]);

dataControllers.controller('dataDetailCtrl', [
  '$scope',
  '$stateParams',
  '$ionicLoading',
  'dataService',
  'analyticsService',
  function(
    $scope,
    $stateParams,
    $ionicLoading,
    dataService,
    analyticsService
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

    dataService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
          $scope.data = res
          analyticsService.getArray({
            type: $scope.data.data_type,
            app: $scope.data.data_app,
            model: $scope.data.data_model,
            fields: $scope.data.data_fields,
            filters: $scope.data.data_filters,
            id: $scope.data.data_id
          })
            .$promise
              .then(function(res) {
                $scope.dataAnalytics = res
              }, function (err) {

              })
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        });

	}
]);

dataControllers.controller('dataCreateCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  '$ionicLoading',
  '$ionicModal',
  'dataService',
  'tagsService',
  'dataTypeService',
  'analyticsService',
  '$ionicPopup',
  function(
    $scope,
    $rootScope,
    $state,
    $ionicLoading,
    $ionicModal,
    dataService,
    tagsService,
    dataTypeService,
    analyticsService,
    $ionicPopup
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

    tagsService.get()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
          $scope.tags = res
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

    dataTypeService.get()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
          $scope.dataTypes = res
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

    $scope.data = {}
    $scope.data.data_fields = []
    $scope.data.data_filters = []

	  $scope.create = function () {
      $scope.data.business = $rootScope.currentBusiness.id;
      $scope.data.owner = $rootScope.currentOwner.id;
	    dataService.create($scope.data)
      .$promise
        .then(function (res) {
      	  $state.go('tab.data-list');
        }, function (err) {

        })
	  }

    analyticsService.getObject()
      .$promise
        .then(function (res) {
          $scope.allQuery = res.toJSON()
          $scope.apps = Object.keys($scope.allQuery)
        }, function (error) {

        })

    $scope.selectType = function (data) {
      $scope.typeSelected = data.data_type
      $scope.showSelectApp = true;
    }

    $scope.selectApp = function (data) {
      $scope.appSelected = data.data_app
      $scope.models = Object.keys($scope.allQuery[$scope.appSelected])
      $scope.showSelectModel = true;
    }

    $scope.selectModel = function (data) {
      $scope.modelSelected = data.data_model
      $scope.fields = $scope.allQuery[$scope.appSelected][$scope.modelSelected]
      $scope.showSelectField = true;
      if ($scope.data.data_type === 'single') {
        analyticsService.getArray({
          type: 'all',
          app: $scope.data.data_app,
          model: $scope.data.data_model,
          fields: $scope.data.data_fields,
        })
          .$promise
            .then(function(res) {
              $scope.listModel = res
            }, function (err) {

            })
      }
    }

    $scope.selectFieldForAll = function (field) {
      $scope.data.data_fields.push(field)
    }

    $scope.selectFieldForSingle = function (field) {
      $scope.data.data_fields.push(field)
      // $scope.data.data_id =
    }

    $scope.selectFieldForFilter = function (field) {
      $scope.valueFilter = {}
      var PopupFilter = $ionicPopup.show({
        template: '<input type="text" ng-model="valueFilter.value">',
        title: 'You want to filter',
        subTitle: 'by ' + field + ' ?',
        scope: $scope,
        buttons: [
          { text: '<b>NOT</b>',
            type: 'button-positive'
          },
          {
            text: '<b>YES</b>',
            type: 'button-balanced',
            onTap: function(e) {
              if (!$scope.valueFilter.value) {
                e.preventDefault();
              } else {
                return $scope.valueFilter;
              }
            }
          }
        ]
      });
      PopupFilter.then(function(res) {
        if(res !== undefined) {
          $scope.data.data_fields.push(field)
          $scope.data.data_filters.push(res.value)
        } else {
          var empty = '';
          $scope.data.data_fields.push(field)
          $scope.data.data_filters.push(empty)
        }
      });
    }

    $scope.cancel = function () {
	    $state.go('tab.data-list');
	  }

	}
]);

dataControllers.controller('dataUpdateCtrl', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$ionicLoading',
  '$ionicModal',
  'dataService',
  'tagsService',
  'dataTypeService',
  'analyticsService',
  '$ionicPopup',
  function(
    $scope,
    $rootScope,
    $stateParams,
    $state,
    $ionicLoading,
    $ionicModal,
    dataService,
    tagsService,
    dataTypeService,
    analyticsService,
    $ionicPopup
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

    tagsService.get()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
          $scope.tags = res
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

    dataTypeService.get()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
          $scope.dataTypes = res
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

    dataService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
          $scope.data = res
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        });

    $scope.update = function () {
	    dataService.update($scope.data)
        .$promise
          .then(function (res) {
            $state.go('tab.data-list');
          }, function (err) {

          })
	  }

    analyticsService.getObject()
      .$promise
        .then(function (res) {
          $scope.allQuery = res.toJSON()
          $scope.apps = Object.keys($scope.allQuery)
        }, function (error) {

        })

    $scope.selectType = function (data) {
      $scope.typeSelected = data.data_type
      $scope.showSelectApp = true;
    }

    $scope.selectApp = function (data) {
      $scope.appSelected = data.data_app
      $scope.models = Object.keys($scope.allQuery[$scope.appSelected])
      $scope.showSelectModel = true;
    }

    $scope.selectModel = function (data) {
      $scope.modelSelected = data.data_model
      $scope.fields = $scope.allQuery[$scope.appSelected][$scope.modelSelected]
      $scope.showSelectField = true;
      if ($scope.data.data_type === 'single') {
        analyticsService.getArray({
          type: 'all',
          app: $scope.data.data_app,
          model: $scope.data.data_model,
          fields: $scope.data.data_fields,
        })
          .$promise
            .then(function(res) {
              $scope.listModel = res
            }, function (err) {

            })
      }
    }

    $scope.selectFieldForAll = function (field) {
      $scope.data.data_fields.push(field)
    }

    $scope.selectFieldForSingle = function (field) {
      $scope.data.data_fields.push(field)
      // $scope.data.data_id =
    }

    $scope.selectFieldForFilter = function (field) {
      $scope.valueFilter = {}
      var PopupFilter = $ionicPopup.show({
        template: '<input type="text" ng-model="valueFilter.value">',
        title: 'You want to filter',
        subTitle: 'by ' + field + ' ?',
        scope: $scope,
        buttons: [
          { text: '<b>NOT</b>',
            type: 'button-positive'
          },
          {
            text: '<b>YES</b>',
            type: 'button-balanced',
            onTap: function(e) {
              if (!$scope.valueFilter.value) {
                e.preventDefault();
              } else {
                return $scope.valueFilter;
              }
            }
          }
        ]
      });
      PopupFilter.then(function(res) {
        if(res !== undefined) {
          $scope.data.data_fields.push(field)
          $scope.data.data_filters.push(res.value)
        } else {
          var empty = '';
          $scope.data.data_fields.push(field)
          $scope.data.data_filters.push(empty)
        }
      });
    }

    $scope.cancel = function () {
	    $state.go('tab.data-list');
	  }

	}
]);

dataControllers.controller('dataDeleteCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  '$ionicLoading',
  'dataService',
  function(
    $scope,
    $stateParams,
    $state,
    $ionicLoading,
    dataService
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

    dataService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
          $scope.data = res
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        });

	  $scope.delete = function () {
	    dataService.delete($scope.data)
        .$promise
          .then(function (res) {
            $state.go('tab.data-list');
          }, function (err) {

          })
	  }

	  $scope.cancel = function () {
	    $state.go('tab.data-list');
	  }

  }
]);
