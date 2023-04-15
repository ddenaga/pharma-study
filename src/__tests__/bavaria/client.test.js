import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { bavariaClient } from '@/lib/vendia';

it('gets a response', async () => {
	const listResponse = await bavariaClient.entities.treatment.list().catch((err) => {
		console.log(err);
	});
}, 10000);
