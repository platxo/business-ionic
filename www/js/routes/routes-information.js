var informationRoutes = angular.module('informationRoutes', []);

informationRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab.information-list', {
  	  url: '/information-list',
      views: {
        'tab-informations': {
          templateUrl: 'templates/information/information-list.html',
          controller: 'informationController'
        }
      }
  	})
  	.state('tab.information-detail', {
      url: '/information-detail/:id',
      views: {
        'tab-informations': {
          templateUrl: 'templates/information/information-detail.html',
          controller: 'informationController'
        }
      }
    })
    .state('tab.information-create', {
      url: '/information-create',
      views: {
        'tab-informations': {
          templateUrl: 'templates/information/information-create.html',
          controller: 'informationController'
        }
      }
    })
    .state('tab.information-update', {
      url: '/information-update/:id',
      views: {
        'tab-informations': {
          templateUrl: 'templates/information/information-update.html',
          controller: 'informationController'
        }
      }
    })
    .state('tab.information-delete', {
      url: '/information-delete/:id',
      views: {
        'tab-informations': {
          templateUrl: 'templates/information/information-delete.html',
          controller: 'informationController'
        }
      }
    })

  $urlRouterProvider.otherwise('/login');

}]);
