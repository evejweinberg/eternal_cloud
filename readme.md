#when /login submit button is pressed

- replace front end screen with /form-score/:id (working already)
- post to route api/create (working already)
- push image that was taken to amazon s3 bucket 'eternalcloud' (working already)
- send the amazon link to mongoLab database
- load third screen with /candidate-solo/:id
- load image, name, and score into third screen - eve to make it work with three.js ionce data is coming in

#upon any form being submitted on /form-score:id

- post to route /api/update/:id (working already)
- update score in the mongoLabdatabase (working already)
- push new score to front end of /candidate-solo (might be working already)

#if facebook login is successful

- on form-score.html push masonry forms down and display user's photos and likes above it
- pon candidate-solo.html push score of Math.floor(Math.random(577 to 307) to
- store this score in the mongoLab database (working already)
- on start.html trigger a function (call it anything for now, eve will add to it)
- on form-score.html front end make a paragraph element that says 'hi'+ person's name


#add to form-score.html
- add a No CAPTCHA reCAPTCHA and push a score update of 10


#overall issues
- reconnect entire project to heroku (it's broken)
