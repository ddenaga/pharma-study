import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { fdaClient, bavariaClient } from '@/lib/vendia';

function LiveResults(props) {
	const [patients, setPatients] = useState(props.data)
	useEffect(() => {
		const res = fdaClient.entities.patient.onUpdate((data) => {
			console.log(data.result)
		});
	}, [])
	return (
		<div className="flex" id="site-content">
			<Sidebar />
			<div className="bg-gray-100 w-full overflow-y-scroll" onClick={console.log(patients)}>
				<div className='flex justify-between items-center'>
					<h1 className='text-4xl m-20'>Live Results</h1>
					<span className="inline-block animate-pulse rounded-full p-2 bg-red-600 text-white text-md mr-20">Study still Ongoing</span>
				</div>
				<div className="overflow-x-auto p-16 ">
					<table className="table table-zebra w-full">

						<thead>
							<tr>
								<th>UUID</th>
								<th>Doses</th>
								<th>HIV Reading</th>
								<th>Status</th>
								<th>Medication</th>
							</tr>
						</thead>
						<tbody>
							{patients.map((patient) => (
								<tr>
									<td>{patient.patientId}</td>
									<td>hallo</td>
									<td>a</td>
									<td>a</td>
									<td>a</td>
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
export async function getServerSideProps() {
	const data = await fdaClient.entities.tracker.list();
	console.log(data)
	return {
		props: {
			data: data.items,
		},
	};
}