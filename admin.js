/* ══════════════════════════════════════════════
   DHARA BOUTIQUE — Dedicated Admin Console JS
   ══════════════════════════════════════════════ */

const STORAGE = {
  store: "dhara-v3-store",
  products: "dhara-v3-products",
  cart: "dhara-v3-cart",
  orders: "dhara-v3-orders",
  admin: "dhara-v3-admin"
};

const DEFAULT_STORE = {
  name: "Dhara",
  announcement: "✨ Live Demo Storefront for Textile & Fashion Industries · Boutique E-Commerce System",
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
    image: "./assets/products/lime-kurta.jpg",
    description: "Bright lime-yellow flared kurta in breathable cotton with floral palm embroidery.",
    featured: true, hidden: false
  },
  {
    id: "rose-midi-dress", name: "Dusty Rose Tiered Midi", category: "Dresses",
    price: 2990, stock: 10, badge: "Trending",
    sizes: ["XS","S","M","L"], colors: ["Rose","Blush"],
    image: "./assets/products/rose-midi-dress.png",
    description: "Romantic tiered midi dress in dusty rose chiffon with ruffled hem.",
    featured: true, hidden: false
  },
  {
    id: "kids-floral-party-dress", name: "Kids Floral Party Frock", category: "Kids",
    price: 1990, stock: 14, badge: "Party Wear",
    sizes: ["2-3Y","4-5Y","6-7Y"], colors: ["Pink Floral"],
    image: "./assets/products/kids-pink-frock.jpg",
    description: "Charming floral party frock with soft tulle underlay for gentle flare.",
    featured: false, hidden: false
  },
  {
    id: "ivory-gold-anarkali", name: "Ivory & Gold Zari Anarkali", category: "Ethnic",
    price: 5490, stock: 4, badge: "Occasion",
    sizes: ["S","M","L","XL"], colors: ["Ivory","Gold"],
    image: "./assets/products/sage-lace-dress.png",
    description: "Opulent ivory georgette Anarkali detailed with fine zari thread work.",
    featured: true, hidden: false
  },
  {
    id: "casual-cotton-day-dress", name: "Everyday Cotton Day Dress", category: "Casual",
    price: 2190, stock: 18, badge: "Everyday",
    sizes: ["S","M","L","XL"], colors: ["Beige","Sky Blue"],
    image: "./assets/products/lime-kurta.jpg",
    description: "Lightweight everyday cotton A-line dress with pockets and mother-of-pearl buttons.",
    featured: false, hidden: false
  }
];

// ─── STATE ─────────────────────────────────
let store = load(STORAGE.store, DEFAULT_STORE);
if (!store.qrImage) store.qrImage = DEFAULT_STORE.qrImage;
if (!store.paymentUpi) store.paymentUpi = DEFAULT_STORE.paymentUpi;
if (!store.phone) store.phone = DEFAULT_STORE.phone;
if (!store.payeeName) store.payeeName = DEFAULT_STORE.payeeName;

let products = load(STORAGE.products, DEFAULT_PRODUCTS);
let orders = load(STORAGE.orders, []);

function load(k, fb) { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : clone(fb); } catch { return clone(fb); } }
function save(k, v) {
  try {
    localStorage.setItem(k, JSON.stringify(v));
    window.dispatchEvent(new StorageEvent("storage", { key: k, newValue: JSON.stringify(v) }));
  } catch(e) {
    console.error("Storage error:", e);
    toast("Storage limit warning: Please use a smaller image.");
  }
}
function clone(v) { return JSON.parse(JSON.stringify(v)); }
function money(v) { return `₹${Math.round(v||0).toLocaleString("en-IN")}`; }
function esc(v) { return String(v ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"); }
function parseCSV(v) { return String(v||"").split(",").map(s=>s.trim()).filter(Boolean); }
function slugify(v) { return (String(v||"item").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"") || "item") + "-" + Date.now().toString(36); }

// ─── IMAGE COMPRESSION HELPER ──────────────
function compressImage(file, maxDimension = 700, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("File read failed"));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Image decoding failed"));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// ─── INITIALIZATION ────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  checkAuth();
  bindEvents();
});

// ─── AUTHENTICATION ────────────────────────
function checkAuth() {
  const isAuth = sessionStorage.getItem(STORAGE.admin) === "true";
  const authGate = document.getElementById("authGate");
  const adminApp = document.getElementById("adminApp");

  if (isAuth) {
    authGate.style.display = "none";
    adminApp.style.display = "flex";
    initDashboard();
  } else {
    authGate.style.display = "flex";
    adminApp.style.display = "none";
  }
}

function login(password) {
  const err = document.getElementById("loginError");
  if (password === store.adminPassword) {
    sessionStorage.setItem(STORAGE.admin, "true");
    err.textContent = "";
    checkAuth();
    toast("Welcome to Dhara Console ✓");
  } else {
    err.textContent = "Incorrect password. Default: dhara-admin";
  }
}

function logout() {
  sessionStorage.removeItem(STORAGE.admin);
  checkAuth();
  toast("Logged out successfully.");
}

// ─── INIT DASHBOARD DATA ───────────────────
function initDashboard() {
  document.getElementById("adminStoreTitle").textContent = `${store.name} · ${store.tagline}`;
  renderKPIs();
  renderRecentOrders();
  renderQuickStore();
  renderOrdersTable();
  renderProductsTable();
  renderCategoriesDropdown();
  populatePaymentForm();
  populateSettingsForm();
}

// ─── TAB NAVIGATION ────────────────────────
function switchTab(tabId) {
  document.querySelectorAll(".nav-tab").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });
  document.querySelectorAll(".tab-pane").forEach(pane => {
    pane.classList.toggle("active", pane.id === `pane-${tabId}`);
  });
}

// ─── RENDER KPIS ───────────────────────────
function renderKPIs() {
  const validOrders = orders.filter(o => o.fulfillment !== "Cancelled");
  const totalRev = validOrders.reduce((sum, o) => sum + Number(o.totals?.total || 0), 0);
  const pendingCount = orders.filter(o => o.fulfillment === "Processing" || o.fulfillment === "Packed").length;

  document.getElementById("kpiRevenue").textContent = money(totalRev);
  document.getElementById("kpiOrders").textContent = orders.length;
  document.getElementById("kpiOrdersSub").textContent = `${pendingCount} active / pending`;
  document.getElementById("kpiProducts").textContent = products.filter(p => !p.hidden).length;

  const cats = new Set(products.map(p => p.category).filter(Boolean));
  document.getElementById("kpiCategories").textContent = `${cats.size} categories`;

  const badge = document.getElementById("pendingOrdersBadge");
  if (badge) {
    badge.textContent = pendingCount;
    badge.style.display = pendingCount > 0 ? "inline-block" : "none";
  }
}

// ─── RECENT ORDERS (DASHBOARD) ─────────────
function renderRecentOrders() {
  const container = document.getElementById("recentOrdersArea");
  if (!orders.length) {
    container.innerHTML = `<p style="color:var(--muted);padding:1.5rem 0;">No customer orders yet. When customers checkout on the store, they appear here in real-time.</p>`;
    return;
  }

  const recent = orders.slice(0, 5);
  container.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Order</th>
          <th>Customer</th>
          <th>Items</th>
          <th>Total</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${recent.map(o => `
          <tr>
            <td><strong>${esc(o.id)}</strong><br/><span style="color:var(--muted);font-size:0.75rem;">${new Date(o.createdAt).toLocaleDateString("en-IN")}</span></td>
            <td><strong>${esc(o.customer.name)}</strong><br/><span style="color:var(--muted);font-size:0.75rem;">${esc(o.customer.phone)}</span></td>
            <td>${o.items.map(i => `${esc(i.name)} ×${i.qty}`).join(", ")}</td>
            <td><strong>${money(o.totals.total)}</strong></td>
            <td><span class="status-tag ${(o.fulfillment||'processing').toLowerCase().replace(/\s/g,'')}">${esc(o.fulfillment)}</span></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderQuickStore() {
  const container = document.getElementById("quickStoreSummary");
  container.innerHTML = `
    <div class="quick-row"><span>Boutique Name</span><strong>${esc(store.name)}</strong></div>
    <div class="quick-row"><span>Announcement</span><strong>${esc(store.announcement)}</strong></div>
    <div class="quick-row"><span>Phone Contact</span><strong>${esc(store.phone)}</strong></div>
    <div class="quick-row"><span>UPI VPA</span><strong>${esc(store.paymentUpi || "Not configured")}</strong></div>
    <div class="quick-row"><span>QR Code Image</span><strong>${store.qrImage ? "Uploaded ✓" : "None"}</strong></div>
    <div class="quick-row"><span>Store Address</span><strong>${esc(store.address)}</strong></div>
  `;
}

// ─── ORDERS MANAGEMENT ─────────────────────
function renderOrdersTable() {
  const container = document.getElementById("ordersTableArea");
  const filter = document.getElementById("orderStatusFilter").value;

  let filtered = orders;
  if (filter !== "All") {
    filtered = orders.filter(o => o.fulfillment === filter);
  }

  if (!filtered.length) {
    container.innerHTML = `<p style="padding:2rem;color:var(--muted);text-align:center;">No orders match this status filter.</p>`;
    return;
  }

  container.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Order ID / Date</th>
          <th>Customer Details</th>
          <th>Delivery Address</th>
          <th>Items Ordered</th>
          <th>Payment</th>
          <th>Total</th>
          <th>Fulfillment Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${filtered.map(o => `
          <tr>
            <td>
              <strong>${esc(o.id)}</strong><br/>
              <span style="color:var(--muted);font-size:0.75rem;">${new Date(o.createdAt).toLocaleString("en-IN")}</span>
            </td>
            <td>
              <strong>${esc(o.customer.name)}</strong><br/>
              <a href="tel:${esc(o.customer.phone)}" style="color:var(--rose-dark);font-size:0.8rem;">${esc(o.customer.phone)}</a><br/>
              <span style="color:var(--muted);font-size:0.75rem;">${esc(o.customer.email)}</span>
            </td>
            <td style="max-width:200px;">
              <span style="font-size:0.8rem;">${esc(o.customer.address)}, ${esc(o.customer.city)} - ${esc(o.customer.pin)}</span>
            </td>
            <td>
              <div style="display:flex;flex-direction:column;gap:0.25rem;">
                ${o.items.map(i => `
                  <div style="font-size:0.8rem;">
                    <strong>${esc(i.name)}</strong> <span style="color:var(--muted);">(${esc(i.size||"")}, Qty: ${i.qty})</span>
                  </div>
                `).join("")}
              </div>
            </td>
            <td>
              <span class="status-tag ${o.payment==='cod'?'packed':'processing'}">${esc(o.payment).toUpperCase()}</span><br/>
              <span style="color:var(--muted);font-size:0.75rem;">${esc(o.status)}</span>
            </td>
            <td><strong style="font-size:1rem;color:var(--ink);">${money(o.totals.total)}</strong></td>
            <td>
              <select class="admin-select" data-order-status="${esc(o.id)}" style="font-size:0.8rem;padding:0.35rem;">
                ${["Processing","Packed","Shipped","Ready for Pickup","Delivered","Cancelled"].map(s => `
                  <option value="${s}" ${o.fulfillment === s ? "selected" : ""}>${s}</option>
                `).join("")}
              </select>
            </td>
            <td>
              <button class="btn btn-ghost btn-sm text-danger" data-del-order="${esc(o.id)}" style="color:var(--danger);" title="Delete Order">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
              </button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;

  // Bind order status dropdowns
  container.querySelectorAll("[data-order-status]").forEach(sel => {
    sel.addEventListener("change", e => {
      const orderId = e.target.dataset.orderStatus;
      const targetOrder = orders.find(x => x.id === orderId);
      if (targetOrder) {
        targetOrder.fulfillment = e.target.value;
        save(STORAGE.orders, orders);
        renderKPIs();
        renderRecentOrders();
        toast(`Order ${orderId} updated to ${e.target.value} ✓`);
      }
    });
  });

  // Bind order deletion
  container.querySelectorAll("[data-del-order]").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = btn.dataset.delOrder;
      if (confirm(`Are you sure you want to delete order ${id}?`)) {
        orders = orders.filter(x => x.id !== id);
        save(STORAGE.orders, orders);
        renderKPIs();
        renderRecentOrders();
        renderOrdersTable();
        toast("Order deleted.");
      }
    });
  });
}

// ─── PRODUCTS MANAGEMENT ───────────────────
function renderCategoriesDropdown() {
  const cats = ["All", ...new Set(products.map(p => p.category).filter(Boolean))].sort();
  const select = document.getElementById("productCategorySelect");
  select.innerHTML = cats.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join("");
}

function renderProductsTable() {
  const container = document.getElementById("productsTableArea");
  const search = document.getElementById("productSearch")?.value.toLowerCase().trim() || "";
  const cat = document.getElementById("productCategorySelect")?.value || "All";

  const filtered = products.filter(p => {
    const matchesSearch = !search || p.name.toLowerCase().includes(search) || p.category.toLowerCase().includes(search);
    const matchesCat = cat === "All" || p.category === cat;
    return matchesSearch && matchesCat;
  });

  if (!filtered.length) {
    container.innerHTML = `<p style="padding:2rem;color:var(--muted);text-align:center;">No products found.</p>`;
    return;
  }

  container.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Product Name</th>
          <th>Category</th>
          <th>Price (₹)</th>
          <th>Stock</th>
          <th>Badge</th>
          <th>Sizes</th>
          <th>Visibility</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${filtered.map(p => `
          <tr data-product-row="${esc(p.id)}">
            <td>
              <div style="display:flex;flex-direction:column;align-items:center;gap:0.3rem;">
                <img src="${esc(p.image)}" alt="" class="tbl-prod-thumb" onerror="this.src='./assets/lotus-logo.jpg'" id="thumb-${esc(p.id)}" />
                <label class="btn btn-ghost btn-sm" style="font-size:0.68rem;padding:0.15rem 0.35rem;cursor:pointer;color:var(--rose-dark);">
                  Photo ✎
                  <input type="file" accept="image/*" style="display:none;" data-change-photo="${esc(p.id)}" />
                </label>
              </div>
            </td>
            <td>
              <input class="admin-input" data-field="name" value="${esc(p.name)}" style="font-weight:600;" /><br/>
              <textarea class="admin-input" data-field="description" rows="1" style="font-size:0.75rem;margin-top:0.25rem;color:var(--muted);">${esc(p.description)}</textarea>
            </td>
            <td>
              <input class="admin-input" data-field="category" value="${esc(p.category)}" style="width:110px;" />
            </td>
            <td>
              <input class="admin-input" data-field="price" type="number" value="${esc(p.price)}" style="width:90px;" />
            </td>
            <td>
              <input class="admin-input" data-field="stock" type="number" value="${esc(p.stock)}" style="width:75px;" />
            </td>
            <td>
              <input class="admin-input" data-field="badge" value="${esc(p.badge||"")}" style="width:95px;" />
            </td>
            <td>
              <input class="admin-input" data-field="sizes" value="${esc(p.sizes.join(", "))}" style="width:110px;" />
            </td>
            <td>
              <label style="display:flex;align-items:center;gap:0.35rem;font-size:0.8rem;margin-bottom:0.25rem;">
                <input type="checkbox" data-field="featured" ${p.featured ? "checked" : ""} /> Featured
              </label>
              <label style="display:flex;align-items:center;gap:0.35rem;font-size:0.8rem;color:var(--muted);">
                <input type="checkbox" data-field="hidden" ${p.hidden ? "checked" : ""} /> Hide
              </label>
            </td>
            <td>
              <div class="tbl-actions">
                <button class="btn btn-primary btn-sm" data-save-prod="${esc(p.id)}" title="Save changes">Save</button>
                <button class="btn btn-ghost btn-sm" data-del-prod="${esc(p.id)}" style="color:var(--danger);" title="Delete product">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                </button>
              </div>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;

  // Bind product row saves
  container.querySelectorAll("[data-save-prod]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.saveProd;
      const row = container.querySelector(`[data-product-row="${CSS.escape(id)}"]`);
      const target = products.find(x => x.id === id);
      if (!row || !target) return;

      target.name = row.querySelector('[data-field="name"]').value.trim();
      target.category = row.querySelector('[data-field="category"]').value.trim();
      target.price = Number(row.querySelector('[data-field="price"]').value) || 0;
      target.stock = Number(row.querySelector('[data-field="stock"]').value) || 0;
      target.badge = row.querySelector('[data-field="badge"]').value.trim();
      target.description = row.querySelector('[data-field="description"]').value.trim();
      target.sizes = parseCSV(row.querySelector('[data-field="sizes"]').value);
      target.featured = row.querySelector('[data-field="featured"]').checked;
      target.hidden = row.querySelector('[data-field="hidden"]').checked;

      save(STORAGE.products, products);
      renderKPIs();
      renderCategoriesDropdown();
      toast(`Saved "${target.name}" ✓`);
    });
  });

  // Bind product delete
  container.querySelectorAll("[data-del-prod]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.delProd;
      const target = products.find(x => x.id === id);
      if (target && confirm(`Delete product "${target.name}"?`)) {
        products = products.filter(x => x.id !== id);
        save(STORAGE.products, products);
        renderKPIs();
        renderProductsTable();
        renderCategoriesDropdown();
        toast("Product deleted.");
      }
    });
  });

  // Bind product photo upload for existing items
  container.querySelectorAll("[data-change-photo]").forEach(input => {
    input.addEventListener("change", async e => {
      const file = e.target.files?.[0];
      const id = input.dataset.changePhoto;
      if (!file || !id) return;
      try {
        toast("Compressing & updating clothing photo...");
        const compressedDataUrl = await compressImage(file, 800, 0.85);
        const p = products.find(x => x.id === id);
        if (p) {
          p.image = compressedDataUrl;
          save(STORAGE.products, products);
          const thumb = document.getElementById(`thumb-${id}`);
          if (thumb) thumb.src = compressedDataUrl;
          toast(`Photo updated for "${p.name}" & live on website ✓`);
        }
      } catch(err) {
        console.error(err);
        toast("Failed to update photo.");
      }
    });
  });
}

// ─── PAYMENT & QR CODE ─────────────────────
function populatePaymentForm() {
  document.getElementById("inputPayeeName").value = store.payeeName || "BOUROJU AKSHAY";
  document.getElementById("inputPaymentPhone").value = store.phone || "9959266301";
  document.getElementById("inputUpi").value = store.paymentUpi || "9959266301@ybl";
  document.getElementById("inputQrImage").value = store.qrImage || "./assets/payment-qr-card.png";
  updateQrPreview();
}

function updateQrPreview() {
  const qrArea = document.getElementById("qrPreviewArea");
  const upiText = document.getElementById("previewUpiText");
  const payee = document.getElementById("inputPayeeName")?.value || store.payeeName || "BOUROJU AKSHAY";
  const phone = document.getElementById("inputPaymentPhone")?.value || store.phone || "9959266301";
  const upi = document.getElementById("inputUpi")?.value || store.paymentUpi || "9959266301@ybl";
  const qrImg = document.getElementById("inputQrImage")?.value || store.qrImage || "./assets/payment-qr-card.png";

  upiText.innerHTML = `<strong>${esc(payee)}</strong> · ${esc(phone)} · <span style="color:var(--muted);">${esc(upi)}</span>`;

  if (qrImg) {
    qrArea.innerHTML = `<img src="${esc(qrImg)}" alt="Payment QR Code" style="max-height:100%;max-width:100%;object-fit:contain;" />`;
  } else {
    qrArea.innerHTML = `<p class="empty-note">No QR code uploaded yet. Enter URL or upload image above.</p>`;
  }
}

// ─── STORE SETTINGS ────────────────────────
function populateSettingsForm() {
  document.getElementById("set_name").value = store.name || "";
  document.getElementById("set_tagline").value = store.tagline || "";
  document.getElementById("set_announcement").value = store.announcement || "";
  document.getElementById("set_phone").value = store.phone || "";
  document.getElementById("set_phone2").value = store.phone2 || "";
  document.getElementById("set_email").value = store.email || "";
  document.getElementById("set_hours").value = store.hours || "";
  document.getElementById("set_address").value = store.address || "";
  document.getElementById("set_mapLink").value = store.mapLink || "";
  document.getElementById("set_adminPassword").value = store.adminPassword || "dhara-admin";
}

// ─── EVENT LISTENERS ───────────────────────
function bindEvents() {
  // Login form
  document.getElementById("loginForm").addEventListener("submit", e => {
    e.preventDefault();
    login(new FormData(e.currentTarget).get("password"));
  });

  // Logout button
  document.getElementById("logoutBtn").addEventListener("click", logout);

  // Tabs
  document.querySelectorAll(".nav-tab").forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  // View all orders button on dashboard
  document.getElementById("btnViewAllOrders")?.addEventListener("click", () => switchTab("orders"));

  // Order status filter
  document.getElementById("orderStatusFilter").addEventListener("change", renderOrdersTable);

  // Add product toggle
  const addBox = document.getElementById("addProductBox");
  document.getElementById("toggleAddProduct").addEventListener("click", () => {
    addBox.style.display = addBox.style.display === "none" ? "block" : "none";
  });
  document.getElementById("closeAddProduct").addEventListener("click", () => {
    addBox.style.display = "none";
  });

  // Add product form submit
  document.getElementById("newProductForm").addEventListener("submit", e => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const newP = {
      id: slugify(d.get("name")),
      name: d.get("name").trim(),
      category: d.get("category").trim(),
      price: Number(d.get("price")) || 0,
      stock: Number(d.get("stock")) || 0,
      badge: d.get("badge")?.trim() || "New",
      image: d.get("image")?.trim() || "./assets/products/rose-midi-dress.png",
      description: d.get("description").trim(),
      sizes: parseCSV(d.get("sizes")),
      colors: parseCSV(d.get("colors")),
      featured: true,
      hidden: false
    };

    products.unshift(newP);
    save(STORAGE.products, products);
    e.currentTarget.reset();
    addBox.style.display = "none";
    renderKPIs();
    renderProductsTable();
    renderCategoriesDropdown();
    toast(`Product "${newP.name}" added successfully ✓`);
  });

  // Product search & filter
  document.getElementById("productSearch").addEventListener("input", renderProductsTable);
  document.getElementById("productCategorySelect").addEventListener("change", renderProductsTable);

  // Product photo upload (Add New Item)
  document.getElementById("newProductImageFile")?.addEventListener("change", async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      toast("Optimizing clothing photo...");
      const compressedDataUrl = await compressImage(file, 800, 0.85);
      document.getElementById("newProductImageUrl").value = compressedDataUrl;
      const preview = document.getElementById("newProductPhotoPreview");
      preview.style.display = "block";
      preview.querySelector("img").src = compressedDataUrl;
      toast("Photo uploaded & ready ✓");
    } catch(err) {
      console.error(err);
      toast("Failed to process photo.");
    }
  });

  // Payment form & QR preview
  document.getElementById("inputPayeeName")?.addEventListener("input", updateQrPreview);
  document.getElementById("inputPaymentPhone")?.addEventListener("input", updateQrPreview);
  document.getElementById("inputUpi")?.addEventListener("input", updateQrPreview);
  document.getElementById("inputQrImage")?.addEventListener("input", updateQrPreview);

  // File upload for QR code from device
  document.getElementById("qrFileInput").addEventListener("change", async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      toast("Optimizing QR image from device...");
      const compressedDataUrl = await compressImage(file, 650, 0.88);
      document.getElementById("inputQrImage").value = compressedDataUrl;
      updateQrPreview();
      
      // Auto-save immediately to live store
      store.qrImage = compressedDataUrl;
      store.payeeName = document.getElementById("inputPayeeName").value.trim() || store.payeeName;
      store.phone = document.getElementById("inputPaymentPhone").value.trim() || store.phone;
      store.paymentUpi = document.getElementById("inputUpi").value.trim() || store.paymentUpi;
      save(STORAGE.store, store);
      renderQuickStore();
      toast("QR Code uploaded & published live ✓");
    } catch(err) {
      console.error(err);
      toast("Error processing QR image.");
    }
  });

  document.getElementById("paymentConfigForm").addEventListener("submit", e => {
    e.preventDefault();
    store.payeeName = document.getElementById("inputPayeeName").value.trim();
    store.phone = document.getElementById("inputPaymentPhone").value.trim();
    store.paymentUpi = document.getElementById("inputUpi").value.trim();
    store.qrImage = document.getElementById("inputQrImage").value.trim();
    save(STORAGE.store, store);
    renderQuickStore();
    toast("Payment & QR Code settings saved & published to Live Store ✓");
  });

  // Store settings form
  document.getElementById("storeSettingsForm").addEventListener("submit", e => {
    e.preventDefault();
    store.name = document.getElementById("set_name").value.trim();
    store.tagline = document.getElementById("set_tagline").value.trim();
    store.announcement = document.getElementById("set_announcement").value.trim();
    store.phone = document.getElementById("set_phone").value.trim();
    store.phone2 = document.getElementById("set_phone2").value.trim();
    store.email = document.getElementById("set_email").value.trim();
    store.hours = document.getElementById("set_hours").value.trim();
    store.address = document.getElementById("set_address").value.trim();
    store.mapLink = document.getElementById("set_mapLink").value.trim();
    store.adminPassword = document.getElementById("set_adminPassword").value.trim() || "dhara-admin";

    save(STORAGE.store, store);
    document.getElementById("adminStoreTitle").textContent = `${store.name} · ${store.tagline}`;
    renderQuickStore();
    toast("Store settings saved ✓");
  });

  // Export data
  document.getElementById("btnExportData").addEventListener("click", () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      store,
      products,
      orders
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `dhara-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast("Store backup downloaded 📦");
  });

  // Import data
  document.getElementById("importFileInput").addEventListener("change", e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.store) { store = data.store; save(STORAGE.store, store); }
        if (Array.isArray(data.products)) { products = data.products; save(STORAGE.products, products); }
        if (Array.isArray(data.orders)) { orders = data.orders; save(STORAGE.orders, orders); }
        initDashboard();
        toast("Store data restored successfully ✓");
      } catch (err) {
        alert("Invalid JSON backup file.");
      }
    };
    reader.readAsText(file);
  });

  // Reset store
  document.getElementById("btnResetStore").addEventListener("click", () => {
    if (confirm("Reset all products, orders and settings back to default? All current data will be replaced.")) {
      store = clone(DEFAULT_STORE);
      products = clone(DEFAULT_PRODUCTS);
      orders = [];
      save(STORAGE.store, store);
      save(STORAGE.products, products);
      save(STORAGE.orders, orders);
      initDashboard();
      toast("Store reset to defaults ✓");
    }
  });
}

// ─── TOAST ─────────────────────────────────
function toast(msg) {
  const t = document.getElementById("adminToast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => t.classList.remove("show"), 2800);
}

// ─── CROSS-TAB LIVE SYNC ──────────────────
window.addEventListener("storage", e => {
  if (e.key === STORAGE.store) {
    store = load(STORAGE.store, DEFAULT_STORE);
    populatePaymentForm();
    populateSettingsForm();
    renderQuickStore();
  }
  if (e.key === STORAGE.products) {
    products = load(STORAGE.products, DEFAULT_PRODUCTS);
    renderKPIs();
    renderProductsTable();
    renderCategoriesDropdown();
  }
  if (e.key === STORAGE.orders) {
    orders = load(STORAGE.orders, []);
    renderKPIs();
    renderRecentOrders();
    renderOrdersTable();
  }
});
