// Sample products array
const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
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

// Function to render cart
function renderCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Clear existing cart items

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <h4>${item.name}</h4>
            <p>Price: $${item.price}</p>
        `;
        cartList.appendChild(cartItem);
    });
}

// Function to add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        sessionStorage.setItem('cart', JSON.stringify(cart)); // Update session storage
        renderCart(); // Update cart display
    }
}

// Event listener for "Add to Cart" buttons
document.getElementById('product-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        addToCart(productId);
    }
});

// Event listener for "Clear Cart" button
document.getElementById('clear-cart').addEventListener('click', () => {
    cart = []; // Clear cart array
    sessionStorage.removeItem('cart'); // Clear session storage
    renderCart(); // Update cart display
});

// Initial render
renderProducts();
renderCart();