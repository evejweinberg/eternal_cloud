//Track global loading
// if (typeof jQuery == 'undefined') {
//     var script = document.createElement('script');
//     script.type = "text/javascript";
//     script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js";
//     document.getElementsByTagName('head')[0].appendChild(script);
// }
// $(document).ready(function () {

loadingManager.onProgress = function(item, loaded, total){

  //Loading precentage pattern
  console.log(loaded / total * 100 + '%');

}

//Signify loading done
loadingManager.onLoad = function(){

  //get rid of the loading screen

  //Start redrawing when the models are done loading
  animate();

}




///HEXAGONS
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
  return hexy
}


function addLights() {
    hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 100, 0);
    // scene.add(hemiLight);

    var lightD = new THREE.AmbientLight( 0xffffff, .3 ); // soft white light
    scene.add( lightD );

///SpotLight( color, intensity, distance, angle, penumbra, decay )
    spotLight = new THREE.SpotLight( 0xffffff,2.5,30,50,.2,0 );
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
  pointerlockchange();
  document.getElementById('login').style.display = "block"
  playFirstvideo = true;
  // elementStyle.top = "40px";
  TweenMax.to('#three-scene',2,{top: 60, ease: Strong.easeInOut})
  video1.play()
  first_descend = true;
  document.getElementById('blocker').style.pointerEvents = "all";
  var tagline = document.getElementById('tagline-holder')
  TweenMax.to(tagline, 9, {opacity: 0,y: -500,ease: Expo.easeOut})
  TweenMax.to(camera.parent.rotation,2,{x:0})
  document.getElementById('walking-instructions').style.display = "block";
  //add pointer-controls back  to the splash dom element
}




function loadfont() {
  var loader = new THREE.FontLoader(loadingManager);
  loader.load('hel.typeface.json', function(font) {

    var textGeo = new THREE.TextGeometry("22 TB", {

      font: font,
      size: textSize,
      height: .3,
      curveSegments: 12,
      bevelThickness: 0,
      bevelSize: 0,
      bevelEnabled: true

    });

    textGeo.computeBoundingBox();
    centerOffset = -.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
    var centerOffsetY = -.5 * ( textGeo.boundingBox.max.y - textGeo.boundingBox.min.y );
    var textMaterial = new THREE.MeshPhongMaterial({
      color: mint,
      metalness: 0.5,
      roughness: 0.5,
    });

    type22 = new THREE.Mesh(textGeo, textMaterial);
    type22.position.x = 0
    type22.position.y = 10.5
    type22.position.z = 4
    type22.geometry.translate(centerOffset, centerOffsetY, 0 );

    scene.add(type22);


  });
}




function toggleAudio(){
   var audio = document.getElementById("myTune");
   if (audio.paused) audio.play();
   else audio.pause();
}



// })
