"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// A distinct kingdom from Cornea's village: a warm amber stone castle
// with a central keep, corner towers, battlements, a gatehouse and a moat.
export default function RetinaScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x1a120d);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x1a120d, 35, 70);

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

    // Ground — warm sandy plateau
    const ground = new THREE.Mesh(new THREE.CylinderGeometry(13, 11, 1.2, 40), new THREE.MeshLambertMaterial({ color: 0x8a6a2e }));
    ground.position.set(0, -0.6, 0);
    ground.receiveShadow = true;
    scene.add(ground);

    // Moat ring (water)
    const moat = new THREE.Mesh(new THREE.TorusGeometry(7.2, 0.9, 12, 48), new THREE.MeshLambertMaterial({ color: 0x1f5c7a }));
    moat.rotation.x = Math.PI / 2;
    moat.position.y = 0.02;
    scene.add(moat);

    // Stone courtyard
    const court = new THREE.Mesh(new THREE.CylinderGeometry(5.6, 5.6, 0.2, 32), new THREE.MeshLambertMaterial({ color: 0x9a8a70 }));
    court.position.set(0, 0.1, 0);
    court.receiveShadow = true;
    scene.add(court);

    const stone = 0xb9a888;
    const stoneDark = 0x8f7f63;
    const roof = 0x7a3b2a;

    // Corner towers with battlements + conical roofs
    function tower(x: number, z: number) {
      cyl(1.0, 1.15, 5.5, 14, stone, x, 2.75, z);
      // battlement ring (crenellations)
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        box(0.35, 0.6, 0.35, stoneDark, x + Math.cos(a) * 1.0, 5.7, z + Math.sin(a) * 1.0);
      }
      cone(1.25, 1.8, 14, roof, x, 6.6, z);
      // window slit
      box(0.18, 0.7, 0.1, 0x3a2a18, x, 3.6, z + 1.02);
    }
    const c = 3.4;
    tower(-c, -c);
    tower(c, -c);
    tower(-c, c);
    tower(c, c);

    // Curtain walls between towers
    function wall(x: number, z: number, len: number, ry: number) {
      box(len, 2.6, 0.6, stone, x, 1.5, z, ry);
      // crenellations along the top
      const steps = Math.round(len / 0.7);
      for (let i = 0; i <= steps; i += 2) {
        const off = -len / 2 + (i / steps) * len;
        box(0.4, 0.5, 0.6, stoneDark, x + Math.cos(ry) * off, 3.0, z - Math.sin(ry) * off, ry);
      }
    }
    wall(0, -c, 2 * c, 0);
    wall(0, c, 2 * c, 0);
    wall(-c, 0, 2 * c, Math.PI / 2);
    wall(c, 0, 2 * c, Math.PI / 2);

    // Central keep — the tall heart of the castle
    box(3.0, 5.0, 3.0, stoneDark, 0, 2.7, 0);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      box(0.5, 0.7, 0.5, stone, Math.cos(a) * 1.5, 5.3, Math.sin(a) * 1.5);
    }
    box(3.4, 0.4, 3.4, stone, 0, 5.4, 0);
    // Keep spire
    cyl(1.1, 1.1, 2.0, 4, stoneDark, 0, 6.6, 0);
    cone(1.0, 2.4, 4, roof, 0, 8.6, 0);
    // Banner pole + flag
    cyl(0.05, 0.05, 1.6, 6, 0x4a3018, 0, 10.4, 0);
    const flag = box(0.9, 0.55, 0.06, 0xd98a2b, 0.48, 10.7, 0);
    flag.castShadow = false;

    // Gatehouse (front)
    box(2.2, 3.0, 0.8, stone, 0, 1.5, c + 0.1);
    box(1.0, 1.7, 0.2, 0x3a2416, 0, 0.85, c + 0.55); // arched door (dark)
    // Drawbridge over the moat
    box(1.4, 0.15, 3.2, 0x5a3a1e, 0, 0.18, c + 2.4);

    // Torches on the gatehouse — glowing amber
    const torchLights: THREE.PointLight[] = [];
    [[-1.3, c + 0.5], [1.3, c + 0.5]].forEach(([tx, tz]) => {
      cyl(0.06, 0.06, 0.8, 6, 0x3a2a18, tx, 1.6, tz);
      const l = new THREE.PointLight(0xff8a2a, 1.2, 6);
      l.position.set(tx, 2.1, tz);
      scene.add(l);
      torchLights.push(l);
      const flame = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffb04a }));
      flame.position.set(tx, 2.1, tz);
      scene.add(flame);
    });

    // Pennant flags on the towers
    [[-c, -c], [c, -c], [-c, c], [c, c]].forEach(([fx, fz]) => {
      cyl(0.04, 0.04, 1.0, 6, 0x4a3018, fx, 7.3, fz);
      box(0.6, 0.35, 0.05, 0xd98a2b, fx + 0.32, 7.6, fz);
    });

    // Sparse desert shrubs outside the moat
    function shrub(x: number, z: number) {
      cyl(0.08, 0.11, 0.5, 6, 0x6b5226, x, 0.25, z);
      cone(0.5, 0.9, 7, 0x7a7a2e, x, 0.9, z);
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
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xfff2d0, size: 0.3 })));

    // Lighting — warm sunset
    scene.add(new THREE.AmbientLight(0x664433, 0.75));
    const sun = new THREE.DirectionalLight(0xffcc88, 1.5);
    sun.position.set(14, 24, 12);
    sun.castShadow = true;
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0xaa5522, 0.4);
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
      torchLights.forEach((l, i) => { l.intensity = 1.0 + Math.sin(t * 5 + i) * 0.35; });
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
