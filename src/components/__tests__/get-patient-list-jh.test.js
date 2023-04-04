//import { jhClient } from "../../lib/vendia";
import { jhClient } from '../../lib/vendia.js';
import { useUser } from "@auth0/nextjs-auth0/client";
//import createPatient from "@/lib/createPatient.js";
import { motion } from "framer-motion";
import PatientList from "../PatientList";
//import PatientList from "@/components/PatientList";

test('home test case', () => {
    expect(true).toBe(true);
})

test('is treatment null or not', () => {
    jest.setTimeout(60000); // Increase timeout to 30 seconds
    //const patientData = await jhClient.entities.patient.list();
    const treatment = jhClient.entities.treatment.list();
    //console.log(treatment);
    //console.log("Hello");
    expect(treatment).not.toBeNull();
})
/*
test('adding a patient', async () => {
    //update the UI on every patient add
    const newPatient = await createPatient(patient);
    // console.log(newPatient.result);
    //setPatients([...patients, newPatient.result]);
    expect(newPatient).not.toBeNull();
    // console.log(patients);
})
*/
