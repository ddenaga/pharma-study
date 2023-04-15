import React from 'react';
import Sidebar from '@/components/Sidebar';
import { jhClient } from '@/lib/vendia.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet, faGauge, faWind, faTemperatureHalf, FaUserCircle } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

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
			<div className="w-full content-start gap-10 overflow-y-scroll bg-gray-50 px-20 py-12">
				{/* View content goes here */}
				{/* <button onClick={() => console.log(patient)}>Click me</button> */}
				<div className="mx-auto flex max-w-3xl items-center space-x-5 px-4 sm:px-6 md:flex md:items-center  md:space-x-5 lg:max-w-7xl lg:px-8  ">
					<Image
						onClick={() => console.log(patient)}
						src="/../public/snoop1.png"
						width="150"
						height="150"
						alt="patient avatar"
						// className="flex-shrink-0"
						className="h-16 w-16 rounded-full"
					/>
					<div>
						<h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
						{patient.isEligible ? (
							<p className="text-sm font-medium text-gray-500">
								Patient is currently <span className="text-gray-900">eligible</span> for the study
							</p>
						) : (
							<p className="text-sm font-medium text-gray-500">
								Patient is currently <span className="text-gray-900">not eligible</span> for the study
							</p>
						)}
					</div>
				</div>

				<div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
					<div className="space-y-6 lg:col-span-2 lg:col-start-1">
						<div className="bg-white shadow sm:rounded-lg" id="patient-info">
							<div className="px-4 py-5 sm:px-6">
								<h2 className="text-lg font-medium leading-6 text-gray-900">Patient Information</h2>
								<p className="mt-1 max-w-2xl text-sm text-gray-500">
									Relevant information pertaining to the study
								</p>
							</div>
							<div className="border-t border-gray-200 px-4 py-5 sm:px-6">
								<div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
									<div className="sm:col-span-1">
										<p className="text-sm font-medium text-gray-500">Date of Birth</p>
										<p className="mt-1 text-sm text-gray-900">{patient.dob}</p>
									</div>
									<div className="sm:col-span-1">
										<p className="text-sm font-medium text-gray-500">Address</p>
										<p className="mt-1 text-sm text-gray-900">
											{patient.address.streetAddress + ', '} <br />
											{patient.address.city +
												' ' +
												patient.address.state +
												' ' +
												patient.address.zipCode}
										</p>
									</div>
									<div className="sm:col-span-1">
										<p className="text-sm font-medium text-gray-500">Insurance #</p>
										<p className="mt-1 text-sm text-gray-900">{patient.insuranceNumber}</p>
									</div>
									<div className="sm:col-span-1">
										<p className="text-sm font-medium text-gray-500">Employed</p>
										<p className="mt-1 text-sm text-gray-900">
											{patient.isEmployed ? 'Yes' : 'No'}
										</p>
									</div>
									<div className="sm:col-span-1">
										<p className="text-sm font-medium text-gray-500">Blood Type</p>
										<p className="mt-1 text-sm text-gray-900">{patient.bloodType}</p>
									</div>
									<div className="sm:col-span-1">
										<p className="text-sm font-medium text-gray-500">Blood Pressure</p>
										<p className="mt-1 text-sm text-gray-900">{patient.bloodPressure}</p>
									</div>
									<div className="sm:col-span-1">
										<p className="text-sm font-medium text-gray-500">Oxygen Saturation</p>
										<p className="mt-1 text-sm text-gray-900">{patient.oxygenSaturation}</p>
									</div>
									<div className="sm:col-span-1">
										<p className="text-sm font-medium text-gray-500">Temperature</p>
										<p className="mt-1 text-sm text-gray-900">{patient.temperature}</p>
									</div>
								</div>
							</div>
						</div>
						<div id="patient-notes" className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
							<div className="divide-y divide-gray-200">
								<div className="px-4 py-5 sm:px-6">
									<h2 className="text-lg font-medium text-gray-900">Notes</h2>
								</div>
								<div className="px-4 py-6 sm:px-6">
									<ul className="space-y-8">
										<li>
											<div>
												<div className="text-sm">
													<p className="font-medium text-gray-900">01/23/22</p>
												</div>
												<div className="mt-1 text-sm text-gray-700">
													<p>
														Upon physical examination, patient appears emaciated and
														fatigued. Vital signs show a temperature of 38.5°C (101.3°F).No
														other significant findings on examination. Assessment: The
														patients symptoms are concerning for an opportunistic infection
														or progression of HIV disease.
													</p>
												</div>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

					<div className="lg:col-span-1 lg:col-start-3">
						<div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
							<div id="patient-visits" className="">
								<h2 className="text-lg font-medium text-gray-900">Visits</h2>
							</div>
							<div className="mt-3">
								<ul>
									<li>
										<div className="relative pb-8">
											<span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"></span>
											<div className="relative flex space-x-3">
												<div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 ring-8 ring-white">
													<svg
														class="h-5 w-5 text-white"
														x-description="Heroicon name: mini/check"
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 20 20"
														fill="currentColor"
														aria-hidden="true"
													>
														<path
															fill-rule="evenodd"
															d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
															clip-rule="evenodd"
														></path>
													</svg>
												</div>
												<div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
													<div>
														<p className="text-sm text-gray-500">
															Patient viral load:{' '}
															<strong className="font-medium text-gray-900">212</strong>
														</p>
													</div>

													<div className="whitespace-nowrap text-right text-sm text-gray-500">
														<time datetime="2022-01-23">02/04/22</time>
													</div>
												</div>
											</div>
										</div>
									</li>
									<li>
										<div className="relative pb-8">
											<span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"></span>
											<div className="relative flex space-x-3">
												<div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 ring-8 ring-white">
													<svg
														class="h-5 w-5 text-white"
														x-description="Heroicon name: mini/check"
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 20 20"
														fill="currentColor"
														aria-hidden="true"
													>
														<path
															fill-rule="evenodd"
															d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
															clip-rule="evenodd"
														></path>
													</svg>
												</div>
												<div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
													<div>
														<p className="text-sm text-gray-500">
															Patient viral load:
															<strong className="font-medium text-gray-900">21</strong>
														</p>
													</div>

													<div className="whitespace-nowrap text-right text-sm text-gray-500">
														<time datetime="2022-01-23">01/27/22</time>
													</div>
												</div>
											</div>
										</div>
									</li>
									<li>
										<div className="relative">
											{/* <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"></span> */}
											<div className="relative flex space-x-3">
												<div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 ring-8 ring-white">
													<svg
														class="h-5 w-5 text-white"
														x-description="Heroicon name: mini/check"
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 20 20"
														fill="currentColor"
														aria-hidden="true"
													>
														<path
															fill-rule="evenodd"
															d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
															clip-rule="evenodd"
														></path>
													</svg>
												</div>
												<div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
													<div>
														<p className="text-sm text-gray-500">
															Patient viral load:{' '}
															<strong className="font-medium text-gray-900">50</strong>
														</p>
													</div>

													<div className="whitespace-nowrap text-right text-sm text-gray-500">
														<time datetime="2022-01-23">01/10/22</time>
													</div>
												</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				{/* Height, Weight, Blood Type, Blood Pressure, Oxygen Saturation */}

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

				{/* Visits */}
			</div>
		</div>
	);
}
