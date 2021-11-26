import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useState } from "react";

const loader = new GLTFLoader();
const [scene] = useState(new THREE.Scene());

const LoadGLTFModel = () => {
  console.log("loaddog");

  // loader.load(
  //   "../public/dog.glb",
  //   function (gltf) {
  //     scene.add(gltf.scene);
  //   },
  //   undefined,
  //   function (error) {
  //     console.error(error);
  //   }
  // );
};

export default LoadGLTFModel;
