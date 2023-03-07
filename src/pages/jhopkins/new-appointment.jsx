import React from "react";
import Sidebar from "@/components/Sidebar";

function NewAppointment() {
  return (
    <div className="flex" id="site-content">
      <Sidebar />
      <div className="bg-gray-100 w-full">
        <h1>New Appointment</h1>
        {/* View content goes here */}
      </div>
    </div>
  );
}

export default NewAppointment;
