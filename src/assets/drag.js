import * as THREE from 'three';
// 视图旋转控件
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 拖拽控件
import { DragControls } from 'three/examples/jsm/controls/DragControls';
// 可视化平移控件
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
// 轨迹球
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

/**
 * 3d 鼠标拖拽
 * https://threejs.org/docs/index.html#manual/zh/introduction/Creating-a-scene
 */
export class ThreeDrag {
    constructor(canvasId) {
        this.work(canvasId);
    }

    work(canvasId) {
        // 创建 3d 场景
        let scene = new THREE.Scene();


        /**
         * 创建渲染器
         * WebGLRenderer渲染器之外，Three.js同时提供了其他几种渲染器。当用户所使用的浏览器过于老旧，或者由于其他原因不支持WebGL时，可以使用这几种渲染器进行降级。
         * @type {number}
         */
        let width = window.innerWidth;
        let height = window.innerHeight;
        let renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        /**
         * 渲染器尺寸：设置渲染器的宽高使渲染出的场景充满应用程序
         * 对于性能比较敏感的应用程序来说，你可以使用setSize传入一个较小的值，例如window.innerWidth/2和window.innerHeight/2
         * 如果想以较低的分辨率来渲染，可以在调用setSize时，将updateStyle（第三个参数）设为false
         */
        renderer.setSize(width, height);
        // 最后一步很重要，我们将renderer（渲染器）的dom元素（renderer.domElement）添加到我们的HTML文档中。这就是渲染器用来显示场景给我们看的<canvas>元素。
        document.getElementById(canvasId).appendChild(renderer.domElement);
        renderer.setClearColor(0x000000);


        /**
         * 照相机常用的有两种
         * 正投影相机：THREE.OrthographicCamera(left,right,top,bottom,near,far)；
         * 透视照相机：THREE.PerspectiveCamera( fov, aspect, near, far ) ;
         * fov - 视野角度。视野角度就是无论在什么时候，你所能在显示器上看到的场景的范围，它的单位是角度(与弧度区分开)
         * aspect ratio - 长宽比。也就是你用一个物体的宽除以它的高的值。当你在一个宽屏电视上播放老电影时，可以看到图像仿佛是被压扁的
         * near，far - 近截面和远截面。 当物体某些部分比摄像机的远截面远或者比近截面近的时候，该这些部分将不会被渲染到场景中
         */
        let camera = new THREE.PerspectiveCamera(45, width/height, 1, 10000);
        // 3d 视图（主视角）
        camera.position.set(200, 40, 200);
        //设置照相机的位置
        camera.lookAt(new THREE.Vector3(0, 0, 0)); //设置照相机面向(0,0,0)坐标观察 照相机默认坐标为(0,0,0); 默认面向为沿z轴向里观察;


        /**
         * 添加自然光源
         * a. 平行光(DirectionalLight)，效果类似太阳光 , DirectionalLight ( color, intensity )
         * b. 点光源(PointLight)，效果类似灯泡 , PointLight ( color, intensity, distance, decay )
         * c.. 聚光光源(SpotLight)，效果类似聚光灯 , SpotLight ( color, intensity, distance, angle, penumbra, decay )
         * color — 光源颜色的RBG数值。
         * intensity — 光强的数值。
         * distance -- 光强为0处到光源的距离，0表示无穷大。
         * decay -- 沿着光照距离的衰退量。
         * angle -- 光线散射角度，最大为Math.PI/2。
         * penumbra -- 聚光锥的半影衰减百分比。在0和1之间的值。默认为0。
         */
        let light = new THREE.DirectionalLight(0xffffff, 1, 100);  //创建光源
        // 光源移动
        light.position.set(500, 500, 500);
        scene.add(light);  //在场景中添加光源
        /**
         * DirectionalLightHelper（平行光）
         * 用于模拟场景中平行光 DirectionalLight 的辅助对象. 其中包含了表示光位置的平面和表示光方向的线段。
         * DirectionalLightHelper( light : DirectionalLight, size : Number, color : Hex )
         * light-- 被模拟的光源
         * size – (可选的) 平面的尺寸. 默认为 1
         * color – (可选的) 如果没有设置颜色将使用光源的颜色
         *
         * SpotLightHelper（聚光灯）
         * 用于模拟聚光灯 SpotLight 的锥形辅助对象
         * SpotLightHelper( light : SpotLight, color : Hex )
         * light – 被模拟的聚光灯 SpotLight .
         * color – (可选的) 如果没有赋值辅助对象将使用光源的颜色
         *
         * RectAreaLightHelper（矩形面光源）
         * 创建一个表示 RectAreaLight 的辅助对象.
         * RectAreaLightHelper( light : RectAreaLight, color : Hex )
         * light – 被模拟的光源.
         * color – (可选) 如果没有赋值辅助对象将使用光源的颜色。
         *
         * HemisphereLightHelper（半球/户外光源）
         * 创建一个虚拟的球形网格 Mesh 的辅助对象来模拟 半球形光源 HemisphereLight.
         * HemisphereLightHelper( light : HemisphereLight, sphereSize : Number, color : Hex )
         * light – 被模拟的光源.
         * size – 用于模拟光源的网格尺寸.
         * color – (可选的) 如果没有赋值辅助对象将使用光源的颜色.
         */


        /**
         * 添加物体 new THREE.Mesh(Geometry, Material);  Geometry 为物体的形状，Material 为物体的材质；
         * a. 形状(Geometry)
         * 1.BoxGeometry--长方体
         * 2.CircleGeometry--圆形平面
         * 3.CylinderGeometry--圆柱体
         * 4.PlaneGeometry--方形平面
         * 5.RingGeometry--环形平面
         * 6.SphereGeometry--球形
         * 7.TextGeometry--文字
         * 8.TorusGeometry--圆环
         * 9.TubeGeometry--圆管
         * 还有根据坐标去生成具体形状的方法，可以借助第三方建模软件建模之后引入，转换为坐标后再生成，就可以做比较复杂的形状了，比如人脸、汽车等等。
         * b. 材质(Material)
         * 材质就像是物体的皮肤，决定物体外表的样子，例如物体的颜色，看起来是否光滑，是否有贴图等等。
         * 网格基础材质(MeshBasicMaterial) 该材质不受光照的影响，不需要光源即可显示出来，设置颜色后，各个面都是同一个颜色。
         * 网格朗博材质(MeshLambertMaterial) 该材质会受到光照的影响，没有光源时不会显示出来，用于创建表面暗淡，不光亮的物体。漫反射材质
         * 网格 Phong 材质(MeshPhongMaterial) 该材质会受到光照的影响，没有光源时不会显示出来，用于创建光亮的物体。镜面反射材质
         * 网格法向材质(MeshNormalMaterial) 该材质不受光照的影响，不需要光源即可显示出来，并且每个方向的面的颜色都不同，同但一个方向的面颜色是相同的，该材质一般用于调试。
         * MeshDepthMaterial--根据物体上每一点到摄像机的远近来显示颜色，远的显示黑色，近的显示白色
         */
        let box = this.getBox();
        box.position.set(5, 5, 5);
        scene.add(box);
        let box2 = this.getBox();
        box2.position.set(20, 5, 5);
        scene.add(box2);
        // 地面
        // let num = 5; // 5 * 5
        // for (let i = 1; i <= num; i++) {
        //     for(let j = 1; j <= num; j++) {
        //         let grass = this.getGrass();
        //         let k = (num + 1) / 2;
        //         grass.position.set((i - k) * 40, 0, (j - k) * 40);
        //         scene.add(grass);
        //     }
        // }

        /**
         * 盒Helper对象，显示包围一个对象的线框盒。
         * BoxHelper(object)
         * object 要包裹的模型
         */
        // let box = new THREE.BoxHelper( obj );
        // scene.add(box);

        /**
         * 包围盒Helper对象，用于创建对象和世界轴对齐的包围盒的一个帮助对象。
         * BoundingBoxHelper(object, hex)
         */
        // let bbox = new THREE.BoundingBoxHelper(obj, 0xff0000);
        // scene.add(bbox);

        /**
         * 边缘Helper对象，绘制出构成三维模型每个面边缘线信息。
         * EdgesHelper(object, color, thresholdAngle)
         * object（画边界的对象）
         * color（边界颜色）
         * thresholdAngle（角的最小值）
         */
        // let edges = new THREE.EdgesHelper( obj, 0x00ff00 );
        // scene.add( edges );

        /**
         * 网格辅助线
         * GridHelper 本质上是对线模型对象 Line 的封装，纵横交错的直线构成一个矩形网格模型对象。
         * GridHelper( size : number, divisions : Number, colorCenterLine : Color, colorGrid : Color )
         * size -- 网格宽度，默认为 10.
         * divisions -- 等分数，默认为 10.
         * colorCenterLine -- 中心线颜色，默认 0x444444
         * colorGrid --  网格线颜色，默认为 0x888888
         * @type {GridHelper}
         */
        let gridHelper = new THREE.GridHelper(200, 10, 0x444444, 0xffffff);
        scene.add(gridHelper);

        /**
         * 三维坐标轴参考线
         * AxisHelper(size)
         * size（轴线长）
         * @type {AxesHelper}
         */
        let axes = new THREE.AxesHelper(100);
        scene.add(axes);

        // 渲染，设置延迟，物料材质贴图，需时间加载
        setTimeout(() => {
            // material.needsUpdate = true; // 可以隐藏，不用通知更新标记了
            renderer.render(scene, camera);
        }, 100);

        // 添加鼠标操作视图
        let tackBallC, orbC;
        orbC = this.initMouseControl(scene, camera, renderer);

        // 轨迹球
        // tackBallC = this.initTrackballControls(camera, renderer);

        // 添加拖动事件
        this.initDragControl(scene, camera, renderer, tackBallC, orbC);
    }

    // 初始化轨迹球控件
    initTrackballControls(camera, renderer) {
        let controls = new TrackballControls(camera, renderer.domElement);
        // controls.noRotate = true;
        controls.noPan = true;
        // 视角最小距离
        controls.minDistance = 1000;
        // 视角最远距离
        controls.maxDistance = 5000;
        return controls;
    }

    /**
     * 鼠标操作
     */
    initMouseControl(scene, camera, renderer) {
        // 添加鼠标操作
        let controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', () => {
            renderer.render(scene, camera);
        });
        return controls;
    }

    // 添加拖拽控件
    initDragControl(scene, camera, renderer, tackBallC, orbC) {
        // let self = this;
        /**
         * 添加平移控件,可视化操作，默认显示三维坐标系（因为是一个三维模型，所以需要添加到场景中）
         * @type {TransformControls}
         */
        let transformControls = new TransformControls(camera, renderer.domElement);
        scene.add(transformControls);
        // 监听改变，则更新界面
        transformControls.addEventListener("change", () => {
            renderer.render(scene, camera);
        });
        // 变换控制器监听 mousedown，禁用 鼠标拖拽
        transformControls.addEventListener("mouseDown", () => {
            orbC.enabled = false;
        });
        //
        transformControls.addEventListener("mouseUp", () => {
            orbC.enabled = true;
        });

        // 过滤不是 Mesh 的物体,例如辅助网格对象
        let objects = [];
        for (let i = 0; i < scene.children.length; i++) {
            if (scene.children[i].isMesh) {
                objects.push(scene.children[i]);
            }
        }
        // 初始化拖拽控件
        let dragControls = new DragControls(objects, camera, renderer.domElement);

        // 鼠标略过事件
        dragControls.addEventListener('hoveron', function (event) {
            orbC.enabled = false;
            // 让变换控件对象和选中的对象绑定
            transformControls.attach(event.object);
        });
        // 鼠标略过事件
        dragControls.addEventListener('hoveroff', function (event) {
            orbC.enabled = true;
            console.log(event)
        });
        // 开始拖拽
        dragControls.addEventListener('dragstart', function (event) {
            orbC.enabled = false;
            // tackBallC.enabled = false;
            console.log(event)
        });
        // 拖拽结束
        dragControls.addEventListener('dragend', function (event) {
            // tackBallC.enabled = true;
            orbC.enabled = true;
            console.log(event)
            renderer.render(scene, camera);
        });
    }

    /**
     * 获取盒子
     */
    getBox() {
        let geometry = new THREE.BoxGeometry(10, 10, 10);
        // let geometry = new THREE.SphereBufferGeometry(10, 10, 10); // 球体，方便查看边缘Helper
        // 测试使用无需光照材质
        let material = new THREE.MeshNormalMaterial();
        // let material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./assets/box.png') });
        // // 物体
        return new THREE.Mesh(geometry, material);
    }

    /**
     * 获取地砖
     */
    getGrass() {
        let grass;
        let geometry = new THREE.BoxGeometry(40, 0, 40);
        let floor = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./assets/floor.png') });
        // 物体，左右上下前后
        grass = new THREE.Mesh(geometry, floor);
        return grass;
    }
}