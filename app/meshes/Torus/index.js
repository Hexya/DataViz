import * as THREE from 'three';
const glsl = require('glslify');

export default class Torus extends THREE.Object3D {
  constructor({ type = 'basic' } = {}) {
    super();

    this.type = type;

    this.radius = 15;
    this.step = 7;

    this.geometry = new THREE.TorusBufferGeometry( 100, 50, 60, 100 );

      /*this.material = new THREE.MeshLambertMaterial( { color: 0xE9E9EA } );
      this.material = new THREE.ShaderMaterial({
         vertexShader: glsl.file('./torus.vs'),
         fragmentShader: glsl.file('./torus.fs'),
         transparent: true,
     })*/
      if(this.type === 'basic') {
          this.material = new THREE.MeshBasicMaterial( { color: 0xE9E9EA } );
          this.rockMaterial = new THREE.TextureLoader().load('textures/pink.jpg');
          this.material.map = this.rockMaterial;
      } else {
        this.material = new THREE.MeshNormalMaterial( { color: 0xE9E9EA } );
      }


    this.mesh = new THREE.Mesh( this.geometry, this.material );

    this.add( this.mesh );

  }

  update(time) {
    //this.mesh.rotation.z += 0.01;
  }
}
