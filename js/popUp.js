
document.getElementById('login').addEventListener('click', function(){
  popUpsInterval = setInterval(popUp('window' + windowName),400)
  windowName++;
  // setTimeout(removepopUP(),7000)
})

function popUp(name) {
    var index = Math.floor(2* Math.random());
    console.log(index)
    var widthThing = (Math.random() * 550) + 30;
    var heightThing = (Math.random() * 550) + 30;
    var bgURLS = ["url(http://evejweinberg.github.io/samples/ArrowDownwardPurpleGreen.gif)", "url(http://evejweinberg.github.io/samples/txt_blgrid.jpg)", "url(http://evejweinberg.github.io/samples/txt_pnkscrb.jpg)", "url(http://evejweinberg.github.io/samples/ArrowDownwardPink.gif)","url(http://evejweinberg.github.io/img/fb1.jpg)","url(http://evejweinberg.github.io/img/fb2.jpg)","url(http://evejweinberg.github.io/img/fb3.jpg)"]
    var bgRandom = Math.floor(Math.random() * bgURLS.length + 0);
    var myWindow = window.open("", name, "width=" + widthThing + ", " + "height=" + heightThing + "," + "left=" + widthThing);
    myWindow.document.writeln("<body style = 'background-image='" +bgURLS[bgRandom]+ ">");
    myWindow.document.writeln("<\/body>");


}

function removepopUP() {
    myWindow.close();
}
