if(jQuery){
  console.log("jquery")
}


function enterEC(){

console.log('entering')
scene1Transition = true;


changeScene(currentScene)
}




document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            console.log('left');
            changeScene(currentScene -1)
            break;
        case 39:
            console.log('right');
            changeScene(currentScene +1)
            break;
        case 40:
            console.log('pause audio')
            document.getElementById('frames-audio').pause();
            break;
        case 38:
            console.log('play audio')
            document.getElementById('frames-audio').play();
            break;
    }
};




function changeScene(num){
  if (num <=0){
    num = 0
  }
  currentScene = num;
  frames = document.getElementById('frames');
  frames.src= images[num];
  $("#frames").show()
  if (typeof audio[num] === 'string'){

    $("#frames-audio").attr('src', audio[num])
    document.getElementById('frames-audio').play();
  } else {
    console.log('no audio for this scene')
  }

}
