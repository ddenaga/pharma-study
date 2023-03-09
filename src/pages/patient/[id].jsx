import React from 'react';
import Sidebar from '@/components/Sidebar';
import { jhClient } from '@/lib/vendia.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet, faGauge, faWind, faTemperatureHalf, FaUserCircle } from '@fortawesome/free-solid-svg-icons';
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
			<div className="bg-gray-100 w-full grid grid-cols-12 content-start gap-10">
				{/* View content goes here */}
				{/* <button onClick={() => console.log(patient)}>Click me</button> */}

				<div className='flex border bg-white drop-shadow-sm justify-around p-4 mt-8 ml-8 rounded-xl gap-32 col-span-5 row-span-2'>
					<div className='flex flex-col items-center'>
						<Image
							onClick={() => console.log(patient)}
							src="/../public/snoop1.png"
							width="150"
							height="150"
							alt="patient avatar"
						//className='rounded-full'
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

				<div className="flex flex-col drop-shadow-sm border-1 bg-white rounded-xl items-center p-4 col-span-3 justify-between mt-8">
					<div className='flex w-full  items-center justify-around'>
						<FontAwesomeIcon className='text-red-500 text-3xl w-14' icon={faDroplet} />
						<div className='flex flex-col items-center'>
							<span className=' text-xl font-light'>Blood Type</span>
							<span className="text-red-500 text-2xl">{patient.bloodType}</span>
						</div>
					</div>

					<div className='flex w-full  items-center justify-around'>
						<FontAwesomeIcon icon={faGauge} className="text-3xl w-14" />
						<div className='flex flex-col items-center'>
							<span className=' text-xl font-light'>Blood Pressure</span>
							<span className="text-red-500 text-2xl">{patient.bloodPressure}</span>
						</div>
					</div>
					<div className='flex w-full items-center justify-around'>
						<FontAwesomeIcon className='text-blue-500 text-3xl w-14 justify-center' icon={faWind} />
						<div className='flex flex-col items-center'>
							<span className=' text-xl font-light'>Oxygen Saturation</span>
							<span className="text-red-500 text-2xl">{patient.oxygenSaturation}</span>
						</div>
					</div>
					<div className='flex w-full items-center justify-around'>
						<FontAwesomeIcon className='text-red-500 text-3xl w-14' icon={faTemperatureHalf} />
						<div className='flex flex-col items-center'>
							<span className=' text-xl font-light'>Temperature</span>
							<span className="text-red-500 text-2xl">{patient.temperature}</span>
						</div>
					</div>
				</div>
				{/* Height,Weight,BMI */}
				<div className="flex drop-shadow-sm border-1 bg-white rounded-xl mt-9 p-4 col-span-2">
					<div className='flex  '>
						<FontAwesomeIcon className=' text-5xl w-14 self-center mr-4' icon={faGauge} />
						<div className=' flex flex-col justify-around'>
							<div className='flex flex-col'>
								<span className='text-xl'>Height</span>
								<span className='text-3xl font-light'>{patient.height}cm</span>
							</div>
							<div className='flex flex-col'>
								<span className='text-xl'>Weight</span>
								<span className='text-3xl font-light'>{patient.weight}lbs</span>
							</div>
							<div className='flex flex-col'>
								<span className='text-xl'>BMI</span>
								<span className='text-3xl font-light'>26.5</span>
							</div>
						</div>

					</div>
				</div>
				{/* Allergies, Family History */}
				{/* <div className="flex drop-shadow-sm border-1 bg-white rounded-xl mt-9 p-4 col-span-2">
					<div className='flex flex-col justify-around content-center'>
						<div className='flex flex-col'>
							<span className='text-xl'>Allergies</span>
							<span className='text-3xl font-light'>{patient.allergies}</span>
						</div>
						<div className='flex flex-col'>
							<span className='text-xl'>Family History</span>
							<span className='text-3xl font-light'>{patient.familyHistory}</span>
						</div>
					</div>
				</div> */}

				{/* Notes */}
				<div className="flex flex-col drop-shadow-sm border-1 bg-white rounded-xl justify-between items-center p-4 col-span-6 row-span-3 ml-7">
					<span className='text-2xl font-semibold'>Notes</span>
					<div className="divider"></div>
					<div>
						<p>
							<span className='font-semibold'><br />Physical Examination:</span> Upon physical examination, patient appears emaciated and fatigued. Vital signs show a temperature of
							38.5°C (101.3°F).No other significant findings on examination.
							Assessment: The patient's symptoms are concerning for an opportunistic infection or progression of HIV disease.
							<br /><span className='font-semibold'>Plan:</span> The patient will undergo blood tests to assess HIV viral load and CD4+ T-cell count, as well as additional
							tests to investigate the possible source of the fever. The patient will continue on ART and receive additional medications
							to treat any identified opportunistic infections. Patient education will be provided regarding adherence to ART and infection
							prevention. Follow-up visit scheduled for March 15, 2023.
						</p>
					</div>
				</div>

				{/* Visits */}
				<div className="flex flex-col drop-shadow-sm border-1 bg-white rounded-xl items-center p-4 col-span-5 row-span-2 ml-9">
					<span className='text-2xl font-semibold'>Visits</span>
					<div className="divider"></div>
					{/* <table>
						<thead>
							<tr>
								<th className='border-b'>Date</th>
								<th className='border-b'>Notes</th>
							</tr>
						</thead>
						<tbody>
							{patient.visits.map((visit) => {
								<tr>
									<td>{visit.dateTime}</td>
									<td>{visit.note}</td>
									<td>{patient.visits.lenght}</td>
								</tr>
							})}
						</tbody>
					</table> */}
				</div>
			</div>
		</div>
	);
}
