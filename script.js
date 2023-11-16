/*const card = document.querySelector('#card');
const cardHeader = card.querySelector('header');
const resetBtn = document.querySelector('.reset');

// Initialize a variable to keep track of whether the mouse button is clicked
let clicked = false;

// Store the initial position of the card
let startTop = card.offsetTop;
let startLeft = card.offsetLeft;

// Variables to store the offset between the mouse click position and the card's position
let offsetX, offsetY;

// Add an event listener to the card header for the mouse down event
cardHeader.addEventListener('mousedown', (e) => {
    // Set the 'clicked' variable to true when the mouse button is pressed down
    clicked = true;

    // Calculate the offset between the mouse click position and the card's position
    offsetX = e.clientX - card.offsetLeft;
    offsetY = e.clientY - card.offsetTop;
});

// Add an event listener to the entire document for the mouse up event
document.addEventListener('mouseup', () => {
    // Set the 'clicked' variable to false when the mouse button is released
    clicked = false;
});

// Add an event listener to the document for the mouse move event
document.addEventListener('mousemove', (e) => {
    // Check if the mouse button is not clicked, and if so, exit the function
    if (!clicked) return;

    // Update the card's position based on the mouse's current position and the offset
    const { clientX, clientY } = e;
    card.style.left = `${clientX - offsetX}px`;
    card.style.top = `${clientY - offsetY}px`;
});

// Function to reset the card's position to its initial state
function resetPosition() {
    card.style.left = `${startLeft}px`;
    card.style.top = `${startTop}px`;
}

// Add a click event listener to the reset button to call the 'resetPosition' function
resetBtn.addEventListener('click', resetPosition);
*/


const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
    if(track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for(const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
    }
}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);