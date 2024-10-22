import {PerspectiveCamera, Scene, WebGLRenderer} from "three";
import CubeScene from "./CubeScene";

export default class MainManager {
    scenes = [];
    wasFirstRender = false;

    constructor() {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new WebGLRenderer();
    }

    init() {
        this.initScene();
    }

    initScene() {
        this.scenes.push(new CubeScene());
    }

    getBaseProps() {
        return {
            scene: this.scene,
            camera: this.camera,
            renderer: this.renderer
        };
    }

    update() {
        if (!this.wasFirstRender) {
            this.wasFirstRender = true;

            this.init();
        }

        this.renderer.render(this.scene, this.camera);

        for (const scene of this.scenes) {
            scene.update();
        }
    }
}
