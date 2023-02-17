import React from 'react'

function sidebar() {
    return (
        <div className='flex w-80 h-screen border-r-2 drop-shadow-lg'>
            <div className="flex flex-row">
                <span>Vendia</span>
                <a href='#'>Appointments</a>
                <a href='#'>My Patients</a>
            </div>
        </div>
    )
}

export default sidebar