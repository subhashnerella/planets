var container, stats;
var camera, controls, scene, renderer;
var info;
var cube;
var sphereTab = [];
var objects = [];
var sun;
var mesh;
var earthMesh;
init();
animate();
function init() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 275;
    controls = new THREE.OrbitControls(camera);
    controls.maxDistance = 300;
    controls.minDistance = 30;
    scene = new THREE.Scene();
    var geoSphere = new THREE.SphereGeometry(Math.random() * 1, 20, 20)
    for (var i = 0; i < 500; i++) {
        // randRadius = Math.random()*30+10;
        lumiereS = new THREE.MeshPhongMaterial({
            emissive: '#fff'
        });
        sphereTab.push(new THREE.Mesh(new THREE.SphereGeometry(Math.random() * 1, 20, 20), lumiereS));
    }
    var posX = -3000;
    var posY = -3000;
    for (var i = 0; i < sphereTab.length; i++) {
        sphereTab[i].position.set(Math.random() * 600 - 300, Math.random() * 600 - 300, Math.random() * 600 - 300);
        scene.add(sphereTab[i]);
    }

    //Sun
    var geometry   = new THREE.SphereGeometry(30, 32, 32)
    var texture = new THREE.TextureLoader().load( 'skins/sun.jpg');
    var material  = new THREE.MeshPhongMaterial({ map: texture});
    sunMesh = new THREE.Mesh(geometry, material)
    scene.add(sunMesh)

    //Earth
    var geometry   = new THREE.SphereGeometry(10, 32, 32)
    var texture = new THREE.TextureLoader().load( 'skins/earthmap1k.jpg');
    var bump_texture = new THREE.TextureLoader().load( 'skins/earthbump1k.jpg');
    var material  = new THREE.MeshPhongMaterial({ map: texture ,bumpMap	:bump_texture,bumpScale:2});
    earthMesh = new THREE.Mesh(geometry, material)
    earthMesh.position.x = 120;
    scene.add(earthMesh)

    //Mars
    var geometry   = new THREE.SphereGeometry(8, 32, 32)
    var texture = new THREE.TextureLoader().load( 'skins/mars.jpg');
    var material  = new THREE.MeshPhongMaterial({ map: texture });
    marsMesh = new THREE.Mesh(geometry, material)
    marsMesh.position.x = 200;
    scene.add(marsMesh)


    
    // lights
    light = new THREE.DirectionalLight(0x4f4f4f);
    light.position.set(4, 4, 4);
    scene.add(light);
    light = new THREE.DirectionalLight(0x4f4f4f);
    light.position.set(-4, -4, -4);
    scene.add(light);
    light = new THREE.AmbientLight( 0xdfdfe5 ); // soft white light
    scene.add(light);

    //render
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.sortObjects = false;
    renderer.setClearColor(0x000000, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    stats = new Stats();
    container = document.getElementById('container');
    container.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
    info = document.getElementById('contentTitle');
    subtitle = document.getElementById('subtitle');
    description = document.getElementById('description')
    var univers = document.getElementById('univers');

}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function animate() {
    ;
    var timer = 0.00001 * Date.now();
    for (var i = 0, il = sphereTab.length; i < il; i++) {
        var sfere = sphereTab[i];
        sfere.position.x = 400 * Math.sin(timer + i);
        // sfere.position.z= 500 * Math.sin( timer + i * 1.1 );
        sfere.position.z = 400 * Math.sin(timer + i * 1.1);
    }
    earthMesh.rotation.y  += 0.01
    sunMesh.rotation.y  += 0.01
    marsMesh.rotation.y  += 0.01
    //cloudMesh.rotation.y  += 1/32 * delta
    requestAnimationFrame(animate);
    controls.update();
    render();
}
function render() {
    // }
    renderer.render(scene, camera)
}