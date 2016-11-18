// document.getElementById("button-first").


function mDown(obj) {
    obj.style.backgroundColor = pink;
    obj.innerHTML = "Release Me";
    startExperience()
}

function mUp(obj) {
    obj.style.backgroundColor = pink;
    obj.innerHTML = "DESCEND";
      obj.style.fontSize = "18px";
}

function mOver(obj) {
    obj.style.backgroundColor=purple;
    obj.innerHTML="YOU HAVE NO CHOICE";
    obj.style.fontSize = "10px";
}

function mOut(obj) {
    obj.style.backgroundColor=purple;
    obj.innerHTML="EXPLORE";
    obj.style.fontSize = "18px";
}


document.getElementById('your-value').addEventListener('click', function(){
  window.alert('your value to Eternal Cloud is '+ yourValue+ ' Login to earn value')
})

window.addEventListener("load", function(){
  secondScreen = window.open('/pre-profile', "loginScreen", "width=300,height=700,scrollbars=1,status=1")
  thirdScreen = window.open('/third', "thirdScreen", "width=500,height=300,scrollbars=1,status=1")

//   setTimeout( function() {
//    if(!secondScreen || secondScreen.outerHeight === 0) {
//        //First Checking Condition Works For IE & Firefox
//        //Second Checking Condition Works For Chrome
//        alert("Popup Blocker is enabled! Please add this site to your exception list and REFRESH THE SITE");
//         // window.location.href = 'warning.html';
//    }
// }, 225);

});

window.addEventListener('resize', onResize, true);


//add form to fill out HemisphereLight
document.getElementById('login').addEventListener('click', LoginPressed)


function LoginPressed(){
  TweenMax.to('#three-scene',2,{height: 900, ease: Strong.easeInOut,onComplete: function(){
    //remove ladies
    for (i in allLadies){
      scene.remove(allLadies[i])
    }
    console.log('clearing interval')
    clearInterval(loginPrompt)
    asciiOn = true;
    scene3triggered = true;

    document.getElementById('access-score').style.display = 'block';
    document.body.style.backgroundColor = "black";

    // thirdScreen.location.href="/candidate-solo"
    secondScreen.location.href="/login"
  }
  })



//change this URL to be
  // https://itp-eve.herokuapp.com/pre-profile
  //https://itp-eve.herokuapp.com/login

  // console.log('was login pressed already??')
  for (var i=0;i<10;i++){

    setInterval(popUp('window' + windowName,window.innerWidth-(i*80),i*80),150)
    setInterval(popUp('window' + windowName+ 'B',i*80,i*80),150)
    // console.log()
    windowName++;
  }
}



function Login(){
  document.getElementById('login').style.display = "block";
  currentVideo = video2;

}

function ThirdScene(){
  currentVideo = video3;
  scene.remove(mainVidLady)
  mainVidLady.material.map = textureLady3
  scene.add(mainVidLady)
  TweenMax.to(mainVidLady.rotation,4,{y:360})
  video3.play()
  loginPrompt = setInterval(newVidLady, 3000)
}

function startExperience(){
    currentVideo = video1;
  //show login button
  // document.getElementById('login').style.display = "block";
  //turn first video on
  playFirstvideo = true;
  // tween top of 3js scene down
  TweenMax.to('#three-scene',2,{top: 80, ease: Strong.easeInOut})
  video1.play()
  TweenMax.to("#logo",2,{width:"11%", ease: Strong.easeInOut})
    //allow animation loop to tween camera
  first_descend = true;
  //move tagline out of the way -- up, and fade out
  var tagline = document.getElementById('tagline-holder')
  TweenMax.to(tagline, 9, {opacity: 0,y: -500,ease: Expo.easeOut})
  TweenMax.to(camera.parent.rotation,2,{x:0})
  //turn on instructions below 3jd scene
  document.getElementById('walking-instructions').style.display = "block";
}


$(document).mousemove(function(e){
  if (followcursor){

    $("#image-cursor").css({left:e.pageX, top:e.pageY});
    $("#image-cursor").show()
  }
});
