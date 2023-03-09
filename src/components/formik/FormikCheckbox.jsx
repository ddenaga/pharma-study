import { useField } from 'formik';

const FormikCheckbox = ({ label, children, className, ...props }) => {
	const [field, meta] = useField({ ...props, type: 'checkbox' });

	return (
		<>
			<div className="flex items-start gap-2">
				<div className="flex h-6 items-center">
					<input
						className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
						type="checkbox"
						{...field}
						{...props}
					/>
				</div>
				<label htmlFor={props.id || props.name} className="font-medium text-gray-900">
					{label}
				</label>
			</div>

			{meta.value ? children : null}

			{meta.touched && meta.error ? <div className="text-red-400">{meta.error}</div> : null}
		</>
	);
};

export default FormikCheckbox;
