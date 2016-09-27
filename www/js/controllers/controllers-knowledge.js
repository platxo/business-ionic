var knowledgeControllers = angular.module('knowledgeControllers', []);

knowledgeControllers.controller('knowledgeController', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$ionicLoading',
  '$timeout',
  '$ionicModal',
  'knowledgeService',
  'informationService',
  'tagsService',
  function(
    $scope,
    $rootScope,
    $stateParams,
    $state,
    $ionicLoading,
    $timeout,
    $ionicModal,
    knowledgeService,
    informationService,
    tagsService
  )
  {
    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
    });

	  $scope.knowledges = knowledgeService.list()
      .$promise
        .then(function (res) {
          $scope.knowledges = res
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

	  $scope.knowledge = knowledgeService.detail({id: $stateParams.id});
    $scope.informations = informationService.list();
    $scope.tags = tagsService.get()

	  $scope.create = function () {
      $scope.knowledge.business = $rootScope.currentBusiness.id;
      $scope.knowledge.owner = $rootScope.currentOwner.id;
	    knowledgeService.create($scope.knowledge);
	    $scope.knowledges = knowledgeService.list();
	    $state.go('tab.knowledge-list');
	  }

	  $scope.update = function () {
	    knowledgeService.update($scope.knowledge);
	    $scope.knowledges = knowledgeService.list();
	    $state.go('tab.knowledge-list');
	  }

	  $scope.delete = function () {
	    knowledgeService.delete($scope.knowledge);
	    $scope.knowledges = knowledgeService.list();
	    $state.go('tab.knowledge-list');
	  }

    $scope.knowledge.informations = [];
    $scope.selectInformation = function(information) {
      $scope.knowledge.information = information.name;
      $scope.knowledge.informations.push(information.id);
    };

	  $scope.cancel = function () {
	    $state.go('tab.knowledge-list');
	  }

    $scope.refresh = function () {
      $scope.knowledges = knowledgeService.list();
      $scope.$broadcast('scroll.refreshComplete');
    }

    $ionicModal.fromTemplateUrl('templates/knowledge/select-information.html', {
      scope: $scope,
      controller: 'knowledgeCotroller',
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

    $scope.$on('$stateChangeSuccess', function() {
	    $scope.knowledges = knowledgeService.list();
	  })

	}
]);
