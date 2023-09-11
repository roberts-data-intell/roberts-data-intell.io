// Function to create falling 1's and 0's
function createFallingBinary() {
    const element = document.createElement("div");
    element.innerText = Math.random() < 0.5 ? "0" : "1";
    element.className = "falling-binary";
    document.querySelector('.animation-container').appendChild(element);
    element.style.left = `${Math.random() * 100}vw`;
    
    // Slow down the falling speed by increasing the animation duration range
    element.style.animationDuration = `${Math.random() * 3 + 2}s`;
    
    element.addEventListener("animationend", () => {
      element.remove();
    });
  }
  
  // Generate six times the amount of 1's and 0's by calling the function 6 times
  function generateMultipleBinaries() {
    for(let i = 0; i < 6; i++) {
      createFallingBinary();
    }
  }
  
  // Start generating and stop after 3 seconds
  const intervalId = setInterval(generateMultipleBinaries, 100);
  setTimeout(() => {
    clearInterval(intervalId);
  }, 3000);
