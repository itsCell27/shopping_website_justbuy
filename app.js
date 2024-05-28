
// For search bar
document.getElementById('search-btn').addEventListener('click', function() {
    const searchContainer = document.getElementById('search-container');
    if (searchContainer.style.display === 'block') {
        searchContainer.style.display = 'none';
    } else {
        searchContainer.style.display = 'block';
    }
});

// Add event listeners to all buttons with the class 'toggle-btn'
document.querySelectorAll('.toggle-btn').forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const targetContainer = document.getElementById(targetId);
        if (targetContainer.style.display === 'block') {
            targetContainer.style.display = 'none';
        } else {
            targetContainer.style.display = 'block';
        }
    });
});

// Generic function to open a page
function openPage(url) {
    window.open(url, '_self');
}

// Add event listeners to elements with the data-open attribute
document.querySelectorAll('[data-open]').forEach(button => {
    button.addEventListener('click', function() {
        const url = this.getAttribute('data-open');
        openPage(url);
    });
});


// For opening home
function open_home(){

    window.open('index.html', '_self');
}

// Function to filter products based on search query
function filterProducts(query) {
    // Convert query to lowercase for case-insensitive comparison
    const lowerCaseQuery = query.toLowerCase();

    // Select all products
    const products = document.querySelectorAll('.box');

    // Loop through each product
    products.forEach(product => {
        // Get the product name and convert it to lowercase
        const productName = product.getAttribute('data-name').toLowerCase();
        
        // Check if the product name includes the query
        if (productName.includes(lowerCaseQuery)) {
            // If it includes the query, display the product
            product.style.display = 'block';
        } else {
            // If not, hide the product
            product.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Function to extract query parameter from URL
    function getQueryParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Function to filter products based on search query
    function filterProducts(query) {
        // Convert query to lowercase for case-insensitive comparison
        const lowerCaseQuery = query.toLowerCase();

        // Select all products
        const products = document.querySelectorAll('.box');

        // Loop through each product
        products.forEach(product => {
            // Get the product name and convert it to lowercase
            const productName = product.getAttribute('data-name').toLowerCase();
            
            // Check if the product name includes the query
            if (productName.includes(lowerCaseQuery)) {
                // If it includes the query, display the product
                product.style.display = 'block';
            } else {
                // If not, hide the product
                product.style.display = 'none';
            }
        });
    }

    // Get the search query parameter from the URL
    const query = getQueryParameter('q');

    // If a search query is present, apply it for filtering
    if (query) {
        // Set the value of the search box to the query
        document.getElementById('search_box').value = query;
        
        // Filter products based on the query
        filterProducts(query);
    }

    // Event listener for input in the search box
    document.getElementById('search_box').addEventListener('input', function() {
        // Get the value of the search box
        const query = this.value;
        
        // Filter products based on the search query
        filterProducts(query);
    });

    // Event listener for keydown event (for detecting Enter key) on search box
    document.getElementById('search_box').addEventListener('keydown', function(event) {
        // Check if the key pressed is Enter
        if (event.key === 'Enter') {
            // Prevent the default behavior of the Enter key (form submission)
            event.preventDefault();

            // Get the value of the search box and trim any leading/trailing whitespace
            const query = this.value.trim();
            
            // Check if the query is not empty
            if (query !== '') {
                // Navigate to products.html with the search query
                window.location.href = 'products.html?q=' + encodeURIComponent(query);
            }
        }
    });
});



// Scroll to a specific div on button click
document.querySelectorAll('.scroll_button').forEach(button => {
    
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});


// For cart.html

// Load cart data from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadCartData);

// Function to add items to the cart
function addToCart(name, price, imgSrc) {
    const cartItemsElement = document.getElementById('cart-items');
    const existingItem = Array.from(cartItemsElement.children).find(item => item.dataset.name === name);

    if (existingItem) {
        const quantityInput = existingItem.querySelector('.quantity-input');
        quantityInput.value = parseInt(quantityInput.value) + 1;
        updateItemPrice(existingItem, price);
    } else {
        const item = createCartItemElement(name, price, imgSrc);
        cartItemsElement.appendChild(item);
    }

    updateTotal();
    saveCartData();
}

// Function to create a cart item element
function createCartItemElement(name, price, imgSrc) {
    const item = document.createElement('li');
    item.dataset.name = name;
    item.innerHTML = `
        <div class="cart_whole">
            <button id="cart_del" class="fa-solid fa-xmark" onclick="deleteItem('${name}')"></button>
            <img class="cart-img" src="${imgSrc}" alt="${name} Image">
            <div class="cart-actions">
                <div class="cart_span">
                    <span>${name} - $<span class="item-price">${price.toFixed(2)}</span></span>
                </div>
                <div class="cart_div">
                    <button class="quantity-btn fa-solid fa-minus" onclick="changeQuantity('${name}', ${price}, -1)"></button>
                    <input class="quantity-input" type="number" value="1" min="1" onchange="updateQuantity('${name}', ${price})">
                    <button class="quantity-btn fa-solid fa-plus" onclick="changeQuantity('${name}', ${price}, 1)"></button>
                </div>
            </div>
        </div>
    `;
    return item;
}

// Function to change the quantity of a cart item
function changeQuantity(name, price, delta) {
    const cartItemsElement = document.getElementById('cart-items');
    const item = Array.from(cartItemsElement.children).find(item => item.dataset.name === name);
    const quantityInput = item.querySelector('.quantity-input');
    const newQuantity = parseInt(quantityInput.value) + delta;

    if (newQuantity >= 1) {
        quantityInput.value = newQuantity;
        updateItemPrice(item, price);
        updateTotal();
        saveCartData();
    }
}

// Function to update the total cart amount
function updateTotal() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    let total = 0;

    Array.from(cartItemsElement.children).forEach(item => {
        const itemPrice = parseFloat(item.querySelector('.item-price').textContent);
        total += itemPrice;
    });

    cartTotalElement.textContent = total.toFixed(2);
}

// Function to update the quantity and price of a cart item
function updateQuantity(name, price) {
    const cartItemsElement = document.getElementById('cart-items');
    const item = Array.from(cartItemsElement.children).find(item => item.dataset.name === name);
    const quantityInput = item.querySelector('.quantity-input');
    const quantity = parseInt(quantityInput.value);

    if (quantity >= 1) {
        updateItemPrice(item, price);
        updateTotal();
        saveCartData();
    } else {
        quantityInput.value = 1;
    }
}

// Function to update the price of a cart item based on quantity
function updateItemPrice(item, price) {
    const quantity = parseInt(item.querySelector('.quantity-input').value);
    const newPrice = price * quantity;
    item.querySelector('.item-price').textContent = newPrice.toFixed(2);
}

// Function to delete an item from the cart
function deleteItem(name) {
    const cartItemsElement = document.getElementById('cart-items');
    const item = Array.from(cartItemsElement.children).find(item => item.dataset.name === name);

    if (item) {
        cartItemsElement.removeChild(item);
        updateTotal();
        saveCartData();
    }
}

// Function to clear all items from the cart
function clearCart() {
    if (confirm('Are you sure you want to checkout?')) {
        const cartItemsElement = document.getElementById('cart-items');
        while (cartItemsElement.firstChild) {
            cartItemsElement.removeChild(cartItemsElement.firstChild);
        }
        updateTotal();
        saveCartData();
    }
}

// Attach the clearCart function to the clear cart button
document.getElementById('clear-cart-btn').addEventListener('click', clearCart);

// Function to save cart data to localStorage
function saveCartData() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartItems = Array.from(cartItemsElement.children).map(item => ({
        name: item.dataset.name,
        price: parseFloat(item.querySelector('.item-price').textContent) / parseInt(item.querySelector('.quantity-input').value),
        imgSrc: item.querySelector('.cart-img').src,
        quantity: parseInt(item.querySelector('.quantity-input').value)
    }));

    localStorage.setItem('cartData', JSON.stringify(cartItems));
}

// Function to load cart data from localStorage
function loadCartData() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];

    cartData.forEach(itemData => {
        const item = createCartItemElement(itemData.name, itemData.price, itemData.imgSrc);
        item.querySelector('.quantity-input').value = itemData.quantity;
        updateItemPrice(item, itemData.price);
        cartItemsElement.appendChild(item);
    });

    updateTotal();
}

