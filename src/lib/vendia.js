require('dotenv').config();
import { createVendiaClient } from '@vendia/client'

export const jhClient = createVendiaClient({
    apiUrl: process.env.JHOPKINS_API_URL,
    websocketUrl: process.env.JHOPKINS_WEBSOCKET,
    apiKey: process.env.JHOPKINS_API_KEY, // <---- API key
})

export const fdaClient = createVendiaClient({
    apiUrl: process.end.local.JHOPKINS_API_URL,
    websocketUrl: process.env.local.FDA_WEBSCKET,
    apiKey: process.env.local.FDA_API_KEY, // <---- API key
})
export const bavariaClient = createVendiaClient({
    apiUrl: process.env.local.BAVARIA_API_URL,
    websocketUrl: process.env.local.BAVARIA_WEBSOCKET,
    apiKey: process.env.local.BAVARIA_API_KEYS, // <---- API key
})

