import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import Sidebar from '@/components/Sidebar';
import { jhClient } from '@/lib/vendia.js';
import FormikDatePicker from 'src/components/formik/FormikDatePicker';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import FormikSelect from '@/components/formik/FormikSelect';

export async function getServerSideProps() {
	const data = await jhClient.entities.patient.list();
	const patients = data.items;

	return {
		props: {
			patients,
		},
	};
}

const timeSlots = Array.from({ length: 40 - 9 }, (_, i) => {
	const hour = Math.floor((i + 8) / 2);
	const minute = ((i + 8) % 2) * 30;
	const amPm = hour < 12 ? 'AM' : 'PM';
	const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
	return `${formattedHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${amPm}`;
});

export default function ScheduleAppointment(props) {
	const { patients } = props;

	const [appointments, setAppointments] = useState([]);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedTime, setSelectedTime] = useState('');

	const getPatientById = (id) => {
		return patients.find((patient) => patient._id === id);
	};

	const deleteAppointment = (id) => {
		setAppointments(appointments.filter((appointment) => appointment.id !== id));
	};

	const handleSubmit = (values, { setSubmitting }) => {
		const { appointmentDate, appointmentTime, patientId } = values;
		// Guard clause to ensure all appointment details have been selected
		if (!appointmentDate || !appointmentTime || !patientId) return;

		const updateAppointments = [...appointments, { ...values, id: new Date().getTime() }];
		// Add a new appointment to the list with a unique id
		setAppointments(updateAppointments);

		// Reset the form and setSubmitting to false
		setSubmitting(false);
	};

	return (
		<div className="flex" id="site-content">
			<Sidebar />
			<div className="flex-1 bg-gray-100 p-8">
				<h1 className="title mb-9 text-3xl font-bold">Schedule New Appointment</h1>

				<Formik
					initialValues={{
						patientId: '',
						appointmentDate: new Date(),
						appointmentTime: '',
					}}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting, setFieldValue }) => (
						<Form className="space-y-4">
							<div className="flex flex-col">
								<label htmlFor="patientId" className="mb-1">
									Select Patient:
								</label>
								<FormikSelect name="patientId">
									<option value="">Select a patient</option>
									{patients.map((patient, index) => (
										<option key={index} value={patient._id}>
											{patient.name}
										</option>
									))}
								</FormikSelect>
							</div>
							<div className="flex flex-col md:flex-row md:space-x-4">
								<div className="rounded border p-2">
									<div className="flex flex-col md:flex-row md:space-x-4">
										<div className="flex flex-col">
											<label htmlFor="appointmentDate" className="mb-1">
												Select Date:
											</label>
											<div style={{ width: 'fit-content' }}>
												<div
													style={{
														width: 'fit-content',
														fontSize: '1.5rem',
													}}
												>
													<Calendar
														value={selectedDate}
														onChange={(value) => {
															setSelectedDate(value);
															setFieldValue('appointmentDate', value);
														}}
													/>
												</div>
											</div>
										</div>
										<div className="flex flex-col">
											<label htmlFor="appointmentTime" className="mb-1">
												Select Time:
											</label>
											<div className="h-50 overflow-y-scroll">
												<div className="grid grid-cols-4 gap-2">
													{timeSlots.map((time, index) => (
														<div
															key={index}
															onClick={() => {
																setSelectedTime(time);
																setFieldValue('appointmentTime', time);
															}}
															className={`rounded border p-2 text-center ${
																selectedTime === time ? 'bg-blue-500 text-white' : ''
															}`}
														>
															{time}
														</div>
													))}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="flex-1 rounded border p-2">
									<h2 className="upcoming mb-4 text-xl font-semibold">Upcoming Appointments</h2>
									<ul className="space-y-2">
										{appointments
											.slice()
											.sort((a, b) => {
												const dateA = new Date(a.appointmentDate);
												const dateB = new Date(b.appointmentDate);
												const timeA = a.appointmentTime;
												const timeB = b.appointmentTime;

												if (dateA < dateB) {
													return -1;
												} else if (dateA > dateB) {
													return 1;
												} else {
													// Both dates are the same; compare times
													return timeA.localeCompare(timeB);
												}
											})
											.map((appointment, index) => {
												const patient = getPatientById(appointment.patientId);

												return (
													<li
														key={index}
														className="flex items-center justify-between border-b py-2"
													>
														<span>
															{patient.name} {' - '}
															{new Date(
																appointment.appointmentDate,
															).toLocaleDateString()}{' '}
															{appointment.appointmentTime}
														</span>
														<button
															type="button"
															onClick={() => deleteAppointment(appointment.id)}
															className="rounded bg-red-500 py-1 px-3 text-white"
														>
															Delete
														</button>
													</li>
												);
											})}
									</ul>
								</div>
							</div>
							<button type="submit" className="mt-4 rounded bg-blue-500 py-2 px-4 text-white">
								Create New Appointment
							</button>
							<button
								type="button"
								className="btn"
								onClick={() => {
									appointments.forEach(async (appt) => {
										const patient = getPatientById(appt.patientId);

										// Combine appointmentDate and appointmentTime into
										// appointmentDate is a Date object
										// appointmentTime is a time string

										// Source from: https://stackoverflow.com/a/40197728
										const convertTime12to24 = (time12h) => {
											const [time, modifier] = time12h.split(' ');

											let [hours, minutes] = time.split(':');

											if (hours === '12') {
												hours = '00';
											}

											if (modifier === 'PM') {
												hours = parseInt(hours, 10) + 12;
											}

											return `${hours}:${minutes}`;
										};

										const scheduledDateTime = `${
											appt.appointmentDate.toISOString().split('T')[0]
										}T${convertTime12to24(appt.appointmentTime)}`;

										const visit = {
											dateTime: new Date(scheduledDateTime).toISOString(),
											note: '',
											hivViralLoad: '',
										};

										patient.visits = [...patient.visits, visit];

										// Update the patient's visit in Vendia
										const updatePatient = (({ _id, visits }) => ({ _id, visits }))(patient);
										const res = await jhClient.entities.patient.update(updatePatient);
										console.log(res);
									});

									setAppointments([]);
								}}
							>
								Submit
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
