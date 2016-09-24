var calculatorControllers = angular.module('calculatorControllers', []);

calculatorControllers.controller('calculatorController', [
  '$scope',
  'calculatorService',
  function(
    $scope,
    calculatorService
  )
  {
    // TODO addition, subtraction, multiplication and division

    $scope.display = '0';

    $scope.clear = function () {
       $scope.display = '0';
    };

    $scope.equals = function () {
        alert('Equals!');
    };

    $scope.clicked = function (label) {
       $scope.display = label;
   };
  }
]);
