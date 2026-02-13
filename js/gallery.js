// gallery.js
class Gallery {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.init();
    }

    init() {
        this.setupLightbox();
        this.setupFilters();
        this.setupHoverEffects();
    }

    setupLightbox() {
        this.galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') return;
                
                const imgSrc = item.querySelector('img').src;
                const title = item.querySelector('h4')?.textContent || 'Gallery Image';
                const description = item.querySelector('p')?.textContent || '';
                
                this.openLightbox(imgSrc, title, description);
            });
        });
    }

    openLightbox(imgSrc, title, description) {
        const lightbox = document.createElement('div');
        lightbox.className = 'gallery-lightbox';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        lightbox.innerHTML = `
            <div class="lightbox-content" style="
                max-width: 90%;
                max-height: 90%;
                position: relative;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            ">
                <button class="lightbox-close" style="
                    position: absolute;
                    top: -40px;
                    right: 0;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 30px;
                    cursor: pointer;
                    z-index: 2001;
                ">×</button>
                <img src="${imgSrc}" alt="${title}" style="
                    max-width: 100%;
                    max-height: 70vh;
                    border-radius: 10px;
                    display: block;
                ">
                <div class="lightbox-info" style="
                    color: white;
                    text-align: center;
                    margin-top: 20px;
                ">
                    <h3 style="margin-bottom: 10px;">${title}</h3>
                    <p>${description}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Trigger animations
        setTimeout(() => {
            lightbox.style.opacity = '1';
            lightbox.querySelector('.lightbox-content').style.transform = 'scale(1)';
        }, 10);
        
        // Close lightbox
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => this.closeLightbox(lightbox));
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox(lightbox);
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeLightbox(lightbox);
            }
        });
    }

    closeLightbox(lightbox) {
        lightbox.style.opacity = '0';
        lightbox.querySelector('.lightbox-content').style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            if (lightbox.parentNode) {
                lightbox.parentNode.removeChild(lightbox);
            }
        }, 300);
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.gallery-filter');
        
        if (filterButtons.length === 0) return;
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.filterGallery(filter);
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    filterGallery(filter) {
        this.galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    setupHoverEffects() {
        this.galleryItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const overlay = item.querySelector('.gallery-overlay');
                if (overlay) {
                    overlay.style.opacity = '1';
                    overlay.style.transform = 'translateY(0)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const overlay = item.querySelector('.gallery-overlay');
                if (overlay) {
                    overlay.style.opacity = '0';
                    overlay.style.transform = 'translateY(20px)';
                }
            });
        });
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gallery = new Gallery();
});
