import React from 'react';
import Image from 'next/image';

export default function PatientCardAdmin({ name, dob, familyHistory, img, id, eligibility }) {
	return (
		<div className="max-w-md rounded-lg bg-white p-4 leading-5 shadow sm:rounded-lg">
			<div className="flex flex-row justify-between">
				<div className="flex flex-col justify-between gap-8">
					<div className="flex flex-col">
						<span className="text-base font-semibold leading-6 text-gray-900">{name}</span>
						<span className="text-sm text-gray-500">{dob.split('T')[0]}</span>
						<span className="text-sm text-gray-500">{familyHistory}</span>
					</div>
					<div>
						<a
							href={`/patient/${id}`}
							className="inline-flex rounded-full border border-slate-200 px-2 text-xs font-semibold leading-5 hover:bg-slate-100"
						>
							More Info
						</a>
					</div>
				</div>

				{/* TODO change eligibility to icons */}
				<div className="flex flex-col items-end justify-between">
					<Image
						src={img == '' ? '/../public/favicon.ico' : img}
						width="50"
						height="50"
						alt="patient avatar"
						className="rounded-full"
					/>
					{eligibility ? (
						<span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800" id='eligible-icon'>
							Eligible
						</span>
					) : (
						<span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800" id='uneligible-icon'>
							Not Eligible
						</span>
					)}
				</div>
			</div>
		</div>
	);
}
