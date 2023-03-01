import { jhClient } from "./vendia.js";

/**
 * Creates a new Patient
 *
 * @param data The JSON object representing a Patient entity.
 */
export default async function createPatient(data) {
  // ACL
  const patientAcl = {
    aclInput: {
      acl: [
        {
          principal: { nodes: ["FDA", "Bavaria"] },
          path: "dob",
          operations: ["READ"],
        },
        {
          principal: { nodes: ["FDA", "Bavaria"] },
          path: "height",
          operations: ["READ"],
        },
        {
          principal: { nodes: ["FDA", "Bavaria"] },
          path: "weight",
          operations: ["READ"],
        },
        {
          principal: { nodes: ["FDA", "Bavaria"] },
          path: "bloodPressure",
          operations: ["READ"],
        },
        {
          principal: { nodes: ["FDA", "Bavaria"] },
          path: "bloodType",
          operations: ["READ"],
        },
        {
          principal: { nodes: ["FDA", "Bavaria"] },
          path: "temperature",
          operations: ["READ"],
        },
        {
          principal: { nodes: ["FDA", "Bavaria"] },
          path: "oxygenSaturation",
          operations: ["READ"],
        },
        {
          principal: { nodes: ["FDA", "Bavaria"] },
          path: "allergies",
          operations: ["READ"],
        },
        {
          principal: { nodes: ["FDA", "Bavaria"] },
          path: "medications",
          operations: ["READ"],
        },
        {
          principal: { nodes: ["FDA", "Bavaria"] },
          path: "allergies",
          operations: ["READ"],
        },
        {
          principal: { nodes: ["FDA", "Bavaria"] },
          path: "familyHistory",
          operations: ["READ"],
        },
        {
          principal: { nodes: ["FDA", "Bavaria"] },
          path: "isEmployed",
          operations: ["READ"],
        },
        {
          principal: { nodes: ["FDA", "Bavaria"] },
          path: "isInsured",
          operations: ["READ"],
        },
        {
          principal: { nodes: ["FDA", "Bavaria"] },
          path: "icdHealthCodes",
          operations: ["READ"],
        },
        {
          principal: { nodes: ["FDA", "Bavaria"] },
          path: "visits",
          operations: ["READ"],
        },
        {
          principal: { nodes: ["FDA", "Bavaria"] },
          path: "isEligible",
          operations: ["READ"],
        },
        {
          principal: { nodes: ["FDA"] },
          path: "treatmentId",
          operations: ["ALL"],
        },
      ],
    },
  };

  // Add the patient
  const addResponse = await jhClient.entities.patient.add(data, patientAcl);

  // Get the patient ID from the add response
  const patientId = addResponse.result._id;

  // Invoke the smart contract
  const contractResponse = await jhClient.contracts.invoke(
    "vrn:JaneHopkins:smart-contract:PatientEligibilityContract",
    {
      input: {
        queryArgs: `{ "id": "${patientId}" }`,
      },
    }
  );
}
