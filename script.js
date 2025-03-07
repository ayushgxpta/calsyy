// Wait for the page to fully load
document.addEventListener('DOMContentLoaded', function () {
  // Check if the admin link exists
  const adminLink = document.getElementById('admin-link');

  if (adminLink) {
    // Add a click event listener to the admin link
    adminLink.addEventListener('click', function (e) {
      e.preventDefault(); // Stop the link from redirecting
      document.getElementById('password-prompt').style.display = 'block'; // Show the password prompt
    });
  }

  // Add similar checks for other elements
  const loginButton = document.getElementById('login-button');
  if (loginButton) {
    loginButton.addEventListener('click', function () {
      const enteredPassword = document.getElementById('admin-password').value;
      const errorMessage = document.getElementById('error-message');

      if (enteredPassword === 'ayush2012') { // Replace with your password
        // Show admin panel
        document.getElementById('admin-panel').style.display = 'block';
        document.getElementById('password-prompt').style.display = 'none';
      } else {
        // Show error message
        errorMessage.style.display = 'block';
      }
    });
  }

  // Close password prompt when the close button is clicked
  const closePrompt = document.getElementById('close-prompt');
  if (closePrompt) {
    closePrompt.addEventListener('click', function () {
      document.getElementById('password-prompt').style.display = 'none';
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const productsGrid = document.querySelector(".products-grid");
  const prevButton = document.querySelector(".slider-controls .prev");
  const nextButton = document.querySelector(".slider-controls .next");

  if (productsGrid && prevButton && nextButton) {
      const scrollAmount = 200; // Adjust scroll amount as needed

      prevButton.addEventListener("click", () => {
          productsGrid.scrollBy({
              left: -scrollAmount,
              behavior: "smooth"
          });
      });

      nextButton.addEventListener("click", () => {
          productsGrid.scrollBy({
              left: scrollAmount,
              behavior: "smooth"
          });
      });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".toggle-review-form");
  const reviewFormContainer = document.querySelector(".add-review");
  const reviewForm = document.getElementById("reviewForm");
  const reviewsList = document.querySelector(".reviews-list");
  const stars = document.querySelectorAll(".star-rating .star");
  const ratingInput = document.getElementById("ratingValue");

  // Toggle Review Form Visibility
  if (toggleButton && reviewFormContainer) {
      toggleButton.addEventListener("click", function () {
          reviewFormContainer.classList.toggle("visible");
          reviewFormContainer.style.display = reviewFormContainer.classList.contains("visible") ? "block" : "none";
      });
  }

  // Star Rating Logic
  stars.forEach((star) => {
      star.addEventListener("click", function () {
          const value = parseInt(star.getAttribute("data-value"));
          ratingInput.value = value;

          stars.forEach((s, index) => {
              if (index < value) {
                  s.classList.add("filled");
              } else {
                  s.classList.remove("filled");
              }
          });
      });
  });

  // Review Submission Logic
  if (reviewForm && reviewsList) {
      reviewForm.addEventListener("submit", function (e) {
          e.preventDefault();

          // Get form values
          const reviewerName = document.getElementById("reviewerName").value;
          const reviewText = document.getElementById("reviewText").value;
          const rating = ratingInput.value;

          // Validate rating
          if (rating === "0") {
              alert("Please select a rating.");
              return;
          }

          // Create new review card
          const newReview = document.createElement("div");
          newReview.classList.add("review-card");
          newReview.innerHTML = `
              <h4 class="reviewer-name">${reviewerName}</h4>
              <div class="star-rating">
                  ${Array.from({ length: 5 }, (_, i) => `
                      <span class="star ${i < rating ? 'filled' : ''}">&#9733;</span>
                  `).join("")}
              </div>
              <p class="review-text">"${reviewText}"</p>
          `;

          // Add new review to the top of the list
          reviewsList.prepend(newReview);

          // Clear the form and hide it
          reviewForm.reset();
          stars.forEach((star) => star.classList.remove("filled"));
          ratingInput.value = "0";
          reviewFormContainer.classList.remove("visible");
          reviewFormContainer.style.display = "none";
      });
  }
});


async function fetchProductData() {
  try {
      const response = await fetch("https://calsyy-backend.onrender.com/api/products");
      const products = await response.json();
      if (products.length > 0) {
          const product = products[0]; // Assuming you need the first product
          const images = product.descriptionPictures;

          if (images.length >= 3) {
              document.getElementById("desc-img-1").src = images[0];
              document.getElementById("desc-img-2").src = images[1];
              document.getElementById("desc-img-3").src = images[2];
          }
      }
  } catch (error) {
      console.error("Error fetching product data:", error);
  }
}

fetchProductData();
