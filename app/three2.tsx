'use client'

import * as THREE from 'three'
import {useEffect} from "react"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import {ImprovedNoise} from 'three/addons/math/ImprovedNoise.js'
import Stats from 'three/examples/jsm/libs/stats.module'

export default function Three() {
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setAnimationLoop( animate );
        document.body.appendChild( renderer.domElement );

        const controls = new OrbitControls(camera, renderer.domElement);

        const stats = Stats()
        document.body.appendChild(stats.dom)

        const pointLight1 = new THREE.PointLight(0xffffff, 10000);
        pointLight1.position.set(10, 5, 40);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffffff, 10000);
        pointLight2.position.set(-10, -5, -40);
        scene.add(pointLight2);

        const noise = new ImprovedNoise();
        const meshGroup = new THREE.Group();
        meshGroup.userData.update = (t: any) => {
            meshGroup.children.forEach((m) => {
                m.userData.update(t);
            });
        }

        scene.add(meshGroup)

        const meshSize = 10;
        const numMeshes = Math.pow(meshSize, 3);
        const startPos = {
            x: -meshSize * .5,
            y: -meshSize * .5,
            z: meshSize * .5
        }

        for (let i = 0; i < numMeshes; i++) {
            const m = getMesh(i);
            meshGroup.add(m);
        }

        function getMesh(index: number){
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });

            const mesh = new THREE.Mesh(geometry, material);
            const gap = 0.5;

            const x = startPos.x + (index % meshSize * gap);
            const y = startPos.y + (Math.floor(index * (1 / meshSize)) % meshSize * gap);
            const z = startPos.z + (Math.floor(index / Math.pow(meshSize, 2)) * -gap);

            mesh.position.set(x, y, z);

            const rate = Math.random() * .1;
            const nScale = .2;
            mesh.userData.update = (t) => {
                t = Math.sin(.2 * t * 4);
                const nz = noise.noise(nScale * x + t, nScale * y + t, nScale * z + t);
                mesh.scale.setScalar(nz);
                const hue = .25 + nz * .3;
                const light = .5 - (.25 + nz *.3);
                mesh.material.color.setHSL(hue, 1, light);
            }
            return mesh;
        }



        camera.position.z = 5;

        function animate(t = 0) {
            meshGroup.userData.update(t * .001);
            renderer.render( scene, camera );
            stats.update()
        }
        renderer.setAnimationLoop(animate);
    }, []);

    return (
        <></>
    )
}