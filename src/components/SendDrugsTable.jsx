import { useState } from "react";

export default function SendDrugsTable({ treatments, setTreatments }) {

	return (
		<table className="min-w-full divide-y divide-gray-300">
			<thead className="bg-gray-100">
				<tr>
					<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
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
	);
}
