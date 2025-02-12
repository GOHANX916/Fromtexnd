const ws = new WebSocket("wss://baxkend.onrender.com"); // Your Render backend URL
const messagesDiv = document.getElementById("messages");
const statusSpan = document.getElementById("status");

// Update Online/Offline Status
ws.onopen = () => {
    statusSpan.textContent = "Online";
    statusSpan.classList.add("online");
    statusSpan.classList.remove("offline");
};

ws.onclose = () => {
    statusSpan.textContent = "Offline";
    statusSpan.classList.add("offline");
    statusSpan.classList.remove("online");
};

// Handle Incoming Messages
ws.onmessage = (event) => {
    const { sender, text, timestamp, seen } = JSON.parse(event.data);
    displayMessage(sender, text, timestamp, seen);
};

// Send Message
document.getElementById("sendBtn").addEventListener("click", sendMessage);
document.getElementById("messageInput").addEventListener("keypress", (event) => {
    if (event.key === "Enter") sendMessage();
});

function sendMessage() {
    const input = document.getElementById("messageInput");
    if (input.value.trim() !== "") {
        const message = {
            sender: "You",
            text: input.value,
            timestamp: new Date().toLocaleTimeString(),
            seen: false
        };
        ws.send(JSON.stringify(message));
        displayMessage(message.sender, message.text, message.timestamp, false);
        input.value = "";
    }
}

function displayMessage(sender, text, timestamp, seen) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    if (sender === "You") messageDiv.classList.add("user");

    messageDiv.innerHTML = `
        ${text}
        <span class="timestamp">${timestamp}</span>
        <span class="double-tick ${seen ? "seen" : ""}">✓✓</span>
    `;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    if (sender !== "You") {
        // Mark message as seen
        setTimeout(() => {
            messageDiv.querySelector(".double-tick").classList.add("seen");
        }, 1000);
    }
}
