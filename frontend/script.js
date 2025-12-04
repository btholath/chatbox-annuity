const API_BASE_URL = 'http://localhost:8000';

let sessionId = null;

const messagesDiv = document.getElementById('messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    
    // Display user message
    addMessage(message, 'user');
    userInput.value = '';
    
    try {
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                session_id: sessionId
            })
        });
        
        const data = await response.json();
        sessionId = data.session_id;
        
        // Display assistant message
        addMessage(data.response, 'assistant');
        
    } catch (error) {
        addMessage('Error: Could not connect to server', 'error');
        console.error(error);
    }
}

function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
