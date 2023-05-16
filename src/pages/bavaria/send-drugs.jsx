import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { bavariaClient } from '@/lib/vendia';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SendDrugsTable from '@/components/SendDrugsTable';

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
	console.log(props);
	const { items } = props;

	const [treatments, setTreatments] = useState(items);

	return (
		<div className="flex" id="site-content"  >
			<Sidebar />
			<div className="w-full overflow-y-scroll bg-gray-50 px-20 py-12">
				<h1 className="attention-voice mb-12">Send Drugs</h1>
				<ToastContainer />
				<div className="scrollbar lg:no-scrollbar -mx-4 mt-8 overflow-x-scroll shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
					<SendDrugsTable
						treatments={treatments}
						setTreatments={setTreatments}
					/>
				</div>

				<button
					className="mt-6 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					type="button"
					onClick={() => {
						// treatments.forEach(async (treatment) => {
						// 	const response = await bavariaClient.entities.treatment.update(treatment);
						// 	console.log(response);
						// });
						toast.promise(
							Promise.all(
								items.map((treatment) => bavariaClient.entities.treatment.update(treatment)),
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
