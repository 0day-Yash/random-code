// Mobile navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    // Toggle mobile menu
    function toggleMobileMenu() {
        const isOpen = mobileMenu.classList.contains('translate-x-0');
        mobileMenu.classList.toggle('translate-x-0');
        mobileMenu.classList.toggle('translate-x-full');
        document.body.style.overflow = isOpen ? '' : 'hidden';
    }

    // Event listeners
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    mobileMenuClose.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking on links
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('translate-x-0') && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuButton.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('translate-x-0')) {
            toggleMobileMenu();
        }
    });
});