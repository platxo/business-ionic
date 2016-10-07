var informationRoutes = angular.module('informationRoutes', []);

informationRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab.information-list', {
  	  url: '/information-list',
      views: {
        'tab-informations': {
          templateUrl: 'templates/information/information-list.html',
          controller: 'informationListCtrl'
        }
      }
  	})
  	.state('tab.information-detail', {
      url: '/information-detail/:id',
      views: {
        'tab-informations': {
          templateUrl: 'templates/information/information-detail.html',
          controller: 'informationDetailCtrl'
        }
      }
    })
    .state('tab.information-create', {
      url: '/information-create',
      views: {
        'tab-informations': {
          templateUrl: 'templates/information/information-create.html',
          controller: 'informationCreateCtrl'
        }
      }
    })
    .state('tab.information-update', {
      url: '/information-update/:id',
      views: {
        'tab-informations': {
          templateUrl: 'templates/information/information-update.html',
          controller: 'informationUpdateCtrl'
        }
      }
    })
    .state('tab.information-delete', {
      url: '/information-delete/:id',
      views: {
        'tab-informations': {
          templateUrl: 'templates/information/information-delete.html',
          controller: 'informationDeleteCtrl'
        }
      }
    })

  $urlRouterProvider.otherwise('/login');

}]);
