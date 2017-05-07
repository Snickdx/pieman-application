//TODO: Pietime background sync to update pietime on reconnect and queue pietime update and notify upon send
//TODO: Schedule notification in background
//TODO: Proper Caching with sw-precache
//TODO: Show Updated Version and install (sw-fetch)

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
      Caching
    ) {
      $scope.pietime = {};
      
      $scope.loggedIn = $localStorage.loggedIn != undefined;
      
      $scope.modal = {};
      
      $scope.serverTime = Database.getObject('/time');
      
      $scope.passcode = null;
      
      $scope.output = {
        offset: null,
        countdown : null,
        state: null,
        loading: true
      };
      
      $scope.input = {
        notifications : Messaging.isEnabled(),
        passcode : null
      };
      
      Caching.retrieve(
        'pietime',
        data => {
          $scope.pietime = data;
          $scope.output.loading = false;
          console.log('Loaded from cache');
        },
        ()=>{
          console.log('No cache present')
        }
      );
      
      
      Database.getObject('/pietime').$loaded().then(data=>{
        $scope.output.loading = false;
        Database.getTime(()=>{
          $scope.serverTime.$loaded().then((time)=>{
            $localStorage.offset = moment().diff(time.$value);
            $scope.pietime = data;
            $interval(()=>{
              $scope.updateState();
            }, 1000);
          });
        });
        Caching.cacheData('pietime', {"arrive":data.arrive, "depart":data.depart});
      });
      
      Messaging.onMessage(payload=>{
        ionicToast.show(payload.notification.title+" : "+payload.notification.body, 'bottom', false, 4000);
      });
      
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
        
      };
      
      $scope.toggleNotifications = () => {
    
        if($scope.input.notifications){
      
          Messaging.enableMessaging(
            token =>{
              console.log('Token Created', token);
          
              Messaging.subscribeToTopic(token, "pieman", response =>{
                Database.set(`subscriptions/pieman/${token}`, true);
                console.log('subscribed to pieman notifications', response);
                ionicToast.show("Notifications Enabled!", 'bottom', false, 2000);
            
              });
          
            },
            () =>{
              console.log('got error from service');
              ionicToast.show("Error Enabling Notifications", 'bottom', false, 2000);
            }
          );
        }else{
          console.log('disabling notifications');
          Messaging.disableMessaging(oldToken=>{
            Database.set(`subscriptions/pieman/${oldToken}`, null);
          });
          ionicToast.show("Notifications Disabled!", 'bottom', false, 2000);
        }
    
      };
      
      $scope.pretty = (time) => {
        return moment(time).format(' DD MMM YYYY hh:mm:ss A');
      };
      
   
      
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
        Database.get('/passcode').then(code => {
          if(code == passcode){
            console.log('logged in');
            $scope.loggedIn = true;
            $localStorage.loggedIn = true;
          }else{
            console.log('login failed', code == passcode, code, passcode);
          }
          $scope.modal.hide();
        });
        
      };
  
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
      
    }]);
  
