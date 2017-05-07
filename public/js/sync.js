self.addEventListener('sync', function (event) {
  console.log('sync event fired');
  if (event.tag === 'pietime-fetch') {
    event.waitUntil(getPieData()
      .then(snapshot => {
        localforage.setItem('pietime', snapshot.val());
        localforage.setItem('background', Date.now());
        console.log("cache updated");
        // registration.showNotification("Updated Pietime", {
        //   icon: "img/pieman.png",
        //   body: "Time Has Been Updated"
        // });
      })
      .catch(error =>{
        console.log('Request failed', error);
      }));
  }
});

let getPieData = ()=> {
  if(navigator.onLine){
    return db.ref('/pietime').once("value")
  }
};




