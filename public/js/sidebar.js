
  console.log('ready with sidebar.js')

$( "#nav-toggleB" ).bind( "click", function() {


          if  (this.classList == "active"){
            TweenLite.to(document.getElementById('about-side-info'),3,{right:-400,ease:Expo.easeOut})

            console.log('go in')
          } else {
            TweenLite.to(document.getElementById('about-side-info'),3,{right:-10,ease:Expo.easeOut})

          }
            this.classList.toggle( "active" );
      });



function showSideBar(){
  get_webcam();
  TweenMax.to(document.getElementById('about-side-info'),3,{right:0,ease:Expo.easeOut})
}


function get_webcam(){
video = document.createElement('video');
video.width = ortho_width;
video.height = ortho_width;
video.autoplay = true;
video.muted = true; //- to prevent create feedback from mic input ***
video_tex = new THREE.Texture( video );
    video_tex.minFilter = THREE.LinearFilter //- to use non powers of two image

    video_mat = new THREE.MeshPhongMaterial(
      {map: video_tex}

    );
if(navigator.getUserMedia){
  navigator.getUserMedia({ audio: true, video:{ width: ortho_width, height: ortho_height, facingMode: { exact: "environment" } } }, function(stream){
    video.src = window.URL.createObjectURL(stream);
    video.play();
  }, function(err){
    console.log('failed to get a steram : ', err );
  });
} else {
  console.log('user media is not supported');
}
};
