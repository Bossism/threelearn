<template>
  <div id="container" style="width: 375px; height: 500px"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { DragControls } from "three/examples/jsm/controls/DragControls.js";


let cameraPersp, cameraOrtho, currentCamera;
let scene, renderer;
// let mesh;

export default {
  name: "MouseMove",
  data() {
    return {
      publicPath: process.env.BASE_URL,
      //   cameraPersp: null,
      //   cameraOrtho: null,
      //   currentCamera: null,
      //   mesh: null,
      //   camera: null,
      //   scene: null,
      //   renderer: null,
      //   control: null,
      //   orbit: null
    };
  },
  created() {},
  mounted() {
    this.init();
  },

  methods: {
    init() {
      // 创建渲染器
      renderer = new THREE.WebGLRenderer();
      // 设备像素比
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
      // 摄像机视锥体的长宽比，通常是使用画布的宽/画布的高
      const aspect = window.innerWidth / window.innerHeight;
      // 透视摄像机
      cameraPersp = new THREE.PerspectiveCamera(50, aspect, 0.01, 30000);
      // 正交摄像机
      cameraOrtho = new THREE.OrthographicCamera(
        -600 * aspect,
        600 * aspect,
        600,
        -600,
        0.01,
        30000
      );
      currentCamera = cameraPersp;

      currentCamera.position.set(1000, 500, 1000);
      currentCamera.lookAt(0, 200, 0);

      // 创建场景
      scene = new THREE.Scene();
      // 添加网格辅助平面
      scene.add(new THREE.GridHelper(1000, 10, 0x888888, 0x444444));
      // 设置光源 - 平行光
      const light = new THREE.DirectionalLight(0xffffff, 5);
      light.position.set(1, 1, 1);
      scene.add(light);

      // 创建模型
    //   const loader = new GLTFLoader();
    //   loader.load(
    //     this.publicPath + "Parrot.glb",
    //     (model) => {
    //       mesh = model.scene.children[0];
    //       mesh.scale.set(100, 100, 100); // 子对象的比例设置为原来的50倍
    //       scene.add(mesh);
    //     }
    //   );
      const geometry = new THREE.BoxGeometry(200, 200, 200);
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
      });
    //   添加网格
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      const orbit = new OrbitControls(currentCamera, renderer.domElement);
      // 实时更新旋转状态
      orbit.update();
      orbit.addEventListener("change", this.render);

      const control = new TransformControls(currentCamera, renderer.domElement);
      control.addEventListener("change", this.render);
      control.addEventListener("dragging-changed", function (event) {
        orbit.enabled = !event.value;
      });

      // 添加坐标轴辅助器
      const axesHelper = new THREE.AxesHelper(5)
      scene.add(axesHelper)
      console.log(mesh)
      control.attach(mesh);
      scene.add(control);
      window.addEventListener("resize", this.onWindowResize);
    },
    onWindowResize() {
      const aspect = window.innerWidth / window.innerHeight;
      cameraPersp.aspect = aspect;
      cameraPersp.updateProjectionMatrix();
      cameraOrtho.left = cameraOrtho.bottom * aspect;
      cameraOrtho.right = cameraOrtho.top * aspect;
      cameraOrtho.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    //   renderer.render(scene, currentCamera);
      this.render();
    },
    render() {
      renderer.render(scene, currentCamera);
    },
    
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

div {
  width: 100%;
  height: 100%;
}

.container {
  width: 100%;
  height: 100%;
}
</style>
