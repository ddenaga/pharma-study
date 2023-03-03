import React from "react";
import Sidebar from "@/components/Sidebar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { jhClient } from "../../lib/vendia.js";

export async function getServerSideProps() {
  const myData = await jhClient.entities.patient.list();
  return {
    props: {
      data: myData,
    },
  };
}

function Appointments(props) {
  const { user, error, isLoading } = useUser();
  function display() {
    console.log(user);
  }
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div className="flex" id="site-content">
      <Sidebar />
      <div className="bg-gray-100 w-full">
        <h1 className="text-2xl font-bold" onClick={display}>
          {user.name}
        </h1>
        {/* View content goes here */}
      </div>
    </div>
  );
}

export default Appointments;
