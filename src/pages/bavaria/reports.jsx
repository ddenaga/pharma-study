import React from "react";
import Sidebar from "@/components/Sidebar";
import { bavariaClient } from "@/lib/vendia";
export default function Reports(props) {
  return (
    <div className="flex" id="site-content">
      <Sidebar />
      <div className="bg-gray-100 w-full" onClick={console.log(props)}>
        {/* View content goes here */}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const myData = await bavariaClient.entities.patient.list();
  return {
    props: {
      data: myData,
    },
  };
}
