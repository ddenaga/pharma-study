import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '@/components/Sidebar';
import { jhClient } from '@/lib/vendia.js';
import { generateRes } from '@/lib/openai';
import 'react-calendar/dist/Calendar.css';
//import io from 'socket.io-client';
import axios from 'axios';
import snoop from '@/public/snoop1.png';
export default function assistant({ data }) {
	const [messages, setMessages] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const inputFieldRef = useRef(null);

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		// Add user's message and OpenAI's response to the messages state
		console.log(inputValue);
		const userMessage = { text: inputValue, isUserMessage: true };
		setMessages([...messages, userMessage]);
		var aiRes = await generateRes(data, messages, inputValue);
		const aiMessage = { text: aiRes.data.choices[0].text, isUserMessage: false };
		console.log(aiMessage);
		setMessages([...messages, userMessage, aiMessage]);
		setInputValue('');
		inputFieldRef.current.focus();
	};

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	return (
		<div className="" id="site-content">
			<Sidebar />
			<div className="flex w-full flex-col items-center overflow-y-scroll bg-gray-100 p-8">
				<h1 className="text-xl font-semibold">Assistant</h1>
				<div className="flex h-full w-2/3 flex-col items-center justify-end rounded-xl bg-white shadow-xl ">
					<div className=" flex w-full flex-col overflow-y-auto bg-white">
						{messages.map((message, index) =>
							message.isUserMessage ? (
								<div className="chat chat-end mr-10 mb-5" key={index}>
									<div className="chat-image avatar">
										<div className="w-10 rounded-full">
											<img src="https://this-person-does-not-exist.com/img/avatar-gen1166dc15f464534de3f0bfd1bf9f2539.jpg" />
										</div>
									</div>
									<div className="chat-bubble chat-bubble-info">{message.text}</div>
								</div>
							) : (
								<div className="chat chat-start ml-10 mb-5" key={index}>
									<div className="chat-image avatar">
										<div className="w-10 rounded-full">
											<img src={snoop} />
										</div>
									</div>
									<div className="chat-bubble">{message.text}</div>
								</div>
							),
						)}
					</div>
					<div className="flex w-full justify-center">
						<form onSubmit={handleFormSubmit} className="mx-10 mb-10 flex w-full">
							<input
								type="text"
								placeholder="Type a message..."
								value={inputValue}
								onChange={handleInputChange}
								className="w-full rounded-lg border py-3 px-3 shadow-lg"
								ref={inputFieldRef}
							/>
							<button className="btn-info btn ml-2">Send</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
export async function getServerSideProps() {
	const myData = await jhClient.entities.patient.list();
	return {
		props: {
			data: myData.items,
		},
	};
}
