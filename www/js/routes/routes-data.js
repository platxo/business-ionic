var dataRoutes = angular.module('dataRoutes', []);

dataRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  	.state('tab.data-list', {
  	  url: '/data-list',
      views: {
        'tab-datas': {
          templateUrl: 'templates/data/data-list.html',
          controller: 'dataController'
        }
      }
  	})
  	.state('tab.data-detail', {
      url: '/data-detail/:id',
      views: {
        'tab-datas': {
          templateUrl: 'templates/data/data-detail.html',
          controller: 'dataController'
        }
      }
    })
    .state('tab.data-create', {
      url: '/data-create',
      views: {
        'tab-datas': {
          templateUrl: 'templates/data/data-create.html',
          controller: 'dataController'
        }
      }
    })
    .state('tab.data-update', {
      url: '/data-update/:id',
      views: {
        'tab-datas': {
          templateUrl: 'templates/data/data-update.html',
          controller: 'dataController'
        }
      }
    })
    .state('tab.data-delete', {
      url: '/data-delete/:id',
      views: {
        'tab-datas': {
          templateUrl: 'templates/data/data-delete.html',
          controller: 'dataController'
        }
      }
    })

  $urlRouterProvider.otherwise('/login');

}]);
