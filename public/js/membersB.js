// if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var canvas;
var scenes = [], renderer;
var sceneNum = 0;
var moveon = false;
var i = 0;
var geometries = [
  new THREE.BoxGeometry( 1, 1, 1 ),
  new THREE.SphereGeometry( 0.5, 12, 8 ),
  new THREE.DodecahedronGeometry( 0.5 ),
  new THREE.CylinderGeometry( 0.5, 0.5, 1, 12 ),
];
var video_geo = new THREE.BoxGeometry(1,1,1);

var template = document.getElementById( "template" ).text;
var content = document.getElementById( "content" );
var loader2 = new THREE.TextureLoader();




//get data from mongoLab database!!

jQuery.ajax({
  url : '/api/get',
  dataType : 'json',
  success : function(response) {

    //when we have it, then init the scene
    // console.log(response.people.length) <---- returns 23

    init();
  loopingfunction(response)



    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
    renderer.setClearColor( 0xffffff, 1 );
    renderer.setPixelRatio( window.devicePixelRatio );

    animate();
  },//success fucntion over
});//ajax request over




function init() {

  canvas = document.getElementById( "c" );












}



function createScene(texture, i, response){
  console.log('scene: ', i );
  console.log('texture: ',texture);

  var person = response.people[i];

  var scene = new THREE.Scene();

  //create a div with class name scene
  // make a list item
  var element = document.createElement( "div" );
  element.className = "list-item";
  scene.userData.element = element.querySelector( ".scene" );
  content.appendChild( element );


            // //check the names, add them or add a placeholder word
            // if (response.people[i].name){
            //   element.innerHTML = template.replace( '$', response.people[i].name);
            // } else {
            //   element.innerHTML = template.replace( '$', 'unindentified');
            // }
            //
            // //check the scores
            // if (response.people[i].score){
            //   element.innerHTML += 'Score: ' + response.people[i].score;
            // } else {
            //   element.innerHTML += 'Score: 0';
            // }


  var camera = new THREE.PerspectiveCamera( 50, 1, 1, 10 );
  camera.position.z = 2;
  scene.userData.camera = camera;

  // var controls = new THREE.OrbitControls( scene.userData.camera, scene.userData.element );
  // controls.minDistance = 2;
  // controls.maxDistance = 5;
  // controls.enablePan = false;
  // controls.enableZoom = false;
  // scene.userData.controls = controls;

  scene.add( new THREE.HemisphereLight( 0xaaaaaa, 0x444444 ) );
  var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
  light.position.set( 1, 1, 1 );
  scene.add( light );



  var geometry = new THREE.BoxGeometry(1,1,1);

  var video_mat = new THREE.MeshPhongMaterial({
    color: new THREE.Color().setHSL( Math.random(), 1, 0.75 ),
    // color: 0xb7b7b7,
    map: texture
  })

  // console.log(video_mat)

  var video_mesh = new THREE.Mesh( geometry, video_mat );
  // console.log("adding" , video_mesh)
  // video_mesh.position.y = 0;
  scene.add(video_mesh)

  //should i add this here? or outside of the else?
  scenes.push( scene );
  // sceneNum++
  // moveon = true;
  i++
  console.log(i)

}










// } //init over

function updateSize() {
  var width = canvas.clientWidth;
  var height = canvas.clientHeight;

  if ( canvas.width !== width || canvas.height != height ) {

    renderer.setSize( width, height, false );
  }

}

function animate() {
  render();
  requestAnimationFrame( animate );
}

function render() {

  updateSize();

  renderer.setClearColor( 0xffffff );
  renderer.setScissorTest( false );
  renderer.clear();

  renderer.setClearColor( 0xe0e0e0 );
  renderer.setScissorTest( true );

  scenes.forEach( function( scene ) {

    // so something moves
    scene.children[0].rotation.y = Date.now() * 0.001;

    // get the element that is a place holder for where we want to
    // draw the scene
    var element = scene.userData.element;

    // get its position relative to the page's viewport
    var rect = element.getBoundingClientRect();

    // check if it's offscreen. If so skip it
    if ( rect.bottom < 0 || rect.top  > renderer.domElement.clientHeight ||
      rect.right  < 0 || rect.left > renderer.domElement.clientWidth ) {

        return;  // it's off screen

      }
      // set the viewport
      var width  = rect.right - rect.left;
      var height = rect.bottom - rect.top;
      var left   = rect.left;
      var bottom = renderer.domElement.clientHeight - rect.bottom;

      renderer.setViewport( left, bottom, width, height );
      renderer.setScissor( left, bottom, width, height );

      var camera = scene.userData.camera;
      renderer.render( scene, camera );



    }); //for each over

  }


  function loopingfunction(response){

    if(i < response.people.length-1) {
      console.log(i)
      if (response.people[i].imageUrl && response.people[i].imageUrl.includes('https://s3.amazonaws.com/eternalcloudbucket/')){
        // console.log('image is '+ response.people[i].imageUrl)

        //this is asynchronous, go into here and pause forloop until it's done
        loader2.load(response.people[i].imageUrl, function ( texture ) {
          // do something with the texture
          createScene(texture, i, response);
        },
        // Function called when download progresses
        function ( xhr ) {
          console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
        // Function called when download errors
        function ( xhr ) {
          console.log( 'An error happened' );
        });


          i++
      } //if done


      else {
          console.log('we moved on, ignored this person');
          i++
      } //else over





    } //loop over

    loopingfunction(response)
  }












  // })
