import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import Sidebar from "@/components/Sidebar";
import { jhClient } from "@/lib/vendia.js";
import FormikDatePicker from "src/components/formik/FormikDatePicker";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


const timeSlots = Array.from({ length: (40 - 9) }, (_, i) => {
  const hour = Math.floor((i + 8) / 2);
  const minute = ((i + 8) % 2) * 30;
  const amPm = hour < 12 ? 'AM' : 'PM';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${amPm}`;
});

const ScheduleAppointment = ({ data }) => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");


  const handleSubmit = (values, { setSubmitting }) => {
    setAppointments([...appointments, values]);
    setSubmitting(false);
    console.log(values)
  };

  useEffect(() => {
    setAppointments((prevAppointments) =>
      [...prevAppointments].sort((a, b) => {
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
    );
  }, [appointments]);

  const onDateChange = (value) => {
    setSelectedDate(value);
  };

  const onTimeClick = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="flex" id="site-content">
      <Sidebar />
      <div className="bg-gray-100 w-full p-8">
        <h1 className="text-xl font-semibold mb-4">Schedule New Appointment</h1>
        <Formik
          initialValues={{
            patientId: "",
            appointmentDate: new Date(),
            appointmentTime: "",
          }}
          onSubmit={handleSubmit}

        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="patientId" className="mb-1">Select Patient:</label>
                <Field as="select" name="patientId" className="p-2 border">
                  <option value="">Select a patient</option>
                  {data.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="border rounded p-2">
                  <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="flex flex-col">
                      <label htmlFor="appointmentDate" className="mb-1">
                        Select Date:
                      </label>
                      <div style={{ width: "fit-content" }}>
                        <Calendar
                          value={selectedDate}
                          onChange={(value) => {
                            onDateChange(value);
                            setFieldValue("appointmentDate", value);
                          }}
                        />
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
                                setFieldValue("appointmentTime", time);
                              }}
                              className={`p-2 text-center border rounded ${selectedTime === time ? "bg-blue-500 text-white" : ""
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
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              >
                Create New Appointment
              </button>

            </Form>
          )}
        </Formik>
        <div>
          <h2 className="text-xl font-semibold mt-8 mb-4">Upcoming Appointments</h2>
          <ul>
            {appointments.map((appointment, index) => (
              <li key={index} className="border-b py-2">
                {appointment.patientId} -{" "}
                {new Date(appointment.appointmentDate).toLocaleDateString()}{" "}
                {appointment.appointmentTime}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const myData = await jhClient.entities.patient.list();
  return {
    props: {
      data: myData.items,
    },
  };
}


export default ScheduleAppointment;



