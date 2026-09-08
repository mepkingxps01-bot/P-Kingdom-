"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// A distinct kingdom for neuro-ophthalmology: a hilltop observatory. A domed
// tower with a rotating emerald beacon whose beam sweeps back and forth like
// the slow-and-fast phases of nystagmus, ringed by signal pylons.
export default function NeuroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x081512);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x081512, 35, 72);

    const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 200);

    function resize() {
      const w = canvas!.parentElement?.clientWidth ?? 600;
      const h = Math.round(w * 0.56);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener("resize", resize);

    function cyl(rt: number, rb: number, h: number, seg: number, color: number, x: number, y: number, z: number) {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), new THREE.MeshLambertMaterial({ color }));
      m.position.set(x, y, z);
      m.castShadow = true;
      m.receiveShadow = true;
      scene.add(m);
      return m;
    }
    function box(w: number, h: number, d: number, color: number, x: number, y: number, z: number, ry = 0) {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshLambertMaterial({ color }));
      m.position.set(x, y, z);
      m.rotation.y = ry;
      m.castShadow = true;
      m.receiveShadow = true;
      scene.add(m);
      return m;
    }

    const stone = 0xcfe7dc;
    const stoneDark = 0x8fb3a4;
    const emerald = 0x1fbf7a;

    // Ground — dark green plateau
    const ground = new THREE.Mesh(new THREE.CylinderGeometry(13, 11, 1.2, 40), new THREE.MeshLambertMaterial({ color: 0x1c3a30 }));
    ground.position.set(0, -0.6, 0);
    ground.receiveShadow = true;
    scene.add(ground);

    // Circular courtyard floor
    const floor = new THREE.Mesh(new THREE.CylinderGeometry(6.4, 6.4, 0.25, 40), new THREE.MeshLambertMaterial({ color: 0xb6cfc4 }));
    floor.position.set(0, 0.12, 0);
    floor.receiveShadow = true;
    scene.add(floor);

    // Emerald inlay ring
    const inlay = new THREE.Mesh(new THREE.TorusGeometry(3.7, 0.32, 12, 48), new THREE.MeshLambertMaterial({ color: emerald }));
    inlay.rotation.x = Math.PI / 2;
    inlay.position.y = 0.26;
    scene.add(inlay);

    // Central observatory tower (tapered drum)
    cyl(1.9, 2.4, 5.2, 28, stone, 0, 2.7, 0);
    // window band
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      box(0.26, 0.9, 0.12, 0x0f5a3c, Math.cos(a) * 2.05, 3.6, Math.sin(a) * 2.05, -a);
    }
    // observation gallery
    cyl(2.15, 2.15, 0.45, 28, stoneDark, 0, 5.5, 0);
    // hemispherical dome
    const dome = new THREE.Mesh(new THREE.SphereGeometry(1.9, 28, 18, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0x2f7d63 }));
    dome.position.y = 5.7;
    dome.castShadow = true;
    scene.add(dome);
    // dome slit
    box(0.35, 1.7, 0.12, 0x083024, 0, 6.4, 1.85);

    // Rotating beacon lamp at the top of the dome
    const beaconPivot = new THREE.Object3D();
    beaconPivot.position.set(0, 7.5, 0);
    scene.add(beaconPivot);
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.32, 12, 12), new THREE.MeshBasicMaterial({ color: 0x8affd0 }));
    beaconPivot.add(lamp);
    const beacon = new THREE.SpotLight(0x35ffab, 2.4, 26, Math.PI / 9, 0.4, 1.2);
    beacon.position.set(0, 0, 0);
    const beaconTarget = new THREE.Object3D();
    beaconTarget.position.set(10, -3, 0);
    beaconPivot.add(beacon);
    beaconPivot.add(beaconTarget);
    beacon.target = beaconTarget;

    // Ring of signal pylons around the courtyard
    const ringR = 5.2;
    const nPylons = 8;
    const pylonLights: THREE.PointLight[] = [];
    const orbs: THREE.Mesh[] = [];
    for (let i = 0; i < nPylons; i++) {
      const a = (i / nPylons) * Math.PI * 2;
      const x = Math.cos(a) * ringR;
      const z = Math.sin(a) * ringR;
      box(0.7, 0.3, 0.7, stoneDark, x, 0.4, z); // base
      cyl(0.16, 0.2, 3.0, 10, stone, x, 1.9, z); // post
      const orb = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 10), new THREE.MeshBasicMaterial({ color: 0x7dffc4 }));
      orb.position.set(x, 3.5, z);
      scene.add(orb);
      orbs.push(orb);
      const l = new THREE.PointLight(0x2fd68f, 0.7, 6);
      l.position.set(x, 3.5, z);
      scene.add(l);
      pylonLights.push(l);
    }

    // A pair of low arches (gateway) toward the viewer
    box(0.5, 2.4, 0.5, stone, -1.6, 1.2, 5.6);
    box(0.5, 2.4, 0.5, stone, 1.6, 1.2, 5.6);
    box(3.7, 0.5, 0.5, stoneDark, 0, 2.55, 5.6);

    // Sparse conifers outside
    function tree(x: number, z: number) {
      cyl(0.1, 0.14, 0.6, 6, 0x3a2a1c, x, 0.3, z);
      const c = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.6, 8), new THREE.MeshLambertMaterial({ color: 0x1f5a3e }));
      c.position.set(x, 1.3, z);
      c.castShadow = true;
      scene.add(c);
    }
    [[-9, -3], [9, 3], [-8, 5], [8, -5], [-4, -9], [5, 9], [-9, 4]].forEach(([x, z]) => tree(x, z));

    // Stars
    const starVerts: number[] = [];
    for (let i = 0; i < 320; i++) {
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      const r = 54 + Math.random() * 10;
      starVerts.push(r * Math.sin(p) * Math.cos(t), r * Math.cos(p), r * Math.sin(p) * Math.sin(t));
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.Float32BufferAttribute(starVerts, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xc9ffe6, size: 0.3 })));

    // Lighting — cool night with an emerald glow
    scene.add(new THREE.AmbientLight(0x2e5a4a, 0.85));
    const moon = new THREE.DirectionalLight(0xbfe6d6, 1.15);
    moon.position.set(14, 24, 12);
    moon.castShadow = true;
    scene.add(moon);
    const fill = new THREE.DirectionalLight(0x1a8a5c, 0.5);
    fill.position.set(-12, 6, -10);
    scene.add(fill);

    // Orbit
    let isDragging = false, lastX = 0, lastY = 0;
    let theta = 0.7, phi = 0.55, radius = 24;
    let autoRotate = true;
    const target = new THREE.Vector3(0, 3.2, 0);

    function updateCamera() {
      camera.position.set(
        target.x + radius * Math.sin(phi) * Math.sin(theta),
        target.y + radius * Math.cos(phi),
        target.z + radius * Math.sin(phi) * Math.cos(theta)
      );
      camera.lookAt(target);
    }
    updateCamera();

    canvas.addEventListener("mousedown", (e) => { isDragging = true; autoRotate = false; lastX = e.clientX; lastY = e.clientY; });
    window.addEventListener("mouseup", () => { isDragging = false; });
    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      theta -= (e.clientX - lastX) * 0.01;
      phi = Math.max(0.1, Math.min(Math.PI * 0.48, phi + (e.clientY - lastY) * 0.01));
      lastX = e.clientX; lastY = e.clientY;
      updateCamera();
    });
    canvas.addEventListener("wheel", (e) => {
      radius = Math.max(9, Math.min(42, radius + e.deltaY * 0.05));
      updateCamera();
      e.preventDefault();
    }, { passive: false });

    let t = 0;
    let animId: number;
    function animate() {
      animId = requestAnimationFrame(animate);
      t += 0.02;
      if (autoRotate) { theta += 0.004; updateCamera(); }
      // Beacon sweeps back and forth (slow drift) with periodic quick resets (fast phase)
      beaconPivot.rotation.y = Math.sin(t * 0.9) * 1.1;
      lamp.scale.setScalar(1 + Math.sin(t * 5) * 0.12);
      pylonLights.forEach((l, i) => { l.intensity = 0.6 + Math.sin(t * 4 + i) * 0.3; });
      orbs.forEach((o, i) => { o.scale.setScalar(1 + Math.sin(t * 4 + i) * 0.12); });
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", display: "block", borderRadius: "16px" }}
    />
  );
}
