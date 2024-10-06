const container = document.getElementById("container");
const buttons = document.querySelectorAll(".gravity-button");
const collisionBox = document.getElementById("collision-box");

// Set initial positions randomly within the viewport
buttons.forEach((button) => {
  button.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
  button.style.top = `${Math.random() * (window.innerHeight - 100)}px`;

  // Add click event listener to each button
  button.addEventListener("click", () => {
    console.log(`${button.innerText} clicked!`);
  });
});

// Gravity and Collision effect
function applyGravityAndCollisions() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  buttons.forEach((button, index) => {
    const buttonRect = button.getBoundingClientRect();
    const buttonX = buttonRect.left + buttonRect.width / 2;
    const buttonY = buttonRect.top + buttonRect.height / 2;

    // Calculate distance to the center
    const deltaX = centerX - buttonX;
    const deltaY = centerY - buttonY;

    // Apply a force towards the center
    const force = 0.01;
    const newLeft = parseFloat(button.style.left) + deltaX * force;
    const newTop = parseFloat(button.style.top) + deltaY * force;

    button.style.left = `${newLeft}px`;
    button.style.top = `${newTop}px`;

    // Collision detection with the collision box
    const collisionRect = collisionBox.getBoundingClientRect();
    const distanceX = buttonX - (collisionRect.left + collisionRect.width / 2);
    const distanceY = buttonY - (collisionRect.top + collisionRect.height / 5);
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    const minDistance = (buttonRect.width + collisionRect.width) / 2;

    if (distance < minDistance) {
      // Push button away from the collision box
      const angle = Math.atan2(distanceY, distanceX);
      const overlap = minDistance - distance;

      button.style.left = `${
        parseFloat(button.style.left) + Math.cos(angle) * overlap
      }px`;
      button.style.top = `${
        parseFloat(button.style.top) + Math.sin(angle) * overlap
      }px`;
    }

    // Collision detection with other buttons
    buttons.forEach((otherButton, otherIndex) => {
      if (index !== otherIndex) {
        const otherRect = otherButton.getBoundingClientRect();

        // Calculate the difference in positions
        const dx =
          buttonRect.left +
          buttonRect.width / 2 -
          (otherRect.left + otherRect.width / 2);
        const dy =
          buttonRect.top +
          buttonRect.height / 2 -
          (otherRect.top + otherRect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistanceBetweenButtons = buttonRect.width; // Minimum distance between buttons

        if (distance < minDistanceBetweenButtons) {
          // Push buttons apart
          const angle = Math.atan2(dy, dx);
          const overlap = minDistanceBetweenButtons - distance;
          const moveX = Math.cos(angle) * overlap * 0.5;
          const moveY = Math.sin(angle) * overlap * 0.5;

          button.style.left = `${parseFloat(button.style.left) + moveX}px`;
          button.style.top = `${parseFloat(button.style.top) + moveY}px`;

          otherButton.style.left = `${
            parseFloat(otherButton.style.left) - moveX
          }px`;
          otherButton.style.top = `${
            parseFloat(otherButton.style.top) - moveY
          }px`;
        }
      }
    });
  });

  requestAnimationFrame(applyGravityAndCollisions);
}

// Start applying gravity and collisions
applyGravityAndCollisions();
