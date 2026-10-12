document.addEventListener('DOMContentLoaded', () => {
    const curtainOverlay = document.getElementById('curtainOverlay');
    setTimeout(() => {
        curtainOverlay.classList.add('is-open');
    }, 200);

    const pageLinks = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');

    pageLinks.forEach(link => {
        link.addEventListener('click', (event) => {
        event.preventDefault(); 
        
        const targetUrl = link.href;

        curtainOverlay.classList.remove('is-open');

        setTimeout(() => {
            window.location.href = targetUrl;
        }, 1500); 
        });
    });
});
