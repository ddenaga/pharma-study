import { useField } from 'formik';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FormikDatePicker = ({label, ...props }) => {
	const [field, meta, helpers] = useField(props);
	const { value } = meta;
	const { setValue } = helpers;
	const [date, setDate] = useState(new Date(value));

	return (
		<div>
			<label htmlFor={props.id || props.name}>{label}</label>
			<ReactDatePicker
				{...field}
				{...props}
				selected={date}
				onChange={(date) => {
					setValue(date);
					setDate(date);
				}}
			/>
		</div>
	);
};

export default FormikDatePicker;
