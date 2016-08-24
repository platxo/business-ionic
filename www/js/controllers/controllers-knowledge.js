var knowledgeControllers = angular.module('knowledgeControllers', []);

knowledgeControllers.controller('knowledgeController', [
  '$scope',
  '$stateParams',
  '$state',
  '$ionicModal',
  'knowledgeService',
  'informationService',
  function(
    $scope,
    $stateParams,
    $state,
    $ionicModal,
    knowledgeService,
    informationService
  )
  {
	  $scope.knowledges = knowledgeService.list();
	  $scope.knowledge = knowledgeService.detail({id: $stateParams.id});
    $scope.informations = informationService.list();

	  $scope.create = function () {
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

	  $scope.cancel = function () {
	    $state.go('tab.knowledge-list');
	  }

    $ionicModal.fromTemplateUrl('templates/knowledge/select-information.html', {
      scope: $scope,
      controller: 'knowledgeCotroller',
      animation: 'slide-in-up',//'slide-left-right', 'slide-in-up', 'slide-right-left'
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
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.informationModal.remove();
    });
    // Execute action on hide modal
    $scope.$on('informationModal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('informationModal.removed', function() {
      // Execute action
    });

    $scope.knowledge.informations = [];
    $scope.selectInformation = function(information) {
      $scope.knowledge.information = information.name;
      $scope.knowledge.informations.push(information.url);
      $scope.informationModal.hide();
    };

	  $scope.$on('$stateChangeSuccess', function() {
	    $scope.knowledges = knowledgeService.list();
	  })

	}
]);
