<template>
  <div id="container" style="width: 375px; height: 500px"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// let cameraPersp, cameraOrtho, currentCamera;
// let scene, renderer;
// let mesh2;

export default {
  name: "MouseMove",
  data() {
    return {
      publicPath: process.env.BASE_URL,
      // cameraPersp: null,
      // cameraOrtho: null,
      // currentCamera: null,
      // mesh: null,
      // camera: null,
      // scene: null,
      // renderer: null,
      // control: null,
      // orbit: null
    };
  },
  created() {},
  mounted() {
    this.init();
  },

  methods: {
    init() {
      // 创建渲染器
      this.renderer = new THREE.WebGLRenderer();
      // 设备像素比
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this.renderer.domElement);
      // 摄像机视锥体的长宽比，通常是使用画布的宽/画布的高
      const aspect = window.innerWidth / window.innerHeight;
      // 透视摄像机
      this.cameraPersp = new THREE.PerspectiveCamera(50, aspect, 0.01, 30000);
      // 正交摄像机
      this.cameraOrtho = new THREE.OrthographicCamera(
        -600 * aspect,
        600 * aspect,
        600,
        -600,
        0.01,
        30000
      );
      this.currentCamera = this.cameraPersp;

      this.currentCamera.position.set(1000, 500, 1000);
      this.currentCamera.lookAt(0, 200, 0);

      // 创建场景
      this.scene = new THREE.Scene();
      // 添加网格辅助平面
      this.scene.add(new THREE.GridHelper(1000, 10, 0x888888, 0x444444));
      // 设置光源 - 平行光
      const light = new THREE.DirectionalLight(0xffffff, 5);
      light.position.set(1, 1, 1);
      this.scene.add(light);

      // 创建模型
      const loader = new GLTFLoader();
      loader.load(this.publicPath + "Parrot.glb", (model) => {
        this.mesh = model.scene.children[0];
        // console.log("mesh 赋值");
        // console.log(this.mesh);
        this.mesh.scale.set(100, 100, 100); // 子对象的比例设置为原来的50倍
        this.scene.add(this.mesh);
        // console.log("是不是一出来就没了");
        // console.log(this.mesh);
        const orbit = new OrbitControls(this.currentCamera, this.renderer.domElement);
        // 实时更新旋转状态
        orbit.update();
        orbit.addEventListener("change", this.render);

        const control = new TransformControls(
          this.currentCamera,
          this.renderer.domElement
        );
        control.addEventListener("change", this.render);
        control.addEventListener("dragging-changed", function (event) {
          orbit.enabled = !event.value;
        });

        // 添加坐标轴辅助器
        const axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);
        // console.log("mesh 是否加载");
        // console.log(this.mesh);
        control.attach(this.mesh);
        this.scene.add(control);
        window.addEventListener("resize", this.onWindowResize);
      });
        const geometry = new THREE.BoxGeometry(200, 200, 200);
        const material = new THREE.MeshBasicMaterial({
          color: 0x00ff00,
          wireframe: true,
        });
      //   添加网格
        const mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);
      console.log('是不是一出来就没了')
      console.log(this.mesh)
        const orbit = new OrbitControls(this.currentCamera, this.renderer.domElement);
        // 实时更新旋转状态
        orbit.update();
        orbit.addEventListener("change", this.render);

        const control = new TransformControls(this.currentCamera, this.renderer.domElement);
        control.addEventListener("change", this.render);
        control.addEventListener("dragging-changed", function (event) {
          this.orbit.enabled = !event.value;
        });

        // 添加坐标轴辅助器
        const axesHelper = new THREE.AxesHelper(5)
        this.scene.add(axesHelper)
        console.log('mesh 是否加载')
        console.log(this.mesh)
        control.attach(this.mesh);
        this.scene.add(control);
        window.addEventListener("resize", this.onWindowResize);
    },
    // 加载GLTF模型
    loadGLTF() {
      //   const THIS = this;
      const loader = new GLTFLoader();
      loader.load(
        //this.publicPath + "static/gltf/ha/scene.gltf",
        this.publicPath + "Parrot.glb",
        (model) => {
          this.mesh = model.scene.children[0];
          this.mesh.scale.set(20, 20, 20); // 子对象的比例设置为原来的50倍
          this.scene.add(this.mesh);
        }
      );
    },
    onWindowResize() {
      const aspect = window.innerWidth / window.innerHeight;
      this.cameraPersp.aspect = aspect;
      this.cameraPersp.updateProjectionMatrix();
      this.cameraOrtho.left = this.cameraOrtho.bottom * aspect;
      this.cameraOrtho.right = this.cameraOrtho.top * aspect;
      this.cameraOrtho.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.render();
    },
    render() {
      this.renderer.render(this.scene, this.currentCamera);
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
