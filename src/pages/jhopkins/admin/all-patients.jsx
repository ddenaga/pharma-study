import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { jhClient } from '@/lib/vendia.js';
import PatientCardAdmin from '@/components/patientCardAdmin';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import favicon from "@/public/favicon.ico"
export default function AllPatients(props) {
	const { user, error, isLoading } = useUser();
	const [viewType, setViewType] = useState(true);
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;
	const handleChange = () => {
		setViewType(!viewType);
	};

	return (
		<div className="flex" id="site-content">
			<Sidebar />
			<div className="w-full overflow-y-scroll bg-gray-100">
				{viewType ? (
					<>
						<div className="mt-16 flex justify-between">
							<h1 className="ml-8 text-4xl font-bold text-zinc-600">All Patients</h1>
							<div className="m-5 flex content-center">
								<span className="mr-2">Table</span>
								<input
									type="checkbox"
									className="toggle toggle-lg"
									checked={viewType}
									onChange={handleChange}
								/>
								<span className="ml-2">Cards</span>
							</div>
						</div>
						<div className="flex flex-wrap justify-between">
							{props.data.items.map((patient) => (
								<PatientCardAdmin
									key={patient._id}
									name={patient.name}
									dob={patient.dob}
									familyHistory={patient.familyHistory}
									id={patient._id}
									eligibility={patient.isEligible}
									pic={patient.pictureUrl}
								/>
							))}
						</div>
					</>
				) : (
					<>
						<div className="mt-16 flex justify-between">
							<h1 className="ml-8 text-4xl font-bold text-zinc-600">All Patients</h1>
							<div className="m-5 flex content-center">
								<span className="mr-2">Table</span>
								<input
									type="checkbox"
									className="toggle toggle-lg"
									checked={viewType}
									onChange={handleChange}
								/>
								<span className="ml-2">Cards</span>
							</div>
						</div>
						<div className="overflow-x w-full p-10 ">
							<table className="table w-full">
								{/* head */}
								<thead>
									<tr>
										<th></th>
										<th>Name</th>
										<th>DOB</th>
										<th>Eligibility</th>
										<th></th>
									</tr>
								</thead>
								<tbody onClick={console.log(props.data.items)}>
									{props.data.items.map((patient) => (
										<tr>
											<th>
												<Link href={`../../patient/edit/${patient._id}`}>
													<FontAwesomeIcon icon={faPenToSquare} className="font-thin" />
												</Link>
											</th>
											<td>
												<div className="flex items-center space-x-3">
													<div className="avatar">
														<div className="mask mask-squircle h-12 w-12">
															<Image
																src={patient.pictureUrl ? patient.pictureUrl : favicon}
																width="50"
																height="50"
																alt="patient avatar"
															/>
														</div>
													</div>
													<div>
														<div className="font-bold">{patient.name}</div>
														<div className="text-sm opacity-50">{patient.address.city}</div>
													</div>
												</div>
											</td>
											<td>{patient.dob}</td>
											<td>
												{patient.isEligible ? (
													<span className="badge-success badge-outline badge">Eligible</span>
												) : (
													<span className="badge-error badge-outline badge">
														Not Eligible
													</span>
												)}
											</td>
											<th>
												<Link href={`/patient/${patient._id}`} className="btn-ghost btn-xs btn">
													details
												</Link>
											</th>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export async function getServerSideProps() {
	const myData = await jhClient.entities.patient.list();
	return {
		props: {
			data: myData,
		},
	};
}
