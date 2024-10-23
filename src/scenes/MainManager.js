import {Color, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import WaveScene from "./WaveScene";
import Ui from "../ui/ui";
import CubeScene from "./CubeScene";
import DrawingScene from "./DrawingScene";

export default class MainManager {
    scenes = [CubeScene, WaveScene, DrawingScene];
    currentScene = null;

    constructor() {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new WebGLRenderer();

        this.camera.position.z = 5;

        this.addBackground();
        this.initUi();
    }

    initUi() {
        new Ui();
    }

    initScene(sceneIndex) {
        if (this.currentScene) this.scene.remove(this.currentScene.scene);
        this.currentScene = new this.scenes[sceneIndex]();
    }

    getBaseProps() {
        return {
            scene: this.scene,
            camera: this.camera,
            renderer: this.renderer
        };
    }

    addBackground() {
        this.scene.background = new Color("#63b7c0");
    }

    update() {
        this.renderer.render(this.scene, this.camera);
        this.currentScene?.update?.();
    }
}
