var dotCol = ["#eedfcc","#6495ed","#64daed","#7864ed","#ed7764","#FFC0CB","FFBFEA"]

    function mDown(obj) {
  obj.src='../img/fb1.png';
    var color = Math.floor(Math.random()*255-30)
    console.log(color)
    var thing = "hsb("+color+"," +color+",100)"

    startExperience()
}

function mUp(obj) {
  obj.src='../img/fb2.png';
}

function mOver(obj) {
  obj.src='../img/fb1.png';
}

function mOut(obj) {
  obj.src='../img/fb2.png';
}

var i = 0
var colors= [ "#10e88a","#7f3995",
"#0d78e7","#f88f18","#bb6774"]



function   startExperience() {
  console.log('fb joke was hit')
  // document.getElementById('make-diff').style.display = "block"
  i++
  var endingHeight = 5;
  var pos=Math.random()*(300-100)+100
  var neg = Math.random()*(-100+300)-300
  var affirmations = ["You're a good person", "Your friends will see this","People you agree with will also 'like' this","You're doing the right thing", "You make good choices", "Good Job", "You're a role model", "You are a good citizen", "You should feel great about yourself", "Your community needed that!", "We really needed that 'like'", "That 'like' helped ALOT", "You made a difference", "Your Mom must be so proud", "Good Job", "We could not do this without you"]
  var one = document.getElementById('affirmation')
  var button = document.getElementById('fb-joke-button')
  var like = document.getElementById('click-number')

  one.innerHTML = affirmations[Math.floor(Math.random()*affirmations.length)]+ '!'

  TweenMax.fromTo(document.getElementById('dot1'),1, {y: 00, x:00, width: 40,height:40, opacity:100},{
    y: Math.random()*(300-100)+100, x:Math.random()*(-100+300)-300, width: endingHeight,height:endingHeight, opacity:0,ease: Strong.easeOut
  })
  TweenMax.fromTo(document.getElementById('dot2'),1, {y: 00, x:00, width: 40,height:40, opacity:100},{
    y: Math.random()*(-100+300)-300, x:Math.random()*(300-100)+100, width: endingHeight,height:endingHeight, opacity:0,ease: Strong.easeOut
  })
  TweenMax.fromTo(document.getElementById('dot3'),1, {y: 00, x:00, width: 40,height:40, opacity:100},{
    y: Math.random()*(300-100)+100, x:Math.random()*(300-100)+100, width: endingHeight,height:endingHeight, opacity:0,ease: Strong.easeOut
  })
  TweenMax.fromTo(document.getElementById('dot4'),1, {y: 00, x:00, width: 40,height:40, opacity:100},{
    y: Math.random()*(-100+300)-300, x:Math.random()*(-100+300)-300, width: endingHeight,height:endingHeight, opacity:0,ease: Strong.easeOut
  })
  TweenMax.fromTo(document.getElementById('dot5'),1, {y: 00, x:00, width: 40,height:40, opacity:100},{
    y: Math.random()*(300-100)+100, x:Math.random()*(300-100)+100, width: endingHeight,height:endingHeight, opacity:0,ease: Strong.easeOut
  })
  TweenMax.fromTo(document.getElementById('dot6'),1, {y: 00, x:00, width: 40,height:40, opacity:100},{
    y: Math.random()*(-100+300)-300, x:Math.random()*(-100+300)-300, width: endingHeight,height:endingHeight, opacity:0,ease: Strong.easeOut
  })
  TweenMax.fromTo(document.getElementById('dot7'),1, {y: 00, x:00, width: 40,height:40, opacity:100},{
    y: Math.random()*(300-100)+100, x:Math.random()*(-100+300)-300, width: endingHeight,height:endingHeight, opacity:0,ease: Strong.easeOut
  })
  TweenMax.from(one,.6,{y: 100, opacity:0,ease:Strong.easeInOut
})
TweenMax.from(button,.6, {
  y: 10,ease: Strong.easeInOut, yoyo:true
})
TweenMax.from(like,.6, {
  y: 10,ease: Strong.easeInOut, yoyo:true
})



like.innerHTML = i + ' LIKES'
document.getElementById('dot1').style.backgroundColor = dotCol[Math.floor(Math.random()*dotCol.length)]
document.getElementById('dot2').style.backgroundColor = dotCol[Math.floor(Math.random()*dotCol.length)]
document.getElementById('dot3').style.backgroundColor = dotCol[Math.floor(Math.random()*dotCol.length)]
document.getElementById('dot4').style.backgroundColor = dotCol[Math.floor(Math.random()*dotCol.length)]
document.getElementById('dot5').style.backgroundColor = dotCol[Math.floor(Math.random()*dotCol.length)]
document.getElementById('dot6').style.backgroundColor = dotCol[Math.floor(Math.random()*dotCol.length)]
document.getElementById('dot7').style.backgroundColor = dotCol[Math.floor(Math.random()*dotCol.length)]



//commentt this out??
jQuery.ajax({
  url : '/api/update/'+personId,
  dataType : 'json',
  type : 'POST',
  // we send the data in a data object (with key/value pairs)
  data : {
    like: 1,
    personId:personId
      },
  success : function(response){
      console.log('success in posting percentage')
      console.log(response);
  },
  error : function(err){
    alert("backend response: something went wrong from backend when hitting like");
    console.error(err);
  }
});


} //end of function
