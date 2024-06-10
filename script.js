/*let cart = {};

function addToCart(id, name, price) {
    if (!cart[id]) {
        cart[id] = { name: name, price: price, quantity: 1 };
    } else {
        cart[id].quantity += 1;
    }
    updateCart();
}

function removeFromCart(id) {
    delete cart[id];
    updateCart();
}

function updateQuantity(id, quantity) {
    if (quantity <= 0) {
        removeFromCart(id);
    } else {
        cart[id].quantity = quantity;
    }
    updateCart();
}

function calculateTotal() {
    let total = 0;
    for (let id in cart) {
        total += cart[id].price * cart[id].quantity;
    }
    return total.toFixed(2);
}

function updateCart() {
    const cartTableBody = document.querySelector("#cart tbody");
    cartTableBody.innerHTML = "";
    for (let id in cart) {
        const item = cart[id];
        const row = document.createElement("tr");
        row.className = "cart-item";
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${id}, this.value)"></td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button onclick="removeFromCart(${id})">Remove</button></td>
        `;
        cartTableBody.appendChild(row);
    }
    document.getElementById("order-total").innerText = calculateTotal();
}

function checkout() {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
}
*/

let cart = JSON.parse(localStorage.getItem('cart')) || {};

function addToCart(id, name, price) {
    if (cart[id]) {
        cart[id].quantity += 1;
    } else {
        cart[id] = { id, name, price, quantity: 1 };
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function removeFromCart(id) {
    if (cart[id]) {
        delete cart[id];
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

function updateCartQuantity(id, quantity) {
    if (cart[id]) {
        cart[id].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

function calculateOrderTotal() {
    let total = 0;
    for (let item in cart) {
        total += cart[item].price * cart[item].quantity;
    }
    document.getElementById('order-total').innerText = total.toFixed(2);
}

function renderCart() {
    const cartTableBody = document.querySelector('#cart tbody');
    cartTableBody.innerHTML = '';

    for (let id in cart) {
        const item = cart[id];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" onchange="updateCartQuantity(${id}, this.value)">
            </td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td>
                <button onclick="removeFromCart(${id})">Remove</button>
            </td>
        `;
        cartTableBody.appendChild(row);
    }
    calculateOrderTotal();
}

function checkout() {
    window.location.href = 'checkout.html';
}

document.addEventListener('DOMContentLoaded', renderCart);
