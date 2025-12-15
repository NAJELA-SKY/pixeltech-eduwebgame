// Fungsi umum untuk seluruh halaman
document.addEventListener('DOMContentLoaded', function() {
    // Toggle menu mobile
    const menuToggle = document.getElementById('menuToggle');
    const pixelNav = document.querySelector('.pixel-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            pixelNav.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            if (!pixelNav.contains(event.target) && !menuToggle.contains(event.target)) {
                pixelNav.classList.remove('active');
            }
        }
    });
    
    // Add pixel effect to buttons
    const pixelButtons = document.querySelectorAll('.pixel-button, .controls-button, .quiz-button');
    
    pixelButtons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add animation to cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe feature cards and component cards
    document.querySelectorAll('.feature-card, .component-card').forEach(card => {
        observer.observe(card);
    });
    
    // Add neon glow effect to navigation links
    const navLinks = document.querySelectorAll('.pixel-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 10px ' + getComputedStyle(this).color;
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Update copyright year automatically
    const copyrightElements = document.querySelectorAll('.footer-bottom p');
    const currentYear = new Date().getFullYear();
    
    copyrightElements.forEach(element => {
        if (element.textContent.includes('2023')) {
            element.textContent = element.textContent.replace('2023', currentYear);
        }
    });
    
    // Add loading animation to page
    const loadingAnimation = document.createElement('div');
    loadingAnimation.id = 'loading-animation';
    loadingAnimation.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--dark-bg);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s;
    `;
    
    const pixelLoader = document.createElement('div');
    pixelLoader.style.cssText = `
        width: 60px;
        height: 60px;
        border: 4px solid var(--neon-blue);
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    loadingAnimation.appendChild(pixelLoader);
    document.body.appendChild(loadingAnimation);
    
    // Create CSS for loader animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Remove loader after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingAnimation.style.opacity = '0';
            setTimeout(function() {
                loadingAnimation.style.display = 'none';
            }, 500);
        }, 500);
    });
});

// Fungsi untuk membuat efek pixel pada teks
function createPixelTextEffect(element) {
    const text = element.textContent;
    element.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        span.style.display = 'inline-block';
        span.style.transition = 'all 0.3s';
        
        span.addEventListener('mouseenter', function() {
            this.style.color = getRandomNeonColor();
            this.style.transform = 'translateY(-5px)';
            this.style.textShadow = '0 0 8px currentColor';
        });
        
        span.addEventListener('mouseleave', function() {
            this.style.color = '';
            this.style.transform = '';
            this.style.textShadow = '';
        });
        
        element.appendChild(span);
    }
}

// Fungsi untuk mendapatkan warna neon acak
function getRandomNeonColor() {
    const neonColors = [
        '#00f3ff', // neon blue
        '#00ff9d', // neon green
        '#b967ff', // neon purple
        '#ff2a6d'  // neon pink
    ];
    
    return neonColors[Math.floor(Math.random() * neonColors.length)];
}

// Fungsi untuk membuat efek retro scanline
function createScanlineEffect() {
    const scanline = document.createElement('div');
    scanline.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(to right, transparent, var(--neon-green), transparent);
        box-shadow: 0 0 10px var(--neon-green);
        z-index: 9998;
        pointer-events: none;
        opacity: 0.7;
        animation: scanline 3s linear infinite;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes scanline {
            0% { top: 0; }
            100% { top: 100%; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(scanline);
    
    // Hapus efek setelah beberapa saat di perangkat mobile untuk performa
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            scanline.style.display = 'none';
        }, 5000);
    }
}

// Jalankan efek scanline setelah halaman dimuat
window.addEventListener('load', function() {
    setTimeout(createScanlineEffect, 1000);
});