const ws = new WebSocket("wss://baxkend.onrender.com"); // WebSocket connection
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const status = document.getElementById("status");

// Update online/offline status
ws.onopen = () => { 
    status.textContent = "Online"; 
    status.classList.remove("text-gray-400"); 
    status.classList.add("text-green-400"); 
};

ws.onclose = () => { 
    status.textContent = "Offline"; 
    status.classList.remove("text-green-400"); 
    status.classList.add("text-gray-400"); 
};

// Handle received messages
ws.onmessage = (event) => {
    const { sender, message } = JSON.parse(event.data);
    displayMessage(sender, message);
};

// Send message when button is clicked
sendBtn.addEventListener("click", sendMessage);
        
// Send message on Enter key press
messageInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") sendMessage();
});

// Function to display messages
function displayMessage(sender, message) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("flex", "items-start", "space-x-4", sender === "me" ? "justify-end" : "");

    if (sender !== "me") {
        messageContainer.innerHTML = `
            <img src="https://storage.googleapis.com/a1aa/image/57g9bJnQ7UgVJfKsL9WZ_4p9hXz_JfdGLQMDAU1sIBc.jpg" 
                class="w-10 h-10 rounded-full">
            <div class="bg-gray-800 p-3 rounded-lg">
                <p class="text-sm">${message}</p>
            </div>`;
    } else {
        messageContainer.innerHTML = `
            <div class="bg-green-500 text-white p-3 rounded-lg">
                <p class="text-sm">${message}</p>
            </div>
            <img src="https://storage.googleapis.com/a1aa/image/iy1CpzJ72a_d5O7OOvIArh070PbH2fGIl9o5buhRXkE.jpg" 
                class="w-10 h-10 rounded-full">`;
    }

    chatBox.appendChild(messageContainer);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
}

// Function to send messages
function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== "") {
        const msgObj = { sender: "me", message };
        ws.send(JSON.stringify(msgObj));
        displayMessage("me", message);
        messageInput.value = "";
    }
}

