import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { fdaClient } from '@/lib/vendia';
import { motion } from 'framer-motion';
import { TEMPORARY_REDIRECT_STATUS } from 'next/dist/shared/lib/constants';
export async function getServerSideProps() {
	const data = await fdaClient.entities.tracker.list();
	const mappings = data.items;

	// Note: This could be intensive on the API.
	const entities = await Promise.all(
		mappings.map(async (ids) => {
			const { _id, patientId, treatmentId } = ids;
			const patient = await fdaClient.entities.patient.get(patientId);
			const treatment = await fdaClient.entities.treatment.get(treatmentId);
			const isDone = treatment.numberOfDoses == 5
			return {
				_id,
				patient,
				treatment,
				isDone,
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
	const [studyStatus, setStudyStatus] = useState(true);
	const [refresh, setRefresh] = useState(false);

	async function updateDoses(id) {
		console.log("called")
		const updatedTreatment = await fdaClient.entities.treatment.get(id)
		const tempArray = patients
		for (const patient of tempArray) {
			if (patient.treatment._id == updatedTreatment._id) {
				delete patient.treatment
				patient.treatment = updatedTreatment
			}
		}

		return tempArray

	}
	useEffect(() => {
		for (const patient of patients) {
			if (patient.isDone == false) {
				setStudyStatus(false)
			}
		}
		fdaClient.entities.treatment.onUpdate(({ result }) => {
			updateDoses(result._id).then((result) => {
				setPatients(result)
				setRefresh(!refresh)
			})
		})
	}, [])
	return (
		<div className="flex" id="site-content">
			<Sidebar />
			<div className="bg-gray-100 w-full overflow-y-scroll" >
				<div className='flex justify-between items-center'>
					<h1 className='text-4xl m-20 '>Live Results</h1>
					{studyStatus ?
						<span className="inline-block rounded-full py-2 px-4 bg-green-600 text-white text-md mr-20 shadow-lg">Study is Complete</span> :
						<span className="inline-block animate-pulse rounded-full py-2 px-4 bg-red-600 text-white text-md mr-20 shadow-lg">Study still Ongoing</span>
					}
				</div>
				<div className="overflow-x-auto p-16 ">
					<table className="table table-zebra w-full shadow-xl">
						<thead>
							<tr>
								<th>UUID</th>
								<th>Doses</th>
								<th>Last HIV Reading</th>
								<th>Status</th>
								<th>Medication</th>
							</tr>
						</thead>
						<tbody>
							{patients.map((item) => (
								<tr key={item._id}>
									<td>{item._id}</td>
									<td className='flex flex-col'>{item.treatment?.numberOfDoses}/5<motion.progress animate={{ x: 0 }} className={item.treatment.numberOfDoses == 5 ? "progress progress-success w-40" : "progress progress-warning  w-40"} value={(item.treatment.numberOfDoses / 5) * 100} max="100"></motion.progress></td>
									<td>{item.patient.visits == null ? "No Reading yet" : item.patient.visits[0].hivViralLoad}</td>
									<td>{item.treatment.numberOfDoses == 5 ? <span className='badge badge-success'>Done</span> : <span className='badge badge-warning'>Ongoing</span>}</td>
									<td>{item.treatment.isGeneric == null ? "Bavaria" : "Generic"}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)

}

export default LiveResults;
