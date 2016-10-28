function MakeHex(x,y,z, name){

  var geo = new THREE.CylinderGeometry(3, 3, .6, 6)
  var material = new THREE.MeshStandardMaterial({
    roughness: .64,
    metalness: .81,
    transparent: true,
    opacity: .4,
    color: 0xdebe8f,
    emmissive: 0xdebe8f,
    side: THREE.DoubleSide
  });
  var hexy = new THREE.Mesh(geo, material)
  hexy.position.set(x,y,z)
  if (name){

    hexy.name = name
  }
  scene.add(hexyCenter)
}
