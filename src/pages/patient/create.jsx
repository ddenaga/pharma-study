import React from 'react';
import Sidebar from '@/components/Sidebar';
import CreatePatientForm from '@/components/CreatePatientForm';
import { ToastContainer, toast } from 'react-toastify';

function CreatePatient() {
	return (
		<div className="flex" id="site-content">
			<Sidebar />
			<div className="w-full overflow-y-scroll bg-gray-50 px-4 py-12 pl-20">
				<h2 className="attention-voice col-span-12 mb-12">Create a Patient</h2>
				<ToastContainer />
				<CreatePatientForm />
			</div>
		</div>
	);
}

export default CreatePatient;
