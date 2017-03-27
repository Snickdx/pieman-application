angular.module('app.controllers', [])
  
  .controller('piemanStatusCtrl', [
    '$scope',
    'ionicToast',
    'FB',
    '$location',
    '$timeout',
    'ionicTimePicker',
    'ionicDatePicker' ,
    '$localStorage',
    '$state',
    function (
      $scope,
      ionicToast,
      FB,
      $location,
      $timeout,
      ionicTimePicker,
      ionicDatePicker,
      $localStorage,
      $state
    ) {
      $scope.userData = FB.getUserData();
      
      $scope.$on('loggedIn', function() {
        $scope.userData = FB.getUserData();
      });
      
      $scope.$on('noAuth', function() {
        $scope.userData = null;
      });
      
      $scope.time = {};
      
      $scope.state = null;
      
      $scope.loading = true;
      
      $scope.doRefresh = ()=>{
        FB.get('pietime').then(pietime=>{
          $scope.pietime = pietime;
          $localStorage.pietime = JSON.stringify(pietime);
          $scope.updateState();
          $state.reload();
          $scope.$broadcast('scroll.refreshComplete');
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
        let duration= 0;
        let countdown = null;
        
        if(arrive.isBefore(now) && depart.isAfter(now)){
          $scope.state = 'In SAC';
          duration = depart.diff(now, 'seconds');
          countdown = true;
        }else if(arrive.isBefore(now) && depart.isBefore(now)){
          $scope.state = 'Left SAC';
          duration = now.diff(depart, 'seconds');
          countdown = false;
        }else if(arrive.isAfter(now) && depart.isAfter(now)){
          $scope.state = 'Coming To SAC';
          duration = arrive.diff(now, 'seconds');
          countdown = true;
        }
        
        console.log($scope.state, duration);
        console.log($scope.pretty(arrive));
        console.log($scope.pretty(depart));
        console.log($scope.pretty(now));
        $scope.setTimer(duration, countdown);
        
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
      
      $scope.setTimer = (duration, countdown) => {
        
        // $('.clock').FlipClock( duration, {
        //   countdown: countdown,
        //   callbacks: {
        //     interval: ()=>{
        //       if(countdown){
        //         duration--;
        //         if(duration == 0){
        //           console.log('duration hit 0');
        //           $scope.loading = true;
        //           $timeout(()=>{
        //             console.log('countdown finished');
        //             $scope.updateState();
        //             $scope.loading = false;
        //           }, 3000);
        //         }
        //       }
        //     }
        //   }
        // });
        
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
      
      $scope.setTime = () => {
        
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
      
    }]);
  
