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



// requirejs.config({
//     //By default load any module IDs from js/lib
//     baseUrl: 'js/lib',
//     //except, if the module ID starts with "app",
//     //load it from the js/app directory. paths
//     //config is relative to the baseUrl, and
//     //never includes a ".js" extension since
//     //the paths config could be for a directory.
//     paths: {
//         app: '../app'
//     }
// });
