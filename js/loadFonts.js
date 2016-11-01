function loadfont() {
  var loader = new THREE.FontLoader();
  //font json file loaded in header
  loader.load('hel.json', function(font) {

    var textGeo = new THREE.TextGeometry("whatever you want to say", {

      font: font,
      size: textSize,
      height: .3,
      curveSegments: 12,
      bevelThickness: 0,
      bevelSize: 0,
      bevelEnabled: true

    });

    textGeo.computeBoundingBox();
    var centerOffset = -.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
    var centerOffsetY = -.5 * ( textGeo.boundingBox.max.y - textGeo.boundingBox.min.y );
    var textMaterial = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      metalness: 0.5,
      roughness: 0.5,
      // emissive: 0x000000,
      // emissiveIntensity:.1

    });

    type = new THREE.Mesh(textGeo, textMaterial);
    type.position.x = 0
    type.position.y = 10.5
    type.position.z = 4
    type.geometry.translate(centerOffset, centerOffsetY, 0 );

    scene.add(type);


  });



}
