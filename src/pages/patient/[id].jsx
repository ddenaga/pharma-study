import React from 'react';
import Sidebar from '@/components/Sidebar';
import { jhClient } from '@/lib/vendia.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet, faGauge, faWind, faTemperatureHalf } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";

export async function getServerSideProps(context) {
	const { id } = context.params;
	const patient = await jhClient.entities.patient.get(id);
	return {
		props: {
			data: patient,
		},
	};
}

export default function Patient(props) {
	// const { patient } = props;
	const patient = props.data;

	return (
		<div className="flex" id="site-content">
			<Sidebar />
			<div className="bg-gray-100 w-full grid grid-cols-12 content-start gap-6">
				{/* View content goes here */}
				{/* <button onClick={() => console.log(patient)}>Click me</button> */}

				<div className='flex border bg-white justify-around p-4 mt-8 ml-8 rounded-xl gap-32 col-span-5 row-span-3'>
					<div className='flex flex-col items-center'>
						<Image
							src="/../public/favicon.ico"
							width="150"
							height="150"
							alt="patient avatar"
						/>
						<span className='font-bold text-5xl mt-2 text-slate-600'>{patient.name}</span>
						<div className='flex flex-col pt-10 content-start'>
							<span className='font-semibold text-3xl text-slate-600'>DOB</span>
							<span className='text-xl'>{patient.dob}</span>
						</div>
					</div>
					<div className='flex flex-col justify-around'>
						<div className='flex flex-col'>
							<span className='font-semibold text-3xl text-slate-600'>Address</span>
							<span className='text-lg'>{patient.address.streetAddress + ', ' + patient.address.city}</span>
							<span className='text-lg'>{patient.address.state + ', ' + patient.address.zipCode}</span>
						</div>
						<div className='flex flex-col'>
							<span className='font-semibold text-3xl text-slate-600'>Insurance #</span>
							<span className='text-xl'>{patient.insuranceNumber}</span>
						</div>
						<div className='flex flex-col'>
							<span className='font-semibold text-3xl text-slate-600'>Employed</span>
							<span className='text-xl'>{patient.isEmployed ? "Yes" : "No"}</span>
						</div>
					</div>
				</div>

				{/* Height, Weight, Blood Type, Blood Pressure, Oxygen Saturation */}

				<div className="flex flex-col drop-shadow-sm border-2 bg-white rounded-xl items-center p-4 col-span-2 justify-center mt-8">
					<div className='flex w-full  items-center'>
						<FontAwesomeIcon className='text-red-500 text-3xl w-14' icon={faDroplet} />
						<div className='flex flex-col items-center'>
							<span className=' text-md'>Blood Type</span>
							<span className="text-red-500 text-2xl">{patient.bloodType}</span>
						</div>
					</div>

					<div className='flex w-full  items-center'>
						<FontAwesomeIcon icon={faGauge} className="text-3xl w-14" />
						<div className='flex flex-col items-center'>
							<span className=' text-md'>Blood Pressure</span>
							<span className="text-red-500 text-2xl">{patient.bloodPressure}</span>
						</div>
					</div>
					<div className='flex w-full items-center'>
						<FontAwesomeIcon className='text-blue-500 text-3xl w-14 justify-center' icon={faWind} />
						<div className='flex flex-col items-center'>
							<span className=' text-md'>Oxygen Saturation</span>
							<span className="text-red-500 text-2xl">{patient.oxygenSaturation}</span>
						</div>
					</div>
					<div className='flex w-full items-center'>
						<FontAwesomeIcon className='text-red-500 text-3xl w-14' icon={faTemperatureHalf} />
						<div className='flex flex-col items-center'>
							<span className=' text-md'>Temperature</span>
							<span className="text-red-500 text-2xl">{patient.temperature}</span>
						</div>
					</div>
				</div>
				<div className="flex drop-shadow-sm border-2 bg-white rounded-xl justify-between items-center p-4 col-span-2 ">
					<div>
						<div>
							<span>Height</span>
							{patient.height}
						</div>
						<div>
							<span>Weight</span>
							{patient.weight}
						</div>
						<div>
							<span>BMI</span>
							<span>26.5</span>
						</div>

					</div>
				</div>

				{/* Visits */}
				<div className="flex drop-shadow-sm border-2 bg-white rounded-xl justify-between items-center p-4 col-span-5 row-span-2">
					Visits
				</div>

				{/*  */}
				<div className="flex drop-shadow-sm border-2 bg-white rounded-xl justify-between items-center p-4 col-span-7">

				</div>
			</div>
		</div>
	);
}
