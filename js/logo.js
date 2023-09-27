let lastScrollTop = 0;
const stickyLogo = document.querySelector(".sticky-logo");

window.addEventListener("scroll", function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop){
        // On scroll down
        showTooltip();
    } else {
        // On scroll up
        hideTooltip();
    }
    lastScrollTop = currentScroll;
});

function showTooltip() {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = stickyLogo.getAttribute('data-tooltip');
    stickyLogo.appendChild(tooltip);
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}
