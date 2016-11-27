//on facebook button submit, this fucntion is called.
function requestServer(options,cb){
    //we are waiting
    let waiting = true;
    options.cb1 = options.cb1 || console.log;
    let settings = {
        url: options.url,
        type: options.method || "GET",
        dataType: 'json',
        contentType: options.contentType,
        data : options.data,
        //90 seconds - stop
        timeout: 90000,
        beforeSend: function(){
            setTimeout(function(){
                if(waiting)
                options.cb1(new Date()+ ': Still waiting for response');
            },10000);
        }
    };
    return $.ajax(settings).done(function(res){
        waiting = false;
        cb(null,res);
    }).error(function(res){
        waiting = false;
        cb(res);
    });;
}

function clientId(){
    return $("#facebookClientId").text();
}


window.fbAsyncInit = function() {
    FB.init({
      appId      : clientId(),
      xfbml      : true,
      version    : 'v2.6'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
function checkLoginState() {
    console.log('login state check');
  FB.getLoginStatus(function(response) {
      if(response.status === "connected"){
        var personId = $('#personId').text();
        console.log(response);
        requestServer({
          url: `/form-score/${personId}/facebookAdd`,
          method: 'POST',
          dataType: 'json',
          contentType: "application/json",
          data : JSON.stringify({
            accessToken: response.authResponse.accessToken,
            clientId: clientId(),
            userID: response.authResponse.userID
          })
        }, function(err,d){
          console.log(err, d);
        })

      }
  });
}
