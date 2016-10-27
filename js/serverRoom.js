// Request animation frame loop function
var lastRender = 0;
var cubeCamera;
var container, stats;
			var camera, scene, renderer;
			var mesh, geometry;
			var cubeCamera;
			var sunLight, pointLight, ambientLight;
			var mixer;
			var clock = new THREE.Clock();
			var gui, shadowCameraHelper, shadowConfig = {
				shadowCameraVisible: false,
				shadowCameraNear: 750,
				shadowCameraFar: 4000,
				shadowCameraFov: 30,
				shadowBias: -0.0002
			};
      var serverObject;
      var allBrains = []
      var xCenter;
      var zCenter;
      var newServ;
      var numberOfservers = 15;
      var spacing = 360 / numberOfservers;
      var ServersInRows = 10;
      var radius = 3
      var brainHeight = .1

      var r = "img/";

      var urls = [
          r + "px.jpg", r + "nx.jpg",
          r + "py.jpg", r + "ny.jpg",
          r + "pz.jpg", r + "nz.jpg"
      ];


init();
animate();


function init(){

  container = document.createElement( 'div' );
  				document.body.appendChild( container );


    // Create a three.js scene.
    var scene = new THREE.Scene();

    // Create a three.js camera.
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
		// camera.position.set( 500, 400, 1200 );

    // CUBE CAMERA
    cubeCamera = new THREE.CubeCamera( 1, 10000, 128 );
    scene.fog = new THREE.Fog( 0, 1000, 10000 );


    //////LOAD FLOOR ////////
    var loader2 = new THREE.TextureLoader();
    loader2.load('img/Floor.jpg', onTextureLoaded2);

    function onTextureLoaded2(texture) {
        console.log('floor txt loaded')
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(400, 400);

        var geometry = new THREE.BoxGeometry(300, 2, 300);

        var material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: .4,
            color: 0xffffff,
            side: THREE.DoubleSide
        });
        var plane = new THREE.Mesh(geometry, material);
        scene.add(plane);
        plane.receiveShadow = true;
        plane.position.y = 0;


    }
    //////////DONE LOADING FLOOR //////////


    // Add a repeating grid as a skybox.
    var boxSize = 5;
    var loader = new THREE.TextureLoader();
    loader.load('img/bg2.png', onTextureLoaded);

    function onTextureLoaded(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        // texture.repeat.set(boxSize * .2, boxSize * .2);

        var material = new THREE.MeshBasicMaterial({
            map: texture,
            color: 0xffffff,
            side: THREE.BackSide
        });




        var geometry = new THREE.SphereGeometry(380, 32, 32);
        // var material = new THREE.MeshBasicMaterial({
        //     color: 0xffff00
        // });
        var skysphere = new THREE.Mesh(geometry, material);
        scene.add(skysphere);


        // setupStage();
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
    var reflectionMatBrain = new THREE.MeshBasicMaterial({
        color: 0xffc0cb,
        envMap: textureCube,
        refractionRatio: 0.92,
        reflectivity: 0.7
    })

    var objectLoader = new THREE.ObjectLoader();
    objectLoader.load("asset_src/model.json", function(obj) {

        //give it a global name, so I can access it later
        serverObject = obj

        serverObject.castShadow = true;
        serverObject.children[1].material = reflectionMat
        serverObject.children[0].material = reflectionMatBrain

        //see what's inside of it
        obj.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                console.log(child)
            }
        })
        for (var j = 0; j <= ServersInRows; j++) {
            for (var i = 0; i <= numberOfservers; i++) {

                var tempNew = serverObject.clone();

                xCenter = Math.sin(toRadians(i * spacing) * (j + 1 * 1));

                zCenter = Math.cos(toRadians(i * spacing) * (j + 1 * 1));

                tempNew.scale.set(.05, .05, .05);

                tempNew.position.set(xCenter, controls.userHeight - .2, zCenter);

                allBrains.push(tempNew);

                scene.add(allBrains[i]);

            }
        }


        console.log(allBrains.length)

    });





    // LIGHTS
      ambientLight = new THREE.AmbientLight( 0x3f2806 );
      scene.add( ambientLight );
      pointLight = new THREE.PointLight( 0xffaa00, 1, 5000 );
      scene.add( pointLight );
      sunLight = new THREE.SpotLight( 0xffffff, 0.3, 0, Math.PI/2 );
      sunLight.position.set( 1000, 2000, 1000 );
      sunLight.castShadow = true;
      sunLight.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( shadowConfig.shadowCameraFov, 1, shadowConfig.shadowCameraNear, shadowConfig.shadowCameraFar ) );
      sunLight.shadow.bias = shadowConfig.shadowBias;
      scene.add( sunLight );
      // SHADOW CAMERA HELPER
      shadowCameraHelper = new THREE.CameraHelper( sunLight.shadow.camera );
      shadowCameraHelper.visible = shadowConfig.shadowCameraVisible;
      scene.add( shadowCameraHelper );
      // RENDERER
      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      container.appendChild( renderer.domElement );
      //
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      //
      renderer.gammaInput = true;
      renderer.gammaOutput = true;
      //
      controls = new THREE.TrackballControls( camera, renderer.domElement );
      controls.target.set( 0, 120, 0 );
      controls.rotateSpeed = 1.0;
      controls.zoomSpeed = 1.2;
      controls.panSpeed = 0.8;
      controls.noZoom = false;
      controls.noPan = false;
      controls.staticMoving = true;
      controls.dynamicDampingFactor = 0.15;


}




    window.addEventListener('resize', onResize, true);
    // window.addEventListener('vrdisplaypresentchange', onResize, true);


    function animate() {
    				render();
            for (var i in allBrains) {
                if (allBrains[i].children[0].position.z > 7.6) {
                    brainHeight = -0.005
                }
                if (allBrains[i].children[0].position.z < 7.3) {
                    brainHeight = .005
                }

                allBrains[i].children[0].position.z += brainHeight
            }
            requestAnimationFrame( animate );

    			}

  function render() {
        				// update
        				// var delta = clock.getDelta();
        				controls.update();

        				// render cube map
        				// mesh.visible = false;
        				cubeCamera.updateCubeMap( renderer, scene );
        				// mesh.visible = true;
        				// render scene
        				renderer.render( scene, camera );
  }




    function onResize(e) {
				renderer.setSize( window.innerWidth, window.innerHeight );

        // effect.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        controls.handleResize();
    }



    function setStageDimensions(stage) {
        // Make the skybox fit the stage.
        var material = skybox.material;
        scene.remove(skybox);

        // Size the skybox according to the size of the actual stage.
        var geometry = new THREE.BoxGeometry(stage.sizeX, boxSize, stage.sizeZ);
        skybox = new THREE.Mesh(geometry, material);

        // Place it on the floor.
        skybox.position.y = boxSize / 2;
        scene.add(skybox);

        // Place the cube in the middle of the scene, at user height.
        cube.position.set(0, controls.userHeight, 0);
    }
