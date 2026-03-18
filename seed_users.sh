#!/bin/bash

# =============================================================
# 1. VARIABLES GLOBALES
#    Definimos la URL base y el endpoint una sola vez.
#    Si cambia el puerto o la ruta, solo tocas estos dos valores.
# =============================================================
BASE_URL="http://localhost:3000"
ENDPOINT="/users"

# =============================================================
# 2. DATOS
#    Un array de strings donde cada elemento es un JSON válido
#    que respeta el DTO:
#      - username  → @IsString()
#      - password  → @IsString() + @MinLength(8)
# =============================================================
USERS=(
  '{"username": "alice123",    "password": "securePass1"}'
  '{"username": "bob_smith",   "password": "myPassword2"}'
  '{"username": "carol99",     "password": "carolPass3"}'
  '{"username": "david_doe",   "password": "davidPass4"}'
  '{"username": "emma_wilson", "password": "emmaPass55"}'
  '{"username": "frank_m",     "password": "frankPass6"}'
  '{"username": "grace_lee",   "password": "gracePass77"}'
  '{"username": "henry_j",     "password": "henryPass8"}'
  '{"username": "isabella_m",  "password": "isabelPass9"}'
  '{"username": "jack_taylor", "password": "jackPass010"}'
)

echo "=== Creando ${#USERS[@]} usuarios en $BASE_URL$ENDPOINT ==="
echo ""

# =============================================================
# 3. LOOP
#    Iteramos con el índice para mostrar progreso.
#    "${!USERS[@]}" devuelve los índices del array (0, 1, 2...)
# =============================================================
for i in "${!USERS[@]}"; do
  INDEX=$((i + 1))          # índice legible (empieza en 1)
  BODY="${USERS[$i]}"       # JSON del usuario actual

  echo "[$INDEX/${#USERS[@]}] Enviando → $BODY"

  # ===========================================================
  # 4. CURL — el corazón del script
  #
  #   -s                        → silent: no muestra progreso
  #   -o /tmp/response_body.txt → guarda el body de la respuesta
  #   -w "%{http_code}"         → imprime solo el status code
  #   -X POST                   → método HTTP
  #   -H "Content-Type: ..."    → le dice a la API que mandamos JSON
  #   -d "$BODY"                → el JSON que enviamos
  # ===========================================================
  HTTP_STATUS=$(curl -s \
    -o /tmp/response_body.txt \
    -w "%{http_code}" \
    -X POST "$BASE_URL$ENDPOINT" \
    -H "Content-Type: application/json" \
    -d "$BODY")

  RESPONSE_BODY=$(cat /tmp/response_body.txt)

  # ===========================================================
  # 5. FEEDBACK
  #    Mostramos si fue exitoso (2xx) o falló (4xx / 5xx)
  # ===========================================================
  if [ "$HTTP_STATUS" -ge 200 ] && [ "$HTTP_STATUS" -lt 300 ]; then
    echo "  ✅ [$HTTP_STATUS] $RESPONSE_BODY"
  else
    echo "  ❌ [$HTTP_STATUS] $RESPONSE_BODY"
  fi

  echo ""
done

echo "=== Proceso finalizado ==="