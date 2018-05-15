var camera, scene, renderer, controls,blurComposer,sceneComposer;
var isLoading = true;
var texture = {
    colorMap: null,
    bumpMap: null,
    stroke: null,
    specMap: null
}

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var mapSize = {
    width: 2048*5,
    height: 1024*5
};
var mapCanvas, 
    mapTexture,
    mapCanvasBg,
    textCanvas = document.createElement('canvas'),
    textCanvasCtx = textCanvas.getContext('2d');

//cloud
var tilt = 0.41;
var cloudsScale = 1.005;
var moonScale = 0.23;

var lineColor = 0x5dd8d8;
var lineWidth = 10;
var lineHeight = 0.23;

//飞线(样条曲线：CatmullRomCurve3)路径数组
var spline_curves = []
//飞线(每条样条曲线CatmullRomCurve3中点的数目)长度数组
var trail_flight_distance = []
//每次飞行动画起始结束时间
var flight_start_time = []
var flight_end_time = []

var trail_points = []     //飞线点

var trail_paths = []      //飞线路径
var ml_arr = []

var endPoints = []

var clock = new THREE.Clock();

/*
 * 显示控制变量
 * */

var radius = 10;
var segments = 32;
//飞线点数量
var trail_points_num = 100;
//飞线轨迹点数量
var trail_path_points_num = 500;
// 飞线路径数量
var trail_path_count = 0;
var timer = 0;
//加载状态
//显示比例
var aspect = window.innerWidth / window.innerHeight;

//初始化echart与three场景
init();
animate();

// 生成标记点和曲线 主要作用飞线路径的生成
generateAllPathsPoints(radius)   
//飞线路径上点的控制
getCurvePoints()  
// 创建飞线   
createLines()
for (var i = 0; i < trail_path_count; i++) {
    setFlightTimes(i,10);
}

// --------------------------- 分割线 ------------------------------- //

//初始化echart场景
function initMap() {

    mapCanvas = document.createElement( 'canvas' );
    mapCanvasBg = document.createElement( 'canvas' );
    mapCanvas.width = mapCanvasBg.width = mapSize.width;
    mapCanvas.height = mapCanvasBg.height = mapSize.height;
    mapCanvasBg.style.position = 'absolute'
    mapCanvasBg.style.top = 0;
    mapCanvasBg.style.zIndex = 99;
    
    var chart = echarts.init ( mapCanvas );

    option = {
        backgroundColor: '#ff0',
        geo: [{
            type: 'map',
            map: 'world',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            boundingCoords: [[-180, 90], [180, -90]],
            silent: true,
            blendMode: 'lighter',
            itemStyle: {
                normal: {
                    areaColor: '#000107',
                    borderColor: 'rgba(154, 192, 235,0.5)',
                    borderWidth: 1
                }
            }
        },
            {
                type: 'map',
                map: 'mychina',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                boundingCoords: [[-180, 90], [180, -90]],
                silent: true,
                blendMode: 'lighter',
                itemStyle: {
                    normal: {
                        areaColor: '#000107',
                        borderColor: '#9ac0eb',
                        borderWidth:8
                    }
                }
            },
            {
                type: 'map',
                map: 'mychina',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                boundingCoords: [[-180, 90], [180, -90]],
                silent: true,
                blendMode: 'lighter',
                itemStyle: {
                    normal: {
                        areaColor: '#000107',
                        borderColor: 'rgba(154, 192, 235,0.5)',
                        borderWidth:1
                    }
                }
            }
        ]
    };

    chart.setOption( option );

    //处理外发光后的地球颜色不准确的问题,缺点就是不能使用echarts的部分功能
    var ctx = mapCanvasBg.getContext('2d')
    ctx.fillStyle = '#0d1115'
    ctx.fillRect(0,0,mapCanvasBg.width,mapCanvasBg.height)
    ctx.drawImage(mapCanvas,0,0,mapCanvasBg.width,mapCanvasBg.height)

    mapTexture = new THREE.Texture( mapCanvasBg );

    mapTexture.needsUpdate = true;

}
//初始化three场景
function initThree() {

    /*
    航班，机场，路线数据结构模拟
    {
         airlineFields:["name", "country"] 航空领域
         airportsFields:["name", "city", "country", "longitude", "latitude"]   机场领域
         airlines:[["Air France", "France"], ["easyJet", "United Kingdom"], ["Southwest Airlines", "United States"],…] 航班
         airports:[["Goroka", "Goroka", "Papua New Guinea", 145.391881, -6.081689],…]   机场
         routes:[[9, 4242, 3777], [9, 4242, 3653], [9, 3619, 3571], [9, 3911, 3571], [9, 3911, 3385], [9, 3911, 3731],…]  路线
    }

     */

    var container = document.getElementById( 'container' );

    // 场景
    scene = new THREE.Scene();

    // 相机
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 1000 );
    camera.position.z = -16;

    // 渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setClearColor( 0x050a15 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    //SCENE
    scene = new THREE.Scene();

    //包裹
    all_mesh = new THREE.Object3D()
    all_mesh.rotateX( - Math.PI / 5 );
    all_mesh.rotateY( - Math.PI /12 )
    // all_mesh.scale.set( 2, 2, 2 );

    scene.add(all_mesh)


    directionalLight = new THREE.DirectionalLight( 0x0f1722, 10 );
    scene.add( directionalLight );

    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 1.0;  //按住鼠标左键后拖动查看时的旋转速度
    controls.zoomSpeed = 1.2;   //用滚轮调整大小(远近)时候的速度
    controls.panSpeed = 0.8;    //按住鼠标右键后的平移速度
    controls.noZoom = false;    //如果设置为true, 则禁用 鼠标滚轮调整大小(远近)的功能
    controls.noPan = false;     //如设置为true, 则禁用 按下鼠标右键平移的功能
    controls.minDistance = -12;   //设置滚轮能滚到的最近距离
    controls.maxDistance = 18;   //设置滚轮能滚到的最远距离
    controls.staticMoving = true;   //试了一下, 如果设置为false, 则移动速度贼鸡儿快,嗖的一下就不见了, 具体是干啥玩意的没摸清


    //纹理加载
    var textureLoader = new THREE.TextureLoader();
    var colorMap = textureLoader.load("./assets/img/earth/land_mask_LH_all2.png");
    var bumpMap = textureLoader.load("./assets/img/earth/bump.jpg");
    var specMap = textureLoader.load("./assets/img/earth/earthspec.jpg");
    stroke = textureLoader.load("./assets/img/earth/stroke.png");
    texture = {
        colorMap: colorMap
    }
    createOuterFlow()
    // 地球
    var earth_geo = new THREE.SphereGeometry(radius, segments, segments);

    var earth_mat = new THREE.MeshLambertMaterial({
        map: mapTexture
    });
    earth_mat.specularMap = specMap
    earth_mat.bumpMap = bumpMap
    earth_mat.bumpScale = 0.1
    earth_mesh = new THREE.Mesh(earth_geo, earth_mat)
    earth_mesh.material.transparent = false
    all_mesh.add(earth_mesh) 

}

// 外发光
function createOuterFlow () {

    let AdditiveBlendShader = {

        uniforms: {
    
            'tSampler1': {type: 't', value: null},
            'tSampler2': {type: 't', value: null}
        },
    
        vertexShader: [
    
            'varying vec2 vUv;',
    
            'void main() {',
    
            'vUv = uv;',
            'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
    
            '}'
    
        ].join('\n'),
    
        fragmentShader: [
    
            'uniform sampler2D tSampler1;',
            'uniform sampler2D tSampler2;',
    
            'varying vec2 vUv;',
    
            'void main() {',
    
            'vec4 texture1 = texture2D( tSampler1, vUv );',
            'vec4 texture2 = texture2D( tSampler2, vUv );',
            'gl_FragColor = texture1 + texture2;',
    
            '}'
    
        ].join('\n')
    
    };

    let vertexShader = [
        'varying vec3 vNormal;',
    
        'void main() {',
    
        'vNormal = normalize( normalMatrix * normal );',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
    
        '}'
    
    ].join('\n');
    
    let fragmentShader = [
        'uniform float c;',
        'uniform float p;',
        'varying vec3 vNormal;',
    
        'void main() {',
    
        'float intensity = pow( c - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), p );',
        'gl_FragColor = vec4( 0.2, 0.58, 0.9, 0.3 ) * intensity;',
        '}'
    
    ].join('\n');
    
    let outerGlow = function () {
        let glowGroup = new THREE.Group();
        glowGroup.name = 'glowGroup';
        // glowGroup.visible = false;
    
        glowGroup.add(createGlow());
        glowGroup.add(createBlack());
    
        return glowGroup;
    };
    
    let createBlack = function () {
        let sphere = new THREE.SphereGeometry(radius, 40, 40);
        let blackMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
    
        let blackSphere = new THREE.Mesh(sphere, blackMaterial);
        blackSphere.material.transparent = false;
        blackSphere.name = 'blackSphere';
    
        return blackSphere;
    };
    
    let createGlow = function () {
        let sphere = new THREE.SphereGeometry(radius, 40, 40);
        let material = createFlowMaterial();
    
        let glowSphere = new THREE.Mesh(sphere, material);
        glowSphere.material.side = THREE.BackSide;
        glowSphere.material.transparent = false;
        glowSphere.scale.x = glowSphere.scale.y = glowSphere.scale.z = 1.8;
        glowSphere.name = 'glowSphere';
    
        return glowSphere;
    };
    
    let createFlowMaterial = function () {
        let material = new THREE.ShaderMaterial({
    
            uniforms: {
                'c': {type: 'f', value: 0.5},
                'p': {type: 'f', value: 9.17}
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
    
        });
    
        return material;
    };

    var blurScene = new THREE.Scene();

    var glowGroup = outerGlow();

    blurScene.add(glowGroup);

    let renderTargetParameters = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: true
    };

    let blurRenderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, renderTargetParameters);

    let blurRenderPass = new THREE.RenderPass(blurScene, camera);

    let sceneRenderPass = new THREE.RenderPass(scene, camera);

    blurComposer = new THREE.EffectComposer(renderer, blurRenderTarget);

    blurComposer.addPass(blurRenderPass);

    sceneComposer = new THREE.EffectComposer(renderer, blurRenderTarget);

    sceneComposer.addPass(sceneRenderPass);

    let effectBlend = new THREE.ShaderPass(AdditiveBlendShader, 'tSampler1');

    effectBlend.uniforms['tSampler2'].value = blurComposer.renderTarget2.texture;

    effectBlend.renderToScreen = true;

    sceneComposer.addPass(effectBlend);
}

function init() {
    initMap();
    initThree();
    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

/*
 * 生成曲线的控制点
 * @param float radius
 * @param start array
 * @param end array
 * */
function generateOnePathPoints(radius, start, end) {

    var start_lng = start[0];
    var start_lat = start[1];

    var end_lng = end[0];
    var end_lat = end[1];

    var max_height = Math.random() * 1;   //每条线路高度随机

    var points = [];  //根据经纬度转换后的三维点数组

    var spline_control_points = 8;    //样条点的控制数

    for (var i = 0; i < spline_control_points + 1; i++) {

        var arc_angle = i * 180.0 / spline_control_points;  //每条线路圆弧的弧度

        var arc_radius = radius + (Math.sin(arc_angle * Math.PI / 180.0)) * max_height;  //每条线路圆弧的半径

        var latlng = latlngInterPoint(start_lat, start_lng, end_lat, end_lng, i / spline_control_points);  //获取到二维经纬坐标点，待研究

        var pos = xyzFromLatLng(latlng.lat, latlng.lng, arc_radius);  //经纬度点转化三维坐标点

        points.push(new THREE.Vector3(pos.x, pos.y, pos.z));

    }

    var spline = new THREE.CatmullRomCurve3(points);   //实际传入三个关键点vector3数组元素，上中下

    spline_curves.push(spline);  //飞线路径数组


    var arc_length = spline.getLength();

    trail_flight_distance.push(arc_length);   //飞线圆弧长度


}
/*
* @param string radius
* */
function generateAllPathsPoints(radius) {   //所有线路
    //国内航班
    PATH_DATA.forEach(function (line) {
        generateOnePathPoints(radius, line.start, line.end)    //每一条线路
        endPoints.push(line.end)
    })
    trail_path_count = spline_curves.length   //飞线路径数目赋值

}
function xyzFromLatLng(lat, lng, radius) {
    var phi = (90 - lat) * Math.PI / 180;
    var theta = (360 - lng) * Math.PI / 180;

    return {
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(phi) * Math.sin(theta)
    };
}
/*
 * 先算出两个点之间的总距离
 * 再根据分段的数量算出距离中平均的每一个点的位置（弧度上）
 * 接着根据点的位置重新计算这个点的x,y,z坐标
 * 再把x,y,z坐标转换位经纬度坐标返回
*/
function latlngInterPoint(lat1, lng1, lat2, lng2, offset) {
    lat1 = lat1 * Math.PI / 180.0;
    lng1 = lng1 * Math.PI / 180.0;
    lat2 = lat2 * Math.PI / 180.0;
    lng2 = lng2 * Math.PI / 180.0;

    const d = 2 * Math.asin(Math.sqrt(Math.pow((Math.sin((lat1 - lat2) / 2)), 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lng1 - lng2) / 2), 2))); // 算出两点之间的距离
    const A = Math.sin((1 - offset) * d) / Math.sin(d); // A点
    const B = Math.sin(offset * d) / Math.sin(d); // B点
    const x = A * Math.cos(lat1) * Math.cos(lng1) + B * Math.cos(lat2) * Math.cos(lng2); // 每一个点的x坐标
    const y = A * Math.cos(lat1) * Math.sin(lng1) + B * Math.cos(lat2) * Math.sin(lng2); // 每一个点的y坐标
    const z = A * Math.sin(lat1) + B * Math.sin(lat2); //每一个点的z坐标
    const lat = Math.atan2(z, Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))) * 180 / Math.PI;
    const lng = Math.atan2(y, x) * 180 / Math.PI;

    return {
        lat: lat,
        lng: lng
    };
}

// 创建动态飞线
function createLines() {
    createMarkers()

    trail_paths.forEach((paths,i)=>{
        var index = Math.floor(i/6)
        var geometry = new THREE.Geometry();
        var g = new THREE.MeshLine(); 
        
        var material = new THREE.MeshLineMaterial({
            useMap: false,
            color: new THREE.Color(LINES_COLORS[index]),
            opacity: 0,
            resolution: new THREE.Vector2(windowWidth , windowHeight),
            sizeAttenuation: !false,
            lineWidth: 0.02,
            near: camera.near,
            far: camera.far
        });
        paths.forEach((path)=>{
            geometry.vertices.push(path);
        })
        g.setGeometry(geometry); 
        var trail = new THREE.Mesh(g.geometry, material);
        all_mesh.add(trail);
        
    })
    for (var i = 0; i < trail_path_count; i++) {
        var index = Math.floor(i/6)
        var ml = createFlyLine(trail_points[i],new THREE.Color(1,1,1))
        ml_arr.push(ml)
    }

}

// 创建机场标记
function createMarkers(){
    var marker1 = THREE.ImageUtils.loadTexture("./assets/img/marker1.png");
    var marker = THREE.ImageUtils.loadTexture("./assets/img/marker.png");
    var marker2 = THREE.ImageUtils.loadTexture("./assets/img/marker2.png");
    var marker3 = THREE.ImageUtils.loadTexture("./assets/img/marker3.png");
    var markers = [ marker, marker1, marker2, marker3 ]

    for(var i=0;i<AIRPORTS_DATA.length;i++){
        var pos = latLonToXyz(AIRPORTS_DATA[i][0],AIRPORTS_DATA[i][1],radius)
        createMarker(markers[AIRPORTS_DATA[i][3]],pos,0xffffff,0.95)

        var image = createText(AIRPORTS_DATA[i][2],30,'#fff')
        var texture = new THREE.Texture( image )
        texture.needsUpdate = true;
        createMarker(texture,pos,0xffffff,0.95)
    }

}

// 经纬度转xyz坐标
function latLonToXyz(lon,lat,rad){
    
    var phi = Math.PI/2 - lat * Math.PI / 180;
    var theta = 2 * Math.PI - lon * Math.PI / 180;
    
    var vertex = new THREE.Vector3();                
    vertex.x = Math.sin(phi) * Math.cos(theta) * rad;
    vertex.y = Math.cos(phi) * rad;
    vertex.z = Math.sin(phi) * Math.sin(theta) * rad;
    return vertex
}

// 创建地图标记
function createMarker(texture,pos,color,size){
    var pointGeometry =  new THREE.Geometry();
    pointGeometry.vertices.push( pos )
    var materialPlane = new THREE.PointsMaterial({
        size:size,
        color: color,
        map:texture,
        side: THREE.DoubleSide,
        transparent: true,
        depthTest: false
    })
    var PointsPlane = new THREE.Points(pointGeometry, materialPlane)
    PointsPlane.lookAt(new THREE.Vector3(0, 0, 0))
    all_mesh.add(PointsPlane)
}

function createText(text,fontSize,color){
    textCanvasCtx.clearRect(0,0,textCanvas.width,0)
    textCanvas.width = 195;
    textCanvas.height = 195;
    textCanvasCtx.translate(textCanvas.width/2,0)
    textCanvasCtx.textAlign = 'center';
    textCanvasCtx.textBaseline = 'top';
    textCanvasCtx.font = fontSize+"px '微软雅黑'";
    textCanvasCtx.fillStyle = color
    textCanvasCtx.fillText(text,0,20)
    var image = new Image()
    image.src = textCanvas.toDataURL()
    return image
}
function createFlyLine(path,color){
    var ml = new THREE.MeshLine();
        ml.setGeometry(path, function (p) {
            return 1-p
        }); 
    var material = new THREE.MeshLineMaterial({
            useMap: true,
            map: stroke,
            color: new THREE.Color(color),
            opacity: 0.8,
            resolution: new THREE.Vector2(windowWidth , windowHeight),
            sizeAttenuation: false,
            lineWidth: lineWidth*2,
            near: camera.near,
            far: camera.far,
            depthTest: true,
            transparent: true
    });

    var trail = new THREE.Mesh(ml.geometry, material);

    all_mesh.add(trail);
    return ml;
}

function getCurvePoints() {

    for (var i = 0; i < trail_path_count; i++) {

        var vertices = spline_curves[i].getPoints(trail_path_points_num)  //每条飞线按初始值100个点平分
        var points = new Float32Array(trail_points_num * 3)
        for (var j = 0; j < trail_points_num; j++) {
            // 起始阶段全部放置在初始位置
            points[j * 3 + 0] = vertices[0].x;
            points[j * 3 + 1] = vertices[0].y;
            points[j * 3 + 2] = vertices[0].z;
        }

        trail_paths.push(vertices)

        trail_points.push(points)


    }

}
function setFlightTimes(i, interval) {
    interval = interval ? interval : 0;
    var duration = trail_flight_distance[i] * 800 //线的速度，默认是800
    var start_time = Date.now() + Math.random() * 150 + i * 100 + interval
    flight_start_time[i] = start_time;
    flight_end_time[i] = start_time + duration;
}
// 线性缓动计算
function easeLinear(t, d) {
    return t / d
}
function update_flights() {

    //移动轨迹的飞线
    timer += clock.getDelta();

    var final_ease_val = (trail_path_points_num + trail_points_num) / trail_path_points_num

    for (var i = 0; i < trail_path_count; ++i) {
        if (Date.now() > flight_start_time[i]) {
            var ease_val = easeLinear(Date.now() - flight_start_time[i], flight_end_time[i] - flight_start_time[i])
            if (ease_val >= final_ease_val) {
                setFlightTimes(i, 800)
                ease_val = 0
            }

            var pointIndex = ~~(trail_path_points_num * ease_val)
            if (pointIndex > trail_path_points_num) {
                var delta = trail_path_points_num + trail_points_num - pointIndex;
                for (var j = 0; j < trail_points_num; j++) {

                    if (j < delta) {

                        var k = trail_path_points_num - 1 - (delta - j);
                        trail_points[i][j * 3 + 0] = trail_paths[i][k].x
                        trail_points[i][j * 3 + 1] = trail_paths[i][k].y
                        trail_points[i][j * 3 + 2] = trail_paths[i][k].z
                    } else {
                        var k = trail_path_points_num - 1;
                        trail_points[i][j * 3 + 0] = trail_paths[i][k].x
                        trail_points[i][j * 3 + 1] = trail_paths[i][k].y
                        trail_points[i][j * 3 + 2] = trail_paths[i][k].z
                    }
                }
            } else {
                var delta = pointIndex - trail_points_num
                for (var j = 0; j < trail_points_num; j++) {
                    var k = (j + delta >= 0) ? (j + delta) : 0
                    trail_points[i][j * 3 + 0] = trail_paths[i][k].x
                    trail_points[i][j * 3 + 1] = trail_paths[i][k].y
                    trail_points[i][j * 3 + 2] = trail_paths[i][k].z
                }
            }

            ml_arr[i].setGeometry(trail_points[i], function (p) {
                return p
            });
        }
    }

}
function animate() {
    requestAnimationFrame(animate);
    render();
}
function render() {
    camera.lookAt(scene.position);
    update_flights();    
    controls.update();
    directionalLight.position.copy( camera.position );
    blurComposer.render()
    sceneComposer.render()
    // renderer.render(scene, camera);
}



