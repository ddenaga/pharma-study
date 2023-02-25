import React from 'react'
import Sidebar from '@/components/sidebar';
import { useRouter } from 'next/router'

export default function patient() {
    const router = useRouter()
    const id = router.query.id
    return (
        <div className="flex" id="site-content">
            <Sidebar />
            <div className="bg-gray-100 w-full">
                <h1 className="text-2xl font-bold">{id}</h1>
            </div>
        </div>
    )
}