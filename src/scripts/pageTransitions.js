    document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector('nav');

    // Check if it's the first load using sessionStorage
    const isFirstLoad = !sessionStorage.getItem('navLoaded');
    const isFirstVisit = !localStorage.getItem('hasVisited');

    // If it's the first visit, run the slide-in animation for the nav
    if (isFirstVisit) {
        // alert("firstload");
        nav.classList.add('nav-slide-in'); // Apply the slide-in class to the nav
        localStorage.setItem('hasVisited', 'true'); // Mark that the user has visited the page
    }

    const main = document.querySelector('main');
    const links = document.querySelectorAll('a'); // Get all links

    // Function to trigger slide-up animation and delay navigation
    function handleLinkClick(e) {
        e.preventDefault(); // Stop the link from navigating immediately

        const href = e.target.href; // Get the target URL

        if (main) {
        main.classList.remove('slide-down'); // Remove slide-down if it's applied
        main.classList.add('slide-up'); // Apply slide-up animation
        }

        // Wait for animation to finish (0.5s), then navigate to the link
        setTimeout(() => {
        window.location.href = href; // Navigate after animation completes
        }, 500); // The timeout matches the animation duration
    }

    // Slide down when the page loads
    if (main) {
        main.classList.add('slide-down');
    }

    // Attach event listeners to each link to handle click animations
    links.forEach((link) => {
        link.addEventListener('click', handleLinkClick);
    });
    });