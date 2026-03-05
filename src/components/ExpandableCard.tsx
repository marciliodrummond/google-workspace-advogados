import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Copy, Check, ExternalLink, ArrowRight, Lightbulb, Terminal } from 'lucide-react'
import { LevelBadge } from './LevelBadge'
import { CardIcon, Icon } from './Icons'
import type { Card } from '../data/sections'

interface ExpandableCardProps {
  card: Card
  isOpen: boolean
  onToggle: () => void
}

/* -- Inline formatting helper -- */
function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[var(--fg-primary)] font-semibold">$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[var(--fg-accent)] underline decoration-[var(--border-accent)] underline-offset-2 hover:decoration-[var(--fg-accent)] transition-colors">$1</a>')
    .replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 rounded text-[11px] font-mono font-medium" style="background:var(--bg-surface);color:var(--fg-accent);border:1px solid var(--border-line)">$1</code>')
}

/* -- Parse content into structured blocks -- */
interface ContentBlock {
  type: 'paragraph' | 'heading' | 'code' | 'bullet-list' | 'numbered-list' | 'table' | 'spacer'
  lines: string[]
  lang?: string
}

function parseContent(text: string): ContentBlock[] {
  const rawLines = text.split('\n')
  const blocks: ContentBlock[] = []
  let i = 0

  while (i < rawLines.length) {
    const line = rawLines[i]
    const trimmed = line.trim()

    if (trimmed === '') {
      if (blocks.length === 0 || blocks[blocks.length - 1].type !== 'spacer') {
        blocks.push({ type: 'spacer', lines: [] })
      }
      i++
      continue
    }

    if (trimmed.startsWith('```')) {
      const lang = trimmed.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < rawLines.length && !rawLines[i].trim().startsWith('```')) {
        codeLines.push(rawLines[i])
        i++
      }
      i++
      blocks.push({ type: 'code', lines: codeLines, lang })
      continue
    }

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines: string[] = []
      while (i < rawLines.length && rawLines[i].trim().startsWith('|') && rawLines[i].trim().endsWith('|')) {
        tableLines.push(rawLines[i].trim())
        i++
      }
      blocks.push({ type: 'table', lines: tableLines })
      continue
    }

    if (/^\*\*.+?\*\*:?$/.test(trimmed) || /^\*\*.+?\*\*:?\s*$/.test(trimmed)) {
      blocks.push({ type: 'heading', lines: [trimmed] })
      i++
      continue
    }

    if (trimmed.startsWith('- ')) {
      const listLines: string[] = []
      while (i < rawLines.length && rawLines[i].trim().startsWith('- ')) {
        listLines.push(rawLines[i].trim().slice(2))
        i++
      }
      blocks.push({ type: 'bullet-list', lines: listLines })
      continue
    }

    if (/^(\d+\.|[IVXLC]+\.)/.test(trimmed)) {
      const listLines: string[] = []
      while (i < rawLines.length && /^(\d+\.|[IVXLC]+\.)/.test(rawLines[i].trim())) {
        listLines.push(rawLines[i].trim())
        i++
      }
      blocks.push({ type: 'numbered-list', lines: listLines })
      continue
    }

    blocks.push({ type: 'paragraph', lines: [trimmed] })
    i++
  }

  return blocks
}

/* -- Code block with copy -- */
function CodeBlock({ lines, lang }: { lines: string[]; lang?: string }) {
  const [copied, setCopied] = useState(false)
  const code = lines.join('\n')

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-3 rounded-lg border overflow-hidden" style={{ borderColor: 'var(--border-line)' }}>
      <div className="flex items-center justify-between px-3 py-1.5" style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-line)' }}>
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3 h-3 text-[var(--fg-muted)]" />
          <span className="text-[10px] font-mono font-medium text-[var(--fg-muted)] uppercase tracking-wider">
            {lang || 'terminal'}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium transition-all duration-200 cursor-pointer border"
          style={{
            background: copied ? 'rgba(34,197,94,0.1)' : 'transparent',
            borderColor: copied ? 'rgba(34,197,94,0.3)' : 'var(--border-line)',
            color: copied ? '#4ade80' : 'var(--fg-muted)',
          }}
        >
          {copied ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>
      <pre className="px-3.5 py-3 text-[12px] font-mono leading-relaxed overflow-x-auto" style={{
        background: 'var(--bg-page)',
        color: 'var(--fg-secondary)',
      }}>
        {code}
      </pre>
    </div>
  )
}

/* -- Render structured content blocks -- */
function ContentRenderer({ content }: { content: string }) {
  const blocks = parseContent(content)

  return (
    <div className="space-y-0">
      {blocks.map((block, bi) => {
        switch (block.type) {

          case 'spacer':
            return <div key={bi} className="h-2" />

          case 'heading':
            return (
              <div key={bi} className="pt-3 pb-1 first:pt-0">
                <h4
                  className="text-[13px] font-bold text-[var(--fg-primary)] tracking-[-0.01em] flex items-center gap-2"
                  dangerouslySetInnerHTML={{
                    __html: block.lines[0]
                      .replace(/^\*\*/, '')
                      .replace(/\*\*:?$/, '')
                      .replace(/\*\*:?\s*$/, '')
                  }}
                />
                <div className="w-8 h-px mt-1.5 bg-gradient-to-r from-[var(--fg-accent)] to-transparent opacity-40" />
              </div>
            )

          case 'code':
            return <CodeBlock key={bi} lines={block.lines} lang={block.lang} />

          case 'table':
            return <TableBlock key={bi} lines={block.lines} />

          case 'bullet-list':
            return (
              <ul key={bi} className="my-1.5 space-y-1 pl-0.5">
                {block.lines.map((item, li) => (
                  <li key={li} className="flex gap-2.5 text-sm text-[var(--fg-secondary)] leading-relaxed">
                    <span className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full bg-[var(--fg-accent)] opacity-60" />
                    <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
                  </li>
                ))}
              </ul>
            )

          case 'numbered-list':
            return (
              <ol className="my-1.5 space-y-1.5 pl-0.5">
                {block.lines.map((item, li) => {
                  const match = item.match(/^(\d+\.|[IVXLC]+\.)\s*(.*)/)
                  const num = match ? match[1].replace('.', '') : String(li + 1)
                  const text = match ? match[2] : item
                  return (
                    <li key={li} className="flex gap-2.5 text-sm text-[var(--fg-secondary)] leading-relaxed">
                      <span className="shrink-0 w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold mt-0.5" style={{
                        background: 'var(--bg-accent-subtle)',
                        color: 'var(--fg-accent)',
                        border: '1px solid var(--border-accent)',
                      }}>
                        {num}
                      </span>
                      <span dangerouslySetInnerHTML={{ __html: formatInline(text) }} />
                    </li>
                  )
                })}
              </ol>
            )

          case 'paragraph':
          default:
            return (
              <p
                key={bi}
                className="text-sm text-[var(--fg-secondary)] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatInline(block.lines[0]) }}
              />
            )
        }
      })}
    </div>
  )
}

/* -- Table rendering -- */
function TableBlock({ lines }: { lines: string[] }) {
  const rows = lines.filter(r => !r.match(/^\|[\s-:|]+\|$/))
  if (rows.length === 0) return null

  const headerCells = rows[0].split('|').filter(c => c.trim())
  const bodyRows = rows.slice(1)

  return (
    <div className="overflow-x-auto my-3 rounded-lg border" style={{ borderColor: 'var(--border-line)' }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ background: 'var(--bg-surface)' }}>
            {headerCells.map((cell, ci) => (
              <th
                key={ci}
                className="px-3 py-2.5 text-left text-[11px] font-bold text-[var(--fg-primary)] border-b uppercase tracking-wider font-mono"
                style={{ borderColor: 'var(--border-line)' }}
                dangerouslySetInnerHTML={{ __html: formatInline(cell.trim()) }}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, ri) => {
            const cells = row.split('|').filter(c => c.trim())
            return (
              <tr
                key={ri}
                className="border-b last:border-b-0 transition-colors hover:bg-[var(--bg-accent-subtle)]"
                style={{ borderColor: 'var(--border-line)' }}
              >
                {cells.map((cell, ci) => (
                  <td
                    key={ci}
                    className="px-3 py-2 text-sm text-[var(--fg-secondary)]"
                    dangerouslySetInnerHTML={{ __html: formatInline(cell.trim()) }}
                  />
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/* -- Copy button for prompts -- */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer border"
      style={{
        background: copied ? 'rgba(34,197,94,0.1)' : 'var(--bg-surface)',
        borderColor: copied ? 'rgba(34,197,94,0.3)' : 'var(--border-line)',
        color: copied ? '#4ade80' : 'var(--fg-secondary)',
      }}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Copiado!' : 'Copiar'}
    </button>
  )
}

/* ======================================
   MAIN COMPONENT
   ====================================== */

export function ExpandableCard({ card, isOpen, onToggle }: ExpandableCardProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [isOpen, card])

  return (
    <div
      className="rounded-xl border transition-all duration-300"
      style={{
        background: isOpen ? 'var(--bg-elevated)' : 'var(--bg-card)',
        borderColor: isOpen ? 'var(--border-accent)' : 'var(--border-line)',
        boxShadow: isOpen ? 'var(--gold-glow-sm)' : 'none',
      }}
    >
      {/* -- Card header (always visible) -- */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3.5 cursor-pointer bg-transparent border-none text-left"
      >
        <CardIcon name={card.icon} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-[var(--fg-primary)] truncate">{card.title}</h3>
            <LevelBadge level={card.level} />
          </div>
          {card.subtitle && (
            <p className="text-xs text-[var(--fg-muted)] mt-0.5 truncate">{card.subtitle}</p>
          )}
        </div>
        <ChevronDown
          className="w-4 h-4 shrink-0 text-[var(--fg-muted)] transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {/* -- Expandable content -- */}
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? `${height}px` : '0px', opacity: isOpen ? 1 : 0 }}
      >
        <div ref={contentRef} className="px-4 pb-5 pt-0">
          <div className="border-t pt-4" style={{ borderColor: 'var(--border-line)' }}>

            {/* -- Analogy callout -- */}
            {card.analogy && (
              <div className="mb-4 rounded-lg overflow-hidden border" style={{ borderColor: 'var(--border-accent)', borderLeftWidth: '3px', borderLeftColor: 'var(--fg-accent)' }}>
                <div className="p-3.5" style={{ background: 'rgba(66,133,244,0.05)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-3.5 h-3.5 text-[var(--fg-accent)]" />
                    <span className="text-[10px] font-bold text-[var(--fg-accent)] uppercase tracking-[0.08em] font-mono">
                      {card.analogy.tag || 'Analogia'}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--fg-secondary)] leading-relaxed" dangerouslySetInnerHTML={{
                    __html: formatInline(card.analogy.text)
                  }} />
                </div>
              </div>
            )}

            {/* -- Main content (parsed blocks) -- */}
            <ContentRenderer content={card.content} />

            {/* -- Element Grid -- */}
            {card.elementGrid && card.elementGrid.length > 0 && (
              <div className={`mt-5 grid gap-2.5 ${card.elementGrid.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                {card.elementGrid.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border p-3 transition-all duration-200 hover:border-[var(--border-accent)]"
                    style={{
                      background: item.highlight ? 'rgba(66,133,244,0.06)' : 'var(--bg-surface)',
                      borderColor: item.highlight ? 'var(--border-accent)' : 'var(--border-line)',
                      borderLeftWidth: item.highlight ? '3px' : '1px',
                      borderLeftColor: item.highlight ? 'var(--fg-accent)' : undefined,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'var(--bg-accent-subtle)' }}>
                        <Icon name={item.icon} size={13} className="text-[var(--fg-accent)]" />
                      </div>
                      <span className="text-sm font-semibold text-[var(--fg-primary)]">{item.name}</span>
                    </div>
                    {item.tech && (
                      <span className="inline-block text-[10px] font-mono text-[var(--fg-accent)] px-1.5 py-0.5 rounded mb-1.5" style={{ background: 'var(--bg-accent-subtle)' }}>
                        {item.tech}
                      </span>
                    )}
                    <p className="text-xs text-[var(--fg-secondary)] leading-relaxed" dangerouslySetInnerHTML={{
                      __html: formatInline(item.description)
                    }} />
                    {item.whenToUse && (
                      <p className="text-[11px] text-[var(--fg-muted)] mt-1.5 italic">
                        Quando usar: {item.whenToUse}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* -- Relationship Row -- */}
            {card.relationship && (
              <div className="mt-5 rounded-lg border p-3.5" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-accent)' }}>
                <h4 className="text-[11px] font-bold text-[var(--fg-accent)] uppercase tracking-[0.08em] mb-3 font-mono">{card.relationship.title}</h4>
                <div className="flex flex-wrap items-stretch gap-2">
                  {card.relationship.items.map((item, i) => (
                    <div key={i} className="flex items-stretch gap-2">
                      {i > 0 && card.relationship!.symbols && card.relationship!.symbols[i - 1] && (
                        <div className="flex items-center px-1">
                          <span className="text-lg font-bold text-[var(--fg-accent)]">{card.relationship!.symbols![i - 1]}</span>
                        </div>
                      )}
                      <div
                        className="rounded-lg border px-3 py-2 text-center"
                        style={{
                          flex: item.flex || 1,
                          minWidth: '80px',
                          background: item.highlight ? 'rgba(66,133,244,0.06)' : 'var(--bg-card)',
                          borderColor: item.highlight ? 'var(--fg-accent)' : 'var(--border-line)',
                        }}
                      >
                        <div className="text-[10px] font-mono font-bold text-[var(--fg-muted)] uppercase tracking-wider">{item.label}</div>
                        <div className="text-sm font-semibold text-[var(--fg-primary)] mt-0.5">{item.value}</div>
                        {item.sub && <div className="text-[11px] text-[var(--fg-secondary)] mt-0.5">{item.sub}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* -- Command List -- */}
            {card.commandList && card.commandList.length > 0 && (
              <div className="mt-5 rounded-lg border overflow-hidden" style={{ borderColor: 'var(--border-line)' }}>
                <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-line)' }}>
                  <Terminal className="w-3 h-3 text-[var(--fg-accent)]" />
                  <h4 className="text-[11px] font-bold text-[var(--fg-accent)] uppercase tracking-[0.08em] font-mono">Comandos</h4>
                </div>
                <div className="divide-y" style={{ borderColor: 'var(--border-line)' }}>
                  {card.commandList.map((cmd, i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-[var(--bg-accent-subtle)]" style={{ borderColor: 'var(--border-line)' }}>
                      <code className="shrink-0 text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ background: 'var(--bg-page)', color: 'var(--fg-accent)', border: '1px solid var(--border-line)' }}>
                        {cmd.command}
                      </code>
                      <span className="text-xs text-[var(--fg-secondary)]">{cmd.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* -- Checklist -- */}
            {card.checklist && card.checklist.length > 0 && (
              <div className="mt-5 space-y-3">
                {card.checklist.map((group, gi) => (
                  <div key={gi} className="rounded-lg border p-3.5" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-line)' }}>
                    <h4 className="text-[11px] font-bold text-[var(--fg-accent)] uppercase tracking-[0.08em] mb-2.5 font-mono flex items-center gap-2">
                      <Icon name="calendar" size={13} className="text-[var(--fg-accent)]" />
                      {group.title}
                    </h4>
                    <div className="space-y-0">
                      {group.items.map((item, ii) => (
                        <label key={ii} className="flex items-center gap-2.5 py-1.5 cursor-pointer border-b last:border-b-0" style={{ borderColor: 'var(--border-line)' }}>
                          <input type="checkbox" className="w-3.5 h-3.5 rounded accent-[var(--fg-accent)]" />
                          <span className="text-sm text-[var(--fg-secondary)]">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* -- Reference Table -- */}
            {card.refTable && card.refTable.length > 0 && (
              <div className="mt-5 overflow-x-auto rounded-lg border" style={{ borderColor: 'var(--border-line)' }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: 'var(--bg-surface)' }}>
                      <th className="px-3 py-2.5 text-left text-[11px] font-bold text-[var(--fg-primary)] border-b uppercase tracking-wider font-mono" style={{ borderColor: 'var(--border-line)' }}>Elemento</th>
                      <th className="px-3 py-2.5 text-left text-[11px] font-bold text-[var(--fg-primary)] border-b uppercase tracking-wider font-mono" style={{ borderColor: 'var(--border-line)' }}>Analogia</th>
                      <th className="px-3 py-2.5 text-left text-[11px] font-bold text-[var(--fg-primary)] border-b uppercase tracking-wider font-mono" style={{ borderColor: 'var(--border-line)' }}>Configurar?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {card.refTable.map((row, ri) => (
                      <tr key={ri} className="border-b last:border-b-0 transition-colors hover:bg-[var(--bg-accent-subtle)]" style={{ borderColor: 'var(--border-line)' }}>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <Icon name={row.icon} size={14} className="text-[var(--fg-accent)]" />
                            <span className="text-sm font-medium text-[var(--fg-primary)]">{row.element}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2 text-[var(--fg-secondary)] text-xs">{row.analogy}</td>
                        <td className="px-3 py-2">
                          <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full" style={{
                            background: row.config === 'nao' ? 'rgba(34,197,94,0.1)' : row.config === 'auto' ? 'rgba(59,130,246,0.1)' : 'rgba(66,133,244,0.1)',
                            color: row.config === 'nao' ? '#22c55e' : row.config === 'auto' ? '#3b82f6' : 'var(--fg-accent)',
                          }}>
                            {row.configLabel}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* -- Steps -- */}
            {card.steps && card.steps.length > 0 && (
              <div className="mt-5 rounded-lg p-3.5 border" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-line)' }}>
                <h4 className="text-[11px] font-bold text-[var(--fg-accent)] uppercase tracking-[0.08em] mb-3 font-mono flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3" />
                  Passo a Passo
                </h4>
                <ol className="space-y-2">
                  {card.steps.map((step, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-[var(--fg-secondary)] leading-relaxed">
                      <span className="shrink-0 w-5.5 h-5.5 rounded-md flex items-center justify-center text-[10px] font-bold mt-0.5" style={{
                        background: 'linear-gradient(135deg, var(--bg-accent), var(--bg-accent-hover))',
                        color: 'var(--fg-on-accent)',
                      }}>
                        {i + 1}
                      </span>
                      <span dangerouslySetInnerHTML={{ __html: formatInline(step) }} />
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* -- Tips -- */}
            {card.tips && card.tips.length > 0 && (
              <div className="mt-4 rounded-lg p-3.5 border" style={{ background: 'rgba(66,133,244,0.04)', borderColor: 'var(--border-accent)' }}>
                <h4 className="text-[11px] font-bold text-[var(--fg-accent)] uppercase tracking-[0.08em] mb-2.5 font-mono flex items-center gap-1.5">
                  <Lightbulb className="w-3 h-3" />
                  Dicas
                </h4>
                <ul className="space-y-1.5">
                  {card.tips.map((tip, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-[var(--fg-secondary)] leading-relaxed">
                      <span className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full bg-[var(--fg-accent)] opacity-60" />
                      <span dangerouslySetInnerHTML={{ __html: formatInline(tip) }} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* -- Flow Steps -- */}
            {card.flowSteps && card.flowSteps.length > 0 && (
              <div className="mt-5 rounded-lg p-3.5 border" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-accent)' }}>
                <h4 className="text-[11px] font-bold text-[var(--fg-accent)] uppercase tracking-[0.08em] mb-3.5 font-mono">Fluxo Visual</h4>
                <div className="flex flex-col gap-0">
                  {card.flowSteps.map((fs, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0" style={{
                          background: 'linear-gradient(135deg, var(--bg-accent), var(--bg-accent-hover))',
                          color: 'var(--fg-on-accent)',
                          boxShadow: '0 0 12px rgba(66,133,244,0.15)',
                        }}>
                          {i + 1}
                        </div>
                        {i < card.flowSteps!.length - 1 && (
                          <div className="w-px h-6 my-1" style={{ background: 'linear-gradient(to bottom, var(--fg-accent), transparent)' }} />
                        )}
                      </div>
                      <div className="pb-2">
                        <span className="text-sm font-semibold text-[var(--fg-primary)]">{fs.title}</span>
                        <p className="text-xs text-[var(--fg-secondary)] mt-0.5 leading-relaxed">{fs.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* -- Prompt -- */}
            {card.prompt && (
              <div className="mt-4 rounded-lg border overflow-hidden" style={{ borderColor: 'var(--border-line)' }}>
                <div className="flex items-center justify-between px-3.5 py-2" style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-line)' }}>
                  <h4 className="text-[11px] font-bold text-[var(--fg-accent)] uppercase tracking-[0.08em] font-mono flex items-center gap-1.5">
                    <Terminal className="w-3 h-3" />
                    Template Pronto
                  </h4>
                  <CopyButton text={card.prompt} />
                </div>
                <pre className="px-3.5 py-3 text-[12px] text-[var(--fg-secondary)] whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto" style={{
                  background: 'var(--bg-page)',
                }}>
                  {card.prompt}
                </pre>
              </div>
            )}

            {/* -- Links -- */}
            {card.links && card.links.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {card.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 no-underline border hover:border-[var(--border-accent)] hover:text-[var(--fg-accent)] hover:bg-[var(--bg-accent-subtle)]"
                    style={{
                      borderColor: 'var(--border-line)',
                      color: 'var(--fg-secondary)',
                      background: 'var(--bg-surface)',
                    }}
                  >
                    <ExternalLink className="w-3 h-3" />
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-50" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
