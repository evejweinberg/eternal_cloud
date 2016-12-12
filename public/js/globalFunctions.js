loadingManager.onProgress = function(item, loaded, total){

  //Loading precentage pattern
  console.log(loaded / total * 100 + '%');

}

//Signify loading done
loadingManager.onLoad = function(){

  //Start redrawing when the models are done loading
  animate();

}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}


var loader = new THREE.TextureLoader(loadingManager)
loader.load('../img/leo.jpg',function ( texture ) {
		// do something with the texture
		leoTxt = new THREE.MeshStandardMaterial( {
			map: texture,
      roughness: .64,
      metalness: .81,
      transparent: true,
      side: THREE.DoubleSide
		 } );

     var geo = new THREE.CylinderGeometry(6,6, .6, 6)

     LeoGeo = new THREE.Mesh(geo, leoTxt)
     LeoGeo.name = 'leogeo'
     LeoGeo.position.set(68* Math.cos(toRadians(350)), 5, 68* Math.sin(toRadians(350)))
    //  LeoGroup.add(LeoGeo)

   })


function FourHexes(x,y,z, width, col){
  for (var i =0; i< 20; i++){
    scene.add(MakeHex(x-i,y-i,z, "tl"+i,width, col))
      scene.add(MakeHex(x+i,y+i,z, "tl2"+i,width, col))
  }
}

var xCenter = Math.cos(toRadians(350)) * 72;

var zCenter = Math.sin(toRadians(350)) * 72;

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

  return hexy;

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
   if (audio.paused) {

     audio.play();
     currentVideo.play();
   }
   else {
     audio.pause();
     currentVideo.pause();
   }


}


function MakeLeo(x,y,z, name,width, col){

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



function newVidLady(){
  var newLady =  mainVidLady.clone()
  newLady.position.set(mainVidLady.position.x+ Math.random()*5,Math.random()*20,mainVidLady.position.z+ (Math.random()*1)); // or any other coordinates
  newLady.material.map.image.play()
  allLadies.push(newLady)
  scene.add(newLady)
  console.log('add a new lady')
  // mainVidLady.clone()
}




function callMainVideo(){


  video1 = document.getElementById( 'video1' );
	textureLady1 = new THREE.VideoTexture( video1 );
	textureLady1.minFilter = THREE.LinearFilter;
	textureLady1.magFilter = THREE.LinearFilter;
	textureLady1.format = THREE.RGBFormat;

  video2 = document.getElementById( 'video2' );
	textureLady2 = new THREE.VideoTexture( video2 );
	textureLady2.minFilter = THREE.LinearFilter;
	textureLady2.magFilter = THREE.LinearFilter;
	textureLady2.format = THREE.RGBFormat;

  video3 = document.getElementById( 'video3' );
  textureLady3 = new THREE.VideoTexture( video3 );
  textureLady3.minFilter = THREE.LinearFilter;
  textureLady3.magFilter = THREE.LinearFilter;
  textureLady3.format = THREE.RGBFormat;

  video4 = document.getElementById( 'video4' );
  textureLady4 = new THREE.VideoTexture( video4 );
  textureLady4.minFilter = THREE.LinearFilter;
  textureLady4.magFilter = THREE.LinearFilter;
  textureLady4.format = THREE.RGBFormat;

  matVid = new THREE.MeshLambertMaterial({color: 0xffffff, map: textureLady1});


  FourHexes(xCenter,3,zCenter, 6, pink)
  var geo = new THREE.BoxGeometry(20,20,1)
  var mat = new THREE.MeshStandardMaterial({overdraw: 0.5, color: 0xffffff, map: textureLady1,roughness: 1})
  mainVidLady = new THREE.Mesh(geo,matVid)
  mainVidLady.position.set(xCenter,22,zCenter)
  //radians
  mainVidLady.name = "target";
  mainVidLady.rotation.y = 1.5708
  mainVidLady.castShadow = true;
  mainVidLady.receiveShadow = false;

  scene.add(mainVidLady)
}



function sendMail(){
  console.log('button hit')
  var emailToSendTo = $("#users-email").val();
  console.log(emailToSendTo)
  $('#send-mail').innerHTML = "GOODBYE"
  // var personId = '5839c8ca21702e03667f0021'



  $.ajax({
    url : '/sendMail',
    // dataType : 'json',
    type : 'POST',
    data : {
      emailToSendTo: emailToSendTo,
      personId:personId
    }
  })
    .done(function(response){
        // success
        console.log('success in hitting send mail route');
        console.log(response);

    })
    .fail(function(err){
      console.log(err)
      // do error checking
      alert(err);
    })


}
