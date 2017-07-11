//TODO: Background sync to update cache on reconnect and queue pietime update and notify upon send
//TODO: local notification in background when pietime == current time
//TODO: Caching with sw-precache
//TODO: Detect when update is available
//TODO: ping pieman cloud function
//TODO: Share Button

angular.module('app.controllers', [])
  
  .controller('piemanStatusCtrl', [
    '$scope',
    'ionicToast',
    'Database',
    'Messaging',
    '$interval',
    'ionicTimePicker',
    'ionicDatePicker' ,
    '$localStorage',
    '$state',
    '$ionicModal',
    'Caching',
    '$timeout',
    'ServiceWorker',
    function (
      $scope,
      ionicToast,
      Database,
      Messaging,
      $interval,
      ionicTimePicker,
      ionicDatePicker,
      $localStorage,
      $state,
      $ionicModal,
      Caching,
      $timeout,
      ServiceWorker
    ) {
      $scope.pietime = {};
      
      $scope.modal = {};
      
      $scope.output = {
        loggedIn: $localStorage.loggedIn != undefined,
        update: ServiceWorker.isOutdated(),
        offset: null,
        countdown : null,
        state: null,
        loading: true,
        clock: false,
        cache: false,
        online: false,
        lastonline: null,
        pinged: $localStorage.pinged != undefined
      };
      
      $scope.input = {
        notifications : Messaging.isEnabled(),
        passcode : null,
      };
      
      
      //********************************** Call Services **************************************
      
      Caching.retrieve(
        'pietime',
        data => {
          if(data != null){
            $scope.pietime = data;
            console.log('Loaded from cache', data);
            $scope.startClock();
            $scope.output.clock = true;
            $scope.output.cache = true;
          }else{
            console.log('No cache present')
          }
          
        },
        err =>{
          console.log(err);
        }
      );
      
      
      Database.onConChange(connected => {
        if(connected){
          $scope.output.online = true;
          if($localStorage.loggedIn != undefined)Database.set('/lastonline', {localtime: Date.now(), servertime: Database.getTimeRef()});
          Database.getObject('/lastonline').$loaded().then(data => {
            $scope.output.lastonline = data.servertime;
          });
          Database.getObject('/pietime').$loaded().then(data=>{
            Database.getTimeOffset(offset=>{
              $localStorage.offset = offset;
              $scope.pietime = data;
              if(!$scope.output.clock)$scope.startClock();
            });
            Caching.cacheData('pietime', {"arrive":data.arrive, "depart":data.depart});
          });
        }else{
          $scope.output.online = false;
          
          $timeout(()=>{
            if(!$scope.output.cache){
              $scope.output.state = 'Please Connect To the Internet';
              $scope.output.loading = false;
            }
          }, 3000);
        }
      });
      
      Messaging.onMessage(payload=>{
        ionicToast.show(payload.notification.title+" : "+payload.notification.body, 'bottom', false, 4000);
      });
      
      $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });
      
      $ionicModal.fromTemplateUrl('templates/modal2.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal2 = modal;
      });
      
      //**********************************Scope Functions **************************************
      
      $scope.pingObj = Database.getObject('/ping');
      
      $scope.pingObj.$bindTo($scope, "pingObj");
      
      $scope.ping = () => {
        $localStorage.pinged = Date.now();
        $scope.output.pinged = true;
        $scope.pingObj.count++;
        ionicToast.show("Ping Sent! You can send another in 1 hour", 'bottom', false, 2000);
      };
      
      $scope.updateApp = () =>{
        ServiceWorker.update();
      };
      
      $scope.startClock = ()=>{
        $interval(()=>{
          $scope.updateState();
        }, 1000);
      };
      
      $scope.updateState = () => {
        
        let arrive = moment($scope.pietime.arrive).add($localStorage.offset, 'ms');
        let depart = moment($scope.pietime.depart).add($localStorage.offset, 'ms');
        let now = new moment();
        let toArrive = now.diff(arrive);
        let toDepart = now.diff(depart);
        
        if(arrive.isBefore(now) && depart.isAfter(now)){
          $scope.output.state = 'Pieman is in SAC, \nLeaving in';
          $scope.output.countdown = moment.duration(toDepart, "milliseconds").format("d[d] h[H] : mm[M] : ss[S]");
        }else if(arrive.isBefore(now) && depart.isBefore(now)){
          $scope.output.state = 'Pieman has left SAC, \nHe Departed';
          $scope.output.countdown = moment.duration(toDepart, "milliseconds").format("d[d] h[H] : mm[M] : ss[S]")+"\n Ago";
        }else if(arrive.isAfter(now) && depart.isAfter(now)){
          $scope.output.state = 'Pieman is coming To SAC \nin';
          $scope.output.countdown = moment.duration(toArrive, "milliseconds").format("d[d] h[H] : mm[M] : ss[S]");
        }
        
        if($localStorage.pinged != undefined){
          let lastping = moment($localStorage.pinged);
          let duration = moment.duration(now.diff(lastping)).asHours();
          $scope.output.pinged =  duration < 1 ;
        }
        
        $scope.output.loading = false;
        
      };
      
      $scope.toggleNotifications = () => {
        
        if($scope.input.notifications){
          console.log('enabling notifications');
          $scope.output.loading = true;
          Messaging.enableMessaging(
            token =>{
              console.log('Token Created', token);
              Messaging.subscribeToTopic(token, "pieman", response =>{
                Database.set(`subscriptions/pieman/${token}`, true);
                console.log('subscribed to pieman notifications', response);
                $scope.output.loading = false;
                ionicToast.show("Notifications Enabled!", 'bottom', false, 2000);
              });
              
            },
            () =>{
              console.log('got error from service');
              $scope.output.loading = false;
              $scope.input.notifications = false;
              ionicToast.show("Error Enabling Notifications", 'bottom', false, 2000);
            }
          );
        }else{
          console.log('disabling notifications');
          Messaging.disableMessaging(oldToken=>{
            Database.set(`subscriptions/pieman/${oldToken}`, null);
            ionicToast.show("Notifications Disabled!", 'bottom', false, 2000);
          });
          
        }
        
      };
      
      $scope.pretty = (time) => {
        return moment(time).format(' DD MMM YYYY hh:mm:ss A');
      };
      
      $scope.updateTime = () => {
        
        ionicDatePicker.openDatePicker({
          callback: function (newDate) {
            
            setTime(newDate, arriveTime => {
              ionicToast.show('Set Departure Time', 'top', false, 1000);
              ionicDatePicker.openDatePicker({
                callback: function (newDate) {
                  setTime(newDate, departTime => {
                    if(moment(arriveTime).isAfter(moment(departTime))){
                      console.log('Error: Arrival cannot be after departure');
                      ionicToast.show('Error: Arrival cannot be after departure', 'bottom', false, 3000);
                    }else{
                      $scope.pietime.arrive = arriveTime;
                      $scope.pietime.depart = departTime;
                      $scope.modal2.show();
                    }
                  });
                },
                templateType: 'modal'
              });
            });
            
            ionicToast.show('Set Arrival Time', 'top', false, 1000);
          },
          templateType: 'modal'
        });
        
      };
      
      $scope.send = () => {
        let time = {
          arrive: $scope.pietime.arrive,
          depart: $scope.pietime.depart
        };
        Database.update(`/pietime`, time);
        $scope.modal2.hide();
      };
      
      $scope.login = (passcode) => {
        Database.get('/passcode', snapshot => {
          let code = snapshot.val();
          if(code == passcode){
            console.log('logged in');
            $scope.output.loggedIn = true;
            $localStorage.loggedIn = true;
            $scope.output.loading = true;
            Messaging.enableMessaging(
              token =>{
                console.log('Token Created', token);
                Database.set(`/piemanToken/${token}`, true);
                $scope.output.loading = false;
                ionicToast.show("Notifications Enabled!", 'bottom', false, 2000);
              },
              () =>{
                console.log('got error from service');
                $scope.output.loading = false;
                ionicToast.show("Error Enabling Notifications", 'bottom', false, 2000);
              }
            );
            Database.set('/lastonline', {localtime: Date.now(), servertime: Database.getTimeRef()});
          }else{
            console.log('login failed', code == passcode, code, passcode);
            ionicToast.show("Login Failed, you sure you is Pieman?", 'bottom', false, 4000);
          }
          $scope.modal.hide();
        });
        
      };
      
      $scope.noteTest = () => {
        ServiceWorker.showNotification({});
      };
      
      $scope.syncTest = () => {
        ServiceWorker.sync('pietime-fetch2', () =>{
          console.log("I think we cooking with ting here");
        });
      };
      
      //************************************* Helper Functions ***********************************
      
      function setTime(newDate, callback){
        ionicTimePicker.openTimePicker({
          callback: function (newTime) {
            if (typeof (newTime) === 'undefined') {
              console.log('Time not selected');
            } else {
              callback(moment(newDate) + new Date(newTime)*1000);
            }
          },
          format: 12,
          step: 1
        });
      }
      
    }]);
  
