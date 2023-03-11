import React, { useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { jhClient } from '@/lib/vendia';

function LiveResults() {
	useEffect(() => {
		const res = jhClient.entities.patient.onUpdate((data) => {
			console.log(data.result)
		});
		}, [])
	return (
		<div className="flex" id="site-content">
			<Sidebar />
			<div className="bg-gray-100 w-full">{/* View content goes here */}</div>
		</div>
	);
}

export default LiveResults;
