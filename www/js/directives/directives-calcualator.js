var calculatorDirectives = angular.module('calculatorDirectives', []);

calculatorDirectives.directive('calculatorDirective',[
  '$ionicModal',
  function(
    $ionicModal
  )
  {
    return {
        restrict:'E',
        replace: true,
        template: '<button ng-click="openModal()" class="button icon ion-calculator pull-right"></button>',
        link:function($scope, $element, $attrs){

          $ionicModal.fromTemplateUrl('templates/partials/calculator.html', {
               scope: $scope,
               //controller: 'calculatorController',
               animation: 'slide-in-up',
               focusFirstInput: true
           }).then(function(modal) {
               $scope.modal = modal
           });
           $scope.openModal = function() {
               $scope.modal.show()
           };
           $scope.closeModal = function() {
             $scope.modal.hide();
           };

        }
    };
  }
]);
