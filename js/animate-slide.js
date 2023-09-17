// Example: Trigger the animation with a button click.
document.getElementById('startAnimationButton').addEventListener('click', function() {
    const container = document.querySelector('.front');
    container.style.animation = "spinAnimation 5s ease-out forwards";
});
