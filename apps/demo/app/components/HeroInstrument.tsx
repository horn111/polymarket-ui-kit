"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const sceneDuration = 1800;

function easeOutQuint(value: number): number {
  return 1 - Math.pow(1 - value, 5);
}

export function HeroInstrument() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;

    if (!host || !canvas) {
      return;
    }

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(0, 0.2, 8.4);

    const root = new THREE.Group();
    root.rotation.set(-0.18, -0.42, -0.04);
    scene.add(root);

    const graphite = new THREE.MeshStandardMaterial({
      color: 0x24232b,
      metalness: 0.84,
      roughness: 0.28,
    });
    const ceramic = new THREE.MeshPhysicalMaterial({
      clearcoat: 0.25,
      color: 0xece9e1,
      metalness: 0.04,
      roughness: 0.3,
    });
    const copper = new THREE.MeshStandardMaterial({
      color: 0xd28457,
      emissive: 0x2a0f05,
      metalness: 0.72,
      roughness: 0.24,
    });

    const backPlate = new THREE.Mesh(new THREE.BoxGeometry(3.25, 3.75, 0.72), graphite);
    backPlate.position.set(-0.48, 0.02, 0);
    root.add(backPlate);

    const ceramicPlate = new THREE.Mesh(
      new THREE.BoxGeometry(2.65, 2.75, 0.42),
      ceramic,
    );
    ceramicPlate.position.set(0.82, -0.03, 0.58);
    root.add(ceramicPlate);

    const rail = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.095, 0.1), copper);
    rail.position.set(0.28, 0.58, 0.88);
    root.add(rail);

    const aperture = new THREE.Mesh(
      new THREE.TorusGeometry(0.58, 0.055, 16, 72),
      copper,
    );
    aperture.position.set(0.9, -0.18, 0.83);
    root.add(aperture);

    const dial = new THREE.Mesh(
      new THREE.CylinderGeometry(0.33, 0.33, 0.14, 48),
      graphite,
    );
    dial.rotation.x = Math.PI / 2;
    dial.position.set(0.9, -0.18, 0.87);
    root.add(dial);

    const keyLight = new THREE.DirectionalLight(0xffeadc, 3.2);
    keyLight.position.set(3, 5, 7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x7bd6c4, 0.75);
    fillLight.position.set(-5, -1, 4);
    scene.add(fillLight);
    scene.add(new THREE.AmbientLight(0xbab4ad, 0.65));

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let visible = true;
    let startTime = performance.now();
    let completed = reducedMotion;

    function resize() {
      const width = Math.max(host?.clientWidth ?? 1, 1);
      const height = Math.max(host?.clientHeight ?? 1, 1);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    function setFinalPose() {
      root.rotation.y = -0.16;
      ceramicPlate.position.x = 0.72;
      rail.scale.x = 1;
      aperture.rotation.z = Math.PI * 0.14;
    }

    function render(now: number) {
      if (!visible) {
        frame = 0;
        return;
      }

      const progress = Math.min(1, (now - startTime) / sceneDuration);
      const eased = easeOutQuint(progress);
      root.rotation.y = THREE.MathUtils.lerp(-0.56, -0.16, eased);
      ceramicPlate.position.x = THREE.MathUtils.lerp(1.42, 0.72, eased);
      rail.scale.x = THREE.MathUtils.lerp(0.08, 1, eased);
      aperture.rotation.z = eased * Math.PI * 0.14;
      renderer.render(scene, camera);

      if (progress < 1) {
        frame = window.requestAnimationFrame(render);
      } else {
        completed = true;
      }
    }

    resize();
    if (reducedMotion) {
      setFinalPose();
      renderer.render(scene, camera);
    } else {
      frame = window.requestAnimationFrame(render);
    }
    setReady(true);

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      if (visible && !reducedMotion && !completed) {
        startTime = performance.now();
        window.cancelAnimationFrame(frame);
        frame = window.requestAnimationFrame(render);
      }
    });
    observer.observe(host);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      renderer.render(scene, camera);
    });
    resizeObserver.observe(host);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      window.cancelAnimationFrame(frame);
      backPlate.geometry.dispose();
      ceramicPlate.geometry.dispose();
      rail.geometry.dispose();
      aperture.geometry.dispose();
      dial.geometry.dispose();
      graphite.dispose();
      ceramic.dispose();
      copper.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="civic-instrument"
      data-ready={ready ? "true" : undefined}
      ref={hostRef}
    >
      <div className="civic-instrument__poster">
        <span />
        <i />
        <b />
      </div>
      <canvas ref={canvasRef} />
      <div className="civic-instrument__readout">
        <span>CAL / 01</span>
        <strong>42.0</strong>
      </div>
    </div>
  );
}
