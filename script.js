const socket = new WebSocket("wss://baxkend.onrender.com");
const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");
const statusText = document.getElementById("status");

// **Handle WebSocket Connection**
socket.onopen = () => {
    console.log("Connected to server");
    statusText.textContent = "Online";
    statusText.classList.remove("text-gray-400");
    statusText.classList.add("text-green-400");
};

// **Handle Incoming Messages**
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    if (data.type === "message") {
        displayMessage(data.sender, data.message, "received");
    }
};

// **Send Message**
sendBtn.addEventListener("click", () => {
    sendMessage();
});

messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const message = messageInput.value.trim();
    if (message === "") return;

    const data = {
        type: "message",
        sender: "me",
        message: message
    };

    socket.send(JSON.stringify(data));
    displayMessage("Me", message, "sent");
    messageInput.value = "";
}

// **Display Messages in Chat**
function displayMessage(sender, message, type) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", type);

    const img = document.createElement("img");
    img.src = sender === "Me" 
        ? "https://storage.googleapis.com/a1aa/image/iy1CpzJ72a_d5O7OOvIArh070PbH2fGIl9o5buhRXkE.jpg" 
        : "https://storage.googleapis.com/a1aa/image/57g9bJnQ7UgVJfKsL9WZ_4p9hXz_JfdGLQMDAU1sIBc.jpg";

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content");
    contentDiv.textContent = message;

    messageDiv.appendChild(img);
    messageDiv.appendChild(contentDiv);
    chatBox.appendChild(messageDiv);

    // Scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}

// **Handle Disconnection**
socket.onclose = () => {
    console.log("Disconnected from server");
    statusText.textContent = "Offline";
    statusText.classList.remove("text-green-400");
    statusText.classList.add("text-gray-400");
};
