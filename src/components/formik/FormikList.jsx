import { FieldArray, Field } from 'formik';
import { useState } from 'react';

const FormikList = ({ label, ...props }) => {
	const { name } = props;

	const [value, setValue] = useState('');

	return (
		<FieldArray name={name}>
			{(fieldArrayProps) => {
				const { push, remove, form } = fieldArrayProps;
				const { values } = form;
				const { [name]: vals } = values;
				return (
					<div>
						<label htmlFor={name}>{label}</label>
						<input
							className="input input-bordered"
							value={value}
							onChange={(e) => setValue(e.target.value)}
							{...props}
						/>

						<button
							className="btn btn-outline btn-xs"
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
									<li key={index}>
										{item}
										<button
											className="btn btn-outline btn-xs"
											type="button"
											onClick={() => remove(index)}
										>
											Remove
										</button>
									</li>
								))}
							</ul>
						)}
					</div>
				);
			}}
		</FieldArray>
	);
};

export default FormikList;
