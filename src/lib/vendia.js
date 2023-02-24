import { createVendiaClient } from '@vendia/client'

export const jhClient = createVendiaClient({
    apiUrl: process.env.JHOPKINS_API_URL,
    websocketUrl: process.env.JHOPKINS_WEBSOCKET,
    apiKey: process.env.JHOPKINS_API_KEY, // <---- API key
})

export const fdaClient = createVendiaClient({
    apiUrl: process.env.JHOPKINS_API_URL,
    websocketUrl: process.env.FDA_WEBSCKET,
    apiKey: process.env.FDA_API_KEY, // <---- API key
})
export const bavariaClient = createVendiaClient({
    apiUrl: process.env.BAVARIA_API_URL,
    websocketUrl: process.env.BAVARIA_WEBSOCKET,
    apiKey: process.env.BAVARIA_API_KEYS, // <---- API key
})

