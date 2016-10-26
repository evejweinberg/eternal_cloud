var today = new Date();
var dd = today.getDate();
var mm = today.getMonth(); //January is 0!
var yyyy = today.getFullYear();
var goUp = today.getFullYear()


var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

document.write("The current month is " + monthNames[mm]);

if(dd<10) {
    dd='0'+dd
}


today = '<mark>' +monthNames[mm]+' '+dd+', '+yyyy + + '</mark>';

document.getElementById('date').innerHTML = today
var tickup = setInterval(function(){

  document.getElementById('date').innerHTML = '<mark>' + monthNames[mm]+' '+dd+', '+ goUp + '</mark>'
  goUp ++
  if (goUp == 2045){
    clearInterval(tickup)
    document.getElementById('date').innerHTML = '<mark>' + monthNames[mm]+' '+dd+', '+ 2045 + '</mark>'

  }
},300)
// document.write(today);
// console.log(today)


document.getElementById("enter-button").addEventListener("click", enterEC);
