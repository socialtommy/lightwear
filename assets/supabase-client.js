/* ==========================================================================
   SUPABASE CLIENT — Verbindung zur echten Datenbank
   Wird auf jeder Seite geladen, exposes window.lwSupabase
   ========================================================================== */
(function(){
  "use strict";

  const SUPABASE_URL = "https://qstzcdoypzfmideupuhv.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_34H7UDeolcmhdnEnewcQpA_UWsUyS0w";

  // Supabase-Client erstellen sobald die Library geladen ist
  function init(){
    if(typeof window.supabase === "undefined"){
      // Library noch nicht geladen — später nochmal versuchen
      setTimeout(init, 100);
      return;
    }
    try {
      const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
      window.lwSupabase = client;
      window.__lwSupabaseReady = true;
      // Event feuern damit andere Skripte wissen es ist bereit
      document.dispatchEvent(new CustomEvent("lw:supabase-ready", { detail: { client }}));
      console.log("✓ Supabase-Client bereit");
    } catch(e){
      console.error("Supabase-Init Fehler:", e);
    }
  }

  init();

  // Helper: Warten bis Client bereit ist
  window.lwWhenSupabaseReady = function(callback){
    if(window.__lwSupabaseReady && window.lwSupabase){
      callback(window.lwSupabase);
    } else {
      document.addEventListener("lw:supabase-ready", () => callback(window.lwSupabase), {once: true});
    }
  };

  // ============ NEWSLETTER ============
  window.lwSubscribeNewsletter = async function(email, source){
    return new Promise((resolve, reject) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          const { data, error } = await sb
            .from("newsletter_subscribers")
            .insert([{ email: email.toLowerCase().trim(), source: source || "website" }])
            .select();
          if(error){
            // Duplikat-Check (E-Mail bereits eingetragen)
            if(error.code === "23505"){
              resolve({ alreadySubscribed: true });
            } else {
              reject(error);
            }
          } else {
            resolve({ data });
          }
        } catch(e){
          reject(e);
        }
      });
    });
  };

  window.lwGetNewsletterSubscribers = async function(){
    return new Promise((resolve, reject) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          const { data, error } = await sb
            .from("newsletter_subscribers")
            .select("*")
            .order("subscribed_at", { ascending: false });
          if(error) reject(error);
          else resolve(data || []);
        } catch(e){
          reject(e);
        }
      });
    });
  };

  window.lwDeleteNewsletterSubscriber = async function(id){
    return new Promise((resolve, reject) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          const { error } = await sb.from("newsletter_subscribers").delete().eq("id", id);
          if(error) reject(error); else resolve(true);
        } catch(e){ reject(e); }
      });
    });
  };

  // ============ KONTAKT-NACHRICHTEN ============
  window.lwSendContactMessage = async function(payload){
    return new Promise((resolve, reject) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          const { data, error } = await sb
            .from("contact_messages")
            .insert([{
              name: payload.name || "",
              email: (payload.email || "").toLowerCase().trim(),
              topic: payload.topic || "Anfrage",
              message: payload.message || "",
              source: payload.source || "website"
            }])
            .select();
          if(error) reject(error); else resolve({ data });
        } catch(e){ reject(e); }
      });
    });
  };

  window.lwGetContactMessages = async function(){
    return new Promise((resolve, reject) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          const { data, error } = await sb
            .from("contact_messages")
            .select("*")
            .order("created_at", { ascending: false });
          if(error) reject(error); else resolve(data || []);
        } catch(e){ reject(e); }
      });
    });
  };

  window.lwMarkMessageRead = async function(id, read){
    return new Promise((resolve, reject) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          const { error } = await sb.from("contact_messages").update({ read: !!read }).eq("id", id);
          if(error) reject(error); else resolve(true);
        } catch(e){ reject(e); }
      });
    });
  };

  // ============ PRODUKTE (Phase D) ============
  window.lwGetProducts = async function(){
    return new Promise((resolve, reject) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          const { data, error } = await sb.from("products").select("*").order("created_at", { ascending: false });
          if(error) reject(error); else resolve(data || []);
        } catch(e){ reject(e); }
      });
    });
  };
  window.lwUpsertProduct = async function(product){
    return new Promise((resolve, reject) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          // Snake-Case Mapping
          const row = {
            id: product.id,
            name: product.name,
            price: product.price,
            compare_at: product.compareAt || product.compare_at || null,
            category: product.category,
            meta: product.meta || null,
            description: product.description || product.desc || null,
            img: product.img || null,
            image: product.image || product.img || null,
            gallery: product.gallery || null,
            sizes: product.sizes || null,
            stock: product.stock ?? 50,
            active: product.active !== false,
            limited_edition: !!product.limitedEdition,
            edition_size: product.editionSize || null,
            edition_sold: product.editionSold || 0,
            preorder: !!product.preorder,
            preorder_date: product.preorderDate || null,
            preorder_discount: product.preorderDiscount || 0,
            updated_at: new Date().toISOString()
          };
          const { data, error } = await sb.from("products").upsert(row).select();
          if(error) reject(error); else resolve(data);
        } catch(e){ reject(e); }
      });
    });
  };
  window.lwDeleteProduct = async function(id){
    return new Promise((resolve, reject) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          const { error } = await sb.from("products").delete().eq("id", id);
          if(error) reject(error); else resolve(true);
        } catch(e){ reject(e); }
      });
    });
  };
  // Migration: bestehende PRODUCTS einmalig in Supabase einseeden
  window.lwSeedProducts = async function(productsArray){
    return new Promise((resolve, reject) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          const rows = productsArray.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            compare_at: p.compareAt || null,
            category: p.category,
            meta: p.meta || null,
            description: p.desc || p.description || null,
            img: p.img || null,
            image: p.image || p.img || null,
            gallery: p.gallery || null,
            sizes: p.sizes || ["S","M","L","XL"],
            stock: p.stock ?? 50,
            active: p.active !== false
          }));
          const { data, error } = await sb.from("products").upsert(rows, { onConflict: "id" }).select();
          if(error) reject(error); else resolve(data);
        } catch(e){ reject(e); }
      });
    });
  };

  // ============ STORAGE: Produkt-Bilder hochladen ============
  window.lwUploadProductImage = async function(file, filename){
    return new Promise((resolve, reject) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          const ext = filename.split(".").pop() || "png";
          const path = `${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`;
          const { error } = await sb.storage.from("product-images").upload(path, file, { contentType: file.type });
          if(error){ reject(error); return; }
          const { data: { publicUrl } } = sb.storage.from("product-images").getPublicUrl(path);
          resolve(publicUrl);
        } catch(e){ reject(e); }
      });
    });
  };

  // ============ AUTH (Phase C) ============
  window.lwSignUp = async function(email, password, name){
    return new Promise((resolve, reject) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          const { data, error } = await sb.auth.signUp({
            email, password,
            options: { data: { name } }
          });
          if(error) reject(error); else resolve(data);
        } catch(e){ reject(e); }
      });
    });
  };
  window.lwSignIn = async function(email, password){
    return new Promise((resolve, reject) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          const { data, error } = await sb.auth.signInWithPassword({ email, password });
          if(error) reject(error); else resolve(data);
        } catch(e){ reject(e); }
      });
    });
  };
  window.lwSignOut = async function(){
    return new Promise((resolve, reject) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          const { error } = await sb.auth.signOut();
          if(error) reject(error); else resolve(true);
        } catch(e){ reject(e); }
      });
    });
  };
  window.lwGetCurrentUser = async function(){
    return new Promise((resolve) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          const { data } = await sb.auth.getUser();
          resolve(data?.user || null);
        } catch(e){ resolve(null); }
      });
    });
  };
  window.lwResetPassword = async function(email){
    return new Promise((resolve, reject) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          const { error } = await sb.auth.resetPasswordForEmail(email, {
            redirectTo: location.origin + "/konto.html"
          });
          if(error) reject(error); else resolve(true);
        } catch(e){ reject(e); }
      });
    });
  };
  window.lwOnAuthStateChange = function(callback){
    window.lwWhenSupabaseReady(sb => {
      sb.auth.onAuthStateChange((event, session) => callback(event, session));
    });
  };

  // ============ ORDERS (für später) ============
  window.lwCreateOrder = async function(order){
    return new Promise((resolve, reject) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          const user = (await sb.auth.getUser()).data?.user;
          const row = {
            order_num: order.orderNum || order.order_num,
            user_id: user?.id || null,
            customer_name: order.customer?.name || null,
            customer_email: order.customer?.email || null,
            customer_address: order.customer?.address || null,
            items: order.items || [],
            subtotal: order.subtotal || 0,
            shipping: order.shipping || order.ship || 0,
            discount: order.discount || 0,
            total: order.total || 0,
            coupon: order.coupon || null,
            status: order.status || "pending"
          };
          const { data, error } = await sb.from("orders").insert(row).select();
          if(error) reject(error); else resolve(data?.[0]);
        } catch(e){ reject(e); }
      });
    });
  };
  window.lwGetOrders = async function(){
    return new Promise((resolve, reject) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          const { data, error } = await sb.from("orders").select("*").order("created_at", { ascending: false });
          if(error) reject(error); else resolve(data || []);
        } catch(e){ reject(e); }
      });
    });
  };
  window.lwUpdateOrder = async function(id, patch){
    return new Promise((resolve, reject) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          const { error } = await sb.from("orders").update({ ...patch, updated_at: new Date().toISOString() }).eq("id", id);
          if(error) reject(error); else resolve(true);
        } catch(e){ reject(e); }
      });
    });
  };

  // ============ LIVE-CHAT REALTIME (Phase B) ============
  window.lwCreateConversation = async function(customer){
    return new Promise((resolve, reject) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          const { data, error } = await sb.from("live_chat_conversations").insert({
            customer_name: customer?.name || "Gast",
            customer_email: customer?.email || "",
            status: "active",
            unread_by_admin: 1
          }).select().single();
          if(error) reject(error); else resolve(data);
        } catch(e){ reject(e); }
      });
    });
  };
  window.lwSendChatMessage = async function(conversationId, from, text, operatorName){
    return new Promise((resolve, reject) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          const { data, error } = await sb.from("live_chat_messages").insert({
            conversation_id: conversationId,
            from_who: from,
            text: text,
            operator_name: operatorName || null
          }).select().single();
          if(error){ reject(error); return; }
          // Konversation updaten
          const updateField = from === "customer" ? "unread_by_admin" : (from === "operator" ? "unread_by_customer" : null);
          if(updateField){
            await sb.rpc("noop").catch(() => {}); // ignore
            const { data: conv } = await sb.from("live_chat_conversations").select(updateField).eq("id", conversationId).single();
            await sb.from("live_chat_conversations").update({
              [updateField]: (conv?.[updateField] || 0) + 1,
              last_activity: new Date().toISOString()
            }).eq("id", conversationId);
          }
          resolve(data);
        } catch(e){ reject(e); }
      });
    });
  };
  window.lwGetConversation = async function(conversationId){
    return new Promise((resolve, reject) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          const { data, error } = await sb.from("live_chat_conversations").select("*").eq("id", conversationId).single();
          if(error) reject(error); else resolve(data);
        } catch(e){ reject(e); }
      });
    });
  };
  window.lwGetConversationMessages = async function(conversationId){
    return new Promise((resolve, reject) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          const { data, error } = await sb.from("live_chat_messages")
            .select("*").eq("conversation_id", conversationId)
            .order("created_at", { ascending: true });
          if(error) reject(error); else resolve(data || []);
        } catch(e){ reject(e); }
      });
    });
  };
  window.lwGetAllConversations = async function(){
    return new Promise((resolve, reject) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          const { data, error } = await sb.from("live_chat_conversations")
            .select("*").order("last_activity", { ascending: false });
          if(error) reject(error); else resolve(data || []);
        } catch(e){ reject(e); }
      });
    });
  };
  window.lwUpdateConversation = async function(id, patch){
    return new Promise((resolve, reject) => {
      window.lwWhenSupabaseReady(async (sb) => {
        try {
          const { error } = await sb.from("live_chat_conversations").update(patch).eq("id", id);
          if(error) reject(error); else resolve(true);
        } catch(e){ reject(e); }
      });
    });
  };
  // Subscribe für Realtime-Updates (Messages in einer Conversation)
  window.lwSubscribeChat = function(conversationId, onNewMessage){
    let channel = null;
    window.lwWhenSupabaseReady(sb => {
      channel = sb.channel(`chat-${conversationId}`)
        .on("postgres_changes", {
          event: "INSERT", schema: "public", table: "live_chat_messages",
          filter: `conversation_id=eq.${conversationId}`
        }, payload => onNewMessage(payload.new))
        .subscribe();
    });
    return () => { if(channel) channel.unsubscribe(); };
  };
  // Subscribe für alle Conversation-Updates (Admin-Übersicht)
  window.lwSubscribeAllConversations = function(onChange){
    let chConv = null, chMsg = null;
    window.lwWhenSupabaseReady(sb => {
      chConv = sb.channel("all-conversations")
        .on("postgres_changes", { event: "*", schema: "public", table: "live_chat_conversations" }, () => onChange())
        .subscribe();
      chMsg = sb.channel("all-messages")
        .on("postgres_changes", { event: "*", schema: "public", table: "live_chat_messages" }, () => onChange())
        .subscribe();
    });
    return () => { if(chConv) chConv.unsubscribe(); if(chMsg) chMsg.unsubscribe(); };
  };

})();
