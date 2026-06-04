$root = "C:\Users\bertk\lightwear-redesign"
$imgs = Get-Content -Raw -Encoding UTF8 (Join-Path $root "product-images.json") | ConvertFrom-Json
$descs = Get-Content -Raw -Encoding UTF8 (Join-Path $root "product-descriptions.json") | ConvertFrom-Json

# Order in which products should appear
$keys = @(
  "jesus-polo","i-see-god","faith-sweatpants",
  "the-answer","faith-makes-new","christ-is-enough","trust-in-god",
  "contrast-plaid-zip","god-is-good","be-the-reason",
  "sola-gratia-bodycon","eagle-wings","sola-gratia-sweat","sola-gratia-longsleeve",
  "acts-16-3","he-is-love","jesus-taped-mesh","trust-god-loose",
  "heart-cross","jesus-tank","saved-by-grace","jesus-crop","power-of-jesus"
)

# Extract labelled spec pairs from the raw description text
$labelList = @("Material","Stoffgewicht","Gewicht","Passform","Fit","Schnitt","Design","Stil","Ausschnitt","Kragen","Aermel","Aerme","Saison","Stretch","Laenge","Stoffstaerke","Stoffstärke","Stoffdicke","Pflegehinweise")
function Get-Specs($text){
  if(-not $text){ return @() }
  $t = ($text -replace '\s+', ' ').Trim()
  # Replace common HTML entities
  $t = $t -replace '&amp;', '&' -replace '&sup2;', '_SUP2_' -replace 'sup2;', '_SUP2_'
  # Find each label and capture text up to next label
  $labels = @("Material","Stoffgewicht","Gewicht","Passform","Fit","Schnitt","Design","Stil","Ausschnitt","Kragen","Ärmel","Saison","Stretch","Länge","Stoffstärke","Stoffdicke","Pflegehinweise","Farbe","Taschen","Mid Waist")
  $found = @()
  for($i=0; $i -lt $labels.Length; $i++){
    $label = $labels[$i]
    $escLabel = [regex]::Escape($label)
    # other labels for lookahead
    $others = ($labels | Where-Object { $_ -ne $label } | ForEach-Object { [regex]::Escape($_) }) -join '|'
    $pattern = "$escLabel\s*:\s*(.+?)(?=\s+(?:$others)\s*:|$)"
    $m = [regex]::Match($t, $pattern)
    if($m.Success){
      $val = $m.Groups[1].Value.Trim()
      $val = $val -replace '\s+', ' '
      $val = $val -replace '_SUP2_', "$([char]0x00B2)"
      # Limit length
      if($val.Length -gt 120){ $val = $val.Substring(0, 117) + "..." }
      if($val.Length -gt 0){
        $found += [pscustomobject]@{ label = $label; value = $val; pos = $m.Index }
      }
    }
  }
  $found = $found | Sort-Object pos
  return $found
}

function JsEsc($s){
  if($null -eq $s){ return '' }
  $s = $s -replace '\\','\\\\'
  $s = $s -replace '"','\"'
  $s = $s -replace "`r`n",'\n'
  $s = $s -replace "`n",'\n'
  return $s
}

$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine("/* Auto-generated specs + galleries from lightwear.net */")
[void]$sb.AppendLine("window.LW_DATA = {")
foreach($id in $keys){
  $gal = @($imgs.$id)
  $specs = Get-Specs $descs.$id
  [void]$sb.AppendLine("  `"$id`": {")
  # specs
  [void]$sb.AppendLine("    specs: [")
  foreach($s in $specs){
    [void]$sb.AppendLine("      { label: `"$(JsEsc $s.label)`", value: `"$(JsEsc $s.value)`" },")
  }
  [void]$sb.AppendLine("    ],")
  # gallery
  [void]$sb.AppendLine("    gallery: [")
  foreach($u in $gal){
    [void]$sb.AppendLine("      `"$u`",")
  }
  [void]$sb.AppendLine("    ]")
  [void]$sb.AppendLine("  },")
}
[void]$sb.AppendLine("};")

$out = Join-Path $root "assets\products-data.js"
[System.IO.File]::WriteAllText($out, $sb.ToString(), (New-Object System.Text.UTF8Encoding $false))
"Written: $out"
"Total products: $($keys.Count)"
