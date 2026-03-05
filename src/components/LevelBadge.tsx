interface LevelBadgeProps {
  level: 'iniciante' | 'intermediario' | 'avancado' | 'expert'
}

const config = {
  iniciante: { label: 'Iniciante', bg: 'rgba(34,197,94,0.12)', color: '#4ade80', border: 'rgba(34,197,94,0.2)' },
  intermediario: { label: 'Intermediario', bg: 'rgba(59,130,246,0.12)', color: '#60a5fa', border: 'rgba(59,130,246,0.2)' },
  avancado: { label: 'Avancado', bg: 'rgba(226,192,116,0.12)', color: '#e2c074', border: 'rgba(226,192,116,0.2)' },
  expert: { label: 'Expert', bg: 'rgba(168,85,247,0.12)', color: '#c084fc', border: 'rgba(168,85,247,0.2)' },
}

export function LevelBadge({ level }: LevelBadgeProps) {
  const c = config[level]
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase tracking-wider border"
      style={{ background: c.bg, color: c.color, borderColor: c.border }}
    >
      {c.label}
    </span>
  )
}
