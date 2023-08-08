<template>
  <div id="app">
    <vue-threejs :camera="camera" :scene="scene" :renderer="renderer">
      <transform-control
        :object="model"
        :bounds="{ min: { x: -10, y: 0, z: 0 }, max: { x: 10, y: 0, z: 0 } }"
      />
    </vue-threejs>
  </div>
</template>

<script>
import VueThreejs from "vue-threejs";
import TransformControl from "vue-threejs/components/TransformControl";

export default {
    name: "App", 
    components: { 
        VueThreejs, 
        TransformControl, }, 
    data() { 
        return { 
            camera: { 
                name: "camera", 
                type: "PerspectiveCamera", 
                fov: 75, 
                near: 0.1, 
                far: 1000, 
                position: [0, 0, 5], 
                }, 
            scene: { 
                name: "scene", 
                type: "Scene", 
                background: "#ffffff", 
                children: [ { 
                    name: "model", 
                    type: "Mesh", 
                    geometry: { 
                        type: "BoxGeometry", 
                        width: 1, 
                        height: 1, 
                        depth: 1, 
                        }, 
                    material: { 
                        type: "MeshBasicMaterial", 
                        color: "#ff0000", 
                        }, 
                    }, 
                ], 
            }, 
        renderer: { 
            name: "renderer", 
            type: "WebGLRenderer", 
            antialias: true, 
        }, 
    }; 
}, 
};
</script>
