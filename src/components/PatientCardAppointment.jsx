import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PatientCardAppointment({ patient, visit }) {
	return (
		<div className="max-w-md cursor-pointer rounded-lg bg-white p-4 leading-5 shadow sm:rounded-lg	">
			<div className="flex flex-row justify-between">
				<div className="flex flex-col justify-between gap-8">
					<div className="flex flex-col">
						<span className="text-base font-semibold leading-6 text-gray-900">{patient.name}</span>
						{/* <span className="text-sm text-gray-500">{patient.dob.split('T')[0]}</span> */}
						{/* <span className="text-sm text-gray-500">{patient.familyHistory}</span> */}
						<span className="text-lg text-gray-500">
							{visit.dateTime && new Date(visit.dateTime).toLocaleString('en-US', {
								hour: 'numeric',
								minute: 'numeric',
								hour12: true,
							})}
						</span>
					</div>
					<div>
						<div className="inline-flex	 cursor-pointer rounded-full border border-slate-200 px-2 text-xs font-semibold leading-5 hover:bg-slate-100 ">
							Enter viral load
						</div>
					</div>
				</div>
				{/* TODO change eligibility to icons */}
				<div className="flex h-full flex-col justify-between ">
					<Image
						src={patient.pictureUrl == '' || patient.pictureUrl == null ? '/../public/favicon.ico' : patient.pictureUrl}
						width="50"
						height="50"
						alt="patient avatar"
						className="rounded-full"
					/>
				</div>
			</div>
		</div>
	);
}
