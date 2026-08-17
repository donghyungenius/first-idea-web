document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('interactive-card');
    const glow1 = document.querySelector('.glow-1');
    const glow2 = document.querySelector('.glow-2');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = 0;
    let currentY = 0;
    let isHovered = false;

    // Smooth cursor tracking for 3D card tilt & ambient lights
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    card.addEventListener('mouseenter', () => {
        isHovered = true;
    });

    card.addEventListener('mouseleave', () => {
        isHovered = false;
    });

    function updateCardMovement() {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        const targetTiltX = (mouseY - cardCenterY) / 28 * -1;
        const targetTiltY = (mouseX - cardCenterX) / 28;

        // Linear interpolation for silky smooth motion
        currentX += (targetTiltX - currentX) * 0.08;
        currentY += (targetTiltY - currentY) * 0.08;

        const scale = isHovered ? 1.02 : 1;
        card.style.transform = `perspective(1200px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg) scale(${scale})`;

        // Ambient lights subtle follow
        if (glow1 && glow2) {
            const moveX = (mouseX / window.innerWidth - 0.5) * 50;
            const moveY = (mouseY / window.innerHeight - 0.5) * 50;
            glow1.style.transform = `translate(${moveX}px, ${moveY}px)`;
            glow2.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
        }

        requestAnimationFrame(updateCardMovement);
    }

    requestAnimationFrame(updateCardMovement);

    // Subtle click press reaction
    card.addEventListener('mousedown', () => {
        card.style.transform = `perspective(1200px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg) scale(0.98)`;
    });

    card.addEventListener('mouseup', () => {
        card.style.transform = `perspective(1200px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg) scale(1.02)`;
    });
});
