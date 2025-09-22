import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

export function SimpleScene({ onHint }: { onHint?: () => void }) {
  return (
    <Canvas camera={{ position: [3, 3, 5], fov: 60 }}>
      <color attach="background" args={["#eef4ff"]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <gridHelper
        args={[10, 10, new THREE.Color("#93c5fd"), new THREE.Color("#bfdbfe")]}
      />
      <InteractiveObjects onHint={onHint} />
      <OrbitControls enablePan={false} />
    </Canvas>
  );
}

function InteractiveObjects({ onHint }: { onHint?: () => void }) {
  const cube = useRef<THREE.Mesh>(null!);
  const sphere = useRef<THREE.Mesh>(null!);
  const [color, setColor] = useState("#60a5fa");

  return (
    <group>
      <mesh
        ref={cube}
        position={[-1.2, 1, 0]}
        onPointerOver={() => setColor("#34d399")}
        onPointerOut={() => setColor("#60a5fa")}
        onClick={() => onHint?.()}
      >
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh ref={sphere} position={[1.6, 1, 0]} onClick={() => onHint?.()}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#22d3ee" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
    </group>
  );
}
