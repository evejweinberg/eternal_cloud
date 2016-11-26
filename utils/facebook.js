
var qs = require('querystring');
var async = require('async');
var graph = require('fbgraph');


// our db models
var Person = require("../models/person.js");

function getAccessToken(userId){
    return function(callback){
        Person.findById(userId, function(err, user) {
            if (!user || !user.facebook ||  !user.facebook.access_token) {
                return callback({
                    message: 'User not found'
                });
            } else {
                return callback(null, user.facebook);
            }
        });
    }
}

function getFacebookPhotosAT(options){
    return function(accessToken, callback){
        var params = {
            limit: options.limit || 10,
            access_token: accessToken.access_token,
            fields: 'name,created_time,source',
            type: 'uploaded',
        }
        var link = "me/photos";
        var q = qs.stringify(params);

        graph.get(link + "?" + q, function(err, d) {
            callback(err, d);
        })
    }
}

function getFacebookPostsAT(options){
    return function(accessToken, callback){
        var params = {
            limit: options.limit || 10,
            access_token: accessToken.access_token,
            since: options.since,
            until: options.until
        }
        var link = "me/posts";
        var q = qs.stringify(params);

        graph.get(link + "?" + q, function(err, d) {
            callback(err, d);
        })
    }
}

function getFacebookLikesAT(options){
    return function(accessToken, callback){
        var params = {
            limit: options.limit || 100,
            access_token: accessToken.access_token,
        }
        var link = "me/likes";
        var q = qs.stringify(params);

        graph.get(link + "?" + q, function(err, d) {
            callback(err, d);
        })
    }
}

function getFacebookPhotos(userid, options, callback) {
    async.waterfall([
        getAccessToken(userid),
        getFacebookPhotosAT(options),
    ], callback);
}
function getFacebookPosts(userid, options, callback) {
    async.waterfall([
        getAccessToken(userid),
        getFacebookPostsAT(options),
    ], callback);
}
function getFacebookLikes(userid, options, callback) {
    async.waterfall([
        getAccessToken(userid),
        getFacebookLikesAT(options),
    ], callback);
}
function extendAccessToken(options, callback){
    graph.extendAccessToken({
        access_token: options.access_token,
        client_id: options.client_id,
        client_secret: options.client_secret,
    }, callback);
}

module.exports.getFacebookPhotos = getFacebookPhotos;
module.exports.getFacebookPosts = getFacebookPosts;
module.exports.getFacebookLikes = getFacebookLikes;
module.exports.extendAccessToken = extendAccessToken;
