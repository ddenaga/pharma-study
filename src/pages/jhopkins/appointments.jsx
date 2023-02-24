import React from 'react';
import Sidebar from '@/components/sidebar';
import { useUser } from '@auth0/nextjs-auth0/client';
import {jhClient} from '../../lib/vendia'


async function getPatient(){
    const patients = await jhClient.entities.get("0186814b-0c6c-d820-0ec2-021b8bb7f250");
    console.log(patients)
}

function appointments() {
    // const { user, error, isLoading } = useUser();
    return (
        <div className="flex" id="site-content">
            <Sidebar />
            <div className="bg-gray-100 w-full">
                <h1 className="text-2xl font-bold" onClick={getPatient()}>Welcome back</h1>
                {/* View content goes here */}
            </div>
        </div>
    );
}

export default appointments;
