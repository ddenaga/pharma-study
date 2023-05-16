import '@testing-library/jest-dom/extend-expect';
import { bavariaClient } from '@/lib/vendia';

it('accesses the trackers', async() => {
    const trackers = (await bavariaClient.entities.tracker.list()).items;

    expect(trackers).toBeDefined();
})

it('accesses the patients', async() => {
    const patients = (await bavariaClient.entities.patient.list()).items.filter((patient) => patient.isEligible);
    expect(patients).toBeDefined();
})

it('accesses the treatments', async() => {
    const treatments = (await bavariaClient.entities.treatment.list()).items;
    expect(treatments).toBeDefined();
})

it('testing if study finished', async() => {
    // Set up test data
  const pairings = [
    { patient: { visits: [{ hivViralLoad: '100' }, { hivViralLoad: null }] }, treatment: { numberOfDoses: 2 } },
    { patient: { visits: [{ hivViralLoad: '50' }, { hivViralLoad: '75' }] }, treatment: { numberOfDoses: 2 } },
    { patient: { visits: [{ hivViralLoad: null }, { hivViralLoad: '200' }] }, treatment: { numberOfDoses: 1 } },
  ];

  // Call the function being tested
  const isStudyFinished = pairings.every((pr) => {
    const { patient, treatment } = pr;
    // Check if the number of doses match the number of visits with a recorded viral load
    let numberOfDoses = treatment.numberOfDoses;
    let numberOfRecordings = patient.visits?.filter(
      (visit) => visit.hivViralLoad !== null && visit.hivViralLoad.trim().length !== 0,
    ).length;

    return numberOfDoses <= numberOfRecordings;
  });

  // Assert that the function returns the expected value
  expect(isStudyFinished).toBe(false);
})

describe('effectiveCount', () => {
    it('should return the number of patients with a previous visit with a viral load of zero', () => {
      const patients = [
        {
          name: 'Patient A',
          visits: [
            { date: '2021-01-01', hivViralLoad: '22' },
            { date: '2021-02-01', hivViralLoad: '50' },
            { date: '2021-03-01', hivViralLoad: '100' }
          ]
        },
        {
          name: 'Patient B',
          visits: [
            { date: '2021-01-01', hivViralLoad: '50' },
            { date: '2021-02-01', hivViralLoad: '0' },
            { date: '2021-03-01', hivViralLoad: '200' }
          ]
        },
        {
          name: 'Patient C',
          visits: [
            { date: '2021-01-01', hivViralLoad: '50' },
            { date: '2021-02-01', hivViralLoad: '100' },
            { date: '2021-03-01', hivViralLoad: '50' }
          ]
        }
      ];
      const effectiveCount = patients.filter((patient) => {
        return patient.visits?.find((visit) => parseInt(visit.hivViralLoad) === 0);
      }).length;
      expect(effectiveCount).toEqual(1);
    });
  });
