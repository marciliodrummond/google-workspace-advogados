import { useState, useEffect } from 'react'
import { ExpandableCard } from './ExpandableCard'
import { SectionIcon } from './Icons'
import { sections } from '../data/sections'

interface SectionContentProps {
  activeTab: string
  openCardIndex: number | null
  onCardToggle: (index: number | null) => void
  levelFilter: string
}

export function SectionContent({ activeTab, openCardIndex, onCardToggle, levelFilter }: SectionContentProps) {
  const section = sections.find(s => s.id === activeTab)
  const [animateKey, setAnimateKey] = useState(0)

  useEffect(() => {
    setAnimateKey(k => k + 1)
    onCardToggle(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  if (!section) return null

  const filteredCards = levelFilter === 'todos'
    ? section.cards
    : section.cards.filter(c => c.level === levelFilter)

  const sectionIndex = sections.findIndex(s => s.id === activeTab)
  const sectionNumber = String(sectionIndex + 1).padStart(2, '0')

  return (
    <div key={animateKey} className="space-y-3 relative" style={{ animation: 'fadeUp 0.4s ease both' }}>
      {/* Section number watermark */}
      <div className="absolute -top-2 right-0 pointer-events-none select-none font-display text-[80px] sm:text-[100px] font-extrabold leading-none" style={{
        color: 'var(--fg-accent)',
        opacity: 0.04,
      }}>
        {sectionNumber}
      </div>

      <div className="mb-4 relative">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-6 h-px bg-gradient-to-r from-[var(--fg-accent)] to-transparent" />
          <span className="font-mono text-[10px] font-medium text-[var(--fg-accent)] uppercase tracking-[0.12em]">
            Secao {sectionNumber}
          </span>
        </div>
        <div className="flex items-center gap-3 mb-1">
          <SectionIcon name={section.icon} />
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--fg-primary)] tracking-tight">
            {section.title}
          </h2>
        </div>
        <p className="text-sm text-[var(--fg-secondary)] ml-[52px]">{section.description}</p>
      </div>

      {filteredCards.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-sm text-[var(--fg-muted)]">Nenhum conteudo neste nivel para esta secao.</p>
        </div>
      ) : (
        filteredCards.map((card, i) => {
          const originalIndex = section.cards.indexOf(card)
          return (
            <div key={originalIndex} style={{ animationDelay: `${i * 50}ms`, animation: 'fadeUp 0.4s ease both' }}>
              <ExpandableCard
                card={card}
                isOpen={openCardIndex === originalIndex}
                onToggle={() => onCardToggle(openCardIndex === originalIndex ? null : originalIndex)}
              />
            </div>
          )
        })
      )}
    </div>
  )
}
