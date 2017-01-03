angular.module(
  'app',
  [
    'ionic',
    'app.controllers',
    'app.routes',
    'app.services',
    'app.directives',
    'ionic-toast',
    'nvd3',
    'firebase',
    'angular-web-notification',
    'ngStorage',
    'ionic-timepicker',
    'ionic-datepicker'
  ])
  
  .run(function($ionicPlatform, FB) {
    FB.checkAuth();
    FB.registerSW();
  });
