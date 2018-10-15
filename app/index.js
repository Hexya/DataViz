import Webgl from './Webgl';
import raf from 'raf';
import myArray from './data';
import * as THREE from "three";
import { map } from './utils/math';
let firstSceneTemplate = require('./meshes/Templates/firstSceneTemplate.tpl');
let twoSceneTemplate = require('./meshes/Templates/twoSceneTemplate.tpl');
let threeSceneTemplate = require('./meshes/Templates/threeSceneTemplate.tpl');
let fourSceneTemplate = require('./meshes/Templates/fourSceneTemplate.tpl');
let fiveSceneTemplate = require('./meshes/Templates/fiveSceneTemplate.tpl');
let sixSceneTemplate = require('./meshes/Templates/sixSceneTemplate.tpl');
let sevenSceneTemplate = require('./meshes/Templates/sevenSceneTemplate.tpl');
let globalSceneTemplate = require('./meshes/Templates/globalSceneTemplate.tpl');
let eightSceneTemplate = require('./meshes/Templates/eightSceneTemplate.tpl');
let nineSceneTemplate = require('./meshes/Templates/nineSceneTemplate.tpl');
let tenSceneTemplate = require('./meshes/Templates/tenSceneTemplate.tpl');
let elevenSceneTemplate = require('./meshes/Templates/elevenSceneTemplate.tpl');
let twelveSceneTemplate = require('./meshes/Templates/twelveSceneTemplate.tpl');
let thirteenSceneTemplate = require('./meshes/Templates/thirteenSceneTemplate.tpl');
let fourteenthSceneTemplate = require('./meshes/Templates/fourteenthSceneTemplate.tpl');
let lastSceneTemplate = require('./meshes/Templates/lastSceneTemplate.tpl');
let endSceneTemplate = require('./meshes/Templates/endSceneTemplate.tpl');

const cameraTarget = new THREE.Vector3(-50,-150,100);
const torusTarget = new THREE.Vector3(100,-70,0);
const torusScale = new THREE.Vector3(1,1,1);

// webgl settings
const webgl = new Webgl( window.innerWidth, window.innerHeight );
document.body.appendChild( webgl.renderer.domElement );
let step = -1;
let catNb = 7;

let canvas = null;
let ctx = null;
const lines = [];
let startAnimation = false;

function resizeHandler() {
    webgl.resize( window.innerWidth, window.innerHeight );
}

function animate() {
    raf( animate );
    if(startAnimation == true) {
        updateCameraPos();
    }
    webgl.render();
}

function registerEvents() {
    //console.log(webgl.torus)
    //console.log(webgl.torus.rotation.z)
    const turnBtn = document.querySelector('.turn-btn');
    turnBtn.addEventListener('click',onTurnBtnClick.bind(this));

        document.querySelector('body').addEventListener( "mousemove", function( event ) {
            const x = ((event.pageX - (window.innerWidth / 2)) / (window.innerWidth / 2)) * 10;
            const y = ((event.pageY - (window.innerHeight / 2)) / (window.innerHeight / 2)) * 5;
            document.querySelector('.scene-cont').style.transform = `translate3d(${x}px,${y}px,0)`;
        });
}

function onTurnBtnClick() {
    step += 1;
    startAnimation = true;
    console.log(step);
    updateScene(step);
}

function updateCameraPos() {
    webgl.camera.position.x += ((cameraTarget.x - webgl.camera.position.x) * 0.05);
    webgl.camera.position.y += ((cameraTarget.y - webgl.camera.position.y) * 0.05);
    webgl.camera.position.z += ((cameraTarget.z - webgl.camera.position.z) * 0.05);
    webgl.torus.scale.x += ((torusScale.x - webgl.torus.scale.x) * 0.05);
    webgl.torus.scale.y += ((torusScale.y - webgl.torus.scale.y) * 0.05);
    webgl.torus.scale.z += ((torusScale.z - webgl.torus.scale.z) * 0.05);
    webgl.torus.position.y += ((torusTarget.y - webgl.torus.position.y) * 0.05);
    //requestAnimationFrame( updateCameraPos );
}

function updateScene() {
    switch (step) {
        case 0:firstScene();
            cameraTarget.x = -50;
            cameraTarget.y = -150;
            cameraTarget.z = 100;
            webgl.torusNormal.visible = false;
            break;
        case 1:sceneTwo();
            cameraTarget.x = 30;
            cameraTarget.y = -50;
            break;
        case 2:sceneThree();
            cameraTarget.x = 100;
            cameraTarget.y = -0;
            break;
        case 3:sceneFour();
            cameraTarget.x = 230;
            cameraTarget.y = -100;
            break;
        case 4:sceneFive();
            cameraTarget.x = 240;
            cameraTarget.y = -240;
            break;
        case 5:sceneSix();
            cameraTarget.x = 150;
            cameraTarget.y = -280;
            break;
        case 6:sceneSeven();
            cameraTarget.x = 50;
            cameraTarget.y = -270;
            break;
        case 7:sceneGlobal();
            torusTarget.y = 200;
            cameraTarget.z = 400;
            cameraTarget.x = 100;
            cameraTarget.y = -200;
            break;
        case 8:eightScene(); // zoom + switch color + scale
            torusScale.x = 0.001;
            torusScale.y = 0.001;
            torusScale.z = 0.001;
            setTimeout(() => {
                torusScale.x = 1;
                torusScale.y = 1;
                torusScale.z = 1;

                cameraTarget.x = -40;
                torusTarget.y = -180;
                cameraTarget.z = 100;
                webgl.torus.material.map = new THREE.TextureLoader().load( 'textures/yel.jpg' );
                webgl.torus.material.map.needsUpdate = true;
            },500)
            break;
        case 9:nineScene();
            cameraTarget.x = 30;
            cameraTarget.y = -130;
            break;
        case 10:tenScene();
            cameraTarget.x = 110;
            cameraTarget.y = -120;
            break;
        case 11:elevenScene();
            cameraTarget.x = 200;
            cameraTarget.y = -150;
            break;
        case 12:twelveScene();
            cameraTarget.x = 230;
            cameraTarget.y = -330;
            break;
        case 13:thirteenScene();
            cameraTarget.x = 170;
            cameraTarget.y = -390;
            break;
        case 14:fourteenthScene();
            cameraTarget.x = 20;//40
            cameraTarget.y = -420;//-390
            break;
        case 15:lastScene();
            cameraTarget.x = 100;
            torusTarget.y = 90;
            cameraTarget.z = 450;
        case 15:endScene();
            webgl.torus.visible = false;
            webgl.torusNormal.visible = true;
            cameraTarget.y = -520;
            break;
    }
}
function firstScene() {
    console.log('init');
    toggle('begin-scene', 'scene-two', firstSceneTemplate);
    canvas = document.querySelector('.canvas');
    ctx = canvas.getContext("2d");
    generateGraph()

    transition();
}
function sceneTwo() {
    toggle('scene-two', 'init-scene', twoSceneTemplate);
    transition();
}
function sceneThree() {
    toggle('init-scene', 'scene-three', threeSceneTemplate);
    transition();
}
function sceneFour() {
    toggle('scene-three', 'scene-four', fourSceneTemplate);
    transition();
}
function sceneFive() {
    toggle('scene-four', 'scene-five', fiveSceneTemplate);
    transition();
}
function sceneSix() {
    toggle('scene-five', 'scene-six', sixSceneTemplate);
    transition();
}
function sceneSeven() {
    toggle('scene-six', 'scene-seven', sevenSceneTemplate);
    transition();
}
function sceneGlobal() {
    toggle('scene-seven', 'scene-global', globalSceneTemplate);
    transition();
}
function eightScene() {
    toggle('scene-global', 'scene-nine', eightSceneTemplate);
    transition();
}
function nineScene() {
    toggle('scene-nine', 'scene-eight', nineSceneTemplate);
    transition();
}
function tenScene() {
    toggle('scene-eight', 'scene-ten', tenSceneTemplate);
    transition();
}
function elevenScene() {
    toggle('scene-ten', 'scene-eleven', elevenSceneTemplate);
    transition();
}
function twelveScene() {
    toggle('scene-eleven', 'scene-twelve', twelveSceneTemplate);
    transition();
}
function thirteenScene() {
    toggle('scene-twelve', 'scene-thirteen', thirteenSceneTemplate);
    transition();
}
function fourteenthScene() {
    toggle('scene-thirteen', 'scene-fourteenth', fourteenthSceneTemplate);
    transition();
}
function lastScene() {
    toggle('scene-fourteenth', 'scene-last', lastSceneTemplate);
}
function endScene() {
    toggle('scene-last', 'scene-end', endSceneTemplate);
}
function toggle(latestScene, activeScene, template) {
    document.querySelector(".scene-cont").classList.remove(latestScene);
    document.querySelector(".scene-cont").classList.add(activeScene);
    document.querySelector(".scene-cont").innerHTML = template;
}
function transition() {
    document.querySelector('.elem-one').classList.add('transition-graph');
    document.querySelector('.elem-two').classList.add('transition-mid');
    document.querySelector('.elem-three').classList.add('transition-text');
    setTimeout(()=> {
        document.querySelector('.elem-one').classList.remove('transition-graph');
        document.querySelector('.elem-two').classList.remove('transition-mid');
        document.querySelector('.elem-three').classList.remove('transition-text');
    },1500);
}

function generateGraph() {
    let pays = myArray.find((pays)=> {
        //console.log(pays["Country Name"]);
        return pays["Country Name"]=== "Faible revenu";
    });
    console.log(pays);

    const canvas = document.querySelector('.canvas');
    const ctx = canvas.getContext("2d");
    const width = canvas.width = document.querySelector('.graph-cont').offsetWidth;
    canvas.style.width = width + 'px';
    const height = canvas.height = window.innerHeight * 0.5;
    canvas.style.height = height + 'px';

    for (let i = 1970; i < 2015; i++) { // 1970 to 2015
        const mapVal = map(i + 1, 1970, 2015, 0, 1);
        const mapVal2 = map(pays[i], 48, 62, 0, 1);

        let x1 = 0;
        let y1 = height;

        if ( i !== 1970) {
            const mapVal3 = map(i, 1970, 2015, 0, 1);
            const mapVal4 = map(pays[i - 1], 48, 62, 0, 1);
            x1 = parseInt(mapVal3 * (width-300), 10);
            y1 = parseInt(height - mapVal4 * height, 10);
        }

        const x2 = parseInt(mapVal * (width-300), 10);
        const y2 = parseInt(height - mapVal2 * height, 10);

        const line = { x1, y1, x2, y2 };
        lines.push(line);
        ctx.beginPath();
        ctx.strokeStyle = '#E700C9';
        ctx.lineWidth = 3;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    console.log(lines);
}

// handle resize
window.addEventListener( 'resize', resizeHandler );

// let's play !
animate();
registerEvents();