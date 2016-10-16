var knowledgeControllers = angular.module('knowledgeControllers', []);

knowledgeControllers.controller('knowledgeListCtrl', [
  '$scope',
  '$ionicLoading',
  'knowledgeService',
  function(
    $scope,
    $ionicLoading,
    knowledgeService
  )
  {
    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
      noBackdrop: true
    });

	  knowledgeService.list()
      .$promise
        .then(function (res) {
          $scope.knowledges = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

    $scope.refresh = function () {
      knowledgeService.list()
        .$promise
          .then(function (res) {
            $scope.knowledges = res
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
      knowledgeService.list()
        .$promise
          .then(function (res) {
            $scope.knowledges = res
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

knowledgeControllers.controller('knowledgeDetailCtrl', [
  '$scope',
  '$stateParams',
  '$ionicLoading',
  'knowledgeService',
  'informationService',
  function(
    $scope,
    $stateParams,
    $ionicLoading,
    knowledgeService,
    informationService
  )
  {
    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
      noBackdrop: true
    });

    knowledgeService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.knowledge = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        });

    informationService.list()
      .$promise
        .then(function (res) {
          $scope.informations = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

	}
]);

knowledgeControllers.controller('knowledgeCreateCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  '$ionicLoading',
  '$ionicModal',
  'knowledgeService',
  'informationService',
  'tagsService',
  function(
    $scope,
    $rootScope,
    $state,
    $ionicLoading,
    $ionicModal,
    knowledgeService,
    informationService,
    tagsService
  )
  {
    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
      noBackdrop: true
    });

    tagsService.get()
      .$promise
        .then(function (res) {
          $scope.tags = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

	  $scope.knowledge = {}
    $scope.knowledge.informations = [];

	  $scope.create = function () {
      $scope.knowledge.business = $rootScope.currentBusiness.id;
      $scope.knowledge.owner = $rootScope.currentOwner.id;
	    knowledgeService.create($scope.knowledge)
      .$promise
        .then(function (res) {
          $state.go('tab.knowledge-list');
        }, function (err) {

        })
	  }

    $scope.selectInformation = function(information) {
      $scope.knowledge.information = information.name;
      $scope.knowledge.informations.push(information.id)
    };

    $ionicModal.fromTemplateUrl('templates/knowledge/select-information.html', {
      scope: $scope,
      // controller: 'knowledgeCotroller',
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function(modal) {
      $scope.informationModal = modal;
    });
    $scope.informationOpenModal = function() {
      $scope.informationModal.show();
    };
    $scope.informationCloseModal = function() {
      $scope.informationModal.hide();
    };

    $scope.cancel = function () {
	    $state.go('tab.knowledge-list');
	  }

	}
]);

knowledgeControllers.controller('knowledgeUpdateCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  '$ionicLoading',
  '$ionicModal',
  'knowledgeService',
  'informationService',
  'tagsService',
  function(
    $scope,
    $stateParams,
    $state,
    $ionicLoading,
    $ionicModal,
    knowledgeService,
    informationService,
    tagsService
  )
  {
    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
      noBackdrop: true
    });

    tagsService.get()
      .$promise
        .then(function (res) {
          $scope.tags = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

    knowledgeService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.knowledge = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        });

    $scope.update = function () {
    	knowledgeService.update($scope.knowledge)
        .$promise
            .then(function (res) {
              $state.go('tab.knowledge-list');
            }, function (err) {

            })
    	  }

    $scope.selectInformation = function(information) {
      $scope.knowledge.information = information.name;
      $scope.knowledge.informations.push(information.id)
    };

    $ionicModal.fromTemplateUrl('templates/knowledge/select-information.html', {
      scope: $scope,
      // controller: 'knowledgeCotroller',
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function(modal) {
      $scope.informationModal = modal;
    });
    $scope.informationOpenModal = function() {
      $scope.informationModal.show();
    };
    $scope.informationCloseModal = function() {
      $scope.informationModal.hide();
    };

    $scope.cancel = function () {
	    $state.go('tab.knowledge-list');
	  }

	}
]);

knowledgeControllers.controller('knowledgeDeleteCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  '$ionicLoading',
  'knowledgeService',
  function(
    $scope,
    $stateParams,
    $state,
    $ionicLoading,
    knowledgeService
  )
  {
    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
      noBackdrop: true
    });

    knowledgeService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.knowledge = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        });

    $scope.delete = function () {
    	knowledgeService.delete($scope.knowledge)
        .$promise
          .then(function (res) {
            $state.go('tab.knowledge-list');
          }, function (err) {

          })
    }

    $scope.cancel = function () {
	    $state.go('tab.knowledge-list');
	  }

	}
]);
