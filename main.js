import {BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer} from "three";

export const scene = new Scene();
export const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
export const renderer = new WebGLRenderer();

const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshBasicMaterial({color: 0x00ff00});
const cube = new Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
    renderer.render(scene, camera);
    camera.position.z = 5;
}

renderer.setAnimationLoop(animate);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
