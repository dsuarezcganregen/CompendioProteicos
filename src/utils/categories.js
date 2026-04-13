export const CATEGORY_INFO = {
  nnp: { label: 'NNP', color: 'bg-cat-nnp', textColor: 'text-cat-nnp', borderColor: 'border-cat-nnp' },
  subproducto: { label: 'Subproducto', color: 'bg-cat-subproducto', textColor: 'text-cat-subproducto', borderColor: 'border-cat-subproducto' },
  tropical_arborea: { label: 'Tropical Arbórea', color: 'bg-cat-tropical', textColor: 'text-cat-tropical', borderColor: 'border-cat-tropical' },
  tropical_arbustiva: { label: 'Tropical Arbustiva', color: 'bg-cat-tropical', textColor: 'text-cat-tropical', borderColor: 'border-cat-tropical' },
  tropical_rastrera: { label: 'Tropical Rastrera', color: 'bg-cat-tropical', textColor: 'text-cat-tropical', borderColor: 'border-cat-tropical' },
  tropical_no_convencional: { label: 'Tropical No Conv.', color: 'bg-cat-tropical', textColor: 'text-cat-tropical', borderColor: 'border-cat-tropical' },
  templado_arborea: { label: 'Templado Arbórea', color: 'bg-cat-templado', textColor: 'text-cat-templado', borderColor: 'border-cat-templado' },
  templado_perenne: { label: 'Templado Perenne', color: 'bg-cat-templado', textColor: 'text-cat-templado', borderColor: 'border-cat-templado' },
  templado_anual: { label: 'Templado Anual', color: 'bg-cat-templado', textColor: 'text-cat-templado', borderColor: 'border-cat-templado' },
  templado_no_convencional: { label: 'Templado No Conv.', color: 'bg-cat-templado', textColor: 'text-cat-templado', borderColor: 'border-cat-templado' },
  biclimatica: { label: 'Biclimática', color: 'bg-cat-biclimatica', textColor: 'text-cat-biclimatica', borderColor: 'border-cat-biclimatica' },
}

export const CLIMATE_LABELS = {
  tropical: 'Tropical',
  templado: 'Templado',
  biclimatico: 'Biclimático',
  cualquiera: 'Cualquiera',
}

export const SECTIONS = [
  { key: 'nnp', label: 'NNP', icon: '⚗️', filter: (s) => s.category === 'nnp' },
  { key: 'subproducto', label: 'Subproductos Agroindustriales', icon: '🏭', filter: (s) => s.category === 'subproducto' },
  { key: 'tropical', label: 'Forrajes Tropicales', icon: '🌴', filter: (s) => s.category.startsWith('tropical_') },
  { key: 'templado', label: 'Forrajes Templados', icon: '🌿', filter: (s) => s.category.startsWith('templado_') },
  { key: 'biclimatica', label: 'Especies Biclimáticas', icon: '🌎', filter: (s) => s.category === 'biclimatica' },
]

export function getSectionForCategory(category) {
  if (category === 'nnp') return 'nnp'
  if (category === 'subproducto') return 'subproducto'
  if (category.startsWith('tropical_')) return 'tropical'
  if (category.startsWith('templado_')) return 'templado'
  if (category === 'biclimatica') return 'biclimatica'
  return null
}

export function getCategoryColor(category) {
  return CATEGORY_INFO[category]?.color || 'bg-gray-600'
}

export function getCategoryLabel(category) {
  return CATEGORY_INFO[category]?.label || category
}
