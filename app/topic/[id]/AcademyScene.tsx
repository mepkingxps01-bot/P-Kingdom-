"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// A distinct kingdom for Basic Science: a violet-lit marble "Academy of
// Knowledge" — a classical colonnaded temple with a floating, glowing orb
// of knowledge orbited by books, set on a stone plaza with crystals.
export default function AcademyScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x120d1a);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x120d1a, 35, 70);

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
    function cone(r: number, h: number, seg: number, color: number, x: number, y: number, z: number, ry = 0) {
      const m = new THREE.Mesh(new THREE.ConeGeometry(r, h, seg), new THREE.MeshLambertMaterial({ color }));
      m.position.set(x, y, z);
      m.rotation.y = ry;
      m.castShadow = true;
      m.receiveShadow = true;
      scene.add(m);
      return m;
    }

    const marble = 0xd8d2e8;
    const marbleDark = 0xb4acc8;
    const roofCol = 0x8a7ba5;

    // Plaza
    const plaza = new THREE.Mesh(new THREE.CylinderGeometry(12, 10.5, 1.2, 40), new THREE.MeshLambertMaterial({ color: 0x4a4060 }));
    plaza.position.set(0, -0.6, 0);
    plaza.receiveShadow = true;
    scene.add(plaza);

    // Stepped stylobate (rectangular temple base)
    box(11, 0.5, 8, marbleDark, 0, 0.25, 0);
    box(10, 0.5, 7, marble, 0, 0.7, 0);
    box(9, 0.5, 6, marble, 0, 1.15, 0);
    const platformTop = 1.4;

    // Colonnade — front and back rows of columns
    function column(x: number, z: number) {
      cyl(0.34, 0.4, 3.6, 12, marble, x, platformTop + 1.8, z);
      box(0.9, 0.35, 0.9, marbleDark, x, platformTop + 3.75, z); // capital
      box(0.75, 0.3, 0.75, marble, x, platformTop + 0.1, z); // base
    }
    const colX = [-3.4, -1.7, 0, 1.7, 3.4];
    colX.forEach((x) => { column(x, 2.4); column(x, -2.4); });
    // side columns
    [[-3.4, 1.2], [-3.4, -1.2], [3.4, 1.2], [3.4, -1.2]].forEach(([x, z]) => column(x, z));

    // Entablature (roof slab)
    box(9.6, 0.6, 6.6, marbleDark, 0, platformTop + 4.2, 0);
    // Shallow pyramidal roof
    cone(6.2, 1.9, 4, roofCol, 0, platformTop + 5.4, 0, Math.PI / 4);

    // Inner altar / pedestal
    cyl(0.9, 1.1, 1.2, 16, marbleDark, 0, platformTop + 0.6, 0);
    cyl(0.7, 0.7, 0.3, 16, marble, 0, platformTop + 1.3, 0);

    // Floating orb of knowledge (glowing) above the temple
    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(0.85, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0xb98cff })
    );
    orb.position.set(0, platformTop + 6.6, 0);
    scene.add(orb);
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(1.25, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0x7a4cff, transparent: true, opacity: 0.18 })
    );
    halo.position.copy(orb.position);
    scene.add(halo);
    const orbLight = new THREE.PointLight(0x9a5cff, 2.2, 22);
    orbLight.position.copy(orb.position);
    scene.add(orbLight);

    // Books orbiting the orb
    const bookColors = [0x7a4cff, 0x4c7aff, 0xc04cff];
    const books: THREE.Mesh[] = [];
    bookColors.forEach((c) => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.14, 0.4), new THREE.MeshLambertMaterial({ color: c }));
      scene.add(b);
      books.push(b);
    });

    // Braziers at the front steps with violet flame
    const flames: THREE.Mesh[] = [];
    const brazierLights: THREE.PointLight[] = [];
    [[-2.6, 4.6], [2.6, 4.6]].forEach(([x, z]) => {
      cyl(0.28, 0.34, 1.0, 10, marbleDark, x, 0.9, z);
      const flame = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 10), new THREE.MeshBasicMaterial({ color: 0xc79cff }));
      flame.position.set(x, 1.55, z);
      scene.add(flame);
      flames.push(flame);
      const l = new THREE.PointLight(0xb070ff, 1.0, 6);
      l.position.set(x, 1.8, z);
      scene.add(l);
      brazierLights.push(l);
    });

    // Crystal shards around the plaza
    function crystal(x: number, z: number, s: number) {
      const m = new THREE.Mesh(new THREE.ConeGeometry(0.28 * s, 1.1 * s, 5), new THREE.MeshLambertMaterial({ color: 0x9a5cff, emissive: 0x3a1c66 }));
      m.position.set(x, 0.55 * s, z);
      m.castShadow = true;
      scene.add(m);
    }
    [[-8, -3, 1.2], [8, 3, 1.1], [-7, 5, 0.9], [7, -5, 1.0], [-4, -8, 0.8], [5, 8, 1.2]].forEach(([x, z, s]) => crystal(x, z, s));

    // Stars
    const starVerts: number[] = [];
    for (let i = 0; i < 320; i++) {
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      const r = 52 + Math.random() * 10;
      starVerts.push(r * Math.sin(p) * Math.cos(t), r * Math.cos(p), r * Math.sin(p) * Math.sin(t));
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.Float32BufferAttribute(starVerts, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xe6d8ff, size: 0.3 })));

    // Lighting — cool violet
    scene.add(new THREE.AmbientLight(0x443355, 0.8));
    const key = new THREE.DirectionalLight(0xf0eaff, 1.2);
    key.position.set(12, 22, 12);
    key.castShadow = true;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x6a4cff, 0.4);
    fill.position.set(-12, 6, -10);
    scene.add(fill);

    // Orbit
    let isDragging = false, lastX = 0, lastY = 0;
    let theta = 0.7, phi = 0.5, radius = 24;
    let autoRotate = true;
    const target = new THREE.Vector3(0, 3.5, 0);

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
      // orb bob + pulse
      const bob = Math.sin(t * 1.5) * 0.15;
      orb.position.y = platformTop + 6.6 + bob;
      halo.position.y = orb.position.y;
      orbLight.position.y = orb.position.y;
      orbLight.intensity = 2.0 + Math.sin(t * 3) * 0.5;
      (halo.material as THREE.MeshBasicMaterial).opacity = 0.16 + Math.sin(t * 3) * 0.05;
      // orbiting books
      books.forEach((b, i) => {
        const a = t * 0.8 + (i / books.length) * Math.PI * 2;
        b.position.set(Math.cos(a) * 2.0, orb.position.y + Math.sin(a * 1.3) * 0.4, Math.sin(a) * 2.0);
        b.rotation.y = a;
        b.rotation.x = Math.sin(a) * 0.4;
      });
      flames.forEach((f, i) => { f.scale.setScalar(1 + Math.sin(t * 6 + i) * 0.18); });
      brazierLights.forEach((l, i) => { l.intensity = 0.9 + Math.sin(t * 6 + i) * 0.3; });
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
