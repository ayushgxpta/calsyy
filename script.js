// Load products from JSON
fetch('products.json')
    .then(response => response.json())
    .then(products => {
        const grid = document.querySelector('.products-grid');
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="images/${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <a href="product.html?id=${product.id}">View Product</a>
            `;
            grid.appendChild(productCard);
        });
    });