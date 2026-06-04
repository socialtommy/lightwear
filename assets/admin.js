/* ==========================================================================
   ADMIN PANEL — Lightwear Collective
   ========================================================================== */
(function(){
  "use strict";

  // ============ AUTH ============
  const ADMIN_AUTH_KEY = "lw_admin_auth_v1";
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "lightwear2026";

  function checkAuth(){
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === "1";
  }
  function setAuth(v){
    if(v) sessionStorage.setItem(ADMIN_AUTH_KEY, "1");
    else sessionStorage.removeItem(ADMIN_AUTH_KEY);
  }

  // ============ STORAGE KEYS ============
  const K = {
    cart: "lw_cart_v1",
    coupon: "lw_coupon_v1",
    giftcards: "lw_giftcards_v1",
    orderLast: "lw_last_order_v1",
    account: "lw_account_v1",
    accountOrders: "lw_acc_orders_v1",
    lp: "lw_lp_v1",
    reviews: "lw_user_reviews_v1",
    reminders: "lw_reminders_v1",
    // ADMIN-spezifisch:
    productOverrides: "lw_product_overrides_v1",
    productExtras: "lw_product_extras_v1",
    drops: "lw_drops_v1",
    discounts: "lw_discounts_v1",
    siteContent: "lw_site_content_v1",
    siteTheme: "lw_site_theme_v1",
    siteSettings: "lw_site_settings_v1",
    newsletter: "lw_newsletter_v1",
    adminOrders: "lw_admin_orders_v1",
    messages: "lw_messages_v1",
    activity: "lw_admin_activity_v1",
    abandoned: "lw_abandoned_carts_v1",
    campaigns: "lw_campaigns_v1",
    emailTemplates: "lw_email_templates_v1",
    restockAlerts: "lw_restock_alerts_v1",
    saleCalendar: "lw_sale_calendar_v1",
    preorders: "lw_preorders_v1",
    editions: "lw_editions_v1"
  };

  // ============ DEMO-DATEN ============
  function ensureAbandonedDemo(){
    if(localStorage.getItem("lw_admin_no_demo") === "1") return;
    if(load(K.abandoned, []).length === 0 && !sessionStorage.getItem("lw_admin_ab_demo")){
      const products = (window.PRODUCTS || []).slice(0, 6);
      const now = Date.now();
      save(K.abandoned, [
        {id: "AB-" + uid(), customer: {name: "Lisa Berger", email: "lisa.b@example.com"}, abandonedAt: new Date(now - 86400000*0.3).toISOString(), items: [{id: products[0]?.id, name: products[0]?.name||"Light Tee", qty: 1, price: products[0]?.price||20}, {id: products[2]?.id, name: products[2]?.name||"Faith Sweatpants", qty: 1, price: products[2]?.price||30}], value: (products[0]?.price||20)+(products[2]?.price||30), recovered: false, reminderSent: false},
        {id: "AB-" + uid(), customer: {name: "Tom Reisner", email: "tom@example.com"}, abandonedAt: new Date(now - 86400000*1.2).toISOString(), items: [{id: products[1]?.id, name: products[1]?.name||"JESUS Polo", qty: 2, price: products[1]?.price||20}], value: (products[1]?.price||20)*2, recovered: false, reminderSent: true, reminderSentAt: new Date(now - 86400000*0.5).toISOString()},
        {id: "AB-" + uid(), customer: {name: "Anna Wild", email: "anna.w@example.com"}, abandonedAt: new Date(now - 86400000*3).toISOString(), items: [{id: products[3]?.id, name: products[3]?.name||"Faith Tee", qty: 1, price: products[3]?.price||20}, {id: products[4]?.id, name: products[4]?.name||"Christ Tee", qty: 1, price: products[4]?.price||20}, {id: products[5]?.id, name: products[5]?.name||"Light Hoodie", qty: 1, price: products[5]?.price||35}], value: 75, recovered: true, recoveredAt: new Date(now - 86400000*1.8).toISOString(), reminderSent: true},
        {id: "AB-" + uid(), customer: {name: "Markus Klein", email: "m.klein@example.com"}, abandonedAt: new Date(now - 3600000*4).toISOString(), items: [{id: products[0]?.id, name: products[0]?.name||"Light Tee", qty: 1, price: products[0]?.price||20}], value: 20, recovered: false, reminderSent: false}
      ]);
      sessionStorage.setItem("lw_admin_ab_demo", "1");
    }
  }
  function ensureCampaignsDemo(){
    if(localStorage.getItem("lw_admin_no_demo") === "1") return;
    if(load(K.campaigns, []).length === 0 && !sessionStorage.getItem("lw_admin_camp_demo")){
      save(K.campaigns, [
        {id: uid(), name: "Sommer-Drop 2026", channel: "Instagram", budget: 800, spent: 624, impressions: 124000, clicks: 3240, conversions: 87, revenue: 4180, couponCode: "SUMMER25", startDate: "2026-05-15", endDate: "2026-06-15", status: "active"},
        {id: uid(), name: "Google Search - Brand", channel: "Google Ads", budget: 600, spent: 540, impressions: 89000, clicks: 1820, conversions: 64, revenue: 3120, couponCode: "", startDate: "2026-05-01", endDate: "2026-06-30", status: "active"},
        {id: uid(), name: "Worship-Künstler Kollab", channel: "Email", budget: 200, spent: 200, impressions: 5400, clicks: 890, conversions: 142, revenue: 7820, couponCode: "WORSHIP15", startDate: "2026-04-10", endDate: "2026-04-25", status: "ended"},
        {id: uid(), name: "TikTok Awareness", channel: "TikTok", budget: 400, spent: 320, impressions: 240000, clicks: 4500, conversions: 38, revenue: 1480, couponCode: "TIKTOK10", startDate: "2026-05-20", endDate: "2026-06-20", status: "active"}
      ]);
      sessionStorage.setItem("lw_admin_camp_demo", "1");
    }
  }
  function ensureSaleCalendarDemo(){
    if(localStorage.getItem("lw_admin_no_demo") === "1") return;
    if(load(K.saleCalendar, []).length === 0 && !sessionStorage.getItem("lw_admin_sc_demo")){
      const today = new Date();
      const day = (offset) => { const d = new Date(today); d.setDate(d.getDate() + offset); return d.toISOString().slice(0,10); };
      save(K.saleCalendar, [
        {id: uid(), name: "Sommer-Sale 2026", type: "sale", date: day(8), endDate: day(12), discount: 20, status: "scheduled", checklist: [{text:"Email-Kampagne erstellen", done:true},{text:"Instagram-Posts vorbereiten", done:true},{text:"Banner aktivieren", done:false},{text:"Versand-Team informieren", done:false}], note: "Großes Sommer-Event. Code: SUMMER20"},
        {id: uid(), name: "Faith Drop 02", type: "drop", date: day(15), discount: 0, status: "scheduled", checklist: [{text:"Foto-Shooting", done:true},{text:"Produktbeschreibungen", done:true},{text:"Lookbook erstellen", done:false},{text:"Erinnerungs-Mail an Wartelisten", done:false}], note: "Limited 200 Pieces. Worship-Künstler Kollab."},
        {id: uid(), name: "Worship Capsule", type: "drop", date: day(28), discount: 0, status: "draft", checklist: [{text:"Designs finalisieren", done:false},{text:"Produktion starten", done:false}], note: "Q3 Premium Drop"},
        {id: uid(), name: "Flash-Friday", type: "promotion", date: day(3), discount: 15, status: "scheduled", checklist: [{text:"Countdown-Banner", done:true},{text:"Push-Notification", done:false}], note: "24h Flash. Code: FLASH15"},
        {id: uid(), name: "Easter-Sale", type: "sale", date: day(-30), endDate: day(-26), discount: 25, status: "completed", checklist: [{text:"alles erledigt", done:true}], note: "Sehr erfolgreich, 1.840€ Extra-Umsatz"}
      ]);
      sessionStorage.setItem("lw_admin_sc_demo", "1");
    }
  }
  function ensureEmailTemplatesDemo(){
    if(load(K.emailTemplates, []).length === 0){
      save(K.emailTemplates, [
        {id: "welcome", name: "Willkommen / Newsletter", subject: "Willkommen bei Lightwear — dein 10%-Code wartet ✨", body: "Hi {{customer.name}},\n\nschön dass du da bist! Hier ist dein Willkommens-Code für 10% auf deine erste Bestellung:\n\nCODE: WILLKOMMEN10\n\nGültig auf alles im Shop. Lass dich inspirieren — wir freuen uns auf dich.\n\nGod bless,\nDein Lightwear Team\n\n„I am the light of the world.\" — John 8:12"},
        {id: "order-confirm", name: "Bestellbestätigung", subject: "Bestellung {{order.id}} bestätigt — danke!", body: "Hey {{customer.name}},\n\nvielen Dank für deine Bestellung! Wir haben sie erhalten und bereiten sie liebevoll vor.\n\nBestellnummer: {{order.id}}\nGesamt: {{order.total}}\nLieferadresse: {{order.address}}\n\nDu bekommst eine zweite Mail sobald dein Paket auf dem Weg ist.\n\nBis bald,\nDein Lightwear Team"},
        {id: "shipping", name: "Versand-Benachrichtigung", subject: "Dein Paket ist unterwegs 📦", body: "Hey {{customer.name}},\n\ndein Paket {{order.id}} ist gerade rausgegangen!\n\nTracking-Nummer: {{order.tracking}}\nVoraussichtliche Lieferung: {{order.eta}}\n\nGespannt? Wir auch.\n\nDein Lightwear Team"},
        {id: "refund", name: "Erstattung bestätigt", subject: "Deine Erstattung ist auf dem Weg", body: "Hi {{customer.name}},\n\nwir haben deine Erstattung über {{refund.amount}} für Bestellung {{order.id}} eingeleitet. Das Geld sollte in 3-5 Werktagen auf deiner Karte sein.\n\nGrund: {{refund.reason}}\n\nFalls du Fragen hast, schreib uns einfach.\n\nDein Lightwear Team"},
        {id: "abandoned", name: "Verlassener Warenkorb", subject: "Du hast etwas vergessen... 💭", body: "Hey {{customer.name}},\n\ndu hattest tolle Pieces im Warenkorb — möchtest du sie doch noch holen?\n\n{{cart.items}}\n\nGesamt: {{cart.value}}\n\nWir halten sie noch 24h für dich reserviert. Mit Code RETURN10 bekommst du sogar 10% Bonus.\n\nLet's go!\nDein Lightwear Team"}
      ]);
    }
  }

  // ============ AUDIT LOG ============
  function logActivity(category, action, meta){
    try {
      const log = JSON.parse(localStorage.getItem("lw_admin_activity_v1") || "[]");
      log.unshift({
        id: Math.random().toString(36).slice(2,10),
        category, action,
        meta: meta || null,
        date: new Date().toISOString(),
        user: "admin"
      });
      localStorage.setItem("lw_admin_activity_v1", JSON.stringify(log.slice(0, 500)));
    } catch(e){}
  }

  // ============ MESSAGES ============
  function getMessages(){ return load(K.messages, []); }
  function saveMessages(arr){ save(K.messages, arr); }
  // ============ LIVE-ACTIVITY (simuliert) ============
  const LIVE_FEED_KEY = "lw_admin_live_feed_v1";
  function getLiveFeed(){ return load(LIVE_FEED_KEY, []); }
  function pushLiveEvent(ev){
    const feed = getLiveFeed();
    feed.unshift({...ev, at: Date.now()});
    save(LIVE_FEED_KEY, feed.slice(0, 50));
  }
  const LIVE_NAMES = ["Daniel","Sina","Max","Lena","Tobi","Mara","Niklas","Sophie","Jakob","Hannah","Paul","Mia","Felix","Emma","Anna","Jonas"];
  const LIVE_CITIES = ["Berlin","München","Hamburg","Köln","Frankfurt","Stuttgart","Leipzig","Düsseldorf","Bremen","Dresden","Hannover","Nürnberg"];
  function ensureLiveActivity(){
    if(localStorage.getItem("lw_admin_no_demo") === "1") return;
    if(getLiveFeed().length === 0){
      // 8 initiale Events generieren
      const types = ["view","add","purchase","signup","reminder","review"];
      for(let i=0; i<8; i++){
        generateLiveEvent(i * 60000); // jeweils 1 Minute auseinander, in der Vergangenheit
      }
    }
  }
  function generateLiveEvent(ageMs){
    const products = getActiveProducts();
    const name = LIVE_NAMES[Math.floor(Math.random()*LIVE_NAMES.length)];
    const city = LIVE_CITIES[Math.floor(Math.random()*LIVE_CITIES.length)];
    const prod = products[Math.floor(Math.random()*products.length)];
    const types = [
      {t:"view", w:5, ev: {type:"view", icon:"👀", text:`${name} aus ${city} schaut sich „${prod?.name||'ein Produkt'}" an`}},
      {t:"add", w:2, ev: {type:"add", icon:"🛒", text:`${name} hat „${prod?.name||'einen Artikel'}" in den Warenkorb gelegt`}},
      {t:"purchase", w:1, ev: {type:"purchase", icon:"💸", text:`${name} hat eine Bestellung über ${fmtEUR(20+Math.random()*120)} aufgegeben`}},
      {t:"signup", w:1, ev: {type:"signup", icon:"✉️", text:`${name} hat sich für den Newsletter angemeldet`}},
      {t:"reminder", w:1, ev: {type:"reminder", icon:"🔔", text:`${name} möchte beim nächsten Drop erinnert werden`}},
      {t:"review", w:1, ev: {type:"review", icon:"⭐", text:`${name} hat „${prod?.name||'ein Produkt'}" mit 5 Sternen bewertet`}}
    ];
    // Gewichtete Auswahl
    const total = types.reduce((s,x) => s+x.w, 0);
    let r = Math.random() * total, pick = types[0];
    for(const x of types){ r -= x.w; if(r <= 0){ pick = x; break; } }
    const feed = getLiveFeed();
    feed.unshift({...pick.ev, at: Date.now() - ageMs});
    save(LIVE_FEED_KEY, feed.slice(0, 50));
  }

  // ============ STOCK-OUT PREDICTION ============
  function predictStockOut(productId, currentStock){
    // Verkäufe der letzten 14 Tage zählen
    const cutoff = Date.now() - 14 * 86400000;
    const sold = getOrders().reduce((sum, o) => {
      if(new Date(o.date||0).getTime() < cutoff) return sum;
      if(o.status === "cancelled" || o.status === "refunded") return sum;
      return sum + (o.items||[]).reduce((s, it) => s + (it.id === productId ? (Number(it.qty)||0) : 0), 0);
    }, 0);
    const avgDaily = sold / 14;
    if(avgDaily < 0.05) return null; // zu wenig Daten
    const daysLeft = currentStock / avgDaily;
    return { avgDaily, daysLeft, sold14: sold };
  }

  function ensureDemoMessages(){
    if(localStorage.getItem("lw_admin_no_demo") === "1") return;
    const m = getMessages();
    if(m.length === 0 && !sessionStorage.getItem("lw_admin_msg_demo")){
      saveMessages([
        {id:"MSG-1", name:"Marie L.", email:"marie@example.com", topic:"Größenfrage Hoodie", message:"Hi, ich bin 1,72m und schwanke zwischen M und L beim Light Hoodie. Was würdet ihr mir empfehlen? Trage normalerweise eher oversized. Vielen Dank!", date: new Date(Date.now()-3600000*2).toISOString(), read:false, replied:false},
        {id:"MSG-2", name:"Jonas Köhler", email:"jonas.k@example.com", topic:"Wann kommt der nächste Drop?", message:"Hey Lightwear-Team, ich liebe eure Kollektion! Wann kommt der nächste Drop online? Ich warte besonders auf das Faith-Sweatshirt in schwarz.", date: new Date(Date.now()-86400000).toISOString(), read:true, replied:false},
        {id:"MSG-3", name:"Anna Weber", email:"anna@example.com", topic:"Kollab-Anfrage", message:"Guten Tag, ich bin Worship-Leiterin und würde gerne eine Kollaboration besprechen. Können wir telefonieren?", date: new Date(Date.now()-86400000*3).toISOString(), read:true, replied:true}
      ]);
      sessionStorage.setItem("lw_admin_msg_demo", "1");
    }
  }

  // ============ UTILS ============
  function $(s, r=document){ return r.querySelector(s); }
  function $$(s, r=document){ return Array.from(r.querySelectorAll(s)); }
  function load(key, fb){
    try { const v = JSON.parse(localStorage.getItem(key) || "null"); return v ?? fb; }
    catch(e){ return fb; }
  }
  function save(key, val){
    try { localStorage.setItem(key, JSON.stringify(val)); return true; }
    catch(e){ return false; }
  }
  function escapeHtml(s){
    return String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  }
  function fmtEUR(n){ return (Number(n)||0).toFixed(2).replace(".", ",") + " €"; }
  function fmtDate(iso){
    if(!iso) return "—";
    try { return new Date(iso).toLocaleDateString("de-DE", { day: "2-digit", month: "short", year: "numeric" }); }
    catch(e){ return iso; }
  }
  function fmtDateTime(iso){
    if(!iso) return "—";
    try { return new Date(iso).toLocaleString("de-DE", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }); }
    catch(e){ return iso; }
  }
  function uid(){ return Math.random().toString(36).slice(2, 10); }

  function toast(msg, type=""){
    const el = $("#admin-toast");
    el.textContent = msg;
    el.className = "admin-toast " + (type || "");
    el.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(()=>{ el.hidden = true; }, 2400);
  }

  function modal({title, body, footer, wide}){
    const root = $("#admin-modal-root");
    const wrap = document.createElement("div");
    wrap.className = "adm-modal-bg";
    wrap.innerHTML = `
      <div class="adm-modal ${wide ? 'wide':''}">
        <div class="adm-modal-h">
          <h2>${escapeHtml(title)}</h2>
          <button class="adm-modal-close" aria-label="Schließen">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m6 6 12 12M18 6 6 18"/></svg>
          </button>
        </div>
        <div class="adm-modal-b">${body || ""}</div>
        ${footer ? `<div class="adm-modal-f">${footer}</div>` : ""}
      </div>`;
    root.appendChild(wrap);
    const close = () => wrap.remove();
    wrap.querySelector(".adm-modal-close").addEventListener("click", close);
    wrap.addEventListener("click", e => { if(e.target === wrap) close(); });
    return { el: wrap, close };
  }
  function confirmModal(msg){
    return new Promise(resolve => {
      const m = modal({
        title: "Bestätigen",
        body: `<p style="margin:0;color:var(--adm-ink-soft)">${escapeHtml(msg)}</p>`,
        footer: `<button class="adm-btn" data-cancel>Abbrechen</button><button class="adm-btn danger" data-ok>Ja, fortfahren</button>`
      });
      m.el.querySelector("[data-cancel]").addEventListener("click", ()=>{ m.close(); resolve(false); });
      m.el.querySelector("[data-ok]").addEventListener("click", ()=>{ m.close(); resolve(true); });
    });
  }

  // ============ DATA HELPERS ============
  function getProducts(){
    const base = window.PRODUCTS || [];
    const ov = load(K.productOverrides, {});
    const extras = load(K.productExtras, []);
    const merged = base.map(p => ({...p, ...(ov[p.id] || {})}));
    return merged.concat(extras);
  }
  function setProductOverride(id, patch){
    const ov = load(K.productOverrides, {});
    ov[id] = {...(ov[id] || {}), ...patch};
    save(K.productOverrides, ov);
  }
  function addProductExtra(prod){
    const extras = load(K.productExtras, []);
    extras.push(prod);
    save(K.productExtras, extras);
  }
  async function deleteProduct(id){
    // Aus Supabase löschen
    if(typeof window.lwDeleteProduct === "function"){
      try { await window.lwDeleteProduct(id); } catch(e){ console.error(e); }
    }
    // Aus window.PRODUCTS entfernen
    const idx = (window.PRODUCTS || []).findIndex(x => x.id === id);
    if(idx >= 0) window.PRODUCTS.splice(idx, 1);
    // localStorage säubern
    const extras = load(K.productExtras, []).filter(p => p.id !== id);
    save(K.productExtras, extras);
    const ov = load(K.productOverrides, {});
    if(ov[id]) { ov[id].deleted = true; save(K.productOverrides, ov); }
  }
  function getActiveProducts(){
    return getProducts().filter(p => !p.deleted);
  }

  // Supabase-Bestellungen Cache + Loader
  let _supabaseOrdersCache = null;
  async function loadOrdersFromSupabase(){
    if(typeof window.lwGetOrders !== "function") return [];
    try {
      const rows = await window.lwGetOrders();
      const allProducts = getProducts();
      const findProduct = (pid) => allProducts.find(p => p.id === pid);
      return (rows||[]).map(r => ({
        id: r.order_num || ("LW-SB-" + r.id),
        supabaseId: r.id,
        orderNum: r.order_num,
        date: r.created_at,
        status: r.status,
        customer: {
          name: r.customer_name || "Gast",
          email: r.customer_email || "",
          address: r.customer_address
        },
        items: (r.items || []).map(it => {
          const p = it.id ? findProduct(it.id) : null;
          return {
            id: it.id,
            name: it.name || p?.name || it.id || "Unbekannt",
            size: it.size,
            qty: Number(it.qty) || 1,
            price: Number(it.price) || Number(p?.price) || 0,
            category: it.category || p?.category
          };
        }),
        shipping: Number(r.shipping) || 0,
        discount: Number(r.discount) || 0,
        subtotal: Number(r.subtotal) || 0,
        total: Number(r.total) || 0,
        coupon: r.coupon,
        notes: r.notes || [],
        refund: r.refund,
        cancelled: r.cancelled,
        fromSupabase: true
      }));
    } catch(e){ console.warn("Supabase Orders Load Fehler:", e); return []; }
  }

  function getOrders(){
    // Account-Bestellungen vom Checkout haben items: [{id, size, qty}]
    // — Name und Preis aus PRODUCTS auflösen, dazu Format normalisieren
    const allProducts = getProducts();
    const findProduct = (pid) => allProducts.find(p => p.id === pid);

    const acc = load(K.accountOrders, []).map(o => {
      const account = load(K.account, null);
      const items = (o.items || []).map(it => {
        const prod = it.id ? findProduct(it.id) : null;
        return {
          id: it.id || null,
          name: it.name || prod?.name || it.id || "Unbekannt",
          size: it.size,
          qty: Number(it.qty) || Number(it.quantity) || 1,
          price: Number(it.price) || Number(prod?.price) || 0,
          category: prod?.category || "Andere"
        };
      });
      return {
        ...o,
        id: o.id || o.orderNum,
        date: o.date || o.created,
        customer: o.customer || (account ? {name: account.name || account.firstName || "Konto-Kunde", email: account.email} : {name: "Gast", email: ""}),
        shipping: o.shipping ?? o.ship ?? 0,
        items
      };
    });

    // Admin-Bestellungen auch normalisieren (auch wenn sie meist schon name/price haben)
    const adm = load(K.adminOrders, []).map(o => ({
      ...o,
      items: (o.items || []).map(it => {
        const prod = it.id ? findProduct(it.id) : null;
        return {
          id: it.id || null,
          name: it.name || prod?.name || "Unbekannt",
          size: it.size,
          qty: Number(it.qty) || 1,
          price: Number(it.price) || Number(prod?.price) || 0,
          category: it.category || prod?.category || "Andere"
        };
      })
    }));

    const sb = _supabaseOrdersCache || [];
    // Dedup: Supabase-Order mit gleicher orderNum → lokale rausfiltern
    const sbOrderNums = new Set(sb.map(o => o.orderNum).filter(Boolean));
    const accFiltered = acc.filter(o => !sbOrderNums.has(o.orderNum));
    return [...sb, ...accFiltered, ...adm].sort((a,b) => new Date(b.date||0) - new Date(a.date||0));
  }
  function setOrderStatus(orderId, status){
    // Supabase zuerst
    const sbOrder = (_supabaseOrdersCache||[]).find(o => o.id === orderId || o.orderNum === orderId);
    if(sbOrder && typeof window.lwUpdateOrder === "function"){
      window.lwUpdateOrder(sbOrder.supabaseId, { status }).catch(e => console.error(e));
      sbOrder.status = status;
      return;
    }
    const acc = load(K.accountOrders, []);
    let found = false;
    const updated = acc.map(o => {
      if(o.id === orderId || o.orderNum === orderId){ found = true; return {...o, status}; }
      return o;
    });
    if(found){ save(K.accountOrders, updated); return; }
    const adm = load(K.adminOrders, []);
    save(K.adminOrders, adm.map(o => o.id === orderId ? {...o, status} : o));
  }

  function getDrops(){
    const def = [
      {id: "drop1", title: "Faith Drop 02", date: "2026-06-15T18:00:00", img: "images/life2.jpg", desc: "Limited Tee + Beanie", status: "upcoming"},
      {id: "drop2", title: "Worship Capsule", date: "2026-07-04T18:00:00", img: "images/life3.jpg", desc: "Premium Sweat-Kollab", status: "upcoming"},
      {id: "drop3", title: "Light Hoodie Restock", date: "2026-08-22T18:00:00", img: "images/life4.jpg", desc: "Restock der bestverkauften Hoodies", status: "upcoming"}
    ];
    return load(K.drops, def);
  }
  function saveDrops(d){ save(K.drops, d); }

  function getDiscounts(){
    return load(K.discounts, [
      {id: uid(), code: "LIGHT10", percent: 10, active: true, uses: 0, max: null, expires: null},
      {id: uid(), code: "FAITH20", percent: 20, active: true, uses: 0, max: 100, expires: null}
    ]);
  }
  function saveDiscounts(d){ save(K.discounts, d); }

  function getNewsletter(){ return load(K.newsletter, []); }
  function addNewsletter(email){
    const list = getNewsletter();
    if(list.some(e => e.email === email)) return false;
    list.push({email, date: new Date().toISOString()});
    save(K.newsletter, list);
    return true;
  }

  function getSiteContent(){
    return load(K.siteContent, {
      heroEyebrow: "John 8:12",
      heroTitle: "I am the <em>Light</em> of the World",
      heroLead: "Glaube zum Anziehen. Christliche Streetwear, die deine Botschaft trägt — gemacht, um Licht in die Welt zu bringen.",
      heroCta1: "Kollektion entdecken",
      heroCta2: "Unsere Story",
      topbar: "Kostenloser Versand ab 50 € · Faire Produktion · 30 Tage Rückgabe",
      verse: "„I am the light of the world.\" — John 8:12",
      storyVerse: "„Wer mir nachfolgt, wird nicht in der Finsternis wandeln.\"",
      newsletterTitle: "Werde Teil der Bewegung",
      newsletterText: "Neue Drops, Stories und 10% auf deine erste Bestellung."
    });
  }
  function saveSiteContent(c){ save(K.siteContent, c); }

  function getTheme(){
    return load(K.siteTheme, {
      bg: "#f6f5f1",
      ink: "#1a1a1a",
      accent: "#1a1a1a",
      sale: "#b3261e"
    });
  }
  function saveTheme(t){ save(K.siteTheme, t); }

  function getSettings(){
    return load(K.siteSettings, {
      storeName: "Lightwear Collective",
      email: "hello@lightwear.com",
      phone: "+49 30 1234567",
      address: "Musterstraße 1, 10115 Berlin",
      currency: "EUR",
      freeShipFrom: 50,
      taxRate: 19,
      maintenance: false,
      showSocialProof: true,
      showChatbot: true
    });
  }
  function saveSettings(s){ save(K.siteSettings, s); }

  // ============ DEMO ORDERS (für leeren State) ============
  function ensureDemoData(){
    // Wenn der User Demo-Daten dauerhaft ausgeschaltet hat — skip
    if(localStorage.getItem("lw_admin_no_demo") === "1") return;
    // Wenn Supabase echte Bestellungen hat — keine Fakes
    if(_supabaseOrdersCache && _supabaseOrdersCache.length > 0) return;
    const accOrders = load(K.accountOrders, []);
    const admOrders = load(K.adminOrders, []);
    if(accOrders.length === 0 && admOrders.length === 0 && !sessionStorage.getItem("lw_admin_demo_loaded")){
      // Reale Produkte aus PRODUCTS holen (mit category!)
      const allP = (window.PRODUCTS || []);
      const byId = (id) => allP.find(p => p.id === id) || {name: id, price: 20, category: "Andere"};
      const p1 = byId("jesus-polo");
      const p2 = byId("i-see-god");
      const p3 = byId("faith-sweatpants");
      const p4 = byId("the-answer");
      const p5 = byId("faith-makes-new");
      const p6 = byId("christ-is-enough");

      const demoOrders = [
        {
          id: "LW-D1-" + Date.now(),
          date: new Date(Date.now() - 86400000*2).toISOString(),
          status: "shipped",
          customer: {name: "Daniel Kraft", email: "daniel@example.com"},
          items: [
            {id: p1.id, name: p1.name, size: "L", qty: 1, price: p1.price, category: p1.category},
            {id: p2.id, name: p2.name, size: "M", qty: 1, price: p2.price, category: p2.category}
          ],
          shipping: 4.90,
          total: p1.price + p2.price + 4.90
        },
        {
          id: "LW-D2-" + Date.now(),
          date: new Date(Date.now() - 86400000*5).toISOString(),
          status: "delivered",
          customer: {name: "Sina Hoffmann", email: "sina@example.com"},
          items: [
            {id: p3.id, name: p3.name, size: "M", qty: 2, price: p3.price, category: p3.category}
          ],
          shipping: 0,
          total: p3.price * 2
        },
        {
          id: "LW-D3-" + Date.now(),
          date: new Date(Date.now() - 86400000*1).toISOString(),
          status: "pending",
          customer: {name: "Max Lutter", email: "max@example.com"},
          items: [
            {id: p4.id, name: p4.name, size: "L", qty: 1, price: p4.price, category: p4.category},
            {id: p5.id, name: p5.name, size: "L", qty: 1, price: p5.price, category: p5.category},
            {id: p6.id, name: p6.name, size: "M", qty: 1, price: p6.price, category: p6.category}
          ],
          shipping: 4.90,
          total: p4.price + p5.price + p6.price + 4.90,
          isAdmin: true
        },
        {
          id: "LW-D4-" + Date.now(),
          date: new Date(Date.now() - 86400000*0.5).toISOString(),
          status: "processing",
          customer: {name: "Lena Maier", email: "lena@example.com"},
          items: [
            {id: p2.id, name: p2.name, size: "S", qty: 3, price: p2.price, category: p2.category}
          ],
          shipping: 0,
          total: p2.price * 3
        }
      ];
      save(K.adminOrders, demoOrders);
      sessionStorage.setItem("lw_admin_demo_loaded", "1");
    }
  }

  // ============ LOGIN ============
  function initLogin(){
    const loginEl = $("#admin-login");
    const appEl = $("#admin-app");

    if(checkAuth()){
      loginEl.hidden = true;
      appEl.hidden = false;
      initApp();
      return;
    }

    $("#admin-login-form").addEventListener("submit", e => {
      e.preventDefault();
      const u = $("#al-user").value.trim();
      const p = $("#al-pass").value;
      if(u === ADMIN_USER && p === ADMIN_PASS){
        setAuth(true);
        loginEl.hidden = true;
        appEl.hidden = false;
        initApp();
      } else {
        $("#al-error").hidden = false;
        $("#al-pass").value = "";
      }
    });
  }

  // ============ APP ============
  let currentView = "dashboard";

  async function initApp(){
    // Dark Mode initial anwenden
    if(localStorage.getItem("lw_admin_dark") === "1"){
      document.body.classList.add("dark-mode");
    }
    // Produkte aus Supabase laden (überschreibt window.PRODUCTS)
    if(typeof window.lwGetProducts === "function"){
      try {
        const sbProducts = await window.lwGetProducts();
        if(sbProducts && sbProducts.length > 0){
          const mapped = sbProducts.map(r => ({
            id: r.id, name: r.name, price: Number(r.price)||0,
            compareAt: r.compare_at != null ? Number(r.compare_at) : undefined,
            category: r.category, meta: r.meta,
            desc: r.description, description: r.description,
            img: r.img, image: r.image, gallery: r.gallery,
            sizes: r.sizes || ["S","M","L","XL"],
            stock: r.stock ?? 50, active: r.active !== false,
            limitedEdition: !!r.limited_edition,
            editionSize: r.edition_size, editionSold: r.edition_sold,
            preorder: !!r.preorder, preorderDate: r.preorder_date,
            preorderDiscount: r.preorder_discount
          }));
          window.PRODUCTS = mapped;
          console.log("✓", mapped.length, "Produkte aus Supabase im Admin geladen");
        }
      } catch(e){ console.warn("Supabase-Products-Load Fehler:", e); }
    }
    ensureDemoData();
    ensureDemoMessages();
    ensureLiveActivity();
    ensureAbandonedDemo();
    ensureCampaignsDemo();
    ensureEmailTemplatesDemo();
    ensureSaleCalendarDemo();
    // Supabase-Bestellungen vor-laden
    try { _supabaseOrdersCache = await loadOrdersFromSupabase(); }
    catch(e){ _supabaseOrdersCache = []; }
    // Bestellungen alle 8 Sek refresh (für neue Käufer-Bestellungen)
    setInterval(async () => {
      try {
        _supabaseOrdersCache = await loadOrdersFromSupabase();
        updateBadges();
      } catch(e){}
    }, 8000);
    startAdminLiveChatPolling();

    // Sidebar nav
    $$(".as-link").forEach(a => {
      a.addEventListener("click", e => {
        e.preventDefault();
        const v = a.dataset.view;
        switchView(v);
        closeSidebar();
      });
    });

    // Mobile burger
    const burger = $("#admin-burger");
    if(burger) burger.addEventListener("click", openSidebar);

    // Logout
    $("#admin-logout").addEventListener("click", () => {
      setAuth(false);
      location.reload();
    });

    // Refresh
    $("#admin-refresh").addEventListener("click", () => {
      renderView(currentView);
      toast("Aktualisiert", "success");
    });

    // Globale Suche — springt zu passendem View
    const gs = $("#admin-global-search");
    if(gs){
      gs.addEventListener("keydown", e => {
        if(e.key === "Enter"){
          const q = gs.value.toLowerCase().trim();
          if(!q) return;
          const map = {
            "bestell":"orders", "auftr":"orders", "order":"orders",
            "produkt":"products", "artikel":"products", "shop":"products",
            "lager":"inventory", "stock":"inventory", "bestand":"inventory",
            "kunde":"customers", "customer":"customers",
            "drop":"drops", "release":"drops",
            "erinner":"reminders", "remind":"reminders",
            "bewert":"reviews", "review":"reviews",
            "gutschein":"discounts", "rabatt":"discounts", "code":"discounts",
            "geschenk":"giftcards", "gift":"giftcards",
            "punkt":"loyalty", "loyal":"loyalty", "light":"loyalty",
            "news":"newsletter", "abonn":"newsletter",
            "inhalt":"content", "text":"content", "hero":"content",
            "design":"design", "theme":"design", "farb":"design",
            "einstell":"settings", "setting":"settings"
          };
          for(const [k,v] of Object.entries(map)){
            if(q.includes(k)){ switchView(v); gs.value=""; return; }
          }
          toast("Nichts gefunden für „" + q + "\"", "error");
        }
      });
    }

    // Hash routing
    const hash = location.hash.replace("#","");
    if(hash && $(`.as-link[data-view="${hash}"]`)) switchView(hash);
    else switchView("dashboard");

    updateBadges();
  }

  function updateBadges(){
    $("#badge-orders").textContent = getOrders().filter(o => o.status === "pending").length;
    $("#badge-products").textContent = getActiveProducts().length;
    const rem = Object.keys(load(K.reminders, {})).length;
    $("#badge-reminders").textContent = rem;
    const unreadMsg = getMessages().filter(m => !m.read).length;
    const bm = $("#badge-messages"); if(bm) bm.textContent = unreadMsg;
    const abOpen = load(K.abandoned, []).filter(a => !a.recovered).length;
    const bab = $("#badge-abandoned"); if(bab) bab.textContent = abOpen;
    // Live-Chat-Badge
    const lc = getLiveChatState();
    const activeUnread = (lc.conversations||[]).filter(c => c.status === "active").reduce((s,c) => s + (c.unreadByAdmin||0), 0);
    const blc = $("#badge-livechat"); if(blc) blc.textContent = activeUnread;
  }

  // ============ LIVE CHAT (Storefront ↔ Admin) ============
  const LIVE_CHAT_KEY = "lw_live_chat_v1";
  function getLiveChatState(){
    try { return JSON.parse(localStorage.getItem(LIVE_CHAT_KEY)) || {conversations: [], active: null}; }
    catch(e){ return {conversations: [], active: null}; }
  }
  function saveLiveChatState(s){
    try { localStorage.setItem(LIVE_CHAT_KEY, JSON.stringify(s)); } catch(e){}
  }
  function sendOperatorMessage(convId, text, operator){
    const s = getLiveChatState();
    const c = s.conversations.find(x => x.id === convId);
    if(!c) return;
    c.messages.push({from: "operator", text, time: new Date().toISOString(), operator: operator || c.operator || "Team"});
    c.lastActivity = new Date().toISOString();
    c.unreadByCustomer = (c.unreadByCustomer || 0) + 1;
    c.unreadByAdmin = 0; // beim Senden alles als gelesen markieren
    saveLiveChatState(s);
  }
  function markConversationRead(convId){
    const s = getLiveChatState();
    const c = s.conversations.find(x => x.id === convId);
    if(c){ c.unreadByAdmin = 0; saveLiveChatState(s); }
  }
  function closeConversation(convId){
    const s = getLiveChatState();
    const c = s.conversations.find(x => x.id === convId);
    if(c){
      c.status = "closed";
      c.messages.push({from: "system", text: "Chat vom Team geschlossen.", time: new Date().toISOString()});
      saveLiveChatState(s);
    }
  }

  // Notification beim ersten ungelesenen Eintrag (Browser-Title + Toast)
  let lastNotifyCount = 0;
  function checkLiveChatNotify(){
    const lc = getLiveChatState();
    const active = (lc.conversations||[]).filter(c => c.status === "active");
    const total = active.reduce((s,c) => s + (c.unreadByAdmin||0), 0);
    // Browser-Tab-Title
    if(total > 0){
      if(!document.title.startsWith("(")) document.title = "(" + total + ") " + document.title.replace(/^\(\d+\)\s*/, "");
    } else {
      document.title = document.title.replace(/^\(\d+\)\s*/, "");
    }
    // Wenn neue Nachricht & wir sind NICHT in Live-Chat-View → Toast + Sound-Beep + flashing badge
    if(total > lastNotifyCount){
      if(currentView !== "livechat"){
        toast("💬 Neue Live-Chat-Nachricht — gehe zu Live-Chat", "success");
        try {
          const ctx = new (window.AudioContext || window.webkitAudioContext)();
          const o = ctx.createOscillator(); const g = ctx.createGain();
          o.connect(g); g.connect(ctx.destination);
          o.frequency.value = 880; g.gain.value = 0.05;
          o.start(); setTimeout(() => { o.stop(); ctx.close(); }, 120);
        } catch(e){}
      }
    }
    lastNotifyCount = total;
  }
  let liveChatAdminPollTimer = null;
  function startAdminLiveChatPolling(){
    if(liveChatAdminPollTimer) return;
    liveChatAdminPollTimer = setInterval(() => {
      checkLiveChatNotify();
      updateBadges();
      // Re-render Live-Chat view falls offen
      if(currentView === "livechat" && $("#lc-thread")){
        renderLiveChatThread();
      } else if(currentView === "livechat"){
        renderView("livechat");
      }
    }, 1500);
    window.addEventListener("storage", e => {
      if(e.key === LIVE_CHAT_KEY){
        checkLiveChatNotify();
        updateBadges();
        if(currentView === "livechat") renderView("livechat");
      }
    });
  }

  function openSidebar(){
    const sb = $(".admin-sidebar"); if(!sb) return;
    sb.classList.add("open");
    document.body.classList.add("sidebar-open");
    // Backdrop — nur einfacher Click-Handler, kein preventDefault (das blockiert sonst Sidebar-Touches auf manchen Browsern)
    const bd = document.createElement("div");
    bd.className = "sidebar-backdrop";
    bd.addEventListener("click", (e) => {
      // Nur schließen wenn der Click WIRKLICH auf dem Backdrop war (nicht ein bubbled Click vom Sidebar)
      if(e.target === bd) closeSidebar();
    });
    document.body.appendChild(bd);
    // Close-X-Button in Sidebar (nur einmal hinzufügen)
    if(!sb.querySelector(".sidebar-close")){
      const x = document.createElement("button");
      x.className = "sidebar-close";
      x.type = "button";
      x.setAttribute("aria-label", "Menü schließen");
      x.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 6 12 12M18 6 6 18"/></svg>';
      x.addEventListener("click", (e) => { e.stopPropagation(); closeSidebar(); });
      sb.appendChild(x);
    }
  }
  function closeSidebar(){
    const sb = $(".admin-sidebar"); if(sb) sb.classList.remove("open");
    document.body.classList.remove("sidebar-open");
    document.querySelectorAll(".sidebar-backdrop").forEach(b => b.remove());
  }

  function switchView(view){
    currentView = view;
    location.hash = view;
    $$(".as-link").forEach(a => a.classList.toggle("active", a.dataset.view === view));
    stopLiveTicker();
    renderView(view);
    if(view === "dashboard") setTimeout(startLiveTicker, 100);
  }

  function setHeader(title, sub){
    $("#admin-page-title").textContent = title;
    $("#admin-page-sub").textContent = sub;
  }

  function renderView(view){
    const root = $("#admin-content");
    root.innerHTML = "";
    const r = VIEWS[view] || VIEWS.dashboard;
    try {
      r(root);
    } catch(err){
      console.error("View render error:", err);
      root.innerHTML = `
        <div class="adm-card">
          <div class="adm-card-b">
            <div class="empty">
              <h3 style="color:var(--adm-danger)">Fehler beim Laden</h3>
              <p>${escapeHtml(err.message || String(err))}</p>
              <button class="adm-btn primary" onclick="location.reload()">Seite neu laden</button>
            </div>
          </div>
        </div>`;
    }
    updateBadges();
  }

  // ============ VIEWS ============
  const VIEWS = {

    // -------- DASHBOARD --------
    dashboard(root){
      setHeader("Dashboard", "Übersicht über deinen Shop");
      const orders = getOrders();
      const products = getActiveProducts();
      const customers = load(K.account, {});
      const reminders = load(K.reminders, {});
      const totalRev = orders.reduce((s,o) => s + (Number(o.total)||0), 0);
      const pending = orders.filter(o => o.status === "pending").length;
      const lowStock = products.filter(p => (p.stock ?? 50) < 10).length;
      const newsletter = getNewsletter().length;

      // Letzte 7 Tage Umsatz
      const days = [];
      for(let i=6; i>=0; i--){
        const d = new Date(); d.setDate(d.getDate()-i); d.setHours(0,0,0,0);
        const next = new Date(d); next.setDate(next.getDate()+1);
        const rev = orders.filter(o => {
          const od = new Date(o.date || 0);
          return od >= d && od < next;
        }).reduce((s,o) => s + (Number(o.total)||0), 0);
        days.push({label: d.toLocaleDateString("de-DE", {weekday:"short"}), value: rev});
      }
      const maxRev = Math.max(...days.map(d => d.value), 1);

      root.innerHTML = `
        <div class="stat-grid">
          <div class="stat">
            <div class="stat-ico green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v20M6 6c0-2 2-4 6-4s6 2 6 4-2 4-6 4-6 2-6 4 2 4 6 4 6-2 6-4"/></svg></div>
            <div class="stat-meta"><div class="stat-label">Umsatz gesamt</div><div class="stat-value">${fmtEUR(totalRev)}</div><div class="stat-trend">▲ +12% diese Woche</div></div>
          </div>
          <div class="stat">
            <div class="stat-ico blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg></div>
            <div class="stat-meta"><div class="stat-label">Bestellungen</div><div class="stat-value">${orders.length}</div><div class="stat-trend">${pending} offen</div></div>
          </div>
          <div class="stat">
            <div class="stat-ico purple"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg></div>
            <div class="stat-meta"><div class="stat-label">Kunden</div><div class="stat-value">${customers.email ? 1 : 0}</div><div class="stat-trend">${newsletter} Newsletter-Abos</div></div>
          </div>
          <div class="stat">
            <div class="stat-ico orange"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7l9-4 9 4-9 4-9-4Z"/><path d="M3 7v10l9 4 9-4V7"/></svg></div>
            <div class="stat-meta"><div class="stat-label">Produkte</div><div class="stat-value">${products.length}</div><div class="stat-trend ${lowStock > 0 ? 'down':''}">${lowStock} mit niedrigem Lager</div></div>
          </div>
          <div class="stat">
            <div class="stat-ico red"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8"/></svg></div>
            <div class="stat-meta"><div class="stat-label">Drop-Erinnerungen</div><div class="stat-value">${Object.keys(reminders).length}</div><div class="stat-trend">aktiv</div></div>
          </div>
        </div>

        <div class="adm-2col">
          <div class="adm-card">
            <div class="adm-card-h"><h3>Umsatz · letzte 7 Tage</h3></div>
            <div class="adm-card-b">
              <div class="bar-chart">
                ${days.map(d => `
                  <div class="bar" style="height:${Math.max(8, (d.value/maxRev)*100)}%">
                    <em>${d.value > 0 ? Math.round(d.value) + '€' : ''}</em>
                    <span>${d.label}</span>
                  </div>`).join("")}
              </div>
            </div>
          </div>
          <div class="adm-card">
            <div class="adm-card-h"><h3>Neueste Bestellungen</h3><a href="#orders" class="adm-btn sm" data-nav="orders">Alle ansehen</a></div>
            <div class="adm-card-b" style="padding:0">
              ${orders.length === 0 ? `<div class="empty"><h3>Noch keine Bestellungen</h3></div>` : `
                <div class="adm-table-wrap">
                  <table class="adm-table">
                    <thead><tr><th>ID</th><th>Kunde</th><th>Status</th><th class="num">Total</th></tr></thead>
                    <tbody>
                      ${orders.slice(0,5).map(o => `
                        <tr>
                          <td><strong>${escapeHtml(o.id || "-")}</strong><br><small style="color:var(--adm-ink-soft)">${fmtDateTime(o.date)}</small></td>
                          <td>${escapeHtml(o.customer?.name || "Gast")}</td>
                          <td>${statusPill(o.status)}</td>
                          <td class="num"><strong>${fmtEUR(o.total)}</strong></td>
                        </tr>
                      `).join("")}
                    </tbody>
                  </table>
                </div>
              `}
            </div>
          </div>
        </div>

        <div class="adm-2col" style="margin-top:20px">
          <div class="adm-card">
            <div class="adm-card-h">
              <h3>Live-Aktivität</h3>
              <span class="pill pill-green" style="font-size:.68rem">LIVE</span>
            </div>
            <div class="adm-card-b" style="padding:0;max-height:340px;overflow-y:auto" id="live-feed-container">
              ${renderLiveFeed()}
            </div>
          </div>
          <div class="adm-card">
            <div class="adm-card-h"><h3>Schnellaktionen</h3></div>
            <div class="adm-card-b">
              <div class="adm-btn-row" style="gap:10px">
                <button class="adm-btn primary" data-quick="new-product">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
                  Neues Produkt
                </button>
                <button class="adm-btn" data-quick="new-drop">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 10h18"/></svg>
                  Drop planen
                </button>
                <button class="adm-btn" data-quick="new-discount">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m9 15 6-6M9 9h.01M15 15h.01M5 5h14v14H5z"/></svg>
                  Gutschein erstellen
                </button>
                <button class="adm-btn" data-quick="content">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h16v16H4z"/></svg>
                  Inhalte bearbeiten
                </button>
              </div>
              <div style="margin-top:18px;padding-top:18px;border-top:1px solid var(--adm-line)">
                <small style="color:var(--adm-ink-soft);text-transform:uppercase;letter-spacing:.08em;font-size:.7rem">System-Status</small>
                <div style="margin-top:10px;display:flex;flex-direction:column;gap:6px">
                  <div style="display:flex;justify-content:space-between;font-size:.85rem"><span>Shop online</span><span class="pill pill-green">aktiv</span></div>
                  <div style="display:flex;justify-content:space-between;font-size:.85rem"><span>Zahlungen</span><span class="pill pill-green">aktiv</span></div>
                  <div style="display:flex;justify-content:space-between;font-size:.85rem"><span>Versand</span><span class="pill pill-green">DHL · Hermes</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      root.querySelectorAll("[data-nav]").forEach(b => {
        b.addEventListener("click", (e) => { e.preventDefault(); switchView(b.dataset.nav); });
      });
      // Schnellaktionen: direkt Formulare öffnen
      const qa = root.querySelector("[data-quick='new-product']");
      if(qa) qa.addEventListener("click", (e) => { e.preventDefault(); openProductForm(null, () => switchView("products")); });
      const qb = root.querySelector("[data-quick='new-drop']");
      if(qb) qb.addEventListener("click", (e) => { e.preventDefault(); openDropForm(null, () => switchView("drops")); });
      const qc = root.querySelector("[data-quick='new-discount']");
      if(qc) qc.addEventListener("click", (e) => { e.preventDefault(); openDiscountForm(null, () => switchView("discounts")); });
      const qd = root.querySelector("[data-quick='content']");
      if(qd) qd.addEventListener("click", (e) => { e.preventDefault(); switchView("content"); });
    },

    // -------- ORDERS --------
    orders(root){
      setHeader("Bestellungen", "Alle Aufträge verwalten");
      const orders = getOrders();
      let filter = "all";
      let search = "";
      const selected = new Set();

      const render = () => {
        const list = orders.filter(o => {
          const matchStatus = filter === "all" || o.status === filter;
          const matchSearch = !search ||
            (o.id||"").toLowerCase().includes(search) ||
            (o.customer?.name||"").toLowerCase().includes(search) ||
            (o.customer?.email||"").toLowerCase().includes(search);
          return matchStatus && matchSearch;
        });

        // Nur valide IDs in selected behalten
        list.forEach(o => {}); // noop
        Array.from(selected).forEach(id => { if(!list.find(o => o.id === id)) selected.delete(id); });

        root.innerHTML = `
          <div class="adm-toolbar">
            <input type="text" id="o-search" class="grow" placeholder="Suche nach Bestell-ID, Name, E-Mail…" value="${escapeHtml(search)}">
            <select id="o-status">
              <option value="all"${filter==="all"?" selected":""}>Alle Status</option>
              <option value="pending"${filter==="pending"?" selected":""}>Offen</option>
              <option value="processing"${filter==="processing"?" selected":""}>In Bearbeitung</option>
              <option value="shipped"${filter==="shipped"?" selected":""}>Versendet</option>
              <option value="delivered"${filter==="delivered"?" selected":""}>Zugestellt</option>
              <option value="cancelled"${filter==="cancelled"?" selected":""}>Storniert</option>
              <option value="refunded"${filter==="refunded"?" selected":""}>Erstattet</option>
            </select>
            <button class="adm-btn primary" id="o-new">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
              Neue Bestellung
            </button>
            <button class="adm-btn" id="o-export">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
              CSV
            </button>
          </div>

          ${selected.size > 0 ? `
            <div class="bulk-bar">
              <strong>${selected.size} markiert</strong>
              <div class="bulk-actions">
                <select id="bulk-carrier" style="background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.2);padding:6px 10px;border-radius:6px">
                  <option value="DHL">DHL</option>
                  <option value="Hermes">Hermes</option>
                  <option value="DPD">DPD</option>
                </select>
                <button class="adm-btn" id="bulk-labels">🏷 Etiketten drucken</button>
                <button class="adm-btn" id="bulk-shipped">📦 Als versendet markieren</button>
                <button class="adm-btn" id="bulk-clear">Auswahl löschen</button>
              </div>
            </div>
          ` : ''}

          <div class="adm-card">
            ${list.length === 0 ? `
              <div class="empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 7h12l-1 13H7L6 7Z"/></svg>
                <h3>Keine Bestellungen</h3>
              </div>
            ` : `
              <div class="adm-table-wrap">
                <table class="adm-table">
                  <thead><tr>
                    <th style="width:32px"><input type="checkbox" id="bulk-all" ${list.every(o => selected.has(o.id)) && list.length>0 ? 'checked':''}></th>
                    <th>Bestellung</th><th>Datum</th><th>Kunde</th><th>Items</th><th>Status</th><th class="num">Total</th><th></th>
                  </tr></thead>
                  <tbody>
                    ${list.map(o => `
                      <tr data-id="${escapeHtml(o.id)}">
                        <td><input type="checkbox" class="bulk-check" data-id="${escapeHtml(o.id)}" ${selected.has(o.id) ? 'checked':''}></td>
                        <td><strong>${escapeHtml(o.id)}</strong></td>
                        <td>${fmtDateTime(o.date)}</td>
                        <td>${escapeHtml(o.customer?.name || "Gast")}<br><small style="color:var(--adm-ink-soft)">${escapeHtml(o.customer?.email || '')}</small></td>
                        <td>${(o.items||[]).length} Artikel</td>
                        <td>${statusPill(o.status)}</td>
                        <td class="num"><strong>${fmtEUR(o.total)}</strong></td>
                        <td><button class="adm-btn sm" data-view-order="${escapeHtml(o.id)}">Details</button></td>
                      </tr>
                    `).join("")}
                  </tbody>
                </table>
              </div>
            `}
          </div>
        `;

        $("#o-search").addEventListener("input", e => { search = e.target.value.toLowerCase(); render(); });
        $("#o-status").addEventListener("change", e => { filter = e.target.value; render(); });
        $("#o-new").addEventListener("click", () => openOrderForm());
        $("#o-export").addEventListener("click", () => exportCSV("orders.csv", list));
        root.querySelectorAll("[data-view-order]").forEach(b => {
          b.addEventListener("click", () => openOrderDetail(b.dataset.viewOrder));
        });

        // Bulk-Checkboxen
        root.querySelectorAll(".bulk-check").forEach(cb => cb.addEventListener("change", () => {
          if(cb.checked) selected.add(cb.dataset.id); else selected.delete(cb.dataset.id);
          render();
        }));
        const bulkAll = $("#bulk-all");
        if(bulkAll) bulkAll.addEventListener("change", () => {
          if(bulkAll.checked) list.forEach(o => selected.add(o.id));
          else selected.clear();
          render();
        });

        const bulkLabels = $("#bulk-labels");
        if(bulkLabels) bulkLabels.addEventListener("click", () => {
          const carrier = $("#bulk-carrier").value;
          const chosen = list.filter(o => selected.has(o.id));
          if(!chosen.length){ toast("Keine Bestellungen markiert", "error"); return; }
          printShippingLabels(chosen, carrier);
        });
        const bulkShipped = $("#bulk-shipped");
        if(bulkShipped) bulkShipped.addEventListener("click", () => {
          selected.forEach(id => setOrderStatus(id, "shipped"));
          logActivity("orders", selected.size + " Bestellungen bulk als versendet markiert");
          toast("✓ " + selected.size + " als versendet markiert", "success");
          selected.clear();
          VIEWS.orders(root);
        });
        const bulkClear = $("#bulk-clear");
        if(bulkClear) bulkClear.addEventListener("click", () => { selected.clear(); render(); });
      };
      render();
    },

    // -------- PRODUCTS --------
    products(root){
      setHeader("Produkte", "Sortiment verwalten");
      let search = "";
      let cat = "all";

      const render = () => {
        const products = getActiveProducts();
        const cats = [...new Set(products.map(p => p.category).filter(Boolean))];
        const list = products.filter(p =>
          (cat === "all" || p.category === cat) &&
          (!search || (p.name||"").toLowerCase().includes(search))
        );

        root.innerHTML = `
          <div class="adm-toolbar">
            <input type="text" id="p-search" class="grow" placeholder="Produktname suchen…" value="${escapeHtml(search)}">
            <select id="p-cat">
              <option value="all">Alle Kategorien</option>
              ${cats.map(c => `<option value="${escapeHtml(c)}"${c===cat?" selected":""}>${escapeHtml(c)}</option>`).join("")}
            </select>
            <button class="adm-btn primary" id="p-new">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
              Neues Produkt
            </button>
          </div>
          <div class="adm-card">
            <div class="adm-table-wrap">
              <table class="adm-table">
                <thead><tr><th></th><th>Produkt</th><th>Kategorie</th><th>Lager</th><th class="num">Preis</th><th>Status</th><th></th></tr></thead>
                <tbody>
                  ${list.map(p => `
                    <tr>
                      <td><img class="thumb" src="${escapeHtml(p.img || p.image || '')}" alt=""></td>
                      <td><strong>${escapeHtml(p.name)}</strong><br><small style="color:var(--adm-ink-soft)">#${escapeHtml(p.id)}</small></td>
                      <td>${escapeHtml(p.category || '—')}</td>
                      <td>${stockPill(p.stock ?? 50)}</td>
                      <td class="num"><strong>${fmtEUR(p.price)}</strong>${p.compareAt ? `<br><small style="color:var(--adm-ink-soft);text-decoration:line-through">${fmtEUR(p.compareAt)}</small>` : ''}</td>
                      <td>${(p.active ?? true) ? '<span class="pill pill-green">live</span>' : '<span class="pill pill-gray">aus</span>'}</td>
                      <td><div class="adm-btn-row"><button class="adm-btn sm" data-edit="${escapeHtml(p.id)}">Bearbeiten</button><button class="adm-btn sm danger" data-del="${escapeHtml(p.id)}">Löschen</button></div></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        `;

        $("#p-search").addEventListener("input", e => { search = e.target.value.toLowerCase(); render(); });
        $("#p-cat").addEventListener("change", e => { cat = e.target.value; render(); });
        $("#p-new").addEventListener("click", () => openProductForm(null, render));
        root.querySelectorAll("[data-edit]").forEach(b => b.addEventListener("click", () => openProductForm(b.dataset.edit, render)));
        root.querySelectorAll("[data-del]").forEach(b => b.addEventListener("click", async () => {
          if(await confirmModal("Produkt wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.")){
            await deleteProduct(b.dataset.del);
            logActivity("products", "Produkt gelöscht: " + b.dataset.del);
            toast("Produkt gelöscht (auch aus Supabase)", "success");
            render();
          }
        }));
      };
      render();
    },

    // -------- INVENTORY --------
    inventory(root){
      setHeader("Lagerbestand", "Verfügbarkeit + Predictive Stock-Out");
      const products = getActiveProducts();

      // Predictive: jedes Produkt mit Vorhersage anreichern
      const enriched = products.map(p => {
        const stock = p.stock ?? 50;
        const pred = predictStockOut(p.id, stock);
        return {...p, _stock: stock, _pred: pred};
      });
      // Sortieren: zuerst die mit niedrigster daysLeft, dann nach stock asc
      enriched.sort((a, b) => {
        if(a._pred && b._pred) return a._pred.daysLeft - b._pred.daysLeft;
        if(a._pred) return -1;
        if(b._pred) return 1;
        return a._stock - b._stock;
      });

      const critical = enriched.filter(p => p._pred && p._pred.daysLeft < 7 && p._stock > 0);

      root.innerHTML = `
        <div class="stat-grid">
          <div class="stat"><div class="stat-ico green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m5 12 5 5L20 7"/></svg></div><div class="stat-meta"><div class="stat-label">Auf Lager</div><div class="stat-value">${products.filter(p => (p.stock??50) > 10).length}</div></div></div>
          <div class="stat"><div class="stat-ico orange"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 9v4M12 17h.01M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z"/></svg></div><div class="stat-meta"><div class="stat-label">Niedriger Bestand</div><div class="stat-value">${products.filter(p => (p.stock??50) <= 10 && (p.stock??50) > 0).length}</div></div></div>
          <div class="stat"><div class="stat-ico red"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/></svg></div><div class="stat-meta"><div class="stat-label">Ausverkauft</div><div class="stat-value">${products.filter(p => (p.stock??50) === 0).length}</div></div></div>
          <div class="stat"><div class="stat-ico purple"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v20"/><path d="m4 7 8-5 8 5"/><path d="m20 17-8 5-8-5"/></svg></div><div class="stat-meta"><div class="stat-label">⚠ Bald aus</div><div class="stat-value">${critical.length}</div><div class="stat-trend down">< 7 Tage übrig</div></div></div>
        </div>

        ${critical.length > 0 ? `
          <div class="adm-card" style="margin-bottom:20px;border-left:4px solid var(--adm-warn)">
            <div class="adm-card-h"><h3>⚠ Predictive Stock-Out — Nachbestellen empfohlen</h3></div>
            <div class="adm-card-b">
              <div style="display:grid;gap:10px">
                ${critical.slice(0, 5).map(p => `
                  <div style="display:flex;align-items:center;gap:14px;padding:10px 14px;background:var(--adm-warn-soft);border-radius:8px">
                    <img class="thumb" src="${escapeHtml(p.img||p.image||'')}" alt="" style="width:38px;height:38px">
                    <div style="flex:1">
                      <strong>${escapeHtml(p.name)}</strong><br>
                      <small style="color:var(--adm-ink-soft)">${p._stock} auf Lager · ${p._pred.avgDaily.toFixed(1)} verkauft/Tag (14d)</small>
                    </div>
                    <strong style="color:var(--adm-warn)">${Math.ceil(p._pred.daysLeft)} Tage</strong>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        ` : ''}

        <div class="adm-card">
          <div class="adm-card-h"><h3>Bestände</h3></div>
          <div class="adm-table-wrap">
            <table class="adm-table">
              <thead><tr><th></th><th>Produkt</th><th>SKU</th><th>Bestand</th><th>Vorhersage</th><th>Anpassen</th></tr></thead>
              <tbody>
                ${enriched.map(p => {
                  const pred = p._pred;
                  let predHtml = '<span style="color:var(--adm-ink-soft);font-size:.78rem">zu wenig Daten</span>';
                  if(pred){
                    const days = Math.ceil(pred.daysLeft);
                    const cls = days < 7 ? 'pill-red' : (days < 14 ? 'pill-orange' : 'pill-green');
                    predHtml = `<span class="pill ${cls}">in ${days} Tagen aus</span><br><small style="color:var(--adm-ink-soft);font-size:.7rem">${pred.avgDaily.toFixed(1)}/Tag</small>`;
                  }
                  return `
                    <tr>
                      <td><img class="thumb" src="${escapeHtml(p.img||p.image||'')}" alt=""></td>
                      <td><strong>${escapeHtml(p.name)}</strong></td>
                      <td><code style="font-size:.75rem">${escapeHtml(p.id)}</code></td>
                      <td>${stockPill(p._stock)}</td>
                      <td>${predHtml}</td>
                      <td><input type="number" min="0" value="${p._stock}" data-stock="${escapeHtml(p.id)}" style="width:90px;padding:6px 10px;border:1px solid var(--adm-line);border-radius:6px;background:var(--adm-surface);color:var(--adm-ink)"></td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;

      root.querySelectorAll("[data-stock]").forEach(inp => {
        inp.addEventListener("change", e => {
          const id = inp.dataset.stock;
          const val = parseInt(inp.value, 10) || 0;
          setProductOverride(id, {stock: val});
          toast("Bestand aktualisiert", "success");
        });
      });
    },

    // -------- CUSTOMERS --------
    customers(root){
      setHeader("Kunden", "Konten und Profile");
      const acc = load(K.account, null);
      const orders = getOrders();

      const customers = [];
      if(acc?.email){
        const myOrders = orders.filter(o => (o.customer?.email||'').toLowerCase() === acc.email.toLowerCase());
        customers.push({...acc, orders: myOrders.length, spent: myOrders.reduce((s,o)=>s+(Number(o.total)||0),0)});
      }
      // Zusätzliche Kunden aus Bestellungen extrahieren
      const seen = new Set(customers.map(c => (c.email||'').toLowerCase()));
      orders.forEach(o => {
        const em = (o.customer?.email||'').toLowerCase();
        if(em && !seen.has(em)){
          seen.add(em);
          const all = orders.filter(x => (x.customer?.email||'').toLowerCase() === em);
          customers.push({
            name: o.customer.name,
            email: o.customer.email,
            orders: all.length,
            spent: all.reduce((s,x)=>s+(Number(x.total)||0),0)
          });
        }
      });

      root.innerHTML = `
        <div class="adm-card">
          <div class="adm-card-h"><h3>${customers.length} Kunden</h3><button class="adm-btn" id="c-export"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>Exportieren</button></div>
          ${customers.length === 0 ? `<div class="empty"><h3>Noch keine Kunden</h3><p>Sobald jemand bestellt oder ein Konto erstellt, erscheint er hier.</p></div>` : `
            <div class="adm-table-wrap">
              <table class="adm-table">
                <thead><tr><th>Name</th><th>E-Mail</th><th class="num">Bestellungen</th><th class="num">Gesamtumsatz</th></tr></thead>
                <tbody>
                  ${customers.map(c => `
                    <tr>
                      <td><strong>${escapeHtml(c.name || '—')}</strong></td>
                      <td>${escapeHtml(c.email)}</td>
                      <td class="num">${c.orders}</td>
                      <td class="num"><strong>${fmtEUR(c.spent)}</strong></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `}
        </div>
      `;
      const ex = $("#c-export"); if(ex) ex.addEventListener("click", () => exportCSV("customers.csv", customers));
    },

    // -------- DROPS --------
    drops(root){
      setHeader("Drops", "Release-Kalender pflegen");
      const drops = getDrops();

      const render = () => {
        const d = getDrops();
        root.innerHTML = `
          <div class="adm-toolbar">
            <h3 style="margin:0;flex:1">${d.length} geplante Drops</h3>
            <button class="adm-btn primary" id="d-new"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Neuer Drop</button>
          </div>
          <div class="adm-card">
            <div class="adm-table-wrap">
              <table class="adm-table">
                <thead><tr><th></th><th>Drop</th><th>Datum</th><th>Status</th><th>Erinnerungen</th><th></th></tr></thead>
                <tbody>
                  ${d.map(drop => {
                    const remCount = Object.entries(load(K.reminders, {})).filter(([k]) => k === drop.id).length;
                    return `
                      <tr>
                        <td><img class="thumb" src="${escapeHtml(drop.img||'')}" alt=""></td>
                        <td><strong>${escapeHtml(drop.title)}</strong><br><small style="color:var(--adm-ink-soft)">${escapeHtml(drop.desc||'')}</small></td>
                        <td>${fmtDateTime(drop.date)}</td>
                        <td>${drop.status === 'live' ? '<span class="pill pill-green">Live</span>' : '<span class="pill pill-blue">Geplant</span>'}</td>
                        <td>${remCount} 🔔</td>
                        <td><div class="adm-btn-row"><button class="adm-btn sm" data-edit-drop="${escapeHtml(drop.id)}">Bearbeiten</button><button class="adm-btn sm danger" data-del-drop="${escapeHtml(drop.id)}">Löschen</button></div></td>
                      </tr>
                    `;
                  }).join("")}
                </tbody>
              </table>
            </div>
          </div>
        `;

        $("#d-new").addEventListener("click", () => openDropForm(null, render));
        root.querySelectorAll("[data-edit-drop]").forEach(b => b.addEventListener("click", () => openDropForm(b.dataset.editDrop, render)));
        root.querySelectorAll("[data-del-drop]").forEach(b => b.addEventListener("click", async () => {
          if(await confirmModal("Drop wirklich löschen?")){
            saveDrops(getDrops().filter(x => x.id !== b.dataset.delDrop));
            toast("Drop gelöscht", "success");
            render();
          }
        }));
      };
      render();
    },

    // -------- DROP-VERGLEICH --------
    "drop-compare"(root){
      setHeader("Drop-Performance", "Side-by-Side Vergleich vergangener Drops");
      const drops = getDrops();
      const orders = getOrders();

      // Pro Drop Stats berechnen — aus Bestellungen die im Drop-Zeitraum gemacht wurden
      const stats = drops.map(drop => {
        const dropDate = new Date(drop.date).getTime();
        const windowEnd = dropDate + 14 * 86400000; // 14 Tage nach Drop-Datum
        const dropOrders = orders.filter(o => {
          const od = new Date(o.date||0).getTime();
          return od >= dropDate && od < windowEnd;
        });
        const revenue = dropOrders.reduce((s,o) => s + (Number(o.total)||0), 0);
        const units = dropOrders.reduce((s,o) => s + (o.items||[]).reduce((u,it) => u + (it.qty||1), 0), 0);
        // Top-Piece
        const pieceCount = {};
        dropOrders.forEach(o => (o.items||[]).forEach(it => {
          pieceCount[it.name||'unbekannt'] = (pieceCount[it.name||'unbekannt']||0) + (it.qty||1);
        }));
        const topPiece = Object.entries(pieceCount).sort((a,b) => b[1]-a[1])[0];
        // Sell-through Rate (Demo: random aber konsistent)
        const seed = drop.id?.split("").reduce((s,c) => s + c.charCodeAt(0), 0) || 0;
        const sellThrough = 40 + (seed % 55); // 40-95%
        // Reminders für diesen Drop
        const reminders = Object.keys(load(K.reminders, {})).filter(k => k === drop.id).length;
        return {
          drop, revenue, units, topPiece,
          sellThrough,
          orderCount: dropOrders.length,
          reminders,
          avgOrder: dropOrders.length ? revenue/dropOrders.length : 0
        };
      });

      // Sort: höchster Umsatz oben
      stats.sort((a,b) => b.revenue - a.revenue);

      // Top-3 Side-by-Side, Rest als kleinere Tabelle
      const top = stats.slice(0, 3);
      const rest = stats.slice(3);

      root.innerHTML = `
        ${top.length > 0 ? `
          <div class="adm-card" style="margin-bottom:20px">
            <div class="adm-card-h"><h3>Top-3 Drops im Vergleich</h3></div>
            <div class="adm-card-b">
              <div style="display:grid;grid-template-columns:repeat(${top.length},1fr);gap:16px">
                ${top.map((s, i) => {
                  const isGold = i === 0;
                  return `
                  <div style="border:${isGold?'2px':'1px'} solid ${isGold?'#b8941f':'var(--adm-line)'};border-radius:12px;padding:20px;position:relative;overflow:hidden;${isGold?`background:linear-gradient(135deg,#f5d76e 0%,#e6b800 35%,#d4af37 70%,#b8941f 100%);box-shadow:0 8px 24px rgba(180,148,31,.35),inset 0 1px 0 rgba(255,255,255,.4);color:#1a1a1a;`:''}">
                    ${isGold ? `
                      <!-- Schimmer-Overlay -->
                      <div style="position:absolute;inset:0;background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,.35) 50%,transparent 70%);pointer-events:none"></div>
                      <!-- Krone-Icon top right -->
                      <div style="position:absolute;top:14px;right:14px;font-size:1.8rem;filter:drop-shadow(0 2px 4px rgba(0,0,0,.2))">👑</div>
                    ` : ''}
                    ${isGold ? '<div style="display:inline-flex;align-items:center;gap:6px;background:#1a1a1a;color:#f5d76e;font-size:.72rem;font-weight:700;padding:4px 12px;border-radius:99px;margin-bottom:12px;letter-spacing:.1em;box-shadow:0 2px 6px rgba(0,0,0,.2);position:relative;z-index:1"><span>🏆</span>TOP-DROP</div>' : ''}
                    <h4 style="margin:0 0 4px;font-family:'Anton',sans-serif;font-size:${isGold?'1.3rem':'1.15rem'};${isGold?'color:#1a1a1a;text-shadow:0 1px 2px rgba(255,255,255,.4);position:relative;z-index:1':''}">${escapeHtml(s.drop.title)}</h4>
                    <small style="${isGold?'color:#4a3a0a':'color:var(--adm-ink-soft)'};${isGold?'position:relative;z-index:1':''}">${fmtDate(s.drop.date)}</small>
                    <div style="margin:14px 0;padding:14px 0;border-top:1px solid ${isGold?'rgba(26,26,26,.18)':'var(--adm-line)'};border-bottom:1px solid ${isGold?'rgba(26,26,26,.18)':'var(--adm-line)'};${isGold?'position:relative;z-index:1':''}">
                      <div style="font-family:'Anton',sans-serif;font-size:${isGold?'2.1rem':'1.8rem'};line-height:1.1;${isGold?'color:#1a1a1a;text-shadow:0 1px 2px rgba(255,255,255,.4)':''}">${fmtEUR(s.revenue)}</div>
                      <small style="${isGold?'color:#4a3a0a':'color:var(--adm-ink-soft)'};text-transform:uppercase;letter-spacing:.08em;font-size:.7rem;font-weight:600">Umsatz</small>
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:.85rem;${isGold?'position:relative;z-index:1':''}">
                      <div><strong style="${isGold?'color:#1a1a1a':''}">${s.orderCount}</strong><br><small style="${isGold?'color:#4a3a0a':'color:var(--adm-ink-soft)'}">Bestellungen</small></div>
                      <div><strong style="${isGold?'color:#1a1a1a':''}">${s.units}</strong><br><small style="${isGold?'color:#4a3a0a':'color:var(--adm-ink-soft)'}">Einheiten</small></div>
                      <div><strong style="${isGold?'color:#1a1a1a':''}">${fmtEUR(s.avgOrder)}</strong><br><small style="${isGold?'color:#4a3a0a':'color:var(--adm-ink-soft)'}">Ø Bestellwert</small></div>
                      <div><strong style="${isGold?'color:#1a1a1a':''}">${s.sellThrough}%</strong><br><small style="${isGold?'color:#4a3a0a':'color:var(--adm-ink-soft)'}">Sell-Through</small></div>
                    </div>
                    <div style="margin-top:12px;padding-top:12px;border-top:1px solid ${isGold?'rgba(26,26,26,.18)':'var(--adm-line)'};${isGold?'position:relative;z-index:1':''}">
                      <div style="display:flex;justify-content:space-between;font-size:.78rem;${isGold?'color:#4a3a0a':'color:var(--adm-ink-soft)'};margin-bottom:4px;font-weight:${isGold?'600':'400'}">
                        <span>Sell-Through</span><span>${s.sellThrough}%</span>
                      </div>
                      <div style="background:${isGold?'rgba(26,26,26,.18)':'var(--adm-surface-2)'};height:6px;border-radius:99px;overflow:hidden">
                        <div style="width:${s.sellThrough}%;height:100%;background:${isGold?'linear-gradient(90deg,#1a1a1a,#4a3a0a)':'linear-gradient(90deg,'+(s.sellThrough>80?'#2f7a3e':s.sellThrough>60?'#b87b00':'#b3261e')+','+(s.sellThrough>80?'#266531':s.sellThrough>60?'#8a5e00':'#8c1f19')+')'};border-radius:99px"></div>
                      </div>
                    </div>
                    ${s.topPiece ? `<div style="margin-top:10px;font-size:.78rem;${isGold?'color:#4a3a0a':'color:var(--adm-ink-soft)'};${isGold?'position:relative;z-index:1':''}">🏅 Top-Piece: <strong style="${isGold?'color:#1a1a1a':'color:var(--adm-ink)'}">${escapeHtml(s.topPiece[0])}</strong> (${s.topPiece[1]}×)</div>` : ''}
                    <div style="margin-top:8px;font-size:.78rem;${isGold?'color:#4a3a0a':'color:var(--adm-ink-soft)'};${isGold?'position:relative;z-index:1':''}">🔔 ${s.reminders} Erinnerungen vorab</div>
                  </div>
                `}).join("")}
              </div>
            </div>
          </div>
        ` : ''}

        ${rest.length > 0 ? `
          <div class="adm-card">
            <div class="adm-card-h"><h3>Alle Drops im Überblick</h3></div>
            <div class="adm-table-wrap">
              <table class="adm-table">
                <thead><tr><th>Drop</th><th>Datum</th><th class="num">Umsatz</th><th class="num">Bestellungen</th><th class="num">Einheiten</th><th>Sell-Through</th><th>Top-Piece</th></tr></thead>
                <tbody>
                  ${rest.map(s => `
                    <tr>
                      <td><strong>${escapeHtml(s.drop.title)}</strong></td>
                      <td>${fmtDate(s.drop.date)}</td>
                      <td class="num"><strong>${fmtEUR(s.revenue)}</strong></td>
                      <td class="num">${s.orderCount}</td>
                      <td class="num">${s.units}</td>
                      <td><span class="pill ${s.sellThrough>80?'pill-green':s.sellThrough>60?'pill-orange':'pill-red'}">${s.sellThrough}%</span></td>
                      <td>${s.topPiece ? escapeHtml(s.topPiece[0]) + ' (' + s.topPiece[1] + '×)' : '—'}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        ` : ''}

        ${stats.length === 0 ? '<div class="adm-card"><div class="empty"><h3>Keine Drops zum Vergleichen</h3><p>Lege erst Drops an.</p></div></div>' : ''}
      `;
    },

    // -------- SALE-KALENDER --------
    "sale-calendar"(root){
      setHeader("Sale-Kalender", "Plane zukünftige Sales, Drops und Promotions");

      let viewMonth = new Date();
      viewMonth.setDate(1);

      const render = () => {
        const events = load(K.saleCalendar, []);
        const year = viewMonth.getFullYear();
        const month = viewMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month+1, 0);
        const startOffset = (firstDay.getDay() + 6) % 7; // Montag = 0
        const daysInMonth = lastDay.getDate();

        const monthLabel = viewMonth.toLocaleDateString("de-DE", {month:"long", year:"numeric"});
        const weekdays = ["Mo","Di","Mi","Do","Fr","Sa","So"];

        const eventsByDay = {};
        events.forEach(e => {
          const d = new Date(e.date);
          if(d.getFullYear() === year && d.getMonth() === month){
            const day = d.getDate();
            if(!eventsByDay[day]) eventsByDay[day] = [];
            eventsByDay[day].push(e);
          }
          // End-Date markieren falls vorhanden und im selben Monat
          if(e.endDate){
            const ed = new Date(e.endDate);
            if(ed.getFullYear() === year && ed.getMonth() === month){
              const start = new Date(e.date);
              for(let d = new Date(start); d <= ed; d.setDate(d.getDate()+1)){
                if(d.getFullYear() === year && d.getMonth() === month){
                  const day = d.getDate();
                  if(!eventsByDay[day]) eventsByDay[day] = [];
                  if(!eventsByDay[day].find(x => x.id === e.id)) eventsByDay[day].push(e);
                }
              }
            }
          }
        });

        const typeColors = {
          sale: {bg:"#fce8e6", border:"#b3261e", emoji:"🏷"},
          drop: {bg:"#e6f3e9", border:"#2f7a3e", emoji:"🚀"},
          promotion: {bg:"#fbf3e1", border:"#b87b00", emoji:"📣"}
        };

        let cellsHtml = '';
        // Leere Zellen am Anfang
        for(let i = 0; i < startOffset; i++){
          cellsHtml += '<div style="min-height:90px;background:var(--adm-surface-2);border-radius:8px;opacity:.3"></div>';
        }
        for(let day = 1; day <= daysInMonth; day++){
          const today = new Date();
          const isToday = (today.getFullYear() === year && today.getMonth() === month && today.getDate() === day);
          const dayEvents = eventsByDay[day] || [];
          cellsHtml += `
            <div style="min-height:90px;background:var(--adm-surface);border:1px solid var(--adm-line);border-radius:8px;padding:6px;cursor:pointer;${isToday?'border-color:var(--adm-ink);box-shadow:0 0 0 2px var(--adm-accent-soft)':''}" data-day="${day}">
              <div style="font-size:.78rem;font-weight:${isToday?700:500};color:${isToday?'var(--adm-ink)':'var(--adm-ink-soft)'}">${day}${isToday?' · Heute':''}</div>
              ${dayEvents.map(e => `
                <div style="margin-top:4px;padding:3px 6px;border-radius:4px;background:${typeColors[e.type]?.bg||'var(--adm-accent-soft)'};border-left:3px solid ${typeColors[e.type]?.border||'var(--adm-ink)'};font-size:.7rem;line-height:1.2" data-event-id="${escapeHtml(e.id)}">
                  ${typeColors[e.type]?.emoji||''} ${escapeHtml(e.name.slice(0,18))}${e.name.length>18?'…':''}
                  ${e.discount ? ' <strong>-' + e.discount + '%</strong>' : ''}
                </div>
              `).join("")}
            </div>
          `;
        }

        root.innerHTML = `
          <div class="adm-toolbar">
            <button class="adm-btn" id="cal-prev">← Vorher</button>
            <h3 style="margin:0;flex:1;text-align:center;font-family:'Anton',sans-serif;font-size:1.3rem;letter-spacing:.02em">${monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1)}</h3>
            <button class="adm-btn" id="cal-today">Heute</button>
            <button class="adm-btn" id="cal-next">Nächster →</button>
            <button class="adm-btn primary" id="cal-new"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Neuer Eintrag</button>
          </div>

          <div class="adm-card">
            <div class="adm-card-b">
              <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:8px">
                ${weekdays.map(w => `<div style="text-align:center;font-size:.72rem;font-weight:600;color:var(--adm-ink-soft);text-transform:uppercase;letter-spacing:.1em;padding:6px 0">${w}</div>`).join("")}
              </div>
              <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:8px">
                ${cellsHtml}
              </div>

              <div style="margin-top:18px;padding-top:14px;border-top:1px solid var(--adm-line);display:flex;gap:18px;font-size:.8rem;color:var(--adm-ink-soft);flex-wrap:wrap">
                <span><span style="display:inline-block;width:10px;height:10px;background:#fce8e6;border-left:3px solid #b3261e;margin-right:4px"></span>Sale</span>
                <span><span style="display:inline-block;width:10px;height:10px;background:#e6f3e9;border-left:3px solid #2f7a3e;margin-right:4px"></span>Drop</span>
                <span><span style="display:inline-block;width:10px;height:10px;background:#fbf3e1;border-left:3px solid #b87b00;margin-right:4px"></span>Promotion</span>
              </div>
            </div>
          </div>

          <div class="adm-card" style="margin-top:20px">
            <div class="adm-card-h"><h3>Anstehende Events (nächste 30 Tage)</h3></div>
            <div class="adm-card-b" style="padding:0">
              <div class="adm-table-wrap">
                <table class="adm-table">
                  <thead><tr><th>Datum</th><th>Event</th><th>Typ</th><th class="num">Rabatt</th><th>Status</th><th>Checkliste</th><th></th></tr></thead>
                  <tbody>
                    ${events.filter(e => {
                      const d = new Date(e.date);
                      const diff = (d - new Date()) / 86400000;
                      return diff >= -1 && diff <= 30;
                    }).sort((a,b) => new Date(a.date) - new Date(b.date)).map(e => {
                      const checkDone = (e.checklist||[]).filter(c => c.done).length;
                      const checkTotal = (e.checklist||[]).length;
                      return `
                        <tr>
                          <td><strong>${fmtDate(e.date)}</strong>${e.endDate ? '<br><small style="color:var(--adm-ink-soft)">bis ' + fmtDate(e.endDate) + '</small>' : ''}</td>
                          <td><strong>${escapeHtml(e.name)}</strong>${e.note ? '<br><small style="color:var(--adm-ink-soft)">' + escapeHtml(e.note.slice(0,40)) + (e.note.length>40?'…':'') + '</small>' : ''}</td>
                          <td>${typeColors[e.type]?.emoji||''} ${escapeHtml(e.type)}</td>
                          <td class="num">${e.discount ? '<strong>-' + e.discount + '%</strong>' : '—'}</td>
                          <td>${e.status === 'scheduled' ? '<span class="pill pill-blue">geplant</span>' : e.status === 'draft' ? '<span class="pill pill-gray">Entwurf</span>' : e.status === 'completed' ? '<span class="pill pill-green">abgeschlossen</span>' : '<span class="pill pill-orange">aktiv</span>'}</td>
                          <td>${checkTotal ? `<div style="display:flex;align-items:center;gap:6px"><div style="background:var(--adm-surface-2);width:60px;height:5px;border-radius:99px;overflow:hidden"><div style="width:${(checkDone/checkTotal*100).toFixed(0)}%;background:var(--adm-success);height:100%"></div></div><small>${checkDone}/${checkTotal}</small></div>` : '—'}</td>
                          <td><div class="adm-btn-row"><button class="adm-btn sm" data-edit-sc="${escapeHtml(e.id)}">Bearbeiten</button></div></td>
                        </tr>
                      `;
                    }).join("") || '<tr><td colspan="7" style="text-align:center;color:var(--adm-ink-soft);padding:24px">Keine anstehenden Events</td></tr>'}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        `;

        $("#cal-prev").addEventListener("click", () => { viewMonth.setMonth(viewMonth.getMonth() - 1); render(); });
        $("#cal-next").addEventListener("click", () => { viewMonth.setMonth(viewMonth.getMonth() + 1); render(); });
        $("#cal-today").addEventListener("click", () => { viewMonth = new Date(); viewMonth.setDate(1); render(); });
        $("#cal-new").addEventListener("click", () => openSaleEventForm(null, render));
        root.querySelectorAll("[data-edit-sc]").forEach(b => b.addEventListener("click", () => openSaleEventForm(b.dataset.editSc, render)));
        root.querySelectorAll("[data-event-id]").forEach(b => b.addEventListener("click", e => {
          e.stopPropagation();
          openSaleEventForm(b.dataset.eventId, render);
        }));
        root.querySelectorAll("[data-day]").forEach(b => b.addEventListener("click", e => {
          if(e.target.closest("[data-event-id]")) return;
          const day = parseInt(b.dataset.day, 10);
          const date = new Date(viewMonth);
          date.setDate(day);
          openSaleEventForm(null, render, date.toISOString().slice(0,10));
        }));
      };
      render();
    },

    // -------- REMINDERS --------
    reminders(root){
      setHeader("Erinnerungen", "Wer wartet auf welchen Drop");
      const rem = load(K.reminders, {});
      const drops = getDrops();
      const entries = Object.entries(rem).map(([dropKey, data]) => {
        const drop = drops.find(d => d.id === dropKey);
        return {dropKey, dropTitle: drop?.title || dropKey, dropDate: drop?.date, ...data};
      });

      root.innerHTML = `
        <div class="stat-grid">
          <div class="stat"><div class="stat-ico blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8"/></svg></div><div class="stat-meta"><div class="stat-label">Erinnerungen total</div><div class="stat-value">${entries.length}</div></div></div>
          <div class="stat"><div class="stat-ico purple"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></div><div class="stat-meta"><div class="stat-label">Per E-Mail</div><div class="stat-value">${entries.filter(e => e.type === 'email').length}</div></div></div>
          <div class="stat"><div class="stat-ico orange"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8"/></svg></div><div class="stat-meta"><div class="stat-label">Per Push</div><div class="stat-value">${entries.filter(e => e.type === 'push').length}</div></div></div>
        </div>
        <div class="adm-card">
          ${entries.length === 0 ? `<div class="empty"><h3>Noch keine Erinnerungen</h3><p>Sobald jemand auf der Drops-Seite „Erinnern lassen" klickt, erscheinen sie hier.</p></div>` : `
            <div class="adm-table-wrap">
              <table class="adm-table">
                <thead><tr><th>Drop</th><th>Drop-Datum</th><th>Typ</th><th>Kontakt</th><th>Angemeldet</th><th></th></tr></thead>
                <tbody>
                  ${entries.map(e => `
                    <tr>
                      <td><strong>${escapeHtml(e.dropTitle)}</strong></td>
                      <td>${fmtDateTime(e.dropDate)}</td>
                      <td>${e.type === 'email' ? '<span class="pill pill-blue">📧 E-Mail</span>' : '<span class="pill pill-orange">🔔 Push</span>'}</td>
                      <td>${escapeHtml(e.email || 'Browser-Benachrichtigung')}</td>
                      <td>${fmtDateTime(e.savedAt)}</td>
                      <td><button class="adm-btn sm danger" data-del-rem="${escapeHtml(e.dropKey)}">Entfernen</button></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `}
        </div>
      `;
      root.querySelectorAll("[data-del-rem]").forEach(b => b.addEventListener("click", () => {
        const r = load(K.reminders, {});
        delete r[b.dataset.delRem];
        save(K.reminders, r);
        toast("Erinnerung entfernt", "success");
        VIEWS.reminders(root);
      }));
    },

    // -------- REVIEWS --------
    reviews(root){
      setHeader("Bewertungen", "Kundenfeedback moderieren");
      const reviews = load(K.reviews, {});
      const entries = Object.entries(reviews).flatMap(([pid, arr]) =>
        (arr || []).map(r => ({...r, productId: pid}))
      );

      root.innerHTML = `
        <div class="stat-grid">
          <div class="stat"><div class="stat-ico orange"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m12 2 3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg></div><div class="stat-meta"><div class="stat-label">Bewertungen</div><div class="stat-value">${entries.length}</div></div></div>
          <div class="stat"><div class="stat-ico green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v20M2 12h20"/></svg></div><div class="stat-meta"><div class="stat-label">Durchschnitt</div><div class="stat-value">${entries.length ? (entries.reduce((s,r)=>s+(r.rating||0),0)/entries.length).toFixed(1) : '—'}</div></div></div>
        </div>
        <div class="adm-card">
          ${entries.length === 0 ? `<div class="empty"><h3>Noch keine Bewertungen</h3></div>` : `
            <div class="adm-table-wrap">
              <table class="adm-table">
                <thead><tr><th>Produkt</th><th>Sterne</th><th>Autor</th><th>Text</th><th>Datum</th><th></th></tr></thead>
                <tbody>
                  ${entries.map((r,i) => `
                    <tr>
                      <td><code>${escapeHtml(r.productId)}</code></td>
                      <td>${'★'.repeat(r.rating||0)}${'☆'.repeat(5-(r.rating||0))}</td>
                      <td>${escapeHtml(r.author||'Anonym')}</td>
                      <td style="max-width:400px">${escapeHtml((r.text||'').slice(0,140))}${(r.text||'').length>140?'…':''}</td>
                      <td>${fmtDate(r.date)}</td>
                      <td><button class="adm-btn sm danger" data-del-rev="${escapeHtml(r.productId)}|${i}">Löschen</button></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `}
        </div>
      `;
      root.querySelectorAll("[data-del-rev]").forEach(b => b.addEventListener("click", () => {
        const [pid, idx] = b.dataset.delRev.split("|");
        const rv = load(K.reviews, {});
        if(rv[pid]) { rv[pid].splice(parseInt(idx,10), 1); save(K.reviews, rv); }
        toast("Bewertung gelöscht", "success");
        VIEWS.reviews(root);
      }));
    },

    // -------- DISCOUNTS --------
    discounts(root){
      setHeader("Gutscheine", "Rabattcodes verwalten");

      const render = () => {
        const list = getDiscounts();
        root.innerHTML = `
          <div class="adm-toolbar">
            <h3 style="margin:0;flex:1">${list.length} Codes</h3>
            <button class="adm-btn primary" id="dc-new"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Neuer Code</button>
          </div>
          <div class="adm-card">
            <div class="adm-table-wrap">
              <table class="adm-table">
                <thead><tr><th>Code</th><th>Rabatt</th><th>Verwendet</th><th>Max</th><th>Läuft ab</th><th>Status</th><th></th></tr></thead>
                <tbody>
                  ${list.map(d => `
                    <tr>
                      <td><code style="background:var(--adm-accent-soft);padding:4px 10px;border-radius:4px;font-weight:600">${escapeHtml(d.code)}</code></td>
                      <td><strong>${d.percent}%</strong></td>
                      <td>${d.uses || 0}</td>
                      <td>${d.max || '∞'}</td>
                      <td>${d.expires ? fmtDate(d.expires) : '—'}</td>
                      <td>${d.active ? '<span class="pill pill-green">aktiv</span>' : '<span class="pill pill-gray">pausiert</span>'}</td>
                      <td><div class="adm-btn-row"><button class="adm-btn sm" data-edit-dc="${escapeHtml(d.id)}">Bearbeiten</button><button class="adm-btn sm danger" data-del-dc="${escapeHtml(d.id)}">Löschen</button></div></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        `;
        $("#dc-new").addEventListener("click", () => openDiscountForm(null, render));
        root.querySelectorAll("[data-edit-dc]").forEach(b => b.addEventListener("click", () => openDiscountForm(b.dataset.editDc, render)));
        root.querySelectorAll("[data-del-dc]").forEach(b => b.addEventListener("click", async () => {
          if(await confirmModal("Gutschein wirklich löschen?")){
            saveDiscounts(getDiscounts().filter(x => x.id !== b.dataset.delDc));
            toast("Gutschein gelöscht", "success");
            render();
          }
        }));
      };
      render();
    },

    // -------- GIFTCARDS --------
    giftcards(root){
      setHeader("Geschenkkarten", "Karten ausstellen und einsehen");
      const cards = load(K.giftcards, {});
      const entries = Object.entries(cards);

      root.innerHTML = `
        <div class="adm-toolbar">
          <h3 style="margin:0;flex:1">${entries.length} Geschenkkarten</h3>
          <button class="adm-btn primary" id="gc-new"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Karte erstellen</button>
        </div>
        <div class="adm-card">
          ${entries.length === 0 ? `<div class="empty"><h3>Noch keine Geschenkkarten</h3></div>` : `
            <div class="adm-table-wrap">
              <table class="adm-table">
                <thead><tr><th>Code</th><th>Wert</th><th>Verwendet</th><th>Status</th><th></th></tr></thead>
                <tbody>
                  ${entries.map(([code, data]) => `
                    <tr>
                      <td><code style="background:var(--adm-accent-soft);padding:4px 10px;border-radius:4px;font-weight:600">${escapeHtml(code)}</code></td>
                      <td><strong>${fmtEUR(data.amount)}</strong></td>
                      <td>${data.used ? fmtEUR(data.used) : fmtEUR(0)}</td>
                      <td>${data.used >= data.amount ? '<span class="pill pill-gray">eingelöst</span>' : '<span class="pill pill-green">aktiv</span>'}</td>
                      <td><button class="adm-btn sm danger" data-del-gc="${escapeHtml(code)}">Löschen</button></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `}
        </div>
      `;
      $("#gc-new").addEventListener("click", () => openGiftcardForm(() => VIEWS.giftcards(root)));
      root.querySelectorAll("[data-del-gc]").forEach(b => b.addEventListener("click", async () => {
        if(await confirmModal("Geschenkkarte wirklich löschen?")){
          const c = load(K.giftcards, {});
          delete c[b.dataset.delGc];
          save(K.giftcards, c);
          toast("Karte gelöscht", "success");
          VIEWS.giftcards(root);
        }
      }));
    },

    // -------- LIGHT POINTS --------
    loyalty(root){
      setHeader("Light Points", "Treueprogramm");
      const lp = load(K.lp, {points: 0, history: []});

      root.innerHTML = `
        <div class="stat-grid">
          <div class="stat"><div class="stat-ico purple"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v20M2 12h20"/></svg></div><div class="stat-meta"><div class="stat-label">Aktive Punkte</div><div class="stat-value">${lp.points || 0}</div></div></div>
          <div class="stat"><div class="stat-ico green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m5 12 5 5L20 7"/></svg></div><div class="stat-meta"><div class="stat-label">Transaktionen</div><div class="stat-value">${(lp.history||[]).length}</div></div></div>
        </div>
        <div class="adm-card">
          <div class="adm-card-h"><h3>Punkteverlauf</h3></div>
          ${(lp.history||[]).length === 0 ? `<div class="empty"><h3>Noch keine Transaktionen</h3></div>` : `
            <div class="adm-table-wrap">
              <table class="adm-table">
                <thead><tr><th>Datum</th><th>Aktion</th><th class="num">Punkte</th></tr></thead>
                <tbody>
                  ${(lp.history||[]).slice().reverse().map(h => `
                    <tr><td>${fmtDateTime(h.date)}</td><td>${escapeHtml(h.label)}</td><td class="num"><strong style="color:${h.amount > 0 ? 'var(--adm-success)' : 'var(--adm-danger)'}">${h.amount > 0 ? '+' : ''}${h.amount}</strong></td></tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `}
        </div>
        <div class="adm-card" style="margin-top:20px">
          <div class="adm-card-h"><h3>Punkte-Regeln</h3></div>
          <div class="adm-card-b">
            <div style="display:grid;gap:12px">
              <div style="display:flex;justify-content:space-between;padding:10px;background:var(--adm-surface-2);border-radius:8px"><span>Pro 1 € Umsatz</span><strong>10 Punkte</strong></div>
              <div style="display:flex;justify-content:space-between;padding:10px;background:var(--adm-surface-2);border-radius:8px"><span>Bewertung schreiben</span><strong>50 Punkte</strong></div>
              <div style="display:flex;justify-content:space-between;padding:10px;background:var(--adm-surface-2);border-radius:8px"><span>Newsletter-Anmeldung</span><strong>100 Punkte</strong></div>
              <div style="display:flex;justify-content:space-between;padding:10px;background:var(--adm-surface-2);border-radius:8px"><span>Einlösewert</span><strong>100 Pkt = 1 €</strong></div>
            </div>
          </div>
        </div>
      `;
    },

    // -------- NEWSLETTER (Supabase) --------
    async newsletter(root){
      setHeader("Newsletter", "Echte Abonnent:innen aus Supabase");
      root.innerHTML = `<div class="adm-card"><div class="adm-card-b"><div class="empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="animation:spin 1.5s linear infinite"><path d="M3 12a9 9 0 1 1 9 9"/></svg><h3>Lade aus Supabase…</h3></div></div></div>`;

      let list = [];
      let isFromSupabase = false;
      try {
        if(typeof window.lwGetNewsletterSubscribers === "function"){
          list = await window.lwGetNewsletterSubscribers();
          isFromSupabase = true;
        }
      } catch(err){
        console.error("Supabase Fehler — Fallback auf localStorage:", err);
        list = getNewsletter();
      }
      if(!isFromSupabase) list = getNewsletter();
      // Beim Sortieren handle beide Felder (subscribed_at vs date)
      list = list.slice().sort((a,b) => new Date(b.subscribed_at||b.date||0) - new Date(a.subscribed_at||a.date||0));

      root.innerHTML = `
        <div class="adm-toolbar">
          <h3 style="margin:0;flex:1">${list.length} Abonnent:innen ${isFromSupabase ? '<span class="pill pill-green" style="margin-left:8px">🟢 Live aus Supabase</span>' : '<span class="pill pill-orange" style="margin-left:8px">⚠️ localStorage Fallback</span>'}</h3>
          <button class="adm-btn" id="nl-refresh">↻ Aktualisieren</button>
          <button class="adm-btn" id="nl-export"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>CSV-Export</button>
        </div>
        <div class="adm-card">
          ${list.length === 0 ? `<div class="empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg><h3>Noch keine Abonnent:innen</h3><p>Sobald sich jemand auf der Website einträgt, erscheint sie/er hier.</p></div>` : `
            <div class="adm-table-wrap">
              <table class="adm-table">
                <thead><tr><th>E-Mail</th><th>Quelle</th><th>Angemeldet</th><th></th></tr></thead>
                <tbody>
                  ${list.map((s) => `
                    <tr>
                      <td><strong>${escapeHtml(s.email)}</strong></td>
                      <td>${escapeHtml(s.source || '—')}</td>
                      <td>${fmtDateTime(s.subscribed_at || s.date)}</td>
                      <td><button class="adm-btn sm danger" data-del-nl="${escapeHtml(String(s.id))}">Entfernen</button></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `}
        </div>
      `;

      $("#nl-refresh").addEventListener("click", () => VIEWS.newsletter(root));
      $("#nl-export").addEventListener("click", () => exportCSV("newsletter.csv", list));
      root.querySelectorAll("[data-del-nl]").forEach(b => b.addEventListener("click", async () => {
        const id = b.dataset.delNl;
        if(!await confirmModal("Diese E-Mail wirklich aus der Datenbank löschen?")) return;
        try {
          if(typeof window.lwDeleteNewsletterSubscriber === "function" && isFromSupabase){
            await window.lwDeleteNewsletterSubscriber(parseInt(id, 10));
            logActivity("newsletter", "Abo gelöscht (Supabase)");
          } else {
            const l = getNewsletter();
            l.splice(parseInt(id, 10), 1);
            save(K.newsletter, l);
          }
          toast("Entfernt", "success");
          VIEWS.newsletter(root);
        } catch(err){
          console.error(err);
          toast("Fehler beim Löschen", "error");
        }
      }));
    },

    // -------- CONTENT --------
    content(root){
      setHeader("Seiten-Inhalte", "Texte direkt anpassen");
      const c = getSiteContent();

      root.innerHTML = `
        <div class="adm-card">
          <div class="adm-card-h"><h3>Hero-Bereich (Startseite)</h3><button class="adm-btn primary" id="ct-save">Speichern</button></div>
          <div class="adm-card-b">
            <div class="content-section">
              <h4>Topbar</h4>
              <input type="text" id="ct-topbar" value="${escapeHtml(c.topbar)}" style="width:100%;padding:10px;border:1px solid var(--adm-line);border-radius:8px">
            </div>
            <div class="content-section">
              <h4>Hero</h4>
              <div class="adm-field-row">
                <div class="adm-field"><label>Eyebrow (Kleiner Text oben)</label><input type="text" id="ct-eyebrow" value="${escapeHtml(c.heroEyebrow)}"></div>
                <div class="adm-field"><label>Hero-Titel (HTML erlaubt)</label><input type="text" id="ct-title" value="${escapeHtml(c.heroTitle)}"></div>
              </div>
              <div class="adm-field" style="margin-top:12px">
                <label>Lead-Text</label>
                <textarea id="ct-lead" rows="3">${escapeHtml(c.heroLead)}</textarea>
              </div>
              <div class="adm-field-row" style="margin-top:12px">
                <div class="adm-field"><label>CTA 1 (Primär-Button)</label><input type="text" id="ct-cta1" value="${escapeHtml(c.heroCta1)}"></div>
                <div class="adm-field"><label>CTA 2 (Sekundär-Button)</label><input type="text" id="ct-cta2" value="${escapeHtml(c.heroCta2)}"></div>
              </div>
            </div>
            <div class="content-section">
              <h4>Story-Bibelvers</h4>
              <input type="text" id="ct-story" value="${escapeHtml(c.storyVerse)}" style="width:100%;padding:10px;border:1px solid var(--adm-line);border-radius:8px">
            </div>
            <div class="content-section">
              <h4>Footer-Vers</h4>
              <input type="text" id="ct-verse" value="${escapeHtml(c.verse)}" style="width:100%;padding:10px;border:1px solid var(--adm-line);border-radius:8px">
            </div>
            <div class="content-section">
              <h4>Newsletter-Box</h4>
              <div class="adm-field-row">
                <div class="adm-field"><label>Titel</label><input type="text" id="ct-nlt" value="${escapeHtml(c.newsletterTitle)}"></div>
                <div class="adm-field"><label>Text</label><input type="text" id="ct-nltext" value="${escapeHtml(c.newsletterText)}"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="adm-card" style="margin-top:20px">
          <div class="adm-card-h"><h3>Hinweis</h3></div>
          <div class="adm-card-b">
            <p style="margin:0;color:var(--adm-ink-soft);font-size:.9rem">Änderungen werden im Browser-LocalStorage gespeichert. Für eine produktive Anwendung müssen sie via Backend an die jeweiligen HTML-Seiten gepushed werden. Aktuell dienen sie als Vorschau und Single-Source-of-Truth.</p>
          </div>
        </div>
      `;

      $("#ct-save").addEventListener("click", () => {
        logActivity("content", "Seiten-Inhalte aktualisiert");
        saveSiteContent({
          topbar: $("#ct-topbar").value,
          heroEyebrow: $("#ct-eyebrow").value,
          heroTitle: $("#ct-title").value,
          heroLead: $("#ct-lead").value,
          heroCta1: $("#ct-cta1").value,
          heroCta2: $("#ct-cta2").value,
          storyVerse: $("#ct-story").value,
          verse: $("#ct-verse").value,
          newsletterTitle: $("#ct-nlt").value,
          newsletterText: $("#ct-nltext").value
        });
        toast("Inhalte gespeichert", "success");
      });
    },

    // -------- DESIGN --------
    design(root){
      setHeader("Design & Theme", "Farben, Look & Feel");
      const t = getTheme();

      root.innerHTML = `
        <div class="adm-card">
          <div class="adm-card-h"><h3>Farbpalette</h3><button class="adm-btn primary" id="th-save">Speichern</button></div>
          <div class="adm-card-b">
            <div class="adm-color-picker">
              <div class="adm-color">
                <input type="color" id="th-bg" value="${t.bg}">
                <div class="adm-color-meta"><strong>Hintergrund</strong><code>${t.bg}</code></div>
              </div>
              <div class="adm-color">
                <input type="color" id="th-ink" value="${t.ink}">
                <div class="adm-color-meta"><strong>Text-Primär</strong><code>${t.ink}</code></div>
              </div>
              <div class="adm-color">
                <input type="color" id="th-accent" value="${t.accent}">
                <div class="adm-color-meta"><strong>Akzent / Buttons</strong><code>${t.accent}</code></div>
              </div>
              <div class="adm-color">
                <input type="color" id="th-sale" value="${t.sale}">
                <div class="adm-color-meta"><strong>Sale-Farbe</strong><code>${t.sale}</code></div>
              </div>
            </div>
            <div style="margin-top:24px;padding:24px;border-radius:10px;background:${t.bg};border:1px solid var(--adm-line)">
              <small style="color:var(--adm-ink-soft);text-transform:uppercase;letter-spacing:.08em;font-size:.7rem">Vorschau</small>
              <h2 style="margin:8px 0;font-family:'Anton',sans-serif;color:${t.ink}">Lightwear Collective</h2>
              <p style="color:${t.ink};opacity:.7;margin:0 0 16px;font-size:.9rem">So sieht dein Shop mit dieser Palette aus.</p>
              <button style="background:${t.accent};color:#fff;border:none;padding:10px 20px;border-radius:6px;font-weight:600;font-family:inherit;cursor:pointer">Kollektion entdecken</button>
              <span style="display:inline-block;margin-left:10px;color:${t.sale};font-weight:600">-20%</span>
            </div>
          </div>
        </div>
        <div class="adm-card" style="margin-top:20px">
          <div class="adm-card-h"><h3>Theme-Presets</h3></div>
          <div class="adm-card-b">
            <div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
              <button class="adm-btn" data-preset="default">🎨 Default (Cream)</button>
              <button class="adm-btn" data-preset="dark">🌑 Dark Mode</button>
              <button class="adm-btn" data-preset="gold">✨ Gold Edition</button>
              <button class="adm-btn" data-preset="white">⚪ Pure White</button>
            </div>
          </div>
        </div>
      `;

      // Live-Preview bei Farbwechsel
      ["th-bg","th-ink","th-accent","th-sale"].forEach(id => {
        const input = $("#" + id);
        if(!input) return;
        input.addEventListener("input", () => {
          const codeEl = input.parentNode.querySelector("code");
          if(codeEl) codeEl.textContent = input.value;
        });
      });
      $("#th-save").addEventListener("click", () => {
        saveTheme({
          bg: $("#th-bg").value,
          ink: $("#th-ink").value,
          accent: $("#th-accent").value,
          sale: $("#th-sale").value
        });
        logActivity("theme", "Theme-Farben gespeichert", $("#th-bg").value + " / " + $("#th-accent").value);
        toast("Theme gespeichert", "success");
        VIEWS.design(root);
      });

      const presets = {
        default: {bg:"#f6f5f1", ink:"#1a1a1a", accent:"#1a1a1a", sale:"#b3261e"},
        dark: {bg:"#1a1a1a", ink:"#f6f5f1", accent:"#f6f5f1", sale:"#e85a4f"},
        gold: {bg:"#0f0f0f", ink:"#f5e6c8", accent:"#d4af37", sale:"#d4af37"},
        white: {bg:"#ffffff", ink:"#0a0a0a", accent:"#000000", sale:"#cc0000"}
      };
      root.querySelectorAll("[data-preset]").forEach(b => b.addEventListener("click", () => {
        const p = presets[b.dataset.preset];
        saveTheme(p);
        logActivity("theme", "Preset angewendet: " + b.dataset.preset);
        toast("Preset angewendet", "success");
        VIEWS.design(root);
      }));
    },

    // -------- SETTINGS --------
    settings(root){
      setHeader("Einstellungen", "Shop-Konfiguration");
      const s = getSettings();

      root.innerHTML = `
        <div class="adm-card">
          <div class="adm-card-h"><h3>Shop-Informationen</h3><button class="adm-btn primary" id="st-save">Speichern</button></div>
          <div class="adm-card-b">
            <div class="adm-form">
              <div class="adm-field-row">
                <div class="adm-field"><label>Shop-Name</label><input type="text" id="st-name" value="${escapeHtml(s.storeName)}"></div>
                <div class="adm-field"><label>Kontakt-E-Mail</label><input type="email" id="st-email" value="${escapeHtml(s.email)}"></div>
              </div>
              <div class="adm-field-row">
                <div class="adm-field"><label>Telefon</label><input type="tel" id="st-phone" value="${escapeHtml(s.phone)}"></div>
                <div class="adm-field"><label>Adresse</label><input type="text" id="st-address" value="${escapeHtml(s.address)}"></div>
              </div>
              <div class="adm-field-row">
                <div class="adm-field"><label>Währung</label><select id="st-currency"><option value="EUR"${s.currency==='EUR'?' selected':''}>EUR (€)</option><option value="USD"${s.currency==='USD'?' selected':''}>USD ($)</option><option value="GBP"${s.currency==='GBP'?' selected':''}>GBP (£)</option><option value="CHF"${s.currency==='CHF'?' selected':''}>CHF</option></select></div>
                <div class="adm-field"><label>Steuersatz (%)</label><input type="number" id="st-tax" value="${s.taxRate}" min="0" max="30" step="0.5"></div>
              </div>
              <div class="adm-field"><label>Kostenloser Versand ab (€)</label><input type="number" id="st-freeship" value="${s.freeShipFrom}" min="0" step="5"></div>
            </div>
          </div>
        </div>

        <div class="adm-card" style="margin-top:20px">
          <div class="adm-card-h">
            <h3>Features</h3>
            <span class="pill pill-blue" style="font-size:.68rem">Toggles speichern automatisch</span>
          </div>
          <div class="adm-card-b">
            ${s.maintenance ? `
              <div style="background:#fff4e6;border:1px solid #f0b97a;border-radius:8px;padding:14px 16px;margin-bottom:18px;display:flex;align-items:center;gap:12px">
                <svg viewBox="0 0 24 24" fill="none" stroke="#b87b00" stroke-width="1.8" width="22" height="22"><path d="M12 9v4M12 17h.01M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z"/></svg>
                <div style="flex:1">
                  <strong style="color:#b87b00">Wartungsmodus aktiv</strong><br>
                  <small style="color:#8a5e00">Besucher sehen aktuell die Wartungsseite. Du kommst noch über <code>/admin.html</code> rein.</small>
                </div>
                <a href="index.html" target="_blank" class="adm-btn sm">Seite ansehen ↗</a>
              </div>
            ` : ''}
            <div style="display:flex;flex-direction:column;gap:14px">
              <label class="adm-switch"><input type="checkbox" id="st-maint"${s.maintenance?' checked':''}><span class="adm-switch-knob"></span><div><strong>Wartungsmodus</strong><br><small style="color:var(--adm-ink-soft)">Shop für Besucher sperren — zeigt elegante „Wir sind gleich zurück"-Seite</small></div></label>
              <label class="adm-switch"><input type="checkbox" id="st-social"${s.showSocialProof?' checked':''}><span class="adm-switch-knob"></span><div><strong>Live-Verkaufsbenachrichtigungen</strong><br><small style="color:var(--adm-ink-soft)">Pop-ups „X hat gerade gekauft"</small></div></label>
              <label class="adm-switch"><input type="checkbox" id="st-chat"${s.showChatbot?' checked':''}><span class="adm-switch-knob"></span><div><strong>Chatbot anzeigen</strong><br><small style="color:var(--adm-ink-soft)">Kundensupport-Widget unten rechts</small></div></label>
            </div>
          </div>
        </div>

        <div class="adm-card" style="margin-top:20px">
          <div class="adm-card-h"><h3>Admin-Erscheinungsbild</h3></div>
          <div class="adm-card-b">
            <label class="adm-switch">
              <input type="checkbox" id="st-darkmode"${localStorage.getItem("lw_admin_dark")==="1"?' checked':''}>
              <span class="adm-switch-knob"></span>
              <div>
                <strong>🌙 Dark Mode (nur Admin-Panel)</strong><br>
                <small style="color:var(--adm-ink-soft)">Augenschonend bei Abend- &amp; Nachtarbeit — wirkt nur hier im Admin, nicht im Shop</small>
              </div>
            </label>
          </div>
        </div>

        <div class="adm-card" style="margin-top:20px">
          <div class="adm-card-h"><h3>Daten-Management</h3></div>
          <div class="adm-card-b">
            <div class="adm-btn-row">
              <button class="adm-btn" id="st-export-all">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                Alle Daten exportieren (JSON)
              </button>
              <button class="adm-btn danger" id="st-reset">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
                Alle Shop-Daten zurücksetzen
              </button>
            </div>
            <p style="margin:14px 0 0;color:var(--adm-ink-soft);font-size:.82rem">Zurücksetzen löscht alle Bestellungen, Kundenkonten, Erinnerungen und Anpassungen. Diese Aktion kann nicht rückgängig gemacht werden.</p>
          </div>
        </div>
      `;

      const saveAllSettings = () => {
        saveSettings({
          storeName: $("#st-name").value,
          email: $("#st-email").value,
          phone: $("#st-phone").value,
          address: $("#st-address").value,
          currency: $("#st-currency").value,
          taxRate: parseFloat($("#st-tax").value) || 0,
          freeShipFrom: parseFloat($("#st-freeship").value) || 0,
          maintenance: $("#st-maint").checked,
          showSocialProof: $("#st-social").checked,
          showChatbot: $("#st-chat").checked
        });
      };
      $("#st-save").addEventListener("click", () => {
        saveAllSettings();
        toast("Einstellungen gespeichert", "success");
      });
      // Dark Mode Toggle
      const darkToggle = $("#st-darkmode");
      if(darkToggle){
        darkToggle.addEventListener("change", () => {
          if(darkToggle.checked){
            document.body.classList.add("dark-mode");
            localStorage.setItem("lw_admin_dark", "1");
            logActivity("settings", "Dark Mode aktiviert");
            toast("🌙 Dark Mode aktiviert", "success");
          } else {
            document.body.classList.remove("dark-mode");
            localStorage.removeItem("lw_admin_dark");
            logActivity("settings", "Dark Mode deaktiviert");
            toast("☀ Light Mode aktiviert", "success");
          }
        });
      }

      // AUTO-SAVE für Toggles (sofortige Wirkung beim nächsten Seiten-Reload)
      ["#st-maint", "#st-social", "#st-chat"].forEach(sel => {
        const el = $(sel);
        if(!el) return;
        el.addEventListener("change", () => {
          saveAllSettings();
          if(sel === "#st-maint"){
            if(el.checked){
              logActivity("settings", "Wartungsmodus EINGESCHALTET");
              toast("⚠ Wartungsmodus AN — Seite gesperrt", "success");
            } else {
              logActivity("settings", "Wartungsmodus ausgeschaltet");
              toast("✓ Wartungsmodus AUS — Seite live", "success");
            }
            VIEWS.settings(root); // neu rendern für Warnbox
          } else {
            const fname = {"#st-social":"Live-Verkaufs-Popups", "#st-chat":"Chatbot"}[sel] || sel;
            logActivity("settings", fname + " " + (el.checked ? "aktiviert" : "deaktiviert"));
            toast("Einstellung gespeichert", "success");
          }
        });
      });

      $("#st-export-all").addEventListener("click", () => {
        const all = {};
        Object.values(K).forEach(k => { all[k] = load(k, null); });
        const blob = new Blob([JSON.stringify(all, null, 2)], {type: "application/json"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = "lightwear-export-" + new Date().toISOString().slice(0,10) + ".json";
        a.click();
        URL.revokeObjectURL(url);
        toast("Export heruntergeladen", "success");
      });

      $("#st-reset").addEventListener("click", async () => {
        if(await confirmModal("Wirklich ALLE Shop-Daten löschen? Diese Aktion ist endgültig!")){
          Object.values(K).forEach(k => localStorage.removeItem(k));
          toast("Alle Daten zurückgesetzt", "success");
          setTimeout(() => location.reload(), 800);
        }
      });

      // Supabase Migration Button
      const supaCard = document.createElement("div");
      supaCard.className = "adm-card";
      supaCard.style.marginTop = "20px";
      const isProductionMode = localStorage.getItem("lw_admin_no_demo") === "1";
      supaCard.innerHTML = `
        <div class="adm-card-h"><h3>🔥 Supabase &amp; Demo-Modus</h3><span class="pill ${isProductionMode ? 'pill-green' : 'pill-orange'}">${isProductionMode ? 'Produktion' : 'Demo + Echt'}</span></div>
        <div class="adm-card-b">
          <p style="margin:0 0 14px;color:var(--adm-ink-soft);font-size:.9rem">Verwalte die Verbindung zur Datenbank und Demo-Daten.</p>
          <div class="adm-btn-row">
            <button class="adm-btn primary" id="sb-seed-products">
              📦 Produkte zu Supabase pushen
            </button>
            <button class="adm-btn" id="sb-check">
              🔍 Verbindung testen
            </button>
            ${isProductionMode ? `
              <button class="adm-btn" id="sb-demo-on">
                🧪 Demo-Modus wieder einschalten
              </button>
            ` : `
              <button class="adm-btn danger" id="sb-clean-demo">
                🧹 Demo-Daten aufräumen
              </button>
            `}
          </div>
          <div id="sb-status" style="margin-top:12px;font-size:.85rem"></div>
        </div>
      `;
      root.appendChild(supaCard);

      $("#sb-seed-products").addEventListener("click", async () => {
        const statusEl = $("#sb-status");
        if(typeof window.lwSeedProducts !== "function"){
          statusEl.innerHTML = '<span style="color:var(--adm-danger)">✗ Supabase-Client nicht geladen</span>';
          return;
        }
        statusEl.innerHTML = '⏳ Pushe Produkte zu Supabase...';
        const products = window.PRODUCTS || [];
        if(products.length === 0){
          statusEl.innerHTML = '<span style="color:var(--adm-warn)">⚠ Keine Produkte in window.PRODUCTS gefunden</span>';
          return;
        }
        try {
          const result = await window.lwSeedProducts(products);
          statusEl.innerHTML = `<span style="color:var(--adm-success)">✓ ${products.length} Produkte erfolgreich migriert (${result?.length || 0} in DB)</span>`;
          logActivity("supabase", "Produkte migriert: " + products.length);
          toast("✓ Produkte in Supabase", "success");
        } catch(err){
          console.error(err);
          statusEl.innerHTML = '<span style="color:var(--adm-danger)">✗ Fehler: ' + escapeHtml(err.message || String(err)) + '</span>';
        }
      });

      $("#sb-check").addEventListener("click", async () => {
        const statusEl = $("#sb-status");
        statusEl.innerHTML = '⏳ Teste Verbindung...';
        if(typeof window.lwGetProducts !== "function"){
          statusEl.innerHTML = '<span style="color:var(--adm-danger)">✗ Client nicht da</span>';
          return;
        }
        try {
          const list = await window.lwGetProducts();
          statusEl.innerHTML = `<span style="color:var(--adm-success)">✓ Verbunden — ${list.length} Produkte in Supabase</span>`;
        } catch(err){
          statusEl.innerHTML = '<span style="color:var(--adm-danger)">✗ Fehler: ' + escapeHtml(err.message || String(err)) + '</span>';
        }
      });

      const cleanBtn = $("#sb-clean-demo");
      if(cleanBtn) cleanBtn.addEventListener("click", async () => {
        if(!await confirmModal("Alle Demo-Daten (Demo-Bestellungen, Demo-Nachrichten, Live-Activity-Feed, Demo-Carts, Demo-Kampagnen, Demo-Kalender) löschen?\n\nEchte Supabase-Daten bleiben erhalten.")) return;
        // Demo-Modus permanent aus
        localStorage.setItem("lw_admin_no_demo", "1");
        // Lokale Demo-Daten leeren
        localStorage.removeItem(K.adminOrders);
        localStorage.removeItem(K.messages);
        localStorage.removeItem(LIVE_FEED_KEY);
        localStorage.removeItem(K.abandoned);
        localStorage.removeItem(K.campaigns);
        localStorage.removeItem(K.saleCalendar);
        // Session-Flags löschen
        sessionStorage.removeItem("lw_admin_demo_loaded");
        sessionStorage.removeItem("lw_admin_msg_demo");
        sessionStorage.removeItem("lw_admin_ab_demo");
        sessionStorage.removeItem("lw_admin_camp_demo");
        sessionStorage.removeItem("lw_admin_sc_demo");
        logActivity("system", "Demo-Modus aus, Demo-Daten entfernt");
        toast("✓ Demo-Daten gelöscht, Produktion an", "success");
        setTimeout(() => location.reload(), 800);
      });

      const demoOnBtn = $("#sb-demo-on");
      if(demoOnBtn) demoOnBtn.addEventListener("click", () => {
        localStorage.removeItem("lw_admin_no_demo");
        toast("Demo-Modus aktiviert — Neuladen…", "success");
        setTimeout(() => location.reload(), 600);
      });
    },

    // -------- MESSAGES (Supabase + lokal) --------
    async messages(root){
      setHeader("Nachrichten", "Echte Kundenanfragen vom Kontaktformular");
      let filter = "all";

      // Echte Nachrichten aus Supabase + lokale Demo-Messages mergen
      let supabaseMsgs = [];
      let isFromSupabase = false;
      try {
        if(typeof window.lwGetContactMessages === "function"){
          const data = await window.lwGetContactMessages();
          supabaseMsgs = (data || []).map(m => ({
            id: "sb-" + m.id,
            supabaseId: m.id,
            name: m.name,
            email: m.email,
            topic: m.topic,
            message: m.message,
            date: m.created_at,
            read: m.read,
            replied: m.replied,
            fromSupabase: true
          }));
          isFromSupabase = true;
        }
      } catch(err){
        console.warn("Supabase-Messages Fehler:", err);
      }

      const render = () => {
        const localMsgs = getMessages();
        // Wenn Supabase echte Nachrichten hat oder Demo-Modus aus → nur Supabase zeigen
        const noDemo = localStorage.getItem("lw_admin_no_demo") === "1";
        const showLocal = !noDemo && (!isFromSupabase || supabaseMsgs.length === 0);
        const all = (isFromSupabase ? [...supabaseMsgs, ...(showLocal ? localMsgs : [])] : localMsgs)
          .sort((a,b) => new Date(b.date||0) - new Date(a.date||0));
        const list = all.filter(m => {
          if(filter === "unread") return !m.read;
          if(filter === "replied") return m.replied;
          if(filter === "open") return m.read && !m.replied;
          return true;
        });

        root.innerHTML = `
          ${isFromSupabase ? '<div style="margin-bottom:14px"><span class="pill pill-green">🟢 Live aus Supabase verbunden</span> <small style="color:var(--adm-ink-soft)">— ' + supabaseMsgs.length + ' echte Nachrichten + ' + getMessages().length + ' Demo</small></div>' : '<div style="margin-bottom:14px"><span class="pill pill-orange">⚠️ Nur lokale Daten</span></div>'}
          <div class="stat-grid">
            <div class="stat"><div class="stat-ico blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 11a8 8 0 0 1-3.5 6.6L18 22l-4-3a8 8 0 1 1 7-8z"/></svg></div><div class="stat-meta"><div class="stat-label">Gesamt</div><div class="stat-value">${all.length}</div></div></div>
            <div class="stat"><div class="stat-ico orange"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg></div><div class="stat-meta"><div class="stat-label">Ungelesen</div><div class="stat-value">${all.filter(m=>!m.read).length}</div></div></div>
            <div class="stat"><div class="stat-ico green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m5 12 5 5L20 7"/></svg></div><div class="stat-meta"><div class="stat-label">Beantwortet</div><div class="stat-value">${all.filter(m=>m.replied).length}</div></div></div>
            <div class="stat"><div class="stat-ico red"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></div><div class="stat-meta"><div class="stat-label">Offen</div><div class="stat-value">${all.filter(m=>m.read && !m.replied).length}</div></div></div>
          </div>
          <div class="adm-toolbar">
            <select id="msg-filter">
              <option value="all"${filter==="all"?" selected":""}>Alle Nachrichten</option>
              <option value="unread"${filter==="unread"?" selected":""}>Nur ungelesene</option>
              <option value="open"${filter==="open"?" selected":""}>Gelesen, unbeantwortet</option>
              <option value="replied"${filter==="replied"?" selected":""}>Beantwortet</option>
            </select>
            <div style="flex:1"></div>
            <button class="adm-btn" id="msg-mark-all-read">Alle als gelesen markieren</button>
          </div>
          <div class="adm-card">
            ${list.length === 0 ? `
              <div class="empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 11a8 8 0 0 1-3.5 6.6L18 22l-4-3a8 8 0 1 1 7-8z"/></svg>
                <h3>Keine Nachrichten</h3>
                <p>Sobald jemand das Kontaktformular ausfüllt, erscheint die Nachricht hier.</p>
              </div>
            ` : `
              <div class="msg-list">
                ${list.map(m => `
                  <div class="msg-item ${!m.read ? 'unread':''}" data-open-msg="${escapeHtml(m.id)}">
                    <div class="msg-avatar">${escapeHtml((m.name||'?').charAt(0).toUpperCase())}</div>
                    <div class="msg-meta">
                      <div class="top">
                        <span class="name">${escapeHtml(m.name||'Unbekannt')}</span>
                        <span class="when">${fmtDateTime(m.date)}</span>
                      </div>
                      <div class="topic">${escapeHtml(m.topic||'Anfrage')} ${m.replied ? '<span class="pill pill-green" style="margin-left:6px">beantwortet</span>' : ''}</div>
                      <div class="preview">${escapeHtml((m.message||'').slice(0, 120))}${(m.message||'').length>120?'…':''}</div>
                    </div>
                    <div></div>
                  </div>
                `).join("")}
              </div>
            `}
          </div>
        `;

        $("#msg-filter").addEventListener("change", e => { filter = e.target.value; render(); });
        $("#msg-mark-all-read").addEventListener("click", () => {
          const arr = getMessages().map(m => ({...m, read: true}));
          saveMessages(arr);
          logActivity("messages", "Alle Nachrichten als gelesen markiert");
          toast("Alle als gelesen markiert", "success");
          render(); updateBadges();
        });
        root.querySelectorAll("[data-open-msg]").forEach(b => b.addEventListener("click", () => openMessage(b.dataset.openMsg, render)));
      };
      render();
    },

    // -------- ANALYTICS --------
    analytics(root){
      setHeader("Analytics", "Tiefere Einblicke in deinen Shop");

      // Sicherstellen, dass Demo-Bestellungen existieren (falls man Daten gelöscht hat)
      const orders = getOrders();
      const products = getActiveProducts();

      // Wenn KEINE Bestellungen — zeig Empty-State + Knopf zum Demo-Daten-Generieren
      if(orders.length === 0){
        root.innerHTML = `
          <div class="adm-card">
            <div class="adm-card-b">
              <div class="empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 3v18h18"/><path d="m7 14 4-4 4 4 6-6"/></svg>
                <h3>Noch keine Verkaufsdaten</h3>
                <p>Sobald die ersten Bestellungen reinkommen, siehst du hier alle Insights.</p>
                <button class="adm-btn primary" id="ana-load-demo" style="margin-top:16px">Demo-Daten laden</button>
              </div>
            </div>
          </div>`;
        const btn = $("#ana-load-demo");
        if(btn) btn.addEventListener("click", () => {
          sessionStorage.removeItem("lw_admin_demo_loaded");
          ensureDemoData();
          renderView("analytics");
          toast("Demo-Daten geladen", "success");
        });
        return;
      }

      // Stats
      const totalRev = orders.reduce((s,o) => s + (Number(o.total)||0), 0);
      const completedOrders = orders.filter(o => o.status !== "cancelled" && o.status !== "refunded");
      const avgOrder = completedOrders.length ? totalRev / completedOrders.length : 0;
      const refundedTotal = orders.filter(o => o.refund).reduce((s,o) => s + (Number(o.refund.amount)||0), 0);
      const cancelledCount = orders.filter(o => o.status === "cancelled").length;
      const refundCount = orders.filter(o => o.refund).length;
      const refundRate = orders.length ? (refundCount / orders.length * 100) : 0;

      // Umsatz nach Kategorie (Items sind in getOrders bereits mit category normalisiert)
      const catRev = {};
      orders.forEach(o => {
        (o.items||[]).forEach(it => {
          const cat = it.category || "Andere";
          catRev[cat] = (catRev[cat] || 0) + ((Number(it.price)||0) * (Number(it.qty)||1));
        });
      });
      const catSum = Object.values(catRev).reduce((s,v) => s+v, 0) || 1;
      const catEntries = Object.entries(catRev).sort((a,b) => b[1]-a[1]);

      // Top-Produkte
      const prodRev = {};
      orders.forEach(o => {
        (o.items||[]).forEach(it => {
          const key = it.name || "Unbekannt";
          if(!prodRev[key]) prodRev[key] = {name: key, qty: 0, rev: 0};
          prodRev[key].qty += Number(it.qty) || 1;
          prodRev[key].rev += (Number(it.price)||0) * (Number(it.qty)||1);
        });
      });
      const topProds = Object.values(prodRev).sort((a,b) => b.rev - a.rev).slice(0, 8);
      const maxProdRev = topProds[0]?.rev || 1;

      // Status-Verteilung
      const statusOrder = ["pending","processing","shipped","delivered","cancelled","refunded"];
      const statusLabels = {pending:"Offen", processing:"In Bearbeitung", shipped:"Versendet", delivered:"Zugestellt", cancelled:"Storniert", refunded:"Erstattet"};
      const statusColors = {pending:"#b87b00", processing:"#1e5fb8", shipped:"#3a85d8", delivered:"#2f7a3e", cancelled:"#b3261e", refunded:"#6b6863"};
      const statusDist = {};
      orders.forEach(o => { const s = o.status || "pending"; statusDist[s] = (statusDist[s]||0) + 1; });
      const statusList = statusOrder.filter(s => statusDist[s]).map(s => ({st: s, n: statusDist[s], label: statusLabels[s], color: statusColors[s], pct: (statusDist[s]/orders.length*100)}));

      // 30-Tage Umsatz
      const days30 = [];
      for(let i=29; i>=0; i--){
        const d = new Date(); d.setDate(d.getDate()-i); d.setHours(0,0,0,0);
        const next = new Date(d); next.setDate(next.getDate()+1);
        const rev = orders.filter(o => {
          const od = new Date(o.date || 0);
          return od >= d && od < next;
        }).reduce((s,o) => s + (Number(o.total)||0), 0);
        days30.push({day: d.getDate(), rev, month: d.toLocaleString("de-DE", {month:"short"})});
      }
      const maxDayRev = Math.max(...days30.map(d => d.rev), 1);

      // Conversion Funnel
      const ordersCount = orders.length;
      const funnel = [
        {label: "Besucher", value: ordersCount * 45, pct: 100, color:"#2f7a3e"},
        {label: "Produktseite", value: ordersCount * 18, pct: 40, color:"#3a85d8"},
        {label: "Warenkorb", value: ordersCount * 4, pct: 9, color:"#1e5fb8"},
        {label: "Checkout", value: Math.max(1, Math.round(ordersCount * 1.4)), pct: 3.1, color:"#b87b00"},
        {label: "Kauf", value: ordersCount, pct: 2.2, color:"#1a1a1a"}
      ];

      // HTML rendering
      let html = `
        <div class="stat-grid">
          <div class="stat"><div class="stat-ico green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 21V3M3 21h18"/><path d="m7 14 4-4 4 4 6-6"/></svg></div><div class="stat-meta"><div class="stat-label">Umsatz gesamt</div><div class="stat-value">${fmtEUR(totalRev)}</div></div></div>
          <div class="stat"><div class="stat-ico blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div><div class="stat-meta"><div class="stat-label">Ø Bestellwert</div><div class="stat-value">${fmtEUR(avgOrder)}</div></div></div>
          <div class="stat"><div class="stat-ico orange"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg></div><div class="stat-meta"><div class="stat-label">Rückerstattet</div><div class="stat-value">${fmtEUR(refundedTotal)}</div><div class="stat-trend ${refundRate>5?'down':''}">${refundRate.toFixed(1)}% Rate</div></div></div>
          <div class="stat"><div class="stat-ico red"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/></svg></div><div class="stat-meta"><div class="stat-label">Storniert</div><div class="stat-value">${cancelledCount}</div></div></div>
        </div>`;

      // 30-Day Revenue Chart
      html += `
        <div class="adm-card" style="margin-bottom:20px">
          <div class="adm-card-h"><h3>Umsatz · letzte 30 Tage</h3><strong>${fmtEUR(days30.reduce((s,d)=>s+d.rev,0))}</strong></div>
          <div class="adm-card-b">
            <div class="bar-chart" style="height:200px;gap:4px">`;
      days30.forEach(d => {
        const h = Math.max(4, (d.rev/maxDayRev)*100);
        html += `<div class="bar" style="height:${h}%" title="${d.day}. ${d.month} — ${fmtEUR(d.rev)}"></div>`;
      });
      html += `
            </div>
            <div style="display:flex;justify-content:space-between;font-size:.72rem;color:var(--adm-ink-soft);margin-top:10px">
              <span>vor 30 Tagen</span><span>heute</span>
            </div>
          </div>
        </div>`;

      // Status-Verteilung als Stacked Horizontal Bar
      html += `
        <div class="adm-card" style="margin-bottom:20px">
          <div class="adm-card-h"><h3>Status-Verteilung</h3><strong>${orders.length} Bestellungen</strong></div>
          <div class="adm-card-b">
            <div style="display:flex;height:32px;border-radius:8px;overflow:hidden;margin-bottom:16px">`;
      statusList.forEach(s => {
        html += `<div style="width:${s.pct}%;background:${s.color}" title="${s.label}: ${s.n}"></div>`;
      });
      html += `
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px">`;
      statusList.forEach(s => {
        html += `
              <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--adm-surface-2);border-radius:8px">
                <span style="width:12px;height:12px;border-radius:99px;background:${s.color}"></span>
                <div style="flex:1;min-width:0">
                  <div style="font-size:.82rem;font-weight:600">${s.label}</div>
                  <div style="font-size:.72rem;color:var(--adm-ink-soft)">${s.pct.toFixed(0)}%</div>
                </div>
                <strong>${s.n}</strong>
              </div>`;
      });
      html += `
            </div>
          </div>
        </div>`;

      // Top Products + Categories
      html += `<div class="adm-2col" style="margin-bottom:20px">`;
      html += `
          <div class="adm-card">
            <div class="adm-card-h"><h3>Top-Produkte nach Umsatz</h3></div>
            <div class="adm-card-b">`;
      if(topProds.length === 0){
        html += `<div class="empty"><h3>Noch keine Verkaufsdaten</h3></div>`;
      } else {
        html += `<div class="kpi-bar">`;
        topProds.forEach(p => {
          const shortName = p.name.length > 24 ? p.name.slice(0,24) + "…" : p.name;
          const pct = (p.rev/maxProdRev*100).toFixed(1);
          html += `
            <div class="kpi-row">
              <div class="kpi-name">${escapeHtml(shortName)}</div>
              <div class="kpi-track"><div class="kpi-fill" style="width:${pct}%"></div></div>
              <div class="kpi-val">${fmtEUR(p.rev)} · ${p.qty}x</div>
            </div>`;
        });
        html += `</div>`;
      }
      html += `</div></div>`;

      html += `
          <div class="adm-card">
            <div class="adm-card-h"><h3>Umsatz nach Kategorie</h3></div>
            <div class="adm-card-b">`;
      if(catEntries.length === 0){
        html += `<div class="empty"><h3>Noch keine Daten</h3></div>`;
      } else {
        html += `<div class="kpi-bar">`;
        catEntries.forEach(([cat, rev]) => {
          const pct = (rev/catSum*100).toFixed(1);
          html += `
            <div class="kpi-row">
              <div class="kpi-name">${escapeHtml(cat)}</div>
              <div class="kpi-track"><div class="kpi-fill" style="width:${pct}%"></div></div>
              <div class="kpi-val">${fmtEUR(rev)} · ${(rev/catSum*100).toFixed(0)}%</div>
            </div>`;
        });
        html += `</div>`;
      }
      html += `</div></div></div>`;

      // Cancellation + Refund Reasons
      const cancelReasons = {};
      const refundReasons = {};
      orders.forEach(o => {
        if(o.status === "cancelled" && o.cancelled?.reason){
          cancelReasons[o.cancelled.reason] = (cancelReasons[o.cancelled.reason]||0) + 1;
        }
        if(o.refund?.reason){
          refundReasons[o.refund.reason] = (refundReasons[o.refund.reason]||0) + 1;
        }
      });
      const cancelEntries = Object.entries(cancelReasons).sort((a,b) => b[1]-a[1]);
      const refundEntries = Object.entries(refundReasons).sort((a,b) => b[1]-a[1]);
      const cancelTotal = cancelEntries.reduce((s,[,v]) => s+v, 0) || 1;
      const refundTotal = refundEntries.reduce((s,[,v]) => s+v, 0) || 1;

      if(cancelEntries.length || refundEntries.length){
        html += `<div class="adm-2col" style="margin-bottom:20px">
          <div class="adm-card">
            <div class="adm-card-h"><h3>Stornierungs-Gründe</h3><strong>${cancelTotal}</strong></div>
            <div class="adm-card-b">
              ${cancelEntries.length === 0 ? '<div class="empty"><p>Keine Stornierungen</p></div>' : `
                <div class="kpi-bar">
                  ${cancelEntries.map(([reason, n]) => `
                    <div class="kpi-row">
                      <div class="kpi-name">${escapeHtml(reason)}</div>
                      <div class="kpi-track"><div class="kpi-fill" style="width:${(n/cancelTotal*100).toFixed(1)}%;background:linear-gradient(90deg,#b3261e,#dc5a52)"></div></div>
                      <div class="kpi-val">${n}× · ${(n/cancelTotal*100).toFixed(0)}%</div>
                    </div>
                  `).join("")}
                </div>
              `}
            </div>
          </div>
          <div class="adm-card">
            <div class="adm-card-h"><h3>Erstattungs-Gründe</h3><strong>${refundTotal}</strong></div>
            <div class="adm-card-b">
              ${refundEntries.length === 0 ? '<div class="empty"><p>Keine Erstattungen</p></div>' : `
                <div class="kpi-bar">
                  ${refundEntries.map(([reason, n]) => `
                    <div class="kpi-row">
                      <div class="kpi-name">${escapeHtml(reason)}</div>
                      <div class="kpi-track"><div class="kpi-fill" style="width:${(n/refundTotal*100).toFixed(1)}%;background:linear-gradient(90deg,#b87b00,#d99f30)"></div></div>
                      <div class="kpi-val">${n}× · ${(n/refundTotal*100).toFixed(0)}%</div>
                    </div>
                  `).join("")}
                </div>
              `}
            </div>
          </div>
        </div>`;
      }

      // Conversion Funnel
      html += `
        <div class="adm-card">
          <div class="adm-card-h"><h3>Conversion-Funnel</h3><span style="font-size:.72rem;color:var(--adm-ink-soft)">geschätzt aus Verkaufsdaten</span></div>
          <div class="adm-card-b">
            <div class="kpi-bar">`;
      funnel.forEach(f => {
        html += `
              <div class="kpi-row">
                <div class="kpi-name"><strong style="color:var(--adm-ink)">${f.label}</strong></div>
                <div class="kpi-track"><div class="kpi-fill" style="width:${f.pct}%;background:${f.color}"></div></div>
                <div class="kpi-val">${f.value.toLocaleString('de-DE')} · ${f.pct}%</div>
              </div>`;
      });
      html += `
            </div>
            <p style="margin:18px 0 0;color:var(--adm-ink-soft);font-size:.82rem">Konversionsrate Besucher → Kauf: <strong style="color:var(--adm-ink)">${funnel[4].pct.toFixed(1)}%</strong></p>
          </div>
        </div>`;

      root.innerHTML = html;
    },

    // -------- LIVE CHAT (Supabase Realtime) --------
    async livechat(root){
      setHeader("Live-Chat", "Echtzeit-Gespräche mit Kunden");
      // Wenn Supabase verfügbar → Realtime-Implementation
      if(typeof window.lwGetAllConversations === "function"){
        return renderLiveChatSupabase(root);
      }
      const lc = getLiveChatState();
      const convs = (lc.conversations||[]).slice().sort((a,b) => new Date(b.lastActivity||0) - new Date(a.lastActivity||0));
      const activeConvs = convs.filter(c => c.status === "active");
      const closedConvs = convs.filter(c => c.status === "closed");
      const selectedId = lc.activeAdmin || activeConvs[0]?.id || convs[0]?.id || null;

      if(convs.length === 0){
        root.innerHTML = `
          <div class="adm-card">
            <div class="adm-card-b">
              <div class="empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 11a8 8 0 0 1-3.5 6.6L18 22l-4-3a8 8 0 1 1 7-8z"/></svg>
                <h3>Noch keine Chats</h3>
                <p>Sobald jemand im Shop „Mit Mitarbeiter sprechen" klickt, erscheint die Konversation hier in Echtzeit.</p>
                <p style="margin-top:14px;font-size:.82rem;color:var(--adm-ink-soft)">Tipp: Öffne in einem zweiten Tab den Shop → Chatbot öffnen → „Mit Mitarbeiter sprechen" klicken.</p>
              </div>
            </div>
          </div>`;
        return;
      }

      // Bei Klick auf Conversation in der Liste — wir merken die ausgewählte
      const sel = convs.find(c => c.id === selectedId) || convs[0];

      root.innerHTML = `
        <div style="display:grid;grid-template-columns:320px 1fr;gap:20px;height:calc(100vh - 180px);min-height:500px">
          <!-- Conversation-Liste -->
          <div class="adm-card" style="display:flex;flex-direction:column;overflow:hidden">
            <div class="adm-card-h">
              <h3>Konversationen</h3>
              <span class="pill pill-green">${activeConvs.length} aktiv</span>
            </div>
            <div style="flex:1;overflow-y:auto" id="lc-conv-list">
              ${convs.map(c => `
                <div class="msg-item ${c.unreadByAdmin > 0 ? 'unread':''} ${c.id === sel?.id ? 'sel-conv':''}" data-conv="${escapeHtml(c.id)}" style="${c.id === sel?.id ? 'background:var(--adm-accent-soft);' : ''}cursor:pointer">
                  <div class="msg-avatar" style="background:${c.status==='active'?'#2f7a3e':'#6b6863'};color:#fff">${escapeHtml((c.customer?.name||'?').charAt(0).toUpperCase())}</div>
                  <div class="msg-meta">
                    <div class="top">
                      <span class="name">${escapeHtml(c.customer?.name||'Gast')}</span>
                      <span class="when">${timeAgo(new Date(c.lastActivity||c.startedAt).getTime())}</span>
                    </div>
                    <div class="topic" style="font-size:.74rem;color:var(--adm-ink-soft)">
                      ${c.status === 'active' ? '<span class="pill pill-green" style="font-size:.62rem">aktiv</span>' : '<span class="pill pill-gray" style="font-size:.62rem">geschlossen</span>'}
                      ${c.operator ? ' · ' + escapeHtml(c.operator) : ''}
                    </div>
                    <div class="preview">${escapeHtml((c.messages?.slice(-1)[0]?.text)||'...').slice(0,80)}</div>
                  </div>
                  ${c.unreadByAdmin > 0 ? `<div style="background:#b3261e;color:#fff;font-size:.7rem;font-weight:700;border-radius:99px;min-width:20px;height:20px;display:grid;place-items:center;padding:0 6px;align-self:center">${c.unreadByAdmin}</div>` : '<div></div>'}
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Thread -->
          <div class="adm-card" style="display:flex;flex-direction:column;overflow:hidden" id="lc-thread-card">
            ${renderLiveChatThreadHTML(sel)}
          </div>
        </div>
      `;

      // Conversation-Auswahl
      root.querySelectorAll("[data-conv]").forEach(el => el.addEventListener("click", () => {
        const id = el.dataset.conv;
        const s = getLiveChatState();
        s.activeAdmin = id;
        saveLiveChatState(s);
        markConversationRead(id);
        VIEWS.livechat(root);
      }));

      wireLiveChatThread(sel, root);
    }
,

    // -------- ABANDONED CARTS --------
    abandoned(root){
      setHeader("Verlassene Warenkörbe", "Recovery-Liste — hol verlorene Bestellungen zurück");
      const carts = load(K.abandoned, []);
      const open = carts.filter(c => !c.recovered);
      const recovered = carts.filter(c => c.recovered);
      const openValue = open.reduce((s,c) => s + c.value, 0);
      const recoveredValue = recovered.reduce((s,c) => s + c.value, 0);
      const recoveryRate = carts.length ? (recovered.length / carts.length * 100) : 0;

      root.innerHTML = `
        <div class="stat-grid">
          <div class="stat"><div class="stat-ico orange"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 7h12l-1 13H7L6 7Z"/></svg></div><div class="stat-meta"><div class="stat-label">Offen</div><div class="stat-value">${open.length}</div></div></div>
          <div class="stat"><div class="stat-ico red"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg></div><div class="stat-meta"><div class="stat-label">Potentieller Umsatz</div><div class="stat-value">${fmtEUR(openValue)}</div></div></div>
          <div class="stat"><div class="stat-ico green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m5 12 5 5L20 7"/></svg></div><div class="stat-meta"><div class="stat-label">Zurückgeholt</div><div class="stat-value">${fmtEUR(recoveredValue)}</div><div class="stat-trend">${recoveryRate.toFixed(0)}% Rate</div></div></div>
        </div>

        <div class="adm-card">
          <div class="adm-card-h"><h3>${carts.length} Warenkörbe</h3>
            <button class="adm-btn" id="ab-bulk-mail">📧 Erinnerung an alle offenen senden</button>
          </div>
          ${carts.length === 0 ? '<div class="empty"><h3>Keine verlassenen Warenkörbe</h3></div>' : `
            <div class="adm-table-wrap">
              <table class="adm-table">
                <thead><tr><th>Kunde</th><th>Items</th><th class="num">Wert</th><th>Verlassen</th><th>Status</th><th></th></tr></thead>
                <tbody>
                  ${carts.map(c => `
                    <tr>
                      <td><strong>${escapeHtml(c.customer.name)}</strong><br><small style="color:var(--adm-ink-soft)">${escapeHtml(c.customer.email)}</small></td>
                      <td>${(c.items||[]).map(it => escapeHtml(it.name||'Item') + ' (' + (it.qty||1) + 'x)').join(", ").slice(0, 60)}${(c.items||[]).map(it => it.name).join("").length > 60 ? '…' : ''}</td>
                      <td class="num"><strong>${fmtEUR(c.value)}</strong></td>
                      <td>${timeAgo(new Date(c.abandonedAt).getTime())}</td>
                      <td>
                        ${c.recovered ? '<span class="pill pill-green">✓ Zurückgeholt</span>' : (c.reminderSent ? '<span class="pill pill-blue">📧 Erinnert</span>' : '<span class="pill pill-orange">offen</span>')}
                      </td>
                      <td>
                        <div class="adm-btn-row">
                          ${!c.recovered ? `<button class="adm-btn sm" data-mail="${escapeHtml(c.id)}">${c.reminderSent ? 'Nochmal' : 'Erinnern'}</button>` : ''}
                          ${!c.recovered ? `<button class="adm-btn sm success" data-recover="${escapeHtml(c.id)}">Als zurückgeholt markieren</button>` : ''}
                        </div>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `}
        </div>
      `;

      root.querySelectorAll("[data-mail]").forEach(b => b.addEventListener("click", () => sendAbandonedReminder(b.dataset.mail)));
      root.querySelectorAll("[data-recover]").forEach(b => b.addEventListener("click", () => {
        const list = load(K.abandoned, []);
        const c = list.find(x => x.id === b.dataset.recover);
        if(c){ c.recovered = true; c.recoveredAt = new Date().toISOString(); save(K.abandoned, list); }
        logActivity("abandoned", "Warenkorb als zurückgeholt markiert", fmtEUR(c?.value));
        toast("Markiert als zurückgeholt", "success");
        VIEWS.abandoned(root);
      }));
      $("#ab-bulk-mail").addEventListener("click", () => {
        const list = load(K.abandoned, []);
        let count = 0;
        list.forEach(c => { if(!c.recovered){ c.reminderSent = true; c.reminderSentAt = new Date().toISOString(); count++; } });
        save(K.abandoned, list);
        logActivity("abandoned", count + " Erinnerungs-Mails (bulk) gesendet");
        toast(`📧 ${count} Erinnerungen versendet`, "success");
        VIEWS.abandoned(root);
      });
    },

    // -------- CAMPAIGNS --------
    campaigns(root){
      setHeader("Marketing-Kampagnen", "ROI-Tracking pro Kampagne");

      const render = () => {
        const list = load(K.campaigns, []);
        const totalSpent = list.reduce((s,c) => s + (c.spent||0), 0);
        const totalRev = list.reduce((s,c) => s + (c.revenue||0), 0);
        const totalConv = list.reduce((s,c) => s + (c.conversions||0), 0);
        const totalImp = list.reduce((s,c) => s + (c.impressions||0), 0);
        const overallRoi = totalSpent ? ((totalRev - totalSpent) / totalSpent * 100) : 0;

        root.innerHTML = `
          <div class="stat-grid">
            <div class="stat"><div class="stat-ico red"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v20"/></svg></div><div class="stat-meta"><div class="stat-label">Ausgaben</div><div class="stat-value">${fmtEUR(totalSpent)}</div></div></div>
            <div class="stat"><div class="stat-ico green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m7 14 4-4 4 4"/></svg></div><div class="stat-meta"><div class="stat-label">Umsatz</div><div class="stat-value">${fmtEUR(totalRev)}</div></div></div>
            <div class="stat"><div class="stat-ico purple"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v20M2 12h20"/></svg></div><div class="stat-meta"><div class="stat-label">ROI</div><div class="stat-value">${overallRoi.toFixed(0)}%</div><div class="stat-trend ${overallRoi >= 100 ? '' : 'down'}">${overallRoi >= 100 ? 'profitabel' : 'unter Break-even'}</div></div></div>
            <div class="stat"><div class="stat-ico blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 21h18M5 21V11M9 21V7"/></svg></div><div class="stat-meta"><div class="stat-label">Conversions</div><div class="stat-value">${totalConv}</div><div class="stat-trend">${totalImp.toLocaleString('de-DE')} Imp.</div></div></div>
          </div>

          <div class="adm-toolbar">
            <h3 style="margin:0;flex:1">${list.length} Kampagnen</h3>
            <button class="adm-btn primary" id="camp-new"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Neue Kampagne</button>
          </div>

          <div class="adm-card">
            <div class="adm-table-wrap">
              <table class="adm-table">
                <thead><tr><th>Kampagne</th><th>Kanal</th><th class="num">Budget</th><th class="num">Ausgegeben</th><th class="num">Conversions</th><th class="num">Umsatz</th><th>ROI</th><th>Status</th><th></th></tr></thead>
                <tbody>
                  ${list.map(c => {
                    const roi = c.spent ? ((c.revenue - c.spent) / c.spent * 100) : 0;
                    const channelEmoji = {Instagram:"📷",Google:"🔍","Google Ads":"🔍",TikTok:"🎵",Email:"📧",Facebook:"📘"}[c.channel] || "📣";
                    return `
                      <tr>
                        <td><strong>${escapeHtml(c.name)}</strong>${c.couponCode ? '<br><small style="color:var(--adm-ink-soft)"><code>' + escapeHtml(c.couponCode) + '</code></small>' : ''}</td>
                        <td>${channelEmoji} ${escapeHtml(c.channel)}</td>
                        <td class="num">${fmtEUR(c.budget)}</td>
                        <td class="num">${fmtEUR(c.spent)}</td>
                        <td class="num">${c.conversions||0}</td>
                        <td class="num"><strong>${fmtEUR(c.revenue||0)}</strong></td>
                        <td><span class="pill ${roi >= 100 ? 'pill-green' : roi >= 0 ? 'pill-orange' : 'pill-red'}">${roi.toFixed(0)}%</span></td>
                        <td>${c.status === 'active' ? '<span class="pill pill-green">aktiv</span>' : '<span class="pill pill-gray">beendet</span>'}</td>
                        <td><div class="adm-btn-row"><button class="adm-btn sm" data-edit-camp="${escapeHtml(c.id)}">✎</button><button class="adm-btn sm danger" data-del-camp="${escapeHtml(c.id)}">×</button></div></td>
                      </tr>
                    `;
                  }).join("")}
                </tbody>
              </table>
            </div>
          </div>
        `;
        $("#camp-new").addEventListener("click", () => openCampaignForm(null, render));
        root.querySelectorAll("[data-edit-camp]").forEach(b => b.addEventListener("click", () => openCampaignForm(b.dataset.editCamp, render)));
        root.querySelectorAll("[data-del-camp]").forEach(b => b.addEventListener("click", async () => {
          if(await confirmModal("Kampagne wirklich löschen?")){
            save(K.campaigns, load(K.campaigns,[]).filter(x => x.id !== b.dataset.delCamp));
            toast("Gelöscht", "success");
            render();
          }
        }));
      };
      render();
    },

    // -------- EMAIL TEMPLATES --------
    emails(root){
      setHeader("Email-Templates", "Vorlagen für automatische E-Mails");
      const list = load(K.emailTemplates, []);
      let selectedId = list[0]?.id;

      const render = () => {
        const sel = list.find(t => t.id === selectedId) || list[0];
        root.innerHTML = `
          <div style="display:grid;grid-template-columns:260px 1fr;gap:20px">
            <div class="adm-card">
              <div class="adm-card-h"><h3>Templates</h3></div>
              <div>
                ${list.map(t => `
                  <div class="msg-item ${t.id === sel?.id ? 'sel-temp' : ''}" data-tpl="${escapeHtml(t.id)}" style="cursor:pointer;${t.id === sel?.id ? 'background:var(--adm-accent-soft);' : ''}">
                    <div class="msg-avatar">${escapeHtml(t.name.charAt(0))}</div>
                    <div class="msg-meta">
                      <div class="top"><span class="name" style="font-size:.85rem">${escapeHtml(t.name)}</span></div>
                      <div class="preview" style="font-size:.72rem">${escapeHtml(t.subject.slice(0,40))}…</div>
                    </div>
                    <div></div>
                  </div>
                `).join("")}
              </div>
            </div>
            <div class="adm-card">
              <div class="adm-card-h">
                <h3>${escapeHtml(sel?.name || 'Wähle ein Template')}</h3>
                <div>
                  <button class="adm-btn" id="tpl-preview">👁 Vorschau</button>
                  <button class="adm-btn primary" id="tpl-save">Speichern</button>
                </div>
              </div>
              ${sel ? `
                <div class="adm-card-b">
                  <div class="adm-form">
                    <div class="adm-field">
                      <label>Betreff</label>
                      <input type="text" id="tpl-subject" value="${escapeHtml(sel.subject)}">
                    </div>
                    <div class="adm-field">
                      <label>Inhalt (Text)</label>
                      <textarea id="tpl-body" rows="14" style="font-family:monospace;font-size:.85rem">${escapeHtml(sel.body)}</textarea>
                      <div class="adm-field-hint">Variablen: <code>{{customer.name}}</code> · <code>{{order.id}}</code> · <code>{{order.total}}</code> · <code>{{refund.amount}}</code> · <code>{{cart.items}}</code> usw.</div>
                    </div>
                  </div>
                </div>
              ` : '<div class="adm-card-b"><div class="empty"><h3>Wähle links ein Template aus</h3></div></div>'}
            </div>
          </div>
        `;

        root.querySelectorAll("[data-tpl]").forEach(el => el.addEventListener("click", () => { selectedId = el.dataset.tpl; render(); }));
        const saveBtn = $("#tpl-save");
        if(saveBtn) saveBtn.addEventListener("click", () => {
          const all = load(K.emailTemplates, []);
          const t = all.find(x => x.id === selectedId);
          if(!t) return;
          t.subject = $("#tpl-subject").value;
          t.body = $("#tpl-body").value;
          save(K.emailTemplates, all);
          logActivity("emails", "Template gespeichert: " + t.name);
          toast("Template gespeichert", "success");
        });
        const prevBtn = $("#tpl-preview");
        if(prevBtn) prevBtn.addEventListener("click", () => openEmailPreview(sel));
      };
      render();
    }
,

    // -------- ACTIVITY LOG --------
    activity(root){
      setHeader("Aktivitätslog", "Was hier im Admin passiert ist");
      const log = load(K.activity, []);
      let filter = "all";

      const render = () => {
        const cats = [...new Set(log.map(l => l.category))];
        const list = filter === "all" ? log : log.filter(l => l.category === filter);

        const iconFor = (cat) => {
          const map = {
            orders: ['blue', '<path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/>'],
            products: ['orange', '<path d="M3 7l9-4 9 4-9 4-9-4Z"/><path d="M3 7v10l9 4 9-4V7"/>'],
            drops: ['green', '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 10h18"/>'],
            discounts: ['orange', '<path d="m9 15 6-6M9 9h.01M15 15h.01M5 5h14v14H5z"/>'],
            settings: ['blue', '<circle cx="12" cy="12" r="3"/>'],
            theme: ['orange', '<circle cx="12" cy="12" r="9"/>'],
            content: ['blue', '<path d="M4 4h16v16H4z"/>'],
            messages: ['blue', '<path d="M21 11a8 8 0 0 1-3.5 6.6L18 22l-4-3a8 8 0 1 1 7-8z"/>'],
            refunds: ['green', '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>'],
            cancellations: ['red', '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>'],
            data: ['red', '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>']
          };
          return map[cat] || ['', '<circle cx="12" cy="12" r="9"/>'];
        };

        root.innerHTML = `
          <div class="adm-toolbar">
            <select id="act-filter">
              <option value="all">Alle Kategorien</option>
              ${cats.map(c => `<option value="${escapeHtml(c)}"${filter===c?' selected':''}>${escapeHtml(c)}</option>`).join("")}
            </select>
            <div style="flex:1"></div>
            <span style="color:var(--adm-ink-soft);font-size:.82rem">${list.length} Einträge</span>
            <button class="adm-btn danger" id="act-clear">Log leeren</button>
          </div>
          <div class="adm-card">
            ${list.length === 0 ? `
              <div class="empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                <h3>Noch keine Aktivitäten</h3>
                <p>Sobald du Änderungen vornimmst, werden sie hier protokolliert.</p>
              </div>
            ` : `
              <div class="activity-list">
                ${list.map(l => {
                  const [color, path] = iconFor(l.category);
                  return `
                    <div class="activity-item">
                      <div class="act-ico ${color}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${path}</svg>
                      </div>
                      <div class="act-text">
                        <strong>${escapeHtml(l.action)}</strong>
                        <span>${escapeHtml(l.category)}${l.meta ? ' · ' + escapeHtml(typeof l.meta === 'string' ? l.meta : JSON.stringify(l.meta)) : ''}</span>
                      </div>
                      <div class="act-when">${fmtDateTime(l.date)}</div>
                    </div>
                  `;
                }).join("")}
              </div>
            `}
          </div>
        `;

        $("#act-filter").addEventListener("change", e => { filter = e.target.value; render(); });
        $("#act-clear").addEventListener("click", async () => {
          if(await confirmModal("Wirklich das gesamte Aktivitätslog löschen?")){
            save(K.activity, []);
            toast("Log gelöscht", "success");
            render();
          }
        });
      };
      render();
    }
  };

  // ============ MESSAGE DETAIL ============
  function openMessage(id, onChange){
    const msgs = getMessages();
    const m = msgs.find(x => x.id === id);
    if(!m){ toast("Nachricht nicht gefunden", "error"); return; }

    // Als gelesen markieren
    if(!m.read){
      const updated = msgs.map(x => x.id === id ? {...x, read: true} : x);
      saveMessages(updated);
      updateBadges();
    }

    const dlg = modal({
      title: m.topic || "Nachricht",
      wide: true,
      body: `
        <div style="display:flex;align-items:flex-start;gap:14px;padding-bottom:16px;border-bottom:1px solid var(--adm-line);margin-bottom:18px">
          <div class="msg-avatar" style="width:46px;height:46px;font-size:1.05rem">${escapeHtml((m.name||'?').charAt(0).toUpperCase())}</div>
          <div style="flex:1">
            <strong style="font-size:1.05rem">${escapeHtml(m.name||'Unbekannt')}</strong><br>
            <span style="color:var(--adm-ink-soft);font-size:.88rem">${escapeHtml(m.email||'—')}</span><br>
            <span style="color:var(--adm-ink-soft);font-size:.78rem">${fmtDateTime(m.date)}</span>
          </div>
          ${m.replied ? '<span class="pill pill-green">beantwortet</span>' : '<span class="pill pill-orange">offen</span>'}
        </div>
        <div style="background:var(--adm-surface-2);border-radius:8px;padding:18px;font-size:.92rem;line-height:1.6;white-space:pre-wrap;margin-bottom:18px">${escapeHtml(m.message||'')}</div>
        <div class="adm-field">
          <label>Antwort verfassen</label>
          <textarea id="msg-reply" rows="6" placeholder="Hallo ${escapeHtml(m.name||'')},&#10;&#10;vielen Dank für deine Nachricht…"></textarea>
        </div>
      `,
      footer: `
        <button class="adm-btn" data-cancel>Schließen</button>
        <button class="adm-btn danger" data-delete>Löschen</button>
        ${!m.replied ? '<button class="adm-btn" data-mark-replied>Als beantwortet markieren</button>' : ''}
        <button class="adm-btn success" data-send>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z"/></svg>
          Antwort senden
        </button>
      `
    });

    dlg.el.querySelector("[data-cancel]").addEventListener("click", dlg.close);
    dlg.el.querySelector("[data-delete]").addEventListener("click", async () => {
      if(await confirmModal("Nachricht wirklich löschen?")){
        saveMessages(getMessages().filter(x => x.id !== id));
        logActivity("messages", "Nachricht gelöscht", m.email);
        toast("Nachricht gelöscht", "success");
        dlg.close();
        onChange && onChange();
        updateBadges();
      }
    });
    const markBtn = dlg.el.querySelector("[data-mark-replied]");
    if(markBtn){
      markBtn.addEventListener("click", () => {
        saveMessages(getMessages().map(x => x.id === id ? {...x, replied: true} : x));
        logActivity("messages", "Als beantwortet markiert", m.email);
        toast("Markiert", "success");
        dlg.close();
        onChange && onChange();
      });
    }
    dlg.el.querySelector("[data-send]").addEventListener("click", () => {
      const reply = dlg.el.querySelector("#msg-reply").value.trim();
      if(!reply){ toast("Bitte eine Antwort schreiben", "error"); return; }
      saveMessages(getMessages().map(x => x.id === id ? {...x, replied: true, reply, replyDate: new Date().toISOString()} : x));
      logActivity("messages", "Antwort gesendet an " + (m.email || m.name), reply.slice(0, 60));
      toast("✓ Antwort gesendet (Demo)", "success");
      dlg.close();
      onChange && onChange();
      updateBadges();
    });
  }

  // ============ LIVE CHAT SUPABASE (Realtime) ============
  let liveChatSupabaseUnsub = null;
  let liveChatSupabaseSelectedId = null;

  async function renderLiveChatSupabase(root){
    let convs = [];
    try { convs = await window.lwGetAllConversations(); }
    catch(err){ console.error("Conversations-Load Fehler:", err); }

    convs = convs.sort((a,b) => new Date(b.last_activity||b.started_at||0) - new Date(a.last_activity||a.started_at||0));
    const activeConvs = convs.filter(c => c.status === "active");
    const sel = convs.find(c => c.id === liveChatSupabaseSelectedId) || activeConvs[0] || convs[0];
    if(sel) liveChatSupabaseSelectedId = sel.id;

    if(convs.length === 0){
      root.innerHTML = `
        <div class="adm-card">
          <div class="adm-card-b">
            <div class="empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 11a8 8 0 0 1-3.5 6.6L18 22l-4-3a8 8 0 1 1 7-8z"/></svg>
              <h3>Noch keine Live-Chats</h3>
              <p>Sobald jemand im Shop „Mit Mitarbeiter sprechen" klickt, erscheint die Konversation hier in Echtzeit über alle Geräte!</p>
              <p style="margin-top:14px;font-size:.82rem;color:var(--adm-ink-soft)">💡 Test: Öffne Shop auf deinem Handy → Chatbot → „Mit Mitarbeiter sprechen"</p>
            </div>
          </div>
        </div>`;
      // Subscribe für neue Conversations
      subscribeLiveChatUpdates(root);
      return;
    }

    let messages = [];
    if(sel){
      try { messages = await window.lwGetConversationMessages(sel.id); }
      catch(err){ console.error("Messages-Load Fehler:", err); }
      // Mark as read (admin sieht jetzt)
      if(sel.unread_by_admin > 0){
        try { await window.lwUpdateConversation(sel.id, { unread_by_admin: 0 }); }
        catch(e){}
        sel.unread_by_admin = 0;
      }
    }

    root.innerHTML = `
      <div style="margin-bottom:14px;display:flex;align-items:center;gap:10px">
        <span class="pill pill-green">🟢 Realtime via Supabase</span>
        <small style="color:var(--adm-ink-soft)">Echtzeit-Updates über alle Geräte</small>
      </div>
      <div style="display:grid;grid-template-columns:320px 1fr;gap:20px;height:calc(100vh - 200px);min-height:500px">
        <div class="adm-card" style="display:flex;flex-direction:column;overflow:hidden">
          <div class="adm-card-h">
            <h3>Konversationen</h3>
            <span class="pill pill-green">${activeConvs.length} aktiv</span>
          </div>
          <div style="flex:1;overflow-y:auto" id="lc-conv-list">
            ${convs.map(c => `
              <div class="msg-item ${c.unread_by_admin > 0 ? 'unread':''}" data-conv="${c.id}" style="${c.id === sel?.id ? 'background:var(--adm-accent-soft);' : ''}cursor:pointer">
                <div class="msg-avatar" style="background:${c.status==='active'?'#2f7a3e':'#6b6863'};color:#fff">${escapeHtml((c.customer_name||'?').charAt(0).toUpperCase())}</div>
                <div class="msg-meta">
                  <div class="top">
                    <span class="name">${escapeHtml(c.customer_name||'Gast')}</span>
                    <span class="when">${timeAgo(new Date(c.last_activity||c.started_at||0).getTime())}</span>
                  </div>
                  <div class="topic" style="font-size:.74rem;color:var(--adm-ink-soft)">
                    ${c.status === 'active' ? '<span class="pill pill-green" style="font-size:.62rem">aktiv</span>' : '<span class="pill pill-gray" style="font-size:.62rem">geschlossen</span>'}
                    ${c.operator ? ' · ' + escapeHtml(c.operator) : ''}
                  </div>
                </div>
                ${c.unread_by_admin > 0 ? `<div style="background:#b3261e;color:#fff;font-size:.7rem;font-weight:700;border-radius:99px;min-width:20px;height:20px;display:grid;place-items:center;padding:0 6px;align-self:center">${c.unread_by_admin}</div>` : '<div></div>'}
              </div>
            `).join("")}
          </div>
        </div>

        <div class="adm-card" style="display:flex;flex-direction:column;overflow:hidden">
          ${sel ? renderSupabaseThreadHTML(sel, messages) : '<div class="empty"><h3>Wähle eine Konversation</h3></div>'}
        </div>
      </div>
    `;

    // Auswahl
    root.querySelectorAll("[data-conv]").forEach(el => el.addEventListener("click", () => {
      liveChatSupabaseSelectedId = parseInt(el.dataset.conv, 10);
      renderLiveChatSupabase(root);
    }));

    // Thread-Aktionen
    if(sel) wireSupabaseThread(sel, root);

    // Realtime-Updates
    subscribeLiveChatUpdates(root);
  }

  function renderSupabaseThreadHTML(conv, messages){
    const op = conv.operator || "Team";
    return `
      <div class="adm-card-h" style="border-bottom:1px solid var(--adm-line);padding-bottom:14px">
        <div style="display:flex;align-items:center;gap:10px">
          <div class="msg-avatar" style="background:#2f7a3e;color:#fff;width:36px;height:36px">${escapeHtml((conv.customer_name||'?').charAt(0).toUpperCase())}</div>
          <div>
            <strong>${escapeHtml(conv.customer_name||'Gast')}</strong><br>
            <small style="color:var(--adm-ink-soft)">${escapeHtml(conv.customer_email||'kein E-Mail')} · ${conv.status === 'active' ? '<span style="color:#2f7a3e">● live</span>' : 'geschlossen'}</small>
          </div>
        </div>
        ${conv.status === 'active' ? '<button class="adm-btn danger sm" id="lc-close-sb">Chat schließen</button>' : ''}
      </div>
      <div id="lc-thread-sb" style="flex:1;overflow-y:auto;padding:18px 22px;display:flex;flex-direction:column;gap:10px">
        ${(messages||[]).map(m => renderSupabaseMsg(m)).join("")}
      </div>
      ${conv.status === 'active' ? `
        <form id="lc-form-sb" style="border-top:1px solid var(--adm-line);padding:14px;display:flex;gap:8px">
          <input type="text" id="lc-input-sb" placeholder="Antwort als ${escapeHtml(op)} schreiben…" style="flex:1;padding:10px 14px;border:1px solid var(--adm-line);border-radius:8px;font-family:inherit;font-size:.9rem;background:var(--adm-surface);color:var(--adm-ink)" autocomplete="off">
          <button type="submit" class="adm-btn primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z"/></svg>
            Senden
          </button>
        </form>
      ` : '<div style="padding:16px 22px;color:var(--adm-ink-soft);font-size:.85rem;font-style:italic;text-align:center;border-top:1px solid var(--adm-line)">Konversation geschlossen.</div>'}
    `;
  }

  function renderSupabaseMsg(m){
    if(m.from_who === "system"){
      return `<div style="text-align:center;font-size:.74rem;color:var(--adm-ink-soft);padding:4px 0;font-style:italic">${escapeHtml(m.text)}</div>`;
    }
    const isOp = m.from_who === "operator";
    const align = isOp ? 'flex-end' : 'flex-start';
    const bg = isOp ? '#1a1a1a' : 'var(--adm-surface-2)';
    const color = isOp ? '#fff' : 'var(--adm-ink)';
    const time = new Date(m.created_at).toLocaleTimeString("de-DE", {hour:"2-digit", minute:"2-digit"});
    return `
      <div style="display:flex;justify-content:${align}">
        <div style="max-width:75%;background:${bg};color:${color};padding:10px 14px;border-radius:14px;${isOp?'border-bottom-right-radius:4px':'border-bottom-left-radius:4px'}">
          <div style="font-size:.9rem;line-height:1.4">${escapeHtml(m.text)}</div>
          <div style="font-size:.65rem;opacity:.6;margin-top:3px;text-align:${isOp?'right':'left'}">${time}${isOp && m.operator_name ? ' · ' + escapeHtml(m.operator_name) : ''}</div>
        </div>
      </div>
    `;
  }

  function wireSupabaseThread(conv, root){
    const closeBtn = root.querySelector("#lc-close-sb");
    if(closeBtn){
      closeBtn.addEventListener("click", async () => {
        if(await confirmModal("Konversation wirklich schließen? Der Kunde wird informiert.")){
          try {
            await window.lwUpdateConversation(conv.id, { status: "closed" });
            await window.lwSendChatMessage(conv.id, "system", "Chat vom Team geschlossen.");
          } catch(e){}
          logActivity("livechat", "Chat geschlossen", conv.customer_name);
          toast("Chat geschlossen", "success");
          renderLiveChatSupabase(root);
        }
      });
    }
    const form = root.querySelector("#lc-form-sb");
    const input = root.querySelector("#lc-input-sb");
    const thread = root.querySelector("#lc-thread-sb");
    if(thread) thread.scrollTop = thread.scrollHeight;
    if(input) setTimeout(() => input.focus(), 50);
    if(form && input){
      form.addEventListener("submit", async e => {
        e.preventDefault();
        const text = input.value.trim();
        if(!text) return;
        input.value = "";
        try {
          await window.lwSendChatMessage(conv.id, "operator", text, conv.operator || "Lukas");
          logActivity("livechat", "Antwort an " + (conv.customer_name || "Kunde"), text.slice(0, 50));
        } catch(err){ console.error(err); toast("Senden fehlgeschlagen", "error"); }
      });
    }
  }

  function subscribeLiveChatUpdates(root){
    if(liveChatSupabaseUnsub) liveChatSupabaseUnsub();
    if(typeof window.lwSubscribeAllConversations === "function"){
      liveChatSupabaseUnsub = window.lwSubscribeAllConversations(() => {
        // Bei jeder Änderung — re-render
        if(currentView === "livechat"){
          renderLiveChatSupabase(root);
        }
      });
    }
  }

  // ============ LIVE CHAT RENDER ============
  function renderLiveChatThreadHTML(conv){
    if(!conv) return '<div class="empty"><h3>Wähle eine Konversation</h3></div>';
    const op = conv.operator || "Team";
    return `
      <div class="adm-card-h" style="border-bottom:1px solid var(--adm-line);padding-bottom:14px">
        <div style="display:flex;align-items:center;gap:10px">
          <div class="msg-avatar" style="background:#2f7a3e;color:#fff;width:36px;height:36px">${escapeHtml((conv.customer?.name||'?').charAt(0).toUpperCase())}</div>
          <div>
            <strong>${escapeHtml(conv.customer?.name||'Gast')}</strong><br>
            <small style="color:var(--adm-ink-soft)">${escapeHtml(conv.customer?.email||'kein E-Mail')} · ${conv.status === 'active' ? '<span style="color:#2f7a3e">● live</span>' : 'geschlossen'}</small>
          </div>
        </div>
        <div style="display:flex;gap:8px">
          ${conv.status === 'active' ? `<button class="adm-btn danger sm" id="lc-close-conv">Chat schließen</button>` : ''}
        </div>
      </div>
      <div id="lc-thread" style="flex:1;overflow-y:auto;padding:18px 22px;display:flex;flex-direction:column;gap:10px">
        ${(conv.messages||[]).map(m => renderLiveMsg(m)).join("")}
      </div>
      ${conv.status === 'active' ? `
        <form id="lc-form" style="border-top:1px solid var(--adm-line);padding:14px;display:flex;gap:8px">
          <input type="text" id="lc-input" placeholder="Antwort als ${escapeHtml(op)} schreiben…" style="flex:1;padding:10px 14px;border:1px solid var(--adm-line);border-radius:8px;font-family:inherit;font-size:.9rem;background:var(--adm-surface);color:var(--adm-ink)" autocomplete="off">
          <button type="submit" class="adm-btn primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z"/></svg>
            Senden
          </button>
        </form>
      ` : '<div style="padding:16px 22px;color:var(--adm-ink-soft);font-size:.85rem;font-style:italic;text-align:center;border-top:1px solid var(--adm-line)">Diese Konversation ist geschlossen.</div>'}
    `;
  }
  function renderLiveMsg(m){
    if(m.from === "system"){
      return `<div style="text-align:center;font-size:.74rem;color:var(--adm-ink-soft);padding:4px 0;font-style:italic">${escapeHtml(m.text)}</div>`;
    }
    const isOp = m.from === "operator";
    const align = isOp ? 'flex-end' : 'flex-start';
    const bg = isOp ? '#1a1a1a' : 'var(--adm-surface-2)';
    const color = isOp ? '#fff' : 'var(--adm-ink)';
    const time = new Date(m.time).toLocaleTimeString("de-DE", {hour:"2-digit", minute:"2-digit"});
    return `
      <div style="display:flex;justify-content:${align}">
        <div style="max-width:75%;background:${bg};color:${color};padding:10px 14px;border-radius:14px;${isOp?'border-bottom-right-radius:4px':'border-bottom-left-radius:4px'}">
          <div style="font-size:.9rem;line-height:1.4">${escapeHtml(m.text)}</div>
          <div style="font-size:.65rem;opacity:.6;margin-top:3px;text-align:${isOp?'right':'left'}">${time}${isOp && m.operator ? ' · ' + escapeHtml(m.operator) : ''}</div>
        </div>
      </div>
    `;
  }
  function renderLiveChatThread(){
    const lc = getLiveChatState();
    const sel = lc.conversations?.find(c => c.id === (lc.activeAdmin || lc.conversations[0]?.id));
    if(!sel) return;
    const thread = $("#lc-thread");
    if(thread){
      // nur appenden was neu ist statt komplett überschreiben (Scroll-Position bleibt)
      const existing = thread.children.length;
      const messages = sel.messages || [];
      if(messages.length > existing){
        const newOnes = messages.slice(existing);
        newOnes.forEach(m => {
          const tmp = document.createElement("div");
          tmp.innerHTML = renderLiveMsg(m);
          while(tmp.firstChild) thread.appendChild(tmp.firstChild);
        });
        thread.scrollTop = thread.scrollHeight;
      }
    }
  }
  function wireLiveChatThread(conv, root){
    if(!conv) return;
    const closeBtn = root.querySelector("#lc-close-conv");
    if(closeBtn){
      closeBtn.addEventListener("click", async () => {
        if(await confirmModal("Konversation wirklich schließen? Der Kunde wird informiert.")){
          closeConversation(conv.id);
          logActivity("livechat", "Chat geschlossen", conv.customer?.name);
          toast("Chat geschlossen", "success");
          VIEWS.livechat(root);
        }
      });
    }
    const form = root.querySelector("#lc-form");
    const input = root.querySelector("#lc-input");
    if(form && input){
      // Scroll initial nach unten
      const thread = root.querySelector("#lc-thread");
      if(thread) thread.scrollTop = thread.scrollHeight;
      // Fokus
      setTimeout(() => input.focus(), 50);
      form.addEventListener("submit", e => {
        e.preventDefault();
        const text = input.value.trim();
        if(!text) return;
        sendOperatorMessage(conv.id, text, conv.operator || "Lukas");
        input.value = "";
        logActivity("livechat", "Antwort an " + (conv.customer?.name || "Kunde"), text.slice(0, 50));
        renderLiveChatThread();
      });
    }
  }

  // ============ LIVE FEED RENDER ============
  function timeAgo(ts){
    const diff = Date.now() - ts;
    const min = Math.floor(diff/60000);
    if(min < 1) return "gerade eben";
    if(min < 60) return "vor " + min + " Min";
    const h = Math.floor(min/60);
    if(h < 24) return "vor " + h + " Std";
    return "vor " + Math.floor(h/24) + " Tagen";
  }
  function renderLiveFeed(){
    const feed = getLiveFeed();
    if(feed.length === 0) return '<div class="empty" style="padding:30px"><p>Keine Aktivität</p></div>';
    return `<div style="display:flex;flex-direction:column">${feed.slice(0, 15).map((e, i) => `
      <div style="display:flex;align-items:center;gap:12px;padding:11px 18px;border-bottom:1px solid var(--adm-line);${i===0?'background:var(--adm-success-soft)':''}">
        <span style="font-size:1.1rem">${e.icon}</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:.85rem">${escapeHtml(e.text)}</div>
          <small style="color:var(--adm-ink-soft);font-size:.72rem">${timeAgo(e.at)}</small>
        </div>
      </div>
    `).join("")}</div>`;
  }
  let liveTimer = null;
  function startLiveTicker(){
    if(liveTimer) return;
    const tick = () => {
      generateLiveEvent(0);
      const c = $("#live-feed-container");
      if(c) c.innerHTML = renderLiveFeed();
    };
    // alle 12-25 Sekunden ein neues Event
    const schedule = () => {
      liveTimer = setTimeout(() => {
        tick();
        schedule();
      }, 12000 + Math.random() * 13000);
    };
    schedule();
  }
  function stopLiveTicker(){ if(liveTimer){ clearTimeout(liveTimer); liveTimer = null; } }

  // ============ HELPERS for views ============
  function statusPill(status){
    const map = {
      pending: ['pill-orange', 'Offen'],
      processing: ['pill-blue', 'In Bearbeitung'],
      shipped: ['pill-blue', 'Versendet'],
      delivered: ['pill-green', 'Zugestellt'],
      cancelled: ['pill-red', 'Storniert'],
      refunded: ['pill-gray', 'Erstattet']
    };
    const [cls, label] = map[status] || ['pill-gray', status || 'Unbekannt'];
    return `<span class="pill ${cls}">${label}</span>`;
  }
  function stockPill(stock){
    if(stock === 0) return '<span class="pill pill-red">Ausverkauft</span>';
    if(stock <= 10) return `<span class="pill pill-orange">Niedrig (${stock})</span>`;
    return `<span class="pill pill-green">${stock} Stück</span>`;
  }

  function exportCSV(filename, rows){
    if(!rows.length){ toast("Keine Daten zum Exportieren", "error"); return; }
    const headers = Object.keys(rows[0]).filter(k => typeof rows[0][k] !== 'object');
    const csv = [
      headers.join(","),
      ...rows.map(r => headers.map(h => {
        const v = String(r[h] ?? '').replace(/"/g, '""');
        return `"${v}"`;
      }).join(","))
    ].join("\n");
    const blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
    toast("CSV exportiert", "success");
  }

  // ============ FORMS ============
  function openProductForm(id, onSave){
    const products = getProducts();
    const p = id ? products.find(x => x.id === id) : {
      id: "P" + uid(),
      name: "", price: 0, compareAt: null,
      img: "", image: "",
      category: "T-Shirts",
      description: "",
      sizes: ["S","M","L","XL"],
      stock: 50,
      active: true
    };
    const m = modal({
      title: id ? "Produkt bearbeiten" : "Neues Produkt",
      wide: true,
      body: `
        <div class="adm-form">
          <div class="adm-field-row">
            <div class="adm-field"><label>Produktname</label><input type="text" id="pf-name" value="${escapeHtml(p.name)}"></div>
            <div class="adm-field"><label>Kategorie</label><select id="pf-cat">
              <option${p.category==='T-Shirts'?' selected':''}>T-Shirts</option>
              <option${p.category==='Hoodies'?' selected':''}>Hoodies</option>
              <option${p.category==='Hosen'?' selected':''}>Hosen</option>
              <option${p.category==='Jacken'?' selected':''}>Jacken</option>
              <option${p.category==='Accessoires'?' selected':''}>Accessoires</option>
            </select></div>
          </div>
          <div class="adm-field-row">
            <div class="adm-field"><label>Preis (€)</label><input type="number" id="pf-price" value="${p.price}" step="0.01" min="0"></div>
            <div class="adm-field"><label>Vergleichspreis (Sale)</label><input type="number" id="pf-compare" value="${p.compareAt || ''}" step="0.01" min="0" placeholder="leer für kein Sale"></div>
          </div>
          <div class="adm-field"><label>Bild-URL</label><input type="text" id="pf-img" value="${escapeHtml(p.img || p.image || '')}" placeholder="https://… oder images/…"></div>
          <div class="adm-field"><label>Beschreibung</label><textarea id="pf-desc" rows="4">${escapeHtml(p.description || '')}</textarea></div>
          <div class="adm-field-row">
            <div class="adm-field"><label>Größen (kommasepariert)</label><input type="text" id="pf-sizes" value="${escapeHtml((p.sizes || []).join(', '))}"></div>
            <div class="adm-field"><label>Lagerbestand</label><input type="number" id="pf-stock" value="${p.stock ?? 50}" min="0"></div>
          </div>

          <div style="background:var(--adm-surface-2);padding:14px 16px;border-radius:10px;display:flex;flex-direction:column;gap:14px">
            <strong style="font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;color:var(--adm-ink-soft)">Premium-Features</strong>

            <label class="adm-switch"><input type="checkbox" id="pf-limited"${p.limitedEdition ? ' checked':''}><span class="adm-switch-knob"></span><div><strong>🏆 Limited Edition</strong><br><small style="color:var(--adm-ink-soft)">„Stück X von Y" — exklusives Sammler-Piece</small></div></label>
            <div class="adm-field-row" id="pf-limited-fields" style="${p.limitedEdition?'':'display:none'}">
              <div class="adm-field"><label>Auflage (Gesamt)</label><input type="number" id="pf-editionSize" value="${p.editionSize || 200}" min="1"></div>
              <div class="adm-field"><label>Bereits verkauft</label><input type="number" id="pf-editionSold" value="${p.editionSold || 0}" min="0"></div>
            </div>

            <label class="adm-switch"><input type="checkbox" id="pf-preorder"${p.preorder ? ' checked':''}><span class="adm-switch-knob"></span><div><strong>📅 Pre-Order</strong><br><small style="color:var(--adm-ink-soft)">Kunden können vorbestellen mit Lieferdatum</small></div></label>
            <div class="adm-field-row" id="pf-preorder-fields" style="${p.preorder?'':'display:none'}">
              <div class="adm-field"><label>Lieferdatum</label><input type="date" id="pf-preorderDate" value="${p.preorderDate || ''}"></div>
              <div class="adm-field"><label>Pre-Order Rabatt (%)</label><input type="number" id="pf-preorderDiscount" value="${p.preorderDiscount || 10}" min="0" max="50"></div>
            </div>
          </div>

          <label class="adm-switch"><input type="checkbox" id="pf-active"${(p.active ?? true) ? ' checked':''}><span class="adm-switch-knob"></span><div><strong>Im Shop sichtbar</strong></div></label>
        </div>
      `,
      footer: `<button class="adm-btn" data-cancel>Abbrechen</button><button class="adm-btn primary" data-ok>Speichern</button>`
    });
    m.el.querySelector("[data-cancel]").addEventListener("click", m.close);

    // Limited + Pre-Order Toggle-Wiring
    const limitedToggle = m.el.querySelector("#pf-limited");
    const limitedFields = m.el.querySelector("#pf-limited-fields");
    if(limitedToggle) limitedToggle.addEventListener("change", () => {
      limitedFields.style.display = limitedToggle.checked ? "" : "none";
    });
    const preorderToggle = m.el.querySelector("#pf-preorder");
    const preorderFields = m.el.querySelector("#pf-preorder-fields");
    if(preorderToggle) preorderToggle.addEventListener("change", () => {
      preorderFields.style.display = preorderToggle.checked ? "" : "none";
    });

    m.el.querySelector("[data-ok]").addEventListener("click", async () => {
      const patch = {
        name: m.el.querySelector("#pf-name").value.trim(),
        category: m.el.querySelector("#pf-cat").value,
        price: parseFloat(m.el.querySelector("#pf-price").value) || 0,
        compareAt: parseFloat(m.el.querySelector("#pf-compare").value) || null,
        img: m.el.querySelector("#pf-img").value.trim(),
        image: m.el.querySelector("#pf-img").value.trim(),
        description: m.el.querySelector("#pf-desc").value,
        sizes: m.el.querySelector("#pf-sizes").value.split(",").map(s => s.trim()).filter(Boolean),
        stock: parseInt(m.el.querySelector("#pf-stock").value, 10) || 0,
        active: m.el.querySelector("#pf-active").checked,
        limitedEdition: limitedToggle?.checked || false,
        editionSize: parseInt(m.el.querySelector("#pf-editionSize")?.value, 10) || null,
        editionSold: parseInt(m.el.querySelector("#pf-editionSold")?.value, 10) || 0,
        preorder: preorderToggle?.checked || false,
        preorderDate: m.el.querySelector("#pf-preorderDate")?.value || null,
        preorderDiscount: parseInt(m.el.querySelector("#pf-preorderDiscount")?.value, 10) || 0
      };
      if(!patch.name){ toast("Bitte Name eingeben", "error"); return; }
      const productId = id || p.id;
      const fullProduct = {...p, ...patch, id: productId};
      // Schreibe nach Supabase
      let supabaseSuccess = false;
      if(typeof window.lwUpsertProduct === "function"){
        try {
          await window.lwUpsertProduct(fullProduct);
          supabaseSuccess = true;
          // window.PRODUCTS in-place updaten
          const idx = window.PRODUCTS.findIndex(x => x.id === productId);
          if(idx >= 0) window.PRODUCTS[idx] = fullProduct;
          else window.PRODUCTS.push(fullProduct);
        } catch(err){
          console.error("Supabase-Update fehlgeschlagen:", err);
        }
      }
      // localStorage als Fallback / Backup
      if(id) setProductOverride(id, patch);
      else addProductExtra({...p, ...patch});
      logActivity("products", (id ? "Produkt aktualisiert: " : "Neues Produkt: ") + patch.name + (supabaseSuccess ? " (Supabase ✓)" : " (lokal)"));
      toast((id ? "Produkt aktualisiert" : "Produkt erstellt") + (supabaseSuccess ? " — in Supabase" : ""), "success");
      m.close();
      onSave && onSave();
    });
  }

  function openDropForm(id, onSave){
    const drops = getDrops();
    const d = id ? drops.find(x => x.id === id) : {id: "drop_" + uid(), title:"", date:"", img:"", desc:"", status:"upcoming"};
    const localDate = d.date ? d.date.slice(0, 16) : "";
    const m = modal({
      title: id ? "Drop bearbeiten" : "Neuer Drop",
      body: `
        <div class="adm-form">
          <div class="adm-field"><label>Titel</label><input type="text" id="df-title" value="${escapeHtml(d.title)}"></div>
          <div class="adm-field"><label>Datum &amp; Uhrzeit</label><input type="datetime-local" id="df-date" value="${escapeHtml(localDate)}"></div>
          <div class="adm-field"><label>Bild-URL</label><input type="text" id="df-img" value="${escapeHtml(d.img)}"></div>
          <div class="adm-field"><label>Beschreibung</label><textarea id="df-desc" rows="3">${escapeHtml(d.desc || '')}</textarea></div>
          <div class="adm-field"><label>Status</label><select id="df-status">
            <option value="upcoming"${d.status==='upcoming'?' selected':''}>Geplant</option>
            <option value="live"${d.status==='live'?' selected':''}>Live</option>
            <option value="past"${d.status==='past'?' selected':''}>Vorbei</option>
          </select></div>
        </div>
      `,
      footer: `<button class="adm-btn" data-cancel>Abbrechen</button><button class="adm-btn primary" data-ok>Speichern</button>`
    });
    m.el.querySelector("[data-cancel]").addEventListener("click", m.close);
    m.el.querySelector("[data-ok]").addEventListener("click", () => {
      const titleVal = m.el.querySelector("#df-title").value.trim();
      const dateVal = m.el.querySelector("#df-date").value;
      if(!titleVal){ toast("Bitte Titel eingeben", "error"); return; }
      if(!dateVal){ toast("Bitte Datum wählen", "error"); return; }
      let isoDate;
      try { isoDate = new Date(dateVal).toISOString(); }
      catch(e){ toast("Ungültiges Datum", "error"); return; }
      const updated = {
        ...d,
        title: titleVal,
        date: isoDate,
        img: m.el.querySelector("#df-img").value,
        desc: m.el.querySelector("#df-desc").value,
        status: m.el.querySelector("#df-status").value
      };
      const list = getDrops();
      const idx = list.findIndex(x => x.id === d.id);
      if(idx >= 0) list[idx] = updated;
      else list.push(updated);
      saveDrops(list);
      logActivity("drops", (id ? "Drop aktualisiert: " : "Neuer Drop: ") + updated.title, fmtDateTime(updated.date));
      toast(id ? "Drop aktualisiert" : "Drop erstellt", "success");
      m.close();
      onSave && onSave();
    });
  }

  function openDiscountForm(id, onSave){
    const list = getDiscounts();
    const d = id ? list.find(x => x.id === id) : {id: uid(), code: "", percent: 10, active: true, uses: 0, max: null, expires: null};
    const m = modal({
      title: id ? "Gutschein bearbeiten" : "Neuer Gutschein",
      body: `
        <div class="adm-form">
          <div class="adm-field"><label>Code</label><input type="text" id="dc-code" value="${escapeHtml(d.code)}" placeholder="z.B. SUMMER25" style="text-transform:uppercase"></div>
          <div class="adm-field-row">
            <div class="adm-field"><label>Rabatt (%)</label><input type="number" id="dc-percent" value="${d.percent}" min="1" max="100"></div>
            <div class="adm-field"><label>Max. Einlösungen (leer = unbegrenzt)</label><input type="number" id="dc-max" value="${d.max || ''}" min="1"></div>
          </div>
          <div class="adm-field"><label>Ablaufdatum (optional)</label><input type="date" id="dc-exp" value="${d.expires || ''}"></div>
          <label class="adm-switch"><input type="checkbox" id="dc-active"${d.active ? ' checked':''}><span class="adm-switch-knob"></span><div><strong>Aktiv</strong></div></label>
        </div>
      `,
      footer: `<button class="adm-btn" data-cancel>Abbrechen</button><button class="adm-btn primary" data-ok>Speichern</button>`
    });
    m.el.querySelector("[data-cancel]").addEventListener("click", m.close);
    m.el.querySelector("[data-ok]").addEventListener("click", () => {
      const updated = {
        ...d,
        code: m.el.querySelector("#dc-code").value.toUpperCase().trim(),
        percent: parseInt(m.el.querySelector("#dc-percent").value, 10) || 0,
        max: parseInt(m.el.querySelector("#dc-max").value, 10) || null,
        expires: m.el.querySelector("#dc-exp").value || null,
        active: m.el.querySelector("#dc-active").checked
      };
      if(!updated.code){ toast("Code eingeben", "error"); return; }
      const all = getDiscounts();
      const idx = all.findIndex(x => x.id === d.id);
      if(idx >= 0) all[idx] = updated;
      else all.push(updated);
      saveDiscounts(all);
      logActivity("discounts", (id ? "Gutschein aktualisiert: " : "Neuer Gutschein: ") + updated.code, updated.percent + "%");
      toast(id ? "Gutschein aktualisiert" : "Gutschein erstellt", "success");
      m.close();
      onSave && onSave();
    });
  }

  function openGiftcardForm(onSave){
    const m = modal({
      title: "Geschenkkarte erstellen",
      body: `
        <div class="adm-form">
          <div class="adm-field"><label>Code (oder leer für Auto-Generierung)</label><input type="text" id="gc-code" placeholder="z.B. GIFT-2026" style="text-transform:uppercase"></div>
          <div class="adm-field"><label>Wert (€)</label><input type="number" id="gc-amount" value="50" min="10" step="10"></div>
        </div>
      `,
      footer: `<button class="adm-btn" data-cancel>Abbrechen</button><button class="adm-btn primary" data-ok>Erstellen</button>`
    });
    m.el.querySelector("[data-cancel]").addEventListener("click", m.close);
    m.el.querySelector("[data-ok]").addEventListener("click", () => {
      let code = m.el.querySelector("#gc-code").value.toUpperCase().trim();
      if(!code) code = "GIFT-" + uid().toUpperCase();
      const amount = parseFloat(m.el.querySelector("#gc-amount").value) || 0;
      const all = load(K.giftcards, {});
      all[code] = {amount, used: 0, created: new Date().toISOString()};
      save(K.giftcards, all);
      toast("Karte erstellt: " + code, "success");
      m.close();
      onSave && onSave();
    });
  }

  function openOrderForm(){
    const m = modal({
      title: "Neue Bestellung manuell anlegen",
      body: `
        <div class="adm-form">
          <div class="adm-field-row">
            <div class="adm-field"><label>Kunden-Name</label><input type="text" id="ord-name"></div>
            <div class="adm-field"><label>E-Mail</label><input type="email" id="ord-email"></div>
          </div>
          <div class="adm-field"><label>Artikel-Beschreibung</label><input type="text" id="ord-items" placeholder="z.B. Light Hoodie M x2"></div>
          <div class="adm-field-row">
            <div class="adm-field"><label>Summe (€)</label><input type="number" id="ord-total" step="0.01" value="0"></div>
            <div class="adm-field"><label>Status</label><select id="ord-status">
              <option value="pending">Offen</option>
              <option value="processing">In Bearbeitung</option>
              <option value="shipped">Versendet</option>
            </select></div>
          </div>
        </div>
      `,
      footer: `<button class="adm-btn" data-cancel>Abbrechen</button><button class="adm-btn primary" data-ok>Anlegen</button>`
    });
    m.el.querySelector("[data-cancel]").addEventListener("click", m.close);
    m.el.querySelector("[data-ok]").addEventListener("click", () => {
      const order = {
        id: "LW-" + Date.now(),
        date: new Date().toISOString(),
        status: m.el.querySelector("#ord-status").value,
        customer: {
          name: m.el.querySelector("#ord-name").value,
          email: m.el.querySelector("#ord-email").value
        },
        items: [{name: m.el.querySelector("#ord-items").value, qty: 1, price: parseFloat(m.el.querySelector("#ord-total").value) || 0}],
        total: parseFloat(m.el.querySelector("#ord-total").value) || 0,
        shipping: 0,
        isAdmin: true
      };
      const adm = load(K.adminOrders, []);
      adm.push(order);
      save(K.adminOrders, adm);
      toast("Bestellung angelegt", "success");
      m.close();
      VIEWS.orders($("#admin-content"));
    });
  }

  function openOrderDetail(id){
    const o = getOrders().find(x => x.id === id);
    if(!o){ toast("Bestellung nicht gefunden", "error"); return; }
    const isClosed = o.status === 'cancelled' || o.status === 'refunded';
    const refundInfo = o.refund ? `
      <div style="background:#f1efe9;border:1px solid #d3d0c8;border-radius:8px;padding:12px 14px;margin-bottom:6px;font-size:.85rem">
        <strong>Erstattet:</strong> ${fmtEUR(o.refund.amount)} am ${fmtDateTime(o.refund.date)}${o.refund.reason ? ` · Grund: ${escapeHtml(o.refund.reason)}` : ''}
      </div>
    ` : '';
    const cancelInfo = o.cancelled ? `
      <div style="background:#fce8e6;border:1px solid #f0a3a0;border-radius:8px;padding:12px 14px;margin-bottom:6px;font-size:.85rem;color:#b3261e">
        <strong>Storniert</strong> am ${fmtDateTime(o.cancelled.date)}${o.cancelled.reason ? ` · Grund: ${escapeHtml(o.cancelled.reason)}` : ''}
      </div>
    ` : '';
    const m = modal({
      title: "Bestellung " + o.id,
      wide: true,
      body: `
        <div style="display:grid;gap:18px">
          ${cancelInfo}${refundInfo}
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px">
            <div>
              <h4 style="margin:0 0 6px;font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;color:var(--adm-ink-soft)">Kunde</h4>
              <strong>${escapeHtml(o.customer?.name || 'Gast')}</strong><br>
              <span style="color:var(--adm-ink-soft);font-size:.85rem">${escapeHtml(o.customer?.email || '—')}</span>
            </div>
            <div>
              <h4 style="margin:0 0 6px;font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;color:var(--adm-ink-soft)">Datum</h4>
              <strong>${fmtDateTime(o.date)}</strong>
            </div>
            <div>
              <h4 style="margin:0 0 6px;font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;color:var(--adm-ink-soft)">Status</h4>
              ${statusPill(o.status)}
            </div>
          </div>
          ${!isClosed ? `
            <div>
              <h4 style="margin:0 0 6px;font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;color:var(--adm-ink-soft)">Status ändern</h4>
              <select id="ord-st-change" style="padding:8px 12px;border:1px solid var(--adm-line);border-radius:8px">
                <option value="pending"${o.status==='pending'?' selected':''}>Offen</option>
                <option value="processing"${o.status==='processing'?' selected':''}>In Bearbeitung</option>
                <option value="shipped"${o.status==='shipped'?' selected':''}>Versendet</option>
                <option value="delivered"${o.status==='delivered'?' selected':''}>Zugestellt</option>
              </select>
              <button class="adm-btn sm primary" id="ord-st-apply" style="margin-left:8px">Anwenden</button>
            </div>
          ` : `
            <div style="color:var(--adm-ink-soft);font-style:italic;font-size:.9rem">Diese Bestellung ist abgeschlossen. Status-Änderungen sind nicht mehr möglich.</div>
          `}
          <div>
            <h4 style="margin:0 0 6px;font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;color:var(--adm-ink-soft)">Artikel</h4>
            <table class="adm-table" style="border:1px solid var(--adm-line);border-radius:8px;overflow:hidden">
              <thead><tr><th>Artikel</th><th>Größe</th><th class="num">Menge</th><th class="num">Einzelpreis</th><th class="num">Summe</th></tr></thead>
              <tbody>
                ${(o.items||[]).map(it => `<tr><td><strong>${escapeHtml(it.name)}</strong></td><td>${escapeHtml(it.size||'—')}</td><td class="num">${it.qty}</td><td class="num">${fmtEUR(it.price)}</td><td class="num"><strong>${fmtEUR(it.price * it.qty)}</strong></td></tr>`).join("")}
              </tbody>
            </table>
          </div>
          <div style="text-align:right">
            <div style="display:inline-grid;grid-template-columns:auto auto;gap:8px 24px;text-align:right">
              <span style="color:var(--adm-ink-soft)">Versand</span><strong>${fmtEUR(o.shipping || 0)}</strong>
              <span style="font-size:1.05rem">Gesamt</span><strong style="font-size:1.15rem">${fmtEUR(o.total)}</strong>
            </div>
          </div>

          <div>
            <h4 style="margin:0 0 8px;font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;color:var(--adm-ink-soft)">Interne Notizen</h4>
            <div id="ord-notes-list" style="display:flex;flex-direction:column;gap:8px;margin-bottom:10px">
              ${(o.notes||[]).map((n, i) => `
                <div style="background:var(--adm-surface-2);border-radius:8px;padding:10px 12px;font-size:.85rem;display:flex;justify-content:space-between;gap:10px">
                  <div style="flex:1">${escapeHtml(n.text)}<br><small style="color:var(--adm-ink-soft);font-size:.72rem">${fmtDateTime(n.date)} · ${escapeHtml(n.author||'admin')}</small></div>
                  <button class="adm-btn sm danger" data-del-note="${i}" style="align-self:flex-start">×</button>
                </div>
              `).join("") || '<div style="color:var(--adm-ink-soft);font-size:.85rem;font-style:italic">Noch keine Notizen.</div>'}
            </div>
            <div style="display:flex;gap:8px">
              <input type="text" id="ord-note-text" placeholder="Neue Notiz hinzufügen…" style="flex:1;padding:8px 12px;border:1px solid var(--adm-line);border-radius:8px;font-family:inherit;font-size:.85rem;background:var(--adm-surface);color:var(--adm-ink)">
              <button class="adm-btn primary" id="ord-add-note">Hinzufügen</button>
            </div>
          </div>
        </div>
      `,
      footer: `
        <button class="adm-btn" data-close>Schließen</button>
        <button class="adm-btn" data-print>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Rechnung drucken
        </button>
        ${!isClosed ? `
          <button class="adm-btn danger" data-cancel-order>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/></svg>
            Stornieren
          </button>
          <button class="adm-btn success" data-refund>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 8v4l3 2"/></svg>
            Rückerstatten
          </button>
        ` : ''}
      `
    });
    m.el.querySelector("[data-close]").addEventListener("click", m.close);

    // Print-Rechnung
    m.el.querySelector("[data-print]").addEventListener("click", () => printInvoice(o));

    // Notiz hinzufügen
    const addNoteBtn = m.el.querySelector("#ord-add-note");
    if(addNoteBtn){
      addNoteBtn.addEventListener("click", () => {
        const text = m.el.querySelector("#ord-note-text").value.trim();
        if(!text) return;
        const notes = o.notes || [];
        notes.push({text, date: new Date().toISOString(), author: "admin"});
        updateOrder(o.id, {notes});
        logActivity("orders", "Notiz hinzugefügt: " + o.id, text.slice(0, 50));
        toast("Notiz hinzugefügt", "success");
        m.close();
        openOrderDetail(o.id);
      });
    }
    m.el.querySelectorAll("[data-del-note]").forEach(b => b.addEventListener("click", () => {
      const idx = parseInt(b.dataset.delNote, 10);
      const notes = (o.notes||[]).slice();
      notes.splice(idx, 1);
      updateOrder(o.id, {notes});
      toast("Notiz gelöscht", "success");
      m.close();
      openOrderDetail(o.id);
    }));

    const applyBtn = m.el.querySelector("#ord-st-apply");
    if(applyBtn){
      applyBtn.addEventListener("click", () => {
        const newStatus = m.el.querySelector("#ord-st-change").value;
        setOrderStatus(o.id, newStatus);
        toast("Status aktualisiert", "success");
        m.close();
        VIEWS.orders($("#admin-content"));
      });
    }

    const cancelBtn = m.el.querySelector("[data-cancel-order]");
    if(cancelBtn){
      cancelBtn.addEventListener("click", () => openCancelDialog(o, () => { m.close(); VIEWS.orders($("#admin-content")); }));
    }

    const refundBtn = m.el.querySelector("[data-refund]");
    if(refundBtn){
      refundBtn.addEventListener("click", () => openRefundDialog(o, () => { m.close(); VIEWS.orders($("#admin-content")); }));
    }
  }

  function updateOrder(orderId, patch){
    // Supabase zuerst
    const sbOrder = (_supabaseOrdersCache||[]).find(o => o.id === orderId || o.orderNum === orderId);
    if(sbOrder && typeof window.lwUpdateOrder === "function"){
      window.lwUpdateOrder(sbOrder.supabaseId, patch).catch(e => console.error(e));
      Object.assign(sbOrder, patch);
      return;
    }
    const acc = load(K.accountOrders, []);
    let found = false;
    const updatedAcc = acc.map(o => {
      if(o.id === orderId || o.orderNum === orderId){ found = true; return {...o, ...patch}; }
      return o;
    });
    if(found){ save(K.accountOrders, updatedAcc); return; }
    const adm = load(K.adminOrders, []);
    save(K.adminOrders, adm.map(o => o.id === orderId ? {...o, ...patch} : o));
  }

  // ============ ABANDONED-CART REMINDER ============
  function sendAbandonedReminder(cartId){
    const carts = load(K.abandoned, []);
    const c = carts.find(x => x.id === cartId);
    if(!c) return;
    const tpls = load(K.emailTemplates, []);
    const tpl = tpls.find(t => t.id === "abandoned") || tpls[0];
    if(!tpl){ toast("Kein Template gefunden", "error"); return; }
    const m = modal({
      title: "Erinnerungs-Mail senden",
      wide: true,
      body: `
        <div style="background:#e6efff;border:1px solid #a8c4ed;border-radius:8px;padding:12px 14px;margin-bottom:14px;font-size:.85rem">
          📧 An: <strong>${escapeHtml(c.customer.email)}</strong> (${escapeHtml(c.customer.name)})
        </div>
        <div class="adm-field">
          <label>Betreff</label>
          <input type="text" id="rem-subject" value="${escapeHtml(renderTemplate(tpl.subject, c))}">
        </div>
        <div class="adm-field" style="margin-top:12px">
          <label>Inhalt</label>
          <textarea id="rem-body" rows="12" style="font-family:inherit;font-size:.88rem">${escapeHtml(renderTemplate(tpl.body, c))}</textarea>
        </div>
      `,
      footer: `<button class="adm-btn" data-cancel>Abbrechen</button><button class="adm-btn success" data-send>📧 Senden</button>`
    });
    m.el.querySelector("[data-cancel]").addEventListener("click", m.close);
    m.el.querySelector("[data-send]").addEventListener("click", () => {
      const list = load(K.abandoned, []);
      const t = list.find(x => x.id === cartId);
      if(t){ t.reminderSent = true; t.reminderSentAt = new Date().toISOString(); save(K.abandoned, list); }
      logActivity("abandoned", "Erinnerung gesendet an " + c.customer.email, fmtEUR(c.value));
      toast("✓ Mail gesendet (Demo)", "success");
      m.close();
      VIEWS.abandoned($("#admin-content"));
    });
  }

  function renderTemplate(tpl, ctx){
    return String(tpl||'')
      .replace(/\{\{customer\.name\}\}/g, ctx.customer?.name || 'Kunde')
      .replace(/\{\{customer\.email\}\}/g, ctx.customer?.email || '')
      .replace(/\{\{order\.id\}\}/g, ctx.id || 'LW-DEMO')
      .replace(/\{\{order\.total\}\}/g, fmtEUR(ctx.total || ctx.value || 0))
      .replace(/\{\{order\.tracking\}\}/g, 'TRK-' + (ctx.id||'demo').slice(-8))
      .replace(/\{\{order\.eta\}\}/g, '3-5 Werktage')
      .replace(/\{\{order\.address\}\}/g, ctx.customer?.address || 'Musterstr. 1, Berlin')
      .replace(/\{\{refund\.amount\}\}/g, fmtEUR(ctx.refund?.amount || ctx.value || 0))
      .replace(/\{\{refund\.reason\}\}/g, ctx.refund?.reason || 'Kundenwunsch')
      .replace(/\{\{cart\.items\}\}/g, (ctx.items||[]).map(it => `- ${it.name||'Item'} x${it.qty||1} (${fmtEUR(it.price||0)})`).join("\n"))
      .replace(/\{\{cart\.value\}\}/g, fmtEUR(ctx.value || 0));
  }

  function openEmailPreview(tpl){
    if(!tpl){ toast("Kein Template", "error"); return; }
    const demoCtx = {
      customer: {name: "Lisa Berger", email: "lisa@example.com", address: "Sonnenallee 42, 10115 Berlin"},
      id: "LW-2026-001234",
      total: 89.80,
      value: 49.90,
      tracking: "DHL-481523678901",
      eta: "Mo, 14. Juni",
      refund: {amount: 49.90, reason: "Falsche Größe"},
      items: [{name: "JESUS Polo", qty: 1, price: 49.90}]
    };
    const subj = renderTemplate(tpl.subject, demoCtx);
    const body = renderTemplate(tpl.body, demoCtx);
    const win = window.open("", "_blank", "width=700,height=900");
    if(!win){ toast("Bitte Popup-Blocker deaktivieren", "error"); return; }
    win.document.write(`<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"><title>Email-Vorschau — ${escapeHtml(tpl.name)}</title>
<style>
  body { font-family: 'Inter', sans-serif; margin:0; background:#f6f5f1; padding:30px; }
  .wrap { max-width:580px; margin:0 auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,.1); }
  .head { background:#1a1a1a; color:#fff; padding:24px 26px; text-align:center; font-family:'Anton',sans-serif; font-size:1.4rem; letter-spacing:.06em; }
  .meta { padding:14px 26px; border-bottom:1px solid #e8e6e0; background:#faf9f6; font-size:.8rem; color:#6b6863; }
  .meta strong { color:#1a1a1a; }
  .subj { padding:18px 26px 0; font-size:1.1rem; font-weight:600; }
  .body { padding:18px 26px 30px; line-height:1.6; white-space:pre-wrap; font-size:.92rem; }
  .foot { padding:18px 26px; border-top:1px solid #e8e6e0; background:#faf9f6; color:#6b6863; font-size:.78rem; text-align:center; font-style:italic; }
  .badge { display:inline-block; background:#e6f3e9; color:#2f7a3e; padding:3px 10px; border-radius:99px; font-size:.7rem; font-weight:700; letter-spacing:.06em; text-transform:uppercase; margin-bottom:10px; }
</style></head><body>
  <div class="wrap">
    <div class="head">LIGHTWEAR<br><span style="font-family:Inter;font-size:.6rem;letter-spacing:.18em;opacity:.7">COLLECTIVE</span></div>
    <div class="meta">
      <span class="badge">Demo-Vorschau</span><br>
      <strong>An:</strong> ${escapeHtml(demoCtx.customer.email)}<br>
      <strong>Von:</strong> hello@lightwear.net
    </div>
    <div class="subj">${escapeHtml(subj)}</div>
    <div class="body">${escapeHtml(body)}</div>
    <div class="foot">„I am the light of the world." — John 8:12<br>Lightwear Collective UG · Datenschutz · Abmelden</div>
  </div>
</body></html>`);
    win.document.close();
  }

  function openSaleEventForm(id, onSave, prefillDate){
    const all = load(K.saleCalendar, []);
    const e = id ? all.find(x => x.id === id) : {
      id: uid(), name: "", type: "sale", date: prefillDate || new Date().toISOString().slice(0,10),
      endDate: "", discount: 0, status: "scheduled", checklist: [], note: ""
    };
    const m = modal({
      title: id ? "Event bearbeiten" : "Neuer Eintrag",
      wide: true,
      body: `
        <div class="adm-form">
          <div class="adm-field"><label>Name</label><input type="text" id="sc-name" value="${escapeHtml(e.name)}" placeholder="z.B. Sommer-Sale 2026"></div>
          <div class="adm-field-row">
            <div class="adm-field"><label>Typ</label><select id="sc-type">
              <option value="sale"${e.type==='sale'?' selected':''}>🏷 Sale</option>
              <option value="drop"${e.type==='drop'?' selected':''}>🚀 Drop</option>
              <option value="promotion"${e.type==='promotion'?' selected':''}>📣 Promotion</option>
            </select></div>
            <div class="adm-field"><label>Status</label><select id="sc-status">
              <option value="draft"${e.status==='draft'?' selected':''}>Entwurf</option>
              <option value="scheduled"${e.status==='scheduled'?' selected':''}>Geplant</option>
              <option value="active"${e.status==='active'?' selected':''}>Aktiv</option>
              <option value="completed"${e.status==='completed'?' selected':''}>Abgeschlossen</option>
            </select></div>
          </div>
          <div class="adm-field-row">
            <div class="adm-field"><label>Start-Datum</label><input type="date" id="sc-date" value="${e.date}"></div>
            <div class="adm-field"><label>End-Datum (optional)</label><input type="date" id="sc-endDate" value="${e.endDate||''}"></div>
          </div>
          <div class="adm-field"><label>Rabatt (%)</label><input type="number" id="sc-discount" value="${e.discount||0}" min="0" max="100"></div>
          <div class="adm-field"><label>Notiz</label><textarea id="sc-note" rows="3">${escapeHtml(e.note||'')}</textarea></div>
          <div class="adm-field">
            <label>Checkliste</label>
            <div id="sc-checklist" style="display:flex;flex-direction:column;gap:6px">
              ${(e.checklist||[]).map((c,i) => `
                <div style="display:flex;gap:8px;align-items:center;padding:6px 10px;background:var(--adm-surface-2);border-radius:6px">
                  <input type="checkbox" data-check="${i}" ${c.done?'checked':''}>
                  <input type="text" data-text="${i}" value="${escapeHtml(c.text)}" style="flex:1;padding:4px 8px;border:none;background:transparent;font-family:inherit;font-size:.88rem">
                  <button type="button" class="adm-btn sm danger" data-remove-check="${i}">×</button>
                </div>
              `).join("")}
            </div>
            <button type="button" class="adm-btn sm" id="sc-add-check" style="margin-top:6px">+ Punkt hinzufügen</button>
          </div>
        </div>
      `,
      footer: `<button class="adm-btn" data-cancel>Abbrechen</button>${id?'<button class="adm-btn danger" data-delete>Löschen</button>':''}<button class="adm-btn primary" data-ok>Speichern</button>`
    });
    m.el.querySelector("[data-cancel]").addEventListener("click", m.close);

    const checklistEl = m.el.querySelector("#sc-checklist");
    const checklist = [...(e.checklist||[])];
    const rerenderCheck = () => {
      checklistEl.innerHTML = checklist.map((c,i) => `
        <div style="display:flex;gap:8px;align-items:center;padding:6px 10px;background:var(--adm-surface-2);border-radius:6px">
          <input type="checkbox" data-check="${i}" ${c.done?'checked':''}>
          <input type="text" data-text="${i}" value="${escapeHtml(c.text)}" style="flex:1;padding:4px 8px;border:none;background:transparent;font-family:inherit;font-size:.88rem">
          <button type="button" class="adm-btn sm danger" data-remove-check="${i}">×</button>
        </div>
      `).join("");
      checklistEl.querySelectorAll("[data-check]").forEach(cb => cb.addEventListener("change", () => { checklist[parseInt(cb.dataset.check,10)].done = cb.checked; }));
      checklistEl.querySelectorAll("[data-text]").forEach(inp => inp.addEventListener("input", () => { checklist[parseInt(inp.dataset.text,10)].text = inp.value; }));
      checklistEl.querySelectorAll("[data-remove-check]").forEach(b => b.addEventListener("click", () => { checklist.splice(parseInt(b.dataset.removeCheck,10), 1); rerenderCheck(); }));
    };
    rerenderCheck();

    m.el.querySelector("#sc-add-check").addEventListener("click", () => {
      checklist.push({text:"", done:false});
      rerenderCheck();
      // Fokus auf neues Input
      setTimeout(() => {
        const inputs = checklistEl.querySelectorAll("[data-text]");
        inputs[inputs.length-1]?.focus();
      }, 50);
    });

    const delBtn = m.el.querySelector("[data-delete]");
    if(delBtn) delBtn.addEventListener("click", async () => {
      if(await confirmModal("Event wirklich löschen?")){
        save(K.saleCalendar, load(K.saleCalendar, []).filter(x => x.id !== e.id));
        toast("Gelöscht", "success");
        m.close();
        onSave && onSave();
      }
    });

    m.el.querySelector("[data-ok]").addEventListener("click", () => {
      const updated = {
        ...e,
        name: m.el.querySelector("#sc-name").value.trim(),
        type: m.el.querySelector("#sc-type").value,
        status: m.el.querySelector("#sc-status").value,
        date: m.el.querySelector("#sc-date").value,
        endDate: m.el.querySelector("#sc-endDate").value,
        discount: parseInt(m.el.querySelector("#sc-discount").value, 10) || 0,
        note: m.el.querySelector("#sc-note").value,
        checklist: checklist.filter(c => c.text.trim())
      };
      if(!updated.name){ toast("Name eingeben", "error"); return; }
      const all = load(K.saleCalendar, []);
      const idx = all.findIndex(x => x.id === e.id);
      if(idx >= 0) all[idx] = updated; else all.push(updated);
      save(K.saleCalendar, all);
      logActivity("sale-calendar", (id ? "Event aktualisiert: " : "Neues Event: ") + updated.name, updated.type);
      toast(id?"Aktualisiert":"Angelegt", "success");
      m.close();
      onSave && onSave();
    });
  }

  function openCampaignForm(id, onSave){
    const all = load(K.campaigns, []);
    const c = id ? all.find(x => x.id === id) : {id: uid(), name:"", channel:"Instagram", budget:0, spent:0, impressions:0, clicks:0, conversions:0, revenue:0, couponCode:"", startDate:"", endDate:"", status:"active"};
    const m = modal({
      title: id ? "Kampagne bearbeiten" : "Neue Kampagne",
      wide: true,
      body: `
        <div class="adm-form">
          <div class="adm-field"><label>Kampagnen-Name</label><input type="text" id="camp-name" value="${escapeHtml(c.name)}"></div>
          <div class="adm-field-row">
            <div class="adm-field"><label>Kanal</label><select id="camp-channel">
              ${['Instagram','TikTok','Google Ads','Facebook','Email','YouTube','Andere'].map(ch => `<option${c.channel===ch?' selected':''}>${ch}</option>`).join("")}
            </select></div>
            <div class="adm-field"><label>Coupon-Code</label><input type="text" id="camp-coupon" value="${escapeHtml(c.couponCode)}" placeholder="optional" style="text-transform:uppercase"></div>
          </div>
          <div class="adm-field-row">
            <div class="adm-field"><label>Budget (€)</label><input type="number" id="camp-budget" value="${c.budget}" step="10"></div>
            <div class="adm-field"><label>Ausgegeben (€)</label><input type="number" id="camp-spent" value="${c.spent}" step="0.01"></div>
          </div>
          <div class="adm-field-row">
            <div class="adm-field"><label>Impressionen</label><input type="number" id="camp-imp" value="${c.impressions}"></div>
            <div class="adm-field"><label>Klicks</label><input type="number" id="camp-clicks" value="${c.clicks}"></div>
          </div>
          <div class="adm-field-row">
            <div class="adm-field"><label>Conversions</label><input type="number" id="camp-conv" value="${c.conversions}"></div>
            <div class="adm-field"><label>Umsatz (€)</label><input type="number" id="camp-rev" value="${c.revenue}" step="0.01"></div>
          </div>
          <div class="adm-field-row">
            <div class="adm-field"><label>Start</label><input type="date" id="camp-start" value="${c.startDate||''}"></div>
            <div class="adm-field"><label>Ende</label><input type="date" id="camp-end" value="${c.endDate||''}"></div>
          </div>
          <div class="adm-field"><label>Status</label><select id="camp-status">
            <option value="active"${c.status==='active'?' selected':''}>Aktiv</option>
            <option value="paused"${c.status==='paused'?' selected':''}>Pausiert</option>
            <option value="ended"${c.status==='ended'?' selected':''}>Beendet</option>
          </select></div>
        </div>
      `,
      footer: `<button class="adm-btn" data-cancel>Abbrechen</button><button class="adm-btn primary" data-ok>Speichern</button>`
    });
    m.el.querySelector("[data-cancel]").addEventListener("click", m.close);
    m.el.querySelector("[data-ok]").addEventListener("click", () => {
      const updated = {
        ...c,
        name: m.el.querySelector("#camp-name").value.trim(),
        channel: m.el.querySelector("#camp-channel").value,
        couponCode: m.el.querySelector("#camp-coupon").value.toUpperCase(),
        budget: parseFloat(m.el.querySelector("#camp-budget").value)||0,
        spent: parseFloat(m.el.querySelector("#camp-spent").value)||0,
        impressions: parseInt(m.el.querySelector("#camp-imp").value)||0,
        clicks: parseInt(m.el.querySelector("#camp-clicks").value)||0,
        conversions: parseInt(m.el.querySelector("#camp-conv").value)||0,
        revenue: parseFloat(m.el.querySelector("#camp-rev").value)||0,
        startDate: m.el.querySelector("#camp-start").value,
        endDate: m.el.querySelector("#camp-end").value,
        status: m.el.querySelector("#camp-status").value
      };
      if(!updated.name){ toast("Name eingeben", "error"); return; }
      const list = load(K.campaigns, []);
      const idx = list.findIndex(x => x.id === c.id);
      if(idx >= 0) list[idx] = updated; else list.push(updated);
      save(K.campaigns, list);
      logActivity("campaigns", (id?"Kampagne aktualisiert: ":"Neue Kampagne: ") + updated.name, updated.channel + " · " + fmtEUR(updated.budget));
      toast(id?"Aktualisiert":"Erstellt", "success");
      m.close();
      onSave && onSave();
    });
  }

  // ============ BULK-VERSAND-ETIKETTEN ============
  function printShippingLabels(orders, carrier){
    const win = window.open("", "_blank", "width=900,height=1100");
    if(!win){ toast("Bitte Popup-Blocker deaktivieren", "error"); return; }
    const settings = getSettings();
    const carriers = {
      DHL: {name: "DHL", color: "#FFCC00", prefix: "DHL"},
      Hermes: {name: "Hermes", color: "#0099D6", prefix: "HRM"},
      DPD: {name: "DPD", color: "#DC0032", prefix: "DPD"}
    };
    const car = carriers[carrier] || carriers.DHL;
    // Barcode-Helper: einfache vertikale Streifen aus Pseudo-Hash
    const barcode = (s) => {
      const hex = Array.from(s).reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 0).toString(2).padStart(64, "1").slice(0, 64);
      let svg = '<svg viewBox="0 0 200 60" preserveAspectRatio="none" style="width:100%;height:48px">';
      let x = 0;
      for(const bit of hex){
        const w = bit === "1" ? 2.5 : 1.2;
        svg += `<rect x="${x}" y="0" width="${w}" height="50" fill="#000"/>`;
        x += w + (bit === "1" ? 1 : .5);
      }
      svg += '</svg>';
      return svg;
    };

    const labels = orders.map(o => {
      const tracking = car.prefix + "-" + Math.random().toString(36).slice(2, 10).toUpperCase();
      return `
        <div class="label">
          <div class="label-head" style="background:${car.color}"><span>${car.name}</span><span class="weight">< 1 kg</span></div>
          <div class="label-body">
            <div class="from"><strong>Absender</strong><br>${escapeHtml(settings.storeName||'Lightwear Collective')}<br>${escapeHtml(settings.address||'Musterstr. 1, 10115 Berlin')}</div>
            <div class="to">
              <small>An</small>
              <strong>${escapeHtml(o.customer?.name||'Gast')}</strong>
              <span>Sonnenallee 42</span>
              <span>10115 Berlin</span>
              <span>Deutschland</span>
            </div>
            <div class="barcode">${barcode(tracking)}<div class="track-num">${tracking}</div></div>
            <div class="meta">
              <span><strong>Order:</strong> ${escapeHtml(o.id)}</span>
              <span><strong>Datum:</strong> ${fmtDate(o.date)}</span>
            </div>
          </div>
        </div>
      `;
    }).join("");

    win.document.write(`<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"><title>Versand-Etiketten · ${orders.length} St.</title>
<style>
  @page { size: A4; margin: 8mm; }
  body { font-family:'Inter',sans-serif; margin:0; padding:8px; background:#eee; }
  .sheet { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
  .label { background:#fff; border:1px solid #000; border-radius:6px; overflow:hidden; page-break-inside:avoid; min-height:130mm; display:flex; flex-direction:column; }
  .label-head { padding:8px 12px; font-weight:700; font-size:1.05rem; display:flex; justify-content:space-between; align-items:center; letter-spacing:.04em; }
  .weight { font-size:.78rem; font-weight:500; opacity:.7; }
  .label-body { padding:14px 18px; flex:1; display:flex; flex-direction:column; gap:14px; }
  .from { font-size:.7rem; color:#555; line-height:1.4; border-bottom:1px dashed #aaa; padding-bottom:8px; }
  .from strong { font-size:.65rem; letter-spacing:.1em; text-transform:uppercase; color:#888; }
  .to small { font-size:.65rem; letter-spacing:.1em; text-transform:uppercase; color:#888; }
  .to strong { font-family:'Anton',sans-serif; font-size:1.4rem; line-height:1.2; display:block; margin:2px 0 8px; }
  .to span { display:block; font-size:.95rem; line-height:1.4; }
  .barcode { margin-top:auto; }
  .track-num { font-family:monospace; font-size:.78rem; text-align:center; letter-spacing:.1em; margin-top:3px; }
  .meta { font-size:.7rem; color:#666; display:flex; justify-content:space-between; padding-top:8px; border-top:1px dashed #aaa; }
  .noprint { position:fixed; top:10px; right:10px; display:flex; gap:6px; z-index:99; }
  .noprint button { padding:8px 14px; background:#000; color:#fff; border:none; border-radius:4px; cursor:pointer; font-family:inherit; }
  @media print { .noprint { display:none; } body { padding:0; background:#fff; } }
</style></head><body>
  <div class="noprint">
    <button onclick="window.print()">🖨 Drucken</button>
    <button onclick="window.close()" style="background:#fff;color:#000;border:1px solid #000">Schließen</button>
  </div>
  <div class="sheet">${labels}</div>
  <script>setTimeout(() => window.print(), 600);<\/script>
</body></html>`);
    win.document.close();
    logActivity("shipping", orders.length + " Etiketten gedruckt (" + car.name + ")");
  }

  function printInvoice(o){
    const settings = getSettings();
    const itemsTotal = (o.items||[]).reduce((s,it) => s + (it.price * (it.qty||1)), 0);
    const tax = (o.total || 0) * (settings.taxRate||19) / (100 + (settings.taxRate||19));
    const net = (o.total || 0) - tax;

    const win = window.open("", "_blank", "width=800,height=900");
    if(!win){ toast("Bitte Popup-Blocker deaktivieren", "error"); return; }
    win.document.write(`<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<title>Rechnung ${o.id} — ${settings.storeName}</title>
<style>
  @page { size: A4; margin: 18mm; }
  * { box-sizing: border-box; }
  body { font-family: 'Inter', system-ui, sans-serif; color: #1a1a1a; margin: 0; padding: 30px; line-height: 1.5; }
  .head { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 24px; border-bottom: 2px solid #1a1a1a; margin-bottom: 24px; }
  .brand { font-family: 'Anton', Impact, sans-serif; font-size: 1.6rem; letter-spacing: .04em; }
  .brand small { display: block; font-family: inherit; font-size: .7rem; letter-spacing: .12em; color: #6b6863; margin-top: 4px; }
  .invoice-meta { text-align: right; font-size: .82rem; }
  .invoice-meta strong { display: block; font-size: 1rem; }
  h1 { font-family: 'Anton', Impact, sans-serif; font-size: 2rem; margin: 30px 0 6px; letter-spacing: .02em; }
  .lead { color: #6b6863; font-size: .9rem; margin: 0 0 30px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 32px; }
  .box h4 { margin: 0 0 6px; font-size: .68rem; text-transform: uppercase; letter-spacing: .12em; color: #6b6863; }
  .box strong { font-size: 1rem; display: block; margin-bottom: 2px; }
  .box span { color: #6b6863; font-size: .88rem; display: block; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
  th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid #e8e6e0; font-size: .88rem; }
  th { background: #faf9f6; font-size: .7rem; text-transform: uppercase; letter-spacing: .08em; color: #6b6863; font-weight: 600; }
  td.num, th.num { text-align: right; font-variant-numeric: tabular-nums; }
  .totals { display: flex; justify-content: flex-end; margin-bottom: 32px; }
  .totals table { width: 320px; margin: 0; }
  .totals td { border: none; padding: 6px 0; }
  .totals .grand td { border-top: 2px solid #1a1a1a; padding-top: 12px; font-size: 1.05rem; font-weight: 700; }
  .verse { font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; color: #6b6863; text-align: center; padding: 20px 0; border-top: 1px solid #e8e6e0; margin-top: 30px; font-size: .95rem; }
  .foot { font-size: .72rem; color: #6b6863; text-align: center; margin-top: 18px; line-height: 1.7; }
  @media print { .noprint { display: none; } body { padding: 0; } }
  .noprint { position: fixed; top: 16px; right: 16px; display: flex; gap: 8px; }
  .noprint button { background: #1a1a1a; color: #fff; border: none; padding: 10px 18px; border-radius: 6px; cursor: pointer; font-family: inherit; font-size: .85rem; }
  .noprint button.outline { background: transparent; color: #1a1a1a; border: 1px solid #1a1a1a; }
</style>
</head>
<body>
  <div class="noprint">
    <button class="outline" onclick="window.close()">Schließen</button>
    <button onclick="window.print()">🖨 Drucken</button>
  </div>

  <div class="head">
    <div>
      <div class="brand">LIGHTWEAR<small>COLLECTIVE</small></div>
    </div>
    <div class="invoice-meta">
      <strong>${escapeHtml(settings.storeName||'Lightwear Collective')}</strong>
      ${escapeHtml(settings.address||'')}<br>
      ${escapeHtml(settings.email||'')}${settings.phone ? ' · ' + escapeHtml(settings.phone) : ''}
    </div>
  </div>

  <h1>Rechnung</h1>
  <p class="lead">Rechnungs-Nr. <strong>${escapeHtml(o.id)}</strong> · ${fmtDate(o.date)}</p>

  <div class="grid">
    <div class="box">
      <h4>Rechnung an</h4>
      <strong>${escapeHtml(o.customer?.name||'Gast')}</strong>
      <span>${escapeHtml(o.customer?.email||'')}</span>
      ${o.customer?.address ? '<span>' + escapeHtml(o.customer.address) + '</span>' : ''}
    </div>
    <div class="box" style="text-align:right">
      <h4>Status</h4>
      <strong style="text-transform:capitalize">${o.status||'pending'}</strong>
      <span>Zahlung: ${escapeHtml(o.payment||'Kreditkarte')}</span>
    </div>
  </div>

  <table>
    <thead>
      <tr><th>Artikel</th><th>Größe</th><th class="num">Menge</th><th class="num">Einzel</th><th class="num">Summe</th></tr>
    </thead>
    <tbody>
      ${(o.items||[]).map(it => `
        <tr>
          <td><strong>${escapeHtml(it.name||'Artikel')}</strong>${it.id ? '<br><small style="color:#6b6863">' + escapeHtml(it.id) + '</small>' : ''}</td>
          <td>${escapeHtml(it.size||'—')}</td>
          <td class="num">${it.qty||1}</td>
          <td class="num">${fmtEUR(it.price||0)}</td>
          <td class="num"><strong>${fmtEUR((it.price||0) * (it.qty||1))}</strong></td>
        </tr>
      `).join("")}
    </tbody>
  </table>

  <div class="totals">
    <table>
      <tr><td>Zwischensumme</td><td class="num">${fmtEUR(itemsTotal)}</td></tr>
      <tr><td>Versand</td><td class="num">${fmtEUR(o.shipping||0)}</td></tr>
      ${o.refund ? '<tr><td>Erstattet</td><td class="num">-' + fmtEUR(o.refund.amount) + '</td></tr>' : ''}
      <tr><td>Netto</td><td class="num">${fmtEUR(net)}</td></tr>
      <tr><td>MwSt. ${settings.taxRate||19}%</td><td class="num">${fmtEUR(tax)}</td></tr>
      <tr class="grand"><td>Gesamt</td><td class="num">${fmtEUR(o.total)}</td></tr>
    </table>
  </div>

  <div class="verse">„I am the light of the world." — John 8:12</div>
  <div class="foot">
    Vielen Dank für deine Bestellung bei ${escapeHtml(settings.storeName||'Lightwear Collective')}.<br>
    Diese Rechnung ist maschinell erstellt und ohne Unterschrift gültig.
  </div>

  <script>setTimeout(() => window.print(), 400);<\/script>
</body>
</html>`);
    win.document.close();
    logActivity("orders", "Rechnung gedruckt: " + o.id);
  }

  function openCancelDialog(o, onDone){
    const m = modal({
      title: "Bestellung stornieren?",
      body: `
        <p style="margin:0 0 16px;color:var(--adm-ink-soft)">Bestellung <strong style="color:var(--adm-ink)">${escapeHtml(o.id)}</strong> über <strong style="color:var(--adm-ink)">${fmtEUR(o.total)}</strong> wird storniert. Der Kunde erhält eine Benachrichtigung.</p>
        <div class="adm-field">
          <label>Grund (optional)</label>
          <select id="cancel-reason" style="padding:9px 12px;border:1px solid var(--adm-line);border-radius:8px;font-family:inherit;font-size:.9rem">
            <option value="">— bitte wählen —</option>
            <option value="Kundenwunsch">Kundenwunsch</option>
            <option value="Nicht lieferbar">Artikel nicht lieferbar</option>
            <option value="Zahlung fehlgeschlagen">Zahlung fehlgeschlagen</option>
            <option value="Verdacht auf Betrug">Verdacht auf Betrug</option>
            <option value="Adresse fehlerhaft">Adresse fehlerhaft</option>
            <option value="Sonstiges">Sonstiges</option>
          </select>
        </div>
        <div class="adm-field" style="margin-top:10px">
          <label>Notiz (optional)</label>
          <textarea id="cancel-note" rows="2" placeholder="Interne Notiz…"></textarea>
        </div>
      `,
      footer: `<button class="adm-btn" data-cancel>Abbrechen</button><button class="adm-btn danger" data-ok>Bestellung stornieren</button>`
    });
    m.el.querySelector("[data-cancel]").addEventListener("click", m.close);
    m.el.querySelector("[data-ok]").addEventListener("click", () => {
      const reason = m.el.querySelector("#cancel-reason").value;
      const note = m.el.querySelector("#cancel-note").value;
      updateOrder(o.id, {
        status: "cancelled",
        cancelled: { date: new Date().toISOString(), reason, note }
      });
      logActivity("cancellations", "Bestellung storniert: " + o.id, reason || "ohne Grund");
      toast("✓ Bestellung " + o.id + " storniert", "success");
      m.close();
      onDone && onDone();
    });
  }

  function openRefundDialog(o, onDone){
    const maxAmount = Number(o.total) || 0;
    const m = modal({
      title: "Bestellung rückerstatten",
      body: `
        <div style="background:#e6f3e9;border:1px solid #98c89f;border-radius:8px;padding:14px 16px;margin-bottom:18px;display:flex;align-items:center;gap:12px">
          <svg viewBox="0 0 24 24" fill="none" stroke="#2f7a3e" stroke-width="1.8" width="22" height="22"><path d="m5 12 5 5L20 7"/></svg>
          <div style="flex:1;font-size:.88rem">
            <strong style="color:#2f7a3e">Bereit zur Erstattung</strong><br>
            <span style="color:#356b3e">Maximalbetrag: ${fmtEUR(maxAmount)} · Bestellung ${escapeHtml(o.id)}</span>
          </div>
        </div>
        <div class="adm-form">
          <div class="adm-field">
            <label>Betrag (€)</label>
            <input type="number" id="refund-amount" value="${maxAmount.toFixed(2)}" min="0.01" max="${maxAmount}" step="0.01">
            <div class="adm-field-hint">Du kannst auch einen Teilbetrag zurückerstatten.</div>
          </div>
          <div class="adm-field">
            <label>Grund</label>
            <select id="refund-reason">
              <option value="">— bitte wählen —</option>
              <option value="Rücksendung">Rücksendung erhalten</option>
              <option value="Falsche Größe">Falsche Größe</option>
              <option value="Beschädigt">Artikel beschädigt</option>
              <option value="Nicht wie beschrieben">Nicht wie beschrieben</option>
              <option value="Kulanz">Kulanz</option>
              <option value="Sonstiges">Sonstiges</option>
            </select>
          </div>
          <div class="adm-field">
            <label>Methode</label>
            <select id="refund-method">
              <option value="original">Ursprüngliche Zahlungsmethode</option>
              <option value="giftcard">Gutschein/Geschenkkarte ausstellen</option>
              <option value="manual">Manuell (bereits überwiesen)</option>
            </select>
          </div>
          <div class="adm-field">
            <label>Interne Notiz (optional)</label>
            <textarea id="refund-note" rows="2"></textarea>
          </div>
          <label class="adm-switch">
            <input type="checkbox" id="refund-notify" checked>
            <span class="adm-switch-knob"></span>
            <div><strong>Kunde per E-Mail benachrichtigen</strong></div>
          </label>
        </div>
      `,
      footer: `<button class="adm-btn" data-cancel>Abbrechen</button><button class="adm-btn success" data-ok>Erstattung durchführen</button>`
    });
    m.el.querySelector("[data-cancel]").addEventListener("click", m.close);
    m.el.querySelector("[data-ok]").addEventListener("click", () => {
      const amount = parseFloat(m.el.querySelector("#refund-amount").value) || 0;
      const reason = m.el.querySelector("#refund-reason").value;
      const method = m.el.querySelector("#refund-method").value;
      const note = m.el.querySelector("#refund-note").value;
      const notify = m.el.querySelector("#refund-notify").checked;

      if(amount <= 0 || amount > maxAmount){
        toast("Ungültiger Betrag", "error");
        return;
      }

      // Wenn Gutschein gewählt: Geschenkkarte ausstellen
      if(method === "giftcard"){
        const cards = load(K.giftcards, {});
        const code = "REFUND-" + uid().toUpperCase();
        cards[code] = { amount, used: 0, created: new Date().toISOString(), source: "refund:" + o.id };
        save(K.giftcards, cards);
        toast("✓ Gutschein " + code + " ausgestellt", "success");
      }

      const isFullRefund = Math.abs(amount - maxAmount) < 0.01;
      updateOrder(o.id, {
        status: isFullRefund ? "refunded" : (o.status || "delivered"),
        refund: {
          amount, reason, method, note, notify,
          date: new Date().toISOString(),
          partial: !isFullRefund
        }
      });

      logActivity("refunds", fmtEUR(amount) + " erstattet · " + o.id, (reason || "") + " · " + method);
      toast("✓ " + fmtEUR(amount) + " erstattet" + (isFullRefund ? " (vollständig)" : " (teilweise)"), "success");
      m.close();
      onDone && onDone();
    });
  }

  // ============ INIT ============
  document.addEventListener("DOMContentLoaded", initLogin);

})();
