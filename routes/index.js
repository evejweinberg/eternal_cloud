var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// our db models
var Person = require("../models/person.js");
var Course = require("../models/course.js");

// S3 File dependencies
var AWS = require('aws-sdk');
var awsBucketName = process.env.AWS_BUCKET_NAME;
var s3Path = process.env.AWS_S3_PATH; // TODO - we shouldn't hard code the path, but get a temp URL dynamically using aws-sdk's getObject
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});
var s3 = new AWS.S3();

// file processing dependencies
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

/**
 * GET '/'
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */
router.get('/', function(req, res) {

  console.log('home page requested!');

  var jsonData = {
  	'name': 'user-directory',
  	'api-status':'OK'
  }

  // res.send('hi')

  // respond with json data
  // res.json(jsonData)

  // respond by redirecting
  res.redirect('/directory')

  // respond with html
  // res.render('directory.html')

});

router.get('/add-person', function(req,res){

  res.render('add.html')

})

router.get('/make-profile', function(req,res){

  res.render('makeProfile.html')

})

router.get('/add-person-with-image', function(req,res){

  res.render('add-with-image.html')

})

router.get('/directory', function(req,res){

  res.render('directory.html')

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














router.get('/edit/:id', function(req,res){

  //get the id

  var requestedId = req.params.id;


//ask database for information
  Person.findById(requestedId,function(err,data){
    if(err){
      var error = {
        status: "ERROR",
        message: err
      }
      return res.json(err)
    }

    var viewData = {
      status: "OK",
      person: data
    }
//views > edit.html
    return res.render('edit.html',viewData);
  })

})


router.post('/api/create', function(req,res){

  // if (!req.body.name){
  //   //return an error
  // }
  console.log('in api/create, and we got data');
  console.log(req.body);


//save a data object
  var personObj = {
    //grab your mongood schema and double it here
    name: req.body.name,
    imageUrl: req.body.imageUrl,
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
      res.redirect('/directory')
    }

    var jsonData = {
      status: "OK",
      person: data
    }

    // console.log(data)
    // res.json(data)

    // return res.json(jsonData);
    return res.render('/directory')

  })

})

router.post('/api/edit/:id', function(req,res){

  console.log(req.body);
  var requestedId = req.params.id;

  var personObj = {
    name: req.body.name,
    itpYear: req.body.itpYear,
    interests: req.body.interests.split(','),
    link: req.body.link,
    imageUrl: req.body.imageUrl,
    slug : req.body.name.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_')
  }

  console.log(personObj);

  Person.findByIdAndUpdate(requestedId,personObj,function(err,data){
    if(err){
      var error = {
        status: "ERROR",
        message: err
      }
      return res.json(error)
    }

    var jsonData = {
      status: "OK",
      person: data
    }

    //return res.json(jsonData);

    return res.redirect('/directory');

  })

})

router.post('/api/create/image', multipartMiddleware, function(req,res){

  console.log('the incoming data >> ' + JSON.stringify(req.body));
  console.log('the incoming image file >> ' + JSON.stringify(req.files.image));

  var personObj = {
    name: req.body.name,
    itpYear: req.body.itpYear,
    interests: req.body.interests.split(','),
    link: req.body.link,
    slug : req.body.name.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')
  }

  if (req.body.hasGlasses == 'yes') personObj['hasGlasses'] = true;
  else personObj['hasGlasses'] = false;


  // NOW, we need to deal with the image
  // the contents of the image will come in req.files (not req.body)
  var filename = req.files.image.name; // actual filename of file
  var path = req.files.image.path; // will be put into a temp directory
  var mimeType = req.files.image.type; // image/jpeg or actual mime type

  // create a cleaned file name to store in S3
  // see cleanFileName function below
  var cleanedFileName = cleanFileName(filename);

  // We first need to open and read the uploaded image into a buffer
  fs.readFile(path, function(err, file_buffer){

    // reference to the Amazon S3 Bucket
    var s3bucket = new AWS.S3({params: {Bucket: awsBucketName}});

    // Set the bucket object properties
    // Key == filename
    // Body == contents of file
    // ACL == Should it be public? Private?
    // ContentType == MimeType of file ie. image/jpeg.
    var params = {
      Key: cleanedFileName,
      Body: file_buffer,
      ACL: 'public-read',
      ContentType: mimeType
    };

    // Put the above Object in the Bucket
    s3bucket.putObject(params, function(err, data) {
      if (err) {
        console.log(err)
        return;
      } else {
        console.log("Successfully uploaded data to s3 bucket");

        // now that we have the image
        // we can add the s3 url our person object from above
        personObj['imageUrl'] = s3Path + cleanedFileName;

        // now, we can create our person instance
        var person = new Person(personObj);

        person.save(function(err,data){
          if(err){
            var error = {
              status: "ERROR",
              message: err
            }
            return res.json(err)
          }

          var jsonData = {
            status: "OK",
            person: data
          }

          return res.json(jsonData);
        })

      }

    }); // end of putObject function

  });// end of read file

})

function cleanFileName (filename) {

    // cleans and generates new filename for example userID=abc123 and filename="My Pet Dog.jpg"
    // will return "abc123_my_pet_dog.jpg"
    var fileParts = filename.split(".");

    //get the file extension
    var fileExtension = fileParts[fileParts.length-1]; //get last part of file

    //add time string to make filename a little more random
    d = new Date();
    timeStr = d.getTime();

    //name without extension
    newFileName = fileParts[0];

    return newFilename = timeStr + "_" + fileParts[0].toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_') + "." + fileExtension;

}

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

router.get('/api/get/year/:itpYear',function(req,res){

  var requestedITPYear = req.params.itpYear;

  console.log(requestedITPYear);

  Person.find({itpYear:requestedITPYear},function(err,data){
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

router.get('/api/person/:slug'), function(req,res){
  var reqestedSlug = req.params.slug;
  console.log(reqestedSlug)
  Person.findOne({slug:reqestedSlug}, function(err,data){
    if (err){
      return res.json({status: error})
    }

    if (!data || data ==null || data==''){

    }

    console.log('found that person')
    console.log(data)
    res.json(data)

  })
}

// year, name
// /api/get/query?year=2016&name=Sam&hasGlasses=true

router.get('/api/get/query',function(req,res){

  console.log(req.query);

  var searchQuery = {};

  if(req.query.itpYear){
    searchQuery['itpYear'] =  req.query.itpYear
  }

  if(req.query.name){
    searchQuery['name'] =  req.query.name
  }

  if(req.query.hasGlasses){
    searchQuery['hasGlasses'] =  req.query.hasGlasses
  }

  Person.find(searchQuery,function(err,data){
    res.json(data);
  })

  // Person.find(searchQuery).sort('-name').exec(function(err,data){
  //   res.json(data);
  // })


})



module.exports = router;
