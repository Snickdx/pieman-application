angular.module('app.routes', [])

  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
  
      .state('tabsController', {
        url: '/tabs',
        templateUrl: 'templates/tabsController.html',
        abstract:true
      })
  
      .state('tabsController.pieManStatus', {
        url: '/status',
        views: {
          'tab1': {
            templateUrl: 'templates/pieManStatus.html',
            controller: 'pieManStatusCtrl'
          }
        }
      })
  
      .state('tabsController.piePolls', {
        url: '/polls',
        views: {
          'tab2': {
            templateUrl: 'templates/piePolls.html',
            controller: 'piePollsCtrl'
          }
        }
      })
  
      .state('tabsController.reportFeed', {
        url: '/report',
        views: {
          'tab3': {
            templateUrl: 'templates/reportFeed.html',
            controller: 'reportFeedCtrl'
          }
        }
      })

      .state('leaveFeedback', {
        url: '/feedback',
        templateUrl: 'templates/leaveFeedback.html',
        controller: 'leaveFeedbackCtrl'
      })
      
      .state('pieReport', {
        url: '/reportDetail',
        templateUrl: 'templates/pieReport.html',
        controller: 'pieReportCtrl'

      });

    $urlRouterProvider.otherwise('/tabs/status')



  });
