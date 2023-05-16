import '@testing-library/jest-dom/extend-expect';
import { jhClient } from '@/lib/vendia';
//import { getPatientVisitsToday } from '../../pages/jhopkins/doctor/appointments';


it('gets a response', async () => {
    const listResponse = await jhClient.entities.treatment.list().catch((err) => {
        console.error("Are the API URL and key correct?");
    });

    expect(listResponse).toBeDefined();
}, 30000);

it('gets the patient list', async () => {
    const listResponse = await jhClient.entities.patient.list();

    expect(listResponse).toBeDefined();
}, 30000);

// describe('getPatientVisitsToday', () => {
//     test('returns an empty array if no patients', () => {
//       const patients = [];
//       const result = getPatientVisitsToday(patients);
//       expect(result).toEqual([]);
//     });
  
//     test('returns the correct patientVisits array', () => {
//       const patients = [
//         {
//           visits: [
//             { dateTime: '2023-05-12', hivViralLoad: null },
//             { dateTime: '2023-05-12', hivViralLoad: '100' },
//             { dateTime: '2023-05-13', hivViralLoad: '58' },
//           ],
//         },
//         {
//           visits: [
//             { dateTime: '2023-05-13', hivViralLoad: null },
//             { dateTime: '2023-05-14', hivViralLoad: '36' },
//           ],
//         },
//       ];
//       const result = getPatientVisitsToday(patients);
//       expect(result).toEqual([[0, 2], [1, 0]]);
//     });
//   });

