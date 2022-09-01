const canvas = document.getElementById("render-canvas");
const engine = new BABYLON.Engine(canvas);

// Scene
const scene = new BABYLON.Scene(engine);

// scene.clearColor = new BABYLON.Color3(0, 0, 0);


// const camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 0, 0), scene);
const cameras = [
    new BABYLON.FlyCamera("FlyCamera", new BABYLON.Vector3(-300, 100, 500), scene),
    new BABYLON.FlyCamera("FlyCamera", new BABYLON.Vector3(0, 1000, 0), scene)
]
for (let camera of cameras) {
    camera.setTarget(new BABYLON.Vector3(0, 0, 0))
    camera.bankedTurn = true
    camera.attachControl(canvas, true);
}

let currentCamera = 0
let camera = cameras[currentCamera]

// Light
const light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 0, 0), scene);
light.intensity = 0.5

let t = 0;
let baseTheta = 0.0001;
let baseRotation = 0.01;

// User inputs
const thetaSlider = document.getElementById("thetaSlider");
thetaSlider.oninput = function() {
    baseTheta = this.value * 0.0001;
    baseRotation = this.value * 0.01;
}
const toggleCameraButton = document.getElementById("toggleCameraButton")
toggleCameraButton.onclick = function() {
    currentCamera = (currentCamera + 1) % 2
    scene.activeCamera = cameras[currentCamera]
    console.log(currentCamera)
    console.log(camera)
    // camera.setTarget(new BABYLON.Vector3(0, 0, 0))
    // camera.bankedTurn = true
    // camera.attachControl(canvas, true);
}


// Geometry and Material

// Sky
var skybox = BABYLON.Mesh.CreateBox("skyBox", 8000, scene)
var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
skyboxMaterial.backFaceCulling = false;
skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/universe/universe", scene, ["_px.png", "_py.png", "_pz.png", "_nx.png", "_ny.png", "_nz.png"], false);
// skyboxMaterial.reflectionTexture = new BABYLON.Texture("assets/cubemap.png", scene, true);
// skyboxMaterial.
skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
skybox.material = skyboxMaterial;
skybox.checkCollisions = true;

// Sun
const sun = BABYLON.Mesh.CreateSphere("sun", 100, 280, scene)
sun.position = new BABYLON.Vector3(0, 0, 0)

var sunMaterial = new BABYLON.StandardMaterial("material", scene)
sunMaterial.emissiveTexture = new BABYLON.Texture("assets/sun.png", scene);
// sunMaterial.disableLighting = true;
// sunMaterial.emissiveColor = new BABYLON.Color3(0.7, 0.1, 0.2)
sun.material = sunMaterial
sun.checkCollisions = true

// Mercury
var mercury = BABYLON.Mesh.CreateSphere("sphere", 32, .8, scene);
var mercuryMaterial = new BABYLON.StandardMaterial("material", scene);
mercuryMaterial.emissiveTexture = new BABYLON.Texture("assets/mercury.jpg", scene); 
mercuryMaterial.emissiveTexture.level = 0.4
mercuryMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
mercury.material = mercuryMaterial;
mercury.checkCollisions = true;
mercurytheta = 0

// Venus
var venus = BABYLON.Mesh.CreateSphere("sphere", 32, 2.4, scene);
var venusMaterial = new BABYLON.StandardMaterial("material", scene);
venusMaterial.emissiveTexture = new BABYLON.Texture("assets/venus.jpg", scene); 
venusMaterial.emissiveTexture.level = 0.4
venusMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
venus.material = venusMaterial;
venus.checkCollisions = true;
venustheta = 0

// Earth
var earth = BABYLON.Mesh.CreateSphere("sphere", 32, 2.4, scene);
var earthMaterial = new BABYLON.StandardMaterial("material", scene);
earthMaterial.emissiveTexture = new BABYLON.Texture("assets/earth.jpg", scene);
earthMaterial.emissiveTexture.level = 0.4
earthMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
earth.material = earthMaterial;
earth.checkCollisions = true;
earththeta = 0

// Moon
var moon = BABYLON.Mesh.CreateSphere("sphere", 32, 0.6, scene);
var moonMaterial = new BABYLON.StandardMaterial("material", scene);
moonMaterial.emissiveTexture = new BABYLON.Texture("assets/moon.jpg", scene); 
moonMaterial.emissiveTexture.level = 0.4
moonMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
moon.material = moonMaterial;
moon.checkCollisions = true;
moontheta = Math.PI/2


var mars = BABYLON.Mesh.CreateSphere("sphere", 32, 1.2, scene);
var marsMaterial = new BABYLON.StandardMaterial("material", scene);
marsMaterial.emissiveTexture = new BABYLON.Texture("assets/mars.jpg", scene); 
marsMaterial.emissiveTexture.level = 0.4
marsMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
mars.material = marsMaterial;
mars.checkCollisions = true;
marstheta = 0

var jupiter = BABYLON.Mesh.CreateSphere("sphere", 32, 28, scene);
var jupiterMaterial = new BABYLON.StandardMaterial("material", scene);
jupiterMaterial.emissiveTexture = new BABYLON.Texture("assets/jupiter.jpg", scene); 
jupiterMaterial.emissiveTexture.level = 0.4
jupiterMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
jupiter.material = jupiterMaterial;
jupiter.checkCollisions = true;
jupitertheta = 0

var ringMaterial = new BABYLON.StandardMaterial("ring", scene);
ringMaterial.emissiveTexture = new BABYLON.Texture("assets/ring.jpg", scene); 
ringMaterial.emissiveTexture.level = 0.8
ringMaterial.backFaceCulling = false; 

const innerRadius = 3*1.1;
const outerRadius = 3*2;
const segments = 1000;
var ringShape = [
    new BABYLON.Vector3(innerRadius, 0, 0),
    new BABYLON.Vector3(outerRadius, 0, 0),
    new BABYLON.Vector3(outerRadius, 0.01, 0),
    new BABYLON.Vector3(innerRadius, 0.01, 0)
];

var ring = BABYLON.MeshBuilder.CreateLathe("lathe", 
    {shape: ringShape, radius: innerRadius, tessellation:segments, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
ring.convertToFlatShadedMesh();
ring.material = ringMaterial;

var saturn = BABYLON.Mesh.CreateSphere("sphere", 32, 24, scene);
var saturnMaterial = new BABYLON.StandardMaterial("material", scene);
saturnMaterial.emissiveTexture = new BABYLON.Texture("assets/saturn.jpg", scene); 
saturnMaterial.emissiveTexture.level = 0.4
saturnMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
saturn.material = saturnMaterial;
saturn.checkCollisions = true;
saturntheta = 0

var uranus = BABYLON.Mesh.CreateSphere("sphere", 32, 10, scene);
var uranusMaterial = new BABYLON.StandardMaterial("material", scene);
uranusMaterial.emissiveTexture = new BABYLON.Texture("assets/uranus.jpg", scene); 
uranusMaterial.emissiveTexture.level = 0.4
uranusMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
uranus.material = uranusMaterial;
uranus.checkCollisions = true;
uranustheta = 0

var neptune = BABYLON.Mesh.CreateSphere("sphere", 32, 10, scene);
var neptuneMaterial = new BABYLON.StandardMaterial("material", scene);
neptuneMaterial.emissiveTexture = new BABYLON.Texture("assets/neptune.jpg", scene); 
neptuneMaterial.emissiveTexture.level = 0.4
neptuneMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
neptune.material = neptuneMaterial;
neptune.checkCollisions = true;
neptunetheta = 0

// Render
function renderLoop() {
    sun.rotation.y += baseRotation * 0.0001
    scene.render();
    t -= 0.01;

    mercury.rotation.y += baseRotation * 0.017;
    mercurytheta += baseTheta * 4.14
    mercury.position.x = 200*Math.cos(mercurytheta)
    mercury.position.z = 200*Math.sin(mercurytheta)

    venus.rotation.y += baseRotation * 0.004;
    venustheta += baseTheta * 1.62
    venus.position.x = 300*Math.cos(venustheta)
    venus.position.z = 300*Math.sin(venustheta)/0.651

    earth.rotation.y += baseRotation;
    earththeta += baseTheta
    earth.position.x = 400*Math.cos(earththeta)
    earth.position.z = 400*Math.sin(earththeta)

    moon.rotation.y += baseRotation;
    moontheta += baseTheta * 12.17
    moon.position.x = earth.position.x + 5*Math.cos(moontheta)
    moon.position.z = earth.position.z + 5*Math.sin(moontheta)

    mars.rotation.y += baseRotation * 0.98;
    marstheta += baseTheta * 0.53
    mars.position.x = 500*Math.cos(marstheta)
    mars.position.z = 500*Math.sin(marstheta)

    jupiter.rotation.y += baseRotation * 2.4;
    jupitertheta += baseTheta * 0.084
    jupiter.position.x = 600*Math.cos(jupitertheta)
    jupiter.position.z = 600*Math.sin(jupitertheta)

    saturn.rotation.y += baseRotation * 2.3;
    ring.rotation.x = 0.1;
    saturn.rotation.x = 0.1;
    saturntheta += baseTheta * 0.034
    ring.position.x = 700*Math.cos(saturntheta)
    ring.position.z = 700*Math.sin(saturntheta)
    saturn.position.x = ring.position.x
    saturn.position.z = ring.position.z 

    uranus.rotation.y += baseRotation * 1.4;
    uranustheta += baseTheta * 0.012
    uranus.position.x = 800*Math.cos(uranustheta)
    uranus.position.z = 800*Math.sin(uranustheta)

    neptune.rotation.y += baseRotation * 1.5;
    neptunetheta += baseTheta * 0.006
    neptune.position.x = 900*Math.cos(neptunetheta)
    neptune.position.z = 900*Math.sin(neptunetheta)
};


engine.runRenderLoop(renderLoop);