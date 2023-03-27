import React from 'react';
import Image from 'next/image';
export default function patient_card({ name, dob, familyHistory, img, id, eligibility, pic }) {
	return (
		<div className="h-30 m-9 flex w-96 items-center justify-between rounded-xl border-2 bg-white p-4 drop-shadow-sm">
			<div>
				<div className="flex flex-col">
					<span className="text-2xl">{name}</span>
					<span className="text-gray-400">{dob}</span>
					<span className="text-gray-400">{familyHistory}</span>
				</div>
				<div>
					<a href={`/patient/${id}`} className="mt-5">
						More Info
					</a>
				</div>
			</div>
			{/* TODO change eligibility to icons */}
			<div className="flex h-full flex-col justify-between ">
				<Image src={pic == '' ? '/../public/favicon.ico' : pic} width="50" height="50" alt="patient avatar" />
				{eligibility ? (
					<span className="badge-success badge-outline badge">Eligible</span>
				) : (
					<span className="badge-error badge-outline badge">Not Eligible</span>
				)}
			</div>
		</div>
	);
}
