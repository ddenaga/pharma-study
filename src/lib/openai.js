import { Configuration, OpenAIApi } from 'openai';
export async function generateRes(patients, chatHistory, prompt) {
	const promptString = `Patient Data: ${JSON.stringify(patients)}` + prompt;

	const configuration = new Configuration({
		apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
	});
	// "You are a doctor's assistant, if the question is about patient data, " +
	//         "answer it from the patient data, otherwise answer it like you normally would" + promptString
	const openai = new OpenAIApi(configuration);
	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: chatHistory + promptString,
		temperature: 0.1,
		max_tokens: 100,
	});
	return response;
}
