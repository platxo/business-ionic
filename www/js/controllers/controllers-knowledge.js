var knowledgeControllers = angular.module('knowledgeControllers', []);

knowledgeControllers.controller('knowledgeController', [
  '$scope',
  '$stateParams',
  '$state',
  'knowledgeService',
  function(
    $scope,
    $stateParams,
    $state,
    knowledgeService
  )
  {
	  $scope.knowledges = knowledgeService.list();
	  $scope.knowledge = knowledgeService.detail({id: $stateParams.id});

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

	  $scope.$on('$stateChangeSuccess', function() {
	    $scope.knowledges = knowledgeService.list();
	  })

	}
]);
