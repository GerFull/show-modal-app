import { OrbitControls } from "@react-three/drei";

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <mesh>
        <meshNormalMaterial />
        <boxGeometry args={[1,1,1]} />
      </mesh>
    </>
  );
};
