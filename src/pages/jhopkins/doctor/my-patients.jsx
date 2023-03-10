import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { jhClient } from "@/lib/vendia.js";
import { useUser } from "@auth0/nextjs-auth0/client";
import createPatient from "@/lib/createPatient.js";
import { motion } from "framer-motion";
import PatientList from "@/components/PatientList";

const patient = {
  name: "Anthony",
  pictureUrl: "",
  dob: "2000-01-01",
  insuranceNumber: "AC1234H",
  height: "200",
  weight: "180",
  bloodPressure: "12.3",
  bloodType: "A",
  temperature: "100",
  oxygenSaturation: "100",
  address: {
    streetAddress: "1234 Hollywood Street",
    city: "Los Angeles",
    state: "CA",
    zipCode: 12345,
    country: "US",
  },
  allergies: [

  ],
  medications: [],
  treatmentId: "",
  familyHistory: [],
  isEmployed: true,
  isInsured: false,
  icdHealthCodes: [],
  visits: [
    {
      dateTime: "2023-03-08T09:15:00Z",
      note: "He's sick",
      hivViralLoad: "12.5",
    },
  ],
  isEligible: false,
};

export default function MyPatients(props) {
  const { user, error, isLoading } = useUser();
  const [patients, setPatients] = useState(props.patients);
  const [searchInput, setSearchInput] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  async function addPatient() {
    //update the UI on every patient add
    const newPatient = await createPatient(patient);
    // console.log(newPatient.result);
    setPatients([...patients, newPatient.result]);
    // console.log(patients);
  }
  async function deletePatients() {
    for (const p of patients) {
      const res = await jhClient.entities.patient.remove(p._id);
    }
    setPatients([]);
  }

  function handleChange(e) {
    e.preventDefault;
    setSearchInput(e.target.value);
  }
  return (
    <div className="flex" id="site-content">
      <Sidebar />
      <div className="bg-gray-100 w-full ">
        <div className="flex mt-16 justify-between">
          <h1
            className="text-4xl font-bold ml-10 text-zinc-600"
            onClick={() => createPatient(patient)}
          >
            My Patients
          </h1>
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="#"
            onClick={addPatient}
            className="p-2 border bg-teal-600 text-white rounded-2xl"
          >
            + New Patient
          </motion.a>
          <motion.span
            onClick={deletePatients}
            className="p-2 border bg-red-500 text-white"
            whileHover={{ scale: 1.2 }}
          >
            Delete all Patient
          </motion.span>
        </div>
        <div>
          <form className="max-w-sm px-4 mt-10 ml-5 w-92">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none  focus:bg-white focus:border-indigo-600"
                onChange={handleChange}
                value={searchInput}
              />
            </div>
          </form>
        </div>
        {/* sourced out to a separatecomponent to enabble search option */}
        <PatientList patients={patients} searchInput={searchInput} />
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
