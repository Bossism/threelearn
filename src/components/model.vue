<template>
  <!-- 3d -->
  <div id="container" style="width: 1000px; height: 500px"></div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      mesh: null,
      camera: null,
      scene: null,
      renderer: null,
      controls: null,
    };
  },
  created() {},
  mounted() {
    this.init();
  },

  methods: {
    // 初始化
    init() {
      // Instantiate a loader
      const loader = new GLTFLoader();

      // Optional: Provide a DRACOLoader instance to decode compressed mesh data
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("rough_wood_4k.gltf");
      loader.setDRACOLoader(dracoLoader);

      // Load a glTF resource
      loader.load(
        // resource URL
        "models/gltf/duck/duck.gltf",
        // called when the resource is loaded
        function (gltf) {
          scene.add(gltf.scene);

          gltf.animations; // Array<THREE.AnimationClip>
          gltf.scene; // THREE.Group
          gltf.scenes; // Array<THREE.Group>
          gltf.cameras; // Array<THREE.Camera>
          gltf.asset; // Object
        },
        // called while loading is progressing
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        // called when loading has errors
        function (error) {
          console.log("An error happened");
        }
      );
    },
  },
};
</script>
