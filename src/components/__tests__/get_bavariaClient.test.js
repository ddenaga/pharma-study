//brian...

import { jhClient } from '../../lib/vendia.js';
import { useUser } from "@auth0/nextjs-auth0/client";
//import createPatient from "@/lib/createPatient.js";
import { motion } from "framer-motion";
import PatientList from "../PatientList";
import bavariaClient from '../../lib/vendia.js';
import fdaClient from '../../lib/vendia.js';


test('home test case', () => {
    expect(true).toBe(true); 
})

test('is bavaria treatment list  null or not', () => {
    jest.setTimeout(60000); // Increase timeout to 30 seconds
    
    //const patients = bavariaClient.entities.patient.list();
    //const patients = bavariaClient.entities.treatment.list();

    const treatment = bavariaClient.entities.treatment.list();;
    

    //console.log(treatment);
    //console.log("Hello");
    expect(treatment).not.toBeNull();
})  

