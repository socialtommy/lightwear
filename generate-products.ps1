# Generates assets/products-data.js from product-images.json + product-descriptions.json
$root = "C:\Users\bertk\lightwear-redesign"
$imgs = Get-Content -Raw -Encoding UTF8 (Join-Path $root "product-images.json") | ConvertFrom-Json
$descs = Get-Content -Raw -Encoding UTF8 (Join-Path $root "product-descriptions.json") | ConvertFrom-Json

# Metadata for each product (keep names, prices, categories, meta-lines)
$meta = @{
  "jesus-polo"            = @{ name="JESUS — Contrast Stripes Polo"; price=20; category="T-Shirts"; meta="Oversized · 100% Polyester" }
  "i-see-god"             = @{ name="I SEE GOD — Boxy T-Shirt"; price=20; category="T-Shirts"; meta="Loose Crop Fit · 85% Baumwolle" }
  "faith-sweatpants"      = @{ name="FAITH — Plaid Barrel Sweatpants"; price=30; category="Hosen"; meta="Loose Fit · 75% Baumwolle" }
  "the-answer"            = @{ name="THE ANSWER — Boxy Half-Sleeve Raw-Edge T-Shirt"; price=20; category="T-Shirts"; meta="Loose Fit · Schwere Baumwolle" }
  "faith-makes-new"       = @{ name="FAITH MAKES NEW — Boxy T-Shirt"; price=20; category="T-Shirts"; meta="Locker · 100% Baumwolle" }
  "christ-is-enough"      = @{ name="CHRIST IS ENOUGH — Oversized Boxy Shirt"; price=20; category="T-Shirts"; meta="Loose Crop · Lapel Collar" }
  "trust-in-god"          = @{ name="TRUST IN GOD — Vintage Bodycon T-Shirt"; price=20; category="T-Shirts"; meta="Bodycon · 96% Baumwolle" }
  "contrast-plaid-zip"    = @{ name="Contrast Plaid Boxy Zip Hoodie"; price=35; category="Hoodies"; meta="Oversized Crop · Zip Hood" }
  "god-is-good"           = @{ name="GOD IS GOOD — Stripes Bodycon T-Shirt"; price=17; category="T-Shirts"; meta="Bodycon · Raglan-Sleeves" }
  "be-the-reason"         = @{ name="BE THE REASON — Sun Fade Jacket"; price=45; category="Jacken"; meta="Oversized · Washed Look" }
  "sola-gratia-bodycon"   = @{ name="SOLA GRATIA — Stripes Bodycon T-Shirt"; price=17; category="T-Shirts"; meta="Bodycon · Raglan-Sleeves" }
  "eagle-wings"           = @{ name="EAGLE WINGS — Curved Hoodie"; price=35; category="Hoodies"; meta="Oversized Crop · Raglan · Zip" }
  "sola-gratia-sweat"     = @{ name="SOLA GRATIA — Contrast Striped Sweatshirt"; price=28; category="Hoodies"; meta="Loose · Lapel Collar · 380gsm" }
  "sola-gratia-longsleeve"= @{ name="SOLA GRATIA — Raglan Bodycon Longsleeve"; price=20; category="T-Shirts"; meta="Bodycon · Raglan-Longsleeve" }
  "acts-16-3"             = @{ name="ACTS 16:3 — Layered Sleeve Cotton T-Shirt"; price=25; category="T-Shirts"; meta="Loose · Layered Sleeves" }
  "he-is-love"            = @{ name="HE IS LOVE — Oversized Boxy Shirt"; price=19; category="T-Shirts"; meta="Loose Crop · Lapel Collar" }
  "jesus-taped-mesh"      = @{ name="JESUS — Taped Mesh Boxy T-Shirt"; price=25; category="T-Shirts"; meta="Regular Fit · V-Neck · Mesh" }
  "trust-god-loose"       = @{ name="TRUST GOD — Classic Loose Tee"; price=18; category="T-Shirts"; meta="Loose · Half Sleeve · 230gsm" }
  "heart-cross"           = @{ name="HEART + CROSS — Contrast-Stitched T-Shirt"; price=20; category="T-Shirts"; meta="Loose · Patchwork-Style" }
  "jesus-tank"            = @{ name="JESUS — Snow Washed Tank Top"; price=20; category="T-Shirts"; meta="Bodycon · Ärmellos · Cropped" }
  "saved-by-grace"        = @{ name="SAVED BY GRACE — Fleece Zip Hoodie"; price=40; category="Hoodies"; meta="Bodycon · Cropped · Kapuze" }
  "jesus-crop"            = @{ name="JESUS — Men's Bodycon Crop Top"; price=19; category="T-Shirts"; meta="Bodycon · Cropped · 97% Baumwolle" }
  "power-of-jesus"        = @{ name="POWER OF JESUS — Zip-Through Fleece Hoodie"; price=45; category="Hoodies"; meta="Loose · Zip-Through · 355gsm" }
}

# Short tagline / intro per product (vor den technischen Daten)
$intro = @{
  "jesus-polo"            = "Boxy geschnittenes Polo-Shirt mit Kontraststreifen am Kragen und dezentem „JESUS""-Print. Modern, sportlich, statement-stark."
  "i-see-god"             = "Oversized T-Shirt mit „I SEE GOD EVERYWHERE""-Print und Augen-Motiv (Psalm 139). Schwere Baumwolle, lockerer moderner Schnitt."
  "faith-sweatpants"      = "Weit geschnittene Barrel-Sweatpants aus weichem French Terry mit „Faith""-Stickerei und Patchwork-Details."
  "the-answer"            = "Boxy T-Shirt mit halben Ärmeln und Raw-Edge-Verarbeitung. „THE ANSWER"" – Jesus ist die Antwort."
  "faith-makes-new"       = "Essential Boxy T-Shirt mit „FAITH MAKES NEW""-Print. Pure Baumwolle, lockerer Fit für jeden Tag."
  "christ-is-enough"      = "Leichtes Oversized Boxy Shirt mit Lapel Collar und „CHRIST IS ENOUGH""-Botschaft."
  "trust-in-god"          = "Vintage-Washed Bodycon T-Shirt mit körpernahem Fit und „TRUST IN GOD""-Print."
  "contrast-plaid-zip"    = "Boxy Zip-Hoodie mit Kontrast-Plaid-Details. Crop-Length, schwerer Stoff, Streetwear-Statement."
  "god-is-good"           = "Bodycon T-Shirt mit Kontraststreifen, Raglanärmeln und „GOD IS GOOD""-Botschaft."
  "be-the-reason"         = "Boxy Sun-Fade Jacke mit abnehmbarer Fellkapuze. „BE THE REASON"" – Statement-Piece für drüber."
  "sola-gratia-bodycon"   = "Bodycon T-Shirt mit Kontraststreifen und „SOLA GRATIA"" – allein durch Gnade."
  "eagle-wings"           = "Oversized Hoodie mit gebogenen Panels und „EAGLE WINGS""-Print (Jesaja 40:31)."
  "sola-gratia-sweat"     = "Schweres Sweatshirt mit Lapel Collar und Kontraststreifen – „SOLA GRATIA""."
  "sola-gratia-longsleeve"= "Raglan Bodycon Longsleeve mit modernem Schnitt – als Layering-Essential oder solo."
  "acts-16-3"             = "Cotton T-Shirt mit Layered Contrast Sleeves – inspiriert von Apostelgeschichte 16:3."
  "he-is-love"            = "Superleichtes Oversized Boxy Shirt mit Lapel Collar und „HE IS LOVE""-Botschaft."
  "jesus-taped-mesh"      = "Atmungsaktives Mesh-Shirt mit Taped-Details und „JESUS""-Print – moderner Sport-Look."
  "trust-god-loose"       = "Klassisches Loose Tee mit Half Sleeve und „TRUST GOD""-Print. Komfort + Statement."
  "heart-cross"           = "Streetwear T-Shirt mit Kontrastnähten und Herz-und-Kreuz-Print im Patchwork-Stil."
  "jesus-tank"            = "Tank Top mit Snow-Wash-Finish und „JESUS""-Print – ärmellos für heiße Tage."
  "saved-by-grace"        = "Schwerer Bodycon Fleece Zip Hoodie mit „SAVED BY GRACE""-Stickerei. Warm und stylisch."
  "jesus-crop"            = "Ribbed Bodycon Crop Top für Herren – moderner Streetwear-Look mit „JESUS""-Statement."
  "power-of-jesus"        = "Schwerer Zip-Through Fleece Hoodie mit „POWER OF JESUS""-Print. Vintage Washed Look."
}

# Parse Squarespace description into structured fields
function Parse-Specs($text){
  if(-not $text){ return @() }
  $t = $text -replace '\s+', ' '
  $patterns = @(
    'Material:\s*([^:]+?)(?=\s+(?:Stoffgewicht|Gewicht|Passform|Schnitt|Stoffst|Stoffd|Fit|Stretch|Pflege|Saison|Stil|Design|Ausschnitt|Ärmel|Kragen|Länge):|$)',
    'Stoffgewicht:\s*([^:]+?)(?=\s+(?:Passform|Schnitt|Stoffst|Stoffd|Fit|Stretch|Pflege|Saison|Stil|Design|Ausschnitt|Ärmel|Kragen|Länge):|$)',
    'Gewicht:\s*([^:]+?)(?=\s+(?:Passform|Schnitt|Stoffst|Stoffd|Fit|Stretch|Pflege|Saison|Stil|Design|Ausschnitt|Ärmel|Kragen|Länge):|$)',
    'Passform:\s*([^:]+?)(?=\s+(?:Stoffgewicht|Stoffst|Stoffd|Fit|Stretch|Pflege|Saison|Stil|Design|Ausschnitt|Ärmel|Kragen|Länge):|$)',
    'Fit:\s*([^:]+?)(?=\s+(?:Material|Stoffgewicht|Stoffst|Stoffd|Stretch|Pflege|Saison|Stil|Design|Ausschnitt|Ärmel|Kragen|Länge):|$)',
    'Schnitt:\s*([^:]+?)(?=\s+(?:Material|Stoffgewicht|Passform|Stoffst|Stoffd|Stretch|Pflege|Saison|Stil|Design|Ausschnitt|Ärmel|Kragen|Länge):|$)',
    'Design:\s*([^:]+?)(?=\s+(?:Material|Stoffgewicht|Passform|Stoffst|Stoffd|Stretch|Pflege|Saison|Stil|Schnitt|Ausschnitt|Ärmel|Kragen|Länge):|$)',
    'Stil:\s*([^:]+?)(?=\s+(?:Material|Stoffgewicht|Passform|Stoffst|Stoffd|Stretch|Pflege|Saison|Design|Schnitt|Ausschnitt|Ärmel|Kragen|Länge):|$)',
    'Ausschnitt:\s*([^:]+?)(?=\s+(?:Material|Stoffgewicht|Passform|Stoffst|Stoffd|Stretch|Pflege|Saison|Design|Schnitt|Stil|Ärmel|Kragen|Länge):|$)',
    'Saison:\s*([^:]+?)(?=\s+(?:Material|Stoffgewicht|Passform|Stoffst|Stoffd|Stretch|Pflege|Design|Schnitt|Stil|Ausschnitt|Ärmel|Kragen|Länge):|$)'
  )
  $labels = @('Material','Stoffgewicht','Gewicht','Passform','Fit','Schnitt','Design','Stil','Ausschnitt','Saison')
  $result = @()
  for($i=0; $i -lt $patterns.Length; $i++){
    $m = [regex]::Match($t, $patterns[$i])
    if($m.Success){
      $val = ($m.Groups[1].Value -replace '\s+', ' ').Trim()
      $val = $val -replace '&amp;', '&' -replace '&sup2;', '²' -replace 'sup2;', '²'
      $result += @{ label=$labels[$i]; value=$val }
    }
  }
  return $result
}

# Helper: JS string escape
function Escape-JS($s){
  if($null -eq $s){ return '' }
  return ($s -replace '\\','\\\\') -replace '"','\"' -replace '\r?\n','\n'
}

$lines = @()
$lines += "/* Auto-generiert – komplettes Produkt-Daten-Set inkl. Galerien & Beschreibungen */"
$lines += "window.LW_PRODUCTS = ["

$keys = @("jesus-polo","i-see-god","faith-sweatpants","the-answer","faith-makes-new","christ-is-enough","trust-in-god","contrast-plaid-zip","god-is-good","be-the-reason","sola-gratia-bodycon","eagle-wings","sola-gratia-sweat","sola-gratia-longsleeve","acts-16-3","he-is-love","jesus-taped-mesh","trust-god-loose","heart-cross","jesus-tank","saved-by-grace","jesus-crop","power-of-jesus")

foreach($id in $keys){
  $m = $meta[$id]
  $gal = $imgs.$id
  if(-not $gal){ $gal = @() }
  $primary = $gal[0]
  $secondary = if($gal.Count -gt 1){ $gal[1] } else { $gal[0] }
  $specs = Parse-Specs $descs.$id

  $lines += "  {"
  $lines += "    id: `"$id`","
  $lines += "    name: `"$(Escape-JS $m.name)`","
  $lines += "    price: $($m.price),"
  $lines += "    category: `"$($m.category)`","
  $lines += "    meta: `"$(Escape-JS $m.meta)`","
  $lines += "    img:     `"$primary`","
  $lines += "    imgBack: `"$secondary`","
  $lines += "    intro: `"$(Escape-JS $intro[$id])`","
  $lines += "    specs: ["
  foreach($s in $specs){
    $lines += "      { label: `"$($s.label)`", value: `"$(Escape-JS $s.value)`" },"
  }
  $lines += "    ],"
  $lines += "    gallery: ["
  foreach($g in $gal){
    $lines += "      `"$g`","
  }
  $lines += "    ]"
  $lines += "  },"
}
$lines += "];"

$lines -join "`n" | Out-File (Join-Path $root "assets\products-data.js") -Encoding UTF8 -NoNewline
"Generated: $((Join-Path $root 'assets\products-data.js'))"
"Lines: $($lines.Count)"
"Total products: $($keys.Count)"
