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

// if(mm<10) {
//     mm='0'+mm
// }

today = monthNames[mm]+', '+dd+', '+yyyy;

document.getElementById('date').innerHTML = today
var tickup = setInterval(function(){

  document.getElementById('date').innerHTML = monthNames[mm]+', '+dd+', '+ goUp
  goUp ++
  if (goUp == 2045){
    clearInterval(tickup)
    document.getElementById('date').innerHTML = monthNames[mm]+', '+dd+', '+ 2045

  }
},300)
// document.write(today);
console.log(today)
