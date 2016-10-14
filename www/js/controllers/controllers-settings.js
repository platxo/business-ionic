var settingsControllers = angular.module('settingsControllers', []);

settingsControllers.controller('settingsController', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$location',
  '$ionicLoading',
  '$ionicPopup',
  'businessService',
  'crmPointsService',
  'taxService',
  function(
    $scope,
    $rootScope,
    $stateParams,
    $state,
    $location,
    $ionicLoading,
    $ionicPopup,
    businessService,
    crmPointsService,
    taxService
  )
  {
    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
      noBackdrop: true
    });

    businessService.detail({id: $rootScope.currentBusiness.id})
      .$promise
        .then(function (res) {
          $scope.bs = res
          $scope.crm_points = $scope.bs.crm_points
        }, function (err) {

        })

    crmPointsService.get()
      .$promise
        .then(function (res) {
          $scope.crmPoints = res
        }, function (err) {

        })

    $scope.selectCrmPoints = function(key, value) {
      $scope.bs.crm_points = key;
      businessService.update($scope.bs)
        .$promise
          .then(
            function (res) {
            $state.go('settings-list');
          },
           function (err) {

           })
      };

	  taxService.list()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
          $scope.taxes = res
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

      $scope.taxCreate = function() {
      $scope.tax = {}
      var PopupTax = $ionicPopup.show({
        template: '<span class="input-label">Name</span><input type="text" ng-model="tax.name"><span class="input-label">Rate</span><input type="text" ng-model="tax.rate">',
        title: 'Create new tax',
        subTitle: 'for sales',
        scope: $scope,
        buttons: [
          { text: '<b>Cancel</b>',
            type: 'button-positive'
          },
          {
            text: '<b>Create</b>',
            type: 'button-balanced',
            onTap: function(e) {
              if (!$scope.tax.name && !$scope.tax.rate) {
                e.preventDefault();
              } else {
                return $scope.tax;
              }
            }
          }
        ]
      });
      PopupTax.then(function(res) {
        if(res) {
          $scope.tax.business = $rootScope.currentBusiness.id;
          $scope.tax.owner = $rootScope.currentOwner.id;
          taxService.create($scope.tax)
          .$promise
            .then(function (res) {
              taxService.list()
              .$promise
                .then(function (res) {
                  $ionicLoading.hide();
                  $scope.taxes = res
                }, function (err) {
                  $ionicLoading.hide();
                  $ionicLoading.show({
                    template: 'Network Error',
                    scope: $scope
                  })
                })
              $state.go('settings-taxes');
            }, function (err) {

            })
        }

      });
     };

     $scope.taxUpdate = function(tax) {
     $scope.tax = tax
     var PopupTax = $ionicPopup.show({
       template: '<span class="input-label">Name</span><input type="text" ng-model="tax.name"><span class="input-label">Rate</span><input type="text" ng-model="tax.rate">',
       title: 'Update tax',
       subTitle: 'for sales',
       scope: $scope,
       buttons: [
         { text: '<b>Cancel</b>',
           type: 'button-positive'
         },
         {
           text: '<b>Update</b>',
           type: 'button-balanced',
           onTap: function(e) {
             if (!$scope.tax.name && !$scope.tax.rate) {
               e.preventDefault();
             } else {
               return $scope.tax;
             }
           }
         }
       ]
     });
     PopupTax.then(function(res) {
       if(res) {
         taxService.update(res)
         .$promise
           .then(function (res) {
             taxService.list()
             .$promise
               .then(function (res) {
                 $ionicLoading.hide();
                 $scope.taxes = res
               }, function (err) {
                 $ionicLoading.hide();
                 $ionicLoading.show({
                   template: 'Network Error',
                   scope: $scope
                 })
               })
             $state.go('settings-taxes');
           }, function (err) {

           })
       }

     });
    };

    $scope.taxDelete= function(tax) {
      $scope.tax = tax
       var confirmPopup = $ionicPopup.confirm({
         title: 'Delete tax',
         template: 'Are you sure you want to delete {{tax.name}}?',
         scope: $scope
       });
       confirmPopup.then(function(res) {
         if(res) {
           taxService.delete(tax)
             .$promise
               .then(function (res) {
                 taxService.list()
                 .$promise
                   .then(function (res) {
                     $ionicLoading.hide();
                     $scope.taxes = res
                   }, function (err) {
                     $ionicLoading.hide();
                     $ionicLoading.show({
                       template: 'Network Error',
                       scope: $scope
                     })
                   })
                 $state.go('settings-taxes');
               }, function (err) {

               })
         } else {

         }
       });
     };

	}
]);
