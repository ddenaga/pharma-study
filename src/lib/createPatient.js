import { jhClient } from './vendia.js';

/**
 * Creates a new Patient
 * 
 * @param data The JSON object representing a Patient entity.
 */
export default async function createPatient(data) {
    // Add the patient
    // TODO: Include ACL
    const addResponse = await jhClient.entities.patient.add(data);

    // Invoke the smart contract
    const patientId = data._id;
    jhClient.contracts.invoke(
        "vrn:JaneHopkins:smart-contract:PatientEligibilityContract",
        {
            input: {
                queryArgs: `{ "id": "${patientId}" }`
            }
        }
    );
}
