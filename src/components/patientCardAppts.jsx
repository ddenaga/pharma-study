import React, { useState, useEffect } from 'react';
import Image from 'next/image';
export default function patient_card({patient, visit}) {
	return (
		<div className="h-30 m-9 flex w-96 items-center justify-between rounded-xl border-2 bg-white p-4 drop-shadow-sm">
			<div>
				<div className="flex flex-col">
					<span className="text-2xl">{patient.name}</span>
					<span className="text-gray-400">{patient.dob.split('T')[0]}</span>
					<span className="text-gray-400">{patient.familyHistory}</span>
                    <span className="text-gray-400">{visit.dateTime}</span>
				</div>
				{/* <div>
                    <span>Enter Dose</span>
                </div> */}
			</div>
			{/* TODO change eligibility to icons */}
			<div className="flex h-full flex-col justify-between ">
				<Image src="/../public/favicon.ico" width="50" height="50" alt="patient avatar" />
			</div>
		</div>
	);
}
