import React, { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import { jhClient } from "@/lib/vendia.js";
import { generateRes } from "@/lib/openai";
import "react-calendar/dist/Calendar.css";
//import io from 'socket.io-client';
import axios from "axios";
import snoop from "@/public/snoop1.png"
export default function assistant({ data }) {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const inputFieldRef = useRef(null);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Add user's message and OpenAI's response to the messages state
        console.log(inputValue)
        const userMessage = { text: inputValue, isUserMessage: true };
        setMessages([...messages, userMessage]);
        var aiRes = await generateRes(data, messages, inputValue)
        const aiMessage = { text: aiRes.data.choices[0].text, isUserMessage: false };
        console.log(aiMessage)
        setMessages([...messages, userMessage, aiMessage]);
        setInputValue("");
        inputFieldRef.current.focus();

    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="flex" id="site-content">
            <Sidebar />
            <div className="bg-gray-100 w-full p-8 overflow-y-scroll flex flex-col items-center">
                <h1 className="text-xl font-semibold">Assistant</h1>
                <div className="flex flex-col bg-white w-2/3 rounded-xl shadow-xl justify-end h-full items-center ">
                    <div className=" bg-white flex flex-col w-full overflow-y-auto">
                        {messages.map((message, index) => (
                            message.isUserMessage ?
                                <div className="chat chat-end mr-10 mb-5" key={index}>
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src="https://this-person-does-not-exist.com/img/avatar-gen1166dc15f464534de3f0bfd1bf9f2539.jpg" />
                                        </div>
                                    </div>
                                    <div className="chat-bubble chat-bubble-info">{message.text}</div>
                                </div> :
                                <div className="chat chat-start ml-10 mb-5" key={index}>
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={snoop} />
                                        </div>
                                    </div>
                                    <div className="chat-bubble">{message.text}</div>
                                </div>
                        ))}
                    </div>
                    <div className="flex justify-center w-full">
                        <form onSubmit={handleFormSubmit} className="flex w-full mb-10 mx-10">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={inputValue}
                                onChange={handleInputChange}
                                className="border w-full py-3 rounded-lg shadow-lg px-3"
                                ref={inputFieldRef}
                            />
                            <button className="btn btn-info ml-2">Send</button>
                        </form>
                    </div>
                </div>
            </div >
        </div >)
}
export async function getServerSideProps() {
    const myData = await jhClient.entities.patient.list();
    return {
        props: {
            data: myData.items,
        },
    };
}