//TODO move feedback to side bar
//TODO pieman open & close countdown
//TODO ping pieman
//TODO sms api
angular.module('app.controllers', [])
  
  .controller('pieManStatusCtrl', function($scope, ionicToast, FB, $location, $interval, ionicTimePicker, ionicDatePicker){
    
    $scope.userData = FB.getUserData();
    
    $scope.ui = {
      show:false
    };
    
    $scope.$on('loggedIn', function(event) {
      $scope.userData = FB.getUserData();
      $scope.ui = $scope.userData.type == 'pieman';
    });
  
    $scope.$on('noAuth', function(event) {
      $scope.userData = null;
      $scope.ui = false;
    });
    
    $scope.time = {};
    
    $scope.pretty = (time) => {
      return moment(time).format(' DD MMM YYYY hh:mm:ss A');
    };
    
    $scope.refresh = () => {
      FB.getObject('/pietime').$loaded(obj=>{
    
        $interval(function() {
          let duration = moment.duration(moment(obj.arrive) - moment(), 'milliseconds');
          duration = moment.duration(duration.asMilliseconds() - 1000, 'milliseconds');
          $scope.time.now = new moment().unix()*1000;
          $scope.time.arrive = parseInt(obj.arrive);
          $scope.time.depart = parseInt(obj.depart);
          $scope.time.days = moment.duration(duration).days();
          $scope.time.hours = moment.duration(duration).hours();
          $scope.time.minutes = moment.duration(duration).minutes();
          $scope.time.seconds = moment.duration(duration).seconds();
        }, 1000);
    
      });
    };
    
    $scope.refresh();
    
    let date;
    
    function setTime(type, callback){
      ionicTimePicker.openTimePicker({
        callback: function (val2) {      //Mandatory
          if (typeof (val2) === 'undefined') {
            console.log('Time not selected');
          } else {
            let datetime = moment(date) + new Date(val2)*1000;
            console.log('Selected epoch is', moment(datetime).format("DD MMM YYYY hh:mm:ss A"), datetime);
            FB.set(`/pietime/${type}`, datetime);
            if(type == 'arrive')FB.set(`/pietime/notified`, false);
            if(callback != undefined)callback();
            $scope.refresh();
          }
        },
        inputTime: (((new Date("January, 2017 12:00:00")).getHours() * 60 * 60) + ((new Date("January, 2017 12:00:00")).getMinutes() * 60)),
        format: 12,         //Optional
        step: 15,           //Optional
      });
    }
    
    $scope.setTime = () => {
  
      ionicDatePicker.openDatePicker({
        callback: function (val) {
          date = val;
          setTime('arrive', ()=>{
            ionicToast.show('Set Departure Time', 'top', false, 1000);
            setTime('depart');
          });
          ionicToast.show('Set Arrival Time', 'top', false, 1000);
        },
        from: new Date(), //Optional
        to: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), //Optional
        inputDate: new Date(),      //Optional
        mondayFirst: true,          //Optional
        showTodayButton: true,      //Optional
        closeOnSelect: false,       //Optional
        templateType: 'modal'       //Optional
      });
      
    };
  
    
  })
  
  .controller('piePollsCtrl', function($scope, ionicToast, FB, $location, $interval) {
    
    
    $scope.time = moment().format('hh:mm:ss A');
    
    $scope.options = {
      chart: {
        type: 'pieChart',
        x: function(d){return d.key;},
        y: function(d){return d.y;},
        showLabels: true,
        duration: 400,
        height: 250,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        tooltip:{
          enabled: true
        }
      }
    };
    
    $scope.data = [
      {
        key: "Yes",
        y: 0
      },
      {
        key: "No",
        y: 0
      }
    ];
    
    $interval(function() {
      $scope.time = moment().format('hh:mm:ss A');
    }, 1000);
    
    $interval(function(){
      $scope.updateData();
    }, 1000);
    
    $scope.updateData = function(){
      $scope.data[0].y = 0;
      $scope.data[1].y = 0;
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
          if(snapshot.val().present)$scope.data[0].y++;
          else $scope.data[1].y++;
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
      console.log(FB.userData);
      if(FB.auth == null)ionicToast.show('Login required, open top left menu to login', 'bottom', false, 4000);
      else{
        FB.push('userFeedback/'+FB.auth.uid, {
          message: $scope.input.feedback,
          user: FB.userData.username,
          email: FB.userData.email == undefined ? 'anonymous' : FB.userData.email
        });
        ionicToast.show('Thanks!', 'bottom', false, 4000);
        $scope.input.feedback = "";
      }
    }
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
          user: FB.userData.displayName,
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
    $scope.user = 'nil';
    
    $scope.userData = null;
    
    $scope.input = {notifications : FB.isMsgEnabled()};
    
    $scope.$on('loggedIn', function(event) {
      console.log('logged in');
      $scope.user = FB.getAuthData();
      $scope.userData = FB.getUserData();
      console.log("Auth Data",$scope.user);
      ionicToast.show('Logged in as '+$scope.user.displayName, 'bottom', false, 3000);
    });
    
    $scope.$on('noAuth', function(event) {
      console.log('not logged in');
      $scope.user = null;
    });
    
    $scope.logout = function(){
      FB.logout();
      ionicToast.show('Logged Out!', 'bottom', false, 4000);
      $scope.user = null;
    };
    
    $scope.toggleNotifications = () => {
      if($scope.input.notifications){
        FB.enableMessaging(
          ()=>{
            console.log('notifications enabled');
          },
          ()=>{
            console.log('notifications not supported');
            $scope.input.notifications = false;
          }
        );
      }else{
        FB.deleteToken();
      }
    };
    
    $scope.LoginWithFacebook = function(){
      FB.FBlogin();
    };
    
  });
