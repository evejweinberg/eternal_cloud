live heroku deployed URL: https://lit-castle-51205.herokuapp.com/


#overall issues
-facebook login button (/login.html) not showing up on heroku deployment (only shows on localhost)
- webcam
- on login.html, if the name they type in is already taken, let them use it anyway, currently there is not even error messaging to let them know.
- can the pusher/websockets works in the windows are no longer popups, but instead separate browser windows on different machines?



#when /login submit button is pressed

- load third screen with /candidate-solo/:id, not just '/candidate-solo'


#upon any form being submitted on /form-score:id

- everything works

#if facebook login is successful

- on form-score.html push masonry forms down and display user's photos and 'likes' above it
- on candidate-solo/:id.html push a random score of Math.floor(Math.random(577 to 307)
- on start.html trigger a function (call it anything for now, eve will add to it)
- on form-score/:id.html front end make a paragraph element that says 'hi'+ person's name



#add to form-score.html
- add a No CAPTCHA reCAPTCHA and push a score update of 10
