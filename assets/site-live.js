/* ==========================================================================
   SITE-LIVE — Wendet Admin-Einstellungen auf die echte Webseite an
   Wird auf JEDER Seite (außer Admin) geladen — VOR shop.js
   ========================================================================== */
(function(){
  "use strict";

  // Skip wenn Admin-Panel
  if(document.body && document.body.dataset.page === "admin") return;
  // Bevor Body existiert: lese trotzdem
  const isAdmin = location.pathname.endsWith("/admin.html") || location.pathname.endsWith("admin.html");
  if(isAdmin) return;

  // Debug-Console laden wenn ?debug=1 in URL
  if(location.search.includes("debug=1")){
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/eruda";
    s.onload = function(){ try { window.eruda && window.eruda.init(); console.log("[DEBUG] Eruda Console geladen — auf das grüne Icon unten rechts tippen!"); } catch(e){} };
    document.head.appendChild(s);
  }

  // ============ I18N — DE/EN Übersetzung ============
  const LANG_KEY = "lw_lang_v1";
  const currentLang = (() => { try { return localStorage.getItem(LANG_KEY) || "de"; } catch(e){ return "de"; } })();

  // Dictionary: deutscher Originaltext → englische Übersetzung
  const I18N = {
    // Navigation + Topbar
    "Shop": "Shop",
    "Drops": "Drops",
    "Bundle": "Bundle",
    "Style Finder": "Style Finder",
    "Geschenk": "Gift",
    "Lookbook": "Lookbook",
    "Über uns": "About us",
    "Suche": "Search",
    "Konto": "Account",
    "Warenkorb": "Cart",
    "Menü": "Menu",
    "Kostenloser Versand ab 50 €": "Free shipping over €50",
    "Faire Produktion": "Fair production",
    "30 Tage Rückgabe": "30-day returns",
    // CTAs
    "In den Warenkorb": "Add to cart",
    "Zur Kollektion": "Shop collection",
    "Alle Produkte": "All products",
    "Kollektion entdecken": "Discover collection",
    "Unsere Story": "Our story",
    "Zum Shop": "Visit shop",
    "Anmelden": "Sign up",
    "Weiter shoppen": "Continue shopping",
    "Verstanden": "Got it",
    "Schließen": "Close",
    "Mehr ansehen": "View more",
    "Ansehen": "View",
    "Anwenden": "Apply",
    "Speichern": "Save",
    "Abbrechen": "Cancel",
    "Bestellen": "Place order",
    "Sortieren": "Sort",
    // Headings
    "Bestseller": "Bestsellers",
    "Light in the Streets": "Light in the Streets",
    "Shop the Look": "Shop the Look",
    "Worn by the Community": "Worn by the Community",
    "Aus deiner Session": "From your session",
    "Zuletzt angesehen": "Recently viewed",
    "Werde Teil der Bewegung": "Join the movement",
    "Eine Botschaft, die man trägt": "A message you wear",
    "Mehr als Kleidung": "More than clothing",
    "Unsere Kollektion": "Our collection",
    "Sicher bezahlen": "Secure payment",
    // Tabs / Filter
    "Alle": "All",
    "T-Shirts": "T-Shirts",
    "Hoodies & Sweater": "Hoodies & Sweaters",
    "Hosen": "Pants",
    "Jacken": "Jackets",
    "Empfohlen": "Recommended",
    "Preis aufsteigend": "Price low to high",
    "Preis absteigend": "Price high to low",
    "Name A–Z": "Name A–Z",
    "Max. Preis": "Max. price",
    // Cart
    "Dein Warenkorb": "Your cart",
    "Warenkorb ist leer": "Your cart is empty",
    "Zwischensumme": "Subtotal",
    "Versand": "Shipping",
    "Gesamt": "Total",
    "Zur Kasse": "Checkout",
    "Gutschein einlösen": "Apply coupon",
    "Entfernen": "Remove",
    // Produktseite
    "Größe": "Size",
    "Menge": "Quantity",
    "Material": "Material",
    "Pflegehinweise": "Care instructions",
    "Welche Größe passt mir?": "Which size fits me?",
    "Bei Restock benachrichtigen": "Notify me on restock",
    "Bewertungen": "Reviews",
    "Beschreibung": "Description",
    "Details": "Details",
    "Das könnte dir auch gefallen": "You might also like",
    "Passt dazu": "Matches with",
    // Drops
    "Nächste Drops": "Next drops",
    "Erinnern lassen": "Notify me",
    "Erinnerung aktiv": "Reminder active",
    "Abmelden": "Unsubscribe",
    "Drop-Calendar": "Drop calendar",
    // Newsletter / Footer
    "Hilfe": "Help",
    "Über": "About",
    "Versand & Rückgabe": "Shipping & Returns",
    "Größentabelle": "Size chart",
    "FAQ": "FAQ",
    "Kontakt": "Contact",
    "Nachhaltigkeit": "Sustainability",
    "Next Drops": "Next drops",
    "Impressum": "Imprint",
    "Datenschutz": "Privacy",
    "AGB": "Terms",
    "Deine E-Mail-Adresse": "Your email address",
    "Anmelden & Code erhalten": "Sign up & get code",
    "Jederzeit abbestellbar.": "Unsubscribe anytime.",
    // Chatbot
    "Lightwear Support": "Lightwear Support",
    "online": "online",
    "Schreib uns…": "Write us…",
    "Senden": "Send",
    "Mit Mitarbeiter sprechen": "Talk to a person",
    "Chat beenden": "End chat",
    // Diverses
    "Treten Sie unserer Bewegung bei": "Join our movement",
    "Bio-Baumwolle": "Organic cotton",
    "John 8:12": "John 8:12"
  };

  function t(text){
    if(currentLang === "de") return text;
    if(!text) return text;
    const clean = String(text).trim();
    return I18N[clean] || text;
  }

  function applyTranslations(){
    if(currentLang === "de") return;
    // Whitelist von Selektoren für reine Text-Replacements
    const sels = [
      ".topbar", ".nav-links a", ".btn", "h1", "h2", "h3", "h4", "h5", "h6",
      ".eyebrow", ".lead", ".verse", ".pname a", ".pname", ".section-head .link",
      ".tab", ".footer-col h5", ".footer-col a", ".legal a", ".legal span",
      ".filter label", ".price-slider span", "label", "small", "p", "li",
      ".pdp-info .desc", ".pdp-note", ".pdp-related h2",
      ".size-quiz-question", ".chat-head .info strong", ".chat-head .info span",
      ".chat-chip", "#chat-input", ".news-form input", ".news-form button",
      ".community-cta p", ".trust-item h4", ".trust-item p",
      ".restock-trigger", ".sa-launcher", ".compare-trigger"
    ].join(",");

    document.querySelectorAll(sels).forEach(el => {
      // Nicht in Inputs mit Wert (placeholder ist OK)
      if(el.tagName === "INPUT" && el.value){ return; }
      // Nur ändern wenn nur Textknoten oder ein einfacher Inhalt
      if(el.children.length === 0){
        const txt = el.textContent.trim();
        const translated = t(txt);
        if(translated !== txt) el.textContent = translated;
      } else {
        // Bei verschachtelten Elementen: nur direkte Textknoten ändern
        el.childNodes.forEach(n => {
          if(n.nodeType === 3 && n.textContent.trim().length > 0){
            const txt = n.textContent.trim();
            const translated = t(txt);
            if(translated !== txt){
              n.textContent = n.textContent.replace(txt, translated);
            }
          }
        });
      }
    });

    // Placeholder + aria-label
    document.querySelectorAll("input[placeholder], button[aria-label], a[aria-label]").forEach(el => {
      const p = el.getAttribute("placeholder");
      if(p){
        const tr = t(p);
        if(tr !== p) el.setAttribute("placeholder", tr);
      }
      const al = el.getAttribute("aria-label");
      if(al){
        const tr = t(al);
        if(tr !== al) el.setAttribute("aria-label", tr);
      }
    });

    // <html lang> setzen
    document.documentElement.lang = "en";
  }

  function injectLangSwitcher(){
    const navActions = document.querySelector(".nav-actions");
    if(!navActions || document.getElementById("lang-switcher")) return;
    const btn = document.createElement("button");
    btn.id = "lang-switcher";
    btn.className = "icon-btn";
    btn.setAttribute("aria-label", "Sprache wechseln");
    btn.style.cssText = "font-weight:700;font-size:.72rem;letter-spacing:.08em;display:inline-flex;align-items:center;gap:4px";
    btn.innerHTML = `<span style="opacity:${currentLang==='de'?'1':'.45'}">DE</span><span style="opacity:.35">/</span><span style="opacity:${currentLang==='en'?'1':'.45'}">EN</span>`;
    btn.addEventListener("click", () => {
      const newLang = currentLang === "de" ? "en" : "de";
      try { localStorage.setItem(LANG_KEY, newLang); } catch(e){}
      location.reload();
    });
    // Vor dem Suche-Icon einfügen (erstes Element)
    navActions.insertBefore(btn, navActions.firstChild);
  }

  function load(key, fb){
    try { const v = JSON.parse(localStorage.getItem(key) || "null"); return v ?? fb; }
    catch(e){ return fb; }
  }

  const SETTINGS = load("lw_site_settings_v1", null);
  const THEME    = load("lw_site_theme_v1", null);
  const CONTENT  = load("lw_site_content_v1", null);

  // ============ MAINTENANCE MODE ============
  if(SETTINGS && SETTINGS.maintenance){
    // Sofort Overlay einfügen — auch wenn DOM noch nicht fertig ist
    document.addEventListener("DOMContentLoaded", showMaintenance);
    if(document.readyState !== "loading") showMaintenance();
    return;
  }

  function showMaintenance(){
    // Stoppe Scrolling, blende echte Seite aus
    document.documentElement.style.overflow = "hidden";
    const m = document.createElement("div");
    m.id = "lw-maintenance";
    m.innerHTML = `
      <style>
        #lw-maintenance{
          position:fixed; inset:0; z-index:999999;
          background:linear-gradient(135deg,#0f0f0f 0%,#1a1a1a 100%);
          color:#f6f5f1;
          display:flex; align-items:center; justify-content:center;
          font-family:'Inter',sans-serif;
          padding:24px; overflow-y:auto;
        }
        #lw-maintenance .mt-inner{
          max-width:540px; width:100%; text-align:center;
          animation: mtFade .6s cubic-bezier(.22,.61,.36,1);
        }
        @keyframes mtFade { from{opacity:0; transform:translateY(20px)} to{opacity:1; transform:none} }
        #lw-maintenance .mt-logo{
          font-family:'Anton',sans-serif; letter-spacing:.12em;
          font-size:1.1rem; margin-bottom:30px;
          opacity:.6;
        }
        #lw-maintenance .mt-icon{
          width:80px; height:80px; margin:0 auto 28px;
          border-radius:50%; background:rgba(255,255,255,.06);
          display:grid; place-items:center;
          animation: mtSpin 4s linear infinite;
        }
        @keyframes mtSpin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        #lw-maintenance .mt-icon svg{ width:36px; height:36px; }
        #lw-maintenance h1{
          font-family:'Anton',sans-serif;
          font-size:clamp(2rem, 6vw, 3rem);
          margin:0 0 16px; letter-spacing:.02em; line-height:1.1;
        }
        #lw-maintenance h1 em{ font-style:italic; color:#d4b870; font-family:'Cormorant Garamond',serif; font-weight:500; }
        #lw-maintenance p{
          color:#a8a59e; font-size:1rem; line-height:1.6;
          margin:0 0 28px;
        }
        #lw-maintenance .mt-verse{
          font-family:'Cormorant Garamond',serif; font-style:italic;
          color:#d4b870; font-size:1.1rem; margin:0 0 32px;
        }
        #lw-maintenance .mt-socials{ display:flex; gap:14px; justify-content:center; margin-bottom:30px; }
        #lw-maintenance .mt-socials a{
          width:40px; height:40px; border-radius:50%;
          background:rgba(255,255,255,.06);
          display:grid; place-items:center;
          color:#a8a59e; transition:all .2s;
        }
        #lw-maintenance .mt-socials a:hover{ background:rgba(255,255,255,.12); color:#fff; transform:translateY(-2px); }
        #lw-maintenance .mt-socials svg{ width:18px; height:18px; }
        #lw-maintenance .mt-admin{
          font-size:.75rem; color:#666;
          text-decoration:none;
          border:1px solid rgba(255,255,255,.1);
          padding:8px 16px; border-radius:99px;
          display:inline-block;
          transition:all .2s;
        }
        #lw-maintenance .mt-admin:hover{ color:#fff; border-color:rgba(255,255,255,.3); }
      </style>
      <div class="mt-inner">
        <div class="mt-logo">LIGHTWEAR COLLECTIVE</div>
        <div class="mt-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#d4b870" stroke-width="1.5">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
          </svg>
        </div>
        <h1>Wir kommen <em>gleich zurück</em></h1>
        <p>Unsere Webseite befindet sich gerade in Wartung. Wir basteln an etwas Neuem für dich. Schau bitte in Kürze wieder vorbei.</p>
        <div class="mt-verse">„Sei stille dem Herrn und warte auf ihn." — Psalm 37,7</div>
        <div class="mt-socials">
          <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
          <a href="#" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 4c1 3 3 4 5 4v3c-2 0-4-.7-5-1.6V15a5 5 0 1 1-5-5v3a2 2 0 1 0 2 2V4h3Z"/></svg></a>
          <a href="mailto:hello@lightwear.com" aria-label="E-Mail"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></a>
        </div>
        <a href="admin.html" class="mt-admin">Admin-Bereich</a>
      </div>
    `;
    document.body.appendChild(m);
  }

  // ============ THEME ============
  if(THEME){
    const bg = THEME.bg, ink = THEME.ink, accent = THEME.accent, sale = THEME.sale;
    const styleEl = document.createElement("style");
    styleEl.id = "lw-live-theme";
    styleEl.textContent = `
      :root {
        ${bg ? `--bg: ${bg} !important;` : ''}
        ${ink ? `--ink: ${ink} !important;` : ''}
      }
      ${bg ? `html, body { background: ${bg} !important; }` : ''}
      ${ink ? `body { color: ${ink} !important; }` : ''}
      ${ink ? `h1, h2, h3, h4, h5, h6, .nav-links a, .logo, .verse, .lead, p { color: ${ink}; }` : ''}
      ${accent ? `
        .btn-primary { background: ${accent} !important; color: ${bg || '#fff'} !important; border-color: ${accent} !important; }
        .btn-primary:hover { background: ${accent} !important; filter: brightness(1.15); }
        .topbar { background: ${accent} !important; color: ${bg || '#fff'} !important; }
        .cart-count { background: ${accent} !important; color: ${bg || '#fff'} !important; }
        .hotspot.open, .hotspot:hover { background: ${accent} !important; }
        .nav-links a::after { background: ${accent} !important; }
        .section-head .link { border-bottom-color: ${accent} !important; color: ${ink || accent}; }
        .pagination .active { background: ${accent} !important; color: ${bg || '#fff'} !important; }
        .badge-new, .badge-bestseller { background: ${accent} !important; color: ${bg || '#fff'} !important; }
      ` : ''}
      ${sale ? `
        .price-old, .badge-sale, .price.sale, .sale-pill, .badge-discount, .price-was, .strike-price, .save-badge {
          color: ${sale} !important;
        }
        .badge-sale, .sale-pill, .save-badge {
          background: ${sale} !important; color: #fff !important;
        }
      ` : ''}
      ${(bg && ink) ? `
        .card, .product-card, .panel { background: ${bg} !important; color: ${ink} !important; }
        .footer { background: ${ink} !important; color: ${bg} !important; }
        .footer a, .footer h5, .footer p, .footer .verse, .footer .legal { color: ${bg} !important; opacity:.85; }
      ` : ''}
    `;
    if(document.head) document.head.appendChild(styleEl);
    else document.addEventListener("DOMContentLoaded", () => document.head.appendChild(styleEl));
  }

  // ============ CONTENT + FEATURE-TOGGLES ============
  document.addEventListener("DOMContentLoaded", function(){

    // -------- CONTENT-Anwendung --------
    if(CONTENT){
      // Topbar
      if(CONTENT.topbar){
        const tb = document.querySelector(".topbar");
        if(tb) tb.innerHTML = CONTENT.topbar;
      }
      // Hero (nur Startseite)
      if(document.body.dataset.page === "home"){
        const eb = document.querySelector(".hero .eyebrow");
        if(eb && CONTENT.heroEyebrow) eb.textContent = CONTENT.heroEyebrow;
        const ht = document.querySelector(".hero .lr-headline, .hero h1");
        if(ht && CONTENT.heroTitle) ht.innerHTML = CONTENT.heroTitle;
        const hl = document.querySelector(".hero .lead");
        if(hl && CONTENT.heroLead) hl.textContent = CONTENT.heroLead;
        const cta1 = document.querySelector(".hero-cta .btn-primary");
        if(cta1 && CONTENT.heroCta1) cta1.textContent = CONTENT.heroCta1;
        const cta2 = document.querySelector(".hero-cta .btn-outline");
        if(cta2 && CONTENT.heroCta2) cta2.textContent = CONTENT.heroCta2;
        // Story-Vers
        const sv = document.querySelector(".story .verse");
        if(sv && CONTENT.storyVerse) sv.textContent = CONTENT.storyVerse;
        // Newsletter-Titel
        const nlt = document.querySelector(".news h2");
        if(nlt && CONTENT.newsletterTitle) nlt.textContent = CONTENT.newsletterTitle;
        const nlText = document.querySelector(".news .inner > p");
        if(nlText && CONTENT.newsletterText) nlText.textContent = CONTENT.newsletterText;
      }
      // Footer-Vers (jede Seite)
      if(CONTENT.verse){
        const fv = document.querySelector(".footer-bottom .verse");
        if(fv) fv.textContent = CONTENT.verse;
      }
    }

    // -------- FEATURE-TOGGLES --------
    if(SETTINGS){
      // Chatbot ausblenden
      if(SETTINGS.showChatbot === false){
        const css = document.createElement("style");
        css.textContent = `.chatbot-launcher, .chatbot-window { display: none !important; }`;
        document.head.appendChild(css);
      }
      // Social-Proof Pop-ups ausblenden
      if(SETTINGS.showSocialProof === false){
        const css = document.createElement("style");
        css.textContent = `.social-proof-pop, .live-social-popup { display: none !important; }`;
        document.head.appendChild(css);
        // Auch das Intervall stoppen falls schon läuft
        window.__lwSocialProofDisabled = true;
      }
      // Versand-Grenze in Topbar einfügen (wenn keine Custom-Topbar)
      if(SETTINGS.freeShipFrom && (!CONTENT || !CONTENT.topbar)){
        const tb = document.querySelector(".topbar");
        if(tb && !tb.dataset.customized){
          tb.innerHTML = `Kostenloser Versand ab ${SETTINGS.freeShipFrom}&nbsp;€ <span>·</span> Faire Produktion <span>·</span> 30 Tage Rückgabe`;
        }
      }
    }

    // ============ Sprach-Switcher + Translations ============
    injectLangSwitcher();
    applyTranslations();
    // Nach kurzer Wartezeit nochmal (für dynamisch erzeugten Content wie Chatbot, Produkte)
    setTimeout(applyTranslations, 600);
    setTimeout(applyTranslations, 2000);
  });

})();
