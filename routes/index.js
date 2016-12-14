var express = require('express');
// var router = express.Router();
var router = express();
var mongoose = require('mongoose');
var Pusher = require('pusher');
var env = require('node-env-file');
var moment = require('moment');
// var nodemailer = require('nodemailer');
var facebookUtil = require('./../utils/facebook');
var requestify = require('requestify');
var http = require('http')
http = http.Server(router)


//add fancy addons, like email and web sockets
///////////////////////////////////////////
// var transporter = nodemailer.createTransport(transport[, defaults])

// Mail Module
var mailModule = require('./mail')();


// var smtpConfig = {
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: false, // dont use SSL
//     auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD
//     }
// };











//keep this shit secret
var pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.pusher_key,
  secret: process.env.pusher_secret
});

////////////////////////addons done ////////////////


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




//Default home route. Just relays a success message back.


router.get('/', function(req, res) {
  res.render('start.html')
});

//staging front end website
router.get('/second', function(req, res) {
  res.redirect('/pre-profile')
});

//staging front end website
router.get('/pre-profile', function(req, res) {
  res.render('pre-profile.html')
})

//staging front end website
router.get('/form-score/:id', function(req, res) {

  var personId = req.params.id;

  var pageData = {
    personId: personId,
    facebookClientId: process.env.FACEBOOK_APP_ID,
  }
  Person.findById(personId, function(err, data) {
    var personInfo = data || {};
    pageData.hasFacebook = data.facebook ? true : false;
    res.render('form-score.html', pageData);
  })
})


router.get('/form-score/:id/photos', function(req, res) {
  var personId = req.params.id;
  facebookUtil.getFacebookPhotos(personId, { limit: 10}, function(err, data) {
    var resp = {
      err: JSON.stringify(err || {}, undefined, 2),
      data: JSON.stringify(data || {}, undefined, 2)
    };
    res.render('data.html', resp);
  });
});

router.get('/form-score/:id/likes', function(req, res) {
  var personId = req.params.id;

  facebookUtil.getFacebookLikes(personId, { limit: 100}, function(err, data) {

    var resp = {
      err: JSON.stringify(err || {}, undefined, 2),
      data: JSON.stringify(data || {}, undefined, 2)
    };
    // console.log(Object.keys(resp.data))
    for (var key in resp.data){
      // console.log(resp.data[key])
      // console.log( Object.keys(resp.data[i]))
    }

    res.render('data.html', resp);
  });
});

router.get('/form-score/:id/posts', function(req, res) {
  var personId = req.params.id;
  var oneYearBack = moment().subtract(1, 'year');
  var dateTo = oneYearBack.endOf('year').format('YYYY-MM-DD');
  var dateFrom = oneYearBack.startOf('year').format('YYYY-MM-DD');

  facebookUtil.getFacebookPosts(personId, {
    limit: 10,
    since: dateFrom,
    until: dateTo,
  }, function(err, data) {
    var resp = {
      err: JSON.stringify(err || {}, undefined, 2),
      data: JSON.stringify(data || {}, undefined, 2)
    };
    res.render('data.html', resp);
  });
});

router.post('/form-score/:id/facebookAdd', function(req, res) {

  var personId = req.params.id;
  var accessToken = req.body.accessToken;
  var clientId = req.body.clientId;
  var clientSecret = process.env.FACEBOOK_SECRET;

  var pageData = {
    personId: personId
  }

  facebookUtil.extendAccessToken({
    access_token: accessToken,
    client_id: clientId,
    client_secret: clientSecret,
  }, function(err, facebookData) {
    if (err) {
      res.status(500).send({
        error: err
      });
    } else {
      facebookData.userID = req.body.userID;
      Person.findById(personId, function(err, data) {
        if (err) {
          res.status(500).send({
            err: err
          });
        } else {
          data.facebook = facebookData;
          data.save(function(err, data) {
            console.log(err, data);
            if (err) {
              res.status(500).send({
                err: err
              });
            } else {
              res.send({
                ok: true,
                facebook: facebookData
              });
            }
          })
        }
      });
    }
  });
})

router.get('/getKey', function(req, res) {
  var theKey = process.env.pusher_key
  res.send(theKey)
})


router.get('/edit/:id', function(req, res) {

  var requestedId = req.params.id;

  Person.findById(requestedId, function(err, data) {
    if (err) {
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

    res.render('edit.html', viewData);

  })

})




router.post('/submitProfile', upload.single('file'), function(req, res) {

  console.log('attempting to submit a profile image and name');

  var buf = new Buffer(req.body.data, 'base64');


  AWS.config.update({

    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  });
  AWS.config.update({
    region: 'us-east-1'
  })

  var s3bucket = new AWS.S3({
    params: {
      Bucket: process.env.AWS_BUCKET_NAME
    }
  });


  //take out special charachters first, look at what Sam did with slug
  var tempName = req.body.name.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-') + '.jpg';


  var params = {
    Key: tempName,
    ACL: 'public-read',
    Body: buf,
    ContentType: "image/jpeg"
  };


  s3bucket.putObject(params, function(err, data) {
    if (err) console.log(err);
    else console.log('success for: '+ tempName);
  });


  var publicUrl = process.env.AWS_S3_PATH + tempName;
  console.log('public url: ' + publicUrl);

  // console.log(req.body.imageUrl)

  //save a data object
  var personObj = {
    //grab your mongood schema and double it here
    name: req.body.name || 'Dildo',
    imageUrl: publicUrl,
    philanthropy: req.body.philanthropy || 0,
    career: req.body.career || '',
    intelligence: req.body.intelligence || 0,
    activism: req.body.activism || 0,
    score: req.body.score || 0,
    //create a unique slug
    slug: req.body.name.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')
  }


  //save to the database, send through the attributes as a json.
  var person = new Person(personObj);
  //mongood database operation, save to database, and have database hit this callback
  person.save(function(err, data) {
    if (err) {

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
    pusher.trigger('photoTakenCh', 'photoTaken', data);

    //respond back to the frint end. Here's the data
    return res.json(jsonData)

  })

});


router.post('/api/login',function(req,res){
  console.log(res.body)

  pusher.trigger('loginPressedCh', 'loginPressed', {pressed:'yes'});
  res.json({pressed:'yes'});

})



router.get('/add-person', function(req, res) {
  res.render('add.html')
})

router.get('/login', function(req, res) {
  res.render('login.html')
})

router.get('/candidate', function(req, res) {
  res.render('candidate.html')
})


//add search here
router.get('/directory', function(req, res) {
  res.render('directory.html')
})

//add search here
router.get('/members', function(req, res) {
  res.render('members.html')
})


router.get('/candidate-solo', function(req, res) {
  res.render('candidate-solo.html')
})

router.get('/third', function(req, res) {
  res.render('blank.html')
})





router.post('/api/done', function(req, res) {
  console.log(req.body)

  if (req.body.done == "yes") {
    console.log('server DONE route hit and done was YES')

    pusher.trigger('formFinishedCh', 'formFinished', req.body);

  }

  return res.json();

})






//i hit this route when I need to render my people onto cubes
router.get('/api/get', function(req, res) {
  //find all items
  Person.find(function(err, data) {

    if (err) {
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







//all scoring updates happen here
router.post('/api/update/:id', function(req, res) {

  var requestedId = req.body.personId;
  // var requestedId = req.body._id;
  // where is this console logging to? server?
  //create an object
  var dataToUpdate = {};

  //change score of personId
  Person.findById(requestedId, function(err,data){
    console.log('////////////////')
    // console.log(data)
    // console.warn(req.body)


//change this to a mapping value
//map (req.body.percentIncome,0,30,-20,200);
    if (parseInt(req.body.percentIncome) > 10){
      console.log('updating donation percentage score factor')
      data.score += 20
    } else if (parseInt(req.body.percentIncome) <= 10){
      data.score -= 20
    }

    if (req.body.compost == 'yes' || req.body.recycle == 'yes' || req.body.career == 'yes' || req.body.fundraiser == 'yes' || req.body.daraprim == 'no' || req.body.globalwarming == 'yes' || req.body.blood == 'yes' || req.body.oil == 'no' || req.body.trump == 'no'){
      console.log( 'adding 88 points')
      data.score += 88
    }

    if (req.body.compost == 'no' || req.body.recycle == 'no' || req.body.career == 'no' || req.body.fundraiser == 'no' || req.body.daraprim == 'yes' || req.body.globalwarming == 'no' || req.body.blood == 'no' || req.body.oil == 'yes' || req.body.trump == 'no'){
      console.log( 'adding 88 points')
      data.score -= 12
    }

    if (req.body.robot == 'no'){
      data.score += 7
    }

    if (req.body.everyday){
      console.log( 'added sometihng to everyday')
      data.score += 70
    }


    if (req.body.intelligence == 'col'){
      data.score += 23
    } else if (req.body.intelligence == 'hs') {
      data.score += 3
    } else if (req.body.intelligence == 'grad') {
      data.score += 13
    } else {
      data.score += 1
    }

    if(req.body.like){
      console.log('like was hit')
      data.score +=.01
    }


    //save score
    dataToUpdate.score = data.score.toFixed(2);

    Person.findByIdAndUpdate(requestedId, dataToUpdate, function(err,updatedData){
      if(err){
        return res.json({status:'error', message: 'something went wrong trying to save that user'})
      }

      //tell any browser window that is at route /third to switch to
      //route /candidate-solo
      pusher.trigger('channelName', 'addedInfo', dataToUpdate);
      return res.json(updatedData);

    })


  })






})


router.post('/sendMail', function(req,res){
  // console.log('at least we hit the route')
  console.log(req.body.emailToSendTo)
  mailModule.sendEmail(req.body.emailToSendTo);
  return res.json({'yo':'yo'})
  // res.send('emails been sent');
})

router.post('/gameOver', function(req,res){
  pusher.trigger('gameOverCh', 'gameOver', {pressed:'yes'});

  console.log('game over')
  return res.json({'yo':'yo'})
})


////////////////////////



module.exports = router;
