import React from "react";
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
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);

export default function MonComposant() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    const text = new SplitText(document.getElementById("contact_tel"), {
      type: "chars",
      charsClass: "char",
    });

    const tl = gsap.timeline({repeat: -1});
  
    tl.to(text.chars, {
      scale: 2,
      opacity: 0,
      duration: 2,
      ease: "power4.out",
    });

    
    const text2 = new SplitText(document.getElementById("contact_mail"), {
      type: "chars",
      charsClass: "char",
    });

    const tl2 = gsap.timeline({repeat: -1});
  
    tl2.to(text2.chars, {
      scale: 2,
      opacity: 0,
      duration: 2,
      ease: "power4.out",
    });

    // tl.from(text.chars, {
    return () => window.removeEventListener("resize", handleResize);

  }, []);

  return (
    <>
      <div id="canvas-container2" className="w-full h-[110vh] z-10">
        {isMobile ? (
          <div className="w-full h-[110vh] z-10 bg-gray-500">
            <div className="dom-element">
              <p className="flex flex-col pt-0">
                <br />
                <br />
                QUAND <br />
                M'APPELEZ <br />
                VOUS ? <br />
              </p>
            </div>
          </div>
        ) : (
          <Canvas
            dpr={[1, 2]}
            gl={{
              antialias: true,
              preserveDrawingBuffer: false,
            }}
            // orthographic
            camera={{
              fov: 55,
              near: 0.1,
              far: 200,
            }}
          >
            <Scene />
          </Canvas>
        )}

        <div className="relative w-full h-[0vh] pointer-events-none">
          {/* grande taille */}
          <div className="z-[1000] pb-4 flex flex-col md:flex-row items-center justify-center absolute h-[10vh] -top-[11vh] left-0 right-0 w-full h-full ">
            <div className="relative w-full flex justify-center items-center" style={{ minHeight: "2.5em" }}>
              {/* Texte animé (SplitText/GSAP) */}
              <span
                id="contact_tel"
                className="absolute left-0 right-0 w-full text-center pointer-events-auto text-2xl xl:text-4xl"
                style={{ top: 0 }}
              >
                <a name="contact telephonique" href="tel:+33688918019">06 88 91 80 19</a>
              </span>
              {/* Texte statique, toujours visible */}
              <span
                className="absolute left-0 right-0 w-full text-center pointer-events-none text-2xl xl:text-4xl"
                style={{ top: 0 }}
                aria-hidden="true"
              >
                <a name="contact telephone" href="tel:+33688918019" style={{ color: "inherit", textDecoration: "inherit" }}>
                  06 88 91 80 19
                </a>
                {/* <a 
                  name="contact_tel" 
                  href="tel:+33688918019" 
                  style={{ 
                    color: "inherit", 
                    textDecoration: "inherit",
                    pointerEvents: "auto"
                  }}
                ></a> */}
              </span>
            </div>
            <span className="w-full text-center">Lyon 6 </span>
            <div className="relative w-full flex justify-center items-center" style={{ minHeight: "2.5em" }}>
              {/* Texte animé (SplitText/GSAP) */}
              <span
                id="contact_mail"
                className="absolute left-0 right-0 w-full text-center pointer-events-auto text-4xl"
                style={{ top: 0 }}
              >
                <a 
                  href="mailto:amaurypichat@gmail.com"
                  aria-label="Envoyez-nous un email à amaury.pichat@gmail.com"
                  className="text-center pointer-events-auto text-2xl xl:text-4xl"
                  style={{ display: 'inline-block' }}
                >
                  amaury.pichat@gmail.com
                </a>
              </span>
              {/* Texte statique, toujours visible */}
              <span
                className="absolute left-0 right-0 w-full text-center pointer-events-none text-4xl"
                style={{ top: 0 }}
                aria-hidden="true"
              >
                <a 
                  href="mailto:amaurypichat@gmail.com"
                  aria-label="Envoyez-nous un email à amaury.pichat@gmail.com"
                  className="text-center pointer-events-auto text-2xl xl:text-4xl"
                  style={{ display: 'inline-block' }}
                >
                  amaury.pichat@gmail.com
                </a>
              </span>
            </div>
            <span className="w-full text-center pointer-events-auto">
              <span className="pointer-events-auto border-b-2 border-dotted border-current inline-block leading-none cursor-pointer">
                <a href="/mentions-legales.html" target="_blank" rel="noopener noreferrer pointer-events-auto">
                  mentions-legales
                </a>
                </span>
            </span>
            <span className="pointer-events-auto w-full text-center">
              <span className="pointer-events-auto border-b-2 border-dotted border-current inline-block leading-none cursor-pointer">
              <a href="/mentions-legales.html" target="_blank" rel="noopener noreferrer pointer-events-auto">
                  politique de confidentialité
                  </a>
                  </span>
            </span>
          </div>

          <div className="absolute -top-[50vh] xl:-top-[75vh] right-0  h-[25vh] z-[1000] flex flex-col items-center justify-left pr-8">
            <span className="text-4xl w-full h-full text-center z-[1000] text-right">
              Développement web
            </span>
            <span className="text-4xl w-full h-full text-center z-[1000] text-right">
              Prise de photo et intégration
            </span>
            <span className="text-4xl w-full h-full text-center z-[1000] text-right">
              Animation 3D
            </span>
            <span className="text-4xl w-full h-full text-center z-[1000] text-right">
              Suivi et maintenance
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

const useDomToCanvas = (domEl) => {
  const [texture, setTexture] = useState();
  useEffect(() => {
    if (!domEl) return;
    const convertDomToCanvas = async () => {
      const canvas = await html2canvas(domEl, { backgroundColor: null,scale: 4 });
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
    position: [2, 4, 6],
  };
  return <pointLight ref={pointLightRef} {...config} />;
}

function Scene() {
  const state = useThree();
  const { width, height } = state.viewport;
  const [domEl, setDomEl] = useState(null);
  const [containerRatio, setContainerRatio] = useState(1);

  const cursor = document.querySelector('.custom-cursor');
    const contactTel = document.querySelector('#contact_tel');
    const contactMail = document.querySelector('#contact_mail');

  useEffect(() => {
    const container = document.getElementById("canvas-container2");
    if (container) {
      const updateRatio = () => {
        const ratio = container.clientWidth / container.clientHeight;
        setContainerRatio(ratio);
      };

      updateRatio();
      window.addEventListener("resize", updateRatio);
      return () => window.removeEventListener("resize", updateRatio);
    }
  }, []);

  const materialRef = useRef();
  const textureDOM = useDomToCanvas(domEl);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: textureDOM },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uRatio: { value: containerRatio },
      uDistance: { value: 1000 },
    }),
    [textureDOM, containerRatio]
  );

  const mouseLerped = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const mouse = state.mouse;
    mouseLerped.current.x = THREE.MathUtils.lerp(
      mouseLerped.current.x,
      mouse.x,
      0.1
    );
    mouseLerped.current.y = THREE.MathUtils.lerp(
      mouseLerped.current.y,
      mouse.y,
      0.1
    );
    materialRef.current.uniforms.uMouse.value.x = mouseLerped.current.x;
    materialRef.current.uniforms.uMouse.value.y = mouseLerped.current.y;


    
  });

  return (
    <>
      <Html zIndexRange={[-1, -10]} prepend fullscreen>
        <div ref={(el) => setDomEl(el)} className="dom-element">
          <p className="pb-12 flex flex-col">
            {/* <div className="xl:text-4xl text-4xl pb-24"></div> */}
            QUAND <br />
            M'APPELEZ <br />
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
          // silent
        />
        <Lights />
      </mesh>
    </>
  );
}
