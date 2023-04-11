import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { bavariaClient } from '@/lib/vendia';

export async function getServerSideProps() {
	const listResponse = await bavariaClient.entities.treatment.list();

	const items = listResponse.items;
	items.forEach((item) => delete item._owner);

	return {
		props: {
			items,
		},
	};
}

export default function SendDrugs(props) {
	const { items } = props;

	const [treatments, setTreatments] = useState(items);

	return (
		<div className="flex" id="site-content" >
			<Sidebar />
			<div className="w-full bg-gray-100">
				<table className="table-zebra table w-full shadow-xl">
					<thead>
						<tr>
							<th>UUID</th>
							<th>Type</th>
							<th>Doses</th>
						</tr>
					</thead>
					<tbody>
						{treatments.map((treatment, index) => (
							<tr key={treatment._id}>
								<td>{treatment._id}</td>
								<td>{treatment.isGeneric ? 'Generic' : 'Bavaria'}</td>
								<td>
									<input
										className="input w-16"
										name="numberOfDoses"
										type="number"
										value={treatment.numberOfDoses}
										min="1"
										onChange={(event) => {
											const { name, value } = event.target;
											const data = [...treatments];

											data[index][name] = parseInt(value);
											setTreatments(data);
										}}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<button
					className="btn"
					type="button"
					onClick={async () => {
						// console.log(treatments);
						treatments.forEach(
							async (treatment) => await bavariaClient.entities.treatment.update(treatment),
						);
					}}
				>
					Send
				</button>
			</div>
		</div>
	);
}
