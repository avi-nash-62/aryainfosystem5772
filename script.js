const images = [
    { url: 'image6.jpg', title: 'ARYA INFO SYSTEM', description: 'Your trusted partner for all IT solutions.' },
    { url: 'image3.png', title: 'Expert Cartridge Refilling', description: 'High-quality refills, eco-friendly approach.' },
    { url: 'image4.png', title: 'IT Support & Services', description: 'Reliable solutions for your home and business.' },
     { url: 'images.jpg', title: 'IT Support & Services', description: 'Reliable solutions for your home and business.' },
      { url: 'image5.png', title: 'IT Support & Services', description: 'Reliable solutions for your home and business.' }
];

let currentSlide = 0;
const heroBackgroundImage = document.querySelector('.hero-background-image');
const typewriterTextElement = document.querySelector('.typewriter-text');
const heroDescriptionElement = document.querySelector('.hero-description');
let typingTimeout; // To clear previous typing effect

function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
        // Typing chal rahi hai, border dikhao
        typewriterTextElement.style.borderRight = "3px solid orange"; 
        typewriterTextElement.innerHTML = text.substring(0, i + 1);
        
        setTimeout(function() {
            typeWriter(text, i + 1, fnCallback);
        }, 80);
    } else {
        // Text khatam! 1 second baad cursor hata do
        setTimeout(() => {
            typewriterTextElement.style.borderRight = "none";
        }, 500);

        if (typeof fnCallback == 'function') {
            setTimeout(fnCallback, 2000);
        }
    }
}

function updateHeroContent() {
    clearTimeout(typingTimeout); // Clear any ongoing typing effect
    typewriterTextElement.innerHTML = ''; // Clear text for new typing effect
    heroDescriptionElement.textContent = images[currentSlide].description;

    // Change background image with a slight delay for smoother transition
    heroBackgroundImage.style.opacity = 0;
    setTimeout(() => {
        heroBackgroundImage.style.backgroundImage = `url(${images[currentSlide].url})`;
        heroBackgroundImage.style.opacity = 1;
    }, 500); // Half of the CSS transition duration

    // Start typewriter effect for the title
    typeWriter(images[currentSlide].title, 0, function(){
        // Callback after typing finishes, if needed
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % images.length;
    updateHeroContent();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + images.length) % images.length;
    updateHeroContent();
}

// Initial load
updateHeroContent();

// Automatic slide change (e.g., every 5 seconds)
setInterval(nextSlide, 5000); 

// Add event listeners for navigation buttons (if you implement them)
document.querySelector('.next-slide').addEventListener('click', nextSlide);
document.querySelector('.prev-slide').addEventListener('click', prevSlide);
function gotopage() {
    window.location.href = "detailaryainfopage.html";
}
const counters = document.querySelectorAll('.counter');

const observerOptions = {
    threshold: 0.5 // Jab 50% section dikhega tab trigger hoga
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const target = +entry.target.getAttribute('data-target');
        
        if (entry.isIntersecting) {
            // Animation Start karne ka function
            const updateCount = () => {
                const count = +entry.target.innerText.replace('+', ''); // Remove '+' for calculation
                const increment = target / 100; // Speed control

                if (count < target) {
                    entry.target.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 20);
                } else {
                    entry.target.innerText = target + "+";
                }
            };
            updateCount();
        } else {
            // Agar section screen se bahar chala gaya, toh reset to 0
            entry.target.innerText = "0";
        }
    });
}, observerOptions);

counters.forEach(counter => {
    counterObserver.observe(counter);
});