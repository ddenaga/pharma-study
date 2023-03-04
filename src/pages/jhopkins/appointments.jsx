import Sidebar from '@/components/Sidebar';
import { useUser } from '@auth0/nextjs-auth0/client';
import { jhClient } from '@/lib/vendia.js'
import React, { useState, useEffect } from "react";
import sorter from "sort-nested-json";


function sortByAppointmentTime(patients) {
    let now = new Date(patients[0].visits[0].dateTime);
    let futurePatients;
    //console.log(patients[0].visits[0].dateTime)
    let modifiedDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + 'T' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + 'Z'
    console.log(now)
    for (let i = 0; i < patients.length; i++) {
        for (let j = 0; j < patients[i].visits.length; j++) {
            //console.log(patients[i].visits[j].dateTime)
            if (patients[i].visits[j].dateTime > now) {
                futurePatients.push(patients[i])
            }
        }
        //console.log(futurePatients)
    }
    //console.log(futurePatients)
    // futurePatients.sort((a, b) => {
    //     const apptTimeA = new Date(a.visits.dateTime).getTime();
    //     const apptTimeB = new Date(b.visits.dateTime).getTime()
    //     if (apptTimeA < apptTimeB) {
    //         return -1;
    //     } else if (apptTimeA > apptTimeB) {
    //         return 1;
    //     } else {
    //         return 0;
    //     }
    // });
    // return futurePatients;
}
function appointments(props) {
    const { user, error, isLoading } = useUser();
    const [sortedPatients, setSortedPatients] = useState([]);

    useEffect(() => {
        const sorted = sortByAppointmentTime(props.data);
        // setSortedPatients(sorted);
        //console.log(sorted)
        const newList = sorter.sort(props.data).asc("visits.dateTime")
        //console.log(newList)
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