export interface CardLink {
  label: string
  url: string
}

export interface FlowStep {
  title: string
  description: string
}

export interface Analogy {
  tag?: string
  text: string
}

export interface ElementGridItem {
  icon: string
  name: string
  tech?: string
  description: string
  whenToUse?: string
  highlight?: boolean
}

export interface RelationshipItem {
  label: string
  value: string
  sub?: string
  highlight?: boolean
  flex?: number
}

export interface CommandItem {
  command: string
  description: string
}

export interface ChecklistGroup {
  title: string
  items: string[]
}

export interface RefTableRow {
  icon: string
  element: string
  analogy: string
  config: 'sim' | 'nao' | 'auto'
  configLabel: string
}

export interface Card {
  title: string
  subtitle?: string
  level: 'iniciante' | 'intermediario' | 'avancado' | 'expert'
  icon: string
  content: string
  tips?: string[]
  steps?: string[]
  prompt?: string
  links?: CardLink[]
  flowSteps?: FlowStep[]
  analogy?: Analogy
  elementGrid?: ElementGridItem[]
  relationship?: { title: string; items: RelationshipItem[]; symbols?: string[] }
  commandList?: CommandItem[]
  checklist?: ChecklistGroup[]
  refTable?: RefTableRow[]
}

export interface Section {
  id: string
  title: string
  description: string
  icon: string
  cards: Card[]
}

export const sections: Section[] = [
  // ═══════════════════════════════════════════════════════════
  // SEÇÃO 1: PRIMEIROS PASSOS
  // ═══════════════════════════════════════════════════════════
  {
    id: 'primeiros-passos',
    title: 'Primeiros Passos',
    description: 'Entenda o ecossistema Google Workspace e comece sua jornada digital',
    icon: 'rocket',
    cards: [
      {
        title: 'O que é o Google Workspace?',
        subtitle: 'Seu escritório digital completo na nuvem',
        level: 'iniciante',
        icon: 'building',
        analogy: {
          tag: 'Analogia Central',
          text: 'O Google Workspace é um **prédio comercial completo** para seu escritório. O Gmail é a recepção (comunicação), o Drive é o arquivo (documentos), o Calendar é o quadro de prazos, o Meet é a sala de reuniões, o Docs é a máquina de escrever moderna, o Sheets é a calculadora financeira, o Admin Console é a portaria com segurança, e o Gemini AI é o estagiário inteligente que ajuda em tudo.',
        },
        content: `O Google Workspace não é só um email profissional. É um **ecossistema completo** de mais de 15 ferramentas integradas que, juntas, substituem dezenas de softwares caros e desconectados.

Para escritórios de advocacia, isso significa: email com domínio .adv.br, armazenamento seguro na nuvem, edição colaborativa de petições, controle financeiro em planilhas, agendamento de audiências, videoconferências profissionais, formulários de captação de clientes, site institucional — tudo por a partir de **R$ 33,60/mês por usuário**.

**O que está incluído:**`,
        elementGrid: [
          { icon: 'mail', name: 'Gmail', description: 'Email profissional com domínio .adv.br, 15-30 GB por usuário', highlight: true },
          { icon: 'hard-drive', name: 'Google Drive', description: 'Armazenamento na nuvem de 30 GB a ilimitado' },
          { icon: 'file-text', name: 'Google Docs', description: 'Editor de texto para petições, contratos e pareceres' },
          { icon: 'spreadsheet', name: 'Google Sheets', description: 'Planilhas para controle financeiro e prazos' },
          { icon: 'presentation', name: 'Google Slides', description: 'Apresentações para sustentações orais' },
          { icon: 'calendar', name: 'Google Calendar', description: 'Agenda compartilhada para prazos e audiências' },
          { icon: 'video', name: 'Google Meet', description: 'Videoconferência para audiências virtuais' },
          { icon: 'message-circle', name: 'Google Chat', description: 'Mensagens instantâneas entre a equipe' },
          { icon: 'form-input', name: 'Google Forms', description: 'Formulários de intake e pesquisa' },
          { icon: 'globe', name: 'Google Sites', description: 'Site institucional do escritório sem custo extra' },
          { icon: 'shield', name: 'Admin Console', description: 'Painel de segurança e gestão de usuários' },
          { icon: 'sparkles', name: 'Gemini AI', description: 'Inteligência artificial integrada em todos os apps' },
        ],
        tips: [
          'Todas as ferramentas funcionam no navegador — não precisa instalar nada',
          'Os dados ficam na nuvem com backup automático — sem risco de perder arquivos',
          'A integração entre as ferramentas é nativa: um evento no Calendar já cria link do Meet automaticamente',
        ],
      },
      {
        title: 'Escolhendo seu Plano',
        subtitle: 'Comparação detalhada dos planos para escritórios de advocacia',
        level: 'iniciante',
        icon: 'credit-card',
        content: `Escolher o plano certo pode economizar centenas de reais por mês. Veja a comparação completa:

| Recurso | Business Starter | Business Standard | Business Plus | Enterprise |
|---------|-----------------|-------------------|---------------|------------|
| Preço/usuário/mês | R$ 33,60 | R$ 67,20 | R$ 100,80 | Sob consulta |
| Armazenamento | 30 GB | 2 TB | 5 TB | Ilimitado |
| Meet (participantes) | 100 | 150 | 500 | 1.000 |
| Gravação do Meet | Não | Sim | Sim | Sim |
| Google Vault | Não | Não | Sim | Sim |
| DLP | Não | Não | Sim | Sim |
| Gemini AI | Básico | Completo | Completo | Completo |
| AppSheet | Não | Core | Enterprise | Enterprise |

**Qual plano escolher?**
- **Advogado solo ou dupla:** Business Starter resolve tudo. 30 GB é suficiente se você usar Drive e Docs em vez de anexar tudo por email.
- **Escritório 3-20 pessoas:** Business Standard. O armazenamento de 2 TB é compartilhado e a gravação do Meet é essencial para reuniões.
- **Escritório 20-50 pessoas:** Business Plus. Vault para eDiscovery e DLP para proteção de dados sensíveis são diferenciais.
- **Bancas 50+ pessoas:** Enterprise. Armazenamento ilimitado e compliance avançado.`,
        tips: [
          'O Google oferece 14 dias de teste gratuito para qualquer plano',
          'Você pode começar com Starter e fazer upgrade a qualquer momento sem perder dados',
          'O preço anual é mais barato: desconto de até 20% pagando antecipadamente',
          'Para mais de 300 usuários, negocie diretamente com o Google — há descontos por volume',
        ],
        relationship: {
          title: 'Recomendação por Porte do Escritório',
          items: [
            { label: 'Solo/Dupla', value: 'Starter', sub: 'R$ 33,60/mês', highlight: true },
            { label: '3-20 pessoas', value: 'Standard', sub: 'R$ 67,20/mês' },
            { label: '20-50 pessoas', value: 'Plus', sub: 'R$ 100,80/mês' },
            { label: '50+ pessoas', value: 'Enterprise', sub: 'Sob consulta' },
          ],
          symbols: ['→', '→', '→'],
        },
      },
      {
        title: 'Registrando seu Domínio .adv.br',
        subtitle: 'O primeiro passo para um email profissional',
        level: 'iniciante',
        icon: 'globe',
        content: `O domínio .adv.br é exclusivo para advogados inscritos na OAB. Ter um email como **contato@seuescritorio.adv.br** transmite profissionalismo e credibilidade.

O registro é feito no **Registro.br** (entidade responsável por domínios brasileiros) e custa em média **R$ 40,00/ano**.

**Requisitos para registrar .adv.br:**
- Ser advogado(a) inscrito(a) na OAB (ativo)
- CPF vinculado ao número da OAB
- O nome do domínio deve se relacionar ao escritório ou nome do advogado`,
        steps: [
          'Acesse **registro.br** e crie uma conta (ou faça login)',
          'Clique em "Registrar Domínio" e digite o nome desejado com .adv.br',
          'O sistema verificará a disponibilidade e seu vínculo com a OAB',
          'Preencha os dados cadastrais e confirme o registro',
          'Efetue o pagamento (boleto, cartão ou PIX)',
          'O domínio estará ativo em até 24 horas',
        ],
        tips: [
          'Escolha um nome curto e fácil de soletrar por telefone',
          'Prefira o nome do escritório (ex: silvaadvogados.adv.br) ao nome pessoal',
          'Registre também variações comuns para proteger sua marca',
          'O domínio precisa ser renovado anualmente — ative a renovação automática',
        ],
        links: [
          { label: 'Registro.br', url: 'https://registro.br' },
        ],
      },
      {
        title: 'Ativando o Google Workspace',
        subtitle: 'Passo a passo da assinatura e configuração inicial',
        level: 'iniciante',
        icon: 'download',
        content: `Com o domínio .adv.br registrado, você está pronto para ativar o Google Workspace. O processo leva cerca de **30 minutos**.`,
        steps: [
          'Acesse **workspace.google.com** e clique em "Começar"',
          'Informe o nome do escritório, número de funcionários e país',
          'Digite seu domínio .adv.br quando solicitado',
          'Crie sua conta de administrador (ex: admin@seuescritorio.adv.br)',
          'Escolha o plano desejado e insira os dados de pagamento',
          'Verifique a propriedade do domínio adicionando um registro TXT no Registro.br',
          'Configure os registros MX para direcionar emails ao Gmail',
          'Aguarde até 48h para propagação DNS (geralmente leva menos de 4h)',
        ],
        flowSteps: [
          { title: 'Criar conta Google Workspace', description: 'Acesse workspace.google.com e inicie o cadastro com seu domínio .adv.br' },
          { title: 'Verificar domínio', description: 'Adicione o registro TXT fornecido pelo Google no painel do Registro.br' },
          { title: 'Configurar DNS (registros MX)', description: 'Substitua os registros MX padrão pelos do Google para receber emails' },
          { title: 'Aguardar propagação', description: 'Em 1-48h seus emails começarão a chegar no Gmail profissional' },
          { title: 'Configurar Admin Console', description: 'Acesse admin.google.com para personalizar seu ambiente' },
        ],
        tips: [
          'Se tiver dificuldade com DNS, o suporte do Google ajuda gratuitamente durante a configuração',
          'Guarde as credenciais de administrador em local seguro — esse acesso controla todo o escritório',
        ],
      },
      {
        title: 'Configuração Inicial do Admin Console',
        subtitle: 'Seu painel de controle do escritório digital',
        level: 'intermediario',
        icon: 'settings',
        content: `O **Admin Console** (admin.google.com) é o centro de comando do seu Google Workspace. Nele você gerencia usuários, segurança, apps e configurações de todo o escritório.

**Configurações essenciais para o primeiro acesso:**

- **Perfil da organização:** Nome do escritório, logo, endereço
- **Segurança:** Ativar verificação em duas etapas (2FA) para todos
- **Apps:** Habilitar/desabilitar ferramentas do Google Workspace
- **Domínio:** Verificar que emails estão sendo recebidos corretamente
- **Diretório:** Adicionar informações de contato da equipe

O Admin Console tem mais de 200 configurações. Não tente ajustar tudo de uma vez — comece pelo essencial e vá refinando com o tempo.`,
        steps: [
          'Acesse **admin.google.com** com a conta de administrador',
          'Vá em **Perfil da Organização** e adicione logo e dados do escritório',
          'Em **Segurança > Autenticação**, ative a verificação em duas etapas',
          'Em **Apps > Google Workspace**, verifique quais ferramentas estão ativas',
          'Em **Diretório > Usuários**, verifique que sua conta está configurada corretamente',
          'Em **Faturamento**, confirme que o plano e pagamento estão corretos',
        ],
        tips: [
          'Adicione um segundo administrador como backup — nunca tenha apenas um',
          'Ative alertas de segurança para receber notificações de atividades suspeitas',
        ],
      },
      {
        title: 'Adicionando Usuários e Licenças',
        subtitle: 'Gestão da equipe no escritório digital',
        level: 'intermediario',
        icon: 'users',
        content: `Cada pessoa do escritório precisa de uma licença Google Workspace. Isso inclui advogados, estagiários, secretárias e administrativo.

**Como adicionar usuários:**

1. Acesse Admin Console > Diretório > Usuários
2. Clique em "Adicionar novo usuário"
3. Preencha nome, sobrenome e email (ex: joao.silva@escritorio.adv.br)
4. Defina uma senha temporária
5. O usuário receberá um email com instruções de primeiro acesso

**Boas práticas para emails do escritório:**
- Advogados: nome.sobrenome@escritorio.adv.br
- Equipe: primeiro.nome@escritorio.adv.br
- Setores: financeiro@, atendimento@, juridico@

**Unidades Organizacionais (OUs):**
Organize seus usuários em grupos para aplicar políticas diferentes:
- /Sócios — acesso total
- /Advogados — acesso padrão
- /Estagiários — acesso restrito
- /Administrativo — apenas email e calendário`,
        tips: [
          'Crie emails de grupo (equipe@escritorio.adv.br) para comunicação coletiva',
          'Estagiários podem usar o mesmo plano — o custo é por licença',
          'Ao desligar alguém, transfira os dados antes de excluir a conta',
        ],
      },
      {
        title: 'Migrando do Email Gratuito',
        subtitle: 'Como sair do Gmail pessoal ou Outlook sem perder nada',
        level: 'intermediario',
        icon: 'arrow-right-left',
        content: `A migração é o momento mais crítico. É possível trazer todos os seus emails, contatos e calendários antigos para o novo Google Workspace sem perder nada.

**Opções de migração:**
- **Gmail pessoal → Google Workspace:** Use a ferramenta de migração nativa do Admin Console
- **Outlook/Hotmail → Google Workspace:** Use o Google Workspace Migration for Microsoft Outlook (GWMMO)
- **Outro provedor (Locaweb, UOL, etc.) → Google Workspace:** Migração via IMAP

**O que é migrado:**
- Todos os emails e pastas/labels
- Contatos do catálogo de endereços
- Eventos do calendário
- Não migra: configurações do app, senhas salvas, regras de filtro`,
        steps: [
          'No Admin Console, vá em **Migração de Dados**',
          'Selecione a origem (Gmail, Outlook, IMAP genérico)',
          'Autentique com as credenciais da conta antiga',
          'Selecione o que migrar: emails, contatos, calendário',
          'Inicie a migração — pode levar de minutos a horas dependendo do volume',
          'Verifique que tudo chegou corretamente',
          'Configure redirecionamento do email antigo para o novo (temporário)',
          'Atualize seu email na OAB, tribunais e contatos',
        ],
        tips: [
          'Faça a migração num fim de semana para minimizar interrupções',
          'Mantenha o email antigo ativo por 3-6 meses para receber mensagens residuais',
          'Atualize seu email no PJe, Projudi e sistemas dos tribunais ANTES de desativar o antigo',
          'Crie uma assinatura no email antigo dizendo "Novo email: xxx@escritorio.adv.br"',
        ],
      },
      {
        title: 'Glossário Google Workspace',
        subtitle: 'Termos essenciais traduzidos para advogados',
        level: 'iniciante',
        icon: 'book-open',
        content: `**Admin Console** — Painel de administração do Google Workspace. É como a "portaria" do seu escritório digital.

**Domínio** — Seu endereço na internet (ex: seuescritorio.adv.br). É como o endereço físico do escritório.

**DNS (Domain Name System)** — Sistema que traduz nomes de domínio em endereços IP. Você configura registros DNS para que o email funcione.

**Registros MX** — Configuração de DNS que diz para onde enviar os emails do seu domínio.

**Unidade Organizacional (OU)** — Divisão dentro do Google Workspace para aplicar configurações diferentes por grupo (ex: sócios vs. estagiários).

**2FA / Verificação em Duas Etapas** — Segurança extra que exige senha + código do celular para fazer login.

**Google Vault** — Ferramenta de preservação legal e eDiscovery (disponível no Business Plus e Enterprise).

**DLP (Data Loss Prevention)** — Regras automáticas que impedem o vazamento de dados sensíveis.

**AppSheet** — Plataforma do Google para criar aplicativos sem programação.

**Gemini** — A inteligência artificial do Google, integrada a todos os apps do Workspace.

**NotebookLM** — Ferramenta de pesquisa com IA que analisa documentos que você carrega.

**Google Workspace Marketplace** — Loja de complementos e extensões para o Google Workspace.`,
      },
      {
        title: 'ROI do Google Workspace',
        subtitle: 'Análise custo-benefício para escritórios de advocacia',
        level: 'avancado',
        icon: 'trending-up',
        content: `Muitos escritórios gastam mais com ferramentas separadas do que gastariam com Google Workspace. Veja a comparação:

**Escritório solo — Custo mensal SEM Google Workspace:**

| Ferramenta | Custo Mensal |
|-----------|-------------|
| Email profissional (Locaweb/UOL) | R$ 25-50 |
| Armazenamento nuvem (Dropbox/OneDrive) | R$ 50-70 |
| Videoconferência (Zoom) | R$ 70-90 |
| Software jurídico básico | R$ 100-200 |
| Site institucional (hospedagem) | R$ 30-50 |
| **Total estimado** | **R$ 275-460** |

**Escritório solo — Custo com Google Workspace Business Starter:**

| Recurso | Custo Mensal |
|---------|-------------|
| Google Workspace (tudo incluído) | R$ 33,60 |
| **Total** | **R$ 33,60** |

**Economia: até R$ 425/mês ou R$ 5.100/ano para UM advogado solo.**

Para um escritório de 10 pessoas, a economia pode ultrapassar **R$ 30.000/ano**, além dos ganhos de produtividade com integração nativa entre as ferramentas.`,
        tips: [
          'O Google Workspace substitui 6-8 ferramentas pagas separadamente',
          'A produtividade aumenta 20-30% pela integração nativa (email + calendário + docs + meet)',
          'Elimina custos de TI: sem servidor, sem backup manual, sem manutenção',
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // SEÇÃO 2: COMUNICAÇÃO PROFISSIONAL
  // ═══════════════════════════════════════════════════════════
  {
    id: 'comunicacao',
    title: 'Comunicação Profissional',
    description: 'Gmail, Calendar, Meet e Chat configurados para a advocacia',
    icon: 'mail',
    cards: [
      {
        title: 'Gmail Profissional com Domínio .adv.br',
        subtitle: 'Email que transmite credibilidade: advogado@seuescritorio.adv.br',
        level: 'iniciante',
        icon: 'mail',
        content: `O email é o cartão de visitas digital do advogado. Um email **@seuescritorio.adv.br** transmite profissionalismo imediato — muito diferente de um @gmail.com pessoal.

Com o Gmail profissional do Google Workspace você tem:
- **Até 30 GB de armazenamento** (Starter) ou 2-5 TB (Standard/Plus)
- **Busca poderosa** — encontre qualquer email em segundos
- **Filtros e labels** — organize automaticamente por cliente, tribunal ou assunto
- **Spam quase zero** — o filtro do Google bloqueia 99,9% do spam
- **Acesso em qualquer lugar** — celular, tablet, notebook, qualquer navegador

O Gmail do Workspace é visualmente idêntico ao Gmail pessoal, então a curva de aprendizado é praticamente zero.`,
        steps: [
          'Após ativar o Google Workspace, acesse **mail.google.com** com sua conta profissional',
          'Configure sua foto de perfil (aparecerá nos emails enviados)',
          'Crie sua assinatura de email profissional (veja o próximo card)',
          'Configure o aplicativo Gmail no celular com a conta profissional',
          'Crie labels para organizar: Clientes, Tribunais, Financeiro, Urgente',
        ],
        tips: [
          'Mantenha a Caixa de Entrada limpa: responda, delegue ou arquive cada email',
          'Use a estrela amarela para marcar emails que precisam de ação',
          'O atalho **E** arquiva emails rapidamente (ativa em Configurações > Atalhos de teclado)',
        ],
      },
      {
        title: 'Assinaturas de Email Jurídicas',
        subtitle: 'Modelo profissional com dados da OAB',
        level: 'iniciante',
        icon: 'pen-tool',
        content: `Uma assinatura de email profissional deve conter:
- Nome completo do advogado
- Número da OAB/UF
- Nome do escritório
- Telefone e WhatsApp
- Endereço
- Disclaimer de confidencialidade

**Como configurar:**
Gmail > Configurações (engrenagem) > Ver todas as configurações > Geral > Assinatura`,
        prompt: `------------------------------------------
Dr(a). [NOME COMPLETO]
Advogado(a) | OAB/[UF] [NÚMERO]

[NOME DO ESCRITÓRIO]
Tel: (XX) XXXX-XXXX | WhatsApp: (XX) XXXXX-XXXX
[Endereço completo]
[site.adv.br]

AVISO DE CONFIDENCIALIDADE: Esta mensagem pode conter informações confidenciais e protegidas por sigilo profissional (Art. 7° do Código de Ética e Disciplina da OAB). Se você não é o destinatário, por favor apague-a e notifique o remetente.
------------------------------------------`,
        tips: [
          'Mantenha a assinatura limpa — evite muitas cores, fontes ou imagens grandes',
          'Crie duas assinaturas: uma completa (para novos contatos) e uma reduzida (para respostas)',
          'O disclaimer de confidencialidade é recomendado pela OAB',
        ],
      },
      {
        title: 'Organização com Labels e Filtros',
        subtitle: 'Automatize a organização do seu inbox',
        level: 'intermediario',
        icon: 'folder-open',
        content: `Labels (etiquetas) e Filtros são a dupla poderosa do Gmail. Labels categorizam emails; Filtros aplicam ações automaticamente.

**Estrutura de Labels recomendada para advogados:**
- 01_CLIENTES (com sub-labels por cliente)
- 02_TRIBUNAIS (TJ, TRT, TRF, STJ, STF)
- 03_PRAZOS (Urgente, Esta Semana, Este Mês)
- 04_FINANCEIRO (Honorários, Custas, Fornecedores)
- 05_INTERNO (Equipe, Administrativo)

**Filtros automáticos úteis:**
- Emails de tribunais → Label "02_TRIBUNAIS" + Estrela
- Emails com "intimação" ou "prazo" → Label "03_PRAZOS/Urgente" + Marcar como importante
- Newsletters → Pular Caixa de Entrada + Label "Leitura"
- Emails de clientes específicos → Label do cliente + Notificação`,
        steps: [
          'No Gmail, clique no ícone **+** ao lado de "Labels" na barra lateral',
          'Crie a estrutura hierárquica (01_CLIENTES > Cliente A, Cliente B...)',
          'Para criar filtros: clique na seta no campo de busca > preencha critérios > "Criar filtro"',
          'Selecione as ações: aplicar label, marcar como importante, nunca enviar para spam',
          'Marque "Aplicar também a conversas existentes" para organizar emails antigos',
        ],
        tips: [
          'Use cores diferentes para labels de prioridade alta (vermelho), média (amarelo) e baixa (verde)',
          'Filtros podem ser combinados — um email pode ter múltiplas labels',
          'Exporte seus filtros como backup: Configurações > Filtros > Exportar',
        ],
      },
      {
        title: 'Google Calendar para Prazos Processuais',
        subtitle: 'Nunca mais perca um prazo',
        level: 'iniciante',
        icon: 'calendar',
        analogy: {
          tag: 'Analogia',
          text: 'O Google Calendar é como um **quadro de prazos inteligente** que fica na parede do escritório — só que ele te manda alertas no celular, compartilha automaticamente com sua equipe, e nunca deixa você esquecer uma audiência.',
        },
        content: `O controle de prazos é a atividade mais crítica de um escritório de advocacia. Um prazo perdido pode gerar responsabilidade civil e disciplinar. O Google Calendar resolve isso com:

- **Calendários separados por tipo:** Prazos Processuais, Audiências, Reuniões, Pessoal
- **Alertas múltiplos:** 1 semana antes + 3 dias antes + 1 dia antes + 2 horas antes
- **Cores por urgência:** Vermelho (fatal), Laranja (importante), Azul (rotina)
- **Compartilhamento:** Toda equipe vê os prazos (ou apenas os seus)
- **Integração com Meet:** Audiências virtuais criam link automaticamente

**Calendários recomendados:**
- **Prazos Fatais** (vermelho) — contestação, recurso, impugnação
- **Audiências** (roxo) — presenciais e virtuais
- **Reuniões** (azul) — clientes, equipe, parceiros
- **Administrativo** (verde) — financeiro, RH, fornecedores`,
        steps: [
          'Acesse **calendar.google.com** com sua conta profissional',
          'Crie calendários separados: clique no **+** ao lado de "Outros calendários"',
          'Defina cores para cada calendário (vermelho para prazos fatais)',
          'Ao criar um evento de prazo, adicione **múltiplos alertas** (7 dias, 3 dias, 1 dia, 2h)',
          'Compartilhe o calendário de prazos com toda a equipe jurídica',
          'Instale o app Calendar no celular para receber alertas em tempo real',
        ],
        tips: [
          'Sempre crie o prazo no Calendar NO MOMENTO em que receber a intimação — não deixe para depois',
          'Para prazos fatais, coloque o lembrete para o dia do vencimento E para 2 dias úteis antes',
          'Use "Prazo fatal" como prefixo no título do evento para destaque visual',
          'Ative notificações por email além das notificações push no celular',
        ],
      },
      {
        title: 'Google Meet para Audiências Virtuais',
        subtitle: 'Videoconferência profissional para audiências e reuniões',
        level: 'intermediario',
        icon: 'video',
        content: `O Google Meet é a ferramenta de videoconferência integrada ao Google Workspace. Desde a pandemia, audiências virtuais se tornaram rotina no Judiciário brasileiro.

**Recursos do Meet para advogados:**
- **Até 150-500 participantes** dependendo do plano
- **Gravação automática** (Standard e acima) — salva no Drive
- **Transcrição com IA** — Gemini transcreve a reunião em texto
- **Compartilhamento de tela** — apresente documentos e evidências
- **Salas de espera** — controle quem entra na audiência
- **Legendas em tempo real** — acessibilidade
- **Cancelamento de ruído** — filtra barulhos de fundo

**Para audiências virtuais:**
O Meet funciona diretamente no navegador, sem instalar nada. Basta enviar o link ao juiz ou à parte contrária.`,
        tips: [
          'Teste sua câmera, microfone e conexão 15 minutos antes da audiência',
          'Use fundo desfocado ou virtual com aparência profissional (estante de livros)',
          'Sempre grave audiências importantes (com autorização) — a gravação vai direto para o Drive',
          'Mantenha o microfone no mudo quando não estiver falando',
          'Tenha um plano B: número de telefone para entrar na reunião por ligação',
        ],
      },
      {
        title: 'Google Chat para Comunicação Interna',
        subtitle: 'Mensagens instantâneas entre a equipe do escritório',
        level: 'intermediario',
        icon: 'message-circle',
        content: `O Google Chat substitui o WhatsApp para comunicação profissional interna. A vantagem: é integrado ao Workspace, os dados ficam sob controle do escritório, e não mistura vida pessoal com trabalho.

**Espaços (Spaces) recomendados para escritórios:**
- **#geral** — comunicados para todo escritório
- **#jurídico** — discussões de casos e estratégia
- **#administrativo** — questões operacionais
- **#prazos-urgentes** — alertas de prazos vencendo
- **#financeiro** — cobrança, pagamentos, custas

**Vantagens sobre WhatsApp:**
- Mensagens ficam no ambiente corporativo (não no celular pessoal)
- Busca avançada por conteúdo e data
- Integração com Drive, Docs e Meet (compartilhe e edite arquivos direto no chat)
- O administrador pode aplicar políticas de retenção e compliance
- Separação clara entre trabalho e vida pessoal`,
        tips: [
          'Crie um Espaço para cada caso grande — facilita encontrar informações depois',
          'Use @menção para direcionar mensagens a pessoas específicas',
          'Arquivos compartilhados no Chat ficam automaticamente no Drive',
        ],
      },
      {
        title: 'Templates de Email para Advogados',
        subtitle: 'Modelos prontos para situações recorrentes',
        level: 'iniciante',
        icon: 'copy',
        content: `O Gmail permite criar **modelos de resposta** (templates) para situações que se repetem no dia a dia do escritório. Ative em: Configurações > Avançado > Modelos > Ativar.

**Modelos essenciais para advogados:**
- Confirmação de recebimento de documentos
- Agendamento de reunião com cliente
- Envio de proposta de honorários
- Atualização de andamento processual
- Cobrança de honorários em atraso
- Resposta a consulta inicial`,
        prompt: `Assunto: Atualização do seu processo - [NÚMERO DO PROCESSO]

Prezado(a) Sr(a). [NOME DO CLIENTE],

Informo que no dia [DATA], houve a seguinte movimentação no seu processo nº [NÚMERO]:

[DESCRIÇÃO DA MOVIMENTAÇÃO]

Próximos passos: [PRÓXIMOS PASSOS]

Prazo relevante: [PRAZO, SE HOUVER]

Fico à disposição para esclarecer qualquer dúvida.

Atenciosamente,
[ASSINATURA]`,
        steps: [
          'No Gmail, vá em **Configurações > Avançado > Modelos** e ative',
          'Compose um novo email com o texto do modelo',
          'Clique nos **3 pontos** no rodapé do email > Modelos > Salvar rascunho como modelo',
          'Para usar: abra novo email > 3 pontos > Modelos > selecione o modelo desejado',
          'Personalize os campos entre colchetes antes de enviar',
        ],
      },
      {
        title: 'Caixa de Email Compartilhada',
        subtitle: 'atendimento@escritorio.adv.br para toda equipe',
        level: 'avancado',
        icon: 'users',
        content: `Uma caixa compartilhada permite que múltiplas pessoas respondam emails de um mesmo endereço (ex: atendimento@escritorio.adv.br) sem precisar compartilhar senhas.

**Casos de uso no escritório:**
- **atendimento@** — captação de novos clientes
- **financeiro@** — cobranças e pagamentos
- **juridico@** — comunicações com tribunais

**Como configurar:**
Existem duas formas:
1. **Grupo com caixa colaborativa** (gratuito): Crie um grupo no Admin Console e habilite "Caixa de entrada colaborativa"
2. **Acesso delegado** (mais simples): Uma conta real com acesso delegado a outros usuários

A opção 1 é melhor para equipes, pois permite atribuir emails a pessoas específicas e marcar como resolvido.`,
        steps: [
          'No Admin Console, vá em **Grupos** e crie um novo grupo',
          'Defina o email (ex: atendimento@escritorio.adv.br)',
          'Adicione os membros que terão acesso',
          'Habilite "Caixa de entrada colaborativa" nas configurações do grupo',
          'Os membros acessam pelo Gmail: a caixa aparecerá na barra lateral',
        ],
      },
      {
        title: 'Integração Calendar + Meet + Gmail',
        subtitle: 'Fluxo completo de agendamento e reunião',
        level: 'avancado',
        icon: 'workflow',
        content: `A grande força do Google Workspace é a integração nativa entre as ferramentas. Veja como Calendar, Meet e Gmail trabalham juntos num fluxo real:`,
        flowSteps: [
          { title: 'Cliente solicita reunião por email', description: 'O email chega no Gmail e você identifica a necessidade de agendar' },
          { title: 'Criar evento no Calendar', description: 'Direto do Gmail, clique em "Agendar" — o Calendar abre com os dados preenchidos' },
          { title: 'Link do Meet gerado automaticamente', description: 'O Calendar cria um link do Google Meet e inclui no convite' },
          { title: 'Convite enviado por email', description: 'O cliente recebe o convite com data, hora e link do Meet automaticamente' },
          { title: 'Lembrete automático', description: 'Calendar envia lembrete ao cliente e a você 30 minutos antes' },
          { title: 'Reunião com gravação', description: 'No Meet, grave a reunião — o arquivo vai automaticamente para o Drive' },
          { title: 'Notas resumidas pelo Gemini', description: 'O Gemini gera um resumo automático e envia por email a todos os participantes' },
        ],
        tips: [
          'Esse fluxo inteiro acontece automaticamente — você só precisa criar o evento',
          'O Gemini resume a reunião em tópicos com pontos de ação — perfeito para registro',
        ],
      },
      {
        title: 'Respostas Automáticas e Férias',
        subtitle: 'Configure o "out of office" profissional',
        level: 'iniciante',
        icon: 'clock',
        content: `Quando sair de férias ou estiver em audiência o dia inteiro, configure respostas automáticas no Gmail para que clientes e colegas saibam que você não está disponível.

**Como ativar:**
Gmail > Configurações > Geral > Resposta automática de férias

**Modelo profissional:**`,
        prompt: `Prezado(a),

Obrigado pelo seu contato. Estou ausente do escritório de [DATA INÍCIO] a [DATA RETORNO], com acesso limitado a emails.

Para assuntos urgentes, entre em contato com:
- Dr(a). [NOME COLEGA] — [email@escritorio.adv.br] — Tel: (XX) XXXX-XXXX

Responderei sua mensagem assim que retornar.

Atenciosamente,
[NOME]
OAB/[UF] [NÚMERO]`,
        tips: [
          'Ative a opção "Enviar resposta apenas para pessoas nos meus contatos" para evitar responder spam',
          'Sempre indique um colega como contato de emergência',
          'Para audiências de dia inteiro, use a resposta automática por período curto',
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // SEÇÃO 3: DOCUMENTOS JURÍDICOS
  // ═══════════════════════════════════════════════════════════
  {
    id: 'documentos',
    title: 'Documentos Jurídicos',
    description: 'Petições, contratos, apresentações e formulários no Google Workspace',
    icon: 'file-text',
    cards: [
      {
        title: 'Google Docs para Petições',
        subtitle: 'Templates profissionais com formatação ABNT',
        level: 'iniciante',
        icon: 'file-text',
        analogy: {
          tag: 'Analogia',
          text: 'O Google Docs é uma **máquina de escrever moderna** que salva automaticamente, permite edição simultânea com colegas, rastreia todas as alterações e está disponível em qualquer dispositivo com internet.',
        },
        content: `O Google Docs é a ferramenta de criação de documentos do Google Workspace. Para advogados, ele substitui o Microsoft Word com vantagens significativas:

- **Salvamento automático** — nunca mais perca um documento por queda de energia
- **Edição colaborativa** — dois advogados podem editar a mesma petição ao mesmo tempo
- **Histórico de versões** — veja todas as alterações feitas e restaure versões anteriores
- **Acesso em qualquer lugar** — celular, tablet, notebook
- **Compatibilidade** — exporta para .docx (Word), .pdf, .odt

**Formatação para petições (padrão ABNT/Judiciário):**
- Fonte: Times New Roman ou Arial, 12pt
- Espaçamento entre linhas: 1,5
- Margens: Superior 3cm, Inferior 2cm, Esquerda 3cm, Direita 2cm
- Alinhamento: Justificado
- Numeração de páginas: canto inferior direito`,
        steps: [
          'Acesse **docs.google.com** e clique em "+ Documento em branco"',
          'Configure as margens: Arquivo > Configuração de página',
          'Defina a fonte padrão: selecione todo o texto, escolha Times New Roman 12pt',
          'Configure espaçamento: Formatar > Espaçamento entre linhas > 1,5',
          'Ative a numeração de páginas: Inserir > Números de página',
          'Salve como template: este documento vira seu modelo base',
        ],
        tips: [
          'Use Estilos (Título 1, Título 2) para criar sumário automático em peças longas',
          'O atalho Ctrl+Shift+V cola texto sem formatação — essencial ao copiar de outras fontes',
          'Ative "Sugerir edições" (canto superior direito) para revisão por colegas sem alterar o original',
        ],
      },
      {
        title: 'Template de Contrato de Honorários',
        subtitle: 'Modelo editável no Google Docs',
        level: 'intermediario',
        icon: 'file-check',
        content: `Um bom contrato de honorários protege o advogado e dá segurança ao cliente. Use este modelo como base e personalize para seu escritório.

O template inclui:
- Qualificação das partes
- Objeto do contrato
- Honorários (fixo, êxito ou misto)
- Forma de pagamento
- Obrigações do contratante e contratado
- Prazo e rescisão
- Foro de eleição
- Assinaturas`,
        prompt: `CONTRATO DE PRESTAÇÃO DE SERVIÇOS ADVOCATÍCIOS

CONTRATANTE: [NOME COMPLETO], [nacionalidade], [estado civil], [profissão], inscrito(a) no CPF sob o nº [CPF], residente e domiciliado(a) na [ENDEREÇO COMPLETO].

CONTRATADO(A): [NOME DO ADVOGADO], advogado(a) inscrito(a) na OAB/[UF] sob o nº [NÚMERO], com escritório profissional na [ENDEREÇO DO ESCRITÓRIO].

CLÁUSULA 1ª - DO OBJETO
O(A) CONTRATADO(A) se obriga a prestar serviços advocatícios ao CONTRATANTE, consistentes em [DESCRIÇÃO DETALHADA DOS SERVIÇOS], perante [ÓRGÃO/TRIBUNAL].

CLÁUSULA 2ª - DOS HONORÁRIOS
Pelos serviços prestados, o CONTRATANTE pagará ao CONTRATADO(A):
a) Honorários contratuais fixos de R$ [VALOR] ([VALOR POR EXTENSO]);
b) Honorários de êxito de [PERCENTUAL]% sobre o proveito econômico obtido.

CLÁUSULA 3ª - DA FORMA DE PAGAMENTO
[DETALHAR PARCELAS, DATAS, FORMA DE PAGAMENTO]

CLÁUSULA 4ª - DAS OBRIGAÇÕES DO CONTRATANTE
O CONTRATANTE se compromete a fornecer todos os documentos e informações necessários, comparecer às audiências quando convocado e manter seus dados de contato atualizados.

CLÁUSULA 5ª - DO PRAZO
O presente contrato vigorará até o trânsito em julgado da demanda ou até rescisão por qualquer das partes, mediante notificação com 30 dias de antecedência.

CLÁUSULA 6ª - DO FORO
Fica eleito o foro da Comarca de [CIDADE/UF] para dirimir quaisquer dúvidas oriundas deste contrato.

[LOCAL], [DATA]

_______________________________
CONTRATANTE

_______________________________
CONTRATADO(A) - OAB/[UF] [NÚMERO]`,
      },
      {
        title: 'Template de Procuração Ad Judicia',
        subtitle: 'Modelo padrão para outorga de poderes',
        level: 'iniciante',
        icon: 'scroll-text',
        content: `A procuração ad judicia é documento essencial para a representação processual. Mantenha um modelo no Google Docs para rápida personalização.`,
        prompt: `PROCURAÇÃO AD JUDICIA

OUTORGANTE: [NOME COMPLETO], [nacionalidade], [estado civil], [profissão], portador(a) da Cédula de Identidade RG nº [RG] e inscrito(a) no CPF/MF sob o nº [CPF], residente e domiciliado(a) na [ENDEREÇO COMPLETO].

OUTORGADO(A): [NOME DO ADVOGADO], advogado(a), inscrito(a) na OAB/[UF] sob o nº [NÚMERO], com escritório profissional na [ENDEREÇO], onde recebe intimações e notificações.

PODERES: O(A) Outorgante nomeia e constitui o(a) Outorgado(a) como seu(sua) advogado(a) e procurador(a), com poderes da cláusula "ad judicia", nos termos do Art. 105 do Código de Processo Civil, para o foro em geral, podendo propor ações, contestar, recorrer, transigir, desistir, dar e receber quitação, firmar compromissos, substabelecer com ou sem reserva de poderes, e praticar todos os demais atos necessários ao fiel cumprimento deste mandato.

[LOCAL], [DATA].

_______________________________
OUTORGANTE`,
      },
      {
        title: 'Google Slides para Sustentações Orais',
        subtitle: 'Apresentações profissionais para o tribunal',
        level: 'intermediario',
        icon: 'presentation',
        content: `O Google Slides é ideal para criar apresentações de sustentação oral, reuniões com clientes e palestras jurídicas.

**Boas práticas para sustentação oral:**
- Máximo de 10-15 slides para sustentação de 15 minutos
- Fonte grande (mínimo 24pt) para leitura à distância
- Um argumento por slide — não sobrecarregue
- Use cores sóbrias e profissionais
- Inclua timeline visual do caso
- Destaque os precedentes favoráveis
- Último slide com o pedido claro

**Estrutura sugerida:**
1. Capa (nome do caso, número do processo, partes)
2. Resumo dos fatos (2-3 slides)
3. Questão jurídica em discussão
4. Fundamentos (3-4 slides com precedentes)
5. Pedido/conclusão`,
        tips: [
          'Exporte como PDF antes da audiência — evita problemas de compatibilidade',
          'Teste a apresentação no modo de apresentação antes da sustentação',
          'Mantenha o Slides aberto no notebook durante a sustentação para referência rápida',
          'Use o modo "Apresentador" para ver notas que só você vê',
        ],
      },
      {
        title: 'Google Forms para Intake de Clientes',
        subtitle: 'Formulário profissional de captação',
        level: 'intermediario',
        icon: 'form-input',
        content: `O Google Forms cria formulários profissionais para captação de clientes. As respostas vão automaticamente para uma planilha do Google Sheets.

**Seções recomendadas para intake jurídico:**

**Seção 1 — Dados Pessoais**
- Nome completo (obrigatório)
- CPF (validação: 11 dígitos)
- Email (obrigatório)
- Telefone com DDD (obrigatório)
- Endereço completo

**Seção 2 — Informações do Caso**
- Área do Direito (lista suspensa: Trabalhista, Cível, Família, Criminal, etc.)
- Descrição resumida do caso (parágrafo)
- Já tem processo em andamento? (Sim/Não)
- Número do processo (se houver)

**Seção 3 — Documentos**
- Upload de documentos relevantes (configurar aceitar PDF, imagens)
- Observações adicionais`,
        flowSteps: [
          { title: 'Cliente acessa o formulário', description: 'Link no site do escritório ou enviado por WhatsApp/email' },
          { title: 'Preenche dados e anexa documentos', description: 'Formulário com validação automática de campos' },
          { title: 'Resposta vai para planilha', description: 'Sheets organiza automaticamente todas as respostas' },
          { title: 'Email de confirmação automático', description: 'Cliente recebe confirmação de que o formulário foi recebido' },
          { title: 'Equipe recebe notificação', description: 'Gmail avisa que um novo lead chegou' },
        ],
        tips: [
          'Publique o formulário no site do escritório (Google Sites)',
          'Use lógica condicional: dependendo da área do direito, mostre perguntas específicas',
          'Limite o upload de arquivos a 10 MB para evitar abusos',
        ],
      },
      {
        title: 'Google Sites para Site Institucional',
        subtitle: 'Site profissional sem custo extra de hospedagem',
        level: 'avancado',
        icon: 'globe',
        content: `O Google Sites permite criar um site institucional simples e profissional para seu escritório — **sem custo adicional** além da assinatura do Google Workspace, sem precisar de programador.

**Páginas essenciais:**
- **Home** — apresentação do escritório com foto da equipe
- **Áreas de Atuação** — lista das especialidades
- **Equipe** — perfil dos advogados com foto e OAB
- **Contato** — formulário do Google Forms integrado + endereço + mapa
- **Blog/Artigos** — conteúdo jurídico (opcional, mas bom para SEO)

O site é publicado automaticamente em **sites.google.com/seuescritorio.adv.br** ou pode usar domínio personalizado **www.seuescritorio.adv.br**.`,
        steps: [
          'Acesse **sites.google.com** e clique em "+ Criar"',
          'Escolha um template ou comece do zero',
          'Adicione as páginas essenciais usando o editor visual (arrastar e soltar)',
          'Insira o formulário do Google Forms na página de Contato',
          'Adicione o Google Maps com a localização do escritório',
          'Publique e configure o domínio personalizado',
        ],
        tips: [
          'Use fotos profissionais da equipe e do escritório',
          'Mantenha textos curtos e objetivos — clientes não leem paredes de texto',
          'O Google Sites é responsivo automaticamente (funciona em celular)',
          'Adicione depoimentos de clientes satisfeitos (com autorização)',
        ],
      },
      {
        title: 'Formatação ABNT no Google Docs',
        subtitle: 'Configuração padrão para documentos jurídicos',
        level: 'iniciante',
        icon: 'sliders',
        content: `A formatação padrão para petições e documentos jurídicos segue as normas ABNT e as exigências dos tribunais brasileiros. Configure uma vez e use como template para sempre.

| Elemento | Configuração |
|----------|-------------|
| Fonte | Times New Roman ou Arial, 12pt |
| Espaçamento | 1,5 entre linhas |
| Margem superior | 3 cm |
| Margem inferior | 2 cm |
| Margem esquerda | 3 cm |
| Margem direita | 2 cm |
| Alinhamento | Justificado |
| Recuo de parágrafo | 1,25 cm na primeira linha |
| Numeração | Canto inferior direito |
| Papel | A4 (21 x 29,7 cm) |`,
        steps: [
          'Arquivo > Configuração de página > defina margens (3, 2, 3, 2 cm)',
          'Selecione todo o texto (Ctrl+A) e defina Times New Roman 12pt',
          'Formatar > Espaçamento entre linhas > 1,5',
          'Formatar > Alinhar e recuar > Justificado',
          'Formatar > Alinhar e recuar > Opções de recuo > Especial: Primeira linha, 1,25 cm',
          'Inserir > Números de página > canto inferior direito',
          'Salve este documento como template base',
        ],
      },
      {
        title: 'Modelos de Documentos (Templates)',
        subtitle: 'Crie e compartilhe templates com toda equipe',
        level: 'intermediario',
        icon: 'copy',
        content: `Templates economizam horas de trabalho repetitivo. No Google Workspace, você pode criar templates de Docs, Sheets, Slides e Forms e disponibilizar para todo o escritório.

**Templates essenciais para escritórios de advocacia:**
- Petição Inicial (com formatação ABNT)
- Contestação (estrutura base)
- Recurso de Apelação (modelo)
- Contrato de Honorários (personalizado)
- Procuração Ad Judicia
- Parecer Jurídico
- Relatório Mensal para Cliente
- Planilha de Controle Financeiro
- Formulário de Intake de Clientes

**Como criar um template organizacional:**
No Business Standard ou superior, o administrador pode publicar templates oficiais do escritório que aparecem para todos os usuários ao criar um novo documento.`,
        steps: [
          'Crie o documento modelo com toda formatação desejada',
          'Use campos entre colchetes para variáveis: [NOME_CLIENTE], [NÚMERO_PROCESSO]',
          'Salve numa pasta compartilhada "Templates" no Drive',
          'Para templates organizacionais: Admin Console > Apps > Google Workspace > Drive > Templates',
          'Submeta o template para aprovação do administrador',
        ],
      },
      {
        title: 'Colaboração em Tempo Real',
        subtitle: 'Edição simultânea de documentos jurídicos',
        level: 'intermediario',
        icon: 'users',
        content: `Uma das maiores vantagens do Google Docs sobre o Word é a **edição colaborativa em tempo real**. Dois ou mais advogados podem trabalhar no mesmo documento simultaneamente.

**Modos de edição:**
- **Editar** — alterações são aplicadas diretamente
- **Sugerir** — alterações aparecem como sugestões (como "Controlar Alterações" do Word)
- **Visualizar** — somente leitura

**Casos de uso na advocacia:**
- Sócio revisa petição do associado em tempo real
- Dois advogados constroem uma tese conjuntamente
- Estagiário redige rascunho que o orientador corrige ao vivo
- Equipe colabora em relatório para cliente

**Comentários:**
Use Ctrl+Alt+M para adicionar comentários a trechos específicos. O colega recebe notificação por email e pode responder direto no documento.`,
        tips: [
          'Use o modo "Sugerir" para revisões — o autor original aceita ou rejeita cada alteração',
          'Comentários com @menção notificam a pessoa diretamente por email',
          'O Chat do Google aparece na barra lateral do documento — converse enquanto edita',
        ],
      },
      {
        title: 'Versionamento e Histórico',
        subtitle: 'Rastreie todas as alterações em contratos e petições',
        level: 'avancado',
        icon: 'clock',
        content: `O Google Docs mantém um **histórico completo de versões** de cada documento. Isso é essencial para advogados que precisam rastrear alterações em contratos, petições e pareceres.

**Como acessar:**
Arquivo > Histórico de versões > Ver histórico de versões (ou Ctrl+Alt+Shift+H)

**O que o histórico mostra:**
- Todas as alterações feitas, por quem e quando
- Código de cores por editor (cada pessoa tem uma cor)
- Possibilidade de restaurar qualquer versão anterior
- Nomear versões importantes (ex: "Versão aprovada pelo cliente")

**Caso prático — Revisão de contrato:**
1. Advogado redige v1 do contrato
2. Cliente solicita alterações por email
3. Advogado faz alterações no modo Sugerir
4. Nomeia a versão "v2 — Alterações solicitadas pelo cliente"
5. Se o cliente quiser voltar atrás, basta restaurar v1

Isso substitui o terrível sistema de salvar "Contrato_v1_final_FINAL_REVISADO2.docx".`,
        tips: [
          'Nomeie versões importantes: Arquivo > Histórico > "Dar nome a esta versão"',
          'O histórico é infinito — Google mantém todas as versões para sempre',
          'No Business Plus+, o Google Vault preserva versões mesmo que o documento seja excluído',
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // SEÇÃO 4: ORGANIZAÇÃO E GESTÃO
  // ═══════════════════════════════════════════════════════════
  {
    id: 'organizacao',
    title: 'Organização e Gestão',
    description: 'Drive, Sheets, Keep e Tasks para gerir o escritório',
    icon: 'folder-open',
    cards: [
      {
        title: 'Estrutura de Pastas no Google Drive',
        subtitle: 'Organização por cliente e processo',
        level: 'iniciante',
        icon: 'folder-open',
        analogy: {
          tag: 'Analogia',
          text: 'O Google Drive é o **arquivo físico** do escritório digitalizado. As pastas são as gavetas, os subdiretórios são as pastas suspensas e os documentos são os papéis — só que nunca se perdem, cabem infinitos e podem ser acessados de qualquer lugar.',
        },
        content: `Uma boa estrutura de pastas é a base do escritório digital. Recomendo esta organização:

\`\`\`
ESCRITÓRIO/
├── 01_CLIENTES/
│   ├── Silva_João_CPF123/
│   │   ├── Documentos_Pessoais/
│   │   ├── Processo_0001234-XX/
│   │   │   ├── Petições/
│   │   │   ├── Documentos/
│   │   │   └── Decisões/
│   │   └── Honorários/
│   └── Empresa_XYZ_CNPJ/
├── 02_MODELOS/
│   ├── Petições/
│   ├── Contratos/
│   └── Procurações/
├── 03_FINANCEIRO/
│   ├── Honorários/
│   ├── Custas/
│   └── Relatórios/
├── 04_ADMINISTRATIVO/
│   ├── RH/
│   ├── Fornecedores/
│   └── Marketing/
└── 05_JURISPRUDÊNCIA/
    ├── STF/
    ├── STJ/
    └── TJ_UF/
\`\`\`

**Convenção de nomes de arquivos:**
\`AAAA-MM-DD_TipoDocumento_NomeCliente.ext\`
Exemplo: \`2026-03-05_PeticaoInicial_SilvaJoao.docx\``,
        tips: [
          'Use prefixos numéricos (01_, 02_) para manter a ordem das pastas',
          'Inclua o CPF/CNPJ abreviado no nome da pasta do cliente para evitar duplicidade',
          'Crie uma pasta "ARQUIVO MORTO" para processos encerrados — não exclua',
          'Compartilhe apenas as pastas necessárias — nem todos precisam ver tudo',
        ],
      },
      {
        title: 'Convenção de Nomes de Arquivos',
        subtitle: 'Padrão AAAA-MM-DD_Tipo_Cliente para tudo',
        level: 'iniciante',
        icon: 'hash',
        content: `Uma convenção consistente de nomenclatura evita confusão e facilita buscas. Adote um padrão único para todo o escritório.

**Formato recomendado:**
\`AAAA-MM-DD_TipoDocumento_NomeCliente_Detalhes.ext\`

**Exemplos práticos:**
| Tipo | Nome do Arquivo |
|------|----------------|
| Petição Inicial | 2026-03-05_PeticaoInicial_SilvaJoao_Indenizacao.docx |
| Procuração | 2026-03-05_Procuracao_SilvaJoao_AdJudicia.docx |
| Contrato | 2026-03-05_Contrato_SilvaJoao_Honorarios.docx |
| Parecer | 2026-03-05_Parecer_EmpresaXYZ_Tributario.docx |
| Ata de reunião | 2026-03-05_Ata_SilvaJoao_ReuniaoInicial.docx |
| Nota fiscal | 2026-03_NF_Custas_SilvaJoao_TJ.pdf |

**Regras básicas:**
- Sem acentos, cedilha ou caracteres especiais nos nomes de arquivo
- Sem espaços — use underscore (_) ou CamelCase
- Data sempre no início (AAAA-MM-DD) para ordenação cronológica automática
- Tipo do documento abreviado e padronizado`,
      },
      {
        title: 'Google Sheets para Controle Financeiro',
        subtitle: 'Planilha de honorários, custas e fluxo de caixa',
        level: 'intermediario',
        icon: 'spreadsheet',
        content: `O Google Sheets é a calculadora financeira do escritório. Com uma planilha bem estruturada, você controla honorários, custas processuais, fluxo de caixa e inadimplência.

**Abas recomendadas:**
- **Honorários** — controle de pagamentos por cliente
- **Custas** — custas processuais e despesas do processo
- **Fluxo de Caixa** — entradas e saídas mensais
- **Dashboard** — gráficos e indicadores
- **Clientes** — cadastro base

**Colunas essenciais da aba Honorários:**
Cliente | Processo | Valor Total | Parcelas | Valor Parcela | Vencimento | Status | Data Pgto | Observações`,
        prompt: `=== GOOGLE SHEETS - CONTROLE DE HONORÁRIOS ===

Aba: HONORÁRIOS
Colunas: A=Cliente | B=Processo | C=Valor Total | D=Parcelas | E=Valor Parcela | F=Vencimento | G=Status | H=Data Pgto

Fórmulas úteis:
- Total recebido no mês: =SOMASES(E:E;G:G;"Pago";H:H;">="&DATAM(HOJE();0;1);H:H;"<"&DATAM(HOJE();1;1))
- Total em atraso: =SOMASES(E:E;G:G;"Pendente";F:F;"<"&HOJE())
- Taxa de inadimplência: =CONT.SES(G:G;"Atrasado")/CONT.SES(G:G;"<>")

Aba: FLUXO DE CAIXA
Colunas: A=Data | B=Descrição | C=Categoria | D=Entrada | E=Saída | F=Saldo
- Saldo acumulado: =F2+D3-E3 (arrastar para baixo)

Formatação condicional para Status:
- "Pago" = fundo verde
- "Pendente" = fundo amarelo
- "Atrasado" = fundo vermelho`,
        tips: [
          'Use validação de dados para o campo Status: Dados > Validação de dados > Lista de itens',
          'Proteja as fórmulas: Dados > Proteger planilhas e intervalos',
          'Use formatação condicional para destacar pagamentos em atraso (vermelho)',
          'Crie gráficos na aba Dashboard para visualizar tendências mensais',
        ],
      },
      {
        title: 'Dashboard de Gestão no Sheets',
        subtitle: 'Painel visual de indicadores do escritório',
        level: 'avancado',
        icon: 'bar-chart',
        content: `Um dashboard no Google Sheets dá visão rápida da saúde financeira e operacional do escritório. Crie uma aba "DASHBOARD" com gráficos automáticos.

**Indicadores recomendados:**
- **Faturamento mensal** — gráfico de barras (últimos 12 meses)
- **Processos ativos por área** — gráfico de pizza
- **Taxa de inadimplência** — percentual com meta
- **Processos novos vs. encerrados** — gráfico de linha
- **Top 5 clientes por faturamento** — tabela ranking
- **Honorários a receber** — total pendente

**Como criar:**
Use a função QUERY() para extrair dados das outras abas e SPARKLINE() para mini-gráficos dentro das células. Gráficos completos são inseridos com Inserir > Gráfico.`,
        tips: [
          'A função =QUERY() do Sheets é extremamente poderosa para extrair dados filtrados',
          'Use =SPARKLINE() para criar mini-gráficos em uma célula',
          'Compartilhe o dashboard como "somente visualização" com os sócios',
          'Atualize dados automaticamente com Apps Script (veja seção Automações)',
        ],
      },
      {
        title: 'Google Sheets para Controle de Prazos',
        subtitle: 'Planilha complementar ao Calendar',
        level: 'intermediario',
        icon: 'calendar',
        content: `Além do Calendar, uma planilha de prazos dá visão tabular completa. Combine ambos para máxima segurança.

**Colunas da planilha de prazos:**
Processo | Cliente | Tipo de Prazo | Data Início | Data Vencimento | Dias Restantes | Responsável | Status | Observações

A coluna "Dias Restantes" usa a fórmula: \`=SE(G2="Cumprido";"";E2-HOJE())\`

**Formatação condicional automática:**
- Menos de 3 dias: fundo vermelho + texto branco
- 3 a 7 dias: fundo laranja
- 8 a 15 dias: fundo amarelo
- Mais de 15 dias: fundo verde
- Cumprido: fundo cinza`,
        prompt: `=== PLANILHA DE PRAZOS PROCESSUAIS ===

Colunas: A=Processo | B=Cliente | C=Tipo Prazo | D=Publicação | E=Vencimento | F=Dias Restantes | G=Responsável | H=Status

Fórmula Dias Restantes (F2):
=SE(H2="Cumprido";"OK";SE(E2="";"";E2-HOJE()))

Formatação condicional para coluna F:
- F < 3 → Fundo #EA4335 (vermelho Google)
- F >= 3 E F < 7 → Fundo #FBBC04 (amarelo Google)
- F >= 7 E F < 15 → Fundo #34A853 (verde Google)
- F >= 15 → Fundo #4285F4 (azul Google)
- H = "Cumprido" → Fundo #E8EAED (cinza)`,
      },
      {
        title: 'Compartilhamento Seguro de Arquivos',
        subtitle: 'Permissões e níveis de acesso no Drive',
        level: 'intermediario',
        icon: 'share',
        content: `O compartilhamento no Google Drive tem 4 níveis de permissão:

| Nível | Pode fazer | Ideal para |
|-------|-----------|------------|
| **Proprietário** | Tudo, inclusive excluir e transferir propriedade | Quem criou o documento |
| **Editor** | Editar, comentar, compartilhar com outros | Advogados do caso |
| **Comentador** | Comentar, mas não editar o conteúdo | Revisores, clientes (feedback) |
| **Visualizador** | Apenas ler, sem alterar nada | Clientes (documentos finais) |

**Configurações de segurança importantes:**
- Desative "Qualquer pessoa com o link" para documentos sensíveis
- Use "Restrito" — somente pessoas adicionadas podem acessar
- Desative download/cópia/impressão quando necessário
- Configure data de validade para compartilhamentos temporários

**No Admin Console, o administrador pode:**
- Proibir compartilhamento externo por padrão
- Exigir aprovação para compartilhar fora do domínio
- Bloquear download de arquivos por visitantes`,
        tips: [
          'Nunca compartilhe pastas inteiras de clientes — compartilhe apenas documentos específicos',
          'Para enviar documento a cliente: compartilhe como "Visualizador" com opção de download',
          'Revise periodicamente quem tem acesso a cada pasta: Drive > Gerenciar acesso',
          'Use Drives Compartilhados (Business Standard+) para arquivos que pertencem ao escritório, não a indivíduos',
        ],
      },
      {
        title: 'Google Keep para Anotações Rápidas',
        subtitle: 'Notas de audiência, ideias e lembretes',
        level: 'iniciante',
        icon: 'lightbulb',
        content: `O Google Keep é o bloco de anotações digital do escritório. Ideal para notas rápidas durante audiências, reuniões e telefonemas.

**Usos práticos para advogados:**
- Anotar pontos-chave durante audiência
- Lista de documentos a solicitar ao cliente
- Ideias para teses e argumentos
- Checklist de tarefas do dia
- Lembrete de ligação para cliente

**Integração com outros apps:**
- Arraste uma nota do Keep direto para o Google Docs
- Defina lembretes com data e hora
- Compartilhe notas com colegas
- Organize com labels e cores

O Keep sincroniza automaticamente entre celular, tablet e computador.`,
        tips: [
          'Use cores para categorizar: vermelho (urgente), azul (caso X), verde (ideias)',
          'O Keep funciona offline no celular — anote durante audiências sem internet',
          'Fixe notas importantes no topo para acesso rápido',
        ],
      },
      {
        title: 'Google Tasks para Tarefas Diárias',
        subtitle: 'Lista de afazeres integrada ao Calendar e Gmail',
        level: 'iniciante',
        icon: 'check-circle',
        content: `O Google Tasks é uma lista de tarefas simples e integrada ao Calendar e Gmail. Aparece na barra lateral de ambos os apps.

**Listas recomendadas:**
- **Hoje** — tarefas do dia
- **Esta Semana** — planejamento semanal
- **Clientes** — follow-ups pendentes
- **Administrativo** — tarefas operacionais

**Integração com Gmail:**
Arraste um email para o Tasks e ele vira uma tarefa com link direto ao email original. Perfeito para "responder depois" sem esquecer.

**Integração com Calendar:**
Tarefas com data aparecem automaticamente no calendário, marcadas com um círculo.`,
      },
      {
        title: 'Busca Avançada no Drive',
        subtitle: 'Encontre qualquer documento em segundos',
        level: 'intermediario',
        icon: 'search',
        content: `O Google Drive tem uma busca poderosíssima que vai muito além do nome do arquivo. Ele busca **dentro do conteúdo** dos documentos.

**Operadores de busca avançada:**

| Operador | Exemplo | O que faz |
|----------|---------|-----------|
| type: | type:pdf | Busca apenas PDFs |
| owner: | owner:joao@escritorio.adv.br | Arquivos de um dono específico |
| before: / after: | after:2026-01-01 | Arquivos por data |
| title: | title:contrato | Busca no nome do arquivo |
| is:starred | is:starred | Apenas favoritos |
| is:trashed | is:trashed | Busca na lixeira |
| to: | to:cliente@email.com | Compartilhado com alguém |

**Dica de ouro:** O Drive busca dentro do conteúdo de PDFs escaneados usando OCR automático. Escaneie documentos como PDF e o Google conseguirá ler o texto.`,
      },
      {
        title: 'Backup e Sincronização',
        subtitle: 'Google Drive para Desktop',
        level: 'iniciante',
        icon: 'cloud',
        content: `O Google Drive para Desktop sincroniza seus arquivos entre o computador e a nuvem. Funciona como uma pasta local que espelha o Drive automaticamente.

**Dois modos de operação:**
- **Streaming (recomendado):** Arquivos ficam na nuvem e são baixados sob demanda. Economiza espaço no HD.
- **Espelhamento:** Cópia completa no computador. Usa mais espaço mas funciona offline.

**Vantagens:**
- Edite arquivos do Drive como se fossem locais
- Backup automático de pastas do computador para o Drive
- Funciona mesmo com conexão lenta — sincroniza em segundo plano
- Integração perfeita com Explorer (Windows) e Finder (Mac)`,
        steps: [
          'Baixe o Google Drive para Desktop em **drive.google.com/download**',
          'Instale e faça login com sua conta profissional',
          'Escolha o modo: Streaming (recomendado) ou Espelhamento',
          'Selecione pastas locais para backup automático',
          'O Drive aparecerá como uma unidade (G:) no Explorer',
        ],
        tips: [
          'Use o modo Streaming para economizar espaço no HD',
          'Marque arquivos como "Disponível offline" para trabalhar sem internet',
          'Não coloque arquivos enormes (vídeos de GB) no Drive — consomem armazenamento rapidamente',
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // SEÇÃO 5: SEGURANÇA E COMPLIANCE
  // ═══════════════════════════════════════════════════════════
  {
    id: 'seguranca',
    title: 'Segurança e Compliance',
    description: 'Proteja dados de clientes com as melhores práticas de segurança',
    icon: 'shield',
    cards: [
      {
        title: 'Verificação em Duas Etapas (2FA)',
        subtitle: 'A medida de segurança mais importante do escritório',
        level: 'iniciante',
        icon: 'lock',
        analogy: {
          tag: 'Analogia',
          text: 'A verificação em duas etapas é como a **porta com tranca e chave tetra** do escritório. A senha é a chave comum, o código do celular é a chave tetra. Mesmo que alguém descubra sua senha, não consegue entrar sem o código do seu celular.',
        },
        content: `A verificação em duas etapas (2FA) é **obrigatória** para escritórios que levam segurança a sério. Sem 2FA, qualquer pessoa que descobrir a senha tem acesso total aos dados de clientes.

**Como funciona:**
1. Você digita sua senha normalmente
2. O Google pede um segundo fator: código do app, SMS, ou toque no celular
3. Somente com os dois fatores você acessa a conta

**Métodos de 2FA (do mais seguro ao menos seguro):**
- Chave de segurança física (ex: YubiKey) — mais seguro
- App Google Authenticator ou similares — muito seguro
- Notificação push no celular — seguro
- SMS — menos seguro (mas melhor que nada)`,
        steps: [
          'No Admin Console, vá em **Segurança > Autenticação > Verificação em 2 etapas**',
          'Ative "Permitir que os usuários ativem a verificação em 2 etapas"',
          'Defina "Obrigatória" para toda a organização ou por unidade organizacional',
          'Configure um prazo de ativação (ex: 7 dias para os usuários configurarem)',
          'Cada usuário configura em **myaccount.google.com > Segurança > 2FA**',
          'Recomende o uso do Google Authenticator ou app Microsoft Authenticator',
        ],
        tips: [
          'Gere e guarde os códigos de backup em local seguro — eles salvam se você perder o celular',
          'Use chave de segurança física para contas de administrador',
          'Para escritórios com mais de 10 pessoas, torne 2FA obrigatória via Admin Console',
        ],
      },
      {
        title: 'Políticas de Senha no Admin Console',
        subtitle: 'Requisitos mínimos para senhas seguras',
        level: 'intermediario',
        icon: 'key-round',
        content: `O Admin Console permite definir políticas de senha para todo o escritório:

**Configurações recomendadas:**
- Mínimo de **12 caracteres**
- Exigir letras maiúsculas e minúsculas
- Exigir pelo menos 1 número e 1 símbolo
- Expiração a cada **90 dias**
- Não permitir reutilização das últimas **5 senhas**
- Bloquear conta após **5 tentativas incorretas**

**Caminho:** Admin Console > Segurança > Autenticação > Gerenciamento de senhas`,
        steps: [
          'Acesse **admin.google.com > Segurança > Autenticação**',
          'Clique em "Gerenciamento de senhas"',
          'Defina comprimento mínimo: 12 caracteres',
          'Ative "Aplicar política de senha na próxima entrada"',
          'Configure expiração de senha (recomendado: 90 dias)',
        ],
      },
      {
        title: 'LGPD no Google Workspace',
        subtitle: 'Conformidade com a Lei Geral de Proteção de Dados',
        level: 'avancado',
        icon: 'shield',
        content: `A LGPD (Lei 13.709/2018) se aplica integralmente a escritórios de advocacia. O Google Workspace oferece ferramentas para auxiliar no compliance.

**Bases legais aplicáveis ao escritório:**
- **Art. 7°, V — Execução de contrato:** Processamento de dados necessários à prestação de serviços jurídicos
- **Art. 7°, VI — Exercício regular de direitos:** Dados necessários para o exercício de direitos em processos judiciais
- **Art. 7°, IX — Legítimo interesse:** Gestão interna do escritório

**Medidas técnicas (Art. 46 LGPD):**
O Google Workspace já fornece:
- Criptografia em trânsito (TLS) e em repouso (AES-256)
- Controle de acesso por usuário e por dispositivo
- Logs de auditoria de todas as atividades
- DLP para dados sensíveis (Business Plus+)
- Google Vault para preservação legal`,
        checklist: [
          {
            title: 'Checklist LGPD para Escritórios',
            items: [
              'Nomear um encarregado de dados (DPO) do escritório',
              'Criar Política de Privacidade do escritório',
              'Mapear dados pessoais tratados (clientes, processos, funcionários)',
              'Ativar 2FA obrigatória para todos os usuários',
              'Configurar DLP para proteger CPF, RG, dados bancários (Business Plus+)',
              'Definir política de retenção de dados no Google Vault',
              'Criar procedimento de resposta a incidentes de segurança',
              'Treinar equipe sobre boas práticas de proteção de dados',
              'Revisar compartilhamentos externos periodicamente',
              'Documentar as bases legais utilizadas para cada tratamento',
            ],
          },
        ],
      },
      {
        title: 'Sigilo Profissional e Nuvem',
        subtitle: 'Art. 7° do Código de Ética e o Google Workspace',
        level: 'avancado',
        icon: 'lock',
        content: `O Art. 7° do Código de Ética e Disciplina da OAB estabelece o dever de sigilo profissional. Usar serviços em nuvem levanta questões legítimas sobre confidencialidade.

**O Google pode acessar os dados do meu escritório?**
Não. O contrato do Google Workspace (Business ou Enterprise) inclui:
- **Cláusula de processamento de dados:** Google é processador, não controlador
- **Dados pertencem ao cliente:** O escritório mantém a propriedade total
- **Sem publicidade:** Diferente do Gmail gratuito, o Workspace não usa dados para anúncios
- **Criptografia AES-256:** Dados criptografados em repouso e em trânsito
- **Certificações:** ISO 27001, SOC 2/3, conformidade com GDPR

**Recomendações para máximo sigilo:**
- Use Business Plus ou Enterprise para DLP e Vault
- Ative criptografia do lado do cliente (CSE) para documentos ultra-sensíveis
- Nunca compartilhe documentos com "qualquer pessoa com o link"
- Revise os logs de acesso regularmente`,
        tips: [
          'O Google Workspace Business é significativamente mais seguro que email gratuito ou servidores próprios',
          'Guarde o Adendo de Processamento de Dados (DPA) do Google como evidência de compliance',
          'Para casos de extrema sensibilidade, considere a criptografia do lado do cliente (CSE)',
          'O Google tem mais de 900 engenheiros de segurança dedicados — mais que qualquer escritório terá',
        ],
      },
      {
        title: 'Google Vault para eDiscovery',
        subtitle: 'Preservação legal e busca de dados',
        level: 'expert',
        icon: 'database',
        content: `O Google Vault (disponível no Business Plus e Enterprise) é uma ferramenta de **governança de informações e eDiscovery**. Ele permite preservar, pesquisar e exportar dados do Google Workspace.

**Funcionalidades:**
- **Legal Holds (Retenção Legal):** Preserve todos os dados de um usuário ou grupo, impedindo exclusão
- **Busca:** Pesquise emails, arquivos do Drive, mensagens do Chat por palavras-chave, data, remetente
- **Exportação:** Exporte dados em formato PST, MBOX ou formato nativo para uso em litígios
- **Regras de retenção:** Defina quanto tempo dados são mantidos (ex: 7 anos para dados fiscais)
- **Auditoria:** Rastreie quem acessou o Vault e o que pesquisou

**Casos de uso na advocacia:**
- Preservar emails relevantes em caso de litígio interno
- eDiscovery para responder a solicitações judiciais
- Garantir compliance com retenção de dados regulatória
- Investigações internas de conduta`,
        tips: [
          'Configure retenção automática: mantenha todos os dados por pelo menos 5 anos',
          'Use Legal Holds antes de qualquer desligamento de funcionário',
          'O Vault mantém dados mesmo que o usuário exclua emails ou arquivos',
          'Limite o acesso ao Vault apenas a administradores e responsáveis pelo compliance',
        ],
      },
      {
        title: 'DLP - Prevenção de Perda de Dados',
        subtitle: 'Políticas automáticas de proteção de dados sensíveis',
        level: 'expert',
        icon: 'shield',
        content: `O DLP (Data Loss Prevention) no Google Workspace detecta e bloqueia automaticamente o compartilhamento de dados sensíveis. Disponível no Business Plus e Enterprise.

**Regras DLP úteis para escritórios:**
- Bloquear envio externo de emails com CPF (###.###.###-##)
- Alertar ao compartilhar arquivos com número de OAB externamente
- Impedir download de documentos marcados como "Confidencial"
- Bloquear upload de arquivos com dados bancários para fora do domínio

**Como funciona:**
1. Você cria regras no Admin Console baseadas em padrões (regex)
2. O DLP escaneia emails, Drive e Chat em tempo real
3. Quando detecta dados sensíveis, aplica a ação definida: alertar, bloquear ou quarentena`,
        steps: [
          'No Admin Console, vá em **Segurança > Proteção de Dados > Gerenciar regras**',
          'Clique em "Adicionar regra"',
          'Defina o escopo: Gmail, Drive ou Chat',
          'Configure o detector: tipo de dados (CPF, cartão de crédito, etc.)',
          'Defina a ação: Alertar administrador, Bloquear envio, ou Quarentena',
          'Teste a regra antes de ativar para toda a organização',
        ],
      },
      {
        title: 'Auditoria e Logs de Atividade',
        subtitle: 'Monitore todas as ações no ambiente do escritório',
        level: 'avancado',
        icon: 'eye',
        content: `O Admin Console oferece relatórios detalhados de todas as atividades no Google Workspace. Essencial para segurança e compliance.

**Relatórios disponíveis:**
- **Login:** Quem fez login, de onde, dispositivo usado, tentativas falhas
- **Drive:** Quem visualizou, editou, compartilhou ou baixou cada arquivo
- **Gmail:** Volume de emails, spam bloqueado, emails suspeitos
- **Admin:** Alterações feitas por administradores
- **Dispositivos:** Quais dispositivos estão acessando o Workspace

**Alertas automáticos:**
Configure alertas para eventos críticos:
- Login de localização incomum
- Compartilhamento externo de muitos arquivos
- Tentativas de login com senha incorreta
- Alterações nas configurações de segurança`,
        tips: [
          'Revise os logs de login pelo menos mensalmente',
          'Configure alertas de "Atividade suspeita de login" no Admin Console',
          'O relatório de Drive mostra EXATAMENTE quem acessou cada documento — útil para investigações',
        ],
      },
      {
        title: 'Gerenciamento de Dispositivos Móveis',
        subtitle: 'Controle celulares e tablets que acessam o escritório',
        level: 'avancado',
        icon: 'smartphone',
        content: `O Google Workspace inclui MDM (Mobile Device Management) básico para controlar dispositivos que acessam dados do escritório.

**Funcionalidades:**
- **Exigir bloqueio de tela** nos dispositivos que acessam o Workspace
- **Apagar dados remotamente** em caso de perda ou roubo
- **Aprovar dispositivos** antes de permitir acesso
- **Bloquear dispositivos** comprometidos
- **Exigir criptografia** no dispositivo

Para escritórios que permitem BYOD (traga seu próprio dispositivo), o MDM garante que dados corporativos podem ser apagados remotamente sem afetar dados pessoais do funcionário.`,
        steps: [
          'No Admin Console, vá em **Dispositivos > Configuração > Configurações universais**',
          'Ative "Gerenciamento básico de dispositivos móveis"',
          'Em "Requisitos de senha", exija bloqueio de tela',
          'Ative "Aprovar dispositivos" para controlar quais celulares acessam o Workspace',
          'Em caso de perda: Dispositivos > selecione o dispositivo > "Apagar conta"',
        ],
      },
      {
        title: 'Plano de Resposta a Incidentes',
        subtitle: 'O que fazer em caso de vazamento de dados',
        level: 'expert',
        icon: 'alert-triangle',
        content: `Todo escritório de advocacia precisa de um plano de resposta a incidentes de segurança. A LGPD exige comunicação à ANPD em caso de incidentes que possam gerar risco ou dano aos titulares.

**Tipos de incidentes:**
- Conta de usuário comprometida (senha vazada)
- Compartilhamento acidental de documentos confidenciais
- Perda ou roubo de dispositivo com acesso ao Workspace
- Ataque de phishing bem-sucedido
- Funcionário desligado com acesso não revogado`,
        checklist: [
          {
            title: 'Resposta Imediata (primeiras 2 horas)',
            items: [
              'Identificar o escopo do incidente',
              'Suspender contas comprometidas (Admin Console > Usuários > Suspender)',
              'Revogar sessões ativas da conta afetada',
              'Forçar troca de senha imediata',
              'Ativar Legal Hold no Vault para preservar evidências',
            ],
          },
          {
            title: 'Investigação (24-48 horas)',
            items: [
              'Analisar logs de atividade no Admin Console',
              'Verificar acessos indevidos a documentos no relatório do Drive',
              'Identificar dados potencialmente comprometidos',
              'Documentar toda a linha do tempo do incidente',
            ],
          },
          {
            title: 'Comunicação e Correção (72 horas)',
            items: [
              'Comunicar à ANPD se houve risco relevante (Art. 48 LGPD)',
              'Notificar titulares de dados afetados',
              'Notificar clientes cujos dados possam ter sido expostos',
              'Implementar medidas corretivas para evitar recorrência',
              'Documentar lições aprendidas e atualizar o plano',
            ],
          },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // SEÇÃO 6: AUTOMAÇÕES E PRODUTIVIDADE
  // ═══════════════════════════════════════════════════════════
  {
    id: 'automacoes',
    title: 'Automações e Produtividade',
    description: 'AppSheet, Apps Script e automações para multiplicar sua eficiência',
    icon: 'zap',
    cards: [
      {
        title: 'Google AppSheet - Apps Sem Código',
        subtitle: 'Crie um app de gestão de processos sem programar',
        level: 'avancado',
        icon: 'layout',
        content: `O AppSheet permite criar aplicativos personalizados usando planilhas do Google Sheets como banco de dados — **sem escrever código**.

**App de Gestão de Processos:**
Um app que você pode criar em poucas horas:
- Cadastro de clientes e processos
- Acompanhamento de prazos com notificações
- Registro de atendimentos e anotações
- Controle de honorários e pagamentos
- Dashboard com indicadores

O app funciona no celular e computador, com sincronização em tempo real com o Sheets.`,
        flowSteps: [
          { title: 'Crie a planilha base no Sheets', description: 'Defina as colunas: Cliente, Processo, Área, Status, Prazo, Responsável, Valor' },
          { title: 'Acesse appsheet.com', description: 'Conecte sua conta Google e clique em "Create" > "From Google Sheets"' },
          { title: 'AppSheet gera o app automaticamente', description: 'A estrutura básica é criada a partir das colunas da planilha' },
          { title: 'Personalize a interface', description: 'Arraste e solte elementos, defina visualizações (lista, detalhe, mapa, calendário)' },
          { title: 'Configure automações', description: 'Notificação por email quando prazo está vencendo, alertas de status' },
          { title: 'Publique e instale no celular', description: 'Compartilhe com a equipe — funciona como app nativo no celular' },
        ],
        tips: [
          'Comece simples: cadastro de clientes + processos. Adicione complexidade gradualmente',
          'O AppSheet Core está incluído no Business Standard e Plus',
          'Consulte a galeria de templates do AppSheet para modelos prontos de gestão jurídica',
        ],
      },
      {
        title: 'Apps Script - Automações Personalizadas',
        subtitle: 'JavaScript para automatizar o Google Workspace',
        level: 'expert',
        icon: 'terminal',
        content: `O Google Apps Script é uma plataforma de programação baseada em JavaScript que permite automatizar qualquer tarefa no Google Workspace.

**O que você pode automatizar:**
- Enviar emails automáticos quando um prazo se aproxima
- Gerar documentos (contratos, petições) a partir de templates
- Criar relatórios mensais automaticamente
- Sincronizar dados entre planilhas
- Criar menus personalizados no Sheets e Docs

**Exemplo básico — Alerta de prazo por email:**`,
        prompt: `// Google Apps Script - Alerta de Prazos Vencendo
// Cole em: Extensions > Apps Script (dentro do Google Sheets)

function verificarPrazos() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba = planilha.getSheetByName("PRAZOS");
  var dados = aba.getDataRange().getValues();
  var hoje = new Date();

  for (var i = 1; i < dados.length; i++) {
    var processo = dados[i][0];
    var cliente = dados[i][1];
    var vencimento = new Date(dados[i][4]);
    var responsavel = dados[i][6];
    var status = dados[i][7];

    if (status !== "Cumprido") {
      var diasRestantes = Math.floor((vencimento - hoje) / (1000 * 60 * 60 * 24));

      if (diasRestantes <= 3 && diasRestantes >= 0) {
        var email = responsavel; // email do responsável
        var assunto = "PRAZO URGENTE - " + processo;
        var corpo = "Prezado(a),\\n\\n" +
          "O prazo do processo " + processo + " (cliente: " + cliente + ") " +
          "vence em " + diasRestantes + " dia(s).\\n\\n" +
          "Data de vencimento: " + vencimento.toLocaleDateString("pt-BR") + "\\n\\n" +
          "Atenciosamente,\\nSistema de Prazos";

        GmailApp.sendEmail(email, assunto, corpo);
      }
    }
  }
}

// Para executar automaticamente todo dia às 8h:
// Triggers > + Add Trigger > verificarPrazos > Time-driven > Day timer > 8h-9h`,
        tips: [
          'Comece copiando scripts prontos e adaptando — não precisa aprender programação do zero',
          'Use triggers (gatilhos) para executar scripts automaticamente em horários definidos',
          'Teste scripts em uma planilha de testes antes de usar em dados reais',
          'O ChatGPT e o Gemini são excelentes para gerar scripts de Apps Script',
        ],
      },
      {
        title: 'Alertas Automáticos de Prazo',
        subtitle: 'Notificação automática quando prazos se aproximam',
        level: 'avancado',
        icon: 'clock',
        content: `Combine Google Sheets + Apps Script + Gmail para criar um sistema automático de alertas de prazos.

**Como funciona:**
1. Sua planilha de prazos tem a data de vencimento
2. O Apps Script roda automaticamente todos os dias às 8h
3. Verifica quais prazos vencem nos próximos 3, 5 e 7 dias
4. Envia email automático ao responsável com os detalhes
5. Opcionalmente cria evento no Calendar

Este sistema custa **R$ 0** além da assinatura do Google Workspace.`,
        steps: [
          'Abra sua planilha de prazos no Google Sheets',
          'Vá em **Extensões > Apps Script**',
          'Cole o script de verificação de prazos (veja o card anterior)',
          'Clique em **Triggers** (relógio) no menu lateral',
          'Adicione um trigger: "verificarPrazos" > Acionado por tempo > Dia > 8h-9h',
          'Salve e teste executando manualmente primeiro',
        ],
        tips: [
          'Configure alertas em 3 níveis: 7 dias (informativo), 3 dias (atenção), 1 dia (urgente)',
          'Adicione o escritório inteiro em cópia nos alertas de prazos fatais',
          'O script pode criar eventos no Calendar automaticamente para novos prazos',
        ],
      },
      {
        title: 'Macros no Google Sheets',
        subtitle: 'Grave e repita tarefas repetitivas automaticamente',
        level: 'intermediario',
        icon: 'zap',
        content: `Macros gravam suas ações no Sheets e permitem repeti-las com um clique. Ideal para formatações e processamentos que você faz repetidamente.

**Exemplos de macros úteis para advogados:**
- Formatar planilha de honorários (cores, bordas, cabeçalho)
- Aplicar filtros padrão na planilha de prazos
- Gerar resumo mensal de faturamento
- Ordenar e filtrar dados de clientes

**Como gravar uma macro:**
1. Vá em **Extensões > Macros > Gravar macro**
2. Execute as ações que deseja automatizar
3. Clique em "Salvar" e dê um nome à macro
4. Para usar: Extensões > Macros > [nome da macro]
5. Opcional: atribua um atalho de teclado (Ctrl+Alt+Shift+1)`,
      },
      {
        title: 'Regras de Email no Gmail',
        subtitle: 'Filtros avançados para organização automática',
        level: 'intermediario',
        icon: 'mail',
        content: `Filtros do Gmail automatizam a organização do inbox. Configure uma vez e os emails se organizam sozinhos para sempre.

**Filtros essenciais para advogados:**

| Critério | Ação |
|----------|------|
| De: *@trt*.jus.br | Label "Tribunais/TRT" + Estrela |
| De: *@tjsp.jus.br | Label "Tribunais/TJSP" + Importante |
| Assunto: "intimação" OU "prazo" | Label "Prazos" + Nunca spam |
| De: newsletter@ | Pular inbox + Label "Leitura" |
| Para: financeiro@escritorio.adv.br | Label "Financeiro" |
| Tem: anexo, tamanho > 5MB | Label "Anexos Grandes" |`,
        steps: [
          'No Gmail, clique na **seta** dentro do campo de busca',
          'Preencha os critérios (de, para, assunto, palavras-chave)',
          'Clique em "Criar filtro"',
          'Selecione as ações desejadas (aplicar label, marcar importante, etc.)',
          'Marque "Aplicar filtro a conversas existentes" para organizar emails antigos',
          'Clique em "Criar filtro"',
        ],
      },
      {
        title: 'Respostas Padronizadas (Canned Responses)',
        subtitle: 'Templates rápidos para respostas recorrentes',
        level: 'iniciante',
        icon: 'copy',
        content: `Ative os modelos de resposta do Gmail para usar templates prontos nas situações mais comuns.

**Ativar:** Gmail > Configurações > Avançado > Modelos (Canned Responses) > Ativar

**Como usar:** Ao compor email > clique nos 3 pontos (⋮) > Modelos > escolha o template

**Templates recomendados:**
- Confirmação de recebimento de documentos
- Agendamento de reunião
- Envio de proposta de honorários
- Atualização de andamento processual
- Cobrança amigável de honorários
- Resposta a consulta inicial
- Solicitação de documentos ao cliente`,
      },
      {
        title: 'Automação de Relatórios',
        subtitle: 'Gere relatórios mensais automaticamente',
        level: 'avancado',
        icon: 'bar-chart',
        content: `Use Apps Script para gerar e enviar relatórios mensais automaticamente a partir dos dados do Google Sheets.

**Fluxo de automação:**
1. Planilha de dados financeiros é atualizada ao longo do mês
2. No dia 1º de cada mês, o script roda automaticamente
3. Gera um resumo com faturamento, inadimplência e projeções
4. Cria um PDF formatado no Google Docs
5. Envia por email aos sócios

Isso elimina horas de trabalho manual todo mês e garante que os relatórios são sempre gerados na data correta.`,
        tips: [
          'Use Google Charts API no Apps Script para gráficos nos relatórios',
          'Configure o trigger para rodar no 1° dia útil do mês',
          'Mantenha um histórico de relatórios numa pasta "Relatórios" no Drive',
        ],
      },
      {
        title: 'Integração com Ferramentas Externas',
        subtitle: 'Zapier e Make.com com Google Workspace',
        level: 'avancado',
        icon: 'plug',
        content: `O Google Workspace se integra com centenas de ferramentas externas via Zapier, Make.com (antigo Integromat) e APIs nativas.

**Integrações úteis para advogados:**

| Integração | O que faz |
|-----------|----------|
| WhatsApp → Sheets | Novo contato do WhatsApp Business vira linha na planilha |
| Calendar → Trello/Asana | Prazo no Calendar cria tarefa no gerenciador de projetos |
| Forms → Gmail + Sheets | Formulário de intake envia email + registra na planilha |
| Drive → Slack/Teams | Novo documento no Drive notifica canal da equipe |
| Gmail → CRM | Email de cliente novo cria registro no CRM |

**Zapier vs Make.com:**
- **Zapier:** Mais fácil, mais caro, ideal para automações simples
- **Make.com:** Mais barato, mais flexível, ideal para fluxos complexos`,
      },
      {
        title: 'Workflow de Aprovação',
        subtitle: 'Fluxo de aprovação de documentos entre sócios',
        level: 'expert',
        icon: 'workflow',
        content: `Crie um fluxo de aprovação de documentos usando Google Workspace + AppSheet ou Apps Script.`,
        flowSteps: [
          { title: 'Advogado finaliza o documento', description: 'Petição ou contrato pronto no Google Docs' },
          { title: 'Solicita aprovação', description: 'Move o documento para pasta "Aguardando Aprovação" ou muda status na planilha' },
          { title: 'Sócio recebe notificação', description: 'Email automático com link direto para o documento' },
          { title: 'Sócio revisa e decide', description: 'Aprova (com comentário) ou solicita alterações' },
          { title: 'Se aprovado: documento liberado', description: 'Status muda para "Aprovado", documento move para pasta final' },
          { title: 'Se rejeitado: volta ao autor', description: 'Notificação com comentários do que precisa ser alterado' },
        ],
        tips: [
          'O AppSheet permite criar esse workflow visualmente, sem código',
          'Para fluxos simples, uma coluna "Status" na planilha + filtro no Gmail já resolve',
          'Registre data e hora de cada aprovação para auditoria',
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // SEÇÃO 7: GEMINI AI E NOTEBOOKLM
  // ═══════════════════════════════════════════════════════════
  {
    id: 'ia-google',
    title: 'Gemini AI e NotebookLM',
    description: 'Inteligência artificial integrada ao Google Workspace',
    icon: 'sparkles',
    cards: [
      {
        title: 'Gemini no Google Workspace',
        subtitle: 'IA integrada em todos os apps do escritório',
        level: 'intermediario',
        icon: 'sparkles',
        analogy: {
          tag: 'Analogia',
          text: 'O Gemini é como um **estagiário super inteligente** que está presente em todas as salas do escritório ao mesmo tempo. No Gmail ele redige emails, no Docs ele escreve rascunhos, no Sheets ele cria fórmulas, no Slides ele monta apresentações, e no Meet ele faz a ata da reunião.',
        },
        content: `O Gemini é a inteligência artificial do Google, integrada nativamente em todos os aplicativos do Google Workspace. Diferente de outras IAs, o Gemini **já está dentro das ferramentas que você usa**.

**Disponibilidade por plano:**
- **Business Starter:** Gemini básico (chat e funcionalidades limitadas)
- **Business Standard:** Gemini completo em todos os apps
- **Business Plus / Enterprise:** Gemini avançado com recursos extras`,
        elementGrid: [
          { icon: 'mail', name: 'Gemini no Gmail', description: 'Redige, resume e responde emails com IA', highlight: true },
          { icon: 'file-text', name: 'Gemini no Docs', description: 'Cria rascunhos, reescreve textos, resume documentos' },
          { icon: 'spreadsheet', name: 'Gemini no Sheets', description: 'Cria fórmulas, analisa dados, gera gráficos' },
          { icon: 'presentation', name: 'Gemini no Slides', description: 'Gera apresentações a partir de texto' },
          { icon: 'video', name: 'Gemini no Meet', description: 'Transcreve reuniões, gera resumos e ações' },
          { icon: 'message-circle', name: 'Gemini no Chat', description: 'Assistente de IA direto no Google Chat' },
        ],
      },
      {
        title: 'Gemini no Gmail - Redigir Emails',
        subtitle: 'IA para compor e resumir mensagens profissionais',
        level: 'iniciante',
        icon: 'mail',
        content: `O Gemini no Gmail ajuda a redigir emails profissionais em segundos. Clique no ícone do Gemini ao compor um email e descreva o que precisa.

**O que o Gemini pode fazer no Gmail:**
- **Redigir email do zero:** Descreva o contexto e o Gemini escreve
- **Responder email:** Selecione uma resposta sugerida ou peça uma personalizada
- **Resumir thread longa:** O Gemini condensa threads com dezenas de emails em um parágrafo
- **Ajustar tom:** Transforme um rascunho informal em formal (ou vice-versa)
- **Traduzir:** Escreva em português e peça versão em inglês`,
        prompt: `Redija um email profissional para o cliente João Silva informando que a audiência de conciliação foi redesignada para 20/04/2026 às 14h no Fórum Central, sala 302. Peça que confirme disponibilidade e traga os documentos originais. Tom formal e acolhedor.`,
        tips: [
          'Sempre revise o texto gerado — o Gemini é um assistente, não um substituto',
          'Use "Ajustar tom" para adequar o email ao destinatário (juiz vs. cliente vs. colega)',
          'O botão "Resumir" no topo de threads longas economiza muito tempo',
        ],
      },
      {
        title: 'Gemini no Docs - Redigir Documentos',
        subtitle: 'Crie rascunhos jurídicos com assistência de IA',
        level: 'intermediario',
        icon: 'file-text',
        content: `No Google Docs, o Gemini ajuda a criar rascunhos de documentos, reformular parágrafos e resumir textos longos.

**Como usar:**
- Digite **@** em qualquer lugar do documento e selecione "Ajude-me a escrever"
- Ou clique no ícone do Gemini na barra lateral

**Casos de uso para advogados:**
- Rascunho de cláusulas contratuais
- Reformulação de parágrafos para maior clareza
- Resumo de decisões judiciais longas
- Criação de memorandos internos
- Geração de resumo executivo de parecer

**Importante:** O Gemini **não substitui** o conhecimento jurídico. Use-o para acelerar a redação, não para fundamentar teses. Sempre verifique referências legais e jurisprudência citada.`,
        prompt: `Redija uma cláusula de rescisão contratual para contrato de honorários advocatícios, prevendo: (1) rescisão por qualquer das partes com aviso prévio de 30 dias; (2) direito do advogado aos honorários proporcionais ao trabalho realizado; (3) obrigação de devolução de documentos em até 15 dias. Linguagem jurídica formal.`,
        tips: [
          'Use o Gemini para rascunho e depois refine com seu conhecimento jurídico',
          'Nunca cite jurisprudência gerada pelo Gemini sem verificar — IA pode inventar decisões',
          'O modo "Reformular" é excelente para melhorar clareza sem mudar o conteúdo',
        ],
      },
      {
        title: 'Gemini no Sheets - Análise de Dados',
        subtitle: 'Fórmulas e insights financeiros com IA',
        level: 'intermediario',
        icon: 'spreadsheet',
        content: `O Gemini no Sheets entende linguagem natural e cria fórmulas, tabelas dinâmicas e gráficos automaticamente.

**Exemplos de comandos em linguagem natural:**
- "Calcule o total de honorários recebidos por mês"
- "Crie um gráfico de barras com o faturamento mensal"
- "Destaque em vermelho todos os pagamentos em atraso"
- "Qual é a taxa de inadimplência dos últimos 6 meses?"
- "Crie uma tabela dinâmica agrupando clientes por área do direito"

O Gemini é especialmente útil para advogados que não dominam fórmulas complexas do Sheets.`,
        prompt: `Na minha planilha de honorários, a coluna A tem o nome do cliente, coluna B o valor, coluna C a data de vencimento e coluna D o status (Pago/Pendente/Atrasado). Crie uma fórmula que calcule: (1) total de honorários pendentes; (2) total em atraso; (3) percentual de inadimplência.`,
      },
      {
        title: 'Gemini no Slides - Criar Apresentações',
        subtitle: 'Gere slides profissionais com IA',
        level: 'intermediario',
        icon: 'presentation',
        content: `O Gemini no Google Slides pode gerar apresentações completas a partir de uma descrição textual. Ideal para sustentações orais, reuniões com clientes e palestras.

**Como usar:**
1. Abra um novo Slides
2. Clique no ícone do Gemini ou "Gerar apresentação"
3. Descreva o tema e o número de slides desejados
4. O Gemini cria a estrutura com texto e layout profissional
5. Personalize cores, imagens e conteúdo

**Limitações:**
- O conteúdo gerado é genérico — personalize com dados do caso
- Não insere jurisprudência automaticamente
- O visual pode precisar de ajustes para se adequar ao tom jurídico`,
      },
      {
        title: 'Gemini no Meet - Resumos de Reunião',
        subtitle: 'Transcrição automática e notas inteligentes',
        level: 'avancado',
        icon: 'video',
        content: `O Gemini no Google Meet (Business Standard+) transcreve reuniões em tempo real e gera resumos automáticos ao final.

**Funcionalidades:**
- **Transcrição em tempo real** — texto aparece na tela durante a reunião
- **Resumo automático** — ao final, Gemini gera resumo com pontos-chave
- **Pontos de ação** — identifica tarefas mencionadas e atribui a participantes
- **Catch me up** — se você entra atrasado, o Gemini resume o que perdeu
- **Tradução** — transcrição em múltiplos idiomas

**Para audiências e reuniões jurídicas:**
A transcrição automática serve como registro da reunião. O resumo com pontos de ação é enviado por email a todos os participantes automaticamente.`,
        tips: [
          'Ative a transcrição antes de iniciar a reunião: Atividades > Transcrição',
          'Peça "Catch me up" se entrar atrasado — o Gemini resume o que foi discutido',
          'A transcrição fica salva no Google Drive como documento Docs',
          'Sempre informe os participantes que a reunião está sendo transcrita',
        ],
      },
      {
        title: 'NotebookLM para Pesquisa Jurídica',
        subtitle: 'Analise legislação e doutrina com IA',
        level: 'avancado',
        icon: 'brain',
        content: `O NotebookLM é uma ferramenta de pesquisa com IA que analisa documentos que **você** carrega. Diferente do Gemini, ele trabalha apenas com suas fontes — reduzindo significativamente o risco de alucinação.

**Como usar para pesquisa jurídica:**
1. Carregue PDFs de legislação, doutrina, jurisprudência
2. Faça perguntas sobre o conteúdo
3. O NotebookLM responde citando as fontes exatas
4. Gere resumos, comparações e análises

**Exemplos de uso:**
- Carregar 5 acórdãos sobre o mesmo tema e pedir uma análise comparativa
- Carregar a LGPD e perguntar sobre bases legais aplicáveis a um caso
- Carregar contrato e pedir análise de cláusulas abusivas
- Comparar duas versões de projeto de lei`,
        steps: [
          'Acesse **notebooklm.google.com** com sua conta Google Workspace',
          'Clique em "Novo Notebook"',
          'Carregue suas fontes: PDFs, links, textos copiados, Google Docs',
          'Faça perguntas em linguagem natural na área de chat',
          'O NotebookLM responde com citações das fontes carregadas',
          'Use "Gerar resumo" para obter visão geral de todas as fontes',
        ],
        tips: [
          'Carregue apenas fontes confiáveis — o NotebookLM é tão bom quanto seus inputs',
          'Para pesquisa jurisprudencial, carregue acórdãos na íntegra (não apenas ementas)',
          'O NotebookLM pode gerar áudio (podcast) resumindo suas fontes — ótimo para estudar no trânsito',
          'Limite: até 50 fontes por notebook e até 500.000 palavras por fonte',
        ],
        links: [
          { label: 'NotebookLM', url: 'https://notebooklm.google.com' },
        ],
      },
      {
        title: 'NotebookLM para Estudo de Caso',
        subtitle: 'Prepare estratégia jurídica com fontes organizadas',
        level: 'avancado',
        icon: 'target',
        content: `Crie um notebook específico para cada caso complexo. Carregue todas as peças processuais, decisões, legislação aplicável e doutrina relevante.

**Estrutura de um Notebook de Caso:**
- Petição Inicial e Contestação
- Decisões interlocutórias
- Sentença (se houver)
- Legislação aplicável
- Jurisprudência favorável
- Doutrina relevante

**Perguntas úteis para fazer ao NotebookLM:**
- "Quais são os principais argumentos da parte contrária?"
- "Que pontos da sentença podem ser questionados em recurso?"
- "Existe contradição entre as decisões interlocutórias e a sentença?"
- "Quais artigos de lei são citados e como são interpretados?"`,
        prompt: `Analise os documentos carregados neste notebook (petição inicial, contestação e sentença) e responda:

1. Quais foram os principais argumentos de cada parte?
2. A sentença acolheu quais argumentos do autor e quais do réu?
3. Existem pontos da sentença que contrariam jurisprudência dos tribunais superiores?
4. Quais são os fundamentos mais fortes para um recurso de apelação?

Cite as páginas e trechos específicos dos documentos para cada resposta.`,
      },
      {
        title: 'Limites e Boas Práticas com IA',
        subtitle: 'O que a IA pode e não pode fazer para advogados',
        level: 'intermediario',
        icon: 'alert-triangle',
        content: `A IA generativa (Gemini, NotebookLM) é uma ferramenta poderosa, mas tem limitações sérias que advogados precisam conhecer.

**O que a IA FAZ bem:**
- Redigir rascunhos de textos
- Resumir documentos longos
- Reformular e melhorar clareza do texto
- Criar fórmulas e automatizar planilhas
- Organizar e categorizar informações
- Traduzir documentos

**O que a IA NÃO FAZ bem (cuidado!):**
- Citar jurisprudência real (pode inventar)
- Interpretar nuances de casos específicos
- Substituir análise jurídica fundamentada
- Garantir atualização da legislação citada
- Manter sigilo absoluto (cuidado com dados sensíveis em IA pública)

**Regra de ouro:** Use IA como **primeiro rascunho**, nunca como **produto final**. O advogado é o responsável por tudo que assina.`,
        checklist: [
          {
            title: 'Checklist de Uso Ético de IA na Advocacia',
            items: [
              'Nunca apresentar texto de IA como se fosse jurisprudência real sem verificar',
              'Sempre revisar e validar qualquer conteúdo gerado por IA antes de usar',
              'Não inserir dados pessoais de clientes em ferramentas de IA públicas',
              'Informar ao cliente quando IA foi utilizada na elaboração de documentos',
              'Manter registro de quais documentos tiveram auxílio de IA',
              'Verificar toda legislação e artigos citados pela IA',
              'Não delegar decisões jurídicas à IA — ela é ferramenta, não advogada',
            ],
          },
        ],
        tips: [
          'O NotebookLM é mais seguro que o Gemini Chat para dados sensíveis — trabalha apenas com suas fontes',
          'Use o Gemini do Google Workspace (não o gratuito) para dados do escritório — tem proteções contratuais',
          'Jamais confie em citações de jurisprudência geradas por IA sem verificar nos sites dos tribunais',
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // SEÇÃO 8: ÉTICA E REGULAMENTAÇÃO
  // ═══════════════════════════════════════════════════════════
  {
    id: 'etica',
    title: 'Ética e Regulamentação',
    description: 'OAB, CNJ, LGPD e uso responsável de tecnologia na advocacia',
    icon: 'scale',
    cards: [
      {
        title: 'IA na Advocacia: Normas OAB',
        subtitle: 'O que o Conselho Federal diz sobre uso de IA',
        level: 'avancado',
        icon: 'scale',
        content: `A OAB tem acompanhado a adoção de IA na advocacia e emitido orientações importantes:

**Princípios gerais:**
- A responsabilidade ética e legal é SEMPRE do advogado, nunca da IA
- O sigilo profissional (Art. 7° do CED) se estende ao uso de ferramentas digitais
- O advogado deve informar ao cliente quando utilizar IA como ferramenta auxiliar
- Documentos gerados com auxílio de IA devem ser revisados integralmente
- A IA não pode substituir o exercício da advocacia (privativo de advogado inscrito)

**O que é permitido:**
- Usar IA para rascunhos, pesquisa e organização
- Automatizar tarefas administrativas
- Utilizar ferramentas de gestão com IA

**O que exige cuidado:**
- Inserir dados de clientes em IA sem contrato de processamento adequado
- Apresentar conteúdo de IA sem revisão como trabalho profissional
- Citar jurisprudência sem verificar a fonte original`,
      },
      {
        title: 'Resolução 615/2025 do CNJ',
        subtitle: 'Regulamentação de IA no Poder Judiciário',
        level: 'avancado',
        icon: 'building',
        content: `A Resolução 615/2025 do CNJ estabelece diretrizes para o uso de inteligência artificial no Poder Judiciário brasileiro.

**Pontos principais para advogados:**
- Tribunais podem usar IA para auxílio na elaboração de decisões
- Decisões finais são sempre do magistrado — IA é ferramenta auxiliar
- Partes devem ser informadas quando IA foi utilizada no processamento
- O jurisdicionado tem direito a solicitar revisão humana
- Dados processuais devem ser protegidos conforme LGPD

**Impacto prático:**
- Decisões podem ser proferidas mais rapidamente com auxílio de IA
- Petições podem ser analisadas por IA dos tribunais antes do magistrado
- Maior padronização de decisões em casos repetitivos
- Necessidade de adaptar a argumentação considerando análise por IA`,
      },
      {
        title: 'Uso Ético de IA Generativa',
        subtitle: 'Responsabilidade do advogado ao usar ferramentas de IA',
        level: 'intermediario',
        icon: 'shield',
        content: `O uso de IA na advocacia traz responsabilidades éticas específicas que todo advogado precisa observar.

**Casos reais de problemas com IA na advocacia:**
Nos EUA, advogados foram multados por apresentar jurisprudência fictícia gerada pelo ChatGPT. No Brasil, já há investigações similares. A lição: **IA é ferramenta, não fonte**.

**Boas práticas essenciais:**
- **Verifique sempre:** Toda citação legal ou jurisprudencial gerada por IA deve ser verificada nos sites oficiais dos tribunais
- **Revise integralmente:** Nunca assine ou protocole um documento que você não leu por completo
- **Proteja dados:** Não insira dados pessoais de clientes em IAs sem contratos adequados de proteção
- **Documente o uso:** Mantenha registro de quando e como IA foi utilizada
- **Informe o cliente:** Transparência sobre o uso de tecnologia é dever ético`,
        checklist: [
          {
            title: 'Antes de Usar IA em Documentos Jurídicos',
            items: [
              'O texto foi revisado integralmente por advogado habilitado?',
              'Todas as citações legais foram verificadas nos sites oficiais?',
              'Jurisprudência citada existe e é válida?',
              'Dados pessoais de clientes estão protegidos?',
              'O cliente foi informado sobre o uso de IA como ferramenta auxiliar?',
              'O documento final reflete a análise jurídica do advogado?',
            ],
          },
        ],
      },
      {
        title: 'Proteção de Dados do Cliente',
        subtitle: 'LGPD aplicada ao escritório digital',
        level: 'avancado',
        icon: 'lock',
        content: `O escritório de advocacia é controlador de dados pessoais de seus clientes. A LGPD exige medidas técnicas e organizacionais para proteger esses dados.

**Dados pessoais tratados pelo escritório:**
- Dados de identificação (nome, CPF, RG, endereço)
- Dados financeiros (rendimentos, patrimônio, débitos)
- Dados sensíveis (saúde, religião, origem racial — dependendo do caso)
- Dados processuais (histórico judicial)

**Medidas no Google Workspace:**
- Criptografia de dados em trânsito e repouso (nativo)
- Controle de acesso por usuário e permissão
- DLP para dados sensíveis (Business Plus+)
- Logs de auditoria completos
- Google Vault para retenção legal
- Configuração de compartilhamento restrito`,
      },
      {
        title: 'Termos de Uso do Google Workspace',
        subtitle: 'O que o Google pode e não pode acessar',
        level: 'intermediario',
        icon: 'file-check',
        content: `É fundamental entender a relação contratual entre seu escritório e o Google.

**Pontos-chave do contrato Google Workspace Business:**
- **Propriedade dos dados:** Os dados pertencem ao cliente (seu escritório), não ao Google
- **Processamento:** Google é processador de dados, não controlador
- **Sem publicidade:** Diferente do Gmail gratuito, o Google NÃO escaneia seus emails para anúncios
- **Sem venda de dados:** O Google não vende dados do Workspace a terceiros
- **Criptografia:** AES-256 em repouso, TLS em trânsito
- **Certificações:** ISO 27001, ISO 27017, ISO 27018, SOC 2, SOC 3
- **DPA (Data Processing Agreement):** Adendo de processamento de dados incluído no contrato

**Diferença crucial: Gmail gratuito vs. Google Workspace:**
- Gmail gratuito: Google analisa emails para personalizar anúncios
- Google Workspace: Google NÃO analisa conteúdo para publicidade, tem DPA e garantias contratuais`,
      },
      {
        title: 'Consentimento e Transparência',
        subtitle: 'Informar clientes sobre o uso de tecnologia',
        level: 'intermediario',
        icon: 'eye',
        content: `A transparência com clientes sobre o uso de tecnologia no escritório é uma boa prática ética e pode ser exigência legal.

**O que informar ao cliente:**
- Que o escritório utiliza Google Workspace para gestão de documentos e comunicação
- Que dados são armazenados em nuvem com criptografia
- Que ferramentas de IA podem ser usadas como auxílio (não como substituto do advogado)
- Que medidas de segurança são adotadas para proteger seus dados

**Onde incluir essa informação:**
- Contrato de honorários (cláusula sobre uso de tecnologia)
- Política de privacidade do escritório
- Termo de consentimento separado (quando necessário)`,
        prompt: `CLÁUSULA — USO DE TECNOLOGIA E PROTEÇÃO DE DADOS

O CONTRATADO(A) informa que utiliza ferramentas tecnológicas para a prestação dos serviços advocatícios, incluindo Google Workspace para comunicação e gestão documental, e ferramentas de inteligência artificial como auxílio na pesquisa e redação.

Todos os dados pessoais do CONTRATANTE são tratados em conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018) e armazenados em ambiente com criptografia, controle de acesso e backup automatizado.

O CONTRATANTE está ciente de que:
a) Ferramentas de IA são utilizadas apenas como auxílio, sendo toda análise jurídica de responsabilidade exclusiva do advogado;
b) Dados pessoais não são compartilhados com terceiros sem consentimento;
c) O escritório mantém medidas técnicas adequadas de proteção de dados.`,
      },
      {
        title: 'Propriedade Intelectual e IA',
        subtitle: 'Direitos autorais sobre conteúdo gerado por IA',
        level: 'avancado',
        icon: 'file-key',
        content: `A questão da propriedade intelectual sobre conteúdo gerado por IA ainda está em desenvolvimento no direito brasileiro, mas algumas orientações são claras:

**Situação atual:**
- Conteúdo gerado 100% por IA, sem intervenção humana criativa, provavelmente não tem proteção autoral
- Conteúdo criado por humano com auxílio de IA é protegido normalmente
- A Lei de Direitos Autorais (9.610/98) exige "criação do espírito" — requisito de autoria humana

**Para o advogado na prática:**
- Petições redigidas com auxílio de IA: protegidas, pois há seleção criativa, revisão e adaptação humana
- Templates gerados 100% por IA sem personalização: proteção questionável
- Pesquisa e resumos: não geram direito autoral independente

**Recomendação:** Sempre adicione valor intelectual significativo a qualquer conteúdo gerado com IA. A revisão, adaptação e fundamentação jurídica são sua contribuição criativa.`,
      },
      {
        title: 'Responsabilidade por Erros de IA',
        subtitle: 'Quem responde quando a IA erra?',
        level: 'avancado',
        icon: 'alert-triangle',
        content: `Se a IA gerar conteúdo incorreto e isso causar dano ao cliente, quem responde?

**Resposta curta: o advogado.**

**Fundamentos:**
- Art. 32 do Estatuto da OAB: responsabilidade pessoal do advogado pelos atos praticados
- Art. 14 do CDC: responsabilidade objetiva do profissional liberal
- Art. 186 do CC: ato ilícito por negligência (não revisar conteúdo de IA)

**Cenários de risco:**
- Citar jurisprudência fictícia gerada por IA
- Perder prazo por confiar em cálculo de prazo feito por IA
- Apresentar dados incorretos de análise financeira gerada por IA
- Compartilhar dados sigilosos do cliente via ferramenta de IA sem proteção

**Prevenção:**
A melhor defesa é tratar a IA como um estagiário: tudo que ela produz precisa ser revisado e aprovado pelo advogado antes de usar.`,
        tips: [
          'Documente o processo de revisão: registro de que o advogado conferiu o conteúdo',
          'Mantenha seguro profissional atualizado que cubra uso de tecnologia',
          'Em caso de dúvida, consulte a Comissão de Ética da sua seccional',
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // SEÇÃO 9: CASOS PRÁTICOS
  // ═══════════════════════════════════════════════════════════
  {
    id: 'casos-praticos',
    title: 'Casos Práticos',
    description: 'Setups completos, workflows e calculadora de economia',
    icon: 'briefcase',
    cards: [
      {
        title: 'Advogado Solo: Setup Completo',
        subtitle: 'Escritório de 1 pessoa com Business Starter',
        level: 'iniciante',
        icon: 'briefcase',
        content: `Setup completo para um advogado solo usando Google Workspace Business Starter (R$ 33,60/mês).

**O que você terá:**
- Email profissional (advogado@seuescritorio.adv.br)
- 30 GB de armazenamento na nuvem
- Agenda com alertas de prazos
- Documentos e planilhas online
- Videoconferência para até 100 participantes
- Site institucional básico
- IA Gemini básica`,
        checklist: [
          {
            title: 'Semana 1 — Infraestrutura',
            items: [
              'Registrar domínio .adv.br no Registro.br',
              'Ativar Google Workspace Business Starter',
              'Configurar DNS e registros MX',
              'Criar email profissional',
              'Configurar 2FA',
              'Instalar Gmail e Drive no celular',
            ],
          },
          {
            title: 'Semana 2 — Comunicação',
            items: [
              'Criar assinatura de email profissional',
              'Configurar labels e filtros no Gmail',
              'Criar calendários (Prazos, Audiências, Reuniões)',
              'Migrar emails antigos',
              'Criar templates de email',
            ],
          },
          {
            title: 'Semana 3 — Documentos e Organização',
            items: [
              'Criar estrutura de pastas no Drive',
              'Criar template de petição com formatação ABNT',
              'Criar template de contrato de honorários',
              'Criar template de procuração',
              'Criar planilha de controle financeiro',
              'Criar planilha de prazos processuais',
            ],
          },
          {
            title: 'Semana 4 — Captação e Presença Online',
            items: [
              'Criar formulário de intake no Forms',
              'Criar site institucional no Google Sites',
              'Testar fluxo completo: formulário → planilha → email',
              'Instalar Google Drive para Desktop',
              'Configurar respostas automáticas de férias',
            ],
          },
        ],
      },
      {
        title: 'Escritório Pequeno: 5 Advogados',
        subtitle: 'Setup com Business Standard para equipe',
        level: 'intermediario',
        icon: 'users',
        content: `Para escritórios com 3-20 pessoas, o Business Standard (R$ 67,20/mês por usuário) é ideal. Investimento: R$ 336/mês para 5 usuários.

**Configurações adicionais para equipe:**
- Unidades Organizacionais: Sócios, Associados, Estagiários, Administrativo
- Drives Compartilhados por área (Cível, Trabalhista, Criminal)
- Google Chat com espaços por equipe
- Calendários compartilhados por grupo
- Política de compartilhamento restritiva (somente interno por padrão)
- Gravação de reuniões no Meet (disponível no Standard)
- 2 TB de armazenamento compartilhado

**Estrutura de emails:**
- advogado1@escritorio.adv.br (individual)
- atendimento@escritorio.adv.br (grupo)
- financeiro@escritorio.adv.br (grupo)
- juridico@escritorio.adv.br (grupo)`,
        checklist: [
          {
            title: 'Setup de Equipe',
            items: [
              'Criar contas individuais para todos os membros',
              'Configurar Unidades Organizacionais',
              'Criar grupos de email (atendimento, financeiro)',
              'Criar Drives Compartilhados por área de atuação',
              'Configurar políticas de compartilhamento',
              'Ativar 2FA obrigatória para todos',
              'Configurar espaços no Google Chat',
              'Definir permissões por nível (sócio vs. estagiário)',
            ],
          },
        ],
      },
      {
        title: 'Escritório Médio: 20+ Pessoas',
        subtitle: 'Setup com Business Plus e segurança avançada',
        level: 'avancado',
        icon: 'building',
        content: `Para escritórios com 20-50 pessoas, o Business Plus (R$ 100,80/mês por usuário) adiciona segurança crítica:

**Recursos exclusivos do Business Plus:**
- Google Vault para eDiscovery e preservação legal
- DLP (Data Loss Prevention) para dados sensíveis
- 5 TB de armazenamento por usuário
- Até 500 participantes no Meet
- Gerenciamento avançado de dispositivos
- Logs de auditoria detalhados
- Exportação de dados para compliance

**Investimento:** R$ 2.016/mês para 20 usuários (R$ 100,80 × 20)

**Configurações adicionais:**
- DLP para bloquear envio de CPF/CNPJ externamente
- Vault com retenção de 7 anos para dados fiscais
- MDM para controlar dispositivos da equipe
- Alertas de segurança para login suspeito
- Política de senha com expiração trimestral`,
      },
      {
        title: 'Fluxo: Do Cliente à Petição',
        subtitle: 'Workflow completo usando Google Workspace',
        level: 'intermediario',
        icon: 'workflow',
        content: `Veja como o Google Workspace conecta cada etapa do trabalho jurídico, do primeiro contato com o cliente até a petição protocolada:`,
        flowSteps: [
          { title: 'Cliente preenche formulário de intake', description: 'Google Forms no site do escritório → dados salvos automaticamente no Sheets' },
          { title: 'Equipe recebe notificação', description: 'Gmail notifica o responsável por novos clientes automaticamente' },
          { title: 'Reunião inicial agendada', description: 'Calendar cria evento com link do Meet automaticamente' },
          { title: 'Reunião de consulta via Meet', description: 'Reunião gravada, Gemini gera resumo com pontos-chave' },
          { title: 'Documentos do cliente salvos no Drive', description: 'Pasta do cliente criada, documentos organizados por tipo' },
          { title: 'Contrato de honorários via Docs', description: 'Template preenchido, enviado por Gmail para assinatura' },
          { title: 'Pesquisa jurídica no NotebookLM', description: 'Legislação e jurisprudência analisadas com IA' },
          { title: 'Petição redigida no Google Docs', description: 'Rascunho com auxílio do Gemini, revisado pelo advogado' },
          { title: 'Revisão colaborativa', description: 'Sócio revisa no modo Sugerir, comentários trocados no documento' },
          { title: 'Prazo cadastrado no Calendar', description: 'Alerta configurado para prazo de protocolo com múltiplos lembretes' },
        ],
      },
      {
        title: 'Fluxo: Controle de Prazos',
        subtitle: 'Sistema completo no Calendar + Sheets + Script',
        level: 'intermediario',
        icon: 'calendar',
        content: `Um sistema robusto de controle de prazos usando três ferramentas integradas:`,
        flowSteps: [
          { title: 'Intimação recebida por email', description: 'Gmail recebe intimação do tribunal com prazo' },
          { title: 'Prazo registrado na planilha', description: 'Sheets com dados: processo, prazo, vencimento, responsável' },
          { title: 'Evento criado no Calendar', description: 'Prazo cadastrado com cores por urgência e múltiplos alertas' },
          { title: 'Apps Script monitora diariamente', description: 'Script verifica prazos vencendo nos próximos 7 dias' },
          { title: 'Alertas automáticos enviados', description: '7 dias: email informativo / 3 dias: alerta / 1 dia: urgente' },
          { title: 'Prazo cumprido e registrado', description: 'Status atualizado na planilha, documentação arquivada no Drive' },
        ],
      },
      {
        title: 'Fluxo: Audiência Virtual Completa',
        subtitle: 'Preparação com Meet + Docs + Calendar',
        level: 'intermediario',
        icon: 'video',
        content: `Workflow completo para audiências virtuais usando Google Workspace:`,
        flowSteps: [
          { title: 'Audiência cadastrada no Calendar', description: 'Data, hora, link do Meet, tipo de audiência e observações' },
          { title: 'Preparação no Google Docs', description: 'Roteiro da audiência, pontos-chave, perguntas para testemunhas' },
          { title: 'Documentos no Drive organizados', description: 'Pasta com provas, documentos para apresentar, decisão anterior' },
          { title: 'Lembretes automáticos', description: 'Calendar lembra 1 dia e 30 min antes. Teste de equipamento 15 min antes' },
          { title: 'Audiência via Google Meet', description: 'Compartilhamento de tela para documentos, gravação ativada' },
          { title: 'Resumo gerado pelo Gemini', description: 'Transcrição automática e resumo com pontos de ação enviado por email' },
        ],
      },
      {
        title: 'Migração: De Papel para Digital',
        subtitle: 'Roteiro de digitalização do escritório',
        level: 'avancado',
        icon: 'arrow-right-left',
        content: `Se seu escritório ainda trabalha com papel, esta é a roadmap para a digitalização completa em 90 dias.`,
        checklist: [
          {
            title: 'Fase 1 (Dias 1-30): Infraestrutura Digital',
            items: [
              'Ativar Google Workspace e configurar emails',
              'Criar estrutura de pastas no Drive',
              'Digitalizar documentos ativos (scanner + Drive)',
              'Migrar emails antigos para Gmail profissional',
              'Treinar equipe no básico: Gmail, Calendar, Drive',
            ],
          },
          {
            title: 'Fase 2 (Dias 31-60): Processos Digitais',
            items: [
              'Migrar controle de prazos para Calendar + Sheets',
              'Criar templates de documentos no Docs',
              'Configurar formulário de intake no Forms',
              'Criar planilha de controle financeiro',
              'Implementar sistema de alertas automáticos',
            ],
          },
          {
            title: 'Fase 3 (Dias 61-90): Otimização',
            items: [
              'Configurar segurança: 2FA, políticas de senha, compartilhamento',
              'Criar site institucional no Google Sites',
              'Implementar automações com AppSheet ou Apps Script',
              'Treinar equipe em colaboração (Docs, Chat, Meet)',
              'Digitalizar arquivo morto (processos encerrados)',
              'Eliminar processos em papel gradualmente',
            ],
          },
        ],
      },
      {
        title: 'Calculadora de Economia',
        subtitle: 'Quanto seu escritório economiza com Google Workspace',
        level: 'iniciante',
        icon: 'dollar-sign',
        content: `Compare o custo real do Google Workspace com ferramentas separadas:

**Cenário: Escritório com 5 pessoas**

| Item | Sem Google Workspace | Com Google Workspace |
|------|---------------------|---------------------|
| Email profissional | R$ 150/mês (5 × R$ 30) | Incluído |
| Armazenamento nuvem | R$ 250/mês (5 × R$ 50) | Incluído |
| Videoconferência | R$ 150/mês (Zoom) | Incluído |
| Suite Office | R$ 350/mês (5 × MS 365) | Incluído |
| Site do escritório | R$ 50/mês (hospedagem) | Incluído |
| Formulários | R$ 80/mês (JotForm/Typeform) | Incluído |
| IA Generativa | R$ 200/mês (ChatGPT Team) | Incluído (Gemini) |
| **Total** | **R$ 1.230/mês** | **R$ 336/mês** |

**Economia mensal: R$ 894**
**Economia anual: R$ 10.728**

Isso sem contar a produtividade extra da integração nativa entre as ferramentas. Um estudo do Google estima ganho de 20-30% de eficiência.`,
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // SEÇÃO 10: RECURSOS E REFERÊNCIAS
  // ═══════════════════════════════════════════════════════════
  {
    id: 'recursos',
    title: 'Recursos e Referências',
    description: 'Links úteis, atalhos, extensões e suporte',
    icon: 'book-open',
    cards: [
      {
        title: 'Links Úteis do Google Workspace',
        subtitle: 'Documentação oficial e recursos essenciais',
        level: 'iniciante',
        icon: 'external-link',
        content: `Guarde estes links para referência rápida:`,
        links: [
          { label: 'Admin Console', url: 'https://admin.google.com' },
          { label: 'Google Workspace Learning Center', url: 'https://support.google.com/a/users' },
          { label: 'Status do Google Workspace', url: 'https://www.google.com/appsstatus' },
          { label: 'Google Workspace Updates Blog', url: 'https://workspaceupdates.googleblog.com' },
          { label: 'NotebookLM', url: 'https://notebooklm.google.com' },
          { label: 'AppSheet', url: 'https://www.appsheet.com' },
          { label: 'Google Workspace Marketplace', url: 'https://workspace.google.com/marketplace' },
          { label: 'Registro.br (domínios .adv.br)', url: 'https://registro.br' },
        ],
      },
      {
        title: 'Atalhos de Teclado Essenciais',
        subtitle: 'Produtividade no Gmail, Docs e Sheets',
        level: 'iniciante',
        icon: 'zap',
        commandList: [
          { command: 'C', description: 'Gmail: Compor novo email' },
          { command: 'E', description: 'Gmail: Arquivar email selecionado' },
          { command: '#', description: 'Gmail: Excluir email' },
          { command: 'Shift+U', description: 'Gmail: Marcar como não lido' },
          { command: '/', description: 'Gmail/Drive: Ir para busca' },
          { command: 'Ctrl+K', description: 'Docs: Inserir link' },
          { command: 'Ctrl+Shift+V', description: 'Docs: Colar sem formatação' },
          { command: 'Ctrl+Alt+M', description: 'Docs: Inserir comentário' },
          { command: 'Ctrl+Alt+Shift+H', description: 'Docs: Histórico de versões' },
          { command: 'Ctrl+/', description: 'Sheets: Ver todos os atalhos' },
          { command: 'Ctrl+Shift+1', description: 'Sheets: Formatar como número' },
          { command: 'Ctrl+Shift+4', description: 'Sheets: Formatar como moeda' },
          { command: 'Ctrl+;', description: 'Sheets: Inserir data atual' },
        ],
        content: `Para ativar atalhos de teclado no Gmail: Configurações (engrenagem) > Ver todas as configurações > Geral > Atalhos de teclado > Ativar.

No Google Docs e Sheets, a maioria dos atalhos funciona por padrão. Pressione **Ctrl+/** em qualquer app para ver a lista completa.`,
      },
      {
        title: 'Extensões Recomendadas do Chrome',
        subtitle: 'Complementos úteis para advogados',
        level: 'intermediario',
        icon: 'chrome',
        content: `Extensões do Chrome que potencializam o Google Workspace para advogados:`,
        elementGrid: [
          { icon: 'mail', name: 'Checker Plus for Gmail', description: 'Notificações de email sem abrir o Gmail — veja, leia e responda direto do ícone' },
          { icon: 'calendar', name: 'Checker Plus for Calendar', description: 'Veja compromissos do Calendar direto na barra do Chrome' },
          { icon: 'file-text', name: 'Google Docs Offline', description: 'Edite documentos sem internet — sincroniza quando reconectar' },
          { icon: 'clock', name: 'Toggl Track', description: 'Controle de horas trabalhadas por cliente — essencial para honorários por hora' },
          { icon: 'lock', name: 'Bitwarden', description: 'Gerenciador de senhas gratuito e seguro para toda equipe' },
          { icon: 'search', name: 'Google Scholar Button', description: 'Busque artigos acadêmicos e jurídicos com um clique' },
        ],
      },
      {
        title: 'Comunidade e Suporte',
        subtitle: 'Onde buscar ajuda com Google Workspace',
        level: 'iniciante',
        icon: 'users',
        content: `**Canais oficiais de suporte:**
- **Suporte Google Workspace:** Disponível 24/7 por chat, email e telefone para todos os planos
- **Central de Ajuda:** support.google.com/a — documentação completa
- **Comunidade de Ajuda:** support.google.com/a/community — fórum com outros administradores

**Como acessar o suporte:**
Admin Console > menu lateral > Suporte > contato direto

**Dica:** O suporte do Google Workspace é significativamente melhor que o do Gmail gratuito. Você tem atendimento dedicado por ser assinante.`,
        links: [
          { label: 'Central de Ajuda do Google Workspace', url: 'https://support.google.com/a' },
          { label: 'Comunidade do Google Workspace', url: 'https://support.google.com/a/community' },
        ],
      },
      {
        title: 'Atualizações do Google Workspace',
        subtitle: 'Como ficar por dentro das novidades',
        level: 'iniciante',
        icon: 'sparkles',
        content: `O Google lança novas funcionalidades frequentemente. Fique por dentro:

**Fontes oficiais:**
- **Google Workspace Updates Blog:** workspaceupdates.googleblog.com — todas as novidades
- **Google Cloud Blog:** cloud.google.com/blog — novidades mais amplas
- **Admin Console > Novidades:** Notificações de atualizações diretamente no painel

**Canal no YouTube:**
O canal oficial "Google Workspace" tem tutoriais e webinars frequentes.

O Google geralmente lança funcionalidades primeiro para Early Adopters (programa de acesso antecipado) e depois para todos. O administrador pode optar por receber novidades assim que disponíveis ou aguardar a liberação estável.`,
      },
      {
        title: 'Google Workspace vs Microsoft 365',
        subtitle: 'Comparação honesta para advogados',
        level: 'intermediario',
        icon: 'arrow-right-left',
        content: `A escolha entre Google Workspace e Microsoft 365 depende do perfil do escritório:

| Critério | Google Workspace | Microsoft 365 |
|----------|-----------------|---------------|
| Preço inicial | R$ 33,60/mês | R$ 45,00/mês |
| Colaboração em tempo real | Excelente (nativo) | Bom (melhorou muito) |
| Trabalho offline | Limitado (precisa configurar) | Excelente (apps desktop) |
| IA integrada | Gemini (evoluindo rápido) | Copilot (mais maduro) |
| Interface | Mais simples e intuitiva | Mais complexa, mais recursos |
| Compatibilidade .docx | Boa (pode ter pequenas diferenças) | Nativa (perfeita) |
| Segurança | Excelente | Excelente |
| Curva de aprendizado | Baixa (quem usa Gmail já sabe) | Média |
| Ideal para | Escritórios que valorizam simplicidade e colaboração | Escritórios que dependem de Excel/Word avançado |

**Veredicto para advogados:**
- Se já usa Gmail pessoal e quer simplicidade → **Google Workspace**
- Se depende de macros de Excel ou formatação avançada de Word → **Microsoft 365**
- Se quer o melhor custo-benefício → **Google Workspace** (mais barato e inclui IA)`,
      },
      {
        title: 'Resolvendo Problemas Comuns',
        subtitle: 'FAQ e troubleshooting para advogados',
        level: 'iniciante',
        icon: 'wrench',
        content: `**"Meu email não está chegando"**
- Verifique os registros MX no Registro.br (devem apontar para Google)
- Aguarde até 48h após configuração para propagação DNS
- Confira se o email não está na pasta Spam
- No Admin Console: Relatórios > Email > verifique entrega

**"Não consigo compartilhar arquivo com cliente externo"**
- O administrador pode ter bloqueado compartilhamento externo
- No Admin Console: Apps > Drive > Compartilhamento > permitir compartilhamento externo
- Alternativa: envie o arquivo como anexo por email

**"O Gemini não aparece nos meus apps"**
- Verifique se seu plano inclui Gemini (Standard ou superior)
- No Admin Console: Apps > Gemini > verifique se está habilitado
- Pode levar 24h para ativar após upgrade de plano

**"Preciso trabalhar offline"**
- Gmail: Configurações > Offline > Ativar email offline
- Drive: instale o Google Drive para Desktop
- Docs: instale a extensão "Google Docs Offline" no Chrome

**"Minha conta foi bloqueada"**
- Muitas tentativas de senha incorreta ativam bloqueio temporário
- O administrador pode desbloquear no Admin Console > Usuários > conta > Desbloquear
- Se perdeu 2FA, use os códigos de backup ou contate suporte Google

**"Preciso recuperar arquivo excluído"**
- Lixeira do Drive mantém arquivos por 30 dias
- O administrador pode recuperar arquivos excluídos nos últimos 25 dias (Admin Console)
- Com Google Vault (Business Plus+): recuperação mesmo após exclusão permanente`,
      },
    ],
  },
]
