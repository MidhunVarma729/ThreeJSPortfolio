import './assets/css/style.css';
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';

//  Three most important compontent: Scene, camera, renderer.
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000) // Field of View, Aspect Ratio, View frustum.

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

camera.position.setZ(30);
camera.position.setX(-3);


// Adding object or geometry.
const geometry = new THREE.TorusGeometry(10,2,15,1000);
// const material = new THREE.MeshStandardMaterial({color: "ffffff", wireframe: true});
const material = new THREE.MeshStandardMaterial({color: 0xad0246});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus)


// Another Object.
// const geometry2 = new THREE.SphereGeometry( 2, 32, 16 ); 
// const material2 = new THREE.MeshStandardMaterial( { color: 0xff0000 } ); 
// const sphere2 = new THREE.Mesh( geometry2, material2 ); scene.add( sphere2 );


// Another Obect.
// const g3 = new THREE.TorusKnotGeometry(100, 30, 40,20,40,20);
// const m3 = new THREE.MeshDepthMaterial({color: 0x0000ff});
// const s3 = new THREE.Mesh( g3, m3 ); scene.add( s3 );




// Point Light Source which illuminates from a certian point.
const lightSource = new THREE.PointLight(0xffffff);
lightSource.position.set(5,5,5);
// scene.add(lightSource);


// Ambient Light source which almost illuminates everything.
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)


// Light Helper will show us the position of a point light
const lightHelper = new THREE.PointLightHelper(lightSource);
const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}

// const points = [];
// for ( let i = 0; i < 10; i ++ ) {
// 	points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
// }
// const geometryLathe = new THREE.LatheGeometry( points );
// const materialLathe = new THREE.MeshBasicMaterial( { color: 0xC0C0C0 } );
// const lathe = new THREE.Mesh( geometryLathe, materialLathe );
// scene.add( lathe );
// lathe.position.setZ(-100)


Array(300).fill().forEach(addStar); 

const spaceTexture =  new THREE.TextureLoader().load('../assets/img/space.jpg');
scene.background =  spaceTexture;

const gojoTexture = new THREE.TextureLoader().load('../assets/img/g1.png');

const gojo = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: gojoTexture})
);

scene.add(gojo);

const moonTexture = new THREE.TextureLoader().load('../assets/img/earth.jpg');
const normalTexture = new THREE.TextureLoader().load('../assets/img/normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map:moonTexture,
    normalMap: normalTexture,
  })
)

const sunTexture = new THREE.TextureLoader().load('../assets/img/sun.jpg');

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map:sunTexture,
  })
)
scene.add(sun);
sun.position.setZ(-50)
sun.position.setX(-90)


scene.add(moon);
moon.position.z = 30;
moon.position.setX(-10);

gojo.position.z = -5;
gojo.position.x = 2;


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  sun.rotation.x += 0.05;
  sun.rotation.y += 0.075;
  sun.rotation.z += 0.05;

  gojo.rotation.y += 0.01;
  gojo.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animate Function
function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x +=0.01;
  // torus.translateX += 1;
  torus.rotation.y += 0.005;
  torus.rotation.z +=0.01;

  // controls.update();
  moon.rotation.x += 0.005;
  sun.rotation.x += 0.015;

  renderer.render(scene, camera);
}

animate()
