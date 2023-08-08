<template>
  <div id="container" style="width: 375px; height: 500px">
    <!-- <transform-controls :dragging-class="'dragging'" :dragging-transition-class="'dragging-transition'" :space="space" :size="size" :scale="scale" :rotation="rotation"></transform-controls> -->
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { DragControls } from 'three/examples/jsm/controls/DragControls';

// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { DragControls } from "three/examples/jsm/controls/DragControls.js";
// import { ThreeDrag } from '../assets/drag.js'

export default {
  name: "MouseMove3",
  data() {
    return {
      publicPath: process.env.BASE_URL,
      space: 'local',
      size: 1,
      scale: 1,
      rotation: 0
      // ThreeDrag: null
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
    // this.ThreeDrag = new ThreeDrag("container")
  },

  methods: {
    init() {
      // 创建一个场景
      const scene = new THREE.Scene();

      // 创建一个透视相机
      const cameraPersp = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      // 创建一个正交相机
      const cameraOrtho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);

      // 设置当前使用的相机为透视相机
      let currentCamera = cameraPersp;

      // 创建一个渲染器
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      // 创建一个平行光源
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(0, 10, 10);
      scene.add(light);

      // 创建一个立方体几何体
      const geometry = new THREE.BoxGeometry();

      // 创建一个材质
      const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

      // 创建一个网格对象
      const mesh = new THREE.Mesh(geometry, material);

      // 将网格对象添加到场景中
      scene.add(mesh);

      // 设置相机的位置和朝向
      cameraPersp.position.z = 5;
      cameraOrtho.position.z = 5;
      cameraPersp.lookAt(mesh.position);
      cameraOrtho.lookAt(mesh.position);

      // 创建一个轨道控制器，用于旋转场景
      const orbit = new OrbitControls(currentCamera, renderer.domElement);
      orbit.update();
      orbit.addEventListener("change", render);

      // 创建一个变换控制器，用于移动物体
      const control = new TransformControls(currentCamera, renderer.domElement);

      control.addEventListener("change", render);
      control.addEventListener("dragging-changed", function (event) {
        orbit.enabled = !event.value;
      });

      control.attach(mesh);

      // control.draggingClass = 'dragging'
      // control.draggingTransitionClass = 'dragging-transition'
      // control.domElement.style.maxWidth = '200px'
      // control.domElement.style.maxHeight = '300px'

      const dragControls = new DragControls([mesh], currentCamera, renderer.domElement);
      dragControls.addEventListener('dragstart', (evt) => {
        evt.object.parent.position.copy(evt.object.position)
        evt.object.position.set(0, 0, 0)
        console.log('evt.object.parent.position.x')
        console.log(evt.object.parent.position.x)
        if( evt.object.parent.position.x > 0.5 || evt.object.parent.position.x < -0.5){
          evt.object.parent.position.x = 0.5
        }
        if( evt.object.parent.position.y > 0.5 || evt.object.parent.position.y < -0.5){
          evt.object.parent.position.y = 0.5
        }
        if( evt.object.parent.position.z > 0.5 || evt.object.parent.position.z < -0.5){
          evt.object.parent.position.z = 0.5
        }
      })

      // const box = new THREE.Box3().setFromObject(mesh);
      // console.log("box");
      // console.log(box);
      // console.log("mesh");
      // console.log(mesh);
      // const boxSize = box.getSize(new THREE.Vector3()).length();
      // console.log("hhhhhhhhhhhhhhh");
      // console.log(boxSize);
      // const boxCenter = box.getCenter(new THREE.Vector3());
      // console.log("boxCenter");
      // console.log(boxCenter);

      // control.maxDistance = boxSize * 10;
      // console.log("control");
      // console.log(control);
      // console.log("control.target");
      // console.log(control.target);
      // control.copy(boxCenter);
      // control.update();

      // // set object position
      // console.log("mesh.position.x");
      // console.log(mesh.position.x);
      // console.log("boxCenter.x + boxSize / 2");
      // console.log(boxCenter.x + boxSize / 2);
      // mesh.position.x = Math.max(
      //   Math.min(mesh.position.x, boxCenter.x + boxSize / 2),
      //   boxCenter.x - boxSize / 2
      // );
      // mesh.position.y = Math.max(
      //   Math.min(mesh.position.y, boxCenter.y + boxSize / 2),
      //   boxCenter.y - boxSize / 2
      // );
      // mesh.position.z = Math.max(
      //   Math.min(mesh.position.z, boxCenter.z + boxSize / 2),
      //   boxCenter.z - boxSize / 2
      // );

      // control.setBounds({
      //   min: { x: 0, y: -5, z: 0 },
      //   max: { x: 0, y: 5, z: 0 },
      // });

      // 添加坐标轴辅助器
      // const axesHelper = new THREE.AxesHelper(5);
      // scene.add(axesHelper);

      // 将变换控制器绑定到网格对象上
      // control.attach(mesh);
      scene.add(control);

      // 定义一个渲染函数，用于绘制场景
      function render() {
        renderer.render(scene, currentCamera);
      }

      // 调用渲染函数
      render();

      // 定义一个窗口大小改变时的回调函数，用于调整相机和渲染器的长宽比
      function onWindowResize() {
        const aspect = window.innerWidth / window.innerHeight;
        cameraPersp.aspect = aspect;
        cameraPersp.updateProjectionMatrix();
        cameraOrtho.left = cameraOrtho.bottom * aspect;
        cameraOrtho.right = cameraOrtho.top * aspect;
        cameraOrtho.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      // 监听窗口大小改变事件，并绑定回调函数
      window.addEventListener("resize", onWindowResize);

      // 监听键盘按键事件，并切换相机模式
      window.addEventListener("keydown", function (event) {
        switch (event.keyCode) {
          case 49: // 按下数字键1，切换到透视相机
            currentCamera = cameraPersp;
            control.setCamera(cameraPersp);
            orbit.object = cameraPersp;
            break;
          case 50: // 按下数字键2，切换到正交相机
            currentCamera = cameraOrtho;
            control.setCamera(cameraOrtho);
            orbit.object = cameraOrtho;
            break;
        }
      });
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
