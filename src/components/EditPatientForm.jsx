import { jhClient } from '@/lib/vendia';
import { Form, Formik, Field, FieldArray } from 'formik';
import FormikCheckbox from './formik/FormikCheckbox';
import FormikDatePicker from './formik/FormikDatePicker';
import FormikList from './formik/FormikList';
import FormikSelect from './formik/FormikSelect';
import FormikTextInput from './formik/FormikTextInput';

const EditPatientForm = (props) => {
	const initialValues = props.patient;
	delete initialValues._owner;
	initialValues.dob = new Date(initialValues.dob);

	const validationSchema = {};

	const onSubmit = async (values) => {
		// await new Promise((r) => setTimeout(r, 500));
		alert(JSON.stringify(values, null, 2));
		const saveResponse = await jhClient.entities.patient.update(values);
		console.log(saveResponse);
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
							<FormikTextInput label="Name" name="name" type="text" />
						</div>
						{/* Date of Birth */}
						<div className="col-span-3 row-start-2">
							<FormikDatePicker label="Date of Birth" name="dob" />
						</div>
						{/* Is Employed */}
						<div className="col-span-3 row-start-3">
							<FormikCheckbox label="Is Employed" name="isEmployed" />
						</div>
						{/* Is Insured */}
						<div className="col-span-3 row-start-4">
							<FormikCheckbox label="Is Insured" name="isInsured">
								{/* Insurance Number */}
								<FormikTextInput label="Insurance Number" name="insuranceNumber" type="text" />
							</FormikCheckbox>
						</div>
						{/* Height */}
						<div className="col-span-3 row-start-5">
							<FormikTextInput label="Height" name="height" type="text" />
						</div>
						{/* Weight */}
						<div className="col-span-3 row-start-5">
							<FormikTextInput label="Weight" name="weight" type="text" />
						</div>
						{/* Blood Pressure */}
						<div className="col-span-3 row-start-6">
							<FormikTextInput label="Blood Pressure" name="bloodPressure" type="text" />
						</div>
						{/* Blood Type */}
						<div className="col-span-3 row-start-6">
							<FormikSelect label="Blood Type" name="bloodType">
								<option value="">Select a blood type</option>
								<option value="A">A</option>
								<option value="B">B</option>
								<option value="AB">AB</option>
								<option value="O">O</option>
							</FormikSelect>
						</div>
						{/* Temperature */}
						<div className="col-span-3 row-start-[7]">
							<FormikTextInput label="Temperature" name="temperature" type="text" />
						</div>
						{/* Oxygen Saturation */}
						<div className="col-span-3 row-start-[7]">
							<FormikTextInput label="Oxygen Saturation" name="oxygenSaturation" type="text" />
						</div>
						{/* Address */}
						<div className="col-span-6 row-start-[8]">
							<FormikTextInput label="Street Address" name="address.streetAddress" type="text" />
						</div>
						<div className="col-span-3 row-start-[9]">
							<FormikTextInput label="City" name="address.city" type="text" />
						</div>
						<div className="col-span-3 row-start-[9]">
							<FormikTextInput label="State" name="address.state" type="text" />
						</div>
						<div className="col-span-3 row-start-[10]">
							<FormikTextInput label="Country" name="address.country" type="text" />
						</div>
						<div className="col-span-3 row-start-[10]">
							<FormikTextInput label="Zip Code" name="address.zipCode" type="text" />
						</div>
						{/* Allergies */}
						<div className="col-span-6 row-start-[11]">
							<FormikList label="ICD Health Codes" name="icdHealthCodes" />
						</div>
						{/* Medications */}
						<div className="col-span-6 row-start-[12]">
							<FormikList label="Medications" name="medications" />
						</div>
						{/* Family History */}
						<div className="col-span-6 row-start-[13]">
							<FormikList label="Family History" name="familyHistory" />
						</div>
					</div>

					<button
						type="submit"
						className=" row-start-[14]group mt-6 inline-flex items-center justify-center rounded-md bg-slate-900 py-2 px-3 text-sm font-semibold text-white hover:bg-slate-700 hover:text-slate-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 active:bg-slate-800 active:text-slate-300"
					>
						Save
					</button>
				</Form>
			</Formik>
		</>
	);
};

export default EditPatientForm;
