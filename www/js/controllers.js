angular.module('app.controllers', [])

  .controller('pieManStatusCtrl', function($scope, ionicToast, FB, $location) {

    $scope.report = function(){
      if(FB.auth == null)ionicToast.show('Login required, open top left menu to login', 'bottom', false, 4000);
      else $location.path('/reportDetail')
    };

  })

  .controller('reportFeedCtrl', function($scope) {

  })

  .controller('leaveFeedbackCtrl', function($scope) {

  })

  .controller('signupCtrl', function($scope, FB, ionicToast, $location) {
    $scope.input={
      username:"",
      password:"",
      email: ""
    };

    $scope.signUp = function(){
      FB.signUp($scope.input.username, $scope.input.email, $scope.input.password).then(function(userData){
        if(userData.uid == -1){
          ionicToast.show('Signup Failed: '+userData.error.code+' '+userData.error.message, 'bottom', false, 3000);
        }else{
          $location.path('/report');
          ionicToast.show('Account Created!', 'bottom', false, 3000);
        }
      });
    };
  })

  .controller('loginCtrl', function($scope, FB, ionicToast, $location) {
    $scope.input={
      username:"",
      password:""
    };

    $scope.login = function(){
      FB.login($scope.input.username, $scope.input.password).then(function(userData){
        if(userData.uid == -1){
          ionicToast.show('Login Failed: '+userData.error, 'bottom', false, 3000);
        }else{
          $location.path('/report');
          ionicToast.show('Login Successful', 'bottom', false, 3000);
        }
      });
    };

  })

  .controller('pieReportCtrl', function($scope) {

  });
