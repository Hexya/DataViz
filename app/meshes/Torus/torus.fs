uniform sampler2D u_map;

varying vec2 vUv;

void main() {

   vec3 color = vec3(fract(vUv.y),0., 1.);

    gl_FragColor = vec4(color, 1.);
}