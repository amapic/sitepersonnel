import React from 'react'
import { useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
export function MonComposant() {
  return (
    <div className="w-full h-screen bg-red-500">
      {/* <Scene /> */}
    </div>
  )
}

function Scene() {
    const { viewport } = useThree();
  
    return (
      <>
        <Html zIndexRange={[-1, -10]} prepend fullscreen>
           <div className="dom-element">
              WHEN <br />
              WILL <br />
              WE <br />
              MEET ?<br />
          </div>
        </Html>
        <mesh>
          <planeGeometry args={[viewport.width, viewport.height, 254, 254]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </>
    );
  }