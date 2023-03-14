import { createVendiaClient } from '@vendia/client';

export const jhClient = createVendiaClient({
	apiUrl: process.env.NEXT_PUBLIC_JHOPKINS_API_URL,
	websocketUrl: process.env.NEXT_PUBLIC_JHOPKINS_WEBSOCKET,
	apiKey: process.env.NEXT_PUBLIC_JHOPKINS_API_KEY,
});

export const fdaClient = createVendiaClient({
	apiUrl: process.env.NEXT_PUBLIC_FDA_API_URL,
	websocketUrl: process.env.NEXT_PUBLIC_FDA_WEBSOCKET,
	apiKey: process.env.NEXT_PUBLIC_FDA_API_KEY,
});

export const bavariaClient = createVendiaClient({
	apiUrl: process.env.NEXT_PUBLIC_BAVARIA_API_URL,
	websocketUrl: process.env.NEXT_PUBLIC_BAVARIA_WEBSOCKET,
	apiKey: process.env.NEXT_PUBLIC_BAVARIA_API_KEY,
});
