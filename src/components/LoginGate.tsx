import { useState, useRef, useEffect } from 'react'
import { KeyRound, AlertCircle, Eye, EyeOff, ArrowRight } from 'lucide-react'

const ACCESS_KEY = '9025GwAdv104'
const STORAGE_KEY = 'si-gworkspace-advogados-auth'

interface LoginGateProps {
  onAuthenticated: () => void
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })

  const authenticate = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // sessionStorage indisponivel
    }
    setIsAuthenticated(true)
  }

  return { isAuthenticated, authenticate }
}

/* Floating particles for ambient depth */
function Particles() {
  const count = 24
  const particles = Array.from({ length: count }, (_, i) => {
    const size = 2 + Math.random() * 3
    const left = Math.random() * 100
    const delay = Math.random() * 8
    const duration = 6 + Math.random() * 10
    const opacity = 0.15 + Math.random() * 0.35
    return (
      <div
        key={i}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size,
          height: size,
          left: `${left}%`,
          bottom: '-5%',
          opacity: 0,
          background: `rgba(66, 133, 244, ${opacity})`,
          animation: `particleRise ${duration}s ease-in-out ${delay}s infinite`,
        }}
      />
    )
  })
  return <>{particles}</>
}

/* Google Workspace style logo */
function GWLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 780 780" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M390 0L693.8 175V525L390 700L86.2 525V175L390 0Z"
        fill="none"
        stroke="url(#logoGrad)"
        strokeWidth="48"
        strokeLinejoin="round"
      />
      <path
        d="M390 140L598 260V500L390 620L182 500V260L390 140Z"
        fill="none"
        stroke="url(#logoGrad2)"
        strokeWidth="36"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="logoGrad" x1="86" y1="0" x2="694" y2="700">
          <stop offset="0%" stopColor="#4285f4" />
          <stop offset="50%" stopColor="#34a853" />
          <stop offset="100%" stopColor="#fbbc04" />
        </linearGradient>
        <linearGradient id="logoGrad2" x1="182" y1="140" x2="598" y2="620">
          <stop offset="0%" stopColor="#4285f4" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ea4335" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function LoginGate({ onAuthenticated }: LoginGateProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [shake, setShake] = useState(false)
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ACCESS_KEY) {
      onAuthenticated()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 600)
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-hidden" style={{ background: 'var(--bg-page)' }}>

      {/* Grid background overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(var(--grid-color) 1px, transparent 1px),
          linear-gradient(90deg, var(--grid-color) 1px, transparent 1px),
          linear-gradient(var(--grid-accent) 1px, transparent 1px),
          linear-gradient(90deg, var(--grid-accent) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px, 60px 60px, 300px 300px, 300px 300px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)',
      }} />

      {/* Animated ambient orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none blur-[120px] animate-[orbFloat_14s_ease-in-out_infinite]" style={{
        background: 'radial-gradient(circle, rgba(66,133,244,0.14) 0%, transparent 70%)',
      }} />
      <div className="absolute bottom-[-5%] left-[-10%] w-[450px] h-[450px] rounded-full pointer-events-none blur-[120px] animate-[orbFloat_14s_ease-in-out_infinite_-5s]" style={{
        background: 'radial-gradient(circle, rgba(52,168,83,0.10) 0%, transparent 70%)',
      }} />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none blur-[150px] animate-[orbFloat_18s_ease-in-out_infinite_-8s]" style={{
        background: 'radial-gradient(circle, rgba(251,188,4,0.06) 0%, transparent 60%)',
      }} />

      {/* Floating particles */}
      <Particles />

      {/* Main content */}
      <div
        className={`relative z-10 w-full max-w-[440px] ${shake ? 'animate-[shakeX_0.5s_ease]' : ''}`}
        style={{ animation: shake ? undefined : 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both' }}
      >
        {/* Branding section */}
        <div className="text-center mb-10" style={{ animation: 'fadeUp 0.8s ease 0.1s both' }}>

          {/* Logo with glow */}
          <div className="relative inline-flex items-center justify-center mb-7">
            <div className="absolute w-28 h-28 rounded-full blur-[40px]" style={{
              background: 'radial-gradient(circle, rgba(66,133,244,0.25) 0%, transparent 70%)',
              animation: 'loginPulse 4s ease-in-out infinite',
            }} />
            <GWLogo className="relative w-20 h-20 sm:w-24 sm:h-24" />
          </div>

          {/* Label line */}
          <div className="flex items-center justify-center gap-2.5 mb-4" style={{ animation: 'fadeIn 1s ease 0.2s both' }}>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-[var(--fg-accent)] to-transparent" />
            <span className="font-mono text-[10px] font-medium text-[var(--fg-accent)] uppercase tracking-[0.15em]">
              Acesso Exclusivo
            </span>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-[var(--fg-accent)] to-transparent" />
          </div>

          {/* Title with gradient */}
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-[-0.04em] leading-[1.1] text-[var(--fg-primary)]">
            Google Workspace para{' '}
            <span className="bg-gradient-to-br from-gblue-300 via-gblue-500 to-gblue-400 bg-clip-text text-transparent">
              Advogados
            </span>
          </h1>

          <p className="text-sm text-[var(--fg-secondary)] mt-3 max-w-[320px] mx-auto leading-relaxed">
            Conteudo reservado para membros do programa{' '}
            <span className="text-[var(--fg-accent)] font-medium">Super Inteligenc[IA]</span>
          </p>
        </div>

        {/* Login card with glassmorphism */}
        <div
          className="relative rounded-2xl border overflow-hidden"
          style={{
            background: 'var(--bg-card)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderColor: focused ? 'var(--border-accent)' : 'var(--border-line)',
            boxShadow: focused
              ? '0 0 60px rgba(66,133,244,0.08), 0 8px 32px rgba(0,0,0,0.4)'
              : '0 8px 32px rgba(0,0,0,0.3)',
            transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
            animation: 'fadeUp 0.8s ease 0.25s both',
          }}
        >
          {/* Shimmer top border */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{
            background: 'linear-gradient(90deg, transparent, rgba(66,133,244,0.3), transparent)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 4s ease-in-out infinite',
          }} />

          <div className="p-7 sm:p-9">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-[var(--fg-secondary)] uppercase tracking-[0.08em] font-mono mb-2.5">
                  <KeyRound className="w-3.5 h-3.5 text-[var(--fg-accent)]" />
                  Chave de Acesso
                </label>

                <div className="relative group">
                  <input
                    ref={inputRef}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(false) }}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="Digite a chave de acesso"
                    className="w-full h-13 px-4 pr-12 rounded-xl border text-sm font-sans outline-none transition-all duration-300"
                    style={{
                      background: 'var(--bg-surface)',
                      borderColor: error ? '#ef4444' : focused ? 'var(--border-focus)' : 'var(--border-line)',
                      color: 'var(--fg-primary)',
                      boxShadow: focused ? 'var(--gold-glow-sm), inset 0 1px 0 rgba(66,133,244,0.05)' : 'none',
                    }}
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--fg-muted)] hover:text-[var(--fg-accent)] cursor-pointer bg-transparent border-none transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>

                {/* Error message */}
                <div className={`flex items-center gap-1.5 mt-2.5 transition-all duration-300 ${error ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'}`}>
                  <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span className="text-xs text-red-400 font-medium">Chave de acesso incorreta. Tente novamente.</span>
                </div>
              </div>

              <button
                type="submit"
                className="group/btn relative w-full h-13 rounded-xl text-sm font-semibold cursor-pointer border-none transition-all duration-300 hover:scale-[1.015] active:scale-[0.985] flex items-center justify-center gap-2.5 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, var(--bg-accent), var(--bg-accent-hover))',
                  color: 'var(--fg-on-accent)',
                  boxShadow: '0 0 30px rgba(66,133,244,0.15), 0 4px 12px rgba(0,0,0,0.2)',
                }}
              >
                {/* Button shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s ease-in-out infinite',
                }} />
                <span className="relative z-10 flex items-center gap-2">
                  Acessar Guia
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-7" style={{ animation: 'fadeIn 1s ease 0.6s both' }}>
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <div className="w-5 h-px" style={{ background: 'var(--border-line)' }} />
            <span className="font-mono text-[9px] text-[var(--fg-muted)] uppercase tracking-[0.12em]">
              Super Inteligenc[IA]
            </span>
            <div className="w-5 h-px" style={{ background: 'var(--border-line)' }} />
          </div>
          <p className="text-[10px] text-[var(--fg-muted)]">
            Guia interativo para montar seu escritorio digital com Google Workspace
          </p>
        </div>
      </div>
    </div>
  )
}
