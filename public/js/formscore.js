var answeredQuestions = 0;
var answeredQuestionsNum = document.getElementById('num-answered');
var personId;


function anyFormSubmitted(){
  //change the front end html to show that they answered a question
  answeredQuestions ++;
  document.getElementById('num-answered').innerHTML = answeredQuestions
  personId = document.getElementById('personId').innerHTML;
}

function checkifFinished(){
if ( parseInt($("#num-answered").text()) == 12){
  console.log('12 answers')
  jQuery.ajax({
    url : '/api/done',
    dataType : 'json',
    type : 'POST',
    data : {
      done: 'yes',
      personId: personId
    },
    success : function(response){
        // success
        console.log('success in finishing 12 answers')
        console.log(response);
    },
    error : function(err){
      // why is this getting activated
      // alert("something went wrong");
      console.error(err);
    }
  });

}
}


function intelligenceSubmit(){
  var intelligence = $(".education-highest:selected").val();
  console.log(intelligence)
  anyFormSubmitted()
  $.ajax({
    url: '/api/update/'+personId,
    method: 'POST',
    data: {
      intelligence: intelligence,
    personId:personId
   },
    success: function (data) {
        console.log(data);
    },
    error: function () {
        // Uh oh, something went wrong
    }
});
checkifFinished()
}

function compostSubmit(){
  var compost = $(".compost:checked").val();
  anyFormSubmitted()
  $.ajax({
    url: '/api/update/'+personId,
    method: 'POST',
    data: {
      compost: compost,
    personId:personId
   },
    success: function (data) {
        console.log(data);
    },
    error: function () {
        // Uh oh, something went wrong
    }
});
checkifFinished()
}


function everydaySubmit(){
  var everday = $("#everyday").val();
  anyFormSubmitted()
  $.ajax({
    url: '/api/update/'+personId,
    method: 'POST',
    data: {
      everyday: everyday,
    personId:personId
   },
    success: function (data) {
        console.log(data);
    },
    error: function () {
        // Uh oh, something went wrong
    }
});

checkifFinished()
}


function philanthropyOne(){
  anyFormSubmitted();

  //create, parse, do whatever you need to do to get the value
  var percentIncome = document.getElementById('percentIncome').value;
  console.log(percentIncome);

  jQuery.ajax({
    url : '/api/update/'+personId,
    dataType : 'json',
    type : 'POST',
    // we send the data in a data object (with key/value pairs)
    data : {
      percentIncome: percentIncome,
      personId:personId
        },
    success : function(response){
        console.log('success in posting percentage')
        console.log(response);
    },
    error : function(err){
      alert("backend response: something went wrong from backend like");
      console.error(err);
    }
  });
checkifFinished()
}


function careerChoice(){

  anyFormSubmitted();

  var career = $(".career:checked").val();
  console.log('submitted career: '+ career)

  jQuery.ajax({
  	url : '/api/update/'+personId,
  	dataType : 'json',
  	type : 'POST',
  	// we send the data in a data object (with key/value pairs)
  	data : {
  		career: career,
      personId:personId
  	},
  	success : function(response){
	  		// success
        console.log('success in posting career response:');
	  		console.log(response);

  	},
  	error : function(err){
  		// do error checking
  		alert("something went wrong");
  		console.error(err);
  	}
  });
checkifFinished()
};








function yep() {
	var loader = document.getElementById("checkBox");
	loader.className = "yepAnim";
	setTimeout(function(){
		loader.className = "loadAnim"
				   },0450);
	setTimeout(function(){
		loader.className = "checkAnim"
	},1000);
	setTimeout(function(){
		documentgetElementById('cap-res').innerHTML = "Thank You for being human."
		documentgetElementById('cap-res').className = "container";
		documentgetElementById('cap-res').style.fontSize = "15px";
	},3000);

}
