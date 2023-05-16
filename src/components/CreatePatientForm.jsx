import createPatient from '@/lib/createPatient';
import { Form, Formik, Field, FieldArray } from 'formik';
import FormikCheckbox from './formik/FormikCheckbox';
import FormikDatePicker from './formik/FormikDatePicker';
import FormikList from './formik/FormikList';
import FormikSelect from './formik/FormikSelect';
import FormikTextInput from './formik/FormikTextInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePatientForm = () => {
	const initialValues = {
		name: '',
		pictureUrl: '',
		dob: new Date('1990/1/1'),
		insuranceNumber: '',
		height: '',
		weight: '',
		bloodPressure: '',
		bloodType: '',
		temperature: '',
		oxygenSaturation: '',
		address: {
			streetAddress: '',
			city: '',
			state: '',
			zipCode: '',
			country: '',
		},
		allergies: [],
		medications: [],
		treatmentId: '',
		familyHistory: [],
		isEmployed: false,
		isInsured: false,
		icdHealthCodes: [],
		visits: [],
		isEligible: false,
	};

	const validationSchema = {};

	const onSubmit = async (values, { resetForm }) => {
		// alert(JSON.stringify(values, null, 2));

		toast.promise(createPatient(values), {
			success: 'Patient created',
			pending: 'Creating patient',
			error: 'Failed to create patient',
		});

		resetForm();
	};

	return (
		<>
			<Formik
				initialValues={initialValues}
				// validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				<Form>
					<div className="grid max-w-md grid-cols-6 gap-6 bg-white py-6 px-4 shadow sm:overflow-hidden sm:rounded-md sm:p-6">
						<div className="col-span-6">
							{/* Name */}
							<FormikTextInput label="Name" name="name" type="text" aria-label="patient name"/>
						</div>
						{/* Date of Birth */}
						<div className="col-span-3 row-start-2" aria-label="patient DOB">
							<FormikDatePicker label="Date of Birth" name="dob" />
						</div>
						{/* Is Employed */}
						<div className="col-span-3 row-start-3">
							<FormikCheckbox label="Is Employed" name="isEmployed" aria-label="patient employment status"/>
						</div>
						{/* Is Insured */}
						<div className="col-span-3 row-start-4">
							<FormikCheckbox label="Is Insured" name="isInsured" aria-label="patient insured status">
								{/* Insurance Number */}
								<FormikTextInput label="Insurance Number" name="insuranceNumber" type="text" aria-label="patient insurance number" />
							</FormikCheckbox>
						</div>
						{/* Height */}
						<div className="col-span-3 row-start-5">
							<FormikTextInput label="Height" name="height" type="text" aria-label="patient's height"/>
						</div>
						{/* Weight */}
						<div className="col-span-3 row-start-5">
							<FormikTextInput label="Weight" name="weight" type="text" aria-label="patient's weight" />
						</div>
						{/* Blood Pressure */}
						<div className="col-span-3 row-start-6">
							<FormikTextInput label="Blood Pressure" name="bloodPressure" type="text" aria-label="patient's blood pressure"/>
						</div>
						{/* Blood Type */}
						<div className="col-span-3 row-start-6">
							<FormikSelect label="Blood Type" name="bloodType" aria-label="patient's blood type">
								<option value="">Select a blood type</option>
								<option value="A">A</option>
								<option value="B">B</option>
								<option value="AB">AB</option>
								<option value="O">O</option>
							</FormikSelect>
						</div>
						{/* Temperature */}
						<div className="col-span-3 row-start-[7]">
							<FormikTextInput label="Temperature" name="temperature" type="text" aria-label="patient's temperature"/>
						</div>
						{/* Oxygen Saturation */}
						<div className="col-span-3 row-start-[7]">
							<FormikTextInput label="Oxygen Saturation" name="oxygenSaturation" type="text" aria-label="patient's oxygen saturation"/>
						</div>
						{/* Address */}
						<div className="col-span-6 row-start-[8]">
							<FormikTextInput label="Street Address" name="address.streetAddress" type="text" aria-label="patient's street adress"/>
						</div>
						<div className="col-span-3 row-start-[9]">
							<FormikTextInput label="City" name="address.city" type="text" aria-label="patient's city"/>
						</div>
						<div className="col-span-3 row-start-[9]">
							<FormikTextInput label="State" name="address.state" type="text" aria-label="patient's state"/>
						</div>
						<div className="col-span-3 row-start-[10]">
							<FormikTextInput label="Country" name="address.country" type="text" aria-label="patient's country"/>
						</div>
						<div className="col-span-3 row-start-[10]">
							<FormikTextInput label="Zip Code" name="address.zipCode" type="text" aria-label="patient's zipcode"/>
						</div>
						{/* Allergies */}
						<div className="col-span-6 row-start-[11]">
							<FormikList label="ICD Health Codes" name="icdHealthCodes" aria-label="patient's ICD healthcodes"/>
						</div>
						{/* Medications */}
						<div className="col-span-6 row-start-[12]">
							<FormikList label="Medications" name="medications" aria-label="patient's medications"/>
						</div>
						{/* Family History */}
						<div className="col-span-6 row-start-[13]">
							<FormikList label="Family History" name="familyHistory" aria-label="patient's family history"/>
						</div>
					</div>

					<button
					aria-label="submit"
						type="submit"
						className="row-start-[14] mt-6 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Submit
					</button>
				</Form>
			</Formik>
		</>
	);
};

export default CreatePatientForm;
