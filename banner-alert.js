// Banner Alert Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already dismissed the banner
    const hasDismissedBanner = localStorage.getItem('hasDismissedBanner');
    
    if (!hasDismissedBanner) {
        // Show banner immediately
        const banner = document.getElementById('alertBanner');
        if (banner) {
            banner.style.display = 'block';
            banner.classList.remove('hidden');
        }
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
            closeBanner();
        }, 8000);
    } else {
        // Hide banner if previously dismissed
        const banner = document.getElementById('alertBanner');
        if (banner) {
            banner.style.display = 'none';
        }
    }
});

function showBanner() {
    const banner = document.getElementById('alertBanner');
    if (banner) {
        banner.style.display = 'block';
        banner.classList.remove('hidden');
    }
}

function closeBanner() {
    const banner = document.getElementById('alertBanner');
    if (banner) {
        // Add exit animation
        banner.classList.add('hidden');
        
        // Hide completely after animation
        setTimeout(() => {
            banner.style.display = 'none';
        }, 500);
        
        // Mark as dismissed in localStorage
        localStorage.setItem('hasDismissedBanner', 'true');
    }
}

// Optional: Function to reset banner (for testing)
function resetBanner() {
    localStorage.removeItem('hasDismissedBanner');
    const banner = document.getElementById('alertBanner');
    if (banner) {
        banner.style.display = 'block';
        banner.classList.remove('hidden');
        showBanner();
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
            closeBanner();
        }, 8000);
    }
}

// Optional: Show banner manually (for demo purposes)
function showBannerManually() {
    const banner = document.getElementById('alertBanner');
    if (banner) {
        banner.style.display = 'block';
        banner.classList.remove('hidden');
        showBanner();
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
            closeBanner();
        }, 8000);
    }
}

// Test function to clear localStorage and show banner
function testBanner() {
    localStorage.removeItem('hasDismissedBanner');
    location.reload();
}
