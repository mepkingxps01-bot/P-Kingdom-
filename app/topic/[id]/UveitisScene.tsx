"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// A distinct kingdom from the others: a circular healer's rotunda — a ring
// of pale columns around a central domed sanctum, lit by rose-crimson
// braziers, evoking the inflamed uvea it teaches.
export default function UveitisScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x1a0d12);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x1a0d12, 35, 70);

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

    const marble = 0xe8dbe0;
    const marbleDark = 0xb99aa6;
    const rose = 0xc23a5a;

    // Ground — dark rose plateau
    const ground = new THREE.Mesh(new THREE.CylinderGeometry(13, 11, 1.2, 40), new THREE.MeshLambertMaterial({ color: 0x5a2a38 }));
    ground.position.set(0, -0.6, 0);
    ground.receiveShadow = true;
    scene.add(ground);

    // Circular tiled floor
    const floor = new THREE.Mesh(new THREE.CylinderGeometry(6.2, 6.2, 0.25, 40), new THREE.MeshLambertMaterial({ color: 0xcdbcc4 }));
    floor.position.set(0, 0.12, 0);
    floor.receiveShadow = true;
    scene.add(floor);

    // Inner rose inlay ring (the "iris")
    const inlay = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.35, 12, 48), new THREE.MeshLambertMaterial({ color: rose }));
    inlay.rotation.x = Math.PI / 2;
    inlay.position.y = 0.26;
    scene.add(inlay);

    // Ring of columns with a stepped base + capital
    const ringR = 5.0;
    const nCols = 12;
    for (let i = 0; i < nCols; i++) {
      const a = (i / nCols) * Math.PI * 2;
      const x = Math.cos(a) * ringR;
      const z = Math.sin(a) * ringR;
      box(1.0, 0.35, 1.0, marbleDark, x, 0.42, z); // base
      cyl(0.32, 0.36, 4.0, 16, marble, x, 2.4, z); // shaft
      box(0.95, 0.35, 0.95, marbleDark, x, 4.6, z); // capital
    }

    // Architrave ring resting on the columns
    const arch = new THREE.Mesh(new THREE.TorusGeometry(ringR, 0.28, 10, 48), new THREE.MeshLambertMaterial({ color: marbleDark }));
    arch.rotation.x = Math.PI / 2;
    arch.position.y = 4.95;
    scene.add(arch);

    // Central domed sanctum
    cyl(2.2, 2.4, 3.4, 24, marble, 0, 1.85, 0);
    // ring of narrow rose windows around the drum
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      box(0.28, 1.2, 0.12, 0x7a1f36, Math.cos(a) * 2.22, 2.3, Math.sin(a) * 2.22, -a);
    }
    // dome
    const dome = new THREE.Mesh(new THREE.SphereGeometry(2.3, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0x9a4a5e }));
    dome.position.y = 3.55;
    dome.castShadow = true;
    scene.add(dome);
    // finial + banner
    cyl(0.12, 0.12, 0.6, 8, marbleDark, 0, 5.9, 0);
    cyl(0.05, 0.05, 1.4, 6, 0x4a2028, 0, 6.9, 0);
    const flag = box(0.9, 0.55, 0.06, rose, 0.48, 7.2, 0);
    flag.castShadow = false;

    // Arched sanctum doorway (dark)
    box(1.1, 1.9, 0.2, 0x2a1016, 0, 1.05, 2.42);

    // Rose braziers around the inlay ring — glowing crimson
    const braziers: THREE.PointLight[] = [];
    const flames: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const bx = Math.cos(a) * 3.6;
      const bz = Math.sin(a) * 3.6;
      cyl(0.22, 0.14, 0.7, 10, marbleDark, bx, 0.55, bz); // bowl stand
      cyl(0.32, 0.22, 0.28, 12, 0x7a1f36, bx, 1.0, bz); // bowl
      const l = new THREE.PointLight(0xff4d6d, 1.4, 8);
      l.position.set(bx, 1.5, bz);
      scene.add(l);
      braziers.push(l);
      const flame = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), new THREE.MeshBasicMaterial({ color: 0xff7a92 }));
      flame.position.set(bx, 1.35, bz);
      scene.add(flame);
      flames.push(flame);
    }

    // Pennants on alternating columns
    for (let i = 0; i < nCols; i += 3) {
      const a = (i / nCols) * Math.PI * 2;
      const x = Math.cos(a) * ringR;
      const z = Math.sin(a) * ringR;
      box(0.5, 0.3, 0.05, rose, x, 5.3, z);
    }

    // Sparse dark shrubs outside
    function shrub(x: number, z: number) {
      cyl(0.08, 0.11, 0.5, 6, 0x4a2630, x, 0.25, z);
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 8), new THREE.MeshLambertMaterial({ color: 0x6a2c3c }));
      b.position.set(x, 0.9, z);
      scene.add(b);
    }
    [[-9, -3], [9, 3], [-8, 5], [8, -5], [-4, -9], [5, 9]].forEach(([x, z]) => shrub(x, z));

    // Stars
    const starVerts: number[] = [];
    for (let i = 0; i < 300; i++) {
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      const r = 52 + Math.random() * 10;
      starVerts.push(r * Math.sin(p) * Math.cos(t), r * Math.cos(p), r * Math.sin(p) * Math.sin(t));
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.Float32BufferAttribute(starVerts, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffd9e2, size: 0.3 })));

    // Lighting — cool night with a rose glow
    scene.add(new THREE.AmbientLight(0x553344, 0.8));
    const moon = new THREE.DirectionalLight(0xd8c0d0, 1.2);
    moon.position.set(14, 24, 12);
    moon.castShadow = true;
    scene.add(moon);
    const fill = new THREE.DirectionalLight(0x8a2a44, 0.5);
    fill.position.set(-12, 6, -10);
    scene.add(fill);

    // Orbit
    let isDragging = false, lastX = 0, lastY = 0;
    let theta = 0.7, phi = 0.5, radius = 24;
    let autoRotate = true;
    const target = new THREE.Vector3(0, 3, 0);

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
      braziers.forEach((l, i) => { l.intensity = 1.2 + Math.sin(t * 5 + i) * 0.4; });
      flames.forEach((f, i) => { f.scale.setScalar(1 + Math.sin(t * 6 + i) * 0.15); });
      flag.rotation.y = Math.sin(t * 2) * 0.25;
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
