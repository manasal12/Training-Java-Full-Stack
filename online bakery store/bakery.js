
function BakeryItem(name, price, weight) {
    this.name = name;
    this.price = price;
    this.weight = weight;
}


BakeryItem.prototype.getDetails = function() {
    return `${this.name} - $${this.price} | Weight: ${this.weight}g`;
}


const bakeryItems = [
    new BakeryItem("Chocolate Cake", 15.99, 500),
    new BakeryItem("Vanilla Pastry", 2.99, 150),
    new BakeryItem("Almond Croissant", 3.49, 120),
    new BakeryItem("Strawberry Cake", 18.99, 600)
];

let cart = [];  
function renderItems() {
    const itemListDiv = document.getElementById("item-list");
    itemListDiv.innerHTML = "";  

    bakeryItems.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p><strong>Price:</strong> $${item.price}</p>
            <p><strong>Weight:</strong> ${item.weight}g</p>
            <button onclick="addToCart(${index})">Add to Cart</button>
        `;
        itemListDiv.appendChild(itemDiv);
    });
}


function addToCart(index) {
    const item = bakeryItems[index];
    cart.push(item);
    alert(`${item.name} has been added to your cart!`);
    renderCart();  
}


function renderCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";  

    if (cart.length === 0) {
        cartDiv.innerHTML = "<p>Your cart is empty!</p>";
    } else {
        cart.forEach(item => {
            const cartItemDiv = document.createElement("div");
            cartItemDiv.innerHTML = `<p>${item.name} - $${item.price} | Weight: ${item.weight}g</p>`;
            cartDiv.appendChild(cartItemDiv);
        });
    }
}
renderItems();
