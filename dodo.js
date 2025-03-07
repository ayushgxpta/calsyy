 // Function to fetch products from the backend
 async function fetchProducts() {
    try {
      const response = await fetch('https://calsyy-backend.onrender.com/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const products = await response.json();
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('related-product-card', 'dynamic-product');

    // Clickable link for product details
    const link = document.createElement('a');
    link.href = `dodo.html?id=${product._id}`;
    link.style.textDecoration = 'none'; // Prevents underline styling

    // Ensure there's at least one image, otherwise use a placeholder
    const imageUrl = product.images && product.images.length > 0 ? product.images[0] : 'placeholder.jpg';

    const image = document.createElement('div');
    image.classList.add('related-product-image');
    image.style.backgroundImage = `url(${imageUrl})`;
    link.appendChild(image); // Image inside link

    const name = document.createElement('h3');
    name.classList.add('related-product-name');
    name.textContent = product.name;
    link.appendChild(name); // Name inside link

    const price = document.createElement('div');
    price.classList.add('related-product-price');
    price.textContent = `Rs. ${Number(product.price).toFixed(2)}`;
    link.appendChild(price); // Price inside link

    card.appendChild(link); // Append the clickable link inside the card

    const addToCartButton = document.createElement('button');
    addToCartButton.classList.add('related-product-add-to-cart', 'cta-btn');
    addToCartButton.setAttribute('aria-label', 'Add to Cart');
    addToCartButton.textContent = 'Add to Cart';
    card.appendChild(addToCartButton); // Button remains separate, NOT inside the link

    return card; // Return the full product card
}





  // Function to render products in the grid
  async function renderProducts() {
    const productsGrid = document.getElementById('related-products-grid');

    // Clear existing dynamically added products
    productsGrid.querySelectorAll('.dynamic-product').forEach(el => el.remove());

    // Fetch and render products
    const products = await fetchProducts();

    if (products.length === 0) {
      productsGrid.innerHTML = '<p>No products available.</p>';
      return;
    }

    // Add product cards to the grid
    products.forEach((product) => {
      const card = createProductCard(product);
      productsGrid.appendChild(card);
    });

    // Reattach click handlers to new buttons
    document.querySelectorAll('.cta-btn').forEach(button => {
      button.addEventListener('click', handleAddToCart);
    });
  }

  // Example function to handle "Add to Cart" button clicks
  function handleAddToCart(event) {
    const productName = event.target.closest('.related-product-card').querySelector('.related-product-name').textContent;
    alert(`Added ${productName} to cart!`);
  }

  // Render products when the page loads
  window.addEventListener('load', renderProducts);

  // Function to get the product ID from URL parameters
function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id'); // Get the 'id' from URL
}

// Function to fetch product details using the ID
async function fetchProductDetails(productId) {
  try {
      const response = await fetch(`https://calsyy-backend.onrender.com/api/products/${productId}`);
      if (!response.ok) throw new Error('Product not found');
      
      const product = await response.json();
      document.querySelector('.product-title').textContent = product.name; // Update title
  } catch (error) {
      console.error('Error fetching product details:', error);
      document.querySelector('.product-title').textContent = 'Product Not Found';
  }
}

// Load product details when the page loads
window.addEventListener('load', () => {
  const productId = getProductIdFromURL();
  if (productId) fetchProductDetails(productId);
});


// Function to get the product ID from URL parameters
function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id'); // Get 'id' from URL
}

// Function to fetch product details using the ID
async function fetchProductDetails(productId) {
  try {
      const response = await fetch(`https://calsyy-backend.onrender.com/api/products/${productId}`);
      if (!response.ok) throw new Error('Product not found');
      
      const product = await response.json();

      // Update product title
      document.querySelector('.product-title').textContent = product.name;

      // Update sale price
      document.querySelector('.sale-price').textContent = `₹${Number(product.price).toFixed(2)}`;

      // Update corrected price
document.querySelector('.regular-price').textContent = `₹${Number(product.correctedPrice).toFixed(2)}`;


      

        // Ensure product.description is rendered as HTML
        const descriptionContainer = document.querySelector('.description-container');
        descriptionContainer.innerHTML = product.description; // Uses innerHTML to retain formatting

  
 
      

  } catch (error) {
      console.error('Error fetching product details:', error);
      document.querySelector('.product-title').textContent = 'Product Not Found';
      document.querySelector('.sale-price').textContent = 'N/A';
  }
}

// Load product details when the page loads
window.addEventListener('load', () => {
  const productId = getProductIdFromURL();
  if (productId) fetchProductDetails(productId);
});



document.addEventListener("DOMContentLoaded", async () => {
  // Get productId from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id"); // Extract product ID dynamically

  if (!productId) {
      console.error("Product ID not found in URL.");
      return;
  }

  try {
      // Fetch product data
      const response = await fetch(`https://calsyy-backend.onrender.com/api/products/${productId}`);
      const product = await response.json();

      // Check if the product has images
      if (product.images && product.images.length > 0) {
          const mainImage = document.querySelector(".main-image");
          const thumbnails = document.querySelectorAll(".thumbnail");

          // Set the first image as the main image
          mainImage.src = product.images[0];

          // Set thumbnail images (ensuring the first thumbnail matches the main image)
          thumbnails.forEach((thumbnail, index) => {
              if (product.images[index]) {
                  thumbnail.src = product.images[index];
              }
          });
      } else {
          console.warn("No images found for this product.");
      }
  } catch (error) {
      console.error("Error fetching product data:", error);
  }
});



