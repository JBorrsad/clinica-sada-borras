# Configuración de GitHub Pages y Google Places API

> **🌐 Configuración del proyecto**
>
> Este repositorio está configurado para GitHub Pages **sin dominio custom**.
>
> - **URL del sitio**: `https://jborrsad.github.io/clinica-sada-borras`
> - **Base path**: `/clinica-sada-borras` (ya configurado en `astro.config.mjs`)
> - **No necesitas**: Archivo CNAME ni cambios en la configuración de Astro

## 🎯 Configuración Inicial de GitHub Pages

### 1. Habilitar GitHub Pages con GitHub Actions

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Pages**
4. En **Build and deployment** → **Source**, selecciona **GitHub Actions**

![GitHub Pages Source](https://docs.github.com/assets/cb-47267/mw-1440/images/help/pages/publishing-source-drop-down.webp)

✅ **No necesitas** seleccionar una rama específica cuando usas GitHub Actions.

### 2. Configurar los Secrets

#### `GOOGLE_MAPS_API_KEY`

**Paso 1**: Crear proyecto en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a **APIs & Services** → **Library**
4. Busca "Places API (New)" y haz click en **Enable**

**Paso 2**: Crear API Key

1. Ve a **APIs & Services** → **Credentials**
2. Click en **Create Credentials** → **API Key**
3. Copia la clave generada

**Paso 3**: Restringir la API Key (Recomendado)

1. Click en la API key recién creada
2. En **Application restrictions**:
   - Selecciona **HTTP referrers (web sites)** si solo usarás desde el workflow
   - O **None** si necesitas flexibilidad
3. En **API restrictions**:
   - Selecciona **Restrict key**
   - Marca solo **Places API (New)**
4. Click en **Save**

**Paso 4**: Añadir el secret al repositorio

1. Ve a tu repo en GitHub → **Settings** → **Secrets and variables** → **Actions**
2. Click en **New repository secret**
3. Name: `GOOGLE_MAPS_API_KEY`
4. Value: Pega la clave de la API
5. Click en **Add secret**

#### `GOOGLE_PLACE_ID_1` y `GOOGLE_PLACE_ID_2`

**Paso 1**: Obtener los place_id de tus ubicaciones

**Opción A - Desde Google Maps URL:**

1. Abre [Google Maps](https://www.google.com/maps)
2. Busca tu negocio
3. Click derecho en el marcador → **Share** → **Copy link**
4. La URL tendrá este formato:
   ```
   https://www.google.com/maps/place/.../@lat,lng,zoom/data=!4m...!1s0xAABBCC:0xDDEEFF...
   ```
5. El `place_id` está codificado en el parámetro `data`

**Opción B - Usando Place ID Finder:**

1. Ve a [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
2. Busca tu negocio en el mapa
3. Click en el marcador
4. Copia el `place_id` que aparece (formato: `ChIJxxxx...`)

**Opción C - Usando la API directamente:**

```bash
curl "https://places.googleapis.com/v1/places:searchText" \
	-H "Content-Type: application/json" \
	-H "X-Goog-Api-Key: TU_API_KEY" \
	-d '{
		"textQuery": "Clinica Dental Sada Borras Pamplona"
	}'
```

**Paso 2**: Añadir los place_ids al repositorio

Necesitas crear **dos secrets separados** (uno por cada ubicación):

**Secret 1 - Pamplona:**

1. Ve a tu repo en GitHub → **Settings** → **Secrets and variables** → **Actions**
2. Click en **New repository secret**
3. Name: `GOOGLE_PLACE_ID_1`
4. Value: El place_id de Pamplona (ej: `ChIJxxxxxxxxxxxxxx`)
5. Click en **Add secret**

**Secret 2 - Tafalla:**

1. Click en **New repository secret**
2. Name: `GOOGLE_PLACE_ID_2`
3. Value: El place_id de Tafalla (ej: `ChIJyyyyyyyyyyyyyy`)
4. Click en **Add secret**

## 🚀 Primera Ejecución

### Ejecutar el workflow manualmente

1. Ve a **Actions** en tu repositorio
2. Click en **Build & Deploy (with Google Reviews)** en la barra lateral
3. Click en **Run workflow** (botón azul)
4. Selecciona la rama `main`
5. Click en **Run workflow**

### Verificar la ejecución

El workflow tiene dos jobs:

**Job 1: build**

- ✅ Checkout del código
- ✅ Instalación de Node.js y dependencias
- ✅ **Fetch Google Reviews**: Descarga las reseñas de Google Places
- ✅ Build de Astro (genera carpeta `dist`)
- ✅ Upload del artifact (sube `dist` a GitHub)

**Job 2: deploy**

- ✅ Deploy a GitHub Pages (publica el sitio)

### Verificar el sitio publicado

1. Una vez completado el workflow, ve a **Settings** → **Pages**
2. Verás la URL de tu sitio: `https://<usuario>.github.io/<repo>/`
3. Click en **Visit site** para verificar

## 🔍 Troubleshooting

### ❌ Error: "GOOGLE_MAPS_API_KEY no está configurada"

**Causa**: El secret no existe o tiene un nombre incorrecto

**Solución**:

1. Verifica que el secret se llama exactamente `GOOGLE_MAPS_API_KEY` (case-sensitive)
2. Si acabas de crear el secret, espera 1-2 minutos y vuelve a ejecutar el workflow

### ❌ Error: "HTTP 403: Places API (New) has not been enabled"

**Causa**: La API no está habilitada en tu proyecto de Google Cloud

**Solución**:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto
3. Ve a **APIs & Services** → **Library**
4. Busca "Places API (New)" y haz click en **Enable**

### ❌ Error: "HTTP 400: Invalid place_id"

**Causa**: El `place_id` está mal formateado o es incorrecto

**Solución**:

1. Verifica que el formato sea: `ChIJxxxxxxxxxxxxx` (empieza con `ChIJ`)
2. Verifica que los secrets `GOOGLE_PLACE_ID_1` y `GOOGLE_PLACE_ID_2` existan
3. Usa la [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder) para obtener el ID correcto

### ❌ Las reseñas no aparecen en el sitio

**Causa**: El componente no está leyendo el JSON correctamente

**Solución**:

1. Verifica en los logs del workflow que el step "Fetch Google Reviews" se completó exitosamente
2. Busca en los logs el mensaje: `💾 Datos guardados en: .../content/reviews/google.json`
3. Verifica que el componente `GoogleReviews.astro` esté importando correctamente:
   ```astro
   ---
   import { getGoogleReviews } from '@/lib/reviews';
   const reviews = await getGoogleReviews();
   ---
   ```

### ❌ Error: "Resource not accessible by integration"

**Causa**: Faltan permisos en el workflow

**Solución**:

El workflow debe tener estos permisos:

```yaml
permissions:
	contents: read
	pages: write
	id-token: write
```

### ❌ Assets del sitio no cargan (404)

**Causa**: Problema con el `base` path en `astro.config.mjs`

**Solución**:

1. Verifica que `astro.config.mjs` tenga:
   ```javascript
   export default defineConfig({
     site: "https://jborrsad.github.io",
     base: "/clinica-sada-borras",
   });
   ```
2. El valor de `base` debe coincidir exactamente con el nombre del repositorio
3. La URL final será: `https://jborrsad.github.io/clinica-sada-borras`

## 📅 Crons Explicados

El workflow se ejecuta automáticamente a medianoche (hora de Madrid):

```yaml
schedule:
	# 00:00 CET (UTC+1) = 23:00 UTC
	- cron: "0 23 * * *"
	# 00:00 CEST (UTC+2) = 22:00 UTC
	- cron: "0 22 * * *"
```

**¿Por qué dos crons?**

España usa:

- **CET** (UTC+1) en invierno
- **CEST** (UTC+2) en verano

GitHub Actions usa **siempre UTC**, por lo que necesitamos dos crons para cubrir ambos casos.

## 🎓 Best Practices

### 1. No commitear las reseñas

✅ **Correcto**: Generar `google.json` en el build (efímero)

❌ **Incorrecto**: Commitear `google.json` al repositorio

**Razón**: Evita:

- Historial contaminado con commits automáticos
- Problemas de permisos con GITHUB_TOKEN
- Conflictos de merge
- El temido "ActionsUser" en los commits

### 2. Configuración correcta del `base` path

Para GitHub Pages sin dominio custom, el `astro.config.mjs` debe tener:

```javascript
export default defineConfig({
  site: "https://jborrsad.github.io",
  base: "/clinica-sada-borras", // ← Nombre del repositorio
});
```

✅ **Correcto**: `/clinica-sada-borras` (coincide con el nombre del repo)

❌ **Incorrecto**: `/` o vacío (solo para dominios custom)

### 3. Usar `npm ci` en lugar de `npm install`

```yaml
- name: Install dependencies
	run: npm ci  # ✅ Más rápido y determinista
```

### 4. Caché de dependencias

```yaml
- name: Setup Node
	uses: actions/setup-node@v4
	with:
		node-version: 20
		cache: npm  # ✅ Cachea node_modules
```

### 5. Manejo de errores en fetch

```yaml
- name: Fetch Google Reviews
	run: |
		node scripts/fetch-google-reviews.mjs || echo "WARN: fetch failed"
```

Esto permite que el build continúe aunque falle la descarga de reseñas (útil durante desarrollo/testing).

## 📚 Referencias

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Google Places API (New) Documentation](https://developers.google.com/maps/documentation/places/web-service/place-id)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/github/)

---

¿Tienes dudas? Abre un issue en el repositorio.
