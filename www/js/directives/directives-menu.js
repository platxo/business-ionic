var menuDirectives = angular.module('menuDirectives', []);

menuDirectives.directive('menuDirective',[
  '$ionicPopover',
  function(
    $ionicPopover
  )
  {
    return {
        restrict:'E',
        replace: true,
        template: '<button ng-click="openMenu($event)" class="button icon ion-android-more-vertical"></button>',
        link:function($scope, $element, $attrs){

          $ionicPopover.fromTemplateUrl('templates/partials/menu.html', {
            scope: $scope,
          }).then(function(popover) {
            $scope.popover = popover;
          });

          $scope.openMenu = function($event) {
            $scope.popover.show($event);
          };

          $scope.closeMenu = function() {
            $scope.popover.hide();
          };


        }
    };
  }
]);
