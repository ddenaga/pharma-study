import Sidebar from '@/components/Sidebar';
import { jhClient } from '@/lib/vendia';
import EditPatientForm from '@/components/EditPatientForm';

export async function getServerSideProps(context) {
	const { id } = context.params;
	const patient = await jhClient.entities.patient.get(id);

	return {
		props: {
			patient,
		},
	};
}

const EditPatient = (props) => {
	const { patient } = props;

	return (
		<div className="" id="site-content">
			<Sidebar />
			<div className="w-full overflow-y-scroll bg-gray-50 px-4 py-12 pl-20">
				<h2 className="attention-voice col-span-12 mb-12">Edit a Patient</h2>
				<EditPatientForm patient={patient} />
			</div>
		</div>
	);
};

export default EditPatient;
