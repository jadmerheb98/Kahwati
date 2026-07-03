const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const toast = document.getElementById('toast');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const clearCart = document.getElementById('clearCart');
let cart = [];

hamburger?.addEventListener('click', () => navLinks.classList.toggle('show'));

document.querySelectorAll('[data-open]').forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.getElementById(button.dataset.open);
    modal?.classList.add('show');
    modal?.setAttribute('aria-hidden', 'false');
  });
});

document.querySelectorAll('[data-close]').forEach(button => {
  button.addEventListener('click', () => closeModal(button.closest('.modal')));
});

document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', event => {
    if (event.target === modal) closeModal(modal);
  });
});

function closeModal(modal) {
  modal?.classList.remove('show');
  modal?.setAttribute('aria-hidden', 'true');
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
}

document.querySelectorAll('.category-card').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.category-card').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const category = button.dataset.category;
    document.querySelectorAll('.shop-card').forEach(card => {
      const match = category === 'all' || card.dataset.type.includes(category);
      card.style.display = match ? '' : 'none';
    });
  });
});

document.querySelectorAll('[data-shop]').forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
    showToast(`${button.dataset.shop} menu opened`);
  });
});

document.querySelectorAll('.add-btn').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.menu-item');
    const name = item.dataset.name;
    const price = Number(item.dataset.price);
    const found = cart.find(product => product.name === name);
    if (found) found.qty += 1;
    else cart.push({ name, price, qty: 1 });
    renderCart();
    showToast(`${name} added to cart`);
  });
});

function renderCart() {
  if (!cart.length) {
    cartItems.innerHTML = '<p class="empty-cart">Add items from the menu to preview checkout.</p>';
    cartTotal.textContent = '$0.00';
    return;
  }
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-row">
      <div><strong>${item.name}</strong><small>Qty ${item.qty} · +${item.qty * 12} Beans</small></div>
      <b>$${(item.price * item.qty).toFixed(2)}</b>
    </div>
  `).join('');
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

clearCart?.addEventListener('click', () => {
  cart = [];
  renderCart();
  showToast('Cart cleared');
});

document.getElementById('bookingForm')?.addEventListener('submit', event => {
  event.preventDefault();
  showToast('Booking preview created');
});

document.getElementById('loginForm')?.addEventListener('submit', event => {
  event.preventDefault();
  closeModal(document.getElementById('loginModal'));
  showToast('Logged in preview');
});

document.getElementById('signupForm')?.addEventListener('submit', event => {
  event.preventDefault();
  closeModal(document.getElementById('signupModal'));
  showToast('Account created preview');
});
