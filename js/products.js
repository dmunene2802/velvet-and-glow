/* =========================================================================
   STORE SETTINGS & PRODUCT CATALOGUE
   -------------------------------------------------------------------------
   Edit this file to change the shop name, contact details, delivery fees
   and prices. A price of `null` shows "Price on request" in the shop —
   customers can still order it and the price is confirmed with them.
   ========================================================================= */

const STORE = {
  name: "Velvet & Glow",
  tagline: "Beauty · Nails · Accessories",
  currency: "KES",
  // Placeholder contact details — replace with the shop's real details.
  whatsapp: "254700000000",          // international format, no "+"
  phone: "+254 700 000 000",
  email: "hello@velvetandglow.co.ke",
  location: "Nairobi, Kenya",
  // Placeholder delivery options — adjust to the shop's real fees.
  delivery: [
    { id: "pickup",  label: "Store pickup",           fee: 0 },
    { id: "nairobi", label: "Delivery within Nairobi", fee: 200 },
    { id: "country", label: "Countrywide delivery",    fee: 350 },
  ],
  freeDeliveryOver: 3000, // free delivery (not pickup) above this subtotal
  // M-Pesa payment details shown at checkout.
  // Leave `number` empty to hide the pay-now instructions (customers are then
  // told you'll send payment details when you confirm their order).
  mpesa: {
    type: "paybill",         // "till" (Buy Goods & Services) or "paybill"
    number: "247247",        // Till or Paybill (business) number
    account: "0715362083",   // Paybill only: fixed account number. Leave "" to use the order number.
    name: "",                // name customers see when confirming, e.g. "VELVET & GLOW" ("" to hide)
  },
};

const HAIR_SIZES = ["Small", "Medium", "Large", "Super Large"];

const CATEGORIES = [
  {
    id: "hair", name: "Hair Care", icon: "bottle",
    blurb: "Shampoos, growth oils, treatments and styling for every texture.",
    c1: "#f3dfd6", c2: "#e7bfae",
    subs: [
      { id: "wash",      name: "Shampoo & Conditioner", icon: "bottle", desc: "Cleansing, conditioning and treatment care for healthy, manageable hair. Available as shampoo, conditioner or treatment in four sizes." },
      { id: "growth",    name: "Growth & Hair Oils",    icon: "drop",   desc: "Nourishing oils and growth formulas that strengthen roots, seal in moisture and add shine." },
      { id: "treatment", name: "Hair Treatments",       icon: "jar",    desc: "Deep treatments that repair, soften and restore hair between salon visits." },
      { id: "spray",     name: "Hair Sprays",           icon: "spray",  desc: "Light, moisturising sprays for daily refresh, shine and hold." },
      { id: "gel",       name: "Gels & Styling",        icon: "tube",   desc: "Edge control, gels and styling products for sleek, long-lasting styles." },
    ],
  },
  {
    id: "nails", name: "Nails", icon: "polish",
    blurb: "Manicure tools, gels, press-ons and salon equipment.",
    c1: "#f6dde3", c2: "#e4a9b8",
    subs: [
      { id: "manicure",   name: "Manicure Tools",        icon: "scissors", desc: "Essential manicure tools for clean, shaped and polished nails." },
      { id: "pedicure",   name: "Pedicure & Foot Care",  icon: "foot",     desc: "Foot-care essentials for soft, smooth and pampered feet." },
      { id: "gels",       name: "Polish & Gels",         icon: "polish",   desc: "Salon-grade gel colours and builder systems for durable, glossy nails." },
      { id: "extensions", name: "Nail Extensions",       icon: "nail",     desc: "Everything you need to apply and finish nail extensions." },
      { id: "art",        name: "Nail Art",              icon: "brush",    desc: "Brushes and design supplies for detailed nail art." },
      { id: "machines",   name: "Machines & Equipment",  icon: "lamp",     desc: "Professional nail equipment for home and salon use." },
    ],
  },
  {
    id: "accessories", name: "Accessories", icon: "gem",
    blurb: "Jewellery, hair accessories, charms and keyholders.",
    c1: "#efe3cf", c2: "#d9bd8c",
    subs: [
      { id: "jewellery", name: "Jewellery",           icon: "gem", desc: "Affordable everyday jewellery in a range of designs and finishes." },
      { id: "hairacc",   name: "Hair Accessories",    icon: "bow", desc: "Pretty, practical hair accessories for every style." },
      { id: "charms",    name: "Charms & Keyholders", icon: "key", desc: "Fun charms and keyholders — perfect small gifts." },
    ],
  },
  {
    id: "body", name: "Body Care", icon: "shower",
    blurb: "Shower gels, body scrubs, sprays and mists.",
    c1: "#e2ebe3", c2: "#b5cdb9",
    subs: [
      { id: "shower", name: "Shower Gels",           icon: "shower", desc: "Rich, fragrant shower gels for a fresh, soft-skin feel." },
      { id: "scrub",  name: "Body Scrubs",           icon: "jar",    desc: "Exfoliating scrubs that buff away dull skin and reveal a natural glow." },
      { id: "mist",   name: "Body Sprays & Mists",   icon: "spray",  desc: "Long-lasting body sprays and mists to finish your look." },
    ],
  },
  {
    id: "makeup", name: "Makeup & Skin", icon: "lipstick",
    blurb: "Makeup, lip care, tools and skincare essentials.",
    c1: "#ece0ef", c2: "#c9add3",
    subs: [
      { id: "makeup",   name: "Makeup",                    icon: "lipstick", desc: "Everyday makeup essentials for eyes, lips and face." },
      { id: "lips",     name: "Lip Care",                  icon: "lipstick", desc: "Balms, oils and scrubs for soft, healthy lips." },
      { id: "tools",    name: "Tools & Accessories",       icon: "mirror",   desc: "Brushes, puffs, lashes and accessories for a flawless finish." },
      { id: "beautyacc",name: "Hair & Beauty Accessories", icon: "bow",      desc: "Clips, headbands and sleep caps to protect and style hair." },
      { id: "skin",     name: "Skincare & Hand Care",      icon: "tube",     desc: "Serums, creams and scrubbers for smooth, nourished skin." },
      { id: "other",    name: "Other Essentials",          icon: "sole",     desc: "Handy everyday beauty extras." },
    ],
  },
];

/* ---------- catalogue builders ---------- */
const PRODUCTS = [];

function slug(s) {
  return s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/**
 * Add a product.
 * prices: null (price on request) | number | number[] (several options)
 * labels: optional names for each price option
 */
function add(cat, sub, name, type, { prices = null, labels = null, optionName = "Option", icon, featured = false } = {}) {
  let options = [];
  let price = null;
  if (Array.isArray(prices) && prices.length > 1) {
    options = [{
      name: optionName,
      values: prices.map((p, i) => ({ label: labels?.[i] || `${STORE.currency} ${p.toLocaleString()}`, price: p })),
    }];
  } else if (Array.isArray(prices)) {
    price = prices[0];
  } else {
    price = prices;
  }
  PRODUCTS.push({
    id: slug(`${cat}-${sub}-${name}`),
    cat, sub, name, type, price, options, icon, featured,
  });
}

/** Hair products sold in Small / Medium / Large / Super Large (prices to be confirmed). */
function addHair(sub, name, type, types) {
  const options = [];
  if (types) options.push({ name: "Type", values: types.map((t) => ({ label: t, price: null })) });
  options.push({ name: "Size", values: HAIR_SIZES.map((s) => ({ label: s, price: null })) });
  PRODUCTS.push({ id: slug(`hair-${sub}-${name}`), cat: "hair", sub, name, type, price: null, options });
}

/* ---------- HAIR CARE ---------- */
["Mega Growth", "Mikalla", "Bamsi", "Be Black Essentials", "Beula", "Mielle", "TRESemmé", "Cantu", "Shea Butter"]
  .forEach((b) => addHair("wash", b, "Shampoo / Conditioner / Treatment", ["Shampoo", "Conditioner", "Treatment"]));

[["Olive Oil", "Hair Oil / Hair Growth"], ["Coconut Oil", "Hair Oil / Hair Growth"], ["Bamsi", "Hair Growth / Hair Oil"],
 ["Mega Growth", "Hair Growth / Hair Oil"], ["Castor Oil", "Hair Oil / Hair Growth"], ["Mikalla", "Hair Growth / Hair Oil"],
 ["Amla", "Hair Oil / Hair Growth"], ["TCB", "Hair Growth / Hair Care"]]
  .forEach(([b, t]) => addHair("growth", b, t));

["Mikalla", "Mega Growth", "Adora", "Radiant", "Olive Oil"].forEach((b) => addHair("treatment", b, "Hair Treatment"));
["Olive", "Radiant", "Kadri"].forEach((b) => addHair("spray", b, "Hair Spray"));
[["Nice & Lovely", "Hair Gel"], ["Softfree", "Hair Gel / Styling"], ["Be Black Essentials", "Hair Gel / Styling"],
 ["Bamsi", "Hair Gel / Styling"], ["Kadri", "Hair Gel / Styling"], ["Sedoso", "Hair Gel / Styling"], ["Stylistist", "Hair Gel / Styling"]]
  .forEach(([b, t]) => addHair("gel", b, t));

/* ---------- NAILS ---------- */
add("nails", "manicure", "Nail Cutter", "Manicure tool");
add("nails", "manicure", "Manicure Set", "Manicure tool kit", { prices: 150, featured: true });
add("nails", "manicure", "Cuticle Remover", "Cuticle care", { prices: 15 });
add("nails", "manicure", "Nail File", "Shaping tool", { prices: 50 });
add("nails", "manicure", "Nail Buffer", "Shine & smoothing", { prices: 60 });
add("nails", "manicure", "Nail Nipper", "Cuticle nipper", { prices: [200, 300], labels: ["Standard", "Professional"], optionName: "Grade" });
add("nails", "manicure", "Tweezers", "Precision tool", { prices: 30 });
add("nails", "manicure", "Nail Brush", "Cleaning & dusting brush", { prices: [35, 200], labels: ["Standard", "Professional"], optionName: "Grade" });
add("nails", "manicure", "Hand Gloves", "Protective gloves", { prices: 50 });

add("nails", "pedicure", "Foot Scrub", "Exfoliating scrub", { prices: 100 });
add("nails", "pedicure", "Foot Smoother", "Callus smoother", { prices: 200 });
add("nails", "pedicure", "Pumice Stone", "Foot care", { prices: 60 });
add("nails", "pedicure", "Stone & Brush Set", "Foot care set", { prices: 60 });
add("nails", "pedicure", "Foot Scrubber", "Foot care", { prices: 250 });
add("nails", "pedicure", "Toe Separators", "Pedicure accessory", { prices: 50 });
add("nails", "pedicure", "Bath Salts", "Foot soak", { prices: 3500 });

add("nails", "gels", "Roniki Gel Colours", "Gel polish", { prices: [250, 400], labels: ["Standard", "Premium"], optionName: "Grade", featured: true });
add("nails", "gels", "Hard Gel", "Gel system", { prices: 800 });
add("nails", "gels", "Builder Gel", "Gel system", { prices: [400, 1000], labels: ["Small", "Large"], optionName: "Size" });
add("nails", "gels", "Acrylic Gel", "Gel system", { prices: 1000 });

add("nails", "extensions", "Nail Glue", "Application", { prices: 150 });
add("nails", "extensions", "Stick-Ons / Press-On Nails", "Ready-to-wear nails", { prices: [350, 500, 700, 1000], optionName: "Design", featured: true });
add("nails", "extensions", "Nail Colour Samples", "Colour swatches", { prices: 15 });

add("nails", "art", "Nail Art Brushes", "Detail brushes", { prices: 250 });
add("nails", "art", "Nail Design Products", "Nail art supplies", { prices: [350, 400, 500], optionName: "Design" });

add("nails", "machines", "Nail Drill", "Electric file", { prices: [1200, 3500, 4500], labels: ["Basic", "Standard", "Professional"], optionName: "Model", featured: true });
add("nails", "machines", "UV Nail Lamp", "Gel curing lamp", { prices: [1200, 2500, 3000, 3500], labels: ["Basic", "Standard", "Advanced", "Professional"], optionName: "Model", featured: true });

/* ---------- ACCESSORIES ---------- */
add("accessories", "jewellery", "Earrings", "Jewellery", { prices: [20, 30, 50], optionName: "Design", featured: true });
add("accessories", "jewellery", "Rings", "Jewellery", { prices: [30, 40], optionName: "Design" });
add("accessories", "jewellery", "Necklaces", "Jewellery", { prices: [70, 80, 100, 120, 250, 500, 800, 1000], optionName: "Design", featured: true });
add("accessories", "jewellery", "Anklets", "Jewellery", { prices: [70, 100], optionName: "Design" });
add("accessories", "jewellery", "Bracelets", "Jewellery", { prices: [40, 70, 100, 150], optionName: "Design" });

add("accessories", "hairacc", "Hair Bands", "Hair accessory", { prices: [30, 40, 50], optionName: "Design" });
add("accessories", "hairacc", "Hair Clips", "Hair accessory", { prices: 80 });
add("accessories", "hairacc", "Headbands", "Hair accessory", { prices: [100, 150], optionName: "Design" });

add("accessories", "charms", "Beaded Charms", "Charm", { prices: 35 });
add("accessories", "charms", "Phone Charms", "Charm", { prices: 100, featured: true });
add("accessories", "charms", "Keyholders", "Keyholder", { prices: [100, 150], optionName: "Design" });

/* ---------- BODY CARE ---------- */
["Marsh Mellow", "Hobby", "Sedoso", "Pretty", "Dove", "Orchid", "EOS Shea Butter"]
  .forEach((b) => add("body", "shower", b, "Shower Gel"));
["Coffee Scrub", "Turmeric Scrub", "Dove", "Roushun", "Dr. Davey", "Sadoer", "Kojic", "Papaya", "Sedoso", "Invigorating Scrub"]
  .forEach((b) => add("body", "scrub", b, "Body Scrub"));
["Dear Body", "Esclair", "Lurion", "Fragrant Mist"].forEach((b) => add("body", "mist", b, "Body Spray / Mist"));

/* ---------- MAKEUP & SKIN ---------- */
add("makeup", "makeup", "Eye Pencil", "Eyes", { prices: [20, 30], optionName: "Option", icon: "pencil" });
add("makeup", "makeup", "Coloured Mascara", "Eyes", { prices: 100, icon: "pencil" });
add("makeup", "makeup", "Makeup Eyeliner", "Eyes", { prices: [100, 250, 300, 600], optionName: "Option", icon: "pencil" });
add("makeup", "makeup", "Foundation", "Face", { icon: "bottle" });
add("makeup", "makeup", "Contour", "Face", { icon: "brush" });

add("makeup", "lips", "Lip Balm", "Lip care", { prices: 80 });
add("makeup", "lips", "Lip Scrub", "Lip care", { prices: 150, icon: "jar" });
add("makeup", "lips", "Lip Oil", "Lip care", { prices: [70, 80, 100], optionName: "Option", featured: true, icon: "drop" });
add("makeup", "lips", "Lip Gloss", "Lips", { prices: [30, 50, 180], optionName: "Option", featured: true });

add("makeup", "tools", "Makeup Puff Set", "Makeup tool", { prices: 250 });
add("makeup", "tools", "Makeup Brushes", "Makeup tool", { prices: 180, icon: "brush", featured: true });
add("makeup", "tools", "Eyelashes", "Lashes", { prices: 100, icon: "lash" });
add("makeup", "tools", "Mirror", "Accessory", { prices: 150 });
add("makeup", "tools", "Wig Caps", "Accessory", { prices: 25, icon: "cap" });

add("makeup", "beautyacc", "Hair Clips", "Hair accessory", { prices: [30, 50, 100, 130], optionName: "Design" });
add("makeup", "beautyacc", "Moana Clips", "Hair accessory", { prices: 50 });
add("makeup", "beautyacc", "Headbands", "Hair accessory", { prices: [40, 80, 100], optionName: "Design" });
add("makeup", "beautyacc", "Sleep Caps", "Hair protection", { prices: [100, 150], optionName: "Design", icon: "cap" });

add("makeup", "skin", "Serum", "Skincare", { prices: 150, icon: "drop", featured: true });
add("makeup", "skin", "Hand Cream", "Hand care", { prices: [50, 80, 120, 230], optionName: "Size" });
add("makeup", "skin", "Scrubber", "Body tool", { prices: [250, 300], optionName: "Option" });

add("makeup", "other", "Cup Soles", "Shoe insoles", { prices: [100, 120], optionName: "Option" });
