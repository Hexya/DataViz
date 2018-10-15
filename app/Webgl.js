import * as THREE from 'three';
import Torus from './meshes/Torus';
import Sphere from './meshes/Sphere';
import Cone from './meshes/Cone';
//const OrbitControls = require( 'three-orbit-controls' )( THREE );

export default class Webgl {
  constructor( width, height ) {
    this.params = {};

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera( 50, width / height, 1, 1000 );
    this.camera.position.x = 100;//-50
    this.camera.position.y = -550;//-150
    this.camera.position.z = 450;//100
    this.camera.rotation.x = -150;//-150

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( width, height );
    this.renderer.setClearColor( 0x00004A );

    //this.controls = new OrbitControls( this.camera );
    this.composer = null;

    this.createMeshes();
  }

  createMeshes() {
    this.torus = new Torus({
        type:'basic'
    });
    this.torus.position.x = 100;
    this.torus.position.y = -70;
    this.scene.add( this.torus );

    this.torusNormal = new Torus({
        type:'normal'
    });
    this.torusNormal.position.x = 100;
    this.torusNormal.position.y = -70;
    this.scene.add( this.torusNormal );

      this.sphere = new Sphere(); // mid left
      this.sphere.position.x = -200;
      this.sphere.position.y = -130;
      this.scene.add( this.sphere );

      this.secSphere = new Sphere(); // mid right
      this.secSphere.position.x = 500;
      this.secSphere.position.y = -70;
      this.secSphere.scale.x = .8;
      this.secSphere.scale.y = .8;
      this.secSphere.scale.z = .8;
      this.scene.add( this.secSphere );
      this.secSphere.material.map = new THREE.TextureLoader().load( 'textures/yelPink.jpg' );

      this.thirdSphere = new Sphere(); // top right
      this.thirdSphere.position.x = 450;
      this.thirdSphere.position.y = 420;
      this.thirdSphere.position.z = 80;
      this.thirdSphere.scale.x = 3.5;
      this.thirdSphere.scale.y = 3.5;
      this.thirdSphere.scale.z = 3.5;
      this.scene.add( this.thirdSphere );

      this.cone = new Cone(); // bot left
      this.cone.position.x = -200;
      this.cone.position.y = -140;
      this.cone.position.z = -370;
      this.scene.add( this.cone );
      this.cone.material.map = new THREE.TextureLoader().load( 'textures/bluePink.jpg' );

      this.secCone = new Cone(); // bot right
      this.secCone.position.x = 300;
      this.secCone.position.y = -250;
      this.scene.add( this.secCone );

      this.thirdCone = new Cone(); // top left
      this.thirdCone.position.x = -400;
      this.thirdCone.position.y = 190;
      this.thirdCone.scale.x = 4;
      this.thirdCone.scale.y = 4;
      this.thirdCone.scale.z = 4;
      this.scene.add( this.thirdCone );
  }

  resize( width, height ) {
    if ( this.composer ) {
      this.composer.setSize( width, height );
    }

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( width, height );
  }

  render() {
      const time = performance.now()

      this.renderer.render( this.scene, this.camera );
      this.torus.update(time);
      this.sphere.update(time);

      this.sphere.rotation.x += 0.005;
      this.sphere.rotation.y += 0.01;
      this.sphere.rotation.z += 0.01;

      this.secSphere.rotation.x += 0.01;
      this.secSphere.rotation.y += 0.005;
      this.secSphere.rotation.z += 0.01;

      this.thirdSphere.rotation.x += 0.01;
      this.thirdSphere.rotation.y += 0.01;
      this.thirdSphere.rotation.z += 0.005;

      this.cone.rotation.x += 0.01;
      this.cone.rotation.y += 0.001;
      this.cone.rotation.z += 0.001;

      this.secCone.rotation.x += 0.005;
      this.secCone.rotation.y += 0.001;
      this.secCone.rotation.z += 0.001;

      this.thirdCone.rotation.x += 0.001;
      this.thirdCone.rotation.y += 0.001;
      this.thirdCone.rotation.z += 0.001;
  }
}
