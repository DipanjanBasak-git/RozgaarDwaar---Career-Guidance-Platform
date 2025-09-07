// Chatbot functionality for Udyog Sathi
// Handles the chatbot widget and conversation logic

document.addEventListener('DOMContentLoaded', function() {
    initializeChatbot();
});

function initializeChatbot() {
    const chatbotWidget = document.getElementById('chatbotWidget');
    const chatbotModal = document.getElementById('chatbotModal');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotMessages = document.getElementById('chatbotMessages');
    
    if (!chatbotWidget || !chatbotModal) return;
    
    // Open chatbot modal
    chatbotWidget.addEventListener('click', function() {
        chatbotModal.classList.add('active');
        chatbotInput.focus();
    });
    
    // Close chatbot modal
    chatbotClose.addEventListener('click', function() {
        chatbotModal.classList.remove('active');
    });
    
    // Send message
    chatbotSend.addEventListener('click', function() {
        sendMessage();
    });
    
    // Send message on Enter key
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Close modal when clicking outside
    chatbotModal.addEventListener('click', function(e) {
        if (e.target === chatbotModal) {
            chatbotModal.classList.remove('active');
        }
    });
    
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;
        
        // Add user message to chat
        addMessage(message, 'user');
        chatbotInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Generate bot response
        setTimeout(() => {
            hideTypingIndicator();
            const response = generateResponse(message);
            addMessage(response, 'bot');
        }, 1500);
    }
    
    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = getCurrentTime();
        
        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(messageTime);
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    function generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Check for keywords and generate appropriate response
        if (window.mockData && window.mockData.chatbotResponses) {
            for (const responseGroup of window.mockData.chatbotResponses) {
                for (const keyword of responseGroup.keywords) {
                    if (message.includes(keyword)) {
                        const responses = responseGroup.responses;
                        return responses[Math.floor(Math.random() * responses.length)];
                    }
                }
            }
        }
        
        // Default responses
        const defaultResponses = [
            "I'm here to help you with your career journey! You can ask me about jobs, skills, courses, or any career-related questions.",
            "That's a great question! I can help you with job search, skill development, interview preparation, or government schemes.",
            "I'm Udyog Sathi, your career assistant. How can I help you today? You can ask about jobs, skills, courses, or career guidance.",
            "Feel free to ask me anything about your career development. I can help with job opportunities, skill assessment, or learning resources."
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Quick action responses for chatbot
function getQuickActionResponse(action) {
    const responses = {
        'jobs': "I can help you find job opportunities! We have 50K+ jobs across 25+ sectors. What type of role are you looking for?",
        'skills': "Great! I can help you identify skill gaps and recommend courses. Try our skill assessment tool to get personalized recommendations.",
        'resume': "Upload your resume to get an ATS score and job matching recommendations! Our system will analyze your resume and suggest improvements.",
        'interview': "Practice with our mock interview feature! We have technical and HR questions to help you prepare for real interviews.",
        'schemes': "Explore government schemes in our schemes section! We have PMKVY, Startup India, Mudra loans, and more. Check eligibility and apply online.",
        'support': "I'm here to help! You can also contact our support team at 1800-11-6090 or email rozgaardwaar@msde.gov.in for detailed assistance."
    };
    
    return responses[action] || "I'm here to help you with your career journey! What would you like to know?";
}

// Chatbot analytics (mock)
function trackChatbotInteraction(userMessage, botResponse) {
    // In a real application, this would send data to analytics service
    console.log('Chatbot interaction:', {
        userMessage,
        botResponse,
        timestamp: new Date().toISOString()
    });
}

// Export functions for use in other files
window.Chatbot = {
    getQuickActionResponse,
    trackChatbotInteraction
};
