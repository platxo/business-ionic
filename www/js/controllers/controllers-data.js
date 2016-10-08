var dataControllers = angular.module('dataControllers', []);

dataControllers.controller('dataController', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$ionicLoading',
  '$ionicModal',
  'dataService',
  'tagsService',
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
    analyticsService,
    $ionicPopup
  )
  {
    $scope.data = {}
    $scope.data.data_fields = []
    $scope.data.data_filters = []

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


    $scope.dataAppAnalytic = function (data) {
      $rootScope.data = data
      analyticsService.get({
        "app": data.data_app,
        "model": data.data_model,
        "fields[]": data.data_fields,
        "filters[]": data.data_filters,
        "id": data.data_id
      })
        .$promise
          .then(function(res) {
            $rootScope.dataAnalytic = res
            $state.go('tab.data-detail', {'id': data.id});
          }, function(error) {
          })
    }

    tagsService.get()
    .$promise
      .then(function (res) {
        $ionicLoading.hide();
        $scope.tags = res
      }, function (err) {

      })

    // $scope.preFilter =

	  $scope.create = function () {
      $scope.data.data_app = $scope.appSelected
      $scope.data.data_model = $scope.modelSelected
      // $scope.data.data_fields = $scope.fieldsSelected
      $scope.data.business = $rootScope.currentBusiness.id;
      $scope.data.owner = $rootScope.currentOwner.id;
	    dataService.create($scope.data)
      .$promise
        .then(function (res) {
      	  $state.go('tab.data-list');
        }, function (err) {

        })
	  }

	  $scope.update = function () {
	    dataService.update($scope.data)
        .$promise
          .then(function (res) {
            $state.go('tab.data-list');
          }, function (err) {

          })
	  }

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

    analyticsService.get2()
      .$promise
        .then(function (res) {
          $scope.allQuery = res;
          $scope.apps = Object.keys($scope.allQuery)
          var removeOne = $scope.apps.indexOf("$promise");
          // var removeTwo = $scope.apps.indexOf("$resolved");
          $scope.apps.splice(removeOne, 2)

          console.log($scope.allQuery)
        }, function (error) {

        })

    $scope.selectApp = function (app) {
      $scope.appSelected = app
      $scope.models = Object.keys($scope.allQuery[$scope.appSelected])
      $scope.showSelectModel = true;
    }

    $scope.selectModel = function (model) {
      $scope.modelSelected = model
      $scope.fields = $scope.allQuery[$scope.appSelected][$scope.modelSelected]
      $scope.showSelectField = true;
    }

    $scope.selectFieldForAll = function (field) {
      $scope.data.data_fields.push(field)
    }

    $scope.selectFieldForFilter = function (field) {
      $scope.valueFilter = {}
      var PopupFilter = $ionicPopup.show({
        template: '<input type="text" ng-model="valueFilter.name">',
        title: 'Which field value',
        subTitle: 'for ' + field + ' ?',
        scope: $scope,
        buttons: [
          { text: '<b>Cancel</b>',
            type: 'button-positive'
          },
          {
            text: '<b>OK</b>',
            type: 'button-balanced',
            onTap: function(e) {
              // if (!$scope.tax.name && !$scope.tax.rate) {
              //   e.preventDefault();
              // } else {
              //   return $scope.tax;
              // }
              return $scope.valueFilter
            }
          }
        ]
      });
      PopupFilter.then(function(res) {
        if(res) {
          $scope.data.data_fields.push(field)
          $scope.data.data_filters.push(res.name)
          
        }

      });
    }

    $scope.selectQueryType = function (queryType) {
      $scope.queryTypeSelected = queryType
    }



	}
]);
