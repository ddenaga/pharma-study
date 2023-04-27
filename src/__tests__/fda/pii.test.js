import '@testing-library/jest-dom/extend-expect';
import { fdaClient } from '@/lib/vendia';

it('hides personal identifiable information', async () => {
	const listResponse = await fdaClient.entities.patient.list().catch((err) => {
		console.error('Are the API URL and key correct?');
	});

	// We are expecting that the PII is null.
	/**
	 * 1. name: string
	 * 2. pictureUrl: string
	 * 3. insuranceNumber: string
	 * 4. address: object
	 */

	expect(listResponse).toBeDefined();

	// Check for every patient entity that these four attributes are hidden.
	const patients = listResponse.items;
	const isPIIHidden = patients.every((patient) => {
		return (
			patient.name === null &&
			patient.pictureUrl === null &&
			patient.insuranceNumber === null &&
			patient.address === null
		);
	});

	expect(isPIIHidden).toBeTruthy();
}, 30000);
