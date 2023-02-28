import React from 'react'
import Sidebar from '@/components/sidebar';

function createPatient() {
    return (
        <div className="flex" id="site-content">
            <Sidebar />
            <div className='w-full  '>
                <form className=" shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/3">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                    </div>


                </form>

            </div>
        </div>
    )
}

export default createPatient