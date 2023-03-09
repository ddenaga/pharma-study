import { FieldArray, Field } from 'formik';
import { useState } from 'react';
import Close from '../icons/Close';

const FormikList = ({ label, className, ...props }) => {
	const { name } = props;
	const [value, setValue] = useState('');

	return (
		<FieldArray name={name}>
			{(fieldArrayProps) => {
				const { push, remove, form } = fieldArrayProps;
				const { values } = form;
				const { [name]: vals } = values;
				return (
					<>
						<label htmlFor={name}>{label}</label>
						<input
							className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:ring-0 sm:text-sm sm:leading-6"
							value={value}
							onChange={(e) => setValue(e.target.value)}
							{...props}
						/>

						<button
							className="btn-outline btn-xs btn mt-2"
							type="button"
							onClick={() => {
								push(value);
								setValue('');
							}}
						>
							Add
						</button>
						{vals.length > 0 && (
							<ul>
								{vals.map((item, index) => (
									<li key={index} className="flex flex-row gap-2">
										<p className="text-gray-700">{item}</p>
										<button
											className="rounded-full hover:bg-slate-100"
											type="button"
											onClick={() => remove(index)}
										>
											<Close />
										</button>
									</li>
								))}
							</ul>
						)}
					</>
				);
			}}
		</FieldArray>
	);
};

export default FormikList;
