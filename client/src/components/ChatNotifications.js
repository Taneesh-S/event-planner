import React, { useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";

const JOIN_TOAST_ID = "toast-user-join";
const LEAVE_TOAST_ID = "toast-user-leave";

// Pop-up Notification Component
const ChatNotifications = ({ popup }) => {
	const lastPopup = useRef("");

	useEffect(() => {
		// Don't show pop-up again if shown once
		if (!popup || popup === lastPopup.current) return;

		lastPopup.current = popup;

		if (popup.includes("has joined the chat")) {
			if (!toast.isActive(JOIN_TOAST_ID)) {
				toast.info(popup, {
					toastId: JOIN_TOAST_ID,
					position: "top-right",
					autoClose: 3000,
					pauseOnHover: true,
					closeOnClick: true,
					theme: "dark",
				});
			}
			return;
		}

		if (popup.includes("has left the chat") || popup.includes("has disconnected")) {
			if (!toast.isActive(LEAVE_TOAST_ID)) {
				toast.info(popup, {
					toastId: LEAVE_TOAST_ID,
					position: "top-right",
					autoClose: 3000,
					pauseOnHover: true,
					closeOnClick: true,
					theme: "dark",
				});
			}
			return;
		}
	}, [popup]);

	return <ToastContainer limit={1} newestOnTop />;
};

export default ChatNotifications;