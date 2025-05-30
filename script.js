const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');

function appendMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    const messageText = document.createElement('p');
    messageText.textContent = text;
    messageElement.appendChild(messageText);
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function getBotResponse(question) {
    try {
        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: question })
        });

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error("Error communicating with backend:", error);
        return "Oops! Something went wrong while contacting the server.";
    }
}

async function sendMessage() {
    const text = userInput.value.trim();
    if (text) {
        appendMessage('user', text);
        userInput.value = '';
        const response = await getBotResponse(text);
        appendMessage('bot', response);
    }
}

userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});
