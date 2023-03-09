import { useField } from 'formik';

const FormikTextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);

	return (
		<div>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input className='input input-bordered' {...field} {...props} />
			{meta.touched && meta.error ? <div className="text-red-400">{meta.error}</div> : null}
		</div>
	);
};

export default FormikTextInput;
