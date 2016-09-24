var businessFilters = angular.module('businessFilters', []);

businessFilters.filter('employeeFilter', [
  function(
  )
  {

    return function(employess, business) {
        return employess.filter(function(employee) {

            for (var i in employee.business) {
                if (business.indexOf(employee.business[i]) != -1) {
                    return true;
                }
            }
            return false;

        });
    };

	}
]);
