import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { jhClient } from '@/lib/vendia';
import { motion } from 'framer-motion';
export async function getServerSideProps() {
  const data = await jhClient.entities.tracker.list();
  const mappings = data.items;

  // Note: This could be intensive on the API.
  const entities = await Promise.all(
    mappings.map(async (ids) => {
      const { _id, patientId, treatmentId } = ids;
      const patient = await jhClient.entities.patient.get(patientId);
      const treatment = await jhClient.entities.treatment.get(treatmentId);
      //const isDone = treatment.numberOfDoses == 5
      return {
        _id,
        patient,
        treatment,
      };
    }),
  );

  return {
    props: {
      entities,
    },
  };
}

function LiveResults(props) {
  const [patients, setPatients] = useState(props.entities);
  const [studyStatus, setStudyStatus] = useState();

  async function updateDoses(id) {
    const updatedTreatment = await jhClient.entities.treatment.get(id)
    const tempArray = [...patients]
    //remove the patient that had a change and add back with the change
    for (const patient of tempArray) {
      if (patient.treatment._id == updatedTreatment._id) {
        delete patient.treatment
        patient.treatment = updatedTreatment
      }
    }
    setPatients(tempArray)
  }

  function checkStatus() {
    setStudyStatus(true)
    console.log(patients)
    patients.forEach(({ treatment }) => {
      console.log(treatment)
      if (treatment.numberOfDoses < 5) {
        setStudyStatus(false)
      }
    })
  }
  useEffect(() => {
    checkStatus()
    jhClient.entities.treatment.onUpdate(({ result }) => {
      updateDoses(result._id)
      checkStatus()
    })
  }, [])
  return (
    <div className="flex" id="site-content">
      <Sidebar />
      <div className="bg-gray-100 w-full overflow-y-scroll" >
        <div className='flex justify-between items-center'>
          <h1 className='text-4xl m-20 '>Live Results</h1>
          {studyStatus ?
            <span className="inline-block rounded-full py-2 px-4 bg-green-600 text-white text-md mr-20 shadow-lg">Study is Complete</span> :
            <span className="inline-block animate-pulse rounded-full py-2 px-4 bg-red-600 text-white text-md mr-20 shadow-lg">Study still Ongoing</span>
          }
        </div>
        <div className="overflow-x p-10 ">
          <table className="table table-zebra w-full shadow-xl overflow-scroll">
            <thead>
              <tr>
                <th className='m-5'>UUID</th>
                <th>Name</th>
                <th>Doses</th>
                <th>Last HIV Reading</th>
                <th>Status</th>
                <th>Medication</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((item) => (
                <tr key={item.patient._id}>
                  <td className='w-1/4'>{item._id}</td>
                  <td>{item.patient.name}</td>
                  <td className='flex flex-col'>{item.treatment?.numberOfDoses}/5<motion.progress animate={{ x: [50, 0] }} className={item.treatment.numberOfDoses >= 5 ? "progress progress-success w-40" : "progress progress-warning  w-40"} value={(item.treatment.numberOfDoses / 5) * 100} max="100"></motion.progress></td>
                  <td>{item.patient.visits != null ? "No Reading yet" : item.patient.visits[0].hivViralLoad}</td>
                  <td>{item.treatment.numberOfDoses >= 5 ? <motion.span animate={{ scale: [1, 2, 1] }} transition={{ duration: 0.2 }} className='badge badge-success'>Done</motion.span> : <motion.span animate={{ scale: [1, 2, 1] }} transition={{ duration: 0.2 }} className='badge badge-warning'>Ongoing</motion.span>}</td>
                  <td>{item.treatment.isGeneric == true ? "Generic" : "Bavaria"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

}

export default LiveResults;
