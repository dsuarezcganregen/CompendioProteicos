import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ComparatorProvider } from './context/ComparatorContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ComparatorProvider>
        <App />
      </ComparatorProvider>
    </HashRouter>
  </StrictMode>,
)
