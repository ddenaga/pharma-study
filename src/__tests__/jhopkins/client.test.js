import '@testing-library/jest-dom/extend-expect';
import { jhClient } from '@/lib/vendia';

it('gets a response', async () => {
	const listResponse = await jhClient.entities.treatment.list().catch((err) => {
			console.error("Are the API URL and key correct?");
		});

	expect(listResponse).toBeDefined();
}, 30000);
