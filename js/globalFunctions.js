function MakeHex(x,y,z, name,width, col){

  var geo = new THREE.CylinderGeometry(width,width, .6, 6)
  var material = new THREE.MeshStandardMaterial({
    roughness: .64,
    metalness: .81,
    transparent: true,
    opacity: .4,
    color: col,
    emissive: col,
    side: THREE.DoubleSide
  });
  var hexy = new THREE.Mesh(geo, material)
  hexy.position.set(x,y,z)
  hexy.rotation.x = 1.57
  if (name){

    hexy.name = name
  }
  scene.add(hexy)
}


function addLights() {
    hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 100, 0);
    // scene.add(hemiLight);

    var lightD = new THREE.AmbientLight( mint, .3 ); // soft white light
    scene.add( lightD );

///SpotLight( color, intensity, distance, angle, penumbra, decay )
    spotLight = new THREE.SpotLight( purple,2.5,30,50,.2,0 );
    spotLight.position.set( 0, 4, 0 );
    spotLight.castShadow = true;
    scene.add(spotLight)

    dirLight = new THREE.DirectionalLight(0xffffff, .9);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(-2, 1.75, 2);
    dirLight.position.multiplyScalar(50);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 4096;
    dirLight.shadow.mapSize.height = 4096;
    var d = 50;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = -0.0001;
    // dirLight.target = (new THREE.Vector3(0,0,0)
    scene.add(dirLight);
    // scene.add( dirLight.target )

    directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight.position.set(2, 3, -2);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    var d = 50;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;
    directionalLight.shadow.camera.far = 3500;
    directionalLight.shadow.bias = -0.0001;
    scene.add(directionalLight);

    directionalLight2 = new THREE.DirectionalLight(0x02f402, .2);
    directionalLight2.position.set(0, 12, 0);
    // directionalLight2.target = allBrains[0]
    directionalLight2.castShadow = true
        // scene.add(directionalLight2);

    directionalLightR = new THREE.DirectionalLight(0xffc1e5, 1);
    directionalLightR.position.set(0, 10, 0);
    // directionalLight2.target.set(0, 0, 0)
    directionalLightR.castShadow = true

    lightA = new THREE.PointLight(0xff0000, 1, 100);
    lightA.name = "lightA"
    lightA.position.set(5, 0, 0);
    // scene.add(lightA);
    lightA.castShadow = true

    light = new THREE.PointLight(0xffffff, 1, 100);
    light.name = "light"
    light.position.set(-5, 5, 5);
    light.castShadow = true;
    // scene.add(light);

    // scene.add(directionalLightR);
}


function startExperience(){
  playFirstvideo = true
  first_descend = true;
  document.getElementById('blocker').style.pointerEvents = "all";
  var tagline = document.getElementById('tagline-holder')
  TweenMax.to(tagline, 7, {opacity: 0,y: -100,ease: Expo.easeOut})
  //add pointer-controls back  to the splash dom element
}






// var controller = new ScrollMagic.Controller();
//
// // create a scene
// new ScrollMagic.Scene({
//         duration: 100,    // the scene should last for a scroll distance of 100px
//         offset: 50        // start this scene after scrolling for 50px
//     })
//     .setPin("#three-scene") // pins the element for the the scene's duration
//     .addTo(controller); // assign the scene to the controller
