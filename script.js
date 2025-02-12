const ws = new WebSocket("wss://baxkend.onrender.com"); // Use your Render backend URL

ws.onmessage = (event) => {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = event.data;
    document.getElementById("messages").appendChild(messageDiv);
};

function sendMessage() {
    const input = document.getElementById("messageInput");
    ws.send(input.value);
    input.value = "";
}
