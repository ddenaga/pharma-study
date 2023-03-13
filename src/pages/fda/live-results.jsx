import React from 'react';
import Sidebar from '@/components/Sidebar';
import { fdaClient } from '@/lib/vendia';

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
	return (
		<div className="flex" id="site-content">
			<Sidebar />
			<div className="w-full bg-gray-100">
				<button
					onClick={() => {
						console.log(props.entities);
					}}
				>
					Click me
				</button>
			</div>
		</div>
	);
}

export default LiveResults;
