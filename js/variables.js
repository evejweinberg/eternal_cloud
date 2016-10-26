// var enterEC;
console.log('variables loaded')


var scene1Transition = false;


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
var firstTube;
var cameraTarget;


var frames;
var currentScene = 0;
