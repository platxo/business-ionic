var knowledgeRoutes = angular.module('knowledgeRoutes', []);

knowledgeRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tab.knowledge-list', {
  	  url: '/knowledge-list',
      views: {
        'tab-knowledges': {
          templateUrl: 'templates/knowledge/knowledge-list.html',
          controller: 'knowledgeListCtrl'
        }
      }
  	})
  	.state('tab.knowledge-detail', {
      url: '/knowledge-detail/:id',
      views: {
        'tab-knowledges': {
          templateUrl: 'templates/knowledge/knowledge-detail.html',
          controller: 'knowledgeDetailCtrl'
        }
      }
    })
    .state('tab.knowledge-create', {
      url: '/knowledge-create',
      views: {
        'tab-knowledges': {
          templateUrl: 'templates/knowledge/knowledge-create.html',
          controller: 'knowledgeCreateCtrl'
        }
      }
    })
    .state('tab.knowledge-update', {
      url: '/knowledge-update/:id',
      views: {
        'tab-knowledges': {
          templateUrl: 'templates/knowledge/knowledge-update.html',
          controller: 'knowledgeUpdateCtrl'
        }
      }
    })
    .state('tab.knowledge-delete', {
      url: '/knowledge-delete/:id',
      views: {
        'tab-knowledges': {
          templateUrl: 'templates/knowledge/knowledge-delete.html',
          controller: 'knowledgeDeleteCtrl'
        }
      }
    })

  $urlRouterProvider.otherwise('/login');

}]);
