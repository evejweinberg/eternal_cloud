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
var manager = new THREE.LoadingManager();




//get data from mongoLab database!!

jQuery.ajax({
  url : '/api/get',
  dataType : 'json',
  success : function(response) {

    // console.log(response.people.length) <---- returns 23




    init();
    animate();

    function init() {

      canvas = document.getElementById( "c" );

      var geometries = [
        new THREE.BoxGeometry( 1, 1, 1 ),
        new THREE.SphereGeometry( 0.5, 12, 8 ),
        new THREE.DodecahedronGeometry( 0.5 ),
        new THREE.CylinderGeometry( 0.5, 0.5, 1, 12 ),
      ];

      var template = document.getElementById( "template" ).text;
      var content = document.getElementById( "content" );

      for ( var i =  0; i < 40; i ++ ) {

        var scene = new THREE.Scene();

        // make a list item
        var element = document.createElement( "div" );
        element.className = "list-item";
        element.innerHTML = template.replace( '$', i + 1 );

        // Look up the element that represents the area
        // we want to render the scene
        scene.userData.element = element.querySelector( ".scene" );
        content.appendChild( element );

        var camera = new THREE.PerspectiveCamera( 50, 1, 1, 10 );
        camera.position.z = 2;
        scene.userData.camera = camera;

        var controls = new THREE.OrbitControls( scene.userData.camera, scene.userData.element );
        controls.minDistance = 2;
        controls.maxDistance = 5;
        controls.enablePan = false;
        controls.enableZoom = false;
        scene.userData.controls = controls;

        // add one random mesh to each scene
        var geometry = geometries[ geometries.length * Math.random() | 0 ];

        var material = new THREE.MeshStandardMaterial( {

          color: new THREE.Color().setHSL( Math.random(), 1, 0.75 ),
          roughness: 0.5,
          metalness: 0,
          shading: THREE.FlatShading

        } );

        scene.add( new THREE.Mesh( geometry, material ) );

        scene.add( new THREE.HemisphereLight( 0xaaaaaa, 0x444444 ) );

        var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
        light.position.set( 1, 1, 1 );
        scene.add( light );

        scenes.push( scene );

      }


      renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
      renderer.setClearColor( 0xffffff, 1 );
      renderer.setPixelRatio( window.devicePixelRatio );

    }








  },//success fucntion over
});//ajax request over






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

    //camera.aspect = width / height; // not changing in this example
    //camera.updateProjectionMatrix();

    //scene.userData.controls.update();

    renderer.render( scene, camera );

  } );

}





function updateSize() {

  var width = canvas.clientWidth;
  var height = canvas.clientHeight;

  if ( canvas.width !== width || canvas.height != height ) {

    renderer.setSize( width, height, false );

  }

}
