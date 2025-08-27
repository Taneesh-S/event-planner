import React, { useState, useEffect, useRef } from "react";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ChatNotifications from "../components/ChatNotifications";
import "../pages/css/Chat.css";

// Chat Method
const Chat = () => {
	const { user } = useAuth();
	const { users, messages, popup, sendMessage, joinChat, leaveChat } = useChat();
	const [input, setInput] = useState("");
	const bottomRef = useRef(null);
	const navigate = useNavigate();

	// Scroll to the bottom of the window
	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	useEffect(() => {
		if (user && user.username) joinChat();
	}, [user, joinChat]);

	const handleSend = (e) => {
		e.preventDefault();
		if (!input.trim()) return;
		sendMessage(input);
		setInput("");
	};

	const handleLeaveChat = () => {
		leaveChat();
		navigate("/");
	};

	// Accessing protected char route without logging in
	if (!user || !user.username) {
		return <div className="chat-main">Please log in to join the chat.</div>;
	}

	return (
		<>
			<div className="chat-main-outer">
				<div className="chat-main-column">
					<div className="chat-messages-list">
						{messages.map((msg, i) => (
							<div
								key={i}
								className={`chat-message ${msg.username === user.username ? "own-message" : ""}`}
							>
								{
									(msg.username === user.username ? (
										<>
											{/* Displaying own name in different colour */}
											<span style={{color: 'var(--accent-color)'}}><strong>{msg.username}: </strong></span> {msg.message}
										</>
									) : (
										<>
											<strong>{msg.username}: </strong> {msg.message}
										</>
									))
								}
							</div>
						))}
						<div ref={bottomRef} />
					</div>

					<form onSubmit={handleSend} className="chat-inputbar-fixed">
						<input
							className="chat-input"
							type="text"
							placeholder="Type your message..."
							value={input}
							onChange={(e) => setInput(e.target.value)}
							aria-label="Message input"
						/>
						<button type="submit" className="chat-send" aria-label="Send message button">
							Send
						</button>
					</form>
				</div>

				{/* Sidebar to display connected users */}
				<div className="chat-sidebar">
					<div>
						<div className="chat-users-title" id="onlineUsers">Online Users</div>
						{users.length > 0 ? (
							users.map((u) => (
								<div key={u.socketId} className="chat-user">
									{u.username}
								</div>
							))
						) : (
							<div>No users online</div>
						)}
					</div>
					<button
						onClick={handleLeaveChat}
						className="leave-chat-btn"
						aria-label="Leave Chat Room"
					>
						Leave Chat Room
					</button>
				</div>
			</div>
			<ChatNotifications popup={popup} />
		</>
	);
};

export default Chat;