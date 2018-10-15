import * as THREE from 'three';
const glsl = require('glslify');

export default class Cone extends THREE.Object3D {
    constructor(index) {
        super();

        this.index = index;

        this.radius = 15;
        this.step = 7;

        this.geometry = new THREE.ConeBufferGeometry( 20, 35, 3, 1 );

        this.material = new THREE.MeshBasicMaterial( { color: 0xE9E9EA } );
        this.rockMaterial = new THREE.TextureLoader().load('textures/yelPink.jpg');
        this.material.map = this.rockMaterial;

        this.mesh = new THREE.Mesh( this.geometry, this.material );

        this.add( this.mesh );

    }

    update(time) {
        //this.mesh.rotation.z += 0.01;
    }
}
