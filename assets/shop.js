/* ============================================================
   LIGHTWEAR COLLECTIVE — Shop-Logik (Produkte + Warenkorb)
   Reine Frontend-Demo. Warenkorb wird im localStorage gemerkt.
   ============================================================ */

/* ---------- Produktdaten ----------
   Bilder liegen entweder lokal in /images oder kommen direkt vom
   Lightwear-CDN. CDN-Helper für kürzere URLs:                   */
const LW = "https://images.squarespace-cdn.com/content/v1/67bc73510e3f0138575b7519/";
const cdn = (p) => LW + p + "?format=1200w";

const PRODUCTS = [
  // ---------- Bestseller (lokal vorhanden) ----------
  {
    id: "jesus-polo",
    name: "JESUS — Contrast Stripes Polo",
    price: 20,
    meta: "Boxy Fit · 100% Bio-Baumwolle",
    category: "T-Shirts",
    img: "images/product-jesus.png",
    gallery: ["images/product-jesus.png", "images/life1.jpg"],
    desc: "Boxy geschnittenes Polo-Shirt mit Kontraststreifen am Kragen und dezentem „JESUS“-Print auf der Brust. Aus schwerer Bio-Baumwolle – fällt locker und modern."
  },
  {
    id: "i-see-god",
    name: "I SEE GOD — Boxy T-Shirt",
    price: 20,
    meta: "Oversized · 100% Baumwolle",
    category: "T-Shirts",
    img: "images/product-iseegod.png",
    gallery: ["images/product-iseegod.png", "images/life2.jpg"],
    desc: "Oversized T-Shirt mit „I SEE GOD EVERYWHERE“-Print (Psalm 139). Schwere 100%-Baumwoll-Qualität mit lässigem, modernem Schnitt."
  },
  {
    id: "faith-sweatpants",
    name: "FAITH — Plaid Barrel Sweatpants",
    price: 30,
    meta: "Relaxed Fit · French Terry",
    category: "Hosen",
    img: "images/product-faith.png",
    gallery: ["images/product-faith.png"],
    desc: "Weit geschnittene Barrel-Sweatpants aus weichem French Terry mit „Faith“-Stickerei. Bequem, warm und perfekt für jeden Tag."
  },

  // ---------- T-Shirts ----------
  {
    id: "the-answer",
    name: "THE ANSWER — Boxy Half-Sleeve Raw-Edge T-Shirt",
    price: 20, meta: "Boxy Fit · halbe Ärmel", category: "T-Shirts",
    img: cdn("1775252973193-90Z4W7K9B68LY3ETYS3W/squarespace-upload-temp-2026-04-03-c9715ebe-ab01-4835-9d96-d71f3fa0a719283418982501391617.png"),
    desc: "Boxy T-Shirt mit halben Ärmeln und Raw-Edge-Verarbeitung. „THE ANSWER“ – Jesus ist die Antwort."
  },
  {
    id: "faith-makes-new",
    name: "FAITH MAKES NEW — Boxy T-Shirt",
    price: 20, meta: "Boxy · 100% Baumwolle", category: "T-Shirts",
    img: cdn("1774992876840-QK5V10DDO210W9NBTAE4/squarespace-upload-temp-2026-03-31-cb1849e8-6593-4fe3-a425-12d2b240b53917873378094637021592.png"),
    desc: "Essential Boxy T-Shirt mit „FAITH MAKES NEW“-Print. Schwere Baumwolle, locker und modern."
  },
  {
    id: "christ-is-enough",
    name: "CHRIST IS ENOUGH — Oversized Boxy Shirt",
    price: 20, meta: "Vertikalstreifen · Oversized", category: "T-Shirts",
    img: cdn("1776009920142-AUS477V7O7IKESIMYPA9/squarespace-upload-temp-2026-04-12-dea97648-625a-4ebf-b55a-59596dd844e315814605920383706632.png"),
    gallery: [
      cdn("1776009920142-AUS477V7O7IKESIMYPA9/squarespace-upload-temp-2026-04-12-dea97648-625a-4ebf-b55a-59596dd844e315814605920383706632.png"),
      cdn("1774817299278-ORLDQ1VVR5FY28A52KE1/squarespace-upload-temp-2026-03-29-884e5aa6-37fd-4fc8-9959-3049ee3d541114235782926936327092.png")
    ],
    desc: "Oversized Boxy Shirt mit Vertikalstreifen und „CHRIST IS ENOUGH“-Print. Statement-Piece mit moderner Silhouette."
  },
  {
    id: "trust-in-god",
    name: "TRUST IN GOD — Vintage Bodycon T-Shirt",
    price: 20, meta: "Vintage Wash · Bodycon", category: "T-Shirts",
    img: cdn("1774964959423-N0QVK6P03ZT94KHRPMDN/squarespace-upload-temp-2026-03-31-25123032-c985-4a70-97c7-37e6336b29108244343049883286880.png"),
    desc: "Vintage-Washed Bodycon T-Shirt mit „TRUST IN GOD“-Print. Körpernaher, moderner Fit."
  },
  {
    id: "god-is-good",
    name: "GOD IS GOOD — Stripes Bodycon T-Shirt",
    price: 17, meta: "Raglan-Sleeves · Kontraststreifen", category: "T-Shirts",
    img: cdn("1774471099255-38V7NO8H30TFX2Z75SRO/squarespace-upload-temp-2026-03-25-c104d890-eada-42a2-8207-9ef06a92b5c96358135396545568911.png"),
    gallery: [
      cdn("1774471099255-38V7NO8H30TFX2Z75SRO/squarespace-upload-temp-2026-03-25-c104d890-eada-42a2-8207-9ef06a92b5c96358135396545568911.png"),
      cdn("1774471023997-0MIN2FGAYJ2C6Y9D0MPO/squarespace-upload-temp-2026-03-25-698667bf-25ac-46d3-bb58-94302d6b0a3c14114198928343300085.png")
    ],
    desc: "Bodycon T-Shirt mit Kontraststreifen und Raglanärmeln – „GOD IS GOOD“ als Statement."
  },
  {
    id: "sola-gratia-bodycon",
    name: "SOLA GRATIA — Stripes Bodycon T-Shirt",
    price: 17, meta: "Bodycon · Kontraststreifen", category: "T-Shirts",
    img: cdn("1759764842752-29H97P9YDEXY2APHAS0V/squarespace-upload-temp-2025-10-06-8974a460-f4b9-488a-8662-9bf5b5ef89597214390167716794704.png"),
    desc: "Bodycon T-Shirt mit Kontraststreifen und „SOLA GRATIA“-Print – allein durch Gnade."
  },
  {
    id: "sola-gratia-longsleeve",
    name: "SOLA GRATIA — Raglan Bodycon Longsleeve",
    price: 20, meta: "Raglan · Longsleeve · Bodycon", category: "T-Shirts",
    img: cdn("1e6d88ea-7e48-406d-8130-e1dbe60956af/Dyed+Washed+Raglan+Long+Sleeve+Slim+T-Shirt-mockups-5.png"),
    desc: "Raglan Longsleeve mit Bodycon-Schnitt – moderner Layering-Essential."
  },
  {
    id: "acts-16-3",
    name: "ACTS 16:3 — Layered Sleeve Cotton T-Shirt",
    price: 25, meta: "Layered Contrast Sleeves", category: "T-Shirts",
    img: cdn("1760028752326-FLZVD8V4JDV3XCOE4BCB/squarespace-upload-temp-2025-10-09-08361dc9-894d-462e-a426-d64f9c8cdb384905712833897092337.png"),
    desc: "Cotton T-Shirt mit Layered Contrast Sleeves – Apostelgeschichte 16:3."
  },
  {
    id: "he-is-love",
    name: "HE IS LOVE — Oversized Boxy Shirt",
    price: 19, meta: "Vertikalstreifen · Oversized", category: "T-Shirts",
    img: cdn("1763914565251-6X4E6RCVA6SDESTKLUGT/squarespace-upload-temp-2025-11-23-90443c02-6687-46a6-b5b9-f922619b309b587300443838884587.png"),
    desc: "Oversized Boxy Shirt mit Vertikalstreifen und „HE IS LOVE“-Print."
  },
  {
    id: "jesus-taped-mesh",
    name: "JESUS — Taped Mesh Boxy T-Shirt",
    price: 25, meta: "Mesh · Taped Details · Boxy", category: "T-Shirts",
    img: cdn("1752427668787-YSIOWFMPZ1806AB2P0TB/squarespace-upload-temp-2025-07-13-641b1430-c6d4-43c9-beba-c8085bad0246245540331183271969.png"),
    desc: "Boxy T-Shirt aus atmungsaktivem Mesh mit Taped-Details und „JESUS“-Print."
  },
  {
    id: "trust-god-loose",
    name: "TRUST GOD — Classic Loose Tee",
    price: 18, meta: "Loose · Boxy · Klassiker", category: "T-Shirts",
    img: cdn("1770645678234-8CJ67XAIYF2BB5SB06K5/squarespace-upload-temp-2026-02-09-93222a70-7757-4dfe-b0c2-f7e319bb7d2712213252396347675051.png"),
    desc: "Klassisches Loose Tee mit „TRUST GOD“-Print. Komfortabel und vielseitig."
  },
  {
    id: "heart-cross",
    name: "HEART + CROSS — Contrast-Stitched T-Shirt",
    price: 20, meta: "Kontrastnähte · Streetwear", category: "T-Shirts",
    img: cdn("1752427114010-YJMUKBHJIO7OH34XSAZI/squarespace-upload-temp-2025-07-13-f2b152a1-cf31-4b4e-aa4f-17a966c7cb152312301527673495513.png"),
    desc: "Streetwear T-Shirt aus Baumwolle mit Kontrastnähten und Herz-und-Kreuz-Print."
  },
  {
    id: "jesus-tank",
    name: "JESUS — Snow Washed Tank Top",
    price: 20, meta: "Snow Wash · Tank Top", category: "T-Shirts",
    img: cdn("1752427158509-IK9D7PPGZGT9MQIRRA2D/squarespace-upload-temp-2025-07-13-e63e4710-f4e8-43c9-bb46-af0706d706805205791005937728757.png"),
    desc: "Tank Top mit Snow-Wash-Finish und „JESUS“-Print – perfekt für den Sommer."
  },
  {
    id: "jesus-crop",
    name: "JESUS — Men's Bodycon Crop Top",
    price: 19, meta: "Bodycon · Ribbed · Crop", category: "T-Shirts",
    img: cdn("1752427399339-U7B9UKEF31OOX1GHN6PE/squarespace-upload-temp-2025-07-13-d89c9012-e2a3-42d2-a217-df9fae97ac485885738782735278666.png"),
    desc: "Ribbed Bodycon Crop Top für Herren – moderner Streetwear-Look mit „JESUS“-Statement."
  },

  // ---------- Hoodies & Sweatshirts ----------
  {
    id: "contrast-plaid-zip",
    name: "Contrast Plaid Boxy Zip Hoodie",
    price: 35, meta: "Boxy Fit · Full Zip · Plaid-Details", category: "Hoodies",
    img: cdn("1774721419504-VFJYK5BUWIHTUU1KVJ9Z/squarespace-upload-temp-2026-03-28-8fc48255-400c-4a86-bc69-2d9f258260b75539082371019239932.png"),
    desc: "Boxy Zip-Hoodie mit Kontrast-Plaid-Details. Schwerer Stoff, lockerer Schnitt."
  },
  {
    id: "eagle-wings",
    name: "EAGLE WINGS — Curved Hoodie",
    price: 35, meta: "Curved Panel · Raglan", category: "Hoodies",
    img: cdn("1769888328591-L8UZWAMTQ33QQAU66Y23/squarespace-upload-temp-2026-01-31-e9c42433-db36-48e0-8f93-cb5402754bf213162936527976907375.png"),
    desc: "Raglan Hoodie mit Curved Panel und „EAGLE WINGS“-Print (Jesaja 40:31)."
  },
  {
    id: "sola-gratia-sweat",
    name: "SOLA GRATIA — Contrast Striped Sweatshirt",
    price: 28, meta: "Lapel Collar · Streifen", category: "Hoodies",
    img: cdn("1759764378998-8W3TTB03JO4D7NNFTZ3I/squarespace-upload-temp-2025-10-06-36ff31ab-0d93-45fe-8a1c-05678f5e565c8385457923662319970.png"),
    desc: "Sweatshirt mit Lapel Collar und Kontraststreifen – „SOLA GRATIA“."
  },
  {
    id: "saved-by-grace",
    name: "SAVED BY GRACE — Fleece Zip Hoodie",
    price: 40, meta: "Fleece · Boxy · Full Zip", category: "Hoodies",
    img: cdn("1763735778593-HXVQR7F4LO508GZ50B44/squarespace-upload-temp-2025-11-21-dfffc4ce-61a6-47da-a798-fa2fbe12eb5c5258380563901702237.png"),
    desc: "Boxy Fleece Zip Hoodie mit Kontrastnähten und „SAVED BY GRACE“-Stickerei."
  },
  {
    id: "power-of-jesus",
    name: "POWER OF JESUS — Zip-Through Fleece Hoodie",
    price: 45, meta: "Zip-Through · Boxy · Fleece", category: "Hoodies",
    img: cdn("1759763823564-LTFL736IVUDY9POK7ML4/squarespace-upload-temp-2025-10-06-92adab80-8215-4dfc-9fc1-2d4602276f3e5420605450028457205.png"),
    desc: "Schwerer Zip-Through Fleece Hoodie mit „POWER OF JESUS“-Print."
  },

  // ---------- Jacken ----------
  {
    id: "be-the-reason",
    name: "BE THE REASON — Sun Fade Jacket",
    price: 45, meta: "Sun Fade · Detachable Fur Hood", category: "Jacken",
    img: cdn("1764877881264-M1K9GRQU9EZXNLE9E5XV/squarespace-upload-temp-2025-12-04-3e5d33e8-a9c6-41ec-bcd3-c8e998e097fd637590941505012949.png"),
    desc: "Boxy Sun-Fade Jacke mit abnehmbarer Fellkapuze. „BE THE REASON“ – Statement-Piece für drüber."
  }
];

const SIZES = ["S", "M", "L", "XL"];

/* Welche Produkte erscheinen als „Bestseller“ auf der Startseite?
   Bewusst nur eine handverlesene Auswahl – Vielfalt aus T-Shirts, Hoodies,
   einer Hose und der Jacke, damit das Sortiment auf einen Blick wirkt.   */
const BESTSELLER_IDS = [
  "jesus-polo",
  "i-see-god",
  "saved-by-grace",
  "be-the-reason",
  "faith-sweatpants",
  "eagle-wings"
];
const FREE_SHIP = 50;
const SHIP_COST = 4.9;

const getProduct = (id) => PRODUCTS.find(p => p.id === id);
const money = (n) => n.toFixed(2).replace(".", ",") + " €";

/* Auto-Daten von lightwear.net (Galerien + Specs) zusammenführen */
(function mergeData(){
  if (typeof window === "undefined" || !window.LW_DATA) return;
  PRODUCTS.forEach(p => {
    const d = window.LW_DATA[p.id];
    if (!d) return;
    if (d.gallery && d.gallery.length){
      p.gallery = d.gallery.slice();
      p.img = d.gallery[0];
      p.imgBack = d.gallery[1] || d.gallery[0];
    } else if (p.gallery && p.gallery.length > 1) {
      p.imgBack = p.gallery[1];
    } else {
      p.imgBack = p.img;
    }
    if (d.specs && d.specs.length){ p.specs = d.specs.slice(); }
  });
})();

/* ---------- Warenkorb-Speicher ---------- */
const CART_KEY = "lw_cart_v1";
let memCart = [];
function loadCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch(e){ return memCart; }
}
function saveCart(cart){
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
  catch(e){ memCart = cart; }
  updateCartCount();
}
function addToCart(id, size, qty){
  const cart = loadCart();
  const line = cart.find(l => l.id === id && l.size === size);
  if (line) line.qty += qty; else cart.push({ id, size, qty });
  saveCart(cart);
}
const cartCount = () => loadCart().reduce((n, l) => n + l.qty, 0);
const cartSubtotal = () => loadCart().reduce((s, l) => {
  const p = getProduct(l.id); return s + (p ? p.price * l.qty : 0);
}, 0);

function updateCartCount(){
  const n = cartCount();
  document.querySelectorAll(".cart-count").forEach(el => el.textContent = n);
}

/* ============================================================
   COST TRANSPARENCY (PDP)
   ============================================================ */
const COST_BREAKDOWN = [
  { id:"material", label:"Material", pct:32, icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16v10H4zM4 7l8 6 8-6"/></svg>',
    detail:"Bio-Baumwolle aus Portugal, GOTS-zertifiziert. Schwere 240–400 gsm. Keine Pestizide, faire Bauern." },
  { id:"production", label:"Produktion", pct:25, icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 21h18M5 21V10l7-5 7 5v11"/></svg>',
    detail:"Faire Manufaktur in der Türkei mit existenzsichernden Löhnen. Kleine Auflagen, sauberes Finish." },
  { id:"logistics", label:"Logistik", pct:8, icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 7h11v9H2zM13 10h5l3 3v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
    detail:"Klimaneutraler Versand mit DHL GoGreen, recycelbare Verpackung." },
  { id:"marketing", label:"Marketing", pct:12, icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12 9 9v6zM9 9V6m0 9v3M14 8v8a4 4 0 0 0 4-4 4 4 0 0 0-4-4Z"/></svg>',
    detail:"Foto-Shootings, Social Media, Content. Wir wachsen organisch durch unsere Community." },
  { id:"margin", label:"Marge", pct:18, icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    detail:"Damit wir weiter machen können — neue Drops, Kollabs, das Team. Ehrlich gerechnet." },
  { id:"tax", label:"MwSt.", pct:5, icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 17 17 7M8 8h.01M16 16h.01"/></svg>',
    detail:"Gesetzliche Umsatzsteuer (Standard in Deutschland)." }
];

function renderCostBreakdown(p){
  const total = p.price;
  const rows = COST_BREAKDOWN.map(c => {
    const amount = (total * c.pct / 100).toFixed(2).replace(".", ",") + " €";
    return `<div class="cost-row ${c.id}" data-cost="${c.id}" style="--w:${c.pct}%">
      <div class="cost-row-head">
        <div class="cost-row-icon">${c.icon}</div>
        <div class="cost-row-info">
          <div class="cost-row-label">${c.label}</div>
          <div class="cost-row-pct">${c.pct} % vom Gesamtpreis</div>
        </div>
        <div class="cost-row-amount">${amount}</div>
        <div class="cost-row-toggle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></div>
      </div>
      <div class="cost-row-bar"><div class="cost-row-bar-fill"></div></div>
      <div class="cost-row-detail">${c.detail}</div>
    </div>`;
  }).join("");
  return `<div class="cost-breakdown">
    <div class="cost-breakdown-head">
      <div>
        <h3>Was kostet was?</h3>
        <p>Klick auf eine Kategorie für die Geschichte dahinter.</p>
      </div>
      <div class="cost-breakdown-total">${money(total)}</div>
    </div>
    <div class="cost-rows">${rows}</div>
  </div>`;
}

function initCostBreakdownStandalone(){
  const host = document.getElementById("cost-breakdown-host");
  if (!host) return;
  if (host.querySelector(".cost-breakdown")) return;
  // Beispiel-Produkt mit 20 € Preis als Referenz
  const refProduct = { price: 20 };
  host.innerHTML = renderCostBreakdown(refProduct);
  // Headline überschreiben — passt besser für Standalone
  const head = host.querySelector(".cost-breakdown-head h3");
  const lead = host.querySelector(".cost-breakdown-head p");
  if (head) head.textContent = "So setzt sich ein 20-€-T-Shirt zusammen";
  if (lead) lead.textContent = "Klick auf eine Kategorie für die Geschichte dahinter.";

  const rows = host.querySelectorAll(".cost-row");
  rows.forEach(r => r.addEventListener("click", () => {
    rows.forEach(x => { if (x !== r) x.classList.remove("open"); });
    r.classList.toggle("open");
  }));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in-view"); });
  }, { threshold: 0.3 });
  rows.forEach(r => io.observe(r));
}

function initCostBreakdown(p){
  const root = document.getElementById("pdp");
  if (!root) return;
  // Nach den Specs einfügen (vor Buy-Row)
  const specsEl = root.querySelector(".specs");
  const anchor = specsEl || root.querySelector(".pdp-info");
  if (!anchor) return;
  if (root.querySelector(".cost-breakdown")) return;
  const wrap = document.createElement("div");
  wrap.innerHTML = renderCostBreakdown(p);
  // Bei specs: nach den Specs einfügen; sonst am Ende von pdp-info
  if (specsEl){ specsEl.after(wrap.firstElementChild); }
  else { anchor.appendChild(wrap.firstElementChild); }

  const rows = root.querySelectorAll(".cost-row");
  // Toggle-Logik
  rows.forEach(r => r.addEventListener("click", () => {
    rows.forEach(x => { if (x !== r) x.classList.remove("open"); });
    r.classList.toggle("open");
  }));
  // IntersectionObserver für Balken-Animation
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in-view"); });
  }, { threshold: 0.3 });
  rows.forEach(r => io.observe(r));
}

/* ============================================================
   ANIMIERTE STATS-COUNTER
   ============================================================ */
function initStatsCounter(){
  const items = document.querySelectorAll(".stat-num[data-target]");
  if (!items.length) return;
  const animateNumber = (el, to) => {
    const decimals = (to + "").split(".")[1]?.length || 0;
    const start = performance.now();
    const duration = 1800;
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    function step(now){
      const t = Math.min(1, (now - start) / duration);
      const val = to * easeOut(t);
      el.textContent = (el.dataset.prefix || "") + val.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (el.dataset.suffix || "");
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = (el.dataset.prefix || "") + to.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (el.dataset.suffix || "");
    }
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.animated){
        e.target.dataset.animated = "1";
        animateNumber(e.target, parseFloat(e.target.dataset.target));
      }
    });
  }, { threshold: 0.4 });
  items.forEach(i => io.observe(i));
}

/* ============================================================
   LETTER-REVEAL ANIMATION
   ============================================================ */
function initLetterReveal(){
  document.querySelectorAll(".lr-headline:not([data-processed])").forEach(el => {
    el.dataset.processed = "1";
    let charIndex = 0;
    // Hilfsfunktion: ein Stück Text → Wörter mit lr-word + lr-char Spans
    const wrapText = (text) => {
      // An Whitespace splitten, Leerzeichen als eigenes Token behalten
      const tokens = text.split(/(\s+)/);
      return tokens.map(t => {
        if (/^\s+$/.test(t)) return " ";
        const chars = [...t].map(c => {
          const span = `<span class="lr-char" style="transition-delay:${charIndex * 25}ms">${c}</span>`;
          charIndex++;
          return span;
        }).join("");
        return `<span class="lr-word">${chars}</span>`;
      }).join("");
    };
    // <em>-Tags erhalten
    const parts = el.innerHTML.split(/(<em>[^<]*<\/em>)/g);
    const processed = parts.map(part => {
      if (part.startsWith("<em>")){
        const inner = part.replace(/<\/?em>/g, "");
        return "<em>" + wrapText(inner) + "</em>";
      } else {
        return wrapText(part);
      }
    }).join("");
    el.innerHTML = processed;
  });
  // Reveal beim Sichtbarwerden
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in-view"); });
  }, { threshold: 0.2 });
  document.querySelectorAll(".lr-headline").forEach(el => io.observe(el));
}

/* ============================================================
   HERO-PARALLAX
   ============================================================ */
function initHeroParallax(){
  const heroMedia = document.querySelector(".hero-media");
  if (!heroMedia) return;
  document.body.classList.add("parallax-active");
  function update(){
    const rect = heroMedia.getBoundingClientRect();
    const winH = window.innerHeight;
    // Nur animieren wenn im Viewport
    if (rect.bottom < 0 || rect.top > winH) return;
    const scrollProgress = (winH - rect.top) / (winH + rect.height);
    const y = scrollProgress * 60 - 30; // -30 bis +30 px
    heroMedia.style.setProperty("--parallax-y", y + "px");
  }
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

/* ============================================================
   SMOOTH PAGE TRANSITIONS
   ============================================================ */
function initPageTransitions(){
  // Page-Transitions deaktiviert — Browser-Standard
}

/* ============================================================
   BRAND TIMELINE — Scroll-Animation
   ============================================================ */
function initBrandTimeline(){
  const timeline = document.querySelector(".timeline");
  if (!timeline) return;
  const items = timeline.querySelectorAll(".timeline-item");
  const fill = timeline.querySelector(".timeline-fill");

  // IntersectionObserver für Karten + Marker
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("in-view");
    });
  }, { threshold: 0.25, rootMargin: "0px 0px -10% 0px" });
  items.forEach(i => io.observe(i));

  // Fill-Höhe an Scroll-Position anpassen
  function updateFill(){
    if (!fill) return;
    const rect = timeline.getBoundingClientRect();
    const total = timeline.offsetHeight;
    const winH = window.innerHeight;
    // Wie weit ist die Mitte des Viewports innerhalb der Timeline?
    const scrollIntoTL = Math.max(0, (winH * 0.55) - rect.top);
    const pct = Math.min(100, (scrollIntoTL / total) * 100);
    fill.style.height = pct + "%";
  }
  updateFill();
  window.addEventListener("scroll", updateFill, { passive: true });
  window.addEventListener("resize", updateFill);
}

/* ---------- Aktiver Nav-Link markieren (auf body[data-page] basierend) ---------- */
function markActiveNav(){
  const page = document.body.dataset.page;
  const pageMap = {
    shop:"shop.html", drops:"drops.html", bundle:"bundle.html",
    geschenkkarte:"geschenkkarte.html", "find-your-fit":"find-your-fit.html",
    product:"shop.html", cart:"shop.html", konto:"shop.html",
    bestellung:"shop.html", about:"ueber-uns.html"
  };
  const target = pageMap[page];
  if (!target) return;
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute("href") === target) a.classList.add("active");
  });
}

/* ---------- Gemeinsame UI (Header) ---------- */
function initChrome(){
  markActiveNav();
  // Sticky-Header Blur beim Scrollen
  const header = document.querySelector(".site-header");
  if (header){
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive:true });
    onScroll();
  }
  // Mobiles Menü
  const toggle = document.querySelector(".nav-toggle");
  if (toggle){
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open);
    });
    document.querySelectorAll(".nav-links a").forEach(a =>
      a.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", false);
      })
    );
  }
  updateCartCount();
  // Footer-Newsletter: nach Anmeldung Popup nicht mehr triggern + Supabase-Submit
  document.querySelectorAll(".news-form, .footer .news-form, .news form").forEach(form => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const emailInput = form.querySelector("input[type='email']");
      const email = emailInput?.value?.trim() || "";
      if(!email.includes("@")) return;
      try { localStorage.setItem("lw_newsletter_subscribed_v1", "1"); } catch(e){}
      markNewsletterSeen();
      const btn = form.querySelector("button[type='submit']");
      const oldText = btn?.textContent || "";
      if(btn){ btn.disabled = true; btn.textContent = "Moment …"; }
      if(typeof window.lwSubscribeNewsletter === "function" && email){
        try {
          const r = await window.lwSubscribeNewsletter(email, "footer");
          if(btn){
            btn.textContent = r?.alreadySubscribed ? "✓ Bereits angemeldet" : "✓ Angemeldet";
            btn.disabled = false;
            setTimeout(() => { btn.textContent = oldText; }, 4000);
          }
          if(emailInput) emailInput.value = "";
        } catch(err){
          console.warn("Newsletter-Anmeldung Fehler:", err);
          if(btn){
            btn.textContent = "Fehler — nochmal";
            btn.disabled = false;
            setTimeout(() => { btn.textContent = oldText; }, 4000);
          }
        }
      }
    });
  });
}

/* ---------- Produktkarte ---------- */
function cardHTML(p){
  const back = p.imgBack && p.imgBack !== p.img
    ? `<img class="card-img-back" src="${p.imgBack}" alt="" loading="lazy">`
    : "";
  return `<article class="card">
    <a class="card-media" href="produkt.html?id=${p.id}">
      <img class="card-img-front" src="${p.img}" alt="${p.name}" loading="lazy">
      ${back}
    </a>
    <div class="card-body">
      <div class="pname"><a href="produkt.html?id=${p.id}">${p.name}</a></div>
      <div class="pmeta">${p.meta}</div>
      <span class="pprice">${money(p.price)}</span>
      <button class="btn btn-outline btn-block" data-add="${p.id}">In den Warenkorb</button>
    </div>
  </article>`;
}
/* Quick-Add-Größen global delegieren */
if (typeof window !== "undefined" && !window._quickAddBound){
  window._quickAddBound = true;
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-quick-size]");
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    if (btn.disabled) return;
    const pid = btn.dataset.quickPid;
    const size = btn.dataset.quickSize;
    const card = btn.closest(".card");
    const img = card?.querySelector(".card-img-front") || card?.querySelector(".card-media img");
    flyToCart(img);
    addToCart(pid, size, 1);
    btn.classList.add("added");
    const oldText = btn.textContent;
    btn.textContent = "✓";
    setTimeout(() => { btn.classList.remove("added"); btn.textContent = oldText; }, 1200);
    if (typeof openDrawer === "function") setTimeout(openDrawer, 850);
  });
}

function bindAddButtons(scope=document){
  scope.querySelectorAll("[data-add]").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      const img = card?.querySelector(".card-img-front") || card?.querySelector(".card-media img");
      flyToCart(img);
      addToCart(btn.dataset.add, "M", 1);
      const old = btn.textContent;
      btn.classList.add("added");
      btn.textContent = "Hinzugefügt";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = old;
        btn.classList.remove("added");
        btn.disabled = false;
      }, 1500);
      // Drawer öffnen nach Fly-Animation
      if (typeof openDrawer === "function") setTimeout(openDrawer, 850);
    });
  });
}

/* ---------- Fliegender Effekt (generisch: Bild → Ziel-Icon) ---------- */
function flyTo(sourceImg, targetEl, onArrive){
  if (!sourceImg || !sourceImg.src || !targetEl) { if (onArrive) onArrive(); return; }
  const src = sourceImg.getBoundingClientRect();
  const dst = targetEl.getBoundingClientRect();
  const ghost = document.createElement("img");
  ghost.src = sourceImg.src;
  ghost.className = "fly-ghost";
  ghost.style.left = src.left + "px";
  ghost.style.top  = src.top  + "px";
  ghost.style.width  = src.width  + "px";
  ghost.style.height = src.height + "px";
  document.body.appendChild(ghost);

  // im nächsten Frame Ziel setzen → Browser animiert die Differenz
  requestAnimationFrame(() => {
    ghost.classList.add("go");
    ghost.style.left = (dst.left + dst.width/2  - 16) + "px";
    ghost.style.top  = (dst.top  + dst.height/2 - 16) + "px";
    ghost.style.width  = "32px";
    ghost.style.height = "32px";
  });

  // sanftes „Saugen“ des Icons direkt vor dem Aufprall
  setTimeout(() => targetEl.classList.add("suck"), 600);
  setTimeout(() => targetEl.classList.remove("suck"), 1100);

  // Bei Ankunft: Ghost weg + Callback
  setTimeout(() => {
    ghost.remove();
    if (onArrive) onArrive();
  }, 770);
}

function flyToCart(sourceImg){
  const cart = document.querySelector('a.icon-btn[href="warenkorb.html"]')
            || document.querySelector('.cart-count')?.closest(".icon-btn");
  if (!cart) return triggerCartPulse();
  flyTo(sourceImg, cart, triggerCartPulse);
}


function triggerCartPulse(){
  document.querySelectorAll(".cart-count").forEach(badge => {
    badge.classList.remove("bump");
    void badge.offsetWidth; // reflow → Animation erneut auslösen
    badge.classList.add("bump");
  });
}

/* ---------- Shop the Look: Hotspots auf Lookbook ---------- */
const LOOKBOOK_HOTSPOTS = {
  "images/life1.jpg": [
    { x:50, y:55, productId:"jesus-polo" }
  ],
  "images/life2.jpg": [
    { x:52, y:50, productId:"i-see-god" }
  ],
  "images/life3.jpg": [
    { x:50, y:48, productId:"the-answer" }
  ],
  "images/life4.jpg": [
    { x:50, y:50, productId:"saved-by-grace" }
  ]
};

function initShopTheLook(){
  const tiles = document.querySelectorAll(".look-tile");
  if (!tiles.length) return;
  tiles.forEach(tile => {
    const img = tile.querySelector("img");
    if (!img) return;
    const src = img.getAttribute("src");
    const spots = LOOKBOOK_HOTSPOTS[src];
    if (!spots) return;
    // Verhindern, dass die Tile-Links den Klick abfangen → wir wandeln <a> zu <div>
    if (tile.tagName === "A"){
      const div = document.createElement("div");
      div.className = tile.className;
      while (tile.firstChild) div.appendChild(tile.firstChild);
      tile.replaceWith(div);
    }
  });
  // Erneut sammeln nach möglicher Ersetzung
  document.querySelectorAll(".look-tile").forEach(tile => {
    const img = tile.querySelector("img");
    if (!img) return;
    const src = img.getAttribute("src");
    const spots = LOOKBOOK_HOTSPOTS[src];
    if (!spots) return;
    spots.forEach((s, i) => {
      const p = getProduct(s.productId);
      if (!p) return;
      const btn = document.createElement("button");
      btn.className = "hotspot";
      btn.setAttribute("aria-label", "Shop " + p.name);
      btn.style.left = s.x + "%";
      btn.style.top = s.y + "%";
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
        <div class="hotspot-popup">
          <div class="hp-row">
            <a class="hp-img" href="produkt.html?id=${p.id}"><img src="${p.img}" alt=""></a>
            <div class="hp-info">
              <div class="hp-name">${p.name}</div>
              <div class="hp-price">${money(p.price)}</div>
            </div>
          </div>
          <div class="hp-actions">
            <a href="produkt.html?id=${p.id}">Ansehen</a>
            <button class="primary" data-hp-add="${p.id}">In den Warenkorb</button>
          </div>
        </div>`;
      tile.appendChild(btn);
    });
  });
  // Klick-Handler für Hotspots (Toggle)
  document.addEventListener("click", (e) => {
    const hp = e.target.closest(".hotspot");
    const popupClick = e.target.closest(".hotspot-popup");
    // Klick auf Popup: nichts tun (Action-Buttons handlen Events selbst)
    if (popupClick && !hp) return;
    if (hp){
      // Andere Hotspots schließen
      document.querySelectorAll(".hotspot.open").forEach(h => { if (h !== hp) h.classList.remove("open"); });
      // Toggle nur, wenn nicht auf einem Action-Button innerhalb klickt
      if (!e.target.closest(".hp-actions a, .hp-actions button")){
        hp.classList.toggle("open");
        e.stopPropagation();
      }
    } else {
      // Klick außerhalb → alle schließen
      document.querySelectorAll(".hotspot.open").forEach(h => h.classList.remove("open"));
    }
  });
  // Add-to-Cart aus Hotspot-Popup
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-hp-add]");
    if (!b) return;
    e.preventDefault();
    e.stopPropagation();
    addToCart(b.dataset.hpAdd, "M", 1);
    if (typeof openDrawer === "function") openDrawer();
    b.closest(".hotspot")?.classList.remove("open");
  });
}

/* ---------- Seite: Startseite ---------- */
function initHome(){
  const grid = document.getElementById("bestseller-grid");
  if (grid){
    const picks = BESTSELLER_IDS.map(getProduct).filter(Boolean);
    grid.innerHTML = picks.map(cardHTML).join("");
    bindAddButtons(grid);
  }
  // Shop the Look Hotspots auf Lookbook initialisieren
  initShopTheLook();
}

/* ---------- Seite: Shop ---------- */
function initShop(){
  const grid = document.getElementById("shop-grid");
  if (!grid) return;
  const tabs = document.querySelectorAll(".tab");
  const sortSel = document.getElementById("shop-sort");
  const priceSlider = document.getElementById("shop-price");
  const priceVal = document.getElementById("shop-price-val");
  const resultCount = document.getElementById("shop-count");

  const state = { cat: "Alle", sort: "default", maxPrice: 60 };

  function applyAndRender(){
    let list = state.cat === "Alle" ? PRODUCTS.slice() : PRODUCTS.filter(p => p.category === state.cat);
    list = list.filter(p => p.price <= state.maxPrice);
    if (state.sort === "price-asc")  list.sort((a,b) => a.price - b.price);
    if (state.sort === "price-desc") list.sort((a,b) => b.price - a.price);
    if (state.sort === "name")       list.sort((a,b) => a.name.localeCompare(b.name));
    if (resultCount) resultCount.textContent = list.length === 1 ? "1 Produkt" : `${list.length} Produkte`;
    grid.innerHTML = list.length
      ? list.map(cardHTML).join("")
      : `<div style="grid-column:1/-1; text-align:center; padding:60px 20px; color:var(--ink-soft);">Keine Produkte gefunden. Pass Filter/Preis an.</div>`;
    bindAddButtons(grid);
  }
  tabs.forEach(t => t.addEventListener("click", () => {
    tabs.forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    state.cat = t.dataset.cat;
    applyAndRender();
  }));
  if (sortSel) sortSel.addEventListener("change", () => { state.sort = sortSel.value; applyAndRender(); });
  if (priceSlider){
    priceSlider.addEventListener("input", () => {
      state.maxPrice = parseInt(priceSlider.value, 10);
      if (priceVal) priceVal.textContent = state.maxPrice === 60 ? "Alle" : `bis ${state.maxPrice} €`;
      applyAndRender();
    });
  }
  applyAndRender();
}

/* ---------- Seite: Produktdetail ---------- */
function initProduct(){
  const root = document.getElementById("pdp");
  if (!root) return;
  const id = new URLSearchParams(location.search).get("id");
  const p = getProduct(id);
  if (!p){ location.replace("shop.html"); return; }

  document.title = p.name + " — Lightwear Collective";
  trackView(p.id);
  let size = "M";
  let qty = 1;

  const gal = (p.gallery && p.gallery.length) ? p.gallery : [p.img];
  const thumbs = gal.map((src, i) =>
    `<button class="thumb ${i===0?"active":""}" data-img="${src}"><img src="${src}" alt=""></button>`
  ).join("");
  const specsHTML = (p.specs && p.specs.length)
    ? `<dl class="specs">${p.specs.map(s => `<div class="spec"><dt>${s.label}</dt><dd>${s.value}</dd></div>`).join("")}</dl>`
    : "";

  root.innerHTML = `
    <div class="wrap">
      <div class="breadcrumb"><a href="index.html">Start</a> / <a href="shop.html">Shop</a> / ${p.name}</div>
      <div class="pdp-grid">
        <div class="pdp-gallery">
          <div class="pdp-main"><img id="pdp-main-img" src="${gal[0]}" alt="${p.name}"></div>
          ${gal.length > 1 ? `<div class="pdp-thumbs">${thumbs}</div>` : ""}
        </div>
        <div class="pdp-info">
          <span class="eyebrow">${p.category}</span>
          <h1>${p.name}</h1>
          <div class="pdp-price">${money(p.price)}</div>
          <p class="desc">${p.desc || ""}</p>
          ${specsHTML}
          <div class="field-row-with-quiz">
            <span class="field-label">Größe</span>
            <button class="size-quiz-trigger" id="open-size-quiz">Welche Größe passt mir?</button>
          </div>
          <div class="size-row">
            ${SIZES.map(s => `<button class="size-btn ${s===size?"active":""}" data-size="${s}">${s}</button>`).join("")}
          </div>
          <div class="buy-row">
            <div class="qty">
              <button data-q="-1" aria-label="weniger">−</button>
              <span id="qty-val">1</span>
              <button data-q="1" aria-label="mehr">+</button>
            </div>
            <button class="btn btn-primary" id="pdp-add" style="flex:1">In den Warenkorb</button>
          </div>
          <p class="pdp-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2 7h11v9H2z"/><path d="M13 10h5l3 3v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
            Kostenloser Versand ab 50&nbsp;€ · 30 Tage Rückgabe
          </p>
          <button type="button" class="restock-trigger" id="open-restock" data-product-id="${p.id}" data-product-name="${p.name.replace(/&quot;/g,'\\"')}" style="display:inline-flex;align-items:center;gap:6px;background:none;border:1px dashed var(--ink);padding:7px 14px;border-radius:99px;font-family:inherit;font-size:.82rem;color:var(--ink);cursor:pointer;margin-top:14px">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="14" height="14"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>
            Bei Restock benachrichtigen
          </button>
        </div>
      </div>

      <div class="pdp-related">
        <div class="section-head"><div><span class="eyebrow">Passt dazu</span><h2>Das könnte dir auch gefallen</h2></div></div>
        <div class="product-grid" id="related-grid"></div>
      </div>

      <div class="pdp-reviews" id="pdp-reviews"></div>

      <section class="products recently" id="pdp-recently" style="display:none; padding-top:60px;">
        <div class="section-head"><div><span class="eyebrow">Aus deiner Session</span><h2>Zuletzt angesehen</h2></div></div>
        <div class="product-grid"></div>
      </section>
    </div>`;

  // Galerie-Thumbnails
  root.querySelectorAll(".thumb").forEach(t => t.addEventListener("click", () => {
    root.querySelectorAll(".thumb").forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    document.getElementById("pdp-main-img").src = t.dataset.img;
  }));
  // Größenwahl
  root.querySelectorAll(".size-btn").forEach(b => b.addEventListener("click", () => {
    root.querySelectorAll(".size-btn").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    size = b.dataset.size;
  }));
  // Menge
  const qtyVal = root.querySelector("#qty-val");
  root.querySelectorAll("[data-q]").forEach(b => b.addEventListener("click", () => {
    qty = Math.max(1, qty + parseInt(b.dataset.q, 10));
    qtyVal.textContent = qty;
  }));
  // In den Warenkorb
  const addBtn = root.querySelector("#pdp-add");
  addBtn.addEventListener("click", () => {
    flyToCart(document.getElementById("pdp-main-img"));
    addToCart(p.id, size, qty);
    const old = addBtn.textContent;
    addBtn.classList.add("added");
    addBtn.textContent = "Zum Warenkorb hinzugefügt";
    addBtn.disabled = true;
    setTimeout(() => {
      addBtn.textContent = old;
      addBtn.classList.remove("added");
      addBtn.disabled = false;
    }, 1700);
    if (typeof openDrawer === "function") setTimeout(openDrawer, 850);
  });
  // Related: bevorzugt gleiche Kategorie, max. 3
  const rel = root.querySelector("#related-grid");
  const sameCat = PRODUCTS.filter(x => x.id !== p.id && x.category === p.category);
  const others = PRODUCTS.filter(x => x.id !== p.id && x.category !== p.category);
  const related = sameCat.concat(others).slice(0, 3);
  rel.innerHTML = related.map(cardHTML).join("");
  bindAddButtons(rel);

  // Größen-Quiz
  root.querySelector("#open-size-quiz")?.addEventListener("click", () => openSizeQuiz(p.category));

  // Restock-Alert
  root.querySelector("#open-restock")?.addEventListener("click", (e) => {
    openRestockAlert(p.id, p.name, document.querySelector(".size-btn.active")?.dataset.size || "M");
  });

  // Light-Points-Hinweis nach dem Preis
  const earnPts = Math.floor(p.price * LP_RATE);
  const lpPriceEl = root.querySelector(".pdp-price");
  if (earnPts > 0 && lpPriceEl){
    const lp = document.createElement("div");
    lp.className = "lp-hint";
    lp.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.3 5.8 21l1.7-7L2 9.2l7.2-.6L12 2l2.8 6.6 7.2.6-5.5 4.8 1.7 7Z"/></svg>Du sammelst <strong>${earnPts} Light Points</strong> mit diesem Kauf`;
    lpPriceEl.after(lp);
  }

  // Compare-Trigger neben der Größen-Zeile einfügen
  const sizeQuizTrigger = root.querySelector("#open-size-quiz");
  if (sizeQuizTrigger){
    const cmpBtn = document.createElement("button");
    cmpBtn.type = "button";
    cmpBtn.className = "compare-trigger" + (isInCompare(p.id) ? " active" : "");
    cmpBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h7l-3 3M3 6l4 3M21 18h-7l3-3M21 18l-4-3"/></svg>
      <span>${isInCompare(p.id) ? "Aus Vergleich" : "Zum Vergleich"}</span>`;
    cmpBtn.style.marginLeft = "12px";
    cmpBtn.addEventListener("click", () => {
      toggleCompare(p.id);
      const active = isInCompare(p.id);
      cmpBtn.classList.toggle("active", active);
      cmpBtn.querySelector("span").textContent = active ? "Aus Vergleich" : "Zum Vergleich";
    });
    sizeQuizTrigger.after(cmpBtn);
  }

  // Recently Viewed (ohne das aktuelle Produkt)
  renderRecentlyViewed(root, p.id);
  const rvSec = root.querySelector("#pdp-recently");
  if (rvSec && rvSec.querySelectorAll(".card").length > 0) rvSec.style.display = "";
  else if (rvSec) rvSec.style.display = "none";

  // Sticky-Buy-Bar
  setTimeout(() => initStickyBuy(p), 200);

  // Live-Besucher-Zähler
  // Viewer-Counter deaktiviert — auf Wunsch entfernt
  // setTimeout(() => initViewerCounter(p), 150);

  // Bewertungen mit User-Submissions
  setTimeout(() => rerenderReviews(p.id), 50);

  // (Alte Reviews-Rendering bleibt als Fallback)
  const rev = getReviewsFor(p.id);
  const reviewsRoot = root.querySelector("#pdp-reviews");
  const fmtDate = (daysAgo) => {
    const d = new Date(); d.setDate(d.getDate() - daysAgo);
    return d.toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
  };
  reviewsRoot.innerHTML = `
    <div class="section-head"><div><span class="eyebrow">Was Kund:innen sagen</span><h2>Bewertungen</h2></div></div>
    <div class="review-summary">
      <div>
        <div class="review-score">${rev.avg.toFixed(1)}</div>
        <div class="review-score-row">
          <span class="review-stars">${starsSVG(Math.round(rev.avg), 5, 18)}</span>
          <span class="review-count">${rev.count} Bewertungen</span>
        </div>
      </div>
      <p style="color:var(--ink-soft); max-width:46ch; font-size:.95rem">
        Bewertungen kommen von verifizierten Käufer:innen. Vielen Dank für euer Vertrauen — wir lesen jede einzelne.
      </p>
    </div>
    <div class="review-list">
      ${rev.reviews.map(r => `
        <article class="review-item">
          <div class="review-stars-sm">${starsSVG(r.stars, 5, 14)}</div>
          <div class="review-head"><span class="review-name">${r.author}</span><span class="review-date">${fmtDate(r.daysAgo)}</span></div>
          <h4 style="font-weight:600; margin-bottom:6px">${r.title}</h4>
          <p class="review-text">${r.text}</p>
        </article>
      `).join("")}
    </div>`;
}

/* ---------- Seite: Warenkorb ---------- */
function initCart(){
  const root = document.getElementById("cart-root");
  if (!root) return;

  function shipBar(subtotal){
    const free = subtotal >= FREE_SHIP;
    const pct = Math.min(100, (subtotal / FREE_SHIP) * 100);
    const toFree = Math.max(0, FREE_SHIP - subtotal);
    return `<div class="ship-bar ${free ? "free" : ""}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2 7h11v9H2z"/><path d="M13 10h5l3 3v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
      <div class="ship-bar-text">
        ${free
          ? `<strong>🎉 Du hast kostenlosen Versand!</strong>`
          : `Noch <strong>${money(toFree)}</strong> bis zum kostenlosen Versand.`}
        <div class="ship-bar-track"><div class="ship-bar-fill" style="width:${pct}%"></div></div>
      </div>
    </div>`;
  }

  function render(skipShipAnim=false){
    const cart = loadCart();
    if (!cart.length){
      root.innerHTML = `
        <div class="empty-state">
          <div class="es-illu">
            <div class="es-ring"></div>
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round">
              <path d="M28 32l4 50h36l4-50z" fill="rgba(28,27,24,.04)"/>
              <path d="M28 32l4 50h36l4-50z"/>
              <path d="M38 32a12 12 0 0 1 24 0"/>
              <path d="M35 50 65 50M40 65 60 65" stroke-width="1.5" stroke-dasharray="2 3" opacity=".4"/>
            </svg>
          </div>
          <span class="es-eyebrow">Warenkorb</span>
          <h2>Hier ist <em>noch</em> nichts</h2>
          <p>Lass uns das ändern — entdecke die Kollektion und trag dein Licht weiter.</p>
          <div class="es-actions">
            <a href="shop.html" class="btn btn-primary">Zum Shop</a>
            <a href="find-your-fit.html" class="btn btn-outline">Style Finder</a>
          </div>
        </div>`;
      return;
    }
    const subtotal = cartSubtotal();
    const ship = subtotal >= FREE_SHIP ? 0 : SHIP_COST;

    const items = cart.map((l, i) => {
      const p = getProduct(l.id); if (!p) return "";
      return `<div class="cart-item" data-row="${i}">
        <a class="ci-media" href="produkt.html?id=${p.id}"><img src="${p.img}" alt="${p.name}"></a>
        <div class="ci-info">
          <div class="ci-name"><a href="produkt.html?id=${p.id}">${p.name}</a></div>
          <div class="ci-meta">Größe: <strong>${l.size}</strong> · Einzelpreis: ${money(p.price)}</div>
          <div class="ci-actions">
            <div class="qty">
              <button data-dec="${i}" aria-label="weniger">−</button>
              <span data-qty="${i}">${l.qty}</span>
              <button data-inc="${i}" aria-label="mehr">+</button>
            </div>
            <button class="ci-remove" data-remove="${i}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 6h14M9 6V4h6v2M7 6l1 14h8l1-14"/></svg>
              Entfernen
            </button>
          </div>
        </div>
        <div class="ci-right">
          <div class="ci-price" data-price="${i}">${money(p.price * l.qty)}</div>
        </div>
      </div>`;
    }).join("");

    const coupon = couponInfo();
    const discount = cartDiscount(subtotal);
    const total = subtotal - discount + ship;

    const couponBlock = coupon
      ? `<div class="coupon-applied">
          <span>✓ Code <strong>${coupon.code}</strong> angewendet ${coupon.isGift ? `(Gutschein ${money(coupon.amount)})` : `(${coupon.pct} %)`}</span>
          <button id="coupon-remove">Entfernen</button>
        </div>`
      : `<div class="coupon-row">
          <input type="text" id="coupon-input" placeholder="Gutschein- oder Geschenkkarten-Code" />
          <button id="coupon-apply">Einlösen</button>
        </div>
        <div class="coupon-status" id="coupon-status"></div>`;

    root.innerHTML = `
      <div class="cart-grid">
        <div>
          ${shipBar(subtotal)}
          <div class="cart-items">${items}</div>
        </div>
        <aside class="summary">
          <h3>Zusammenfassung</h3>
          <div class="summary-row"><span>Zwischensumme</span><span>${money(subtotal)}</span></div>
          ${coupon ? `<div class="summary-row discount"><span>${coupon.isGift ? "Geschenkkarte" : "Rabatt"} (${coupon.code})</span><span>− ${money(discount)}</span></div>` : ""}
          <div class="summary-row"><span>Versand</span><span>${ship === 0 ? "Kostenlos" : money(ship)}</span></div>
          ${couponBlock}
          ${(() => {
            const bal = getPoints();
            const redeemed = getRedeem();
            if (redeemed > 0){
              return `<div class="lp-redeem-box">
                <svg class="lp-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.3 5.8 21l1.7-7L2 9.2l7.2-.6L12 2l2.8 6.6 7.2.6-5.5 4.8 1.7 7Z"/></svg>
                <div class="info"><strong>${redeemed} Light Points</strong> eingelöst — spart ${money(pointsToEuro(redeemed))}.</div>
                <button class="btn" id="lp-cancel">Rückgängig</button>
              </div>`;
            }
            if (bal >= 100){
              const usable = Math.floor(bal / 100) * 100;
              return `<div class="lp-redeem-box">
                <svg class="lp-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.3 5.8 21l1.7-7L2 9.2l7.2-.6L12 2l2.8 6.6 7.2.6-5.5 4.8 1.7 7Z"/></svg>
                <div class="info">Du hast <strong>${bal} Light Points</strong>. Einlösen: ${usable} Punkte = ${money(pointsToEuro(usable))} Rabatt</div>
                <button class="btn" id="lp-redeem">Einlösen</button>
              </div>`;
            }
            return `<div style="font-size:.85rem; color:var(--ink-soft); margin-top:8px; display:flex; align-items:center; gap:.5em">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="color:#a8741f"><path d="M12 17.3 5.8 21l1.7-7L2 9.2l7.2-.6L12 2l2.8 6.6 7.2.6-5.5 4.8 1.7 7Z"/></svg>
              Du sammelst <strong style="color:var(--ink)">${Math.floor((subtotal - discount + ship) * LP_RATE)} Light Points</strong> mit dieser Bestellung
            </div>`;
          })()}
          <div class="summary-row total"><span>Gesamt</span><span>${money(total)}</span></div>
          <button class="btn btn-primary btn-block" id="checkout">Zur Kasse</button>
          <div class="demo-note" id="demo-note">Das ist eine Design-Demo – hier würde der echte Bezahlvorgang (z.&nbsp;B. über Stripe) starten.</div>
          <div class="pay-icons">PayPal · Klarna · Visa · Mastercard</div>
        </aside>
      </div>`;

    // Coupon-Logik
    const applyBtn = root.querySelector("#coupon-apply");
    if (applyBtn){
      applyBtn.addEventListener("click", () => {
        const input = root.querySelector("#coupon-input");
        const status = root.querySelector("#coupon-status");
        const code = (input.value || "").trim().toUpperCase();
        if (!code){ return; }
        if (isValidCoupon(code)){
          setCoupon(code);
          render(true);
        } else {
          status.className = "coupon-status err";
          status.textContent = "Ungültiger Code. Probier’s mit WILLKOMMEN10 oder einer Geschenkkarte ;)";
        }
      });
      root.querySelector("#coupon-input")?.addEventListener("keydown", (e) => {
        if (e.key === "Enter") applyBtn.click();
      });
    }
    const rmBtn = root.querySelector("#coupon-remove");
    if (rmBtn){ rmBtn.addEventListener("click", () => { setCoupon(""); render(true); }); }
    const lpBtn = root.querySelector("#lp-redeem");
    if (lpBtn){ lpBtn.addEventListener("click", () => {
      const usable = Math.floor(getPoints() / 100) * 100;
      setRedeem(usable);
      render(true);
    }); }
    const lpCancel = root.querySelector("#lp-cancel");
    if (lpCancel){ lpCancel.addEventListener("click", () => { setRedeem(0); render(true); }); }

    // Versandbalken: bei Wiederbefüllung animiert „nachfüllen“
    if (!skipShipAnim){
      const fill = root.querySelector(".ship-bar-fill");
      if (fill){ const w = fill.style.width; fill.style.width = "0%"; requestAnimationFrame(() => { fill.style.width = w; }); }
    }

    root.querySelectorAll("[data-inc]").forEach(b => b.addEventListener("click", () => changeQty(+b.dataset.inc, 1)));
    root.querySelectorAll("[data-dec]").forEach(b => b.addEventListener("click", () => changeQty(+b.dataset.dec, -1)));
    root.querySelectorAll("[data-remove]").forEach(b => b.addEventListener("click", () => removeLine(+b.dataset.remove)));
    root.querySelector("#checkout").addEventListener("click", () => {
      checkoutToOrder();
    });
  }

  function changeQty(i, delta){
    const cart = loadCart();
    if (!cart[i]) return;
    cart[i].qty += delta;
    if (cart[i].qty < 1) return removeLine(i);

    // Sanfte Animation: Mengenzahl + Preis ohne Komplett-Neurender
    const row = root.querySelector(`.cart-item[data-row="${i}"]`);
    const qtyEl = root.querySelector(`[data-qty="${i}"]`);
    const priceEl = root.querySelector(`[data-price="${i}"]`);
    const p = getProduct(cart[i].id);

    if (qtyEl && priceEl && p){
      qtyEl.textContent = cart[i].qty;
      qtyEl.classList.remove("bump"); void qtyEl.offsetWidth; qtyEl.classList.add("bump");
      priceEl.textContent = money(p.price * cart[i].qty);
      priceEl.classList.remove("bump"); void priceEl.offsetWidth; priceEl.classList.add("bump");
      row?.animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.012)" }, { transform: "scale(1)" }],
        { duration: 280, easing: "cubic-bezier(.22,.61,.36,1)" }
      );
    }
    saveCart(cart);
    updateSummary();
  }

  function updateSummary(){
    const subtotal = cartSubtotal();
    const ship = subtotal >= FREE_SHIP ? 0 : SHIP_COST;
    const free = subtotal >= FREE_SHIP;
    const discount = cartDiscount(subtotal);
    // Wenn Rabatt aktiv → komplett neurendern (Discount-Zeile + Coupon-Block)
    if (discount > 0){ return render(true); }
    const sub = root.querySelectorAll(".summary-row:not(.discount):not(.total)");
    if (sub[0]) sub[0].lastElementChild.textContent = money(subtotal);
    if (sub[1]) sub[1].lastElementChild.textContent = ship === 0 ? "Kostenlos" : money(ship);
    const totalRow = root.querySelector(".summary-row.total");
    if (totalRow){
      totalRow.lastElementChild.textContent = money(subtotal - discount + ship);
      totalRow.classList.remove("bump"); void totalRow.offsetWidth; totalRow.classList.add("bump");
    }
    // Versand-Fortschrittsbalken aktualisieren
    const bar = root.querySelector(".ship-bar");
    const fill = root.querySelector(".ship-bar-fill");
    const text = root.querySelector(".ship-bar-text");
    if (bar && fill && text){
      const pct = Math.min(100, (subtotal / FREE_SHIP) * 100);
      const toFree = Math.max(0, FREE_SHIP - subtotal);
      bar.classList.toggle("free", free);
      fill.style.width = pct + "%";
      text.innerHTML = (free
        ? `<strong>🎉 Du hast kostenlosen Versand!</strong>`
        : `Noch <strong>${money(toFree)}</strong> bis zum kostenlosen Versand.`)
        + `<div class="ship-bar-track"><div class="ship-bar-fill" style="width:${pct}%"></div></div>`;
    }
  }

  function removeLine(i){
    const row = root.querySelector(`.cart-item[data-row="${i}"]`);
    const finishRemove = () => {
      const cart = loadCart();
      cart.splice(i, 1);
      saveCart(cart);
      render(true);
    };
    if (row){
      row.classList.add("removing");
      setTimeout(finishRemove, 320);
    } else {
      finishRemove();
    }
  }

  render();
}

/* ---------- Seite: Kontakt ---------- */
function initContact(){
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById("cf-name")?.value || "",
      email: document.getElementById("cf-email")?.value || "",
      topic: document.getElementById("cf-topic")?.value || "Anfrage",
      message: document.getElementById("cf-msg")?.value || "",
      source: "kontakt-seite"
    };
    // localStorage als Backup
    try {
      const msgs = JSON.parse(localStorage.getItem("lw_messages_v1") || "[]");
      msgs.unshift({
        id: "MSG-" + Date.now(),
        ...payload,
        date: new Date().toISOString(),
        read: false,
        replied: false
      });
      localStorage.setItem("lw_messages_v1", JSON.stringify(msgs.slice(0, 200)));
    } catch(e){}
    // An Supabase senden
    if(typeof window.lwSendContactMessage === "function"){
      try { await window.lwSendContactMessage(payload); }
      catch(err){ console.warn("Kontakt-Sendung Fehler:", err); }
    }
    const success = document.getElementById("contact-success");
    if (success) success.classList.add("show");
    form.querySelectorAll("input, textarea").forEach(el => { if (el.id !== "cf-name") el.value = ""; });
    success?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

/* ============================================================
   NEUE FEATURES (Wishlist, QuickView, Drawer, Search, Reviews, Zoom)
   ============================================================ */

/* ---------- Sterne / Reviews (deterministisch pro Produkt) ---------- */
function hashStr(s){ let h=0; for(let i=0;i<s.length;i++){ h=(h<<5)-h+s.charCodeAt(i); h|=0; } return Math.abs(h); }
const REVIEW_AUTHORS = ["Lena M.","Tobi S.","Mara K.","Niklas B.","Sophie L.","Jakob H.","Hannah W.","Paul R.","Mia T.","David Z.","Emma F.","Felix K."];
const REVIEW_TEMPLATES = [
  ["Mega Qualität", "Der Stoff ist richtig schwer und fühlt sich premium an. Sitzt boxy, genau wie auf den Bildern. Volle Empfehlung."],
  ["Perfekt für den Alltag", "Trage es seit zwei Wochen fast täglich – Schnitt, Farbe und Print sind on point. Wird oft drauf angesprochen."],
  ["Statement-Piece", "Genau das, was ich gesucht habe. Die Botschaft ist klar, ohne aufdringlich zu sein. Stoff fällt schön."],
  ["Größe passt super", "Ich bin 1,80 m und trage normalerweise M – passt perfekt mit dem lockeren Boxy-Fit."],
  ["Lieblingsstück", "Eines meiner Lieblingsteile aktuell. Versand war fix und alles war sauber verpackt. Top!"],
  ["Cooler Look", "Echt sauber verarbeitet und der Druck sieht in echt noch besser aus als online. Daumen hoch."],
  ["Top Streetwear", "Schöner Vintage-Vibe, sitzt locker und ist mega bequem. Werde definitiv nochmal hier shoppen."],
  ["Bin überzeugt", "Hab schon mehrere Pieces – Lightwear liefert immer ab. Genau mein Style."]
];
function getReviewsFor(productId){
  const seed = hashStr(productId);
  const count = 3 + (seed % 4); // 3..6 Bewertungen
  const reviews = [];
  for(let i=0; i<count; i++){
    const s = hashStr(productId + ":" + i);
    const t = REVIEW_TEMPLATES[s % REVIEW_TEMPLATES.length];
    const stars = 4 + ((s >> 3) % 2); // 4 oder 5
    const daysAgo = 2 + ((s >> 7) % 60);
    reviews.push({
      author: REVIEW_AUTHORS[(s >> 11) % REVIEW_AUTHORS.length],
      title: t[0],
      text: t[1],
      stars,
      daysAgo
    });
  }
  const avgStars = reviews.reduce((a,r) => a + r.stars, 0) / reviews.length;
  return { reviews, count: reviews.length, avg: avgStars };
}
function starsSVG(filled, total=5, size=14){
  let out = "";
  for(let i=0;i<total;i++){
    const off = i >= filled ? " off" : "";
    out += `<svg class="${off.trim()}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.3 5.8 21l1.7-7L2 9.2l7.2-.6L12 2l2.8 6.6 7.2.6-5.5 4.8 1.7 7Z"/></svg>`;
  }
  return out;
}

/* ---------- cardHTML mit Sternen + Quick-Add-Größen ---------- */
function cardHTMLPlus(p){
  const back = p.imgBack && p.imgBack !== p.img
    ? `<img class="card-img-back" src="${p.imgBack}" alt="" loading="lazy">`
    : "";
  const rev = getReviewsFor(p.id);
  // Quick-Add-Größen für Hover
  const quickSizes = `<div class="card-quick-sizes" data-quick-card="${p.id}">
    ${SIZES.map(s => {
      const stock = (typeof getStock === "function") ? getStock(p.id, s) : 5;
      const disabled = stock === 0;
      return `<button class="card-quick-size" data-quick-size="${s}" data-quick-pid="${p.id}" ${disabled?"disabled":""} title="${disabled?"Ausverkauft":`Größe ${s} in den Warenkorb`}">${s}</button>`;
    }).join("")}
  </div>`;
  return `<article class="card">
    <a class="card-media" href="produkt.html?id=${p.id}">
      <img class="card-img-front" src="${p.img}" alt="${p.name}" loading="lazy">
      ${back}
      ${quickSizes}
    </a>
    <div class="card-body">
      <div class="pname"><a href="produkt.html?id=${p.id}">${p.name}</a></div>
      <div class="pmeta">${p.meta}</div>
      <div class="card-stars"><span class="stars">${starsSVG(Math.round(rev.avg), 5, 13)}</span> <span>${rev.avg.toFixed(1)} (${rev.count})</span></div>
      <span class="pprice">${money(p.price)}</span>
      <div class="card-extras"></div>
    </div>
  </article>`;
}
/* Originale cardHTML überbügeln */
window.cardHTML = cardHTMLPlus;
cardHTML = cardHTMLPlus;

/* ---------- Toast-Helfer ---------- */
function ensureToastStack(){
  let s = document.getElementById("lw-toasts");
  if (s) return s;
  s = document.createElement("div");
  s.id = "lw-toasts"; s.className = "toast-stack";
  document.body.appendChild(s);
  return s;
}
function toast(message, opts={}){
  const stack = ensureToastStack();
  const el = document.createElement("div");
  el.className = "toast" + (opts.kind ? " " + opts.kind : "");
  el.innerHTML = (opts.icon || "") + `<span>${message}</span>`;
  stack.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 350);
  }, opts.duration || 2200);
}


/* ---------- Quick-View-Modal ---------- */
function ensureModal(){
  let m = document.getElementById("lw-modal");
  if (m) return m;
  m = document.createElement("div");
  m.id = "lw-modal"; m.className = "modal-backdrop";
  m.innerHTML = `<div class="modal" role="dialog" aria-modal="true">
    <button class="modal-close" aria-label="Schließen"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 6 12 12M18 6 6 18"/></svg></button>
    <div id="modal-body"></div>
  </div>`;
  document.body.appendChild(m);
  m.addEventListener("click", (e) => { if (e.target === m) closeModal(); });
  m.querySelector(".modal-close").addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
  return m;
}
function closeModal(){ document.getElementById("lw-modal")?.classList.remove("open"); document.body.style.overflow = ""; }
function openQuickView(id){
  const p = getProduct(id); if (!p) return;
  const m = ensureModal();
  const rev = getReviewsFor(p.id);
  document.getElementById("modal-body").innerHTML = `
    <div class="quickview-grid">
      <div class="quickview-img"><img src="${p.img}" alt="${p.name}"></div>
      <div class="quickview-info">
        <span class="eyebrow">${p.category}</span>
        <h2>${p.name}</h2>
        <div class="qv-price">${money(p.price)}</div>
        <div class="card-stars" style="margin-bottom:14px"><span class="stars">${starsSVG(Math.round(rev.avg))}</span> <span>${rev.avg.toFixed(1)} (${rev.count} Bewertungen)</span></div>
        <p class="qv-desc">${p.meta}</p>
        <div class="field-label">Größe</div>
        <div class="size-row" id="qv-sizes">
          ${SIZES.map((s,i) => `<button class="size-btn ${i===1?"active":""}" data-size="${s}">${s}</button>`).join("")}
        </div>
        <button class="btn btn-primary btn-block" id="qv-add">In den Warenkorb</button>
        <a href="produkt.html?id=${p.id}" class="qv-detail-link">Vollständige Details ansehen →</a>
      </div>
    </div>`;
  let qvSize = "M";
  m.querySelectorAll("#qv-sizes .size-btn").forEach(b => b.addEventListener("click", () => {
    m.querySelectorAll("#qv-sizes .size-btn").forEach(x => x.classList.remove("active"));
    b.classList.add("active"); qvSize = b.dataset.size;
  }));
  m.querySelector("#qv-add").addEventListener("click", (e) => {
    flyToCart(m.querySelector(".quickview-img img"));
    addToCart(p.id, qvSize, 1);
    e.currentTarget.classList.add("added");
    e.currentTarget.textContent = "Hinzugefügt";
    setTimeout(() => { closeModal(); openDrawer(); }, 850);
  });
  m.classList.add("open");
  document.body.style.overflow = "hidden";
}

/* ---------- Mini-Cart-Drawer ---------- */
function ensureDrawer(){
  let d = document.getElementById("lw-drawer");
  if (d) return d;
  const bd = document.createElement("div");
  bd.id = "lw-drawer-bd"; bd.className = "drawer-backdrop";
  document.body.appendChild(bd);
  d = document.createElement("aside");
  d.id = "lw-drawer"; d.className = "drawer";
  d.innerHTML = `
    <div class="drawer-head">
      <h3>Warenkorb (<span class="cart-count">0</span>)</h3>
      <button class="drawer-close" aria-label="Schließen"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 6 12 12M18 6 6 18"/></svg></button>
    </div>
    <div class="drawer-body" id="drawer-body"></div>
    <div class="drawer-foot" id="drawer-foot" style="display:none">
      <div class="drawer-totals"><span>Zwischensumme</span><span id="drawer-sub">0,00 €</span></div>
      <div class="drawer-totals total"><span>Gesamt</span><span id="drawer-total">0,00 €</span></div>
      <div class="ship-mini" id="drawer-ship"></div>
      <div class="actions">
        <a href="warenkorb.html" class="btn btn-primary">Zur Kasse</a>
        <button class="btn btn-outline drawer-close">Weiter shoppen</button>
      </div>
    </div>`;
  document.body.appendChild(d);
  bd.addEventListener("click", closeDrawer);
  d.querySelectorAll(".drawer-close").forEach(b => b.addEventListener("click", closeDrawer));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });
  return d;
}
function renderDrawer(){
  const d = ensureDrawer();
  const body = d.querySelector("#drawer-body");
  const foot = d.querySelector("#drawer-foot");
  const cart = loadCart();
  if (!cart.length){
    body.innerHTML = `<div class="drawer-empty">
      <div class="es-illu">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round">
          <path d="M28 32l4 50h36l4-50z" fill="rgba(28,27,24,.04)"/>
          <path d="M28 32l4 50h36l4-50z"/>
          <path d="M38 32a12 12 0 0 1 24 0"/>
        </svg>
      </div>
      <h4>Noch <em>leer</em></h4>
      <p>Entdecke die Kollektion und trag dein Licht weiter.</p>
      <a href="shop.html" class="btn btn-primary">Zum Shop</a>
    </div>`;
    foot.style.display = "none";
    return;
  }
  body.innerHTML = cart.map((l, i) => {
    const p = getProduct(l.id); if (!p) return "";
    return `<div class="drawer-item" data-drow="${i}">
      <div class="di-media"><img src="${p.img}" alt=""></div>
      <div>
        <div class="di-name">${p.name}</div>
        <div class="di-meta">Größe: ${l.size}</div>
        <div class="di-actions">
          <div class="di-qty">
            <button data-ddec="${i}" aria-label="weniger">−</button>
            <span>${l.qty}</span>
            <button data-dinc="${i}" aria-label="mehr">+</button>
          </div>
          <button class="di-rm" data-drm="${i}">Entfernen</button>
        </div>
      </div>
      <div class="di-price">${money(p.price * l.qty)}</div>
    </div>`;
  }).join("");
  const subtotal = cartSubtotal();
  const ship = subtotal >= FREE_SHIP ? 0 : SHIP_COST;
  const discount = cartDiscount(subtotal);
  const toFree = Math.max(0, FREE_SHIP - subtotal);
  d.querySelector("#drawer-sub").textContent = money(subtotal);
  d.querySelector("#drawer-total").textContent = money(subtotal - discount + ship);
  // Discount-Hinweis in Drawer einfügen, falls aktiv
  const c = couponInfo();
  let dEx = d.querySelector(".drawer-coupon-line");
  if (c){
    if (!dEx){
      dEx = document.createElement("div");
      dEx.className = "drawer-totals discount drawer-coupon-line";
      dEx.style.color = "#2c5b3b";
      d.querySelector(".drawer-totals").after(dEx);
    }
    dEx.innerHTML = `<span>Rabatt (${c.code})</span><span>− ${money(discount)}</span>`;
  } else if (dEx){ dEx.remove(); }
  d.querySelector("#drawer-ship").innerHTML = toFree > 0
    ? `Noch <strong>${money(toFree)}</strong> bis zum kostenlosen Versand`
    : `🎉 Kostenloser Versand inklusive`;
  foot.style.display = "block";
  body.querySelectorAll("[data-dinc]").forEach(b => b.addEventListener("click", () => drawerChange(+b.dataset.dinc, 1)));
  body.querySelectorAll("[data-ddec]").forEach(b => b.addEventListener("click", () => drawerChange(+b.dataset.ddec, -1)));
  body.querySelectorAll("[data-drm]").forEach(b => b.addEventListener("click", () => drawerRemove(+b.dataset.drm)));
}
function drawerChange(i, delta){
  const cart = loadCart(); if (!cart[i]) return;
  cart[i].qty += delta;
  if (cart[i].qty < 1) return drawerRemove(i);
  saveCart(cart); renderDrawer();
}
function drawerRemove(i){
  const row = document.querySelector(`.drawer-item[data-drow="${i}"]`);
  const finish = () => { const c = loadCart(); c.splice(i,1); saveCart(c); renderDrawer(); };
  if (row){ row.classList.add("removing"); setTimeout(finish, 320); } else finish();
}
function openDrawer(){
  renderDrawer();
  document.getElementById("lw-drawer").classList.add("open");
  document.getElementById("lw-drawer-bd").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeDrawer(){
  document.getElementById("lw-drawer")?.classList.remove("open");
  document.getElementById("lw-drawer-bd")?.classList.remove("open");
  document.body.style.overflow = "";
}

/* Warenkorb-Icon im Header öffnet Drawer (anstatt zur Warenkorb-Seite zu navigieren) */
function wireCartIcons(){
  document.querySelectorAll('a.icon-btn[href="warenkorb.html"]').forEach(a => {
    a.addEventListener("click", (e) => {
      // Auf der Warenkorb-Seite selbst: normales Verhalten (Reload)
      if (document.body.dataset.page === "cart") return;
      e.preventDefault();
      openDrawer();
    });
  });
}

/* Drawer nach Add-to-Cart automatisch öffnen (nach Fly-Animation) */
function showDrawerAfterAdd(){ setTimeout(openDrawer, 850); }

/* ---------- Suche-Overlay ---------- */
function ensureSearch(){
  let s = document.getElementById("lw-search");
  if (s) return s;
  s = document.createElement("div");
  s.id = "lw-search"; s.className = "search-overlay";
  s.innerHTML = `
    <div class="search-head">
      <div class="search-input-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        <input type="search" class="search-input" id="search-input" placeholder="Suche nach Produkten…" />
      </div>
      <button class="search-close">Schließen</button>
    </div>
    <div class="search-results" id="search-results"></div>`;
  document.body.appendChild(s);
  s.querySelector(".search-close").addEventListener("click", closeSearch);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSearch(); });
  const input = s.querySelector("#search-input");
  input.addEventListener("input", () => renderSearch(input.value));
  return s;
}
function renderSearch(q){
  const out = document.getElementById("search-results");
  q = (q || "").trim().toLowerCase();
  if (!q){
    out.innerHTML = `<div class="search-results-wrap">
      <div class="search-meta">Vorschläge</div>
      <div class="search-suggestions">
        <button class="search-suggestion" data-sg="jesus">JESUS</button>
        <button class="search-suggestion" data-sg="hoodie">Hoodies</button>
        <button class="search-suggestion" data-sg="sweatpants">Sweatpants</button>
        <button class="search-suggestion" data-sg="faith">Faith</button>
        <button class="search-suggestion" data-sg="grace">Grace</button>
      </div>
    </div>`;
    out.querySelectorAll(".search-suggestion").forEach(b => b.addEventListener("click", () => {
      const i = document.getElementById("search-input"); i.value = b.dataset.sg; renderSearch(b.dataset.sg);
    }));
    return;
  }
  const matches = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    (p.meta || "").toLowerCase().includes(q)
  );
  if (!matches.length){
    out.innerHTML = `<div class="search-no-results">
      <div class="empty-state">
        <div class="es-illu">
          <div class="es-ring"></div>
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round">
            <circle cx="44" cy="44" r="22" fill="rgba(28,27,24,.04)"/>
            <circle cx="44" cy="44" r="22"/>
            <path d="m60 60 18 18"/>
            <path d="M38 44h12M44 38v12" stroke-width="1.8" opacity=".5"/>
          </svg>
        </div>
        <span class="es-eyebrow">Keine Treffer</span>
        <h2>Hier <em>verbirgt</em> sich nichts</h2>
        <p>Wir konnten zu „${q}" nichts finden. Probier einen anderen Begriff oder stöbere:</p>
        <div class="es-chips">
          <button class="es-chip search-suggestion" data-sg="jesus">JESUS</button>
          <button class="es-chip search-suggestion" data-sg="hoodie">Hoodies</button>
          <button class="es-chip search-suggestion" data-sg="faith">Faith</button>
          <button class="es-chip search-suggestion" data-sg="grace">Grace</button>
        </div>
      </div>
    </div>`;
    out.querySelectorAll(".search-suggestion").forEach(b => b.addEventListener("click", () => {
      const i = document.getElementById("search-input"); i.value = b.dataset.sg; renderSearch(b.dataset.sg);
    }));
    return;
  }
  out.innerHTML = `<div class="search-results-wrap">
    <div class="search-meta">${matches.length} Treffer für „${q}"</div>
    <div class="search-grid">
      ${matches.map(p => `<a class="search-result" href="produkt.html?id=${p.id}">
        <div class="sr-media"><img src="${p.img}" alt=""></div>
        <div class="sr-name">${p.name}</div>
        <div class="sr-price">${money(p.price)}</div>
      </a>`).join("")}
    </div>
  </div>`;
}
function openSearch(){
  const s = ensureSearch(); s.classList.add("open");
  document.body.style.overflow = "hidden";
  renderSearch("");
  setTimeout(() => document.getElementById("search-input")?.focus(), 100);
}
function closeSearch(){
  document.getElementById("lw-search")?.classList.remove("open");
  document.body.style.overflow = "";
}
function wireSearchIcons(){
  document.querySelectorAll('.icon-btn[aria-label="Suche"]').forEach(b => {
    b.addEventListener("click", (e) => { e.preventDefault(); openSearch(); });
  });
}

/* ============================================================
   PHASE 2 - Rabattcode, Newsletter-Popup, Recently Viewed,
              Filter+Sort, Größen-Quiz
   ============================================================ */

/* ---------- Rabattcodes ---------- */
const COUPONS = {
  "WILLKOMMEN10": { pct: 10, label: "10% Willkommensrabatt" },
  "BLESSED15":    { pct: 15, label: "15% Blessed-Code" },
  "LIGHT20":      { pct: 20, label: "20% Light-Drop" }
};
const COUPON_KEY = "lw_coupon_v1";
const GIFT_CARDS_KEY = "lw_giftcards_v1"; // Dictionary {code: {amount, used}}

function getCoupon(){ try { return localStorage.getItem(COUPON_KEY) || ""; } catch(e){ return ""; } }
function setCoupon(code){ try { if (code) localStorage.setItem(COUPON_KEY, code); else localStorage.removeItem(COUPON_KEY); } catch(e){} }
function loadGiftCards(){ try { return JSON.parse(localStorage.getItem(GIFT_CARDS_KEY) || "{}"); } catch(e){ return {}; } }
function saveGiftCards(cards){ try { localStorage.setItem(GIFT_CARDS_KEY, JSON.stringify(cards)); } catch(e){} }
function addGiftCard(code, amount){
  const cards = loadGiftCards();
  cards[code] = { amount, used: 0 };
  saveGiftCards(cards);
}
function getGiftCard(code){
  return loadGiftCards()[code] || null;
}
function isValidCoupon(code){
  return COUPONS[code] || getGiftCard(code);
}
function couponInfo(){
  const code = getCoupon();
  if (!code) return null;
  if (COUPONS[code]) return { code, ...COUPONS[code] };
  const gc = getGiftCard(code);
  if (gc){
    return { code, amount: gc.amount, label: `Gutschein ${money(gc.amount)}`, isGift: true };
  }
  return null;
}
function cartDiscount(subtotal){
  const c = couponInfo();
  if (!c) return 0;
  if (c.pct) return subtotal * (c.pct / 100);
  if (c.amount) return Math.min(c.amount, subtotal); // Gutschein deckt max. Zwischensumme
  return 0;
}

/* ---------- Recently Viewed ---------- */
const RV_KEY = "lw_rv_v1";
function loadRV(){ try { return JSON.parse(localStorage.getItem(RV_KEY)) || []; } catch(e){ return []; } }
function trackView(id){
  let rv = loadRV().filter(x => x !== id);
  rv.unshift(id);
  rv = rv.slice(0, 8);
  try { localStorage.setItem(RV_KEY, JSON.stringify(rv)); } catch(e){}
}
function renderRecentlyViewed(scope=document, excludeId=null){
  const containers = scope.querySelectorAll(".recently");
  containers.forEach(c => {
    const ids = loadRV().filter(id => id !== excludeId);
    const items = ids.map(getProduct).filter(Boolean).slice(0, 4);
    const grid = c.querySelector(".product-grid");
    if (!grid) return;
    if (!items.length){ c.style.display = "none"; return; }
    c.style.display = "";
    grid.innerHTML = items.map(cardHTML).join("");
    bindAddButtons(grid);
  });
}

/* ---------- Newsletter-Popup ---------- */
const NL_SEEN_KEY = "lw_nl_seen_v1"; // sessionStorage – pro Tab
function shouldShowNewsletter(){
  try {
    if (sessionStorage.getItem(NL_SEEN_KEY)) return false;
    // Nicht zeigen wenn Kunde bereits ein Konto hat (= angemeldet/registriert)
    if (localStorage.getItem("lw_account_v1")) return false;
    // Nicht zeigen wenn Kunde sich schon im Footer-Newsletter eingetragen hat
    if (localStorage.getItem("lw_newsletter_subscribed_v1")) return false;
    return true;
  } catch(e){ return false; }
}
function markNewsletterSeen(){ try { sessionStorage.setItem(NL_SEEN_KEY, "1"); } catch(e){} }
function isModalOpen(){
  // Irgendein Modal/Quiz/Vergleich/Quick-View offen → kein Popup
  return !!document.querySelector(
    ".lw-modal.open, .sa-modal-bg, .ar-modal-bg, .quick-view-modal.open, " +
    ".compare-bar.open, .compare-modal, .size-quiz-overlay.open, " +
    "#lw-modal.open, [data-modal-open='true']"
  );
}
function showNewsletterPopup(){
  if (!shouldShowNewsletter()) return;
  // Auf Checkout/Warenkorb-Seite nicht stören
  if (document.body.dataset.page === "cart") return;
  // Kein Popup während offenem Quiz/Vergleich/Modal — stattdessen später nochmal versuchen
  if (isModalOpen()){
    setTimeout(showNewsletterPopup, 8000);
    return;
  }
  let bd = document.getElementById("lw-nl");
  if (bd) return;
  bd = document.createElement("div");
  bd.id = "lw-nl"; bd.className = "nl-popup-bd";
  bd.innerHTML = `
    <div class="nl-popup">
      <button class="close" aria-label="Schließen"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 6 12 12M18 6 6 18"/></svg></button>
      <div id="nl-content">
        <p class="verse">John 8:12</p>
        <h2>10 % auf deine <em>erste</em> Bestellung</h2>
        <p>Trag dich für unseren Newsletter ein und erhalte sofort deinen Code. Plus: neue Drops zuerst.</p>
        <form class="nl-form" id="nl-form" onsubmit="return false">
          <input type="email" placeholder="Deine E-Mail-Adresse" aria-label="E-Mail" required>
          <button class="btn btn-primary" type="submit">Anmelden &amp; Code erhalten</button>
        </form>
        <small>Jederzeit abbestellbar. Es gilt unsere Datenschutzerklärung.</small>
      </div>
    </div>`;
  document.body.appendChild(bd);
  const close = () => { bd.classList.remove("open"); document.body.style.overflow = ""; markNewsletterSeen(); setTimeout(() => bd.remove(), 350); };
  bd.querySelector(".close").addEventListener("click", close);
  bd.addEventListener("click", (e) => { if (e.target === bd) close(); });
  bd.querySelector("#nl-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailInput = bd.querySelector("input[type='email']");
    const email = emailInput?.value?.trim() || "";
    try { localStorage.setItem("lw_newsletter_subscribed_v1", "1"); } catch(err){}
    // Echte Anmeldung an Supabase
    if(typeof window.lwSubscribeNewsletter === "function" && email){
      try { await window.lwSubscribeNewsletter(email, "popup"); }
      catch(err){ console.warn("Newsletter-Anmeldung Fehler:", err); }
    }
    const content = bd.querySelector("#nl-content");
    content.innerHTML = `<div class="nl-success">
      <h2>Danke! 🎉</h2>
      <p>Hier ist dein Code:</p>
      <div class="nl-code" id="nl-code" title="Klick zum Kopieren">WILLKOMMEN10</div>
      <p class="nl-copy-hint">Klick auf den Code zum Kopieren — gilt für deinen ersten Einkauf.</p>
      <button class="btn btn-outline" id="nl-close-btn">Weiter shoppen</button>
    </div>`;
    content.querySelector("#nl-code").addEventListener("click", () => {
      navigator.clipboard?.writeText("WILLKOMMEN10");
      content.querySelector(".nl-copy-hint").textContent = "✓ In die Zwischenablage kopiert";
    });
    content.querySelector("#nl-close-btn").addEventListener("click", close);
  });
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => bd.classList.add("open"));
}

/* ---------- Größen-Empfehlung ---------- */
const SIZE_QUIZ_QS = [
  { key: "height", q: "Wie groß bist du?", opts: [
    { label: "Unter 1,70 m", v: "s" },
    { label: "1,70 – 1,80 m", v: "m" },
    { label: "1,80 – 1,90 m", v: "l" },
    { label: "Über 1,90 m", v: "xl" }
  ]},
  { key: "usual", q: "Welche Größe trägst du normalerweise?", opts: [
    { label: "XS / S", v: "s" },
    { label: "M", v: "m" },
    { label: "L", v: "l" },
    { label: "XL / XXL", v: "xl" }
  ]},
  { key: "fit", q: "Wie soll es sitzen?", opts: [
    { label: "Eher körpernah", v: -1 },
    { label: "Normal / Regular", v: 0 },
    { label: "Locker / Oversized", v: 1 }
  ]}
];
function openSizeQuiz(productCategory){
  const m = ensureModal();
  let step = 0;
  const answers = {};
  function render(){
    if (step >= SIZE_QUIZ_QS.length){
      // Empfehlung berechnen
      const baseOrder = ["s","m","l","xl"];
      const h = baseOrder.indexOf(answers.height || "m");
      const u = baseOrder.indexOf(answers.usual || "m");
      let idx = Math.round((h + u) / 2) + (answers.fit || 0);
      idx = Math.max(0, Math.min(3, idx));
      const size = baseOrder[idx].toUpperCase();

      document.getElementById("modal-body").innerHTML = `
        <div style="padding:clamp(28px,4vw,48px);">
          <div class="size-quiz-result">
            <p style="color:var(--ink-soft); font-size:.95rem">Wir empfehlen für dich</p>
            <div class="size-badge">${size}</div>
            <h3>Größe ${size} sollte gut passen</h3>
            <p>Unsere Stücke fallen meist boxy/oversized — wenn du es enger magst, probier eine Nummer kleiner.</p>
            <button class="btn btn-primary" id="quiz-close">Verstanden</button>
          </div>
        </div>`;
      document.getElementById("quiz-close").addEventListener("click", closeModal);
      // Auf der PDP gleich die Größe vorauswählen
      const sizeBtn = document.querySelector(`.pdp-info .size-btn[data-size="${size}"]`);
      if (sizeBtn){ document.querySelectorAll(".pdp-info .size-btn").forEach(b => b.classList.remove("active")); sizeBtn.classList.add("active"); }
      return;
    }
    const Q = SIZE_QUIZ_QS[step];
    const progress = SIZE_QUIZ_QS.map((_,i) => `<span class="${i<=step?"done":""}"></span>`).join("");
    document.getElementById("modal-body").innerHTML = `
      <div style="padding:clamp(28px,4vw,48px);">
        <div class="size-quiz-step">
          <div class="size-quiz-progress">${progress}</div>
          <h3 class="size-quiz-question">${Q.q}</h3>
          <div class="size-quiz-options">
            ${Q.opts.map((o,i) => `<button class="size-quiz-option" data-i="${i}">${o.label}</button>`).join("")}
          </div>
          <p style="font-size:.82rem; color:var(--ink-soft); text-align:center">Frage ${step+1} von ${SIZE_QUIZ_QS.length}</p>
        </div>
      </div>`;
    document.querySelectorAll(".size-quiz-option").forEach(b => b.addEventListener("click", () => {
      const opt = Q.opts[parseInt(b.dataset.i, 10)];
      answers[Q.key] = opt.v;
      step++;
      render();
    }));
  }
  render();
  m.classList.add("open");
  document.body.style.overflow = "hidden";
}

/* ============================================================
   PHASE 3 - Sale + Stock + Bundle + Order + Account + Drops
   ============================================================ */

/* ---------- Sale: welche Produkte sind reduziert? ---------- */
const SALE_DATA = {
  "jesus-tank":          { pct: 20 },
  "god-is-good":         { pct: 15 },
  "trust-god-loose":     { pct: 25 },
  "contrast-plaid-zip":  { pct: 10 },
  "sola-gratia-bodycon": { pct: 20 }
};
const NEW_BADGES = ["the-answer", "faith-makes-new", "christ-is-enough"];

/* Kürzere, coolere Produktnamen (Streetwear-Stil) */
const RENAMES = {
  "jesus-polo":            "JESUS Polo · Striped",
  "i-see-god":             "I SEE GOD Tee",
  "faith-sweatpants":      "FAITH Barrel Pants",
  "the-answer":            "THE ANSWER Tee · Raw Edge",
  "faith-makes-new":       "FAITH MAKES NEW Tee",
  "christ-is-enough":      "CHRIST IS ENOUGH Shirt",
  "trust-in-god":          "TRUST IN GOD Tee · Vintage",
  "contrast-plaid-zip":    "PLAID Zip Hoodie",
  "god-is-good":           "GOD IS GOOD Tee · Striped",
  "be-the-reason":         "BE THE REASON Jacket",
  "sola-gratia-bodycon":   "SOLA GRATIA Stripe Tee",
  "eagle-wings":           "EAGLE WINGS Hoodie",
  "sola-gratia-sweat":     "SOLA GRATIA Sweater",
  "sola-gratia-longsleeve":"SOLA GRATIA Longsleeve",
  "acts-16-3":             "ACTS 16:3 Layered Tee",
  "he-is-love":            "HE IS LOVE Shirt",
  "jesus-taped-mesh":      "JESUS Mesh Tee",
  "trust-god-loose":       "TRUST GOD Loose Tee",
  "heart-cross":           "HEART + CROSS Tee",
  "jesus-tank":            "JESUS Tank · Snow Washed",
  "saved-by-grace":        "SAVED BY GRACE Hoodie",
  "jesus-crop":            "JESUS Crop Tee",
  "power-of-jesus":        "POWER OF JESUS Hoodie"
};

(function applySaleAndBadges(){
  PRODUCTS.forEach(p => {
    if (RENAMES[p.id]) p.name = RENAMES[p.id];
    const sale = SALE_DATA[p.id];
    if (sale){
      p.originalPrice = p.price;
      p.salePct = sale.pct;
      p.price = Math.round(p.originalPrice * (1 - sale.pct / 100) * 100) / 100;
      p.badge = `−${sale.pct}%`;
      p.badgeClass = "sale";
    } else if (NEW_BADGES.includes(p.id)){
      p.badge = "Neu";
      p.badgeClass = "new";
    }
  });
})();

/* ---------- Stock pro Produkt+Größe (deterministisch) ---------- */
function getStock(productId, size){
  const seed = hashStr(productId + ":" + size);
  // 8% → sold out, 12% → low (1-3), Rest → 6-15
  const roll = seed % 100;
  if (roll < 8) return 0;
  if (roll < 20) return 1 + (seed % 3);
  return 6 + (seed % 10);
}

/* ---------- Flash-Sale-Timer ---------- */
// Welche Produkte haben einen befristeten Sale? (Uhrzeit, zu der der Sale endet)
const FLASH_SALES = {
  "trust-god-loose":     { hour: 23, min: 59 }, // bis Mitternacht
  "jesus-tank":          { hour: 21, min:  0 }, // bis 21:00
  "sola-gratia-bodycon": { hour: 19, min: 30 }  // bis 19:30
};

function getFlashEndDate(productId){
  const cfg = FLASH_SALES[productId];
  if (!cfg) return null;
  const d = new Date();
  d.setHours(cfg.hour, cfg.min, 0, 0);
  if (d <= new Date()) d.setDate(d.getDate() + 1); // wenn vorbei, morgen
  return d;
}
function getFlashRemaining(productId){
  const end = getFlashEndDate(productId);
  if (!end) return null;
  const diff = end - new Date();
  if (diff <= 0) return { expired: true };
  const total = Math.floor(diff / 1000);
  return {
    h: Math.floor(total / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
    total: diff
  };
}
function formatFlashFull(rem){
  return `${String(rem.h).padStart(2,"0")}<span class="sep">:</span>${String(rem.m).padStart(2,"0")}<span class="sep">:</span>${String(rem.s).padStart(2,"0")}`;
}
function formatFlashShort(rem){
  if (rem.h > 0) return `${rem.h}h ${String(rem.m).padStart(2,"0")}m`;
  if (rem.m > 0) return `${rem.m}m ${String(rem.s).padStart(2,"0")}s`;
  return `${rem.s}s`;
}

/* ---------- Stock-Berechnung pro Produkt ---------- */
const STOCK_MAX_PER_SIZE = 15;
function getTotalStock(productId){
  let total = 0;
  SIZES.forEach(s => total += getStock(productId, s));
  return total;
}
function stockPercent(productId){
  const max = SIZES.length * STOCK_MAX_PER_SIZE;
  return Math.max(1, Math.round((getTotalStock(productId) / max) * 100));
}
function isStockLow(productId){
  return stockPercent(productId) <= 35;
}

/* ---------- Card-Renderer mit Badge + Sale-Preis + Stock-Leiste ---------- */
const _cardHTMLBase = cardHTMLPlus;
function cardHTMLWithSale(p){
  let html = _cardHTMLBase(p);
  const lowStock = isStockLow(p.id);

  // Badge bestimmen (Sale > Neu > Limited)
  let badgeHTML = "";
  if (p.badge){
    badgeHTML = `<span class="card-badge ${p.badgeClass}">${p.badge}</span>`;
  } else if (lowStock){
    badgeHTML = `<span class="card-badge limited">Limited</span>`;
  }
  if (badgeHTML){
    html = html.replace(
      /(<a class="card-media"[^>]*>)/,
      `$1${badgeHTML}`
    );
  }

  // Extras-Block (Stock-Hinweis + Flash-Sale-Hinweis) ins .card-extras
  let extras = "";
  if (lowStock){
    const pct = stockPercent(p.id);
    html = html.replace(
      /(<a class="card-media"[^>]*>[\s\S]*?)(<\/a>)/,
      `$1<div class="stock-bar-on-card"><div class="fill" style="width:${pct}%"></div></div>$2`
    );
    extras += `<div class="card-stock-hint">Nur noch ${pct}% verfügbar</div>`;
  }

  // Preis ersetzen: bei Sale durchgestrichener Originalpreis daneben
  if (p.originalPrice){
    html = html.replace(
      `<span class="pprice">${money(p.price)}</span>`,
      `<span class="pprice-row"><span class="pprice sale">${money(p.price)}</span><span class="pprice-old">${money(p.originalPrice)}</span></span>`
    );
  }
  // Flash-Sale-Hinweis (klein) im Extras-Block
  const flashRem = getFlashRemaining(p.id);
  if (flashRem && !flashRem.expired){
    extras += `<div class="card-flash-line" data-flash="${p.id}"><span class="pulse-dot"></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M8 3l3-1M16 3l-3-1"/></svg>Endet in ${formatFlashShort(flashRem)}</div>`;
  }

  if (extras){
    html = html.replace('<div class="card-extras"></div>', `<div class="card-extras">${extras}</div>`);
  }
  return html;
}
window.cardHTML = cardHTMLWithSale;
cardHTML = cardHTMLWithSale;

/* ---------- Sale-Tab im Shop ---------- */
// Wir hängen den "Sale"-Tab dynamisch in die Tabs ein, falls noch nicht vorhanden
function ensureSaleTab(){
  const tabs = document.querySelector(".tabs");
  if (!tabs || tabs.querySelector('[data-cat="Sale"]')) return;
  const b = document.createElement("button");
  b.className = "tab"; b.dataset.cat = "Sale";
  b.innerHTML = `Sale <span style="background:#c43;color:#fff;font-size:.65rem;padding:1px 6px;border-radius:99px;margin-left:4px;vertical-align:middle">${Object.keys(SALE_DATA).length}</span>`;
  tabs.appendChild(b);
}

/* ---------- Shop-Filter erweitern: Sale-Kategorie ---------- */
const _initShopOrig = initShop;
initShop = function(){
  ensureSaleTab();
  const grid = document.getElementById("shop-grid");
  if (!grid) return;
  const tabs = document.querySelectorAll(".tab");
  const sortSel = document.getElementById("shop-sort");
  const priceSlider = document.getElementById("shop-price");
  const priceVal = document.getElementById("shop-price-val");
  const resultCount = document.getElementById("shop-count");
  const state = { cat: "Alle", sort: "default", maxPrice: 60 };

  function applyAndRender(){
    let list;
    if (state.cat === "Sale") list = PRODUCTS.filter(p => p.salePct);
    else if (state.cat === "Alle") list = PRODUCTS.slice();
    else list = PRODUCTS.filter(p => p.category === state.cat);
    list = list.filter(p => p.price <= state.maxPrice);
    if (state.sort === "price-asc")  list.sort((a,b) => a.price - b.price);
    if (state.sort === "price-desc") list.sort((a,b) => b.price - a.price);
    if (state.sort === "name")       list.sort((a,b) => a.name.localeCompare(b.name));
    if (resultCount) resultCount.textContent = list.length === 1 ? "1 Produkt" : `${list.length} Produkte`;
    grid.innerHTML = list.length
      ? list.map(cardHTML).join("")
      : `<div style="grid-column:1/-1; text-align:center; padding:60px 20px; color:var(--ink-soft);">Keine Produkte gefunden. Pass Filter/Preis an.</div>`;
    bindAddButtons(grid);
  }
  tabs.forEach(t => t.addEventListener("click", () => {
    tabs.forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    state.cat = t.dataset.cat;
    applyAndRender();
  }));
  if (sortSel) sortSel.addEventListener("change", () => { state.sort = sortSel.value; applyAndRender(); });
  if (priceSlider){
    priceSlider.addEventListener("input", () => {
      state.maxPrice = parseInt(priceSlider.value, 10);
      if (priceVal) priceVal.textContent = state.maxPrice === 60 ? "Alle" : `bis ${state.maxPrice} €`;
      applyAndRender();
    });
  }
  applyAndRender();
};

/* ---------- PDP: Stock-Hinweise + Sale-Preis ---------- */
const _initProductOrig = initProduct;
initProduct = function(){
  _initProductOrig();
  const id = new URLSearchParams(location.search).get("id");
  const p = getProduct(id); if (!p) return;
  const root = document.getElementById("pdp"); if (!root) return;

  // Preis ggf. mit Sale-Layout
  const priceEl = root.querySelector(".pdp-price");
  if (priceEl && p.originalPrice){
    priceEl.classList.add("sale");
    priceEl.innerHTML = `${money(p.price)} <span class="old">${money(p.originalPrice)}</span><span class="pdp-save-badge">−${p.salePct}%</span>`;
  }

  // Flash-Sale-Banner unter dem Preis (live tickend)
  const flashRem = getFlashRemaining(p.id);
  if (flashRem){
    const ft = document.createElement("div");
    ft.className = "flash-timer";
    ft.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M8 3l3-1M16 3l-3-1"/></svg>
      <div class="ft-text">
        <div class="ft-label">Sonderangebot endet in</div>
        <div class="ft-time" id="ft-time">${flashRem.expired ? "abgelaufen" : formatFlashFull(flashRem)}</div>
      </div>`;
    priceEl?.after(ft);
    // Jede Sekunde aktualisieren
    const tick = setInterval(() => {
      const rem = getFlashRemaining(p.id);
      const timeEl = document.getElementById("ft-time");
      if (!rem || rem.expired){
        ft.classList.add("expired");
        if (timeEl) timeEl.textContent = "abgelaufen";
        clearInterval(tick);
        return;
      }
      if (timeEl) timeEl.innerHTML = formatFlashFull(rem);
    }, 1000);
  }

  // Größen markieren + Stock-Hinweis einfügen
  let chosenSize = "M";
  const sizeRow = root.querySelector(".size-row");
  if (!sizeRow) return;
  const sizeBtns = sizeRow.querySelectorAll(".size-btn");
  sizeBtns.forEach(b => {
    const stock = getStock(p.id, b.dataset.size);
    const label = b.dataset.size;
    if (stock === 0){
      b.classList.add("sold-out");
      b.disabled = true;
      b.setAttribute("title", "Ausverkauft");
      b.innerHTML = `${label}<span class="stock-tag">Sold</span>`;
    } else if (stock <= 3){
      b.classList.add("low");
      b.setAttribute("title", `Nur noch ${stock} verfügbar`);
      b.innerHTML = `${label}<span class="stock-tag">Nur ${stock}</span>`;
    }
  });
  // Initial: erste verfügbare Größe wählen
  const firstAvail = Array.from(sizeBtns).find(b => !b.disabled);
  if (firstAvail){
    sizeBtns.forEach(x => x.classList.remove("active"));
    firstAvail.classList.add("active");
    chosenSize = firstAvail.dataset.size;
  }
  // Stock-Hinweis unter der Größenauswahl
  const hint = document.createElement("div");
  hint.className = "stock-hint";
  hint.id = "pdp-stock-hint";
  sizeRow.insertAdjacentElement("afterend", hint);
  function updateHint(){
    const active = sizeRow.querySelector(".size-btn.active");
    if (!active){ hint.style.display = "none"; return; }
    const stock = getStock(p.id, active.dataset.size);
    if (stock === 0){
      hint.classList.add("sold-out"); hint.textContent = "Diese Größe ist leider ausverkauft";
      hint.style.display = "";
    } else if (stock <= 3){
      hint.classList.remove("sold-out"); hint.textContent = `Nur noch ${stock} verfügbar in Größe ${active.dataset.size}`;
      hint.style.display = "";
    } else {
      hint.style.display = "none";
    }
  }
  updateHint();
  sizeBtns.forEach(b => b.addEventListener("click", () => setTimeout(updateHint, 30)));
};

/* ---------- Bestellbestätigung ---------- */
const ORDER_KEY = "lw_last_order_v1";
function checkoutToOrder(){
  const cart = loadCart();
  if (!cart.length) return;
  const subtotal = cartSubtotal();
  const ship = subtotal >= FREE_SHIP ? 0 : SHIP_COST;
  const discount = cartDiscount(subtotal);
  const total = subtotal - discount + ship;
  const coupon = couponInfo();
  // Bestellnummer (deterministisch aus Cart + Date Zufall, hier statisch generiert)
  const seed = hashStr(JSON.stringify(cart) + (Date.now ? "1" : "1"));
  const orderNum = "LW-2026-" + String(100000 + (seed % 899999)).padStart(6, "0");
  // Lieferdatum: 3 Werktage
  const eta = new Date();
  let added = 0;
  while (added < 3){
    eta.setDate(eta.getDate() + 1);
    if (eta.getDay() !== 0 && eta.getDay() !== 6) added++;
  }
  const order = {
    orderNum,
    created: new Date().toISOString(),
    eta: eta.toISOString(),
    items: cart.slice(), subtotal, ship, discount, total,
    coupon: coupon ? coupon.code : null
  };
  try { localStorage.setItem(ORDER_KEY, JSON.stringify(order)); } catch(e){}
  // Kundenkonto: Bestellung speichern
  saveOrderToAccount(order);

  // Echte Supabase-Bestellung anlegen
  if(typeof window.lwCreateOrder === "function"){
    (async () => {
      try {
        // Customer-Daten holen (Auth oder Konto)
        let customer = { name: "Gast", email: "" };
        try {
          if(typeof window.lwGetCurrentUser === "function"){
            const u = await window.lwGetCurrentUser();
            if(u){ customer = { name: u.user_metadata?.name || u.email.split("@")[0], email: u.email }; }
          }
        } catch(e){}
        if(!customer.email){
          try {
            const acc = JSON.parse(localStorage.getItem("lw_account_v1") || "null");
            if(acc) customer = { name: acc.name || acc.firstName || "Konto-Kunde", email: acc.email||"" };
          } catch(e){}
        }
        // Items mit Produkt-Name/Preis anreichern
        const items = cart.map(l => {
          const p = getProduct(l.id) || {};
          return {
            id: l.id,
            name: p.name || l.id,
            price: p.price || 0,
            qty: l.qty,
            size: l.size,
            category: p.category
          };
        });
        await window.lwCreateOrder({
          orderNum,
          customer,
          items,
          subtotal,
          shipping: ship,
          discount,
          total,
          coupon: order.coupon
        });
        console.log("✓ Bestellung in Supabase gespeichert:", orderNum);
      } catch(err){ console.warn("Supabase-Order Fehler:", err); }
    })();
  }

  // Cart und Coupon leeren
  saveCart([]); setCoupon("");
  location.href = "bestellung.html";
}

/* ---------- Account / Login (Demo) ---------- */
const ACC_KEY = "lw_account_v1";
const ACC_ORDERS_KEY = "lw_acc_orders_v1";
function getAccount(){ try { return JSON.parse(localStorage.getItem(ACC_KEY) || "null"); } catch(e){ return null; } }
function setAccount(a){ try { if (a) localStorage.setItem(ACC_KEY, JSON.stringify(a)); else localStorage.removeItem(ACC_KEY); } catch(e){} }
function getAccountOrders(){ try { return JSON.parse(localStorage.getItem(ACC_ORDERS_KEY) || "[]"); } catch(e){ return []; } }
function saveOrderToAccount(order){
  const acc = getAccount();
  if (!acc) return;
  const arr = getAccountOrders();
  arr.unshift({ ...order, status: "shipped" });
  try { localStorage.setItem(ACC_ORDERS_KEY, JSON.stringify(arr.slice(0, 20))); } catch(e){}
}

function initBestellung(){
  const root = document.getElementById("order-root");
  if (!root) return;
  const order = (() => { try { return JSON.parse(localStorage.getItem(ORDER_KEY) || "null"); } catch(e){ return null; } })();
  if (!order){
    root.innerHTML = `<div class="order-hero">
      <h1>Keine Bestellung gefunden</h1>
      <p>Es scheint, du hast hier nicht her gefunden. <a href="shop.html">Zum Shop</a>.</p>
    </div>`;
    return;
  }
  const etaDate = new Date(order.eta);
  const etaText = etaDate.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" });
  const itemsHTML = order.items.map(l => {
    const p = getProduct(l.id); if (!p) return "";
    return `<div class="order-item">
      <div class="oi-img"><img src="${p.img}" alt=""></div>
      <div>
        <div class="oi-name">${p.name}</div>
        <div class="oi-meta">Größe: ${l.size} · Menge: ${l.qty}</div>
      </div>
      <div class="oi-price">${money(p.price * l.qty)}</div>
    </div>`;
  }).join("");
  root.innerHTML = `
    <div class="wrap">
      <div class="order-hero">
        <div class="check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12l5 5L20 7"/></svg>
        </div>
        <h1>Vielen Dank für deine Bestellung!</h1>
        <p>Wir haben deine Bestellung erhalten und melden uns per E-Mail. Du bist Teil der Bewegung. ✨</p>
      </div>
      <div class="order-grid">
        <div>
          <div class="order-card">
            <h3>Deine Bestellung</h3>
            <div class="order-items">${itemsHTML}</div>
          </div>
          <div class="order-card" style="margin-top:20px">
            <h3>Sendungsverlauf</h3>
            <div class="tracking-bar">
              <div class="tracking-step done"><div class="dot"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12l5 5L20 7"/></svg></div>Bestellt</div>
              <div class="tracking-step"><div class="dot">2</div>In Bearbeitung</div>
              <div class="tracking-step"><div class="dot">3</div>Versendet</div>
              <div class="tracking-step"><div class="dot">4</div>Geliefert</div>
            </div>
            <p style="font-size:.88rem; color:var(--ink-soft); margin-top:14px">Du bekommst eine E-Mail, sobald wir versendet haben (1–2 Werktage).</p>
          </div>
        </div>
        <aside>
          <div class="order-card">
            <h3>Übersicht</h3>
            <div class="order-meta"><span>Bestellnummer</span><strong>${order.orderNum}</strong></div>
            <div class="order-meta"><span>Lieferung erwartet</span><strong>${etaText}</strong></div>
            <hr style="border:0; border-top:1px solid var(--line); margin:14px 0">
            <div class="order-meta"><span>Zwischensumme</span><span>${money(order.subtotal)}</span></div>
            ${order.discount > 0 ? `<div class="order-meta" style="color:#2c5b3b"><span>Rabatt (${order.coupon})</span><span>− ${money(order.discount)}</span></div>` : ""}
            <div class="order-meta"><span>Versand</span><span>${order.ship === 0 ? "Kostenlos" : money(order.ship)}</span></div>
            <div class="order-meta" style="font-weight:700; font-size:1.1rem; margin-top:8px; padding-top:10px; border-top:1px solid var(--line);"><span>Gesamt</span><span>${money(order.total)}</span></div>
          </div>
        </aside>
      </div>
      <div class="order-actions">
        <a href="shop.html" class="btn btn-primary">Weiter shoppen</a>
        ${getAccount() ? `<a href="konto.html" class="btn btn-outline">Bestellung im Konto</a>` : ""}
      </div>
    </div>`;
}

/* ============================================================
   KONTO mit Supabase Auth (echtes Login)
   ============================================================ */
async function initKontoSupabase(root){
  let user = null;
  let mode = "signin"; // "signin" | "signup" | "reset"

  // Erste Prüfung
  try { user = await window.lwGetCurrentUser(); } catch(e){}

  function render(){
    if(user){
      renderAccount();
    } else {
      renderAuthForm();
    }
  }

  function renderAuthForm(){
    const subtitleMap = {
      signin: "Melde dich mit deinem Konto an",
      signup: "Erstelle dein Lightwear-Konto",
      reset: "Wir senden dir einen Link zum Zurücksetzen"
    };
    root.innerHTML = `
      <div style="max-width:440px;margin:0 auto;background:#fff;border:1px solid var(--line);border-radius:18px;padding:36px 32px;box-shadow:0 4px 20px rgba(0,0,0,.04)">
        <div style="text-align:center;margin-bottom:24px">
          <h2 style="font-family:'Anton',sans-serif;margin:0 0 6px;font-size:1.8rem;letter-spacing:.02em">${mode === "signup" ? "Konto erstellen" : mode === "reset" ? "Passwort vergessen" : "Anmelden"}</h2>
          <p style="margin:0;color:var(--ink-soft);font-size:.92rem">${subtitleMap[mode]}</p>
        </div>

        <div style="display:flex;gap:0;margin-bottom:22px;background:var(--panel);border-radius:99px;padding:4px">
          <button type="button" id="tab-signin" style="flex:1;padding:8px;border:none;background:${mode==='signin'?'var(--ink)':'transparent'};color:${mode==='signin'?'var(--bg)':'var(--ink)'};border-radius:99px;font-family:inherit;font-weight:600;font-size:.85rem;cursor:pointer;transition:.2s">Anmelden</button>
          <button type="button" id="tab-signup" style="flex:1;padding:8px;border:none;background:${mode==='signup'?'var(--ink)':'transparent'};color:${mode==='signup'?'var(--bg)':'var(--ink)'};border-radius:99px;font-family:inherit;font-weight:600;font-size:.85rem;cursor:pointer;transition:.2s">Registrieren</button>
        </div>

        <form id="auth-form">
          ${mode === "signup" ? `
            <div style="margin-bottom:14px">
              <label style="display:block;font-size:.82rem;font-weight:600;margin-bottom:6px">Name</label>
              <input type="text" id="auth-name" required style="width:100%;padding:11px 14px;border:1.5px solid var(--line);border-radius:8px;font-family:inherit;font-size:.95rem">
            </div>
          ` : ""}
          <div style="margin-bottom:14px">
            <label style="display:block;font-size:.82rem;font-weight:600;margin-bottom:6px">E-Mail</label>
            <input type="email" id="auth-email" required style="width:100%;padding:11px 14px;border:1.5px solid var(--line);border-radius:8px;font-family:inherit;font-size:.95rem">
          </div>
          ${mode !== "reset" ? `
            <div style="margin-bottom:14px">
              <label style="display:block;font-size:.82rem;font-weight:600;margin-bottom:6px">Passwort</label>
              <input type="password" id="auth-pass" required minlength="6" style="width:100%;padding:11px 14px;border:1.5px solid var(--line);border-radius:8px;font-family:inherit;font-size:.95rem">
            </div>
          ` : ""}
          <div id="auth-msg" style="margin-bottom:14px;font-size:.85rem"></div>
          <button type="submit" id="auth-submit" class="btn btn-primary" style="width:100%;padding:13px">
            ${mode === "signin" ? "Anmelden" : mode === "signup" ? "Konto erstellen" : "Link senden"}
          </button>
        </form>

        ${mode === "signin" ? `
          <p style="text-align:center;margin:18px 0 0;font-size:.85rem;color:var(--ink-soft)">
            <a href="#" id="forgot-link" style="color:var(--ink);text-decoration:underline">Passwort vergessen?</a>
          </p>
        ` : mode === "reset" ? `
          <p style="text-align:center;margin:18px 0 0;font-size:.85rem;color:var(--ink-soft)">
            <a href="#" id="back-signin" style="color:var(--ink);text-decoration:underline">← Zurück zum Login</a>
          </p>
        ` : ""}
      </div>
    `;

    document.getElementById("tab-signin")?.addEventListener("click", () => { mode = "signin"; render(); });
    document.getElementById("tab-signup")?.addEventListener("click", () => { mode = "signup"; render(); });
    document.getElementById("forgot-link")?.addEventListener("click", e => { e.preventDefault(); mode = "reset"; render(); });
    document.getElementById("back-signin")?.addEventListener("click", e => { e.preventDefault(); mode = "signin"; render(); });

    document.getElementById("auth-form").addEventListener("submit", async e => {
      e.preventDefault();
      const email = document.getElementById("auth-email").value.trim();
      const pass = document.getElementById("auth-pass")?.value || "";
      const name = document.getElementById("auth-name")?.value?.trim() || "";
      const msgEl = document.getElementById("auth-msg");
      const submitBtn = document.getElementById("auth-submit");
      submitBtn.disabled = true;
      submitBtn.textContent = "Moment …";
      try {
        if(mode === "signup"){
          await window.lwSignUp(email, pass, name);
          msgEl.innerHTML = '<div style="background:#e6f3e9;color:#2f7a3e;padding:10px 14px;border-radius:8px;font-weight:500">✓ Konto erstellt! Check deine Mails für die Bestätigung (oder logge dich direkt ein).</div>';
          mode = "signin";
          setTimeout(render, 1800);
        } else if(mode === "signin"){
          const result = await window.lwSignIn(email, pass);
          user = result.user;
          render();
        } else if(mode === "reset"){
          await window.lwResetPassword(email);
          msgEl.innerHTML = '<div style="background:#e6f3e9;color:#2f7a3e;padding:10px 14px;border-radius:8px;font-weight:500">✓ Reset-Link wurde an ' + email + ' gesendet.</div>';
        }
      } catch(err){
        const errMsg = err.message || String(err);
        msgEl.innerHTML = '<div style="background:#fce8e6;color:#b3261e;padding:10px 14px;border-radius:8px">⚠ ' + errMsg + '</div>';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = mode === "signin" ? "Anmelden" : mode === "signup" ? "Konto erstellen" : "Link senden";
      }
    });
  }

  async function renderAccount(){
    // Hole Profil-Daten + Bestellungen
    let myOrders = [];
    try {
      if(typeof window.lwGetOrders === "function"){
        const all = await window.lwGetOrders();
        myOrders = (all || []).filter(o => o.customer_email === user.email || o.user_id === user.id);
      }
    } catch(e){ console.warn("Orders-Load Fehler:", e); }

    const userName = user.user_metadata?.name || user.email.split("@")[0];

    let activeTab = "overview"; // "overview" | "orders" | "profile"

    function renderInner(){
      root.innerHTML = `
        <div style="display:grid;grid-template-columns:280px 1fr;gap:32px;max-width:1000px;margin:0 auto">
          <aside style="background:#fff;border:1px solid var(--line);border-radius:18px;padding:24px 22px;height:fit-content;position:sticky;top:90px">
            <div style="width:64px;height:64px;border-radius:50%;background:var(--ink);color:var(--bg);display:grid;place-items:center;font-family:'Anton',sans-serif;font-size:1.6rem;margin-bottom:14px">${escapeHtmlS(userName.charAt(0).toUpperCase())}</div>
            <div style="font-family:'Anton',sans-serif;font-size:1.2rem;letter-spacing:.02em">${escapeHtmlS(userName)}</div>
            <div style="color:var(--ink-soft);font-size:.82rem;margin-top:2px;word-break:break-all">${escapeHtmlS(user.email)}</div>
            <div style="margin-top:18px;padding-top:18px;border-top:1px solid var(--line);display:flex;flex-direction:column;gap:4px;font-size:.9rem">
              <button type="button" data-tab="overview" style="padding:10px 12px;border-radius:8px;color:var(--ink);background:${activeTab==='overview'?'var(--panel)':'transparent'};border:none;font-family:inherit;font-size:.9rem;cursor:pointer;text-align:left;font-weight:${activeTab==='overview'?600:500}">🏠 Übersicht</button>
              <button type="button" data-tab="orders" style="padding:10px 12px;border-radius:8px;color:var(--ink);background:${activeTab==='orders'?'var(--panel)':'transparent'};border:none;font-family:inherit;font-size:.9rem;cursor:pointer;text-align:left;font-weight:${activeTab==='orders'?600:500}">📦 Bestellungen <span style="background:var(--ink);color:var(--bg);padding:1px 8px;border-radius:99px;font-size:.7rem;margin-left:4px">${myOrders.length}</span></button>
              <button type="button" data-tab="profile" style="padding:10px 12px;border-radius:8px;color:var(--ink);background:${activeTab==='profile'?'var(--panel)':'transparent'};border:none;font-family:inherit;font-size:.9rem;cursor:pointer;text-align:left;font-weight:${activeTab==='profile'?600:500}">👤 Profil</button>
              <button type="button" id="logout-link" style="padding:10px 12px;border-radius:8px;color:var(--ink);background:transparent;border:none;font-family:inherit;font-size:.9rem;cursor:pointer;text-align:left;margin-top:8px;border-top:1px solid var(--line);padding-top:14px">🚪 Abmelden</button>
            </div>
          </aside>

          <main id="account-main">${renderTabContent()}</main>
        </div>
      `;

      // Tabs
      root.querySelectorAll("[data-tab]").forEach(b => b.addEventListener("click", () => {
        activeTab = b.dataset.tab;
        renderInner();
      }));
      document.getElementById("logout-link").addEventListener("click", async () => {
        try { await window.lwSignOut(); } catch(err){}
        user = null;
        render();
      });
    }

    function renderTabContent(){
      if(activeTab === "orders"){
        return `
          <h2 style="font-family:'Anton',sans-serif;font-size:2rem;margin:0 0 20px;letter-spacing:.02em">Meine Bestellungen</h2>
          <div style="background:#fff;border:1px solid var(--line);border-radius:16px;padding:24px">
            ${myOrders.length === 0 ? `
              <div style="text-align:center;padding:40px 20px">
                <p style="color:var(--ink-soft);font-size:.95rem;margin:0 0 16px">Du hast noch keine Bestellungen.</p>
                <a href="shop.html" class="btn btn-primary">Jetzt shoppen</a>
              </div>
            ` : `
              <div style="display:flex;flex-direction:column;gap:14px">
                ${myOrders.map(o => `
                  <div style="border:1px solid var(--line);border-radius:12px;padding:18px;background:#fff">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;gap:14px">
                      <div>
                        <div style="font-family:'Anton',sans-serif;font-size:1.05rem;letter-spacing:.04em">${escapeHtmlS(o.order_num || o.id)}</div>
                        <div style="color:var(--ink-soft);font-size:.82rem;margin-top:2px">Bestellt am ${new Date(o.created_at).toLocaleDateString("de-DE", {day:"numeric", month:"long", year:"numeric"})}</div>
                      </div>
                      <div style="text-align:right">
                        <strong style="font-size:1.1rem">${money(o.total)}</strong>
                        <div style="display:inline-block;background:${o.status==='delivered'?'#e6f3e9':o.status==='shipped'?'#e6efff':o.status==='cancelled'?'#fce8e6':o.status==='refunded'?'#f1efe9':'#fbf3e1'};color:${o.status==='delivered'?'#2f7a3e':o.status==='shipped'?'#1e5fb8':o.status==='cancelled'?'#b3261e':o.status==='refunded'?'#6b6863':'#b87b00'};padding:3px 10px;border-radius:99px;font-size:.72rem;font-weight:600;text-transform:uppercase;margin-top:4px">${o.status||'pending'}</div>
                      </div>
                    </div>
                    <div style="border-top:1px solid var(--line);padding-top:12px;display:flex;flex-direction:column;gap:6px;font-size:.85rem">
                      ${(o.items||[]).map(it => `
                        <div style="display:flex;justify-content:space-between">
                          <span>${escapeHtmlS(it.name || it.id || 'Artikel')} ${it.size ? '· Gr. ' + escapeHtmlS(it.size) : ''} · ${it.qty || 1}×</span>
                          <strong>${money((it.price||0) * (it.qty||1))}</strong>
                        </div>
                      `).join("")}
                    </div>
                  </div>
                `).join("")}
              </div>
            `}
          </div>
        `;
      }

      if(activeTab === "profile"){
        return `
          <h2 style="font-family:'Anton',sans-serif;font-size:2rem;margin:0 0 20px;letter-spacing:.02em">Mein Profil</h2>
          <div style="background:#fff;border:1px solid var(--line);border-radius:16px;padding:24px">
            <div style="display:grid;gap:18px;font-size:.95rem">
              <div>
                <div style="color:var(--ink-soft);font-size:.74rem;text-transform:uppercase;letter-spacing:.08em;font-weight:600;margin-bottom:4px">Name</div>
                <strong style="font-size:1.05rem">${escapeHtmlS(userName)}</strong>
              </div>
              <div>
                <div style="color:var(--ink-soft);font-size:.74rem;text-transform:uppercase;letter-spacing:.08em;font-weight:600;margin-bottom:4px">E-Mail</div>
                <strong style="font-size:1.05rem">${escapeHtmlS(user.email)}</strong>
              </div>
              <div>
                <div style="color:var(--ink-soft);font-size:.74rem;text-transform:uppercase;letter-spacing:.08em;font-weight:600;margin-bottom:4px">Mitglied seit</div>
                <strong style="font-size:1.05rem">${new Date(user.created_at).toLocaleDateString("de-DE", {day:"numeric", month:"long", year:"numeric"})}</strong>
              </div>
              <div>
                <div style="color:var(--ink-soft);font-size:.74rem;text-transform:uppercase;letter-spacing:.08em;font-weight:600;margin-bottom:4px">User-ID</div>
                <code style="font-size:.78rem;background:var(--panel);padding:4px 8px;border-radius:4px">${escapeHtmlS(user.id)}</code>
              </div>
            </div>
          </div>
        `;
      }

      // Overview (Default)
      return `
        <h2 style="font-family:'Anton',sans-serif;font-size:2rem;margin:0 0 20px;letter-spacing:.02em">Willkommen zurück, ${escapeHtmlS(userName)} 👋</h2>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:24px">
          <div style="background:#fff;border:1px solid var(--line);border-radius:14px;padding:20px">
            <div style="color:var(--ink-soft);font-size:.74rem;text-transform:uppercase;letter-spacing:.08em;font-weight:600">Bestellungen</div>
            <div style="font-family:'Anton',sans-serif;font-size:2.2rem;line-height:1;margin-top:6px">${myOrders.length}</div>
          </div>
          <div style="background:#fff;border:1px solid var(--line);border-radius:14px;padding:20px">
            <div style="color:var(--ink-soft);font-size:.74rem;text-transform:uppercase;letter-spacing:.08em;font-weight:600">Light Points</div>
            <div style="font-family:'Anton',sans-serif;font-size:2.2rem;line-height:1;margin-top:6px">${(() => { try { return localStorage.getItem("lw_lp_v1") || "0"; } catch(e){ return "0"; }})()}</div>
          </div>
        </div>

        <div style="background:#fff;border:1px solid var(--line);border-radius:16px;padding:24px;margin-bottom:20px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <h3 style="margin:0;font-family:'Anton',sans-serif;font-size:1.2rem">Letzte Bestellungen</h3>
            ${myOrders.length > 3 ? '<button type="button" data-tab="orders" style="background:none;border:none;color:var(--ink);font-family:inherit;font-size:.85rem;cursor:pointer;text-decoration:underline">Alle ansehen →</button>' : ''}
          </div>
          ${myOrders.length === 0 ? `
            <p style="color:var(--ink-soft);font-size:.9rem;margin:0 0 14px">Du hast noch keine Bestellungen.</p>
            <a href="shop.html" class="btn btn-primary">Zur Kollektion</a>
          ` : `
            <div style="display:flex;flex-direction:column;gap:10px">
              ${myOrders.slice(0, 3).map(o => `
                <div style="display:flex;justify-content:space-between;padding:12px 16px;background:var(--panel);border-radius:10px;align-items:center">
                  <div>
                    <strong>${escapeHtmlS(o.order_num || o.id)}</strong><br>
                    <small style="color:var(--ink-soft)">${new Date(o.created_at).toLocaleDateString("de-DE")}</small>
                  </div>
                  <div style="text-align:right">
                    <strong>${money(o.total)}</strong><br>
                    <small style="color:var(--ink-soft);text-transform:capitalize">${o.status||'pending'}</small>
                  </div>
                </div>
              `).join("")}
            </div>
          `}
        </div>
      `;
    }

    renderInner();
  }

  render();

  // Auth-State-Listener — falls Login von wo anders erfolgt
  if(typeof window.lwOnAuthStateChange === "function"){
    window.lwOnAuthStateChange((event, session) => {
      if(session?.user) user = session.user;
      else if(event === "SIGNED_OUT") user = null;
      render();
    });
  }
}

async function initKonto(){
  const root = document.getElementById("account-root");
  if (!root) return;

  // Wenn Supabase Auth verfügbar → echtes Auth-System nutzen
  if(typeof window.lwGetCurrentUser === "function"){
    return initKontoSupabase(root);
  }
  // Sonst Fallback unten (alter Code)

  function renderLogin(){
    root.innerHTML = `
      <div class="auth-box">
        <h2>Willkommen zurück</h2>
        <p>Melde dich an oder erstelle ein neues Konto.</p>
        <div class="auth-tabs">
          <button class="active" data-tab="login">Anmelden</button>
          <button data-tab="register">Registrieren</button>
        </div>
        <form class="auth-form" id="auth-form" onsubmit="return false">
          <input type="text" id="acc-name" placeholder="Name" style="display:none">
          <input type="email" id="acc-email" placeholder="E-Mail" required>
          <input type="password" id="acc-pass" placeholder="Passwort" required>
          <button class="btn btn-primary" type="submit">Anmelden</button>
          <small>Demo-Login — gib einfach irgendeine E-Mail und ein Passwort ein.</small>
        </form>
      </div>`;
    let mode = "login";
    root.querySelectorAll(".auth-tabs button").forEach(b => b.addEventListener("click", () => {
      root.querySelectorAll(".auth-tabs button").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      mode = b.dataset.tab;
      root.querySelector("#acc-name").style.display = mode === "register" ? "" : "none";
      root.querySelector(".btn[type='submit']").textContent = mode === "register" ? "Konto erstellen" : "Anmelden";
    }));
    root.querySelector("#auth-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const email = root.querySelector("#acc-email").value || "kunde@lightwear.net";
      const name = root.querySelector("#acc-name").value || email.split("@")[0];
      setAccount({ name, email, since: new Date().getFullYear() });
      renderDashboard();
    });
  }
  function renderDashboard(){
    const acc = getAccount();
    const orders = getAccountOrders();
    root.innerHTML = `
      <div class="account-grid">
        <nav class="account-nav">
          <a class="active" data-section="overview">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>
            Übersicht
          </a>
          <a data-section="orders">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>
            Bestellungen <span style="margin-left:auto; font-size:.78rem; opacity:.5">${orders.length}</span>
          </a>
          <a data-section="address">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 21s-7-7-7-12a7 7 0 1 1 14 0c0 5-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>
            Adressen
          </a>
          <hr>
          <a id="logout" style="color:var(--ink-soft);">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M15 17l5-5-5-5M20 12H8M4 4v16"/></svg>
            Abmelden
          </a>
        </nav>
        <main class="account-content" id="acc-section"></main>
      </div>`;

    function showSection(name){
      const out = root.querySelector("#acc-section");
      if (name === "overview"){
        const pts = getPoints();
        const nextTier = pts < 500 ? 500 : pts < 1000 ? 1000 : pts < 2500 ? 2500 : 5000;
        const pctToNext = Math.min(100, (pts / nextTier) * 100);
        out.innerHTML = `
          <h2>Hi, ${acc.name} 👋</h2>
          <div class="lp-card">
            <div class="lp-label">Light Points</div>
            <div class="lp-num">${pts}</div>
            <div class="lp-sub">Punkte = ${money(pointsToEuro(pts))} Rabatt-Wert · 1 € = 1 Punkt · 100 = 5 €</div>
            <div class="lp-progress"><div class="lp-fill" style="width:${pctToNext}%"></div></div>
            <div class="lp-next">Noch ${Math.max(0,nextTier - pts)} Punkte bis ${nextTier}</div>
          </div>
          <div class="account-card" style="margin-top:18px">
            <h3>Profil</h3>
            <dl>
              <dt>Name</dt><dd>${acc.name}</dd>
              <dt>E-Mail</dt><dd>${acc.email}</dd>
              <dt>Mitglied seit</dt><dd>${acc.since}</dd>
            </dl>
          </div>
          <div class="account-card">
            <h3>Letzte Bestellungen <a href="#" data-go="orders">Alle ansehen</a></h3>
            ${orders.length ? orders.slice(0, 3).map(o => orderRowHTML(o)).join("") : `<p style="color:var(--ink-soft); font-size:.92rem">Du hast noch keine Bestellungen. <a href="shop.html">Jetzt shoppen</a>.</p>`}
          </div>`;
        out.querySelectorAll("[data-go]").forEach(a => a.addEventListener("click", (e) => { e.preventDefault(); root.querySelector(`[data-section="${a.dataset.go}"]`)?.click(); }));
        wireOrderRows();
      }
      if (name === "orders"){
        if (!orders.length){
          out.innerHTML = `<h2>Meine Bestellungen</h2>
            <div class="empty-state" style="padding:60px 20px 30px;">
              <div class="es-illu">
                <div class="es-ring"></div>
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round">
                  <path d="M15 28h70l-4 50h-62z" fill="rgba(28,27,24,.04)"/>
                  <path d="M15 28h70l-4 50h-62z"/>
                  <path d="M30 28v-6a20 20 0 0 1 40 0v6"/>
                  <path d="M40 50h20" stroke-width="1.8"/>
                </svg>
              </div>
              <span class="es-eyebrow">Bestellungen</span>
              <h2>Noch <em>nichts</em> bestellt</h2>
              <p>Trag dein erstes Lightwear-Piece — dein Konto wartet auf seine erste Bestellung.</p>
              <div class="es-actions">
                <a href="shop.html" class="btn btn-primary">Jetzt shoppen</a>
              </div>
            </div>`;
        } else {
          out.innerHTML = `<h2>Meine Bestellungen</h2>
            <div class="account-card">${orders.map(o => orderRowHTML(o)).join("")}</div>`;
        }
        wireOrderRows();
      }
      if (name === "order-detail"){
        const orderNum = root.dataset.detailOrder;
        const order = orders.find(o => o.orderNum === orderNum);
        if (!order){ root.querySelector('[data-section="orders"]').click(); return; }
        out.innerHTML = renderOrderDetail(order, acc);
        wireOrderDetail(order, acc, out);
      }
      if (name === "address"){
        out.innerHTML = `<h2>Adressen</h2>
          <div class="account-card">
            <h3>Standard-Lieferadresse</h3>
            <p style="color:var(--ink-soft); font-size:.93rem; margin-bottom:14px">${acc.name}<br>Lichtstraße 12<br>10115 Berlin<br>Deutschland</p>
            <button class="btn btn-outline" style="font-size:.85rem; padding:10px 18px;">Bearbeiten</button>
          </div>`;
      }
    }
    function orderRowHTML(o){
      const d = new Date(o.eta);
      const dStr = d.toLocaleDateString("de-DE", { day:"numeric", month:"long", year:"numeric" });
      const pill = o.status === "delivered" ? "delivered" : "shipped";
      const pillText = o.status === "delivered" ? "Geliefert" : "Versendet";
      return `<div class="order-row" data-order-num="${o.orderNum}" style="cursor:pointer;" title="Klick für Details">
        <div>
          <div class="order-id">${o.orderNum}</div>
          <div class="order-date">${o.items.length} Artikel · ${dStr}</div>
        </div>
        <div style="text-align:right; display:flex; align-items:center; gap:14px;">
          <div>
            <div style="font-weight:700">${money(o.total)}</div>
            <span class="pill ${pill}" style="margin-top:6px">${pillText}</span>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--ink-soft); flex:none;"><path d="m9 6 6 6-6 6"/></svg>
        </div>
      </div>`;
    }
    function wireOrderRows(){
      root.querySelectorAll("[data-order-num]").forEach(r => r.addEventListener("click", () => {
        root.dataset.detailOrder = r.dataset.orderNum;
        showSection("order-detail");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }));
    }
    root.querySelectorAll("[data-section]").forEach(a => a.addEventListener("click", (e) => {
      e.preventDefault();
      root.querySelectorAll("[data-section]").forEach(x => x.classList.remove("active"));
      a.classList.add("active");
      showSection(a.dataset.section);
    }));
    root.querySelector("#logout").addEventListener("click", () => {
      setAccount(null);
      renderLogin();
    });
    showSection("overview");
  }
  if (getAccount()) renderDashboard(); else renderLogin();
}

/* ---------- Bestell-Detail ---------- */
function getTrackingStage(order){
  // 0 = bestellt, 1 = in bearbeitung, 2 = versendet, 3 = geliefert
  const created = order.created ? new Date(order.created) : new Date(new Date(order.eta) - 3*86400000);
  const eta = new Date(order.eta);
  const now = new Date();
  if (order.status === "delivered" || now >= eta) return 3;
  if (now - created > 86400000) return 2;
  if (now - created > 3600000)  return 1;
  return 0;
}

function renderOrderDetail(order, acc){
  const stage = getTrackingStage(order);
  const created = order.created ? new Date(order.created) : new Date(new Date(order.eta) - 3*86400000);
  const createdStr = created.toLocaleDateString("de-DE", { day:"numeric", month:"long", year:"numeric" });
  const etaStr = new Date(order.eta).toLocaleDateString("de-DE", { weekday:"long", day:"numeric", month:"long" });
  const pill = stage === 3 ? "delivered" : "shipped";
  const pillText = stage === 3 ? "Geliefert" : stage === 2 ? "Versendet" : stage === 1 ? "In Bearbeitung" : "Bestellt";
  const trackingNum = "DH" + order.orderNum.replace(/[^0-9]/g, "").slice(0,9);

  const itemsHTML = order.items.map(l => {
    const p = getProduct(l.id); if (!p) return "";
    return `<div class="order-item">
      <div class="oi-img"><img src="${p.img}" alt=""></div>
      <div>
        <div class="oi-name">${p.name}</div>
        <div class="oi-meta">Größe: ${l.size} · Menge: ${l.qty}</div>
      </div>
      <div class="oi-price">${money(p.price * l.qty)}</div>
    </div>`;
  }).join("");

  const trackSteps = ["Bestellt","In Bearbeitung","Versendet","Geliefert"];
  const trackHTML = `<div class="tracking-bar">
    ${trackSteps.map((label, i) => `
      <div class="tracking-step ${i <= stage ? "done" : ""}">
        <div class="dot">${i <= stage ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12l5 5L20 7"/></svg>' : (i+1)}</div>
        ${label}
      </div>`).join("")}
  </div>`;

  return `
    <button class="order-back" id="order-back">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 6-6 6 6 6"/></svg>
      Zurück zu Bestellungen
    </button>

    <div class="order-detail-head">
      <div>
        <h2>${order.orderNum}</h2>
        <div class="meta">Bestellt am ${createdStr} · ${order.items.length} Artikel · ${money(order.total)}</div>
      </div>
      <span class="status-pill ${pill}">${pillText}</span>
    </div>

    <!-- Tracking -->
    <div class="detail-card dark" style="margin-bottom:18px">
      <h3>Sendungsverfolgung</h3>
      ${trackHTML}
      <div class="tracking-info">
        <div><span class="label">Voraussichtlich</span>${etaStr}</div>
        <div><span class="label">Sendungsnummer</span><code>${trackingNum}</code></div>
      </div>
    </div>

    <div class="order-detail-grid">
      <!-- Left: Items -->
      <div class="detail-card">
        <h3>Artikel</h3>
        <div class="order-items">${itemsHTML}</div>
      </div>

      <!-- Right: Übersicht -->
      <div class="detail-card dark">
        <h3>Übersicht</h3>
        <div class="dl-flat">
          <div style="display:flex; justify-content:space-between"><span>Zwischensumme</span><span>${money(order.subtotal)}</span></div>
          ${order.discount > 0 ? `<div style="display:flex; justify-content:space-between; color:#2c5b3b"><span>Rabatt${order.coupon?` (${order.coupon})`:""}</span><span>− ${money(order.discount)}</span></div>` : ""}
          <div style="display:flex; justify-content:space-between"><span>Versand</span><span>${order.ship === 0 ? "Kostenlos" : money(order.ship)}</span></div>
          <div style="display:flex; justify-content:space-between; font-weight:700; font-size:1.1rem; padding-top:10px; margin-top:6px; border-top:1px solid var(--line)"><span>Gesamt</span><span>${money(order.total)}</span></div>
        </div>
      </div>
    </div>

    <div class="order-detail-grid" style="margin-top:18px">
      <!-- Address -->
      <div class="detail-card">
        <h3>Lieferadresse</h3>
        <div class="dl-flat">
          <strong>${acc.name}</strong>
          <span>Lichtstraße 12<br>10115 Berlin<br>Deutschland</span>
        </div>
      </div>

      <!-- Payment -->
      <div class="detail-card">
        <h3>Zahlung</h3>
        <div class="dl-flat">
          <strong>Klarna · Rechnung</strong>
          <span>Zahlbar innerhalb 14 Tage nach Versand.<br>Rechnungs-Nr. ${order.orderNum.replace("LW-","INV-")}</span>
        </div>
      </div>
    </div>

    <div class="order-actions-row">
      <button class="btn btn-primary" id="order-invoice">Rechnung herunterladen</button>
      <button class="btn btn-outline" id="order-reorder">Wieder bestellen</button>
      <button class="btn btn-outline" id="order-refund">Rückerstattung beantragen</button>
    </div>
  `;
}

function wireOrderDetail(order, acc, out){
  out.querySelector("#order-back").addEventListener("click", () => {
    document.querySelector('[data-section="orders"]').click();
  });
  out.querySelector("#order-invoice").addEventListener("click", () => openInvoice(order, acc));
  out.querySelector("#order-reorder").addEventListener("click", () => {
    order.items.forEach(l => addToCart(l.id, l.size, l.qty));
    if (typeof openDrawer === "function") openDrawer();
  });
  out.querySelector("#order-refund").addEventListener("click", () => {
    openRefund(order);
  });
}

function openInvoice(order, acc){
  const m = ensureModal();
  const created = order.created ? new Date(order.created) : new Date(new Date(order.eta) - 3*86400000);
  const createdStr = created.toLocaleDateString("de-DE", { day:"numeric", month:"long", year:"numeric" });
  const invoiceNum = order.orderNum.replace("LW-","INV-");
  const subTax = order.subtotal - order.subtotal / 1.19;
  document.getElementById("modal-body").innerHTML = `
    <div class="invoice-doc" id="invoice-doc">
      <div class="top">
        <div>
          <h1>LIGHTWEAR</h1>
          <div class="sub">Collective</div>
        </div>
        <div class="right">
          <strong>Rechnung</strong>
          ${invoiceNum}<br>
          ${createdStr}
        </div>
      </div>

      <div class="addr-block">
        <div>
          <h3>Verkäufer</h3>
          Lightwear Collective<br>
          Lichtstraße 1<br>
          10115 Berlin<br>
          USt-IdNr.: DE123456789
        </div>
        <div>
          <h3>Rechnungsempfänger</h3>
          <strong>${acc.name}</strong><br>
          ${acc.email}<br>
          Lichtstraße 12<br>
          10115 Berlin
        </div>
      </div>

      <h3>Positionen</h3>
      <table>
        <thead><tr><th>Artikel</th><th>Größe</th><th style="text-align:center">Menge</th><th style="text-align:right">Einzelpreis</th><th style="text-align:right">Gesamt</th></tr></thead>
        <tbody>
          ${order.items.map(l => { const p = getProduct(l.id); if (!p) return ""; return `<tr>
            <td>${p.name}</td>
            <td>${l.size}</td>
            <td style="text-align:center">${l.qty}</td>
            <td style="text-align:right">${money(p.price)}</td>
            <td style="text-align:right">${money(p.price * l.qty)}</td>
          </tr>`; }).join("")}
        </tbody>
      </table>

      <div class="totals">
        <div class="row"><span>Zwischensumme</span><span>${money(order.subtotal)}</span></div>
        ${order.discount > 0 ? `<div class="row"><span>Rabatt${order.coupon?` (${order.coupon})`:""}</span><span>− ${money(order.discount)}</span></div>` : ""}
        <div class="row"><span>Versand</span><span>${order.ship === 0 ? "Kostenlos" : money(order.ship)}</span></div>
        <div class="row" style="font-size:.85rem; color:#888"><span>davon MwSt. (19 %)</span><span>${money(subTax)}</span></div>
        <div class="row total"><span>Gesamtbetrag</span><span>${money(order.total)}</span></div>
      </div>

      <div class="footer">
        Vielen Dank für deinen Einkauf bei Lightwear Collective! ✨<br>
        „I am the light of the world." — John 8:12<br><br>
        Fragen? hello@lightwear.net
      </div>

      <div style="text-align:center; padding:20px; background:#f7f3ec; margin-top:20px; border-radius:8px;">
        <button class="btn btn-primary" onclick="window.print()" style="margin-right:8px">Rechnung drucken / PDF</button>
        <button class="btn btn-outline" id="invoice-close-btn">Schließen</button>
      </div>
    </div>`;
  document.getElementById("invoice-close-btn").addEventListener("click", closeModal);
  m.classList.add("open");
  document.body.style.overflow = "hidden";
}

function openRefund(order){
  const m = ensureModal();
  document.getElementById("modal-body").innerHTML = `
    <div style="padding:36px;">
      <div class="check-circle" style="margin:0 auto 18px; width:60px; height:60px; border-radius:50%; background:#fef4d8; border:2px solid #a17404; display:grid; place-items:center;">
        <svg viewBox="0 0 24 24" fill="none" stroke="#a17404" stroke-width="2" style="width:28px; height:28px;"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>
      </div>
      <h2 style="font-family:var(--f-display); font-weight:400; font-size:1.8rem; text-transform:uppercase; text-align:center; margin-bottom:10px;">Rückerstattung anfragen</h2>
      <p style="color:var(--ink-soft); text-align:center; margin-bottom:24px;">Du möchtest die Bestellung <strong>${order.orderNum}</strong> zurückgeben? Wir kümmern uns innerhalb von 24 Stunden.</p>
      <div style="background:var(--panel); padding:20px; border-radius:14px; margin-bottom:20px;">
        <div style="font-size:.78rem; letter-spacing:.14em; text-transform:uppercase; color:var(--ink-soft); margin-bottom:6px;">Grund</div>
        <select id="refund-reason" style="width:100%; padding:12px 14px; border-radius:10px; border:1px solid var(--line); background:var(--bg); font-family:inherit; font-size:.95rem;">
          <option>Passt nicht (Größe / Schnitt)</option>
          <option>Gefällt mir nicht so wie erwartet</option>
          <option>Beschädigt angekommen</option>
          <option>Falscher Artikel geliefert</option>
          <option>Sonstiges</option>
        </select>
      </div>
      <button class="btn btn-primary btn-block" id="refund-submit">Rückerstattung anfragen</button>
      <button class="btn btn-outline btn-block" id="refund-cancel" style="margin-top:10px;">Abbrechen</button>
    </div>`;
  document.getElementById("refund-submit").addEventListener("click", () => {
    document.getElementById("modal-body").innerHTML = `
      <div style="padding:50px 36px; text-align:center;">
        <div class="check-circle" style="margin:0 auto 20px; width:70px; height:70px; border-radius:50%; background:#eef6f1; border:2px solid #2c5b3b; display:grid; place-items:center;">
          <svg viewBox="0 0 24 24" fill="none" stroke="#2c5b3b" stroke-width="2.5" style="width:32px; height:32px;"><path d="M5 12l5 5L20 7"/></svg>
        </div>
        <h2 style="font-family:var(--f-display); font-weight:400; font-size:2rem; text-transform:uppercase; margin-bottom:10px;">Anfrage gesendet</h2>
        <p style="color:var(--ink-soft); max-width:34ch; margin:0 auto 24px;">Wir melden uns innerhalb von 24 Stunden per E-Mail mit den nächsten Schritten und einem Retouren-Label.</p>
        <button class="btn btn-primary" onclick="document.getElementById('lw-modal').classList.remove('open'); document.body.style.overflow=''">Verstanden</button>
      </div>`;
  });
  document.getElementById("refund-cancel").addEventListener("click", closeModal);
  m.classList.add("open");
  document.body.style.overflow = "hidden";
}

/* ---------- Drop-Calendar ---------- */
function initDrops(){
  const root = document.getElementById("drops-root");
  if (!root) return;
  // Drops mit relativen Daten (in Tagen ab heute, deterministisch via Slot)
  const now = new Date();
  const drops = [
    { live: true, slot: -1, title: "Light Drop · Frühling 26", eyebrow: "Live jetzt", desc: "Unsere neuen Frühlings-Pieces sind da. Limitiert in Stückzahl und Größen.", cta: "Zur Kollektion", href: "shop.html" },
    { slot: 14, title: "Worship-Capsule", eyebrow: "Coming Soon", desc: "Eine Mini-Kollektion in Zusammenarbeit mit Worship-Künstler:innen aus Berlin und München.", cta: "Erinnern lassen", href: "#newsletter" },
    { slot: 42, title: "Summer Light", eyebrow: "Coming Soon", desc: "Leichtere Stoffe, helle Farben — gemacht für lange Sommerabende und Open-Air-Events.", cta: "Erinnern lassen", href: "#newsletter" },
    { slot: 90, title: "Winter Heavyweight", eyebrow: "Coming Soon", desc: "Heavy Fleece, Schwere Hoodies, Statement-Jacken. Geplant für Herbst/Winter 26.", cta: "Erinnern lassen", href: "#newsletter" }
  ];
  function countdown(target){
    const ms = target - new Date();
    if (ms <= 0) return null;
    const total = Math.floor(ms / 1000);
    const d = Math.floor(total / 86400);
    const h = Math.floor((total % 86400) / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return { d, h, m, s };
  }
  function renderAll(){
    root.innerHTML = drops.map(drop => {
      const target = new Date(now);
      target.setDate(target.getDate() + drop.slot);
      const cd = countdown(target);
      const cdHTML = drop.live
        ? `<div class="countdown"><div><div class="val" style="color:#e74c3c">LIVE</div><div class="lbl">Jetzt verfügbar</div></div></div>`
        : cd ? `<div class="countdown">
            <div><div class="val">${String(cd.d).padStart(2,"0")}</div><div class="lbl">Tage</div></div>
            <div class="sep">:</div>
            <div><div class="val">${String(cd.h).padStart(2,"0")}</div><div class="lbl">Std.</div></div>
            <div class="sep">:</div>
            <div><div class="val">${String(cd.m).padStart(2,"0")}</div><div class="lbl">Min.</div></div>
            <div class="sep">:</div>
            <div><div class="val">${String(cd.s).padStart(2,"0")}</div><div class="lbl">Sek.</div></div>
          </div>` : "";
      const dropKey = drop.title.toLowerCase().replace(/\s+/g, "-");
      const dropDate = target.toLocaleDateString("de-DE", {day:"numeric", month:"long", year:"numeric"});
      const reminderActive = !drop.live && hasReminder(dropKey);
      const ctaHTML = drop.live
        ? `<a href="${drop.href}" class="btn btn-primary" style="background:var(--bg); color:var(--ink);">${drop.cta}</a>`
        : reminderActive
          ? `<div class="drop-reminder-active">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12l5 5L20 7"/></svg>
              Erinnerung aktiv
              <button class="unsubscribe" data-unsubscribe="${dropKey}">Abmelden</button>
            </div>`
          : `<button class="btn btn-outline" data-remind="${dropKey}" data-title="${drop.title}" data-date="${dropDate}">${drop.cta}</button>`;
      return `<div class="drop-card ${drop.live?"live":""}">
        ${drop.live ? `<span class="live-tag">Live</span>` : ""}
        <div class="drop-text">
          <span class="eyebrow">${drop.eyebrow}</span>
          <h2>${drop.title}</h2>
          ${drop.live ? "" : `<div class="drop-date">${dropDate}</div>`}
          <p>${drop.desc}</p>
          ${ctaHTML}
        </div>
        ${cdHTML}
      </div>`;
    }).join("");
    // Erinnern-Buttons verdrahten
    root.querySelectorAll("[data-remind]").forEach(b => b.addEventListener("click", () => {
      openRemindMe(b.dataset.remind, b.dataset.title, b.dataset.date);
    }));
    root.querySelectorAll("[data-unsubscribe]").forEach(b => b.addEventListener("click", () => {
      removeReminder(b.dataset.unsubscribe);
      renderAll();
    }));
  }
  renderAll();
  setInterval(renderAll, 1000);
}

/* ---------- Bundle Builder ---------- */
function initBundle(){
  const root = document.getElementById("bundle-root");
  if (!root) return;
  const slots = [
    { key: "shirt",  title: "T-Shirt oder Polo", filter: p => p.category === "T-Shirts" },
    { key: "top",    title: "Hoodie oder Sweater", filter: p => p.category === "Hoodies" },
    { key: "bottom", title: "Hose oder Jacke",   filter: p => p.category === "Hosen" || p.category === "Jacken" }
  ];
  const state = { picks: { shirt: null, top: null, bottom: null } };

  function openPicker(slotKey){
    const slot = slots.find(s => s.key === slotKey);
    const m = ensureModal();
    document.getElementById("modal-body").innerHTML = `
      <div style="padding:24px 24px 0">
        <h3 style="font-family:var(--f-display); font-weight:400; font-size:1.4rem; text-transform:uppercase; margin-bottom:6px;">Wähle ein Piece</h3>
        <p style="color:var(--ink-soft); font-size:.9rem; margin-bottom:10px">${slot.title}</p>
      </div>
      <div class="bundle-picker-grid">
        ${PRODUCTS.filter(slot.filter).map(p => `
          <div class="bundle-pick" data-id="${p.id}">
            <div class="pi-img"><img src="${p.img}" alt=""></div>
            <div class="pi-info">
              <div class="pi-name">${p.name.split(" — ")[0]}</div>
              <div class="pi-price">${money(p.price)}</div>
            </div>
          </div>`).join("")}
      </div>`;
    m.querySelectorAll(".bundle-pick").forEach(b => b.addEventListener("click", () => {
      state.picks[slotKey] = b.dataset.id;
      closeModal();
      render();
    }));
    m.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function render(){
    const stepsHTML = slots.map((s, i) => {
      const id = state.picks[s.key];
      const p = id ? getProduct(id) : null;
      return `<div class="bundle-slot ${p?"filled":""}">
        <span class="bundle-slot-num">${i+1}</span>
        <h3>${s.title}</h3>
        <div class="slot-meta">Wähle ein Produkt</div>
        ${p ? `
          <div class="slot-product">
            <img src="${p.img}" alt="">
            <div class="info">
              <div class="name">${p.name}</div>
              <div class="price">${money(p.price)}</div>
              <button class="swap" data-swap="${s.key}">Anderes wählen</button>
            </div>
          </div>` : `
          <div class="slot-empty">Klick, um ein Produkt auszuwählen</div>
          <button class="slot-pick" data-pick="${s.key}">Produkt wählen</button>
        `}
      </div>`;
    }).join("");

    const picked = slots.map(s => state.picks[s.key]).filter(Boolean).map(getProduct);
    const sub = picked.reduce((a,p) => a + p.price, 0);
    const allFilled = picked.length === slots.length;
    const discount = allFilled ? sub * 0.15 : 0;
    const total = sub - discount;

    document.getElementById("bundle-steps").innerHTML = stepsHTML;
    document.getElementById("bundle-summary-inner").innerHTML = `
      <div>
        <h2>${allFilled ? "Dein Set ist komplett 🎉" : `Wähle ${slots.length - picked.length} weitere Pieces`}</h2>
        <p>${allFilled ? `Du sparst <strong style="color:#7fdfa3">${money(discount)}</strong> mit dem Bundle-Rabatt.` : "Pro Bundle aus 3 Pieces gibt's automatisch 15 % Rabatt."}</p>
      </div>
      <div class="bundle-prices">
        ${allFilled ? `<div class="row"><span>Einzelpreis</span><del>${money(sub)}</del></div>
                       <div class="row savings"><span>Bundle-Rabatt 15 %</span><span>− ${money(discount)}</span></div>` : ""}
        <div class="row total"><span>Gesamt</span><span>${money(total)}</span></div>
        <button class="btn ${allFilled?"":"disabled"}" id="bundle-add" ${allFilled?"":"disabled"}>${allFilled ? "Set in den Warenkorb" : "Set zusammenstellen"}</button>
      </div>`;

    document.querySelectorAll("[data-pick]").forEach(b => b.addEventListener("click", () => openPicker(b.dataset.pick)));
    document.querySelectorAll("[data-swap]").forEach(b => b.addEventListener("click", () => openPicker(b.dataset.swap)));
    document.querySelectorAll(".slot-empty").forEach(el => el.addEventListener("click", () => {
      const slot = el.closest(".bundle-slot");
      const num = slot.querySelector(".bundle-slot-num").textContent;
      const key = slots[parseInt(num,10)-1].key;
      openPicker(key);
    }));
    const addBtn = document.getElementById("bundle-add");
    if (addBtn && allFilled){
      addBtn.addEventListener("click", () => {
        // Bundle-Code automatisch anwenden + Items in Warenkorb
        picked.forEach(p => addToCart(p.id, "M", 1));
        setCoupon("BLESSED15"); // 15% Code = passt zum Bundle-Rabatt
        if (typeof openDrawer === "function") openDrawer();
      });
    }
  }
  // Mount Container
  root.innerHTML = `
    <div class="wrap">
      <div class="bundle-intro">
        <span class="eyebrow">Stell dein Set zusammen</span>
        <h1>Dein <em>Bundle</em> — dein Statement</h1>
        <p>Wähle drei Pieces aus unserer Kollektion und bekomme automatisch <strong>15 % Rabatt</strong> auf das ganze Set.</p>
      </div>
      <div class="bundle-steps" id="bundle-steps"></div>
      <div class="bundle-summary" id="bundle-summary-inner"></div>
    </div>`;
  render();
}

/* ============================================================
   COOKIE-BANNER
   ============================================================ */
const COOKIE_KEY = "lw_cookies_v1";
function ensureCookieBanner(){
  try { if (localStorage.getItem(COOKIE_KEY)) return; } catch(e){}
  if (document.getElementById("cookie-banner")) return;
  const el = document.createElement("aside");
  el.id = "cookie-banner"; el.className = "cookie-banner";
  el.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M21 12.5A9 9 0 1 1 11.5 3a4 4 0 0 0 4 4 3.5 3.5 0 0 0 3.5 3.5c.4 0 .8-.1 1.2-.2"/>
      <circle cx="9" cy="10" r="1" fill="currentColor"/>
      <circle cx="14" cy="14" r="1" fill="currentColor"/>
      <circle cx="9" cy="16" r="1" fill="currentColor"/>
    </svg>
    <div class="text">
      <strong>Wir benutzen Cookies 🍪</strong>
      Damit Warenkorb &amp; Login funktionieren — und damit wir verstehen, was bei dir ankommt. <a href="datenschutz.html">Datenschutz</a>
    </div>
    <div class="actions">
      <button class="btn btn-ghost" data-cookie="necessary">Nur notwendige</button>
      <button class="btn btn-light" data-cookie="all">Alle akzeptieren</button>
    </div>`;
  document.body.appendChild(el);
  setTimeout(() => el.classList.add("show"), 600);
  el.querySelectorAll("[data-cookie]").forEach(b => b.addEventListener("click", () => {
    try { localStorage.setItem(COOKIE_KEY, b.dataset.cookie); } catch(e){}
    el.classList.remove("show");
    setTimeout(() => el.remove(), 500);
  }));
}

/* ============================================================
   CHATBOT v2 — intelligenter, kontextbewusst, mit Produkt-Suche
   ============================================================ */
const CHAT_SEEN_KEY = "lw_chat_seen_v1";
const CHAT_CTX = { lastTopic: null, lastProductId: null };

const CHAT_KB = [
  { id:"greet", patterns:["hallo","hi","hey","moin","servus","guten tag","guten morgen","guten abend","yo"],
    answer:"Hi! 👋 Schön, dass du da bist. Womit kann ich dir helfen?",
    suggestions:["Was empfehlt ihr?","Wie ist der Versand?","Wann kommt der nächste Drop?"] },
  { id:"thanks", patterns:["danke","thx","thank","cool","super","top","geil","krass","mega"],
    answer:"Gerne! Wenn du noch was brauchst — schreib einfach. ✨",
    suggestions:[] },
  { id:"bye", patterns:["bye","tschüss","ciao","cu","wiedersehen"],
    answer:"Bis bald! ✨ Trag dein Licht weiter.",
    suggestions:[] },

  // Versand
  { id:"shipping", patterns:["versand","liefer","lieferzeit","wann kommt","dauer","wie lange","wie schnell","wann hier","shipping"],
    answer:"📦 **Versand**: 2–4 Werktage in DE, 4–7 in EU. Ab **50 € versandkostenfrei** (sonst 4,90 €). Klimaneutral mit DHL GoGreen, du bekommst eine Tracking-Mail.",
    link:{url:"versand.html",text:"Mehr Infos"},
    suggestions:["Versand international?","Tracking?","Wie ist die Rückgabe?"] },
  { id:"shipping-intl", patterns:["international","schweiz","österreich","usa","england","weltweit","ausland"],
    answer:"🌍 Wir versenden EU-weit (4–7 Werktage). Schweiz und UK auf Anfrage — schreib uns an hello@lightwear.net.",
    suggestions:["Wie lange dauert es?","Was kostet Versand?"] },
  { id:"tracking", patterns:["tracking","sendung","wo ist","wo bleibt","verfolgen","status"],
    answer:"📍 Nach Versand bekommst du eine Mail mit Tracking-Link. Den Status siehst du auch im Konto unter „Bestellungen“.",
    link:{url:"konto.html",text:"Zum Konto"},
    suggestions:["Versand-Dauer?","Was wenn nicht ankommt?"] },

  // Rückgabe
  { id:"return", patterns:["rückgabe","zurück","retour","umtausch","gefällt nicht","passt nicht"],
    answer:"🔄 **30 Tage Rückgaberecht** — innerhalb Deutschlands **kostenlos**. Schreib uns mit Bestellnummer an hello@lightwear.net und du bekommst ein Retouren-Label.",
    link:{url:"versand.html",text:"Details"},
    suggestions:["Wie lange dauert die Rückzahlung?","Auch Sale-Artikel?"] },
  { id:"refund", patterns:["geld zurück","erstatt","rückzahl","wann bekomme ich"],
    answer:"💸 Sobald deine Rücksendung bei uns angekommen ist, erstatten wir den Betrag innerhalb von 5 Werktagen auf dein Zahlungsmittel zurück.",
    suggestions:["Wie schicke ich zurück?","Versand-Kosten?"] },

  // Größe
  { id:"size", patterns:["größe","size","fit","passform","passt","oversized","boxy"],
    answer:"👕 Unsere Stücke fallen **boxy/oversized**. Wenn du körpernah willst → eine Nummer kleiner. Auf jeder Produktseite findest du unser Größen-Quiz!",
    link:{url:"groessen.html",text:"Größentabelle"},
    suggestions:["Größen-Quiz?","Wie messe ich?","Ist L wirklich L?"] },
  { id:"size-chart", patterns:["maße","brustweite","länge","tabelle","cm","messen"],
    answer:"📏 Komplette Maßtabelle auf der Größen-Seite. Wenn du unsicher bist: schreib mir deine Maße, ich helfe gerne.",
    link:{url:"groessen.html",text:"Tabelle ansehen"},
    suggestions:["Welche Größe nehme ich?","Boxy vs Regular?"] },

  // Zahlung
  { id:"payment", patterns:["zahlung","bezahl","paypal","klarna","kreditkarte","apple pay","google pay","rechnung","raten"],
    answer:"💳 Du kannst mit **PayPal, Klarna (Rechnung & Ratenkauf), Kreditkarte, Apple Pay** und **Google Pay** bezahlen. Sicher und schnell.",
    suggestions:["Klarna Raten?","Was wenn Karte abgelehnt?"] },

  // Rabatt / Codes / Sale
  { id:"discount", patterns:["rabatt","gutschein","code","aktion","welcome","willkommen","bonus","reduziert"],
    answer:"🎉 Mit dem Newsletter bekommst du **10 % Willkommensrabatt** (Code WILLKOMMEN10). Tipp: probier auch BLESSED15 oder LIGHT20. Aktuelle Sale-Pieces unter „Sale“ im Shop.",
    link:{url:"shop.html",text:"Zur Sale-Sektion"},
    suggestions:["Sale-Produkte?","Newsletter anmelden?","Bundle-Rabatt?"] },
  { id:"sale", patterns:["sale","reduziert","schnäpp","angebot","preisnachlass"],
    answer:"🔥 Aktuell sind 5 Pieces im Sale, einige mit **Flash-Sale-Timer**. Schau in der Sale-Sektion vorbei — die Codes WILLKOMMEN10 / BLESSED15 / LIGHT20 sind oben drauf kombinierbar.",
    link:{url:"shop.html",text:"Sale ansehen"},
    suggestions:["Flash-Sale wann zu Ende?","Bundle-Rabatt?"] },

  // Material
  { id:"material", patterns:["material","stoff","baumwolle","polyester","fleece","gsm","qualität","schwer"],
    answer:"🧵 Vor allem **Bio-Baumwolle** und schwere Stoffe (240–400 gsm). Genaues Material/Gewicht findest du auf jeder Produktseite unter „Material / Stoffgewicht“.",
    suggestions:["Bio-Baumwolle?","Wie waschen?","Schwer oder leicht?"] },
  { id:"care", patterns:["wasch","pflege","trocknen","bügel","reinig"],
    answer:"🫧 Kalt waschen (30 °C), auf links drehen, **nicht in den Trockner**, Drucke nicht bügeln. So bleibt alles wie neu.",
    suggestions:["Bio-Baumwolle?","Hält die Farbe?"] },

  // Nachhaltigkeit
  { id:"sustain", patterns:["nachhalt","bio","fair","umwelt","klima","co2","ethik"],
    answer:"🌱 **Bio-Baumwolle, faire Löhne, kleine Auflagen, klimaneutraler Versand.** Wir sind nicht perfekt, aber wir versuchen, jeden Tag besser zu werden.",
    link:{url:"nachhaltigkeit.html",text:"Mehr lesen"},
    suggestions:["Wo wird produziert?","Verpackung?"] },

  // Kontakt
  { id:"contact", patterns:["kontakt","mail","email","telefon","erreichen","sprech","mensch","support"],
    answer:"💬 Schreib uns einfach an **hello@lightwear.net** oder nutz das Kontaktformular. Wir antworten Mo–Fr innerhalb von 24 Stunden.",
    link:{url:"kontakt.html",text:"Kontaktformular"},
    suggestions:["Instagram?","Antwortzeiten?"] },
  { id:"insta", patterns:["instagram","insta","social","tiktok","youtube","follow"],
    answer:"📱 @lightwear.collective auf Instagram und TikTok. Da gibt's Behind-the-Scenes, Drops und Community-Fotos.",
    suggestions:["Newsletter?","Drop-Calendar?"] },

  // Bestellung / Konto
  { id:"order", patterns:["bestellung","bestellt","order","kauf","gekauft"],
    answer:"🧾 Deine Bestellungen siehst du im Konto unter „Bestellungen“ — inkl. Status und Tracking. Brauchst du was Konkretes?",
    link:{url:"konto.html",text:"Zum Konto"},
    suggestions:["Wo ist meine Bestellung?","Stornieren?","Adresse ändern?"] },
  { id:"account", patterns:["konto","account","login","anmelden","registrieren","profil"],
    answer:"👤 Im Konto siehst du deine Bestellungen, Adressen und kannst dich aus-/einloggen.",
    link:{url:"konto.html",text:"Konto öffnen"},
    suggestions:["Passwort vergessen?","Bestellungen?"] },

  // Bundles & Drops
  { id:"bundle", patterns:["bundle","set","kombination","stell zusammen"],
    answer:"🎁 **Bundle Builder**: Wähle 3 Pieces (T-Shirt + Hoodie + Hose/Jacke) → bekommst automatisch **15 % Rabatt** aufs Set.",
    link:{url:"bundle.html",text:"Bundle starten"},
    suggestions:["Welche kombinieren?","Mit Code kombinieren?"] },
  { id:"drops", patterns:["drop","neu","release","kommend","nächste","bald","wann kommt"],
    answer:"📅 Aktuelle und kommende Drops findest du im Drop-Calendar — mit Live-Countdown bis zum Release.",
    link:{url:"drops.html",text:"Drop-Calendar"},
    suggestions:["Erinnern lassen?","Was war zuletzt?"] },

  // Newsletter
  { id:"newsletter", patterns:["newsletter","mailing","abonnieren","abo","eintragen"],
    answer:"💌 Eintragen unten auf der Startseite — du bekommst **10 % Willkommensrabatt** und neue Drops zuerst.",
    suggestions:["Was steht drin?","Abmelden möglich?"] },

  // Marke / Story / Faith
  { id:"about", patterns:["wer seid ihr","über euch","story","gründer","marke","wer steckt"],
    answer:"✨ Lightwear Collective steht für **christliche Streetwear** mit echtem Inhalt. Wir glauben, dass das, was du trägst, eine Botschaft sendet.",
    link:{url:"ueber-uns.html",text:"Unsere Story"},
    suggestions:["Wer hat das gegründet?","Wo produziert ihr?"] },
  { id:"faith", patterns:["jesus","gott","glaube","bibel","vers","christ","gospel"],
    answer:"📖 Jedes Stück ist mit einer klaren Botschaft entworfen — Bibelverse, christliche Symbole, ehrliche Statements. Mehr dazu auf der Über-uns-Seite und im wöchentlichen „Verse of the Week“.",
    link:{url:"ueber-uns.html",text:"Mehr lesen"},
    suggestions:["Lieblings-Vers?","Wer steht dahinter?"] },

  // Geschenkkarte
  { id:"gift", patterns:["geschenk","geschenkkarte","gift card","gift-card","verschenken","geburtstag","gutschein","voucher"],
    answer:"🎁 Wir haben **digitale Geschenkkarten** ab 10 €! Du wählst Wert, Empfänger und schreibst eine persönliche Nachricht — der Code ist sofort im Warenkorb einlösbar.",
    link:{url:"geschenkkarte.html",text:"Geschenkkarte erstellen"},
    suggestions:["Wie löse ich ein?","Welcher Betrag?","Wie lange gültig?"] },

  // Produktion / Herkunft
  { id:"production", patterns:["wo wird produziert","wo produziert","wo hergestellt","hergestellt","produktionsland","made in","woher kommt","wo kommt","fabrik","manufaktur"],
    answer:"🏭 Wir produzieren in kleinen, geprüften Manufakturen — vor allem in Portugal und der Türkei, mit fairen Löhnen. Genauere Auskunft gerne per Mail.",
    link:{url:"nachhaltigkeit.html",text:"Mehr dazu"},
    suggestions:["Bio-Baumwolle?","Fairer Lohn?"] },

  // Größen-spezifika (M, L etc.)
  { id:"size-letter", patterns:["ist l","ist m","ist s","ist xl","stimmt l","stimmt m","groß genug","zu groß","zu klein","fällt aus","wie fällt"],
    answer:"📐 Unsere Stücke fallen meist **boxy/oversized** — also tendenziell etwas größer als Standard. Wenn du normalerweise M trägst und es enger willst → S. Wenn dir das egal ist → bei M bleiben. Probier das Größen-Quiz auf der Produktseite!",
    link:{url:"groessen.html",text:"Tabelle"},
    suggestions:["Größen-Tabelle?","Welche Größe für 1,80m?","Boxy Fit?"] },

  // Stornierung
  { id:"cancel", patterns:["stornieren","storno","abbrechen","bestellung ändern","löschen"],
    answer:"❎ Solange noch nicht versendet, können wir die Bestellung stornieren. Schreib uns **sofort** an hello@lightwear.net mit deiner Bestellnummer.",
    suggestions:["Wo ist meine Bestellung?","Versand-Status?"] },

  // Adresse ändern
  { id:"address", patterns:["adresse ändern","falsche adresse","umzug","andere adresse"],
    answer:"📮 Solange noch nicht versendet, können wir die Adresse anpassen. Schick uns die neue Adresse und Bestellnummer an hello@lightwear.net.",
    suggestions:["Stornieren?","Wann versendet?"] },

  // Bekommt es zurück / Lager / Vorbestellung
  { id:"restock", patterns:["wann wieder","ausverkauft","nicht mehr","kommt wieder","restock","nachschub"],
    answer:"📦 Wir produzieren in kleinen Auflagen — manche Pieces kommen wieder, andere nicht. Trag dich in den Newsletter ein, dann erfährst du als Erstes von Restocks.",
    suggestions:["Newsletter?","Drop-Calendar?"] },

  // Light Points
  { id:"points", patterns:["light points","punkte","treue","loyalty","reward","sammel"],
    answer:"⭐ **Light Points** = unser Treue-Programm. Pro 1 € Einkauf bekommst du 1 Punkt. **100 Punkte = 5 € Rabatt**. Punkte siehst du in deinem Konto und kannst sie im Warenkorb einlösen.",
    link:{url:"konto.html",text:"Punkte ansehen"},
    suggestions:["Wie einlösen?","Verfallen Punkte?"] },

  // Style-Quiz
  { id:"styleQuiz", patterns:["find your fit","style quiz","style-quiz","welcher stil","stil-quiz","welches piece","was passt zu mir","style finden"],
    answer:"🎯 Probier unser **Find Your Fit Quiz** — 6 Fragen, dein perfekter Style. Du bekommst eine personalisierte Auswahl von 6 Pieces, die zu dir passen.",
    link:{url:"find-your-fit.html",text:"Quiz starten"},
    suggestions:["Was empfiehlst du?","Bundle Builder?"] },

  // --- NEUE EINTRÄGE: viel mehr Bot-Wissen ---
  { id:"flash-sale-end", patterns:["wann endet sale","wann läuft sale ab","sale ende","flash sale","wie lange noch sale"],
    answer:"⏰ Unsere Flash-Sales laufen meist **48 Stunden** — du siehst den Live-Countdown direkt auf den Produktseiten. Wenn der Timer abgelaufen ist, geht der Preis zurück auf den Originalwert.",
    suggestions:["Welche Produkte sind im Sale?","Newsletter für Sale-Alerts?"] },

  { id:"sale-also", patterns:["auch sale","sale auch","rückgabe sale","sale produkte rückgabe","kann ich sale zurück"],
    answer:"🔄 Ja — auch Sale-Artikel sind innerhalb von 30 Tagen rückgabefähig. Nur ausgenommen sind personalisierte oder verbrauchte Items.",
    suggestions:["Wie zurückschicken?","Wann Erstattung?"] },

  { id:"bundle-combine", patterns:["bundle mit code","bundle code","bundle gutschein","bundle rabatt code","zusammen mit code"],
    answer:"🎁 Der **Bundle-Rabatt (15 %)** und ein Gutschein-Code lassen sich **nicht kombinieren** — das System wählt automatisch den besseren für dich aus. Light Points kannst du aber zusätzlich einlösen.",
    suggestions:["Light Points?","Welche Codes?"] },

  { id:"klarna-raten", patterns:["klarna raten","ratenkauf","raten zahlen","monatsrate","3 raten"],
    answer:"💳 Mit **Klarna** kannst du in **3 Raten 0 % Zinsen** zahlen — wähle beim Checkout den Klarna-Ratenkauf. Bonität wird kurz geprüft, du bekommst sofort eine Entscheidung.",
    suggestions:["PayPal?","Was wenn Karte abgelehnt?"] },

  { id:"karte-abgelehnt", patterns:["karte abgelehnt","kreditkarte funktioniert nicht","zahlung fehlgeschlagen","zahlung geht nicht","payment failed","wird abgelehnt"],
    answer:"😕 Tut mir leid! Wenn deine Karte abgelehnt wird, prüfe bitte:\n• Limit erreicht?\n• 3D-Secure (TAN) korrekt eingegeben?\n• Adresse stimmt?\nAlternativ: probier **PayPal** oder **Klarna**. Wenn's nicht klappt, schreib uns — wir helfen sofort.",
    suggestions:["PayPal?","Klarna?","Schreibt das Team"] },

  { id:"verfall-punkte", patterns:["verfallen punkte","light points verfallen","wie lange punkte","ablauf punkte","gültig punkte"],
    answer:"⭐ **Light Points verfallen nicht**, solange du mindestens einmal im Jahr aktiv bist (z. B. einkaufst oder dich einloggst). Du kannst sie also entspannt sammeln.",
    suggestions:["Wie einlösen?","Wie viele habe ich?"] },

  { id:"points-redeem", patterns:["punkte einlösen","wie einlösen","wo einlösen","punkte nutzen","punkte verwenden"],
    answer:"💸 Du kannst deine Light Points im **Warenkorb** einlösen — Schieberegler nutzen und die Punkte werden direkt als Rabatt abgezogen. **20 Punkte = 1 €**.",
    link:{url:"konto.html",text:"Punkte ansehen"},
    suggestions:["Wie sammeln?","Verfallen Punkte?"] },

  { id:"adresse-aendern-konto", patterns:["adresse im konto","versandadresse ändern","liefer-adresse","standardadresse"],
    answer:"📮 Du kannst deine Standard-Adresse im **Konto → Adressen** anpassen. Für bereits laufende Bestellungen schreib uns bitte vorher an — solange noch nicht versendet, ändern wir es.",
    link:{url:"konto.html",text:"Zum Konto"},
    suggestions:["Stornieren?","Versand-Status?"] },

  { id:"newsletter-abmelden", patterns:["newsletter abmelden","abbestellen","austragen","unsubscribe"],
    answer:"💌 Klick einfach auf den Abmelden-Link am Ende jeder Newsletter-Mail — du bist sofort raus. Kommen kannst du jederzeit wieder.",
    suggestions:["Was steht im Newsletter?"] },

  { id:"verpackung", patterns:["verpackung","plastik","karton","umverpack","wie verpackt"],
    answer:"📦 Wir verpacken **plastikfrei** in recyceltem Karton mit kompostierbarem Klebeband. Bei größeren Bestellungen verwenden wir wiederverwendbare Mailing Bags aus Recycling-Material.",
    suggestions:["Klimaneutraler Versand?","Nachhaltigkeit?"] },

  { id:"taillenfit", patterns:["taillen","crop","kurz geschnitten","langer schnitt","oversized fit"],
    answer:"👕 Wir haben **drei Fit-Familien**:\n• **Boxy** — locker, kurz geschnitten, modern\n• **Regular** — klassischer Schnitt, vielseitig kombinierbar\n• **Relaxed/Oversized** — weit, lässig, perfekt zum Layern\nDie Passform steht immer im Produkt-Titel.",
    suggestions:["Welche Größe passt mir?","Boxy oder Regular?"] },

  { id:"farben", patterns:["welche farben","farb","schwarz","weiß","creme","braun","beige","grün","blau"],
    answer:"🎨 Unsere Hauptpalette: **Schwarz, Cream, Stone, Olive, Washed Brown**. Manche Drops sind exklusiv in einer Spezial-Farbe (z. B. Storm Blue im aktuellen Drop). Was suchst du?",
    suggestions:["T-Shirts?","Hoodies?","Neue Drops?"] },

  { id:"app", patterns:["app","mobile app","handy app","android","ios"],
    answer:"📱 Aktuell haben wir **keine native App**, aber unsere Seite ist als **PWA installierbar** — Symbol auf den Homescreen, läuft wie eine App. Vorteile: Push-Benachrichtigungen für Drops!",
    suggestions:["Wie installieren?","Push für Drops?"] },

  { id:"giftwrap", patterns:["geschenk verpack","gift wrap","schön verpack","verschenken","weihnachten","geburtstagsgeschenk"],
    answer:"🎀 Beim Checkout findest du den Punkt Als Geschenk verpacken (+2 €) — du bekommst Cream-farbenes Geschenkpapier mit einem handgeschriebenen Kärtchen. Empfänger sieht keinen Preis auf der Rechnung.",
    suggestions:["Geschenkkarte digital?","Wann wird's geliefert?"] },

  { id:"team", patterns:["team","mitarbeiter","angestellte","wer arbeitet","gründer"],
    answer:"👥 Hinter Lightwear stehen aktuell **6 Menschen** — Designer:innen, ein Logistik-Team und unser kleines Support-Team (das bin u. a. auch ich, der Bot 🤖). Mehr zu den Köpfen auf unserer Über-uns-Seite.",
    link:{url:"ueber-uns.html",text:"Team kennenlernen"},
    suggestions:["Wer hat gegründet?","Wo produziert ihr?"] },

  { id:"agb", patterns:["agb","allgemeine geschäftsbedingungen","widerruf"],
    answer:"📄 Unsere kompletten **AGB** und das Widerrufsrecht findest du am Footer der Seite.",
    link:{url:"agb.html",text:"AGB lesen"},
    suggestions:["Rückgabe?","Datenschutz?"] },

  { id:"datenschutz", patterns:["datenschutz","privacy","dsgvo","daten löschen","welche daten"],
    answer:"🔒 Wir behandeln deine Daten nach **DSGVO**. Du kannst jederzeit Auskunft, Berichtigung oder Löschung verlangen — schreib einfach an hello@lightwear.net.",
    link:{url:"datenschutz.html",text:"Datenschutzerklärung"},
    suggestions:["Cookies?","Konto löschen?"] },

  { id:"konto-loeschen", patterns:["konto löschen","account löschen","profil entfernen","daten löschen"],
    answer:"🗑️ Schreib uns an **hello@lightwear.net** mit dem Betreff Kontolöschung. Wir löschen dein Konto innerhalb von 7 Tagen — laufende Bestellungen werden vorher abgewickelt.",
    suggestions:["Datenschutz?","Newsletter abmelden?"] },

  { id:"impressum", patterns:["impressum","wer ist verantwortlich","betreiber","sitz"],
    answer:"📌 Verantwortlich ist Lightwear Collective UG. Komplettes Impressum mit Adresse, USt-IdNr und Geschäftsführer im Footer.",
    link:{url:"impressum.html",text:"Impressum öffnen"},
    suggestions:["Kontakt?","AGB?"] },

  { id:"kooperation", patterns:["kooperation","kollab","collab","zusammenarbeit","partner","content creator","influencer"],
    answer:"🤝 Wir lieben Kollabs! Wenn du Worship-Künstler:in, Pastor:in, Athlet:in oder Content Creator bist und mit uns arbeiten willst → kurze Mail an **kollab@lightwear.net** mit Idee + Reichweite.",
    suggestions:["Affiliate-Programm?","Botschafter?"] },

  { id:"affiliate", patterns:["affiliate","partnerprogramm","botschafter","ambassador","werben","provision","empfehlung verdien"],
    answer:"💎 Unser **Botschafter-Programm** öffnen wir bald — 15 % Provision pro Verkauf über deinen Code. Trag dich für die Warteliste auf der Affiliate-Seite ein.",
    suggestions:["Kollab?","Wie funktioniert das?"] },

  { id:"groesse-jugend", patterns:["kindergrößen","kinder","jugend","teens","junior","unisex"],
    answer:"👶 Unsere Pieces sind **Unisex** und gehen von **XS bis 2XL**. Für jüngere Teens ab ca. 14 J. passt meistens XS oder S. Wenn du unsicher bist, schick mir die Maße deines Lieblings-Shirts.",
    suggestions:["Größentabelle?","Quiz starten?"] },

  { id:"empfehlung-anlass", patterns:["geschenk freund","geschenk freundin","geschenk bruder","geschenk schwester","was schenken"],
    answer:"🎁 Beliebte Geschenke:\n• **JESUS Polo** — der Bestseller\n• **FAITH Sweatpants** — bequem & coole Stickerei\n• **Geschenkkarte** — wenn du unsicher bist\nWenn du mir Stil oder Größe sagst, helfe ich gezielt!",
    link:{url:"shop.html",text:"Im Shop stöbern"},
    suggestions:["Geschenkkarte?","Bundle Builder?"] },

  { id:"meta-wer-bist-du", patterns:["wer bist du","was bist du","bist du ein bot","echter mensch","mensch oder bot"],
    answer:"🤖 Ich bin der **Lightwear-Bot** — ein cleverer Assistent fürs Schnelle. Bei kniffligen Sachen verbinde ich dich gerne mit unserem echten Team (Button unten links im Chat).",
    suggestions:["Mit Mitarbeiter sprechen","Versand?"] },

  { id:"oeffnungszeit-support", patterns:["öffnungszeit","wann erreichbar","support zeit","wann online","wann antwort"],
    answer:"🕒 Unser Team ist **Mo–Fr 9–18 Uhr** erreichbar, Sa 10–14 Uhr. Außerhalb dieser Zeiten antworten wir am nächsten Arbeitstag. Ich (der Bot) bin 24/7 da.",
    suggestions:["Mit Mitarbeiter sprechen","Kontakt?"] },

  { id:"verse-week", patterns:["verse of the week","vers der woche","wöchentlicher vers","bibelvers woche"],
    answer:"📖 Jede Woche teilen wir den **Verse of the Week** auf Instagram und im Newsletter — frisch gewählt vom Team. Trag dich ein, um keinen zu verpassen.",
    suggestions:["Newsletter anmelden?","Instagram?"] },

  { id:"co-branding", patterns:["bedruckt","drucken lassen","logo","firmen-shirt","corporate","custom"],
    answer:"🎨 Custom-Drucke und Firmen-Bestellungen ab 50 Stück machen wir auf Anfrage — Mindestauflage und Vorlauf 4 Wochen. Schreib an **kollab@lightwear.net** mit Stückzahl + Vision.",
    suggestions:["Kollab?","Welche Stoffe?"] }
];

const CHAT_INTENT = {
  priceQuery: /(was|wie) (kostet|teuer)|kostet (der|die|das|ein)|preis (für|von)/i,
  productSearch: /\b(zeig|zeige|gib mir|ich (such|will|brauche|möcht|hätte)|hast du|habt ihr|gibt es|gibts)/i,
  recommendation: /empfeh|empfiehl|empfehl|was würd|was soll|was findest|tipp|deinen favo|favorite|bester|beste(s|n) /i
};

function chatScore(text, patterns){
  let score = 0;
  for (const pat of patterns){
    if (text.includes(pat)){
      // Wortgrenze gibt mehr Punkte
      const re = new RegExp(`\\b${pat.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}\\b`, "i");
      score += re.test(text) ? 20 : 10;
    }
  }
  return score;
}

function findKB(text){
  text = text.toLowerCase();
  let best = null, bestScore = 0;
  for (const e of CHAT_KB){
    const s = chatScore(text, e.patterns);
    if (s > bestScore){ bestScore = s; best = e; }
  }
  return bestScore >= 10 ? best : null;
}

function findProductInQuery(q){
  q = q.toLowerCase();
  // Suche nach erstem Wort des Namens (z. B. "jesus", "faith")
  const first = PRODUCTS.find(p => {
    const words = p.name.toLowerCase().split(/[\s—·-]+/).filter(Boolean);
    return words.slice(0, 3).some(w => w.length >= 4 && q.includes(w));
  });
  return first || null;
}

function detectCategory(q){
  q = q.toLowerCase();
  if (/hoodie|kapuze|sweater|zip-up|zipper/.test(q)) return "Hoodies";
  if (/shirt|tee|polo|tank|top|crop/.test(q)) return "T-Shirts";
  if (/hose|hosen|pants|sweatpants|jogger/.test(q)) return "Hosen";
  if (/jacke|jacket|mantel/.test(q)) return "Jacken";
  return null;
}

function fmt(text){
  // **bold** → <strong>, **\n** → <br>
  return text
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
}

function smartAnswer(rawText){
  const q = (rawText || "").toLowerCase().trim();
  if (!q) return { html: "Bitte schreib mir kurz, womit ich dir helfen kann 🙂", suggestions: [] };

  // 1. Preis-Abfrage
  if (CHAT_INTENT.priceQuery.test(q)){
    const p = findProductInQuery(q);
    if (p){
      CHAT_CTX.lastProductId = p.id;
      CHAT_CTX.lastTopic = "product";
      let txt = `💰 Das **${p.name}** kostet **${money(p.price)}**.`;
      if (p.originalPrice) txt += ` (Statt ${money(p.originalPrice)} — Sale!)`;
      return {
        html: fmt(txt),
        link: { url: `produkt.html?id=${p.id}`, text: "Ansehen" },
        suggestions: ["Welche Größen gibt es?","Material?","Mehr Bilder?"]
      };
    }
  }

  // 2. Produkt-Suche / Kategorie
  if (CHAT_INTENT.productSearch.test(q) || detectCategory(q)){
    const cat = detectCategory(q);
    if (cat){
      const matches = PRODUCTS.filter(p => p.category === cat).slice(0, 3);
      const list = matches.map(p => `• **${p.name}** — ${money(p.price)}`).join("\n");
      CHAT_CTX.lastTopic = "category:" + cat;
      return {
        html: fmt(`Hier ein paar Pieces aus der Kategorie **${cat}**:\n${list}`),
        link: { url: `shop.html`, text: `Alle ${cat} ansehen` },
        suggestions: ["Was empfiehlst du?", "Bestseller?", "Sale-Produkte?"]
      };
    }
  }

  // 3. Empfehlung
  if (CHAT_INTENT.recommendation.test(q)){
    const fav = getProduct("jesus-polo");
    return {
      html: fmt(`Mein Favorit ist das **${fav.name}** für ${money(fav.price)} — Bestseller und super vielseitig. Auch sehr beliebt: SAVED BY GRACE Hoodie und FAITH Barrel Pants.`),
      link: { url: `produkt.html?id=jesus-polo`, text: "JESUS Polo ansehen" },
      suggestions: ["Was gibt's noch?", "Sale-Produkte?", "Nächster Drop?"]
    };
  }

  // 4. Wissensbasis
  const match = findKB(q);
  if (match){
    CHAT_CTX.lastTopic = match.id;
    return {
      html: fmt(match.answer),
      link: match.link,
      suggestions: match.suggestions || []
    };
  }

  // 5. Fallback — clever, schlägt Themen vor statt zu „weiterleiten"
  const fallbacks = [
    {
      html: "Das hab ich nicht ganz verstanden 🤔 Probier eine andere Formulierung — oder eines der häufigen Themen:",
      suggestions: ["Versand & Lieferzeit", "Größenberatung", "Rückgabe & Erstattung", "Aktuelle Drops"]
    },
    {
      html: "Hmm, dazu hab ich gerade keine passende Antwort. Vielleicht hilft eines davon:",
      suggestions: ["Was empfehlt ihr?", "Welche Größe?", "Sale-Produkte?", "Light Points?"]
    },
    {
      html: "Lass mich überlegen … ich weiß noch nicht genau, was du suchst. Probier's so:",
      suggestions: ["Bundle-Rabatt?", "Material & Pflege", "Newsletter-Rabatt?", "Drop-Calendar"]
    }
  ];
  return fallbacks[Math.floor(Math.random()*fallbacks.length)];
}

function ensureChatWidget(){
  if (document.getElementById("chat-fab")) return;
  const fab = document.createElement("button");
  fab.id = "chat-fab"; fab.className = "chat-fab"; fab.setAttribute("aria-label","Support-Chat öffnen");
  fab.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4l-5 1.6 1.6-5A8.4 8.4 0 1 1 21 11.5Z"/><circle cx="9" cy="11.5" r="1" fill="currentColor"/><circle cx="13" cy="11.5" r="1" fill="currentColor"/><circle cx="17" cy="11.5" r="1" fill="currentColor"/></svg><span class="fab-dot"></span>`;
  document.body.appendChild(fab);

  const bubble = document.createElement("div");
  bubble.id = "chat-bubble"; bubble.className = "chat-bubble";
  bubble.textContent = "Hi! Brauchst du Hilfe? 💬";
  document.body.appendChild(bubble);

  const panel = document.createElement("aside");
  panel.id = "chat-panel"; panel.className = "chat-panel";
  panel.innerHTML = `
    <div class="chat-head">
      <div class="avatar">L</div>
      <div class="info">
        <strong>Lightwear Support</strong>
        <span>online</span>
      </div>
      <button class="close" aria-label="Schließen"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 6 12 12M18 6 6 18"/></svg></button>
    </div>
    <div class="chat-body" id="chat-body">
      <div class="chat-msg bot">Hey! Ich bin der Lightwear-Bot. Womit kann ich dir helfen?</div>
    </div>
    <div class="chat-chips" id="chat-chips">
      <button class="chat-chip" data-q="Wie lange dauert der Versand?">Versand</button>
      <button class="chat-chip" data-q="Wie ist eure Rückgabe?">Rückgabe</button>
      <button class="chat-chip" data-q="Welche Größe passt mir?">Größe</button>
      <button class="chat-chip" data-q="Wie kann ich bezahlen?">Zahlung</button>
    </div>
    <form class="chat-input" id="chat-input-form" onsubmit="return false">
      <input type="text" id="chat-input" placeholder="Schreib uns…" autocomplete="off">
      <button aria-label="Senden"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M14 6l6 6-6 6"/></svg></button>
    </form>`;
  document.body.appendChild(panel);

  const body = panel.querySelector("#chat-body");
  const chipsHost = panel.querySelector("#chat-chips");
  const input = panel.querySelector("#chat-input");

  function addMsg(content, who, isHTML){
    const el = document.createElement("div");
    el.className = "chat-msg " + who;
    if (isHTML) el.innerHTML = content; else el.textContent = content;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
    return el;
  }
  function showTyping(){
    const el = document.createElement("div");
    el.className = "chat-msg typing";
    el.innerHTML = "<span></span><span></span><span></span>";
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
    return el;
  }
  function setChips(items){
    chipsHost.innerHTML = items.map(t => `<button class="chat-chip" data-q="${t.replace(/"/g,"&quot;")}">${t}</button>`).join("");
    chipsHost.querySelectorAll(".chat-chip").forEach(c => c.addEventListener("click", () => ask(c.dataset.q)));
  }
  function ask(q){
    addMsg(q, "user");
    const t = showTyping();
    // dynamische Typing-Zeit je nach Länge der Antwort
    const res = smartAnswer(q);
    const delay = 600 + Math.min(1200, (res.html?.length || 0) * 4);
    setTimeout(() => {
      t.remove();
      let html = res.html;
      if (res.link){
        html += ` <a href="${res.link.url}" style="color:var(--ink); text-decoration:underline; font-weight:700;">${res.link.text} →</a>`;
      }
      addMsg(html, "bot", true);
      if (res.suggestions && res.suggestions.length){
        setChips(res.suggestions);
      }
    }, delay);
  }

  // Open/close
  function open(){
    panel.classList.add("open");
    fab.classList.add("open");
    bubble.classList.remove("show");
    setTimeout(() => input.focus(), 350);
    try { sessionStorage.setItem(CHAT_SEEN_KEY, "1"); } catch(e){}
  }
  function close(){ panel.classList.remove("open"); fab.classList.remove("open"); }

  fab.addEventListener("click", () => panel.classList.contains("open") ? close() : open());
  panel.querySelector(".close").addEventListener("click", close);
  bubble.addEventListener("click", open);
  chipsHost.querySelectorAll(".chat-chip").forEach(c => c.addEventListener("click", () => ask(c.dataset.q)));
  panel.querySelector("#chat-input-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = input.value.trim(); if (!v) return;
    ask(v); input.value = "";
  });

  // Welcome-Bubble nach 5s, nur einmal pro Session
  try {
    if (!sessionStorage.getItem(CHAT_SEEN_KEY)){
      setTimeout(() => { if (!panel.classList.contains("open")) bubble.classList.add("show"); }, 5000);
      setTimeout(() => bubble.classList.remove("show"), 13000);
    }
  } catch(e){}

  // ===== Public API für Live-Chat-Übergabe =====
  window.__lwChat = {
    panel, body, input,
    chipsHost,
    formEl: panel.querySelector("#chat-input-form"),
    addMsg, showTyping, setChips,
    open
  };
}

/* ============================================================
   LIGHT POINTS — Treue-Programm
   ============================================================ */
const LP_KEY = "lw_lp_v1";
const LP_REDEEM_KEY = "lw_lp_redeem_v1"; // wieviele Punkte aktuell für laufenden Cart eingelöst
const LP_RATE = 1;      // 1 € = 1 Punkt
const LP_REDEEM_RATE = 20; // 100 Punkte = 5 € → 1 Punkt = 0,05 € → also 20 Punkte = 1 €

function getPoints(){ try { return parseInt(localStorage.getItem(LP_KEY) || "0", 10); } catch(e){ return 0; } }
function setPoints(n){ try { localStorage.setItem(LP_KEY, String(Math.max(0,n))); } catch(e){} }
function addPoints(n){ setPoints(getPoints() + n); }

function getRedeem(){ try { return parseInt(localStorage.getItem(LP_REDEEM_KEY) || "0", 10); } catch(e){ return 0; } }
function setRedeem(n){ try { if (n>0) localStorage.setItem(LP_REDEEM_KEY, String(n)); else localStorage.removeItem(LP_REDEEM_KEY); } catch(e){} }
function pointsToEuro(p){ return p / LP_REDEEM_RATE; }

// Rabatt-Funktion erweitern: Punkte ebenso abziehen
const _cartDiscount = cartDiscount;
cartDiscount = function(subtotal){
  const couponDisc = _cartDiscount(subtotal);
  const ptDisc = Math.min(pointsToEuro(getRedeem()), subtotal - couponDisc);
  return couponDisc + Math.max(0, ptDisc);
};

// Punkte beim Bezahlen vergeben + eingelöste abziehen
const _checkoutToOrder = checkoutToOrder;
checkoutToOrder = function(){
  const subtotal = cartSubtotal();
  if (!subtotal) return;
  const redeem = getRedeem();
  if (redeem > 0){
    setPoints(getPoints() - redeem);
    setRedeem(0);
  }
  // Punkte für diesen Einkauf (basiert auf Total nach Rabatt)
  const ship = subtotal >= FREE_SHIP ? 0 : SHIP_COST;
  const disc = cartDiscount(subtotal);
  const total = subtotal - disc + ship;
  addPoints(Math.floor(total * LP_RATE));
  _checkoutToOrder();
};

/* ============================================================
   AI Style-Quiz "Find Your Fit"
   ============================================================ */
const QUIZ_QUESTIONS = [
  {
    q: "Was zieht dich morgens am liebsten an?",
    options: [
      { label: "T-Shirt", sub: "Locker, simpel, immer go-to",  products: ["i-see-god","the-answer","trust-god-loose","faith-makes-new","he-is-love"] },
      { label: "Hoodie / Sweater", sub: "Warm, cozy, lounge-vibe", products: ["saved-by-grace","eagle-wings","power-of-jesus","contrast-plaid-zip","sola-gratia-sweat"] },
      { label: "Polo / Trikot", sub: "Etwas dressed up, sportlich", products: ["jesus-polo"] },
      { label: "Hose oder Jacke", sub: "Für drüber / drunter", products: ["faith-sweatpants","be-the-reason"] }
    ]
  },
  {
    q: "Welcher Schnitt fühlt sich nach dir an?",
    options: [
      { label: "Bodycon / körpernah", sub: "Fitter Look, mehr Form", products: ["trust-in-god","jesus-crop","jesus-tank","god-is-good","sola-gratia-bodycon","sola-gratia-longsleeve"] },
      { label: "Regular Fit",          sub: "Klassisch, ausgewogen", products: ["jesus-polo","jesus-taped-mesh","trust-god-loose"] },
      { label: "Boxy / locker",        sub: "Modern, entspannt",     products: ["i-see-god","the-answer","faith-makes-new","christ-is-enough","he-is-love","heart-cross","acts-16-3"] },
      { label: "Oversized",             sub: "Maximal Statement",     products: ["saved-by-grace","eagle-wings","power-of-jesus","be-the-reason","contrast-plaid-zip"] }
    ]
  },
  {
    q: "Welche Farbwelt zieht dich an?",
    options: [
      { label: "Weiß & Creme",       sub: "Hell, clean, leicht",    products: ["jesus-polo","i-see-god","christ-is-enough","faith-makes-new","jesus-tank","jesus-crop"] },
      { label: "Schwarz / Anthrazit", sub: "Dunkel, edgy",            products: ["he-is-love","heart-cross","be-the-reason","power-of-jesus","contrast-plaid-zip"] },
      { label: "Erdtöne / Vintage",  sub: "Washed, warm, retro",     products: ["trust-in-god","trust-god-loose","saved-by-grace","jesus-taped-mesh"] },
      { label: "Bunt-Accents",        sub: "Mit etwas Farbe drauf",   products: ["god-is-good","sola-gratia-bodycon","sola-gratia-sweat","eagle-wings","faith-sweatpants","acts-16-3"] }
    ]
  },
  {
    q: "Wo trägst du Lightwear am liebsten?",
    options: [
      { label: "Alltag / Uni / Job",  sub: "Daily-Vibes",               products: ["jesus-polo","i-see-god","trust-god-loose","faith-makes-new","heart-cross","trust-in-god"] },
      { label: "Worship / Gemeinde", sub: "Sonntag-Mode",              products: ["sola-gratia-sweat","sola-gratia-longsleeve","christ-is-enough","acts-16-3","eagle-wings"] },
      { label: "Konzert / Drop-Event", sub: "Wenn man auffallen will", products: ["jesus-polo","be-the-reason","saved-by-grace","power-of-jesus","jesus-tank"] },
      { label: "Sport / Outdoor",     sub: "Aktiv, locker",            products: ["faith-sweatpants","jesus-tank","jesus-crop","contrast-plaid-zip","god-is-good"] }
    ]
  },
  {
    q: "Wie laut soll dein Statement sein?",
    options: [
      { label: "Subtil",     sub: "Kleines Detail, leise Botschaft", products: ["jesus-polo","jesus-crop","trust-in-god","trust-god-loose"] },
      { label: "Sichtbar",   sub: "Klare Botschaft, normaler Print", products: ["i-see-god","faith-makes-new","christ-is-enough","faith-sweatpants","sola-gratia-bodycon"] },
      { label: "Bold",       sub: "Großer Schriftzug, mutig",       products: ["the-answer","god-is-good","he-is-love","heart-cross","jesus-tank","acts-16-3"] },
      { label: "Maximal",    sub: "Volles Statement-Piece",          products: ["be-the-reason","saved-by-grace","power-of-jesus","eagle-wings","contrast-plaid-zip"] }
    ]
  },
  {
    q: "Welcher Vers spricht zu dir am meisten?",
    options: [
      { label: "John 8:12",     sub: "I am the Light of the World",     products: ["jesus-polo","i-see-god","jesus-tank","jesus-crop","jesus-taped-mesh"] },
      { label: "Matthäus 5:14", sub: "Ihr seid das Licht der Welt",     products: ["he-is-love","christ-is-enough","trust-god-loose","faith-makes-new"] },
      { label: "Psalm 139",     sub: "Du kennst mich",                  products: ["i-see-god","trust-in-god","sola-gratia-bodycon","sola-gratia-longsleeve"] },
      { label: "Galater 2:20",  sub: "Christus lebt in mir",            products: ["the-answer","christ-is-enough","saved-by-grace","power-of-jesus","be-the-reason"] }
    ]
  }
];

function initFindYourFit(){
  const root = document.getElementById("quiz-root");
  if (!root) return;
  let step = -1; // -1 = Intro
  const answers = {};
  const scores = {};

  function start(){ step = 0; render(); }

  function pick(qIdx, optIdx){
    answers[qIdx] = optIdx;
    const opt = QUIZ_QUESTIONS[qIdx].options[optIdx];
    opt.products.forEach(pid => { scores[pid] = (scores[pid] || 0) + 1; });
    step++;
    setTimeout(render, 150);
  }

  function goBack(){
    if (step <= 0) return;
    step--;
    // Punkte vom letzten Schritt rückgängig
    const prev = answers[step];
    if (prev !== undefined){
      QUIZ_QUESTIONS[step].options[prev].products.forEach(pid => { scores[pid] = Math.max(0, (scores[pid]||0) - 1); });
      delete answers[step];
    }
    render();
  }

  function topProducts(n=6){
    return Object.entries(scores)
      .sort((a,b) => b[1] - a[1])
      .slice(0, n)
      .map(([id]) => getProduct(id))
      .filter(Boolean);
  }

  function getTags(){
    const tags = [];
    if (answers[1] === 0) tags.push("Bodycon");
    if (answers[1] === 2 || answers[1] === 3) tags.push("Boxy");
    if (answers[2] === 0) tags.push("Hell");
    if (answers[2] === 1) tags.push("Dunkel");
    if (answers[2] === 2) tags.push("Erdtöne");
    if (answers[3] === 1) tags.push("Worship");
    if (answers[3] === 2) tags.push("Statement");
    if (answers[3] === 3) tags.push("Sport");
    if (answers[4] === 0) tags.push("Subtil");
    if (answers[4] === 3) tags.push("Maximal");
    return tags.slice(0, 5);
  }

  function render(){
    // Intro
    if (step === -1){
      root.innerHTML = `
        <div class="quiz-intro">
          <span class="eyebrow">Find Your Fit</span>
          <h1>Dein <em>Style</em>, in 6 Fragen</h1>
          <p>Wir stellen dir ein paar Fragen — du klickst, was zu dir passt. Am Ende bekommst du eine handverlesene Auswahl von Pieces, die zu deinem Vibe passen.</p>
          <div class="quiz-perks">
            <div class="quiz-perk">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              ~ 90 Sekunden
            </div>
            <div class="quiz-perk">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-4.5-9.3-9C1 9 2.5 5 6 5c2 0 3.5 1 4 2.5 3-3 9-3 9 2.5 0 2.5-1.5 5-7 11Z"/></svg>
              6 Produkte für dich
            </div>
            <div class="quiz-perk">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="m9 12 2 2 4-4"/></svg>
              Anonym, ohne Anmeldung
            </div>
          </div>
          <button class="btn btn-primary" id="quiz-start">Los geht's</button>
        </div>`;
      document.getElementById("quiz-start").addEventListener("click", start);
      return;
    }

    // Result
    if (step >= QUIZ_QUESTIONS.length){
      const picks = topProducts(6);
      const tags = getTags();
      root.innerHTML = `
        <div class="quiz-result-hero">
          <span class="eyebrow">Deine Auswahl</span>
          <h1>Das ist <em>dein</em> Vibe</h1>
          <p>Basierend auf deinen Antworten — sechs Pieces, die zu dir passen könnten.</p>
          ${tags.length ? `<div class="quiz-result-tags">${tags.map(t => `<span class="quiz-result-tag">${t}</span>`).join("")}</div>` : ""}
        </div>
        <div class="quiz-result-grid" id="quiz-grid"></div>
        <div class="quiz-result-actions">
          <a href="shop.html" class="btn btn-primary">Alle Produkte</a>
          <button class="btn btn-outline" id="quiz-restart">Quiz neu starten</button>
        </div>`;
      const grid = document.getElementById("quiz-grid");
      grid.innerHTML = picks.map(cardHTML).join("");
      bindAddButtons(grid);
      document.getElementById("quiz-restart").addEventListener("click", () => {
        step = -1;
        Object.keys(answers).forEach(k => delete answers[k]);
        Object.keys(scores).forEach(k => delete scores[k]);
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      return;
    }

    // Question
    const Q = QUIZ_QUESTIONS[step];
    const segments = QUIZ_QUESTIONS.map((_, i) =>
      `<span class="seg ${i < step ? "done" : i === step ? "current" : ""}"></span>`
    ).join("");
    root.innerHTML = `
      <div class="quiz-step">
        <div class="quiz-progress">${segments}</div>
        <div class="quiz-question-num">Frage ${step + 1} von ${QUIZ_QUESTIONS.length}</div>
        <h2 class="quiz-question">${Q.q}</h2>
        <div class="quiz-options" id="quiz-opts">
          ${Q.options.map((o, i) => `
            <button class="quiz-option" data-i="${i}">
              <span class="qo-label">${o.label}</span>
              ${o.sub ? `<span class="qo-sub">${o.sub}</span>` : ""}
            </button>`).join("")}
        </div>
        <div class="quiz-controls">
          <button class="quiz-back" id="quiz-back" ${step === 0 ? "style='visibility:hidden'" : ""}>← Zurück</button>
          <span style="font-size:.78rem; color:var(--ink-soft)">Wähle eine Option zum Fortfahren</span>
        </div>
      </div>`;
    document.querySelectorAll(".quiz-option").forEach(b => b.addEventListener("click", () => {
      b.classList.add("selected");
      pick(step, parseInt(b.dataset.i, 10));
    }));
    document.getElementById("quiz-back").addEventListener("click", goBack);
  }

  render();
}

/* ---------- Seite: Geschenkkarte ---------- */
function initGeschenkkarte(){
  const root = document.getElementById("gc-root");
  if (!root) return;
  const state = { amount: 50, recipient: "", from: "", message: "" };

  function genGiftCode(){
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "GIFT-";
    for (let i = 0; i < 8; i++) code += chars[Math.floor((hashStr("g"+i+(state.recipient||"r")+(state.from||"f")+state.amount) + i) % chars.length)];
    return code;
  }

  function renderForm(){
    root.innerHTML = `
      <div class="gc-hero">
        <span class="eyebrow">Verschenke Licht</span>
        <h1>Eine <em>Geschenkkarte</em><br>als Botschaft</h1>
        <p>Ideal für Geburtstage, Konfirmation, Taufe oder einfach so. Der Beschenkte sucht sich aus, was zu ihm passt.</p>
      </div>

      <div class="gc-grid">
        <!-- Form -->
        <form class="gc-form" id="gc-form" onsubmit="return false">
          <h3>1 · Wert auswählen</h3>
          <div class="gc-amount-grid">
            <button type="button" class="gc-amount ${state.amount===25?"active":""}" data-amount="25">25 €</button>
            <button type="button" class="gc-amount ${state.amount===50?"active":""}" data-amount="50">50 €</button>
            <button type="button" class="gc-amount ${state.amount===75?"active":""}" data-amount="75">75 €</button>
            <button type="button" class="gc-amount ${state.amount===100?"active":""}" data-amount="100">100 €</button>
          </div>
          <input type="number" class="gc-custom" id="gc-custom" placeholder="… oder eigener Betrag (€)" min="10" max="500" value="${![25,50,75,100].includes(state.amount)?state.amount:""}">

          <h3 style="margin-top:24px">2 · Empfänger</h3>
          <label class="gc-label" for="gc-recipient">Name des Empfängers</label>
          <input class="gc-input" id="gc-recipient" placeholder="z. B. Lisa" value="${state.recipient}">

          <label class="gc-label" for="gc-from">Von (dein Name)</label>
          <input class="gc-input" id="gc-from" placeholder="z. B. Tom" value="${state.from}">

          <label class="gc-label" for="gc-message">Persönliche Nachricht (optional)</label>
          <textarea class="gc-textarea" id="gc-message" placeholder="z. B. Alles Liebe zum Geburtstag. ✨" maxlength="200">${state.message}</textarea>

          <button class="btn btn-primary gc-submit" id="gc-submit">Geschenkkarte erstellen</button>
        </form>

        <!-- Live-Vorschau -->
        <div class="gc-preview-wrap">
          <div class="gc-card">
            <div class="gc-card-head">
              <span class="gc-brand">LIGHTWEAR<small>Collective</small></span>
              <span class="gc-tag">Gift Card</span>
            </div>
            <div class="gc-amount-display" id="gc-amount-display">${money(state.amount)}</div>
            <div class="gc-bottom">
              <div class="gc-recipient" id="gc-recipient-display">${state.recipient ? `Für ${state.recipient}` : "Für …"}</div>
              <div class="gc-message" id="gc-message-display">${state.message || "Deine Nachricht erscheint hier."}</div>
              <div class="gc-verse">„I am the light of the world." — John 8:12</div>
            </div>
          </div>

          <div class="gc-perks">
            <div class="gc-perk">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
              <div>Direkt per E-Mail — kein Versand nötig.</div>
            </div>
            <div class="gc-perk">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              <div>3 Jahre einlösbar — kein Druck.</div>
            </div>
            <div class="gc-perk">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M3 12h18M8 8V5a4 4 0 0 1 8 0v3"/></svg>
              <div>Sicher per Code-Einlösung im Warenkorb.</div>
            </div>
            <div class="gc-perk">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 21s-7-7-7-12a7 7 0 1 1 14 0c0 5-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>
              <div>Frei kombinierbar mit Sale-Pieces.</div>
            </div>
          </div>
        </div>
      </div>`;

    // Event-Handler
    root.querySelectorAll(".gc-amount").forEach(b => b.addEventListener("click", () => {
      state.amount = parseInt(b.dataset.amount, 10);
      root.querySelector("#gc-custom").value = "";
      updateLive();
    }));
    root.querySelector("#gc-custom").addEventListener("input", (e) => {
      const v = parseInt(e.target.value, 10);
      if (!isNaN(v) && v > 0){
        state.amount = v;
        root.querySelectorAll(".gc-amount").forEach(x => x.classList.remove("active"));
      }
      updateLive();
    });
    root.querySelector("#gc-recipient").addEventListener("input", (e) => { state.recipient = e.target.value; updateLive(); });
    root.querySelector("#gc-from").addEventListener("input", (e) => { state.from = e.target.value; });
    root.querySelector("#gc-message").addEventListener("input", (e) => { state.message = e.target.value; updateLive(); });
    root.querySelector("#gc-submit").addEventListener("click", submit);
  }

  function updateLive(){
    const amt = root.querySelector("#gc-amount-display");
    const rec = root.querySelector("#gc-recipient-display");
    const msg = root.querySelector("#gc-message-display");
    if (amt) amt.textContent = money(state.amount);
    if (rec) rec.textContent = state.recipient ? `Für ${state.recipient}` : "Für …";
    if (msg) msg.textContent = state.message || "Deine Nachricht erscheint hier.";
    // Bei Custom-Input die Buttons toggeln
    root.querySelectorAll(".gc-amount").forEach(b => {
      b.classList.toggle("active", parseInt(b.dataset.amount, 10) === state.amount);
    });
  }

  function submit(){
    if (state.amount < 10){
      alert("Bitte einen Mindestbetrag von 10 € wählen.");
      return;
    }
    const code = genGiftCode();
    addGiftCard(code, state.amount);
    renderSuccess(code);
  }

  function renderSuccess(code){
    root.innerHTML = `
      <div class="gc-success">
        <div class="check-circle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12l5 5L20 7"/></svg>
        </div>
        <span class="eyebrow" style="margin:14px 0 4px; display:inline-block">Geschenkkarte erstellt</span>
        <h2>Frohes Schenken! 🎁</h2>
        <p>Hier ist die Geschenkkarte über <strong>${money(state.amount)}</strong>${state.recipient?` für <strong>${state.recipient}</strong>`:""}. Du kannst sie ausdrucken, weiterleiten oder den Code direkt im Warenkorb einlösen.</p>

        <div class="gc-card" style="margin-top:24px">
          <div class="gc-card-head">
            <span class="gc-brand">LIGHTWEAR<small>Collective</small></span>
            <span class="gc-tag">Gift Card</span>
          </div>
          <div class="gc-amount-display">${money(state.amount)}</div>
          <div class="gc-bottom">
            <div class="gc-recipient">${state.recipient ? `Für ${state.recipient}` : "Für dich"}${state.from?` · von ${state.from}`:""}</div>
            <div class="gc-message">${state.message || ""}</div>
            <div class="gc-verse">„I am the light of the world." — John 8:12</div>
          </div>
        </div>

        <p style="margin-top:28px">Dein Einlöse-Code (klicken zum Kopieren):</p>
        <div class="gc-code-box" id="gc-code-box">${code}</div>
        <p style="font-size:.85rem">Demo-Hinweis: Die Geschenkkarte wurde nur lokal angelegt — der Code kann sofort im Warenkorb verwendet werden.</p>

        <div class="actions">
          <a href="shop.html" class="btn btn-primary">Jetzt shoppen</a>
          <button class="btn btn-outline" id="gc-new">Weitere Karte erstellen</button>
        </div>
      </div>`;
    const box = root.querySelector("#gc-code-box");
    box.addEventListener("click", () => {
      navigator.clipboard?.writeText(code);
      const orig = box.textContent;
      box.textContent = "✓ Kopiert!";
      setTimeout(() => box.textContent = orig, 1500);
    });
    root.querySelector("#gc-new").addEventListener("click", () => { renderForm(); window.scrollTo({top:0, behavior:"smooth"}); });
  }

  renderForm();
}

/* ============================================================
   STICKY-BUY-BAR auf PDP
   ============================================================ */
function initStickyBuy(p){
  // Wenn schon existiert → entfernen + Klasse zurücksetzen
  document.getElementById("sticky-buy-bar")?.remove();
  document.body.classList.remove("sticky-buy-active");
  const bar = document.createElement("div");
  bar.id = "sticky-buy-bar"; bar.className = "sticky-buy-bar";
  const priceHTML = p.originalPrice
    ? `<span style="color:#c43">${money(p.price)}</span><span class="old">${money(p.originalPrice)}</span>`
    : money(p.price);
  bar.innerHTML = `
    <a class="sb-media" href="#top"><img src="${p.img}" alt=""></a>
    <div class="sb-info">
      <div class="sb-name">${p.name}</div>
      <div class="sb-price">${priceHTML}</div>
    </div>
    <div class="sb-sizes">
      ${SIZES.map(s => {
        const stock = getStock(p.id, s);
        const dis = stock === 0 ? "disabled" : "";
        return `<button class="sb-size" data-sb-size="${s}" ${dis}>${s}</button>`;
      }).join("")}
    </div>
    <button class="btn btn-primary" id="sb-add">In den Warenkorb</button>
  `;
  document.body.appendChild(bar);

  // Initial verfügbare Größe auswählen
  let size = "M";
  const firstAvail = bar.querySelector(".sb-size:not(:disabled)");
  if (firstAvail){ firstAvail.classList.add("active"); size = firstAvail.dataset.sbSize; }
  bar.querySelectorAll("[data-sb-size]:not(:disabled)").forEach(b => b.addEventListener("click", () => {
    bar.querySelectorAll(".sb-size").forEach(x => x.classList.remove("active"));
    b.classList.add("active"); size = b.dataset.sbSize;
  }));
  bar.querySelector("#sb-add").addEventListener("click", () => {
    flyToCart(document.getElementById("pdp-main-img"));
    addToCart(p.id, size, 1);
    if (typeof openDrawer === "function") setTimeout(openDrawer, 850);
  });

  // Anzeigen, wenn Haupt-Buy-Button NICHT im Viewport ist
  const mainAdd = document.getElementById("pdp-add");
  if (mainAdd && "IntersectionObserver" in window){
    const obs = new IntersectionObserver(entries => {
      const visible = entries[0].isIntersecting;
      bar.classList.toggle("show", !visible);
      document.body.classList.toggle("sticky-buy-active", !visible);
    }, { threshold: 0 });
    obs.observe(mainAdd);
  }
}

/* ============================================================
   BEWERTUNG SCHREIBEN (mit Foto-Upload)
   ============================================================ */
const USER_REVIEWS_KEY = "lw_user_reviews_v1";
function loadUserReviews(){ try { return JSON.parse(localStorage.getItem(USER_REVIEWS_KEY) || "{}"); } catch(e){ return {}; } }
function saveUserReview(productId, review){
  const all = loadUserReviews();
  if (!all[productId]) all[productId] = [];
  all[productId].unshift(review);
  try { localStorage.setItem(USER_REVIEWS_KEY, JSON.stringify(all)); } catch(e){
    // Quota voll? Letzte Photos kürzen
    all[productId].forEach(r => { if (r.photos) r.photos = []; });
    try { localStorage.setItem(USER_REVIEWS_KEY, JSON.stringify(all)); } catch(e2){}
  }
}
function getUserReviewsFor(productId){ return loadUserReviews()[productId] || []; }

function openWriteReview(productId){
  const p = getProduct(productId); if (!p) return;
  const m = ensureModal();
  const state = { stars: 5, title: "", text: "", author: "", photos: [] };
  document.querySelector(".modal").classList.add("review-modal");
  document.getElementById("modal-body").innerHTML = `
    <div class="review-modal-head">
      <h2>Bewertung schreiben</h2>
      <p>für ${p.name}</p>
    </div>
    <div class="review-form-body">
      <div>
        <label>Sterne</label>
        <div class="stars-picker" id="sp">
          ${[1,2,3,4,5].map(i => `<button type="button" data-star="${i}" class="${i<=state.stars?"active":""}"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.3 5.8 21l1.7-7L2 9.2l7.2-.6L12 2l2.8 6.6 7.2.6-5.5 4.8 1.7 7Z"/></svg></button>`).join("")}
        </div>
      </div>
      <div>
        <label for="rv-title">Titel</label>
        <input type="text" id="rv-title" placeholder="In einem Satz – z. B. „Mega Qualität"" maxlength="60">
      </div>
      <div>
        <label for="rv-text">Deine Erfahrung</label>
        <textarea id="rv-text" placeholder="Erzähl, was dir gefällt …" maxlength="800"></textarea>
      </div>
      <div>
        <label for="rv-author">Name</label>
        <input type="text" id="rv-author" placeholder="Wie sollen wir dich anzeigen?" maxlength="40" value="${getAccount()?.name || ""}">
      </div>
      <div>
        <label>Fotos (optional)</label>
        <div class="photo-upload">
          <label class="photo-upload-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.5"/><path d="M8 6V4h8v2"/></svg>
            Foto hinzufügen
            <input type="file" id="rv-photo" accept="image/*" multiple>
          </label>
          <div class="photo-preview-wrap" id="rv-previews"></div>
        </div>
      </div>
      <div class="review-submit-row">
        <button class="btn btn-outline" id="rv-cancel">Abbrechen</button>
        <button class="btn btn-primary" id="rv-submit">Bewertung absenden</button>
      </div>
    </div>`;
  // Sterne-Picker
  document.querySelectorAll("#sp [data-star]").forEach(b => b.addEventListener("click", () => {
    state.stars = parseInt(b.dataset.star, 10);
    document.querySelectorAll("#sp [data-star]").forEach(x => x.classList.toggle("active", parseInt(x.dataset.star,10) <= state.stars));
  }));
  // Foto-Upload
  const fileInput = document.getElementById("rv-photo");
  const previews = document.getElementById("rv-previews");
  function renderPreviews(){
    previews.innerHTML = state.photos.map((src, i) => `
      <div class="photo-preview">
        <img src="${src}" alt="">
        <button type="button" data-rm="${i}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 6 12 12M18 6 6 18"/></svg></button>
      </div>`).join("");
    previews.querySelectorAll("[data-rm]").forEach(b => b.addEventListener("click", () => {
      state.photos.splice(parseInt(b.dataset.rm,10), 1);
      renderPreviews();
    }));
  }
  fileInput.addEventListener("change", () => {
    const files = Array.from(fileInput.files || []).slice(0, 3 - state.photos.length);
    files.forEach(f => {
      // Bild auf 600px skalieren für localStorage
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxW = 600;
          const scale = Math.min(1, maxW / img.width);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
          state.photos.push(canvas.toDataURL("image/jpeg", 0.8));
          renderPreviews();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(f);
    });
    fileInput.value = "";
  });
  document.getElementById("rv-cancel").addEventListener("click", closeModal);
  document.getElementById("rv-submit").addEventListener("click", () => {
    const title = document.getElementById("rv-title").value.trim();
    const text = document.getElementById("rv-text").value.trim();
    const author = document.getElementById("rv-author").value.trim() || "Anonym";
    if (!title || !text){
      alert("Bitte Titel und Erfahrung ausfüllen.");
      return;
    }
    saveUserReview(productId, {
      stars: state.stars, title, text, author,
      photos: state.photos,
      date: new Date().toISOString(),
      isCustomer: true
    });
    closeModal();
    // Reviews-Sektion neu rendern
    rerenderReviews(productId);
  });
  m.classList.add("open");
  document.body.style.overflow = "hidden";
  document.querySelector(".modal").classList.add("review-modal");
}

function rerenderReviews(productId){
  const root = document.getElementById("pdp-reviews");
  if (!root) return;
  const p = getProduct(productId); if (!p) return;
  const generated = getReviewsFor(p.id);
  const userReviews = getUserReviewsFor(p.id);
  // Kombinieren: User-Reviews zuerst
  const allReviews = userReviews.map(r => ({
    ...r,
    daysAgo: Math.floor((Date.now() - new Date(r.date)) / 86400000),
    title: r.title, text: r.text, author: r.author, stars: r.stars
  })).concat(generated.reviews);
  const totalCount = userReviews.length + generated.count;
  const avgSum = allReviews.reduce((a,r) => a + r.stars, 0);
  const avg = avgSum / allReviews.length;

  const fmtDate = (daysAgo) => {
    const d = new Date(); d.setDate(d.getDate() - daysAgo);
    return d.toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
  };

  // Foto-Galerie aus User-Reviews
  const allPhotos = userReviews.flatMap(r => (r.photos || []).map(src => ({ src, reviewTitle: r.title })));
  const photoGalleryHTML = allPhotos.length
    ? `<div style="margin-bottom:18px"><h3 style="font-size:.78rem; letter-spacing:.14em; text-transform:uppercase; color:var(--ink-soft); margin-bottom:10px;">Kunden-Fotos (${allPhotos.length})</h3>
       <div class="review-photo-gallery">
         ${allPhotos.map(p => `<div class="rpg-item"><img src="${p.src}" alt=""></div>`).join("")}
       </div></div>`
    : "";

  root.innerHTML = `
    <div class="section-head"><div><span class="eyebrow">Was Kund:innen sagen</span><h2>Bewertungen</h2></div></div>
    <div class="review-summary">
      <div>
        <div class="review-score">${avg.toFixed(1)}</div>
        <div class="review-score-row">
          <span class="review-stars">${starsSVG(Math.round(avg), 5, 18)}</span>
          <span class="review-count">${totalCount} Bewertungen</span>
        </div>
      </div>
      <p style="color:var(--ink-soft); max-width:46ch; font-size:.95rem">
        Bewertungen kommen von verifizierten Käufer:innen. Vielen Dank für euer Vertrauen.
      </p>
    </div>
    <div class="write-review-row">
      <p style="color:var(--ink-soft); font-size:.92rem; margin:0">Hast du das Piece selbst getragen?</p>
      <button class="write-review-btn" id="open-write-review">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
        Bewertung schreiben
      </button>
    </div>
    ${photoGalleryHTML}
    <div class="review-list">
      ${allReviews.map(r => {
        const photos = r.photos || [];
        const hasPhoto = photos.length > 0;
        return `<article class="review-item ${hasPhoto?"has-photo":""} ${r.isCustomer?"is-customer":""}">
          ${hasPhoto ? `<div class="review-photos">${photos.map(src => `<div class="review-photo-thumb"><img src="${src}" alt=""></div>`).join("")}</div>` : ""}
          <div>
            <div class="review-stars-sm">${starsSVG(r.stars, 5, 14)}</div>
            <div class="review-head">
              <span class="review-name">${r.author}${r.isCustomer ? `<span class="customer-badge">Verified</span>` : ""}</span>
              <span class="review-date">${fmtDate(r.daysAgo || 0)}</span>
            </div>
            <h4 style="font-weight:600; margin-bottom:6px">${r.title}</h4>
            <p class="review-text">${r.text}</p>
          </div>
        </article>`;
      }).join("")}
    </div>`;
  document.getElementById("open-write-review")?.addEventListener("click", () => openWriteReview(p.id));
}

/* ============================================================
   ERINNERE-MICH-SYSTEM (Drops)
   ============================================================ */
const REMINDERS_KEY = "lw_reminders_v1";
function loadReminders(){ try { return JSON.parse(localStorage.getItem(REMINDERS_KEY) || "{}"); } catch(e){ return {}; } }
function saveReminders(obj){ try { localStorage.setItem(REMINDERS_KEY, JSON.stringify(obj)); } catch(e){} }
function hasReminder(dropKey){ return !!loadReminders()[dropKey]; }
function addReminder(dropKey, data){
  const rem = loadReminders();
  rem[dropKey] = { ...data, savedAt: new Date().toISOString() };
  saveReminders(rem);
}
function removeReminder(dropKey){
  const rem = loadReminders();
  delete rem[dropKey];
  saveReminders(rem);
}

function openRemindMe(dropKey, dropTitle, dropDate){
  const m = ensureModal();
  document.querySelector(".modal").classList.add("remind-modal");
  const pushSupported = "Notification" in window;
  const pushAllowed = pushSupported && Notification.permission === "granted";

  document.getElementById("modal-body").innerHTML = `
    <div class="remind-head">
      <span class="eyebrow">${dropTitle}</span>
      <h2>Wir erinnern <em>dich</em></h2>
      <p>Wie willst du erinnert werden, wenn ${dropDate ? "der Drop am " + dropDate : "der Drop"} live geht?</p>
    </div>
    <div class="remind-body">
      <div class="remind-options">
        <button class="remind-option" data-method="email">
          <div class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></div>
          <div class="ro-info">
            <strong>Per E-Mail</strong>
            <span>Wir schicken dir eine kurze Mail kurz vor dem Drop.</span>
          </div>
        </button>
        <button class="remind-option ${!pushSupported?"disabled":""}" data-method="push" ${!pushSupported?"disabled":""}>
          <div class="ro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 2h16zM10 22a2 2 0 1 0 4 0"/></svg></div>
          <div class="ro-info">
            <strong>Browser-Benachrichtigung</strong>
            <span>${pushSupported ? (pushAllowed ? "Direkt auf deinem Gerät." : "Wir fragen kurz nach der Erlaubnis.") : "Dein Browser unterstützt das nicht."}</span>
          </div>
        </button>
      </div>
      <div id="remind-form-area"></div>
    </div>`;

  const formArea = document.getElementById("remind-form-area");
  const options = document.querySelectorAll(".remind-option:not(.disabled)");

  options.forEach(b => b.addEventListener("click", () => {
    options.forEach(x => x.classList.remove("selected"));
    b.classList.add("selected");
    const method = b.dataset.method;
    if (method === "email") showEmailForm();
    if (method === "push") activatePush();
  }));

  function showEmailForm(){
    const acc = getAccount();
    formArea.innerHTML = `
      <div class="remind-form">
        <input type="email" id="remind-email" placeholder="Deine E-Mail-Adresse" value="${acc?.email || ""}" required>
        <div class="actions">
          <button class="btn btn-outline" id="remind-cancel">Abbrechen</button>
          <button class="btn btn-primary" id="remind-submit">Erinnern</button>
        </div>
      </div>`;
    document.getElementById("remind-cancel").addEventListener("click", () => {
      formArea.innerHTML = "";
      options.forEach(x => x.classList.remove("selected"));
    });
    document.getElementById("remind-submit").addEventListener("click", () => {
      const email = document.getElementById("remind-email").value.trim();
      if (!email || !email.includes("@")){
        alert("Bitte eine gültige E-Mail-Adresse eingeben.");
        return;
      }
      addReminder(dropKey, { method: "email", email, dropTitle, dropDate });
      showSuccess("email", email);
    });
  }

  function activatePush(){
    if (Notification.permission === "granted"){
      saveAndDemoPush();
    } else if (Notification.permission === "denied"){
      formArea.innerHTML = `<p style="font-size:.85rem; color:#c43; text-align:center; padding:14px 0;">Browser-Benachrichtigungen sind blockiert. Bitte aktivier sie in den Browser-Einstellungen oder nimm die E-Mail-Option.</p>`;
    } else {
      Notification.requestPermission().then(perm => {
        if (perm === "granted"){
          saveAndDemoPush();
        } else {
          formArea.innerHTML = `<p style="font-size:.85rem; color:var(--ink-soft); text-align:center; padding:14px 0;">Schade — du kannst die E-Mail-Option nutzen.</p>`;
        }
      });
    }
  }

  function saveAndDemoPush(){
    addReminder(dropKey, { method: "push", dropTitle, dropDate });
    // Demo: kleine Test-Notification senden, damit der User sieht dass es geht
    try {
      new Notification("Lightwear · Erinnerung aktiv ✨", {
        body: `Wir benachrichtigen dich, sobald ${dropTitle} live geht.`,
        icon: location.origin + "/images/logo.png",
        badge: location.origin + "/images/logo.png"
      });
    } catch(e){}
    showSuccess("push");
  }

  function showSuccess(method, email){
    document.getElementById("modal-body").innerHTML = `
      <div class="remind-body">
        <div class="remind-success">
          <div class="check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12l5 5L20 7"/></svg></div>
          <h3>Erinnerung aktiv</h3>
          <p>${method === "email"
            ? `Wir melden uns rechtzeitig bei <strong>${email}</strong>, wenn <strong>${dropTitle}</strong> live geht.`
            : `Du bekommst eine Browser-Benachrichtigung, sobald <strong>${dropTitle}</strong> live geht.`}</p>
          <button class="btn btn-primary" id="remind-close">Verstanden</button>
        </div>
      </div>`;
    document.getElementById("remind-close").addEventListener("click", () => {
      closeModal();
      // Drops neu rendern damit der "aktiv"-Status erscheint
      if (typeof initDrops === "function") initDrops();
    });
  }

  m.classList.add("open");
  document.body.style.overflow = "hidden";
}

/* ============================================================
   LIVE SOCIAL-PROOF POPUPS
   ============================================================ */
const PROOF_NAMES = ["Jakob","Lena","Tobi","Mara","Niklas","Sophie","Hannah","Paul","Mia","David","Emma","Felix","Linus","Clara","Jonas","Helena","Simon","Maja","Luca","Pia"];
const PROOF_CITIES = ["Berlin","München","Hamburg","Köln","Frankfurt","Stuttgart","Düsseldorf","Leipzig","Dresden","Hannover","Nürnberg","Bremen","Münster","Karlsruhe","Mainz","Freiburg","Bonn","Zürich","Wien","Salzburg"];

let _proofShown = 0;
const PROOF_MAX_PER_SESSION = 6;
const PROOF_HIDE_PAGES = ["cart","bestellung","konto","bundle","geschenkkarte","find-your-fit"];

function maskedName(name){
  // Initiale am Ende: "Jakob B."
  return name + " " + String.fromCharCode(65 + (hashStr(name) % 26)) + ".";
}

function showSocialProof(){
  const page = document.body.dataset.page;
  if (PROOF_HIDE_PAGES.includes(page)) return;
  if (_proofShown >= PROOF_MAX_PER_SESSION) return;
  // Nicht stacken — vorhandenes Popup entfernen
  document.getElementById("social-proof")?.remove();

  const rand = (n) => Math.floor(Math.random() * n);
  const name = maskedName(PROOF_NAMES[rand(PROOF_NAMES.length)]);
  const city = PROOF_CITIES[rand(PROOF_CITIES.length)];
  const product = PRODUCTS[rand(PRODUCTS.length)];
  if (!product) return;
  const minutes = 1 + rand(28);

  const el = document.createElement("div");
  el.id = "social-proof"; el.className = "social-proof";
  el.innerHTML = `
    <button class="sp-close" aria-label="Schließen">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 6 12 12M18 6 6 18"/></svg>
    </button>
    <a class="sp-img" href="produkt.html?id=${product.id}"><img src="${product.img}" alt=""></a>
    <div class="sp-text">
      <div class="sp-name">${name} aus ${city}</div>
      <div class="sp-info">hat ${product.name.split(" ").slice(0,3).join(" ")} gekauft</div>
      <div class="sp-time">vor ${minutes} Min.</div>
    </div>`;
  document.body.appendChild(el);
  _proofShown++;
  // Reinschieben
  setTimeout(() => el.classList.add("show"), 60);
  // Auto-Hide nach 6 Sek
  const autoHide = setTimeout(hide, 6000);
  el.querySelector(".sp-close").addEventListener("click", () => { clearTimeout(autoHide); hide(); });
  function hide(){
    el.classList.remove("show");
    setTimeout(() => el.remove(), 600);
  }
}

function scheduleSocialProof(){
  // Erstes Popup nach 3–5 Sekunden
  setTimeout(() => {
    showSocialProof();
    function loop(){
      // 30–55 Sek Pause
      setTimeout(() => { showSocialProof(); loop(); }, 30000 + Math.random() * 25000);
    }
    loop();
  }, 3000 + Math.random() * 2000);
}

/* ============================================================
   LIVE-BESUCHER-ZÄHLER (PDP)
   ============================================================ */
function getViewerBase(productId){
  // Beliebte Produkte (im Bestseller) haben mehr Viewer
  const popular = BESTSELLER_IDS.includes(productId) ? 8 : 0;
  return 7 + (hashStr(productId) % 14) + popular; // 7–28 + Bestseller-Boost
}
function getViewerCount(productId){
  const base = getViewerBase(productId);
  // Variance über Zeit (Sinuswelle mit langer Periode + kurzes Jitter)
  const slow = Math.sin(Date.now() / 25000 + hashStr(productId)) * 3;
  const jitter = Math.floor((Date.now() / 8000) % 5) - 2;
  return Math.max(2, Math.round(base + slow + jitter));
}

function initViewerCounter(p){
  const root = document.getElementById("pdp");
  if (!root) return;
  if (root.querySelector(".viewer-counter")) return;
  const priceEl = root.querySelector(".pdp-price");
  if (!priceEl) return;

  const el = document.createElement("div");
  el.className = "viewer-counter";
  const initialCount = getViewerCount(p.id);
  el.innerHTML = `
    <span class="vc-flame">🔥</span>
    <span class="vc-num">${initialCount}</span>
    <span class="vc-text">Personen schauen sich das gerade an</span>`;
  // Nach Light-Points-Hinweis bzw. nach Preis einfügen
  const lpHint = root.querySelector(".lp-hint");
  (lpHint || priceEl).after(el);

  // Alle 6–10 Sek aktualisieren
  let lastCount = initialCount;
  function tick(){
    const newCount = getViewerCount(p.id);
    if (newCount !== lastCount){
      const numEl = el.querySelector(".vc-num");
      numEl.textContent = newCount;
      numEl.classList.remove("bump"); void numEl.offsetWidth; numEl.classList.add("bump");
      lastCount = newCount;
    }
    setTimeout(tick, 6000 + Math.random() * 4000);
  }
  setTimeout(tick, 6000);
}

/* ============================================================
   COMPARE PIECES — Produkt-Vergleich
   ============================================================ */
const COMPARE_KEY = "lw_compare_v1";
const COMPARE_MAX = 4;

function loadCompare(){ try { return JSON.parse(localStorage.getItem(COMPARE_KEY) || "[]"); } catch(e){ return []; } }
function saveCompare(list){ try { localStorage.setItem(COMPARE_KEY, JSON.stringify(list)); } catch(e){} renderCompareBar(); }
function isInCompare(id){ return loadCompare().includes(id); }
function toggleCompare(id){
  const list = loadCompare();
  const i = list.indexOf(id);
  if (i >= 0) list.splice(i, 1);
  else {
    if (list.length >= COMPARE_MAX){
      alert(`Du kannst max. ${COMPARE_MAX} Produkte gleichzeitig vergleichen. Entferne erst eines.`);
      return false;
    }
    list.push(id);
  }
  saveCompare(list);
  return list.includes(id);
}
function clearCompare(){ saveCompare([]); }

function renderCompareBar(){
  const list = loadCompare();
  let bar = document.getElementById("compare-bar");
  if (!list.length){
    if (bar) bar.classList.remove("show");
    return;
  }
  if (!bar){
    bar = document.createElement("div");
    bar.id = "compare-bar"; bar.className = "compare-bar";
    bar.innerHTML = `
      <span class="count" id="cb-count"></span>
      <span class="label">Produkte zum Vergleich</span>
      <button class="btn-light" id="cb-open">Vergleichen</button>
      <button class="clear" id="cb-clear" title="Liste leeren">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 6 12 12M18 6 6 18"/></svg>
      </button>`;
    document.body.appendChild(bar);
    bar.querySelector("#cb-open").addEventListener("click", openCompareModal);
    bar.querySelector("#cb-clear").addEventListener("click", () => clearCompare());
  }
  bar.querySelector("#cb-count").textContent = list.length;
  setTimeout(() => bar.classList.add("show"), 50);
}

function openCompareModal(){
  const m = ensureModal();
  const list = loadCompare();
  const items = list.map(getProduct).filter(Boolean);

  if (!items.length){
    document.getElementById("modal-body").innerHTML = `
      <div class="empty-state" style="padding:50px 30px 30px;">
        <div class="es-illu">
          <div class="es-ring"></div>
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round">
            <rect x="15" y="35" width="30" height="40" rx="2" fill="rgba(28,27,24,.04)"/>
            <rect x="15" y="35" width="30" height="40" rx="2"/>
            <rect x="55" y="25" width="30" height="50" rx="2" fill="rgba(28,27,24,.04)"/>
            <rect x="55" y="25" width="30" height="50" rx="2"/>
            <path d="M50 15v75" stroke-dasharray="3 4" opacity=".4" stroke-width="1.8"/>
          </svg>
        </div>
        <span class="es-eyebrow">Vergleich</span>
        <h2>Bisher <em>leer</em></h2>
        <p>Auf einer Produktseite kannst du Pieces zum Vergleich hinzufügen — bis zu vier auf einmal.</p>
        <div class="es-actions">
          <a href="shop.html" class="btn btn-primary">Zum Shop</a>
        </div>
      </div>`;
    document.querySelector(".modal").classList.add("compare-modal");
    m.classList.add("open");
    document.body.style.overflow = "hidden";
    return;
  }

  // Specs-Felder, die wir vergleichen
  const SPEC_KEYS = ["Material","Stoffgewicht","Passform","Fit","Schnitt","Ausschnitt","Kragen","Stil"];

  document.getElementById("modal-body").innerHTML = `
    <div class="compare-head">
      <div>
        <h2>Vergleich</h2>
        <p>${items.length} Pieces side-by-side. Max. ${COMPARE_MAX} gleichzeitig.</p>
      </div>
    </div>
    <div class="compare-grid">
      ${items.map(p => {
        const rev = getReviewsFor(p.id);
        const specs = (p.specs || []).reduce((a,s) => (a[s.label] = s.value, a), {});
        return `<div class="compare-col">
          <div class="cc-media">
            <img src="${p.img}" alt="">
            <button class="cc-remove" data-cc-rm="${p.id}" aria-label="Entfernen">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 6 12 12M18 6 6 18"/></svg>
            </button>
          </div>
          <div class="cc-name">${p.name}</div>
          <div class="cc-meta">${p.category}</div>
          <div class="cc-price">${money(p.price)}${p.originalPrice?`<span class="old">${money(p.originalPrice)}</span>`:""}</div>
          <div class="cc-stars"><span class="stars">${starsSVG(Math.round(rev.avg),5,13)}</span> ${rev.avg.toFixed(1)} (${rev.count})</div>
          <dl>
            ${SPEC_KEYS.map(k => {
              const v = specs[k];
              if (!v) return "";
              return `<dt>${k}</dt><dd>${v}</dd>`;
            }).join("")}
          </dl>
          <a href="produkt.html?id=${p.id}" class="btn btn-outline" style="margin-top:auto; display:block; text-align:center;">Produkt ansehen</a>
        </div>`;
      }).join("")}
    </div>`;
  document.querySelector(".modal").classList.add("compare-modal");
  document.querySelectorAll("[data-cc-rm]").forEach(b => b.addEventListener("click", () => {
    toggleCompare(b.dataset.ccRm);
    openCompareModal(); // re-render
  }));
  m.classList.add("open");
  document.body.style.overflow = "hidden";
}

/* ---------- Bildzoom auf PDP ---------- */
function initPDPZoom(){
  const main = document.querySelector(".pdp-main");
  const img  = document.getElementById("pdp-main-img");
  if (!main || !img) return;
  if (window.matchMedia("(max-width:760px)").matches) return;
  let lens = main.querySelector(".zoom-lens");
  if (!lens){ lens = document.createElement("div"); lens.className = "zoom-lens"; main.appendChild(lens); }
  function update(){ lens.style.backgroundImage = `url("${img.src}")`; }
  update();
  img.addEventListener("load", update);
  main.addEventListener("mousemove", (e) => {
    const r = main.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top)  / r.height) * 100;
    lens.style.backgroundPosition = `${x}% ${y}%`;
  });
}

/* ============================================================
   RESTOCK-ALERT (E-Mail oder Push wenn Größe wieder da)
   ============================================================ */
const RESTOCK_KEY = "lw_restock_alerts_v1";
function loadRestocks(){ try { return JSON.parse(localStorage.getItem(RESTOCK_KEY) || "[]"); } catch(e){ return []; } }
function saveRestocks(a){ try { localStorage.setItem(RESTOCK_KEY, JSON.stringify(a)); } catch(e){} }
function hasRestockAlert(productId, size){
  return loadRestocks().some(r => r.productId === productId && r.size === size);
}
function addRestockAlert(data){
  const all = loadRestocks();
  all.push({...data, savedAt: new Date().toISOString()});
  saveRestocks(all);
}
function removeRestockAlert(productId, size){
  saveRestocks(loadRestocks().filter(r => !(r.productId === productId && r.size === size)));
}

function openRestockAlert(productId, productName, currentSize){
  // Account-E-Mail vorausfüllen
  let prefillEmail = "";
  try {
    const acc = JSON.parse(localStorage.getItem("lw_account_v1") || "null");
    if(acc?.email) prefillEmail = acc.email;
  } catch(e){}

  const sizes = ["XS","S","M","L","XL","XXL"];
  let selectedSize = currentSize || "M";
  let mode = null; // "email" | "push"

  const bg = document.createElement("div");
  bg.className = "sa-modal-bg";

  function render(){
    const existing = hasRestockAlert(productId, selectedSize);
    bg.innerHTML = `
      <div class="sa-modal">
        <div class="sa-head">
          <h3>${existing ? '✓ Restock-Alert aktiv' : '🔔 Bei Restock benachrichtigen'}</h3>
          <button class="sa-close" type="button" aria-label="Schließen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="m6 6 12 12M18 6 6 18"/></svg>
          </button>
        </div>
        <div class="sa-body">
          <p style="color:var(--ink-soft);font-size:.9rem;margin:0 0 18px">${existing ? `Du wirst informiert sobald <strong style="color:var(--ink)">${escapeHtmlS(productName)}</strong> in Größe <strong>${selectedSize}</strong> wieder da ist.` : `Wähle deine Größe und Benachrichtigungs-Weg — wir sagen dir Bescheid sobald <strong style="color:var(--ink)">${escapeHtmlS(productName)}</strong> wieder verfügbar ist.`}</p>

          <div style="margin-bottom:18px">
            <p style="font-size:.78rem;text-transform:uppercase;letter-spacing:.1em;color:var(--ink-soft);margin:0 0 10px;font-weight:600">Größe</p>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${sizes.map(s => `
                <button class="size-btn ${s===selectedSize?'active':''}" data-restock-size="${s}" style="padding:8px 14px;border:1.5px solid ${s===selectedSize?'var(--ink)':'var(--line)'};background:${s===selectedSize?'var(--ink)':'transparent'};color:${s===selectedSize?'var(--bg)':'var(--ink)'};border-radius:8px;font-weight:600;cursor:pointer;font-family:inherit">${s}</button>
              `).join("")}
            </div>
          </div>

          ${existing ? `
            <div style="background:#e6f3e9;border:1px solid #9ad9a4;border-radius:10px;padding:14px 16px;margin-bottom:14px;display:flex;align-items:center;gap:10px">
              <svg viewBox="0 0 24 24" fill="none" stroke="#2f7a3e" stroke-width="2" width="20" height="20"><path d="m5 12 5 5L20 7"/></svg>
              <div style="flex:1;font-size:.88rem;color:#266531"><strong>Aktiv für Größe ${selectedSize}</strong></div>
              <button class="btn btn-outline" id="restock-remove" type="button" style="padding:6px 14px;font-size:.82rem">Abmelden</button>
            </div>
          ` : `
            <p style="font-size:.78rem;text-transform:uppercase;letter-spacing:.1em;color:var(--ink-soft);margin:0 0 10px;font-weight:600">Benachrichtigung per</p>
            <div style="display:grid;gap:8px;margin-bottom:14px">
              <button type="button" class="restock-choice ${mode==='email'?'sel':''}" data-mode="email" style="display:flex;align-items:center;gap:12px;background:#fff;border:2px solid ${mode==='email'?'var(--ink)':'var(--line)'};border-radius:12px;padding:12px 16px;cursor:pointer;text-align:left;font-family:inherit">
                <span style="font-size:1.3rem">📧</span>
                <div style="flex:1"><strong>E-Mail</strong><br><small style="color:var(--ink-soft)">Mail an deine Adresse</small></div>
              </button>
              <button type="button" class="restock-choice ${mode==='push'?'sel':''}" data-mode="push" style="display:flex;align-items:center;gap:12px;background:#fff;border:2px solid ${mode==='push'?'var(--ink)':'var(--line)'};border-radius:12px;padding:12px 16px;cursor:pointer;text-align:left;font-family:inherit">
                <span style="font-size:1.3rem">🔔</span>
                <div style="flex:1"><strong>Browser-Push</strong><br><small style="color:var(--ink-soft)">Sofort-Benachrichtigung auf diesem Gerät</small></div>
              </button>
            </div>
            ${mode === 'email' ? `
              <div style="margin-bottom:14px">
                <input type="email" id="restock-email" value="${escapeHtmlS(prefillEmail)}" placeholder="deine@email.de" style="width:100%;padding:11px 14px;border:1.5px solid var(--line);border-radius:8px;font-family:inherit;font-size:.95rem">
              </div>
            ` : ''}
          `}
        </div>
        ${existing ? '' : `
          <div class="sa-foot">
            <button class="btn btn-outline" id="restock-cancel" type="button">Abbrechen</button>
            <button class="btn btn-primary" id="restock-save" type="button" ${mode ? '' : 'disabled style="opacity:.4;cursor:not-allowed"'}>Erinnerung aktivieren</button>
          </div>
        `}
      </div>
    `;

    bg.querySelectorAll("[data-restock-size]").forEach(b => b.addEventListener("click", () => { selectedSize = b.dataset.restockSize; render(); }));
    bg.querySelectorAll("[data-mode]").forEach(b => b.addEventListener("click", () => { mode = b.dataset.mode; render(); }));
    bg.querySelector(".sa-close").addEventListener("click", () => bg.remove());
    bg.addEventListener("click", e => { if(e.target === bg) bg.remove(); });
    const cancelBtn = bg.querySelector("#restock-cancel");
    if(cancelBtn) cancelBtn.addEventListener("click", () => bg.remove());
    const removeBtn = bg.querySelector("#restock-remove");
    if(removeBtn) removeBtn.addEventListener("click", () => {
      removeRestockAlert(productId, selectedSize);
      bg.remove();
      if(typeof toast === "function") toast("✓ Erinnerung abgemeldet");
    });

    const saveBtn = bg.querySelector("#restock-save");
    if(saveBtn) saveBtn.addEventListener("click", async () => {
      if(!mode){ return; }
      const data = {productId, productName, size: selectedSize, type: mode};
      if(mode === "email"){
        const email = bg.querySelector("#restock-email").value.trim();
        if(!email.includes("@")){ alert("Bitte gültige E-Mail eingeben"); return; }
        data.email = email;
      } else if(mode === "push"){
        if(!("Notification" in window)){ alert("Browser-Benachrichtigungen werden nicht unterstützt"); return; }
        if(Notification.permission !== "granted"){
          const perm = await Notification.requestPermission();
          if(perm !== "granted"){ alert("Bitte erlaube Benachrichtigungen um diese Option zu nutzen"); return; }
        }
        new Notification("Lightwear · Erinnerung aktiv", { body: `${productName} (Größe ${selectedSize}) — wir sagen dir Bescheid wenn wieder da. ✨`, icon: "images/logo.png" });
      }
      addRestockAlert(data);
      bg.innerHTML = `
        <div class="sa-modal">
          <div class="sa-body" style="text-align:center;padding:36px 26px">
            <div style="width:72px;height:72px;margin:0 auto 16px;border-radius:50%;background:#e6f3e9;display:grid;place-items:center;animation:checkPop .5s var(--ease)">
              <svg viewBox="0 0 24 24" fill="none" stroke="#2f7a3e" stroke-width="2.5" width="36" height="36"><path d="m5 12 5 5L20 7"/></svg>
            </div>
            <h3 style="font-family:var(--f-display);font-size:1.5rem;margin:0 0 8px">Erinnerung aktiv</h3>
            <p style="color:var(--ink-soft);font-size:.92rem;margin:0 0 22px">Sobald <strong style="color:var(--ink)">${escapeHtmlS(productName)}</strong> in Größe <strong>${selectedSize}</strong> wieder da ist, sagen wir dir Bescheid.</p>
            <button class="btn btn-primary" id="restock-done" type="button" style="width:100%">Verstanden</button>
          </div>
        </div>
      `;
      bg.querySelector("#restock-done").addEventListener("click", () => bg.remove());
    });
  }
  render();
  document.body.appendChild(bg);
}

function escapeHtmlS(s){
  return String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

/* ============================================================
   AR-BODY-PREVIEW (Mockup-Vorschau)
   ============================================================ */
/* ============================================================
   LIMITED-EDITION + PRE-ORDER Anzeige auf PDP
   ============================================================ */
function injectLimitedAndPreorder(){
  const productSlug = new URLSearchParams(location.search).get("id");
  if(!productSlug) return;

  // PDP-Container muss existieren — sonst retry
  const info = document.querySelector(".pdp-info");
  if(!info){
    setTimeout(injectLimitedAndPreorder, 200);
    return;
  }

  // Bereits injiziert? → skip
  if(info.querySelector(".lim-edition-badge") || info.querySelector(".preorder-badge")) return;

  // Produktdaten: Overrides + Extras + Base merged
  let overrides = {}, extras = [];
  try { overrides = JSON.parse(localStorage.getItem("lw_product_overrides_v1") || "{}"); } catch(e){}
  try { extras = JSON.parse(localStorage.getItem("lw_product_extras_v1") || "[]"); } catch(e){}
  const base = (window.PRODUCTS || []).find(p => p.id === productSlug);
  const extra = extras.find(p => p.id === productSlug);
  const product = {...(base || extra || {}), ...(overrides[productSlug] || {})};

  if(!product || !product.name){
    console.warn("[Pre-Order] Produkt nicht gefunden für id:", productSlug);
    return;
  }

  console.log("[Pre-Order/Limited] product:", {
    id: productSlug,
    preorder: product.preorder,
    preorderDate: product.preorderDate,
    preorderDiscount: product.preorderDiscount,
    limitedEdition: product.limitedEdition,
    editionSize: product.editionSize,
    editionSold: product.editionSold
  });

  // === LIMITED-EDITION-BADGE
  if(product.limitedEdition === true){
    const total = parseInt(product.editionSize, 10) || 200;
    const sold = parseInt(product.editionSold, 10) || 0;
    const remaining = Math.max(0, total - sold);
    const next = Math.min(total, sold + 1);
    const badge = document.createElement("div");
    badge.className = "lim-edition-badge";
    badge.style.cssText = "background:linear-gradient(135deg,#f5d76e 0%,#d4af37 50%,#b8941f 100%);color:#1a1a1a;padding:14px 18px;border-radius:10px;margin:14px 0;display:flex;align-items:center;gap:14px;box-shadow:0 4px 14px rgba(212,175,55,.35),inset 0 1px 0 rgba(255,255,255,.4);position:relative;overflow:hidden";
    badge.innerHTML = `
      <span style="font-size:1.8rem;filter:drop-shadow(0 1px 2px rgba(0,0,0,.15));position:relative;z-index:1">🏆</span>
      <div style="flex:1;position:relative;z-index:1">
        <div style="font-family:'Anton',sans-serif;font-size:1.05rem;letter-spacing:.06em;line-height:1.1">LIMITED EDITION</div>
        <div style="font-size:.8rem;margin-top:3px;font-weight:500">Stück <strong>#${next}</strong> von <strong>${total}</strong> · noch <strong>${remaining}</strong> verfügbar</div>
        <div style="background:rgba(26,26,26,.2);height:5px;border-radius:99px;margin-top:8px;overflow:hidden">
          <div style="width:${(sold/total*100).toFixed(1)}%;height:100%;background:#1a1a1a;border-radius:99px"></div>
        </div>
      </div>
    `;
    const priceEl = info.querySelector(".pdp-price");
    if(priceEl) priceEl.parentNode.insertBefore(badge, priceEl);
    else info.prepend(badge);

    if(remaining === 0){
      const cta = info.querySelector("#pdp-add");
      if(cta){ cta.disabled = true; cta.textContent = "Ausverkauft"; cta.style.opacity = ".5"; cta.style.cursor = "not-allowed"; }
    }
  }

  // === PRE-ORDER BANNER — auch ohne Datum (Fallback "Bald verfügbar")
  if(product.preorder === true){
    const hasDate = product.preorderDate && product.preorderDate.length > 4;
    let dateStr = "Bald verfügbar";
    if(hasDate){
      try {
        const d = new Date(product.preorderDate);
        if(!isNaN(d.getTime())){
          dateStr = d.toLocaleDateString("de-DE", {day:"numeric", month:"long", year:"numeric"});
        }
      } catch(e){}
    }
    const discount = parseInt(product.preorderDiscount, 10) || 0;

    const banner = document.createElement("div");
    banner.className = "preorder-badge";
    banner.style.cssText = "background:linear-gradient(135deg,#2c2a26 0%,#1a1a1a 100%);color:#f0eee8;padding:16px 20px;border-radius:10px;margin:14px 0;display:flex;align-items:center;gap:14px;border:2px solid #d4af37;box-shadow:0 4px 14px rgba(212,175,55,.25)";
    banner.innerHTML = `
      <span style="font-size:1.9rem;filter:drop-shadow(0 1px 2px rgba(0,0,0,.4))">📅</span>
      <div style="flex:1">
        <div style="font-family:'Anton',sans-serif;font-size:1.1rem;letter-spacing:.08em;line-height:1.1;color:#d4af37">PRE-ORDER</div>
        <div style="font-size:.88rem;margin-top:4px">${hasDate ? 'Voraussichtliche Lieferung: ' : ''}<strong>${dateStr}</strong></div>
        ${discount > 0 ? `<div style="font-size:.8rem;color:#d4af37;margin-top:4px;font-weight:600">−${discount}% Pre-Order Rabatt bereits im Preis enthalten</div>` : ''}
      </div>
    `;
    const priceEl = info.querySelector(".pdp-price");
    if(priceEl){
      priceEl.parentNode.insertBefore(banner, priceEl);
      // Preis mit Rabatt anzeigen
      if(discount > 0){
        const original = Number(product.price) || 0;
        const discounted = original * (1 - discount/100);
        priceEl.innerHTML = `<span style="text-decoration:line-through;color:var(--ink-soft);font-size:.72em;font-weight:400;margin-right:8px">${money(original)}</span><strong style="color:#b8941f">${money(discounted)}</strong>`;
      }
    } else {
      info.prepend(banner);
    }

    // CTA-Text + Style anpassen
    const cta = info.querySelector("#pdp-add");
    if(cta){
      cta.textContent = "Jetzt vorbestellen";
      cta.style.background = "linear-gradient(135deg,#b8941f,#d4af37)";
      cta.style.color = "#1a1a1a";
      cta.style.fontWeight = "700";
    }

    // Hinweis-Text unter Buttons
    const note = info.querySelector(".pdp-note");
    if(note && !info.querySelector(".preorder-note")){
      const extraNote = document.createElement("p");
      extraNote.className = "preorder-note";
      extraNote.style.cssText = "font-size:.78rem;color:var(--ink-soft);margin:6px 0 0;font-style:italic";
      extraNote.textContent = "🔐 Reservierung ist verbindlich. Abbuchung erst bei Versand.";
      note.parentNode.insertBefore(extraNote, note.nextSibling);
    }
  }
}

function injectARLauncher(){
  const sizeQuizBtn = document.querySelector("#open-size-quiz");
  if(!sizeQuizBtn || document.querySelector("#open-ar-preview")) return;
  const productSlug = new URLSearchParams(location.search).get("id");
  const product = (window.PRODUCTS || PRODUCTS || []).find(p => p.id === productSlug);
  if(!product) return;

  const btn = document.createElement("button");
  btn.id = "open-ar-preview";
  btn.className = "ar-launcher";
  btn.type = "button";
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v6m0 8v6M2 12h6m8 0h6M5.6 5.6l4.2 4.2m4.4 4.4 4.2 4.2M18.4 5.6l-4.2 4.2m-4.4 4.4-4.2 4.2"/></svg>
    Auf Körper-Mockup anschauen
  `;
  btn.addEventListener("click", () => openARPreview(product));
  sizeQuizBtn.parentNode.appendChild(btn);
}

function openARPreview(product){
  const bg = document.createElement("div");
  bg.className = "sa-modal-bg";

  const bodyTypes = [
    {key:"slim", label:"Slim", desc:"schlank"},
    {key:"average", label:"Average", desc:"durchschnittl."},
    {key:"athletic", label:"Athletic", desc:"sportlich"},
    {key:"broad", label:"Broad", desc:"breit"}
  ];
  const sizes = ["S","M","L","XL"];
  const heights = ["1,65 m","1,75 m","1,85 m","1,95 m"];

  const state = { body: "average", size: "M", height: "1,75 m" };
  const img = product.img || product.image || (product.gallery && product.gallery[0]) || "";

  function render(){
    bg.innerHTML = `
      <div class="ar-modal">
        <div class="sa-head">
          <h3>Auf Körper anschauen</h3>
          <button class="sa-close" type="button" aria-label="Schließen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="m6 6 12 12M18 6 6 18"/></svg>
          </button>
        </div>
        <div class="ar-body">
          <div class="ar-stage">
            <div class="ar-silhouette ${state.body}">
              <div class="ar-figure-head"></div>
              <div class="ar-body-shape">
                <div class="ar-product-overlay" style="background-image:url('${img}')"></div>
              </div>
            </div>
            <div class="ar-tag">${state.size} · ${state.height} · ${state.body}</div>
          </div>

          <div class="ar-controls">
            <div class="ar-control">
              <h5>Körpertyp</h5>
              <div class="ar-options">
                ${bodyTypes.map(b => `
                  <button class="ar-opt ${state.body===b.key?'active':''}" type="button" data-body="${b.key}">
                    <strong>${b.label}</strong><small>${b.desc}</small>
                  </button>
                `).join("")}
              </div>
            </div>
            <div class="ar-control">
              <h5>Größe</h5>
              <div class="ar-options">
                ${sizes.map(s => `
                  <button class="ar-opt ${state.size===s?'active':''}" type="button" data-size="${s}"><strong>${s}</strong></button>
                `).join("")}
              </div>
            </div>
            <div class="ar-control">
              <h5>Körpergröße</h5>
              <div class="ar-options">
                ${heights.map(h => `
                  <button class="ar-opt ${state.height===h?'active':''}" type="button" data-height="${h}"><strong>${h.split(" ")[0]}</strong></button>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
        <div class="sa-foot">
          <small style="color:var(--ink-soft);font-size:.78rem;align-self:center">📸 Demo-Mockup · zeigt ungefähren Fall</small>
          <button class="btn btn-primary" id="ar-add-btn" type="button">In den Warenkorb (${state.size})</button>
        </div>
      </div>
    `;
    bg.querySelector(".sa-close").addEventListener("click", () => bg.remove());
    bg.addEventListener("click", e => { if(e.target === bg) bg.remove(); });
    bg.querySelectorAll("[data-body]").forEach(b => b.addEventListener("click", () => { state.body = b.dataset.body; render(); }));
    bg.querySelectorAll("[data-size]").forEach(b => b.addEventListener("click", () => { state.size = b.dataset.size; render(); }));
    bg.querySelectorAll("[data-height]").forEach(b => b.addEventListener("click", () => { state.height = b.dataset.height; render(); }));
    bg.querySelector("#ar-add-btn").addEventListener("click", () => {
      if(typeof addToCart === "function") addToCart(product.id, state.size, 1);
      bg.remove();
      if(typeof toast === "function") toast("✓ " + product.name + " (Größe " + state.size + ") hinzugefügt");
    });
  }
  render();
  document.body.appendChild(bg);
}

/* ============================================================
   LIVE-CHAT-ÜBERGABE (Bot → Mitarbeiter)
   ============================================================ */
function injectChatHandover(){
  const chips = document.getElementById("chat-chips");
  if(!chips || document.querySelector(".chat-handover-btn")) return;

  const handover = document.createElement("button");
  handover.type = "button";
  handover.className = "chat-handover-btn";
  handover.innerHTML = `
    <span class="pulse"></span>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>
    Mit Mitarbeiter sprechen
  `;
  handover.addEventListener("click", triggerOperatorHandover);
  chips.parentNode.insertBefore(handover, chips);
}

/* ============================================================
   LIVE-CHAT SYSTEM (Storefront ↔ Admin via localStorage)
   ============================================================ */
const LIVE_CHAT_KEY = "lw_live_chat_v1";

function getLiveChatState(){
  try { return JSON.parse(localStorage.getItem(LIVE_CHAT_KEY)) || {conversations: [], active: null}; }
  catch(e){ return {conversations: [], active: null}; }
}
function saveLiveChatState(s){
  try { localStorage.setItem(LIVE_CHAT_KEY, JSON.stringify(s)); } catch(e){}
}
function getMyConversation(){
  const s = getLiveChatState();
  return s.active ? s.conversations.find(c => c.id === s.active) : null;
}

const OPERATOR_NAMES = ["Lukas","Sarah","Daniel","Mia","Tobi"];
let liveChatPollTimer = null;
let lastRenderedMessageCount = 0;

async function triggerOperatorHandoverSupabase(){
  const { addMsg, body, chipsHost, formEl, input } = window.__lwChat;
  // Handover-Button entfernen
  const handover = document.querySelector(".chat-handover-btn");
  if(handover) handover.remove();

  // Status-Box
  const sys = document.createElement("div");
  sys.style.cssText = "text-align:center;font-size:.75rem;color:var(--ink-soft);padding:10px 0;";
  sys.innerHTML = `<em>Ich verbinde dich jetzt mit einem Mitarbeiter <span class="chat-typing" style="display:inline-flex;vertical-align:middle;gap:3px;margin-left:6px"><span></span><span></span><span></span></span></em>`;
  body.appendChild(sys);
  body.scrollTop = body.scrollHeight;

  // User-Info aus Supabase Auth oder Account
  let customer = { name: "Gast", email: "" };
  try {
    if(typeof window.lwGetCurrentUser === "function"){
      const u = await window.lwGetCurrentUser();
      if(u){ customer = { name: u.user_metadata?.name || u.email.split("@")[0], email: u.email }; }
    }
  } catch(e){}
  if(customer.name === "Gast"){
    try {
      const acc = JSON.parse(localStorage.getItem("lw_account_v1") || "null");
      if(acc) customer = { name: acc.name || acc.firstName || "Konto-Kunde", email: acc.email||"" };
    } catch(e){}
  }

  // Conversation in Supabase erstellen
  let conv;
  try {
    conv = await window.lwCreateConversation(customer);
  } catch(err){
    sys.innerHTML = '⚠ Verbindung fehlgeschlagen — versuch es nochmal.';
    sys.style.color = "var(--ink-soft)";
    console.error("Conversation-Create Fehler:", err);
    return;
  }

  // Operator zuweisen
  const operator = OPERATOR_NAMES[Math.floor(Math.random() * OPERATOR_NAMES.length)];
  try {
    await window.lwUpdateConversation(conv.id, { operator });
  } catch(e){}

  // Greeting senden (als Operator)
  const greet = `Hey ${customer.name === "Gast" ? "" : customer.name}! 👋 Ich bin ${operator} vom Lightwear-Team. Wie kann ich dir helfen?`;
  try { await window.lwSendChatMessage(conv.id, "operator", greet, operator); } catch(e){}

  // Status-Indikator
  sys.innerHTML = `✓ Verbunden mit <strong style="color:#2f7a3e">${operator} vom Lightwear-Team</strong>`;
  sys.style.color = "#2f7a3e";

  // Begrüßung anzeigen
  addMsg(`<span class="op-name">${operator} · LIGHTWEAR-TEAM</span>${greet}`, "bot operator", true);

  // Header anpassen
  const head = document.querySelector("#chat-panel .chat-head");
  if(head){
    const avatar = head.querySelector(".avatar");
    if(avatar){ avatar.textContent = operator.charAt(0); avatar.style.background = "#2f7a3e"; }
    const strong = head.querySelector(".info strong");
    if(strong) strong.textContent = operator + " · Lightwear-Team";
    const span = head.querySelector(".info span");
    if(span){ span.textContent = "online · live"; span.style.color = "#2f7a3e"; }
  }

  // Chips
  chipsHost.innerHTML = '<button class="chat-chip" data-end-chat>Chat beenden</button>';
  chipsHost.querySelector("[data-end-chat]").addEventListener("click", () => endLiveChatSupabase(conv.id));

  // Modus aktivieren
  window.__lwLiveChatActive = true;
  window.__lwLiveConvId = conv.id;
  window.__lwSeenMessageIds = new Set();

  // Form-Handler ersetzen
  const newForm = formEl.cloneNode(true);
  formEl.parentNode.replaceChild(newForm, formEl);
  window.__lwChat.formEl = newForm;
  const newInput = newForm.querySelector("#chat-input");
  window.__lwChat.input = newInput;
  newInput.placeholder = "Nachricht an " + operator + "…";

  newForm.addEventListener("submit", async e => {
    e.preventDefault();
    const v = newInput.value.trim();
    if(!v) return;
    addMsg(v, "user");
    newInput.value = "";
    try {
      const m = await window.lwSendChatMessage(conv.id, "customer", v);
      if(m && m.id) window.__lwSeenMessageIds.add(m.id);
    } catch(err){ console.error("Send-Fehler:", err); }
  });

  // Realtime Subscribe für Operator-Antworten
  if(typeof window.lwSubscribeChat === "function"){
    window.__lwUnsubChat = window.lwSubscribeChat(conv.id, (msg) => {
      if(window.__lwSeenMessageIds.has(msg.id)) return;
      window.__lwSeenMessageIds.add(msg.id);
      if(msg.from_who === "operator"){
        addMsg(`<span class="op-name">${(msg.operator_name||operator)} · LIGHTWEAR-TEAM</span>${escapeHtmlS(msg.text)}`, "bot operator", true);
      } else if(msg.from_who === "system"){
        const sysMsg = document.createElement("div");
        sysMsg.style.cssText = "text-align:center;font-size:.75rem;color:var(--ink-soft);padding:8px 0;font-style:italic;";
        sysMsg.textContent = msg.text;
        body.appendChild(sysMsg);
        body.scrollTop = body.scrollHeight;
      }
    });
  }
}

async function endLiveChatSupabase(convId){
  try {
    await window.lwUpdateConversation(convId, { status: "closed" });
    await window.lwSendChatMessage(convId, "system", "Chat vom Kunden beendet.");
  } catch(e){}
  window.__lwLiveChatActive = false;
  if(window.__lwUnsubChat){ window.__lwUnsubChat(); window.__lwUnsubChat = null; }
  if(window.__lwChat?.chipsHost){
    window.__lwChat.chipsHost.innerHTML = `
      <button class="chat-chip" data-q="Wie lange dauert der Versand?">Versand</button>
      <button class="chat-chip" data-q="Wie ist eure Rückgabe?">Rückgabe</button>
      <button class="chat-chip" data-q="Welche Größe passt mir?">Größe</button>`;
  }
  const sys = document.createElement("div");
  sys.style.cssText = "text-align:center;font-size:.75rem;color:var(--ink-soft);padding:10px 0;";
  sys.textContent = "🔒 Chat beendet.";
  window.__lwChat?.body.appendChild(sys);
}

async function triggerOperatorHandover(){
  if(!window.__lwChat) return;
  // Wenn Supabase verfügbar → echter Realtime-Chat
  if(typeof window.lwCreateConversation === "function"){
    return triggerOperatorHandoverSupabase();
  }
  const { addMsg, body, chipsHost, formEl, input } = window.__lwChat;

  // Button entfernen
  const handover = document.querySelector(".chat-handover-btn");
  if(handover) handover.remove();

  // Direkte Nachricht (nicht mehr „soll ich verbinden?")
  const sys = document.createElement("div");
  sys.style.cssText = "text-align:center;font-size:.75rem;color:var(--ink-soft);padding:10px 0;";
  sys.innerHTML = `<em>Ich verbinde dich jetzt mit einem Mitarbeiter <span class="chat-typing" style="display:inline-flex;vertical-align:middle;gap:3px;margin-left:6px"><span></span><span></span><span></span></span></em>`;
  body.appendChild(sys);
  body.scrollTop = body.scrollHeight;

  // Conversation in localStorage starten
  const acc = (() => { try { return JSON.parse(localStorage.getItem("lw_account_v1") || "null"); } catch(e){ return null; }})();
  const customer = acc ? {name: acc.name || acc.firstName || "Konto-Kunde", email: acc.email||""} : {name: "Gast", email: ""};

  setTimeout(() => {
    const operator = OPERATOR_NAMES[Math.floor(Math.random() * OPERATOR_NAMES.length)];

    const state = getLiveChatState();
    const conv = {
      id: "conv_" + Math.random().toString(36).slice(2, 10),
      customer,
      startedAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      status: "active",
      operator,
      messages: [
        {from: "system", text: `Übergabe vom Bot an ${operator}`, time: new Date().toISOString()}
      ],
      unreadByAdmin: 1,
      unreadByCustomer: 0
    };
    state.conversations = (state.conversations||[]).concat(conv);
    state.active = conv.id;
    saveLiveChatState(state);

    // Status-Indikator updaten
    sys.innerHTML = `✓ Verbunden mit <strong style="color:#2f7a3e">${operator} vom Lightwear-Team</strong>`;
    sys.style.color = "#2f7a3e";

    // Erste Operator-Nachricht
    const greet = `Hey ${customer.name === "Gast" ? "" : customer.name}! 👋 Ich bin ${operator} vom Lightwear-Team. Wie kann ich dir helfen?`;
    addMsg(`<span class="op-name">${operator} · LIGHTWEAR-TEAM</span>${greet}`, "bot operator", true);
    conv.messages.push({from: "operator", text: greet, time: new Date().toISOString(), operator});
    saveLiveChatState(state);

    // Chat-Header anpassen
    const head = document.querySelector("#chat-panel .chat-head");
    if(head){
      const avatar = head.querySelector(".avatar");
      if(avatar){ avatar.textContent = operator.charAt(0); avatar.style.background = "#2f7a3e"; }
      const strong = head.querySelector(".info strong");
      if(strong) strong.textContent = operator + " · Lightwear-Team";
      const span = head.querySelector(".info span");
      if(span){ span.textContent = "online · live"; span.style.color = "#2f7a3e"; }
    }

    // Chips entfernen — keine Bot-Chips mehr
    chipsHost.innerHTML = '<button class="chat-chip" data-end-chat>Chat beenden</button>';
    chipsHost.querySelector("[data-end-chat]").addEventListener("click", endLiveChat);

    // Modus aktivieren — Form-Handler wird ersetzt
    window.__lwLiveChatActive = true;
    lastRenderedMessageCount = conv.messages.length;

    // Form-Handler ersetzen
    const newForm = formEl.cloneNode(true);
    formEl.parentNode.replaceChild(newForm, formEl);
    window.__lwChat.formEl = newForm;
    const newInput = newForm.querySelector("#chat-input");
    window.__lwChat.input = newInput;
    newInput.placeholder = "Nachricht an " + operator + "…";
    newForm.addEventListener("submit", e => {
      e.preventDefault();
      const v = newInput.value.trim();
      if(!v) return;
      // Customer-Nachricht senden
      const s = getLiveChatState();
      const c = s.conversations.find(x => x.id === s.active);
      if(c){
        c.messages.push({from: "customer", text: v, time: new Date().toISOString()});
        c.lastActivity = new Date().toISOString();
        c.unreadByAdmin = (c.unreadByAdmin || 0) + 1;
        saveLiveChatState(s);
        addMsg(v, "user");
        lastRenderedMessageCount = c.messages.length;
      }
      newInput.value = "";
    });

    // Polling für Operator-Nachrichten starten
    startLiveChatPolling();
  }, 1600);
}

function startLiveChatPolling(){
  if(liveChatPollTimer) return;
  const poll = () => {
    if(!window.__lwLiveChatActive) return;
    const conv = getMyConversation();
    if(!conv){ return; }

    // Neue Operator-Nachrichten seit lastRenderedMessageCount
    if(conv.messages.length > lastRenderedMessageCount){
      const newMsgs = conv.messages.slice(lastRenderedMessageCount);
      newMsgs.forEach(m => {
        if(m.from === "operator"){
          const op = m.operator || conv.operator || "Team";
          window.__lwChat.addMsg(`<span class="op-name">${op} · LIGHTWEAR-TEAM</span>${m.text}`, "bot operator", true);
        } else if(m.from === "system"){
          const sys = document.createElement("div");
          sys.style.cssText = "text-align:center;font-size:.75rem;color:var(--ink-soft);padding:8px 0;font-style:italic;";
          sys.textContent = m.text;
          window.__lwChat.body.appendChild(sys);
          window.__lwChat.body.scrollTop = window.__lwChat.body.scrollHeight;
        }
      });
      lastRenderedMessageCount = conv.messages.length;
    }

    if(conv.status === "closed"){
      const sys = document.createElement("div");
      sys.style.cssText = "text-align:center;font-size:.75rem;color:var(--ink-soft);padding:10px 0;";
      sys.textContent = "🔒 Chat vom Team geschlossen — danke für deine Nachricht!";
      window.__lwChat.body.appendChild(sys);
      window.__lwChat.body.scrollTop = window.__lwChat.body.scrollHeight;
      stopLiveChatPolling();
      window.__lwLiveChatActive = false;
    }
  };
  liveChatPollTimer = setInterval(poll, 1500);
  // Cross-Tab Updates
  window.addEventListener("storage", e => {
    if(e.key === LIVE_CHAT_KEY) poll();
  });
}
function stopLiveChatPolling(){
  if(liveChatPollTimer){ clearInterval(liveChatPollTimer); liveChatPollTimer = null; }
}
function endLiveChat(){
  const s = getLiveChatState();
  const c = s.conversations.find(x => x.id === s.active);
  if(c){
    c.status = "closed";
    c.messages.push({from: "system", text: "Chat vom Kunden beendet.", time: new Date().toISOString()});
    saveLiveChatState(s);
  }
  window.__lwLiveChatActive = false;
  stopLiveChatPolling();
  if(window.__lwChat?.chipsHost){
    window.__lwChat.chipsHost.innerHTML = `
      <button class="chat-chip" data-q="Wie lange dauert der Versand?">Versand</button>
      <button class="chat-chip" data-q="Wie ist eure Rückgabe?">Rückgabe</button>
      <button class="chat-chip" data-q="Welche Größe passt mir?">Größe</button>`;
  }
  const sys = document.createElement("div");
  sys.style.cssText = "text-align:center;font-size:.75rem;color:var(--ink-soft);padding:10px 0;";
  sys.textContent = "🔒 Chat beendet. Bei weiteren Fragen schreib uns gerne wieder!";
  window.__lwChat?.body.appendChild(sys);
}

/* ---------- Admin-Overrides + Active-Filter auf PRODUCTS anwenden ---------- */
function applyAdminProductChanges(){
  let overrides = {}, extras = [];
  try { overrides = JSON.parse(localStorage.getItem("lw_product_overrides_v1") || "{}"); } catch(e){}
  try { extras = JSON.parse(localStorage.getItem("lw_product_extras_v1") || "[]"); } catch(e){}

  // 1. Overrides auf bestehende Produkte mergen
  for(let i = 0; i < PRODUCTS.length; i++){
    const ov = overrides[PRODUCTS[i].id];
    if(ov) PRODUCTS[i] = {...PRODUCTS[i], ...ov};
  }

  // 2. Admin-erstellte Extra-Produkte hinzufügen
  extras.forEach(e => {
    if(e && e.id && !PRODUCTS.find(p => p.id === e.id)){
      PRODUCTS.push(e);
    }
  });

  // 3. Inaktive (active === false) und gelöschte (deleted === true) Produkte entfernen
  for(let i = PRODUCTS.length - 1; i >= 0; i--){
    if(PRODUCTS[i].active === false || PRODUCTS[i].deleted){
      PRODUCTS.splice(i, 1);
    }
  }
}

/* ---------- Produkte aus Supabase nachladen (überschreibt PRODUCTS) ---------- */
async function loadProductsFromSupabase(){
  if(typeof window.lwGetProducts !== "function") return false;
  try {
    const list = await window.lwGetProducts();
    if(!list || list.length === 0) return false;
    // Mappe von snake_case zurück zu camelCase und überschreibe PRODUCTS
    const mapped = list.map(r => ({
      id: r.id,
      name: r.name,
      price: Number(r.price) || 0,
      compareAt: r.compare_at != null ? Number(r.compare_at) : undefined,
      category: r.category,
      meta: r.meta,
      desc: r.description,
      description: r.description,
      img: r.img,
      image: r.image,
      gallery: r.gallery,
      sizes: r.sizes || ["S","M","L","XL"],
      stock: r.stock ?? 50,
      active: r.active !== false,
      limitedEdition: !!r.limited_edition,
      editionSize: r.edition_size,
      editionSold: r.edition_sold,
      preorder: !!r.preorder,
      preorderDate: r.preorder_date,
      preorderDiscount: r.preorder_discount
    })).filter(p => p.active !== false);
    // PRODUCTS-Array in-place ersetzen
    PRODUCTS.length = 0;
    mapped.forEach(p => PRODUCTS.push(p));
    console.log("✓", mapped.length, "Produkte aus Supabase geladen");
    return true;
  } catch(err){
    console.warn("Supabase-Produkte konnten nicht geladen werden, nutze lokale:", err);
    return false;
  }
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", async () => {
  const page = document.body.dataset.page;
  // ADMIN-PANEL: keine Shop-Chrome (Chatbot, Pop-ups, Cookie-Banner etc.)
  if (page === "admin") return;
  // Versuche zuerst Produkte aus Supabase zu laden — falls leer oder Fehler, lokale Daten
  const supabaseLoaded = await loadProductsFromSupabase();
  // Admin-localStorage-Overrides nur anwenden wenn KEIN Supabase-Load (Fallback-Modus)
  if(!supabaseLoaded) applyAdminProductChanges();
  initChrome();
  // Admin-Settings prüfen für Chatbot/Social-Proof
  let _siteSettings = null;
  try { _siteSettings = JSON.parse(localStorage.getItem("lw_site_settings_v1") || "null"); } catch(e){}
  if (_siteSettings?.showChatbot !== false) { ensureChatWidget(); setTimeout(injectChatHandover, 300); }
  ensureCookieBanner();
  renderCompareBar();
  initPageTransitions();
  initHeroParallax();
  setTimeout(initLetterReveal, 50);
  setTimeout(initStatsCounter, 100);
  if (_siteSettings?.showSocialProof !== false) scheduleSocialProof();
  wireCartIcons();
  wireSearchIcons();
  if (page === "home")    initHome();
  if (page === "shop")    initShop();
  if (page === "product") { initProduct(); setTimeout(initPDPZoom, 50); setTimeout(injectLimitedAndPreorder, 100); }
  if (page === "cart")    initCart();
  if (page === "contact") initContact();
  if (page === "bestellung") initBestellung();
  if (page === "konto") initKonto();
  if (page === "drops") initDrops();
  if (page === "bundle") initBundle();
  if (page === "geschenkkarte") initGeschenkkarte();
  if (page === "find-your-fit") initFindYourFit();
  if (page === "about"){
    setTimeout(initBrandTimeline, 100);
    setTimeout(initCostBreakdownStandalone, 100);
  }
  // Recently Viewed Sektionen auf jeder Seite, falls vorhanden
  renderRecentlyViewed(document);
  // Newsletter-Popup nach 15s (nicht auf Bestellung/Konto/Bundle)
  if (!["cart","bestellung","konto","bundle","admin"].includes(page)){
    setTimeout(() => showNewsletterPopup(), 15000);
  }
  // Konto-Icon im Header soll zu konto.html führen
  document.querySelectorAll('.icon-btn[aria-label="Konto"]').forEach(b => {
    b.addEventListener("click", () => { location.href = "konto.html"; });
  });
});
