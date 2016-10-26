var camera, scene, renderer, group;
var mobile = false;
var mouseEvent = {
    screenX: 0,
    screenY: 0
};
var raycaster = new THREE.Raycaster();
var target = new THREE.Object3D();
var orgGeometry, object
var pointLight, light2;

init();
setup();
render();

function init() {

    // renderer

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // scene

    scene = new THREE.Scene();

    // camera

    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 4, 10);
    camera.focalLength = camera.position.distanceTo(scene.position);

    // controls

    controls = new THREE.OrbitControls(camera);
    controls.autoRotate = true;
    controls.autoRotateSpeed = -.5
    controls.enabled = false;
    // controls.maxPolarAngle = Math.PI / 2
    // controls.maxDistance = 30

    if (WEBVR.isAvailable() === true) {
        controls = new THREE.VRControls(camera);
        controls.standing = false;

        renderer = new THREE.VREffect(renderer);
        document.body.appendChild(WEBVR.getButton(renderer));
    }

    //this is the eventlistener for WebVR
    window.addEventListener('deviceorientation', setOrientationControls, true);
    // other events
    window.addEventListener('resize', onWindowResize, false);

    window.addEventListener('mousemove', onMouseMove, false);

}

function onMouseMove(event) {
    mouseEvent = event;
    //console.log(mouseEvent.screenX / window.innerWidth)
    var mouse = {
        x: 0,
        y: 0
    }
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(group.children);

    if (intersects.length > 0) {

        //intersects[ 0 ].object.material.color.setHex(Math.random() * 0xffffff);
        //intersects[ 0 ].object.scale.y = 100
        TweenMax.to(intersects[0].object.position, .1, {
            y: 3
        })
        TweenMax.to(intersects[0].object.position, 1, {
            y: -2,
            delay: .1,
            ease: Back.easeOut
        })
    }
}

function setup() {
    // beginning of cubemap

    var cubeMap = getCubeMap(2)

    var cubeShader = THREE.ShaderLib['cube'];
    cubeShader.uniforms['tCube'].value = cubeMap

    var skyBoxMaterial = new THREE.ShaderMaterial({
        fragmentShader: cubeShader.fragmentShader,
        vertexShader: cubeShader.vertexShader,
        uniforms: cubeShader.uniforms,
        depthWrite: false,
        side: THREE.BackSide
    });

    var skyBox = new THREE.Mesh(new THREE.CubeGeometry(1000, 1000, 1000), skyBoxMaterial);

    scene.add(skyBox);

    //the end

    var texture = new THREE.TextureLoader().load("assets/textures/metal_tiles.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(30, 30);

    // central object

    var geometry = new THREE.TorusKnotGeometry(1.14, 0.55, 35, 10);
    orgGeometry = new THREE.TorusKnotGeometry(1.14, 0.55, 35, 10);
    var material = new THREE.MeshPhongMaterial({
        //color: 0,
        //map: texture,
        roughness: .2,
        lightMap: texture,
        side: THREE.DoubleSide,
        envMap: cubeMap,
        shading: THREE.FlatShading
    });
    object = new THREE.Mesh(geometry, material);
    object.position.y = 6
    // scene.add(object);



    // cubes
var geo = new THREE.SphereBufferGeometry( .2, 8, 8 );
    // var geo = new THREE.BoxGeometry(.3, .1, .1, 1, 1, 1)
    group = new THREE.Object3D();
      for (var _b = 0; _b < 3; _b++) {
    for (var _x = -13; _x <= 13; _x++) {
        for (var _y = -0; _y <= 0; _y++) {
            for (var _z = -13; _z <= 13; _z++) {
                var mesh = new THREE.Mesh(geo, material)

                mesh.scale.x = 10
                mesh.scale.y = 10
                mesh.scale.z = 10

                mesh.rotation.x = 0 //Math.random();
                mesh.rotation.y = 0;
                mesh.rotation.z = 0;

                mesh.position.x = _x
                mesh.position.y = _y - 2 + (_b*5)+ (Math.random(24))
                mesh.position.z = _z

                mesh.lookAt(scene.position)

                group.add(mesh);
            }
          }
        }
    }

    // merge

    /*var geom = new THREE.Geometry()
     for (var i = 0; i < group.children.length; i++) {
     group.children[i].updateMatrix();
     geom.merge(group.children[i].geometry, group.children[i].matrix);
     }
     group = new THREE.Mesh(geom, material);*/
    scene.add(group)

    // light

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(-1, 1.5, 0.5);
    scene.add(light);

    pointLight = new THREE.PointLight()
    pointLight.position.set(1,2,2)
    target.add(pointLight)

    scene.add(target)

    var ambient = new THREE.AmbientLight(0xaaaaaa)
    scene.add(ambient)

    jumpCam()
}

function jumpCam() {
    /*TweenMax.to(camera.position, 1, {
     x: (Math.random() - .5) * 10,
     y: (Math.random()) * 5,
     z: (Math.random() - .5) * 10,
     onComplete: jumpCam
     });*/

    TweenMax.to(target.position, 1, {
        x: (Math.random() - .5) * 10,
        y: (Math.random()) * 5,
        z: (Math.random() - .5) * 10,
        onComplete: jumpCam
    });
}

var time = 0;

function render() {

  if (scene1Transition){
    var moveupCam = setInterval(function(){
        camera.position.y -= .02
        console.log(camera.position.y)
        if (camera.position.y < -6){
          console.log('low enough')
          clearInterval(moveupCam)
          scene1Transition = false
        }

    },1000)

  }
    time += .02
    requestAnimationFrame(render);

    var i = 0
      for (var _b = 0; _b < 3; _b++) {
    for (var _x = -13; _x <= 13; _x++) {
        for (var _y = -0; _y <= 0; _y++) {
            for (var _z = -13; _z <= 13; _z++) {
                var mesh = group.children[i]

                mesh.scale.x = 1;
                mesh.scale.z = 1;
                mesh.scale.y = .5+ 1 * (1 + Math.sin(-6 * (time / 10) + _x / 2) * Math.sin(0 + _z / 2)) / 2;
                //mesh.scale.z = 10;

                mesh.lookAt(target.position)

                i++
            }
          }
        }
    }

    var v = object.geometry.vertices
    var oldV = orgGeometry.vertices
    for (var i = 0; i < v.length; i++) {
        if (Math.random() < .01) {
            TweenMax.to(v[i], 0, {
                x: oldV[i].x * (Math.random() / 1 + 1),
                y: oldV[i].y * (Math.random() / 1 + 1),
                z: oldV[i].z * (Math.random() / 1 + 1)
            })
        } else {
            TweenMax.to(v[i], 1, {
                x: oldV[i].x,
                y: oldV[i].y,
                z: oldV[i].z
            })
        }
    }
    object.geometry.verticesNeedUpdate = true

    controls.update();

    // camera.lookAt(scene.position)

    if (mobile) {
        camera.position.set(0, 0, 0)
        camera.translateZ(5);
    }
    renderer.render(scene, camera);

}
