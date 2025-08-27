import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import io from "socket.io-client";

// Create Context
const ChatContext = createContext();

// Custom hook to user ChatContext
export const useChat = () => useContext(ChatContext);

// Provider Component
export const ChatProvider = ({ children, user }) => {

	const [users, setUsers] = useState([]);
	const [messages, setMessages] = useState([]);
	const [popup, setPopup] = useState("");
	const socketRef = useRef(null);

	useEffect(() => {
		if (!user?.username) return;

		if (!socketRef.current) {
			socketRef.current = io("http://localhost:8080");
		}

		const socket = socketRef.current;

		// Clean up existing listeners before attaching new ones
		socket.off("users");
		socket.off("message");
		socket.off("notify");
		socket.off("disconnect");

		socket.on("users", (users) => setUsers(users));
		socket.on("message", (msg) => setMessages((prev) => [...prev, msg]));
		socket.on("notify", (msg) => {
			setPopup(msg);
			setTimeout(() => setPopup(""), 2000);
		});
		socket.on("disconnect", () => {
			setPopup("You have disconnected from the chat.");
		});

		return () => {
			socket.off("users");
			socket.off("message");
			socket.off("notify");
			socket.off("disconnect");
		};
	}, [user?.username]);

	const joinChat = () => {
		if (user?.username && socketRef.current) {
			socketRef.current.emit("join", user.username);
		}
	};

	const leaveChat = () => {
		if (socketRef.current) {
			socketRef.current.emit("leave");
		}
	};

	const sendMessage = (message) => {
		if (user?.username && message.trim() && socketRef.current) {
			socketRef.current.emit("sendMessage", {
				username: user.username,
				message,
			});
		}
	};

	return (
		<ChatContext.Provider
			value={{ users, messages, popup, sendMessage, joinChat, leaveChat }}
		>
			{children}
		</ChatContext.Provider>
	);
};