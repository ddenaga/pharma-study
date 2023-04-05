import React, { useEffect, useState } from 'react';
import Sidebar from "@/components/Sidebar";
import { fdaClient, jhClient } from '@/lib/vendia';

export async function getServerSideProps() {
  const data = await fdaClient.entities.patient.list(
    {
      filter: {
        isEligible: {
          eq: true,
        },
      },
    }
  );
  return {
    props: {
      data: data.items,
    },
  };
}

export default function AssignDrugs({ data }) {
  const [isDisabled, setIsDisabled] = useState(Array(data).fill(false))

  async function handleUpdate(patientId, drug, index) {
    const res = await fdaClient.entities.treatment.add({
      isGeneric: drug,
      numberOfDoses: 0,
    })
    const treatmentId = res.result._id
    const trackerRes = fdaClient.entities.tracker.add({
      treatmentId: treatmentId,
      patientId: patientId,
    })
    const patientRes = fdaClient.entities.patient.update({
      _id: patientId,
      treatmentId: treatmentId
    })
    const newDisabled = [...isDisabled];
    newDisabled[index] = true;
    setIsDisabled(newDisabled)
    console.log("click called")
  }

  async function deleteTracks() {
    console.log("called")
    const trackers = await jhClient.entities.tracker.list()
    const res = await jhClient.entities.treatment.list()
    const pat = await jhClient.entities.patient.list()
    // trackers.items.forEach((item) => {
    //   const res = fdaClient.entities.tracker.remove(item._id)
    //   console.log(res)
    // })
    // res.items.forEach((item) => {
    //   const res = fdaClient.entities.treatment.remove(item._id)
    //   console.log(res)
    // })
    pat.items.forEach((item) => {
      const res = jhClient.entities.patient.update({
        _id: item._id,
        treatmentId: '0',
      })
      console.log(res)
    })
    console.log(pat.items)
  }
  return (
    <div className="flex" id="site-content">
      <Sidebar />
      <div className="bg-gray-100 w-full overflow-y-scroll">
        <div className='flex justify-between items-center' onClick={console.log(data)}>
          <h1 className='text-4xl m-20 ' onClick={deleteTracks}>Assign Drugs</h1>
        </div>
        <div className="overflow-x-auto p-16 ">
          <table className="table table-zebra w-full shadow-xl">
            <thead>
              <tr>
                <th>UUID</th>
                <th>Blood Pressure</th>
                <th>Height</th>
                <th>Weight</th>
                <th>Oxygen Saturation</th>
                <th>Temperature</th>
                <th className="flex justify-center">Assign Drug</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.bloodPressure}</td>
                  <td>{item.height}</td>
                  <td>{item.weight}</td>
                  <td>{item.oxygenSaturation}</td>
                  <td>{item.temperature}</td>
                  <td className="flex flex-col justify-center">{
                    item.treatmentId === null || item.treatmentId == '0' ?
                      <div className="flex justify-center" >
                        <button className="btn btn-outline btn-info py-2 mr-2" onClick={() => handleUpdate(item._id, false, index)} disabled={isDisabled[index]}>Bavaria</button>
                        <button className="btn  btn-outline btn-info" disabled={isDisabled[index]} onClick={() => handleUpdate(item._id, true, index)} >Generic</button>
                      </div>
                      :
                      <button className="btn btn-info py-2 mr-2" disabled>Assigned</button>
                  }
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

