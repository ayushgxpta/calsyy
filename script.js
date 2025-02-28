// Show loading spinner
const grid = document.querySelector('.products-grid');
grid.innerHTML = '<div class="loading-spinner"></div>';

// Add CSS for loading spinner
const style = document.createElement('style');
style.innerHTML = `
.loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid var(--primary-color);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 2rem auto;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);
