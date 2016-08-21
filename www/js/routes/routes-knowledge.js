var knowledgeRoutes = angular.module('knowledgeRoutes', []);

knowledgeRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab.knowledge-list', {
  	  url: '/knowledge-list',
      views: {
        'tab-knowledges': {
          templateUrl: 'templates/knowledge/knowledge-list.html',
          controller: 'knowledgeController'
        }
      }
  	})
  	.state('tab.knowledge-detail', {
      url: '/knowledge-detail/:id',
      views: {
        'tab-knowledges': {
          templateUrl: 'templates/knowledge/knowledge-detail.html',
          controller: 'knowledgeController'
        }
      }
    })
    .state('tab.knowledge-create', {
      url: '/knowledge-create',
      views: {
        'tab-knowledges': {
          templateUrl: 'templates/knowledge/knowledge-create.html',
          controller: 'knowledgeController'
        }
      }
    })
    .state('tab.knowledge-update', {
      url: '/knowledge-update/:id',
      views: {
        'tab-knowledges': {
          templateUrl: 'templates/knowledge/knowledge-update.html',
          controller: 'knowledgeController'
        }
      }
    })
    .state('tab.knowledge-delete', {
      url: '/knowledge-delete/:id',
      views: {
        'tab-knowledges': {
          templateUrl: 'templates/knowledge/knowledge-delete.html',
          controller: 'knowledgeController'
        }
      }
    })

  $urlRouterProvider.otherwise('/tab/knowledge-list');

}]);
