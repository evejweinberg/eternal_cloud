var videoWC, sceneWC, rendererWC, composer;
var cameraWC, cameraControls;
var globalBlob = null;
var image_tex, buffer, pre_video_tex, video_tex, video_mat, video_mesh, video_geo, buffer_mat, buffer_geo, buffer_mesh;



//if we wanted to toggle the side to slide out on click, but that DOM element is currently hidden
// $( "#nav-toggleB" ).bind( "click", function() {
//
//
//           if  (this.classList == "active"){
//             TweenLite.to(document.getElementById('about-side-info'),3,{right:-400,ease:Expo.easeOut})
//
//             console.log('go in')
//           } else {
//             TweenLite.to(document.getElementById('about-side-info'),3,{right:-10,ease:Expo.easeOut})
//
//           }
//             this.classList.toggle( "active" );
//       });


//instead we slide it out here
function showSideBar(){
  sideBarScene1 = true;
  TweenMax.to(document.getElementById('about-side-info'),3,{right:0,ease:Expo.easeOut})
}




function take_snapshot() {
  // take snapshot and get image data
  Webcam.snap( function(data_uri) {

    // setting the global blob
    globalBlob = data_uri;
    newImage = data_uri;
    var newImageB = new Image()
    newImageB.src = data_uri;
    // we need to send this to AWS

    //push image to 3D cube
    video_mesh.material.map.image =newImageB

    uploadBlob();

  } );
}





///////////////////
///////////////////




var stage = 0;
var newImage;
var ortho_width = 1920, ortho_height = 1080, ortho_near = -1, ortho_far = 1;

function get_webcam(){
videoWC = document.createElement('video');
console.log(videoWC)
videoWC.width = ortho_width;
videoWC.height = ortho_width;
videoWC.autoplay = true;
videoWC.muted = true; //- to prevent create feedback from mic input ***
video_tex = new THREE.Texture( videoWC );
    video_tex.minFilter = THREE.LinearFilter //- to use non powers of two image

    video_mat = new THREE.MeshPhongMaterial(
      {map: video_tex}

    );
if(navigator.getUserMedia){
  navigator.getUserMedia({ audio: true, videoWC:{ width: ortho_width, height: ortho_height, facingMode: { exact: "environment" } } }, function(stream){
    videoWC.src = window.URL.createObjectURL(stream);
    videoWC.play();
  }, function(err){
    console.log('failed to get a steram : ', err );
  });
} else {
  console.log('user media is not supported');
}
console.log('videoWC' , videoWC)
};





  // if( !init() )	animate();

  // init the sceneWC
  function initSideBar(){

    get_webcam()

      console.log('ready with sidebar.js')


    // if( Detector.webgl ){
    //   rendererWC = new THREE.WebGLRenderer({
    //     // antialias		: true,	// to get smoother output
    //     alpha: true,
    //     transparent: true,
    //     // canvas:document.getElementById("container-for-camera"),
    //
    //     preserveDrawingBuffer	: true	// to allow screenshot
    //   });
    //   rendererWC.setClearColor( 0xbbbbbb,0 );
    // }else{
    //   Detector.addGetWebGLMessage();
    //   return true;
    // }
    // // rendererWC.setSize( window.innerWidth, window.innerHeight );
    // rendererWC.setSize(document.getElementById("container-for-camera").offsetWidth, document.getElementById("container-for-camera").offsetHeight);
    //
    // // rendererWC.setClearColorHex( 0x000000, 0 );
    // document.getElementById('container-for-camera').appendChild(rendererWC.domElement);



    // create a sceneWC
    sceneWC = new THREE.Scene();

    // put a camera in the sceneWC
    cameraWC	= new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000 );
    cameraWC.position.set(0, 0, 150);
    sceneWC.add(cameraWC);

    var light	= new THREE.AmbientLight( Math.random() * 0xffffff );
    sceneWC.add( light );
    var light	= new THREE.DirectionalLight( Math.random() * 0xffffff );
    light.position.set( Math.random(), Math.random(), Math.random() ).normalize();
    sceneWC.add( light );
    var light	= new THREE.PointLight( Math.random() * 0xffffff );
    light.position.set( Math.random()-0.5, Math.random()-0.5, Math.random()-0.5 )
          .normalize().multiplyScalar(1.2);
    sceneWC.add( light );
    var light	= new THREE.PointLight( Math.random() * 0xffffff );
    light.position.set( Math.random()-0.5, Math.random()-0.5, Math.random()-0.5 )
          .normalize().multiplyScalar(1.2);
    sceneWC.add( light );



    var video_geo = new THREE.BoxGeometry( 30,30,30 );
    var video_mesh = new THREE.Mesh( video_geo, video_mat );
    sceneWC.add(video_mesh);



  }
