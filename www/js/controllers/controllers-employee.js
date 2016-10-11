var employeeControllers = angular.module('employeeControllers', []);

employeeControllers.controller('employeeCtrl', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$location',
  '$ionicLoading',
  '$timeout',
  '$ionicModal',
  'businessService',
  'employeesService',
  function(
    $scope,
    $rootScope,
    $stateParams,
    $state,
    $location,
    $ionicLoading,
    $timeout,
    $ionicModal,
    businessService,
    employeesService
  )
  {
    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
      noBackdrop: true
    });

    employeesService.list()
      .$promise
        .then(function (res) {
          $scope.employees = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        })

    $scope.bs = businessService.detail({id: $rootScope.currentBusiness.id});

    $scope.addEmployee = function(employee) {
      $scope.bs.employees.push(employee.id);
      businessService.update($scope.bs)
        .$promise
          .then(
            function (res) {
            $scope.addEmployeeModal.hide();
            $scope.employees = employeesService.list();
            $state.go('employee-list');
          },
           function (err) {
             $scope.addEmployeeModal.hide();
           })
    };

    $scope.removeEmployee = function(employee) {
      var employeeIndex = $scope.bs.employees.indexOf(employee.id);
      if (employeeIndex > -1 ) {
        $scope.bs.employees.splice(employeeIndex, 1);
        businessService.update($scope.bs)
          .$promise
            .then(
              function (res) {
                $scope.employees = employeesService.list();
                $state.go('employee-list');
              },
              function (err) {
                $scope.employees = employeesService.list();
              }
            )
      }
    };

    $scope.employed = function(employee) {
      var employeeIndex = $scope.bs.employees.indexOf(employee.id);
      if (employeeIndex > -1) {
        return true;
      } else {
        return false;
      }
    }

    $scope.refresh = function () {
      $scope.employees = employeesService.list();
      $scope.$broadcast('scroll.refreshComplete');
    }

    $ionicModal.fromTemplateUrl('templates/employee/employee-add.html', {
      scope: $scope,
      controller: 'employeeCtrl',
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function(modal) {
      $scope.addEmployeeModal = modal;
    });
    $scope.addEmployeeOpenModal = function() {
      $scope.addEmployeeModal.show();
    };
    $scope.addEmployeeCloseModal = function() {
      $scope.addEmployeeModal.hide();
    };

    $scope.$on('$stateChangeSuccess', function() {
      employeesService.list()
        .$promise
          .then(function (res) {
            $scope.employees = res
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

employeeControllers.controller('employeeProfileCtrl', [
  '$scope',
  '$stateParams',
  '$ionicLoading',
  'employeesService',
  function(
    $scope,
    $stateParams,
    $ionicLoading,
    employeesService
  )
  {
    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
      noBackdrop: true
    });

    employeesService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.employee = res
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
