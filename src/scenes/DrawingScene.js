import {mainManger} from "../index";
import {
    BoxGeometry,
    BufferGeometry,
    LineCurve3, Mesh,
    MeshBasicMaterial, Object3D,
    TubeGeometry, Vector2,
    Vector3
} from "three";
import BaseScene from "./BaseScene";

export default class DrawingScene extends BaseScene {
    clicked = false;
    startMousePosition = new Vector2();
    movingMousePosition = new Vector2();
    startWorldPosition = new Vector3();
    movingWorldPosition = new Vector3();
    DISTANCE_IN_SPACE = 20;
    BOX_Z_OFFSET = 0.5;

    lines = [];

    constructor() {
        super();

        const {camera} = mainManger.getBaseProps();

        this.camera = camera;

        this.onMouseDownEvent = this.onMouseDown.bind(this);
        this.onMouseMoveEvent = this.onMouseMove.bind(this);
        this.onMouseUpEvent = this.onMouseUp.bind(this);

        this.geometry = new BufferGeometry();
        this.material = new MeshBasicMaterial({color: "#d39d73"});
        this.boxGeometry = new BoxGeometry(2, 1, 0.1);
        this.boxMaterial = new MeshBasicMaterial({color: "#ffffff"});

        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener("mousedown", this.onMouseDownEvent);
        document.addEventListener("mousemove", this.onMouseMoveEvent);
        document.addEventListener("mouseup", this.onMouseUpEvent);

        this.scene.addEventListener("removed", () => {
            document.removeEventListener("mousedown", this.onMouseDownEvent);
            document.removeEventListener("mousemove", this.onMouseMoveEvent);
            document.removeEventListener("mouseup", this.onMouseUpEvent);
        });
    }

    onMouseDown(event) {
        this.clicked = true;

        this.startMousePosition.x = event.clientX / window.innerWidth * 2 - 1;
        this.startMousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;

        const startWorldDirection = new Vector3(this.startMousePosition.x, this.startMousePosition.y, 0)
            .unproject(this.camera)
            .sub(this.camera.position)
            .normalize();

        const distance = -(this.camera.position.z + this.DISTANCE_IN_SPACE) / startWorldDirection.z;

        this.startWorldPosition.copy(this.camera.position).add(startWorldDirection.multiplyScalar(distance));

        const line = new Mesh(this.geometry, this.material);
        const box = new Mesh(this.boxGeometry, this.boxMaterial);
        box.scale.set(0.0001, 0.0001, 0.0001);
        const group = new Object3D();

        group.add(line);
        group.add(box);
        this.scene.add(group);

        this.lines.push({line, box, group});
    }

    onMouseMove(event) {
        if (!this.clicked) return;

        this.movingMousePosition.x = event.clientX / window.innerWidth * 2 - 1;
        this.movingMousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;

        const currentWorldDirection = new Vector3(this.movingMousePosition.x, this.movingMousePosition.y, 0)
            .unproject(this.camera)
            .sub(this.camera.position)
            .normalize();

        const distance = -(this.camera.position.z + this.DISTANCE_IN_SPACE) / currentWorldDirection.z;

        this.movingWorldPosition.copy(this.camera.position).add(currentWorldDirection.multiplyScalar(distance));

        const curve = new LineCurve3(this.startWorldPosition, this.movingWorldPosition);
        const geometry = new TubeGeometry(curve, 64, 0.1);

        const {line, box} = this.lines.at(-1);

        line.geometry.dispose();
        line.geometry = geometry;

        box.position.subVectors(this.movingWorldPosition, this.startWorldPosition).multiplyScalar(0.5).add(this.startWorldPosition);
        box.position.z += this.BOX_Z_OFFSET;
        box.scale.set(1, 1, 1);
    }

    onMouseUp(event) {
        this.clicked = false;
    }
}
