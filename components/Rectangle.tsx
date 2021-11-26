import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { RectangleContainer } from "./RectangleLoader";
// import aef from '../public/images/texture1'

const Rectangle = () => {
  const refContainer = useRef<HTMLDivElement>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer>();
  const [scene] = useState(new THREE.Scene());
  const [_camera, setCamera] = useState<THREE.PerspectiveCamera>();

  // const handleWindowResize = useCallback(() => {
  //   const container = refContainer;
  //   if (container.current === undefined) {
  //     console.log("handleWindowResize undefined");

  //     return null;
  //   }
  //   if (container.current && renderer) {
  //     const scW = container.current.clientWidth;
  //     const scH = container.current.clientHeight;
  //     renderer.setSize(scW, scH);
  //   }
  // }, []);

  useEffect(() => {
    const { current: container } = refContainer;
    if (container && !renderer) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;

      const textureLoader = new THREE.TextureLoader();
      const normalTexture = textureLoader.load("../public/images/texture1");
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(scW, scH);
      renderer.outputEncoding = THREE.sRGBEncoding;
      container.appendChild(renderer.domElement);
      setRenderer(renderer);

      //camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 10;

      //Objects
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      // const sphereGeometry = new THREE.SphereBufferGeometry(1, 64, 64);
      //Materials
      const material = new THREE.MeshBasicMaterial({ color: 319795 });
      const StandardMaterial = new THREE.MeshStandardMaterial();
      StandardMaterial.metalness = 0.7;
      StandardMaterial.roughness = 0.2;
      StandardMaterial.color = new THREE.Color(319795);
      StandardMaterial.normalMap = normalTexture;

      const cube = new THREE.Mesh(geometry, material);

      //scene
      // scene.background = new THREE.Color(0xf0f0f0);
      scene.add(cube);

      setCamera(camera);

      let req: number = 0;
      const animate = () => {
        req = requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        console.log("unmount");
        cancelAnimationFrame(req);
        renderer.dispose();
      };
    }
  }, []);

  return <RectangleContainer ref={refContainer}></RectangleContainer>;
};

export default Rectangle;
