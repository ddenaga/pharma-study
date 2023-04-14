import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { bavariaClient } from '@/lib/vendia';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
		<div className="flex" id="site-content">
			<Sidebar />
			<div className="w-full overflow-y-scroll bg-gray-50 px-20 py-12">
				<h1 className="attention-voice mb-12">Send Drugs</h1>
				<ToastContainer />
				<div className="scrollbar lg:no-scrollbar -mx-4 mt-8 overflow-x-scroll shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
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
									Type
								</th>
								<th scrol="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
									Doses
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 bg-white">
							{treatments.map((treatment, index) => (
								<tr key={treatment._id}>
									<td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
										{treatment._id}
									</td>
									<td className="px-3 py-4 text-sm text-gray-500">
										{treatment.isGeneric ? 'Generic' : 'Bavaria'}
									</td>
									<td className="px-3 py-4 text-sm">
										<div>
											<input
												className="block max-w-[100px] rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:ring-0 sm:text-sm sm:leading-6"
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
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<button
					className="mt-6 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					type="button"
					onClick={() => {
						toast.promise(
							Promise.all(
								treatments.map((treatment) => bavariaClient.entities.treatment.update(treatment)),
							),
							{ success: 'Drugs sent', pending: 'Sending drugs', error: 'Failed to send drugs' },
						);
					}}
				>
					Send
				</button>
			</div>
		</div>
	);
}
