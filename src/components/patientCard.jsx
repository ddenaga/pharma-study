import React from 'react'
import Image from 'next/image'
export default function patient_card({ name, dob, familyHistory, img, id }) {
    return (
        <div className='flex w-96 h-30 drop-shadow-sm border-2 m-9 bg-white rounded-xl justify-between items-center p-4'>
            <div>
                <div className='flex flex-col'>
                    <span className='text-2xl'>{name}</span>
                    <span className='text-gray-400'>{dob}</span>
                    <span className='text-gray-400'>{familyHistory}</span>
                </div>
                <div>
                    <a href={`/patient/${id}`} className='mt-5'>More Info</a>
                </div>
            </div>
            {/* TODO change eligibility to icons */}
            <div className='flex flex-col justify-between h-full '>
                <Image src="/../public/favicon.ico" width="50" height="50" alt="patient avatar" />
            </div>
        </div >
    )
}
