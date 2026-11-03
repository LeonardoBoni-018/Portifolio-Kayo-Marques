import {
  Mesh, PerspectiveCamera, PlaneGeometry, Scene, ShaderMaterial, SRGBColorSpace, Vector2, VideoTexture, WebGLRenderer
} from 'three';

// O vídeo do Reel como uma película curva: a curvatura (uBend) e o giro somem conforme o scroll,
// até a tela ficar plana. Cantos arredondados no shader, para não precisar de máscara no DOM.
const VERT = `
  uniform float uBend;
  uniform vec2 uSize;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    p.xy *= uSize;
    float x = position.x * 2.0;
    p.z -= uBend * x * x * uSize.x * 0.6;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const FRAG = `
  uniform sampler2D uTex;
  uniform vec2 uSize;
  uniform float uRadius;
  varying vec2 vUv;
  float caixa(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }
  void main() {
    vec4 c = texture2D(uTex, vUv);
    float d = caixa((vUv - 0.5) * uSize, uSize * 0.5, uRadius);
    gl_FragColor = vec4(c.rgb, 1.0 - smoothstep(-1.0, 1.0, d));
    #include <colorspace_fragment>
  }
`;

export function criarReelGL(canvas, video) {
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 1, 10000);
  const tex = new VideoTexture(video);
  tex.colorSpace = SRGBColorSpace;
  const mat = new ShaderMaterial({
    uniforms: { uTex: { value: tex }, uBend: { value: 1 }, uSize: { value: new Vector2(1, 1) }, uRadius: { value: 24 } },
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true
  });
  const plano = new Mesh(new PlaneGeometry(1, 1, 64, 1), mat);
  scene.add(plano);

  let w = 0;
  let h = 0;
  const medir = () => {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // 1 unidade = 1px no plano z = 0
    camera.position.z = (h / 2) / Math.tan((camera.fov * Math.PI) / 360);
    camera.updateProjectionMatrix();
  };
  medir();

  return {
    medir,
    // e: 0 (curvo e pequeno) a 1 (plano e grande); largura e altura em px
    quadro(e, largura, altura) {
      mat.uniforms.uSize.value.set(largura, altura);
      mat.uniforms.uBend.value = 1 - e;
      mat.uniforms.uRadius.value = 28 - 8 * e;
      plano.rotation.y = -0.32 * (1 - e);
      renderer.render(scene, camera);
    },
    destruir() {
      tex.dispose();
      mat.dispose();
      plano.geometry.dispose();
      renderer.dispose();
    }
  };
}
