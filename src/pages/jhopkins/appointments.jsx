import React from 'react'
import Sidebar from '@/components/sidebar'
import { useUser } from '@auth0/nextjs-auth0/client';

function appointments() {
    const { user, error, isLoading } = useUser();
    return (
        <div className="flex">
            <Sidebar />
            <div className='bg-gray-100 w-full'>
                <h1 className="text-2xl font-bold">Welcome back</h1>
            </div>
        </div>
    )
}

export default appointments