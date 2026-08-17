document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('interactive-card');
    const glow1 = document.querySelector('.glow-1');
    const glow2 = document.querySelector('.glow-2');
    const nextBtn = document.getElementById('next-btn');
    const mainTitle = document.getElementById('main-title');
    const subTitle = document.getElementById('sub-title');
    const categoryBadge = document.getElementById('category-badge');

    // Inspiring sentence list
    const sentences = [
        {
            badge: "Cheer Up",
            title: "오늘도 힘내세요!",
            sub: "당신의 모든 순간과 빛나는 오늘 하루를 진심으로 응원합니다."
        },
        {
            badge: "Step by Step",
            title: "한 걸음씩 나아가면 됩니다",
            sub: "작은 꾸준함이 모여 마침내 커다란 변화와 성장을 만들어냅니다."
        },
        {
            badge: "Believe in Yourself",
            title: "당신의 가능성은 무한합니다",
            sub: "스스로를 믿고 당신만의 고유한 속도로 당당하게 걸어가세요."
        },
        {
            badge: "Warm Day",
            title: "오늘 하루도 참 소중합니다",
            sub: "지금까지 걸어온 길을 돌아보며 스스로를 따뜻하게 칭찬해 주세요."
        },
        {
            badge: "Bright Future",
            title: "가장 빛나는 순간은 바로 지금",
            sub: "새로운 도전을 주저하지 않는 당신의 용기 있는 걸음이 아름답습니다."
        }
    ];

    let currentIndex = 0;
    let isTransitioning = false;

    // Next Sentence Button Handler
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Avoid card click conflicts
            if (isTransitioning) return;
            isTransitioning = true;

            currentIndex = (currentIndex + 1) % sentences.length;
            const nextItem = sentences[currentIndex];

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
