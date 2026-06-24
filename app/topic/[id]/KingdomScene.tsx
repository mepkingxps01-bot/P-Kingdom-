"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function KingdomScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x0d0d1a);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0d0d1a, 35, 65);

    const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 200);

    function resize() {
      const w = canvas.parentElement?.clientWidth ?? 600;
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

    // Ground
    const ground = new THREE.Mesh(new THREE.CylinderGeometry(12, 10, 1.2, 32), new THREE.MeshLambertMaterial({ color: 0x2d5a1a }));
    ground.position.set(0, -0.6, 0);
    ground.receiveShadow = true;
    scene.add(ground);

    const dirt = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, 0.1, 24), new THREE.MeshLambertMaterial({ color: 0x7a5c32 }));
    dirt.position.set(0, 0.05, 0);
    dirt.receiveShadow = true;
    scene.add(dirt);

    // Hut
    box(3.5, 2.5, 3.5, 0xb5834a, 0, 1.35, 0);
    box(0.8, 1.4, 0.1, 0x6b3d1a, 0, 0.8, 1.76);
    box(0.7, 0.6, 0.1, 0x8ab4d4, -1.1, 1.5, 1.76);
    box(4.2, 0.5, 4.2, 0x8b7040, 0, 2.85, 0);
    box(3.4, 0.5, 3.4, 0x7a6035, 0, 3.2, 0);
    box(2.5, 0.5, 2.5, 0x6a5028, 0, 3.5, 0);
    box(1.5, 0.5, 1.5, 0x5a4020, 0, 3.75, 0);
    cone(0.4, 0.8, 8, 0x4a3018, 0, 4.3, 0);
    box(0.5, 1.5, 0.5, 0x8a7a6a, 0.9, 3.5, -0.9);

    // Smoke
    const smokePuffs: THREE.Mesh[] = [];
    const smokeDefs = [
      { y: 4.6, opacity: 0.5, size: 0.25 },
      { y: 5.1, opacity: 0.35, size: 0.35 },
      { y: 5.6, opacity: 0.2, size: 0.45 },
    ];
    smokeDefs.forEach((s) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(s.size, 8, 8),
        new THREE.MeshLambertMaterial({ color: 0xcccccc, transparent: true, opacity: s.opacity })
      );
      mesh.position.set(0.9, s.y, -0.9);
      scene.add(mesh);
      smokePuffs.push(mesh);
    });

    // Fence
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      const r = 5.5;
      cyl(0.07, 0.09, 1.2, 6, 0x8b6040, Math.cos(angle) * r, 0.6, Math.sin(angle) * r);
    }

    // Trees
    function smallTree(x: number, z: number) {
      cyl(0.1, 0.14, 1.0, 6, 0x6b4226, x, 0.5, z);
      cone(0.7, 1.8, 7, 0x1e6b1e, x, 1.9, z);
      cone(0.5, 1.4, 7, 0x2a8a2a, x, 2.6, z);
    }
    [[-7, -4], [-8, 2], [6, -6], [7, 4], [-5, 7], [4, 7]].forEach(([x, z]) => smallTree(x, z));

    // Well
    cyl(0.8, 0.8, 0.6, 12, 0x9a8a7a, -3.5, 0.3, 2.5);
    cyl(0.65, 0.65, 0.6, 12, 0x4a3a2a, -3.5, 0.3, 2.5);

    // Garden
    const garden = new THREE.Mesh(new THREE.BoxGeometry(2, 0.1, 1.2), new THREE.MeshLambertMaterial({ color: 0x5a3a18 }));
    garden.position.set(3, 0.05, 2.5);
    scene.add(garden);
    for (let gx = -0.6; gx <= 0.6; gx += 0.4) {
      cone(0.12, 0.4, 6, 0x22aa22, 3 + gx, 0.4, 2.5);
    }

    // Fire
    cyl(0.5, 0.6, 0.15, 12, 0x6a5a4a, 2.5, 0.07, -2);
    const fire = new THREE.PointLight(0xff7720, 1.5, 5);
    fire.position.set(2.5, 1, -2);
    scene.add(fire);

    // Stars
    const starVerts: number[] = [];
    for (let i = 0; i < 300; i++) {
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      const r = 50 + Math.random() * 10;
      starVerts.push(r * Math.sin(p) * Math.cos(t), r * Math.cos(p), r * Math.sin(p) * Math.sin(t));
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.Float32BufferAttribute(starVerts, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.3 })));

    // Lighting
    scene.add(new THREE.AmbientLight(0x334466, 0.7));
    const sun = new THREE.DirectionalLight(0xfff4cc, 1.4);
    sun.position.set(15, 25, 10);
    sun.castShadow = true;
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0x4466aa, 0.4);
    fill.position.set(-10, 5, -10);
    scene.add(fill);

    // Orbit
    let isDragging = false, lastX = 0, lastY = 0;
    let theta = 0.7, phi = 0.5, radius = 22;
    let autoRotate = true;
    const target = new THREE.Vector3(0, 2, 0);

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
      radius = Math.max(8, Math.min(40, radius + e.deltaY * 0.05));
      updateCamera();
      e.preventDefault();
    }, { passive: false });

    let t = 0;
    let animId: number;
    function animate() {
      animId = requestAnimationFrame(animate);
      t += 0.02;
      if (autoRotate) { theta += 0.004; updateCamera(); }
      fire.intensity = 1.2 + Math.sin(t * 4.3) * 0.4;
      smokePuffs.forEach((s, i) => {
        s.position.y += 0.002;
        (s.material as THREE.MeshLambertMaterial).opacity -= 0.0003;
        if ((s.material as THREE.MeshLambertMaterial).opacity < 0.03) {
          s.position.y = smokeDefs[i].y;
          (s.material as THREE.MeshLambertMaterial).opacity = smokeDefs[i].opacity;
        }
      });
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
