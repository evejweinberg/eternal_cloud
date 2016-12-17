/*

Maill app using Mailgun

*/

module.exports = function(){
  var mail = {};
  // console.log(process.env.MAIL_SB_KEY)
  var api_key = process.env.MAIL_SB_KEY
  var domain = process.env.SB_DOMAIN

  var mailgun = require('mailgun-js')({
    apiKey: api_key,
    domain: domain
  });

  mail.sendEmail = function(reciever){
    console.log(reciever)

    var data = {
      from: 'Eternal Cloud <redeemyourself@eternalcloud.org>',
      to: reciever,
      subject: 'You have requested a Life Plan from Eternal Cloud',
      text: "We're so glad you want to help the planet and the human race with your remaining 29 years on Earth. Here is what you will need to do: 1) Donate to a cause of your choice with recurring monthly donations of at least $20/month. 2) Once a week, when you see someone in your community in need, lend at least 15 minutes of your time. 3) Divest all of your stocks from oil comapnies. 4) Smile more. We'll be watching. 5) Recycle! Reduce! Reuse! We can't thank you enough for making the right choices. Have a nice life. See you again in 2045. -- Eyes in the Sky / EC / www.EternalCloud.net"
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
