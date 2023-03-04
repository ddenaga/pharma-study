import React from 'react'
import Sidebar from '@/components/sidebar';
import { jhClient } from '../../lib/vendia.js'
import AdminPatient from "../../components/patientCardAdmin.jsx"
import { useUser } from '@auth0/nextjs-auth0/client';


export default function mypatients(props) {
    const { user, error, isLoading } = useUser();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    return (
        <div className="flex" id="site-content">
            <Sidebar />
            <div className="bg-gray-100 w-full">
                <div className='flex mt-16 justify-between'>
                    <h1 className="text-4xl font-bold ml-8 text-zinc-600">My Patients</h1>

                </div>
                <div className='flex flex-wrap justify-between'>
                    {props.data.items.map((patient) =>
                        <AdminPatient key={patient._id} name={patient.name} dob={patient.dob} familyHistory={patient.familyHistory} id={patient._id} eligibility={patient.isEligible} />
                    )}
                </div>
            </div>
        </div >
    )
}

export async function getServerSideProps() {
    const myData = await jhClient.entities.patient.list();
    return {
        props: {
            data: myData,
        },
    };
}