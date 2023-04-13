import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { fdaClient, jhClient } from '@/lib/vendia';

export async function getServerSideProps() {
	const data = await fdaClient.entities.patient.list({
		filter: {
			isEligible: {
				eq: true,
			},
		},
	});
	return {
		props: {
			data: data.items,
		},
	};
}

export default function AssignDrugs({ data }) {
	const [isDisabled, setIsDisabled] = useState(Array(data).fill(false));

	async function handleUpdate(patientId, drug, index) {
		const res = await fdaClient.entities.treatment.add({
			isGeneric: drug,
			numberOfDoses: 0,
		});
		const treatmentId = res.result._id;
		const trackerRes = fdaClient.entities.tracker.add({
			treatmentId: treatmentId,
			patientId: patientId,
		});
		const patientRes = fdaClient.entities.patient.update({
			_id: patientId,
			treatmentId: treatmentId,
		});
		const newDisabled = [...isDisabled];
		newDisabled[index] = true;
		setIsDisabled(newDisabled);
		console.log('click called');
	}

	async function deleteTracks() {
		console.log('called');
		const trackers = await jhClient.entities.tracker.list();
		const res = await jhClient.entities.treatment.list();
		const pat = await jhClient.entities.patient.list();
		trackers.items.forEach((item) => {
			const res = fdaClient.entities.tracker.remove(item._id);
			console.log(res);
		});
		res.items.forEach((item) => {
			const res = fdaClient.entities.treatment.remove(item._id);
			console.log(res);
		});
		pat.items.forEach((item) => {
			const res = jhClient.entities.treatment.update({
				_id: item._id,
				treatmentId: '0',
			});
			console.log(res);
		});
		console.log(pat.items);
	}
	return (
		<div className="flex" id="site-content">
			<Sidebar />
			<div className="w-full overflow-y-scroll bg-gray-50 px-20 py-12">
				<div className="" onClick={console.log(data)}>
					<h1 className="attention-voice mb-12" onClick={deleteTracks}>
						Assign Drugs
					</h1>
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
								<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
									Blood Pressure
								</th>
								<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
									Height
								</th>
								<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
									Weight
								</th>
								<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
									Oxygen Saturation
								</th>
								<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
									Temperature
								</th>
								<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
									Assign Drug
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 bg-white">
							{data.map((item, index) => (
								<tr key={item._id}>
									<td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
										{item._id}
									</td>
									<td className="px-3 py-4 text-sm text-gray-500">{item.bloodPressure}</td>
									<td className="px-3 py-4 text-sm text-gray-500">{item.height}</td>
									<td className="px-3 py-4 text-sm text-gray-500">{item.weight}</td>
									<td className="px-3 py-4 text-sm text-gray-500">{item.oxygenSaturation}</td>
									<td className="px-3 py-4 text-sm text-gray-500">{item.temperature}</td>
									<td className="px-3 py-4 text-sm text-gray-500">
										{item.treatmentId === null || item.treatmentId == '0' ? (
											<div className="flex gap-2">
												<button
													className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
													onClick={() => handleUpdate(item._id, false, index)}
													disabled={isDisabled[index]}
												>
													Bavaria
												</button>
												<button
													className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
													disabled={isDisabled[index]}
													onClick={() => handleUpdate(item._id, true, index)}
												>
													Generic
												</button>
											</div>
										) : (
											<button
												className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
												disabled
											>
												Assigned
											</button>
										)}
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
