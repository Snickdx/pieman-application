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
      var latest = null;
      FB.getOrderedbyLast('feed','time',100).on('child_added', function(snapshot){

        var ms = moment().diff(moment(snapshot.val().time,"x"));

        if(ms < 3600000){
          if(flag){
            latest = moment(snapshot.val().time);
            $scope.data.start = moment(snapshot.val().time).format('hh:mm:ss A');
            flag = false
          }
          $scope.data.list.push(snapshot.val());
          if(snapshot.val().present)$scope.data.present++;
          else $scope.data.absent++;
        }

      });

      if(latest != null) $scope.data.end = latest.add(1, 'hours').format('hh:mm:ss  A Do MMM');

    };

    $scope.report = function(){
      if(FB.auth == null)ionicToast.show('Login required, open top left menu to login', 'bottom', false, 4000);
      else {
        $location.path('/reportDetail');
      }
    };

  })

  .controller('reportFeedCtrl', function($scope, FB) {
    $scope.feed = FB.getCollection('feed');

    $scope.format = function(time){
      return moment(time).format('hh:mm:ss A');
    }

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

  .controller('signupCtrl', function($scope, FB, ionicToast, $location, $rootScope) {
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
          ionicToast.show('Account Created!', 'bottom', false, 1000);
          $rootScope.$broadcast('loggedIn');
        }
      });
    };
  })

  .controller('loginCtrl', function($scope, FB, ionicToast, $location, $rootScope) {
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
          ionicToast.show('Login Successful', 'bottom', false, 1000);
          console.log(FB.getAuth());
          $rootScope.$broadcast('loggedIn');
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

    $scope.getLastPost = function(userId){
       return FB.getCollection('feed').$loaded(function(feed){
            var found = null;
            feed.forEach(function(post){
               if(post.userid == userId){
                 found = post;
                 return post;
               }
            });
            return found;
       });
    };

    $scope.send = function(){

      $scope.getLastPost(FB.auth.uid).then(function(post){
        if(post != null){
          var ms = moment().diff(moment(post.time,"x"));
          if(ms < 3600000){
            ionicToast.show('Sorry you cannot report again for the next '+parseInt((3600000-ms)/60000)+' minutes', 'bottom', false, 3000);
            return -1;
          }
        }

        FB.push('/feed',{
          userid: FB.auth.uid,
          user: FB.userData.username,
          menu: hash,
          time: parseInt(moment().format('x')),
          present: $scope.input.toggle
        });

        $location.path('/report');
        ionicToast.show('Report Sent!', 'bottom', false, 3000);
        return 0;
      });



    };


  })

  .controller('menuCtrl', function(FB, $scope, ionicToast){
      $scope.username = null;
      $scope.$on('loggedIn', function(event) {
        console.log('logged In!');
        $scope.username = FB.userData.username;
      });
      $scope.logout = function(){
        FB.logout();
        ionicToast.show('Logged Out!', 'bottom', false, 4000);
        $scope.username = null;
      }
  });
