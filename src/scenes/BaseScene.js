import {mainManger} from "../index";
import {Scene} from "three";

export default class BaseScene {
    constructor() {
        const {scene: mainScene} = mainManger.getBaseProps();

        this.scene = new Scene();

        mainScene.add(this.scene);
    }
}
