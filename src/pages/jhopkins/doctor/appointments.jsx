import Sidebar from '@/components/Sidebar';
import { useUser } from '@auth0/nextjs-auth0/client';
import { jhClient } from '@/lib/vendia.js';
import React, { useState, useEffect } from 'react';
import PatientCardAppts from '@/components/PatientCardAppointment';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export async function getServerSideProps() {
	const data = await jhClient.entities.patient.list();

	const patients = data.items;
	const patientVisits = getPatientVisitsToday(patients);

	return {
		props: {
			patients,
			patientVisits,
		},
	};
}

function getPatientVisitsToday(patients) {
	// Get current date
	const currentDate = new Date();

	let patientVisits = [];
	for (let i = 0; i < patients.length; i++) {
		for (let j = 0; j < patients[i].visits.length; j++) {
			patientVisits.push([i, j]);
		}
	}

	patientVisits = patientVisits.filter((pv) => {
		const visit = patients[pv[0]].visits[pv[1]];
		const visitDate = new Date(visit.dateTime);

		return (
			visitDate.getFullYear() === currentDate.getFullYear() &&
			visitDate.getMonth() === currentDate.getMonth() &&
			visitDate.getDate() === currentDate.getDate() &&
			(!visit.hivViralLoad || visit.hivViralLoad.length === 0) // Dose is given once the viral load has been measured
		);
	});

	return patientVisits;
}

export default function Appointments(props) {
	const { patients } = props;

	const { user, error, isLoading } = useUser();

	const [patientVisits, setPatientVisits] = useState(props.patientVisits);

	const [showModal, setShowModal] = useState(false);
	const [patientVisit, setPatientVisit] = useState([]);

	const [reading, setReading] = useState('');
	const [note, setNote] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();
		setShowModal(false);

		// Get patient and visit
		const patient = patients[patientVisit[0]];
		const visit = patient.visits[patientVisit[1]];

		// Update the visit
		visit.hivViralLoad = reading;
		visit.note = note;

		// TODO: Update the patient's visit in Vendia
		const updatePatient = (({ _id, visits }) => ({ _id, visits }))(patient);
		// const res = await jhClient.entities.patient.update(updatePatient);
		toast.promise(jhClient.entities.patient.update(updatePatient), {
			success: 'Patient visit recorded',
			pending: 'Recording patient visit',
			error: 'Failed to record patient visit',
		});
		// console.log(updatePatient);
		// console.log(res);

		// Update the patientVisits
		setPatientVisits(getPatientVisitsToday(patients));
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
													name="reading"
													value={reading || ''}
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
													name="note"
													value={note || ''}
													className="ml-28 border py-10"
													onChange={(e) => setNote(e.target.value)}
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
			) : (
				''
			)}
			<Sidebar />
			<div className="w-full overflow-y-scroll bg-gray-50 px-20 py-12">
				<h1 className="attention-voice mb-10">Appointments</h1>
				<ToastContainer />

				<div className="mb-10 flex flex-row items-center justify-between">
					<div>
						<p className="text-lg text-gray-500">You have the following appointments for today</p>
					</div>

					<div>
						<Link
							href="/jhopkins/doctor/new-appointment"
							className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							+ New Appointment
						</Link>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3 xl:gap-4">
					{patientVisits
						.sort((a, b) => {
							const patientA = patients[a[0]];
							const visitA = patientA.visits[a[1]];

							const patientB = patients[b[0]];
							const visitB = patientB.visits[b[1]];

							return new Date(visitA.dateTime) - new Date(visitB.dateTime);
						})
						.map((pv, index) => {
							const patient = patients[pv[0]];
							const visit = patient.visits[pv[1]];

							return (
								<div
									key={index}
									onClick={() => {
										setPatientVisit(pv);
										setShowModal(true);
										setReading(visit.hivViralLoad);
										setNote(visit.note);
									}}
								>
									<PatientCardAppts patient={patient} visit={visit} />
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
}
