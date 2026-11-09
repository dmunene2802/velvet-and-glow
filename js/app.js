/* =========================================================
   Velvet & Glow — storefront logic
   ========================================================= */
(() => {
  "use strict";

  /* ---------- Icons ---------- */
  const P = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICONS = {
    bag: P('<path d="M5 8h14l-1.2 12.1a1 1 0 0 1-1 .9H7.2a1 1 0 0 1-1-.9z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'),
    heart: P('<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>'),
    search: P('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    menu: P('<path d="M4 7h16M4 12h16M4 17h10"/>'),
    x: P('<path d="M6 6l12 12M18 6 6 18"/>'),
    plus: P('<path d="M12 5v14M5 12h14"/>'),
    minus: P('<path d="M5 12h14"/>'),
    trash: P('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),
    arrow: P('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    check: P('<path d="m5 12 5 5L20 7"/>'),
    truck: P('<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>'),
    phone: P('<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/>'),
    shield: P('<path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/>'),
    chat: P('<path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z"/>'),
    pin: P('<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
    mail: P('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
    tag: P('<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.3"/>'),
    // product art
    bottle: P('<path d="M9.5 2h5v3l1.5 2.5V20a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V7.5L9.5 5z"/><path d="M8 11h8M8 17h8"/>'),
    drop: P('<path d="M12 3c3.2 4.2 5.5 7 5.5 10.2a5.5 5.5 0 0 1-11 0C6.5 10 8.8 7.2 12 3z"/><path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5"/>'),
    jar: P('<rect x="4.5" y="9" width="15" height="12" rx="2.5"/><rect x="5.5" y="4.5" width="13" height="4.5" rx="1.2"/><path d="M9 15h6"/>'),
    spray: P('<path d="M8 10h7v10.5a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z"/><path d="M9.5 10V6.5h4V10M13.5 7.5H16"/><path d="M18.5 5l1.5-1M18.5 7.5h2M18.5 10l1.5 1"/>'),
    tube: P('<path d="M7.5 2.5h9L15 16H9z"/><path d="M10 16h4v3.5a1.5 1.5 0 0 1-1.5 1.5h-1A1.5 1.5 0 0 1 10 19.5z"/><path d="M8 6h8"/>'),
    scissors: P('<circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><path d="M8.2 16 19 3M15.8 16 5 3"/>'),
    foot: P('<path d="M9 21.5c-2.5 0-3.8-2-3.8-5.2 0-4 1.3-7.8 3.6-9.3 1.9-1.2 4 .1 4 2.5 0 2-1 3.6-1 5.6 0 1.6 1.7 2.6 1.7 3.8 0 1.4-1.6 2.6-4.5 2.6z"/><circle cx="15.5" cy="4" r="1.2"/><circle cx="18" cy="6.3" r="1"/><circle cx="19" cy="9.3" r=".9"/><circle cx="18.6" cy="12.2" r=".8"/>'),
    polish: P('<rect x="6.5" y="10" width="11" height="11.5" rx="2.5"/><path d="M10 10V2.5h4V10"/><path d="M9.5 15h5"/>'),
    nail: P('<path d="M8 21V10a4 4 0 0 1 8 0v11"/><path d="M9.5 10.5a2.5 2.5 0 0 1 5 0V14h-5z"/>'),
    brush: P('<path d="m14.5 3.5 6 6-8 8-6-6z"/><path d="M6.5 11.5 3 21l9.5-3.5"/>'),
    lamp: P('<path d="M3 19h18"/><path d="M5 19v-6a7 7 0 0 1 14 0v6"/><path d="M9 15h6M12 3V1.5M5.6 5.6 4.5 4.5M18.4 5.6l1.1-1.1"/>'),
    gem: P('<path d="M6.5 3.5h11L21 9l-9 12L3 9z"/><path d="M3 9h18M12 21 8.5 9 12 3.5 15.5 9z"/>'),
    bow: P('<path d="M12 12 4 7v10zM12 12l8-5v10z"/><circle cx="12" cy="12" r="1.8"/>'),
    key: P('<circle cx="8" cy="15" r="4.5"/><path d="m11.3 11.7 8.7-8.7M16.5 6.5l3 3M14.5 8.5l2 2"/>'),
    shower: P('<path d="M4 20V8a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4"/><path d="M10.5 8h7"/><path d="M12 12v1M15 12v2M18 12v1M13.5 16v1M16.5 16v1"/>'),
    lipstick: P('<path d="M8.5 21.5h7v-9h-7z"/><path d="M9.5 12.5V7l5-4.5v10"/><path d="M8.5 16h7"/>'),
    mirror: P('<circle cx="12" cy="9" r="6.5"/><path d="M12 15.5V21M8.5 21h7M9 7a3.5 3.5 0 0 1 3-2"/>'),
    cap: P('<path d="M4 15a8 8 0 0 1 16 0z"/><path d="M2.5 15h19"/><path d="M12 7V5"/>'),
    lash: P('<path d="M3 13c4.5-4.5 13.5-4.5 18 0"/><path d="M6 10.5 4.8 7.5M9 9l-.5-3.2M12 8.5V5M15 9l.5-3.2M18 10.5l1.2-3"/>'),
    sole: P('<path d="M12 2.5c-3 0-5 3-5 7 0 3 1 4.3 1 7.3 0 3 1.5 4.7 4 4.7s4-1.7 4-4.7c0-3 1-4.3 1-7.3 0-4-2-7-5-7z"/>'),
    pencil: P('<path d="m4 20 1.5-5.5L16.5 3.5l4 4L9.5 18.5z"/><path d="m14 6 4 4"/>'),
  };
  const icon = (name) => ICONS[name] || ICONS.bag;

  /* ---------- Helpers ---------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = (n) => `${STORE.currency} ${Number(n).toLocaleString("en-KE")}`;
  const store = {
    get(k, fallback) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } },
  };

  const CAT = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));
  const SUB = {};
  CATEGORIES.forEach((c) => c.subs.forEach((s) => { SUB[`${c.id}/${s.id}`] = s; }));
  const BY_ID = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));
  const subOf = (p) => SUB[`${p.cat}/${p.sub}`];
  const iconOf = (p) => p.icon || subOf(p).icon;
  const colorVars = (p) => `--c1:${CAT[p.cat].c1};--c2:${CAT[p.cat].c2}`;

  /** All possible prices for a product (non-null). */
  function priceList(p) {
    if (p.price != null) return [p.price];
    const out = [];
    p.options.forEach((g) => g.values.forEach((v) => { if (v.price != null) out.push(v.price); }));
    return out;
  }
  const minPrice = (p) => { const l = priceList(p); return l.length ? Math.min(...l) : null; };
  function priceHTML(p) {
    const l = priceList(p);
    if (!l.length) return `<span class="price request">Price on request</span>`;
    if (l.length === 1) return `<span class="price">${money(l[0])}</span>`;
    return `<span class="price"><small>From</small>${money(Math.min(...l))}</span>`;
  }
  /** Price for a specific option selection. */
  function priceFor(p, sel) {
    if (p.price != null) return p.price;
    for (const g of p.options) {
      const v = g.values.find((x) => x.label === sel[g.name]);
      if (v && v.price != null) return v.price;
    }
    return null;
  }

  /* ---------- State ---------- */
  const state = {
    cart: store.get("vg_cart", []).filter((i) => BY_ID[i.id]),
    wish: store.get("vg_wish", []).filter((id) => BY_ID[id]),
    filter: { cat: "all", sub: null, q: "", sort: "featured", priced: false },
  };
  const save = () => { store.set("vg_cart", state.cart); store.set("vg_wish", state.wish); };

  /* ---------- Static content ---------- */
  function hydrateStatic() {
    $$("[data-icon]").forEach((el) => { el.innerHTML = icon(el.dataset.icon); });
    const freeText = `Free delivery on orders over ${money(STORE.freeDeliveryOver)}`;
    const map = { name: STORE.name, tagline: STORE.tagline, location: STORE.location, phone: STORE.phone, email: STORE.email, freeDelivery: freeText };
    $$("[data-store]").forEach((el) => { el.textContent = map[el.dataset.store] ?? ""; });
    $$("[data-store-href]").forEach((el) => {
      const k = el.dataset.store;
      el.href = `${el.dataset.storeHref}:${String(STORE[k]).replace(/\s/g, "")}`;
    });
    $("#year").textContent = new Date().getFullYear();
    $("#statProducts").textContent = PRODUCTS.length + "+";

    // Desktop nav
    $("#mainNav").innerHTML =
      `<button data-action="filter-cat" data-cat="all">All</button>` +
      CATEGORIES.map((c) => `<button data-action="filter-cat" data-cat="${c.id}">${esc(c.name)}</button>`).join("");

    // Mobile nav
    $("#mobileNav").innerHTML =
      `<div class="mnav-group"><button data-action="filter-cat" data-cat="all">Shop all</button></div>` +
      CATEGORIES.map((c) => `
        <div class="mnav-group">
          <button data-action="filter-cat" data-cat="${c.id}">${esc(c.name)}</button>
          <ul>${c.subs.map((s) => `<li><button data-action="filter-cat" data-cat="${c.id}" data-sub="${s.id}">${esc(s.name)}</button></li>`).join("")}</ul>
        </div>`).join("");

    // Footer categories
    $("#footerCats").innerHTML = CATEGORIES.map((c) => `<li><button data-action="filter-cat" data-cat="${c.id}">${esc(c.name)}</button></li>`).join("");

    // Category tiles
    $("#catGrid").innerHTML = CATEGORIES.map((c) => {
      const n = PRODUCTS.filter((p) => p.cat === c.id).length;
      return `<button class="cat-tile" style="--c1:${c.c1};--c2:${c.c2}" data-action="filter-cat" data-cat="${c.id}">
        <span class="cat-icon">${icon(c.icon)}</span>
        <h3>${esc(c.name)}</h3>
        <p>${esc(c.blurb)}</p>
        <span class="cat-meta"><span>${n} products</span><span>${icon("arrow")}</span></span>
      </button>`;
    }).join("");

    // Featured
    const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);
    $("#featuredGrid").innerHTML = featured.map(cardHTML).join("");
  }

  /* ---------- Product card ---------- */
  function cardHTML(p, i = 0) {
    const sub = subOf(p);
    const wished = state.wish.includes(p.id);
    const multi = p.options.length > 0;
    return `<article class="card" data-action="open-product" data-id="${p.id}" style="animation-delay:${Math.min(i, 12) * 30}ms" tabindex="0" aria-label="${esc(p.name)}">
      <div class="card-media" style="${colorVars(p)}">
        <span class="art">${icon(iconOf(p))}</span>
        ${multi && priceList(p).length > 1 ? `<span class="badge">${p.options[p.options.length - 1].values.length} options</span>` : ""}
        ${p.cat === "hair" ? `<span class="badge">4 sizes</span>` : ""}
        <button class="wish ${wished ? "on" : ""}" data-action="toggle-wish" data-id="${p.id}" aria-label="${wished ? "Remove from" : "Add to"} wishlist" aria-pressed="${wished}">${icon("heart")}</button>
      </div>
      <div class="card-body">
        <span class="card-cat">${esc(sub.name)}</span>
        <h3>${esc(p.name)}</h3>
        <span class="card-type">${esc(p.type)}</span>
        <div class="card-foot">
          ${priceHTML(p)}
          <button class="add-btn" data-action="quick-add" data-id="${p.id}" aria-label="Add ${esc(p.name)} to cart">${icon("plus")}</button>
        </div>
      </div>
    </article>`;
  }

  /* ---------- Shop: filters & grid ---------- */
  function filteredProducts() {
    const { cat, sub, q, sort, priced } = state.filter;
    const query = q.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      if (cat !== "all" && p.cat !== cat) return false;
      if (sub && p.sub !== sub) return false;
      if (priced && !priceList(p).length) return false;
      if (query) {
        const hay = `${p.name} ${p.type} ${subOf(p).name} ${CAT[p.cat].name}`.toLowerCase();
        return query.split(/\s+/).every((w) => hay.includes(w));
      }
      return true;
    });
    const big = Number.MAX_SAFE_INTEGER;
    if (sort === "price-asc") list = [...list].sort((a, b) => (minPrice(a) ?? big) - (minPrice(b) ?? big));
    if (sort === "price-desc") list = [...list].sort((a, b) => (minPrice(b) ?? -1) - (minPrice(a) ?? -1));
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }

  function renderFilters() {
    const { cat, sub } = state.filter;
    const countCat = (id) => PRODUCTS.filter((p) => p.cat === id).length;
    const countSub = (c, s) => PRODUCTS.filter((p) => p.cat === c && p.sub === s).length;
    $("#filters").innerHTML = `
      <h4>Categories</h4>
      <div class="f-list">
        <div class="f-cat"><button class="f-btn ${cat === "all" ? "active" : ""}" data-action="filter-cat" data-cat="all" data-noscroll>All products <span class="n">${PRODUCTS.length}</span></button></div>
        ${CATEGORIES.map((c) => `
          <div class="f-cat ${cat === c.id ? "open" : ""}">
            <button class="f-btn ${cat === c.id && !sub ? "active" : cat === c.id ? "active" : ""}" data-action="filter-cat" data-cat="${c.id}" data-noscroll>${esc(c.name)} <span class="n">${countCat(c.id)}</span></button>
            <div class="f-subs">
              ${c.subs.map((s) => `<button class="f-btn ${cat === c.id && sub === s.id ? "active" : ""}" data-action="filter-cat" data-cat="${c.id}" data-sub="${s.id}" data-noscroll>${esc(s.name)} <span class="n">${countSub(c.id, s.id)}</span></button>`).join("")}
            </div>
          </div>`).join("")}
      </div>
      <div class="f-sublist">${cat !== "all"
        ? `<button class="f-btn ${!sub ? "active" : ""}" data-action="filter-cat" data-cat="${cat}" data-noscroll>All ${esc(CAT[cat].name)}</button>` +
          CAT[cat].subs.map((s) => `<button class="f-btn ${sub === s.id ? "active" : ""}" data-action="filter-cat" data-cat="${cat}" data-sub="${s.id}" data-noscroll>${esc(s.name)}</button>`).join("")
        : ""}</div>`;
    // Desktop sub-buttons inside the active category shouldn't double-highlight the parent
    if (sub) $$(".f-cat.open > .f-btn").forEach((b) => b.classList.remove("active"));
  }

  function renderShop() {
    const { cat, sub, q, priced } = state.filter;
    const list = filteredProducts();
    $("#productGrid").innerHTML = list.map(cardHTML).join("");
    $("#emptyState").hidden = list.length > 0;
    $("#resultCount").textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
    $("#shopTitle").textContent = sub ? SUB[`${cat}/${sub}`].name : cat !== "all" ? CAT[cat].name : q ? `Results for “${q}”` : "All products";

    const chips = [];
    if (cat !== "all") chips.push(`<span class="chip">${esc(CAT[cat].name)}<button data-action="clear-cat" aria-label="Remove category filter">${icon("x")}</button></span>`);
    if (sub) chips.push(`<span class="chip">${esc(SUB[`${cat}/${sub}`].name)}<button data-action="clear-sub" aria-label="Remove subcategory filter">${icon("x")}</button></span>`);
    if (q) chips.push(`<span class="chip">“${esc(q)}”<button data-action="clear-search" aria-label="Clear search">${icon("x")}</button></span>`);
    if (priced) chips.push(`<span class="chip">Priced items<button data-action="clear-priced" aria-label="Show all items">${icon("x")}</button></span>`);
    if (chips.length > 1) chips.push(`<button class="chip-clear" data-action="clear-filters">Clear all</button>`);
    $("#activeFilters").innerHTML = chips.join("");

    $$("#mainNav button").forEach((b) => b.classList.toggle("active", b.dataset.cat === cat));
    renderFilters();
  }

  function setFilter(patch, scroll = true) {
    Object.assign(state.filter, patch);
    renderShop();
    if (scroll) $("#shop").scrollIntoView({ behavior: "smooth" });
  }

  /* ---------- Wishlist ---------- */
  function toggleWish(id) {
    const i = state.wish.indexOf(id);
    if (i >= 0) { state.wish.splice(i, 1); toast(`Removed from wishlist`); }
    else { state.wish.push(id); toast(`${BY_ID[id].name} saved to wishlist`, "View", () => openDrawer("wish")); }
    save();
    syncWishButtons();
    renderWish();
    updateCounts();
  }
  function syncWishButtons() {
    $$("[data-action='toggle-wish']").forEach((b) => {
      const on = state.wish.includes(b.dataset.id);
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on);
    });
  }
  function renderWish() {
    const body = $("#wishBody");
    if (!state.wish.length) {
      body.innerHTML = emptyHTML("heart", "Your wishlist is empty", "Tap the heart on any product to save it for later.");
      return;
    }
    body.innerHTML = state.wish.map((id) => {
      const p = BY_ID[id];
      return `<div class="line-item">
        <div class="thumb" style="${colorVars(p)}">${icon(iconOf(p))}</div>
        <div class="li-info">
          <h4>${esc(p.name)}</h4><p>${esc(subOf(p).name)}</p>
          <div class="li-price ${priceList(p).length ? "" : "request"}">${priceList(p).length ? (priceList(p).length > 1 ? "From " : "") + money(minPrice(p)) : "Price on request"}</div>
        </div>
        <div class="li-side">
          <button class="remove" data-action="toggle-wish" data-id="${p.id}" aria-label="Remove from wishlist">${icon("trash")}</button>
          <button class="btn btn-primary btn-sm" data-action="quick-add" data-id="${p.id}">Add</button>
        </div>
      </div>`;
    }).join("");
  }

  /* ---------- Cart ---------- */
  const keyOf = (id, sel) => id + "|" + Object.entries(sel).map(([k, v]) => `${k}:${v}`).join(",");
  const selText = (sel) => Object.entries(sel).map(([k, v]) => `${k}: ${v}`).join(" · ");

  function addToCart(id, sel = {}, qty = 1) {
    const p = BY_ID[id];
    const key = keyOf(id, sel);
    const existing = state.cart.find((i) => i.key === key);
    if (existing) existing.qty += qty;
    else state.cart.push({ key, id, sel, qty, price: priceFor(p, sel) });
    save();
    renderCart();
    updateCounts(true);
    toast(`${p.name} added to cart`, "View cart", () => openDrawer("cart"));
  }
  function changeQty(key, delta) {
    const item = state.cart.find((i) => i.key === key);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) state.cart = state.cart.filter((i) => i.key !== key);
    save(); renderCart(); updateCounts();
  }
  function removeItem(key) {
    const item = state.cart.find((i) => i.key === key);
    state.cart = state.cart.filter((i) => i.key !== key);
    save(); renderCart(); updateCounts();
    if (item) toast(`${BY_ID[item.id].name} removed`, "Undo", () => { state.cart.push(item); save(); renderCart(); updateCounts(); });
  }

  function totals(deliveryId) {
    const subtotal = state.cart.reduce((s, i) => s + (i.price ?? 0) * i.qty, 0);
    const unpriced = state.cart.filter((i) => i.price == null).reduce((s, i) => s + i.qty, 0);
    const items = state.cart.reduce((s, i) => s + i.qty, 0);
    const opt = STORE.delivery.find((d) => d.id === deliveryId);
    let delivery = opt ? opt.fee : null;
    if (opt && opt.fee > 0 && subtotal >= STORE.freeDeliveryOver) delivery = 0;
    return { subtotal, unpriced, items, delivery, total: subtotal + (delivery ?? 0) };
  }

  function renderCart() {
    const t = totals();
    $("#cartHeadCount").textContent = t.items ? `(${t.items})` : "";
    if (!state.cart.length) {
      $("#cartBody").innerHTML = emptyHTML("bag", "Your cart is empty", "Explore our hair care, nails, makeup and accessories.", true);
      $("#cartFoot").innerHTML = "";
      $("#cartFoot").hidden = true;
      return;
    }
    $("#cartFoot").hidden = false;
    const left = STORE.freeDeliveryOver - t.subtotal;
    const pct = Math.min(100, (t.subtotal / STORE.freeDeliveryOver) * 100);
    $("#cartBody").innerHTML = `
      <div class="free-bar">
        ${left > 0 ? `You're <b>${money(left)}</b> away from free delivery` : `<b>You've unlocked free delivery!</b>`}
        <div class="track"><div class="fill" style="width:${pct}%"></div></div>
      </div>
      ${state.cart.map((i) => {
        const p = BY_ID[i.id];
        return `<div class="line-item">
          <div class="thumb" style="${colorVars(p)}">${icon(iconOf(p))}</div>
          <div class="li-info">
            <h4>${esc(p.name)}</h4>
            <p>${esc(i.sel && Object.keys(i.sel).length ? selText(i.sel) : p.type)}</p>
            <div class="li-price ${i.price == null ? "request" : ""}">${i.price == null ? "Price confirmed on order" : money(i.price * i.qty)}</div>
          </div>
          <div class="li-side">
            <button class="remove" data-action="remove-item" data-key="${esc(i.key)}" aria-label="Remove ${esc(p.name)}">${icon("trash")}</button>
            <div class="qty">
              <button data-action="qty" data-key="${esc(i.key)}" data-delta="-1" aria-label="Decrease quantity">${icon("minus")}</button>
              <span>${i.qty}</span>
              <button data-action="qty" data-key="${esc(i.key)}" data-delta="1" aria-label="Increase quantity">${icon("plus")}</button>
            </div>
          </div>
        </div>`;
      }).join("")}`;
    $("#cartFoot").innerHTML = `
      <div class="sum-row"><span>Subtotal</span><span>${money(t.subtotal)}</span></div>
      <div class="sum-row"><span>Delivery</span><span>Calculated at checkout</span></div>
      ${t.unpriced ? `<p class="note">${t.unpriced} item${t.unpriced > 1 ? "s" : ""} in your cart ${t.unpriced > 1 ? "are" : "is"} priced on request. We'll confirm the final price with you before delivery.</p>` : ""}
      <button class="btn btn-primary btn-block" data-action="checkout">Checkout <span>${icon("arrow")}</span></button>
      <button class="btn btn-block" data-action="close-all" style="margin-top:6px">Continue shopping</button>`;
  }

  function emptyHTML(ic, title, text, shop) {
    return `<div class="drawer-empty"><span>${icon(ic)}</span><h4>${title}</h4><p>${text}</p>
      <button class="btn btn-primary" data-action="${shop ? "shop-all" : "close-all"}">${shop ? "Start shopping" : "Keep browsing"}</button></div>`;
  }

  function updateCounts(bump) {
    const n = state.cart.reduce((s, i) => s + i.qty, 0);
    const c = $("#cartCount"), w = $("#wishCount");
    c.textContent = n; c.classList.toggle("show", n > 0);
    w.textContent = state.wish.length; w.classList.toggle("show", state.wish.length > 0);
    if (bump) { c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump"); }
  }

  /* ---------- Drawers & modal ---------- */
  let lastFocus = null;
  function openDrawer(which) {
    closeAll(false);
    const el = { cart: "#cartDrawer", wish: "#wishDrawer", menu: "#menuDrawer" }[which];
    lastFocus = document.activeElement;
    $(el).classList.add("open");
    $(el).setAttribute("aria-hidden", "false");
    $("#menuOverlay").classList.add("show");
    document.body.classList.add("locked");
    setTimeout(() => $(`${el} .icon-btn`)?.focus(), 50);
  }
  function closeAll(restore = true) {
    $$(".drawer.open").forEach((d) => { d.classList.remove("open"); d.setAttribute("aria-hidden", "true"); });
    $("#menuOverlay").classList.remove("show");
    closeModal(false);
    document.body.classList.remove("locked");
    if (restore && lastFocus) lastFocus.focus?.();
  }
  function openModal(html, narrow = false) {
    $$(".drawer.open").forEach((d) => { d.classList.remove("open"); d.setAttribute("aria-hidden", "true"); });
    $("#menuOverlay").classList.remove("show");
    if (!$("#modalWrap").classList.contains("show")) lastFocus = document.activeElement;
    $("#modalContent").innerHTML = html;
    $("#modal").classList.toggle("narrow", narrow);
    $("#modal").scrollTop = 0;
    $("#modalWrap").classList.add("show");
    $("#modalWrap").setAttribute("aria-hidden", "false");
    document.body.classList.add("locked");
    setTimeout(() => $("#modal .modal-close").focus(), 50);
  }
  function closeModal(restore = true) {
    const wrap = $("#modalWrap");
    if (!wrap.classList.contains("show")) return;
    wrap.classList.remove("show");
    wrap.setAttribute("aria-hidden", "true");
    document.body.classList.remove("locked");
    if (restore && lastFocus) lastFocus.focus?.();
  }

  /* ---------- Product detail ---------- */
  let pd = null; // { id, sel, qty }
  function openProduct(id) {
    const p = BY_ID[id];
    const sel = {};
    p.options.forEach((g) => { sel[g.name] = g.values[0].label; });
    pd = { id, sel, qty: 1 };
    renderProduct();
  }
  function renderProduct() {
    const p = BY_ID[pd.id];
    const sub = subOf(p);
    const price = priceFor(p, pd.sel);
    const wished = state.wish.includes(p.id);
    const html = `<div class="pd">
      <div class="pd-media" style="${colorVars(p)}"><span class="art">${icon(iconOf(p))}</span></div>
      <div class="pd-info">
        <span class="crumbs">${esc(CAT[p.cat].name)} / ${esc(sub.name)}</span>
        <h2>${esc(p.name)}</h2>
        <p class="pd-type">${esc(p.type)}</p>
        <div class="pd-price ${price == null ? "request" : ""}" id="pdPrice">${price == null ? "Price on request" : money(price)}</div>
        <p class="pd-desc">${esc(sub.desc)}</p>
        ${p.options.map((g) => `
          <div class="opt-group">
            <p>${esc(g.name)}: <span>${esc(pd.sel[g.name])}</span></p>
            <div class="opts">${g.values.map((v) => `<button class="opt ${pd.sel[g.name] === v.label ? "active" : ""}" data-action="pick-opt" data-group="${esc(g.name)}" data-value="${esc(v.label)}">${esc(v.label)}</button>`).join("")}</div>
          </div>`).join("")}
        <div class="opt-group"><p>Quantity</p>
          <div class="qty lg">
            <button data-action="pd-qty" data-delta="-1" aria-label="Decrease quantity">${icon("minus")}</button>
            <span>${pd.qty}</span>
            <button data-action="pd-qty" data-delta="1" aria-label="Increase quantity">${icon("plus")}</button>
          </div>
        </div>
        <div class="pd-actions">
          <button class="btn btn-primary" data-action="pd-add">${icon("bag")} Add to cart${price != null ? ` · ${money(price * pd.qty)}` : ""}</button>
          <button class="pd-wish ${wished ? "on" : ""}" data-action="toggle-wish" data-id="${p.id}" aria-label="Toggle wishlist" aria-pressed="${wished}">${icon("heart")}</button>
        </div>
        <button class="btn btn-ghost btn-block" data-action="pd-buy" style="margin-top:10px">Buy now</button>
        <ul class="pd-perks">
          ${price == null ? `<li>${icon("tag")} Final price confirmed with you before delivery</li>` : ""}
          <li>${icon("truck")} Delivery in Nairobi & countrywide, or free store pickup</li>
          <li>${icon("phone")} Pay with M-Pesa or cash on delivery</li>
        </ul>
      </div>
    </div>`;
    if ($("#modalWrap").classList.contains("show") && $("#modalContent .pd")) {
      $("#modalContent").innerHTML = html; // re-render in place
    } else {
      openModal(html);
    }
  }

  /* ---------- Checkout ---------- */
  function openCheckout() {
    if (!state.cart.length) { toast("Your cart is empty"); return; }
    const saved = store.get("vg_customer", {});
    const html = `<div class="checkout">
      <form class="co-form" id="checkoutForm" novalidate>
        <h2>Checkout</h2>
        <p>We'll confirm your order by phone or WhatsApp before dispatch.</p>
        <fieldset>
          <legend>Your details</legend>
          <div class="field-row">
            <div class="field"><label for="coName">Full name</label><input id="coName" name="name" autocomplete="name" value="${esc(saved.name || "")}" required /><span class="err">Please enter your name</span></div>
            <div class="field"><label for="coPhone">Phone (M-Pesa)</label><input id="coPhone" name="phone" type="tel" placeholder="07XX XXX XXX" autocomplete="tel" value="${esc(saved.phone || "")}" required /><span class="err">Enter a valid Kenyan phone number</span></div>
          </div>
          <div class="field"><label for="coEmail">Email <span style="color:var(--muted);font-weight:400">(optional)</span></label><input id="coEmail" name="email" type="email" autocomplete="email" value="${esc(saved.email || "")}" /><span class="err">Enter a valid email address</span></div>
        </fieldset>
        <fieldset>
          <legend>Delivery</legend>
          <div class="radio-cards">
            ${STORE.delivery.map((d, i) => `
              <label class="radio-card"><input type="radio" name="delivery" value="${d.id}" ${i === 1 ? "checked" : ""} />
                <div><b>${esc(d.label)}</b><small>${d.fee === 0 ? "Collect from our shop" : `Free over ${money(STORE.freeDeliveryOver)}`}</small></div>
                <span class="fee">${d.fee === 0 ? "Free" : money(d.fee)}</span>
              </label>`).join("")}
          </div>
          <div class="field" id="addressField" style="margin-top:12px"><label for="coAddress">Delivery address / landmark</label><textarea id="coAddress" name="address" placeholder="Estate, street, building, or nearest landmark">${esc(saved.address || "")}</textarea><span class="err">Please enter a delivery address</span></div>
        </fieldset>
        <fieldset>
          <legend>Payment</legend>
          <div class="radio-cards">
            <label class="radio-card"><input type="radio" name="payment" value="M-Pesa" checked /><div><b>M-Pesa</b><small>We'll send payment details when we confirm your order</small></div></label>
            <label class="radio-card"><input type="radio" name="payment" value="Cash on delivery" /><div><b>Cash on delivery</b><small>Pay when your order arrives</small></div></label>
          </div>
        </fieldset>
        <div class="field"><label for="coNotes">Order notes <span style="color:var(--muted);font-weight:400">(optional)</span></label><textarea id="coNotes" name="notes" placeholder="Shade, scent, preferred delivery time…"></textarea></div>
        <button class="btn btn-primary btn-block" type="submit" id="placeOrder">Place order</button>
      </form>
      <aside class="co-summary" id="coSummary"></aside>
    </div>`;
    openModal(html);
    renderSummary();
    toggleAddress();
  }
  function selectedDelivery() { return $("#checkoutForm input[name=delivery]:checked")?.value; }
  function toggleAddress() {
    const pickup = selectedDelivery() === "pickup";
    $("#addressField").hidden = pickup;
  }
  function renderSummary() {
    const t = totals(selectedDelivery());
    $("#coSummary").innerHTML = `
      <h3>Order summary</h3>
      <div class="co-items">${state.cart.map((i) => {
        const p = BY_ID[i.id];
        return `<div class="co-item">
          <div class="thumb" style="${colorVars(p)}">${icon(iconOf(p))}<em>${i.qty}</em></div>
          <div><span>${esc(p.name)}</span><small>${esc(Object.keys(i.sel).length ? selText(i.sel) : p.type)}</small></div>
          <b>${i.price == null ? "TBC" : money(i.price * i.qty)}</b>
        </div>`;
      }).join("")}</div>
      <div class="sum-row"><span>Subtotal</span><span>${money(t.subtotal)}</span></div>
      <div class="sum-row"><span>Delivery</span><span>${t.delivery === 0 ? "Free" : money(t.delivery)}</span></div>
      <div class="sum-row total"><span>Total</span><span>${money(t.total)}${t.unpriced ? " +" : ""}</span></div>
      ${t.unpriced ? `<p class="note">+ ${t.unpriced} item${t.unpriced > 1 ? "s" : ""} priced on request. We'll confirm the final total with you.</p>` : ""}`;
  }

  function validPhone(v) { return /^(?:\+?254|0)(7|1)\d{8}$/.test(v.replace(/[\s-]/g, "")); }

  function submitOrder(form) {
    const data = Object.fromEntries(new FormData(form));
    const pickup = data.delivery === "pickup";
    const checks = [
      ["coName", data.name.trim().length >= 2],
      ["coPhone", validPhone(data.phone)],
      ["coEmail", !data.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)],
      ["coAddress", pickup || data.address.trim().length >= 4],
    ];
    let firstBad = null;
    checks.forEach(([id, ok]) => {
      $(`#${id}`).closest(".field").classList.toggle("invalid", !ok);
      if (!ok && !firstBad) firstBad = $(`#${id}`);
    });
    if (firstBad) { firstBad.focus(); return; }

    store.set("vg_customer", { name: data.name, phone: data.phone, email: data.email, address: data.address });
    const t = totals(data.delivery);
    const orderNo = "VG-" + Date.now().toString(36).toUpperCase().slice(-6);
    const deliveryOpt = STORE.delivery.find((d) => d.id === data.delivery);
    const lines = state.cart.map((i) => {
      const p = BY_ID[i.id];
      const opts = Object.keys(i.sel).length ? ` (${selText(i.sel)})` : "";
      return `• ${i.qty} x ${p.name}${opts} — ${i.price == null ? "price TBC" : money(i.price * i.qty)}`;
    });
    const msg = [
      `Hello ${STORE.name}! I'd like to place an order.`,
      ``, `Order: ${orderNo}`, ...lines, ``,
      `Subtotal: ${money(t.subtotal)}`,
      `Delivery: ${deliveryOpt.label} (${t.delivery === 0 ? "Free" : money(t.delivery)})`,
      `Total: ${money(t.total)}${t.unpriced ? " + items priced on request" : ""}`,
      `Payment: ${data.payment}`, ``,
      `Name: ${data.name}`, `Phone: ${data.phone}`,
      pickup ? `Collection: Store pickup` : `Address: ${data.address}`,
      data.notes ? `Notes: ${data.notes}` : "",
    ].filter((l, idx, arr) => !(l === "" && arr[idx - 1] === "")).join("\n");
    const waLink = `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(msg)}`;

    const orders = store.get("vg_orders", []);
    orders.unshift({ orderNo, date: new Date().toISOString(), items: state.cart, total: t.total, customer: data });
    store.set("vg_orders", orders.slice(0, 20));

    state.cart = [];
    save(); renderCart(); updateCounts();

    openModal(`<div class="success">
      <div class="success-icon">${icon("check")}</div>
      <h2>Thank you, ${esc(data.name.split(" ")[0])}!</h2>
      <p>Your order has been received. Send it to us on WhatsApp so we can confirm it right away.</p>
      <div class="order-box">
        <div class="row"><span>Order number</span><b>${orderNo}</b></div>
        <div class="row"><span>Items</span><span>${t.items}</span></div>
        <div class="row"><span>Delivery</span><span>${esc(deliveryOpt.label)}</span></div>
        <div class="row"><span>Payment</span><span>${esc(data.payment)}</span></div>
        <div class="row"><span>Total</span><b>${money(t.total)}${t.unpriced ? " + TBC items" : ""}</b></div>
      </div>
      <div class="success-actions">
        <a class="btn btn-whatsapp btn-block" href="${waLink}" target="_blank" rel="noopener">${icon("chat")} Send order on WhatsApp</a>
        <button class="btn btn-ghost btn-block" data-action="close-modal">Continue shopping</button>
      </div>
    </div>`, true);
  }

  /* ---------- Info pages ---------- */
  const INFO = {
    delivery: ["Delivery information", `<p>We deliver within Nairobi and countrywide, or you can collect your order from our shop for free.</p>
      <ul>${STORE.delivery.map((d) => `<li><b>${esc(d.label)}:</b> ${d.fee ? money(d.fee) : "Free"}</li>`).join("")}
      <li>Free delivery on orders over ${money(STORE.freeDeliveryOver)}.</li></ul>
      <p>We'll confirm your delivery time when we call or message you about your order.</p>`],
    payment: ["Payment options", `<ul><li><b>M-Pesa:</b> we send payment details when we confirm your order.</li><li><b>Cash on delivery:</b> pay when your order arrives.</li></ul><p>We'll never ask for your M-Pesa PIN.</p>`],
    returns: ["Returns & exchanges", `<p>If an item arrives damaged or isn't what you ordered, contact us within 48 hours and we'll arrange an exchange. For hygiene reasons, opened beauty and cosmetic products can't be returned.</p>`],
    pricing: ["About our pricing", `<p>Many products come in several sizes, designs or quality levels, so they show a "From" price. Pick the option you want on the product page to see its exact price.</p><p>Items marked <b>Price on request</b> can still be ordered. We'll confirm the price with you before your order is dispatched.</p>`],
  };
  function openInfo(key) {
    const [title, body] = INFO[key];
    openModal(`<div class="info"><h2>${title}</h2>${body}<div style="margin-top:22px"><button class="btn btn-primary" data-action="close-modal">Got it</button></div></div>`, true);
  }

  /* ---------- Toasts ---------- */
  function toast(text, actionLabel, onAction) {
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `<span>${icon("check")}</span><p>${esc(text)}</p>${actionLabel ? `<button>${esc(actionLabel)}</button>` : ""}`;
    if (actionLabel) el.querySelector("button").addEventListener("click", () => { onAction(); dismiss(); });
    const stack = $("#toasts");
    stack.appendChild(el);
    while (stack.children.length > 3) stack.firstChild.remove();
    const dismiss = () => { el.classList.add("out"); setTimeout(() => el.remove(), 300); };
    setTimeout(dismiss, 3200);
  }

  /* ---------- Events ---------- */
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-action]");
    if (!t) return;
    const a = t.dataset.action;
    const id = t.dataset.id;

    // Prevent inner buttons from also triggering the card
    if (a !== "open-product") e.stopPropagation();

    switch (a) {
      case "open-product": openProduct(id); break;
      case "toggle-wish": toggleWish(id); break;
      case "quick-add": {
        const p = BY_ID[id];
        if (p.options.length) openProduct(id);
        else addToCart(id);
        break;
      }
      case "pick-opt": pd.sel[t.dataset.group] = t.dataset.value; renderProduct(); break;
      case "pd-qty": pd.qty = Math.max(1, Math.min(99, pd.qty + Number(t.dataset.delta))); renderProduct(); break;
      case "pd-add": addToCart(pd.id, { ...pd.sel }, pd.qty); closeModal(); break;
      case "pd-buy": addToCart(pd.id, { ...pd.sel }, pd.qty); openCheckout(); break;
      case "qty": changeQty(t.dataset.key, Number(t.dataset.delta)); break;
      case "remove-item": removeItem(t.dataset.key); break;
      case "open-cart": openDrawer("cart"); break;
      case "open-wishlist": openDrawer("wish"); break;
      case "open-menu": openDrawer("menu"); break;
      case "close-all": closeAll(); break;
      case "close-modal": closeModal(); break;
      case "checkout": openCheckout(); break;
      case "filter-cat":
        e.preventDefault();
        closeAll(false);
        setFilter({ cat: t.dataset.cat, sub: t.dataset.sub || null }, !("noscroll" in t.dataset));
        break;
      case "shop-all":
        e.preventDefault();
        closeAll(false);
        setFilter({ cat: "all", sub: null, q: "" });
        $("#searchInput").value = "";
        break;
      case "clear-cat": setFilter({ cat: "all", sub: null }, false); break;
      case "clear-sub": setFilter({ sub: null }, false); break;
      case "clear-search": $("#searchInput").value = ""; setFilter({ q: "" }, false); break;
      case "clear-priced": $("#pricedOnly").checked = false; setFilter({ priced: false }, false); break;
      case "clear-filters":
        $("#searchInput").value = ""; $("#pricedOnly").checked = false;
        setFilter({ cat: "all", sub: null, q: "", priced: false }, false);
        break;
      case "go-home": e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); break;
      case "toggle-search": {
        const f = $("#searchForm");
        f.classList.toggle("mobile-open");
        if (f.classList.contains("mobile-open")) $("#searchInput").focus();
        break;
      }
      case "info": e.preventDefault(); openInfo(t.dataset.info); break;
      case "whatsapp":
        e.preventDefault();
        window.open(`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(`Hello ${STORE.name}! I have a question.`)}`, "_blank", "noopener");
        break;
    }
  });

  // Keyboard: open cards with Enter/Space, close overlays with Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeAll(); $("#searchForm").classList.remove("mobile-open"); }
    if ((e.key === "Enter" || e.key === " ") && e.target.matches(".card")) { e.preventDefault(); openProduct(e.target.dataset.id); }
  });

  // Search (live, debounced)
  let searchTimer;
  $("#searchInput").addEventListener("input", (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => setFilter({ q: e.target.value.trim(), cat: "all", sub: null }, false), 180);
  });
  $("#searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    setFilter({ q: $("#searchInput").value.trim(), cat: "all", sub: null });
    $("#searchForm").classList.remove("mobile-open");
    $("#searchInput").blur();
  });

  $("#sortSelect").addEventListener("change", (e) => setFilter({ sort: e.target.value }, false));
  $("#pricedOnly").addEventListener("change", (e) => setFilter({ priced: e.target.checked }, false));

  // Checkout form (delegated since it's rendered dynamically)
  document.addEventListener("change", (e) => {
    if (e.target.name === "delivery" && e.target.closest("#checkoutForm")) { renderSummary(); toggleAddress(); }
  });
  document.addEventListener("input", (e) => {
    const f = e.target.closest("#checkoutForm .field.invalid");
    if (f) f.classList.remove("invalid");
  });
  document.addEventListener("submit", (e) => {
    if (e.target.id === "checkoutForm") { e.preventDefault(); submitOrder(e.target); }
  });

  // Newsletter
  $("#newsletterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = $("#newsletterEmail");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) { toast("Please enter a valid email address"); input.focus(); return; }
    const list = store.get("vg_newsletter", []);
    if (!list.includes(input.value)) list.push(input.value);
    store.set("vg_newsletter", list);
    input.value = "";
    toast("You're subscribed! Watch your inbox for new arrivals.");
  });

  // Header shadow on scroll
  const header = $(".header");
  window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 10), { passive: true });

  /* ---------- Init ---------- */
  hydrateStatic();
  renderShop();
  renderCart();
  renderWish();
  updateCounts();
})();
