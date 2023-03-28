import React from "react";
import Image from "next/image";
export default function PatientCard(props) {

    const { patient } = props;

    return (
        <div className="flex w-96 h-30 shadow-lg border-2 m-9 bg-white rounded-xl justify-between items-center p-4">
            <div>
                <div className="flex flex-col">
                    <span className="text-2xl">{patient.name}</span>
                    <span className="text-gray-400">{patient.dob}</span>
                    <span className="text-gray-400">{patient.familyHistory}</span>
                </div>
                <div>
                    <a href={`/patient/${patient._id}`} className="mt-5">
                        More Info
                    </a>
                </div>
            </div>
            {/* TODO change eligibility to icons */}
            <div className="flex flex-col justify-between h-full items-center">
                <Image
                    src={patient.pictureUrl == "" ? "/../public/favicon.ico" : patient.pictureUrl}
                    width="50"
                    height="50"
                    alt="patient avatar"
                />
                {patient.isEligible ? (
                    <span className="badge-success badge-outline badge">Eligible</span>
                ) : (
                    <span className="badge-error badge-outline badge">Not Eligible</span>
                )}
            </div>
        </div>
    );
}