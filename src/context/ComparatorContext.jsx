import { createContext, useContext, useState, useCallback } from 'react'

const ComparatorContext = createContext()

export function ComparatorProvider({ children }) {
  const [selected, setSelected] = useState([])

  const toggle = useCallback((species) => {
    setSelected(prev => {
      const exists = prev.find(s => s.id === species.id)
      if (exists) return prev.filter(s => s.id !== species.id)
      if (prev.length >= 5) return prev
      return [...prev, species]
    })
  }, [])

  const remove = useCallback((id) => {
    setSelected(prev => prev.filter(s => s.id !== id))
  }, [])

  const clear = useCallback(() => setSelected([]), [])

  const isSelected = useCallback((id) => {
    return selected.some(s => s.id === id)
  }, [selected])

  return (
    <ComparatorContext.Provider value={{ selected, toggle, remove, clear, isSelected }}>
      {children}
    </ComparatorContext.Provider>
  )
}

export function useComparator() {
  return useContext(ComparatorContext)
}
