import { useField } from 'formik';

const FormikCheckbox = ({ label, children, ...props }) => {
	const [field, meta] = useField({ ...props, type: 'checkbox' });

	return (
		<div>
			<label htmlFor={props.id || props.name}>{label}</label>

			<input className='checkbox' type="checkbox" {...field} {...props} />
            
			{meta.value ? children : null}

			{meta.touched && meta.error ? <div className="text-red-400">{meta.error}</div> : null}
		</div>
	);
};

export default FormikCheckbox;
