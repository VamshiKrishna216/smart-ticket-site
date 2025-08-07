// Check if user is logged in
if (!localStorage.getItem("loggedInUser")) {
  window.location.href = "index.html";
}

// Logout function
function logout() {
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}

// Update cart badge count
function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length > 0) {
    badge.textContent = cart.length;
    badge.classList.remove('hidden');
  } else {
    badge.textContent = '';
    badge.classList.add('hidden');
  }
}

// Call on page load
updateCartBadge();

// Add item to cart
function addToCart(itemName, price, itemSrc) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ itemName, price, itemSrc});
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge(); // <-- Add this line
}

function toggleLike(btn) {
  btn.classList.toggle('liked');
}
