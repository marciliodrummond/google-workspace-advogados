export function Footer() {
  return (
    <footer className="mt-16 pb-8 pt-8 border-t" style={{ borderColor: 'var(--border-line)' }}>
      <div className="text-center space-y-2">
        <p className="text-xs text-[var(--fg-muted)]">
          Guia criado por <span className="text-[var(--fg-accent)] font-semibold">Super Inteligenc[IA]</span> · Marcilio Drummond
        </p>
        <p className="text-[10px] text-[var(--fg-muted)]">
          Este guia e independente e nao possui vinculo oficial com o Google. Google Workspace e marca registrada do Google LLC.
        </p>
        <p className="text-[10px] text-[var(--fg-muted)]">
          @marcilio.drummond · Versao Marco/2026
        </p>
      </div>
    </footer>
  )
}
