var businessControllers = angular.module('businessControllers', []);

businessControllers.controller('businessController', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$location',
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
    $stateParams,
    $state,
    $location,
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

	  businessService.list()
    .$promise
      .then(function (res) {
        $ionicLoading.hide();
        $scope.business = res
      }, function (err) {
        $ionicLoading.hide();
        $ionicLoading.show({
          template: 'Network Error',
          scope: $scope
        })
      })

	  $scope.bs = businessService.detail({id: $stateParams.id});
    $scope.sizes = sizesService.get();
    $scope.categories = categoriesService.get();
    $scope.types = typesService.get();
    $scope.countries = countriesService.get();
    $scope.currencies = currenciesService.get()

	  $scope.create = function () {
      $scope.bs.owner = $rootScope.currentOwner.id
      $scope.bs.employees = []
      $scope.bs.customers = []
      $scope.bs.suppliers = []
	    businessService.create($scope.bs)
      .$promise
        .then(function (res) {
          $state.go('business-list');
        }, function (err) {

        })
	  }

	  $scope.update = function () {
	    businessService.update($scope.bs)
      .$promise
        .then(function (res) {
          $state.go('business-list');
        }, function (err) {

        })
	  }

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

    $scope.refresh = function () {
      $scope.business = businessService.list();
      $scope.$broadcast('scroll.refreshComplete');
    }

    $scope.selectBusiness = function(bs) {
      $rootScope.currentBusiness = bs
      window.localStorage.setItem('bs', JSON.stringify($rootScope.currentBusiness));
      $state.go('tab.knowledge-list');
    }

    $scope.$on('$stateChangeSuccess', function() {
	    businessService.list()
        .$promise
          .then(function (res) {
            $ionicLoading.hide();
            $scope.business = res
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
