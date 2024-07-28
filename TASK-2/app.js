const themeToggle = document.getElementById('theme-toggle');
const theme = localStorage.getItem('theme');

const body = document.body;

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light')) {
        body.classList.replace('light', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {
        body.classList.replace('dark', 'light');
        localStorage.setItem('theme', 'light');
    }
});