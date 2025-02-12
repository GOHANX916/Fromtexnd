const ws = new WebSocket("wss://baxkend.onrender.com"); // Use your Render backend URL

// Handle incoming messages
ws.onmessage = (event) => {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.textContent = event.data;
    document.getElementById("messages").appendChild(messageDiv);
    document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
};

// Send message when clicking the send button
document.getElementById("sendBtn").addEventListener("click", () => {
    const input = document.getElementById("messageInput");
    if (input.value.trim() !== "") {
        ws.send(input.value);
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", "user");
        messageDiv.textContent = input.value;
        document.getElementById("messages").appendChild(messageDiv);
        document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
        input.value = "";
    }
});

// Optional: Send message when pressing Enter
document.getElementById("messageInput").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        document.getElementById("sendBtn").click();
    }
});
