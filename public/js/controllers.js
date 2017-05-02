//TODO: Pietime background sync remove onchange listener
//TODO: Schedule notification in background
//TODO: Proper Caching with sw-precache
//TODO: Send updated pietime as data message
//TODO: Show Updated and install

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
      $ionicModal
    ) {
      
      $scope.time = {};
      
      $scope.loggedIn = $localStorage.loggedIn != undefined;
      
      $scope.modal = {};
      
      $scope.passcode = null;
      
      $scope.output = {
        countdown : null,
        state: null,
        loading: true
      };
      
      $scope.input = {
        notifications : Messaging.isEnabled(),
        passcode : null
      };
      
      
      $scope.doRefresh = () =>{
        Database.get('pietime').then(pietime=>{
          $scope.pietime = pietime;
          $localStorage.pietime = JSON.stringify(pietime);
          $scope.updateState();
          $state.reload();
          $scope.$broadcast('scroll.refreshComplete');
          $interval(()=>{
            $scope.updateState();
          }, 1000);
        });
      };
      
      if($localStorage.pietime != undefined){
        $scope.pietime = JSON.parse($localStorage.pietime);
        $scope.output.loading = false;
        console.log('Loaded from cache');
      }else{
        console.log('no cache present');
      }
      
      Messaging.onMessage(payload=>{
        ionicToast.show(payload.notification.title+" : "+payload.notification.body, 'bottom', false, 4000);
      });
      
      $scope.updateState = () => {
        
        let arrive = moment($scope.pietime.arrive);
        let depart = moment($scope.pietime.depart);
        let now = new moment();
        let toArrive = now.diff(arrive);
        let toDepart = now.diff(depart);
        
        if(arrive.isBefore(now) && depart.isAfter(now)){
          $scope.output.state = 'Pieman is in SAC \nLeaving in';
          $scope.output.countdown = moment.duration(toDepart, "milliseconds").format("d[d] h[H] : mm[M] : ss[S]");
        }else if(arrive.isBefore(now) && depart.isBefore(now)){
          $scope.output.state = 'Pieman has left SAC \nHe Departed';
          $scope.output.countdown = moment.duration(toDepart, "milliseconds").format("d[d] h[H] : mm[M] : ss[S]")+"\n Ago";
        }else if(arrive.isAfter(now) && depart.isAfter(now)){
          $scope.output.state = 'Pieman is coming To SAC \nin';
          $scope.output.countdown = moment.duration(toArrive, "milliseconds").format("d[d] h[H] : mm[M] : ss[S]");
        }
        
      };
      
      $scope.pretty = (time) => {
        return moment(time).format(' DD MMM YYYY hh:mm:ss A');
      };
      
      Database.onChange('/pietime', 'value', pietime => {
        $scope.pietime = pietime.val();
        $localStorage.pietime = JSON.stringify(pietime.val());
        console.log('Pietime updated');
        $scope.updateState();
        $scope.output.loading = false;
        $scope.doRefresh();
        
      });
      
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
                      let time = {
                        arrive: arriveTime,
                        depart: departTime
                      };
                      Database.update(`/pietime`, time);
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
      }).
      then(function(modal) {
        $scope.modal = modal;
      });
  
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
      
    }]);
  
