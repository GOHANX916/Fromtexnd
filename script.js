const socket = new WebSocket("wss://baxkend.onrender.com");

const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");

// Auto-scroll to the latest message
function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to add a message to the chat box
function addMessage(sender, message, isSelf) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", isSelf ? "sent" : "received");

    messageDiv.innerHTML = `
        <img src="https://storage.googleapis.com/a1aa/image/57g9bJnQ7UgVJfKsL9WZ_4p9hXz_JfdGLQMDAU1sIBc.jpg" />
        <div class="content">${message}</div>
    `;

    chatBox.appendChild(messageDiv);
    scrollToBottom();
}

// Send message when button is clicked
sendBtn.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.send(JSON.stringify({ sender: "me", message }));
        addMessage("me", message, true);
        messageInput.value = "";
    }
});

// Send message when Enter key is pressed
messageInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendBtn.click();
    }
});

// Receive messages from the WebSocket server
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    addMessage(data.sender, data.message, false);
};

// Show connection status
socket.onopen = () => console.log("Connected to WebSocket server");
socket.onclose = () => console.log("Disconnected from WebSocket server");
