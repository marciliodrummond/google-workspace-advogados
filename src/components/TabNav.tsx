import { sections } from '../data/sections'
import { Icon } from './Icons'

interface TabNavProps {
  activeTab: string
  onTabChange: (id: string) => void
}

export function TabNav({ activeTab, onTabChange }: TabNavProps) {
  const renderButton = (s: typeof sections[0]) => (
    <button
      key={s.id}
      onClick={() => onTabChange(s.id)}
      className={`
        flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer border
        ${activeTab === s.id
          ? 'bg-[var(--bg-accent-subtle)] text-[var(--fg-accent)] border-[var(--border-accent)]'
          : 'bg-transparent text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] hover:bg-[var(--bg-surface)] border-transparent'
        }
      `}
    >
      <Icon name={s.icon} size={14} className="shrink-0" />
      <span>{s.title}</span>
    </button>
  )

  return (
    <nav className="flex flex-wrap gap-1 justify-center">
      {sections.map(renderButton)}
    </nav>
  )
}
