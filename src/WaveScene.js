import {
    Color,
    Mesh,
    PlaneGeometry,
    ShaderMaterial,
    Vector3
} from "three";
import {mainManger} from "./index";

export default class WaveScene {
    vTime = {value: 0};

    constructor() {
        const {scene, camera} = mainManger.getBaseProps();

        this.scene = scene;
        this.camera = camera;

        this.addWave();
        this.addBackground();
    }

    addWave() {
        this.camera.position.z = 5;

        this.geometry = new PlaneGeometry(5, 5, 50, 50);
        this.geometry.computeVertexNormals();


        this.material = new ShaderMaterial({
            uniforms: {
                time: this.vTime,
                color: {value: new Color("red")},
                light: {value: new Vector3(0, 1, 0)},
            },
            vertexShader: `
                #define PI 3.1415926
                #define PI2 PI*2.
                
                uniform float time;
                // attribute vec3 normal;
                varying vec3 vNormal;
                
                void main(){
                    vec3 pos = position;
                    // vNormal = normal;
                    
                    float x = (length(uv - 0.5) - time) * 3. * PI2;
                    pos.z = sin(x) * 0.2;
                    
                    float cosNormal = cos(x) - 1.0;
                    
                    vNormal = vec3(cosNormal * 0.2, cosNormal * 0.2, 0.);
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
                }
              `,
            fragmentShader: `
                uniform vec3 color;
                varying vec3 vNormal;
                
                void main(){
                    vec3 light = vec3(0.0, -1.0, 0.0);

                    light = normalize(light);

                    float dProd = max(0.0, dot(vNormal, light));
                    dProd += 0.5;
                
                    gl_FragColor = vec4(dProd, // R
                                        dProd, // G
                                        dProd, // B
                                        1.0);  // A
                }
            `
        });

        this.plane = new Mesh(this.geometry, this.material);

        this.plane.rotation.x = -Math.PI / 180 * 75;

        this.scene.add(this.plane);
    }

    addBackground() {
        const {scene} = mainManger.getBaseProps();
        scene.background = new Color("#58a1a9");
    }

    update() {
        this.vTime.value += 0.005;
    }
}
