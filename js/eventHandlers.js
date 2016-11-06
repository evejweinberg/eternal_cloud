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
  window.open('https://itp-eve.herokuapp.com/pre-profile', 700,700)
});

window.addEventListener('resize', onResize, true);
