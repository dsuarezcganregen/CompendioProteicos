# Compendio de Suplementos Proteicos

Herramienta de consulta web para un compendio de suplementos proteicos para ganadería bovina latinoamericana. Material educativo de [GanaderíaRegenerativa.com](https://ganaderiaregenerativa.com) / REGENERA360.

## Stack

- React + Vite + Tailwind CSS
- Datos en archivos JSON estáticos (sin backend)
- Deploy automático en GitHub Pages

## Desarrollo local

```bash
npm install
npm run dev
```

## Agregar nuevas especies

Editar `src/data/species.json` y agregar un nuevo objeto al array con la estructura:

```json
{
  "id": "nombre-corto",
  "category": "tropical_arborea",
  "commonName": "Nombre Común",
  "scientificName": "Nombre científico",
  "otherNames": "Otros nombres comunes",
  "family": "Familia botánica",
  "habit": "Descripción del hábito de crecimiento",
  "originDistribution": "Origen y distribución geográfica",
  "adaptation": "Condiciones de adaptación",
  "protein": "Datos de proteína cruda",
  "digestibility": "Datos de digestibilidad",
  "uses": "Formas de uso (separadas por coma)",
  "benefits": "Beneficios principales",
  "risks": "Riesgos y precauciones",
  "proteinMin": 20,
  "proteinMax": 27,
  "climate": "tropical"
}
```

**Categorías válidas:** `nnp`, `subproducto`, `tropical_arborea`, `tropical_arbustiva`, `tropical_rastrera`, `tropical_no_convencional`, `templado_arborea`, `templado_perenne`, `templado_anual`, `templado_no_convencional`, `biclimatica`

**Climas válidos:** `tropical`, `templado`, `biclimatico`, `cualquiera`

## Agregar términos al glosario

Editar `src/data/glossary.json` y agregar un nuevo objeto:

```json
{
  "term": "Término",
  "abbreviation": "ABREV",
  "definition": "Definición del término."
}
```

## Deploy

El deploy es automático al hacer push a `main` via GitHub Actions. Asegúrate de que en la configuración del repositorio:

1. Ve a Settings > Pages
2. En "Build and deployment", selecciona "GitHub Actions"

## Build manual

```bash
npm run build
```

Los archivos se generan en `dist/`.

## Créditos

Desarrollado por Daniel Suárez — [GanaderíaRegenerativa.com](https://ganaderiaregenerativa.com) — REGENERA360
