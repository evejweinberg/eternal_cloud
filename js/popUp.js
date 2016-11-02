function popUp() {
    var index = Math.floor(2* Math.random());
    var widthThing = (Math.random() * 250) + 30;
    var heightThing = (Math.random() * 250) + 30;
    var bgURLS = ["url(http://evejweinberg.github.io/samples/ArrowDownwardPurpleGreen.gif)", "url(http://evejweinberg.github.io/samples/txt_blgrid.jpg)", "url(http://evejweinberg.github.io/samples/txt_pnkscrb.jpg)", "url(http://evejweinberg.github.io/samples/ArrowDownwardPink.gif)"]
    var bgRandom = Math.floor(Math.random() * bgURLS.length + 0);
    // "background-image": bgURLS[bgRandom] }
    myWindow = window.open("http://evejweinberg.com", "myWindow", "width=" + widthThing + ", " + "height=" + heightThing + "," + "left=" + widthThing);
    console.log(TifforMir);
    if (newsentence.length<130)
    {if (TifforMir == 0) {
            myWindow.document.write("<p>Tiffany</p>")
        } else {
            myWindow.document.write("<p>Miranda</p>")
        }} else{
            myWindow.document.write("<p id='lrgType'>??????????????????</p>")
        }
    myWindow.document.writeln("<body bgcolor='yellow'>");
    // myWindow.document.writeln("<body style = 'background-image=bgURLS[bgRandom]'' >");
    myWindow.document.writeln("<\/body>");
    // myWindow.document.body
    // window.open("http://evejweinberg.com",_blank,height=100);
}

function removepopUP() {
    myWindow.close();
}
