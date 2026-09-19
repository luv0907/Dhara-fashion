/* ════════════════════════════════════════
   DHARA — Women & Kids Fashion  |  App JS
   ════════════════════════════════════════ */

const STORAGE = {
  store: "dhara-v3-store",
  products: "dhara-v3-products",
  cart: "dhara-v3-cart",
  orders: "dhara-v3-orders",
  admin: "dhara-v3-admin"
};

const DEFAULT_STORE = {
  name: "Dhara",
  announcement: "✨ New arrivals are live — Free boutique packing on all prepaid orders",
  tagline: "Women & Kids Fashion",
  description: "Handpicked ethnic wear, kids frocks, contemporary dresses & more — curated with love.",
  address: "Plot No: 28, Sai Enclave, Road No: 12, Banjara Hills, Hyderabad - 500034",
  hours: "Mon–Sat, 10:30 AM – 8:30 PM",
  phone: "+91 9959266301",
  phone2: "+91 9908 5555 16",
  email: "dhara.womenandkids@gmail.com",
  instagram: "https://instagram.com/dhara_kids",
  mapLink: "https://maps.app.goo.gl/JzBjWzgThxvXL9Wu8",
  mapQuery: "Sai Enclave Road No 12 Banjara Hills Hyderabad",
  paymentUpi: "9959266301@ybl",
  qrImage: "./assets/payment-qr-card.png",
  payeeName: "BOUROJU AKSHAY",
  adminPassword: "dhara-admin",
  theme: { cream: "#faf3ec", pink: "#f4c7d2", rose: "#c4607a", ink: "#1a1215", sage: "#7a9070" }
};

const DEFAULT_PRODUCTS = [
  {
    id: "kids-pink-lace-frock", name: "Kids Pink Lace Frock", category: "Kids",
    price: 1890, stock: 15, badge: "Best Seller",
    sizes: ["1-2Y","3-4Y","5-6Y","7-8Y"], colors: ["Pink","Peach"],
    image: "./assets/products/kids-pink-frock.jpg",
    description: "Adorable pink frock with delicate lace detailing and pearl accents.",
    featured: true, hidden: false
  },
  {
    id: "sage-lace-dress", name: "Sage Lace Overlay Dress", category: "Dresses",
    price: 3490, stock: 8, badge: "New",
    sizes: ["S","M","L","XL"], colors: ["Sage","Ivory"],
    image: "./assets/products/sage-lace-dress.png",
    description: "Elegant sage green dress with intricate lace overlay bodice and puff sleeves.",
    featured: true, hidden: false
  },
  {
    id: "black-bandhani-skirt-set", name: "Black Bandhani Skirt Set", category: "Ethnic",
    price: 4290, stock: 6, badge: "Limited",
    sizes: ["S","M","L","XL"], colors: ["Black","Maroon"],
    image: "./assets/products/black-bandhani-skirt.jpg",
    description: "Stunning black satin top paired with a flowing bandhani-print skirt.",
    featured: true, hidden: false
  },
  {
    id: "lime-palm-kurta", name: "Lime Palm Embroidered Kurta", category: "Ethnic",
    price: 2790, stock: 12, badge: "Comfort",
    sizes: ["S","M","L","XL"], colors: ["Lime","Yellow"],
    image: "./assets/products/lime-embroidered-kurta.png",
    description: "Breezy lime green kurta with hand-embroidered palm motif.",
    featured: true, hidden: false
  },
  {
    id: "rose-midi-dress", name: "Rose Midi Dress", category: "Dresses",
    price: 3290, stock: 18, badge: "New",
    sizes: ["XS","S","M","L","XL"], colors: ["Blush","Pearl"],
    image: "./assets/products/rose-midi-dress.png",
    description: "Soft pleats, fitted waist, and occasion-ready blush tone.",
    featured: false, hidden: false
  },
  {
    id: "pearl-saree", name: "Pearl Drape Saree", category: "Ethnic",
    price: 5490, stock: 10, badge: "Festive",
    sizes: ["Free"], colors: ["Pink","Cream"],
    image: "./assets/products/pearl-saree.png",
    description: "A light saree-inspired drape with soft shimmer borders.",
    featured: false, hidden: false
  },
  {
    id: "cream-blazer", name: "Cream Tailored Blazer", category: "Casual",
    price: 4790, stock: 12, badge: "Best Seller",
    sizes: ["S","M","L","XL"], colors: ["Cream","Champagne"],
    image: "./assets/products/cream-blazer.png",
    description: "Polished structure for office looks, dinners, and layering.",
    featured: false, hidden: false
  },
  {
    id: "embroidered-kurta-set", name: "Embroidered Kurta Set", category: "Ethnic",
    price: 2990, stock: 22, badge: "Comfort",
    sizes: ["S","M","L","XL"], colors: ["Ivory","Sage"],
    image: "./assets/products/embroidered-kurta.png",
    description: "Easy festive dressing with delicate line embroidery.",
    featured: false, hidden: false
  },
  {
    id: "blush-lehenga", name: "Blush Occasion Lehenga", category: "Ethnic",
    price: 8990, stock: 6, badge: "Limited",
    sizes: ["XS","S","M","L"], colors: ["Blush","Rose"],
    image: "./assets/products/blush-lehenga.png",
    description: "A statement lehenga set for celebrations.",
    featured: false, hidden: false
  },
  {
    id: "rose-handbag", name: "Rose Structured Handbag", category: "Accessories",
    price: 2190, stock: 14, badge: "Gift Pick",
    sizes: ["One size"], colors: ["Rose","White"],
    image: "./assets/products/rose-handbag.png",
    description: "Compact structured bag with gold-tone detailing.",
    featured: false, hidden: false
  },
  {
    id: "linen-shirt", name: "Linen Relaxed Shirt", category: "Casual",
    price: 1790, stock: 30, badge: "Daily",
    sizes: ["S","M","L","XL"], colors: ["Sky","White"],
    image: "./assets/products/linen-shirt.png",
    description: "Breathable linen blend with clean tailoring.",
    featured: false, hidden: false
  },
  {
    id: "wide-leg-denim", name: "Wide Leg Denim", category: "Casual",
    price: 2490, stock: 16, badge: "Utility",
    sizes: ["XS","S","M","L","XL"], colors: ["Washed Blue","Ecru"],
    image: "./assets/products/wide-leg-jeans.png",
    description: "High-rise wide leg fit for everyday styling.",
    featured: false, hidden: false
  }
];

// ─── STATE ─────────────────────────────────
let store = merge(load(STORAGE.store, DEFAULT_STORE));
if (!store.qrImage) store.qrImage = DEFAULT_STORE.qrImage;
if (!store.paymentUpi) store.paymentUpi = DEFAULT_STORE.paymentUpi;
if (!store.phone) store.phone = DEFAULT_STORE.phone;
if (!store.payeeName) store.payeeName = DEFAULT_STORE.payeeName;

let products = load(STORAGE.products, DEFAULT_PRODUCTS);
let cart = load(STORAGE.cart, []);
let orders = load(STORAGE.orders, []);
let filters = { search: "", category: "All", size: "All", sort: "featured" };

// ─── DOM CACHE ─────────────────────────────
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const el = {};
const ids = [
  "announcementBar","closeAnnouncement","siteHeader","mainNav","menuToggle",
  "heroTagline","searchInput","categoryFilter","sizeFilter","sortFilter",
  "clearFilters","visibleCount","productGrid","cartCount","openCart","closeCart",
  "cartDrawer","drawerBackdrop","cartItems","cartSubtotal","cartShipping",
  "cartTotal","checkoutButton","checkoutDialog","checkoutForm","closeCheckout",
  "cancelCheckout","checkoutSummary","checkoutError","qrCodeArea",
  "storeAddress","storeHours","storeContact","mapLink","toast"
];
ids.forEach(id => { el[id] = $(`#${id}`); });

// ─── INIT ──────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  renderStore();
  renderCategories();
  renderProducts();
  renderCart();
  bindEvents();
  setupReveals();
});

// ─── HELPERS ───────────────────────────────
function load(k, fb) { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : clone(fb); } catch { return clone(fb); } }
function save(k, v) {
  try {
    localStorage.setItem(k, JSON.stringify(v));
    window.dispatchEvent(new StorageEvent("storage", { key: k, newValue: JSON.stringify(v) }));
  } catch(e) {
    console.error("Storage save error", e);
  }
}
function clone(v) { return JSON.parse(JSON.stringify(v)); }
function merge(v) { return { ...DEFAULT_STORE, ...v, theme: { ...DEFAULT_STORE.theme, ...(v?.theme || {}) } }; }
function money(v) { return `₹${Math.round(v).toLocaleString("en-IN")}`; }
function esc(v) { return String(v ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"); }
function parseCSV(v) { return String(v||"").split(",").map(s=>s.trim()).filter(Boolean); }
function slugify(v) { return (String(v||"item").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"") || "item") + "-" + Date.now().toString(36); }
function cats() { return ["All", ...new Set(products.map(p=>p.category).filter(Boolean))].sort((a,b) => a==="All"?-1:b==="All"?1:a.localeCompare(b)); }

// ─── EVENTS ────────────────────────────────
function bindEvents() {
  window.addEventListener("scroll", () => {
    el.siteHeader.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

  el.closeAnnouncement?.addEventListener("click", () => {
    el.announcementBar.classList.add("hidden");
  });

  el.menuToggle?.addEventListener("click", () => {
    el.mainNav.classList.toggle("open");
  });

  // Nav active
  $$(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      $$(".nav-link").forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      el.mainNav.classList.remove("open");
    });
  });

  // Filters
  el.searchInput.addEventListener("input", e => { filters.search = e.target.value.trim().toLowerCase(); renderProducts(); });
  el.categoryFilter.addEventListener("change", e => { filters.category = e.target.value; renderProducts(); });
  el.sizeFilter.addEventListener("change", e => { filters.size = e.target.value; renderProducts(); });
  el.sortFilter.addEventListener("change", e => { filters.sort = e.target.value; renderProducts(); });
  el.clearFilters.addEventListener("click", () => {
    filters = { search: "", category: "All", size: "All", sort: "featured" };
    el.searchInput.value = ""; el.categoryFilter.value = "All"; el.sizeFilter.value = "All"; el.sortFilter.value = "featured";
    renderProducts();
  });

  // Category shortcuts
  $$("[data-category-shortcut]").forEach(btn => {
    btn.addEventListener("click", () => {
      filters.category = btn.dataset.categoryShortcut;
      el.categoryFilter.value = filters.category;
      $("#collections")?.scrollIntoView({ behavior: "smooth" });
      renderProducts();
    });
  });

  // Add to cart
  el.productGrid.addEventListener("click", e => {
    const btn = e.target.closest("[data-add]");
    if (!btn) return;
    const card = btn.closest("[data-pid]");
    addToCart(btn.dataset.add, card.querySelector("[data-sz]").value, card.querySelector("[data-cl]").value);
  });

  // Cart
  el.openCart.addEventListener("click", openCart);
  el.closeCart.addEventListener("click", closeCart);
  el.drawerBackdrop.addEventListener("click", closeCart);
  el.cartItems.addEventListener("click", e => {
    const b = e.target.closest("[data-act]");
    if (b) updateCartItem(b.dataset.key, b.dataset.act);
  });

  // Checkout
  el.checkoutButton.addEventListener("click", openCheckout);
  el.closeCheckout.addEventListener("click", () => el.checkoutDialog.close());
  el.cancelCheckout.addEventListener("click", () => el.checkoutDialog.close());
  el.checkoutDialog.addEventListener("close", () => { document.body.classList.remove("no-scroll"); el.checkoutError.textContent = ""; });
  el.checkoutForm.addEventListener("change", e => { if (e.target.name === "payment") updatePayBoxes(e.target.value); });
  el.checkoutForm.addEventListener("submit", submitOrder);}

// ─── RENDER STORE ──────────────────────────
function renderStore() {
  document.title = `${store.name} | Women & Kids Fashion`;
  el.announcementBar.querySelector("span").textContent = store.announcement;
  el.heroTagline.textContent = store.tagline;
  el.storeAddress.textContent = store.address;
  el.storeHours.textContent = store.hours;
  el.storeContact.innerHTML = `<a href="tel:${store.phone.replace(/\s/g,"")}">${esc(store.phone)}</a> · <a href="tel:${(store.phone2||"").replace(/\s/g,"")}">${esc(store.phone2||"")}</a>`;
  el.mapLink.href = store.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.mapQuery||store.address)}`;

  // QR code
  const qrSrc = store.qrImage || "./assets/payment-qr-card.png";
  const upiId = store.paymentUpi || "9959266301@ybl";
  const payee = store.payeeName || "BOUROJU AKSHAY";
  const phone = store.phone || "9959266301";
  el.qrCodeArea.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;">
      <img src="${esc(qrSrc)}" alt="Payment QR Code - ${esc(payee)}" style="max-width:280px;width:100%;border:1px solid var(--line);box-shadow:0 4px 16px rgba(0,0,0,0.08);" />
      <div style="font-size:0.85rem;text-align:center;">
        <div>Payee: <strong>${esc(payee)}</strong></div>
        <div>UPI / PhonePe: <strong>${esc(phone)}</strong></div>
        <div style="color:var(--muted);font-size:0.78rem;margin-top:0.25rem;">Scan with PhonePe, Google Pay, Paytm, BHIM & any UPI App</div>
      </div>
    </div>
  `;
}

// ─── CATEGORIES ────────────────────────────
function renderCategories() {
  const c = filters.category;
  el.categoryFilter.innerHTML = cats().map(cat => `<option value="${esc(cat)}">${esc(cat)}</option>`).join("");
  el.categoryFilter.value = cats().includes(c) ? c : "All";
  filters.category = el.categoryFilter.value;
}

// ─── PRODUCTS ──────────────────────────────
function renderProducts() {
  let vis = products.filter(p => !p.hidden);
  if (filters.search) vis = vis.filter(p => [p.name,p.category,p.description,p.badge].join(" ").toLowerCase().includes(filters.search));
  if (filters.category !== "All") vis = vis.filter(p => p.category === filters.category);
  if (filters.size !== "All") vis = vis.filter(p => p.sizes.includes(filters.size));
  vis.sort((a,b) => {
    if (filters.sort === "price-low") return a.price - b.price;
    if (filters.sort === "price-high") return b.price - a.price;
    if (filters.sort === "stock") return b.stock - a.stock;
    return Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name);
  });
  el.visibleCount.textContent = vis.length;
  if (!vis.length) { el.productGrid.innerHTML = `<div class="empty-state">No styles match your filters.</div>`; return; }
  el.productGrid.innerHTML = vis.map(productCard).join("");
}

function productCard(p) {
  const dis = p.stock <= 0 ? "disabled" : "";
  const stk = p.stock <= 0 ? "Sold out" : `${p.stock} left`;
  return `
    <article class="product-card" data-pid="${esc(p.id)}">
      <div class="product-media">
        <img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" />
        <span class="badge-tag">${esc(p.badge||p.category)}</span>
        <span class="stock-tag">${esc(stk)}</span>
      </div>
      <div class="product-body">
        <div class="product-head">
          <span class="product-name">${esc(p.name)}</span>
          <span class="product-price">${money(p.price)}</span>
        </div>
        <p class="product-desc">${esc(p.description)}</p>
        <div class="product-opts">
          <label><span>Size</span><select data-sz>${p.sizes.map(s=>`<option value="${esc(s)}">${esc(s)}</option>`).join("")}</select></label>
          <label><span>Color</span><select data-cl>${p.colors.map(c=>`<option value="${esc(c)}">${esc(c)}</option>`).join("")}</select></label>
        </div>
        <div class="product-atc">
          <button class="btn btn-primary" type="button" data-add="${esc(p.id)}" ${dis}>${p.stock<=0?"Sold Out":"Add to Cart"}</button>
        </div>
      </div>
    </article>`;
}

// ─── CART ───────────────────────────────────
function addToCart(id, size, color) {
  const p = products.find(x => x.id === id);
  if (!p || p.stock <= 0) { toast("This style is sold out."); return; }
  const used = cart.filter(x => x.id === id).reduce((s,x) => s+x.qty, 0);
  if (used >= p.stock) { toast("All stock is in your cart."); return; }
  const key = cartKey({id, size, color});
  const ex = cart.find(x => cartKey(x) === key);
  if (ex) ex.qty++; else cart.push({id, size, color, qty: 1});
  save(STORAGE.cart, cart);
  renderCart();
  toast(`${p.name} added ✓`);
}

function cartKey(i) { return `${i.id}__${i.size}__${i.color}`; }

function cartLines() {
  return cart.map(i => { const p = products.find(x => x.id === i.id); return p ? {...i, product: p} : null; }).filter(Boolean);
}

function totals() {
  const lines = cartLines();
  const sub = lines.reduce((s,l) => s + l.product.price * l.qty, 0);
  const ship = sub === 0 || sub >= 4000 ? 0 : 99;
  return { sub, ship, total: sub + ship, count: lines.reduce((s,l) => s + l.qty, 0) };
}

function renderCart() {
  const lines = cartLines();
  const t = totals();
  el.cartCount.textContent = t.count || "";
  el.cartCount.dataset.empty = t.count === 0;
  el.cartSubtotal.textContent = money(t.sub);
  el.cartShipping.textContent = t.ship === 0 ? "Free" : money(t.ship);
  el.cartTotal.textContent = money(t.total);
  el.checkoutButton.disabled = !lines.length;

  if (!lines.length) { el.cartItems.innerHTML = `<div class="empty-state">Your cart is empty.</div>`; return; }
  el.cartItems.innerHTML = lines.map(l => {
    const k = cartKey(l);
    return `
      <article class="cart-item">
        <img src="${esc(l.product.image)}" alt="${esc(l.product.name)}" />
        <div class="cart-item-body">
          <div class="cart-item-top"><strong>${esc(l.product.name)}</strong><strong>${money(l.product.price*l.qty)}</strong></div>
          <div class="cart-item-meta">${esc(l.size)} · ${esc(l.color)}</div>
          <div class="qty-row">
            <button class="qty-btn" data-key="${esc(k)}" data-act="dec">−</button>
            <strong>${l.qty}</strong>
            <button class="qty-btn" data-key="${esc(k)}" data-act="inc">+</button>
            <button class="btn btn-ghost btn-sm" data-key="${esc(k)}" data-act="rm">Remove</button>
          </div>
        </div>
      </article>`;
  }).join("");
}

function updateCartItem(key, act) {
  const item = cart.find(x => cartKey(x) === key);
  if (!item) return;
  const p = products.find(x => x.id === item.id);
  if (act === "rm") cart = cart.filter(x => cartKey(x) !== key);
  else if (act === "inc") {
    const used = cart.filter(x => x.id === item.id).reduce((s,x) => s+x.qty, 0);
    if (p && used < p.stock) item.qty++; else toast("No more stock.");
  } else if (act === "dec") { item.qty--; if (item.qty <= 0) cart = cart.filter(x => cartKey(x) !== key); }
  save(STORAGE.cart, cart); renderCart();
}

function openCart() { el.drawerBackdrop.hidden = false; el.cartDrawer.classList.add("open"); document.body.classList.add("no-scroll"); }
function closeCart() { el.drawerBackdrop.hidden = true; el.cartDrawer.classList.remove("open"); document.body.classList.remove("no-scroll"); }

// ─── CHECKOUT ──────────────────────────────
function openCheckout() {
  if (!cart.length) { toast("Add items first."); return; }
  store = merge(load(STORAGE.store, DEFAULT_STORE));
  renderStore();
  closeCart();
  renderOrderSummary();
  updatePayBoxes("qr");
  el.checkoutForm.reset();
  el.checkoutError.textContent = "";
  document.body.classList.add("no-scroll");
  el.checkoutDialog.showModal?.() || el.checkoutDialog.setAttribute("open","");
}

function renderOrderSummary() {
  const lines = cartLines(), t = totals();
  el.checkoutSummary.innerHTML = `
    <h3>Order Summary</h3>
    ${lines.map(l => `
      <div class="checkout-line">
        <img src="${esc(l.product.image)}" alt="${esc(l.product.name)}" />
        <div><strong>${esc(l.product.name)}</strong><span>${esc(l.size)} · ${esc(l.color)} · Qty ${l.qty}</span></div>
        <strong>${money(l.product.price*l.qty)}</strong>
      </div>`).join("")}
    <div class="total-row"><span>Subtotal</span><strong>${money(t.sub)}</strong></div>
    <div class="total-row"><span>Shipping</span><strong>${t.ship===0?"Free":money(t.ship)}</strong></div>
    <div class="total-row total-grand"><span>Total</span><strong>${money(t.total)}</strong></div>
    <p style="color:var(--muted);font-size:0.82rem;margin-top:0.5rem;">Free shipping on orders above ₹4,000</p>`;
}

function updatePayBoxes(active) { $$("[data-payment-box]").forEach(b => { b.hidden = b.dataset.paymentBox !== active; }); }

function submitOrder(e) {
  e.preventDefault();
  const d = new FormData(el.checkoutForm);
  const pay = d.get("payment");
  const err = validate(d, pay);
  if (err) { el.checkoutError.textContent = err; return; }

  const lines = cartLines();
  const bad = lines.find(l => l.qty > l.product.stock);
  if (bad) { el.checkoutError.textContent = `${bad.product.name} is out of stock.`; return; }

  const t = totals();
  const order = {
    id: `DHA-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: pay === "cod" ? "COD Pending" : "Payment Submitted",
    fulfillment: "Processing", payment: pay, totals: t,
    customer: { name: d.get("name").trim(), email: d.get("email").trim(), phone: d.get("phone").trim(), address: d.get("address").trim(), city: d.get("city").trim(), pin: d.get("pin").trim() },
    items: lines.map(l => ({ id:l.id, name:l.product.name, size:l.size, color:l.color, qty:l.qty, price:l.product.price, image:l.product.image }))
  };

  lines.forEach(l => { const p = products.find(x => x.id === l.id); if (p) p.stock = Math.max(0, p.stock - l.qty); });
  orders.unshift(order); cart = [];
  save(STORAGE.products, products); save(STORAGE.orders, orders); save(STORAGE.cart, cart);
  renderCategories(); renderProducts(); renderCart();
  el.checkoutDialog.close();
  toast(`Order ${order.id} placed! 🎉`);
}

function validate(d, pay) {
  const req = ["name","email","phone","address","city","pin"];
  if (req.find(k => !String(d.get(k)||"").trim())) return "Please fill all delivery details.";
  if (!/^\S+@\S+\.\S+$/.test(d.get("email"))) return "Enter a valid email.";
  return "";
}

// ─── REVEAL ANIMATIONS ────────────────────
function setupReveals() {
  const els = $$(".section-head, .categories-grid, .features-grid, .insta-grid, .location-grid, .shop-controls, .product-grid");
  els.forEach(el => el.classList.add("reveal"));
  if (!("IntersectionObserver" in window)) { els.forEach(el => el.classList.add("visible")); return; }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); obs.unobserve(entry.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

// ─── TOAST ─────────────────────────────────
function toast(msg) {
  el.toast.textContent = msg;
  el.toast.classList.add("show");
  clearTimeout(toast.t);
  toast.t = setTimeout(() => el.toast.classList.remove("show"), 2800);
}

// ─── CROSS-TAB LIVE SYNC ──────────────────
window.addEventListener("storage", e => {
  if (e.key === STORAGE.store) {
    store = merge(load(STORAGE.store, DEFAULT_STORE));
    renderStore();
  }
  if (e.key === STORAGE.products) {
    products = load(STORAGE.products, DEFAULT_PRODUCTS);
    renderCategories();
    renderProducts();
  }
  if (e.key === STORAGE.cart) {
    cart = load(STORAGE.cart, []);
    renderCart();
  }
});
