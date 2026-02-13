// main.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = mobileMenuBtn?.querySelector('i');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            if (menuIcon) {
                menuIcon.classList.toggle('fa-bars');
                menuIcon.classList.toggle('fa-times');
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (menuIcon) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Animate elements on scroll
        animateOnScroll();
    });

    // Smooth scrolling for anchor links on same page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            // Check if it's an on-page anchor (not a different page)
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const headerHeight = document.getElementById('header')?.offsetHeight || 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Initialize animations
    initAnimations();

    // Form handling
    initForms();

    // Set minimum date for check-in to today
    const checkinInput = document.getElementById('checkin');
    if (checkinInput) {
        const today = new Date().toISOString().split('T')[0];
        checkinInput.min = today;
        
        // Update checkout min date when checkin changes
        checkinInput.addEventListener('change', function() {
            const checkoutInput = document.getElementById('checkout');
            if (checkoutInput) {
                checkoutInput.min = this.value;
                
                // Ensure checkout is after checkin
                if (checkoutInput.value && checkoutInput.value <= this.value) {
                    checkoutInput.value = '';
                }
            }
        });
    }
});

// Animation on scroll function
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
}

// Initialize animations
function initAnimations() {
    // Add animation classes to elements
    document.querySelectorAll('.amenity-card, .gallery-item, .blog-card, .why-choose-card').forEach((el, index) => {
        el.classList.add('fade-in');
    });
    
    // Trigger initial animation check
    animateOnScroll();
}

// Form handling
function initForms() {
    // Newsletter Form (removed from footer, but keep function for any remaining forms)
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert(`Thank you for subscribing with ${email}! You'll receive our exclusive offers soon.`);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                this.reset();
            }, 1000);
        });
    }

    // Contact/Enquiry Form
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert(`Thank you ${name}! Your enquiry has been received. We'll contact you at ${email} within 24 hours.`);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                this.reset();
            }, 1500);
        });
    }
}
