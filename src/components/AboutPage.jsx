export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl text-text-primary mb-8">Acerca del Compendio</h1>

      <div className="bg-bg-card border border-bg-alt rounded-xl p-6 mb-6">
        <h2 className="text-text-primary text-xl mb-3">Descripción</h2>
        <p className="text-text-secondary leading-relaxed mb-4">
          El Compendio de Suplementos Proteicos para Ganadería Bovina Latinoamericana es una
          herramienta de consulta rápida que reúne fichas técnicas de 161 fuentes proteicas
          relevantes para la nutrición de bovinos en los diversos ecosistemas de América Latina.
        </p>
        <p className="text-text-secondary leading-relaxed">
          Cada ficha incluye información sobre identificación botánica, adaptación climática y
          edáfica, contenido de proteína cruda, digestibilidad, formas de uso, beneficios y
          riesgos o precauciones. El compendio abarca desde fuentes de nitrógeno no proteico (NNP)
          y subproductos agroindustriales hasta forrajes tropicales, templados y biclimáticos.
        </p>
      </div>

      <div className="bg-bg-card border border-bg-alt rounded-xl p-6 mb-6">
        <h2 className="text-text-primary text-xl mb-3">Contexto Educativo</h2>
        <p className="text-text-secondary leading-relaxed">
          Este material es complemento de la <strong className="text-text-primary">Clase 6: Suplementación Ruminal</strong> del
          curso <strong className="text-text-primary">ABCD de la Ganadería Regenerativa</strong>, impartido a través de la
          plataforma REGENERA360.
        </p>
      </div>

      <div className="bg-bg-card border border-bg-alt rounded-xl p-6 mb-6">
        <h2 className="text-text-primary text-xl mb-3">Créditos</h2>
        <p className="text-text-secondary leading-relaxed">
          Desarrollado por <strong className="text-text-primary">Daniel Suárez</strong>
        </p>
        <p className="text-text-secondary leading-relaxed mt-2">
          <a
            href="https://ganaderiaregenerativa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-brand hover:text-green-light no-underline"
          >
            GanaderíaRegenerativa.com
          </a>
          {' '}— REGENERA360
        </p>
      </div>

      <div className="bg-bg-card border border-bg-alt rounded-xl p-6">
        <h2 className="text-text-primary text-xl mb-3">Uso</h2>
        <p className="text-text-secondary leading-relaxed">
          Este material es de uso exclusivo para alumnos inscritos en los programas educativos
          de GanaderíaRegenerativa.com. No está permitida su reproducción o distribución sin
          autorización.
        </p>
      </div>
    </div>
  )
}
