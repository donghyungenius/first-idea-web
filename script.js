document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('interactive-card');
    const glow1 = document.querySelector('.glow-1');
    const glow2 = document.querySelector('.glow-2');
    const nextBtn = document.getElementById('next-btn');
    const mainTitle = document.getElementById('main-title');
    const subTitle = document.getElementById('sub-title');
    const categoryBadge = document.getElementById('category-badge');

    // 4가지 영감 문장 및 각 문장별 고유 버튼 색상 테마
    const sentences = [
        {
            badge: "Cheer Up",
            title: "오늘도 힘내세요!",
            sub: "당신의 모든 순간과 빛나는 오늘 하루를 진심으로 응원합니다.",
            color: "blue"
        },
        {
            badge: "Well Done",
            title: "오늘도 해냈어요!",
            sub: "오늘 하루도 최선을 다해 소중한 하루를 채운 당신에게 박수를 보냅니다.",
            color: "yellow"
        },
        {
            badge: "Progress",
            title: "조금씩 나아지고 있어요.",
            sub: "작은 발걸음들이 차곡차곡 쌓여 더 큰 내일의 당신을 만들어갑니다.",
            color: "orange"
        },
        {
            badge: "Keep Going",
            title: "이대로 계속 가봅시다.",
            sub: "스스로를 믿고 당신만의 멋진 리듬과 방향으로 당당하게 나아가세요.",
            color: "green"
        }
    ];

    let currentIndex = 0;
    let isTransitioning = false;

    // 초기 버튼 색상 속성 설정 (Blue)
    if (nextBtn) {
        nextBtn.setAttribute('data-color', sentences[0].color);
    }

    // Next Sentence Button Handler
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Avoid card click conflicts
            if (isTransitioning) return;
            isTransitioning = true;

            currentIndex = (currentIndex + 1) % sentences.length;
            const nextItem = sentences[currentIndex];

            // Update button color immediately with smooth CSS transition
            nextBtn.setAttribute('data-color', nextItem.color);

            // Smooth fade out
            mainTitle.classList.add('content-fade-out');
            subTitle.classList.add('content-fade-out');
            if (categoryBadge) categoryBadge.style.opacity = '0.3';

            setTimeout(() => {
                // Update text
                mainTitle.textContent = nextItem.title;
                subTitle.textContent = nextItem.sub;
                if (categoryBadge) categoryBadge.textContent = nextItem.badge;

                // Smooth fade in
                mainTitle.classList.remove('content-fade-out');
                subTitle.classList.remove('content-fade-out');
                if (categoryBadge) categoryBadge.style.opacity = '1';

                setTimeout(() => {
                    isTransitioning = false;
                }, 300);
            }, 250);
        });
    }

    // 3D Tilt & Ambient Light Tracking
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = 0;
    let currentY = 0;
    let isHovered = false;

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

        currentX += (targetTiltX - currentX) * 0.08;
        currentY += (targetTiltY - currentY) * 0.08;

        const scale = isHovered ? 1.015 : 1;
        card.style.transform = `perspective(1200px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg) scale(${scale})`;

        if (glow1 && glow2) {
            const moveX = (mouseX / window.innerWidth - 0.5) * 45;
            const moveY = (mouseY / window.innerHeight - 0.5) * 45;
            glow1.style.transform = `translate(${moveX}px, ${moveY}px)`;
            glow2.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
        }

        requestAnimationFrame(updateCardMovement);
    }

    requestAnimationFrame(updateCardMovement);
});
