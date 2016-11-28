#on login submit

- replace front end screen with /form-score/:id
- post to route api/create
- push image that was taken to amazon s3 bucket 'eternalcloud'
- send the amazon link to mongoLab database
- load third screen with /candidate-solo/:id
- load image, name, and score into third screenshot

#upon any form being submitted on /form-score:id

- post to route /api/update/:id
- update score in the mongoLabdatabase
- push new score to front end of /candidate-solo

#if facebook login is succesful

- on /formscore, push masonry forms down and display user's photos and likes above it
- push score of Math.floor(Math.random(577-307)-307)) to /candidate-solo
- store this score in the mongoLab database
- trigger /first to play video3.play() which says 'unfortunately your humanity score is too low'
- eve to change graphics on middle sreen to say 'perish or secure space another way'


#add to /formscore
- add a No CAPTCHA reCAPTCHA and push a score update of 10
