import React from 'react';
import PatientCard from '@/components/PatientCard';

export default function PatientList({ patients, searchInput }) {
	const filteredData = patients.filter((patient) => {
		if (searchInput === '') {
			return patient;
		} else {
			return patient.name.toLowerCase().includes(searchInput);
		}
	});

	return (
		<div
			className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3 xl:gap-4"
			onClick={() => console.log(patients)}
		>
			{filteredData.map((patient, index) => (
				<PatientCard key={index} patient={patient} />
			))}
		</div>
	);
}
