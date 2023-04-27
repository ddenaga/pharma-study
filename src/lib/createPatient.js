import { jhClient } from "./vendia.js";
import { patientAcl } from "./acl.js";

/**
 * Creates a new Patient
 *
 * @param data The JSON object representing a Patient entity.
 */
export default async function createPatient(data) {
  // Determine Patient eligibility
  let isEligible = true;


  // No pregnancy health codes (starting with O)
  isEligible = data.icdHealthCodes?.every((code) => code.toUpperCase()[0] !== 'O');

  // No DOB later than 2005
  let dob = new Date(data.dob);
  let deadLine = new Date("01-01-2005");
  if (dob > deadLine) isEligible = false;


  data.isEligible = isEligible;
  console.log(isEligible);

  data.isEligible = isEligible;


  // Add the patient
  const addResponse = await jhClient.entities.patient.add(data, patientAcl);

  // Note: Abandon using Vendia Smart Contracts. Too slow for our purposes.
  /*
  // Get the patient ID from the add response
  const patientId = addResponse.result._id;

  // Invoke the smart contract
  const contractResponse = await jhClient.contracts.invoke(
    "vrn:JaneHopkins:smart-contract:PatientEligibilityContract",
    {
      input: {
        queryArgs: '{ "id": "' + patientId + '" }',
      },
    }
  );
  */

  return addResponse;
}
