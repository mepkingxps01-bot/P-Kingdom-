"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Glaucoma's kingdom: a cool blue-stone water citadel ringed by a wide moat,
// with a central lighthouse keep whose beacon slowly pulses like a rising and
// falling intraocular pressure. Distinct from the warm amber Retina castle.
export default function GlaucomaScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x0a1420);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a1420, 35, 72);

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

    function box(w: number, h: number, d: number, color: number, x: number, y: number, z: number, ry = 0) {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshLambertMaterial({ color }));
      m.position.set(x, y, z);
      m.rotation.y = ry;
      m.castShadow = true;
      m.receiveShadow = true;
      scene.add(m);
      return m;
    }
    function cyl(rt: number, rb: number, h: number, seg: number, color: number, x: number, y: number, z: number) {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), new THREE.MeshLambertMaterial({ color }));
      m.position.set(x, y, z);
      m.castShadow = true;
      m.receiveShadow = true;
      scene.add(m);
      return m;
    }
    function cone(r: number, h: number, seg: number, color: number, x: number, y: number, z: number) {
      const m = new THREE.Mesh(new THREE.ConeGeometry(r, h, seg), new THREE.MeshLambertMaterial({ color }));
      m.position.set(x, y, z);
      m.castShadow = true;
      m.receiveShadow = true;
      scene.add(m);
      return m;
    }

    // Ground — cool blue-slate plateau
    const ground = new THREE.Mesh(new THREE.CylinderGeometry(13, 11, 1.2, 40), new THREE.MeshLambertMaterial({ color: 0x2a3550 }));
    ground.position.set(0, -0.6, 0);
    ground.receiveShadow = true;
    scene.add(ground);

    // Wide moat ring (deep water)
    const moat = new THREE.Mesh(new THREE.TorusGeometry(7.4, 1.2, 14, 56), new THREE.MeshLambertMaterial({ color: 0x1c6fb0 }));
    moat.rotation.x = Math.PI / 2;
    moat.position.y = 0.04;
    scene.add(moat);

    // Central still water disc inside the citadel (reflecting pool)
    const pool = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.1, 0.12, 40), new THREE.MeshLambertMaterial({ color: 0x2f8fd0 }));
    pool.position.set(0, 0.16, 0);
    pool.receiveShadow = true;
    scene.add(pool);

    // Stone courtyard island
    const court = new THREE.Mesh(new THREE.CylinderGeometry(5.8, 5.8, 0.2, 36), new THREE.MeshLambertMaterial({ color: 0x5b6c8c }));
    court.position.set(0, 0.1, 0);
    court.receiveShadow = true;
    scene.add(court);

    const stone = 0x6f86b4;
    const stoneDark = 0x4a5f8f;
    const roof = 0x234f7a;

    // Ring of crystalline corner towers with battlements + blue spires
    function tower(x: number, z: number) {
      cyl(1.0, 1.15, 5.2, 14, stone, x, 2.6, z);
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        box(0.34, 0.6, 0.34, stoneDark, x + Math.cos(a) * 1.0, 5.4, z + Math.sin(a) * 1.0);
      }
      cone(1.25, 1.9, 14, roof, x, 6.35, z);
      // glowing blue crystal window
      box(0.2, 0.7, 0.1, 0x8fd3ff, x, 3.4, z + 1.02);
    }
    const c = 3.5;
    tower(-c, -c);
    tower(c, -c);
    tower(-c, c);
    tower(c, c);

    // Curtain walls between the towers
    function wall(x: number, z: number, len: number, ry: number) {
      box(len, 2.5, 0.6, stone, x, 1.45, z, ry);
      const steps = Math.round(len / 0.7);
      for (let i = 0; i <= steps; i += 2) {
        const off = -len / 2 + (i / steps) * len;
        box(0.4, 0.5, 0.6, stoneDark, x + Math.cos(ry) * off, 2.9, z - Math.sin(ry) * off, ry);
      }
    }
    wall(0, -c, 2 * c, 0);
    wall(0, c, 2 * c, 0);
    wall(-c, 0, 2 * c, Math.PI / 2);
    wall(c, 0, 2 * c, Math.PI / 2);

    // Central lighthouse keep rising from the reflecting pool
    cyl(1.4, 1.7, 6.2, 18, stoneDark, 0, 3.3, 0);
    // banded ring
    cyl(1.45, 1.45, 0.4, 18, stone, 0, 5.2, 0);
    box(3.2, 0.35, 3.2, stone, 0, 6.5, 0);
    // beacon lantern room (the glowing heart)
    const lantern = new THREE.Mesh(
      new THREE.CylinderGeometry(0.85, 0.85, 1.3, 16),
      new THREE.MeshBasicMaterial({ color: 0x9fdcff })
    );
    lantern.position.set(0, 7.35, 0);
    scene.add(lantern);
    cone(1.15, 1.4, 16, roof, 0, 8.6, 0);
    // beacon light that pulses like a slow IOP wave
    const beacon = new THREE.PointLight(0x7fc8ff, 1.6, 22);
    beacon.position.set(0, 7.35, 0);
    scene.add(beacon);

    // Banner pole + sky-blue flag
    cyl(0.05, 0.05, 1.5, 6, 0x33415f, 0, 10.0, 0);
    const flag = box(0.9, 0.55, 0.06, 0x38bdf8, 0.48, 10.3, 0);
    flag.castShadow = false;

    // Gatehouse (front) with a bridge spanning the moat
    box(2.2, 2.9, 0.8, stone, 0, 1.45, c + 0.1);
    box(1.0, 1.7, 0.2, 0x1a2740, 0, 0.85, c + 0.55); // dark arched door
    box(1.4, 0.15, 3.4, 0x3a4a68, 0, 0.2, c + 2.5); // bridge deck over the moat

    // Lantern torches on the gatehouse — cool blue flames
    const torchLights: THREE.PointLight[] = [];
    [[-1.3, c + 0.5], [1.3, c + 0.5]].forEach(([tx, tz]) => {
      cyl(0.06, 0.06, 0.8, 6, 0x33415f, tx, 1.55, tz);
      const l = new THREE.PointLight(0x6fbcff, 1.0, 6);
      l.position.set(tx, 2.05, tz);
      scene.add(l);
      torchLights.push(l);
      const flame = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), new THREE.MeshBasicMaterial({ color: 0xbfe6ff }));
      flame.position.set(tx, 2.05, tz);
      scene.add(flame);
    });

    // Pennant flags on the towers
    [[-c, -c], [c, -c], [-c, c], [c, c]].forEach(([fx, fz]) => {
      cyl(0.04, 0.04, 1.0, 6, 0x33415f, fx, 7.05, fz);
      box(0.6, 0.35, 0.05, 0x38bdf8, fx + 0.32, 7.35, fz);
    });

    // Reeds dotting the water's edge outside the moat
    function reed(x: number, z: number) {
      cyl(0.06, 0.08, 0.6, 6, 0x2f5a52, x, 0.3, z);
      cone(0.35, 0.8, 7, 0x3f7f6a, x, 0.95, z);
    }
    [[-9, -3], [9, 3], [-8, 5], [8, -5], [-4, -9], [5, 9]].forEach(([x, z]) => reed(x, z));

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
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xcfe6ff, size: 0.3 })));

    // Lighting — cool moonlit night
    scene.add(new THREE.AmbientLight(0x3a4a6a, 0.8));
    const moon = new THREE.DirectionalLight(0xbcd4ff, 1.3);
    moon.position.set(14, 24, 12);
    moon.castShadow = true;
    scene.add(moon);
    const fill = new THREE.DirectionalLight(0x2a4a7a, 0.4);
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
      // slow IOP-like swell of the beacon
      const pulse = 1.3 + Math.sin(t * 0.9) * 0.5;
      beacon.intensity = pulse;
      (lantern.material as THREE.MeshBasicMaterial).color.setHSL(0.57, 1, 0.55 + Math.sin(t * 0.9) * 0.12);
      torchLights.forEach((l, i) => { l.intensity = 0.9 + Math.sin(t * 5 + i) * 0.3; });
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
