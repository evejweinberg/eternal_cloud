var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');



/**
 * GET '/'
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */
router.get('/', function(req, res) {


    res.render('start.html')


});





module.exports = router;
