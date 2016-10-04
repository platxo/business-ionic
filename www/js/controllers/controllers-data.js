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
  'buildQueryService',
  function(
    $scope,
    $rootScope,
    $stateParams,
    $state,
    $ionicLoading,
    $ionicModal,
    dataService,
    tagsService,
    buildQueryService
  )
  {

    $scope.fieldsSelected = []

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

	  $scope.data = dataService.detail({id: $stateParams.id});

    tagsService.get()
    .$promise
      .then(function (res) {
        $ionicLoading.hide();
        $scope.tags = res
      }, function (err) {

      })

	  $scope.create = function () {
      $scope.urlBuild($scope.appSelected, $scope.modelSelected, $scope.fieldsSelected)

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

    buildQueryService.get()
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
