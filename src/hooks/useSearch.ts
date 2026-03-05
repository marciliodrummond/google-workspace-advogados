import { useState, useMemo, useCallback } from 'react'
import { sections } from '../data/sections'

export interface SearchResult {
  sectionId: string
  sectionTitle: string
  sectionIcon: string
  cardTitle: string
  cardSubtitle: string
  cardIndex: number
  cardLevel: string
  cardIcon: string
  snippet: string
  score: number
  matchType: 'exact' | 'synonym' | 'intent' | 'fuzzy'
}

export interface Suggestion {
  query: string
  label: string
  icon: string
}

// ── Popular suggestions shown on focus ──────────────────────

export const popularSuggestions: Suggestion[] = [
  { query: 'gmail', label: 'Gmail Profissional', icon: 'mail' },
  { query: 'drive', label: 'Google Drive', icon: 'hard-drive' },
  { query: 'como comecar', label: 'Primeiros Passos', icon: 'rocket' },
  { query: 'sheets', label: 'Planilhas e Dados', icon: 'table' },
  { query: 'prazo', label: 'Controle de Prazos', icon: 'clock' },
  { query: 'gemini', label: 'Gemini AI', icon: 'sparkles' },
  { query: 'seguranca', label: 'Seguranca e LGPD', icon: 'shield' },
  { query: 'automacao', label: 'Automacoes', icon: 'zap' },
  { query: 'meet', label: 'Audiencias Virtuais', icon: 'video' },
  { query: 'calendar', label: 'Agenda e Prazos', icon: 'calendar' },
]

// ── Normalization ───────────────────────────────────────────

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// ── Fuzzy matching (Levenshtein distance) ───────────────────

function levenshtein(a: string, b: string): number {
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length
  const m: number[][] = []
  for (let i = 0; i <= b.length; i++) m[i] = [i]
  for (let j = 0; j <= a.length; j++) m[0][j] = j
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      m[i][j] = Math.min(
        m[i - 1][j] + 1,
        m[i][j - 1] + 1,
        m[i - 1][j - 1] + (b[i - 1] === a[j - 1] ? 0 : 1)
      )
    }
  }
  return m[b.length][a.length]
}

function fuzzyMatchScore(query: string, target: string): number {
  if (query.length < 4) return 0
  const targetWords = target.split(' ')
  let bestScore = 0
  for (const word of targetWords) {
    if (word.length < 3) continue
    const dist = levenshtein(query, word)
    const maxLen = Math.max(query.length, word.length)
    if (dist <= Math.floor(maxLen * 0.3) && dist > 0) {
      bestScore = Math.max(bestScore, 1 - dist / maxLen)
    }
  }
  return bestScore
}

// ── Synonym map (Google Workspace for lawyers) ──────────────

const synonyms: Record<string, string[]> = {
  // Gmail e comunicacao
  'gmail': ['gmail', 'email', 'e mail', 'correio', 'comunicacao', 'assinatura', 'filtro', 'marcador'],
  'email': ['gmail', 'email', 'e mail', 'correio', 'comunicacao', 'mensagem'],
  'correio': ['gmail', 'email', 'comunicacao'],
  'assinatura': ['assinatura', 'gmail', 'email', 'profissional', 'identidade'],
  'filtro': ['filtro', 'marcador', 'gmail', 'regra', 'organizacao'],
  'marcador': ['marcador', 'label', 'filtro', 'gmail', 'organizacao'],

  // Google Drive
  'drive': ['drive', 'google drive', 'armazenamento', 'nuvem', 'pasta', 'arquivo'],
  'pasta': ['pasta', 'drive', 'organizacao', 'estrutura', 'diretorio'],
  'arquivo': ['arquivo', 'documento', 'drive', 'armazenamento'],
  'nuvem': ['nuvem', 'cloud', 'drive', 'armazenamento', 'backup'],
  'compartilhar': ['compartilhar', 'compartilhamento', 'drive', 'permissao', 'acesso'],
  'armazenamento': ['armazenamento', 'drive', 'nuvem', 'espaco', 'storage'],

  // Google Docs
  'docs': ['docs', 'google docs', 'documento', 'texto', 'peticao', 'contrato'],
  'documento': ['documento', 'docs', 'peticao', 'contrato', 'texto'],
  'peticao': ['peticao', 'peca', 'processual', 'docs', 'documento', 'modelo'],
  'contrato': ['contrato', 'docs', 'modelo', 'template', 'clausula'],
  'procuracao': ['procuracao', 'docs', 'modelo', 'template', 'mandato'],

  // Google Sheets
  'sheets': ['sheets', 'google sheets', 'planilha', 'tabela', 'dados', 'financeiro'],
  'planilha': ['planilha', 'sheets', 'tabela', 'calculo', 'dados'],
  'financeiro': ['financeiro', 'sheets', 'honorario', 'fluxo de caixa', 'receita', 'despesa'],
  'dashboard': ['dashboard', 'painel', 'sheets', 'grafico', 'relatorio'],
  'honorario': ['honorario', 'financeiro', 'cobranca', 'sheets', 'pagamento'],

  // Google Slides
  'slides': ['slides', 'google slides', 'apresentacao', 'sustentacao oral'],
  'apresentacao': ['apresentacao', 'slides', 'sustentacao', 'oral'],
  'sustentacao': ['sustentacao', 'slides', 'apresentacao', 'oral', 'tribunal'],

  // Google Meet
  'meet': ['meet', 'google meet', 'videoconferencia', 'audiencia', 'reuniao'],
  'videoconferencia': ['videoconferencia', 'meet', 'video', 'chamada'],
  'audiencia': ['audiencia', 'meet', 'virtual', 'tribunal', 'videoconferencia'],
  'reuniao': ['reuniao', 'meet', 'videoconferencia', 'cliente'],

  // Google Calendar
  'calendar': ['calendar', 'google calendar', 'agenda', 'prazo', 'compromisso'],
  'agenda': ['agenda', 'calendar', 'prazo', 'compromisso', 'horario'],
  'prazo': ['prazo', 'calendar', 'deadline', 'vencimento', 'alerta', 'controle'],
  'deadline': ['deadline', 'prazo', 'vencimento', 'calendar'],

  // Google Chat
  'chat': ['chat', 'google chat', 'mensagem', 'comunicacao', 'equipe'],

  // Google Forms
  'forms': ['forms', 'google forms', 'formulario', 'questionario', 'intake'],
  'formulario': ['formulario', 'forms', 'questionario', 'cadastro', 'intake'],
  'intake': ['intake', 'forms', 'formulario', 'triagem', 'cliente'],

  // Google Sites
  'sites': ['sites', 'google sites', 'website', 'pagina', 'escritorio'],
  'website': ['website', 'sites', 'pagina', 'internet', 'presenca digital'],

  // Admin Console
  'admin': ['admin', 'console', 'administracao', 'configuracao', 'gerenciamento'],
  'console': ['console', 'admin', 'administracao', 'painel'],
  'usuario': ['usuario', 'admin', 'conta', 'acesso', 'permissao'],

  // Google Vault
  'vault': ['vault', 'google vault', 'ediscovery', 'retencao', 'compliance'],
  'ediscovery': ['ediscovery', 'vault', 'retencao', 'busca', 'juridico'],

  // AppSheet
  'appsheet': ['appsheet', 'app', 'aplicativo', 'no code', 'automacao'],
  'app': ['app', 'appsheet', 'aplicativo', 'mobile'],
  'no code': ['no code', 'appsheet', 'sem codigo', 'low code'],

  // Apps Script
  'apps script': ['apps script', 'script', 'codigo', 'automacao', 'macro'],
  'script': ['script', 'apps script', 'codigo', 'automacao', 'programacao'],
  'macro': ['macro', 'apps script', 'automacao', 'script'],

  // Gemini AI
  'gemini': ['gemini', 'ia', 'inteligencia artificial', 'ai', 'assistente'],
  'ia': ['ia', 'gemini', 'inteligencia artificial', 'ai', 'automacao'],
  'inteligencia artificial': ['inteligencia artificial', 'ia', 'gemini', 'ai'],

  // NotebookLM
  'notebooklm': ['notebooklm', 'notebook', 'pesquisa', 'resumo', 'analise'],
  'notebook': ['notebook', 'notebooklm', 'pesquisa', 'estudo'],

  // Seguranca
  'seguranca': ['seguranca', '2fa', 'autenticacao', 'senha', 'protecao', 'lgpd'],
  '2fa': ['2fa', 'autenticacao', 'verificacao', 'seguranca', 'dois fatores'],
  'senha': ['senha', 'password', 'seguranca', 'politica'],
  'lgpd': ['lgpd', 'protecao de dados', 'privacidade', 'seguranca', 'compliance'],
  'sigilo': ['sigilo', 'confidencialidade', 'seguranca', 'profissional', 'etica'],
  'dlp': ['dlp', 'prevencao perda dados', 'seguranca', 'protecao'],
  'auditoria': ['auditoria', 'log', 'registro', 'compliance', 'admin'],

  // Etica e regulamentacao
  'etica': ['etica', 'oab', 'cnj', 'regulamentacao', 'resolucao', 'norma'],
  'oab': ['oab', 'etica', 'regulamentacao', 'codigo', 'disciplinar'],
  'cnj': ['cnj', 'resolucao 615', 'regulamentacao', 'judiciario'],

  // Automacao
  'automacao': ['automacao', 'automatizar', 'workflow', 'appsheet', 'apps script', 'regra'],
  'automatizar': ['automatizar', 'automacao', 'workflow', 'script'],
  'zapier': ['zapier', 'make', 'integracao', 'automacao', 'webhook'],
  'make': ['make', 'zapier', 'integracao', 'automacao'],
  'workflow': ['workflow', 'fluxo', 'automacao', 'processo', 'aprovacao'],

  // Primeiros passos
  'comecar': ['primeiros passos', 'configurar', 'inicio', 'basico', 'ativar'],
  'inicio': ['primeiros passos', 'configurar', 'comecar', 'ativar'],
  'configurar': ['configuracao', 'setup', 'admin', 'personalizar'],
  'plano': ['plano', 'preco', 'custo', 'business', 'enterprise', 'assinatura'],
  'preco': ['preco', 'custo', 'plano', 'valor', 'mensalidade'],
  'custo': ['custo', 'preco', 'plano', 'roi', 'economia', 'beneficio'],
  'dominio': ['dominio', 'adv br', 'registro', 'profissional'],

  // Areas do direito
  'trabalhista': ['trabalhista', 'clt', 'tst', 'rescisao'],
  'tributario': ['tributario', 'imposto', 'fiscal'],
  'familia': ['familia', 'divorcio', 'guarda', 'alimentos'],
  'empresarial': ['empresarial', 'societario', 'contrato'],

  // Implementacao e casos
  'escritorio': ['escritorio', 'implementar', 'equipe', 'solo', 'pequeno', 'medio'],
  'migracao': ['migracao', 'migrar', 'papel', 'digital', 'transicao'],
  'template': ['template', 'modelo', 'pronto', 'exemplo'],
  'modelo': ['modelo', 'template', 'pronto', 'exemplo'],
  'atalho': ['atalho', 'teclado', 'shortcut', 'produtividade'],
  'extensao': ['extensao', 'chrome', 'addon', 'complemento'],

  // Comparacao
  'microsoft': ['microsoft', 'office 365', 'm365', 'comparacao', 'alternativa'],
  'office': ['office', 'microsoft', 'm365', 'comparacao'],
  'comparar': ['comparacao', 'microsoft', 'office', 'versus', 'diferenca'],

  // Problemas
  'problema': ['problema', 'erro', 'resolver', 'ajuda', 'nao funciona'],
  'erro': ['erro', 'problema', 'falha', 'nao funciona'],
  'ajuda': ['ajuda', 'suporte', 'problema', 'resolver'],

  // Backup e sincronizacao
  'backup': ['backup', 'copia', 'seguranca', 'sincronizacao', 'drive'],
  'sincronizacao': ['sincronizacao', 'sync', 'backup', 'drive', 'desktop'],

  // Keep e Tasks
  'keep': ['keep', 'nota', 'anotacao', 'lembrete'],
  'tasks': ['tasks', 'tarefa', 'lista', 'pendencia'],
  'tarefa': ['tarefa', 'tasks', 'pendencia', 'fazer'],

  // Busca
  'busca': ['busca', 'pesquisa', 'procurar', 'encontrar', 'drive'],
  'pesquisa': ['pesquisa', 'busca', 'notebooklm', 'jurisprudencia'],

  // Respostas e templates de email
  'resposta automatica': ['resposta automatica', 'ferias', 'gmail', 'ausencia'],
  'canned response': ['canned response', 'resposta padrao', 'gmail', 'template'],

  // Integracao
  'integracao': ['integracao', 'calendar', 'meet', 'gmail', 'conectar', 'zapier'],
  'conectar': ['conectar', 'integracao', 'api', 'webhook'],
}

// ── Intent map (Google Workspace for lawyers) ───────────────

const intentMap: Record<string, string[]> = {
  // Primeiros passos
  'como comecar': ['O que e o Google Workspace', 'Escolhendo o Plano Ideal', 'Ativando sua Conta'],
  'quanto custa': ['Escolhendo o Plano Ideal', 'Calculadora de ROI'],
  'qual plano': ['Escolhendo o Plano Ideal', 'Comparacao Google Workspace vs Microsoft'],
  'como ativar': ['Ativando sua Conta', 'Configurando o Admin Console'],
  'como configurar': ['Configurando o Admin Console', 'Criando Usuarios e Grupos'],

  // Gmail
  'configurar email': ['Gmail Profissional com Dominio Proprio', 'Assinatura de Email Profissional'],
  'email profissional': ['Gmail Profissional com Dominio Proprio', 'Assinatura de Email Profissional'],
  'filtrar email': ['Marcadores Filtros e Organizacao'],
  'organizar email': ['Marcadores Filtros e Organizacao'],
  'assinatura email': ['Assinatura de Email Profissional'],
  'email automatico': ['Respostas Automaticas e Ferias'],
  'caixa compartilhada': ['Caixa de Email Compartilhada'],

  // Drive
  'organizar arquivos': ['Estrutura de Pastas no Drive', 'Convencoes de Nomenclatura'],
  'compartilhar arquivo': ['Compartilhamento Seguro'],
  'buscar arquivo': ['Busca Avancada no Drive'],
  'sincronizar arquivos': ['Backup e Sincronizacao'],

  // Docs
  'criar peticao': ['Peticoes e Pecas no Google Docs', 'Template de Contrato'],
  'modelo contrato': ['Template de Contrato', 'Template de Procuracao'],
  'colaborar documento': ['Colaboracao em Tempo Real', 'Historico de Versoes'],
  'formatar documento': ['Formatacao ABNT no Docs'],
  'historico versao': ['Historico de Versoes'],

  // Sheets
  'controle financeiro': ['Controle Financeiro com Sheets', 'Dashboard de Indicadores'],
  'planilha honorario': ['Controle Financeiro com Sheets'],
  'criar dashboard': ['Dashboard de Indicadores'],
  'controle prazo': ['Controle de Prazos Processuais', 'Alertas Automaticos de Prazo'],

  // Meet e Calendar
  'audiencia virtual': ['Meet para Audiencias Virtuais', 'Fluxo Audiencia Virtual'],
  'agendar reuniao': ['Calendar para Prazos e Compromissos'],
  'videoconferencia': ['Meet para Audiencias Virtuais'],
  'controlar agenda': ['Calendar para Prazos e Compromissos'],
  'integracao calendar': ['Integracao Calendar Meet Gmail'],

  // Seguranca
  'proteger dados': ['Autenticacao em Duas Etapas', 'Politicas de Senha', 'Compliance com LGPD'],
  'lgpd escritorio': ['Compliance com LGPD', 'Protecao do Sigilo Profissional'],
  'seguranca dados': ['Autenticacao em Duas Etapas', 'Prevencao contra Perda de Dados'],
  'sigilo profissional': ['Protecao do Sigilo Profissional'],
  'auditoria acesso': ['Logs de Auditoria'],

  // Automacao
  'automatizar escritorio': ['AppSheet Aplicativos sem Codigo', 'Apps Script para Advogados'],
  'criar aplicativo': ['AppSheet Aplicativos sem Codigo'],
  'automatizar email': ['Regras Automaticas de Email'],
  'alerta prazo': ['Alertas Automaticos de Prazo'],
  'integrar ferramentas': ['Integracoes Externas'],
  'fluxo aprovacao': ['Workflows de Aprovacao'],

  // Gemini e IA
  'usar gemini': ['Gemini no Google Workspace', 'Gemini no Gmail e Docs'],
  'ia no gmail': ['Gemini no Gmail e Docs'],
  'ia planilha': ['Gemini no Sheets e Slides'],
  'ia reuniao': ['Gemini no Meet'],
  'pesquisa ia': ['NotebookLM para Pesquisa Juridica'],
  'limites ia': ['Limites e Boas Praticas da IA'],

  // Etica
  'etica ia': ['Normas da OAB sobre Tecnologia'],
  'regras oab': ['Normas da OAB sobre Tecnologia'],
  'cnj 615': ['Resolucao CNJ 615 2025'],
  'responsabilidade ia': ['Responsabilidade por Erros de IA'],
  'consentimento': ['Consentimento e Transparencia'],

  // Casos praticos
  'advogado solo': ['Advogado Solo Escritorio Completo'],
  'escritorio pequeno': ['Escritorio Pequeno 5 Advogados'],
  'escritorio medio': ['Escritorio Medio 20 Advogados'],
  'migrar papel digital': ['Migracao Papel para Digital'],
  'calcular roi': ['Calculadora de Custo Beneficio'],

  // Recursos
  'atalhos teclado': ['Atalhos de Teclado Essenciais'],
  'extensoes chrome': ['Extensoes Chrome Recomendadas'],
  'suporte google': ['Comunidade e Suporte'],
  'comparar microsoft': ['Google Workspace vs Microsoft 365'],
  'resolver problema': ['FAQ e Solucao de Problemas'],

  // Fluxos
  'fluxo cliente peticao': ['Do Cliente a Peticao'],
  'fluxo controle prazo': ['Controle Total de Prazos'],
  'fluxo audiencia': ['Fluxo Audiencia Virtual'],
}

// ── Multi-field weighted scoring ────────────────────────────

interface FieldScore {
  text: string
  weight: number
}

function buildSearchFields(card: typeof sections[0]['cards'][0]): FieldScore[] {
  return [
    { text: normalize(card.title), weight: 25 },
    { text: normalize(card.subtitle || ''), weight: 15 },
    { text: normalize(card.analogy?.text || ''), weight: 8 },
    { text: normalize(card.content), weight: 4 },
    { text: normalize((card.tips || []).join(' ')), weight: 3 },
    { text: normalize((card.steps || []).join(' ')), weight: 3 },
    { text: normalize(card.prompt || ''), weight: 5 },
    { text: normalize((card.commandList || []).map(c => `${c.command} ${c.description}`).join(' ')), weight: 7 },
    { text: normalize((card.flowSteps || []).map(f => `${f.title} ${f.description}`).join(' ')), weight: 4 },
    { text: normalize((card.elementGrid || []).map(e => `${e.name} ${e.description} ${e.whenToUse || ''}`).join(' ')), weight: 5 },
    { text: normalize((card.links || []).map(l => l.label).join(' ')), weight: 2 },
    { text: normalize((card.checklist || []).map(g => `${g.title} ${g.items.join(' ')}`).join(' ')), weight: 3 },
    { text: normalize(card.relationship?.title || ''), weight: 3 },
    { text: normalize((card.relationship?.items || []).map(r => `${r.label} ${r.value} ${r.sub || ''}`).join(' ')), weight: 3 },
    { text: normalize((card.refTable || []).map(r => `${r.element} ${r.analogy}`).join(' ')), weight: 3 },
  ]
}

// ── Synonym expansion ───────────────────────────────────────

function getExpandedTerms(query: string): { original: string[], expanded: string[] } {
  const normalized = normalize(query)
  const words = normalized.split(' ').filter(w => w.length >= 2)
  const original = [normalized, ...words]
  const expanded: string[] = []

  for (const word of words) {
    for (const [key, alts] of Object.entries(synonyms)) {
      const normKey = normalize(key)
      if (word === normKey || normKey.startsWith(word) || word.startsWith(normKey)) {
        expanded.push(...alts.map(normalize))
      }
    }
  }

  // Also check the full query as a synonym key
  for (const [key, alts] of Object.entries(synonyms)) {
    const normKey = normalize(key)
    if (normalized.includes(normKey) || normKey.includes(normalized)) {
      expanded.push(...alts.map(normalize))
    }
  }

  return {
    original: [...new Set(original)],
    expanded: [...new Set(expanded)],
  }
}

// ── Intent detection ────────────────────────────────────────

function getIntentBoosts(query: string): string[] {
  const normalized = normalize(query)
  const boosts: string[] = []

  for (const [intent, titles] of Object.entries(intentMap)) {
    const normIntent = normalize(intent)
    const intentWords = normIntent.split(' ')
    const queryWords = normalized.split(' ')

    // Check if query matches intent (50%+ word overlap)
    const matchCount = intentWords.filter(iw =>
      queryWords.some(qw => qw.includes(iw) || iw.includes(qw))
    ).length

    if (matchCount >= Math.ceil(intentWords.length * 0.5)) {
      boosts.push(...titles.map(normalize))
    }
  }

  return [...new Set(boosts)]
}

// ── Snippet extraction with context ─────────────────────────

function extractSnippet(fields: FieldScore[], queryNorm: string, card: typeof sections[0]['cards'][0]): string {
  const allText = fields.map(f => f.text).join(' ')
  const idx = allText.indexOf(queryNorm)

  if (idx >= 0) {
    const start = Math.max(0, idx - 30)
    const end = Math.min(allText.length, idx + queryNorm.length + 70)
    const raw = allText.slice(start, end).trim()
    return (start > 0 ? '...' : '') + raw + (end < allText.length ? '...' : '')
  }

  const words = queryNorm.split(' ').filter(w => w.length >= 3)
  for (const word of words) {
    const wIdx = allText.indexOf(word)
    if (wIdx >= 0) {
      const start = Math.max(0, wIdx - 25)
      const end = Math.min(allText.length, wIdx + word.length + 75)
      const raw = allText.slice(start, end).trim()
      return (start > 0 ? '...' : '') + raw + (end < allText.length ? '...' : '')
    }
  }

  return card.subtitle || card.content.slice(0, 100).trim() + '...'
}

// ── Main scoring function ───────────────────────────────────

function scoreCard(
  fields: FieldScore[],
  original: string[],
  expanded: string[],
  intentBoosts: string[],
  queryNorm: string,
): { score: number; matchType: SearchResult['matchType'] } {
  let score = 0
  let matchType: SearchResult['matchType'] = 'exact'
  let hasExact = false
  let hasSynonym = false
  let hasIntent = false
  let hasFuzzy = false

  const titleField = fields[0]
  const subtitleField = fields[1]

  // 1. Original terms — direct matches (highest value)
  for (const term of original) {
    for (const field of fields) {
      if (!field.text) continue
      if (field.text.includes(term)) {
        score += field.weight
        hasExact = true
        if (field === titleField && field.text.startsWith(term)) {
          score += 10
        }
      }
    }
  }

  // 2. Phrase match bonus (multi-word query matched in sequence)
  if (queryNorm.includes(' ') && queryNorm.length >= 5) {
    if (titleField.text.includes(queryNorm)) {
      score += 30
      hasExact = true
    } else if (subtitleField.text.includes(queryNorm)) {
      score += 20
      hasExact = true
    }
  }

  // 3. Expanded terms — synonym matches (medium value)
  for (const term of expanded) {
    if (titleField.text.includes(term)) {
      score += 8
      hasSynonym = true
    }
    if (subtitleField.text.includes(term)) {
      score += 5
      hasSynonym = true
    }
    if (!hasExact && !hasSynonym) {
      for (const field of fields.slice(2)) {
        if (field.text && field.text.includes(term)) {
          score += Math.min(field.weight, 3)
          hasSynonym = true
          break
        }
      }
    }
  }

  // 4. Intent boost
  for (const boost of intentBoosts) {
    if (titleField.text.includes(boost) || subtitleField.text.includes(boost)) {
      score += 15
      hasIntent = true
    }
  }

  // 5. Fuzzy matching on title (typo tolerance)
  if (score === 0) {
    for (const term of original) {
      const fuzzyScore = fuzzyMatchScore(term, titleField.text)
      if (fuzzyScore > 0) {
        score += Math.round(fuzzyScore * 12)
        hasFuzzy = true
      }
      const fuzzySubScore = fuzzyMatchScore(term, subtitleField.text)
      if (fuzzySubScore > 0) {
        score += Math.round(fuzzySubScore * 6)
        hasFuzzy = true
      }
    }
  }

  // 6. Multi-word coverage bonus
  if (original.length > 1) {
    const words = queryNorm.split(' ').filter(w => w.length >= 2)
    const allFieldText = fields.map(f => f.text).join(' ')
    const matchedWords = words.filter(w => allFieldText.includes(w))
    if (matchedWords.length > 1) {
      score += matchedWords.length * 4
    }
  }

  // Determine primary match type
  if (hasExact) matchType = 'exact'
  else if (hasIntent) matchType = 'intent'
  else if (hasSynonym) matchType = 'synonym'
  else if (hasFuzzy) matchType = 'fuzzy'

  return { score, matchType }
}

// ── Related content suggestions ─────────────────────────────

const relatedMap: Record<string, string[]> = {
  'Gmail Profissional com Dominio Proprio': ['Assinatura de Email Profissional', 'Marcadores, Filtros e Organizacao'],
  'Estrutura de Pastas no Drive': ['Convencoes de Nomenclatura', 'Compartilhamento Seguro'],
  'Peticoes e Pecas no Google Docs': ['Template de Contrato', 'Colaboracao em Tempo Real'],
  'Controle Financeiro com Sheets': ['Dashboard de Indicadores', 'Controle de Prazos Processuais'],
  'Meet para Audiencias Virtuais': ['Calendar para Prazos e Compromissos', 'Integracao Calendar + Meet + Gmail'],
  'Autenticacao em Duas Etapas (2FA)': ['Politicas de Senha', 'Compliance com a LGPD'],
  'AppSheet: Aplicativos sem Codigo': ['Apps Script para Advogados', 'Workflows de Aprovacao'],
  'Gemini no Google Workspace': ['Gemini no Gmail e Docs', 'Gemini no Sheets e Slides'],
  'NotebookLM para Pesquisa Juridica': ['NotebookLM para Estudo de Caso', 'Gemini no Google Workspace'],
  'Normas da OAB sobre Tecnologia': ['Resolucao CNJ 615/2025', 'Uso Etico da IA'],
  'Advogado Solo: Escritorio Completo': ['Escolhendo o Plano Ideal', 'Calculadora de Custo-Beneficio'],
  'Do Cliente a Peticao': ['Peticoes e Pecas no Google Docs', 'Controle Total de Prazos'],
  'Google Workspace vs Microsoft 365': ['Escolhendo o Plano Ideal', 'Calculadora de Custo-Beneficio'],
}

export function getRelatedCards(cardTitle: string): string[] {
  return relatedMap[cardTitle] || []
}

// ── Main hook ───────────────────────────────────────────────

export function useSearch() {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  // Pre-build search fields for all cards (memoized)
  const searchIndex = useMemo(() => {
    return sections.map(section => ({
      section,
      cards: section.cards.map((card, idx) => ({
        card,
        index: idx,
        fields: buildSearchFields(card),
      })),
    }))
  }, [])

  const results = useMemo<SearchResult[]>(() => {
    if (query.length < 2) return []

    const queryNorm = normalize(query)
    const { original, expanded } = getExpandedTerms(query)
    const intentBoosts = getIntentBoosts(query)
    const found: SearchResult[] = []

    for (const { section, cards } of searchIndex) {
      for (const { card, index, fields } of cards) {
        const { score, matchType } = scoreCard(fields, original, expanded, intentBoosts, queryNorm)

        if (score > 0) {
          found.push({
            sectionId: section.id,
            sectionTitle: section.title,
            sectionIcon: section.icon,
            cardTitle: card.title,
            cardSubtitle: card.subtitle || '',
            cardIndex: index,
            cardLevel: card.level,
            cardIcon: card.icon,
            snippet: extractSnippet(fields, queryNorm, card),
            score,
            matchType,
          })
        }
      }
    }

    found.sort((a, b) => b.score - a.score)
    return found.slice(0, 15)
  }, [query, searchIndex])

  const handleFocus = useCallback(() => setIsFocused(true), [])
  const handleBlur = useCallback(() => {
    // Delay to allow click on results
    setTimeout(() => setIsFocused(false), 200)
  }, [])

  return { query, setQuery, results, isFocused, handleFocus, handleBlur }
}
