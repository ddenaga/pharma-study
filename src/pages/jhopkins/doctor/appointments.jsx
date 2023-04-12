import Sidebar from '@/components/Sidebar';
import { useUser } from '@auth0/nextjs-auth0/client';
import { jhClient } from '@/lib/vendia.js';
import React, { useState, useEffect } from 'react';
import PatientCardAppts from '@/components/patientCardAppts';
import { motion } from 'framer-motion';
import Link from 'next/link';

export async function getServerSideProps() {
	const data = await jhClient.entities.patient.list();

	let patients = data.items;

	// Get current date
	const currentDate = new Date();

	// Get patients who have an appointment today
	patients = patients.filter((patient) => {
		return patient.visits.some((visit) => {
			const visitDate = new Date(visit.dateTime);
			return (
				visitDate.getFullYear() === currentDate.getFullYear() &&
				visitDate.getMonth() === currentDate.getMonth() &&
				visitDate.getDate() === currentDate.getDate() &&
				(!visit.hivViralLoad || visit.hivViralLoad.length === 0) // Dose is given once the viral load has been measured
			);
		});
	});

	return {
		props: {
			patients,
		},
	};
}

export default function Appointments(props) {
	const { patients } = props;

	const { user, error, isLoading } = useUser();
	const [showModal, setShowModal] = useState(false);
	const [reading, setReading] = useState();
	const [currentPatient, setCurrentPatient] = useState();
	const [notes, setNotes] = useState();
	const [index, setIndex] = useState();

	async function handleSubmit(e) {
		e.preventDefault();
		setShowModal(false);

		// TODO: Update the patient's visit
		const res = await jhClient.entities.patient.update({
			_id: currentPatient,
			visits: {
				dateTime: '2023-03-06T09:15:00Z',
				hivViralLoad: reading,
				note: notes,
			},
		});
	}

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	return (
		<div className="flex" id="site-content">
			{showModal ? (
				<>
					<motion.div
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3 }}
						initial={{ opacity: 0.5, scale: 0.5 }}
						className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none"
					>
						<div className="relative my-6 mx-auto w-auto max-w-3xl">
							{/*content*/}
							<div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
									<h3 className="text-3xl font-semibold">Enter viral load and note</h3>
									<button
										className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
										onClick={() => setShowModal(false)}
									>
										<span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
											×
										</span>
									</button>
								</div>
								{/*body*/}
								<form onSubmit={(e) => handleSubmit(e.event.target)}>
									<div className="relative flex flex-col justify-between p-6">
										<div>
											<label className="mr-2">
												Viral load:
												<input
													required
													type="text"
													name="name"
													className="ml-16 border py-2"
													onChange={(e) => setReading(e.target.value)}
												/>
											</label>
										</div>
										<div className="mt-5">
											<label>
												Note:
												<input
													type="textarea"
													name="notes"
													className="ml-28 border py-10"
													onChange={(e) => setNotes(e.target.value)}
												/>
											</label>
										</div>
									</div>
									{/*footer*/}
									<div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
										<button
											className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-semibold text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
											type="submit"
											onClick={() => setShowModal(false)}
										>
											Close
										</button>
										<button
											className="mr-1 mb-1 rounded bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-teal-600"
											type="button"
											onClick={handleSubmit}
										>
											Save Changes
										</button>
									</div>
								</form>
							</div>
						</div>
					</motion.div>
					<div className="fixed inset-0 z-40 bg-black opacity-25"></div>
				</>
			) : null}
			<Sidebar />
			<div className="w-full overflow-y-scroll bg-gray-50 px-20 py-12">
				<div className="mb-12 flex justify-between" onClick={() => console.log(patients)}>
					<div className="">
						<h1 className="attention-voice mb-6">Appointments</h1>
						<p className="text-lg text-gray-500">You have the following appointments for today</p>
					</div>
					<div>
						<Link
							href="/jhopkins/doctor/new-appointment"
							className="inline-flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-100"
						>
							+ New Appointment
						</Link>
					</div>
				</div>
				<div className="flex flex-wrap justify-between">
					{patients.map((patient, index) => (
						<div
							key={index}
							onClick={() => {
								setShowModal(true);
								setCurrentPatient(patient._id);
								setIndex(index);
								console.log(index);
							}}
						>
							<PatientCardAppts
								name={patient.name}
								dob={patient.dob}
								familyHistory={patient.familyHistory}
								id={patient._id}
								eligibility={true}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
