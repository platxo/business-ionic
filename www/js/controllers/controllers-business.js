var businessControllers = angular.module('businessControllers', []);

businessControllers.controller('businessController', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$location',
  '$ionicLoading',
  '$timeout',
  'businessService',
  'countriesService',
  'currenciesService',
  'crmPointsService',
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
    $timeout,
    businessService,
    countriesService,
    currenciesService,
    crmPointsService,
    sizesService,
    categoriesService,
    typesService
  )
  {
    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
    });
	  $scope.business = businessService.list()
    .$promise
      .then(function (res) {
        $scope.business = res
        $ionicLoading.hide();
      }, function (err) {
        $ionicLoading.hide();
        $ionicLoading.show({
          template: 'Network Error',
          scope: $scope
        });
        $timeout(function() {
           $ionicLoading.hide();
        }, 2000);
      })

	  $scope.bs = businessService.detail({id: $stateParams.id});
    $scope.sizes = sizesService.get();
    $scope.categories = categoriesService.get();
    $scope.types = typesService.get();
    $scope.crmPoints = crmPointsService.get();
    $scope.countries = countriesService.get();
    $scope.currencies = currenciesService.get()

	  $scope.create = function () {
      $scope.bs.owner = $rootScope.currentOwner.id
      $scope.bs.employees = []
      $scope.bs.customers = []
      $scope.bs.suppliers = []
	    businessService.create($scope.bs);
	    $scope.business = businessService.list();
	    $state.go('business-list');
	  }

	  $scope.update = function () {
	    businessService.update($scope.bs);
	    $scope.business = businessService.list();
	    $state.go('business-list');
	  }

	  $scope.delete = function () {
	    businessService.delete($scope.bs);
	    $scope.business = businessService.list();
	    $state.go('business-list');
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
	    $scope.business = businessService.list();
	  })

	}
]);
