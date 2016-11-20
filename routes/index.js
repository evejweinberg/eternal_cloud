
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Pusher = require('pusher');
var env = require('node-env-file');

//keep this shit secret
var pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.pusher_key,
  secret: process.env.pusher_secret
});


// our db models
var Person = require("../models/person.js");

// S3 File dependencies
var AWS = require('aws-sdk');

var awsBucketName = process.env.AWS_BUCKET_NAME;
var s3Path = process.env.AWS_S3_PATH; //  - we shouldn't hard code the path, but get a temp URL dynamically using aws-sdk's getObject


// file processing dependencies
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

// require middleware to handle multipart form data
var multer = require('multer');

// create a new storage object using multer middleware to
// receive the blob as a base64 incoded data object as part of a multipart
// form that's sent from the client-side

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        var newDestination = 'uploads/';
        var stat = null;
        try {
            stat = fs.statSync(newDestination);
        } catch (err) {
            fs.mkdirSync(newDestination);
        }
        if (stat && !stat.isDirectory()) {
            throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
        }
        cb(null, newDestination);

    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({
  storage: storage
});



/**
 * GET '/'
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */



router.get('/', function(req, res) {
   res.render('start.html')
 });

 router.get('/login', function(req,res){
   // by passing in pageData as the 2nd argument below
   // we are able to print values on the page
   // we will use this to tell our page which section to go to
   // see the HTML file; it will read section1 and direct accordingly
   var pageData = {
     desiredSection: "about-side-info",
   }

   res.render('login.html', pageData)
 })


 // router.get('/login', function(req,res){
 //   res.render('login.html')
 // })


router.get('/second', function(req, res) {
  res.redirect('/pre-profile')
});

//staging front end website
router.get('/pre-profile', function(req,res){
  res.render('pre-profile.html')
})

router.get('/getKey', function(req,res){
  var theKey = process.env.pusher_key
  res.send(theKey)
})


router.get('/edit/:id', function(req,res){

  var requestedId = req.params.id;

  Person.findById(requestedId,function(err,data){
    if(err){
      var error = {
        status: "ERROR",
        message: err
      }
      return res.json(err)
    }

    console.log(data);

    var viewData = {
      pageTitle: "Edit " + data.name,
      person: data
    }

    res.render('edit.html',viewData);

  })

})




router.post('/submitProfile', upload.single('file'), function(req,res){

    console.log('attempting to submit a profile');

    var buf = new Buffer(req.body.data, 'base64');


    AWS.config.update({

      accessKeyId:process.env.AWS_ACCESS_KEY,
      secretAccessKey:process.env.AWS_SECRET_KEY
    });
    AWS.config.update({region: 'us-east-1'})

    var s3bucket = new AWS.S3({params: {Bucket: process.env.AWS_BUCKET_NAME}});


    //take out special charachters first, look at what Sam did with slug
    var tempName = req.body.name.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-') + '.jpg';


    var params = {
      Key: tempName,
      ACL: 'public-read',
      Body: buf,
      ContentType: "image/jpeg"
    };


    s3bucket.putObject(params, function(err,data){
      if(err) console.log(err);
      else console.log('success@');
    });

    // res.json({msg: "success!"});

    var publicUrl = process.env.AWS_S3_PATH + tempName;
    console.log('public url: ' + publicUrl);

      console.log(req.body)


    // if (req.body.banker == 'yes') personObj['banker'] = true;
    // else personObj['banker'] = false;
    //
    // if (req.body.philanthropy === null )req.body.philanthropy = 0
    // if (req.body.intelligence === null )req.body.intelligence = 0
    // if (req.body.activism === null )req.body.activism = 0



    var personObj = {
      //grab your mongood schema and double it here
      name: req.body.name,
      imageUrl: publicUrl,
      // philanthropy: req.body.philanthropy,
      // banker: req.body.banker,
      // intelligence: req.body.intelligence,
      // activism: req.body.activism,
      //create a uniqur slug
      slug : req.body.name.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')
    }

    //save to the database, send through the attributes as a json.
    var person = new Person(personObj);
    //mongood database operation, save to database, and have database hit this callback
    person.save(function(err,data){
      if(err){

        console.log('error')
        //this shows up to client side app
        //so we could redirect them
        // res.redirect('add/person')
        var error = {
          status: "ERROR",
          message: err
        }
        return res.json(err)
      }

      console.log('succesfully pushed', data)

      var jsonData = {
        status: "OK",
        person: data
      }
      //'hi' is the message
      //channel, event,
      pusher.trigger( 'photoTakenCh', 'photoTaken', data );

      //respond back to the frint end. Here's the data
      return res.json(jsonData)

    })

});





//was hitting this route when the form was simply going to mongoose
router.post('/api/create', function(req,res){


  console.log('in api/create, and we got data');
  console.log(req.body);

  if (req.body.career == 'yes') personObj['career'] = true;
  else personObj['career'] = false;

  if (!req.body.philanthropy)req.body.philanthropy = 0
  if (!req.body.intelligence)req.body.intelligence = 0
  if (!req.body.activism)req.body.activism = 0
  if (!req.body.score)req.body.score = 0


//save a data object
  var personObj = {
    //grab your mongood schema and double it here
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    philanthropy: req.body.philanthropy,
    career: req.body.career,
    intelligence: req.body.intelligence,
    activism: req.body.activism,
    score: req.body.score,
    //create a uniqur slug
    slug : req.body.name.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')
  }

  //save to the database, send through the attributes as a json.
  var person = new Person(personObj);
//mongood database operation, save to database, and have database hit this callback
  person.save(function(err,data){
    if(err){
      //this shows up to client side app
      //so we could redirect them
      // res.redirect('add/person')
      var error = {
        status: "ERROR",
        message: err
      }
      // return res.json(err)
      res.redirect('/candidate')
      //redirect /third to /candidate-solo
    }

    var jsonData = {
      status: "OK",
      person: data
    }


  })
})




//when do i hit this route?
router.get('/api/get', function(req,res){
//find all items
  Person.find(function(err,data){

      if(err){
        var error = {
          status: "ERROR",
          message: err
        }
        return res.json(err)
      }

      var jsonData = {
        status: "OK",
        people: data
      }

      return res.json(jsonData);

  })

})


router.get('/api/delete/:id',function(req,res){

  var requestedId = req.param('id');

  // Mongoose method to remove, http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove
  Person.findByIdAndRemove(requestedId,function(err, data){
    if(err || data == null){
      var error = {status:'ERROR', message: 'Could not find that animal to delete'};
      return res.json(error);
    }

    // otherwise, respond back with success
    var jsonData = {
      status: 'OK',
      message: 'Successfully deleted id ' + requestedId
    }

    res.json(jsonData);

  })



})



router.get('/api/get/query',function(req,res){
//
  // console.log(req.query);

  var searchQuery = {};

  if(req.query.itpYear){
    searchQuery['itpYear'] =  req.query.itpYear
  }

  if(req.query.name){
    //add to the object
    searchQuery['name'] =  req.query.name
  }

  if(req.query.hasGlasses){
    searchQuery['hasGlasses'] =  req.query.hasGlasses
  }

//pass in the search query that was built
  Person.find(searchQuery,function(err,data){
    res.json(data);
  })

  Person.find(searchQuery).sort('-name').exec(function(err,data){
    res.json(data);
  })


})






router.get('/add-person', function(req,res){
  res.render('add.html')
})



router.get('/candidate', function(req,res){
  res.render('candidate.html')
})


//add search here
router.get('/directory', function(req,res){
  res.render('directory.html')
})


router.get('/candidate-solo', function(req,res){
    res.render('candidate-solo.html')
})
router.get('/third', function(req,res){

  // isStart = req.query.isStart
  // if (isStart == 'true')
  res.render('blank.html')
  // else {
    // res.render('candidate-solo.html')
    // }
  })

  router.post('/api/done', function(req,res){
    console.log(req.body)

    if (req.body.done == "yes"){
      console.log('server DONE route hit and done was YES')

      pusher.trigger( 'photoTakenCh', 'finishedForm', req.body );
      // return;

    }


  })


router.post('/api/update/:id', function(req,res){
  //pull out fields that were posted
  console.log('REQUEST BODY: ', req.body)
  var idToUpdate = req.params.id;
 // where is this console logging to? server?
  //create an object
  var dataToUpdate = {};

  if(req.body.philanthropy) dataToUpdate.philanthropy = req.body.philanthropy;
  if(req.body.career) dataToUpdate.career = req.body.career;//console.log(req.body.career);
  if(req.body.intelligence) dataToUpdate.intelligence = req.body.intelligence;
  if(req.body.activism) dataToUpdate.activism = req.body.activism;
  if(req.body.score) dataToUpdate.score = req.body.score;



  //find them in the database, by their ID
  Person.findByIdAndUpdate(idToUpdate, dataToUpdate, function(err,data){
    if (err){
      alert("There was an error updating your profile. Eternal Cloud might be at maximum capacity.")
    } else{
        console.log(data);

        //make up event here
        var myMsg = {
          philanthropy: dataToUpdate.philanthropy,
          career : dataToUpdate.career,
          intelligence : dataToUpdate.intelligence,
          activism : dataToUpdate.activism,
        }
        res.json(data);
        //'channel Name', 'event Name', message
        pusher.trigger( 'channelName', 'addedInfo', myMsg );
        console.log("triggered/pushed ", myMsg );

        //we are responding with it but now we have
        //to put it in the html
    }
  });




})


////////////////////////



module.exports = router;
