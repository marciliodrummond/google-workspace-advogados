import { Building2, BookOpen, Layers, Zap } from 'lucide-react'

interface HeroProps {
  onStart: () => void
}

export function Hero({ onStart }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center py-24 sm:py-32">
      {/* Animated orbs */}
      <div className="absolute top-[10%] right-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none blur-[80px] animate-[orbFloat_12s_ease-in-out_infinite]" style={{
        background: 'radial-gradient(circle, rgba(66,133,244,0.12) 0%, transparent 70%)',
      }} />
      <div className="absolute bottom-[20%] left-[-5%] w-[300px] h-[300px] rounded-full pointer-events-none blur-[80px] animate-[orbFloat_12s_ease-in-out_infinite_-4s]" style={{
        background: 'radial-gradient(circle, rgba(52,168,83,0.08) 0%, transparent 70%)',
      }} />

      <div className="relative z-10">
        {/* Label */}
        <div className="flex items-center gap-2.5 mb-6" style={{ animation: 'fadeIn 0.8s ease both' }}>
          <div className="w-6 h-px bg-gradient-to-r from-[var(--fg-accent)] to-transparent" />
          <span className="font-mono text-[11px] font-medium text-[var(--fg-accent)] uppercase tracking-[0.12em]">
            Super Inteligenc[IA] · Guia Interativo
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] leading-[1.05] max-w-[700px] mb-6"
          style={{ animation: 'fadeUp 0.8s ease 0.1s both' }}
        >
          Google Workspace para{' '}
          <span className="bg-gradient-to-br from-gblue-300 via-gblue-500 to-gblue-400 bg-clip-text text-transparent">
            Advogados
          </span>
        </h1>

        {/* Description */}
        <p
          className="text-base sm:text-lg text-[var(--fg-secondary)] max-w-[520px] leading-relaxed"
          style={{ animation: 'fadeUp 0.8s ease 0.2s both' }}
        >
          Guia completo para montar seu escritorio digital com Google Workspace — do Gmail profissional ao Gemini AI, passando por Drive, Docs, Sheets, Meet e automacoes com AppSheet.
        </p>

        {/* Metrics */}
        <div
          className="flex flex-wrap gap-6 sm:gap-8 mt-10"
          style={{ animation: 'fadeUp 0.8s ease 0.35s both' }}
        >
          {[
            { icon: Layers, value: '10', label: 'Secoes' },
            { icon: BookOpen, value: '90+', label: 'Tutoriais' },
            { icon: Zap, value: '25+', label: 'Templates' },
            { icon: Building2, value: '4', label: 'Niveis' },
          ].map((m, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{
                background: 'var(--bg-accent-subtle)',
                border: '1px solid var(--border-accent)',
              }}>
                <m.icon className="w-4 h-4 text-[var(--fg-accent)]" />
              </div>
              <div>
                <div className="font-display text-xl sm:text-2xl font-bold text-[var(--fg-primary)] tracking-tight leading-none">{m.value}</div>
                <div className="text-[10px] text-[var(--fg-muted)] font-medium mt-0.5">{m.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10" style={{ animation: 'fadeUp 0.8s ease 0.5s both' }}>
          <button
            onClick={onStart}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold cursor-pointer border-none transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, var(--bg-accent), var(--bg-accent-hover))',
              color: 'var(--fg-on-accent)',
              boxShadow: 'var(--gold-glow-sm)',
            }}
          >
            <Building2 className="w-4 h-4" />
            Comecar o Guia
          </button>
        </div>
      </div>
    </section>
  )
}
