import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { jhClient } from '@/lib/vendia';
import { motion } from 'framer-motion';

export async function getServerSideProps() {
	const data = await jhClient.entities.tracker.list();
	const mappings = data.items;

	// Note: This could be intensive on the API.
	const entities = await Promise.all(
		mappings.map(async (ids) => {
			const { _id, patientId, treatmentId } = ids;
			const patient = await jhClient.entities.patient.get(patientId);
			const treatment = await jhClient.entities.treatment.get(treatmentId);
			//const isDone = treatment.numberOfDoses == 5
			return {
				_id,
				patient,
				treatment,
			};
		}),
	);

	return {
		props: {
			entities,
		},
	};
}

function LiveResults(props) {
	const [patients, setPatients] = useState(props.entities);
	const [studyStatus, setStudyStatus] = useState();

	async function updateDoses(id) {
		const updatedTreatment = await jhClient.entities.treatment.get(id);
		const tempArray = [...patients];
		//remove the patient that had a change and add back with the change
		for (const patient of tempArray) {
			if (patient.treatment._id == updatedTreatment._id) {
				delete patient.treatment;
				patient.treatment = updatedTreatment;
			}
		}
		setPatients(tempArray);
	}

	function checkStatus() {
		setStudyStatus(true);
		console.log(patients);
		patients.forEach(({ treatment }) => {
			console.log(treatment);
			if (treatment.numberOfDoses < 5) {
				setStudyStatus(false);
			}
		});
	}
	useEffect(() => {
		checkStatus();
		jhClient.entities.treatment.onUpdate(({ result }) => {
			updateDoses(result._id);
			checkStatus();
		});
	}, []);
	return (
		<div className="flex" id="site-content">
			<Sidebar />
			<div className="w-full overflow-y-scroll bg-gray-50 px-20 py-12">
				<div className="mb-12 flex items-center justify-between">
					<h1 className="attention-voice">Live Results</h1>
					{studyStatus ? (
						<span className="text-md mr-20 inline-block rounded-full bg-green-600 py-2 px-4 text-white shadow-lg">
							Study is Complete
						</span>
					) : (
						<span className="text-md mr-20 inline-block animate-pulse rounded-full bg-red-600 py-2 px-4 text-white shadow-lg">
							Study still Ongoing
						</span>
					)}
				</div>
				<div className="scrollbar xl:no-scrollbar -mx-4 mt-8 overflow-x-scroll shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
					<table className="min-w-full divide-y divide-gray-300">
						<thead className="bg-gray-100">
							<tr>
								<th
									scope="col"
									className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
								>
									UUID
								</th>
								<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">
									Name
								</th>
								<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
									Doses
								</th>
								<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
									Last HIV Reading
								</th>
								<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
									Status
								</th>
								<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
									Medication
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 bg-white">
							{patients.map((item) => (
								<tr key={item.patient._id}>
									<td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
										{item._id}
									</td>
									<td className="px-3 py-4 text-sm text-gray-500">{item.patient.name}</td>
									<td className="px-3 py-4 text-sm text-gray-500">
										{item.treatment?.numberOfDoses}/5
										<motion.progress
											animate={{ x: [50, 0] }}
											className={
												item.treatment.numberOfDoses >= 5
													? 'progress progress-success block w-40'
													: 'progress progress-warning block w-40'
											}
											value={(item.treatment.numberOfDoses / 5) * 100}
											max="100"
										></motion.progress>
									</td>
									<td className="px-3 py-4 text-sm text-gray-500">
										{item.patient.visits != null
											? 'No Reading yet'
											: item.patient.visits[0].hivViralLoad}
									</td>
									<td className="px-3 py-4 text-sm text-gray-500">
										{item.treatment.numberOfDoses >= 5 ? (
											<motion.span
												animate={{ scale: [1, 2, 1] }}
												transition={{ duration: 0.2 }}
												className="badge-success badge"
											>
												Done
											</motion.span>
										) : (
											<motion.span
												animate={{ scale: [1, 2, 1] }}
												transition={{ duration: 0.2 }}
												className="badge-warning badge"
											>
												Ongoing
											</motion.span>
										)}
									</td>
									<td className="px-3 py-4 text-sm text-gray-500">
										{item.treatment.isGeneric == true ? 'Generic' : 'Bavaria'}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default LiveResults;
