
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/FBXLoader.js';

const container = document.getElementById('model-container');

if (container) {
    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent

    // Camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 5, 15); // Adjusted for typical GPU model scale

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // Disable zoom to avoid scrolling issues
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 2, 50); // Blue accent light
    pointLight.position.set(-5, 5, 0);
    scene.add(pointLight);

    // Load Model
    const loader = new FBXLoader();
    loader.load('./assets/3d/model.fbx', (object) => {
        object.scale.set(0.05, 0.05, 0.05); // Adjust scale - FBX often comes in huge
        object.position.y = -2; // Center it

        // Traverse to fix materials if needed
        object.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                // Attempt to auto-apply textures if paths are weird, 
                // but usually FBXLoader handles embedded or relative paths well.
            }
        });

        scene.add(object);

        // Optimize: Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

    }, (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, (error) => {
        console.error('An error happened loading the model:', error);
        container.innerHTML = '<p style="color:red">Error loading 3D Model</p>';
    });

    // Handle Resize
    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}
