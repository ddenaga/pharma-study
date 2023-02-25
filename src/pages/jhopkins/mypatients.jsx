import React from 'react'
import Sidebar from '@/components/sidebar';
import { jhClient } from '../../lib/vendia.js'

export async function getServerSideProps() {
    const myData = await jhClient.entities.patient.list();
    return {
        props: {
            data: myData,
        },
    };
}

function mypatients(props) {
    return (
        <div className="flex" id="site-content">
            <Sidebar />
            <div className="bg-gray-100 w-full">
                {/* {props.data.items.map((patient) =>
                    <h1 key={patient._id}>{patient.name}</h1>
                )} */}
            </div>
        </div >
    )
}

export default mypatients