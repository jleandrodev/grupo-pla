#!/bin/bash
# extract-pdf-folds.sh
# Converte PDFs de design em PNGs recortados por dobra (viewport).
#
# Uso: ./scripts/extract-pdf-folds.sh
#
# Entrada:  /home/john/Downloads/Clientes/PLA/*.pdf
# Saída:    references/screenshots/[pasta]/fold-NN.png + full-page.png

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PDF_SOURCE="/home/john/Downloads/Clientes/PLA"
SCREENSHOTS_DIR="$PROJECT_ROOT/references/screenshots"

# Viewport de referência (largura em pixels do layout desktop)
VIEWPORT_WIDTH=1280
VIEWPORT_HEIGHT=800

# DPI para renderizar PDFs (150 = boa qualidade, 300 = alta)
DPI=150

# Mapa: nome do PDF → pasta de destino
declare -A PDF_MAP=(
  ["HOME — Grupo PLA desktop"]="01-home"
  ["Categoria — Grupo PLA desktop"]="02-categoria"
  ["Detalhe — Grupo PLA desktop"]="03-detalhe-peca"
  ["Detalhe Filtro de modelo — Grupo PLA desktop"]="04-detalhe-filtro-modelo"
  ["Detalhe Venda de Maquinário — Grupo PLA desktop"]="05-detalhe-venda-maquinario"
  ["Detalhe Popup Financiamento — Grupo PLA desktop"]="06-detalhe-popup-financiamento"
  ["Locação grid — Grupo PLA desktop"]="07-locacao-grid"
  ["Locação lista— Grupo PLA desktop"]="08-locacao-lista"
  ["Contato — Grupo PLA desktop"]="09-contato"
  ["Institucional — Grupo PLA desktop"]="10-institucional"
  ["Sobre nós — Grupo PLA desktop"]="11-sobre-nos"
)

echo ""
echo "=========================================="
echo " PDF → Fold Screenshots Extractor"
echo "=========================================="
echo " Source: $PDF_SOURCE"
echo " Output: $SCREENSHOTS_DIR"
echo " DPI: $DPI"
echo " Viewport: ${VIEWPORT_WIDTH}x${VIEWPORT_HEIGHT}"
echo ""

TOTAL=0
ERRORS=0

for pdf_name in "${!PDF_MAP[@]}"; do
  folder="${PDF_MAP[$pdf_name]}"
  pdf_file="$PDF_SOURCE/${pdf_name}.pdf"
  output_dir="$SCREENSHOTS_DIR/$folder"

  if [[ ! -f "$pdf_file" ]]; then
    echo "⚠  SKIP: $pdf_file não encontrado"
    ((ERRORS++)) || true
    continue
  fi

  mkdir -p "$output_dir"

  echo "📄 Processing: $pdf_name"
  echo "   → $folder/"

  # Passo 1: Converter PDF → PNG full page
  full_png="$output_dir/full-page"
  pdftoppm -png -r "$DPI" -singlefile "$pdf_file" "$full_png"

  if [[ ! -f "${full_png}.png" ]]; then
    echo "   ❌ Erro ao converter PDF"
    ((ERRORS++)) || true
    continue
  fi

  # Obter dimensões da imagem full
  IMG_INFO=$(python3 -c "
from struct import unpack
import sys

with open('${full_png}.png', 'rb') as f:
    f.read(16)
    w, h = unpack('>II', f.read(8))
    print(f'{w} {h}')
")

  IMG_W=$(echo "$IMG_INFO" | cut -d' ' -f1)
  IMG_H=$(echo "$IMG_INFO" | cut -d' ' -f2)

  echo "   Image: ${IMG_W}x${IMG_H}px"

  # Calcular altura de cada fold proporcionalmente
  # A imagem tem largura IMG_W; a viewport tem VIEWPORT_WIDTH
  # A altura de cada fold em pixels da imagem = (IMG_W / VIEWPORT_WIDTH) * VIEWPORT_HEIGHT
  SCALE=$(python3 -c "print($IMG_W / $VIEWPORT_WIDTH)")
  FOLD_H_PX=$(python3 -c "print(int($SCALE * $VIEWPORT_HEIGHT))")
  FOLD_COUNT=$(python3 -c "import math; print(math.ceil($IMG_H / $FOLD_H_PX))")

  echo "   Scale: ${SCALE}x | Fold height: ${FOLD_H_PX}px | Folds: $FOLD_COUNT"

  # Passo 2: Recortar em dobras usando Python (PIL)
  python3 -c "
from PIL import Image
import os

img = Image.open('${full_png}.png')
w, h = img.size
fold_h = $FOLD_H_PX
fold_count = $FOLD_COUNT
output_dir = '$output_dir'

for i in range(fold_count):
    y_start = i * fold_h
    y_end = min((i + 1) * fold_h, h)
    fold = img.crop((0, y_start, w, y_end))
    num = str(i + 1).zfill(2)
    fold.save(os.path.join(output_dir, f'fold-{num}.png'), 'PNG', optimize=True)

print(f'   ✅ {fold_count} folds saved')
" 2>&1 || {
    # Fallback se PIL não disponível: usar pdftoppm direto (sem recorte)
    echo "   ⚠ PIL não disponível — salvando apenas full-page.png"
  }

  ((TOTAL++)) || true
  echo ""
done

# Gerar metadata.json com mapa completo
python3 -c "
import json, os, glob

screenshots_dir = '$SCREENSHOTS_DIR'
metadata = {}

for folder in sorted(os.listdir(screenshots_dir)):
    folder_path = os.path.join(screenshots_dir, folder)
    if not os.path.isdir(folder_path) or folder.startswith('.'):
        continue

    pngs = sorted(glob.glob(os.path.join(folder_path, 'fold-*.png')))
    full = os.path.join(folder_path, 'full-page.png')

    metadata[folder] = {
        'folds': len(pngs),
        'fold_files': [os.path.basename(p) for p in pngs],
        'has_full_page': os.path.exists(full),
    }

with open(os.path.join(screenshots_dir, '_metadata.json'), 'w') as f:
    json.dump(metadata, f, indent=2, ensure_ascii=False)
    print('📋 _metadata.json generated')
"

echo "=========================================="
echo " Done: $TOTAL pages processed, $ERRORS errors"
echo "=========================================="
