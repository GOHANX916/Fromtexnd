const ws = new WebSocket("wss://baxkend.onrender.com"); // WebSocket server URL

// Listen for incoming messages
ws.onmessage = (event) => {
    const msgObj = JSON.parse(event.data);
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message");

    if (msgObj.sender === "me") {
        messageContainer.classList.add("sent"); // Sent messages
    } else {
        messageContainer.classList.add("received"); // Received messages
    }

    messageContainer.textContent = msgObj.message;
    document.querySelector(".chat-container").appendChild(messageContainer);

    // Auto-scroll to the latest message
    document.querySelector(".chat-container").scrollTop = document.querySelector(".chat-container").scrollHeight;
};

// Send message on button click
document.getElementById("sendBtn").addEventListener("click", () => {
    sendMessage();
});

// Send message on Enter key press
document.getElementById("messageInput").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// Function to send messages
function sendMessage() {
    const input = document.getElementById("messageInput");
    const message = input.value.trim();

    if (message !== "") {
        const msgObj = { sender: "me", message }; // Mark sender
        ws.send(JSON.stringify(msgObj));
        input.value = ""; // Clear input
    }
}
