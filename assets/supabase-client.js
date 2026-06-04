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

})();
