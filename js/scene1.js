//Init the scene so we can push shit to it?
window.onload = function(){
  init();
};


if ( havePointerLock ) {

  var element = document.body;

  var pointerlockchange = function ( event ) {

    if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

      controlsEnabled = true;
      controls.enabled = true;

      blocker.style.display = 'none';

    } else {

      controls.enabled = false;

      blocker.style.display = '-webkit-box';
      blocker.style.display = '-moz-box';
      blocker.style.display = 'box';

      instructions.style.display = '';

    }

  };

  var pointerlockerror = function ( event ) {

    instructions.style.display = '';

  };

  // Hook pointer lock state change events
  document.addEventListener( 'pointerlockchange', pointerlockchange, false );
  document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
  document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

  document.addEventListener( 'pointerlockerror', pointerlockerror, false );
  document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
  document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

  instructions.addEventListener( 'click', function ( event ) {

    instructions.style.display = 'none';

    // Ask the browser to lock the pointer
    element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

    if ( /Firefox/i.test( navigator.userAgent ) ) {

      var fullscreenchange = function ( event ) {

        if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {

          document.removeEventListener( 'fullscreenchange', fullscreenchange );
          document.removeEventListener( 'mozfullscreenchange', fullscreenchange );

          element.requestPointerLock();
        }

      };

      document.addEventListener( 'fullscreenchange', fullscreenchange, false );
      document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );

      element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

      element.requestFullscreen();

    } else {

      element.requestPointerLock();

    }

  }, false );

} else {

  instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

}



function init() {



    container = document.getElementById('canvasBox');


    // Create a three.js scene.
    scene = new THREE.Scene();
    // var SCREEN_WIDTH = window.innerWidth;
    // var SCREEN_HEIGHT = window.innerHeight;

    // Create a three.js camera.
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(0, camStartY, camStartZ)
    renderer = new THREE.WebGLRenderer({
        alpha: false
            // antialias: true
    });

    renderer.setSize(window.innerWidth, 600);
    // renderer.setSize(window.innerWidth, window.innerHeight*ThreeSceneHghtRation);

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    //
    renderer.shadowCameraNear = 3;
    renderer.shadowCameraFar = 1000;
    renderer.shadowCameraFov = 50;
    //
    renderer.shadowMapBias = 0.0039;
    renderer.shadowMapDarkness = 0.5;
    renderer.shadowMapWidth = 512;
    renderer.shadowMapHeight = 512;

    renderer.setClearColor( pink );
				// renderer.setPixelRatio( window.devicePixelRatio );
				// renderer.setSize( window.innerWidth, window.innerHeight );
		// document.body.appendChild( renderer.domElement );
    container.appendChild(renderer.domElement )
    renderer.domElement.id = "three-scene"
    // document.getElementById("three-scene").style.height = getWindowHeight()*.75;
// console.log(renderer.domElement)
    // Append the canvas element created by the renderer to document body element.
    // container.appendChild(renderer.domElement);


    controls = new THREE.PointerLockControls( camera );
				scene.add( controls.getObject() );

				var onKeyDown = function ( event ) {
					switch ( event.keyCode ) {
						case 38: // up
						case 87: // w
							moveForward = true;
							break;
						case 37: // left
						case 65: // a
							moveLeft = true; break;
						case 40: // down
						case 83: // s
							moveBackward = true;
							break;
						case 39: // right
						case 68: // d
							moveRight = true;
							break;
						case 32: // space
							if ( canJump === true ) velocity.y += 350;
							canJump = false;
							break;
					}
				};
				var onKeyUp = function ( event ) {
          switch( event.keyCode ) {
          						case 38: // up
          						case 87: // w
          							moveForward = false;
          							break;
          						case 37: // left
          						case 65: // a
          							moveLeft = false;
          							break;
          						case 40: // down
          						case 83: // s
          							moveBackward = false;
          							break;
          						case 39: // right
          						case 68: // d
          							moveRight = false;
          							break;
          					}
          				};
          				document.addEventListener( 'keydown', onKeyDown, false );
          				document.addEventListener( 'keyup', onKeyUp, false );
          				raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );





    //////LOAD FLOOR ////////
    var loader2 = new THREE.TextureLoader(loadingManager);
    loader2.load('img/Floor.jpg', onTextureLoaded2);

    function onTextureLoaded2(texture) {
        // console.log('floor txt loaded')
        // texture.wrapS = THREE.RepeatWrapping;
        // texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(512, 512);

        var geometry = new THREE.PlaneGeometry(512, 512);

        var material = new THREE.MeshStandardMaterial({
            roughness: .64,
            metalness: .81,
            transparent: false,
            opacity: 1,
            color: 0xfffff,
            emissive: 0xffffff,
            side: THREE.DoubleSide
        });
        plane = new THREE.Mesh(geometry, material);
        scene.add(plane);
        plane.receiveShadow = true;
        // plane.position.y = 1.57;
        plane.rotation.x = 1.57;


    } //////////DONE LOADING FLOOR //////////




    callMainVideo()


        // scene.add(mesh)

    // Add a repeating grid as a skybox.
    var boxSize = 5;
    var loader = new THREE.TextureLoader(loadingManager);
    loader.load('img/bg2.png', onTextureLoaded);

    function onTextureLoaded(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        var geometry = new THREE.SphereGeometry(boxSize, boxSize, boxSize);
        var material = new THREE.MeshBasicMaterial({
            map: texture,
            color: 0xffffff,
            side: THREE.BackSide
        });

        var geometry = new THREE.SphereGeometry(340, 32, 32);

        var skysphere = new THREE.Mesh(geometry, material);
        scene.add(skysphere);

    }


    var textureCube = new THREE.CubeTextureLoader().load(urls);
    textureCube.mapping = THREE.CubeReflectionMapping;
    var reflectionMat = new THREE.MeshBasicMaterial({
        color: 0x9be2ff,
        envMap: textureCube,
        refractionRatio: 0.98,
        transparent: true,
        opacity: .2,
        reflectivity: 0.9
    })
    var reflectionMatBrain = new THREE.MeshStandardMaterial({
            color: pink,
            envMap: textureCube,
            roughness: 0.1,
            refractionRatio: 0.92,
            // reflectivity: 0.7
        })
        // for (var j = 2; j <= 10; j += 10) {
    var objectLoader2 = new THREE.ObjectLoader(loadingManager);
    objectLoader2.load("asset_src/model.json", function(obj) {

        //give it a global name, so I can access it later
        serverObject = obj

        serverObject.castShadow = true;
        serverObject.children[1].material = reflectionMat
        serverObject.children[0].material = reflectionMatBrain

        //see what's inside of it
        obj.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                // console.log(child)
            }
        })

        drawServers(7,26)
        drawServers(10,40)
        drawServers(13,50)
        drawServers(16,63)
        drawServers(19,80)
        // drawServers(23,90)
        drawServers(26,80)
        drawServers(30,90)
        // drawServers(33,130)
        drawServers(36,160)
        // console.log(allBrains.length)


function drawServers(rad,num){
  var dummy = num+3
  var spacing = 360/dummy
  for (var i =0; i<num;i++){
    var tempNew = serverObject.clone();
    tempNew.scale.set(.27, .27, .27);
    tempNew.position.set(rad*Math.cos(toRadians(spacing*i)), 0, rad*Math.sin(toRadians(spacing*i)));
    allBrains.push(tempNew);
    scene.add(tempNew)
  }

}
  //number of FULL server circles, and the radius of those circles
  for (var j = 3; j <= 14; j+=2) {
    //nmber of servers in each circle
        for (var i = 0; i <= numberOfservers; i++) {
          //make a new object
            var tempNew = serverObject.clone();
            tempNew.lookAt(new THREE.Vector3(0,0,0))

            xCenter = Math.cos(toRadians(i * spacing)) * j;

            zCenter = Math.sin(toRadians(i * spacing)) * j;

            tempNew.scale.set(.27, .27, .27);

            tempNew.position.set(xCenter, 0, zCenter);

            allBrains.push(tempNew);

            // scene.add(allBrains[i*j]);


        }
        //make more servers in the next circle
        numberOfservers++
        //decrease spacing in next circle
        spacing = 360 / numberOfservers-3*j;
      }

        // console.log(allBrains.length)

    });


    // }
for (var i=0; i<30; i++){
var rnd = [pink, pinkDrk, mint, purple]

  Hexes.push(MakeHex(Math.random()*30-30,10+(i*3),Math.random()*10-10, "newHex"+ i,2, rnd[i%rnd.length]))
scene.add(Hexes[i])
}




    addLights()
    camera.parent.rotation.x = .2

    // addHelpers(1000, 100, [light,lightA,directionalLight,directionalLightR,directionalLight2])





}
//init over



function toRadians(angle) {
    return angle * (Math.PI / 180);
}




function animate(timestamp) {

  if (first_descend){
    TweenMax.to(camera.position, 2,{z: 0, y: -5.5},function(){first_descend=false})
  }

for (var i in Hexes){
  Hexes[i].rotation.z += .1
}



  var cameraWorldMatrix = new THREE.Vector3();
  // console.log(cameraWorldMatrix)

    cameraWorldMatrix.setFromMatrixPosition( camera.matrixWorld );
    var dist = parseInt( cameraWorldMatrix.distanceTo(mainVidLady.position) );

    // console.log(cameraWorldMatrix);
    if (dist < 10){
      scene.remove(mainVidLady)
      setTimeout(function(){
        MakeHex(68* Math.cos(toRadians(350)), 5, 68* Math.sin(toRadians(350)), "newHex4",6, mint)
      },3000)
        video.src = "../asset_src/welcome.mp4";
        scene.add(mainVidLady)
        video.play()
    }

    mainVidLady.lookAt(cameraWorldMatrix)

  if ( controlsEnabled ) {
    raycaster.ray.origin.copy( controls.getObject().position );
    raycaster.ray.origin.y -= 10;

    var intersections = raycaster.intersectObjects( objects );

    var isOnObject = intersections.length > 0;

    var time = performance.now();
    var delta = ( time - prevTime ) / 1000;

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    if ( moveForward ) velocity.z -= 400.0 * delta;
    if ( moveBackward ) velocity.z += 400.0 * delta;

    if ( moveLeft ) velocity.x -= 400.0 * delta;
    if ( moveRight ) velocity.x += 400.0 * delta;

    if ( isOnObject === true ) {
      velocity.y = Math.max( 0, velocity.y );

      canJump = true;
    }

    controls.getObject().translateX( velocity.x * delta );
    controls.getObject().translateY( velocity.y * delta );
    controls.getObject().translateZ( velocity.z * delta );

    if ( controls.getObject().position.y < 10 ) {

      velocity.y = 0;
      controls.getObject().position.y = 10;

      canJump = true;

    }
    prevTime = time;

  }



    // if (playFirstvideo == true){
    //   video.loop = true
    // } else {
    //   video.loop = false
    // }

    // if (camera os close to screen, then switch video)

// if(video.readyState == video.HAVE_ENOUGH_DATA){
//
//   videoImageContext.drawImage(video,0,0,video.width, video.height);
//   if (videoTexture){
//
//     videoTexture.needsUpdate = true
//   }
// }

    for (var i in allBrains) {
        if (allBrains[i].children[0].position.z > 7.6) {
            brainHeight = -0.005
        }
        if (allBrains[i].children[0].position.z < 7.3) {
            brainHeight = .005
        }

        allBrains[i].children[0].position.z += brainHeight
    }
    var delta = Math.min(timestamp - lastRender, 500);
    lastRender = timestamp;

      mainVidLady.position.y+=videoBounce
      // mainVidLady.lookAt(camera)

    if (mainVidLady.position.y>5.1){
      videoBounce = -.02
      }
    if (mainVidLady.position.y<2.9){
      videoBounce = .02
      }


    requestAnimationFrame(animate);
    renderer.render(scene, camera);

}



function onResize(e) {
    camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      // renderer.setSize( window.innerWidth, window.innerHeight*ThreeSceneHghtRation );
        renderer.setSize( window.innerWidth, 600);
}

function addHelpers(grid_width, dims, light_name) {
  // console.log(light_name[0].position)
    if (light_name) {
        for (var i in light_name) {
          // console.log(light_name[i].position)
          var geo = new THREE.SphereGeometry(.25,.25,.25)
          var mat = new THREE.MeshBasicMaterial({color:0x0000FF})
          var mesh = new THREE.Mesh(geo,mat)
          mesh.position.set(light_name[i].position)
          scene.add(mesh)
            // var directionalLightHelper = new THREE.DirectionalLightHelper(window[light_name[i].name], 50);
            // scene.add(directionalLightHelper)
        }
    }


    var axes = new THREE.AxisHelper(200);
    scene.add(axes);
    var gridXY = new THREE.GridHelper(grid_width, dims, 0xff0000, 0xffffff);
    gridXY.rotation.x = Math.PI;
    gridXY.position.set(0, 0, 0);
    // gridXY.setColors(new THREE.Color(0xff0000), new THREE.Color(0xffffff));
    scene.add(gridXY);
}




function callMainVideo(){

  video1 = document.getElementById( 'video1' );
	var texture1 = new THREE.VideoTexture( video1 );
	texture1.minFilter = THREE.LinearFilter;
	texture1.magFilter = THREE.LinearFilter;
	texture1.format = THREE.RGBFormat;

  video2 = document.getElementById( 'video2' );
	var texture2 = new THREE.VideoTexture( video2 );
	texture2.minFilter = THREE.LinearFilter;
	texture2.magFilter = THREE.LinearFilter;
	texture2.format = THREE.RGBFormat;

  matVid = new THREE.MeshLambertMaterial({color: 0xffffff, map: texture1});




  var xCenter = Math.cos(toRadians(350)) * 72;

  var zCenter = Math.sin(toRadians(350)) * 72;
  var geo = new THREE.BoxGeometry(20,20,.01)
  var mat = new THREE.MeshStandardMaterial({overdraw: 0.5, color: 0xffffff, map: videoTexture,roughness: 1})
  mainVidLady = new THREE.Mesh(geo,matVid)
  mainVidLady.position.set(xCenter,5,zCenter)
  //radians
  mainVidLady.name = "target";
  mainVidLady.rotation.y = 1.5708
  mainVidLady.castShadow = true;
  mainVidLady.receiveShadow = false;

  scene.add(mainVidLady)
}
