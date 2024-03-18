import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { OrbitControls, Stage, useProgress, Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Suspense, useEffect, useState } from "react";
import style from '../App.module.scss'
import { useParams } from "react-router-dom";
import { LoadingManager } from "three";


// const Model = ({ x, y, z }) => {
//   const gltf = useLoader(OBJLoader, "./rc10.obj");

//   console.log(gltf)

//   return (
//     <>
//       <primitive castShadow scale={[x, y, z]} object={gltf} position={[0, 0, 0]} />
//     </>
//   );
// };





const models = [
  {
    depth: 500,
    height: 750,
    id: 2,
    modelFile: '../models/RT3_Mod.glb',
    title: "ящики",
    width: 1000,
    article: "201057"
  },
  {
    depth: 680,
    height: 750,
    id: 1,
    modelFile: '../models/РС10_tex.glb',
    title: "стол Р.С-10",
    width: 1000,
    article: "201511"
  }
]






function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress()
  return <Html fullscreen  ><div className={style.text_loading}>Loading</div></Html>
}




const Model = ({ x, y, z, path }) => {
  const gltf = useLoader(GLTFLoader, path);



  return (
    <>
      <primitive castShadow scale={[x, y, z]} object={gltf.scene} position={[0, 0, 0]} />
    </>
  );
};

const ModelTest = ({ x, y, z, path }) => {
  const gltf = useLoader(GLTFLoader, '../models/РС10_tex.glb');

  return (
    <>
      <primitive castShadow scale={[x, y, z]} object={gltf.scene} position={[0, 0, 0]} />
    </>
  );
};


export default function ModelPage() {

  const { article } = useParams()

  const [sizeX, setSizeX] = useState(1)
  const [sizeXView, setSizeXView] = useState(0)
  const [sizeXViewXcopy, setSizeXViewXcopy] = useState(0)

  const [sizeY, setSizeY] = useState(1)
  const [sizeYView, setSizeYView] = useState(0)
  const [sizeYViewXcopy, setSizeYViewXcopy] = useState(0)


  const [sizeZ, setSizeZ] = useState(1)
  const [sizeZView, setSizeZView] = useState(0)
  const [sizeZViewXcopy, setSizeZViewXcopy] = useState(0)
  const [path, setPath] = useState('')

  const [count, setCount] = useState(0)


  useEffect(() => {

    const item = models.find(item => item.article == article)

    if (item !== undefined) {
      setPath(item.modelFile)
      setSizeXView(item.width)
      setSizeXViewXcopy(item.width)

      setSizeYView(item.height)
      setSizeYViewXcopy(item.height)

      setSizeZView(item.depth)
      setSizeZViewXcopy(item.depth)

    }

    // await fetch(`http://127.0.0.1:8000/api/objModel/${article}`).then(res => res.json()).then(res => {
    // console.log(res)
    //   setPath(res.modelFile)
    //   setSizeXView(res.width)
    //   setSizeXViewXcopy(res.width)

    //   setSizeYView(res.height)
    //   setSizeYViewXcopy(res.height)

    //   setSizeZView(res.depth)
    //   setSizeZViewXcopy(res.depth)
    // })
    
  }, [])



  const changeX = (value) => {
    const procnet = (value - sizeXViewXcopy) / sizeXViewXcopy * 100
    setSizeX(sizeX + (sizeX * (procnet / 100)))
    setSizeXViewXcopy(value)
  }

  const changeY = (value) => {
    const procnet = (value - sizeYViewXcopy) / sizeYViewXcopy * 100
    setSizeY(sizeY + (sizeY * (procnet / 100)))
    setSizeYViewXcopy(value)
  }

  const changeZ = (value) => {
    const procnet = (value - sizeZViewXcopy) / sizeZViewXcopy * 100
    setSizeZ(sizeZ + (sizeZ * (procnet / 100)))
    setSizeZViewXcopy(value)
  }


  const submit = async () => {

    // fetch('http://188.234.251.210:8000/API/REST/Authorization/LoginWith?username=Герман Петр', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json; charset=utf-8',
    //   },
    //   body:'',
    //   mode:'no-cors'

    // }).then(res=>console.log(res))




  }

  return (
    <>
      {
        path !== '' ?
          <div className={style.home}>
            <div className={style.inputs_controls}>
              <div className={style.inputs_controls_item}>
                <p>Ширина</p>
                <input step={10} type="number" value={sizeXView} onBlur={(e) => changeX(e.target.value)} onChange={(e) => setSizeXView(e.target.value)} />
              </div>
              <div className={style.inputs_controls_item}>
                <p>Высота </p>
                <input step={10} type="number" value={sizeYView} onBlur={(e) => changeY(e.target.value)} onChange={(e) => setSizeYView(e.target.value)} />
              </div>
              <div className={style.inputs_controls_item}>
                <p>Глубина</p>
                <input step={10} type="number" value={sizeZView} onBlur={(e) => changeZ(e.target.value)} onChange={(e) => setSizeZView(e.target.value)} />
              </div>
              <div className={style.inputs_controls_item}>
                <p>Количество</p>
                <input step={1} type="number" value={count} onChange={(e) => setCount(e.target.value)} />
              </div>
              <button onClick={submit}>Рассчитать</button>
              <div>Цена:0</div>

            </div>
            <Canvas shadows camera={{ fov: 80, position: [4, 3, 5] }}>

              <Suspense fallback={<Loader />}>
                <directionalLight color="white" position={[-5, 10, -5]} intensity={1} />
                <directionalLight color="white" position={[0, 0, 10]} intensity={1} />
                <Stage adjustCamera={1.6}>
                 <Model x={sizeX} y={sizeY} z={sizeZ} path={path} />
                  {/* <ModelTest x={sizeX} y={sizeY} z={sizeZ} /> */}
                </Stage>
                <OrbitControls makeDefault
                  autoRotate
                  autoRotateSpeed={0.8}
                  minPolarAngle={0}
                  maxPolarAngle={Math.PI / 2} />
              </Suspense>
              {/* <axesHelper args={[1000]}/> */}
            </Canvas>

          </div>
          :
          <div>Для данного товара нет модели </div>
      }


    </>



  );
}
