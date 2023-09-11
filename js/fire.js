// Apply fire effect for 3 seconds
const fireTextElement = document.getElementById('fireText');
fireTextElement.className = 'fire-effect';

// Wait 3 seconds, then apply the smoke effect for 4 seconds
setTimeout(() => {
  fireTextElement.className = 'smoke-effect';

  // Wait 4 more seconds, then remove all effects to go back to normal
  setTimeout(() => {
    fireTextElement.className = '';
  }, 4000); // 4000 milliseconds = 4 seconds

}, 3000); // 3000 milliseconds = 3 seconds
