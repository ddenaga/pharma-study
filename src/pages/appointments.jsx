import React from 'react'
import Sidebar from '@/components/sidebar'
function appointments() {
    return (
        <div className="flex">
            <Sidebar />
            <div className='bg-gray-100 w-full'>
                <h1 className="text-2xl font-bold">Welcome Message</h1>
            </div>
        </div>
    )
}

export default appointments