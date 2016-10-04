var dataControllers = angular.module('dataControllers', []);

dataControllers.controller('dataController', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$ionicLoading',
  '$timeout',
  '$ionicModal',
  'dataService',
  'tagsService',
  'appService',
  function(
    $scope,
    $rootScope,
    $stateParams,
    $state,
    $ionicLoading,
    $timeout,
    $ionicModal,
    dataService,
    tagsService,
    appService
  )
  {

    $scope.fieldsSelected = []

    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
    });
    
	  $scope.datas = dataService.list()
      .$promise
        .then(function (res) {
          $scope.datas = res
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

	  $scope.data = dataService.detail({id: $stateParams.id});
    $scope.tags = tagsService.get()

	  $scope.create = function () {
      $scope.urlBuild($scope.appSelected, $scope.modelSelected, $scope.fieldsSelected)

      $scope.data.business = $rootScope.currentBusiness.id;
      $scope.data.owner = $rootScope.currentOwner.id;
	    dataService.create($scope.data);
	    $scope.datas = dataService.list();
	    $state.go('tab.data-list');
	  }

	  $scope.update = function () {
	    dataService.update($scope.data);
	    $scope.datas = dataService.list();
	    $state.go('tab.data-list');
	  }

	  $scope.delete = function () {
	    dataService.delete($scope.data);
	    $scope.datas = dataService.list();
	    $state.go('tab.data-list');
	  }

	  $scope.cancel = function () {
	    $state.go('tab.data-list');
	  }

    $scope.refresh = function () {
      $scope.datas = dataService.list();
      $scope.$broadcast('scroll.refreshComplete');
    }

	  $scope.$on('$stateChangeSuccess', function() {
	    $scope.datas = dataService.list()
	  })

    appService.get()
      .$promise
        .then(function (res) {
          $scope.allQuery = res;
          $scope.apps = Object.keys($scope.allQuery)
          var removeOne = $scope.apps.indexOf("$promise");
          // var removeTwo = $scope.apps.indexOf("$resolved");
          $scope.apps.splice(removeOne, 2)

          console.log($scope.allQuery)
        }, function (error) {
          debugger
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

    $scope.selectField = function (field) {
      $scope.fieldsSelected.push(field)
    }

    $scope.urlBuild = function (app,model,fields) {
      $scope.data.data_url = 'http://development.platxo-bi.appspot.com/api/analytics/?app=' + app + '&model=' + model
      for(x in fields) {
        $scope.data.data_url += '&fields[]=' + fields[x]
      }
      console.log($scope.data.data_url)
      // http://localhost:8080/api/analytics/?app=sales&model=Sale&fields[]=products&fields[]=total

    }


	}
]);
