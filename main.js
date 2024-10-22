import {PerspectiveCamera, Scene, WebGLRenderer} from "three";

export const scene = new Scene();
export const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
export const renderer = new WebGLRenderer();

function animate() {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
