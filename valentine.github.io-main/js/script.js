// Create hearts effect
function createHearts() {
    const hearts = document.querySelector('.hearts');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    hearts.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}

setInterval(createHearts, 300);

// TODO: Thay đường link Facebook của bạn vào đây
const FACEBOOK_REDIRECT_URL = 'https://www.facebook.com/callmexnam';

let letterImagesInterval = null;

// Move "No" button function
function moveButton(button) {
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    
    button.style.position = 'absolute';
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
}

// Navigation functions
function goToStep2() {
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');
    triggerConfetti();
}

function goToStep3() {
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step3').classList.add('active');
    triggerConfetti();
}

function finalStep() {
    document.getElementById('step3').classList.remove('active');
    document.querySelector('.final-message').style.display = 'block';
    document.querySelector('.facebook-btn').style.display = 'inline-block';
    triggerConfetti();
    
    // Additional confetti for the final celebration
    setTimeout(() => triggerConfetti(), 500);
    setTimeout(() => triggerConfetti(), 1000);
    setTimeout(() => triggerConfetti(), 1500);
}

function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Love letter popup
function openLetter() {
    const overlay = document.getElementById('letterOverlay');
    if (overlay) {
        overlay.style.display = 'flex';

        const images = overlay.querySelectorAll('.side-img');
        images.forEach(img => img.classList.remove('visible'));

        let index = 0;
        if (letterImagesInterval) {
            clearInterval(letterImagesInterval);
        }

        letterImagesInterval = setInterval(() => {
            if (index < images.length) {
                images[index].classList.add('visible');
                index++;
            } else {
                clearInterval(letterImagesInterval);
                letterImagesInterval = null;
            }
        }, 1000);

        triggerConfetti();
    }
}

function closeLetter() {
    const overlay = document.getElementById('letterOverlay');
    if (overlay) {
        overlay.style.display = 'none';

        if (letterImagesInterval) {
            clearInterval(letterImagesInterval);
            letterImagesInterval = null;
        }

        const images = overlay.querySelectorAll('.side-img');
        images.forEach(img => img.classList.remove('visible'));
    }

    // Chuyển tiếp sang Facebook sau khi đóng thư
    if (FACEBOOK_REDIRECT_URL) {
        window.location.href = FACEBOOK_REDIRECT_URL;
    }
}