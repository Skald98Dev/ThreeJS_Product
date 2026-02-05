import * as THREE from "https://cdn.skypack.dev/three@0.152.2";
import { GLTFLoader } from "jsm/loaders/GLTFLoader.js";
import {OrbitControls} from "jsm/controls/OrbitControls.js";

const loader = new GLTFLoader();

const container = document.querySelector(".three-container");
// const container2 = document.querySelector(".title");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(
  43,
  container.clientWidth / container.clientHeight,
  0.9,
  50
);
camera.position.z = 7.5;
camera.position.y = 0;
camera.position.x =-2;



const renderer = new THREE.WebGLRenderer({ alpha: true });

// 2. Set the clear color to transparent (color 0x000000, alpha 0)
renderer.setClearColor(0x000000, 0);

// 3. Ensure your scene background is not set
scene.background = null; 
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// renderer.setSize(container.clientWidth, container.clientHeight);
// container2.appendChild(renderer.domElement);


const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat= new THREE.MeshStandardMaterial({
    color: 0xaaffff,
    wireframe: true,
    flatShading: true,
   // map: uvTexture,
});


//Orbit Controls with mouse
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 10.0; // Adjust speed (default is 2.0)
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// // Light2
// const light2 = new THREE.HemisphereLight( 0xffffff, 0x080820, 1 );
// // scene.add( light2 );
const light3 = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light3 );


//3D OBJECT LOADING
loader.load('Bottle2.glb', function(gltf){

    scene.add(gltf.scene);
    //mesh.add(gltf.scene);
}, undefined, function( error ){

    console.error(error);
});



const mesh1 = new THREE.Mesh(geo, mat );


//Scene drag and edit 
function animate(t=0){
requestAnimationFrame(animate);
mesh1.rotation.y= Math.PI * 0.5;
//mesh.rotation.x= t* 0.0001;
mesh1.rotation.z= t* 0.0001;
renderer.render(scene, camera);
controls.update();
}

animate();



// Resize handling
window.addEventListener("resize", () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});