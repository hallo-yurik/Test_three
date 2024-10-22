import {BoxGeometry, DirectionalLight, Mesh, MeshStandardMaterial, Scene} from "three";
import {mainManger} from "../index";

export default class CubeScene {
    constructor() {
        const {scene: mainScene} = mainManger.getBaseProps();

        this.scene = new Scene();

        this.addCube();
        this.addLight();

        mainScene.add(this.scene);
    }

    addCube() {
        this.geometry = new BoxGeometry(1, 1, 1);
        this.material = new MeshStandardMaterial({color: "#ae61b7"});
        this.cube = new Mesh(this.geometry, this.material);

        this.scene.add(this.cube);
    }

    addLight() {
        const light_1 = new DirectionalLight("#ffffff", 0.5);
        const light_2 = new DirectionalLight("#ffffff", 0.5);
        const light_3 = new DirectionalLight("#ffffff", 0.5);

        light_1.position.set(1, 1, 1);
        light_2.position.set(-1, 1, 1);
        light_3.position.set(0, -1, 1);

        this.scene.add(light_1);
        this.scene.add(light_2);
        this.scene.add(light_3);
    }

    rotateCube() {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
    }

    update() {
        this.rotateCube();
    }
}
