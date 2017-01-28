angular.module(
  'app',
  [
    'ionic',
    'app.controllers',
    'app.routes',
    'app.services',
    'app.directives',
    'ionic-toast',
    'firebase',
    'ngStorage',
    'ionic-timepicker',
    'ionic-datepicker'
  ])
  
  .run(function($ionicPlatform, FB) {
    FB.checkAuth();
    FB.registerSW();
  });
