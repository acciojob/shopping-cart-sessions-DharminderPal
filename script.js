// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Cart storage (array to hold items in the cart)
let cart = [];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Render product list
function renderProducts() {
  productList.innerHTML = ""; // Clear the list before rendering
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
                    <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // Add event listeners for Add to Cart buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = parseInt(e.target.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ""; // Clear the cart list before rendering
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} 
                    <button class="remove-from-cart-btn" data-index="${index}">Remove</button>`;
    cartList.appendChild(li);
  });

  // Add event listeners for Remove from Cart buttons
  const removeFromCartButtons = document.querySelectorAll(".remove-from-cart-btn");
  removeFromCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const itemIndex = parseInt(e.target.getAttribute("data-index"));
      removeFromCart(itemIndex);
    });
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push(product); // Add the product to the cart array
    renderCart(); // Re-render the cart after adding
  }
}

// Remove item from cart
function removeFromCart(itemIndex) {
  cart.splice(itemIndex, 1); // Remove the item at the specified index
  renderCart(); // Re-render the cart after removal
}

// Clear cart
function clearCart() {
  cart = []; // Empty the cart array
  renderCart(); // Re-render the cart after clearing
}

// Event listener for clear cart button
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
