import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { fdaClient } from '@/lib/vendia';
import { motion } from 'framer-motion';
import { TEMPORARY_REDIRECT_STATUS } from 'next/dist/shared/lib/constants';
import Link from 'next/link';
export async function getServerSideProps() {
	const data = await fdaClient.entities.tracker.list();
	const mappings = data.items;

	// Note: This could be intensive on the API.
	const entities = await Promise.all(
		mappings.map(async (ids) => {
			const { _id, patientId, treatmentId } = ids;
			const patient = await fdaClient.entities.patient.get(patientId);
			const treatment = await fdaClient.entities.treatment.get(treatmentId);
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
	const [studyStatus, setStudyStatus] = useState(true);
	const [refresh, setRefresh] = useState(true)

	async function updateDoses(id) {
		const updatedTreatment = await fdaClient.entities.treatment.get(id)
		const tempArray = [...patients]
		//remove the patient that had a change and add back with the change
		for (const patient of tempArray) {
			if (patient.treatment._id == updatedTreatment._id) {
				delete patient.treatment
				patient.treatment = updatedTreatment
			}
		}
		setPatients(tempArray)
	}

	function checkStatus() {
		setStudyStatus(true)
		patients.forEach((patient) => {
			if (patient.treatment.numberOfDoses < 5) {
				setStudyStatus(false)
			}
		})
	}
	useEffect(() => {
		checkStatus()
		fdaClient.entities.treatment.onUpdate(({ result }) => {
			updateDoses(result._id)
			checkStatus()
		})
	}, [])
	return (
		<div className="flex" id="site-content">
			<Sidebar />
			<div className="bg-gray-100 w-full overflow-y-scroll" onClick={console.log(props)}>
				<div className='flex justify-between items-center'>
					<h1 className='text-4xl m-20 '>Live Results</h1>
					{patients.length > 0 ?
						studyStatus ?
							<span className="inline-block rounded-full py-2 px-4 bg-green-600 text-white text-md mr-20 shadow-lg">Study is Complete</span> :
							<span className="inline-block animate-pulse rounded-full py-2 px-4 bg-red-600 text-white text-md mr-20 shadow-lg">Study still Ongoing</span>
						: <div></div>}
				</div>
				<div className="overflow-x-auto p-16 ">
					{patients.length > 0 ?
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
									item.patient.isEligible &&
									<tr key={item.patient._id}>
										<td>{item.patient._id}</td>
										<td className='flex flex-col'>{item.treatment?.numberOfDoses}/5<motion.progress animate={{ x: [50, 0] }} className={item.treatment.numberOfDoses >= 5 ? "progress progress-success w-40" : "progress progress-warning  w-40"} value={(item.treatment.numberOfDoses / 5) * 100} max="100"></motion.progress></td>
										<td>{item.patient.visits == null ? "No Reading yet" : item.patient.visits[0].hivViralLoad}</td>
										<td>{item.treatment.numberOfDoses >= 5 ? <motion.span animate={{ scale: [1, 2, 1] }} transition={{ duration: 0.2 }} className='badge badge-success'>Done</motion.span> : <motion.span animate={{ scale: [1, 2, 1] }} transition={{ duration: 0.2 }} className='badge badge-warning'>Ongoing</motion.span>}</td>
										<td>{item.treatment.isGeneric == true ? "Generic" : "Bavaria"}</td>
									</tr>
								))}
							</tbody>
						</table>
						:
						<div className=' h-64 rounded-lg border border-gray-300 shadow-md border-dashed flex flex-col items-center justify-around'>
							<span className='text-2xl'>No tracking information yet</span>
							<Link href="/assign-drugs"><button className="btn btn-outline btn-info">Assign Drugs</button></Link>
						</div>
					}
				</div>
			</div>
		</div>
	)

}

export default LiveResults;
