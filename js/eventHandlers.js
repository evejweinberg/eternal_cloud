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
  secondScreen = window.open('https://itp-eve.herokuapp.com/pre-profile', "loginScreen", "width=300,height=700")
  console.log(secondScreen)
});

window.addEventListener('resize', onResize, true);


//add form to fill out HemisphereLight
document.getElementById('login').addEventListener('click', LoginPressed)


function LoginPressed(){
  asciiOn = true;
  document.getElementById('access-score').style.display = 'block';
  document.body.style.backgroundColor = "black";

  secondScreen.location.href="https://itp-eve.herokuapp.com/login"
  //switdch to ascii shaders
//change this URL to be
  // https://itp-eve.herokuapp.com/pre-profile
  //https://itp-eve.herokuapp.com/login

  // console.log('was login pressed already??')
  for (var i=0;i<16;i++){

    setInterval(popUp('window' + windowName,window.innerWidth-(i*50),i*50),200)
    setInterval(popUp('window' + windowName+ 'B',i*50,i*50),200)
    // console.log()
    windowName++;
  }
}
