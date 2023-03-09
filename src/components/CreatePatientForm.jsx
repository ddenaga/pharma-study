import { Form, Formik, Field, FieldArray } from 'formik';
import FormikCheckbox from './formik/FormikCheckbox';
import FormikDatePicker from './formik/FormikDatePicker';
import FormikList from './formik/FormikList';
import FormikSelect from './formik/FormikSelect';
import FormikTextInput from './formik/FormikTextInput';

const CreatePatientForm = () => {
	const initialValues = {
		name: '',
		pictureUrl: '',
		dob: '2000-01-01',
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
		allergies: [''],
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

	const onSubmit = async (values) => {
		await new Promise((r) => setTimeout(r, 500));
		alert(JSON.stringify(values, null, 2));
	};

	return (
		<>
			<Formik
				initialValues={initialValues}
				// validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				<Form className="flex flex-col">
					{/* Name */}
					<FormikTextInput label="Name" name="name" type="text" />

					{/* Date of Birth */}
					<FormikDatePicker label="Date of Birth" name="dob" />

					{/* Is Employed */}
					<FormikCheckbox label="Is Employed" name="isEmployed" />

					{/* Is Insured */}
					<FormikCheckbox label="Is Insured" name="isInsured">
						{/* Insurance Number */}
						<FormikTextInput label="Insurance Number" name="insuranceNumber" type="text" />
					</FormikCheckbox>

					{/* Height */}
					<FormikTextInput label="Height" name="height" type="text" />

					{/* Weight */}
					<FormikTextInput label="Weight" name="weight" type="text" />

					{/* Blood Pressure */}
					<FormikTextInput label="Blood Pressure" name="bloodPressure" type="text" />

					{/* Blood Type */}
					<FormikSelect label="Blood Type" name="bloodType">
						<option value="">Select a blood type</option>
						<option value="A">A</option>
						<option value="B">B</option>
						<option value="AB">AB</option>
						<option value="O">O</option>
					</FormikSelect>

					{/* Temperature */}
					<FormikTextInput label="Temperature" name="temperature" type="text" />

					{/* Oxygen Saturation */}
					<FormikTextInput label="Oxygen Saturation" name="oxygenSaturation" type="text" />

					{/* Blood Pressure */}
					<FormikTextInput label="Blood Pressure" name="bloodPressure" type="text" />

					{/* Address */}
					<FormikTextInput label="Street Address" name="bloodPressure" type="text" />
					<FormikTextInput label="City" name="address.city" type="text" />
					<FormikTextInput label="State" name="address.state" type="text" />
					<FormikTextInput label="Country" name="address.country" type="text" />
					<FormikTextInput label="Zip Code" name="address.zipCode" type="text" />

					{/* Allergies */}
					<FormikList label="Allergies" name="allergies" />

					{/* Medications */}
					<FormikList label="Medications" name="medications" />

					{/* Family History */}
					<FormikList label="Family History" name="familyHistory" />

					{/* ICD Health Codes */}
					<FormikList label="ICD Health Codes" name="icdHealthCodes" />

					<button type="submit">Submit</button>
				</Form>
			</Formik>
		</>
	);
};

export default CreatePatientForm;
