/* eslint-disable react/no-unknown-property */
import React from "react";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import { useSelector } from "react-redux";

export default function Model(props) {
  const model = useSelector((state) => state.runnerConfig.model);
  const { nodes } = useGLTF(model);
  return (
    <group {...props} dispose={null}>
      <PerspectiveCamera
        makeDefault={false}
        far={1000.01}
        near={0.01}
        fov={30}
        position={[0, 0, 1]}
      />
      <mesh
        geometry={nodes.mesh0.geometry}
        material={nodes.mesh0.material}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
      />
    </group>
  );
}
