TweenMax.to(document.getElementById('about-side-info'),3,{right:0,ease:Expo.easeOut})


function mDown(obj) {
    obj.style.backgroundColor = pink;
    obj.innerHTML = "Release Me";
    scene1()
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
  // secondScreen = window.open('/pre-profile', "loginScreen", "width=300,height=700,scrollbars=1,status=1")
  // thirdScreen = window.open('/third', "thirdScreen", "width=500,height=300,scrollbars=1,status=1")
  document.getElementById('date').innerHTML = today
    // pull out the desiredSection that we've printed to the page
    // this will be {{desiredSection}} above
    var desiredSection = document.getElementById('hiddenDiv').innerHTML;

    // send the user to that div, look at the URL in the window
    location.hash = "#" + desiredSection;



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
document.getElementById('login').addEventListener('click', SceneThree)

function Scene4(data){
  scene4 = true;
  video4 = document.getElementById( 'video4' );
  console.log('finished form as triggered')
  console.log(data)
  // secondScreen.location.href="/directory"
  asciiOn = false;
  switchBackfromAscii = true;
  currentVideo = video4;
  video4.play();
  //third screen add score to

}


function SceneThree(){
  
  showSideBar()
  TweenMax.to('#three-scene',2,{height: 900, ease: Strong.easeInOut,onComplete: function(){
    //remove ladies
    for (i in allLadies){
      scene.remove(allLadies[i])
    }
    console.log('clearing interval')
    clearInterval(loginPrompt)
    // asciiOn = true;
    scene3triggered = true;

    document.getElementById('access-score').style.display = 'block';
    // document.body.style.backgroundColor = "black";

    // thirdScreen.location.href="/candidate-solo"
    // secondScreen.location.href="/login"
  }
  })

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

function scene1(){
  canvasElement.style.pointerEvents = 'all'
  var footer = document.getElementById('footer')
    currentVideo = video1;

  playFirstvideo = true;
  // tween top of 3js scene down
  TweenMax.to(footer,1,{bottom:0, ease:Strong.easeIn})
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
