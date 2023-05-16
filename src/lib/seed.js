import { jhClient } from "./vendia";
import data from "@/public/MOCK_DATA.json"
import createPatient from "./createPatient";
export default async function seedDb() {

    let transformedData = data.map((patient) => {
        return {
            address: patient.address,
            allergies: [patient.allergies],
            bloodPressure: patient.bloodPressure,
            bloodType: patient.bloodType,
            dob: patient.dob,
            familyHistory: [patient.familyHistory],
            height: patient.height.toString(),
            icdHealthCodes: [patient.icdHealthCodes],
            isEmployed: patient.isEmployed,
            isInsured: patient.isInsured,
            medications: [patient.medications],
            name: patient.name,
            oxygenSaturation: patient.oxygenSaturation.toString(),
            temperature: patient.temperature.toString(),
            weight: patient.weight.toString(),
            insuranceNumber: patient.insuranceNumber,
        }
    });

    // transformedData.forEach(patient => {
    //     const res = createPatient(patient)
    //     console.log(res)
    // });

}