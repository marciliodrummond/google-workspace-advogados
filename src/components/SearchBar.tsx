import { useState, useRef, useCallback, useEffect } from 'react'
import { Search, X, Sparkles } from 'lucide-react'
import { Icon } from './Icons'
import type { SearchResult } from '../hooks/useSearch'
import { popularSuggestions } from '../hooks/useSearch'

const levelColors: Record<string, { bg: string; text: string; label: string }> = {
  iniciante: { bg: 'rgba(34,197,94,0.15)', text: '#22c55e', label: 'Iniciante' },
  intermediario: { bg: 'rgba(59,130,246,0.15)', text: '#3b82f6', label: 'Intermediario' },
  avancado: { bg: 'rgba(168,85,247,0.15)', text: '#a855f7', label: 'Avancado' },
  expert: { bg: 'rgba(226,192,116,0.15)', text: '#e2c074', label: 'Expert' },
}

const matchTypeLabels: Record<string, string> = {
  exact: '',
  synonym: 'Relacionado',
  intent: 'Sugerido',
  fuzzy: 'Similar',
}

interface SearchBarProps {
  query: string
  onQueryChange: (q: string) => void
  results: SearchResult[]
  onSelectResult: (sectionId: string, cardIndex: number) => void
  isFocused: boolean
  onFocus: () => void
  onBlur: () => void
}

export function SearchBar({ query, onQueryChange, results, onSelectResult, isFocused, onFocus, onBlur }: SearchBarProps) {
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const showSuggestions = isFocused && query.length < 2 && results.length === 0
  const showResults = results.length > 0
  const showNoResults = isFocused && query.length >= 2 && results.length === 0
  const showDropdown = showSuggestions || showResults || showNoResults

  useEffect(() => {
    setActiveIndex(-1)
  }, [results, query])

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[data-result-item]')
      items[activeIndex]?.scrollIntoView({ block: 'nearest' })
    }
  }, [activeIndex])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const maxIndex = showResults ? results.length - 1 : showSuggestions ? popularSuggestions.length - 1 : -1

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(prev => (prev < maxIndex ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(prev => (prev > 0 ? prev - 1 : maxIndex))
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      if (showResults && results[activeIndex]) {
        onSelectResult(results[activeIndex].sectionId, results[activeIndex].cardIndex)
        onQueryChange('')
        inputRef.current?.blur()
      } else if (showSuggestions && popularSuggestions[activeIndex]) {
        onQueryChange(popularSuggestions[activeIndex].query)
      }
    } else if (e.key === 'Escape') {
      onQueryChange('')
      inputRef.current?.blur()
    }
  }, [activeIndex, results, showResults, showSuggestions, onSelectResult, onQueryChange])

  const handleSuggestionClick = useCallback((suggestion: typeof popularSuggestions[0]) => {
    onQueryChange(suggestion.query)
    inputRef.current?.focus()
  }, [onQueryChange])

  const groupedResults = results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    if (!acc[r.sectionTitle]) acc[r.sectionTitle] = []
    acc[r.sectionTitle].push(r)
    return acc
  }, {})

  let flatIndex = -1

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--fg-muted)] pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          placeholder="Buscar tutoriais, templates, ferramentas..."
          className="w-full h-11 pl-10 pr-10 rounded-xl border text-sm font-sans outline-none transition-all duration-200 focus:border-[var(--border-focus)] focus:shadow-[var(--gold-glow-sm)]"
          style={{
            background: 'var(--bg-surface)',
            borderColor: 'var(--border-line)',
            color: 'var(--fg-primary)',
          }}
        />
        {query && (
          <button
            onClick={() => { onQueryChange(''); inputRef.current?.focus() }}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--fg-muted)] hover:text-[var(--fg-primary)] cursor-pointer bg-transparent border-none p-0"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div
          ref={listRef}
          className="absolute top-[calc(100%+6px)] left-0 right-0 rounded-xl border overflow-hidden shadow-2xl z-50 max-h-[420px] overflow-y-auto"
          style={{
            background: 'var(--bg-elevated)',
            borderColor: 'var(--border-line)',
            animation: 'fadeIn 0.15s ease',
          }}
        >
          {showSuggestions && (
            <div className="p-3">
              <div className="flex items-center gap-1.5 px-1.5 mb-2.5">
                <Sparkles className="w-3 h-3 text-[var(--fg-accent)]" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--fg-muted)]">
                  Buscas populares
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {popularSuggestions.map((s, i) => (
                  <button
                    key={s.query}
                    data-result-item
                    onClick={() => handleSuggestionClick(s)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer border-none transition-all duration-150"
                    style={{
                      background: activeIndex === i ? 'var(--bg-accent-subtle)' : 'var(--bg-surface)',
                      color: activeIndex === i ? 'var(--fg-accent)' : 'var(--fg-secondary)',
                      border: `1px solid ${activeIndex === i ? 'var(--border-accent)' : 'var(--border-line)'}`,
                    }}
                  >
                    <Icon name={s.icon} size={12} className="opacity-60" />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {showNoResults && (
            <div className="p-6 text-center">
              <p className="text-sm text-[var(--fg-muted)] mb-3">
                Nenhum resultado para "<span className="text-[var(--fg-primary)] font-medium">{query}</span>"
              </p>
              <p className="text-xs text-[var(--fg-muted)] mb-3">Tente buscar por:</p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {['gmail', 'drive', 'sheets', 'meet', 'gemini'].map((s) => (
                  <button
                    key={s}
                    onClick={() => onQueryChange(s)}
                    className="px-2.5 py-1 rounded-md text-xs cursor-pointer border-none transition-colors duration-150 hover:text-[var(--fg-accent)]"
                    style={{
                      background: 'var(--bg-surface)',
                      color: 'var(--fg-secondary)',
                      border: '1px solid var(--border-line)',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {showResults && Object.entries(groupedResults).map(([sectionTitle, sectionResults]) => (
            <div key={sectionTitle}>
              <div
                className="flex items-center gap-2 px-4 py-2 sticky top-0"
                style={{
                  background: 'var(--bg-surface)',
                  borderBottom: '1px solid var(--border-line)',
                }}
              >
                <Icon name={sectionResults[0].sectionIcon} size={12} className="text-[var(--fg-accent)]" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--fg-muted)]">
                  {sectionTitle}
                </span>
                <span className="text-[10px] text-[var(--fg-muted)] opacity-50">
                  ({sectionResults.length})
                </span>
              </div>

              {sectionResults.map((r) => {
                flatIndex++
                const currentIndex = flatIndex
                const level = levelColors[r.cardLevel] || levelColors.iniciante
                const matchLabel = matchTypeLabels[r.matchType]
                const isActive = activeIndex === currentIndex

                return (
                  <button
                    key={`${r.sectionId}-${r.cardIndex}`}
                    data-result-item
                    onClick={() => {
                      onSelectResult(r.sectionId, r.cardIndex)
                      onQueryChange('')
                    }}
                    className="w-full text-left px-4 py-2.5 transition-all duration-100 cursor-pointer bg-transparent border-none block"
                    style={{
                      background: isActive ? 'var(--bg-accent-subtle)' : 'transparent',
                      borderBottom: '1px solid var(--border-line)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <div
                        className="w-5 h-5 rounded flex items-center justify-center shrink-0"
                        style={{ background: level.bg }}
                      >
                        <Icon name={r.cardIcon} size={11} className="opacity-70" />
                      </div>
                      <span className="text-sm font-medium text-[var(--fg-primary)] truncate flex-1">
                        {r.cardTitle}
                      </span>
                      <span
                        className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0"
                        style={{ background: level.bg, color: level.text }}
                      >
                        {level.label}
                      </span>
                      {matchLabel && (
                        <span className="text-[9px] text-[var(--fg-muted)] italic shrink-0">
                          {matchLabel}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[var(--fg-muted)] line-clamp-1 pl-7">
                      {r.cardSubtitle || r.snippet}
                    </p>
                  </button>
                )
              })}
            </div>
          ))}

          {showResults && (
            <div
              className="px-4 py-2 text-center"
              style={{ borderTop: '1px solid var(--border-line)' }}
            >
              <span className="text-[10px] text-[var(--fg-muted)]">
                {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
                {results.length >= 15 ? ' — refine sua busca para mais precisao' : ''}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
