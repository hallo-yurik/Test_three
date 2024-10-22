import {mainManger} from "../index";

export default class Ui {

    constructor() {
        for (let i = 0; i < 3; i++) {
            const buttonElement = window.document.getElementById(`button_${i}`);
            buttonElement.addEventListener("click", () => this.bindEvent(i));
        }
    }

    bindEvent(sceneIndex) {
        mainManger.initScene(sceneIndex);
    }
}
