import React, { useEffect, useState } from 'react';
import Calendar from './icons/Calendar';
import Patient from './icons/Patient';
import Logout from './icons/Logout';
import { useUser } from '@auth0/nextjs-auth0/client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Logo from './icons/Logo';
import Reports from './icons/Reports';
import SendDrugs from './icons/SendDrugs';
import AssignDrugs from './icons/AssignDrugs';
import Live from './icons/Live';
import AllPatients from './icons/AllPatients';
export default function Sidebar() {
	const [date, setDate] = useState(null);
	const [time, setTime] = useState(null);

	useEffect(() => {
		// load the date client side... to prevent server hydration bug
		const newDate = new Date();
		setDate(newDate.toDateString());
		setTime(newDate.getHours() + ':' + newDate.getMinutes());
	}, []);
	const { user, error, isLoading } = useUser();
	function renderNav() {
		if (user?.role == 'doctor') {
			return (
				<nav>
					<ul className="space-y-6 uppercase">
						<motion.li className="flex gap-2 hover:scale-105" whileHover={{ scale: 1.1 }}>
							<Calendar className="hover:bg-green-500" />
							<Link href="/jhopkins/doctor/appointments">Appointments</Link>
						</motion.li>
						<motion.li className="flex gap-2 hover:scale-105" whileHover={{ scale: 1.1 }}>
							<Patient />
							<Link href="/jhopkins/doctor/my-patients">My Patients</Link>
						</motion.li>
					</ul>
				</nav>
			);
		}
		if (user?.role == 'admin') {
			return (
				<nav>
					<ul className="space-y-6 uppercase">
						<li className="flex gap-2 hover:scale-105">
							<AllPatients />
							<Link href="/jhopkins/admin/all-patients">All Patients</Link>
						</li>
						<li className="flex gap-2 hover:scale-105">
							<Live />
							<Link href="/jhopkins/admin/live-results">Live Results</Link>
						</li>
						<li className="flex gap-2 hover:scale-105">
							<Patient />
							<Link href="/patient/create">Create patient</Link>
						</li>
					</ul>
				</nav>
			);
		}
		if (user?.role == 'fda') {
			return (
				<nav>
					<ul className="space-y-6 uppercase">
						<li className="flex gap-2 hover:scale-105">
							<AssignDrugs />
							<Link href="/fda/assign-drugs">Assign Drugs</Link>
						</li>
						<li className="flex gap-2 hover:scale-105">
							<Live />
							<Link href="/fda/live-results">Live Results</Link>
						</li>
					</ul>
				</nav>
			);
		}
		if (user?.role == 'bavaria') {
			return (
				<nav>
					<ul className="space-y-6 uppercase">
						<li className="flex gap-2 hover:scale-105">
							<SendDrugs />
							<Link href="/bavaria/send-drugs">Send Drugs</Link>
						</li>
						<li className="flex gap-2 hover:scale-105">
							<Reports />
							<Link href="/bavaria/reports">Reports</Link>
						</li>
					</ul>
				</nav>
			);
		}
	}
	return (
		<aside className="flex w-full max-w-xs flex-col justify-between border-r border-slate-400">
			<div className="flex flex-col gap-20 p-5">
				<div id="logo" className="max-w-[50px]">
					<Link href="/" className='hover:scale-105' alt="logo">
						<Logo />
					</Link>
				</div>
				{renderNav()}
			</div>

			<div>
				<div id="time" className="my-15 p-5">
					<time dateTime="2022-02-21" className="text-4xl font-bold">
						<span className="block text-base font-normal">{date}</span> {time}
					</time>
				</div>

				<div id="profile" className="flex flex-row justify-between gap-4 bg-slate-100 p-5">
					<div className="flex">
						<picture className="mr-2 h-[50px] w-[50px] overflow-hidden rounded-full">
							<img src="https://peprojects.dev/images/portrait.jpg" alt="" />
						</picture>
						<div>
							<p className="font-medium">{user?.name}</p>
							{user?.role == 'doctor' && <p>Doctor Specialist</p>}
						</div>
					</div>
					<Link href="/api/auth/logout" className="mt-1" alt="Logout">
						<Logout />
					</Link>
				</div>
			</div>
		</aside>
	);
}
