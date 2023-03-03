import React from 'react'
import Sidebar from '@/components/sidebar';
import React, { useState, useEffect } from "react";


function newappointment(props) {


    return (
        <div className="flex" id="site-content">
            <Sidebar />
            <div className="bg-gray-100 w-full" onClick={console.log(props)}>
                {/* View content goes here */}
            </div>
        </div>
    )
}

export default newappointment

export async function getServerSideProps() {
    const data = await jhClient.entities.patient.list();
    return {
        props: {
            patients: data.items,
        },
    };
}