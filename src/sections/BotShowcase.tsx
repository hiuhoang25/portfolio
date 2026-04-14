import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Hash, Send, Bot, MessageSquare, Slash, BarChart3, ShoppingCart, BookOpen, Download, Ticket, Image as ImageIcon, Code } from 'lucide-react';
import { SectionWrapper } from '@/components/SectionWrapper';
import { useLanguage } from '@/i18n/LanguageContext';
import type { ReactNode } from 'react';

// Discord Color Palette
const DISCORD_COLORS = {
  background: '#313338',
  sidebar: '#2b2d31',
  header: '#2b2d31',
  input: '#383a40',
  embed: '#2b2d31',
  text: '#dbdee1',
  muted: '#949ba4',
  bot: '#5865f2',
  green: '#3ba55d',
  red: '#ed4245',
  yellow: '#faa81a',
  blurple: '#5865f2',
};

// ===== DISCORD UI COMPONENTS =====

function DiscordMessage({ 
  author, 
  avatar, 
  content, 
  isBot = false,
  embed,
  timestamp = 'Today at 12:14 PM'
}: { 
  author: string; 
  avatar: ReactNode; 
  content?: ReactNode; 
  isBot?: boolean;
  embed?: ReactNode;
  timestamp?: string;
}) {
  return (
    <div className="flex gap-3 py-2 px-4 hover:bg-[#2e3035]/50 transition-colors">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
          {avatar}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`font-medium ${isBot ? 'text-[#5865f2]' : 'text-white'}`}>
            {author}
          </span>
          {isBot && (
            <span className="px-1.5 py-0.5 bg-[#5865f2] text-[10px] font-bold text-white rounded">
              BOT
            </span>
          )}
          <span className="text-xs text-[#949ba4]">{timestamp}</span>
        </div>
        {content && (
          <div className="text-[#dbdee1] text-sm mt-0.5 leading-relaxed">
            {content}
          </div>
        )}
        {embed && <div className="mt-2">{embed}</div>}
      </div>
    </div>
  );
}

interface DiscordEmbedProps {
  title?: string;
  description?: ReactNode;
  color?: string;
  image?: string;
  fields?: { name: string; value: ReactNode; inline?: boolean }[];
  footer?: ReactNode;
  author?: { name: string; icon_url?: string };
  children?: ReactNode;
}

function DiscordEmbed({ 
  title, 
  description, 
  color = '#5865f2',
  image,
  fields,
  footer,
  author,
  children
}: DiscordEmbedProps) {
  return (
    <div 
      className="rounded overflow-hidden max-w-[520px]"
      style={{ backgroundColor: '#2b2d31', borderLeft: `4px solid ${color}` }}
    >
      <div className="p-3">
        {author && (
          <div className="flex items-center gap-2 mb-2">
            {author.icon_url && <img src={author.icon_url} alt="" className="w-5 h-5 rounded-full" />}
            <span className="text-sm font-medium text-white">{author.name}</span>
          </div>
        )}
        {title && <div className="font-semibold text-white mb-1">{title}</div>}
        {description && <div className="text-sm text-[#dbdee1]">{description}</div>}
        {fields && fields.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {fields.map((field, i) => (
              <div key={i} className={field.inline ? '' : 'col-span-3'}>
                <div className="text-xs text-[#949ba4] font-semibold uppercase">{field.name}</div>
                <div className="text-sm text-[#dbdee1]">{field.value}</div>
              </div>
            ))}
          </div>
        )}
        {children}
      </div>
      {image && (
        <div className="w-full">
          <img src={image} alt="Embed" className="w-full object-cover max-h-64" />
        </div>
      )}
      {footer && (
        <div className="px-3 py-2 text-xs text-[#949ba4]">
          {footer}
        </div>
      )}
    </div>
  );
}

function DiscordButton({ children, variant = 'primary', emoji }: { children: ReactNode; variant?: 'primary' | 'secondary' | 'success' | 'danger'; emoji?: string }) {
  const colors = {
    primary: 'bg-[#5865f2] hover:bg-[#4752c4]',
    secondary: 'bg-[#4f545c] hover:bg-[#686d73]',
    success: 'bg-[#3ba55d] hover:bg-[#2d7d46]',
    danger: 'bg-[#ed4245] hover:bg-[#c03537]',
  };
  
  return (
    <button className={`px-4 py-2 rounded text-sm font-medium text-white transition-colors ${colors[variant]}`}>
      {emoji && <span className="mr-2">{emoji}</span>}
      {children}
    </button>
  );
}

// ===== COMMAND DEMOS =====

// 1. CHARTS COMMAND DEMO
function ChartsDemo() {
  return (
    <div className="space-y-2">
      <DiscordMessage
        author="User"
        avatar={<div className="w-full h-full bg-[#5865f2] flex items-center justify-center text-white">👤</div>}
        content={<span className="text-[#00a8fc]">/charts message daily</span>}
        timestamp="Today at 12:14 PM"
      />
      <DiscordMessage
        author="Kiri"
        avatar={<div className="w-full h-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"><Bot className="w-6 h-6 text-white" /></div>}
        isBot
        embed={
          <DiscordEmbed
            title="📊 Message Statistics"
            description="Daily message count for the past 7 days"
            color="#5865f2"
          >
            <div className="mt-3 space-y-2">
              <div className="flex items-end gap-1 h-32 px-2">
                {[
                  { day: 'Mon', value: 45 },
                  { day: 'Tue', value: 78 },
                  { day: 'Wed', value: 120 },
                  { day: 'Thu', value: 95 },
                  { day: 'Fri', value: 156 },
                  { day: 'Sat', value: 203 },
                  { day: 'Sun', value: 178 },
                ].map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className="w-full bg-[#5865f2] rounded-t transition-all"
                      style={{ height: `${(d.value / 250) * 100}px` }}
                    />
                    <span className="text-[10px] text-[#949ba4]">{d.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm text-[#949ba4] pt-2 border-t border-[#404249]">
                <span>Total: 875 messages</span>
                <span>Avg: 125/day</span>
              </div>
            </div>
          </DiscordEmbed>
        }
        timestamp="Today at 12:14 PM"
      />
    </div>
  );
}

// 2. ECONOMY COMMAND DEMO
function EconomyDemo() {
  return (
    <div className="space-y-2">
      <DiscordMessage
        author="User"
        avatar={<div className="w-full h-full bg-[#5865f2] flex items-center justify-center text-white">👤</div>}
        content={<span className="text-[#00a8fc]">k!buy</span>}
        timestamp="Today at 12:15 PM"
      />
      <DiscordMessage
        author="Kiri"
        avatar={<div className="w-full h-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"><Bot className="w-6 h-6 text-white" /></div>}
        isBot
        embed={
          <DiscordEmbed
            title="🛒 Item Shop"
            description="Use `k!buy <item>` to purchase an item"
            color="#faa81a"
          >
            <div className="mt-3 space-y-2">
              {[
                { name: '💎 Diamond Pickaxe', price: 5000, desc: 'Mine faster!' },
                { name: '🗡️ Legendary Sword', price: 3500, desc: 'Deal more damage' },
                { name: '🛡️ Shield', price: 2000, desc: 'Block attacks' },
                { name: '🍎 Golden Apple', price: 500, desc: 'Restore health' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-[#232428] rounded">
                  <div>
                    <div className="text-white font-medium">{item.name}</div>
                    <div className="text-xs text-[#949ba4]">{item.desc}</div>
                  </div>
                  <div className="text-[#faa81a] font-mono">🪙 {item.price.toLocaleString()}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-sm text-[#949ba4]">
              Your balance: <span className="text-[#faa81a]">🪙 12,450</span>
            </div>
          </DiscordEmbed>
        }
        timestamp="Today at 12:15 PM"
      />
    </div>
  );
}

// 3. INVENTORY COMMAND
function InventoryDemo() {
  return (
    <div className="space-y-2">
      <DiscordMessage
        author="User"
        avatar={<div className="w-full h-full bg-[#5865f2] flex items-center justify-center text-white">👤</div>}
        content={<span className="text-[#00a8fc]">k!inv</span>}
        timestamp="Today at 12:16 PM"
      />
      <DiscordMessage
        author="Kiri"
        avatar={<div className="w-full h-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"><Bot className="w-6 h-6 text-white" /></div>}
        isBot
        embed={
          <DiscordEmbed
            title="🎒 Your Inventory"
            color="#3ba55d"
          >
            <div className="mt-3">
              <div className="grid grid-cols-4 gap-2">
                {[
                  { emoji: '💎', name: 'Diamond', count: 15 },
                  { emoji: '🗡️', name: 'Sword', count: 3 },
                  { emoji: '🛡️', name: 'Shield', count: 2 },
                  { emoji: '🍎', name: 'Apple', count: 47 },
                  { emoji: '⛏️', name: 'Pickaxe', count: 1 },
                  { emoji: '📦', name: 'Crate', count: 5 },
                  { emoji: '🔑', name: 'Key', count: 8 },
                  { emoji: '💍', name: 'Ring', count: 1 },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center p-2 bg-[#232428] rounded">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-xs text-white mt-1">{item.name}</span>
                    <span className="text-xs text-[#949ba4]">x{item.count}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-center text-sm text-[#949ba4]">
                Page 1/2 • 24 items total
              </div>
            </div>
          </DiscordEmbed>
        }
        timestamp="Today at 12:16 PM"
      />
    </div>
  );
}

// 4. MANGA READER DEMO
function MangaDemo() {
  return (
    <div className="space-y-2">
      <DiscordMessage
        author="User"
        avatar={<div className="w-full h-full bg-[#5865f2] flex items-center justify-center text-white">👤</div>}
        content={<span className="text-[#00a8fc]">/reading-list</span>}
        timestamp="Today at 12:17 PM"
      />
      <DiscordMessage
        author="Kiri"
        avatar={<div className="w-full h-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"><Bot className="w-6 h-6 text-white" /></div>}
        isBot
        embed={
          <DiscordEmbed
            title="📚 Your Reading List"
            color="#ed4245"
          >
            <div className="mt-3 space-y-3">
              {[
                { title: 'One Piece', chapter: 'Chapter 1089', progress: 85, status: 'Reading' },
                { title: 'Jujutsu Kaisen', chapter: 'Chapter 236', progress: 100, status: 'Caught Up' },
                { title: 'Chainsaw Man', chapter: 'Chapter 145', progress: 60, status: 'Reading' },
              ].map((manga, i) => (
                <div key={i} className="p-3 bg-[#232428] rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-white font-medium">{manga.title}</div>
                      <div className="text-xs text-[#949ba4]">{manga.chapter}</div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      manga.status === 'Caught Up' ? 'bg-[#3ba55d]/20 text-[#3ba55d]' : 'bg-[#faa81a]/20 text-[#faa81a]'
                    }`}>
                      {manga.status}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 bg-[#404249] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#5865f2] rounded-full"
                      style={{ width: `${manga.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <DiscordButton variant="primary">⬅️ Previous</DiscordButton>
              <DiscordButton variant="secondary">➡️ Next</DiscordButton>
              <DiscordButton variant="success">📖 Read</DiscordButton>
            </div>
          </DiscordEmbed>
        }
        timestamp="Today at 12:17 PM"
      />
    </div>
  );
}

// 5. MANGA INFO DEMO
function MangaInfoDemo() {
  return (
    <div className="space-y-2">
      <DiscordMessage
        author="User"
        avatar={<div className="w-full h-full bg-[#5865f2] flex items-center justify-center text-white">👤</div>}
        content={<span className="text-[#00a8fc]">/get One Piece</span>}
        timestamp="Today at 12:18 PM"
      />
      <DiscordMessage
        author="Kiri"
        avatar={<div className="w-full h-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"><Bot className="w-6 h-6 text-white" /></div>}
        isBot
        embed={
          <DiscordEmbed
            title="One Piece"
            description="Gol D. Roger was known as the Pirate King, the strongest and most infamous being to have sailed the Grand Line..."
            color="#ed4245"
            fields={[
              { name: '⭐ Rating', value: '9.2/10', inline: true },
              { name: '📖 Chapters', value: '1089+', inline: true },
              { name: '🏷️ Status', value: 'Ongoing', inline: true },
              { name: '📅 Released', value: '1997', inline: true },
              { name: '🎨 Author', value: 'Eiichiro Oda', inline: true },
              { name: '📚 Genre', value: 'Action, Adventure', inline: true },
            ]}
          >
            <div className="mt-3 flex gap-2">
              <DiscordButton variant="primary">📖 Read Now</DiscordButton>
              <DiscordButton variant="secondary">➕ Add to List</DiscordButton>
            </div>
          </DiscordEmbed>
        }
        timestamp="Today at 12:18 PM"
      />
    </div>
  );
}

// 6. DOWNLOAD LINKS DEMO
function DownloadDemo() {
  return (
    <div className="space-y-2">
      <DiscordMessage
        author="User"
        avatar={<div className="w-full h-full bg-[#5865f2] flex items-center justify-center text-white">👤</div>}
        content={<span className="text-[#00a8fc]">/get One Piece 1089</span>}
        timestamp="Today at 12:19 PM"
      />
      <DiscordMessage
        author="Kiri"
        avatar={<div className="w-full h-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"><Bot className="w-6 h-6 text-white" /></div>}
        isBot
        embed={
          <DiscordEmbed
            title="📥 Download Links"
            description="One Piece - Chapter 1089"
            color="#3ba55d"
          >
            <div className="mt-3 space-y-2">
              {[
                { name: 'Mirror 1 (Mediafire)', status: '✅ Online', color: '#3ba55d' },
                { name: 'Mirror 2 (Mega)', status: '✅ Online', color: '#3ba55d' },
                { name: 'Mirror 3 (Google Drive)', status: '⚠️ Slow', color: '#faa81a' },
                { name: 'Mirror 4 (Zippyshare)', status: '❌ Offline', color: '#ed4245' },
              ].map((mirror, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-[#232428] rounded">
                  <span className="text-white text-sm">{mirror.name}</span>
                  <span style={{ color: mirror.color }} className="text-xs">{mirror.status}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-[#949ba4]">
              ⚡ Fastest mirror: <span className="text-[#3ba55d]">Mirror 1</span>
            </div>
          </DiscordEmbed>
        }
        timestamp="Today at 12:19 PM"
      />
    </div>
  );
}

// 7. TICKET SYSTEM DEMO
function TicketDemo() {
  return (
    <div className="space-y-2">
      <DiscordMessage
        author="User"
        avatar={<div className="w-full h-full bg-[#5865f2] flex items-center justify-center text-white">👤</div>}
        content={<span className="text-[#00a8fc]">/ticket create Need help with bot</span>}
        timestamp="Today at 12:20 PM"
      />
      <DiscordMessage
        author="Kiri"
        avatar={<div className="w-full h-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"><Bot className="w-6 h-6 text-white" /></div>}
        isBot
        embed={
          <DiscordEmbed
            title="🎫 Support Ticket #0421"
            description="Need help with bot"
            color="#5865f2"
          >
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[#949ba4]">Status:</span>
                <span className="px-2 py-0.5 bg-[#faa81a]/20 text-[#faa81a] text-xs rounded">Open</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#949ba4]">Created by:</span>
                <span className="text-white">@User</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#949ba4]">Created at:</span>
                <span className="text-white">Today at 12:20 PM</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-[#232428] rounded text-sm text-[#dbdee1]">
              <p className="text-[#949ba4] mb-1">Original message:</p>
              Need help with bot
            </div>
            <div className="mt-3 flex gap-2">
              <DiscordButton variant="success">✅ Close</DiscordButton>
              <DiscordButton variant="secondary">👤 Claim</DiscordButton>
              <DiscordButton variant="danger">🗑️ Delete</DiscordButton>
            </div>
          </DiscordEmbed>
        }
        timestamp="Today at 12:20 PM"
      />
    </div>
  );
}

// ===== MAIN COMPONENT =====

export function BotShowcase() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'slash' | 'chat'>('slash');
  const [selectedFeature, setSelectedFeature] = useState<string>('charts');
  const [viewMode, setViewMode] = useState<'code' | 'image' | 'both'>('both');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features: { 
    id: string; 
    name: string; 
    nameVi: string; 
    command: string; 
    icon: React.ElementType; 
    demo: React.FC;
    image: string;
  }[] = [
    { id: 'charts', name: 'Analytics', nameVi: 'Thống kê', command: '/charts', icon: BarChart3, demo: ChartsDemo, image: '/showcase/charts.jpg' },
    { id: 'economy', name: 'Shop', nameVi: 'Cửa hàng', command: 'k!buy', icon: ShoppingCart, demo: EconomyDemo, image: '/showcase/economy.jpg' },
    { id: 'inventory', name: 'Inventory', nameVi: 'Kho đồ', command: 'k!inv', icon: ShoppingCart, demo: InventoryDemo, image: '/showcase/economy.jpg' },
    { id: 'reading', name: 'Reading List', nameVi: 'Danh sách đọc', command: '/reading-list', icon: BookOpen, demo: MangaDemo, image: '/showcase/reading-list.jpg' },
    { id: 'manga', name: 'Manga Info', nameVi: 'Thông tin manga', command: '/get', icon: BookOpen, demo: MangaInfoDemo, image: '/showcase/manga-info.jpg' },
    { id: 'download', name: 'Download', nameVi: 'Tải xuống', command: '/get', icon: Download, demo: DownloadDemo, image: '/showcase/get-link.jpg' },
    { id: 'ticket', name: 'Ticket', nameVi: 'Ticket', command: '/ticket', icon: Ticket, demo: TicketDemo, image: '/showcase/ticket.jpg' },
  ];

  const SelectedDemo = features.find(f => f.id === selectedFeature)?.demo || ChartsDemo;
  const selectedImage = features.find(f => f.id === selectedFeature)?.image || '/showcase/charts.jpg';

  return (
    <section id="showcase" className="min-h-screen px-8 py-16 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <SectionWrapper>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-violet-500/20">
              <Bot className="w-6 h-6 text-violet-500" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              {language === 'vi' ? 'Trình diễn Bot' : 'Bot Showcase'}
            </h2>
          </div>
          <p className="text-xl text-zinc-500 mb-8">
            {language === 'vi' 
              ? 'Xem bot Kiri hoạt động với các tính năng mạnh mẽ' 
              : 'See Kiri bot in action with powerful features'}
          </p>
        </SectionWrapper>

        {/* View Mode Toggle */}
        <SectionWrapper delay={0.1}>
          <div className="flex items-center justify-center gap-2 mb-6">
            <button
              onClick={() => setViewMode('code')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'code' 
                  ? 'bg-violet-500 text-white' 
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              <Code className="w-4 h-4" />
              {language === 'vi' ? 'Mã' : 'Code'}
            </button>
            <button
              onClick={() => setViewMode('image')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'image' 
                  ? 'bg-violet-500 text-white' 
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              {language === 'vi' ? 'Ảnh' : 'Image'}
            </button>
            <button
              onClick={() => setViewMode('both')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'both' 
                  ? 'bg-violet-500 text-white' 
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              <span className="flex items-center gap-1">
                <Code className="w-3 h-3" />
                <ImageIcon className="w-3 h-3" />
              </span>
              {language === 'vi' ? 'Cả hai' : 'Both'}
            </button>
          </div>
        </SectionWrapper>

        {/* Display Area */}
        <SectionWrapper delay={0.2}>
          <div className={`grid gap-6 ${viewMode === 'both' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
            {/* Code Recreation */}
            {(viewMode === 'code' || viewMode === 'both') && (
              <div className="rounded-xl overflow-hidden border border-zinc-700 shadow-2xl" style={{ backgroundColor: DISCORD_COLORS.background }}>
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b" style={{ backgroundColor: DISCORD_COLORS.header, borderColor: '#1e1f22' }}>
                  <div className="flex items-center gap-2">
                    <Hash className="w-5 h-5 text-[#949ba4]" />
                    <span className="font-semibold text-white">general</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('slash')}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        activeTab === 'slash' 
                          ? 'bg-[#5865f2] text-white' 
                          : 'text-[#949ba4] hover:text-white hover:bg-[#404249]'
                      }`}
                    >
                      <Slash className="w-4 h-4 inline mr-1" />
                      Slash
                    </button>
                    <button
                      onClick={() => setActiveTab('chat')}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        activeTab === 'chat' 
                          ? 'bg-[#5865f2] text-white' 
                          : 'text-[#949ba4] hover:text-white hover:bg-[#404249]'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4 inline mr-1" />
                      Chat
                    </button>
                  </div>
                </div>

                {/* Chat Area */}
                <div className="h-[400px] overflow-y-auto" style={{ backgroundColor: DISCORD_COLORS.background }}>
                  {/* Welcome Message */}
                  <div className="px-4 py-4 border-b border-[#2b2d31]">
                    <div className="w-12 h-12 rounded-full bg-[#5865f2] flex items-center justify-center mb-3">
                      <Hash className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {language === 'vi' ? 'Chào mừng đến với' : 'Welcome to'} #general!
                    </h3>
                  </div>

                  {/* Bot Welcome Message */}
                  <DiscordMessage
                    author="Kiri"
                    avatar={<div className="w-full h-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"><Bot className="w-6 h-6 text-white" /></div>}
                    isBot
                    content={
                      <div>
                        <p className="mb-1">
                          {language === 'vi' 
                            ? 'Thử các lệnh trong server Discord của bạn!' 
                            : 'Try the commands in your own discord server!'}
                        </p>
                        <p className="text-[#949ba4] text-xs">
                          {language === 'vi' ? 'Gõ / để xem tất cả các lệnh' : 'Type / to see all commands'}
                        </p>
                      </div>
                    }
                  />

                  {/* Command Demo */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedFeature}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <SelectedDemo />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Input Area */}
                <div className="px-4 py-3" style={{ backgroundColor: DISCORD_COLORS.input }}>
                  <div className="flex items-center gap-3 rounded-lg" style={{ backgroundColor: '#404249' }}>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-[#686d73] transition-colors ml-2">
                      <span className="text-xl">+</span>
                    </button>
                    <div className="flex-1 py-2.5">
                      <span className="text-[#949ba4] text-sm">
                        {features.find(f => f.id === selectedFeature)?.command || '/charts'}
                      </span>
                    </div>
                    <button className="text-[#b5bac1] hover:text-white transition-colors mr-2">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Real Screenshot */}
            {(viewMode === 'image' || viewMode === 'both') && (
              <div className="rounded-xl overflow-hidden border border-zinc-700 shadow-2xl bg-zinc-900">
                <div className="px-4 py-3 bg-zinc-800 border-b border-zinc-700 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-violet-400" />
                  <span className="font-semibold text-white">
                    {language === 'vi' ? 'Ảnh chụp thực tế' : 'Real Screenshot'}
                  </span>
                </div>
                <div className="h-[400px] overflow-y-auto bg-[#36393f] flex items-center justify-center p-4">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedFeature}
                      src={selectedImage}
                      alt="Bot Screenshot"
                      className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </SectionWrapper>

        {/* Feature Selector */}
        <SectionWrapper delay={0.3}>
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              {language === 'vi' ? 'Chọn lệnh để xem' : 'Select a command to preview'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.button
                    key={feature.id}
                    onClick={() => setSelectedFeature(feature.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedFeature === feature.id
                        ? 'border-violet-500 bg-violet-500/10'
                        : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${selectedFeature === feature.id ? 'text-violet-400' : 'text-zinc-400'}`} />
                    <div className="text-xs text-violet-400 font-mono mb-1">
                      {feature.command}
                    </div>
                    <div className="text-sm text-white font-medium truncate">
                      {language === 'vi' ? feature.nameVi : feature.name}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </SectionWrapper>

        {/* Stats */}
        <SectionWrapper delay={0.4}>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 text-center">
              <div className="text-3xl font-bold text-violet-500 mb-1">1M+</div>
              <div className="text-sm text-zinc-500">
                {language === 'vi' ? 'NgườI dùng' : 'Users'}
              </div>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 text-center">
              <div className="text-3xl font-bold text-violet-500 mb-1">250K+</div>
              <div className="text-sm text-zinc-500">
                {language === 'vi' ? 'Server' : 'Servers'}
              </div>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 text-center">
              <div className="text-3xl font-bold text-violet-500 mb-1">50+</div>
              <div className="text-sm text-zinc-500">
                {language === 'vi' ? 'Lệnh' : 'Commands'}
              </div>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 text-center">
              <div className="text-3xl font-bold text-violet-500 mb-1">99.9%</div>
              <div className="text-sm text-zinc-500">
                {language === 'vi' ? 'Uptime' : 'Uptime'}
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Navigation */}
        <SectionWrapper delay={0.5}>
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-zinc-800">
            <button
              onClick={() => scrollToSection('projects')}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('projects')}</span>
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
            >
              <span>{t('skillsAndTools')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
