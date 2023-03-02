import { bavariaClient } from "./vendia";
async function test() {
    const myData = await bavariaClient.entities.patient.list();
    console.log(myData)
}