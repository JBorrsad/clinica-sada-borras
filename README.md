# Clínica Dental Sada Borrás

Sitio web oficial de la Clínica Dental Sada Borrás, con presencia en Pamplona y Tafalla (Navarra, España).

## 🦷 Sobre el Proyecto

Este es un sitio web estático desarrollado con **Astro** y **TypeScript**, optimizado para SEO y accesibilidad. El proyecto presenta los servicios, equipo humano y ubicaciones de la clínica dental con más de 20 años de experiencia en Navarra.

## 🚀 Stack Tecnológico

- **Framework**: Astro v4
- **Lenguaje**: TypeScript (modo strict)
- **Estilos**: CSS moderno (CSS Grid, Flexbox, Variables CSS)
- **Metodología**: Clean Code, SOLID principles

## 📋 Requisitos Previos

- Node.js v18 o superior
- npm v9 o superior

## 🛠️ Instalación y Desarrollo

### 1. Instalar dependencias

```bash
npm install
```

### 2. Iniciar servidor de desarrollo

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:4321`

### 3. Construir para producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`

### 4. Vista previa de producción

```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
clinica-sada-borras/
├── src/
│   ├── components/
│   │   ├── common/           # Componentes reutilizables (Header, Footer)
│   │   ├── sections/         # Secciones de página (Hero, Services, etc.)
│   │   └── layout/           # Layouts base
│   ├── pages/                # Páginas del sitio (rutas)
│   ├── styles/               # Estilos globales y variables CSS
│   └── utils/                # Utilidades y constantes
├── public/                   # Assets estáticos
│   ├── icons/                # Logos e iconos
│   └── img/                  # Imágenes
├── copy/                     # Contenido original (referencia)
└── template/                 # Referencias de diseño
```

## 🎨 Características Principales

### Optimización SEO

- Meta tags optimizados por página
- Schema.org markup para clínicas dentales
- Sitemap.xml automático
- URLs semánticas y limpias
- Contenido natural optimizado para palabras clave:
  - "clínica dental Pamplona"
  - "dentista Pamplona"
  - "implantes dentales Pamplona"
  - "odontopediatría Pamplona"

### Accesibilidad

- Navegación por teclado completa
- ARIA labels apropiados
- Contraste de color WCAG 2.1 AA
- Semántica HTML5
- Skip to content link

### Performance

- Sitio estático (carga ultrarrápida)
- Imágenes optimizadas con lazy loading
- CSS crítico inline
- Lighthouse Score objetivo: >90

### Responsive Design

- Mobile-first approach
- Breakpoints: 320px, 768px, 1024px, 1440px
- Menú hamburguesa en móvil
- Grid adaptable en todas las secciones

## 📞 Información de Contacto

### Pamplona
- **Dirección**: Avenida Pío XII, 8, bajo - 31008 Pamplona
- **Teléfono**: 948 172 617
- **Móvil**: 683 438 077
- **Email**: admin@clinicaborras.es

### Tafalla
- **Dirección**: Diputación Foral, 2 - 2º C y D - 31300 Tafalla
- **Teléfono**: 948 702 057
- **Email**: tafalla@clinicasadaborras.com

## 🏥 Servicios Ofrecidos

1. Implantología, Cirugía Oral y Periodoncia
2. Odontología Conservadora y Estética Dental
3. Odontopediatría (Programa PADI)
4. Odontología Biológica (RMR)
5. Estética Facial
6. Ortodoncia

## 🔧 Comandos Disponibles

| Comando           | Acción                                           |
|:------------------|:-------------------------------------------------|
| `npm install`     | Instala las dependencias                         |
| `npm run dev`     | Inicia servidor de desarrollo en `localhost:4321`|
| `npm run build`   | Construye el sitio para producción en `./dist/`  |
| `npm run preview` | Vista previa local del build de producción       |
| `npm run astro`   | CLI de Astro                                     |

## 📝 Notas de Desarrollo

- **Tabulación**: Usar tabulaciones para formatear el código
- **Principios**: Código limpio, soluciones simples, evitar duplicación
- **CSS**: Variables CSS para tokens de diseño, sin frameworks externos
- **TypeScript**: Modo strict, sin `any`, tipos explícitos

## 📄 Licencia

© 2025 Clínica Dental Sada Borrás. Todos los derechos reservados.

---

**Desarrollado con ❤️ para mejorar sonrisas en Navarra**

