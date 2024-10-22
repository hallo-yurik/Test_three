import {BoxGeometry, Mesh, MeshBasicMaterial} from "three";
import {mainManger} from "./index";

export default class CubeScene {
    constructor() {
        this.addCube();
    }

    addCube() {
        this.geometry = new BoxGeometry(1, 1, 1);
        this.material = new MeshBasicMaterial({color: 0x00ff00});
        this.cube = new Mesh(this.geometry, this.material);

        const {scene, camera} = mainManger.getBaseProps();
        scene.add(this.cube);
        camera.position.z = 5;
    }

    rotateCube() {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
    }

    update() {
        this.rotateCube();
    }
}
