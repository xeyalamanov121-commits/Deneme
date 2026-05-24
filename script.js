let energy = 100, balance = 0;

function updateHUD() {
  document.getElementById("energy").innerText = "Enerji: " + energy;
  document.getElementById("balance").innerText = "Balans: " + balance;
}

function watchAd() {
  energy = Math.min(100, energy + 20);
  updateHUD();
}

// --- Three.js səhnəsi ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 6);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// İşıqlar
const ambientLight = new THREE.AmbientLight(0x404040, 2);
const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(5, 5, 5);
scene.add(ambientLight, pointLight);

// GLTF modelləri yükləmə
const loader = new THREE.GLTFLoader();

// Ayı modeli
loader.load('models/bear.glb', function(gltf) {
  const bear = gltf.scene;
  bear.scale.set(1.5, 1.5, 1.5);
  scene.add(bear);

  renderer.domElement.addEventListener("click", () => {
    if (energy > 0) {
      balance += 10;
      energy -= 5;
      updateHUD();
      bear.rotation.y += 0.2;
    } else {
      alert("Enerji bitdi! Reklama baxaraq doldur.");
    }
  });
});

// Arı modeli
loader.load('models/bee.glb', function(gltf) {
  const bee = gltf.scene;
  bee.scale.set(0.5, 0.5, 0.5);
  bee.position.set(2, 1, 0);
  scene.add(bee);
});

// Neon kabellər modeli
loader.load('models/cables.glb', function(gltf) {
  const cables = gltf.scene;
  cables.scale.set(2, 2, 2);
  cables.position.set(0, -1, 0);
  scene.add(cables);
});

// Animasiya dövrü
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Ekran ölçüsü dəyişəndə yenilə
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
