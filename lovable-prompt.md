# Lovable-Prompt — Lightwear Collective Shop

So benutzt du das:
1. Gehe auf https://lovable.dev und melde dich an.
2. Erstelle ein neues Projekt ("New Project").
3. Kopiere den gesamten Text unter der Linie und füge ihn als erste Nachricht ein.

---

Baue einen Onlineshop für die Marke **LIGHTWEAR COLLECTIVE** – christliche Streetwear ("Glaube zum Anziehen"). Leitvers: „I am the Light of the World – John 8:12". UI-Sprache: **Deutsch**, Produktnamen bleiben Englisch.

## Design-Sprache (wichtig: hell, ruhig, premium-minimalistisch – KEIN Orange, KEINE verspielten Effekte/Popups)
- Hintergrund: warmes Off-White `#FBFAF6`; abgesetzte Flächen in Creme `#F1ECE1` / `#E9E2D3`
- Text & Buttons: warmes Anthrazit `#1C1B18`; gedämpfter Text `#6A665C`; feine Linien `rgba(28,27,24,.14)`
- Akzent = monochrom (Anthrazit). Bitte keine kräftigen Farben.
- Fonts (Google Fonts): Headlines in **Anton** (Großbuchstaben), das Wort „Light"/Bibelverse als Akzent in **Cormorant Garamond** kursiv, Fließtext/UI in **Inter**.
- Ruhig: dezente Übergänge, sanfter Schatten beim Hover über Produktkarten. Keine Lauftexte, keine Einblende-Animationen beim Scrollen, keine Hover-Popups. Großzügige Weißräume, abgerundete Ecken (~18px).
- Voll responsiv inkl. mobilem Menü. Header sticky mit dezenter Blur-Leiste beim Scrollen.

## Logo & Bilder (echte URLs bitte direkt als <img> verwenden)
- Logo (schwarz, mit Kreuz, transparent): https://images.squarespace-cdn.com/content/v1/67bc73510e3f0138575b7519/564a8829-48e7-4d60-aca4-1832eecbcf60/LW_Logo.png?format=1500w
- Hero/Story „Design-Skizzen": https://images.squarespace-cdn.com/content/v1/67bc73510e3f0138575b7519/31ee20ee-acbe-4f90-860b-91b8192fc9b4/WhatsApp+Image+2026-01-20+at+18.18.26.jpg?format=2000w
- Lifestyle Bühne (JESUS-Trikot): https://images.squarespace-cdn.com/content/v1/67bc73510e3f0138575b7519/8aac81d9-00da-45fb-9d45-256967bbdb13/WhatsApp+Image+2026-04-23+at+19.54.42+%283%29.jpeg?format=1200w
- Lifestyle 2: https://images.squarespace-cdn.com/content/v1/67bc73510e3f0138575b7519/880c9842-b9c6-4f03-833d-dce013852dad/WhatsApp+Image+2026-04-23+at+19.54.41.jpeg?format=1200w
- Lifestyle 3: https://images.squarespace-cdn.com/content/v1/67bc73510e3f0138575b7519/5d5201f2-1140-4ab5-b842-5791b6cc96f4/WhatsApp+Image+2026-04-23+at+19.54.42+%281%29.jpeg?format=1200w
- Lifestyle 4: https://images.squarespace-cdn.com/content/v1/67bc73510e3f0138575b7519/098da5e9-1782-4b49-a9be-f715c96ee4c1/WhatsApp+Image+2026-04-23+at+19.54.42.jpeg?format=1200w

## Produkte (echte Daten – als zentrale Produktliste/Array anlegen)
1. **JESUS — Contrast Stripes Polo** · 20,00 € · Boxy Fit · 100% Bio-Baumwolle · Bild: https://images.squarespace-cdn.com/content/v1/67bc73510e3f0138575b7519/1767287029114-LBKR34U6UZQ9A68V1HEE/squarespace-upload-temp-2026-01-01-2732ead2-b95c-49d1-8ed3-b070be6b10133843332665831530689.png?format=1200w
2. **I SEE GOD — Boxy T-Shirt** · 20,00 € · Oversized · 100% Baumwolle · Bild: https://images.squarespace-cdn.com/content/v1/67bc73510e3f0138575b7519/1774386258025-OPB9KJQCDRSIWJ7KY9LO/squarespace-upload-temp-2026-03-24-56167ab0-692c-4be0-9c1f-360d5feafb116205979141210258324.png?format=1200w
3. **FAITH — Plaid Barrel Sweatpants** · 30,00 € · Relaxed Fit · French Terry · Bild: https://images.squarespace-cdn.com/content/v1/67bc73510e3f0138575b7519/1774553209665-KLZ7RXD0B91NZ9X1MTQM/squarespace-upload-temp-2026-03-26-891c3e12-b6fa-4891-8424-78fa808928ff4217303796171595924.png?format=1200w

Jedes Produkt hat Größen S/M/L/XL.

## Seiten (React Router, clientseitiger Warenkorb via Context)
1. **Startseite (/):** Sticky-Header (Logo + Nav: Shop, Lookbook, Über uns + Such-/Konto-/Warenkorb-Icon mit Anzahl). Ankündigungsleiste „Kostenloser Versand ab 50 € · Faire Produktion · 30 Tage Rückgabe". Hero zweispaltig: links Eyebrow „John 8:12", H1 „I am the **Light** of the World" (Light kursiv in Cormorant), Untertitel, Buttons „Kollektion entdecken" + „Unsere Story"; rechts das Bühnen-Lifestyle-Bild. Story-Bereich (Skizzen-Bild + Überschrift „Eine Botschaft, die man trägt" + Vers kursiv + Text). Bestseller-Bereich mit den 3 Produkten. Lookbook (3 Lifestyle-Bilder). Trust-Leiste (4 Punkte mit Icons: Kostenloser Versand, Faire Produktion, 30 Tage Rückgabe, Sicher bezahlen). Newsletter-Box. Footer (Logo, Spalten Shop/Hilfe/Über, Social-Icons, Vers „I am the light of the world. — John 8:12", © 2026 Lightwear Collective).
2. **Shop (/shop):** Überschrift, Produktraster mit allen Produkten als Karten (Bild, Name, kurzer Untertitel, Preis), Klick führt zur Produktseite. Optional simple Kategorie-Tabs (Alle / T-Shirts / Hosen).
3. **Produktdetail (/produkt/:id):** großes Produktbild links, rechts Name, Preis, Beschreibung, Größenauswahl (S/M/L/XL als Buttons), „In den Warenkorb"-Button (legt ins Warenkorb-Context), darunter „Das könnte dir auch gefallen" mit den anderen Produkten.
4. **Warenkorb (/warenkorb):** Liste der Artikel (Bild, Name, Größe, Menge ändern, Einzelpreis, entfernen), Zwischensumme, Versandhinweis, „Zur Kasse"-Button. Hinweis: reine Demo, kein echter Bezahlvorgang. Wenn leer: freundlicher Leerzustand mit Button „Weiter shoppen".

Das Warenkorb-Icon im Header zeigt überall die aktuelle Anzahl. Achte auf sauberes, konsistentes Design über alle Seiten und gute Mobilansicht.
