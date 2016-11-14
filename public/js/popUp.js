
var audioCtx = new AudioContext();
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();





function AssessingValue(){
  console.log('we are now assessing your score')

}

function popUp(name,widthmove,heightmove) {


  var volume = audioCtx.createGain();
  var oscillator = audioCtx.createOscillator();
  volume.connect(audioCtx.destination);
  oscillator.connect(audioCtx.destination);

  oscillator.type = 'sine'; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
  oscillator.frequency.value = Math.random()* 3500; // value in hertz
  oscillator.connect(volume);
  volume.gain.value=0.1;
  var myWindow;
    var index = Math.floor(2* Math.random());
    // var widthThing = (Math.random() * 350) + 30;
    // var heightThing = (Math.random() * 350) + 30;
    var widthThing = (Math.random() * 30) + 100;
    var heightThing = (Math.random() * 30) + 100;
    var bgURLS = ["url(..img/pop/fb1.jpg)", "url(..img/pop/fb2.jpg)","url(..img/pop/fb3.jpg"]

    // var bgURLS = ["url(http://evejweinberg.github.io/samples/ArrowDownwardPurpleGreen.gif)", "url(http://evejweinberg.github.io/samples/txt_blgrid.jpg)", "url(http://evejweinberg.github.io/samples/txt_pnkscrb.jpg)", "url(http://evejweinberg.github.io/samples/ArrowDownwardPink.gif)","url(http://evejweinberg.github.io/img/fb1.jpg)","url(http://evejweinberg.github.io/img/fb2.jpg)","url(http://evejweinberg.github.io/img/fb3.jpg)"]
    var bgRandom = Math.floor(Math.random() * bgURLS.length);
    myWindow = window.open("", name, "width=" + widthThing + ", " + "height=" + heightThing + "," + "left=" + widthmove+ "," +  "top=" + heightmove);
    myWindow.document.body.style["background-image"] = bgURLS[bgRandom];
    // console.log(bgURLS[bgRandom])
    setTimeout(function(){
      // oscillator.stop();
      myWindow.close()},1000)
    // oscillator.start();
    // oscillator.volume = .12;
    myWindow.document.writeln("<body><p>Login in the other screen</p>");
    myWindow.document.writeln("<\/body>");


}

function removepopUP() {
    myWindow.close();
}
