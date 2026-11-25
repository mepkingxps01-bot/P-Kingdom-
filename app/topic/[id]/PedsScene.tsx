"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Pediatrics & Strabismus kingdom: a playful magenta-and-pink castle with a
// spinning carousel at its heart and bobbing balloons drifting overhead — a
// cheerful, childlike counterpart to the other, more austere kingdoms.
export default function PedsScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x1d0f22);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x1d0f22, 36, 74);

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
    function cone(r: number, h: number, seg: number, color: number, x: number, y: number, z: number, parent?: THREE.Object3D) {
      const m = new THREE.Mesh(new THREE.ConeGeometry(r, h, seg), new THREE.MeshLambertMaterial({ color }));
      m.position.set(x, y, z);
      m.castShadow = true;
      m.receiveShadow = true;
      (parent ?? scene).add(m);
      return m;
    }

    // Ground — soft lilac plateau
    const ground = new THREE.Mesh(new THREE.CylinderGeometry(13, 11, 1.2, 40), new THREE.MeshLambertMaterial({ color: 0x5a3a63 }));
    ground.position.set(0, -0.6, 0);
    ground.receiveShadow = true;
    scene.add(ground);

    // Grassy courtyard (a cheerful pink-tinged green)
    const court = new THREE.Mesh(new THREE.CylinderGeometry(6.2, 6.2, 0.2, 36), new THREE.MeshLambertMaterial({ color: 0x7a5a86 }));
    court.position.set(0, 0.1, 0);
    court.receiveShadow = true;
    scene.add(court);

    const wallColor = 0xc05a9e;
    const wallDark = 0x9a3f7e;
    const roofA = 0xe85aa0; // magenta candy roof
    const roofB = 0xf7a8cf; // light pink

    // Rounded corner towers with candy-stripe conical roofs
    function tower(x: number, z: number) {
      cyl(1.0, 1.15, 4.8, 16, wallColor, x, 2.4, z);
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        box(0.32, 0.55, 0.32, wallDark, x + Math.cos(a) * 1.0, 4.95, z + Math.sin(a) * 1.0);
      }
      // two-tier candy roof
      cone(1.3, 1.3, 16, roofA, x, 5.6, z);
      cone(0.95, 1.1, 16, roofB, x, 6.5, z);
      // round window
      const win = new THREE.Mesh(new THREE.CircleGeometry(0.28, 16), new THREE.MeshBasicMaterial({ color: 0xfff0b8 }));
      win.position.set(x, 3.2, z + 1.03);
      scene.add(win);
    }
    const c = 3.6;
    tower(-c, -c);
    tower(c, -c);
    tower(-c, c);
    tower(c, c);

    // Curtain walls between towers
    function wall(x: number, z: number, len: number, ry: number) {
      box(len, 2.3, 0.6, wallColor, x, 1.35, z, ry);
      const steps = Math.round(len / 0.7);
      for (let i = 0; i <= steps; i += 2) {
        const off = -len / 2 + (i / steps) * len;
        box(0.4, 0.5, 0.6, wallDark, x + Math.cos(ry) * off, 2.75, z - Math.sin(ry) * off, ry);
      }
    }
    wall(0, -c, 2 * c, 0);
    wall(0, c, 2 * c, 0);
    wall(-c, 0, 2 * c, Math.PI / 2);
    wall(c, 0, 2 * c, Math.PI / 2);

    // Gatehouse with a wide, friendly arch
    box(2.2, 2.8, 0.8, wallColor, 0, 1.4, c + 0.1);
    box(1.1, 1.7, 0.2, 0x3a1830, 0, 0.85, c + 0.55);
    box(1.5, 0.15, 2.6, 0xb07a98, 0, 0.2, c + 1.9); // path out of the gate

    // Central CAROUSEL — a rotating merry-go-round as the castle's heart
    const carousel = new THREE.Group();
    carousel.position.set(0, 0, 0);
    scene.add(carousel);
    // base plinth
    cyl(1.9, 2.1, 0.5, 24, wallDark, 0, 0.45, 0);
    cyl(1.7, 1.7, 0.25, 24, 0xf7a8cf, 0, 0.78, 0);
    // center pole
    cyl(0.28, 0.28, 4.2, 12, 0xffe08a, 0, 2.6, 0);
    // striped canopy roof
    const canopy = cone(2.3, 1.6, 12, roofA, 0, 5.1, 0, carousel);
    canopy.position.set(0, 5.1, 0);
    // carousel horses/poles on the rotating group
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const px = Math.cos(a) * 1.45;
      const pz = Math.sin(a) * 1.45;
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.6, 8), new THREE.MeshLambertMaterial({ color: 0xffe08a }));
      pole.position.set(px, 2.0, pz);
      pole.castShadow = true;
      carousel.add(pole);
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.8), new THREE.MeshLambertMaterial({ color: i % 2 ? 0xffd166 : 0x8fd6ff }));
      seat.position.set(px, 1.3, pz);
      seat.rotation.y = -a;
      seat.castShadow = true;
      carousel.add(seat);
    }
    // little flag on the carousel top
    cyl(0.04, 0.04, 0.9, 6, 0x9a3f7e, 0, 6.3, 0);
    const topFlag = box(0.6, 0.35, 0.05, 0xffe08a, 0.32, 6.55, 0);

    // Floating balloons that bob and sway above the castle
    const balloons: { mesh: THREE.Mesh; string: THREE.Mesh; bx: number; bz: number; base: number; phase: number }[] = [];
    const balloonColors = [0xff6ec7, 0xffd166, 0x8fd6ff, 0xa6f0a6, 0xc49bff];
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2;
      const bx = Math.cos(a) * (4.5 + (i % 2));
      const bz = Math.sin(a) * (4.5 + (i % 2));
      const base = 7.5 + (i % 3) * 0.8;
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.55, 16, 16),
        new THREE.MeshBasicMaterial({ color: balloonColors[i % balloonColors.length] })
      );
      mesh.position.set(bx, base, bz);
      mesh.scale.y = 1.25;
      scene.add(mesh);
      const string = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, 1.6, 4),
        new THREE.MeshBasicMaterial({ color: 0xf0c0dd })
      );
      string.position.set(bx, base - 1.1, bz);
      scene.add(string);
      balloons.push({ mesh, string, bx, bz, base, phase: i * 0.9 });
    }

    // Pennant flags on the towers
    [[-c, -c], [c, -c], [-c, c], [c, c]].forEach(([fx, fz], i) => {
      cyl(0.04, 0.04, 1.0, 6, 0x9a3f7e, fx, 7.1, fz);
      box(0.55, 0.32, 0.05, [0xffd166, 0x8fd6ff, 0xa6f0a6, 0xff6ec7][i], fx + 0.3, 7.35, fz);
    });

    // Cheerful lollipop "trees" outside the walls
    function lollipop(x: number, z: number, col: number) {
      cyl(0.08, 0.1, 0.9, 6, 0xffe9c0, x, 0.45, z);
      const top = new THREE.Mesh(new THREE.SphereGeometry(0.55, 14, 14), new THREE.MeshLambertMaterial({ color: col }));
      top.position.set(x, 1.3, z);
      top.castShadow = true;
      scene.add(top);
    }
    [[-9, -3, 0xff6ec7], [9, 3, 0xffd166], [-8, 5, 0x8fd6ff], [8, -5, 0xa6f0a6], [-4, -9, 0xc49bff], [5, 9, 0xff6ec7]].forEach(([x, z, col]) => lollipop(x as number, z as number, col as number));

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
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffe0f2, size: 0.3 })));

    // Lighting — warm, playful dusk
    scene.add(new THREE.AmbientLight(0x6a4a66, 0.85));
    const key = new THREE.DirectionalLight(0xffd6ec, 1.3);
    key.position.set(14, 24, 12);
    key.castShadow = true;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x9a4a8a, 0.4);
    fill.position.set(-12, 6, -10);
    scene.add(fill);
    const glow = new THREE.PointLight(0xff8ad0, 0.8, 20);
    glow.position.set(0, 4, 0);
    scene.add(glow);

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
      carousel.rotation.y += 0.01; // the merry-go-round turns
      topFlag.rotation.y = Math.sin(t * 2) * 0.3;
      balloons.forEach((b, i) => {
        const y = b.base + Math.sin(t * 1.2 + b.phase) * 0.4;
        const sway = Math.sin(t * 0.7 + i) * 0.25;
        b.mesh.position.set(b.bx + sway, y, b.bz);
        b.string.position.set(b.bx + sway, y - 1.1, b.bz);
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
