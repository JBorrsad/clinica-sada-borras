# Casos Clínicos - Guía de Uso

## Descripción

La sección de Casos Clínicos muestra comparaciones de "antes y después" de tratamientos dentales con un slider interactivo que permite a los visitantes comparar las imágenes deslizando el control.

## Cómo agregar tus propias imágenes

### 1. Preparar las imágenes

Para cada caso clínico necesitas **dos imágenes**:

- **Imagen "Antes"**: Foto del paciente antes del tratamiento
- **Imagen "Después"**: Foto del paciente después del tratamiento

**Recomendaciones:**

- Las dos imágenes deben tener las **mismas dimensiones** para que la comparación sea precisa
- Formato recomendado: JPG o WebP
- Resolución recomendada: 800x600px (relación 4:3)
- Tamaño de archivo: Optimizar para web (< 200KB por imagen)
- Asegúrate de que las fotos estén tomadas desde el **mismo ángulo** y **distancia**

### 2. Organizar las imágenes

Crea una carpeta para los casos clínicos:

```
public/img/casos-clinicos/
├── mordida-abierta-antes.jpg
├── mordida-abierta-despues.jpg
├── carillas-antes.jpg
├── carillas-despues.jpg
├── diastemas-antes.jpg
├── diastemas-despues.jpg
└── invisalign-antes.jpg
└── invisalign-despues.jpg
```

### 3. Actualizar el código

Edita el archivo `src/components/sections/ClinicalCases.astro` y actualiza el array `cases`:

```typescript
const cases = [
  {
    id: "mordida-abierta",
    title: "Mordida abierta",
    beforeImage: "/img/casos-clinicos/mordida-abierta-antes.jpg",
    afterImage: "/img/casos-clinicos/mordida-abierta-despues.jpg",
  },
  {
    id: "combinados-carillas",
    title: "Combinados con Carillas",
    beforeImage: "/img/casos-clinicos/carillas-antes.jpg",
    afterImage: "/img/casos-clinicos/carillas-despues.jpg",
  },
  {
    id: "diastemas",
    title: "Diastemas (Espacios)",
    beforeImage: "/img/casos-clinicos/diastemas-antes.jpg",
    afterImage: "/img/casos-clinicos/diastemas-despues.jpg",
  },
  {
    id: "invisalign",
    title: "Combinados con invisalign",
    beforeImage: "/img/casos-clinicos/invisalign-antes.jpg",
    afterImage: "/img/casos-clinicos/invisalign-despues.jpg",
  },
];
```

### 4. Añadir o eliminar casos

Para **añadir un nuevo caso**, simplemente añade un nuevo objeto al array:

```typescript
{
	id: 'nuevo-caso',
	title: 'Título del Nuevo Caso',
	beforeImage: '/img/casos-clinicos/nuevo-antes.jpg',
	afterImage: '/img/casos-clinicos/nuevo-despues.jpg'
}
```

Para **eliminar un caso**, simplemente elimina el objeto correspondiente del array.

## Funcionalidad del Slider

El slider de comparación permite a los usuarios:

- **Arrastrar** el botón central hacia la izquierda o derecha
- **Ver dinámicamente** la transición entre antes y después
- Funciona tanto en **desktop** (con mouse) como en **móvil** (con touch)

## Consideraciones Legales

⚠️ **IMPORTANTE**: Asegúrate de tener el **consentimiento informado** de los pacientes para publicar sus fotos de antes y después en tu sitio web. Esto incluye:

- Autorización firmada del paciente
- Anonimización de datos personales (si aplica)
- Cumplimiento con la RGPD (Reglamento General de Protección de Datos)

## Personalización Adicional

### Cambiar el número de columnas

En el archivo `ClinicalCases.astro`, línea donde está `.cases-grid`, puedes ajustar:

```css
.cases-grid {
  grid-template-columns: repeat(auto-fill, 300px);
  /* Para 2 columnas fijas: grid-template-columns: repeat(2, 1fr); */
  /* Para 3 columnas fijas: grid-template-columns: repeat(3, 1fr); */
}
```

### Cambiar colores del botón del slider

Busca `.slider-button` en los estilos y modifica:

```css
.slider-button {
  border: 3px solid var(--color-primary); /* Color del borde */
  background: white; /* Color de fondo */
}
```

## Estado Actual

Actualmente, el componente está usando **imágenes placeholder temporales** de la carpeta `servicios_cards`. Debes reemplazarlas con tus propias imágenes de casos clínicos reales siguiendo las instrucciones anteriores.
