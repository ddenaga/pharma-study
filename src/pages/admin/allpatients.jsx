import React from 'react'
import Sidebar from '@/components/sidebar';
import { jhClient } from '../../lib/vendia.js'
import Patient from "../../components/patient_card.jsx"
import { useUser } from '@auth0/nextjs-auth0/client';

const date = new Date();
const showTime = date.getHours()
    + ':' + date.getMinutes();
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
                    <h2 className="text-4xl font-bold mr-10 text-gray-500">
                        {showTime}
                    </h2>
                </div>
                <div className='flex flex-wrap justify-between'>
                    {props.data.items.map((patient) =>
                        <Patient key={patient._id} name={patient.name} dob={patient.dob} familyHistory={patient.familyHistory} id={patient._id} eligibility={patient.isEligible} />
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