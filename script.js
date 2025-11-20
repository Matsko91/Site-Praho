// =========================
// ⚠️ P A N I E R   S Y S T È M E
// =========================

// Charger le panier depuis le localStorage ou créer un panier vide
let cart = JSON.parse(localStorage.getItem("praho_cart")) || [];

// Sélecteurs
const cartBtn = document.createElement("div");
cartBtn.id = "cart-btn";
cartBtn.innerHTML = "🛒";
document.body.appendChild(cartBtn);

const cartPopup = document.createElement("div");
cartPopup.id = "cart-popup";
cartPopup.innerHTML = `
    <h2>Votre Panier</h2>
    <div id="cart-items"></div>
    <p id="cart-total"></p>
    <button id="close-cart">Fermer</button>
`;
document.body.appendChild(cartPopup);

// Sons effets hacker
const clickSound = new Audio(
  "https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3"
);

// -------------------------
// 🎯 Ajouter au panier
// -------------------------
function addToCart(name, price) {
    clickSound.play();

    cart.push({ name, price });
    saveCart();

    showNotification(`${name} ajouté au panier !`);
    updateCartPopup();
}

// -------------------------
// 🧨 Supprimer un item
// -------------------------
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartPopup();
}

// -------------------------
// 💾 Sauvegarde du panier
// -------------------------
function saveCart() {
    localStorage.setItem("praho_cart", JSON.stringify(cart));
}

// -------------------------
// 🔥 Mise à jour du popup
// -------------------------
function updateCartPopup() {
    const container = document.getElementById("cart-items");
    const totalText = document.getElementById("cart-total");

    container.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        container.innerHTML += `
            <div class="cart-item">
                <p>${item.name} - <span style="color:red;">${item.price}€</span></p>
                <button class="remove-btn" onclick="removeItem(${index})">X</button>
            </div>
        `;
    });

    totalText.innerHTML = `<strong>Total : ${total}€</strong>`;
}

// -------------------------
// 🛒 Ouvrir / Fermer le panier
// -------------------------
cartBtn.onclick = () => {
    clickSound.play();
    cartPopup.style.display = "block";
    updateCartPopup();
};

document.getElementById("close-cart").onclick = () => {
    cartPopup.style.display = "none";
};

// -------------------------
// 🔔 Notification stylée
// -------------------------
function showNotification(msg) {
    const notif = document.createElement("div");
    notif.className = "notif";
    notif.innerText = msg;

    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.opacity = "0";
        setTimeout(() => notif.remove(), 500);
    }, 1800);
}

// ==============================
// 🎨 Style JS ajouté (popup + bouton)
// ==============================
const style = document.createElement("style");
style.innerHTML = `
#cart-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #f00;
    color: #fff;
    font-size: 30px;
    padding: 12px 18px;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.3s;
    z-index: 999;
}
#cart-btn:hover {
    background: #fff;
    color: #f00;
}

#cart-popup {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #111;
    border: 2px solid #f00;
    padding: 25px;
    width: 320px;
    z-index: 1000;
    color: white;
    border-radius: 5px;
    box-shadow: 0 0 15px #f00;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
}

.remove-btn {
    background: #f00;
    border: none;
    color: #fff;
    padding: 5px 10px;
    cursor: pointer;
}

.remove-btn:hover {
    background: #fff;
    color: #f00;
}

.notif {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #f00;
    padding: 12px 20px;
    color: #fff;
    border-radius: 4px;
    font-weight: bold;
    box-shadow: 0 0 10px #f00;
    opacity: 1;
    transition: opacity 0.5s;
    z-index: 10000;
}
`;
document.head.appendChild(style);
