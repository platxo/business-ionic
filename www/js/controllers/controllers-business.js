var businessControllers = angular.module('businessControllers', []);

businessControllers.controller('businessController', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$location',
  '$ionicModal',
  'businessService',
  'employeesService',
  function(
    $scope,
    $rootScope,
    $stateParams,
    $state,
    $location,
    $ionicModal,
    businessService,
    employeesService
  )
  {
	  $scope.business = businessService.list();
	  $scope.bs = businessService.detail({id: $stateParams.id});
    $scope.employees = employeesService.list();

	  $scope.create = function () {
      $scope.bs.owner = $rootScope.currentOwner
      $scope.bs.employees = []
      $scope.bs.customers = []
      $scope.bs.suppliers = []
	    businessService.create($scope.bs);
	    $scope.business = businessService.list();
	    $state.go('business-list');
	  }

	  $scope.update = function () {
	    businessService.update($scope.bs);
	    $scope.business = businessService.list();
	    $state.go('business-list');
	  }

	  $scope.delete = function () {
	    businessService.delete($scope.bs);
	    $scope.business = businessService.list();
	    $state.go('business-list');
	  }

    $scope.addEmployee = function(employee) {
      $scope.bs.employees.push(employee.id);
      $scope.business.employess = employee.user
      $scope.addEmployeeModal.hide();
    };

    $scope.removeEmployee = function(employee) {
      var employeeIndex = $scope.bs.employees.indexOf(employee.id);
      if (employeeIndex > -1 ) {
        $scope.bs.employees.splice(employeeIndex, 1);
      }
    };

	  $scope.cancel = function () {
	    $state.go('business-list');
	  }

    $scope.refresh = function () {
      $scope.business = businessService.list();
      $scope.$broadcast('scroll.refreshComplete');
    }

    $ionicModal.fromTemplateUrl('templates/business/add-employee.html', {
      scope: $scope,
      controller: 'businessCotroller',
      animation: 'slide-in-up',//'slide-left-right', 'slide-in-up', 'slide-right-left'
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
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.addEmployeeModal.remove();
    });
    // Execute action on hide modal
    $scope.$on('addEmployeeModal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('addEmployeeModal.removed', function() {
      // Execute action
    });

    $ionicModal.fromTemplateUrl('templates/business/remove-employee.html', {
      scope: $scope,
      controller: 'businessCotroller',
      animation: 'slide-in-up',//'slide-left-right', 'slide-in-up', 'slide-right-left'
      focusFirstInput: true
    }).then(function(modal) {
      $scope.removeEmployeeModal = modal;
    });
    $scope.removeEmployeeOpenModal = function() {
      $scope.removeEmployeeModal.show();
    };
    $scope.removeEmployeeCloseModal = function() {
      $scope.removeEmployeeModal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.removeEmployeeModal.remove();
    });
    // Execute action on hide modal
    $scope.$on('removeEmployeeModal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('removeEmployeeModal.removed', function() {
      // Execute action
    });

    $scope.refresh = function () {
      $scope.business = businessService.list();
      $scope.$broadcast('scroll.refreshComplete');
    }

	  $scope.$on('$stateChangeSuccess', function() {
	    $scope.business = businessService.list();
	  })

    $scope.selectBusiness = function(bs) {
      $rootScope.currentBusiness = bs
      window.localStorage.setItem('bs', JSON.stringify($rootScope.currentBusiness));
      $state.go('tab.knowledge-list');
    }

    $scope.$on('$stateChangeSuccess', function() {
	    $scope.business = businessService.list();
	  })

	}
]);
