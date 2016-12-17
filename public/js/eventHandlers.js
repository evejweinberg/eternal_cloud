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


// document.getElementById('your-value').addEventListener('click', function(){
  // window.alert('your value to Eternal Cloud is '+ yourValue+ ' Login to earn value')
// })

window.addEventListener("load", function(){
  if (showingLive == false){
  secondScreen = window.open('/pre-profile', "loginScreen", "width=500,height=700,scrollbars=1,status=1")
  thirdScreen = window.open('/third', "thirdScreen", "width=500,height=700,scrollbars=1,status=1")
  }




});

window.addEventListener('resize', onResize, false);


//add form to fill out HemisphereLight
document.getElementById('login').addEventListener('click', LoginPressed)

function Scene4(data){
  scene4 = true;
  mainVidLady.material.map = textureLady4
  console.log('finished form as triggered')
  console.log(data)
  listen_to_plan = true;
    if (showingLive == false){
      secondScreen.location.href="/members"
    }
  asciiOn = false;
  switchBackfromAscii = true;

  currentVideo = video4;
  video4.play();
  $("#your-plan").fadeIn();
  //third screen add score to

}


function LoginPressed(){
  TweenMax.to('#three-scene',2,{height: 900, ease: Strong.easeInOut,onComplete: function(){
    //remove ladies
    for (i in allLadies){
      scene.remove(allLadies[i])
    }
    // console.log('clearing interval')
    // clearInterval(loginPrompt)
    asciiOn = true;
    scene3triggered = true;
    jQuery.ajax({
      url : '/api/login',
      dataType : 'json',
      type : 'POST',
      data : {
        login: 'yes',
      },
      success : function(response){
          console.log('success in telling server to login now');

          console.log(response);
      },
      error : function(err){
        // do error checking
        alert("login to 2nd screen error");
        console.error(err);
      }
    });

    secondScreen.location.href="/login"
  }
  })




  for (var i=0;i<10;i++){

    setInterval(popUp('window' + windowName,window.innerWidth-(i*80),i*80),150)
    setInterval(popUp('window' + windowName+ 'B',i*80,i*80),150)
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
  // loginPrompt = setInterval(newVidLady, 3000)
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
