

jQuery("#candidateForm").submit(function(e){
  console.log('done forst one')
  $('.progress-bar').attr("style","width:40%");
// $("#candidateForm").fadeOut()
$('#CareerForm').fadeIn();
  var philanthropy = parseInt($('#philanthropy').val());

  jQuery.ajax({
  	url : '/api/update/'+personId,
  	dataType : 'json',
  	type : 'POST',
  	// we send the data in a data object (with key/value pairs)
  	data : {
  		philanthropy: philanthropy,
  	},
  	success : function(response){
	  		// success
	  		console.log('success in posting');
	  		// now, clear the input fields
	  		// jQuery("#candidateForm input").val('');
  	},
  	error : function(err){
  		// do error checking
  		alert("something went wrong");
  		console.error(err);
  	}
  });

  // prevents the form from submitting normally
  e.preventDefault();
  return false;

})

//
// $("#CareerForm").submit(function(e){
//     return false;
// });

jQuery("#CareerForm").submit(function(e){
  console.log('done forst one')
  $('.progress-bar').attr("style","width:60%");
// $("#candidateForm").fadeOut()
$('#IntelligenceForm').fadeIn();
$('#IntelligenceForm').fadeIn();
  var career = $(".career:checked").val();

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
	  		// now, clear the input fields
	  		// jQuery("#candidateForm input").val('');
  	},
  	error : function(err){
  		// do error checking
  		alert("something went wrong");
  		console.error(err);
  	}
  });

  // prevents the form from submitting normally
  e.preventDefault();
  return false;

})



jQuery("#ActivismForm").submit(function(e){

  console.log('done forst one')
  $('.progress-bar').attr("style","width:100%");
// $("#candidateForm").fadeOut()
$('#done').fadeIn();
//split this
      var activism = $("#activism").val();


  jQuery.ajax({
  	url : '/api/update/'+personId,
  	dataType : 'json',
  	type : 'POST',
  	// we send the data in a data object (with key/value pairs)
  	data : {
      //YOU CAN HAVE ERRORS HERE
  		activism: activism,
  	},
  	success : function(response){
	  		// success
        console.log('success in posting activism');
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

  // prevents the form from submitting normally
  e.preventDefault();
  return false;

})




jQuery("#IntelligenceForm").submit(function(e){

  console.log('done forst one')
  $('.progress-bar').attr("style","width:80%");
// $("#candidateForm").fadeOut()
$('#ActivismForm').fadeIn();

  console.log(typeof $("#intelligence").val())
  // if (typeof $("#intelligence").val() === String){
      var intelligence = $("#intelligence").val();
      // console.log(intelligence + 'is the intelligence')
  // } else {
    // intelligence = "null"
    // console.log(intelligence + 'is the intelligence')
  // }

  // console.log(career + '  is value of career')
  // console.log('updating career of person: '+ personId)

  jQuery.ajax({
  	url : '/api/update/'+personId,
  	dataType : 'json',
  	type : 'POST',
  	// we send the data in a data object (with key/value pairs)
  	data : {
  		intelligence: intelligence,
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

  // prevents the form from submitting normally
  e.preventDefault();
  return false;

})

// jQuery("#done").submit(function(e){
//   console.log('done hit')
function Done(){

  console.log('done fucntion was called')

  jQuery.ajax({
  	url : '/api/done',
  	dataType : 'json',
  	type : 'POST',
  	// we send the data in a data object (with key/value pairs)
  	data : {
  		done: "yes",
  	},
  	success : function(response){
	  		// success
        console.log('done with form');
	  		console.log(response);
	  		// now, clear the input fields
	  		// jQuery("#candidateForm input").val('');
  	},
  	error : function(err){
  		// do error checking
  		alert("something went wrong when hitting DONE button");
  		console.error(err);
  	}
  });

  // prevents the form from submitting normally
  // e.preventDefault();
  // return false;
}
