"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js";

export default function GlitchOverlay({ active }: { active: boolean }) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!active || !mountRef.current) return;

    // FULL SCREEN CANVAS
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.pointerEvents = "none"; // 🔥 проходять кліки
    renderer.domElement.style.zIndex = "999999";

    mountRef.current.appendChild(renderer.domElement);

    // Required scene & camera
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    camera.position.z = 1;

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const glitchPass = new GlitchPass();
    glitchPass.goWild = true;        // максимальний гліч

    composer.addPass(glitchPass);

    let alive = true;

    function animate() {
      if (!alive) return;
      composer.render();
      requestAnimationFrame(animate);
    }

    animate();

    // remove after timeout
    const timeout = setTimeout(() => {
      alive = false;
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    }, 1200);

    return () => {
      alive = false;
      clearTimeout(timeout);
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [active]);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 999999,
      }}
    />
  );
}
