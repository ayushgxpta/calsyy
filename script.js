document.addEventListener('DOMContentLoaded', () => {
  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      const container = document.querySelector('.products-container');
      
      products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="images/${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>₹${product.price}</p>
          <button class="cta-btn">Add to Cart</button>
        `;
        container.appendChild(card);
      });
    });
});
