var answeredQuestions = 0;
var answeredQuestionsNum = document.getElementById('num-answered');
var personId;


function anyFormSubmitted(){
  //change the front end html to show that they answered a question
  answeredQuestions ++;
  document.getElementById('num-answered').innerHTML = answeredQuestions
  personId = document.getElementById('personId').innerHTML;
}


function intelligenceSubmit(){
  var intelligence = $(".education-highest:selected").val();
  console.log(intelligence)
  anyFormSubmitted()
  $.ajax({
    url: '/api/update/'+personId,
    method: 'POST',
    data: { intelligence: intelligence },
    success: function (data) {
        console.log(data);
    },
    error: function () {
        // Uh oh, something went wrong
    }
});
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
      alert("something went wrong");
      console.error(err);
    }
  });

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

};



$("#ActivismForm").submit(function(e){

  e.preventDefault();
  anyFormSubmitted();


  var activism = $("#activism").val();
  console.log(activism)


  jQuery.ajax({
  	url : '/api/update/'+personId,
  	dataType : 'json',
  	type : 'POST',
  	// we send the data in a data object (with key/value pairs)
  	data : {
      //YOU CAN HAVE ERRORS HERE, its ok to pass something that it's there
  		activism: activism,
  	},
  	success : function(response){
        console.log('success in posting activism');
	  		console.log(response);
  	},
  	error : function(err){
  		// do error checking
  		alert("something went wrong");
  		console.error(err);
  	}
  });


  return false;

})



jQuery("#IntelligenceForm").submit(function(e){
   e.preventDefault();
    anyFormSubmitted();

  jQuery.ajax({
  	url : '/api/update/'+personId,
  	dataType : 'json',
  	type : 'POST',
  	// we send the data in a data object (with key/value pairs)
  	data : {
  		intelligence: intelligence,
      educationlevel: educationlevel
  	},
  	success : function(response){
	  		// success
        console.log('success in posting intelligence')
	  		console.log(response);
	  		// now, clear the input fields
	  		// jQuery("#candidateForm input").val('');
  	},
  	error : function(err){
  		// do error checking
  		alert("something went wrong");
  		console.error(err);
  	}
  });


  return false;

})


// function Done(){
//   console.log('done fucntion was called')
//
//   jQuery.ajax({
//   	url : '/api/done',
//   	dataType : 'json',
//   	type : 'POST',
//   	// we send the data in a data object (with key/value pairs)
//   	data : {
//   		done: "yes",
//   	},
//   	success : function(response){
// 	  		// success
//         console.log('done with form');
// 	  		console.log(response);
// 	  		// now, clear the input fields
// 	  		// jQuery("#candidateForm input").val('');
//   	},
//   	error : function(err){
//   		// do error checking
//   		alert("something went wrong when hitting DONE button");
//   		console.error(err);
//   	}
//   });
//
// }
