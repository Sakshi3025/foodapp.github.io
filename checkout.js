document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    updateCart(cart);
});

function calculateTotal(cart) {
    let total = 0;
    for (let id in cart) {
        total += cart[id].price * cart[id].quantity;
    }
    return total.toFixed(2);
}

function updateCart(cart) {
    const cartTableBody = document.querySelector("#cart tbody");
    cartTableBody.innerHTML = "";
    for (let id in cart) {
        const item = cart[id];
        const row = document.createElement("tr");
        row.className = "cart-item";
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartTableBody.appendChild(row);
    }
    document.getElementById("order-total").innerText = calculateTotal(cart);
}

function goBack() {
    window.history.back();
}

function completeOrder() {
    alert('Thank you for your order!');
    localStorage.removeItem('cart');
    window.location.href = 'menu.html';
}
