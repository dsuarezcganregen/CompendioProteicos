import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './components/HomePage'
import CatalogPage from './components/CatalogPage'
import SpeciesDetail from './components/SpeciesDetail'
import Comparator from './components/Comparator'
import GlossaryPage from './components/GlossaryPage'
import AboutPage from './components/AboutPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/especie/:id" element={<SpeciesDetail />} />
        <Route path="/comparar" element={<Comparator />} />
        <Route path="/glosario" element={<GlossaryPage />} />
        <Route path="/acerca" element={<AboutPage />} />
      </Route>
    </Routes>
  )
}
