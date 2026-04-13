import { useState, useRef, useEffect } from 'react'
import glossaryData from '../data/glossary.json'

const glossaryMap = new Map()
glossaryData.forEach(entry => {
  glossaryMap.set(entry.term.toLowerCase(), entry)
  if (entry.abbreviation) {
    glossaryMap.set(entry.abbreviation.toLowerCase(), entry)
  }
})

const TERMS_REGEX = (() => {
  const terms = []
  glossaryData.forEach(entry => {
    terms.push(entry.term)
    if (entry.abbreviation) terms.push(entry.abbreviation)
  })
  terms.sort((a, b) => b.length - a.length)
  const escaped = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  return new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi')
})()

function Tooltip({ term, children }) {
  const [show, setShow] = useState(false)
  const ref = useRef(null)
  const entry = glossaryMap.get(term.toLowerCase())

  useEffect(() => {
    if (!show) return
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setShow(false)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [show])

  if (!entry) return children

  return (
    <span
      ref={ref}
      className="glossary-term inline"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={(e) => { e.stopPropagation(); setShow(!show) }}
    >
      {children}
      {show && (
        <span className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-bg-card border border-bg-alt rounded-lg shadow-lg text-left">
          <span className="block text-green-brand text-sm font-semibold mb-1">
            {entry.term}
            {entry.abbreviation && <span className="text-text-muted font-normal"> ({entry.abbreviation})</span>}
          </span>
          <span className="block text-text-secondary text-xs leading-relaxed">{entry.definition}</span>
        </span>
      )}
    </span>
  )
}

export function renderWithGlossary(text) {
  if (!text) return null
  const parts = []
  let lastIndex = 0
  let match

  TERMS_REGEX.lastIndex = 0
  while ((match = TERMS_REGEX.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    parts.push(
      <Tooltip key={match.index} term={match[0]}>
        {match[0]}
      </Tooltip>
    )
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }
  return parts
}
