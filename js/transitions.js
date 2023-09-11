// Listen for the page to load to trigger the fade-in
window.addEventListener('load', () => {
    const overlay = document.getElementById('overlay');
    overlay.classList.add('fade-out'); // This will make the overlay fade out
  });
  
  // Listen for click events on navigation links for the fade-out
  document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent the default navigation (temporarily)
      const overlay = document.getElementById('overlay');
      overlay.style.opacity = '1';  // Reset the overlay's opacity
      overlay.classList.remove('fade-out'); // This will make the overlay fade in
      
      // Navigate to the clicked link after 1 second
      setTimeout(() => {
        window.location.href = e.target.href;
      }, 1000);
    });
  });
  