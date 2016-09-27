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

businessFilters.filter('filterObject', function() {
  return function(input, search) {
    if (!input) return input;
    if (!search) return input;
    var expected = ('' + search).toLowerCase();
    var result = {};
    angular.forEach(input, function(value, key) {
      var actual = ('' + value).toLowerCase();
      if (actual.indexOf(expected) !== -1) {
        result[key] = value;
      }
    });
    return result;
  }
});
