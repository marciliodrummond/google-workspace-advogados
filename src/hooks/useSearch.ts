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
  { query: 'escritorio digital', label: 'Escritorio Digital', icon: 'building' },
  { query: 'meet', label: 'Audiencias Virtuais', icon: 'video' },
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
  'gmail': ['gmail', 'email', 'e mail', 'correio', 'comunicacao', 'assinatura', 'filtro', 'marcador', 'caixa de entrada', 'inbox'],
  'email': ['gmail', 'email', 'e mail', 'correio', 'comunicacao', 'mensagem', 'correspondencia'],
  'correio': ['gmail', 'email', 'comunicacao', 'correspondencia'],
  'assinatura': ['assinatura', 'gmail', 'email', 'profissional', 'identidade', 'rodape'],
  'filtro': ['filtro', 'marcador', 'gmail', 'regra', 'organizacao', 'classificar'],
  'marcador': ['marcador', 'label', 'filtro', 'gmail', 'organizacao', 'etiqueta', 'tag'],
  'inbox': ['inbox', 'caixa de entrada', 'gmail', 'email', 'recebidos'],
  'spam': ['spam', 'lixo', 'gmail', 'filtro', 'bloqueio'],
  'encaminhar': ['encaminhar', 'forward', 'redirecionar', 'gmail', 'email'],
  'anexo': ['anexo', 'attachment', 'arquivo', 'gmail', 'drive', 'enviar'],

  // Google Drive
  'drive': ['drive', 'google drive', 'armazenamento', 'nuvem', 'pasta', 'arquivo', 'guardar'],
  'pasta': ['pasta', 'drive', 'organizacao', 'estrutura', 'diretorio', 'folder'],
  'arquivo': ['arquivo', 'documento', 'drive', 'armazenamento', 'salvar'],
  'nuvem': ['nuvem', 'cloud', 'drive', 'armazenamento', 'backup', 'online'],
  'compartilhar': ['compartilhar', 'compartilhamento', 'drive', 'permissao', 'acesso', 'enviar link'],
  'armazenamento': ['armazenamento', 'drive', 'nuvem', 'espaco', 'storage', 'guardar', 'salvar'],
  'permissao': ['permissao', 'acesso', 'compartilhar', 'drive', 'editor', 'leitor', 'visualizar'],

  // Google Docs
  'docs': ['docs', 'google docs', 'documento', 'texto', 'peticao', 'contrato', 'editor de texto'],
  'documento': ['documento', 'docs', 'peticao', 'contrato', 'texto', 'redigir', 'escrever'],
  'peticao': ['peticao', 'peca', 'processual', 'docs', 'documento', 'modelo', 'inicial', 'recurso'],
  'contrato': ['contrato', 'docs', 'modelo', 'template', 'clausula', 'acordo', 'instrumento'],
  'procuracao': ['procuracao', 'docs', 'modelo', 'template', 'mandato', 'substabelecimento'],
  'redigir': ['redigir', 'escrever', 'docs', 'documento', 'texto', 'peticao', 'elaborar'],
  'editar': ['editar', 'modificar', 'alterar', 'docs', 'documento', 'revisar'],
  'colaboracao': ['colaboracao', 'colaborar', 'docs', 'tempo real', 'simultaneo', 'equipe'],
  'versao': ['versao', 'historico', 'docs', 'revisao', 'restaurar', 'anterior'],
  'abnt': ['abnt', 'formatacao', 'norma', 'docs', 'academico', 'margens'],

  // Google Sheets
  'sheets': ['sheets', 'google sheets', 'planilha', 'tabela', 'dados', 'financeiro', 'excel'],
  'planilha': ['planilha', 'sheets', 'tabela', 'calculo', 'dados', 'excel', 'spreadsheet'],
  'financeiro': ['financeiro', 'sheets', 'honorario', 'fluxo de caixa', 'receita', 'despesa', 'financas'],
  'dashboard': ['dashboard', 'painel', 'sheets', 'grafico', 'relatorio', 'indicador', 'kpi'],
  'honorario': ['honorario', 'financeiro', 'cobranca', 'sheets', 'pagamento', 'faturamento', 'receber'],
  'excel': ['excel', 'planilha', 'sheets', 'spreadsheet', 'xlsx', 'tabela'],
  'grafico': ['grafico', 'chart', 'dashboard', 'sheets', 'visualizacao', 'relatorio'],
  'formula': ['formula', 'funcao', 'sheets', 'calculo', 'planilha', 'soma', 'media'],

  // Google Slides
  'slides': ['slides', 'google slides', 'apresentacao', 'sustentacao oral', 'powerpoint'],
  'apresentacao': ['apresentacao', 'slides', 'sustentacao', 'oral', 'powerpoint', 'ppt'],
  'sustentacao': ['sustentacao', 'slides', 'apresentacao', 'oral', 'tribunal', 'defesa'],
  'powerpoint': ['powerpoint', 'slides', 'apresentacao', 'ppt', 'pptx'],

  // Google Meet
  'meet': ['meet', 'google meet', 'videoconferencia', 'audiencia', 'reuniao', 'video chamada'],
  'videoconferencia': ['videoconferencia', 'meet', 'video', 'chamada', 'video chamada', 'zoom'],
  'audiencia': ['audiencia', 'meet', 'virtual', 'tribunal', 'videoconferencia', 'julgamento'],
  'reuniao': ['reuniao', 'meet', 'videoconferencia', 'cliente', 'encontro', 'call'],
  'zoom': ['zoom', 'meet', 'videoconferencia', 'video chamada', 'alternativa'],
  'gravar': ['gravar', 'gravacao', 'meet', 'video', 'registrar', 'salvar reuniao'],
  'transcrever': ['transcrever', 'transcricao', 'meet', 'gemini', 'ata', 'minuta'],

  // Google Calendar
  'calendar': ['calendar', 'google calendar', 'agenda', 'prazo', 'compromisso', 'calendario'],
  'agenda': ['agenda', 'calendar', 'prazo', 'compromisso', 'horario', 'calendario', 'programacao'],
  'prazo': ['prazo', 'calendar', 'deadline', 'vencimento', 'alerta', 'controle', 'processual', 'fatal'],
  'deadline': ['deadline', 'prazo', 'vencimento', 'calendar', 'limite'],
  'compromisso': ['compromisso', 'calendar', 'agenda', 'evento', 'reuniao', 'horario'],
  'lembrete': ['lembrete', 'alerta', 'notificacao', 'calendar', 'prazo', 'aviso'],
  'calendario': ['calendario', 'calendar', 'agenda', 'data', 'prazo'],

  // Google Chat
  'chat': ['chat', 'google chat', 'mensagem', 'comunicacao', 'equipe', 'conversa', 'slack'],
  'slack': ['slack', 'chat', 'comunicacao', 'equipe', 'alternativa'],
  'mensagem': ['mensagem', 'chat', 'gmail', 'comunicacao', 'enviar', 'texto'],

  // Google Forms
  'forms': ['forms', 'google forms', 'formulario', 'questionario', 'intake', 'pesquisa', 'enquete'],
  'formulario': ['formulario', 'forms', 'questionario', 'cadastro', 'intake', 'ficha'],
  'intake': ['intake', 'forms', 'formulario', 'triagem', 'cliente', 'captacao', 'cadastro'],
  'questionario': ['questionario', 'forms', 'formulario', 'pesquisa', 'enquete', 'perguntas'],

  // Google Sites
  'sites': ['sites', 'google sites', 'website', 'pagina', 'escritorio', 'portal', 'intranet'],
  'website': ['website', 'sites', 'pagina', 'internet', 'presenca digital', 'site', 'web'],
  'site': ['site', 'sites', 'website', 'pagina', 'portal', 'presenca digital'],
  'intranet': ['intranet', 'sites', 'portal', 'interno', 'equipe'],

  // Admin Console
  'admin': ['admin', 'console', 'administracao', 'configuracao', 'gerenciamento', 'painel admin'],
  'console': ['console', 'admin', 'administracao', 'painel', 'gerenciamento'],
  'usuario': ['usuario', 'admin', 'conta', 'acesso', 'permissao', 'membro', 'colaborador'],
  'grupo': ['grupo', 'admin', 'equipe', 'unidade organizacional', 'email grupo'],

  // Google Vault
  'vault': ['vault', 'google vault', 'ediscovery', 'retencao', 'compliance', 'preservacao'],
  'ediscovery': ['ediscovery', 'vault', 'retencao', 'busca', 'juridico', 'preservacao legal'],
  'retencao': ['retencao', 'vault', 'preservacao', 'compliance', 'prazo legal'],

  // AppSheet
  'appsheet': ['appsheet', 'app', 'aplicativo', 'no code', 'automacao', 'app builder'],
  'app': ['app', 'appsheet', 'aplicativo', 'mobile', 'celular'],
  'no code': ['no code', 'appsheet', 'sem codigo', 'low code', 'sem programacao'],
  'low code': ['low code', 'no code', 'appsheet', 'pouco codigo'],

  // Apps Script
  'apps script': ['apps script', 'script', 'codigo', 'automacao', 'macro', 'javascript', 'programacao'],
  'script': ['script', 'apps script', 'codigo', 'automacao', 'programacao'],
  'macro': ['macro', 'apps script', 'automacao', 'script', 'repetir'],
  'codigo': ['codigo', 'apps script', 'script', 'programacao', 'javascript'],

  // Gemini AI
  'gemini': ['gemini', 'ia', 'inteligencia artificial', 'ai', 'assistente', 'copilot', 'chatgpt'],
  'ia': ['ia', 'gemini', 'inteligencia artificial', 'ai', 'automacao', 'assistente', 'machine learning'],
  'inteligencia artificial': ['inteligencia artificial', 'ia', 'gemini', 'ai', 'chatgpt'],
  'chatgpt': ['chatgpt', 'ia', 'gemini', 'ai', 'alternativa', 'openai', 'gpt'],
  'gpt': ['gpt', 'chatgpt', 'gemini', 'ia', 'alternativa'],
  'copilot': ['copilot', 'ia', 'gemini', 'microsoft', 'assistente'],
  'assistente': ['assistente', 'gemini', 'ia', 'ai', 'ajudante', 'copilot'],

  // NotebookLM
  'notebooklm': ['notebooklm', 'notebook', 'pesquisa', 'resumo', 'analise', 'estudo'],
  'notebook': ['notebook', 'notebooklm', 'pesquisa', 'estudo', 'resumo'],
  'resumo': ['resumo', 'notebooklm', 'sintetizar', 'sumarizar', 'resumir', 'gemini'],
  'jurisprudencia': ['jurisprudencia', 'pesquisa', 'notebooklm', 'precedente', 'tribunal', 'decisao'],
  'precedente': ['precedente', 'jurisprudencia', 'tribunal', 'decisao', 'acordao'],

  // Seguranca
  'seguranca': ['seguranca', '2fa', 'autenticacao', 'senha', 'protecao', 'lgpd', 'privacidade', 'dados'],
  '2fa': ['2fa', 'autenticacao', 'verificacao', 'seguranca', 'dois fatores', 'mfa', 'token'],
  'senha': ['senha', 'password', 'seguranca', 'politica', 'credencial', 'acesso'],
  'lgpd': ['lgpd', 'protecao de dados', 'privacidade', 'seguranca', 'compliance', 'lei geral'],
  'sigilo': ['sigilo', 'confidencialidade', 'seguranca', 'profissional', 'etica', 'privilegio'],
  'dlp': ['dlp', 'prevencao perda dados', 'seguranca', 'protecao', 'vazamento'],
  'auditoria': ['auditoria', 'log', 'registro', 'compliance', 'admin', 'rastreio', 'monitoramento'],
  'criptografia': ['criptografia', 'seguranca', 'criptografar', 'proteger', 'cifrar'],
  'privacidade': ['privacidade', 'lgpd', 'dados pessoais', 'seguranca', 'sigilo'],
  'vazamento': ['vazamento', 'dlp', 'seguranca', 'dados', 'protecao', 'incidente'],
  'ransomware': ['ransomware', 'virus', 'malware', 'seguranca', 'backup', 'ataque'],
  'mdm': ['mdm', 'dispositivo', 'celular', 'mobile', 'seguranca', 'gerenciamento'],

  // Etica e regulamentacao
  'etica': ['etica', 'oab', 'cnj', 'regulamentacao', 'resolucao', 'norma', 'conduta', 'deontologia'],
  'oab': ['oab', 'etica', 'regulamentacao', 'codigo', 'disciplinar', 'ordem dos advogados'],
  'cnj': ['cnj', 'resolucao 615', 'regulamentacao', 'judiciario', 'conselho nacional'],
  'resolucao': ['resolucao', 'cnj', 'regulamentacao', 'norma', 'oab'],
  'responsabilidade': ['responsabilidade', 'etica', 'erro', 'ia', 'profissional', 'civil'],
  'consentimento': ['consentimento', 'lgpd', 'transparencia', 'cliente', 'autorizacao'],
  'propriedade intelectual': ['propriedade intelectual', 'direito autoral', 'ia', 'criacao', 'copyright'],

  // Automacao
  'automacao': ['automacao', 'automatizar', 'workflow', 'appsheet', 'apps script', 'regra', 'processo automatico'],
  'automatizar': ['automatizar', 'automacao', 'workflow', 'script', 'processo automatico'],
  'zapier': ['zapier', 'make', 'integracao', 'automacao', 'webhook', 'n8n', 'conector'],
  'make': ['make', 'zapier', 'integracao', 'automacao', 'integromat'],
  'workflow': ['workflow', 'fluxo', 'automacao', 'processo', 'aprovacao', 'etapa'],
  'webhook': ['webhook', 'integracao', 'automacao', 'api', 'zapier', 'make'],
  'notificacao': ['notificacao', 'alerta', 'aviso', 'lembrete', 'email', 'push'],

  // Primeiros passos
  'comecar': ['primeiros passos', 'configurar', 'inicio', 'basico', 'ativar', 'iniciar', 'primeiro'],
  'inicio': ['primeiros passos', 'configurar', 'comecar', 'ativar', 'iniciar'],
  'configurar': ['configuracao', 'setup', 'admin', 'personalizar', 'ajustar'],
  'plano': ['plano', 'preco', 'custo', 'business', 'enterprise', 'assinatura', 'starter', 'standard', 'plus'],
  'preco': ['preco', 'custo', 'plano', 'valor', 'mensalidade', 'quanto custa', 'investimento'],
  'custo': ['custo', 'preco', 'plano', 'roi', 'economia', 'beneficio', 'investimento', 'gasto'],
  'dominio': ['dominio', 'adv br', 'registro', 'profissional', 'url', 'endereco'],
  'roi': ['roi', 'retorno', 'investimento', 'economia', 'custo beneficio', 'vale a pena'],
  'barato': ['barato', 'economico', 'custo', 'preco', 'acessivel', 'investimento'],
  'caro': ['caro', 'preco', 'custo', 'investimento', 'plano', 'vale a pena'],
  'starter': ['starter', 'plano', 'basico', 'business starter', 'inicial'],
  'standard': ['standard', 'plano', 'intermediario', 'business standard', 'gemini'],
  'business': ['business', 'plano', 'starter', 'standard', 'plus', 'enterprise'],

  // Areas do direito
  'trabalhista': ['trabalhista', 'clt', 'tst', 'rescisao', 'reclamatoria', 'trabalho'],
  'tributario': ['tributario', 'imposto', 'fiscal', 'tributo', 'taxa'],
  'familia': ['familia', 'divorcio', 'guarda', 'alimentos', 'pensao', 'casamento'],
  'empresarial': ['empresarial', 'societario', 'contrato', 'comercial', 'empresa'],
  'penal': ['penal', 'criminal', 'crime', 'defesa', 'acusacao'],
  'civil': ['civil', 'civel', 'processo', 'acao', 'dano'],
  'previdenciario': ['previdenciario', 'inss', 'aposentadoria', 'beneficio', 'previdencia'],
  'imobiliario': ['imobiliario', 'imovel', 'locacao', 'usucapiao', 'propriedade'],
  'consumidor': ['consumidor', 'cdc', 'cliente', 'defesa consumidor', 'relacao de consumo'],

  // Implementacao e casos
  'escritorio': ['escritorio', 'implementar', 'equipe', 'solo', 'pequeno', 'medio', 'banca', 'firma'],
  'migracao': ['migracao', 'migrar', 'papel', 'digital', 'transicao', 'transferir', 'mover'],
  'template': ['template', 'modelo', 'pronto', 'exemplo', 'padrao'],
  'modelo': ['modelo', 'template', 'pronto', 'exemplo', 'padrao', 'referencia'],
  'atalho': ['atalho', 'teclado', 'shortcut', 'produtividade', 'rapido', 'tecla'],
  'extensao': ['extensao', 'chrome', 'addon', 'complemento', 'plugin', 'navegador'],
  'solo': ['solo', 'sozinho', 'individual', 'autonomo', 'advogado solo', 'unico'],
  'equipe': ['equipe', 'time', 'colaboradores', 'membros', 'escritorio', 'grupo'],
  'digital': ['digital', 'online', 'virtual', 'nuvem', 'tecnologia', 'paperless'],
  'paperless': ['paperless', 'sem papel', 'digital', 'ecologico', 'sustentavel'],

  // Comparacao
  'microsoft': ['microsoft', 'office 365', 'm365', 'comparacao', 'alternativa', 'windows'],
  'office': ['office', 'microsoft', 'm365', 'comparacao', 'word', 'excel', 'powerpoint'],
  'word': ['word', 'docs', 'documento', 'microsoft', 'editor de texto', 'docx'],
  'comparar': ['comparacao', 'microsoft', 'office', 'versus', 'diferenca', 'melhor', 'qual'],
  'alternativa': ['alternativa', 'substituir', 'trocar', 'comparacao', 'versus', 'concorrente'],
  'versus': ['versus', 'vs', 'comparacao', 'contra', 'diferenca'],

  // Problemas e suporte
  'problema': ['problema', 'erro', 'resolver', 'ajuda', 'nao funciona', 'bug', 'defeito'],
  'erro': ['erro', 'problema', 'falha', 'nao funciona', 'bug', 'crash'],
  'ajuda': ['ajuda', 'suporte', 'problema', 'resolver', 'socorro', 'help'],
  'suporte': ['suporte', 'ajuda', 'atendimento', 'google', 'tecnico', 'assistencia'],
  'nao funciona': ['nao funciona', 'problema', 'erro', 'travou', 'parou', 'quebrou'],
  'lento': ['lento', 'devagar', 'performance', 'velocidade', 'demora'],
  'recuperar': ['recuperar', 'restaurar', 'backup', 'excluido', 'lixeira', 'perdido'],
  'bloqueado': ['bloqueado', 'conta', 'acesso', 'senha', 'admin', 'desbloquear'],
  'offline': ['offline', 'sem internet', 'desconectado', 'funcionar offline', 'modo aviao'],

  // Backup e sincronizacao
  'backup': ['backup', 'copia', 'seguranca', 'sincronizacao', 'drive', 'salvar', 'proteger'],
  'sincronizacao': ['sincronizacao', 'sync', 'backup', 'drive', 'desktop', 'atualizar'],

  // Keep e Tasks
  'keep': ['keep', 'nota', 'anotacao', 'lembrete', 'post it', 'recado'],
  'tasks': ['tasks', 'tarefa', 'lista', 'pendencia', 'afazer', 'todo'],
  'tarefa': ['tarefa', 'tasks', 'pendencia', 'fazer', 'atividade', 'afazer'],
  'nota': ['nota', 'keep', 'anotacao', 'recado', 'observacao'],

  // Busca
  'busca': ['busca', 'pesquisa', 'procurar', 'encontrar', 'drive', 'localizar'],
  'pesquisa': ['pesquisa', 'busca', 'notebooklm', 'jurisprudencia', 'investigar', 'consultar'],
  'procurar': ['procurar', 'busca', 'pesquisa', 'encontrar', 'localizar'],

  // Respostas e templates de email
  'resposta automatica': ['resposta automatica', 'ferias', 'gmail', 'ausencia', 'auto reply'],
  'canned response': ['canned response', 'resposta padrao', 'gmail', 'template', 'modelo de email'],
  'ferias': ['ferias', 'resposta automatica', 'ausencia', 'gmail', 'fora do escritorio'],

  // Integracao
  'integracao': ['integracao', 'calendar', 'meet', 'gmail', 'conectar', 'zapier', 'integrar', 'vincular'],
  'conectar': ['conectar', 'integracao', 'api', 'webhook', 'vincular', 'ligar'],
  'api': ['api', 'integracao', 'webhook', 'apps script', 'conectar', 'programacao'],

  // Escritorio digital (nova secao)
  'escritorio digital': ['escritorio digital', 'digital', 'completo', 'visao geral', 'todas ferramentas', 'integracao'],
  'predio digital': ['predio digital', 'analogia', 'escritorio', 'infraestrutura', 'ferramentas'],
  'jornada cliente': ['jornada cliente', 'fluxo', 'intake', 'peticao', 'caso', 'workflow'],
  'rotina': ['rotina', 'dia a dia', 'diario', 'trabalho', 'produtividade'],
  'produtividade': ['produtividade', 'eficiencia', 'rapido', 'otimizar', 'tempo', 'atalho'],
  'custo beneficio': ['custo beneficio', 'roi', 'economia', 'investimento', 'vale a pena', 'retorno'],
  'roadmap': ['roadmap', 'plano', 'implementar', 'fase', 'semana', '30 dias', 'passo a passo'],
  'papel': ['papel', 'paperless', 'fisico', 'imprimir', 'escanear', 'digitalizar'],
  'escanear': ['escanear', 'scanner', 'digitalizar', 'papel', 'drive', 'camera'],
  'nuvem segura': ['nuvem segura', 'seguranca', 'cloud', 'criptografia', 'dados'],
}

// ── Intent map (Google Workspace for lawyers) ───────────────

const intentMap: Record<string, string[]> = {
  // Primeiros passos
  'como comecar': ['O que e o Google Workspace', 'Escolhendo o Plano Ideal', 'Ativando sua Conta', 'Do Zero ao Digital em 30 Dias'],
  'quanto custa': ['Escolhendo o Plano Ideal', 'Calculadora de ROI', 'Quanto Custa vs Quanto Economiza'],
  'qual plano': ['Escolhendo o Plano Ideal', 'Comparacao Google Workspace vs Microsoft'],
  'como ativar': ['Ativando sua Conta', 'Configurando o Admin Console'],
  'como configurar': ['Configurando o Admin Console', 'Criando Usuarios e Grupos'],
  'vale a pena': ['Escolhendo o Plano Ideal', 'Quanto Custa vs Quanto Economiza', 'Calculadora de Custo Beneficio'],
  'o que e google workspace': ['O que e o Google Workspace', 'Seu Escritorio Digital A Visao Completa'],
  'quero contratar': ['Escolhendo o Plano Ideal', 'Ativando sua Conta'],
  'por onde comecar': ['O que e o Google Workspace', 'Escolhendo o Plano Ideal', 'Do Zero ao Digital em 30 Dias'],

  // Gmail
  'configurar email': ['Gmail Profissional com Dominio Proprio', 'Assinatura de Email Profissional'],
  'email profissional': ['Gmail Profissional com Dominio Proprio', 'Assinatura de Email Profissional'],
  'filtrar email': ['Marcadores Filtros e Organizacao'],
  'organizar email': ['Marcadores Filtros e Organizacao'],
  'assinatura email': ['Assinatura de Email Profissional'],
  'email automatico': ['Respostas Automaticas e Ferias'],
  'caixa compartilhada': ['Caixa de Email Compartilhada'],
  'email dominio proprio': ['Gmail Profissional com Dominio Proprio'],
  'email adv br': ['Gmail Profissional com Dominio Proprio'],
  'spam gmail': ['Marcadores Filtros e Organizacao'],
  'template email': ['Templates de Email Juridico', 'Respostas Automaticas e Ferias'],

  // Drive
  'organizar arquivos': ['Estrutura de Pastas no Drive', 'Convencoes de Nomenclatura'],
  'compartilhar arquivo': ['Compartilhamento Seguro'],
  'buscar arquivo': ['Busca Avancada no Drive'],
  'sincronizar arquivos': ['Backup e Sincronizacao'],
  'salvar arquivo': ['Estrutura de Pastas no Drive', 'Backup e Sincronizacao'],
  'onde salvar': ['Estrutura de Pastas no Drive', 'Convencoes de Nomenclatura'],
  'organizar pastas': ['Estrutura de Pastas no Drive', 'Convencoes de Nomenclatura'],
  'nomear arquivos': ['Convencoes de Nomenclatura'],
  'arquivo excluido': ['FAQ e Solucao de Problemas'],
  'recuperar arquivo': ['FAQ e Solucao de Problemas', 'Backup e Sincronizacao'],

  // Docs
  'criar peticao': ['Peticoes e Pecas no Google Docs', 'Template de Contrato'],
  'modelo contrato': ['Template de Contrato', 'Template de Procuracao'],
  'colaborar documento': ['Colaboracao em Tempo Real', 'Historico de Versoes'],
  'formatar documento': ['Formatacao ABNT no Docs'],
  'historico versao': ['Historico de Versoes'],
  'escrever peticao': ['Peticoes e Pecas no Google Docs'],
  'criar documento': ['Peticoes e Pecas no Google Docs', 'Template de Contrato'],
  'editar juntos': ['Colaboracao em Tempo Real'],
  'trabalhar junto': ['Colaboracao em Tempo Real'],
  'modelo peticao': ['Peticoes e Pecas no Google Docs', 'Modelos e Templates de Documentos'],
  'modelo procuracao': ['Template de Procuracao'],
  'substituir word': ['Peticoes e Pecas no Google Docs', 'Google Workspace vs Microsoft 365'],

  // Sheets
  'controle financeiro': ['Controle Financeiro com Sheets', 'Dashboard de Indicadores'],
  'planilha honorario': ['Controle Financeiro com Sheets'],
  'criar dashboard': ['Dashboard de Indicadores'],
  'controle prazo': ['Controle de Prazos Processuais', 'Alertas Automaticos de Prazo'],
  'controle financas': ['Controle Financeiro com Sheets', 'Dashboard de Indicadores'],
  'fluxo de caixa': ['Controle Financeiro com Sheets'],
  'cobrar honorario': ['Controle Financeiro com Sheets'],
  'substituir excel': ['Controle Financeiro com Sheets', 'Google Workspace vs Microsoft 365'],

  // Meet e Calendar
  'audiencia virtual': ['Meet para Audiencias Virtuais', 'Fluxo Audiencia Virtual'],
  'agendar reuniao': ['Calendar para Prazos e Compromissos'],
  'videoconferencia': ['Meet para Audiencias Virtuais'],
  'controlar agenda': ['Calendar para Prazos e Compromissos'],
  'integracao calendar': ['Integracao Calendar Meet Gmail'],
  'gravar reuniao': ['Meet para Audiencias Virtuais'],
  'transcrever reuniao': ['Gemini no Meet', 'Meet para Audiencias Virtuais'],
  'substituir zoom': ['Meet para Audiencias Virtuais'],
  'prazo processual': ['Controle de Prazos Processuais', 'Calendar para Prazos e Compromissos', 'Alertas Automaticos de Prazo'],
  'alerta prazo': ['Alertas Automaticos de Prazo', 'Controle de Prazos Processuais'],
  'perder prazo': ['Controle de Prazos Processuais', 'Alertas Automaticos de Prazo'],
  'nao perder prazo': ['Controle de Prazos Processuais', 'Alertas Automaticos de Prazo'],

  // Seguranca
  'proteger dados': ['Autenticacao em Duas Etapas', 'Politicas de Senha', 'Compliance com LGPD', 'A Seguranca do Escritorio Digital'],
  'lgpd escritorio': ['Compliance com LGPD', 'Protecao do Sigilo Profissional'],
  'seguranca dados': ['Autenticacao em Duas Etapas', 'Prevencao contra Perda de Dados', 'A Seguranca do Escritorio Digital'],
  'sigilo profissional': ['Protecao do Sigilo Profissional'],
  'auditoria acesso': ['Logs de Auditoria'],
  'dados seguros': ['A Seguranca do Escritorio Digital', 'Autenticacao em Duas Etapas'],
  'nuvem segura': ['A Seguranca do Escritorio Digital'],
  'seguro na nuvem': ['A Seguranca do Escritorio Digital'],
  'hackear': ['Autenticacao em Duas Etapas', 'Politicas de Senha', 'A Seguranca do Escritorio Digital'],
  'virus': ['A Seguranca do Escritorio Digital', 'Plano de Resposta a Incidentes'],
  'celular perdido': ['Gerenciamento de Dispositivos Moveis'],
  'celular roubado': ['Gerenciamento de Dispositivos Moveis'],

  // Automacao
  'automatizar escritorio': ['AppSheet Aplicativos sem Codigo', 'Apps Script para Advogados', 'Integracoes que Multiplicam Produtividade'],
  'criar aplicativo': ['AppSheet Aplicativos sem Codigo'],
  'automatizar email': ['Regras Automaticas de Email'],
  'integrar ferramentas': ['Integracoes Externas', 'Integracoes que Multiplicam Produtividade'],
  'fluxo aprovacao': ['Workflows de Aprovacao'],
  'criar automacao': ['Apps Script para Advogados', 'AppSheet Aplicativos sem Codigo'],
  'economizar tempo': ['Integracoes que Multiplicam Produtividade', 'O Dia a Dia do Advogado Digital'],
  'ser mais produtivo': ['Integracoes que Multiplicam Produtividade', 'O Dia a Dia do Advogado Digital'],

  // Gemini e IA
  'usar gemini': ['Gemini no Google Workspace', 'Gemini no Gmail e Docs'],
  'ia no gmail': ['Gemini no Gmail e Docs'],
  'ia planilha': ['Gemini no Sheets e Slides'],
  'ia reuniao': ['Gemini no Meet'],
  'pesquisa ia': ['NotebookLM para Pesquisa Juridica'],
  'limites ia': ['Limites e Boas Praticas da IA'],
  'gemini ajuda': ['Gemini no Google Workspace', 'Gemini no Gmail e Docs'],
  'ia escrever': ['Gemini no Gmail e Docs'],
  'ia resumir': ['Gemini no Gmail e Docs', 'NotebookLM para Pesquisa Juridica'],
  'ia pesquisar': ['NotebookLM para Pesquisa Juridica', 'NotebookLM para Estudo de Caso'],
  'chatgpt ou gemini': ['Gemini no Google Workspace', 'Limites e Boas Praticas da IA'],
  'qual ia usar': ['Gemini no Google Workspace', 'Limites e Boas Praticas da IA'],
  'pesquisar jurisprudencia': ['NotebookLM para Pesquisa Juridica'],
  'resumir documento': ['Gemini no Gmail e Docs', 'NotebookLM para Pesquisa Juridica'],
  'ia advogado': ['Gemini no Google Workspace', 'Uso Etico da IA'],

  // Etica
  'etica ia': ['Normas da OAB sobre Tecnologia', 'Uso Etico da IA'],
  'regras oab': ['Normas da OAB sobre Tecnologia'],
  'cnj 615': ['Resolucao CNJ 615 2025'],
  'responsabilidade ia': ['Responsabilidade por Erros de IA'],
  'consentimento': ['Consentimento e Transparencia'],
  'posso usar ia': ['Normas da OAB sobre Tecnologia', 'Uso Etico da IA'],
  'ia permitida': ['Normas da OAB sobre Tecnologia', 'Uso Etico da IA'],
  'etica tecnologia': ['Normas da OAB sobre Tecnologia', 'Uso Etico da IA'],

  // Casos praticos
  'advogado solo': ['Advogado Solo Escritorio Completo'],
  'escritorio pequeno': ['Escritorio Pequeno 5 Advogados'],
  'escritorio medio': ['Escritorio Medio 20 Advogados'],
  'migrar papel digital': ['Migracao Papel para Digital', 'Escritorio Paperless Eliminando o Papel'],
  'calcular roi': ['Calculadora de Custo Beneficio', 'Quanto Custa vs Quanto Economiza'],
  'trabalho sozinho': ['Advogado Solo Escritorio Completo'],
  'sou autonomo': ['Advogado Solo Escritorio Completo'],
  'tenho equipe': ['Escritorio Pequeno 5 Advogados', 'Escritorio Medio 20 Advogados'],
  'eliminar papel': ['Escritorio Paperless Eliminando o Papel', 'Migracao Papel para Digital'],
  'sem papel': ['Escritorio Paperless Eliminando o Papel'],
  'digitalizar': ['Escritorio Paperless Eliminando o Papel', 'Migracao Papel para Digital'],

  // Recursos
  'atalhos teclado': ['Atalhos de Teclado Essenciais'],
  'extensoes chrome': ['Extensoes Chrome Recomendadas'],
  'suporte google': ['Comunidade e Suporte'],
  'comparar microsoft': ['Google Workspace vs Microsoft 365'],
  'resolver problema': ['FAQ e Solucao de Problemas'],
  'google ou microsoft': ['Google Workspace vs Microsoft 365'],
  'office ou google': ['Google Workspace vs Microsoft 365'],
  'tecla atalho': ['Atalhos de Teclado Essenciais'],
  'ser mais rapido': ['Atalhos de Teclado Essenciais', 'O Dia a Dia do Advogado Digital'],
  'novidades google': ['Atualizacoes e Novidades'],

  // Fluxos
  'fluxo cliente peticao': ['Do Cliente a Peticao', 'A Jornada do Cliente Do Intake ao Caso Encerrado'],
  'fluxo controle prazo': ['Controle Total de Prazos'],
  'fluxo audiencia': ['Fluxo Audiencia Virtual'],
  'passo a passo': ['Do Zero ao Digital em 30 Dias', 'Do Cliente a Peticao'],
  'como funciona': ['Seu Escritorio Digital A Visao Completa', 'A Jornada do Cliente Do Intake ao Caso Encerrado'],

  // Escritorio Digital (nova secao)
  'visao geral': ['Seu Escritorio Digital A Visao Completa'],
  'todas ferramentas': ['Seu Escritorio Digital A Visao Completa', 'Integracoes que Multiplicam Produtividade'],
  'como integra': ['Integracoes que Multiplicam Produtividade', 'Seu Escritorio Digital A Visao Completa'],
  'escritorio digital': ['Seu Escritorio Digital A Visao Completa', 'Do Zero ao Digital em 30 Dias'],
  'montar escritorio': ['Seu Escritorio Digital A Visao Completa', 'Do Zero ao Digital em 30 Dias', 'Advogado Solo Escritorio Completo'],
  'dia a dia': ['O Dia a Dia do Advogado Digital'],
  'rotina advogado': ['O Dia a Dia do Advogado Digital'],
  'como usar no dia': ['O Dia a Dia do Advogado Digital'],
  'implementar 30 dias': ['Do Zero ao Digital em 30 Dias'],
  'plano implementacao': ['Do Zero ao Digital em 30 Dias'],
  'comecar do zero': ['Do Zero ao Digital em 30 Dias', 'O que e o Google Workspace'],
  'custo beneficio': ['Quanto Custa vs Quanto Economiza', 'Calculadora de Custo Beneficio'],
  'economia': ['Quanto Custa vs Quanto Economiza', 'Calculadora de Custo Beneficio'],
  'substituir tudo': ['Quanto Custa vs Quanto Economiza', 'Seu Escritorio Digital A Visao Completa'],
  'acabar papel': ['Escritorio Paperless Eliminando o Papel'],
  'seguranca nuvem': ['A Seguranca do Escritorio Digital'],
  'meus dados nuvem': ['A Seguranca do Escritorio Digital'],
  'confiavel': ['A Seguranca do Escritorio Digital'],
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
  'Advogado Solo: Escritorio Completo': ['Escolhendo o Plano Ideal', 'Calculadora de Custo-Beneficio', 'Do Zero ao Digital em 30 Dias'],
  'Do Cliente a Peticao': ['Peticoes e Pecas no Google Docs', 'Controle Total de Prazos', 'A Jornada do Cliente: Do Intake ao Caso Encerrado'],
  'Google Workspace vs Microsoft 365': ['Escolhendo o Plano Ideal', 'Calculadora de Custo-Beneficio', 'Quanto Custa vs. Quanto Economiza'],
  'Seu Escritorio Digital: A Visao Completa': ['O que e o Google Workspace', 'Integracoes que Multiplicam Produtividade', 'Quanto Custa vs. Quanto Economiza'],
  'A Jornada do Cliente: Do Intake ao Caso Encerrado': ['Do Cliente a Peticao', 'Seu Escritorio Digital: A Visao Completa'],
  'O Dia a Dia do Advogado Digital': ['Integracoes que Multiplicam Produtividade', 'Atalhos de Teclado Essenciais'],
  'Integracoes que Multiplicam Produtividade': ['Seu Escritorio Digital: A Visao Completa', 'O Dia a Dia do Advogado Digital'],
  'Quanto Custa vs. Quanto Economiza': ['Escolhendo o Plano Ideal', 'Calculadora de Custo-Beneficio'],
  'Do Zero ao Digital em 30 Dias': ['Seu Escritorio Digital: A Visao Completa', 'Advogado Solo: Escritorio Completo'],
  'Escritorio Paperless: Eliminando o Papel': ['Migracao Papel para Digital', 'Estrutura de Pastas no Drive'],
  'A Seguranca do Escritorio Digital': ['Autenticacao em Duas Etapas (2FA)', 'Compliance com a LGPD'],
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
