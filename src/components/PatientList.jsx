import React from 'react';
import PatientCard from '../components/PatientCard';

export default function PatientList({ patients, searchInput }) {
	const filteredData = patients.filter((patient) => {
		if (searchInput === '') {
			return patient;
		} else {
			return patient.name.toLowerCase().includes(searchInput);
		}
	});

	return (
		<div className="flex flex-wrap justify-between bg-scroll" onClick={() => console.log(patients)}>
			{filteredData.map((patient) => (
				<PatientCard patient={patient} />
			))}
		</div>
	);
}
