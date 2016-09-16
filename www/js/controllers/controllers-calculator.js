var calculatorControllers = angular.module('calculatorControllers', []);

calculatorControllers.controller('calculatorController', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$location',
  '$ionicModal',
  function(
    $scope,
    $rootScope,
    $stateParams,
    $state,
    $location,
    $ionicModal
  )
  {
    $ionicModal.fromTemplateUrl('templates/calculator.html', {
      scope: $scope,
      controller: 'calculatorCotroller',
      animation: 'slide-in-up',//'slide-left-right', 'slide-in-up', 'slide-right-left'
      focusFirstInput: true
    }).then(function(modal) {
      $scope.calculatorModal = modal;
    });
    $scope.calculatorOpenModal = function() {
      $scope.calculatorModal.show();
    };
    $scope.calculatorCloseModal = function() {
      $scope.calculatorModal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.calculatorModal.remove();
    });
    // Execute action on hide modal
    $scope.$on('calculatorModal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('calculatorModal.removed', function() {
      // Execute action
    });
	}
]);
