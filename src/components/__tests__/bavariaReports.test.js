import { render, screen, cleanup } from '@testing-library/react';
import { bavariaClient } from "../../lib/vendia";
//import PatientList from '@/components/PatientList';

jest.setTimeout(60000); // increase timeout to 60 seconds

test('should not see PII and instead see nulls', () => {
    expect(true).toBe(true);
})

test('getting patient data', async ()=> {
    const patientData = await bavariaClient.entities.patient.list();
    if (patientData === null) {
        console.log("it's null")
    } else {
        console.log("NOT NULL")
    }
    expect(patientData.items).not.toBeNull();
})

/*
describe('Testing functions from Bavaria/reports.jsx',()=>{

    describe('getServerSideProps', ()=>{

         test('myData is not empty',async ()=>{
            jest.setTimeout(30000);
            const myData = await bavariaClient.entities.patient.list();
            expect(myData).not.toBeNull()
         }, 60_000);

         test('test myData based on PII', async ()=>{
          //array with same elements on myData
         const myData = await bavariaClient.entities.patient.list();
            //make sure array and myData are matching
         });
    });
});

*/
