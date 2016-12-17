// Request animation frame loop function
var lastRender = 0;
var controls;
var yourValue = 0;
var elementStyle;
var showingLive = true;
var lowerTheHeight = .85
  // var oscillator;
var LeoGroup = new THREE.Group();
var raycaster;
var objects = [];
var popUpsInterval;
var myWindow;
var windowName = 0;
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
var controlsEnabled = false;
var blocker = document.getElementById( 'explore' );
var canvasElement = document.getElementById('canvasBox');
var instructions = document.getElementById( 'instructions' );
var tooglePointerLock = [instructions, canvasElement];
var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;
var d = 200;
var prevTime = performance.now();
var velocity = new THREE.Vector3();
var type22;
var ThreeSceneHghtRation = .9
var secondScreen, thirdScreen, loginPrompt;
var followcursor = false;
var switchBackfromAscii = false;

var mainVidLady;
var allLadies = [];
var videoBounce = .01
var video, videoImage, videoImageContext, videoTexture;
var scene3triggered = false;
var currentVideo;
var scene4= false;
var video4 = document.getElementById( 'video4' );

var tv;
var flamingVideo = document.getElementById( 'flamingWorld' );
// var textureFlaming = videoImage.getContext( '2d' );
        // background color if no video present
        // textureFlaming.fillStyle = '#000000';
        // textureFlaming.fillRect( 0, 0, videoImage.width, videoImage.height );
var textureFlaming = new THREE.VideoTexture( flamingVideo );



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
var listen_to_plan = false;
var playFirstvideo = false;
var havenotHitLady = true;


////3D WORLD
var textureLady2;
var textureLady1;
var leoTxt;
var LeoGeo;
var plane;
var camStartY = 22;
var camStartZ = 10;
var camDownSpeed = .19;
var Hexes = [];
var effect;
var asciiOn = false;
var switchedYet = false;
//Loading manager - decides when to render the scene in onProgress under the loaders
var loadingManager = new THREE.LoadingManager();
var cameraWorldMatrix = new THREE.Vector3();
var objectLoader3 = new THREE.ObjectLoader(loadingManager);
// var objectLoader3 = new THREE.JSONLoader();

var r = "img/";

var urls = [
    r + "px.jpg", r + "nx.jpg",
    r + "py.jpg", r + "ny.jpg",
    r + "pz.jpg", r + "nz.jpg"
];


var today = new Date();
var dd = today.getDate();
var mm = today.getMonth(); //January is 0!
var yyyy = today.getFullYear();
var goUp = today.getFullYear()
var hr = today.getHours()
var min =  today.getMinutes()
var sec = today.getSeconds()
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var monthNamesAb = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec"
];

today = monthNames[mm]+' '+dd+', '+2045 ;
var todayAbr = monthNamesAb[mm]+' '+dd+', '+2045 ;
var topDate = monthNamesAb[mm]+' '+dd+', '+ '2045 '+ hr+':'+ min



$('#date').html('TODAY: ' +today)
$('#date-top').html(topDate)
