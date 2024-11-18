'use client'

import * as THREE from 'three'
import {useEffect} from "react";
import openSimplexNoise from 'open-simplex-noise';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {Vector3} from "three";
import {ImprovedNoise} from 'https://unpkg.com/three/examples/jsm/math/ImprovedNoise.js';

export default function Three() {
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setAnimationLoop( animate );
        document.body.appendChild( renderer.domElement );

        new OrbitControls(camera, renderer.domElement);

        const pointLight1 = new THREE.PointLight(0xffffff, 1000);
        pointLight1.position.set(10, 5, 40);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffffff, 1000);
        pointLight2.position.set(-10, -5, -40);
        scene.add(pointLight2);

        const geometry = new THREE.IcosahedronGeometry( 1, 10 );
        let nPos = [];
        let v3 = new THREE.Vector3();
        let pos = geometry.attributes.position;
        for (let i = 0; i < pos.count; i++){
            v3.fromBufferAttribute(pos, i).normalize();
            nPos.push(v3.clone());
        }
        geometry.userData.nPos = nPos;

        const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
        material.flatShading = true;
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        camera.position.z = 5;

        // let noise = openSimplexNoise.makeNoise4D(Date.now());
        let noise = new ImprovedNoise().noise(5);
        let clock = new THREE.Clock();

        geometry.userData.nPos.forEach((p: THREE.Vector3Like, idx: number) => {
            const ns = new ImprovedNoise().noise(5);
            if (p instanceof Vector3) {
                v3.copy(p).multiplyScalar(2).addScaledVector(p, ns);
            }
            pos.setXYZ(idx, v3.x, v3.y, v3.z);
        })
        geometry.computeVertexNormals();

        function animate() {

            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;

            // let t = clock.getElapsedTime();
            // geometry.userData.nPos.forEach((p: THREE.Vector3Like, idx: number) => {
            //     const ns = noise(p.x, p.y, p.z, t);
            //     if (p instanceof Vector3) {
            //         v3.copy(p).multiplyScalar(2).addScaledVector(p, ns);
            //     }
            //     pos.setXYZ(idx, v3.x, v3.y, v3.z);
            // })
            // geometry.computeVertexNormals();
            // pos.needsUpdate = true;

            renderer.render( scene, camera );

        }
        renderer.setAnimationLoop(animate);
    }, []);

    return (
        <></>
    )
}