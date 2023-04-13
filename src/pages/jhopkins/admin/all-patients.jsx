import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { jhClient } from '@/lib/vendia.js';
import PatientCardAdmin from '@/components/patientCardAdmin';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function AllPatients(props) {
	const { user, error, isLoading } = useUser();
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;
	return (
		<div className="flex" id="site-content">
			<Sidebar />
			<div className="w-full overflow-y-scroll bg-gray-50 px-20 py-12">
				<div className="">
					<h1 className="attention-voice mb-12">All Patients</h1>
				</div>
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 xl:gap-8">
					{props.data.items.map((patient) => (
						<PatientCardAdmin
							key={patient._id}
							name={patient.name}
							dob={patient.dob}
							familyHistory={patient.familyHistory}
							id={patient._id}
							eligibility={patient.isEligible}
							img={patient.pictureUrl}
						/>
					))}
				</div>
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
