//TODO: Pietime background sync
//TODO: Schedule notificaion in background
//TODO: Proper Caching with sw-precache
//TODO: Send updated pietime as data message

angular.module('app.controllers', [])
  
  .controller('piemanStatusCtrl', [
    '$scope',
    'ionicToast',
    'FB',
    '$location',
    '$interval',
    'ionicTimePicker',
    'ionicDatePicker' ,
    '$localStorage',
    '$state',
    '$ionicModal',
    function (
      $scope,
      ionicToast,
      FB,
      $location,
      $interval,
      ionicTimePicker,
      ionicDatePicker,
      $localStorage,
      $state,
      $ionicModal
    ) {
      $scope.userData = FB.getUserData();
      
      $scope.time = {};
      
      $scope.loggedIn = $localStorage.loggedIn != undefined;
      
      $scope.modal = {};
      
      $scope.passcode = null;
      
      $scope.state = null;
      
      $scope.counter = null;
      
      $scope.notifications = FB.isMsgEnabled();
      
      $scope.loading = true;
      
      $scope.doRefresh = () =>{
        FB.get('pietime').then(pietime=>{
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
        $scope.loading = false;
        console.log('Loaded from cache');
      }else{
        console.log('no cache present');
      }
      
      $scope.updateState = () => {
        
        let arrive = moment($scope.pietime.arrive);
        let depart = moment($scope.pietime.depart);
        let now = new moment();
        let toArrive = now.diff(arrive);
        let toDepart = now.diff(depart);
        
        if(arrive.isBefore(now) && depart.isAfter(now)){
          $scope.state = 'Pieman is in SAC \nLeaving in';
          $scope.countdown = moment.duration(toDepart, "milliseconds").format("d[d] h[H] : mm[M] : ss[S]");
        }else if(arrive.isBefore(now) && depart.isBefore(now)){
          $scope.state = 'Pieman has left SAC \nHe Departed';
          $scope.countdown = moment.duration(toDepart, "milliseconds").format("d[d] h[H] : mm[M] : ss[S]")+"\n Ago";
        }else if(arrive.isAfter(now) && depart.isAfter(now)){
          $scope.state = 'Pieman is coming To SAC \nin';
          $scope.countdown = moment.duration(toArrive, "milliseconds").format("d[d] h[H] : mm[M] : ss[S]");
        }
        
      };
      
      $scope.pretty = (time) => {
        return moment(time).format(' DD MMM YYYY hh:mm:ss A');
      };
      
      FB.onChange('/pietime', 'value', pietime => {
        $scope.pietime = pietime.val();
        $localStorage.pietime = JSON.stringify(pietime.val());
        console.log('Pietime updated');
        $scope.updateState();
        $scope.loading = false;
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
                        notified: false,
                        arrive: arriveTime,
                        depart: departTime
                      };
                      FB.update(`/pietime`, time);
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
        FB.get('/passcode').then(code => {
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
        if(!$scope.notifications){
          FB.enableMessaging(
            ()=>{
              console.log('notifications enabled');
              $scope.notifcations=true;
            },
            ()=>{
              console.log('notifications not supported');
            }
          );
        }else{
          FB.deleteToken();
          $scope.notifications = false;
        }
      };
      
    }]);
  
