# Google Reviews Integration

Este proyecto incluye una integración completa con Google Places API para mostrar reseñas reales de la clínica dental.

## Configuración Requerida

### 1. Obtener Google Place IDs

Para que el sistema funcione, necesitas obtener los `place_id` de tus clínicas en Google Maps:

#### Método 1: Google Place ID Finder

1. Ve a [Google Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id#find-id)
2. Busca tu clínica por dirección o nombre
3. Copia el `place_id` que aparece

#### Método 2: Google Maps (manual)

1. Ve a Google Maps
2. Busca tu clínica
3. Haz clic derecho en el marcador
4. Selecciona "¿Qué hay aquí?"
5. En la información que aparece, busca el `place_id`

#### Método 3: API Request

```bash
curl "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Clínica%20Dental%20Sada%20Borrás%20Pamplona&inputtype=textquery&fields=place_id&key=TU_API_KEY"
```

### 2. Configurar Secrets en GitHub

Ve a tu repositorio → Settings → Secrets and variables → Actions y añade:

#### `GOOGLE_MAPS_API_KEY`

- Clave de API de Google Maps con acceso a Places API
- Restringe la clave a solo Places API para seguridad

#### `GOOGLE_PLACE_IDS`

- Lista de place_ids separados por comas
- Ejemplo: `ChIJN1t_tDeuEmsRUsoyG83frY4,ChIJd8BlQ2BZwokRAFUEcm_qrcA`

## Estructura de Datos

El sistema genera automáticamente `content/reviews/google.json` con esta estructura:

```json
{
  "last_updated": "2024-12-19T12:00:00.000Z",
  "places": [
    {
      "place_id": "ChIJN1t_tDeuEmsRUsoyG83frY4",
      "name": "Clínica Dental Sada Borrás",
      "rating": 4.6,
      "userRatingCount": 14,
      "googleMapsUri": "https://maps.google.com/...",
      "writeReviewUri": "https://search.google.com/local/writereview?placeid=...",
      "reviews": [
        {
          "id": "review_id_or_empty",
          "rating": 5,
          "text": "Excelente atención...",
          "time": "2024-12-15",
          "author": "María González",
          "author_uri": "https://maps.google.com/...",
          "deep_link": "https://www.google.com/maps/place/?q=place_id:...&reviewId=..."
        }
      ]
    }
  ]
}
```

## Automatización

### GitHub Actions

- **Actualización diaria**: 00:00 Madrid (UTC+1/+2)
- **Pre-build**: Antes de cada deploy
- **Manual**: Puedes ejecutar manualmente desde Actions

### Cronograma

```yaml
schedule:
  - cron: "0 23 * * *" # 00:00 CET
  - cron: "0 22 * * *" # 00:00 CEST
```

## Límites y Consideraciones

### Google Places API

- **Límite**: 1000 requests/día gratis
- **Costo**: $0.017 por request después del límite
- **Datos**: Máximo 10 reseñas por lugar

### Fallbacks

- Si no hay API key → Archivo vacío
- Si no hay place_ids → Archivo vacío
- Si falla la API → Mantiene datos anteriores
- Si no hay reseñas → Muestra placeholder

## Desarrollo Local

### Ejecutar script manualmente

```bash
# Configurar variables de entorno
export GOOGLE_MAPS_API_KEY="tu_api_key"
export GOOGLE_PLACE_IDS="place_id1,place_id2"

# Ejecutar script
node scripts/fetch-google-reviews.mjs
```

### Verificar datos

```bash
# Ver contenido del JSON generado
cat content/reviews/google.json | jq .
```

## Componente Reactivo

El componente `GoogleReviews.astro` incluye:

- **Carrusel responsive**: 3 cards desktop, 2 tablet, 1 móvil
- **Navegación**: Flechas + teclado + scroll
- **Accesibilidad**: ARIA labels, contraste AA, foco visible
- **Fallbacks**: Placeholder cuando no hay reseñas
- **Atribución**: Enlace a Google Maps

## Troubleshooting

### Error: "GOOGLE_MAPS_API_KEY no está configurada"

- Añade el secret en GitHub Actions
- Verifica que la clave tenga acceso a Places API

### Error: "No se pudieron cargar las reseñas"

- Verifica que los place_ids sean correctos
- Comprueba que la API key esté activa
- Revisa los logs del workflow

### No aparecen reseñas

- Los lugares deben tener reseñas públicas en Google
- Verifica que el place_id corresponda al lugar correcto
- Comprueba que la API devuelva datos

### Carrusel no funciona

- El componente funciona sin JavaScript (scroll manual)
- Verifica que no haya errores en la consola
- Asegúrate de que el JSON tenga el formato correcto

## Seguridad

- ✅ API key restringida a Places API
- ✅ Secrets no expuestos en logs
- ✅ Validación de entrada en todos los campos
- ✅ Sanitización de datos de terceros
- ✅ Enlaces externos con `rel="noopener noreferrer"`

## Monitoreo

El workflow incluye:

- Logs detallados de cada paso
- Artifacts con datos generados
- Notificaciones de errores
- Métricas de reseñas procesadas
