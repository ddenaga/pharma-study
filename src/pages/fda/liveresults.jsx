import React from 'react'
import Sidebar from '@/components/sidebar';

function liveresults() {
    return (
        <div className="flex" id="site-content">
            <Sidebar />
            <div className="bg-gray-100 w-full">
                {/* View content goes here */}
            </div>
        </div>
    )
}

export default liveresults