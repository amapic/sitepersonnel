import React from 'react'
import { useRef, useMemo, useEffect, useState } from "react";
import { debounce } from "lodash";

// 3D
import * as THREE from "three";
import { PointLightHelper } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useHelper, Html } from "@react-three/drei";
import CustomShaderMaterial from "three-custom-shader-material";
import vertexShader from "../app/shaders/vertexbulk.glsl";
import fragmentShader from "../app/shaders/fragmentbulk.glsl";
import html2canvas from "html2canvas";
import { Canvas } from '@react-three/fiber'
export default function MonComposant() {
  return (
    <div id="canvas-container2" className="w-full h-[110vh] bg-red-500 z-10">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
        }}
        camera={{
          fov: 55,
          near: 0.1,
          far: 200,
        }}
      >
        <Scene />
      </Canvas>
      <div className="relative w-full h-[0vh]">
						<div class="z-[1000] pb-4 flex flex-row items-center justify-center absolute h-[40vh] -top-[21vh] left-0 w-full h-full ">
							<span class="text-4xl w-full h-full text-center">
              Développement web <br />
              Hébergement <br />
              Animation 3D <br />
              Suivi et maintenance

              </span>
							{/* <span class="text-4xl w-full h-full text-center border-x-2 border-white">M</span> */}
							<span class="text-4xl w-full h-full text-center">

                06 88 91 80 19 <br />
                Lyon 6 <br />
                amaury.pichat@gmail.com <br />
                mentions-legales <br />
                politique de confidentialité

              </span>
							
						</div>
					</div>
    </div>
  )
}



const useDomToCanvas = (domEl) => {
  const [texture, setTexture] = useState();
  useEffect(() => {
    if (!domEl) return;
    const convertDomToCanvas = async () => {
      const canvas = await html2canvas(domEl, { backgroundColor: null });
      setTexture(new THREE.CanvasTexture(canvas));
    };

    convertDomToCanvas();

    const debouncedResize = debounce(() => {
      convertDomToCanvas();
    }, 100);

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [domEl]);

  return texture;
};

function Lights() {
  const pointLightRef = useRef();

  useHelper(pointLightRef, PointLightHelper, 0.7, "cyan");

  const config = {
    color: "#ffffff",
    intensity: 30,
    distance: 12,
    decay: 1,
    position: [2, 4, 6]
  };
  return <pointLight ref={pointLightRef} {...config} />;
}

function Scene() {
  const state = useThree();
  const { width, height } = state.viewport;
  const [domEl, setDomEl] = useState(null);
  const [containerRatio, setContainerRatio] = useState(1);

  useEffect(() => {
    const container = document.getElementById('canvas-container2');
    if (container) {
      const updateRatio = () => {
        const ratio = container.clientWidth / container.clientHeight;
        setContainerRatio(ratio);
      };
      
      updateRatio();
      window.addEventListener('resize', updateRatio);
      return () => window.removeEventListener('resize', updateRatio);
    }
  }, []);

  const materialRef = useRef();
  const textureDOM = useDomToCanvas(domEl);

  const uniforms = useMemo(
    
    () => ({
      uTexture: { value: textureDOM },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uRatio: { value: containerRatio },
    }),
    [textureDOM, containerRatio]
  );

  const mouseLerped = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const mouse = state.mouse;
    console.log(mouse)
    mouseLerped.current.x = THREE.MathUtils.lerp(mouseLerped.current.x, mouse.x, 0.1);
    mouseLerped.current.y = THREE.MathUtils.lerp(mouseLerped.current.y, mouse.y, 0.1);
    materialRef.current.uniforms.uMouse.value.x = mouseLerped.current.x;
    materialRef.current.uniforms.uMouse.value.y = mouseLerped.current.y;
  });

  return (
    <>
      <Html zIndexRange={[-1, -10]} prepend fullscreen>
        <div ref={(el) => setDomEl(el)} className="dom-element">
          <p  className=" pb-12 flex flex-col">
          <span className="text-4xl pb-24"></span> 
            QUAND <br />
            M'APPELLEZ <br />
            VOUS ? <br />
            {/* MEET ?<br /> */}
          </p>
        </div>
      </Html>
      <mesh>
        <planeGeometry args={[width, height, 254, 254]} />
        <CustomShaderMaterial
          ref={materialRef}
          baseMaterial={THREE.MeshStandardMaterial}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          flatShading
          silent
        />
        <Lights />
      </mesh>
    </>
  );
}
