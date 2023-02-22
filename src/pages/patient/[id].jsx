import React from 'react'
import Sidebar from '@/components/sidebar';

function [id]() {
    return (
        <div className="flex" id="site-content">
            <Sidebar />
            <div className="bg-gray-100 w-full">
                <h1 className="text-2xl font-bold">Welcome back</h1>
            </div>
        </div>
    )
}

export default [id]