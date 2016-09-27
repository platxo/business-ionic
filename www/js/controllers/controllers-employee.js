var employeeControllers = angular.module('employeeControllers', []);

employeeControllers.controller('employeeController', [
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
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
    });
    $scope.employees = employeesService.list()
      .$promise
        .then(function (res) {
          $scope.employees = res
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
    $scope.employee = employeesService.detail({id: $stateParams.id});
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

	  $scope.cancel = function () {
	    $state.go('employee-list');
	  }

    $scope.refresh = function () {
      $scope.employees = employeesService.list();
      $scope.$broadcast('scroll.refreshComplete');
    }

    $ionicModal.fromTemplateUrl('templates/employee/employee-add.html', {
      scope: $scope,
      controller: 'employeeCotroller',
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

	}
]);
