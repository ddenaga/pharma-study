import React from 'react'
import Image from 'next/image'
import image from "../../public/logo.svg"
import { BsFillCalendarCheckFill } from 'react-icons/bs'
import { FaBed } from 'react-icons/fa'
function sidebar() {
    return (
        <div className='flex w-80 h-screen border-r-2 drop-shadow-lg flex-col justicy-center items-center'>

            <div className='h-44'>
                <span className='text-3xl font-semibold h-full'>Pharma Study</span>
            </div>

            <div className="flex flex-col h-50 justify-center items-start w-full">
                <div className='flex flex-row jusify-between'>
                    <BsFillCalendarCheckFill className='text-2xl' />
                    <a href='#'>Appointments</a>
                </div>
                <div className='flex justify-center content-center'>
                    <FaBed className='text-3xl' />
                    <a href='#'>My Patients</a>
                </div>
            </div>
        </div>
    )
}

export default sidebar