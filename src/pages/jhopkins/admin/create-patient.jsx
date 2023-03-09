import React from 'react';
import Sidebar from '@/components/Sidebar';
import CreatePatientForm from '@/components/CreatePatientForm';

function CreatePatient() {
	return (
		<div className="flex" id="site-content">
			<Sidebar />
			<CreatePatientForm />
		</div>
	);
}

export default CreatePatient;