import Sidebar from '@/components/Sidebar';
import { useUser } from '@auth0/nextjs-auth0/client';
import { jhClient } from '@/lib/vendia.js';
import React, { useState, useEffect } from 'react';
import PatientCardAppts from '@/components/patientCardAppts';
import { motion } from 'framer-motion';
import Link from 'next/link';
function Appointments(props) {
    const { user, error, isLoading } = useUser();
    const [sortedPatients, setSortedPatients] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [hivReading, setHivReading] = useState();
    const [dose, setDose] = useState(false);
    const [currentPatient, setCurrentPatient] = useState();
    const [notes, setNotes] = useState();
    useEffect(() => {
        const patients = props.data
        const now = new Date().toISOString();
        const clientOffset = new Date().getTimezoneOffset();
        const formatedNow = new Date(now)
        let appt
        const scheduledToday = Array();
        if (patients.length > 0) {
            for (let i = 0; i < patients.length; i++) {
                if (patients[i].visits.length > 0) {
                    for (let j = 0; j < patients[i].visits.length; j++) {
                        if (patients[i].visits[j] != undefined) {
                            appt = new Date(patients[i].visits[j].dateTime).toISOString()
                            let formatedAppt = new Date(appt)
                            if (formatedAppt.getDate() == formatedNow.getDate()) {
                                scheduledToday.push(patients[i])
                            }
                        }

                    }
                }
            }
        }
        setSortedPatients(scheduledToday)
        console.log(sortedPatients)

    }, [props]);

    async function handleSubmit(e) {
        e.preventDefault();
        setShowModal(false);
        const res = await jhClient.entities.patient.update({
            _id: currentPatient,
            visits: {
                dateTime: '2023-03-06T09:15:00Z',
                hivViralLoad: hivReading,
                note: notes,
            },
        });
        console.log(res);
        console.log(notes);
    }
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    return (
        <div className="flex" id="site-content">
            {showModal ? (
                <>
                    <motion.div
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        initial={{ opacity: 0.5, scale: 0.5 }}
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">Enter Dose & HIV Reading</h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <form onSubmit={(e) => handleSubmit(e.event.target)}>
                                    <div className="relative p-6 flex flex-col justify-between">
                                        <div>
                                            <label className="mr-2">
                                                Hiv Reading:
                                                <input
                                                    required
                                                    type="text"
                                                    name="name"
                                                    className="py-2 border ml-16"
                                                    onChange={(e) => setHivReading(e.target.value)}
                                                />
                                            </label>
                                        </div>
                                        <div className="mt-5">
                                            <label>
                                                Adminstered Dose:
                                                <input
                                                    type="checkbox"
                                                    name="doseAdministered"
                                                    className="p-5 ml-5"
                                                    onClick={(e) => setDose(!dose)}
                                                />
                                            </label>
                                        </div>
                                        <div className="mt-5">
                                            <label>
                                                Notes:
                                                <input
                                                    type="textarea"
                                                    name="notes"
                                                    className="border ml-28 py-10"
                                                    onChange={(e) => setNotes(e.target.value)}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-semibold px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="bg-teal-600 text-white active:bg-teal-600 font-semibold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={handleSubmit}
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
            <Sidebar />
            <div className="bg-gray-100 w-full">
                <div className="flex justify-between">
                    <div className="m-10">
                        <h1 className="text-5xl font-bold text-gray-600 text-gray-600">Appointments</h1>
                        <p className="mt-6 text-gray-500 text-lg">You have the following appointments for today</p>
                    </div>
                    <Link
                        href="/jhopkins/new-appointment"
                        className="p-2 border bg-teal-600 text-white rounded-2xl m-20 text-lg"
                    >
                        + New Appointment
                    </Link>
                </div>
                <div className="flex flex-wrap justify-between">
                    {sortedPatients.map((patient) => (
                        <div
                            key={patient._id}
                            onClick={() => {
                                setShowModal(true);
                                setCurrentPatient(patient._id);
                            }}
                        >
                            <PatientCardAppts
                                name={patient.name}
                                dob={patient.dob}
                                familyHistory={patient.familyHistory}
                                id={patient._id}
                                eligibility={true}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Appointments;
export async function getServerSideProps() {
    const myData = await jhClient.entities.patient.list();
    return {
        props: {
            data: myData.items,
        },
    };
}
