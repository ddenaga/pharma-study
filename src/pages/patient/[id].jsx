import React from 'react';
import Sidebar from '@/components/Sidebar';
import { jhClient } from '@/lib/vendia.js';
import PatientCard from '@/components/PatientCard';
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
			<div className="bg-gray-100 w-full flex flex-col">
				{/* View content goes here */}
				<button onClick={() => console.log(patient)}>Click me</button>

				


				<div className='flex border bg-white p-4 rounded-xl m-9 max-w-fit gap-32'>
					<div className='flex flex-col justify-between'>
						<Image
							src="/../public/favicon.ico"
							width="80"
							height="80"
							alt="patient avatar"
							/>
						<span className='font-bold text-2xl'>{patient.name}</span>
						<div className='flex flex-col'>
							<span className='font-semibold text-lg'>DOB</span>
							<span>{patient.dob}</span>
						</div>
					</div>
					<div className='flex flex-col'>
						<span className='font-semibold text-lg'>Address</span>
						<span>{patient.address.streetAddress + ', ' + patient.address.city}</span>
						<span>{patient.address.state + ', ' + patient.address.zipCode}</span>
						<span className='font-semibold text-lg'>Insurance #</span>
						<span>{patient.insuranceNumber}</span>
						<span className='font-semibold text-lg'>Employed</span>
						<span>{patient.isEmployed ? "Yes" : "No"}</span>
					</div>
				</div>

				{/* Height, Weight, Blood Type, Blood Pressure, Oxygen Saturation */}

				<div className="flex w-96 h-30 drop-shadow-sm border-2 m-9 bg-white rounded-xl justify-between items-center p-4">
					<ul className='flex flex-col'>
						<li>
							<span>Height</span>
							{patient.height}
						</li>
						<li>
							<span>Weight</span>
							{patient.weight}
						</li>
						<li>
							<FontAwesomeIcon className='text-red-500' icon={faTemperatureHalf} />
							<span>Temperature</span>
							{patient.temperature}
						</li>
						<li>
							<FontAwesomeIcon className='text-red-500' icon={faDroplet} />
							<span>Blood Type</span>
							{patient.bloodType}
						</li>
						<li>
							<FontAwesomeIcon icon={faGauge} />
							<span>Blood Pressure</span>
							{patient.bloodPressure}
						</li>
						<li>
							<FontAwesomeIcon className='text-blue-500' icon={faWind} />
							<span>Oxygen Saturation</span>
							{patient.oxygenSaturation}
						</li>
					</ul>
				</div>

				{/* Visits */}
				<div className="flex w-96 h-30 drop-shadow-sm border-2 m-9 bg-white rounded-xl justify-between items-center p-4">
					Visits
				</div>

				{/*  */}
				<div className="flex w-96 h-30 drop-shadow-sm border-2 m-9 bg-white rounded-xl justify-between items-center p-4">
					
				</div>
			</div>
		</div>
	);
}
