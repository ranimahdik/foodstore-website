// Demo Products
const products = [
  {
    id: 1,
    name: "Fresh Green Salad",
    price: 8.99,
    image: "assets/images/food1.jpg"
  },
  {
    id: 2,
    name: "Beef Burger",
    price: 5.49,
    image: "assets/images/food2.jpg"
  },
  {
    id: 3,
    name: "Margherita Pizza",
    price: 7.75,
    image: "assets/images/food3.jpg"
  },
  {
    id: 4,
    name: "Tasty Pasta",
    price: 6.25,
    image: "assets/images/food4.jpg"
  }
];

// UI State
let cart = [];
let wishlist = [];

// Card Renderer
function renderProducts() {
  const grid = document.querySelector('.products-grid');
  grid.innerHTML = products.map(prod => `
    <div class="product-card" data-id="${prod.id}">
      <img src="${prod.image}" alt="${prod.name}">
      <div class="card-body">
        <h3>${prod.name}</h3>
        <p>$${prod.price.toFixed(2)}</p>
        <button class="btn ${cart.includes(prod.id) ? 'in-cart' : ''}" onclick="addToCart(${prod.id})">
          ${cart.includes(prod.id) ? 'In Cart' : 'Add to Cart'}
        </button>
        <button class="btn btn-wishlist ${wishlist.includes(prod.id) ? 'in-wishlist' : ''}" onclick="addToWishlist(${prod.id})">
          ${wishlist.includes(prod.id) ? '♥ In Wishlist' : '♥ Wishlist'}
        </button>
      </div>
    </div>
  `).join('');
}
window.renderProducts = renderProducts; // for inline onclick

// Add to Cart
window.addToCart = function(id) {
  if (!cart.includes(id)) cart.push(id);
  updateIndicators();
  renderProducts();
  renderCart();
};
// Add to Wishlist
window.addToWishlist = function(id) {
  if (!wishlist.includes(id)) wishlist.push(id);
  updateIndicators();
  renderProducts();
  renderWishlist();
};
// Remove from Cart
window.removeFromCart = function(id) {
  cart = cart.filter(pid => pid !== id);
  updateIndicators();
  renderProducts();
  renderCart();
};
// Remove from Wishlist
window.removeFromWishlist = function(id) {
  wishlist = wishlist.filter(pid => pid !== id);
  updateIndicators();
  renderProducts();
  renderWishlist();
};

// Cart Modal (Demo)
function renderCart() {
  const sec = document.getElementById('cart');
  if (!cart.length) { sec.innerHTML = ''; return; }
  let content = `<div class='panel-demo'><h3>Your Cart</h3><ul>`;
  let total = 0;
  cart.forEach(id => {
    const p = products.find(pr => pr.id === id);
    if(!p) return;
    total += p.price;
    content += `<li>${p.name} – $${p.price.toFixed(2)} <button onclick="removeFromCart(${id})" style="background:none;border:none;color:#e52e71;cursor:pointer;">Remove</button></li>`;
  });
  content += `</ul><b>Total: $${total.toFixed(2)}</b><br><a class='btn' href="#">Place Order (demo)</a></div>`;
  sec.innerHTML = content;
}
// Wishlist Modal (Demo)
function renderWishlist() {
  const sec = document.getElementById('wishlist');
  if (!wishlist.length) { sec.innerHTML = ''; return; }
  let content = `<div class='panel-demo'><h3>Your Wishlist</h3><ul>`;
  wishlist.forEach(id => {
    const p = products.find(pr => pr.id === id);
    if(!p) return;
    content += `<li>${p.name} <button onclick="removeFromWishlist(${id})" style="background:none;border:none;color:#e52e71;cursor:pointer;">Remove</button></li>`;
  });
  content += "</ul></div>";
  sec.innerHTML = content;
}
// Update cart/wishlist indicators
function updateIndicators() {
  document.querySelectorAll('.cart-indicator').forEach(el => el.textContent = cart.length);
  document.querySelectorAll('.wishlist-indicator').forEach(el => el.textContent = wishlist.length);
}

// ------------- Slider --------------
let slideCurrent = 0;
function showSlide(i) {
  let slides = document.querySelectorAll('.slider img');
  slideCurrent = (i + slides.length) % slides.length;
  slides.forEach((img, n) => img.classList.toggle('active', n === slideCurrent));
}
document.querySelector('.slider .next').onclick = () => showSlide(slideCurrent+1);
document.querySelector('.slider .prev').onclick = () => showSlide(slideCurrent-1);
showSlide(slideCurrent);

// ------------- Dark mode --------------
document.getElementById('darkmode-toggle').onclick = function() {
  if(document.body.getAttribute('data-theme')==='dark')
    document.body.setAttribute('data-theme','light');
  else
    document.body.setAttribute('data-theme','dark');
};

// On load render everything
renderProducts();
updateIndicators();