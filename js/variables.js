// var enterEC;
var scene1Transition = false;
var frames;
var currentScene = 0;






function popUp() {
    var TifforMir = Math.round(Math.random());
    var widthThing = (Math.random() * 250) + 30;
    var heightThing = (Math.random() * 250) + 30;
    var bgURLS = ["url(http://evejweinberg.github.io/samples/ArrowDownwardPurpleGreen.gif)", "url(http://evejweinberg.github.io/samples/txt_blgrid.jpg)", "url(http://evejweinberg.github.io/samples/txt_pnkscrb.jpg)", "url(http://evejweinberg.github.io/samples/ArrowDownwardPink.gif)"]
    var bgRandom = Math.floor(Math.random() * bgURLS.length + 0);
    // "background-image": bgURLS[bgRandom] }
    myWindow = window.open("https://vimeo.com/106217565", "myWindow", "width=" + 600 + ", " + "height=" + 400 + "," + "left=" + widthThing);

    // myWindow.document.writeln("<body bgcolor='yellow'>");
    // myWindow.document.writeln("<body style = 'background-image=bgURLS[bgRandom]'' >");
    // myWindow.document.writeln("<\/body>");
    // myWindow.document.body
    // window.open("http://evejweinberg.com",_blank,height=100);
}

function removepopUP() {
    myWindow.close();
}
