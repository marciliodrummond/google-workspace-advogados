const levels = [
  { id: 'todos', label: 'Todos', color: 'var(--fg-secondary)' },
  { id: 'iniciante', label: 'Iniciante', color: '#4ade80' },
  { id: 'intermediario', label: 'Intermediario', color: '#60a5fa' },
  { id: 'avancado', label: 'Avancado', color: '#e2c074' },
  { id: 'expert', label: 'Expert', color: '#c084fc' },
]

interface LevelFilterProps {
  active: string
  onChange: (level: string) => void
}

export function LevelFilter({ active, onChange }: LevelFilterProps) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span className="text-xs text-[var(--fg-muted)] font-mono mr-1">NIVEL:</span>
      {levels.map((l) => (
        <button
          key={l.id}
          onClick={() => onChange(l.id)}
          className={`
            px-2.5 py-1 rounded-full text-[11px] font-medium transition-all duration-200 cursor-pointer border
            ${active === l.id ? 'opacity-100' : 'opacity-50 hover:opacity-80'}
          `}
          style={{
            background: active === l.id ? `${l.color}15` : 'transparent',
            borderColor: active === l.id ? `${l.color}40` : 'var(--border-line)',
            color: l.color,
          }}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
