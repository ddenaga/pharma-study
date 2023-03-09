import React from "react";
import Patient from "@/components/PatientCard";
export default function PatientList({ patients, searchInput }) {
  const filteredData = patients.filter((patient) => {
    if (searchInput === "") {
      return patient;
    } else {
      return patient.name.toLowerCase().includes(searchInput);
    }
  });

  return (
    <div
      className="flex flex-wrap justify-between bg-scroll"
      onClick={console.log(patients)}
    >
      {filteredData.map((patient) => (
        <Patient
          key={patient._id}
          name={patient.name}
          dob={patient.dob}
          familyHistory={patient.familyHistory}
          id={patient._id}
          eligibility={patient.isEligible}
        />
      ))}
    </div>
  );
}
