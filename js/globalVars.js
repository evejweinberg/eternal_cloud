// Request animation frame loop function
var lastRender = 0;
var controls;

var raycaster;
var objects = [];
var canvas, hemiLight, spotlight, dirLight, directionalLight2, directionalLightR, directionalLight, lightA, light;
var container, renderer;
var serverObject;
var allBrains = []
var xCenter;
var zCenter;
var newServ;
var hexyCenter;
var numberOfservers = 18;
var spacing = 360 / numberOfservers-3;
var ServersInRows = 10;
var radius = 3
var brainHeight = .1
var cube;
var camera, scene;
var blocker = document.getElementById( 'blocker' );
var instructions = document.getElementById( 'instructions' );
var controlsEnabled = false;
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;
var d = 200;
var prevTime = performance.now();
var velocity = new THREE.Vector3();

var mainVidLady;
var videoBounce = .01
var video, videoImage, videoImageContext, videoTexture;
var playFirstvideo = false

var r = "img/";

var urls = [
    r + "px.jpg", r + "nx.jpg",
    r + "py.jpg", r + "ny.jpg",
    r + "pz.jpg", r + "nz.jpg"
];

var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

//COLORS
var pink = 0xfebdb7;
var teal =  0x009fc6;
var pinkDrk = 0xf68f83;
var mint = 0xa8e1d1;
var purple = 0xb9a0b1;


///////////////////
// BOOLEANS

var first_descend = false;



////3D WORLD

var camStartY = 10;
var camStartZ = 10;
var camDownSpeed = .19
