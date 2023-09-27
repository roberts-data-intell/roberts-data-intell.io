let messages = [
    "The GAME CHANGER is the details the data is VISUALIZING.",
    "Here is another important message.",
    "And yet another interesting fact."
];

let currentIndex = 0;

function changeMessage() {
    let movingTextDiv = document.querySelector('.movingText');
    
    movingTextDiv.textContent = messages[currentIndex];
    movingTextDiv.style.animation = 'none'; // Resetting the animation
    setTimeout(function() {
        movingTextDiv.style.animation = ''; // Restarting the animation
    }, 10);
    
    currentIndex++;
    if (currentIndex >= messages.length) {
        currentIndex = 0;
    }
}

// Call the function initially
changeMessage();

// Change message every 20 seconds (assuming the animation duration is 20s as before)
setInterval(changeMessage, 20000);
