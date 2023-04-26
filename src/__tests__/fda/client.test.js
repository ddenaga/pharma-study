import '@testing-library/jest-dom/extend-expect';
import { fdaClient } from '@/lib/vendia';

it('gets a response', async () => {
	const listResponse = await fdaClient.entities.treatment.list().catch((err) => {
		console.error("Are the API URL and key correct?");
	});

	expect(listResponse).toBeDefined();
}, 30000);
