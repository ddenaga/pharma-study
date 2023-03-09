import { useField } from 'formik';

const FormikSelect = ({ label, className, ...props }) => {
	const [field, meta] = useField(props);

	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<select
				className="mt-2 block w-full rounded-md border-0 bg-white bg-[right_0.5rem_center] py-1.5 px-3 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:ring-0 sm:text-sm sm:leading-6"
				{...field}
				{...props}
			/>
			{meta.touched && meta.error ? <div className="text-red-400">{meta.error}</div> : null}
		</>
	);
};

export default FormikSelect;
