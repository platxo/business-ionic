var businessControllers = angular.module('businessControllers', []);

businessControllers.controller('businessListCtrl', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$ionicLoading',
  'businessService',
  function(
    $scope,
    $rootScope,
    $stateParams,
    $state,
    $ionicLoading,
    businessService
  )
  {
    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
      noBackdrop: true
    });

	  businessService.list()
      .$promise
        .then(function (res) {
          $scope.business = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

    $scope.selectBusiness = function(bs) {
      $rootScope.currentBusiness = bs
      window.localStorage.setItem('business', JSON.stringify($rootScope.currentBusiness));
      $state.go('tab.knowledge-list');
    }

    $scope.refresh = function () {
      businessService.list()
        .$promise
          .then(function (res) {
            $scope.business = res
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
          }, function (err) {
            $ionicLoading.hide();
            $ionicLoading.show({
              template: 'Network Error',
              scope: $scope
            })
          })
    }

    $scope.$on('$stateChangeSuccess', function() {
	    businessService.list()
        .$promise
          .then(function (res) {
            $scope.business = res
            $ionicLoading.hide();
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

businessControllers.controller('businessDetailCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  '$ionicLoading',
  'businessService',
  function(
    $scope,
    $stateParams,
    $state,
    $ionicLoading,
    businessService
  )
  {
    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
      noBackdrop: true
    });

    businessService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.bs = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        });
	}
]);

businessControllers.controller('businessCreateCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  '$ionicLoading',
  'businessService',
  'countriesService',
  'currenciesService',
  'sizesService',
  'categoriesService',
  'typesService',
  function(
    $scope,
    $rootScope,
    $state,
    $ionicLoading,
    businessService,
    countriesService,
    currenciesService,
    sizesService,
    categoriesService,
    typesService
  )
  {
    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
      noBackdrop: true
    });

    sizesService.get()
      .$promise
        .then(function (res) {
          $scope.sizes = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

    categoriesService.get()
      .$promise
        .then(function (res) {
          $scope.categories = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

    typesService.get()
      .$promise
        .then(function (res) {
          $scope.types = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

    countriesService.get()
      .$promise
        .then(function (res) {
          $scope.countries = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

    currenciesService.get()
      .$promise
        .then(function (res) {
          $scope.currencies = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

    $scope.bs = {}
    $scope.bs.employees = []
    $scope.bs.customers = []
    $scope.bs.suppliers = []

	  $scope.create = function () {
      $scope.bs.owner = $rootScope.currentOwner.id
	    businessService.create($scope.bs)
      .$promise
        .then(function (res) {
          $state.go('business-list');
        }, function (err) {

        })
	  }

	  $scope.cancel = function () {
	    $state.go('business-list');
	  }

	}
]);

businessControllers.controller('businessUpdateCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  '$cordovaCamera',
  '$ionicLoading',
  'businessService',
  'countriesService',
  'currenciesService',
  'sizesService',
  'categoriesService',
  'typesService',
  function(
    $scope,
    $stateParams,
    $state,
    $cordovaCamera,
    $ionicLoading,
    businessService,
    countriesService,
    currenciesService,
    sizesService,
    categoriesService,
    typesService
  )
  {
    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
      noBackdrop: true
    });

    sizesService.get()
      .$promise
        .then(function (res) {
          $scope.sizes = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

    categoriesService.get()
      .$promise
        .then(function (res) {
          $scope.categories = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

    typesService.get()
      .$promise
        .then(function (res) {
          $scope.types = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

    countriesService.get()
      .$promise
        .then(function (res) {
          $scope.countries = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

    currenciesService.get()
      .$promise
        .then(function (res) {
          $scope.currencies = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

    businessService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.bs = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        });

    $scope.update = function () {
	    businessService.update($scope.bs)
      .$promise
        .then(function (res) {
          $state.go('business-list');
        }, function (err) {

        })
	  }

    $scope.takePicture = function() {
      var options = {
          quality : 100,
          destinationType : Camera.DestinationType.DATA_URL,
          sourceType : Camera.PictureSourceType.CAMERA,
          allowEdit : true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 300,
          targetHeight: 300,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation:true
      };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.bs.picture = "data:image/jpeg;base64," + imageData;
      businessService.update($scope.bs)
        .$promise
          .then(function (res) {
            $state.go('business-detail', {'id':$scope.bs.id});
          }, function (err) {

          })
    }, function(error) {
          alert(JSON.stringify(err));
    });
   }

	  $scope.cancel = function () {
	    $state.go('business-list');
	  }

	}
]);

businessControllers.controller('businessDeleteCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  '$ionicLoading',
  'businessService',
  function(
    $scope,
    $stateParams,
    $state,
    $ionicLoading,
    businessService
  )
  {
    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
      noBackdrop: true
    });

    businessService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.bs = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        });

	  $scope.delete = function () {
	    businessService.delete($scope.bs)
      .$promise
        .then(function (res) {
          $state.go('business-list');
        }, function (err) {

        })
	  }

	  $scope.cancel = function () {
	    $state.go('business-list');
	  }

	}
]);
