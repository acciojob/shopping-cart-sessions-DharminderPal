// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Initialize cart from session storage
let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

// Function to render products
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear existing products

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productElement);
    });
}

// Render cart list
function renderCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Clear existing cart items

    if (cart.length === 0) {
        cartList.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <h4>${item.name}</h4>
            <p>Price: $${item.price}</p>
            <button class="remove-from-cart" data-index="${index}">Remove</button>
        `;
        cartList.appendChild(cartItem);
    });
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        sessionStorage.setItem('cart', JSON.stringify(cart)); // Update session storage
        renderCart(); // Update cart display
    }
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item from cart
    sessionStorage.setItem('cart', JSON.stringify(cart)); // Update session storage
    renderCart(); // Update cart display
}

// Clear cart
function clearCart() {
    cart = []; // Clear cart array
    sessionStorage.removeItem('cart'); // Clear session storage
    renderCart(); // Update cart display
}

// Event listener for "Add to Cart" buttons
document.getElementById('product-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        addToCart(productId);
    }
});

// Event listener for "Remove from Cart" buttons
document.getElementById('cart-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-from-cart')) {
        const index = parseInt(event.target.getAttribute('data-index'));
        removeFromCart(index);
    }
});

// Event listener for "Clear Cart" button
document.getElementById('clear-cart').addEventListener('click', clearCart);

// Initial render
renderProducts();
renderCart();
