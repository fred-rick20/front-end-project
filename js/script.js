//Add to Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const cartButtons = document.querySelectorAll('.product-item button');
    
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Item added to cart!');
            
        });
    });
});



// Function to add an item to the cart
function addToCart(product) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert(`${product.name} has been added to your cart.`);
}

// Add event listeners to "Add to Cart" buttons
const products = document.querySelectorAll('.product-item');
products.forEach(product => {
    product.querySelector('button').addEventListener('click', () => {
        const productName = product.querySelector('h3').innerText;
        const productPrice = parseFloat(product.querySelector('p').innerText.replace('$', ''));
        addToCart({ name: productName, price: productPrice });
    });
});

// Display cart items when the cart page loads
if (document.body.classList.contains('cart')) {
    displayCartItems();
}

// Function to display cart items on the cart page
function displayCartItems() {
    const cartSection = document.querySelector('.cart-items');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartSection.innerHTML = '';

    if (cartItems.length === 0) {
        cartSection.innerHTML = '<p>Your cart is currently empty. Start shopping now!</p>';
    } else {
        cartItems.forEach((item, index) => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <p>${item.name} - $${item.price}</p>
                <button class="remove-from-cart" onclick="removeFromCart(${index})">Remove</button>
            `;
            cartSection.appendChild(cartItemDiv);
        });
    }

    updateCartSummary();
}

// Function to update cart summary (total cost, etc.)
function updateCartSummary() {
    const cartSummary = document.querySelector('.cart-summary');
    if (!cartSummary) return; 
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    cartSummary.innerHTML = `<h3>Total: $${totalPrice.toFixed(2)}</h3>`;
}

// Function to remove an item from the cart
function removeFromCart(index) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1); 
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems(); 
}


