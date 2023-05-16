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
				<ul className="space-y-6 uppercase">
					<motion.li className="flex gap-2 hover:scale-105" whileHover={{ scale: 1.1 }}>
						<Calendar className="hover:bg-green-500" />
						<Link href="/jhopkins/doctor/appointments">Appointments</Link>
					</motion.li>
					<motion.li className="flex gap-2 hover:scale-105" whileHover={{ scale: 1.1 }}>
						<Patient />
						<Link href="/jhopkins/doctor/my-patients">My Patients</Link>
					</motion.li>
					<motion.li className="flex gap-2 hover:scale-105" whileHover={{ scale: 1.1 }}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="h-6 w-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
							/>
						</svg>

						<Link href="/jhopkins/doctor/assistant">Assistant</Link>
					</motion.li>
				</ul>
			);
		}
		if (user?.role == 'admin') {
			return (
				<ul className="flex flex-row gap-8 uppercase lg:flex-col">
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
			);
		}
		if (user?.role == 'fda') {
			return (
				<ul className="flex flex-row gap-8 uppercase lg:flex-col">
					<li className="flex gap-2 hover:scale-105">
						<AssignDrugs />
						<Link href="/fda/assign-drugs">Assign Drugs</Link>
					</li>
					<li className="flex gap-2 hover:scale-105">
						<Live />
						<Link href="/fda/live-results">Live Results</Link>
					</li>
				</ul>
			);
		}
		if (user?.role == 'bavaria') {
			return (
				<ul className="flex flex-row gap-8 uppercase lg:flex-col">
					<li className="flex gap-2 hover:scale-105">
						<SendDrugs />
						<Link href="/bavaria/send-drugs">Send Drugs</Link>
					</li>
					<li className="flex gap-2 hover:scale-105">
						<Reports />
						<Link href="/bavaria/reports">Reports</Link>
					</li>
				</ul>
			);
		}
	}
	return (
		<aside className="flex w-full max-w-none flex-col justify-between border-r border-slate-400 md:flex-row lg:max-w-[250px] lg:flex-col">
			<div className="flex flex-row items-center justify-between p-2 md:gap-10 lg:flex-col lg:items-start lg:gap-20 lg:p-5">
				<div id="logo" className="max-w-[50px]">
					<Link href="/" className="hover:scale-105" alt="logo">
						<Logo />
					</Link>
				</div>
				<div className="">{renderNav()}</div>
			</div>

			<div>
				<div id="time" className="my-15 hidden p-5 lg:visible">
					<time dateTime="2022-02-21" className="text-4xl font-bold">
						<span className="block text-base font-normal">{date}</span> {time}
					</time>
				</div>

				<div id="profile" className="flex flex-row   gap-4 bg-slate-100 p-2 md:justify-between lg:p-5">
					<div className="flex items-center lg:items-start">
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
