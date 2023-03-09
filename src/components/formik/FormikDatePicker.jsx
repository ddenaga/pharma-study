import { useField } from 'formik';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FormikDatePicker = ({ label, className, ...props }) => {
	const [field, meta, helpers] = useField(props);
	const { value } = meta;
	const { setValue } = helpers;
	const [date, setDate] = useState(new Date(value));
	return (
		<>
			<label htmlFor={props.id || props.name} className="block text-sm font-medium leading-6 text-gray-900">
				{label}
			</label>

			<ReactDatePicker
				{...field}
				{...props}
				className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:ring-0 sm:text-sm sm:leading-6"
				showIcon
				selected={date}
				onChange={(date) => {
					setValue(date);
					setDate(date);
				}}
			/>
		</>
	);
};

export default FormikDatePicker;
