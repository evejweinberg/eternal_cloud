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
        case 80:
            console.log('p');
            popUp()
            break;
        case 79:
            removepopUP()
            console.log('o');
            break;

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
  if (num >= images.length-1){
    num = images.length-1
  }
  currentScene = num;
  console.log('new scene NUm '+ currentScene)
  frames = document.getElementById('frames');
  // frames.src= '';
  $("#frames").show()
  frames.src= images[num];
  if (typeof audio[num] === 'string'){

    $("#frames-audio").attr('src', audio[num])
    document.getElementById('frames-audio').play();
  } else {
    console.log('no audio for this scene')
  }

}
