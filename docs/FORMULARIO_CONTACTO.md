# Formulario de Contacto - Guía de Uso

## Descripción

La sección de contacto ha sido rediseñada con un diseño moderno de dos columnas:

- **Lado izquierdo**: Imagen decorativa con efecto grayscale
- **Lado derecho**: Formulario de contacto funcional

## Características

### Campos del formulario:

- ✅ **Nombre\*** (obligatorio)
- ✅ **Apellido\*** (obligatorio)
- ✅ **E-mail\*** (obligatorio con validación)
- ✅ **Teléfono\*** (obligatorio)
- ✅ **Mensaje** (opcional, área de texto expandible)
- ✅ **Checkbox de privacidad\*** (obligatorio)
- ✅ **Información legal** (sección colapsable)

### Diseño responsive:

- **Desktop**: Diseño de 2 columnas (imagen + formulario)
- **Tablet**: Formulario ocupa todo el ancho (imagen oculta)
- **Móvil**: Campos en columna única, botón de envío a ancho completo

## Integración con Backend

Actualmente el formulario tiene un `console.log` de prueba y muestra un `alert`. Para integrarlo con un backend real:

### Opción 1: API propia

```javascript
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: formData.get("nombre"),
        apellido: formData.get("apellido"),
        email: formData.get("email"),
        telefono: formData.get("telefono"),
        mensaje: formData.get("mensaje"),
      }),
    });

    if (response.ok) {
      alert("Mensaje enviado correctamente");
      form.reset();
    }
  } catch (error) {
    alert("Error al enviar el mensaje");
  }
});
```

### Opción 2: EmailJS

1. Regístrate en [EmailJS](https://www.emailjs.com/)
2. Instala el paquete: `npm install @emailjs/browser`
3. Reemplaza el código del script con:

```javascript
import emailjs from "@emailjs/browser";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    await emailjs.sendForm(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      form,
      "YOUR_PUBLIC_KEY"
    );
    alert("Mensaje enviado correctamente");
    form.reset();
  } catch (error) {
    alert("Error al enviar el mensaje");
  }
});
```

### Opción 3: Formspree

1. Regístrate en [Formspree](https://formspree.io/)
2. Actualiza el formulario:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- tus campos -->
</form>
```

### Opción 4: Netlify Forms

Si usas Netlify para desplegar, simplemente añade:

```html
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <!-- tus campos -->
</form>
```

## Personalización

### Cambiar la imagen de fondo:

Edita la línea 9 en `ContactSection.astro`:

```html
<img src={asset('/img/tu-imagen.jpg')} alt="Clínica dental" />
```

### Cambiar colores del formulario:

Busca en los estilos y modifica:

```css
/* Color de borde de inputs */
border: 1px solid #0e2e55;

/* Color del botón */
.submit-btn {
  background: #0e2e55;
}
```

### Modificar campos:

Puedes añadir, eliminar o modificar campos según tus necesidades. Solo asegúrate de actualizar también el JavaScript que procesa el formulario.

## Estado Actual

- ✅ Diseño responsive completo
- ✅ Validación HTML5 de campos
- ✅ Información legal colapsable
- ⚠️ **Pendiente**: Integración con servicio de email (actualmente solo muestra un alert)

## Próximos pasos:

1. Elige un método de envío (API propia, EmailJS, Formspree, etc.)
2. Implementa la lógica de envío
3. Añade mensajes de éxito/error más elaborados
4. Considera añadir un captcha para prevenir spam
5. Reemplaza la imagen de fondo con una foto de tu clínica
