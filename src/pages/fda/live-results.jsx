import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { fdaClient } from '@/lib/vendia';
import { motion } from 'framer-motion';
import Link from 'next/link';

export async function getServerSideProps() {
	function getEntityById(entities, id) {
		let entity = entities.find((entity) => entity._id === id);
		return entity !== undefined ? entity : null;
	}

	let trackers, patients, treatments;
	try {
		trackers = (await fdaClient.entities.tracker.list()).items;
		patients = (await fdaClient.entities.patient.list()).items.filter((patient) => patient.isEligible);
		treatments = (await fdaClient.entities.treatment.list()).items;
	} catch (e) {
		trackers = [];
		patients = [];
		treatments = [];
	}

	let pairings = await Promise.all(
		trackers.map(async (ids) => {
			const { _id, patientId, treatmentId } = ids;
			const patient = getEntityById(patients, patientId);
			const treatment = getEntityById(treatments, treatmentId);
			return {
				_id,
				patient,
				treatment,
			};
		}),
	);

	// Filter out incomplete mappings
	pairings = pairings.filter((pr) => pr.patient !== null && pr.treatment !== null);

	return {
		props: {
			pairings,
		},
	};
}

export default function LiveResults(props) {
	const [pairings, setPairings] = useState(props.pairings);
	const [studyStatus, setStudyStatus] = useState(true);
	const [refresh, setRefresh] = useState(true);

	async function updateDoses(id) {
		const updatedTreatment = await fdaClient.entities.treatment.get(id);
		const tempArray = [...pairings];
		// remove the patient that had a change and add back with the change
		for (const pr of tempArray) {
			if (pr.treatment._id == updatedTreatment._id) {
				delete pr.treatment;
				pr.treatment = updatedTreatment;
			}
		}
		setPairings(tempArray);
	}

	function checkStatus() {
		setStudyStatus(true);
		pairings.forEach((pr) => {
			if (pr.patient.visits === null || pr.patient.visits?.length < pr.treatment.numberOfDoses) {
				setStudyStatus(false);
			}
		});
	}

	function isNumber(s) {
		return /^\d+$/.test(s);
	}

	useEffect(() => {
		checkStatus();
		fdaClient.entities.treatment.onUpdate(({ result }) => {
			updateDoses(result._id);
			checkStatus();
		});
	}, []);
	return (
		<div className="" id="site-content">
			<Sidebar />
			<div className="w-full overflow-y-scroll bg-gray-50 px-10 py-6 lg:px-20 lg:py-12">
				<div className="mb-12 flex items-center justify-between">
					<h1 className="attention-voice">Live results</h1>
					{pairings.length > 0 ? (
						studyStatus ? (
							<span className="text-md inline-block rounded-full bg-green-600 py-2 px-4 text-white shadow-lg">
								Study is Complete
							</span>
						) : (
							<span className="text-md inline-block animate-pulse rounded-full bg-red-600 py-2 px-4 text-white shadow-lg">
								Study still Ongoing
							</span>
						)
					) : (
						<div></div>
					)}
				</div>
				<div className="">
					{pairings.length > 0 ? (
						<div className="scrollbar xl:no-scrollbar-mx-4 mt-8 overflow-x-scroll shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
							<table className="min-w-full divide-y divide-gray-300">
								<thead className="bg-gray-100">
									<tr>
										<th
											scope="col"
											className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
										>
											UUID
										</th>
										<th
											scope="col"
											className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 "
										>
											Doses
										</th>
										<th
											scope="col"
											className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>
											Last HIV Reading
										</th>
										<th
											scope="col"
											className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>
											Status
										</th>
										<th
											scope="col"
											className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>
											Medication
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 bg-white">
									{pairings.map(
										(pr) =>
											pr.patient.isEligible && (
												<tr key={pr.patient._id}>
													<td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
														{pr.patient._id}
													</td>
													{/* Doses */}
													<td className="px-3 py-4 text-sm text-gray-500">
														{
															pr.patient.visits?.filter((visit) =>
																isNumber(visit.hivViralLoad),
															).length
														}{' '}
														/ {pr.treatment.numberOfDoses}
														<motion.progress
															animate={{ x: [50, 0] }}
															className={
																pr.patient.visits?.filter((visit) =>
																	isNumber(visit.hivViralLoad),
																).length >= pr.treatment.numberOfDoses
																	? 'progress progress-success block w-40'
																	: 'progress progress-warning  block w-40'
															}
															value={
																(pr.patient.visits?.filter((visit) =>
																	isNumber(visit.hivViralLoad),
																).length /
																	pr.treatment.numberOfDoses) *
																100
															}
															max="100"
														></motion.progress>
													</td>
													{/* Last reading */}
													<td className="px-3 py-4 text-sm text-gray-500">
														{(() => {
															const visits = pr.patient.visits;
															if (!visits?.some((visit) => isNumber(visit.hivViralLoad)))
																return 'No reading yet';

															const lastVisit = visits
																.filter((visit) => isNumber(visit.hivViralLoad))
																.reduce((last, curr) =>
																	new Date(last.dateTime) > new Date(curr.dateTime)
																		? last
																		: curr,
																);

															return lastVisit.hivViralLoad;
														})()}
													</td>
													{/* Status */}
													<td className="px-3 py-4 text-sm text-gray-500">
														{pr.patient.visits?.filter((visit) =>
															isNumber(visit.hivViralLoad),
														).length >= pr.treatment.numberOfDoses ? (
															<motion.span
																animate={{ scale: [1, 2, 1] }}
																transition={{ duration: 0.2 }}
																className="badge badge-success"
															>
																Done
															</motion.span>
														) : (
															<motion.span
																animate={{ scale: [1, 2, 1] }}
																transition={{ duration: 0.2 }}
																className="badge badge-warning"
															>
																Ongoing
															</motion.span>
														)}
													</td>
													{/* Medication */}
													<td className="px-3 py-4 text-sm text-gray-500">
														{pr.treatment.isGeneric ? 'Generic' : 'Bavaria'}
													</td>
												</tr>
											),
									)}
								</tbody>
							</table>
						</div>
					) : (
						<div className=" flex h-64 flex-col items-center justify-around rounded-lg border border-dashed border-gray-300 shadow-md">
							<span className="text-2xl">No tracking information yet</span>
							<Link href="/fda/assign-drugs">
								<button className="btn-outline btn-info btn">Assign Drugs</button>
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
