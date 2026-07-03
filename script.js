const qs=(s,p=document)=>p.querySelector(s);const qsa=(s,p=document)=>[...p.querySelectorAll(s)];
const CART_KEY='kahwati_cart';
const menuItems=[
 {id:'latte',name:'Signature Latte',price:4.5,cat:'coffee',emoji:'☕',desc:'Velvety espresso, steamed milk, and Kahwati golden foam.'},
 {id:'spanish',name:'Spanish Latte',price:5,cat:'coffee',emoji:'🥛',desc:'Sweet creamy iced latte with bold espresso layers.'},
 {id:'coldbrew',name:'Cold Brew',price:4.25,cat:'coffee',emoji:'🧊',desc:'Slow brewed coffee, chocolate notes, ultra smooth finish.'},
 {id:'croissant',name:'Almond Croissant',price:3.75,cat:'snacks',emoji:'🥐',desc:'Buttery croissant filled with almond cream.'},
 {id:'turkey',name:'Turkey Melt',price:6.5,cat:'sandwiches',emoji:'🥪',desc:'Turkey, cheddar, pickles, and house coffee mustard.'},
 {id:'halloumi',name:'Halloumi Ciabatta',price:5.75,cat:'sandwiches',emoji:'🧀',desc:'Grilled halloumi, tomato, basil, olive tapenade.'},
 {id:'brownie',name:'Dark Brownie',price:3.25,cat:'dessert',emoji:'🍫',desc:'Dense chocolate brownie with sea salt.'},
 {id:'matcha',name:'Iced Matcha',price:5.25,cat:'coffee',emoji:'🍵',desc:'Ceremonial matcha, milk, vanilla, and ice.'},
 {id:'cookie',name:'Pistachio Cookie',price:3.5,cat:'dessert',emoji:'🍪',desc:'Soft cookie with pistachio cream and white chocolate.'}
];
function getCart(){return JSON.parse(localStorage.getItem(CART_KEY)||'[]')}
function saveCart(cart){localStorage.setItem(CART_KEY,JSON.stringify(cart));updateCartBadge()}
function addToCart(id){let cart=getCart();let item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});saveCart(cart);toast('Added to cart');}
function updateQty(id,delta){let cart=getCart().map(x=>x.id===id?{...x,qty:x.qty+delta}:x).filter(x=>x.qty>0);saveCart(cart);renderCart()}
function updateCartBadge(){const n=getCart().reduce((s,x)=>s+x.qty,0);qsa('[data-cart-count]').forEach(el=>el.textContent=n)}
function money(n){return '$'+n.toFixed(2)}
function toast(text){let t=qs('.toast');if(!t){t=document.createElement('div');t.className='floating-order toast';document.body.appendChild(t)}t.textContent=text;t.style.display='block';setTimeout(()=>t.style.display='none',1400)}
function renderMenu(cat='all'){const grid=qs('#menuGrid');if(!grid)return;grid.innerHTML=menuItems.filter(x=>cat==='all'||x.cat===cat).map(item=>`<article class="menu-card"><div class="food-img">${item.emoji}</div><h3>${item.name}</h3><p>${item.desc}</p><div class="price-row"><span class="price">${money(item.price)}</span><button class="add" onclick="addToCart('${item.id}')">+</button></div></article>`).join('')}
function renderCart(){const list=qs('#cartList');if(!list)return;const cart=getCart();if(!cart.length){list.innerHTML='<div class="panel" style="padding:24px;text-align:center"><h3>Your cart is empty</h3><p style="color:var(--muted)">Add coffee, sandwiches, or desserts from the menu.</p><a class="primary-btn" href="menu.html">Browse menu</a></div>';qs('#subtotal').textContent='$0.00';qs('#delivery').textContent='$0.00';qs('#total').textContent='$0.00';return}let subtotal=0;list.innerHTML=cart.map(ci=>{const item=menuItems.find(x=>x.id===ci.id);subtotal+=item.price*ci.qty;return `<div class="cart-item"><div class="cart-thumb">${item.emoji}</div><div style="flex:1"><strong>${item.name}</strong><div style="color:var(--muted);font-size:13px">${money(item.price)} each</div><div class="qty"><button onclick="updateQty('${item.id}',-1)">−</button><b>${ci.qty}</b><button onclick="updateQty('${item.id}',1)">+</button></div></div><strong>${money(item.price*ci.qty)}</strong></div>`}).join('');let delivery=2;qs('#subtotal').textContent=money(subtotal);qs('#delivery').textContent=money(delivery);qs('#total').textContent=money(subtotal+delivery)}
function setupModals(){qsa('[data-open-modal]').forEach(btn=>btn.addEventListener('click',()=>qs(btn.dataset.openModal).classList.add('show')));qsa('[data-close-modal]').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.modal').classList.remove('show')));qsa('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('show')}))}
function setupTabs(){qsa('[data-cat]').forEach(btn=>btn.addEventListener('click',()=>{qsa('[data-cat]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderMenu(btn.dataset.cat)}));qsa('.pay-option').forEach(btn=>btn.addEventListener('click',()=>{qsa('.pay-option').forEach(b=>b.classList.remove('active'));btn.classList.add('active')}));qsa('.booking-slot').forEach(btn=>btn.addEventListener('click',()=>{qsa('.booking-slot').forEach(b=>b.classList.remove('active'));btn.classList.add('active')}))}
function fakeAuth(kind){toast(kind==='login'?'Welcome back to Kahwati':'Account created preview');qsa('.modal.show').forEach(m=>m.classList.remove('show'))}
document.addEventListener('DOMContentLoaded',()=>{updateCartBadge();renderMenu();renderCart();setupModals();setupTabs();qsa('[data-add]').forEach(b=>b.addEventListener('click',()=>addToCart(b.dataset.add)));qsa('[data-fake-auth]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();fakeAuth(b.dataset.fakeAuth)}));const y=qs('#year');if(y)y.textContent=new Date().getFullYear();});
