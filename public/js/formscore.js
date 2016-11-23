var answeredQuestions = 0;
var answeredQuestionsNum = document.getElementById('num-answered');

function anyFormSubmitted(){
  //change the front end html to show that they answered a question
  answeredQuestions ++
  answeredQuestionsNum.innerHTML = answeredQuestions
  //show me that we have a person ID
  var personId = document.getElementById('personId').innerHTML;
  console.log('personID: '+ personId);
}


//was testing aq form out this way, bc stack overflow suggested it
function processForm( e ){

       var compost = $(".compost:checked").val();
       console.log('compost: ' + compost);
         $.ajax({
             url: '/api/update/'+personId,
             dataType: 'json',
             type: 'post',
             data: {
               compost: compost,
             },
             success: function( data, textStatus, jQxhr ){
                 console.log( data );
             },
             error: function( jqXhr, textStatus, errorThrown ){
                 console.log( errorThrown );
             }
         });

         e.preventDefault();
}



jQuery("#CompostForm").submit(function(e){

  anyFormSubmitted();
  //was testing a form out this way bc Stack overflow suggested it
  processForm( e );


  // e.preventDefault();
  // var compost = $(".compost:checked").val();
  // console.log('compost: ' + compost);

  // jQuery.ajax({
  //   url : '/api/update/'+personId,
  //   dataType : 'json',
  //   type : 'POST',
  //   // we send the data in a data object (with key/value pairs)
  //   data : {
  //     compost: compost,
  //   },
  //   success : function(response){
  //       // success
  //       console.log('success in posting percentage')
  //       console.log(response);
  //
  //   },
  //   error : function(err){
  //     // do error checking
  //     alert("something went wrong adding compost");
  //     console.error(err);
  //   }
  // });

  return false;

})





//this is the way that Sam and I did it in office hours
jQuery("#percentageForm").submit(function(e){

  e.preventDefault();
  anyFormSubmitted();

  var personId = document.getElementById('personId').innerHTML;
  console.log(personId);
  var percentIncome = document.getElementById('percentIncome').value;
  console.log(percentIncome);

  jQuery.ajax({
    url : '/api/update/'+personId,
    dataType : 'json',
    type : 'POST',
    // we send the data in a data object (with key/value pairs)
    data : {
      percentIncome: percentIncome,
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

  return false;

})





jQuery("#CareerForm").submit(function(e){


  e.preventDefault();
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


  return false;

})



jQuery("#ActivismForm").submit(function(e){

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
