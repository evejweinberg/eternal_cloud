/*

Maill app using Mailgun

*/

module.exports = function(){
  var mail = {};
  var api_key = "key-880539a823119df18cc7b0c2ed962134";
  var domain = "sandbox91a80e6fe2a34e038f3e5d388da3aee5.mailgun.org";

  var mailgun = require('mailgun-js')({
    apiKey: api_key,
    domain: domain
  });

  mail.sendEmail = function(){

    var data = {
      from: 'Eternal Cloud <nowiownyou@eternalcloud.org>',
      to: 'evejweinberg@gmail.com',
      subject: 'Welcome to Eternal Cloud',
      text: 'yep, it works!'
    };

    mailgun.messages().send(data, function (error, body) {
      if(error){
        console.log(error);
        console.log(body);
      }

    });
  };

  return mail;
};
