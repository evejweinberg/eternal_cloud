$.ajax({
  url: '/getKey',
  method: 'get',
})
.done(function(data){

  makePusher(data)
})
.fail(function(err){
  console.log(err)
})

//If a channel has been subscribed to already it is possible to access channels by name,
//through the pusher.channel function:
//The name of the channel to retrieve
function makePusher(key){
var pusherFront = new Pusher(key);

// //subscribe and unsubscribe from channels at any time.
//create a channel from nothing like this.
//events are past tense "thing was created"
var channel1 = pusherFront.subscribe("channelName");
var channel2 = pusherFront.subscribe("photoTakenCh");
var channel3 = pusherFront.subscribe("doneChannel");



//events are published to channels.
//all events on a channel are pushed to all subscribers of that channel
//use channels to filter
//bind with a callback;
channel1.bind('addedInfo',
  function(data) {
    // add new price into the APPL widget
    console.log('binding "addedInfo" to channel1. data:');
    console.log(data);

    if(data.philanthropy != undefined){
      //make an algorithm for score
      var philGB = data.philanthropy*1.3;
    document.getElementById("access-1-score").innerHTML = data.philanthropy+ '%';
    document.getElementById("access-1-gb").innerHTML = philGB;

    }

    if(data.career != undefined){
      console.log(data.career)
      document.getElementById("access-2-score").innerHTML = data.career;
      if (data.career == 'yes'){
        document.getElementById("access-2-gb").innerHTML = -88;

      } else {
        document.getElementById("access-2-gb").innerHTML = 66;

      }
    }

    if(data.intelligence != undefined){
      console.log(data.intelligence)
      document.getElementById("access-3-score").innerHTML = data.intelligence;
      document.getElementById("access-2-gb").innerHTML = Math.floor(Math.random()*300);
    }

    if(data.activism != undefined){
      console.log(data.activism)
      document.getElementById("access-4-gb").innerHTML = 43;

      document.getElementById("access-4-score").innerHTML = data.activism;
    } else {
      document.getElementById("access-4-score").innerHTML = '🙈 🙉 🙊';

    }
    //tally up score
    //post score to the server
    document.getElementById("hc-total").innerHTML = parseInt(document.getElementById("access-2-gb").innerHTML) + parseInt(document.getElementById("access-1-gb").innerHTML)+parseInt(document.getElementById("access-3-gb").innerHTML)+parseInt(document.getElementById("access-4-gb").innerHTML)


  })

  channel2.bind("finishedForm",Scene4)



  channel2.bind('photoTaken',function(data){
    console.log('photo was taken')
    thirdScreen.location.href="/candidate-solo"

  })

}
//bind an event to this channel
