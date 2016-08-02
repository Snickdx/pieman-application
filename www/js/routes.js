angular.module('app.routes', [])

  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('tabsController.pieManStatus', {
        url: '/status',
        views: {
          'tab1': {
            templateUrl: 'templates/pieManStatus.html',
            controller: 'pieManStatusCtrl'
          }
        }
      })

      .state('tabsController.reportFeed', {
        url: '/report',
        views: {
          'tab2': {
            templateUrl: 'templates/reportFeed.html',
            controller: 'reportFeedCtrl'
          }
        }
      })

      .state('tabsController.leaveFeedback', {
        url: '/feedback',
        views: {
          'tab3': {
            templateUrl: 'templates/leaveFeedback.html',
            controller: 'leaveFeedbackCtrl'
          }
        }
      })

      .state('tabsController', {
        url: '/page1',
        templateUrl: 'templates/tabsController.html',
        abstract:true
      })

      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      })

      .state('pieReport', {
        url: '/reportDetail',
        templateUrl: 'templates/pieReport.html',
        controller: 'pieReportCtrl'

      });

    $urlRouterProvider.otherwise('/page1/status')



  });
