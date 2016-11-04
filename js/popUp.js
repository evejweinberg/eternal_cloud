
document.getElementById('login').addEventListener('click', function(){
  for (var i=0;i<10;i++){

    setInterval(popUp('window' + windowName,window.innerWidth-(i*50),i*50),400)
    setInterval(popUp('window' + windowName+ 'B',i*50,i*50),400)
    windowName++;
  }
  // setTimeout(removepopUP(),7000)
})

function popUp(name,widthmove,heightmove) {

  var oscillator = audioCtx.createOscillator();
  oscillator.connect(audioCtx.destination);
  oscillator.type = 'sine'; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
  oscillator.frequency.value = Math.random()* 3500; // value in hertz
    var index = Math.floor(2* Math.random());
    // var widthThing = (Math.random() * 350) + 30;
    // var heightThing = (Math.random() * 350) + 30;
    var widthThing = (Math.random() * 30) + 100;
    var heightThing = (Math.random() * 30) + 100;
    var bgURLS = ["url(http://evejweinberg.github.io/samples/ArrowDownwardPurpleGreen.gif)", "url(http://evejweinberg.github.io/samples/txt_blgrid.jpg)", "url(http://evejweinberg.github.io/samples/txt_pnkscrb.jpg)", "url(http://evejweinberg.github.io/samples/ArrowDownwardPink.gif)","url(http://evejweinberg.github.io/img/fb1.jpg)","url(http://evejweinberg.github.io/img/fb2.jpg)","url(http://evejweinberg.github.io/img/fb3.jpg)"]
    var bgRandom = Math.floor(Math.random() * bgURLS.length);
    var myWindow = window.open("", name, "width=" + widthThing + ", " + "height=" + heightThing + "," + "left=" + widthmove+ "," +  "top=" + heightmove);
    myWindow.document.body.style.backgroundImage = bgURLS[bgRandom];
    console.log(bgURLS[bgRandom])
    setTimeout(function(){myWindow.close();oscillator.stop();},1000)
    oscillator.start();
    // myWindow.document.writeln("<body style = 'background-image='" +bgURLS[bgRandom]+ ">");
    // myWindow.document.writeln("<\/body>");


}

function removepopUP() {
    myWindow.close();
}

var audioCtx = new AudioContext();
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
