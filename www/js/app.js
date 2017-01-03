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
  
  .config(function (ionicTimePickerProvider) {
    var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
    ionicTimePickerProvider.configTimePicker(timePickerObj);
  })
  
  .run(function($ionicPlatform, FB) {
    FB.checkAuth();
    FB.registerSW();
  });
