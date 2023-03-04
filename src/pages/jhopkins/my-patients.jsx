import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { jhClient } from "@/lib/vendia.js";
import Patient from "@/components/PatientCard";
import { useUser } from "@auth0/nextjs-auth0/client";
import createPatient from "@/lib/createPatient.js";

const patient = {
  name: "Goofy",
  pictureUrl: "",
  dob: "2000-01-01",
  insuranceNumber: "",
  height: 0,
  weight: 0,
  bloodPressure: "",
  bloodType: "A",
  temperature: 100,
  oxygenSaturation: 100,
  address: {
    streetAddress: "1234 ABC Street",
    city: "City",
    state: "State",
    zipCode: 12345,
    country: "US",
  },
  allergies: [],
  medications: [],
  treatmentId: "",
  familyHistory: [],
  isEmployed: true,
  isInsured: false,
  icdHealthCodes: [],
  visits: [],
  isEligible: false,
};

export default function MyPatients(props) {
  const { user, error, isLoading } = useUser();
  const [patients, setPatients] = useState(props.patients);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  async function addPatient() { //update the UI on every patient add
    const newPatient = await createPatient(patient)
    console.log(newPatient.result)
    setPatients([...patients, newPatient.result]);
    console.log(patients)
  }
  async function deletePatients() {
    for (const p of patients) {
      const res = await jhClient.entities.patient.remove(p._id)
    }
    setPatients([])
  }
  return (
    <div className="flex" id="site-content">
      <Sidebar />
      <div className="bg-gray-100 w-full">
        <div className="flex mt-16 justify-between">
          <h1
            className="text-4xl font-bold ml-8 text-zinc-600"
            onClick={() => createPatient(patient)}
          >
            My Patients
          </h1>
          <a href="#" onClick={addPatient}>
            New Patient
          </a>
          <span onClick={deletePatients}>Delete all Patient</span>
        </div>
        <div className="flex flex-wrap justify-between">
          {patients.map((patient) => (
            <Patient
              key={patient._id}
              name={patient.name}
              dob={patient.dob}
              familyHistory={patient.familyHistory}
              id={patient._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await jhClient.entities.patient.list();
  return {
    props: {
      patients: data.items,
    },
  };
}
