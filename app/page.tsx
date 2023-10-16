'use client'

import dynamic from 'next/dynamic'
import { Suspense, useRef } from 'react'
import Image from 'next/image'

import { useFrame, useLoader } from '@react-three/fiber'
import { Environment, GradientTexture, GradientType } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three'

import localFont from 'next/font/local'

const Mars = () => {
	const mars_diffuse = useLoader(TextureLoader, '/mars_diffuse.jpg');
	const mars_bump = useLoader(TextureLoader, '/bump.jpg');


	const mars = useRef(null);
	useFrame((state, delta) => {
		mars.current.rotation.y -= delta * .05;
		mars.current.rotation.x += delta * .02;
	});
	return (
		<mesh scale={3.5} position={[0, -1.8, 0]} ref={mars}>
			{/* Width and height segments for displacementMap */}
			<sphereGeometry args={[1, 100, 100]} />
			<meshStandardMaterial
				bumpScale={0.015}
				map={mars_diffuse}
				bumpMap={mars_bump}
			/>
		</mesh>
	);
}
const Mars2 = () => {
	const mars_diffuse = useLoader(TextureLoader, '/mars_diffuse.jpg');
	const mars_bump = useLoader(TextureLoader, '/bump.jpg');


	const mars = useRef(null);
	useFrame((state, delta) => {
		mars.current.rotation.y -= delta * .05;
		mars.current.rotation.x += delta * .02;
	});
	return (
		<mesh scale={3.5} position={[-1.5, 0, 0]} ref={mars}>
			{/* Width and height segments for displacementMap */}
			<sphereGeometry args={[1, 100, 100]} />
			<meshStandardMaterial
				bumpScale={0.015}
				map={mars_diffuse}
				bumpMap={mars_bump}
			/>
		</mesh>
	);
}

const Sun = () => {
	const sun = useRef(null);
	useFrame((state, delta) => {
		// sun.current.position.z += delta * 10 * Math.sin(delta * 10);
	});
	return (
		<Suspense fallback={null}>
			<ambientLight intensity={0.5} color={new THREE.Color('#231058')} />
			<pointLight position={[100, 300, -400]} intensity={2.5} color={new THREE.Color("#FEB46C")} />
			<pointLight ref={sun} position={[50, 300, -220]} intensity={.95} color={new THREE.Color("#FFBDBD")} />
		</Suspense>
	);
}
const Sun2 = () => {
	const sun = useRef(null);
	useFrame((state, delta) => {
		// sun.current.position.z += delta * 10 * Math.sin(delta * 10);
	});
	return (
		<Suspense fallback={null}>
			<ambientLight intensity={0.1} color={new THREE.Color('#231058')} />
			<pointLight ref={sun} position={[100, 0, 0]} intensity={.35} color={new THREE.Color("#FFBDBD")} />
		</Suspense>
	);
}

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
	ssr: false,
	loading: () => (
		<div className='flex h-96 w-full flex-col items-center justify-center'>
			<svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
				<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
				<path
					className='opacity-75'
					fill='currentColor'
					d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
				/>
			</svg>
		</div>
	),
})

const myFont = localFont({ src: '../public/Akira.otf' })

export default function Page() {
	// const sky = useLoader(TextureLoader, '/stars_e.jpg');

	return (
		<>
			<div className="z-[0] sky-background w-full h-full absolute bg-[url('/stars_e.jpg')] bg-cover overflow-hidden">
			</div>
			<div className="3d-background w-full h-full absolute  overflow-hidden">
				<View className='relative sm:h-full sm:w-full'>
					<Sun />
					<Mars />
				</View>
			</div>
			<div className="z-10 sky-background w-full h-full absolute bg-[url('/stars_overlay.png')] bg-cover">
			</div>
			<main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
				<nav className='z-10  flex justify-between items-center w-[1200px] h-[120px] absolute'>
					<div className="branding">
						<Image src="/img/logo.png" width={152} height={32} alt="" />
					</div>

					<div className="navigation flex p-5 items-center">
						<div className="flex flex-row pr-5 mr-5  items-center h-[60px] border-neutral-300 border-r-[2px] border-opacity-50 ">
							<div className="link px-5">Home</div>
							<div className="link px-5">Rovers</div>
							<div className="link px-5">Vision</div>
							<div className="link px-5">Projects</div>
							<div className="link px-5">Research</div>
						</div>
						<div className="flex w-[300px]">
							<div className="link px-5">Home</div>
							<div className="sponsor-nav_button px-5">
								Become Sponsor
							</div>
						</div>
					</div>
				</nav>
				<div className="z-10 w-[1200px] h-screen flex justify-center items-center ">
					<div className="flex justify-end items-center w-full h-3/4 flex-col text-center">
						<div className="tracking-[15px] text-xl mb-4 font-light">UIU MARS ROVER TEAM</div>
						<Image className='mb-12' src="/flare.png" width={1100} height={8} alt="" />
						<h1 className={`${myFont.className} tracking-wideest text-4xl font-black mb-48`}>UMRT, the newborn conviction of shaping unattainability about Mars.</h1>
						<Image src="/brands.png" width={1089} height={64} alt="" />
					</div>
				</div>
				<div className=" w-screen h-full bg-[url('/stars_e_flip.jpg')] bg-cover flex justify-start items-center flex-col ">
					<Image className='mt-20' src="/award.png" width={839} height={164.34} alt="" />
					<Image className='mt-5' src="/img1.png" width={1242.53} height={519.09} alt="" />
					<div className="navigation w-2/3 flex p-5 items-center  flex-row h-28 justify-between">
						<h1 className={`${myFont.className} tracking-wideest text-2xl font-black `}>Our Achievements</h1>
						<div className="flex justify-start items-center">
							<div className="flex flex-row pr-5 mr-5  items-center h-[60px]  ">
								<div className="link px-5">Home</div>
								<div className="link px-5">Rovers</div>
								<div className="link px-5">Vision</div>
								<div className="link px-5">Projects</div>
							</div>
							<div className="flex bg-white rounded-md">
								<div className="sponsor-nav_button px-10 h-12 text-black text-center font-bold my-auto pt-3 " >
									Meet The Team
								</div>
							</div>
						</div>
					</div>
					<div className="navigation w-full border-neutral-300 border-b-[2px] border-opacity-50 ">
					</div>
				</div>
				<div className=" w-screen h-screen bg-[url('/stars_e_flip.jpg')] bg-cover flex justify-center items-center flex-col ">
					<div className="z-[0] sky-background w-full h-full absolute bg-[url('/stars_e.jpg')] bg-cover overflow-hidden">
					</div>
					<div className="3d-background w-full h-full absolute  overflow-hidden">
						<View className='relative sm:h-full sm:w-full'>
							<Sun2 />
							<Mars2 />
						</View>
					</div>
					<div className="navigation z-10  w-4/5 flex p-5 items-center  flex-row h-full justify-between">
						<div className="w-1/2 flex item-start flex-col">
							<h1 className={`${myFont.className} tracking-wideest text-2xl font-black mb-24 py-5 border-neutral-300 border-b-[2px] border-opacity-50`}>Our Vision</h1>
							<div className="">We are a team of students npassionate about designing and building the next generation of Mars and Lunar rovers.<br /><br />

								We are a team of students npassionate about designing and building the next generation of Mars and Lunar rovers.We are a team of students npassionate about designing and building the next generation of Mars and Lunar rovers.<br /><br />

								We are a team of students npassionate about design
								ing and building the next.</div>
						</div>
						<div className="navigation z-10 w-1/2 flex p-5 items-start  flex-col justify-between">
							<h1 className={`${myFont.className} pl-[80] tracking-widest text-6xl font-black mb-10`}>We DREAm at the Cosmic scale</h1>
							<Image className='mt-5 z-10 ml-[-80]' src="/vid.png" width={700.99} height={380.88} alt="" />
						</div>
					</div>
					<div className="navigation w-full border-neutral-300 border-b-[2px] border-opacity-50  mb-16 ">
					</div>
				</div>
			</main>
		</>
	)
}
