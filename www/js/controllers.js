angular.module('app.controllers', [])

  .controller('pieManStatusCtrl', function($scope, ionicToast, FB, $location, $interval) {

    $scope.time = moment().format('hh:mm:ss A');

    $scope.data = {};

    $interval(function() {
      $scope.time = moment().format('hh:mm:ss A');
    }, 1000);

    $interval(function(){
        $scope.updateData();
    }, 1000);

    $scope.updateData = function(){
      $scope.data.present = 0;
      $scope.data.absent = 0;
      $scope.data.list = [];
      var flag = true;
      FB.getOrderedbyLast('feed','time',100).on('child_added', function(snapshot){

        var ms = moment().diff(moment(snapshot.val().time,"x"));

        if(ms < 3600000){
          if(flag){
            $scope.data.oldest = moment(snapshot.val().time).format('hh:mm:ss A');
            flag = false
          }
          $scope.data.list.push(snapshot.val());
          if(snapshot.val().present)$scope.data.present++;
          else $scope.data.absent++;
          $scope.data.newest = moment(snapshot.val().time).format('hh:mm:ss  A Do MMM');
        }

      });

    };

    $scope.report = function(){
      if(FB.auth == null)ionicToast.show('Login required, open top left menu to login', 'bottom', false, 4000);
      else $location.path('/reportDetail')
    };

  })

  .controller('reportFeedCtrl', function($scope) {

  })

  .controller('leaveFeedbackCtrl', function($scope, FB, ionicToast) {
    $scope.input = {};
    $scope.send = function(){
      if(FB.auth == null)ionicToast.show('Login required, open top left menu to login', 'bottom', false, 4000);
      else{
        FB.push('userFeedback/'+FB.auth.uid, {
          message: $scope.input.feedback,
          user: FB.userData.username,
          email: FB.userData.email
        });
        ionicToast.show('Thanks!', 'bottom', false, 4000);
        $scope.input.feedback = "";
      }
    }
  })

  .controller('signupCtrl', function($scope, FB, ionicToast, $location) {
    $scope.input={
      username:"",
      password:"",
      email: ""
    };

    $scope.signUp = function(){
      FB.signUp($scope.input.username, $scope.input.email, $scope.input.password).then(function(userData){
        if(userData.id == -1){
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
      email:"",
      password:""
    };

    $scope.login = function(){
      FB.login($scope.input.email, $scope.input.password).then(function(userData){
        if(userData.id == -1){
          ionicToast.show('Login Failed: '+userData.error, 'bottom', false, 3000);
        }else{
          $location.path('/status');
          ionicToast.show('Login Successful', 'bottom', false, 3000);
        }
      });
    };

  })

  .controller('pieReportCtrl', function($scope, FB, ionicToast, $location) {
    $scope.input = {
      toggle:false,
      beef: false,
      cheese: false,
      chicken: false,
      coconut: false,
      currants: false,
      fish: false,
      macaroni: false,
      smoke: false
    };
    var hash ="";
    hash+= $scope.input.beef ? '1' : '0';
    hash+= $scope.input.cheese ? '1' : '0';
    hash+= $scope.input.chicken ? '1' : '0';
    hash+= $scope.input.coconut ? '1' : '0';
    hash+= $scope.input.currants ? '1' : '0';
    hash+= $scope.input.fish ? '1' : '0';
    hash+= $scope.input.macaroni ? '1' : '0';
    hash+= $scope.input.smoke ? '1' : '0';
    hash+= $scope.input.beef ? '1' : '0';


    $scope.send = function(){

      FB.push('/feed',{
        userid: FB.auth.uid,
        user: FB.userData.username,
        menu: hash,
        time: parseInt(moment().format('x')),
        present: $scope.input.toggle
      });

      $location.path('/report');
      ionicToast.show('Report Sent!', 'bottom', false, 3000);

    };


  })

  .controller('menuCtrl', function(FB, $scope, ionicToast){
      $scope.logout = function(){
        FB.logout();
        ionicToast.show('Logged Out!', 'bottom', false, 4000);
      }
  });
