var knowledgeControllers = angular.module('knowledgeControllers', []);

knowledgeControllers.controller('knowledgeController', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$ionicLoading',
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

	  knowledgeService.list()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
          $scope.knowledges = res
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

	  $scope.knowledge = knowledgeService.detail({id: $stateParams.id});

    informationService.list()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
          $scope.informations = res
        }, function (err) {

        })

    tagsService.get()
      .$promise
        .then(function (res) {
          $scope.tags = res
        }, function (err) {

        })

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

	  $scope.update = function () {
	    knowledgeService.update($scope.knowledge)
      .$promise
        .then(function (res) {
          $state.go('tab.knowledge-list');
        }, function (err) {

        })
	  }

	  $scope.delete = function () {
	    knowledgeService.delete($scope.knowledge)
      .$promise
        .then(function (res) {
          $state.go('tab.knowledge-list');
        }, function (err) {

        })
	  }

    $scope.knowledge.informations = [];
    $scope.selectInformation = function(information) {
      $scope.knowledge.information = information.name;
      $scope.knowledge.informations.push(information.id)
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
      knowledgeService.list()
        .$promise
          .then(function (res) {
            $ionicLoading.hide();
            $scope.knowledges = res
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
