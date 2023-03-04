import Sidebar from '@/components/sidebar';
import { useUser } from '@auth0/nextjs-auth0/client';
import { jhClient } from '@/lib/vendia.js'
import React, { useState, useEffect } from "react";
import sorter from "sort-nested-json";


function sortByAppointmentTime(patients) {
    const now = new Date();
    //const futurePatients = patients.visits.filter(visit => new Date(visit.dateTime) > now);

    patients.map((patient) => {
        patient.visits.map((visit) => {
            console.log(visit.dateTime);
        })

        //if (typeof patient.visits != 'undefined') {}
    })
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
        // const sorted = sortByAppointmentTime(props.data);
        // setSortedPatients(sorted);
        //console.log(sorted)
        const newList = sorter.sort(props.data).asc("visits.dateTime")
        console.log(newList)
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
                <h1 className="text-2xl font-bold" onClick={display}>{user.name}</h1>
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