import { Sun, Moon, Building2 } from 'lucide-react'

interface HeaderProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-4 sm:px-8 border-b backdrop-blur-xl" style={{
      background: theme === 'dark' ? 'rgba(3,4,9,0.7)' : 'rgba(250,250,247,0.8)',
      borderColor: 'var(--border-line)',
    }}>
      <a href="#" className="flex items-center gap-2.5 no-underline text-[var(--fg-primary)]">
        <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{
          background: 'linear-gradient(135deg, var(--bg-accent), var(--bg-accent-hover))',
          boxShadow: 'var(--gold-glow-sm)',
        }}>
          <Building2 className="w-4 h-4 text-[var(--fg-on-accent)]" />
        </div>
        <span className="font-display text-sm font-bold tracking-tight">
          Google Workspace<span className="text-[var(--fg-accent)]"> para Advogados</span>
        </span>
        <span className="hidden sm:inline font-mono text-[10px] text-[var(--fg-muted)]">v1.0</span>
      </a>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={onToggleTheme}
          className="w-8 h-8 rounded-lg border flex items-center justify-center cursor-pointer transition-all duration-200 hover:border-[var(--border-accent)] hover:text-[var(--fg-accent)]"
          style={{
            borderColor: 'var(--border-line)',
            background: 'transparent',
            color: 'var(--fg-secondary)',
          }}
          aria-label="Alternar tema"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  )
}
