var answeredQuestions = 0;
var answeredQuestionsNum = document.getElementById('num-answered');
var personId;


function anyFormSubmitted(e){
  e.target.innerHTML = "Thanks"
  // console.log(e)
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


function intelligenceSubmit(e){
  var intelligence = $(".education-highest:selected").val();
  console.log(intelligence)
  anyFormSubmitted(e);
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

function compostSubmit(e){

  var compost = $(".compost:checked").val();
  anyFormSubmitted(e);
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


function everydaySubmit(e){
  var everday = document.getElementById('everyday').value;
  anyFormSubmitted(e)
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


function philanthropyOne(e){
  anyFormSubmitted(e);

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
      alert("front end: something went wrong putting in percent income");
      console.error(err);
    }
  });
checkifFinished()
}


function careerChoice(e){

  anyFormSubmitted(e);

  var career = $(".career:checked").val();
  console.log('submitted career: '+ career)

  jQuery.ajax({
  	url : '/api/update/'+personId,
  	dataType : 'json',
  	type : 'POST',
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
checkifFinished();
};


function fundraiserForm(e){

  anyFormSubmitted(e);
  var fundraiser = $(".fundraiser:checked").val();

  jQuery.ajax({
    url : '/api/update/'+personId,
    dataType : 'json',
    type : 'POST',
    data : {
      fundraiser: fundraiser,
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
checkifFinished();
};

function globalwarmingForm(e){

  anyFormSubmitted(e);
  var globalwarming = $(".globalwarming:checked").val();

  jQuery.ajax({
    url : '/api/update/'+personId,
    dataType : 'json',
    type : 'POST',
    data : {
      globalwarming: globalwarming,
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
checkifFinished();
};


function recycleForm(e){

  anyFormSubmitted(e);
  var recycle = $(".recycle:checked").val();

  jQuery.ajax({
    url : '/api/update/'+personId,
    dataType : 'json',
    type : 'POST',
    data : {
      recycle: recycle,
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
checkifFinished();


}


function oilForm(e){

  anyFormSubmitted(e);
  var oil = $(".oil:checked").val();

  jQuery.ajax({
    url : '/api/update/'+personId,
    dataType : 'json',
    type : 'POST',
    data : {
      oil: oil,
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
checkifFinished();

};



function bloodForm(e){

  anyFormSubmitted(e);
  var blood = $(".blood:checked").val();

  jQuery.ajax({
    url : '/api/update/'+personId,
    dataType : 'json',
    type : 'POST',
    data : {
      blood: blood,
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
checkifFinished();

};

function namedOrgForm(e){
  anyFormSubmitted(e);
  var orgformed = $("#orgformed").val();

  jQuery.ajax({
    url : '/api/update/'+personId,
    dataType : 'json',
    type : 'POST',
    data : {
      orgformed: orgformed,
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
checkifFinished();

};

function serviceForm(e){

  anyFormSubmitted(e);
  var service = $(".service:checked").val();

  jQuery.ajax({
    url : '/api/update/'+personId,
    dataType : 'json',
    type : 'POST',
    data : {
      service: service,
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
checkifFinished();

}


function trumpSubmit(e){

  anyFormSubmitted(e);
  var trump = $(".trump:checked").val();

  jQuery.ajax({
    url : '/api/update/'+personId,
    dataType : 'json',
    type : 'POST',
    data : {
      trump: trump,
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
checkifFinished();

};

function daraprimSubmit(e){
  anyFormSubmitted(e);
  var daraprim = $(".daraprim:checked").val();

  jQuery.ajax({
    url : '/api/update/'+personId,
    dataType : 'json',
    type : 'POST',
    data : {
      daraprim: daraprim,
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
checkifFinished();

};








function yep() {
    anyFormSubmitted();
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

  jQuery.ajax({
    url : '/api/update/'+personId,
    dataType : 'json',
    type : 'POST',
    data : {
      robot: "no",
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
  checkifFinished();

}
