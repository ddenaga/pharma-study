import React from 'react'
import Sidebar from '@/components/sidebar';
import { jhClient } from '../../lib/vendia.js'

export async function getServerSideProps(context) {
    const {id} = context.params
    const patient = await jhClient.entities.patient.get(id)
    return {
        props: {
            data: patient,
        },
    };
}
export default function Patient(props) {
    return (
        <div className="flex" id="site-content">
            <Sidebar />
            <div className="bg-gray-100 w-full" onClick={console.log(props.data)}>
                {/* View content goes here */}
            </div>
        </div>
    )
}

