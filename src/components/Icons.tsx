import {
  Rocket, MessageSquare, Handshake, Star, Plug, Link2, Globe, TrendingUp, Wrench,
  Lightbulb, CreditCard, Download, Scale, Settings, FolderOpen, Palette, Zap,
  Monitor, Brain, FileCheck, FileText, Calendar, Search, BarChart3, Building2,
  Clock, Briefcase, BookOpen, PenTool, Layers, Shield, Lock, Smartphone, Chrome,
  ExternalLink, FileSpreadsheet, Presentation, Eye, GitBranch, Terminal,
  Network, BookMarked, GraduationCap, AlertTriangle, CheckCircle2, Copy,
  Users, LayoutGrid, Workflow, Database, Mail, FileKey, Hash, MousePointer,
  Bot, Sparkles, Target, ScrollText, ArrowRightLeft, Cpu, KeyRound,
  Package, Phone, SlidersHorizontal, LayoutDashboard, MessageCircle,
  HardDrive, Video, Image, Table, FormInput, Map, Share2, Cloud, Headphones,
  type LucideIcon
} from 'lucide-react'

// Map string icon IDs to Lucide components
const iconMap: Record<string, LucideIcon> = {
  // Section icons
  'rocket': Rocket,
  'message-square': MessageSquare,
  'handshake': Handshake,
  'star': Star,
  'plug': Plug,
  'link': Link2,
  'globe': Globe,
  'trending-up': TrendingUp,
  'wrench': Wrench,
  'layers': Layers,
  'book-marked': BookMarked,
  'graduation-cap': GraduationCap,

  // Card icons
  'lightbulb': Lightbulb,
  'credit-card': CreditCard,
  'download': Download,
  'scale': Scale,
  'settings': Settings,
  'folder-open': FolderOpen,
  'palette': Palette,
  'zap': Zap,
  'monitor': Monitor,
  'brain': Brain,
  'file-check': FileCheck,
  'file-text': FileText,
  'calendar': Calendar,
  'search': Search,
  'bar-chart': BarChart3,
  'building': Building2,
  'clock': Clock,
  'briefcase': Briefcase,
  'book-open': BookOpen,
  'pen-tool': PenTool,
  'shield': Shield,
  'lock': Lock,
  'smartphone': Smartphone,
  'chrome': Chrome,
  'external-link': ExternalLink,
  'spreadsheet': FileSpreadsheet,
  'presentation': Presentation,
  'eye': Eye,
  'git-branch': GitBranch,
  'terminal': Terminal,
  'network': Network,
  'alert-triangle': AlertTriangle,
  'check-circle': CheckCircle2,
  'copy': Copy,
  'users': Users,
  'layout-grid': LayoutGrid,
  'workflow': Workflow,
  'database': Database,
  'mail': Mail,
  'file-key': FileKey,
  'hash': Hash,
  'mouse-pointer': MousePointer,
  'bot': Bot,
  'sparkles': Sparkles,
  'target': Target,
  'scroll-text': ScrollText,
  'arrow-right-left': ArrowRightLeft,
  'cpu': Cpu,
  'key-round': KeyRound,
  'package': Package,
  'phone': Phone,
  'sliders': SlidersHorizontal,
  'layout': LayoutDashboard,
  'message-circle': MessageCircle,
  'dollar-sign': CreditCard,
  'hard-drive': HardDrive,
  'video': Video,
  'image': Image,
  'table': Table,
  'form-input': FormInput,
  'map': Map,
  'share': Share2,
  'cloud': Cloud,
  'headphones': Headphones,
}

interface IconProps {
  name: string
  className?: string
  size?: number
}

export function Icon({ name, className = '', size = 18 }: IconProps) {
  const LucideIcon = iconMap[name]
  if (!LucideIcon) {
    return <span className={className} style={{ width: size, height: size }} />
  }
  return <LucideIcon className={className} size={size} />
}

// Styled section icon with accent gradient background
export function SectionIcon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <div
      className="shrink-0 flex items-center justify-center rounded-lg"
      style={{
        width: size + 16,
        height: size + 16,
        background: 'linear-gradient(135deg, var(--bg-accent), var(--bg-accent-hover))',
        boxShadow: 'var(--gold-glow-sm)',
      }}
    >
      <Icon name={name} size={size} className="text-[var(--fg-on-accent)]" />
    </div>
  )
}

// Styled card icon with subtle accent background
export function CardIcon({ name, size = 16 }: { name: string; size?: number }) {
  return (
    <div
      className="shrink-0 flex items-center justify-center rounded-md"
      style={{
        width: size + 12,
        height: size + 12,
        background: 'var(--bg-accent-subtle)',
        border: '1px solid var(--border-accent)',
      }}
    >
      <Icon name={name} size={size} className="text-[var(--fg-accent)]" />
    </div>
  )
}
