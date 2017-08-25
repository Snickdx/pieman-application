self.addEventListener('sync', function (event) {
  console.log('sync event triggered');
  if (event.tag === 'pie-fetch') {
    event.waitUntil(getPieTime());
  }
});

let getPieTime = () => {
  fetch("https://pieman-d47da.firebaseio.com/pietime.json").then(response => {
    response.json().then(data => {
      console.log(data);
    })
  })
};

let getPieData = ()=> {
  if(navigator.onLine){
    db.ref('/pietime').once("value")
      .then(snapshot=>{
        localforage.setItem('pietime', snapshot.val());
        localforage.setItem('background', Date.now());
        console.log("cache updated");
        registration.showNotification("Updated Pietime", {
          icon: "img/pieman.png",
          body: "Time Has Been Updated"
        });
      })
      .catch(error =>{
        console.log('Request failed', error);
      });
  }
};




