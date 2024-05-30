let isBotEngaged = false;
let isChoosingOption = false;
let shouldRestart = false;
let enterKeyActive = false;

function toggleChatbot() {
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotButton = document.querySelector('.chatbot-button');
    const chatbotMessages = document.getElementById('chatbotMessages');

    if (isBotEngaged) {
        chatbotContainer.style.display = 'none';
        isBotEngaged = false;
        chatbotButton.textContent = 'Chat with Colin';
        clearChat(); // Clear the conversation
        if (shouldRestart) {
            startConversation(); // Start a new conversation if it was previously restarted
        }
    } else {
        chatbotContainer.style.display = 'block';
        isBotEngaged = true;
        chatbotButton.textContent = 'End Chat';
        if (shouldRestart) {
            startConversation(); // Start a new conversation if it was previously restarted
        } else {
            // Show the initial questions immediately when the chatbot is engaged
            provideOptions();
            enterKeyActive = true; // Enable Enter key
        }
    }
}

function sendMessage() {
    const userInput = document.getElementById('userInput').value.trim();
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotHeader = document.getElementById('chatbotHeader');

    if (userInput !== '') {
        if (!isBotEngaged) {
            // Bot introduction
            appendMessage("Colin: Hello! How can I assist you today?");
            isBotEngaged = true;
            chatbotHeader.innerText = "Chat with Colin (Engaged)";
        } else if (isChoosingOption) {
            // Handle user's choice
            handleUserChoice(userInput);
        } else {
            // Handle user's input
            appendMessage(`You: ${userInput}`);
            provideOptions();
            enterKeyActive = true; // Enable Enter key after the initial questions
        }

        // Clear the user input field
        document.getElementById('userInput').value = '';

        // Check if the "Enter" key is active
        if (enterKeyActive) {
            document.getElementById('userInput').addEventListener('keyup', function(event) {
                if (event.key === 'Enter') {
                    sendMessage(); // Send the message when "Enter" key is pressed
                }
            });
        }
    }
}

// Function to send a message when the "Enter" key is pressed
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage(); // Send the message when "Enter" key is pressed
    }
}

// Listen for keypress events on the user input field
document.getElementById('userInput').addEventListener('keypress', handleKeyPress);


function appendMessage(message) {
    const chatbotMessages = document.getElementById('chatbotMessages');
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    chatbotMessages.appendChild(messageElement);
    // Style the links as yellow
    const links = messageElement.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
        links[i].style.color = 'yellow';
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
}

function provideOptions() {
    appendMessage("Colin: Please choose an option:");
    appendMessage("1. Looking for Power BI Development?");
    appendMessage("2. Looking for a Contract report by report basis of Power BI Dashboard Development?");
    appendMessage("3. Looking for a Power BI trainer for your employees?");
    appendMessage("4. Looking for a consultant for Power BI Dashboards?");
    appendMessage("5. Are You looking for Azure Dev Ops API's to Power BI operations?");
    appendMessage("6. Consultant on ETL process for MySql databases process to reports?");
    appendMessage("7. Consultant on ETL process for Postgres databases process to reports?");
    appendMessage("8. Looking for Data Mining or webscraping operations from web pages, js files, databases or Pdfs?");
    appendMessage("9. Are you looking for API's to extract transform and clean data before loading?");
    appendMessage("10. AZURE KPI's API's data analytics operator to conduct dev ops in AZURE?");
    appendMessage("Input #1 through #10 & click Send or hit 'ENTER'");
    isChoosingOption = true;
}

function handleUserChoice(choice) {
    clearChat(); // Clear the previous conversation
    switch (choice) {
        case '1':
            appendMessage("Colin: Here is the link to my <a href='resume.html' target='resume'>resume</a>.");
            appendMessage("Colin: You can contact me at colinroberts.contact@gmail.com ");
            break;
        case '2':
            appendMessage("Colin: My email, colinroberts.contact@gmail.com. ");
            appendMessage("Colin: Examples of my Dashboards: <a href='Skills.html' target='_blank'>Dashboard BI</a>");
            break;
        case '3':
            appendMessage("Colin: Here is the link to my <a href='resume.html' target='_blank'>resume</a>.");
            break;
        case '4':
            appendMessage("Colin: For consulting, you can visit <a href='Skills.html' target='_blank'>Skills.html</a>.");
            break;
        case '5':
            appendMessage("Colin: Check out my Dev Ops examples on  <a href='dev_ops.html' target='Dev Ops'>Dev Ops</a>.");
            break;
        case '6':
            appendMessage("Colin: For a consultant on your ETL process to MySQL or need an engineer of creating an ETL process please see examples on  <a href='dev_ops.html' target='Dev Ops'>Dev Ops</a>. ");
            break;
        case '7':
            appendMessage("Colin: For a consultant on your ETL process to Postgres or need an engineer of creating an ETL process please see examples on  <a href='dev_ops.html' target='Dev Ops'>Dev Ops</a>.");
            break;
        case '8':
            appendMessage("Colin: For Data Mining whether si 10K excel sheets or 1,000 pdfs Data Mining is a breeze so please see examples on  <a href='dev_ops.html' target='Dev Ops'>Dev Ops</a>. ");
            break;
        case '9':
            appendMessage("Colin: API engineer or consultant on your projects for creating an API to automate and supercharge your data needs please see examples on  <a href='dev_ops.html' target='Dev Ops'>Dev Ops</a>.");
            break;
        case '10':
            appendMessage("Colin: Check out my Dev Ops examples on  <a href='dev_ops.html' target='Dev Ops'>Dev Ops</a>.");
            break;
        case 'return':
            appendMessage("Colin: Welcome back! How can I assist you today?");
            isChoosingOption = false;
            break;
        case 'yes':
            clearChat();  // Clear the chat first
            appendMessage("Colin: Great! What else would you like to know?");
            break;
        case 'no':
            toggleChatbot();  // Simulate the "End Chat" button behavior
            break;
        default:
            appendMessage("Colin: I'm sorry, I didn't understand your choice. Please type the number of your choice.");
            return;
    }

    // Provide the next question or message
    if (!shouldRestart) {
        provideNextQuestion();
    }
}

function provideNextQuestion() {
    // Implement the logic for the next question here
    // For example:
    appendMessage("Colin: Next question...Type Yes or Click End Chat Below"); // Add your next question
    isChoosingOption = false; // Allow the user to type their response
}

function clearChat() {
    const chatbotMessages = document.getElementById('chatbotMessages');
    chatbotMessages.innerHTML = ''; // Clear the chat
}

function startConversation() {
    shouldRestart = false; // Reset the restart flag
    isChoosingOption = false; // Reset the option flag
    clearChat();
    appendMessage("Colin: Hello! How can I assist you today?");
    provideOptions();
}

// Listen for click events on the send button
document.getElementById('sendButton').addEventListener('click', function() {
    sendMessage();
});

// Start a new conversation when the chatbot is first opened
startConversation();
