// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Load product details
fetch('products.json')
    .then(response => response.json())
    .then(products => {
        const product = products.find(p => p.id == productId);
        if (product) {
            document.getElementById('product-title').textContent = product.name;
            document.getElementById('product-price').textContent = `$${product.price}`;
            document.getElementById('product-description').textContent = product.description;
            document.getElementById('product-img').src = `images/${product.image}`;
        }
    });

function addToCart() {
    alert('Added to cart!');
}