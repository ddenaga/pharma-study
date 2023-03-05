import Sidebar from '@/components/Sidebar';
import { useUser } from '@auth0/nextjs-auth0/client';
import { jhClient } from '@/lib/vendia.js'
import React, { useState, useEffect } from "react";
import sorter from "sort-nested-json";

function appointments(props) {
    const { user, error, isLoading } = useUser();
    const [sortedPatients, setSortedPatients] = useState([]);

    useEffect(() => {
        const patients = props.data
        const now = new Date().toISOString();
        const clientOffset = new Date().getTimezoneOffset();
        const formatedNow = new Date(now.getTime() - (clientOffset * 60000))
        let appt
        const scheduledToday = Array();
        for (let i = 0; i < patients.length; i++) {
            appt = new Date(patients[i].visits[0].dateTime).toISOString()
            let formatedAppt = new Date(appt)
            console.log((formatedNow) + "   " + formatedAppt)
            if (formatedAppt.getDate() == formatedNow.getDate()) {
                scheduledToday.push(patients[i])
            }
        }
        console.log(scheduledToday)
    }, [props]);

    function display() {
        console.log(user)
    }
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    return (
        <div className="flex" id="site-content">
            <Sidebar />
            <div className="bg-gray-100 w-full">
                <div className='flex justify-between'>
                    <div className='m-10'>
                        <h1 className="text-5xl font-bold text-gray-600 text-gray-600" onClick={display}>Appointments</h1>
                        <p className="mt-6 text-gray-500 text-lg">You have the following appointments for today</p>
                    </div>
                    <a href="/jhopkins/new-appointment" className="p-2 border bg-teal-600 text-white rounded-2xl m-20 text-lg">
                        + New Appointment
                    </a>
                </div>
                {/* View content goes here */}
            </div>
        </div>
    );
}

export default appointments;
export async function getServerSideProps() {
    const myData = await jhClient.entities.patient.list();
    return {
        props: {
            data: myData.items,
        },
    };
}