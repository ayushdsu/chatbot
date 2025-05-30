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

function getBotResponse(question) {
    const lowerCaseQuestion = question.toLowerCase();
    if (lowerCaseQuestion === 'hello' || lowerCaseQuestion === 'hi'){
        return 'Hello! How can I assist you today?';
    } else if (lowerCaseQuestion === 'how are you' ) {
        return 'I am just a bot, but I am here to help you!';
    }else if (lowerCaseQuestion === "what is the university helpline number"){
        return '080 46461800 / 080 49092800';
    } else if (lowerCaseQuestion === 'your name') {
        return 'I am your friendly chatbot. You can call me Chatty!';
    } else if (lowerCaseQuestion === "help") {
        return 'Sure, I am here to help. What do you need assistance with?';
    } else if (lowerCaseQuestion === 'helpline') {
        return 'Yes helping';
    }else if (lowerCaseQuestion === 'hi i need your help for course registration') {
            return 'Hello! I\'d happy to help you with course registration. What specifically do you need assistance with?';
    }else if (lowerCaseQuestion === 'i want to know the deadline for registering the course') {
        return 'The deadline for registering for the fall semester is July 15th. Make sure to complete your registration before this date to avoid any late fees.';
    }else if (lowerCaseQuestion === 'can you tell me fees structure') {
        return 'Bachelor of Technology\n 4 Years\n 2,75,000 \n Master of Technology\n 2 Years \t 1,40,000\n Bachelor of Computer Application\t 3 Years\t 90,000\n Master of Computer Application\t 3 Years\t 1,50,000 ';
    }
    
    else {
        return 'Sorry, I didn\'t understand that. Can you please rephrase?';
    }
}

function sendMessage() {
    const text = userInput.value.trim();
    if (text) {
        appendMessage('user', text);
        userInput.value = '';
        // Simulate bot response
        setTimeout(() => {
            const response = getBotResponse(text);
            appendMessage('bot', response);
        }, 1000);
    }
}

userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});