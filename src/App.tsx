import React, { useState, useEffect, useRef } from 'react';
import { 
  DollarSign, Users, Cpu, Palette, Bug, Star, Trophy, Plus, Gamepad2, X, Code, 
  Megaphone, UserPlus, TrendingUp, MonitorPlay, Smartphone, Laptop, Store, 
  Building2, Landmark, Briefcase, Share2, Award, Presentation, Search, 
  ShoppingCart, GraduationCap, MousePointer2, LayoutGrid, BarChart3, PieChart, 
  Calendar, FileText, Globe, Settings, Building, Monitor, Target, Rocket, Clock, TrendingDown, AlertTriangle, Mic,
  Book, Radio, Puzzle, Package, Joystick, Newspaper, Glasses, ChevronLeft, Dices, CheckCircle2, Check, Pause, Play,
  MessageSquare, ThumbsUp, ThumbsDown, Car, Bitcoin, Bot, Brain, Plane, Printer, Camera, Headphones, Tv, Film, Music, Heart, PenTool
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Rival {
  id: number;
  name: string;
  marketShare: number;
  fans: number;
  lastRelease?: { name: string; score: number; date: Date };
}

type Game = {
  id: number;
  name: string;
  type: string;
  genre: string;
  platform: string;
  theme?: string;
  visualStyle?: string;
  targetAudience?: string;
  marketingCampaigns?: string[];
  tvNetworks?: string[];
  regions?: string[];
  isSubscription?: boolean;
  activeSubscribers?: number;
  monthlyFee?: number;
  maintenanceCost?: number;
  isActive?: boolean;
  design: number;
  tech: number;
  bugs: number;
  score: number;
  sales: number;
  revenue: number;
  hasMerch?: boolean;
  hasEsports?: boolean;
};

type Tab = 'studio' | 'hr' | 'marketing' | 'infra' | 'market' | 'history' | 'stats' | 'research' | 'awards' | 'finance' | 'calendar' | 'store' | 'world' | 'settings' | 'hardware';

const AVAILABLE_FEATURES = [
  { id: 'soundtrack', name: 'Trilha Sonora Épica', cost: 50000, rp: 10, boost: 0.2 },
  { id: 'localization', name: 'Localização Global', cost: 100000, rp: 20, boost: 0.3 },
  { id: 'accessibility', name: 'Acessibilidade Total', cost: 30000, rp: 15, boost: 0.1 },
  { id: 'nextgen', name: 'Visual Next-Gen', cost: 200000, rp: 50, boost: 0.4 },
  { id: 'vr', name: 'Suporte a VR/AR', cost: 150000, rp: 40, boost: 0.3 },
  { id: 'social', name: 'Integração Social', cost: 80000, rp: 25, boost: 0.2 },
  { id: 'ai', name: 'IA Avançada', cost: 120000, rp: 35, boost: 0.3 },
  { id: 'cloud', name: 'Otimização em Nuvem', cost: 90000, rp: 30, boost: 0.2 },
  { id: 'postlaunch', name: 'Plano Pós-Lançamento', cost: 100000, rp: 10, boost: 0.2 },
];

const MARKETING_OPTIONS = [
  { id: 'boca_a_boca', name: 'Boca a Boca', cost: 0, year: 0, hype: 1.0 },
  { id: 'panfletos', name: 'Panfletos e Cartazes', cost: 5000, year: 0, hype: 1.1 },
  { id: 'jornal', name: 'Jornal / Revista', cost: 15000, year: 0, hype: 1.2 },
  { id: 'outdoors', name: 'Outdoors', cost: 50000, year: 1900, hype: 1.4 },
  { id: 'radio', name: 'Rádio', cost: 20000, year: 1920, hype: 1.3 },
  { id: 'tv', name: 'Televisão', cost: 100000, year: 1950, hype: 1.6 },
  { id: 'eventos', name: 'Patrocínio de Eventos', cost: 200000, year: 1960, hype: 1.8 },
  { id: 'internet', name: 'Banners na Internet', cost: 30000, year: 1995, hype: 1.3 },
  { id: 'redes_sociais', name: 'Redes Sociais', cost: 40000, year: 2005, hype: 1.5 },
  { id: 'influenciadores', name: 'Influenciadores', cost: 80000, year: 2010, hype: 1.7 },
  { id: 'viral', name: 'Campanha Viral', cost: 150000, year: 2015, hype: 1.9 },
];

const DEFAULT_TV_NETWORKS = [
  { id: 'globo', name: 'Rede Global', cost: 500000, hype: 1.8 },
  { id: 'sbt', name: 'Sistema Brasileiro de Transmissão', cost: 200000, hype: 1.5 },
  { id: 'record', name: 'TV Recordação', cost: 150000, hype: 1.4 },
  { id: 'band', name: 'Bandeirantes', cost: 100000, hype: 1.2 },
  { id: 'mtv', name: 'Music TV', cost: 80000, hype: 1.3 },
];

const REGIONS = [
  { id: 'na', name: 'América do Norte', costMultiplier: 0, salesMultiplier: 1.0 },
  { id: 'eu', name: 'Europa', costMultiplier: 0.2, salesMultiplier: 0.8 },
  { id: 'as', name: 'Ásia', costMultiplier: 0.3, salesMultiplier: 1.2 },
  { id: 'sa', name: 'América Latina', costMultiplier: 0.1, salesMultiplier: 0.5 },
];

const SUBSCRIPTION_TYPES = ['Jogo Online', 'Serviço de Streaming', 'Rede Social', 'Plataforma Digital', 'Plataforma de Streaming', 'Aplicativo de Relacionamento', 'Metaverso'];

const AVAILABLE_VIPS = [
  { id: 'vip_director', name: 'Steven Spielburg', role: 'Diretor Lendário', salary: 150000, boost: 1.5 },
  { id: 'vip_designer', name: 'Hideo Kojimo', role: 'Game Designer', salary: 120000, boost: 1.2 },
  { id: 'vip_singer', name: 'Taylor Swiftly', role: 'Popstar', salary: 200000, boost: 1.8 },
  { id: 'vip_writer', name: 'George R.R. Martinho', role: 'Roteirista', salary: 100000, boost: 1.0 },
  { id: 'vip_programmer', name: 'John Carmacko', role: 'Gênio Tech', salary: 180000, boost: 1.6 },
];

const DEFAULT_UPGRADES = [
  { id: 'graphics', name: 'Gráficos & Visual', cost: 50, level: 0, maxLevel: 30, description: 'Melhora a qualidade visual de jogos, filmes e séries.' },
  { id: 'engine', name: 'Motor de Produção', cost: 75, level: 0, maxLevel: 30, description: 'Aumenta a eficiência técnica e reduz erros de produção.' },
  { id: 'ai', name: 'Inteligência Artificial', cost: 150, level: 0, maxLevel: 20, description: 'Melhora a interatividade em jogos e realismo em efeitos.' },
  { id: 'vfx', name: 'Efeitos Especiais (VFX)', cost: 100, level: 0, maxLevel: 25, description: 'Essencial para filmes e séries de alto orçamento.' },
  { id: 'script', name: 'Roteiro Adaptativo', cost: 125, level: 0, maxLevel: 20, description: 'Melhora a narrativa em jogos, filmes e séries.' },
  { id: 'audio', name: 'Som Surround 7.1', cost: 60, level: 0, maxLevel: 20, description: 'Melhora a imersão sonora em todos os produtos.' },
  { id: 'mocap', name: 'Captura de Movimento', cost: 200, level: 0, maxLevel: 10, description: 'Realismo extremo para animações e personagens.' },
  { id: 'marketing', name: 'Marketing Viral', cost: 175, level: 0, maxLevel: 20, description: 'Aumenta o alcance inicial de todos os lançamentos.' },
  { id: 'servers', name: 'Servidores Quânticos', cost: 250, level: 0, maxLevel: 20, description: 'Essencial para serviços online de larga escala.' },
  { id: 'streaming', name: 'Tecnologia de Streaming', cost: 300, level: 0, maxLevel: 15, description: 'Melhora a performance de plataformas de vídeo e jogos.' },
  { id: '3d', name: 'Modelagem 3D Avançada', cost: 180, level: 0, maxLevel: 25, description: 'Aumenta a fidelidade de modelos em jogos e animações.' },
  { id: 'physics', name: 'Motor de Física Realista', cost: 220, level: 0, maxLevel: 20, description: 'Interações físicas mais naturais em jogos e filmes.' },
  { id: 'div_editora', name: 'Divisão: Editora', cost: 50000, level: 0, maxLevel: 1, description: 'Desbloqueia a criação de Jornais, Revistas, Livros e Jogos de Tabuleiro.' },
  { id: 'div_gravadora', name: 'Divisão: Gravadora', cost: 100000, level: 0, maxLevel: 1, description: 'Desbloqueia a criação de Álbuns Musicais, Programas de Rádio e Podcasts.' },
  { id: 'div_cinema', name: 'Divisão: Estúdio de Cinema', cost: 250000, level: 0, maxLevel: 1, description: 'Desbloqueia a produção de Filmes, Séries e Programas de TV.' },
  { id: 'div_hardware', name: 'Divisão: Hardware', cost: 500000, level: 0, maxLevel: 1, description: 'Desbloqueia a criação de Consoles, Computadores, Celulares e Arcades.' },
  { id: 'vacuum_tubes', name: 'Válvulas Termiônicas', cost: 40, level: 0, maxLevel: 10, description: 'Tecnologia base para os primeiros computadores e rádios.' },
  { id: 'transistors', name: 'Transistores', cost: 80, level: 0, maxLevel: 15, description: 'Substitui as válvulas, permitindo dispositivos menores e mais eficientes.' },
  { id: 'punch_cards', name: 'Cartões Perfurados', cost: 30, level: 0, maxLevel: 5, description: 'Melhora a entrada de dados e processamento em mainframes.' },
  { id: 'music_videos', name: 'Produção de Videoclipes', cost: 25000, level: 0, maxLevel: 1, description: 'Permite produzir videoclipes junto com Álbuns Musicais.' },
  { id: 'shows_locais', name: 'Estrutura para Shows', cost: 30000, level: 0, maxLevel: 1, description: 'Permite que suas bandas realizem shows para ganhar dinheiro e fãs.' },
  { id: 'turne_mundial', name: 'Logística de Turnês', cost: 150000, level: 0, maxLevel: 1, description: 'Permite que suas bandas realizem turnês mundiais altamente lucrativas.' }
];

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${active ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
    >
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:block">{label}</span>
    </button>
  );
}

export default function App() {
  const [gameState, setGameState] = useState<'character_creation' | 'company_creation' | 'playing'>('character_creation');
  const [gameMode, setGameMode] = useState<'normal' | 'sandbox'>('normal');
  const [startYear, setStartYear] = useState<number>(2000);
  const [creationStep, setCreationStep] = useState(0);
  
  // Player & Company Info
  const [playerStats, setPlayerStats] = useState({ tech: 0, design: 0, business: 0 });
  const [perks, setPerks] = useState<string[]>([]);
  const [ceoName, setCeoName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyFocus, setCompanyFocus] = useState('Geral');
  const [logoColor, setLogoColor] = useState('#6366f1');
  const [country, setCountry] = useState('');
  const [stateName, setStateName] = useState('');
  const [city, setCity] = useState('');
  const [bands, setBands] = useState<{id: number, name: string, genre: string, members: number}[]>([]);

  const countries = [
    { 
      name: 'Brasil', 
      states: [
        { name: 'São Paulo', cities: ['São Paulo', 'Campinas', 'Santos', 'São Bernardo do Campo'] },
        { name: 'Rio de Janeiro', cities: ['Rio de Janeiro', 'Niterói', 'Búzios', 'Petrópolis'] },
        { name: 'Minas Gerais', cities: ['Belo Horizonte', 'Uberlândia', 'Ouro Preto', 'Tiradentes'] },
        { name: 'Paraná', cities: ['Curitiba', 'Londrina', 'Foz do Iguaçu'] },
        { name: 'Santa Catarina', cities: ['Florianópolis', 'Joinville', 'Blumenau'] },
        { name: 'Rio Grande do Sul', cities: ['Porto Alegre', 'Gramado', 'Caxias do Sul'] },
        { name: 'Bahia', cities: ['Salvador', 'Porto Seguro', 'Ilhéus'] },
        { name: 'Ceará', cities: ['Fortaleza', 'Jericoacoara', 'Juazeiro do Norte'] },
        { name: 'Pernambuco', cities: ['Recife', 'Olinda', 'Porto de Galinhas'] },
        { name: 'Distrito Federal', cities: ['Brasília'] }
      ] 
    },
    { 
      name: 'Estados Unidos', 
      states: [
        { name: 'California', cities: ['Los Angeles', 'San Francisco', 'Cupertino', 'Palo Alto'] },
        { name: 'New York', cities: ['New York City', 'Buffalo', 'Albany'] },
        { name: 'Texas', cities: ['Austin', 'Houston', 'Dallas'] },
        { name: 'Florida', cities: ['Miami', 'Orlando', 'Tampa'] },
        { name: 'Washington', cities: ['Seattle', 'Redmond', 'Bellevue'] },
        { name: 'Illinois', cities: ['Chicago', 'Springfield'] },
        { name: 'Massachusetts', cities: ['Boston', 'Cambridge'] }
      ] 
    },
    { 
      name: 'Japão', 
      states: [
        { name: 'Tokyo', cities: ['Shinjuku', 'Shibuya', 'Akihabara'] },
        { name: 'Osaka', cities: ['Osaka City', 'Sakai'] },
        { name: 'Kyoto', cities: ['Kyoto City', 'Uji'] },
        { name: 'Hokkaido', cities: ['Sapporo', 'Hakodate'] },
        { name: 'Fukuoka', cities: ['Fukuoka City', 'Kitakyushu'] }
      ] 
    },
    { 
      name: 'Reino Unido', 
      states: [
        { name: 'England', cities: ['London', 'Manchester', 'Liverpool', 'Cambridge'] },
        { name: 'Scotland', cities: ['Edinburgh', 'Glasgow'] },
        { name: 'Wales', cities: ['Cardiff', 'Swansea'] },
        { name: 'Northern Ireland', cities: ['Belfast', 'Derry'] }
      ] 
    },
    { 
      name: 'Alemanha', 
      states: [
        { name: 'Bavaria', cities: ['Munich', 'Nuremberg'] },
        { name: 'Berlin', cities: ['Berlin'] },
        { name: 'Hamburg', cities: ['Hamburg'] },
        { name: 'Hesse', cities: ['Frankfurt', 'Wiesbaden'] }
      ] 
    },
    { 
      name: 'Canadá', 
      states: [
        { name: 'Ontario', cities: ['Toronto', 'Ottawa', 'Mississauga'] },
        { name: 'Quebec', cities: ['Montreal', 'Quebec City'] },
        { name: 'British Columbia', cities: ['Vancouver', 'Victoria'] },
        { name: 'Alberta', cities: ['Calgary', 'Edmonton'] }
      ] 
    },
    { 
      name: 'Coreia do Sul', 
      states: [
        { name: 'Seoul', cities: ['Gangnam', 'Hongdae', 'Itaewon'] },
        { name: 'Busan', cities: ['Haeundae', 'Seomyeon'] },
        { name: 'Incheon', cities: ['Incheon City'] },
        { name: 'Daegu', cities: ['Daegu City'] }
      ] 
    },
    { 
      name: 'França', 
      states: [
        { name: 'Île-de-France', cities: ['Paris', 'Versailles'] },
        { name: 'Provence-Alpes-Côte d\'Azur', cities: ['Marseille', 'Nice', 'Cannes'] },
        { name: 'Auvergne-Rhône-Alpes', cities: ['Lyon', 'Grenrole'] }
      ] 
    },
    { 
      name: 'Espaço', 
      states: [
        { name: 'Estação Espacial', cities: ['Módulo de Comando', 'Laboratório Orbital', 'Dormitórios'] },
        { name: 'Lua', cities: ['Base Alpha', 'Cratera Tycho', 'Mar da Tranquilidade'] },
        { name: 'Marte', cities: ['Colônia Musk', 'Vale Marineris', 'Monte Olimpo'] }
      ] 
    }
  ];

  const ceoNames = [
    'Marcos Zuckerberg', 'Elon Muskito', 'Steve Jobs da Silva', 'Bill Portas', 'Satya Nadella', 
    'Sundar Pichai', 'Tim Cozinheiro', 'Jeff Besos', 'Jack Ma', 'Lisa Su', 'Jensen Huang',
    'Gabe Newell', 'Hideo Kojima', 'Shigeru Miyamoto', 'Esther Hadassah'
  ];

  const companyNames = [
    'Pera Inc', 'Microhard', 'Somy', 'Nintendon\'t', 'Ubisoft', 'Eletronic Arts', 'Rockstar Games',
    'Cyberdyne', 'Umbrella Corp', 'Stark Industries', 'Wayne Enterprises', 'Globex', 'Aperture Science',
    'Black Mesa', 'Initech', 'Hooli', 'Pied Piper'
  ];

  const randomizeLocation = () => {
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    const randomState = randomCountry.states[Math.floor(Math.random() * randomCountry.states.length)];
    const randomCity = randomState.cities[Math.floor(Math.random() * randomState.cities.length)];
    
    setCountry(randomCountry.name);
    setStateName(randomState.name);
    setCity(randomCity);
  };

  const randomizeCEO = () => {
    setCeoName(ceoNames[Math.floor(Math.random() * ceoNames.length)]);
  };

  const randomizeCompany = () => {
    setCompanyName(companyNames[Math.floor(Math.random() * companyNames.length)]);
  };

  const [money, setMoney] = useState(500000);
  const [fans, setFans] = useState(0);
  const [history, setHistory] = useState<Game[]>([]);
  const [awardsWon, setAwardsWon] = useState<{name: string, description: string, date: Date}[]>([]);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null);
  const [promptModal, setPromptModal] = useState<{isOpen: boolean, title: string, message: string, options?: string[], onConfirm: (value: string) => void, onCancel: () => void}>({isOpen: false, title: '', message: '', onConfirm: () => {}, onCancel: () => {}});
  const [activeTab, setActiveTab] = useState<Tab>('studio');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Infra & Market
  const [officeLevel, setOfficeLevel] = useState(1);
  const [stores, setStores] = useState<{name: string, level: number}[]>([]);
  const [researchLabs, setResearchLabs] = useState(0);
  const [factories, setFactories] = useState(0);
  const [hasStreaming, setHasStreaming] = useState(false);
  const [subscribers, setSubscribers] = useState(0);
  const [servers, setServers] = useState(0);
  const [researchPoints, setResearchPoints] = useState(0);
  const [techLevel, setTechLevel] = useState(1);
  const [upgrades, setUpgrades] = useState<{id: string, name: string, cost: number, level: number, maxLevel: number, description: string}[]>(DEFAULT_UPGRADES);
  const [loans, setLoans] = useState<{amount: number, remaining: number}[]>([]);
  const [bankOwned, setBankOwned] = useState(false);
  const [stocks, setStocks] = useState<{id: number, name: string, price: number, owned: number}[]>([
    { id: 1, name: 'Pera Inc', price: 150, owned: 0 },
    { id: 2, name: 'Microhard', price: 200, owned: 0 },
    { id: 3, name: 'Somy', price: 120, owned: 0 },
  ]);
  const [socialAccounts, setSocialAccounts] = useState<{platform: string, followers: number}[]>([]);
  const [commentators, setCommentators] = useState(0);
  const [socialComments, setSocialComments] = useState<{id: number, author: string, content: string, platform: string, date: Date, sentiment: 'positive' | 'negative' | 'neutral', isHired?: boolean}[]>([]);
  const [companies, setCompanies] = useState<{id: number, name: string, type: string, value: number, income: number}[]>([]);
  const [playerMarketShare, setPlayerMarketShare] = useState(0.1);
  const [rivals, setRivals] = useState<Rival[]>([
    { id: 1, name: 'Microhard', marketShare: 35.0, fans: 5000000 },
    { id: 2, name: 'Pear', marketShare: 25.0, fans: 4000000 },
    { id: 3, name: 'Nintedo', marketShare: 20.0, fans: 8000000 },
    { id: 4, name: 'Pony', marketShare: 19.9, fans: 3000000 },
  ]);
  const [gameDate, setGameDate] = useState(new Date(2024, 0, 1));
  const [isPaused, setIsPaused] = useState(false);

  // New Features
  const [hardware, setHardware] = useState<{id: string, name: string, type: string, unitsSold: number}[]>([]);
  const [hiredVips, setHiredVips] = useState<{id: string, name: string, role: string, salary: number, boost: number}[]>([]);
  const [hypeMultiplier, setHypeMultiplier] = useState(1.0);
  const [lastConventionDate, setLastConventionDate] = useState<number | null>(null);
  const [productFeatures, setProductFeatures] = useState<string[]>([]);

  // Equipe (Staff)
  const [staff, setStaff] = useState({ devs: 1, designers: 1, testers: 0, researchers: 0 });

  // Modals
  const [isProductSelectOpen, setIsProductSelectOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isBandSetupOpen, setIsBandSetupOpen] = useState(false);
  const [selectedBandId, setSelectedBandId] = useState<number | null>(null);
  const [newBandName, setNewBandName] = useState('');
  const [newBandGenre, setNewBandGenre] = useState('Rock');
  const [newBandMembers, setNewBandMembers] = useState(1);

  const [isDevOpen, setIsDevOpen] = useState(false);
  const [isDeveloping, setIsDeveloping] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isEventOpen, setIsEventOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<{name: string, description: string, reward: number, fans: number} | null>(null);
  const [currentTrend, setCurrentTrend] = useState<{type: 'genre' | 'theme', name: string, multiplier: number} | null>(null);

  // Setup State
  const [gameName, setGameName] = useState('');
  const [productType, setProductType] = useState('Jogo');
  const [genre, setGenre] = useState('Ação');
  const [theme, setTheme] = useState('Contemporâneo');
  const [visualStyle, setVisualStyle] = useState('3D Realista');
  const [platform, setPlatform] = useState('Computador');
  const [targetAudience, setTargetAudience] = useState('Geral');
  const [marketingCampaigns, setMarketingCampaigns] = useState<string[]>(['boca_a_boca']);
  const [selectedTvNetworks, setSelectedTvNetworks] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['na']);
  const [playerCompany, setPlayerCompany] = useState({ isPublic: false, sharePrice: 10, sharesSold: 0 });
  const [secondPlatform, setSecondPlatform] = useState('Nenhuma');
  const [gameSize, setGameSize] = useState('Indie');
  const [focusEngine, setFocusEngine] = useState(50);
  const [focusGameplay, setFocusGameplay] = useState(50);
  const [focusStory, setFocusStory] = useState(50);
  const [focusGraphics, setFocusGraphics] = useState(50);
  const [focusAudio, setFocusAudio] = useState(50);
  const [focusPolishing, setFocusPolishing] = useState(50);
  const [iconStyle, setIconStyle] = useState('Minimalista');
  const [monetization, setMonetization] = useState('Pago');
  const [rating, setRating] = useState('Livre');
  const [albumTracks, setAlbumTracks] = useState(10);
  const [hasMusicVideos, setHasMusicVideos] = useState(false);

  // Dev State
  const [progress, setProgress] = useState(0);
  const [devDesign, setDevDesign] = useState(0);
  const [devTech, setDevTech] = useState(0);
  const [devBugs, setDevBugs] = useState(0);

  // Review State
  const [lastGame, setLastGame] = useState<Game | null>(null);

  // Save / Load System
  const stateRef = useRef({
    gameState, gameMode, startYear, creationStep, playerStats, perks, ceoName, companyName, companyFocus, logoColor, country, stateName, city, bands,
    money, fans, history, awardsWon, officeLevel, stores, researchLabs, factories, hasStreaming, subscribers, servers, researchPoints, techLevel, upgrades,
    loans, bankOwned, stocks, socialAccounts, companies, gameDate: gameDate.getTime(), staff,
    hardware, hiredVips, hypeMultiplier, lastConventionDate
  });

  useEffect(() => {
    stateRef.current = {
      gameState, gameMode, startYear, creationStep, playerStats, perks, ceoName, companyName, companyFocus, logoColor, country, stateName, city, bands,
      money, fans, history, awardsWon, officeLevel, stores, researchLabs, factories, hasStreaming, subscribers, servers, researchPoints, techLevel, upgrades,
      loans, bankOwned, stocks, socialAccounts, companies, gameDate: gameDate.getTime(), staff,
      hardware, hiredVips, hypeMultiplier, lastConventionDate
    };
  }, [gameState, gameMode, startYear, creationStep, playerStats, perks, ceoName, companyName, companyFocus, logoColor, country, stateName, city, bands,
      money, fans, history, awardsWon, officeLevel, stores, researchLabs, factories, hasStreaming, subscribers, servers, researchPoints, techLevel, upgrades,
      loans, bankOwned, stocks, socialAccounts, companies, gameDate, staff, hardware, hiredVips, hypeMultiplier, lastConventionDate]);

  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (stateRef.current.gameState === 'playing') {
        localStorage.setItem('tycoon_save', JSON.stringify(stateRef.current));
      }
    }, 5000);
    return () => clearInterval(saveInterval);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('tycoon_save');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setGameState(parsed.gameState);
        setGameMode(parsed.gameMode);
        setStartYear(parsed.startYear);
        setCreationStep(parsed.creationStep);
        setPlayerStats(parsed.playerStats);
        setPerks(parsed.perks);
        setCeoName(parsed.ceoName);
        setCompanyName(parsed.companyName);
        if (parsed.companyFocus) setCompanyFocus(parsed.companyFocus);
        if (parsed.logoColor) setLogoColor(parsed.logoColor);
        setCountry(parsed.country);
        setStateName(parsed.stateName);
        setCity(parsed.city);
        if (parsed.bands) setBands(parsed.bands);
        setMoney(parsed.money);
        setFans(parsed.fans);
        setHistory(parsed.history);
        setAwardsWon(parsed.awardsWon);
        setOfficeLevel(parsed.officeLevel);
        setStores(parsed.stores);
        setResearchLabs(parsed.researchLabs);
        setFactories(parsed.factories);
        if (parsed.hasStreaming !== undefined) setHasStreaming(parsed.hasStreaming);
        if (parsed.subscribers !== undefined) setSubscribers(parsed.subscribers);
        if (parsed.servers !== undefined) setServers(parsed.servers);
        setResearchPoints(parsed.researchPoints);
        setTechLevel(parsed.techLevel);
        setUpgrades(parsed.upgrades);
        setLoans(parsed.loans);
        setBankOwned(parsed.bankOwned);
        setStocks(parsed.stocks);
        setSocialAccounts(parsed.socialAccounts);
        setCompanies(parsed.companies);
        setGameDate(new Date(parsed.gameDate));
        setStaff(parsed.staff);
        if (parsed.hardware) setHardware(parsed.hardware);
        if (parsed.hiredVips) setHiredVips(parsed.hiredVips);
        if (parsed.hypeMultiplier !== undefined) setHypeMultiplier(parsed.hypeMultiplier);
        if (parsed.lastConventionDate !== undefined) setLastConventionDate(parsed.lastConventionDate);
      } catch (e) {
        console.error("Failed to load save", e);
      }
    }
  }, []);

  // Development Loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isDeveloping && progress < 100) {
      timer = setInterval(() => {
        setProgress(p => {
          // Velocidade baseada no tamanho total da equipe e tamanho do jogo
          let sizeMultiplier = gameSize === 'AAA' ? 0.2 : gameSize === 'Médio' ? 0.5 : 1;
          
          if (productType === 'Álbum Musical') {
            sizeMultiplier = sizeMultiplier * (10 / Math.max(1, albumTracks));
            if (hasMusicVideos) {
              sizeMultiplier *= 0.6; // 40% slower if making music videos
            }
          }
          
          const speedBoost = (1 + (staff.devs + staff.designers + staff.testers) * 0.1) * sizeMultiplier;
          const next = p + (1.0 * speedBoost);
          return next > 100 ? 100 : next;
        });

        // Geração de pontos baseada na equipe
        if (Math.random() > 0.2) {
          const dChance = ((focusGameplay + focusStory + focusGraphics) / 300);
          const tChance = ((focusEngine + focusGameplay + focusAudio) / 300);
          
          // Testers reduzem a chance de bugs, Polishing também
          const bugChance = 0.3 * Math.max(0.05, (1 - staff.testers * 0.15)) * (1 - (focusPolishing / 200));

          if (Math.random() < dChance) {
            setDevDesign(d => d + Math.floor(Math.random() * 3 * staff.designers) + 1 + Math.floor(playerStats.design / 2) + Math.floor(techLevel / 2));
          }
          if (Math.random() < tChance) {
            setDevTech(t => t + Math.floor(Math.random() * 3 * staff.devs) + 1 + Math.floor(playerStats.tech / 2) + Math.floor(techLevel / 2));
          }
          if (Math.random() < bugChance) {
            setDevBugs(b => b + Math.floor(Math.random() * 2) + 1);
          }
        }
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isDeveloping, progress, focusEngine, focusGameplay, focusStory, focusGraphics, focusAudio, focusPolishing, staff, gameSize, playerStats, techLevel]);

  // Monthly Income (Bank & Stores & Companies) & Social Media Growth & Loans & Stocks & News
  useEffect(() => {
    const timer = setInterval(() => {
      if (isPaused) return;
      
      let monthlyIncome = 0;
      let monthlyExpense = 0;
      
      // Bank Income
      if (bankOwned) {
        monthlyIncome += 50000; // Rendimento base do banco
      }

      // Stores Income
      stores.forEach(store => {
        monthlyIncome += store.level * 10000;
      });

      // Companies Income
      companies.forEach(company => {
        monthlyIncome += company.income;
      });

      // VIP Salaries
      hiredVips.forEach(vip => {
        monthlyExpense += vip.salary;
      });

      // Hardware Sales & Income
      setHardware(prevHardware => {
        let hwIncome = 0;
        const updated = prevHardware.map(hw => {
          const sales = Math.floor(Math.random() * 50000) + 10000;
          const profitPerUnit = hw.type === 'Console' ? 50 : 150;
          hwIncome += sales * profitPerUnit;
          return { ...hw, unitsSold: hw.unitsSold + sales };
        });
        if (hwIncome > 0) {
          setMoney(m => m + hwIncome);
        }
        return updated;
      });

      // eSports Income
      const esportsGames = history.filter(g => g.hasEsports);
      if (esportsGames.length > 0) {
        const esportsIncome = esportsGames.length * 250000; // $250k per active league
        monthlyIncome += esportsIncome;
        setFans(f => f + (esportsGames.length * 5000)); // Passive fans from eSports
      }

      // Hype Decay
      setHypeMultiplier(prev => {
        if (prev > 1.0) {
          return Math.max(1.0, prev - 0.05); // Decays 0.05 per month
        }
        return prev;
      });

      // Loans Payment (5% of remaining per month)
      setLoans(currentLoans => {
        const newLoans = currentLoans.map(loan => {
          const payment = Math.ceil(loan.remaining * 0.05);
          monthlyExpense += payment;
          return { ...loan, remaining: Math.max(0, loan.remaining - payment) };
        }).filter(loan => loan.remaining > 0);
        return newLoans;
      });

      // Stocks Fluctuation
      setStocks(currentStocks => currentStocks.map(stock => {
        const fluctuation = 1 + (Math.random() * 0.2 - 0.1); // -10% to +10%
        return { ...stock, price: Math.max(10, Math.floor(stock.price * fluctuation)) };
      }));

      // Market Trends (10% chance to change every month)
      if (Math.random() < 0.1) {
        const isGenreTrend = Math.random() > 0.5;
        const trendName = isGenreTrend 
          ? ['Ação', 'RPG', 'Estratégia', 'Simulação', 'Esportes', 'Comédia', 'Drama', 'Ficção Científica', 'Terror', 'Documentário', 'Pop', 'Rock', 'Hip Hop', 'Eletrônica', 'Clássica'][Math.floor(Math.random() * 15)]
          : ['Fantasia', 'Sci-Fi', 'Contemporâneo', 'Histórico', 'Cyberpunk', 'Steampunk', 'Pós-Apocalíptico', 'Super-Heróis', 'Mistério', 'Romance'][Math.floor(Math.random() * 10)];
        
        setCurrentTrend({
          type: isGenreTrend ? 'genre' : 'theme',
          name: trendName,
          multiplier: 1.2 + (Math.random() * 0.3) // 1.2x to 1.5x sales multiplier
        });
      }

      // Player Stock Fluctuation
      setPlayerCompany(prev => {
        if (!prev.isPublic) return prev;
        const performance = (monthlyIncome - monthlyExpense) > 0 ? 1.05 : 0.95;
        const fluctuation = performance + (Math.random() * 0.1 - 0.05);
        return { ...prev, sharePrice: Math.max(1, Math.floor(prev.sharePrice * fluctuation)) };
      });

      // Subscriptions / SaaS
      setHistory(prevHistory => {
        let subIncome = 0;
        let subExpense = 0;
        const updatedHistory = prevHistory.map(game => {
          if (game.isSubscription && game.isActive && game.activeSubscribers) {
            // Churn 2% to 10%
            const churnRate = 0.02 + (Math.random() * 0.08);
            const newSubscribers = Math.floor(game.activeSubscribers * (1 - churnRate));
            
            subIncome += newSubscribers * (game.monthlyFee || 0);
            subExpense += newSubscribers * (game.maintenanceCost || 0);

            return { ...game, activeSubscribers: newSubscribers };
          }
          return game;
        });
        
        if (subIncome > 0 || subExpense > 0) {
          setMoney(m => m + subIncome - subExpense);
        }
        return updatedHistory;
      });

      if (monthlyIncome > 0 || monthlyExpense > 0) {
        setMoney(m => m + monthlyIncome - monthlyExpense);
      }

      // Social Media Growth
      if (socialAccounts.length > 0) {
        setSocialAccounts(accounts => accounts.map(account => {
          const growth = Math.floor(Math.random() * 50) + 10 + (commentators * 5); // Comentaristas ajudam no crescimento
          return { ...account, followers: account.followers + growth };
        }));
        
        // Adiciona fãs globais baseados no crescimento das redes sociais
        const totalGrowth = socialAccounts.length * (Math.floor(Math.random() * 20) + 5 + commentators);
        setFans(f => f + totalGrowth);

        // Gera comentários (20% de chance por mês se tiver redes sociais)
        if (Math.random() < 0.2 + (commentators * 0.05)) {
          const randomAccount = socialAccounts[Math.floor(Math.random() * socialAccounts.length)];
          const latestProduct = history.length > 0 ? history[0].name : undefined;
          
          const year = gameDate.getFullYear();
          const authors = ['João Silva', 'Maria Oliveira', 'Pedro Santos', 'Ana Costa', 'Lucas Pereira', 'Juliana Lima', 'Marcos Rocha', 'Fernanda Souza', 'Rafael Alves', 'Camila Martins'];
          let positiveComments = [
            'Incrível! Mal posso esperar para ver mais.',
            'Melhor coisa que vi hoje!',
            'Isso é exatamente o que eu precisava.',
            'Parabéns pelo trabalho, está fantástico!',
            'Sensacional! Já sou fã.',
            'Muito bom, continuem assim!',
            'Qualidade impecável.',
            'Isso vai mudar o mercado!',
            'Simplesmente perfeito.',
            'Estou amando acompanhar isso.'
          ];
          let negativeComments = [
            'Poderia ser melhor...',
            'Não gostei muito da direção que isso está tomando.',
            'Esperava mais, sinceramente.',
            'Achei meio sem graça.',
            'Tem muito o que melhorar ainda.',
            'Não faz meu estilo.',
            'Achei o preço meio alto para o que oferece.',
            'O anterior era melhor.',
            'Muitos bugs/problemas técnicos.',
            'Não recomendo.'
          ];
          let neutralComments = [
            'Interessante, vamos ver no que dá.',
            'Alguém sabe quando lança o próximo?',
            'Legal.',
            'Ok, mas nada de especial.',
            'Vou esperar as reviews antes de decidir.',
            'O que vocês acharam?',
            'Diferente do que eu imaginava.',
            'Bom, mas tem pontos a melhorar.',
            'Vou dar uma chance.',
            'Parece promissor.'
          ];

          if (year >= 1950 && year < 1970) {
            positiveComments.push(
              'Isso é o futuro!',
              'Minha família toda adorou esse Mainframe!',
              'A calculadora eletrônica é mágica!',
              'O amanhã chegou hoje!',
              'Que maravilha da ciência moderna!',
              'Isso é tecnologia de ponta!',
              'Fiquei impressionado com a precisão!',
              'O rádio nunca mais será o mesmo!'
            );
            negativeComments.push(
              'Isso é coisa de ficção científica, não vai dar certo.',
              'Muito caro para um cidadão comum.',
              'Achei muito complicado de operar.',
              'Prefiro os métodos tradicionais.',
              'Isso ocupa muito espaço na sala.',
              'Não vejo utilidade prática nisso ainda.'
            );
            neutralComments.push(
              'Será que isso vai substituir o rádio?',
              'Interessante, mas parece muito caro.',
              'Ouvi dizer que os transistores são o futuro.',
              'O que os cientistas vão inventar agora?',
              'Parece promissor, mas ainda prefiro o jornal.'
            );
          }

          const sentimentRoll = Math.random();
          let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
          let content = '';
          let isHired = false;

          // Hired commentators boost positive sentiment
          const positiveChance = 0.3 + (commentators * 0.1);
          
          if (sentimentRoll < positiveChance) {
            sentiment = 'positive';
            content = positiveComments[Math.floor(Math.random() * positiveComments.length)];
            // If it was a "boosted" chance, mark as hired
            if (sentimentRoll >= 0.3 && sentimentRoll < positiveChance) {
              isHired = true;
            }
          } else if (sentimentRoll < 0.7) {
            sentiment = 'neutral';
            content = neutralComments[Math.floor(Math.random() * neutralComments.length)];
          } else {
            sentiment = 'negative';
            content = negativeComments[Math.floor(Math.random() * negativeComments.length)];
          }

          if (latestProduct && Math.random() < 0.5) {
            content = `[${latestProduct}] ${content}`;
          }

          const newComment = {
            id: Date.now() + Math.random(),
            author: authors[Math.floor(Math.random() * authors.length)],
            content,
            platform: randomAccount.platform,
            date: new Date(gameDate),
            sentiment,
            isHired
          };

          setSocialComments(prev => [newComment, ...prev].slice(0, 50));
        }
      }

      // Custo dos comentaristas contratados ($2000 por mês cada)
      if (commentators > 0) {
        monthlyExpense += commentators * 2000;
      }

      // Research Generation
      if (staff.researchers > 0) {
        const generatedPoints = staff.researchers * (1 + researchLabs * 0.5) * 10;
        setResearchPoints(p => p + generatedPoints);
      }

      // Advance Date and Generate News
      setGameDate(prev => {
        const next = new Date(prev);
        next.setMonth(next.getMonth() + 1);
        
        // Merch Income
        const merchProducts = history.filter(g => g.hasMerch);
        if (merchProducts.length > 0 && factories > 0) {
          const mIncome = merchProducts.length * factories * 15000;
          setMoney(m => m + mIncome);
        }

        // Streaming Platform
        if (hasStreaming) {
          const maxCapacity = servers * 500000;
          const catalogValue = history.reduce((acc, g) => acc + g.score, 0);
          const growth = Math.floor(catalogValue * 500 + (fans * 0.01));
          
          setSubscribers(s => {
            const newSubs = Math.min(maxCapacity, s + growth);
            setMoney(m => m + (newSubs * 15)); // $15 por assinante
            return newSubs;
          });
        }
        
        // Generate News (10% chance per month)
        // Rival Actions
        if (Math.random() < 0.15) {
          const score = (Math.random() * 5) + 5;
          const isHit = score > 8.5;
          const releaseNames = ['Sistema X', 'Console Z', 'App Max', 'Ultra Phone', 'Game Y', 'TechBook', 'CloudNet', 'SmartOS'];
          const releaseName = releaseNames[Math.floor(Math.random() * releaseNames.length)];
          const marketShareGain = (score * 0.05);

          setPlayerMarketShare(prevPlayerShare => {
            const newPlayerShare = Math.max(0.1, prevPlayerShare - (marketShareGain * (prevPlayerShare / 100)));
            const targetRivalShare = 100 - newPlayerShare;

            setRivals(currentRivals => {
              const randomRivalIndex = Math.floor(Math.random() * currentRivals.length);
              const rival = currentRivals[randomRivalIndex];
              
              const newRivals = [...currentRivals];
              newRivals[randomRivalIndex] = {
                ...rival,
                lastRelease: { name: releaseName, score, date: next },
                marketShare: rival.marketShare + marketShareGain,
                fans: rival.fans + Math.floor(score * 10000)
              };

              const totalRivalShare = newRivals.reduce((acc, r) => acc + r.marketShare, 0);
              
              const normalizedRivals = newRivals.map(r => ({
                ...r,
                marketShare: (r.marketShare / totalRivalShare) * targetRivalShare
              }));

              return normalizedRivals;
            });

            return newPlayerShare;
          });
        }

        // Random Events Trigger
        if (Math.random() < 0.05 && !isEventOpen && !isDeveloping && !isSetupOpen && !isProductSelectOpen && history.length > 0) {
          
          // Easter Egg: Processo da Nintendo
          if (companyName.toLowerCase() === 'nintendo' && Math.random() < 0.2) {
            setCurrentEvent({
              name: 'Processo de Direitos Autorais!',
              description: 'Os advogados da verdadeira Nintendo bateram na sua porta por causa do nome da sua empresa. Você teve que pagar um acordo milionário!',
              reward: -1000000,
              fans: -50000
            });
            setIsEventOpen(true);
            return next;
          }

          const events = [
            { name: 'Oscar', description: 'Seu último filme foi indicado ao Oscar!', reward: 500000, fans: 50000 },
            { name: 'Globo de Ouro', description: 'Sua série ganhou o Globo de Ouro!', reward: 250000, fans: 30000 },
            { name: 'Game Awards', description: 'Seu jogo ganhou Jogo do Ano!', reward: 1000000, fans: 100000 },
            { name: 'Festival de Cannes', description: 'Seu filme foi aclamado em Cannes!', reward: 300000, fans: 40000 },
            { name: 'E3 / Summer Game Fest', description: 'Sua apresentação foi um sucesso!', reward: 100000, fans: 80000 },
            { name: 'Emmy Awards', description: 'Sua série dominou o Emmy!', reward: 400000, fans: 60000 }
          ];
          const randomEvent = events[Math.floor(Math.random() * events.length)];
          
          // Only trigger if we have a matching product type in history
          const hasMovie = history.some(g => g.type === 'Filme');
          const hasSeries = history.some(g => g.type === 'Série' || g.type === 'Programa de TV');
          const hasGame = history.some(g => g.type === 'Jogo');
          
          let canTrigger = false;
          if (randomEvent.name === 'Oscar' || randomEvent.name === 'Festival de Cannes') canTrigger = hasMovie;
          else if (randomEvent.name === 'Globo de Ouro' || randomEvent.name === 'Emmy Awards') canTrigger = hasSeries;
          else if (randomEvent.name === 'Game Awards' || randomEvent.name === 'E3 / Summer Game Fest') canTrigger = hasGame;
          
          if (canTrigger) {
            setCurrentEvent(randomEvent);
            setIsEventOpen(true);
          }
        }
        
        return next;
      });

    }, 10000); // A cada 10 segundos (simulando um mês)

    return () => clearInterval(timer);
  }, [isPaused, bankOwned, stores, companies, socialAccounts.length, staff.researchers, researchLabs, history, factories, hasStreaming, servers, fans, hiredVips, hardware]);

  const generateRandomName = (type: string) => {
    const prefixes = ['Super', 'Mega', 'Ultra', 'Cyber', 'Neo', 'Quantum', 'Aero', 'Chrono', 'Star', 'Space', 'Dark', 'Light', 'Magic', 'Mystic', 'Epic', 'Legendary', 'Infinite', 'Virtual', 'Real', 'Pro', 'Max', 'Elite', 'Prime', 'Alpha', 'Omega'];
    const suffixes = ['Quest', 'Adventure', 'Wars', 'Strike', 'Force', 'City', 'World', 'Universe', 'Galaxy', 'Empire', 'Kingdom', 'Legends', 'Heroes', 'Champions', 'Fighters', 'Racers', 'Sim', 'Tycoon', 'Manager', 'Builder', 'Creator', 'Maker', 'Studio', 'Lab', 'Station'];
    
    let name = '';
    
    if (['Jogo', 'Jogo Online', 'Arcade', 'Jogo de Tabuleiro'].includes(type)) {
      name = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
    } else if (['Console', 'Console Portátil', 'Computador', 'Celular', 'Tablet', 'Smartwatch', 'Óculos VR'].includes(type)) {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
      const randomNumber = Math.floor(Math.random() * 1000);
      name = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${randomLetter}-${randomNumber}`;
    } else if (['Filme', 'Série', 'Programa de TV', 'Emissora de TV', 'Livro', 'Revista', 'Jornal'].includes(type)) {
      const themes = ['Amor', 'Vingança', 'Mistério', 'Segredo', 'Destino', 'Jornada', 'Batalha', 'Guerra', 'Paz', 'Esperança', 'Sombras', 'Luz', 'Tempo', 'Espaço', 'Mente', 'Coração', 'Alma', 'Sangue', 'Fogo', 'Gelo'];
      const articles = ['O', 'A', 'Os', 'As', 'Um', 'Uma'];
      name = `${articles[Math.floor(Math.random() * articles.length)]} ${themes[Math.floor(Math.random() * themes.length)]} de ${prefixes[Math.floor(Math.random() * prefixes.length)]}`;
    } else if (['Álbum Musical', 'Podcast', 'Programa de Rádio', 'Emissora de Rádio'].includes(type)) {
      const vibes = ['Vibes', 'Sons', 'Batidas', 'Ritmos', 'Melodias', 'Harmonias', 'Vozes', 'Ecos', 'Sussurros', 'Gritos', 'Silêncio', 'Ruído', 'Frequência', 'Onda', 'Pulso'];
      name = `${vibes[Math.floor(Math.random() * vibes.length)]} ${prefixes[Math.floor(Math.random() * prefixes.length)]}`;
    } else if (['Casa', 'Prédio Residencial', 'Prédio Comercial', 'Shopping Center', 'Fábrica', 'Estádio'].includes(type)) {
      const locations = ['Park', 'Plaza', 'Tower', 'Center', 'Square', 'Avenue', 'Boulevard', 'Heights', 'View', 'Valley', 'Hill', 'Ridge', 'Point', 'Bay', 'Cove', 'Harbor', 'Port', 'Isle', 'Island', 'Beach', 'Coast', 'Shore', 'Bank', 'River', 'Lake'];
      name = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${locations[Math.floor(Math.random() * locations.length)]}`;
    } else {
      name = `Projeto ${prefixes[Math.floor(Math.random() * prefixes.length)]}`;
    }
    
    setGameName(name);
  };

  const openSetup = (type: string) => {
    setGameName('');
    setProductType(type);
    
    if (type === 'Álbum Musical') {
      setGenre('Pop');
      setAlbumTracks(10);
      setHasMusicVideos(false);
    } else if (type === 'Podcast' || type === 'Programa de Rádio' || type === 'Emissora de Rádio') {
      setGenre('Entrevistas');
    } else if (type === 'Livro' || type === 'Revista' || type === 'Jornal') {
      setGenre('Ficção');
    } else if (type === 'Emissora de TV') {
      setGenre('Notícias');
    } else {
      setGenre('Ação');
    }
    
    if (['Emissora de Rádio', 'Podcast', 'Programa de Rádio'].includes(type)) {
      setTheme('Geral / Variedades');
    } else if (type === 'Álbum Musical') {
      setTheme('Festa / Balada');
    } else if (type === 'Emissora de TV') {
      setTheme('Entretenimento Geral');
    } else {
      setTheme('Contemporâneo');
    }

    if (['Emissora de Rádio', 'Podcast', 'Programa de Rádio', 'Álbum Musical'].includes(type)) {
      setVisualStyle('Estéreo (Padrão)');
    } else if (type === 'Emissora de TV') {
      setVisualStyle('Padrão (SD)');
    } else {
      setVisualStyle('3D Realista');
    }
    setFocusEngine(50);
    setFocusGameplay(50);
    setFocusStory(50);
    setFocusGraphics(50);
    setFocusAudio(50);
    setFocusPolishing(50);
    setProductFeatures([]);
    setSelectedTvNetworks([]);
    setIsProductSelectOpen(false);
    
    if (type === 'Álbum Musical') {
      setIsBandSetupOpen(true);
    } else {
      setIsSetupOpen(true);
    }
  };

  const getAvailableProductTypes = (year: number) => {
    const types = [];
    
    // Software (Default)
    if (year >= 1970) types.push('Jogo', 'Sistema Operacional', 'Software de Edição');
    if (year >= 1990) types.push('Site', 'Motor Gráfico', 'Navegador Web');
    if (year >= 2000) types.push('Rede Social', 'Jogo Online');
    if (year >= 2005) types.push('Plataforma Digital');
    if (year >= 2008) types.push('Aplicativo', 'Aplicativo de Relacionamento');
    if (year >= 2009) types.push('Criptomoeda');
    if (year >= 2010) types.push('Serviço de Streaming', 'Plataforma de Streaming', 'Assistente Virtual');
    if (year >= 2015) types.push('Realidade Virtual', 'Carro Autônomo (Software)');
    if (year >= 2020) types.push('Inteligência Artificial');
    if (year >= 2021) types.push('Metaverso');

    const hasEditora = upgrades.find(u => u.id === 'div_editora')?.level ? upgrades.find(u => u.id === 'div_editora')!.level > 0 : false;
    if (hasEditora) {
      types.push('Livro', 'Jornal', 'Revista', 'Jogo de Tabuleiro', 'História em Quadrinhos', 'Mangá', 'Livro Didático');
    }

    const hasGravadora = upgrades.find(u => u.id === 'div_gravadora')?.level ? upgrades.find(u => u.id === 'div_gravadora')!.level > 0 : false;
    if (hasGravadora) {
      types.push('Álbum Musical', 'Programa de Rádio', 'Emissora de Rádio', 'Trilha Sonora', 'Efeitos Sonoros');
      if (year >= 1990) types.push('Dublagem/Audiobook');
      if (year >= 2005) types.push('Podcast');
    }

    const hasCinema = upgrades.find(u => u.id === 'div_cinema')?.level ? upgrades.find(u => u.id === 'div_cinema')!.level > 0 : false;
    if (hasCinema) {
      types.push('Filme', 'Programa de TV', 'Emissora de TV', 'Documentário', 'Curta-metragem');
      if (year >= 1960) types.push('Série', 'Animação');
    }

    const hasHardware = upgrades.find(u => u.id === 'div_hardware')?.level ? upgrades.find(u => u.id === 'div_hardware')!.level > 0 : false;
    if (hasHardware) {
      types.push('Brinquedo', 'Televisão', 'Microfone', 'Fone de Ouvido');
      if (year >= 1950) types.push('Mainframe');
      if (year >= 1960) types.push('Calculadora Eletrônica');
      if (year >= 1970) types.push('Arcade', 'Console', 'Computador', 'Processador', 'Monitor');
      if (year >= 1980) types.push('Console Portátil', 'Placa de Vídeo');
      if (year >= 1990) types.push('Celular', 'Câmera Digital');
      if (year >= 2010) types.push('Tablet', 'Carro Elétrico', 'Drone');
      if (year >= 2012) types.push('Impressora 3D');
      if (year >= 2015) types.push('Smartwatch', 'Óculos VR', 'Foguete Espacial');
      if (year >= 2025) types.push('Robô Doméstico');
      if (year >= 2030) types.push('Chip Neural');
    }

    // Construções
    if (year >= 1970) types.push('Casa', 'Prédio Residencial', 'Prédio Comercial', 'Fábrica', 'Escola', 'Hospital');
    if (year >= 1980) types.push('Shopping Center', 'Estádio', 'Parque de Diversões', 'Aeroporto', 'Universidade');

    return types;
  };

  const getProjectCost = () => {
    let typeCostMultiplier = 1;
    if (productType === 'Console') typeCostMultiplier = 20;
    else if (productType === 'Mainframe') typeCostMultiplier = 40;
    else if (productType === 'Calculadora Eletrônica') typeCostMultiplier = 5;
    else if (productType === 'Motor Gráfico') typeCostMultiplier = 5;
    else if (productType === 'Computador') typeCostMultiplier = 15;
    else if (productType === 'Celular') typeCostMultiplier = 10;
    else if (productType === 'Plataforma Digital') typeCostMultiplier = 8;
    else if (productType === 'Rede Social') typeCostMultiplier = 6;
    else if (productType === 'Filme') typeCostMultiplier = 12;
    else if (productType === 'Série') typeCostMultiplier = 18;
    else if (productType === 'Programa de TV') typeCostMultiplier = 7;
    else if (productType === 'Emissora de TV') typeCostMultiplier = 50;
    else if (productType === 'Sistema Operacional') typeCostMultiplier = 25;
    else if (productType === 'Aplicativo') typeCostMultiplier = 3;
    else if (productType === 'Tablet') typeCostMultiplier = 8;
    else if (productType === 'Smartwatch') typeCostMultiplier = 5;
    else if (productType === 'Processador') typeCostMultiplier = 30;
    else if (productType === 'Placa de Vídeo') typeCostMultiplier = 28;
    else if (productType === 'Álbum Musical') typeCostMultiplier = 4;
    else if (productType === 'Dublagem/Audiobook') typeCostMultiplier = 2;
    else if (productType === 'Podcast') typeCostMultiplier = 1;
    else if (productType === 'Programa de Rádio') typeCostMultiplier = 2;
    else if (productType === 'Emissora de Rádio') typeCostMultiplier = 20;
    else if (productType === 'Livro') typeCostMultiplier = 1;
    else if (productType === 'Jornal') typeCostMultiplier = 2;
    else if (productType === 'Revista') typeCostMultiplier = 1.5;
    else if (productType === 'Jogo de Tabuleiro') typeCostMultiplier = 2;
    else if (productType === 'Brinquedo') typeCostMultiplier = 3;
    else if (productType === 'Arcade') typeCostMultiplier = 8;
    else if (productType === 'Casa') typeCostMultiplier = 15;
    else if (productType === 'Prédio Residencial') typeCostMultiplier = 50;
    else if (productType === 'Prédio Comercial') typeCostMultiplier = 60;
    else if (productType === 'Fábrica') typeCostMultiplier = 80;
    else if (productType === 'Shopping Center') typeCostMultiplier = 150;
    else if (productType === 'Estádio') typeCostMultiplier = 200;
    else if (productType === 'Carro Elétrico') typeCostMultiplier = 100;
    else if (productType === 'Robô Doméstico') typeCostMultiplier = 40;
    else if (productType === 'Chip Neural') typeCostMultiplier = 80;
    else if (productType === 'Foguete Espacial') typeCostMultiplier = 300;
    else if (productType === 'Drone') typeCostMultiplier = 12;
    else if (productType === 'Impressora 3D') typeCostMultiplier = 15;
    else if (productType === 'Realidade Virtual') typeCostMultiplier = 20;
    else if (productType === 'Criptomoeda') typeCostMultiplier = 5;
    else if (productType === 'Metaverso') typeCostMultiplier = 35;
    else if (productType === 'Carro Autônomo (Software)') typeCostMultiplier = 50;
    else if (productType === 'Inteligência Artificial') typeCostMultiplier = 40;
    else if (productType === 'Plataforma de Streaming') typeCostMultiplier = 15;
    else if (productType === 'Navegador Web') typeCostMultiplier = 8;
    else if (productType === 'Aplicativo de Relacionamento') typeCostMultiplier = 4;
    else if (productType === 'Assistente Virtual') typeCostMultiplier = 25;
    else if (productType === 'Software de Edição') typeCostMultiplier = 12;
    else if (productType === 'Console Portátil') typeCostMultiplier = 12;
    else if (productType === 'Câmera Digital') typeCostMultiplier = 8;
    else if (productType === 'Fone de Ouvido') typeCostMultiplier = 3;
    else if (productType === 'Microfone') typeCostMultiplier = 2;
    else if (productType === 'Televisão') typeCostMultiplier = 15;
    else if (productType === 'Monitor') typeCostMultiplier = 10;
    else if (productType === 'Documentário') typeCostMultiplier = 5;
    else if (productType === 'Animação') typeCostMultiplier = 15;
    else if (productType === 'Curta-metragem') typeCostMultiplier = 2;
    else if (productType === 'Trilha Sonora') typeCostMultiplier = 3;
    else if (productType === 'Efeitos Sonoros') typeCostMultiplier = 1;
    else if (productType === 'História em Quadrinhos') typeCostMultiplier = 1.5;
    else if (productType === 'Mangá') typeCostMultiplier = 1.5;
    else if (productType === 'Livro Didático') typeCostMultiplier = 2;
    else if (productType === 'Parque de Diversões') typeCostMultiplier = 250;
    else if (productType === 'Aeroporto') typeCostMultiplier = 400;
    else if (productType === 'Hospital') typeCostMultiplier = 120;
    else if (productType === 'Escola') typeCostMultiplier = 30;
    else if (productType === 'Universidade') typeCostMultiplier = 80;
    
    const sizeCostMultiplier = gameSize === 'AAA' ? 10 : gameSize === 'Médio' ? 3 : 1;
    let finalCost = (10000 + (staff.devs * 2000) + (staff.designers * 2000) + (staff.testers * 1500)) * sizeCostMultiplier * typeCostMultiplier;
    
    if (productType === 'Álbum Musical') {
      finalCost += (albumTracks * 5000);
      if (hasMusicVideos) {
        finalCost += (albumTracks * 15000);
      }
    }
    
    const featuresCost = productFeatures.reduce((acc, featureId) => {
      const feature = AVAILABLE_FEATURES.find(f => f.id === featureId);
      return acc + (feature ? feature.cost : 0);
    }, 0);

    const marketingCost = marketingCampaigns.reduce((acc, campaignId) => {
      const campaign = MARKETING_OPTIONS.find(c => c.id === campaignId);
      return acc + (campaign ? campaign.cost : 0);
    }, 0);

    let tvNetworksCost = 0;
    if (productType === 'Programa de TV') {
      const availableNetworks = [
        ...DEFAULT_TV_NETWORKS,
        ...history.filter(g => g.type === 'Emissora de TV').map(n => ({
          id: `player_${n.id}`,
          name: n.name,
          cost: 0,
          hype: 1.0 + (n.score / 10)
        }))
      ];
      tvNetworksCost = selectedTvNetworks.reduce((acc, netId) => {
        const net = availableNetworks.find(n => n.id === netId);
        return acc + (net ? net.cost : 0);
      }, 0);
    }

    const baseTotalCost = finalCost + featuresCost + marketingCost + tvNetworksCost;
    
    const regionsCostMultiplier = selectedRegions.reduce((acc, regionId) => {
      const region = REGIONS.find(r => r.id === regionId);
      return acc + (region ? region.costMultiplier : 0);
    }, 0);

    return Math.floor(baseTotalCost * (1 + regionsCostMultiplier));
  };

  const getProjectRPCost = () => {
    return productFeatures.reduce((acc, featureId) => {
      const feature = AVAILABLE_FEATURES.find(f => f.id === featureId);
      return acc + (feature ? feature.rp : 0);
    }, 0);
  };

  const getSlidersForProduct = (type: string) => {
    const isHardware = ['Console', 'Computador', 'Celular', 'Tablet', 'Smartwatch', 'Processador', 'Placa de Vídeo', 'Arcade', 'Óculos VR', 'Carro Elétrico', 'Robô Doméstico', 'Chip Neural', 'Foguete Espacial', 'Drone', 'Impressora 3D', 'Console Portátil', 'Câmera Digital', 'Fone de Ouvido', 'Microfone', 'Televisão', 'Monitor'].includes(type);
    const isMedia = ['Filme', 'Série', 'Programa de TV', 'Emissora de TV', 'Documentário', 'Animação', 'Curta-metragem'].includes(type);
    const isAudio = ['Álbum Musical', 'Dublagem/Audiobook', 'Podcast', 'Programa de Rádio', 'Emissora de Rádio', 'Trilha Sonora', 'Efeitos Sonoros'].includes(type);
    const isPrint = ['Livro', 'Jornal', 'Revista', 'Jogo de Tabuleiro', 'Brinquedo', 'História em Quadrinhos', 'Mangá', 'Livro Didático'].includes(type);
    const isBuilding = ['Casa', 'Prédio Residencial', 'Prédio Comercial', 'Fábrica', 'Shopping Center', 'Estádio', 'Parque de Diversões', 'Aeroporto', 'Hospital', 'Escola', 'Universidade'].includes(type);
    
    if (isHardware) {
      return [
        { state: focusEngine, set: setFocusEngine, label: 'Arquitetura / Núcleo', icon: <Cpu className="w-4 h-4"/>, color: 'text-blue-400', accent: 'accent-blue-500' },
        { state: focusGameplay, set: setFocusGameplay, label: 'Desempenho / Velocidade', icon: <Rocket className="w-4 h-4"/>, color: 'text-purple-400', accent: 'accent-purple-500' },
        { state: focusStory, set: setFocusStory, label: 'Design / Ergonomia', icon: <Palette className="w-4 h-4"/>, color: 'text-amber-400', accent: 'accent-amber-500' },
        { state: focusGraphics, set: setFocusGraphics, label: 'Tela / Materiais', icon: <Monitor className="w-4 h-4"/>, color: 'text-emerald-400', accent: 'accent-emerald-500' },
        { state: focusAudio, set: setFocusAudio, label: 'Bateria / Energia', icon: <Cpu className="w-4 h-4"/>, color: 'text-rose-400', accent: 'accent-rose-500' },
        { state: focusPolishing, set: setFocusPolishing, label: 'Refrigeração / Durabilidade', icon: <Bug className="w-4 h-4"/>, color: 'text-cyan-400', accent: 'accent-cyan-500' },
      ];
    } else if (isMedia) {
      return [
        { state: focusEngine, set: setFocusEngine, label: 'Câmeras / Equipamento', icon: <MonitorPlay className="w-4 h-4"/>, color: 'text-blue-400', accent: 'accent-blue-500' },
        { state: focusGameplay, set: setFocusGameplay, label: 'Roteiro / Direção', icon: <FileText className="w-4 h-4"/>, color: 'text-purple-400', accent: 'accent-purple-500' },
        { state: focusStory, set: setFocusStory, label: 'Atuação / Elenco', icon: <Users className="w-4 h-4"/>, color: 'text-amber-400', accent: 'accent-amber-500' },
        { state: focusGraphics, set: setFocusGraphics, label: 'Efeitos Especiais (VFX)', icon: <Star className="w-4 h-4"/>, color: 'text-emerald-400', accent: 'accent-emerald-500' },
        { state: focusAudio, set: setFocusAudio, label: 'Trilha Sonora / Som', icon: <Mic className="w-4 h-4"/>, color: 'text-rose-400', accent: 'accent-rose-500' },
        { state: focusPolishing, set: setFocusPolishing, label: 'Edição / Pós-produção', icon: <Bug className="w-4 h-4"/>, color: 'text-cyan-400', accent: 'accent-cyan-500' },
      ];
    } else if (isAudio) {
      return [
        { state: focusEngine, set: setFocusEngine, label: 'Equipamento de Gravação', icon: <Mic className="w-4 h-4"/>, color: 'text-blue-400', accent: 'accent-blue-500' },
        { state: focusGameplay, set: setFocusGameplay, label: 'Composição / Pauta', icon: <FileText className="w-4 h-4"/>, color: 'text-purple-400', accent: 'accent-purple-500' },
        { state: focusStory, set: setFocusStory, label: 'Performance / Voz', icon: <Users className="w-4 h-4"/>, color: 'text-amber-400', accent: 'accent-amber-500' },
        { state: focusGraphics, set: setFocusGraphics, label: 'Identidade Visual / Capa', icon: <Palette className="w-4 h-4"/>, color: 'text-emerald-400', accent: 'accent-emerald-500' },
        { state: focusAudio, set: setFocusAudio, label: 'Mixagem / Masterização', icon: <Radio className="w-4 h-4"/>, color: 'text-rose-400', accent: 'accent-rose-500' },
        { state: focusPolishing, set: setFocusPolishing, label: 'Edição / Cortes', icon: <Bug className="w-4 h-4"/>, color: 'text-cyan-400', accent: 'accent-cyan-500' },
      ];
    } else if (isPrint) {
      return [
        { state: focusEngine, set: setFocusEngine, label: 'Material / Impressão', icon: <Package className="w-4 h-4"/>, color: 'text-blue-400', accent: 'accent-blue-500' },
        { state: focusGameplay, set: setFocusGameplay, label: 'Escrita / Regras', icon: <FileText className="w-4 h-4"/>, color: 'text-purple-400', accent: 'accent-purple-500' },
        { state: focusStory, set: setFocusStory, label: 'Ilustrações / Arte', icon: <Palette className="w-4 h-4"/>, color: 'text-amber-400', accent: 'accent-amber-500' },
        { state: focusGraphics, set: setFocusGraphics, label: 'Diagramação / Layout', icon: <LayoutGrid className="w-4 h-4"/>, color: 'text-emerald-400', accent: 'accent-emerald-500' },
        { state: focusAudio, set: setFocusAudio, label: 'Qualidade dos Componentes', icon: <Star className="w-4 h-4"/>, color: 'text-rose-400', accent: 'accent-rose-500' },
        { state: focusPolishing, set: setFocusPolishing, label: 'Revisão / Testes', icon: <Bug className="w-4 h-4"/>, color: 'text-cyan-400', accent: 'accent-cyan-500' },
      ];
    } else if (isBuilding) {
      return [
        { state: focusEngine, set: setFocusEngine, label: 'Fundação / Estrutura', icon: <Building2 className="w-4 h-4"/>, color: 'text-blue-400', accent: 'accent-blue-500' },
        { state: focusGameplay, set: setFocusGameplay, label: 'Planta / Espaço', icon: <LayoutGrid className="w-4 h-4"/>, color: 'text-purple-400', accent: 'accent-purple-500' },
        { state: focusStory, set: setFocusStory, label: 'Arquitetura / Design', icon: <Palette className="w-4 h-4"/>, color: 'text-amber-400', accent: 'accent-amber-500' },
        { state: focusGraphics, set: setFocusGraphics, label: 'Acabamento / Materiais', icon: <Star className="w-4 h-4"/>, color: 'text-emerald-400', accent: 'accent-emerald-500' },
        { state: focusAudio, set: setFocusAudio, label: 'Elétrica / Hidráulica', icon: <Cpu className="w-4 h-4"/>, color: 'text-rose-400', accent: 'accent-rose-500' },
        { state: focusPolishing, set: setFocusPolishing, label: 'Inspeção / Segurança', icon: <Bug className="w-4 h-4"/>, color: 'text-cyan-400', accent: 'accent-cyan-500' },
      ];
    } else {
      // Software / Jogos
      return [
        { state: focusEngine, set: setFocusEngine, label: 'Engine / Arquitetura', icon: <Cpu className="w-4 h-4"/>, color: 'text-blue-400', accent: 'accent-blue-500' },
        { state: focusGameplay, set: setFocusGameplay, label: 'Gameplay / UX', icon: <Gamepad2 className="w-4 h-4"/>, color: 'text-purple-400', accent: 'accent-purple-500' },
        { state: focusStory, set: setFocusStory, label: 'História / Conteúdo', icon: <Book className="w-4 h-4"/>, color: 'text-amber-400', accent: 'accent-amber-500' },
        { state: focusGraphics, set: setFocusGraphics, label: 'Gráficos / Interface', icon: <Palette className="w-4 h-4"/>, color: 'text-emerald-400', accent: 'accent-emerald-500' },
        { state: focusAudio, set: setFocusAudio, label: 'Áudio / Efeitos', icon: <Mic className="w-4 h-4"/>, color: 'text-rose-400', accent: 'accent-rose-500' },
        { state: focusPolishing, set: setFocusPolishing, label: 'Otimização / QA', icon: <Bug className="w-4 h-4"/>, color: 'text-cyan-400', accent: 'accent-cyan-500' },
      ];
    }
  };

  const toggleFeature = (featureId: string) => {
    setProductFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const startGame = () => {
    if (!gameName.trim()) {
      setNotification({ message: 'Por favor, dê um nome ao seu projeto!', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    
    const projectCost = getProjectCost();
    const projectRPCost = getProjectRPCost();
    
    if (money < projectCost) {
      setNotification({ message: `Dinheiro insuficiente! Custa ${formatMoney(projectCost)} para iniciar este projeto com sua equipe atual.`, type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    if (researchPoints < projectRPCost) {
      setNotification({ message: `Pontos de Pesquisa insuficientes! Custa ${projectRPCost} RP para iniciar este projeto com as funções selecionadas.`, type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    setMoney(m => m - projectCost);
    setResearchPoints(rp => rp - projectRPCost);
    setIsSetupOpen(false);
    setProgress(0);
    setDevDesign(0);
    setDevTech(0);
    setDevBugs(0);
    setIsDeveloping(true);
    setIsDevOpen(true);
  };

  const startBandProject = () => {
    if (selectedBandId === null && !newBandName.trim()) {
      setNotification({ message: 'Por favor, selecione uma banda ou crie uma nova!', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    let bandId = selectedBandId;
    let currentBandName = '';

    if (selectedBandId === null) {
      const newBand = {
        id: Date.now() + Math.random(),
        name: newBandName,
        genre: newBandGenre,
        members: newBandMembers
      };
      setBands([...bands, newBand]);
      bandId = newBand.id;
      currentBandName = newBand.name;
    } else {
      const band = bands.find(b => b.id === selectedBandId);
      if (band) {
        currentBandName = band.name;
      }
    }

    // Set default values for album
    setGameName(`Álbum de ${currentBandName}`);
    setGenre(selectedBandId === null ? newBandGenre : bands.find(b => b.id === selectedBandId)?.genre || 'Pop');
    setPlatform('Streaming');
    setSecondPlatform('Físico (CD/Vinil)');
    setGameSize('Médio');
    setTargetAudience('Todos');
    setMonetization('Venda Direta');

    setIsBandSetupOpen(false);
    setIsSetupOpen(true);
  };

  const testProduct = () => {
    const isMedia = ['Filme', 'Série', 'Programa de TV', 'Emissora de TV', 'Documentário', 'Animação', 'Curta-metragem'].includes(productType);
    const isAudio = ['Álbum Musical', 'Dublagem/Audiobook', 'Podcast', 'Programa de Rádio', 'Emissora de Rádio', 'Trilha Sonora', 'Efeitos Sonoros'].includes(productType);
    const isPrint = ['Livro', 'Jornal', 'Revista', 'História em Quadrinhos', 'Mangá', 'Livro Didático'].includes(productType);
    const isPhysical = ['Jogo de Tabuleiro', 'Brinquedo', 'Arcade', 'Carro Elétrico', 'Robô Doméstico', 'Chip Neural', 'Foguete Espacial', 'Drone', 'Impressora 3D', 'Console', 'Computador', 'Celular', 'Tablet', 'Smartwatch', 'Processador', 'Placa de Vídeo', 'Mainframe', 'Calculadora Eletrônica', 'Console Portátil', 'Óculos VR', 'Câmera Digital', 'Fone de Ouvido', 'Microfone', 'Televisão', 'Monitor'].includes(productType);
    const isBuilding = ['Casa', 'Prédio Residencial', 'Prédio Comercial', 'Fábrica', 'Shopping Center', 'Estádio', 'Parque de Diversões', 'Aeroporto', 'Hospital', 'Escola', 'Universidade'].includes(productType);
    
    const roleName = isMedia ? 'Editores/Revisores' : isAudio ? 'Engenheiros de Áudio' : isPrint ? 'Revisores de Texto' : isPhysical ? 'Analistas de Qualidade' : isBuilding ? 'Engenheiros/Fiscais' : 'Testers (QA)';
    const bugName = isMedia ? 'erros de gravação' : isAudio ? 'ruídos/falhas' : isPrint ? 'erros de digitação' : isPhysical ? 'defeitos de fábrica' : isBuilding ? 'falhas estruturais' : 'bugs';

    if (staff.testers === 0) {
      setNotification({ message: `Você precisa contratar ${roleName} na aba de RH para revisar produtos durante o desenvolvimento!`, type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    if (devBugs > 0) {
      const bugsFixed = Math.min(devBugs, Math.floor(Math.random() * staff.testers * 2) + 1);
      setDevBugs(b => b - bugsFixed);
      
      // Pequeno bônus de qualidade ao testar
      if (Math.random() > 0.5) setDevDesign(d => d + 1);
      if (Math.random() > 0.5) setDevTech(t => t + 1);

      setNotification({ message: `A equipe corrigiu ${bugsFixed} ${bugName}! A qualidade do produto melhorou levemente.`, type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    } else {
      setNotification({ message: `A equipe não encontrou ${bugName} no momento. O produto parece excelente!`, type: 'info' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const finishGame = () => {
    setIsDevOpen(false);
    setIsDeveloping(false);

    const totalPoints = devDesign + devTech;
    const bugPenalty = devBugs * 2;
    
    // Divisor aumenta levemente com a equipe para não quebrar a nota 10 instantaneamente
    let typeDifficultyMultiplier = 1;
    if (productType === 'Console') typeDifficultyMultiplier = 5;
    else if (productType === 'Mainframe') typeDifficultyMultiplier = 6;
    else if (productType === 'Calculadora Eletrônica') typeDifficultyMultiplier = 2;
    else if (productType === 'Motor Gráfico') typeDifficultyMultiplier = 3;
    else if (productType === 'Computador') typeDifficultyMultiplier = 4;
    else if (productType === 'Celular') typeDifficultyMultiplier = 3.5;
    else if (productType === 'Plataforma Digital') typeDifficultyMultiplier = 2.5;
    else if (productType === 'Rede Social') typeDifficultyMultiplier = 2.0;
    else if (productType === 'Filme') typeDifficultyMultiplier = 3.0;
    else if (productType === 'Série') typeDifficultyMultiplier = 4.5;
    else if (productType === 'Programa de TV') typeDifficultyMultiplier = 2.5;
    else if (productType === 'Sistema Operacional') typeDifficultyMultiplier = 4.0;
    else if (productType === 'Aplicativo') typeDifficultyMultiplier = 1.5;
    else if (productType === 'Tablet') typeDifficultyMultiplier = 3.0;
    else if (productType === 'Smartwatch') typeDifficultyMultiplier = 2.0;
    else if (productType === 'Processador') typeDifficultyMultiplier = 5.0;
    else if (productType === 'Placa de Vídeo') typeDifficultyMultiplier = 4.5;
    else if (productType === 'Álbum Musical') typeDifficultyMultiplier = 2.0;
    else if (productType === 'Dublagem/Audiobook') typeDifficultyMultiplier = 1.2;
    else if (productType === 'Podcast') typeDifficultyMultiplier = 1.0;
    else if (productType === 'Programa de Rádio') typeDifficultyMultiplier = 1.2;
    else if (productType === 'Livro') typeDifficultyMultiplier = 1.5;
    else if (productType === 'Jornal') typeDifficultyMultiplier = 1.8;
    else if (productType === 'Revista') typeDifficultyMultiplier = 1.3;
    else if (productType === 'Jogo de Tabuleiro') typeDifficultyMultiplier = 1.5;
    else if (productType === 'Brinquedo') typeDifficultyMultiplier = 2.0;
    else if (productType === 'Arcade') typeDifficultyMultiplier = 3.5;
    else if (productType === 'Casa') typeDifficultyMultiplier = 2.0;
    else if (productType === 'Prédio Residencial') typeDifficultyMultiplier = 4.0;
    else if (productType === 'Prédio Comercial') typeDifficultyMultiplier = 4.5;
    else if (productType === 'Fábrica') typeDifficultyMultiplier = 5.0;
    else if (productType === 'Shopping Center') typeDifficultyMultiplier = 6.0;
    else if (productType === 'Estádio') typeDifficultyMultiplier = 8.0;
    else if (productType === 'Carro Elétrico') typeDifficultyMultiplier = 6.5;
    else if (productType === 'Robô Doméstico') typeDifficultyMultiplier = 5.5;
    else if (productType === 'Chip Neural') typeDifficultyMultiplier = 7.0;
    else if (productType === 'Foguete Espacial') typeDifficultyMultiplier = 10.0;
    else if (productType === 'Drone') typeDifficultyMultiplier = 3.5;
    else if (productType === 'Impressora 3D') typeDifficultyMultiplier = 4.0;
    else if (productType === 'Realidade Virtual') typeDifficultyMultiplier = 4.5;
    else if (productType === 'Criptomoeda') typeDifficultyMultiplier = 3.0;
    else if (productType === 'Metaverso') typeDifficultyMultiplier = 6.0;
    else if (productType === 'Carro Autônomo (Software)') typeDifficultyMultiplier = 7.5;
    else if (productType === 'Inteligência Artificial') typeDifficultyMultiplier = 5.0;
    else if (productType === 'Plataforma de Streaming') typeDifficultyMultiplier = 3.5;
    else if (productType === 'Navegador Web') typeDifficultyMultiplier = 3.0;
    else if (productType === 'Aplicativo de Relacionamento') typeDifficultyMultiplier = 2.0;
    else if (productType === 'Assistente Virtual') typeDifficultyMultiplier = 4.5;
    else if (productType === 'Software de Edição') typeDifficultyMultiplier = 3.5;
    else if (productType === 'Console Portátil') typeDifficultyMultiplier = 4.0;
    else if (productType === 'Câmera Digital') typeDifficultyMultiplier = 3.0;
    else if (productType === 'Fone de Ouvido') typeDifficultyMultiplier = 2.0;
    else if (productType === 'Microfone') typeDifficultyMultiplier = 1.5;
    else if (productType === 'Televisão') typeDifficultyMultiplier = 3.5;
    else if (productType === 'Monitor') typeDifficultyMultiplier = 3.0;
    else if (productType === 'Documentário') typeDifficultyMultiplier = 2.5;
    else if (productType === 'Animação') typeDifficultyMultiplier = 4.0;
    else if (productType === 'Curta-metragem') typeDifficultyMultiplier = 1.5;
    else if (productType === 'Trilha Sonora') typeDifficultyMultiplier = 2.0;
    else if (productType === 'Efeitos Sonoros') typeDifficultyMultiplier = 1.0;
    else if (productType === 'História em Quadrinhos') typeDifficultyMultiplier = 1.5;
    else if (productType === 'Mangá') typeDifficultyMultiplier = 1.8;
    else if (productType === 'Livro Didático') typeDifficultyMultiplier = 2.0;
    else if (productType === 'Parque de Diversões') typeDifficultyMultiplier = 7.0;
    else if (productType === 'Aeroporto') typeDifficultyMultiplier = 9.0;
    else if (productType === 'Hospital') typeDifficultyMultiplier = 6.5;
    else if (productType === 'Escola') typeDifficultyMultiplier = 3.5;
    else if (productType === 'Universidade') typeDifficultyMultiplier = 5.0;

    const sizeDifficultyMultiplier = gameSize === 'AAA' ? 3 : gameSize === 'Médio' ? 1.5 : 1;
    const difficultyDivisor = (40 + (staff.devs + staff.designers) * 5) * sizeDifficultyMultiplier * typeDifficultyMultiplier;
    let scoreBase = (totalPoints - bugPenalty) / difficultyDivisor;
    
    scoreBase += (Math.random() * 2 - 1); // Fator sorte
    
    // Apply VIP boosts
    const vipBoost = hiredVips.reduce((acc, vip) => acc + vip.boost, 0);
    scoreBase += vipBoost;

    // Apply feature boosts
    const featureBoost = productFeatures.reduce((acc, featureId) => {
      const feature = AVAILABLE_FEATURES.find(f => f.id === featureId);
      return acc + (feature ? feature.boost : 0);
    }, 0);
    scoreBase += featureBoost;

    let finalScore = Math.max(1, Math.min(10, scoreBase));
    finalScore = Math.round(finalScore * 10) / 10;

    const baseSales = 1000 + (fans * 0.5);
    const scoreMultiplier = Math.pow(finalScore / 3, 2.5); 
    
    let typeSalesMultiplier = 1;
    if (productType === 'Console') typeSalesMultiplier = 0.5;
    else if (productType === 'Mainframe') typeSalesMultiplier = 0.05;
    else if (productType === 'Calculadora Eletrônica') typeSalesMultiplier = 0.3;
    else if (productType === 'Motor Gráfico') typeSalesMultiplier = 0.2;
    else if (productType === 'Computador') typeSalesMultiplier = 0.4;
    else if (productType === 'Celular') typeSalesMultiplier = 0.6;
    else if (productType === 'Plataforma Digital') typeSalesMultiplier = 0.8;
    else if (productType === 'Rede Social') typeSalesMultiplier = 2.0;
    else if (productType === 'Filme') typeSalesMultiplier = 1.5;
    else if (productType === 'Série') typeSalesMultiplier = 1.2;
    else if (productType === 'Programa de TV') typeSalesMultiplier = 0.9;
    else if (productType === 'Emissora de TV') typeSalesMultiplier = 0.5;
    else if (productType === 'Sistema Operacional') typeSalesMultiplier = 1.8;
    else if (productType === 'Aplicativo') typeSalesMultiplier = 2.5;
    else if (productType === 'Tablet') typeSalesMultiplier = 0.7;
    else if (productType === 'Smartwatch') typeSalesMultiplier = 0.5;
    else if (productType === 'Processador') typeSalesMultiplier = 0.3;
    else if (productType === 'Placa de Vídeo') typeSalesMultiplier = 0.4;
    else if (productType === 'Álbum Musical') typeSalesMultiplier = 1.8;
    else if (productType === 'Dublagem/Audiobook') typeSalesMultiplier = 1.0;
    else if (productType === 'Podcast') typeSalesMultiplier = 2.2;
    else if (productType === 'Programa de Rádio') typeSalesMultiplier = 1.5;
    else if (productType === 'Emissora de Rádio') typeSalesMultiplier = 0.8;
    else if (productType === 'Livro') typeSalesMultiplier = 1.2;
    else if (productType === 'Jornal') typeSalesMultiplier = 1.8;
    else if (productType === 'Revista') typeSalesMultiplier = 1.4;
    else if (productType === 'Jogo de Tabuleiro') typeSalesMultiplier = 0.8;
    else if (productType === 'Brinquedo') typeSalesMultiplier = 1.1;
    else if (productType === 'Arcade') typeSalesMultiplier = 0.6;
    else if (productType === 'Casa') typeSalesMultiplier = 0.05;
    else if (productType === 'Prédio Residencial') typeSalesMultiplier = 0.02;
    else if (productType === 'Prédio Comercial') typeSalesMultiplier = 0.01;
    else if (productType === 'Fábrica') typeSalesMultiplier = 0.005;
    else if (productType === 'Shopping Center') typeSalesMultiplier = 0.002;
    else if (productType === 'Estádio') typeSalesMultiplier = 0.001;
    else if (productType === 'Carro Elétrico') typeSalesMultiplier = 0.05;
    else if (productType === 'Robô Doméstico') typeSalesMultiplier = 0.1;
    else if (productType === 'Chip Neural') typeSalesMultiplier = 0.08;
    else if (productType === 'Foguete Espacial') typeSalesMultiplier = 0.0005;
    else if (productType === 'Drone') typeSalesMultiplier = 0.5;
    else if (productType === 'Impressora 3D') typeSalesMultiplier = 0.3;
    else if (productType === 'Realidade Virtual') typeSalesMultiplier = 0.8;
    else if (productType === 'Criptomoeda') typeSalesMultiplier = 3.0;
    else if (productType === 'Metaverso') typeSalesMultiplier = 1.5;
    else if (productType === 'Carro Autônomo (Software)') typeSalesMultiplier = 0.2;
    else if (productType === 'Inteligência Artificial') typeSalesMultiplier = 2.0;
    else if (productType === 'Plataforma de Streaming') typeSalesMultiplier = 1.8;
    else if (productType === 'Navegador Web') typeSalesMultiplier = 2.5;
    else if (productType === 'Aplicativo de Relacionamento') typeSalesMultiplier = 2.2;
    else if (productType === 'Assistente Virtual') typeSalesMultiplier = 1.5;
    else if (productType === 'Software de Edição') typeSalesMultiplier = 0.8;
    else if (productType === 'Console Portátil') typeSalesMultiplier = 0.6;
    else if (productType === 'Câmera Digital') typeSalesMultiplier = 0.5;
    else if (productType === 'Fone de Ouvido') typeSalesMultiplier = 1.2;
    else if (productType === 'Microfone') typeSalesMultiplier = 0.9;
    else if (productType === 'Televisão') typeSalesMultiplier = 0.4;
    else if (productType === 'Monitor') typeSalesMultiplier = 0.5;
    else if (productType === 'Documentário') typeSalesMultiplier = 0.8;
    else if (productType === 'Animação') typeSalesMultiplier = 1.6;
    else if (productType === 'Curta-metragem') typeSalesMultiplier = 0.5;
    else if (productType === 'Trilha Sonora') typeSalesMultiplier = 1.2;
    else if (productType === 'Efeitos Sonoros') typeSalesMultiplier = 0.6;
    else if (productType === 'História em Quadrinhos') typeSalesMultiplier = 1.5;
    else if (productType === 'Mangá') typeSalesMultiplier = 1.8;
    else if (productType === 'Livro Didático') typeSalesMultiplier = 0.8;
    else if (productType === 'Parque de Diversões') typeSalesMultiplier = 0.005;
    else if (productType === 'Aeroporto') typeSalesMultiplier = 0.001;
    else if (productType === 'Hospital') typeSalesMultiplier = 0.002;
    else if (productType === 'Escola') typeSalesMultiplier = 0.01;
    else if (productType === 'Universidade') typeSalesMultiplier = 0.005;

    const sizeSalesMultiplier = gameSize === 'AAA' ? 5 : gameSize === 'Médio' ? 2 : 1;
    
    const marketingHype = marketingCampaigns.reduce((acc, campaignId) => {
      const campaign = MARKETING_OPTIONS.find(c => c.id === campaignId);
      return acc * (campaign ? campaign.hype : 1);
    }, 1.0);

    let tvNetworkHype = 1.0;
    if (productType === 'Programa de TV') {
      const availableNetworks = [
        ...DEFAULT_TV_NETWORKS,
        ...history.filter(g => g.type === 'Emissora de TV').map(n => ({
          id: `player_${n.id}`,
          name: n.name,
          cost: 0,
          hype: 1.0 + (n.score / 10)
        }))
      ];
      tvNetworkHype = selectedTvNetworks.reduce((acc, netId) => {
        const net = availableNetworks.find(n => n.id === netId);
        return acc * (net ? net.hype : 1);
      }, 1.0);
    }

    const regionSalesMultiplier = selectedRegions.reduce((acc, regionId) => {
      const region = REGIONS.find(r => r.id === regionId);
      return acc + (region ? region.salesMultiplier : 0);
    }, 0);

    let trendMultiplier = 1.0;
    if (currentTrend) {
      if (currentTrend.type === 'genre' && currentTrend.name === genre) {
        trendMultiplier = currentTrend.multiplier;
      } else if (currentTrend.type === 'theme' && currentTrend.name === theme) {
        trendMultiplier = currentTrend.multiplier;
      }
    }

    const totalSales = Math.floor((baseSales * scoreMultiplier) + (totalPoints * 2)) * sizeSalesMultiplier * typeSalesMultiplier * hypeMultiplier * marketingHype * tvNetworkHype * Math.max(1, regionSalesMultiplier) * trendMultiplier;
    
    // Preço de venda baseado no tamanho
    let gamePrice = 0;
    if (productType === 'Console') {
      gamePrice = gameSize === 'AAA' ? 500 : gameSize === 'Médio' ? 400 : 300;
    } else if (productType === 'Mainframe') {
      gamePrice = gameSize === 'AAA' ? 500000 : gameSize === 'Médio' ? 250000 : 100000;
    } else if (productType === 'Calculadora Eletrônica') {
      gamePrice = gameSize === 'AAA' ? 200 : gameSize === 'Médio' ? 100 : 50;
    } else if (productType === 'Motor Gráfico') {
      gamePrice = gameSize === 'AAA' ? 500 : gameSize === 'Médio' ? 250 : 150;
    } else if (productType === 'Computador') {
      gamePrice = gameSize === 'AAA' ? 1500 : gameSize === 'Médio' ? 800 : 500;
    } else if (productType === 'Celular') {
      gamePrice = gameSize === 'AAA' ? 800 : gameSize === 'Médio' ? 400 : 200;
    } else if (productType === 'Plataforma Digital') {
      gamePrice = gameSize === 'AAA' ? 100 : gameSize === 'Médio' ? 50 : 20; 
    } else if (productType === 'Rede Social') {
      gamePrice = gameSize === 'AAA' ? 15 : gameSize === 'Médio' ? 5 : 1; 
    } else if (productType === 'Filme') {
      gamePrice = gameSize === 'AAA' ? 30 : gameSize === 'Médio' ? 20 : 10;
    } else if (productType === 'Série') {
      gamePrice = gameSize === 'AAA' ? 100 : gameSize === 'Médio' ? 60 : 30;
    } else if (productType === 'Programa de TV') {
      gamePrice = gameSize === 'AAA' ? 50 : gameSize === 'Médio' ? 30 : 15;
    } else if (productType === 'Emissora de TV') {
      gamePrice = gameSize === 'AAA' ? 10000 : gameSize === 'Médio' ? 5000 : 2000;
    } else if (productType === 'Sistema Operacional') {
      gamePrice = gameSize === 'AAA' ? 200 : gameSize === 'Médio' ? 100 : 50;
    } else if (productType === 'Aplicativo') {
      gamePrice = gameSize === 'AAA' ? 20 : gameSize === 'Médio' ? 10 : 5;
    } else if (productType === 'Tablet') {
      gamePrice = gameSize === 'AAA' ? 600 : gameSize === 'Médio' ? 300 : 150;
    } else if (productType === 'Smartwatch') {
      gamePrice = gameSize === 'AAA' ? 400 : gameSize === 'Médio' ? 200 : 100;
    } else if (productType === 'Processador') {
      gamePrice = gameSize === 'AAA' ? 800 : gameSize === 'Médio' ? 400 : 200;
    } else if (productType === 'Placa de Vídeo') {
      gamePrice = gameSize === 'AAA' ? 1200 : gameSize === 'Médio' ? 600 : 300;
    } else if (productType === 'Álbum Musical') {
      gamePrice = gameSize === 'AAA' ? 25 : gameSize === 'Médio' ? 15 : 10;
    } else if (productType === 'Dublagem/Audiobook') {
      gamePrice = gameSize === 'AAA' ? 30 : gameSize === 'Médio' ? 20 : 15;
    } else if (productType === 'Podcast') {
      gamePrice = gameSize === 'AAA' ? 5 : gameSize === 'Médio' ? 2 : 0;
    } else if (productType === 'Programa de Rádio') {
      gamePrice = gameSize === 'AAA' ? 20 : gameSize === 'Médio' ? 10 : 5;
    } else if (productType === 'Emissora de Rádio') {
      gamePrice = gameSize === 'AAA' ? 5000 : gameSize === 'Médio' ? 2500 : 1000;
    } else if (productType === 'Livro') {
      gamePrice = gameSize === 'AAA' ? 80 : gameSize === 'Médio' ? 50 : 30;
    } else if (productType === 'Jornal') {
      gamePrice = gameSize === 'AAA' ? 10 : gameSize === 'Médio' ? 5 : 2;
    } else if (productType === 'Revista') {
      gamePrice = gameSize === 'AAA' ? 25 : gameSize === 'Médio' ? 15 : 8;
    } else if (productType === 'Jogo de Tabuleiro') {
      gamePrice = gameSize === 'AAA' ? 250 : gameSize === 'Médio' ? 150 : 80;
    } else if (productType === 'Brinquedo') {
      gamePrice = gameSize === 'AAA' ? 150 : gameSize === 'Médio' ? 80 : 40;
    } else if (productType === 'Arcade') {
      gamePrice = gameSize === 'AAA' ? 5000 : gameSize === 'Médio' ? 2500 : 1000;
    } else if (productType === 'Casa') {
      gamePrice = gameSize === 'AAA' ? 1500000 : gameSize === 'Médio' ? 500000 : 150000;
    } else if (productType === 'Prédio Residencial') {
      gamePrice = gameSize === 'AAA' ? 25000000 : gameSize === 'Médio' ? 10000000 : 3000000;
    } else if (productType === 'Prédio Comercial') {
      gamePrice = gameSize === 'AAA' ? 35000000 : gameSize === 'Médio' ? 15000000 : 5000000;
    } else if (productType === 'Fábrica') {
      gamePrice = gameSize === 'AAA' ? 50000000 : gameSize === 'Médio' ? 20000000 : 8000000;
    } else if (productType === 'Shopping Center') {
      gamePrice = gameSize === 'AAA' ? 150000000 : gameSize === 'Médio' ? 80000000 : 30000000;
    } else if (productType === 'Estádio') {
      gamePrice = gameSize === 'AAA' ? 500000000 : gameSize === 'Médio' ? 200000000 : 80000000;
    } else if (productType === 'Carro Elétrico') {
      gamePrice = gameSize === 'AAA' ? 150000 : gameSize === 'Médio' ? 80000 : 40000;
    } else if (productType === 'Robô Doméstico') {
      gamePrice = gameSize === 'AAA' ? 50000 : gameSize === 'Médio' ? 20000 : 8000;
    } else if (productType === 'Chip Neural') {
      gamePrice = gameSize === 'AAA' ? 100000 : gameSize === 'Médio' ? 50000 : 20000;
    } else if (productType === 'Foguete Espacial') {
      gamePrice = gameSize === 'AAA' ? 1000000000 : gameSize === 'Médio' ? 500000000 : 200000000;
    } else if (productType === 'Drone') {
      gamePrice = gameSize === 'AAA' ? 5000 : gameSize === 'Médio' ? 2000 : 800;
    } else if (productType === 'Impressora 3D') {
      gamePrice = gameSize === 'AAA' ? 10000 : gameSize === 'Médio' ? 4000 : 1500;
    } else if (productType === 'Realidade Virtual') {
      gamePrice = gameSize === 'AAA' ? 150 : gameSize === 'Médio' ? 80 : 40;
    } else if (productType === 'Criptomoeda') {
      gamePrice = gameSize === 'AAA' ? 5000 : gameSize === 'Médio' ? 2000 : 500;
    } else if (productType === 'Metaverso') {
      gamePrice = gameSize === 'AAA' ? 1000 : gameSize === 'Médio' ? 500 : 200;
    } else if (productType === 'Carro Autônomo (Software)') {
      gamePrice = gameSize === 'AAA' ? 15000 : gameSize === 'Médio' ? 8000 : 4000;
    } else if (productType === 'Inteligência Artificial') {
      gamePrice = gameSize === 'AAA' ? 5000 : gameSize === 'Médio' ? 2000 : 800;
    } else if (productType === 'Plataforma de Streaming') {
      gamePrice = gameSize === 'AAA' ? 50 : gameSize === 'Médio' ? 30 : 15;
    } else if (productType === 'Navegador Web') {
      gamePrice = gameSize === 'AAA' ? 0 : gameSize === 'Médio' ? 0 : 0; // Usually free, monetized via ads/data
    } else if (productType === 'Aplicativo de Relacionamento') {
      gamePrice = gameSize === 'AAA' ? 30 : gameSize === 'Médio' ? 15 : 5; // Premium subscriptions
    } else if (productType === 'Assistente Virtual') {
      gamePrice = gameSize === 'AAA' ? 200 : gameSize === 'Médio' ? 100 : 50;
    } else if (productType === 'Software de Edição') {
      gamePrice = gameSize === 'AAA' ? 300 : gameSize === 'Médio' ? 150 : 80;
    } else if (productType === 'Console Portátil') {
      gamePrice = gameSize === 'AAA' ? 350 : gameSize === 'Médio' ? 200 : 100;
    } else if (productType === 'Câmera Digital') {
      gamePrice = gameSize === 'AAA' ? 1200 : gameSize === 'Médio' ? 600 : 300;
    } else if (productType === 'Fone de Ouvido') {
      gamePrice = gameSize === 'AAA' ? 300 : gameSize === 'Médio' ? 150 : 50;
    } else if (productType === 'Microfone') {
      gamePrice = gameSize === 'AAA' ? 250 : gameSize === 'Médio' ? 100 : 40;
    } else if (productType === 'Televisão') {
      gamePrice = gameSize === 'AAA' ? 2000 : gameSize === 'Médio' ? 1000 : 500;
    } else if (productType === 'Monitor') {
      gamePrice = gameSize === 'AAA' ? 800 : gameSize === 'Médio' ? 400 : 200;
    } else if (productType === 'Documentário') {
      gamePrice = gameSize === 'AAA' ? 20 : gameSize === 'Médio' ? 15 : 10;
    } else if (productType === 'Animação') {
      gamePrice = gameSize === 'AAA' ? 25 : gameSize === 'Médio' ? 15 : 10;
    } else if (productType === 'Curta-metragem') {
      gamePrice = gameSize === 'AAA' ? 10 : gameSize === 'Médio' ? 5 : 2;
    } else if (productType === 'Trilha Sonora') {
      gamePrice = gameSize === 'AAA' ? 20 : gameSize === 'Médio' ? 15 : 10;
    } else if (productType === 'Efeitos Sonoros') {
      gamePrice = gameSize === 'AAA' ? 50 : gameSize === 'Médio' ? 25 : 10;
    } else if (productType === 'História em Quadrinhos') {
      gamePrice = gameSize === 'AAA' ? 20 : gameSize === 'Médio' ? 10 : 5;
    } else if (productType === 'Mangá') {
      gamePrice = gameSize === 'AAA' ? 15 : gameSize === 'Médio' ? 8 : 4;
    } else if (productType === 'Livro Didático') {
      gamePrice = gameSize === 'AAA' ? 100 : gameSize === 'Médio' ? 60 : 30;
    } else if (productType === 'Parque de Diversões') {
      gamePrice = gameSize === 'AAA' ? 500000000 : gameSize === 'Médio' ? 200000000 : 80000000;
    } else if (productType === 'Aeroporto') {
      gamePrice = gameSize === 'AAA' ? 2000000000 : gameSize === 'Médio' ? 800000000 : 300000000;
    } else if (productType === 'Hospital') {
      gamePrice = gameSize === 'AAA' ? 300000000 : gameSize === 'Médio' ? 100000000 : 40000000;
    } else if (productType === 'Escola') {
      gamePrice = gameSize === 'AAA' ? 50000000 : gameSize === 'Médio' ? 20000000 : 5000000;
    } else if (productType === 'Universidade') {
      gamePrice = gameSize === 'AAA' ? 200000000 : gameSize === 'Médio' ? 80000000 : 30000000;
    } else {
      gamePrice = gameSize === 'AAA' ? 60 : gameSize === 'Médio' ? 40 : 20;
    }
    const revenue = totalSales * gamePrice; 
    const fansGained = Math.floor(totalSales * 0.08 * (finalScore / 5));

    const newGame: Game = {
      id: Date.now() + Math.random(),
      name: gameName,
      type: productType,
      genre: genre || '-',
      platform: platform || '-',
      theme: theme || undefined,
      visualStyle: visualStyle || undefined,
      targetAudience: targetAudience || undefined,
      marketingCampaigns: marketingCampaigns.length > 0 ? marketingCampaigns : undefined,
      tvNetworks: productType === 'Programa de TV' && selectedTvNetworks.length > 0 ? selectedTvNetworks : undefined,
      regions: selectedRegions,
      isSubscription: SUBSCRIPTION_TYPES.includes(productType),
      isActive: SUBSCRIPTION_TYPES.includes(productType),
      activeSubscribers: SUBSCRIPTION_TYPES.includes(productType) ? totalSales : undefined,
      monthlyFee: SUBSCRIPTION_TYPES.includes(productType) ? Math.max(5, Math.floor(gamePrice / 10)) : undefined,
      maintenanceCost: SUBSCRIPTION_TYPES.includes(productType) ? 1 : undefined,
      design: devDesign,
      tech: devTech,
      bugs: devBugs,
      score: finalScore,
      sales: totalSales,
      revenue: revenue
    };

    setLastGame(newGame);
    setHistory([newGame, ...history]);
    setMoney(m => m + revenue);
    setFans(f => Math.max(0, f + fansGained));
    
    // Gera comentários iniciais nas redes sociais ao lançar um produto
    if (socialAccounts.length > 0) {
      const initialCommentsCount = Math.floor(Math.random() * 5) + 3;
      const newComments = [];
      const authors = ['João Silva', 'Maria Oliveira', 'Pedro Santos', 'Ana Costa', 'Lucas Pereira', 'Juliana Lima', 'Marcos Rocha', 'Fernanda Souza', 'Rafael Alves', 'Camila Martins'];
      const launchComments = [
        'Acabou de sair! Já estou baixando.',
        'Finalmente! Esperei muito por isso.',
        'Parece incrível, vou testar agora.',
        'O trailer me convenceu, espero que seja bom.',
        'Alguém já testou? Vale a pena?',
        'Mais um lançamento de peso!',
        'A arte está linda, parabéns!',
        'Espero que não tenha muitos bugs.',
        'O hype é real!',
        'Vou maratonar isso hoje mesmo.'
      ];

      for (let i = 0; i < initialCommentsCount; i++) {
        const randomAccount = socialAccounts[Math.floor(Math.random() * socialAccounts.length)];
        const sentiment: 'positive' | 'negative' | 'neutral' = finalScore > 7 ? 'positive' : finalScore < 4 ? 'negative' : 'neutral';
        
        let content = '';
        if (sentiment === 'positive') {
          content = launchComments[Math.floor(Math.random() * launchComments.length)];
        } else if (sentiment === 'negative') {
          content = 'Esperava mais desse lançamento, achei meio fraco.';
        } else {
          content = 'Interessante, vou dar uma olhada com calma.';
        }

        newComments.push({
          id: Date.now() + i + Math.random(),
          author: authors[Math.floor(Math.random() * authors.length)],
          content: `[${gameName}] ${content}`,
          platform: randomAccount.platform,
          date: new Date(gameDate),
          sentiment
        });
      }
      setSocialComments(prev => [...newComments, ...prev].slice(0, 50));
    }
    
    // Ganha pontos de pesquisa ao finalizar um produto
    const gainedRP = Math.floor((finalScore * 100) * (gameSize === 'AAA' ? 3 : gameSize === 'Médio' ? 1.5 : 1));
    setResearchPoints(p => p + gainedRP);

    // Market Share Gain
    const marketShareGain = (finalScore / 10) * (gameSize === 'AAA' ? 2.0 : gameSize === 'Médio' ? 0.5 : 0.1);
    setPlayerMarketShare(prevPlayerShare => {
      const newPlayerShare = Math.min(100, prevPlayerShare + marketShareGain);
      const targetRivalShare = 100 - newPlayerShare;

      setRivals(currentRivals => {
        const totalRivalShare = currentRivals.reduce((acc, r) => acc + r.marketShare, 0);
        return currentRivals.map(r => ({
          ...r,
          marketShare: (r.marketShare / totalRivalShare) * targetRivalShare
        }));
      });

      return newPlayerShare;
    });

    setIsReviewOpen(true);
  };

  const hireStaff = (type: 'devs' | 'designers' | 'testers' | 'researchers', cost: number) => {
    if (money < cost) {
      setNotification({ message: 'Dinheiro insuficiente para contratar!', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    setMoney(m => m - cost);
    setStaff(s => ({ ...s, [type]: s[type] + 1 }));
  };

  const buyMarketing = (cost: number, fansGained: number) => {
    if (money < cost) {
      setNotification({ message: 'Dinheiro insuficiente para esta campanha!', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    setMoney(m => m - cost);
    setFans(f => f + fansGained);
  };

  const organizeShow = (bandId: number, type: 'local' | 'mundial') => {
    const cost = type === 'local' ? 30000 : 150000;
    if (money < cost) {
      setNotification({ message: 'Dinheiro insuficiente para organizar este show/turnê!', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    
    const band = bands.find(b => b.id === bandId);
    if (!band) return;

    const fansGained = type === 'local' ? Math.floor(Math.random() * 2000) + 500 : Math.floor(Math.random() * 15000) + 5000;
    const revenue = type === 'local' ? Math.floor(Math.random() * 50000) + 20000 : Math.floor(Math.random() * 500000) + 200000;
    
    setMoney(m => m - cost + revenue);
    setFans(f => f + fansGained);
    
    setNotification({ 
      message: `${band.name} finalizou a ${type === 'local' ? 'apresentação local' : 'turnê mundial'}! Lucro: ${formatMoney(revenue - cost)}. Fãs ganhos: ${formatNumber(fansGained)}.`, 
      type: 'success' 
    });
    setTimeout(() => setNotification(null), 5000);
  };

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;
  };

  const formatNumber = (val: number) => {
    return new Intl.NumberFormat('en-US').format(val);
  };

  const handleCharacterAnswer = (tech: number, design: number, business: number, perk: string) => {
    setPlayerStats(s => ({ tech: s.tech + tech, design: s.design + design, business: s.business + business }));
    if (perk) setPerks(p => [...p, perk]);
    
    if (creationStep < 6) {
      setCreationStep(s => s + 1);
    } else {
      setGameState('company_creation');
    }
  };

  const finishCompanyCreation = () => {
    if (!ceoName || !companyName || !country || !stateName || !city) {
      setNotification({ message: 'Por favor, preencha todos os campos!', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    setGameDate(new Date(startYear, 0, 1));
    if (gameMode === 'sandbox') {
      setMoney(999999999);
      setResearchPoints(9999999);
      setUpgrades(ups => ups.map(u => ({ ...u, level: u.maxLevel })));
      setTechLevel(30);
    }
    setGameState('playing');
  };

  if (gameState === 'character_creation') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-200">
        <div className="bg-slate-900 w-full max-w-2xl rounded-2xl border border-slate-800 shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">Construa sua História</h1>
          <p className="text-slate-400 text-center mb-8">Suas escolhas de infância definirão suas vantagens iniciais.</p>
          
          {creationStep === 0 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold text-indigo-400 mb-6">Bebê: Qual foi seu primeiro brinquedo favorito?</h2>
              <button onClick={() => handleCharacterAnswer(1, 0, 0, 'Curiosidade Precoce')} className="w-full p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-colors">
                <strong className="text-white block mb-1">Blocos de montar e engrenagens</strong>
                <span className="text-sm text-slate-500">Início do pensamento lógico (+Tech)</span>
              </button>
              <button onClick={() => handleCharacterAnswer(0, 1, 0, 'Alma Artística')} className="w-full p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-colors">
                <strong className="text-white block mb-1">Lápis de cor e papéis riscados</strong>
                <span className="text-sm text-slate-500">Início da criatividade (+Design)</span>
              </button>
              <button onClick={() => handleCharacterAnswer(0, 0, 1, 'Carismático')} className="w-full p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-colors">
                <strong className="text-white block mb-1">Brinquedos musicais e barulhentos</strong>
                <span className="text-sm text-slate-500">Início da comunicação (+Business)</span>
              </button>
            </div>
          )}

          {creationStep === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold text-indigo-400 mb-6">Criança: O que você mais gostava de fazer?</h2>
              <button onClick={() => handleCharacterAnswer(2, 0, 0, 'Mente Lógica')} className="w-full p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-colors">
                <strong className="text-white block mb-1">Desmontar carrinhos para ver o motor</strong>
                <span className="text-sm text-slate-500">Foco em Tecnologia (+Tech)</span>
              </button>
              <button onClick={() => handleCharacterAnswer(0, 2, 0, 'Olhar Artístico')} className="w-full p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-colors">
                <strong className="text-white block mb-1">Desenhar e criar histórias em quadrinhos</strong>
                <span className="text-sm text-slate-500">Foco em Design (+Design)</span>
              </button>
              <button onClick={() => handleCharacterAnswer(0, 0, 2, 'Pequeno Empreendedor')} className="w-full p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-colors">
                <strong className="text-white block mb-1">Vender limonada ou trocar figurinhas</strong>
                <span className="text-sm text-slate-500">Foco em Negócios (+Business)</span>
              </button>
            </div>
          )}

          {creationStep === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold text-indigo-400 mb-6">Pré-Adolescente: Como você passava as tardes?</h2>
              <button onClick={() => handleCharacterAnswer(3, 0, 0, 'Hacker Mirim')} className="w-full p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-colors">
                <strong className="text-white block mb-1">Fuçando no computador e aprendendo scripts</strong>
                <span className="text-sm text-slate-500">Foco em Tecnologia (++Tech)</span>
              </button>
              <button onClick={() => handleCharacterAnswer(0, 3, 0, 'Designer Digital')} className="w-full p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-colors">
                <strong className="text-white block mb-1">Editando fotos e criando layouts no Paint</strong>
                <span className="text-sm text-slate-500">Foco em Design (++Design)</span>
              </button>
              <button onClick={() => handleCharacterAnswer(0, 0, 3, 'Negociador')} className="w-full p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-colors">
                <strong className="text-white block mb-1">Organizando eventos e rifas na escola</strong>
                <span className="text-sm text-slate-500">Foco em Negócios (++Business)</span>
              </button>
            </div>
          )}

          {creationStep === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold text-indigo-400 mb-6">Adolescente: Qual era seu papel no grupo?</h2>
              <button onClick={() => handleCharacterAnswer(4, 0, 0, 'Gênio da Lógica')} className="w-full p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-colors">
                <strong className="text-white block mb-1">O que resolvia todos os problemas técnicos</strong>
                <span className="text-sm text-slate-500">Foco extremo em Tecnologia (+++Tech)</span>
              </button>
              <button onClick={() => handleCharacterAnswer(0, 4, 0, 'Esteta')} className="w-full p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-colors">
                <strong className="text-white block mb-1">O que cuidava da estética e apresentação</strong>
                <span className="text-sm text-slate-500">Foco extremo em Design (+++Design)</span>
              </button>
              <button onClick={() => handleCharacterAnswer(0, 0, 4, 'Líder Nato')} className="w-full p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-colors">
                <strong className="text-white block mb-1">O que tomava as decisões e liderava</strong>
                <span className="text-sm text-slate-500">Foco extremo em Negócios (+++Business)</span>
              </button>
            </div>
          )}

          {creationStep === 4 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold text-indigo-400 mb-6">Hobby: O que você fazia no tempo livre?</h2>
              <button onClick={() => handleCharacterAnswer(2, 0, 1, 'Autodidata')} className="w-full p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-colors">
                <strong className="text-white block mb-1">Aprender novas linguagens de programação</strong>
                <span className="text-sm text-slate-500">Foco em Tech e Negócios (+Tech, +Business)</span>
              </button>
              <button onClick={() => handleCharacterAnswer(0, 2, 1, 'Crítico de Arte')} className="w-full p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-colors">
                <strong className="text-white block mb-1">Visitar galerias e museus digitais</strong>
                <span className="text-sm text-slate-500">Foco em Design e Negócios (+Design, +Business)</span>
              </button>
              <button onClick={() => handleCharacterAnswer(1, 1, 1, 'Gamer Profissional')} className="w-full p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-colors">
                <strong className="text-white block mb-1">Competir em torneios e gerenciar times</strong>
                <span className="text-sm text-slate-500">Equilíbrio Geral (+Tech, +Design, +Business)</span>
              </button>
            </div>
          )}

          {creationStep === 5 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold text-indigo-400 mb-6">Faculdade: Qual era sua matéria favorita?</h2>
              <button onClick={() => handleCharacterAnswer(4, 0, 0, 'Algoritmos Avançados')} className="w-full p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-colors">
                <strong className="text-white block mb-1">Estrutura de Dados e Algoritmos</strong>
                <span className="text-sm text-slate-500">Foco em Tecnologia (++Tech)</span>
              </button>
              <button onClick={() => handleCharacterAnswer(0, 4, 0, 'Psicologia das Cores')} className="w-full p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-colors">
                <strong className="text-white block mb-1">Design de Interface e Experiência</strong>
                <span className="text-sm text-slate-500">Foco em Design (++Design)</span>
              </button>
              <button onClick={() => handleCharacterAnswer(0, 0, 4, 'Mestre do Marketing')} className="w-full p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-colors">
                <strong className="text-white block mb-1">Administração e Marketing</strong>
                <span className="text-sm text-slate-500">Foco em Negócios (++Business)</span>
              </button>
            </div>
          )}

          {creationStep === 6 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold text-indigo-400 mb-6">Primeiro Emprego: Qual foi sua função?</h2>
              <button onClick={() => handleCharacterAnswer(5, 0, 0, 'Dev Fullstack')} className="w-full p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-colors">
                <strong className="text-white block mb-1">Desenvolvedor em uma Startup</strong>
                <span className="text-sm text-slate-500">Mestre em Tecnologia (+++Tech)</span>
              </button>
              <button onClick={() => handleCharacterAnswer(0, 5, 0, 'Creative Lead')} className="w-full p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-colors">
                <strong className="text-white block mb-1">Designer em uma Agência Global</strong>
                <span className="text-sm text-slate-500">Mestre em Design (+++Design)</span>
              </button>
              <button onClick={() => handleCharacterAnswer(0, 0, 5, 'Sales Executive')} className="w-full p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-colors">
                <strong className="text-white block mb-1">Executivo de Vendas Corporativas</strong>
                <span className="text-sm text-slate-500">Mestre em Negócios (+++Business)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (gameState === 'company_creation') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-200">
        <div className="bg-slate-900 w-full max-w-2xl rounded-2xl border border-slate-800 shadow-2xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">Fundação da Empresa</h1>
          <p className="text-slate-400 text-center mb-8">Defina os detalhes da sua nova gigante da tecnologia.</p>
          
          <div className="space-y-4">
            <div className="flex gap-4 mb-6">
              <button 
                onClick={() => setGameMode('normal')}
                className={`flex-1 p-4 rounded-xl border-2 transition-all ${gameMode === 'normal' ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-950 hover:border-slate-700'}`}
              >
                <h3 className="text-white font-bold mb-1">Modo Clássico</h3>
                <p className="text-xs text-slate-400">Comece com $500k e construa seu império do zero.</p>
              </button>
              <button 
                onClick={() => setGameMode('sandbox')}
                className={`flex-1 p-4 rounded-xl border-2 transition-all ${gameMode === 'sandbox' ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-800 bg-slate-950 hover:border-slate-700'}`}
              >
                <h3 className="text-white font-bold mb-1">Modo Sandbox</h3>
                <p className="text-xs text-slate-400">Dinheiro infinito, pesquisas liberadas. Apenas crie.</p>
              </button>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-slate-400">Seu Nome (CEO)</label>
                <button onClick={randomizeCEO} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  <Search className="w-3 h-3" /> Aleatório
                </button>
              </div>
              <input type="text" value={ceoName} onChange={e => setCeoName(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500" placeholder="Ex: Steve Jobs" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-slate-400">Nome da Empresa</label>
                <button onClick={randomizeCompany} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  <Search className="w-3 h-3" /> Aleatório
                </button>
              </div>
              <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500" placeholder="Ex: Apple" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Foco da Empresa</label>
                <select 
                  value={companyFocus} 
                  onChange={e => setCompanyFocus(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 appearance-none"
                >
                  <option value="Geral">Geral (Equilibrado)</option>
                  <option value="Software">Software & Jogos</option>
                  <option value="Hardware">Hardware & Dispositivos</option>
                  <option value="Mídia">Mídia & Entretenimento</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Cor da Marca</label>
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2">
                  <input type="color" value={logoColor} onChange={e => setLogoColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0" />
                  <span className="text-white font-mono text-sm uppercase">{logoColor}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={randomizeLocation} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                <Globe className="w-3 h-3" /> Localização Aleatória
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">País</label>
                <select 
                  value={country} 
                  onChange={e => {
                    setCountry(e.target.value);
                    setStateName('');
                    setCity('');
                  }} 
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 appearance-none"
                >
                  <option value="">Selecione...</option>
                  {countries.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Estado / Província</label>
                <select 
                  value={stateName} 
                  onChange={e => {
                    setStateName(e.target.value);
                    setCity('');
                  }} 
                  disabled={!country}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 appearance-none disabled:opacity-50"
                >
                  <option value="">Selecione...</option>
                  {country && countries.find(c => c.name === country)?.states.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Cidade Principal</label>
                <select 
                  value={city} 
                  onChange={e => setCity(e.target.value)} 
                  disabled={!stateName}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 appearance-none disabled:opacity-50"
                >
                  <option value="">Selecione...</option>
                  {stateName && countries.find(c => c.name === country)?.states.find(s => s.name === stateName)?.cities.map(ct => <option key={ct} value={ct}>{ct}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-400 mb-1">Ano de Início</label>
              <select 
                value={startYear} 
                onChange={e => setStartYear(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 appearance-none"
              >
                <option value={1950}>1950 - A Era de Ouro do Rádio e Cinema</option>
                <option value={1960}>1960 - O Início da Televisão e Rock</option>
                <option value={1970}>1970 - O Nascimento dos Arcades</option>
                <option value={1980}>1980 - O Início da Era Digital</option>
                <option value={1990}>1990 - A Ascensão da Internet</option>
                <option value={2000}>2000 - A Bolha Ponto Com</option>
                <option value={2010}>2010 - A Era dos Smartphones</option>
                <option value={2020}>2020 - Inteligência Artificial & VR</option>
              </select>
            </div>
          </div>

          <button 
            onClick={finishCompanyCreation} 
            disabled={!ceoName || !companyName || !country || !stateName || !city}
            className={`w-full mt-8 py-4 font-bold rounded-xl transition-all shadow-lg active:scale-95 ${
              (!ceoName || !companyName || !country || !stateName || !city) 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20'
            }`}
          >
            COMEÇAR JORNADA
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* Top Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-2"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Money */}
          <div className="flex-1 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center gap-3 shadow-lg">
            <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-white font-bold text-sm sm:text-base tracking-tight">{formatMoney(money)}</span>
          </div>

          {/* Research */}
          <div className="flex-1 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center gap-3 shadow-lg">
            <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center border border-cyan-500/30">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="text-white font-bold text-sm sm:text-base tracking-tight">{formatNumber(researchPoints)}</span>
          </div>

          {/* Fans */}
          <div className="flex-1 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center gap-3 shadow-lg">
            <div className="w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/30">
              <Users className="w-4 h-4 text-indigo-400" />
            </div>
            <span className="text-white font-bold text-sm sm:text-base tracking-tight">{formatNumber(fans)}</span>
          </div>

          {/* Date */}
          <div className="flex-1 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center gap-3 shadow-lg">
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${isPaused ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-amber-500/20 border-amber-500/30'}`}
            >
              {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4 text-amber-400" />}
            </button>
            <span className="text-white font-bold text-sm sm:text-base tracking-tight">{gameDate.toLocaleDateString('pt-BR')}</span>
          </div>

          {/* Search Button */}
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="relative flex-shrink-0 w-12 h-12 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center shadow-lg hover:bg-slate-800 transition-colors"
          >
            <Search className="w-5 h-5 text-slate-400" />
          </button>

          {/* Company */}
          <div className="flex-1 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center justify-between shadow-lg min-w-[150px]">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center border border-white/10 flex-shrink-0">
                <Building2 className="w-4 h-4 text-slate-400" />
              </div>
              <span className="text-white font-bold text-sm truncate">{companyName || 'Sua Empresa'}</span>
            </div>
            <div className="w-6 h-4 bg-slate-800 rounded-sm border border-white/10 flex items-center justify-center overflow-hidden ml-2 flex-shrink-0">
              {country === 'Espaço' ? (
                <Rocket className="w-3 h-3 text-indigo-400" />
              ) : (
                <span className="text-[10px] uppercase font-bold text-slate-400">{country ? country.slice(0, 2) : '??'}</span>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-full font-bold shadow-xl border ${
              notification.type === 'success' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
              notification.type === 'error' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
              'bg-blue-500/20 text-blue-400 border-blue-500/30'
            }`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prompt Modal */}
      <AnimatePresence>
        {promptModal.isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
            >
              <h3 className="text-xl font-bold text-white mb-2">{promptModal.title}</h3>
              <p className="text-slate-400 mb-6">{promptModal.message}</p>
              
              {promptModal.options ? (
                <div className="space-y-3 mb-6">
                  {promptModal.options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => {
                        promptModal.onConfirm(opt);
                        setPromptModal(p => ({ ...p, isOpen: false }));
                      }}
                      className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors text-left px-4"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const val = new FormData(e.currentTarget).get('promptInput') as string;
                  if (val) {
                    promptModal.onConfirm(val);
                    setPromptModal(p => ({ ...p, isOpen: false }));
                  }
                }}>
                  <input 
                    name="promptInput"
                    autoFocus
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 mb-6"
                    placeholder="Digite aqui..."
                  />
                  <div className="flex gap-3">
                    <button 
                      type="button"
                      onClick={() => {
                        promptModal.onCancel();
                        setPromptModal(p => ({ ...p, isOpen: false }));
                      }}
                      className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors"
                    >
                      Confirmar
                    </button>
                  </div>
                </form>
              )}
              
              {promptModal.options && (
                <button 
                  onClick={() => {
                    promptModal.onCancel();
                    setPromptModal(p => ({ ...p, isOpen: false }));
                  }}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors mt-2"
                >
                  Cancelar
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto pt-32 pb-32 px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
        
        {/* TAB: STUDIO */}
        {activeTab === 'studio' && (
          <div className="relative w-full h-[70vh] rounded-[40px] overflow-hidden border-8 border-slate-900 shadow-[0_0_50px_rgba(0,0,0,0.5)] group">
            {/* Isometric Office Background */}
            <div className="absolute inset-0 bg-[#1a3a5a]">
              <img 
                src={country === 'Espaço' 
                  ? "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1600" 
                  : "https://images.unsplash.com/photo-1590402444681-f39c8077a9a2?auto=format&fit=crop&q=80&w=1600"} 
                alt="Office Interior" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/80" />
            </div>
            
            {/* Interactive Elements Overlay */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 shadow-2xl"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center border border-amber-500/30">
                      <Trophy className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-white uppercase tracking-tight">Performance</h2>
                      <p className="text-xs text-slate-400 uppercase tracking-widest">Dados da Empresa</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-black/40 rounded-2xl border border-white/5">
                      <span className="text-slate-400 font-medium">Produtos Totais</span>
                      <span className="font-black text-white text-xl">{history.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-black/40 rounded-2xl border border-white/5">
                      <span className="text-slate-400 font-medium">Recorde de Receita</span>
                      <span className="font-black text-emerald-400 text-xl">
                        {history.length > 0 ? formatMoney(Math.max(...history.map(g => g.revenue))) : '$0'}
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 shadow-2xl"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center border border-indigo-500/30">
                      <LayoutGrid className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-white uppercase tracking-tight">Estúdio</h2>
                      <p className="text-xs text-slate-400 uppercase tracking-widest">Visão Geral da Sede</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                      <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Nível do Escritório</p>
                      <p className="text-xl font-black text-white">{officeLevel}</p>
                    </div>
                    <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                      <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Tecnologia</p>
                      <p className="text-xl font-black text-cyan-400">LVL {techLevel}</p>
                    </div>
                  </div>
                </motion.div>

                {isDeveloping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-[32px] border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.2)] md:col-span-2 cursor-pointer hover:bg-slate-800/60 transition-colors"
                    onClick={() => setIsDevOpen(true)}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center border border-indigo-500/30">
                          <Code className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                          <h2 className="text-xl font-black text-white uppercase tracking-tight">Em Desenvolvimento</h2>
                          <p className="text-xs text-indigo-400 uppercase tracking-widest">{gameName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-black text-white">{Math.floor(progress)}%</p>
                        <p className="text-[10px] uppercase font-bold text-slate-500">Progresso</p>
                      </div>
                    </div>
                    
                    <div className="w-full bg-black/40 h-4 rounded-full overflow-hidden border border-white/5">
                      <div 
                        className="bg-indigo-500 h-full transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    
                    <p className="text-center text-xs text-slate-400 mt-4 uppercase tracking-widest">Clique para ver detalhes</p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Floating Label */}
            <div className="absolute top-8 left-8 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-black text-white uppercase tracking-[0.2em]">Escritório Nível {officeLevel}</span>
            </div>
          </div>
        )}
        {/* TAB: HR */}
        {activeTab === 'hr' && (
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-400" /> Devs / Produtores
              </h2>
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-center mb-6">
                <p className="text-3xl font-bold text-white">{staff.devs}</p>
                <p className="text-sm text-slate-500 mt-1">Custo: {formatMoney(staff.devs * 2000)}/projeto</p>
              </div>
              <button 
                onClick={() => hireStaff('devs', 10000)}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
              >
                <UserPlus className="w-5 h-5" /> CONTRATAR ({formatMoney(10000)})
              </button>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-400" /> Designers / Roteiristas
              </h2>
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-center mb-6">
                <p className="text-3xl font-bold text-white">{staff.designers}</p>
                <p className="text-sm text-slate-500 mt-1">Custo: {formatMoney(staff.designers * 2000)}/projeto</p>
              </div>
              <button 
                onClick={() => hireStaff('designers', 10000)}
                className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/20 active:scale-95"
              >
                <UserPlus className="w-5 h-5" /> CONTRATAR ({formatMoney(10000)})
              </button>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Bug className="w-5 h-5 text-red-400" /> Testers / Revisores
              </h2>
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-center mb-6">
                <p className="text-3xl font-bold text-white">{staff.testers}</p>
                <p className="text-sm text-slate-500 mt-1">Custo: {formatMoney(staff.testers * 1500)}/projeto</p>
              </div>
              <button 
                onClick={() => hireStaff('testers', 8000)}
                className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-500/20 active:scale-95"
              >
                <UserPlus className="w-5 h-5" /> CONTRATAR ({formatMoney(8000)})
              </button>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-cyan-400" /> Pesquisadores
              </h2>
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-center mb-6">
                <p className="text-3xl font-bold text-white">{staff.researchers}</p>
                <p className="text-sm text-slate-500 mt-1">Gera Pontos de Pesquisa/mês</p>
              </div>
              <button 
                onClick={() => hireStaff('researchers', 15000)}
                className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
              >
                <UserPlus className="w-5 h-5" /> CONTRATAR ({formatMoney(15000)})
              </button>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3 mb-6">
              <Star className="w-6 h-6 text-amber-400" /> Mega-Estrelas (VIPs)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {AVAILABLE_VIPS.map(vip => {
                const isHired = hiredVips.some(v => v.id === vip.id);
                return (
                  <div key={vip.id} className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm relative overflow-hidden">
                    {isHired && (
                      <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                        Contratado
                      </div>
                    )}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">{vip.name}</h3>
                        <p className="text-sm text-slate-400">{vip.role}</p>
                      </div>
                      <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                        <Star className={`w-6 h-6 ${isHired ? 'text-amber-400' : 'text-slate-600'}`} />
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Salário Mensal</span>
                        <span className="font-bold text-red-400">-{formatMoney(vip.salary)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Bônus de Qualidade</span>
                        <span className="font-bold text-emerald-400">+{vip.boost * 100}%</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (isHired) {
                          setHiredVips(prev => prev.filter(v => v.id !== vip.id));
                          setNotification({ message: `${vip.name} foi demitido.`, type: 'info' });
                        } else {
                          if (money >= vip.salary) {
                            setMoney(m => m - vip.salary);
                            setHiredVips(prev => [...prev, vip]);
                            setNotification({ message: `${vip.name} foi contratado!`, type: 'success' });
                          } else {
                            setNotification({ message: 'Dinheiro insuficiente para o primeiro salário.', type: 'error' });
                          }
                        }
                        setTimeout(() => setNotification(null), 3000);
                      }}
                      className={`w-full py-3 font-bold rounded-xl transition-all uppercase text-sm ${
                        isHired 
                          ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20' 
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-lg shadow-amber-500/20'
                      }`}
                    >
                      {isHired ? 'Demitir' : 'Contratar'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          </>
        )}

        {/* TAB: RESEARCH */}
        {activeTab === 'research' && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                <GraduationCap className="w-8 h-8 text-cyan-400" /> Centro de Pesquisa
              </h2>
              <div className="flex gap-4">
                <div className="bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20">
                  <span className="text-cyan-400 font-bold text-sm uppercase tracking-widest">Pontos: {formatNumber(researchPoints)}</span>
                </div>
                <div className="bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20">
                  <span className="text-indigo-400 font-bold text-sm uppercase tracking-widest">Nível Tech: {techLevel}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-white/5 rounded-[32px] p-6 mb-8">
              <p className="text-slate-400 text-sm text-center italic">
                "Pontos de pesquisa são obtidos ao lançar novos produtos no mercado. Use-os para evoluir sua tecnologia."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upgrades.map(upgrade => (
                <div key={upgrade.id} className="bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-[32px] p-8 flex flex-col justify-between group hover:bg-slate-800/80 transition-all">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">{upgrade.name}</h3>
                      <span className="text-xs font-bold text-slate-500 bg-black/40 px-2 py-1 rounded-lg">LVL {upgrade.level}/{upgrade.maxLevel}</span>
                    </div>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">{upgrade.description}</p>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="w-full bg-black/40 h-2 rounded-full mb-6 overflow-hidden">
                      <div 
                        className="h-full bg-cyan-500 transition-all duration-500" 
                        style={{ width: `${(upgrade.level / upgrade.maxLevel) * 100}%` }}
                      />
                    </div>
                    
                    <button 
                      disabled={upgrade.level >= upgrade.maxLevel || researchPoints < upgrade.cost}
                      onClick={() => {
                        if (researchPoints >= upgrade.cost) {
                          setResearchPoints(p => p - upgrade.cost);
                          setUpgrades(ups => ups.map(u => u.id === upgrade.id ? { ...u, level: u.level + 1, cost: Math.floor(u.cost * 1.5) } : u));
                          // Se todos os upgrades subirem, o nível tech geral sobe
                          if (upgrade.level % 2 === 0) setTechLevel(l => l + 1);
                        }
                      }}
                      className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 ${
                        upgrade.level >= upgrade.maxLevel ? 'bg-slate-800 text-slate-600 cursor-not-allowed' :
                        researchPoints >= upgrade.cost ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/20 active:scale-95' :
                        'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {upgrade.level >= upgrade.maxLevel ? 'Nível Máximo' : `Pesquisar (${formatNumber(upgrade.cost)} pts)`}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: MARKETING */}
        {activeTab === 'marketing' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-pink-400" /> Campanha Online
              </h2>
              <p className="text-slate-400 text-sm mb-6">Anúncios em redes sociais e sites de tecnologia. Bom para começar.</p>
              <button 
                onClick={() => buyMarketing(5000, Math.floor(Math.random() * 500) + 200)}
                className="w-full py-4 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-pink-500/20 active:scale-95 mt-auto"
              >
                INVESTIR ({formatMoney(5000)})
              </button>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Presentation className="w-5 h-5 text-pink-400" /> Evento de Imprensa
              </h2>
              <p className="text-slate-400 text-sm mb-6">Apresentação para jornalistas e influenciadores. Gera muito hype.</p>
              <button 
                onClick={() => buyMarketing(25000, Math.floor(Math.random() * 3000) + 1000)}
                className="w-full py-4 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-pink-500/20 active:scale-95 mt-auto"
              >
                INVESTIR ({formatMoney(25000)})
              </button>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-pink-400" /> Conferência Global
              </h2>
              <p className="text-slate-400 text-sm mb-6">Seu próprio evento global transmitido para milhões de pessoas.</p>
              <button 
                onClick={() => buyMarketing(100000, Math.floor(Math.random() * 15000) + 5000)}
                className="w-full py-4 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-pink-500/20 active:scale-95 mt-auto"
              >
                INVESTIR ({formatMoney(100000)})
              </button>
            </div>

            {gameDate.getFullYear() >= 2004 && (
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm md:col-span-3">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-cyan-400" /> Redes Sociais
                  </h2>
                  
                  {socialAccounts.length > 0 && (
                    <div className="flex items-center gap-3 bg-slate-950 p-2 rounded-xl border border-slate-800">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Comentaristas Contratados</span>
                        <span className="text-white font-bold text-sm">{commentators} profissionais</span>
                      </div>
                      <button 
                        onClick={() => {
                          const cost = 50000;
                          if (money < cost) {
                            setNotification({ message: 'Dinheiro insuficiente para contratar!', type: 'error' });
                            setTimeout(() => setNotification(null), 3000);
                            return;
                          }
                          setMoney(m => m - cost);
                          setCommentators(c => c + 1);
                          setNotification({ message: 'Comentarista contratado com sucesso!', type: 'success' });
                          setTimeout(() => setNotification(null), 3000);
                        }}
                        className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-all"
                        title="Contratar Comentarista ($50.000 + $2.000/mês)"
                      >
                        <UserPlus className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                
                {socialAccounts.length === 0 ? (
                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-center mb-6">
                    <p className="text-slate-400 mb-2">Você ainda não possui contas em redes sociais.</p>
                    <p className="text-sm text-slate-500 mt-2">Crie contas para engajar com o público e ganhar fãs organicamente.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-4">
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Suas Contas</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {socialAccounts.map((account, index) => (
                          <div key={index} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center group hover:border-cyan-500/50 transition-all">
                            <span className="font-bold text-white">{account.platform}</span>
                            <span className="text-cyan-400 font-bold">{formatNumber(account.followers)} fãs</span>
                          </div>
                        ))}
                      </div>
                      
                      <button 
                        onClick={() => {
                          const year = gameDate.getFullYear();
                          const allPlatforms = [
                            { name: 'Orkut', year: 2004 },
                            { name: 'Facebook', year: 2004 },
                            { name: 'Twitter', year: 2006 },
                            { name: 'Instagram', year: 2010 },
                            { name: 'TikTok', year: 2016 }
                          ];
                          
                          const availablePlatforms = allPlatforms
                            .filter(p => year >= p.year && !socialAccounts.find(sa => sa.platform === p.name))
                            .map(p => p.name);
                          
                          if (availablePlatforms.length === 0) {
                            setNotification({ message: 'Não há novas redes sociais disponíveis no momento!', type: 'info' });
                            setTimeout(() => setNotification(null), 3000);
                            return;
                          }

                          setPromptModal({
                            isOpen: true,
                            title: 'Criar Conta',
                            message: 'Em qual rede social você deseja criar uma conta?',
                            options: availablePlatforms,
                            onConfirm: (platform) => {
                              setSocialAccounts(s => [...s, { platform, followers: 0 }]);
                              setNotification({ message: `Conta criada no ${platform} com sucesso!`, type: 'success' });
                              setTimeout(() => setNotification(null), 3000);
                            },
                            onCancel: () => {}
                          });
                        }}
                        className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 text-sm"
                      >
                        <Plus className="w-4 h-4" /> CRIAR NOVA CONTA
                      </button>
                    </div>

                    <div className="lg:col-span-2">
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" /> Comentários Recentes
                      </h3>
                      <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden h-[300px] flex flex-col">
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                          {socialComments.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-slate-600 italic text-sm">
                              Nenhum comentário ainda...
                            </div>
                          ) : (
                            socialComments.map((comment) => (
                              <div key={comment.id} className="bg-slate-900/50 p-3 rounded-lg border border-slate-800/50">
                                <div className="flex justify-between items-start mb-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-xs text-white">{comment.author}</span>
                                    <span className="text-[10px] px-1.5 py-0.5 bg-slate-800 rounded text-slate-400">{comment.platform}</span>
                                    {comment.isHired && (
                                      <span className="bg-cyan-500/20 text-cyan-400 text-[9px] px-1.5 py-0.5 rounded-full border border-cyan-500/30 font-bold uppercase tracking-wider">
                                        Contratado
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {comment.sentiment === 'positive' && <ThumbsUp className="w-3 h-3 text-emerald-400" />}
                                    {comment.sentiment === 'negative' && <ThumbsDown className="w-3 h-3 text-rose-400" />}
                                    <span className="text-[10px] text-slate-500">{comment.date.toLocaleDateString()}</span>
                                  </div>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed">{comment.content}</p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {bands.length > 0 && (
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm md:col-span-3">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Mic className="w-5 h-5 text-indigo-400" /> Bandas e Shows
                </h2>
                <p className="text-slate-400 text-sm mb-6">Organize shows e turnês para suas bandas ganharem dinheiro e fãs.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bands.map(band => (
                    <div key={band.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="font-bold text-white text-lg">{band.name}</h3>
                          <p className="text-xs text-slate-500">{band.genre} • {band.members} integrantes</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {upgrades.find(u => u.id === 'shows_locais')?.level ? upgrades.find(u => u.id === 'shows_locais')!.level > 0 && (
                          <button 
                            onClick={() => organizeShow(band.id, 'local')}
                            className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg transition-all"
                          >
                            Show Local ({formatMoney(30000)})
                          </button>
                        ) : (
                          <button disabled className="flex-1 py-2 bg-slate-800 text-slate-500 text-sm font-bold rounded-lg cursor-not-allowed">
                            Pesquise Shows Locais
                          </button>
                        )}
                        
                        {upgrades.find(u => u.id === 'turne_mundial')?.level ? upgrades.find(u => u.id === 'turne_mundial')!.level > 0 && (
                          <button 
                            onClick={() => organizeShow(band.id, 'mundial')}
                            className="flex-1 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-lg transition-all"
                          >
                            Turnê Mundial ({formatMoney(150000)})
                          </button>
                        ) : (
                          <button disabled className="flex-1 py-2 bg-slate-800 text-slate-500 text-sm font-bold rounded-lg cursor-not-allowed">
                            Pesquise Turnês Mundiais
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-sm relative overflow-hidden md:col-span-3">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-pink-400" /> Mega Convenção Anual
                  </h3>
                  <p className="text-slate-400 mb-6">
                    Realize um evento anual massivo para seus fãs. Gera um hype absurdo para todos os seus próximos lançamentos e aumenta drasticamente sua base de fãs. Só pode ser realizado uma vez a cada 12 meses.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div className="text-sm text-slate-500 mb-1">Custo do Evento</div>
                      <div className="text-xl font-bold text-red-400">-{formatMoney(500000)}</div>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div className="text-sm text-slate-500 mb-1">Hype Multiplier</div>
                      <div className="text-xl font-bold text-emerald-400">2.5x</div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-auto">
                  <button
                    onClick={() => {
                      const now = Date.now();
                      const oneYear = 12 * 30 * 24 * 60 * 60 * 1000; // Approx 1 year in game time
                      
                      if (lastConventionDate && now - lastConventionDate < oneYear) {
                        setNotification({ message: 'Você já realizou uma convenção este ano! Aguarde.', type: 'error' });
                        setTimeout(() => setNotification(null), 3000);
                        return;
                      }

                      if (money >= 500000) {
                        setMoney(m => m - 500000);
                        setFans(f => f + Math.floor(Math.random() * 50000) + 20000);
                        setHypeMultiplier(2.5);
                        setLastConventionDate(now);
                        setNotification({ message: 'Mega Convenção realizada com sucesso! Hype no máximo!', type: 'success' });
                      } else {
                        setNotification({ message: 'Dinheiro insuficiente para realizar a convenção.', type: 'error' });
                      }
                      setTimeout(() => setNotification(null), 3000);
                    }}
                    className="w-full md:w-64 py-5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-black rounded-xl flex flex-col items-center justify-center gap-1 transition-all shadow-lg shadow-pink-500/25 active:scale-95"
                  >
                    <span className="uppercase tracking-widest text-sm">Realizar Evento</span>
                    <span className="text-xs text-pink-200 font-normal">Aumenta Hype Global</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: INFRA */}
        {activeTab === 'infra' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-400" /> Escritório
              </h2>
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-center mb-6">
                <p className="text-slate-400 mb-2">Nível Atual</p>
                <p className="text-3xl font-bold text-white">{officeLevel}</p>
                <p className="text-sm text-slate-500 mt-2">Capacidade: {officeLevel * 10} funcionários</p>
              </div>
              <button 
                onClick={() => {
                  const cost = officeLevel * 50000;
                  if (money >= cost) {
                    setMoney(m => m - cost);
                    setOfficeLevel(l => l + 1);
                  } else {
                    setNotification({ message: `Dinheiro insuficiente! Custa ${formatMoney(cost)} para expandir.`, type: 'error' });
                    setTimeout(() => setNotification(null), 3000);
                  }
                }}
                className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <Plus className="w-5 h-5" /> EXPANDIR ESCRITÓRIO ({formatMoney(officeLevel * 50000)})
              </button>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Store className="w-5 h-5 text-rose-400" /> Lojas Físicas
              </h2>
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-center mb-6">
                <p className="text-slate-400 mb-2">Lojas Abertas</p>
                <p className="text-3xl font-bold text-white">{stores.length}</p>
                <p className="text-sm text-slate-500 mt-2">Renda mensal: {formatMoney(stores.reduce((acc, s) => acc + s.level * 10000, 0))}</p>
              </div>
              <button 
                onClick={() => {
                  const cost = 100000 * (stores.length + 1);
                  if (money >= cost) {
                    setMoney(m => m - cost);
                    setStores(s => [...s, { name: `Loja ${s.length + 1}`, level: 1 }]);
                  } else {
                    setNotification({ message: `Dinheiro insuficiente! Custa ${formatMoney(cost)} para abrir uma nova loja.`, type: 'error' });
                    setTimeout(() => setNotification(null), 3000);
                  }
                }}
                className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-500/20 active:scale-95"
              >
                <Plus className="w-5 h-5" /> ABRIR NOVA LOJA ({formatMoney(100000 * (stores.length + 1))})
              </button>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" /> Laboratório de Pesquisa
              </h2>
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-center mb-6">
                <p className="text-slate-400 mb-2">Laboratórios Ativos</p>
                <p className="text-3xl font-bold text-white">{researchLabs}</p>
                <p className="text-sm text-slate-500 mt-2">Aumenta a eficiência dos pesquisadores em 50%</p>
              </div>
              <button 
                onClick={() => {
                  const cost = 250000 * (researchLabs + 1);
                  if (money >= cost) {
                    setMoney(m => m - cost);
                    setResearchLabs(l => l + 1);
                  } else {
                    setNotification({ message: `Dinheiro insuficiente! Custa ${formatMoney(cost)} para construir um laboratório.`, type: 'error' });
                    setTimeout(() => setNotification(null), 3000);
                  }
                }}
                className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
              >
                <Plus className="w-5 h-5" /> CONSTRUIR LABORATÓRIO ({formatMoney(250000 * (researchLabs + 1))})
              </button>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-orange-400" /> Fábricas
              </h2>
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-center mb-6">
                <p className="text-slate-400 mb-2">Fábricas Ativas</p>
                <p className="text-3xl font-bold text-white">{factories}</p>
                <p className="text-sm text-slate-500 mt-2">Aumenta as vendas de produtos físicos e permite produzir Merchandising</p>
              </div>
              <button 
                onClick={() => {
                  const cost = 500000 * (factories + 1);
                  if (money >= cost) {
                    setMoney(m => m - cost);
                    setFactories(f => f + 1);
                  } else {
                    setNotification({ message: `Dinheiro insuficiente! Custa ${formatMoney(cost)} para construir uma fábrica.`, type: 'error' });
                    setTimeout(() => setNotification(null), 3000);
                  }
                }}
                className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/20 active:scale-95"
              >
                <Plus className="w-5 h-5" /> CONSTRUIR FÁBRICA ({formatMoney(500000 * (factories + 1))})
              </button>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm md:col-span-2">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-fuchsia-400" /> Plataforma de Streaming
              </h2>
              
              {!hasStreaming ? (
                <div className="text-center">
                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 mb-6">
                    <p className="text-slate-400 mb-2">Você ainda não possui sua própria plataforma de streaming.</p>
                    <p className="text-sm text-slate-500 mt-2">Crie seu próprio serviço (estilo Netflix/Spotify) para gerar receita recorrente com todo o seu catálogo de lançamentos.</p>
                  </div>
                  <button 
                    onClick={() => {
                      if (money >= 1000000) {
                        setMoney(m => m - 1000000);
                        setHasStreaming(true);
                        setServers(1);
                        setNotification({ message: 'Plataforma de Streaming lançada com sucesso!', type: 'success' });
                        setTimeout(() => setNotification(null), 3000);
                      } else {
                        setNotification({ message: `Dinheiro insuficiente! Custa ${formatMoney(1000000)} para lançar a plataforma.`, type: 'error' });
                        setTimeout(() => setNotification(null), 3000);
                      }
                    }}
                    className="w-full py-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-fuchsia-500/20 active:scale-95"
                  >
                    <Plus className="w-5 h-5" /> LANÇAR PLATAFORMA DE STREAMING ({formatMoney(1000000)})
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-center">
                    <p className="text-slate-400 mb-2">Assinantes Ativos</p>
                    <p className="text-3xl font-bold text-fuchsia-400">{formatNumber(subscribers)}</p>
                    <p className="text-sm text-slate-500 mt-2">Renda Mensal: <span className="text-emerald-400">+{formatMoney(subscribers * 15)}</span></p>
                  </div>
                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-center">
                    <p className="text-slate-400 mb-2">Catálogo</p>
                    <p className="text-3xl font-bold text-white">{history.length}</p>
                    <p className="text-sm text-slate-500 mt-2">Lançamentos disponíveis</p>
                  </div>
                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-center">
                    <p className="text-slate-400 mb-2">Servidores</p>
                    <p className="text-3xl font-bold text-white">{servers}</p>
                    <p className="text-sm text-slate-500 mt-2">Capacidade: {formatNumber(servers * 500000)} assinantes</p>
                    <button 
                      onClick={() => {
                        const cost = 250000 * servers;
                        if (money >= cost) {
                          setMoney(m => m - cost);
                          setServers(s => s + 1);
                        } else {
                          setNotification({ message: `Dinheiro insuficiente! Custa ${formatMoney(cost)} para adicionar um servidor.`, type: 'error' });
                          setTimeout(() => setNotification(null), 3000);
                        }
                      }}
                      className="w-full mt-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-lg transition-all"
                    >
                      + SERVIDOR ({formatMoney(250000 * servers)})
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm md:col-span-2">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-400" /> Empresas Subsidiárias
              </h2>
              {companies.length === 0 ? (
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-center mb-6">
                  <p className="text-slate-400 mb-2">Você ainda não possui empresas subsidiárias.</p>
                  <p className="text-sm text-slate-500 mt-2">Crie empresas para diversificar seus negócios e gerar renda passiva.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {companies.map(company => (
                    <div key={company.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <h3 className="font-bold text-white">{company.name}</h3>
                      <p className="text-xs text-indigo-400 mb-2">{company.type}</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Valor:</span>
                        <span className="text-white">{formatMoney(company.value)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Renda/mês:</span>
                        <span className="text-emerald-400">+{formatMoney(company.income)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button 
                onClick={() => {
                  const cost = 500000;
                  if (money >= cost) {
                    setPromptModal({
                      isOpen: true,
                      title: 'Nova Empresa',
                      message: 'Qual será o nome da sua nova empresa subsidiária?',
                      onConfirm: (companyName) => {
                        const types = ['Estúdio Indie', 'Agência de Marketing', 'Empresa de Hardware', 'Provedor de Nuvem', 'Empresa Tradicional'];
                        setPromptModal({
                          isOpen: true,
                          title: 'Tipo de Empresa',
                          message: 'Qual o tipo da empresa?',
                          options: types,
                          onConfirm: (typeInput) => {
                            const income = Math.floor(Math.random() * 20000) + 10000;
                            setMoney(m => m - cost);
                            setCompanies(c => [...c, {
                              id: Date.now() + Math.random(),
                              name: companyName,
                              type: typeInput,
                              value: cost,
                              income: income
                            }]);
                            setNotification({ message: `Empresa ${companyName} fundada com sucesso!`, type: 'success' });
                            setTimeout(() => setNotification(null), 3000);
                          },
                          onCancel: () => {}
                        });
                      },
                      onCancel: () => {}
                    });
                  } else {
                    setNotification({ message: `Dinheiro insuficiente! Custa ${formatMoney(cost)} para fundar uma empresa.`, type: 'error' });
                    setTimeout(() => setNotification(null), 3000);
                  }
                }}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
              >
                <Plus className="w-5 h-5" /> FUNDAR NOVA EMPRESA ({formatMoney(500000)})
              </button>
            </div>
          </div>
        )}

        {/* TAB: MARKET */}
        {activeTab === 'market' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-emerald-400" /> Banco Central
              </h2>
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-center mb-6">
                <p className="text-slate-400 mb-2">Status do Banco</p>
                <p className="text-2xl font-bold text-white">{bankOwned ? 'Proprietário' : 'Cliente'}</p>
                {bankOwned && <p className="text-sm text-emerald-400 mt-2">+ {formatMoney(50000)} / mês</p>}
              </div>
              {!bankOwned && (
                <button 
                  onClick={() => {
                    if (money >= 1000000) {
                      setMoney(m => m - 1000000);
                      setBankOwned(true);
                    } else {
                      setNotification({ message: 'Dinheiro insuficiente para comprar o banco!', type: 'error' });
                      setTimeout(() => setNotification(null), 3000);
                    }
                  }}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  <ShoppingCart className="w-5 h-5" /> COMPRAR BANCO ({formatMoney(1000000)})
                </button>
              )}
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" /> Mercado de Ações
              </h2>
              
              <div className="mb-6 p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-xl">
                <h3 className="font-bold text-white mb-2">Sua Empresa</h3>
                {!playerCompany.isPublic ? (
                  <button 
                    onClick={() => {
                      if (history.length >= 3) {
                        setPlayerCompany(p => ({ ...p, isPublic: true }));
                        setMoney(m => m + 5000000); // IPO bonus
                        setNotification({ message: 'IPO realizado com sucesso! +$5.000.000', type: 'success' });
                        setTimeout(() => setNotification(null), 3000);
                      } else {
                        setNotification({ message: 'Você precisa lançar pelo menos 3 produtos para fazer o IPO.', type: 'error' });
                        setTimeout(() => setNotification(null), 3000);
                      }
                    }}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors"
                  >
                    Fazer IPO (Abrir Capital)
                  </button>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-slate-400">Valor da Ação</p>
                      <p className="text-xl font-bold text-indigo-400">{formatMoney(playerCompany.sharePrice)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-400">Status</p>
                      <p className="text-sm font-bold text-emerald-400">Capital Aberto</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-slate-300 text-sm uppercase tracking-wider">Empresas Rivais</h3>
                {stocks.map(stock => (
                  <div key={stock.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-white">{stock.name}</h3>
                      <p className="text-sm text-slate-400">{formatMoney(stock.price)} / ação</p>
                      <p className="text-xs text-blue-400 mt-1">Possui: {stock.owned}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          if (money >= stock.price) {
                            setMoney(m => m - stock.price);
                            setStocks(s => s.map(st => st.id === stock.id ? { ...st, owned: st.owned + 1 } : st));
                          }
                        }}
                        className="px-3 py-2 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors font-bold text-sm"
                      >
                        C
                      </button>
                      <button 
                        onClick={() => {
                          if (stock.owned > 0) {
                            setMoney(m => m + stock.price);
                            setStocks(s => s.map(st => st.id === stock.id ? { ...st, owned: st.owned - 1 } : st));
                          }
                        }}
                        className="px-3 py-2 bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white rounded-lg transition-colors font-bold text-sm"
                      >
                        V
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                <FileText className="w-8 h-8 text-indigo-400" /> Histórico de Lançamentos
              </h2>
            </div>
            
            {history.length === 0 ? (
              <div className="bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-[32px] p-20 text-center">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                  <FileText className="w-10 h-10 text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Nenhum produto lançado</h3>
                <p className="text-slate-400 max-w-md mx-auto">Seus lançamentos aparecerão aqui após você finalizar o desenvolvimento e lançar no mercado.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {history.slice().reverse().map((game, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={game.id} 
                    className="bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-slate-800/80 transition-all group"
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg ${
                        game.score >= 8 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                        game.score >= 5 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 
                        'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {game.score.toFixed(1)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{game.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{game.genre}</span>
                          <span className="w-1 h-1 bg-slate-700 rounded-full" />
                          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{game.platform}</span>
                          {game.theme && (
                            <>
                              <span className="w-1 h-1 bg-slate-700 rounded-full" />
                              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">{game.theme}</span>
                            </>
                          )}
                          {game.visualStyle && (
                            <>
                              <span className="w-1 h-1 bg-slate-700 rounded-full" />
                              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">{game.visualStyle}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-12">
                      <div className="text-center">
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Vendas</p>
                        <p className="text-lg font-black text-white tracking-tight">{formatNumber(game.sales)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Receita</p>
                        <p className="text-lg font-black text-emerald-400 tracking-tight">{formatMoney(game.revenue)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] uppercase font-bold text-purple-400">
                            {(game.type === 'Filme' || game.type === 'Série' || game.type === 'Programa de TV') ? 'Roteiro/Dir' : 'Design'}: {game.design}
                          </span>
                          <span className="text-[10px] uppercase font-bold text-blue-400">
                            {(game.type === 'Filme' || game.type === 'Série' || game.type === 'Programa de TV') ? 'Produção/VFX' : 'Tech'}: {game.tech}
                          </span>
                        </div>
                      </div>
                      
                      {game.score >= 7.0 && (
                        <div className="flex flex-col gap-2 min-w-[140px]">
                          {game.hasMerch ? (
                            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold py-2 px-3 rounded-xl text-center flex items-center justify-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Merch Ativo
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                if (factories === 0) {
                                  setNotification({ message: 'Você precisa de pelo menos 1 Fábrica (aba Infra) para produzir Merchandising!', type: 'error' });
                                  setTimeout(() => setNotification(null), 4000);
                                  return;
                                }
                                if (money < 50000) {
                                  setNotification({ message: 'Dinheiro insuficiente para iniciar a produção de Merchandising ($50.000)!', type: 'error' });
                                  setTimeout(() => setNotification(null), 4000);
                                  return;
                                }
                                setMoney(m => m - 50000);
                                setHistory(h => h.map(g => g.id === game.id ? { ...g, hasMerch: true } : g));
                                setNotification({ message: `Merchandising de ${game.name} lançado! Gerando renda passiva nas fábricas.`, type: 'success' });
                                setTimeout(() => setNotification(null), 4000);
                              }}
                              className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold py-2 px-3 rounded-xl transition-all shadow-lg shadow-purple-500/20 active:scale-95 flex items-center justify-center gap-1"
                            >
                              <ShoppingCart className="w-3 h-3" /> Lançar Merch
                            </button>
                          )}

                          {game.hasEsports ? (
                            <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold py-2 px-3 rounded-xl text-center flex items-center justify-center gap-1">
                              <Trophy className="w-3 h-3" /> eSports Ativo
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                if (money < 1000000) {
                                  setNotification({ message: 'Dinheiro insuficiente para iniciar uma Liga de eSports ($1.000.000)!', type: 'error' });
                                  setTimeout(() => setNotification(null), 4000);
                                  return;
                                }
                                setMoney(m => m - 1000000);
                                setHistory(h => h.map(g => g.id === game.id ? { ...g, hasEsports: true } : g));
                                setNotification({ message: `Liga de eSports de ${game.name} criada! Gerando renda passiva e fãs.`, type: 'success' });
                                setTimeout(() => setNotification(null), 4000);
                              }}
                              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 px-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-1"
                            >
                              <Trophy className="w-3 h-3" /> Criar Liga eSports
                            </button>
                          )}
                        </div>
                      )}

                      {game.isSubscription && (
                        <div className="flex flex-col gap-2 min-w-[140px]">
                          {game.isActive ? (
                            <>
                              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold py-2 px-3 rounded-xl text-center flex flex-col items-center justify-center gap-1">
                                <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Serviço Ativo</span>
                                <span className="text-[10px] text-emerald-500/80">{formatNumber(game.activeSubscribers || 0)} assinantes</span>
                              </div>
                              <button
                                onClick={() => {
                                  setHistory(h => h.map(g => g.id === game.id ? { ...g, isActive: false } : g));
                                  setNotification({ message: `Serviço ${game.name} encerrado.`, type: 'success' });
                                  setTimeout(() => setNotification(null), 4000);
                                }}
                                className="bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white text-xs font-bold py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1"
                              >
                                Encerrar Serviço
                              </button>
                            </>
                          ) : (
                            <div className="bg-slate-800/50 border border-slate-700 text-slate-500 text-xs font-bold py-2 px-3 rounded-xl text-center flex items-center justify-center gap-1">
                              Serviço Encerrado
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB: STATS */}
        {activeTab === 'stats' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-indigo-400" /> Estatísticas Globais
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-[32px] p-8">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Receita Total</p>
                <p className="text-3xl font-black text-emerald-400 tracking-tight">
                  {formatMoney(history.reduce((acc, g) => acc + g.revenue, 0))}
                </p>
              </div>
              <div className="bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-[32px] p-8">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Vendas Totais</p>
                <p className="text-3xl font-black text-white tracking-tight">
                  {formatNumber(history.reduce((acc, g) => acc + g.sales, 0))}
                </p>
              </div>
              <div className="bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-[32px] p-8">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Média de Notas</p>
                <p className="text-3xl font-black text-amber-400 tracking-tight">
                  {history.length > 0 ? (history.reduce((acc, g) => acc + g.score, 0) / history.length).toFixed(1) : '0.0'}
                </p>
              </div>
              <div className="bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-[32px] p-8">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Produtos</p>
                <p className="text-3xl font-black text-indigo-400 tracking-tight">{history.length}</p>
              </div>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-[40px] p-10">
              <h3 className="text-xl font-bold text-white mb-8">Crescimento da Empresa</h3>
              <div className="h-64 flex items-end gap-2">
                {history.slice(-15).map((game, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div 
                      className="w-full bg-indigo-500/40 rounded-t-lg group-hover:bg-indigo-500 transition-all"
                      style={{ height: `${(game.score / 10) * 100}%` }}
                    />
                    <span className="text-[8px] text-slate-500 font-bold uppercase truncate w-full text-center">{game.name}</span>
                  </div>
                ))}
                {history.length === 0 && (
                  <div className="w-full h-full flex items-center justify-center text-slate-600 font-bold uppercase tracking-widest text-sm">
                    Dados insuficientes para o gráfico
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* TAB: AWARDS */}
        {activeTab === 'awards' && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                <Trophy className="w-8 h-8 text-amber-400" /> Sala de Troféus
              </h2>
              <div className="bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20">
                <span className="text-amber-400 font-bold text-sm uppercase tracking-widest">Total: {awardsWon.length}</span>
              </div>
            </div>

            {awardsWon.length === 0 ? (
              <div className="bg-slate-900/40 border border-white/5 rounded-[32px] p-12 text-center">
                <Trophy className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-400 mb-2">Sua estante está vazia</h3>
                <p className="text-slate-500 text-sm">Continue lançando produtos de sucesso para ser convidado para eventos e ganhar prêmios!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {awardsWon.map((award, index) => (
                  <div key={index} className="bg-slate-900/80 backdrop-blur-md border border-amber-500/20 rounded-[32px] p-6 flex flex-col items-center text-center group hover:bg-slate-800/80 transition-all shadow-[0_0_30px_rgba(245,158,11,0.05)]">
                    <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/30 mb-4 group-hover:scale-110 transition-transform">
                      <Trophy className="w-10 h-10 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2">{award.name}</h3>
                    <p className="text-slate-400 text-xs mb-4">{award.description}</p>
                    <div className="mt-auto bg-black/40 px-3 py-1 rounded-lg border border-white/5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{formatDate(award.date)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB: FINANCE */}
        {activeTab === 'finance' && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                <PieChart className="w-8 h-8 text-emerald-400" /> Finanças
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Resumo Financeiro */}
              <div className="bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-[32px] p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" /> Resumo
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Saldo Atual</span>
                    <span className="text-2xl font-black text-white">{formatMoney(money)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Receita Mensal (Lojas & Empresas)</span>
                    <span className="text-xl font-bold text-emerald-400">
                      +{formatMoney((bankOwned ? 50000 : 0) + stores.reduce((acc, s) => acc + s.level * 10000, 0) + companies.reduce((acc, c) => acc + c.income, 0))}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Receita Mensal (Assinaturas SaaS)</span>
                    <span className="text-xl font-bold text-emerald-400">
                      +{formatMoney(history.filter(g => g.isSubscription && g.isActive).reduce((acc, g) => acc + (g.activeSubscribers || 0) * (g.monthlyFee || 0), 0))}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Despesa Mensal (Empréstimos)</span>
                    <span className="text-xl font-bold text-red-400">
                      -{formatMoney(loans.reduce((acc, l) => acc + Math.ceil(l.remaining * 0.05), 0))}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Despesa Mensal (Manutenção SaaS)</span>
                    <span className="text-xl font-bold text-red-400">
                      -{formatMoney(history.filter(g => g.isSubscription && g.isActive).reduce((acc, g) => acc + (g.maintenanceCost || 0), 0))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Empréstimos */}
              <div className="bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-[32px] p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-400" /> Empréstimos
                </h3>
                <div className="space-y-4 mb-6">
                  {loans.length === 0 ? (
                    <p className="text-slate-500 text-sm italic">Nenhum empréstimo ativo.</p>
                  ) : (
                    loans.map((loan, idx) => (
                      <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-bold">Empréstimo {idx + 1}</span>
                          <span className="text-red-400 font-bold">{formatMoney(loan.remaining)}</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(loan.remaining / loan.amount) * 100}%` }}></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">Pagamento mensal: {formatMoney(Math.ceil(loan.remaining * 0.05))}</p>
                      </div>
                    ))
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => {
                      setMoney(m => m + 100000);
                      setLoans(l => [...l, { amount: 100000, remaining: 100000 }]);
                    }}
                    className="py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all border border-slate-700 text-sm"
                  >
                    Pegar $100k
                  </button>
                  <button 
                    onClick={() => {
                      setMoney(m => m + 500000);
                      setLoans(l => [...l, { amount: 500000, remaining: 500000 }]);
                    }}
                    className="py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all border border-slate-700 text-sm"
                  >
                    Pegar $500k
                  </button>
                </div>
              </div>

              {/* Ações (Mercado Financeiro) */}
              <div className="bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-[32px] p-8 md:col-span-2">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" /> Mercado de Ações
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stocks.map(stock => (
                    <div key={stock.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-white font-bold">{stock.name}</h4>
                          <p className="text-xs text-slate-500">Suas ações: {stock.owned}</p>
                        </div>
                        <span className="text-emerald-400 font-bold">{formatMoney(stock.price)}</span>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            if (money >= stock.price) {
                              setMoney(m => m - stock.price);
                              setStocks(s => s.map(st => st.id === stock.id ? { ...st, owned: st.owned + 1 } : st));
                            }
                          }}
                          disabled={money < stock.price}
                          className="flex-1 py-2 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 font-bold rounded-lg transition-all border border-emerald-500/30 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Comprar 1
                        </button>
                        <button 
                          onClick={() => {
                            if (stock.owned > 0) {
                              setMoney(m => m + stock.price);
                              setStocks(s => s.map(st => st.id === stock.id ? { ...st, owned: st.owned - 1 } : st));
                            }
                          }}
                          disabled={stock.owned === 0}
                          className="flex-1 py-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 font-bold rounded-lg transition-all border border-red-500/30 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Vender 1
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: CALENDAR */}
        {activeTab === 'calendar' && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                <Calendar className="w-8 h-8 text-blue-400" /> Calendário
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-[32px] p-8 text-center flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-700 mb-6 relative">
                  <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
                  <div className="text-center">
                    <p className="text-sm text-slate-400 uppercase font-bold tracking-widest">{gameDate.toLocaleString('pt-BR', { month: 'short' })}</p>
                    <p className="text-4xl font-black text-white">{gameDate.getFullYear()}</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Data Atual</h3>
                <p className="text-slate-500 text-sm">O tempo avança automaticamente a cada mês.</p>
              </div>

              <div className="md:col-span-2 bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-[32px] p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400" /> Histórico de Eventos
                </h3>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  <p className="text-slate-500 text-sm italic text-center py-8">Nenhum evento registrado ainda.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: STORE */}
        {activeTab === 'store' && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                <ShoppingCart className="w-8 h-8 text-purple-400" /> Loja e Distribuição
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-[32px] p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Store className="w-5 h-5 text-purple-400" /> Suas Lojas Físicas
                </h3>
                <div className="space-y-4 mb-6">
                  {stores.length === 0 ? (
                    <p className="text-slate-500 text-sm italic">Você ainda não possui lojas físicas.</p>
                  ) : (
                    stores.map((store, idx) => (
                      <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                        <div>
                          <h4 className="text-white font-bold">{store.name}</h4>
                          <p className="text-xs text-slate-500">Nível {store.level} • Receita: {formatMoney(store.level * 10000)}/mês</p>
                        </div>
                        <button 
                          onClick={() => {
                            const upgradeCost = store.level * 50000;
                            if (money >= upgradeCost) {
                              setMoney(m => m - upgradeCost);
                              setStores(s => s.map((st, i) => i === idx ? { ...st, level: st.level + 1 } : st));
                            }
                          }}
                          disabled={money < store.level * 50000}
                          className="px-4 py-2 bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 font-bold rounded-lg transition-all border border-purple-500/30 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Melhorar ({formatMoney(store.level * 50000)})
                        </button>
                      </div>
                    ))
                  )}
                </div>
                <button 
                  onClick={() => {
                    const cost = 100000 * (stores.length + 1);
                    if (money >= cost) {
                      setMoney(m => m - cost);
                      setStores(s => [...s, { name: `Loja ${city} #${s.length + 1}`, level: 1 }]);
                    }
                  }}
                  disabled={money < 100000 * (stores.length + 1)}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all border border-slate-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Abrir Nova Loja ({formatMoney(100000 * (stores.length + 1))})
                </button>
              </div>

              <div className="bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-[32px] p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-400" /> Distribuição Digital
                </h3>
                <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <MonitorPlay className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-white mb-2">Plataforma Própria</h4>
                  <p className="text-slate-400 text-sm mb-6">Crie sua própria loja digital para vender seus produtos sem pagar taxas para terceiros.</p>
                  <button 
                    disabled
                    className="w-full py-3 bg-slate-800 text-slate-500 font-bold rounded-xl border border-slate-700 text-sm cursor-not-allowed"
                  >
                    Em breve (Requer Pesquisa)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: WORLD */}
        {activeTab === 'world' && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                <Globe className="w-8 h-8 text-cyan-400" /> Mercado Global
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-[32px] p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-cyan-400" /> Aquisições
                </h3>
                <div className="space-y-4">
                  {companies.map(company => (
                    <div key={company.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-white font-bold">{company.name}</h4>
                          <p className="text-xs text-slate-500">{company.type} • Receita: {formatMoney(company.income)}/mês</p>
                        </div>
                        <span className="text-emerald-400 font-bold">{formatMoney(company.cost)}</span>
                      </div>
                      <button 
                        onClick={() => {
                          if (money >= company.cost && !company.owned) {
                            setMoney(m => m - company.cost);
                            setCompanies(c => c.map(comp => comp.id === company.id ? { ...comp, owned: true } : comp));
                          }
                        }}
                        disabled={money < company.cost || company.owned}
                        className={`w-full py-2 font-bold rounded-lg transition-all border text-xs ${
                          company.owned 
                            ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed' 
                            : 'bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600/30 border-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed'
                        }`}
                      >
                        {company.owned ? 'Adquirida' : 'Comprar Empresa'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-[32px] p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-indigo-400" /> Market Share Global
                </h3>
                <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-4 h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                  {[...rivals, { id: 0, name: companyName || 'Sua Empresa', marketShare: playerMarketShare, fans: fans, isPlayer: true }]
                    .sort((a, b) => b.marketShare - a.marketShare)
                    .map((company, index) => (
                      <div key={company.id} className={`p-4 rounded-xl border flex items-center justify-between ${company.isPlayer ? 'bg-indigo-900/40 border-indigo-500/50' : 'bg-slate-900 border-slate-800'}`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${company.isPlayer ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                            {index + 1}
                          </div>
                          <div>
                            <h4 className={`font-bold ${company.isPlayer ? 'text-indigo-400' : 'text-white'}`}>
                              {company.name} {company.isPlayer && '(Você)'}
                            </h4>
                            <p className="text-xs text-slate-500">
                              {formatNumber(company.fans)} fãs
                              {!company.isPlayer && (company as Rival).lastRelease && ` • Último: ${(company as Rival).lastRelease!.name} (${(company as Rival).lastRelease!.score.toFixed(1)})`}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-black text-white">{company.marketShare.toFixed(1)}%</div>
                          <div className="w-24 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                            <div className={`h-full rounded-full ${company.isPlayer ? 'bg-indigo-500' : 'bg-slate-500'}`} style={{ width: `${company.marketShare}%` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                <Settings className="w-8 h-8 text-slate-400" /> Configurações
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-[32px] p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-slate-400" /> Dados do Jogo
                </h3>
                <div className="space-y-4">
                  <button 
                    onClick={() => {
                      const saveData = {
                        money, fans, history, awardsWon, activeTab,
                        officeLevel, stores, researchLabs, factories, researchPoints, techLevel, upgrades,
                        bankOwned, loans, stocks, socialAccounts, companies, gameDate, staff,
                        playerStats, perks, ceoName, companyName, country, stateName, city
                      };
                      localStorage.setItem('mediaTechTycoonSave', JSON.stringify(saveData));
                      setNotification({ message: 'Jogo salvo com sucesso!', type: 'success' });
                      setTimeout(() => setNotification(null), 3000);
                    }}
                    className="w-full py-4 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 font-bold rounded-xl transition-all border border-indigo-500/30 flex items-center justify-center gap-2"
                  >
                    <FileText className="w-5 h-5" /> Salvar Jogo
                  </button>
                  <button 
                    onClick={() => {
                      const saveData = localStorage.getItem('mediaTechTycoonSave');
                      if (saveData) {
                        try {
                          const data = JSON.parse(saveData);
                          setMoney(data.money); setFans(data.fans); setHistory(data.history); setAwardsWon(data.awardsWon); setActiveTab(data.activeTab);
                          setOfficeLevel(data.officeLevel); setStores(data.stores); setResearchLabs(data.researchLabs); setFactories(data.factories); 
                          if (data.hasStreaming !== undefined) setHasStreaming(data.hasStreaming);
                          if (data.subscribers !== undefined) setSubscribers(data.subscribers);
                          if (data.servers !== undefined) setServers(data.servers);
                          setResearchPoints(data.researchPoints); setTechLevel(data.techLevel); 
                          if (data.hardware) setHardware(data.hardware);
                          if (data.hiredVips) setHiredVips(data.hiredVips);
                          if (data.hypeMultiplier !== undefined) setHypeMultiplier(data.hypeMultiplier);
                          if (data.lastConventionDate !== undefined) setLastConventionDate(data.lastConventionDate);
                          if (data.upgrades) {
                            setUpgrades(DEFAULT_UPGRADES.map(def => {
                              const saved = data.upgrades.find((u: any) => u.id === def.id);
                              return saved ? { ...def, level: saved.level } : def;
                            }));
                          }
                          setBankOwned(data.bankOwned); setLoans(data.loans); setStocks(data.stocks); setSocialAccounts(data.socialAccounts); setCompanies(data.companies); setGameDate(new Date(data.gameDate)); setStaff(data.staff);
                          setPlayerStats(data.playerStats); setPerks(data.perks); setCeoName(data.ceoName); setCompanyName(data.companyName); setCountry(data.country); setStateName(data.stateName); setCity(data.city);
                          setNotification({ message: 'Jogo carregado com sucesso!', type: 'success' });
                        } catch (e) {
                          setNotification({ message: 'Erro ao carregar o jogo salvo.', type: 'error' });
                        }
                      } else {
                        setNotification({ message: 'Nenhum jogo salvo encontrado.', type: 'info' });
                      }
                      setTimeout(() => setNotification(null), 3000);
                    }}
                    className="w-full py-4 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 font-bold rounded-xl transition-all border border-emerald-500/30 flex items-center justify-center gap-2"
                  >
                    <FileText className="w-5 h-5" /> Carregar Jogo
                  </button>
                  <button 
                    onClick={() => {
                      setPromptModal({
                        isOpen: true,
                        title: 'Reiniciar Jogo',
                        message: 'Tem certeza que deseja reiniciar o jogo? Todo o seu progresso será perdido.',
                        options: ['Sim, reiniciar', 'Cancelar'],
                        onConfirm: (opt) => {
                          if (opt === 'Sim, reiniciar') {
                            localStorage.removeItem('tycoon_save');
                            localStorage.removeItem('mediaTechTycoonSave');
                            window.location.reload();
                          }
                        },
                        onCancel: () => {}
                      });
                    }}
                    className="w-full py-4 bg-red-600/20 text-red-400 hover:bg-red-600/30 font-bold rounded-xl transition-all border border-red-500/30 flex items-center justify-center gap-2 mt-8"
                  >
                    <AlertTriangle className="w-5 h-5" /> Reiniciar Jogo
                  </button>
                </div>
              </div>

              <div className="bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-[32px] p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-slate-400" /> Preferências
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Volume do Som</label>
                    <input type="range" min="0" max="100" defaultValue="50" className="w-full accent-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Qualidade Gráfica</label>
                    <select defaultValue="Alta" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 appearance-none">
                      <option>Baixa</option>
                      <option>Média</option>
                      <option>Alta</option>
                      <option>Ultra</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 font-medium">Modo Daltônico</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-2xl border-t border-white/10 z-50 px-4 py-3"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-1">
          <div className="flex items-center gap-1">
            <NavButton active={activeTab === 'research'} onClick={() => setActiveTab('research')} icon={<GraduationCap className="w-5 h-5" />} label="" />
            <NavButton active={activeTab === 'hr'} onClick={() => setActiveTab('hr')} icon={<Users className="w-5 h-5" />} label="" />
            <NavButton active={activeTab === 'marketing'} onClick={() => setActiveTab('marketing')} icon={<Target className="w-5 h-5" />} label="" />
            <NavButton active={activeTab === 'studio'} onClick={() => setActiveTab('studio')} icon={<LayoutGrid className="w-5 h-5" />} label="" />
            <NavButton active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} icon={<BarChart3 className="w-5 h-5" />} label="" />
            <NavButton active={activeTab === 'finance'} onClick={() => setActiveTab('finance')} icon={<PieChart className="w-5 h-5" />} label="" />
            <NavButton active={activeTab === 'calendar'} onClick={() => setActiveTab('calendar')} icon={<Calendar className="w-5 h-5" />} label="" />
          </div>

          <div className="relative -top-6">
            <button 
              onClick={() => setIsProductSelectOpen(true)}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] border-4 border-slate-950 hover:scale-110 active:scale-95 transition-all group"
            >
              <Plus className="w-8 h-8 text-slate-900 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <NavButton active={activeTab === 'history'} onClick={() => setActiveTab('history')} icon={<FileText className="w-5 h-5" />} label="" />
            <NavButton active={activeTab === 'store'} onClick={() => setActiveTab('store')} icon={<ShoppingCart className="w-5 h-5" />} label="" />
            <NavButton active={activeTab === 'infra'} onClick={() => setActiveTab('infra')} icon={<Building2 className="w-5 h-5" />} label="" />
            <NavButton active={activeTab === 'awards'} onClick={() => setActiveTab('awards')} icon={<Trophy className="w-5 h-5" />} label="" />
            <NavButton active={activeTab === 'world'} onClick={() => setActiveTab('world')} icon={<Globe className="w-5 h-5" />} label="" />
            <NavButton active={activeTab === 'market'} onClick={() => setActiveTab('market')} icon={<Landmark className="w-5 h-5" />} label="" />
            <NavButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={<Settings className="w-5 h-5" />} label="" />
          </div>
        </div>
      </motion.nav>

      {/* MODAL: SELECIONAR PRODUTO */}
      {isProductSelectOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 w-full max-w-3xl rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {selectedCategory ? (
                  <button onClick={() => setSelectedCategory(null)} className="hover:text-indigo-400 transition-colors flex items-center gap-1">
                    <ChevronLeft className="w-5 h-5" /> Voltar
                  </button>
                ) : (
                  <><Plus className="w-5 h-5 text-indigo-400"/> O que você deseja criar?</>
                )}
              </h2>
              <button onClick={() => { setIsProductSelectOpen(false); setSelectedCategory(null); }} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              {!selectedCategory ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { id: 'Software & Jogos', icon: <Gamepad2 className="w-8 h-8 text-indigo-400" />, desc: 'Jogos, Apps e Sistemas' },
                    { id: 'Hardware & Dispositivos', icon: <Cpu className="w-8 h-8 text-emerald-400" />, desc: 'Consoles, PCs e Celulares' },
                    { id: 'Mídia & Entretenimento', icon: <MonitorPlay className="w-8 h-8 text-rose-400" />, desc: 'Filmes, Séries e Músicas' },
                    { id: 'Físico & Impresso', icon: <Book className="w-8 h-8 text-amber-400" />, desc: 'Livros, Revistas e Brinquedos' },
                    { id: 'Construções', icon: <Building2 className="w-8 h-8 text-sky-400" />, desc: 'Prédios, Fábricas e Lojas' }
                  ].map(cat => {
                    // Check if category has any available products
                    const availableTypes = getAvailableProductTypes(gameDate.getFullYear());
                    const categoryProducts = {
                      'Software & Jogos': ['Jogo', 'Jogo Online', 'Aplicativo', 'Sistema Operacional', 'Motor Gráfico', 'Plataforma Digital', 'Rede Social', 'Site', 'Inteligência Artificial', 'Realidade Virtual', 'Criptomoeda', 'Metaverso', 'Carro Autônomo (Software)', 'Plataforma de Streaming', 'Navegador Web', 'Aplicativo de Relacionamento', 'Assistente Virtual', 'Software de Edição'],
                      'Hardware & Dispositivos': ['Console', 'Console Portátil', 'Computador', 'Celular', 'Tablet', 'Smartwatch', 'Processador', 'Placa de Vídeo', 'Óculos VR', 'Arcade', 'Carro Elétrico', 'Robô Doméstico', 'Chip Neural', 'Foguete Espacial', 'Drone', 'Impressora 3D', 'Câmera Digital', 'Fone de Ouvido', 'Microfone', 'Televisão', 'Monitor'],
                      'Mídia & Entretenimento': ['Filme', 'Série', 'Programa de TV', 'Emissora de TV', 'Serviço de Streaming', 'Álbum Musical', 'Dublagem/Audiobook', 'Podcast', 'Programa de Rádio', 'Emissora de Rádio', 'Documentário', 'Animação', 'Curta-metragem', 'Trilha Sonora', 'Efeitos Sonoros'],
                      'Físico & Impresso': ['Livro', 'Revista', 'Jornal', 'Jogo de Tabuleiro', 'Brinquedo', 'História em Quadrinhos', 'Mangá', 'Livro Didático'],
                      'Construções': ['Casa', 'Prédio Residencial', 'Prédio Comercial', 'Shopping Center', 'Fábrica', 'Estádio', 'Parque de Diversões', 'Aeroporto', 'Hospital', 'Escola', 'Universidade']
                    }[cat.id] || [];
                    
                    const hasProducts = categoryProducts.some(p => availableTypes.includes(p));
                    
                    if (!hasProducts) return null;

                    return (
                      <button 
                        key={cat.id} 
                        onClick={() => setSelectedCategory(cat.id)} 
                        className="p-6 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 rounded-xl flex flex-col items-center gap-4 transition-all text-center group"
                      >
                        <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          {cat.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-lg">{cat.id}</h3>
                          <p className="text-xs text-slate-400 mt-1">{cat.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {getAvailableProductTypes(gameDate.getFullYear())
                    .filter(type => {
                      const categoryProducts = {
                        'Software & Jogos': ['Jogo', 'Jogo Online', 'Aplicativo', 'Sistema Operacional', 'Motor Gráfico', 'Plataforma Digital', 'Rede Social', 'Site', 'Inteligência Artificial', 'Realidade Virtual', 'Criptomoeda', 'Metaverso', 'Carro Autônomo (Software)', 'Plataforma de Streaming', 'Navegador Web', 'Aplicativo de Relacionamento', 'Assistente Virtual', 'Software de Edição'],
                        'Hardware & Dispositivos': ['Console', 'Console Portátil', 'Computador', 'Celular', 'Tablet', 'Smartwatch', 'Processador', 'Placa de Vídeo', 'Óculos VR', 'Arcade', 'Carro Elétrico', 'Robô Doméstico', 'Chip Neural', 'Foguete Espacial', 'Drone', 'Impressora 3D', 'Câmera Digital', 'Fone de Ouvido', 'Microfone', 'Televisão', 'Monitor'],
                        'Mídia & Entretenimento': ['Filme', 'Série', 'Programa de TV', 'Emissora de TV', 'Serviço de Streaming', 'Álbum Musical', 'Dublagem/Audiobook', 'Podcast', 'Programa de Rádio', 'Emissora de Rádio', 'Documentário', 'Animação', 'Curta-metragem', 'Trilha Sonora', 'Efeitos Sonoros'],
                        'Físico & Impresso': ['Livro', 'Revista', 'Jornal', 'Jogo de Tabuleiro', 'Brinquedo', 'História em Quadrinhos', 'Mangá', 'Livro Didático'],
                        'Construções': ['Casa', 'Prédio Residencial', 'Prédio Comercial', 'Shopping Center', 'Fábrica', 'Estádio', 'Parque de Diversões', 'Aeroporto', 'Hospital', 'Escola', 'Universidade']
                      }[selectedCategory] || [];
                      return categoryProducts.includes(type);
                    })
                    .map(type => (
                    <button key={type} onClick={() => { setSelectedCategory(null); openSetup(type); }} className="p-4 bg-slate-950 hover:bg-indigo-600/20 border border-slate-800 hover:border-indigo-500/50 rounded-xl flex items-center gap-4 transition-all text-left group">
                      <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                        {type === 'Jogo' || type === 'Jogo Online' ? <Gamepad2 className="w-6 h-6 text-indigo-400 group-hover:text-white" /> :
                         type === 'Motor Gráfico' || type === 'Processador' ? <Cpu className="w-6 h-6 text-emerald-400 group-hover:text-white" /> :
                         type === 'Console' || type === 'Console Portátil' ? <MonitorPlay className="w-6 h-6 text-purple-400 group-hover:text-white" /> :
                         type === 'Computador' || type === 'Tablet' ? <Laptop className="w-6 h-6 text-blue-400 group-hover:text-white" /> :
                         type === 'Celular' || type === 'Aplicativo' ? <Smartphone className="w-6 h-6 text-amber-400 group-hover:text-white" /> :
                         type === 'Plataforma Digital' || type === 'Site' ? <Store className="w-6 h-6 text-rose-400 group-hover:text-white" /> :
                         type === 'Rede Social' ? <Share2 className="w-6 h-6 text-cyan-400 group-hover:text-white" /> :
                         type === 'Filme' || type === 'Série' || type === 'Programa de TV' || type === 'Emissora de TV' || type === 'Serviço de Streaming' || type === 'Documentário' || type === 'Animação' || type === 'Curta-metragem' ? <Film className="w-6 h-6 text-red-400 group-hover:text-white" /> :
                         type === 'Sistema Operacional' || type === 'Placa de Vídeo' ? <Monitor className="w-6 h-6 text-sky-400 group-hover:text-white" /> :
                         type === 'Smartwatch' ? <Star className="w-6 h-6 text-lime-400 group-hover:text-white" /> :
                         type === 'Álbum Musical' || type === 'Dublagem/Audiobook' || type === 'Podcast' || type === 'Programa de Rádio' || type === 'Emissora de Rádio' || type === 'Trilha Sonora' || type === 'Efeitos Sonoros' ? <Music className="w-6 h-6 text-pink-400 group-hover:text-white" /> :
                         type === 'Livro' || type === 'Revista' || type === 'História em Quadrinhos' || type === 'Mangá' || type === 'Livro Didático' ? <Book className="w-6 h-6 text-orange-400 group-hover:text-white" /> :
                         type === 'Jornal' ? <Newspaper className="w-6 h-6 text-gray-400 group-hover:text-white" /> :
                         type === 'Jogo de Tabuleiro' ? <Puzzle className="w-6 h-6 text-yellow-400 group-hover:text-white" /> :
                         type === 'Brinquedo' ? <Package className="w-6 h-6 text-teal-400 group-hover:text-white" /> :
                         type === 'Arcade' ? <Joystick className="w-6 h-6 text-fuchsia-400 group-hover:text-white" /> :
                         type === 'Óculos VR' || type === 'Realidade Virtual' || type === 'Metaverso' ? <Glasses className="w-6 h-6 text-cyan-500 group-hover:text-white" /> :
                         type === 'Inteligência Artificial' || type === 'Robô Doméstico' || type === 'Assistente Virtual' ? <Bot className="w-6 h-6 text-indigo-500 group-hover:text-white" /> :
                         type === 'Criptomoeda' ? <Bitcoin className="w-6 h-6 text-yellow-500 group-hover:text-white" /> :
                         type === 'Carro Autônomo (Software)' || type === 'Carro Elétrico' ? <Car className="w-6 h-6 text-red-500 group-hover:text-white" /> :
                         type === 'Chip Neural' ? <Brain className="w-6 h-6 text-pink-500 group-hover:text-white" /> :
                         type === 'Foguete Espacial' ? <Rocket className="w-6 h-6 text-orange-500 group-hover:text-white" /> :
                         type === 'Drone' ? <Plane className="w-6 h-6 text-sky-500 group-hover:text-white" /> :
                         type === 'Impressora 3D' ? <Printer className="w-6 h-6 text-emerald-500 group-hover:text-white" /> :
                         type === 'Plataforma de Streaming' ? <MonitorPlay className="w-6 h-6 text-rose-500 group-hover:text-white" /> :
                         type === 'Navegador Web' ? <Globe className="w-6 h-6 text-blue-500 group-hover:text-white" /> :
                         type === 'Aplicativo de Relacionamento' ? <Heart className="w-6 h-6 text-pink-500 group-hover:text-white" /> :
                         type === 'Software de Edição' ? <PenTool className="w-6 h-6 text-purple-500 group-hover:text-white" /> :
                         type === 'Câmera Digital' ? <Camera className="w-6 h-6 text-gray-300 group-hover:text-white" /> :
                         type === 'Fone de Ouvido' ? <Headphones className="w-6 h-6 text-indigo-300 group-hover:text-white" /> :
                         type === 'Microfone' ? <Mic className="w-6 h-6 text-zinc-400 group-hover:text-white" /> :
                         type === 'Televisão' || type === 'Monitor' ? <Tv className="w-6 h-6 text-sky-300 group-hover:text-white" /> :
                         ['Casa', 'Prédio Residencial', 'Prédio Comercial', 'Shopping Center', 'Fábrica', 'Estádio', 'Parque de Diversões', 'Aeroporto', 'Hospital', 'Escola', 'Universidade'].includes(type) ? <Building2 className="w-6 h-6 text-sky-400 group-hover:text-white" /> :
                         <Star className="w-6 h-6 text-indigo-400 group-hover:text-white" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{type}</h3>
                        <p className="text-xs text-slate-400">Desenvolva um novo projeto.</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SETUP DE BANDA */}
      {isBandSetupOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 w-full max-w-xl rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Mic className="w-5 h-5 text-pink-400" /> Nova Banda / Artista
              </h2>
              <button onClick={() => setIsBandSetupOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                {bands.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Selecionar Banda Existente</label>
                    <select
                      value={selectedBandId === null ? '' : selectedBandId}
                      onChange={(e) => setSelectedBandId(e.target.value ? Number(e.target.value) : null)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-all appearance-none"
                    >
                      <option value="">-- Criar Nova Banda --</option>
                      {bands.map(band => (
                        <option key={band.id} value={band.id}>{band.name} ({band.genre})</option>
                      ))}
                    </select>
                  </div>
                )}

                {selectedBandId === null && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Nome da Banda / Artista</label>
                      <input 
                        type="text" 
                        value={newBandName}
                        onChange={(e) => setNewBandName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-all"
                        placeholder="Ex: The Beatles"
                        autoFocus
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Gênero Musical</label>
                        <select 
                          value={newBandGenre} 
                          onChange={(e) => setNewBandGenre(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-all appearance-none"
                        >
                          <option>Pop</option>
                          <option>Rock</option>
                          <option>Hip Hop</option>
                          <option>Eletrônica</option>
                          <option>Sertanejo</option>
                          <option>Axé Music</option>
                          <option>Clássica</option>
                          <option>Jazz</option>
                          <option>Metal</option>
                          <option>Indie</option>
                          <option>R&B</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Número de Integrantes</label>
                        <input 
                          type="number" 
                          min="1"
                          max="10"
                          value={newBandMembers}
                          onChange={(e) => setNewBandMembers(Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-all"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-slate-800 bg-slate-800/30 flex justify-end gap-4">
              <button 
                onClick={() => setIsBandSetupOpen(false)}
                className="px-6 py-3 rounded-xl font-bold text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
              >
                Cancelar
              </button>
              <button 
                onClick={startBandProject}
                className="px-6 py-3 bg-pink-600 hover:bg-pink-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-pink-900/20 flex items-center gap-2"
              >
                <Mic className="w-5 h-5" /> Continuar para Álbum
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SETUP DO JOGO */}
      {isSetupOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 w-full max-w-xl rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
              <h2 className="text-xl font-bold text-white">
                {productType === 'Jogo' ? 'Novo Jogo' : 
                 productType === 'Motor Gráfico' ? 'Novo Motor Gráfico' : 
                 productType === 'Console' ? 'Novo Console' : 
                 productType === 'Computador' ? 'Novo Computador' : 
                 productType === 'Celular' ? 'Novo Celular' : 
                 productType === 'Rede Social' ? 'Nova Rede Social' :
                 productType === 'Filme' ? 'Novo Filme' :
                 productType === 'Série' ? 'Nova Série' :
                 productType === 'Programa de TV' ? 'Novo Programa de TV' :
                 productType === 'Sistema Operacional' ? 'Novo Sistema Operacional' :
                 productType === 'Aplicativo' ? 'Novo Aplicativo' :
                 productType === 'Tablet' ? 'Novo Tablet' :
                 productType === 'Smartwatch' ? 'Novo Smartwatch' :
                 productType === 'Processador' ? 'Novo Processador' :
                 productType === 'Placa de Vídeo' ? 'Nova Placa de Vídeo' :
                 productType === 'Álbum Musical' ? 'Novo Álbum Musical' :
                 productType === 'Dublagem/Audiobook' ? 'Nova Dublagem/Audiobook' :
                 productType === 'Podcast' ? 'Novo Podcast' :
                 productType === 'Programa de Rádio' ? 'Novo Programa de Rádio' :
                 productType === 'Livro' ? 'Novo Livro' :
                 productType === 'Jornal' ? 'Novo Jornal' :
                 productType === 'Revista' ? 'Nova Revista' :
                 productType === 'Jogo de Tabuleiro' ? 'Novo Jogo de Tabuleiro' :
                 productType === 'Brinquedo' ? 'Novo Brinquedo' :
                 productType === 'Arcade' ? 'Novo Arcade' :
                 productType === 'Óculos VR' ? 'Novo Óculos VR' :
                 productType === 'Carro Elétrico' ? 'Novo Carro Elétrico' :
                 productType === 'Robô Doméstico' ? 'Novo Robô Doméstico' :
                 productType === 'Chip Neural' ? 'Novo Chip Neural' :
                 productType === 'Foguete Espacial' ? 'Novo Foguete Espacial' :
                 productType === 'Drone' ? 'Novo Drone' :
                 productType === 'Impressora 3D' ? 'Nova Impressora 3D' :
                 productType === 'Realidade Virtual' ? 'Nova Realidade Virtual' :
                 productType === 'Criptomoeda' ? 'Nova Criptomoeda' :
                 productType === 'Metaverso' ? 'Novo Metaverso' :
                 productType === 'Carro Autônomo (Software)' ? 'Novo Carro Autônomo (Software)' :
                 productType === 'Inteligência Artificial' ? 'Nova Inteligência Artificial' :
                 'Novo Projeto'}
              </h2>
              <button onClick={() => setIsSetupOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Nome do Projeto</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="Ex: Half-Life 3"
                    autoFocus
                  />
                  <button 
                    onClick={() => generateRandomName(productType)}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-4 rounded-xl border border-slate-700 transition-colors flex items-center justify-center"
                    title="Gerar nome aleatório"
                  >
                    <Dices className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {(productType === 'Jogo' || productType === 'Filme' || productType === 'Série' || productType === 'Programa de TV' || productType === 'Emissora de TV' || productType === 'Aplicativo' || productType === 'Sistema Operacional' || productType === 'Álbum Musical' || productType === 'Podcast' || productType === 'Programa de Rádio' || productType === 'Emissora de Rádio' || productType === 'Livro' || productType === 'Jornal' || productType === 'Revista' || productType === 'Jogo de Tabuleiro' || productType === 'Brinquedo' || productType === 'Arcade') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      {productType === 'Aplicativo' || productType === 'Sistema Operacional' ? 'Categoria' : 
                       productType === 'Álbum Musical' ? 'Gênero Musical' : 
                       productType === 'Podcast' || productType === 'Programa de Rádio' || productType === 'Emissora de Rádio' ? 'Tema' : 
                       productType === 'Livro' || productType === 'Revista' || productType === 'Jornal' ? 'Assunto' :
                       'Gênero'}
                    </label>
                    <select 
                      value={genre} 
                      onChange={(e) => setGenre(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none"
                    >
                      {productType === 'Jogo' || productType === 'Arcade' ? (
                        <>
                          <option>Ação</option>
                          <option>RPG</option>
                          <option>Estratégia</option>
                          <option>Simulação</option>
                          <option>Aventura</option>
                          <option>Esportes</option>
                          <option>Corrida</option>
                          <option>Luta</option>
                          <option>Puzzle</option>
                          <option>Western</option>
                          <option>Noir</option>
                          <option>Ficção Científica Retrô</option>
                        </>
                      ) : productType === 'Álbum Musical' ? (
                        <>
                          <option>Pop</option>
                          <option>Rock</option>
                          <option>Hip Hop</option>
                          <option>Eletrônica</option>
                          <option>Sertanejo</option>
                          <option>Axé Music</option>
                          <option>Clássica</option>
                          <option>Jazz</option>
                          <option>Bossa Nova</option>
                          <option>MPB</option>
                          <option>Jovem Guarda</option>
                          <option>Rockabilly</option>
                          <option>Blues</option>
                        </>
                      ) : productType === 'Mainframe' ? (
                        <>
                          <option>Cálculo Científico</option>
                          <option>Gestão Empresarial</option>
                          <option>Militar</option>
                          <option>Acadêmico</option>
                        </>
                      ) : productType === 'Calculadora Eletrônica' ? (
                        <>
                          <option>Financeira</option>
                          <option>Científica</option>
                          <option>Básica</option>
                        </>
                      ) : productType === 'Podcast' || productType === 'Programa de Rádio' || productType === 'Emissora de Rádio' ? (
                        <>
                          <option>Entrevistas</option>
                          <option>True Crime</option>
                          <option>Comédia</option>
                          <option>Notícias</option>
                          <option>Educação</option>
                          <option>Tecnologia</option>
                          <option>Música</option>
                          <option>Esportes</option>
                        </>
                      ) : productType === 'Livro' || productType === 'Revista' || productType === 'Jornal' ? (
                        <>
                          <option>Ficção</option>
                          <option>Não-Ficção</option>
                          <option>Fantasia</option>
                          <option>Romance</option>
                          <option>Notícias</option>
                          <option>Tecnologia</option>
                          <option>Fofoca</option>
                          <option>Esportes</option>
                        </>
                      ) : productType === 'Jogo de Tabuleiro' || productType === 'Brinquedo' ? (
                        <>
                          <option>Estratégia</option>
                          <option>Festa</option>
                          <option>Educativo</option>
                          <option>Infantil</option>
                          <option>Colecionável</option>
                        </>
                      ) : productType === 'Aplicativo' ? (
                        <>
                          <option>Produtividade</option>
                          <option>Educação</option>
                          <option>Finanças</option>
                          <option>Saúde e Fitness</option>
                          <option>Estilo de Vida</option>
                          <option>Entretenimento</option>
                          <option>Utilitários</option>
                        </>
                      ) : productType === 'Sistema Operacional' ? (
                        <>
                          <option>Desktop</option>
                          <option>Mobile</option>
                          <option>Servidor</option>
                          <option>Embarcado</option>
                        </>
                      ) : (
                        <>
                          <option>Geral</option>
                          <option>Drama</option>
                          <option>Comédia</option>
                          <option>Ação</option>
                          <option>Documentário</option>
                          <option>Reality Show</option>
                          <option>Terror</option>
                          <option>Ficção Científica</option>
                          <option>Animação</option>
                          <option>Notícias</option>
                          <option>Esportes</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      {productType === 'Jogo' || productType === 'Aplicativo' || productType === 'Sistema Operacional' || productType === 'Álbum Musical' || productType === 'Podcast' || productType === 'Programa de Rádio' || productType === 'Livro' || productType === 'Jornal' || productType === 'Revista' || productType === 'Jogo de Tabuleiro' || productType === 'Brinquedo' || productType === 'Arcade' ? 'Plataforma Principal' : 'Meio de Distribuição'}
                    </label>
                    <select 
                      value={platform} 
                      onChange={(e) => setPlatform(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none"
                    >
                      {productType === 'Jogo' || productType === 'Aplicativo' || productType === 'Sistema Operacional' ? (
                        <>
                          <option>Computador</option>
                          <option>Celular</option>
                          <option>Console de Mesa</option>
                          <option>Console Portátil</option>
                          <option>Arcade</option>
                          <option>Realidade Virtual</option>
                        </>
                      ) : productType === 'Mainframe' ? (
                        <>
                          <option>Mainframe</option>
                          <option>Cartões Perfurados</option>
                        </>
                      ) : productType === 'Calculadora Eletrônica' ? (
                        <>
                          <option>Desktop</option>
                          <option>Portátil</option>
                        </>
                      ) : productType === 'Álbum Musical' || productType === 'Podcast' || productType === 'Programa de Rádio' ? (
                        <>
                          <option>Streaming</option>
                          <option>Físico (CD/Vinil)</option>
                          <option>Rádio</option>
                          <option>Download Digital</option>
                        </>
                      ) : productType === 'Livro' || productType === 'Jornal' || productType === 'Revista' ? (
                        <>
                          <option>Impresso</option>
                          <option>Digital (E-book/Site)</option>
                          <option>Assinatura</option>
                        </>
                      ) : productType === 'Jogo de Tabuleiro' || productType === 'Brinquedo' || productType === 'Arcade' ? (
                        <>
                          <option>Físico</option>
                        </>
                      ) : productType === 'Emissora de TV' ? (
                        <>
                          <option>VHF (Analógico)</option>
                          <option>UHF (Analógico)</option>
                          <option>Cabo</option>
                          <option>Satélite</option>
                          <option>Digital (HDTV)</option>
                        </>
                      ) : (
                        <>
                          <option>Cinema</option>
                          <option>Streaming</option>
                          <option>TV Aberta</option>
                          <option>TV a Cabo</option>
                          <option>DVD/Blu-ray</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      {productType === 'Jogo' || productType === 'Aplicativo' || productType === 'Sistema Operacional' || productType === 'Álbum Musical' || productType === 'Podcast' || productType === 'Programa de Rádio' || productType === 'Livro' || productType === 'Jornal' || productType === 'Revista' || productType === 'Jogo de Tabuleiro' || productType === 'Brinquedo' || productType === 'Arcade' ? 'Segunda Plataforma' : 'Distribuição Secundária'}
                    </label>
                    <select 
                      value={secondPlatform} 
                      onChange={(e) => setSecondPlatform(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none"
                    >
                      <option>Nenhuma</option>
                      {productType === 'Jogo' || productType === 'Aplicativo' || productType === 'Sistema Operacional' ? (
                        <>
                          <option>Computador</option>
                          <option>Celular</option>
                          <option>Console de Mesa</option>
                          <option>Console Portátil</option>
                          <option>Arcade</option>
                          <option>Realidade Virtual</option>
                        </>
                      ) : productType === 'Álbum Musical' || productType === 'Podcast' || productType === 'Programa de Rádio' ? (
                        <>
                          <option>Streaming</option>
                          <option>Físico (CD/Vinil)</option>
                          <option>Rádio</option>
                          <option>Download Digital</option>
                        </>
                      ) : productType === 'Livro' || productType === 'Jornal' || productType === 'Revista' ? (
                        <>
                          <option>Impresso</option>
                          <option>Digital (E-book/Site)</option>
                          <option>Assinatura</option>
                        </>
                      ) : productType === 'Jogo de Tabuleiro' || productType === 'Brinquedo' || productType === 'Arcade' ? (
                        <>
                          <option>Físico</option>
                        </>
                      ) : productType === 'Emissora de TV' ? (
                        <>
                          <option>VHF (Analógico)</option>
                          <option>UHF (Analógico)</option>
                          <option>Cabo</option>
                          <option>Satélite</option>
                          <option>Digital (HDTV)</option>
                        </>
                      ) : (
                        <>
                          <option>Cinema</option>
                          <option>Streaming</option>
                          <option>TV Aberta</option>
                          <option>TV a Cabo</option>
                          <option>DVD/Blu-ray</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      {['Emissora de Rádio', 'Emissora de TV', 'Podcast', 'Programa de Rádio'].includes(productType) ? 'Tema / Conteúdo' : 'Tema / Ambientação'}
                    </label>
                    <select 
                      value={theme} 
                      onChange={(e) => setTheme(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none"
                    >
                      {['Emissora de Rádio', 'Podcast', 'Programa de Rádio'].includes(productType) ? (
                        <>
                          <option>Geral / Variedades</option>
                          <option>Informativo / Notícias</option>
                          <option>Educativo / Cultura</option>
                          <option>Musical (Hits)</option>
                          <option>Debates / Político</option>
                          <option>Investigativo / True Crime</option>
                          <option>Lifestyle / Bem-estar</option>
                          <option>Humor / Comédia</option>
                        </>
                      ) : productType === 'Álbum Musical' ? (
                        <>
                          <option>Amor / Romântico</option>
                          <option>Festa / Balada</option>
                          <option>Melancólico / Triste</option>
                          <option>Protesto / Social</option>
                          <option>Espiritual / Religioso</option>
                          <option>Instrumental / Atmosférico</option>
                          <option>Experimental</option>
                        </>
                      ) : productType === 'Emissora de TV' ? (
                        <>
                          <option>Entretenimento Geral</option>
                          <option>Jornalismo 24h</option>
                          <option>Esportes / Ao Vivo</option>
                          <option>Infantil / Desenhos</option>
                          <option>Variedades / Auditório</option>
                          <option>Filmes e Séries</option>
                          <option>Educativo / Cultura</option>
                          <option>Religioso</option>
                        </>
                      ) : (
                        <>
                          <option>Contemporâneo</option>
                          <option>Sci-Fi / Futurista</option>
                          <option>Fantasia / Magia</option>
                          <option>Cyberpunk</option>
                          <option>Medieval</option>
                          <option>Pós-Apocalíptico</option>
                          <option>Terror / Sobrenatural</option>
                          <option>Histórico</option>
                          <option>Comédia / Sátira</option>
                          <option>Romance</option>
                          <option>Documentário / Real</option>
                          <option>Esportes</option>
                          <option>Notícias / Jornalismo</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      {['Emissora de Rádio', 'Podcast', 'Programa de Rádio', 'Álbum Musical'].includes(productType) ? 'Qualidade de Áudio / Formato' : 'Estilo Visual / Formato'}
                    </label>
                    <select 
                      value={visualStyle} 
                      onChange={(e) => setVisualStyle(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none"
                    >
                      {['Emissora de Rádio', 'Podcast', 'Programa de Rádio', 'Álbum Musical'].includes(productType) ? (
                        <>
                          <option>Apenas Áudio (Standard)</option>
                          <option>Áudio de Alta Fidelidade (Hi-Fi)</option>
                          <option>Áudio Espacial / Surround</option>
                          <option>Mono (Retrô)</option>
                          <option>Estéreo (Padrão)</option>
                        </>
                      ) : productType === 'Emissora de TV' ? (
                        <>
                          <option>Padrão (SD)</option>
                          <option>Alta Definição (HD)</option>
                          <option>Ultra HD (4K)</option>
                          <option>Preto e Branco (Retrô)</option>
                          <option>Cores Vibrantes</option>
                        </>
                      ) : (
                        <>
                          <option>3D Realista</option>
                          <option>3D Low Poly / Estilizado</option>
                          <option>2D Pixel Art</option>
                          <option>2D Vetorial / Desenho</option>
                          <option>Live Action (Atores Reais)</option>
                          <option>Animação 3D</option>
                          <option>Animação 2D</option>
                          <option>Texto / Interface</option>
                          <option>Impresso / Físico</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              )}

              {(productType === 'Plataforma Digital' || productType === 'Rede Social') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Estilo do Ícone/UI</label>
                    <select 
                      value={iconStyle} 
                      onChange={(e) => setIconStyle(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none"
                    >
                      <option>Minimalista</option>
                      <option>Skeuomorphic</option>
                      <option>Flat Design</option>
                      <option>3D / Neumorphism</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Monetização</label>
                    <select 
                      value={monetization} 
                      onChange={(e) => setMonetization(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none"
                    >
                      <option>Gratuito com Anúncios</option>
                      <option>Pago (Premium)</option>
                      <option>Assinatura Mensal</option>
                      <option>Freemium / Microtransações</option>
                    </select>
                  </div>
                </div>
              )}

              {productType === 'Álbum Musical' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Número de Músicas ({albumTracks})</label>
                    <input 
                      type="range" 
                      min="1" 
                      max="30" 
                      value={albumTracks} 
                      onChange={(e) => setAlbumTracks(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>1 (Single)</span>
                      <span>30 (Duplo)</span>
                    </div>
                  </div>
                  {upgrades.find(u => u.id === 'music_videos')?.level ? upgrades.find(u => u.id === 'music_videos')!.level > 0 && (
                    <div className="flex items-center h-full pt-6">
                      <label className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={hasMusicVideos} 
                          onChange={(e) => setHasMusicVideos(e.target.checked)}
                          className="w-5 h-5 rounded border-slate-700 text-indigo-500 focus:ring-indigo-500 bg-slate-950"
                        />
                        <span className="ml-3 text-sm font-medium text-slate-300">Produzir Videoclipes</span>
                      </label>
                    </div>
                  ) : null}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Público Alvo</label>
                <select 
                  value={targetAudience} 
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none"
                >
                  <option>Geral</option>
                  <option>Infantil</option>
                  <option>Jovem</option>
                  <option>Adulto</option>
                  <option>Nicho / Especializado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Campanhas de Marketing</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {MARKETING_OPTIONS.filter(opt => gameDate.getFullYear() >= opt.year).map(opt => (
                    <label key={opt.id} className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${marketingCampaigns.includes(opt.id) ? 'bg-indigo-500/20 border-indigo-500' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}>
                      <input 
                        type="checkbox" 
                        checked={marketingCampaigns.includes(opt.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setMarketingCampaigns([...marketingCampaigns, opt.id]);
                          } else {
                            setMarketingCampaigns(marketingCampaigns.filter(id => id !== opt.id));
                          }
                        }}
                        className="w-5 h-5 rounded border-slate-700 text-indigo-500 focus:ring-indigo-500 bg-slate-950"
                      />
                      <div className="ml-3 flex flex-col">
                        <span className="text-sm font-medium text-white">{opt.name}</span>
                        <span className="text-xs text-slate-400">
                          {opt.cost > 0 ? `-$${opt.cost.toLocaleString()}` : 'Grátis'} • Hype: {opt.hype}x
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {productType === 'Programa de TV' && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Emissoras de Transmissão</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {[
                      ...DEFAULT_TV_NETWORKS,
                      ...history.filter(g => g.type === 'Emissora de TV').map(n => ({
                        id: `player_${n.id}`,
                        name: n.name,
                        cost: 0,
                        hype: 1.0 + (n.score / 10)
                      }))
                    ].map(opt => (
                      <label key={opt.id} className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${selectedTvNetworks.includes(opt.id) ? 'bg-indigo-500/20 border-indigo-500' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}>
                        <input 
                          type="checkbox" 
                          checked={selectedTvNetworks.includes(opt.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTvNetworks([...selectedTvNetworks, opt.id]);
                            } else {
                              setSelectedTvNetworks(selectedTvNetworks.filter(id => id !== opt.id));
                            }
                          }}
                          className="w-5 h-5 rounded border-slate-700 text-indigo-500 focus:ring-indigo-500 bg-slate-950"
                        />
                        <div className="ml-3 flex flex-col">
                          <span className="text-sm font-medium text-white">{opt.name}</span>
                          <span className="text-xs text-slate-400">
                            {opt.cost > 0 ? `-$${opt.cost.toLocaleString()}` : 'Sua Emissora (Grátis)'} • Hype: {opt.hype.toFixed(1)}x
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Regiões de Lançamento</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {REGIONS.map(opt => (
                    <label key={opt.id} className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${selectedRegions.includes(opt.id) ? 'bg-indigo-500/20 border-indigo-500' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}>
                      <input 
                        type="checkbox" 
                        checked={selectedRegions.includes(opt.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedRegions([...selectedRegions, opt.id]);
                          } else {
                            if (selectedRegions.length > 1) {
                              setSelectedRegions(selectedRegions.filter(id => id !== opt.id));
                            }
                          }
                        }}
                        className="w-5 h-5 rounded border-slate-700 text-indigo-500 focus:ring-indigo-500 bg-slate-950"
                      />
                      <div className="ml-3 flex flex-col">
                        <span className="text-sm font-medium text-white">{opt.name}</span>
                        <span className="text-xs text-slate-400">
                          {opt.costMultiplier > 0 ? `+${opt.costMultiplier * 100}% Custo` : 'Grátis'} • Vendas: {opt.salesMultiplier}x
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Tamanho / Escopo</label>
                <select 
                  value={gameSize} 
                  onChange={(e) => setGameSize(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none"
                >
                  <option>Indie</option>
                  <option>Médio</option>
                  <option>AAA</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Público Alvo</label>
                  <select 
                    value={targetAudience} 
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none"
                  >
                    <option>Crianças</option>
                    <option>Jovens</option>
                    <option>Adultos</option>
                    <option>Sêniores</option>
                    <option>Entusiastas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Classificação</label>
                  <select 
                    value={rating} 
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none"
                  >
                    <option>Livre</option>
                    <option>10+</option>
                    <option>12+</option>
                    <option>14+</option>
                    <option>16+</option>
                    <option>18+</option>
                  </select>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-5">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">Foco do Desenvolvimento</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {getSlidersForProduct(productType).map((slider, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className={`${slider.color} flex items-center gap-1`}>
                          {slider.icon} 
                          {slider.label}
                        </span>
                        <span className="font-mono">{slider.state}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={slider.state} 
                        onChange={(e) => slider.set(parseInt(e.target.value))} 
                        className={`w-full ${slider.accent} h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer`} 
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-lg font-bold text-white">Recursos Adicionais</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {AVAILABLE_FEATURES.map(feature => {
                    const isSelected = productFeatures.includes(feature.id);
                    return (
                      <button
                        key={feature.id}
                        onClick={() => toggleFeature(feature.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected 
                            ? 'bg-indigo-600/20 border-indigo-500/50' 
                            : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className={`font-bold text-sm ${isSelected ? 'text-indigo-300' : 'text-slate-300'}`}>
                            {feature.name}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-slate-400">{formatMoney(feature.cost)}</span>
                          <span className="text-purple-400">{feature.rp} RP</span>
                          <span className="text-emerald-400">+{feature.boost * 100}% Qualidade</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-800 bg-slate-800/50 flex flex-col sm:flex-row justify-between gap-4 items-center">
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Custo Estimado</span>
                <span className={`text-xl font-black ${money >= getProjectCost() ? 'text-emerald-400' : 'text-red-400'}`}>
                  {formatMoney(getProjectCost())}
                </span>
                {getProjectRPCost() > 0 && (
                  <span className={`text-sm font-bold ${researchPoints >= getProjectRPCost() ? 'text-purple-400' : 'text-red-400'}`}>
                    {getProjectRPCost()} RP
                  </span>
                )}
                {money < getProjectCost() && (
                  <span className="text-[10px] text-red-500 font-bold uppercase mt-1">Saldo Insuficiente</span>
                )}
                {researchPoints < getProjectRPCost() && (
                  <span className="text-[10px] text-red-500 font-bold uppercase mt-1">RP Insuficiente</span>
                )}
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button onClick={() => setIsSetupOpen(false)} className="flex-1 sm:flex-none px-6 py-3 text-slate-300 hover:text-white font-bold transition-colors uppercase text-sm">
                  Cancelar
                </button>
                <button 
                  onClick={startGame} 
                  disabled={money < getProjectCost() || researchPoints < getProjectRPCost() || !gameName.trim()}
                  className={`flex-1 sm:flex-none px-10 py-4 font-black rounded-2xl transition-all shadow-lg uppercase tracking-widest text-sm ${
                    (money >= getProjectCost() && researchPoints >= getProjectRPCost() && gameName.trim()) 
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20 active:scale-95' 
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Iniciar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DESENVOLVIMENTO */}
      {isDevOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-slate-900 w-full max-w-md rounded-2xl border border-slate-700 shadow-2xl p-8 text-center relative">
            <button onClick={() => setIsDevOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-white mb-2">Desenvolvendo</h2>
            <p className="text-indigo-400 font-medium text-lg mb-8">{gameName}</p>

            {/* Bubbles / Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                <Palette className="w-6 h-6 text-purple-400 mb-2" />
                <span className="text-2xl font-bold text-white font-mono">{devDesign}</span>
                <span className="text-[10px] text-slate-500 uppercase mt-1 text-center">
                  {(productType === 'Filme' || productType === 'Série' || productType === 'Programa de TV') ? 'Roteiro/Arte' : 
                   (productType === 'Álbum Musical' || productType === 'Dublagem/Audiobook' || productType === 'Podcast') ? 'Composição/Arte' : 'Design/Arte'}
                </span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                <Cpu className="w-6 h-6 text-blue-400 mb-2" />
                <span className="text-2xl font-bold text-white font-mono">{devTech}</span>
                <span className="text-[10px] text-slate-500 uppercase mt-1 text-center">
                  {(productType === 'Filme' || productType === 'Série' || productType === 'Programa de TV') ? 'Produção/VFX' : 
                   (productType === 'Álbum Musical' || productType === 'Dublagem/Audiobook' || productType === 'Podcast') ? 'Áudio/Mixagem' : 'Tech/Engine'}
                </span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                <Star className="w-6 h-6 text-amber-400 mb-2" />
                <span className="text-2xl font-bold text-white font-mono">{Math.floor((devDesign + devTech) / 2)}</span>
                <span className="text-[10px] text-slate-500 uppercase mt-1 text-center">
                  Qualidade Geral
                </span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                <Bug className="w-6 h-6 text-red-400 mb-2" />
                <span className="text-2xl font-bold text-white font-mono">{devBugs}</span>
                <span className="text-[10px] text-slate-500 uppercase mt-1 text-center">
                  {(productType === 'Filme' || productType === 'Série' || productType === 'Programa de TV') ? 'Erros' : 
                   (productType === 'Álbum Musical' || productType === 'Dublagem/Audiobook' || productType === 'Podcast') ? 'Ruídos' : 'Bugs'}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm font-bold text-slate-400 mb-2">
                <span>Progresso</span>
                <span className="text-indigo-400">{Math.floor(progress)}%</span>
              </div>
              <div className="w-full bg-slate-950 h-4 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="bg-indigo-500 h-full transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={testProduct}
                disabled={progress >= 100}
                className={`w-full py-3 font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${progress < 100 ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-500/20 active:scale-95' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
              >
                <Bug className="w-5 h-5" /> {(productType === 'Filme' || productType === 'Série' || productType === 'Programa de TV') ? 'REVISAR EDIÇÃO' : (productType === 'Álbum Musical' || productType === 'Dublagem/Audiobook' || productType === 'Podcast') ? 'MIXAGEM / MASTER' : 'TESTAR PRODUTO (QA)'}
              </button>

              <button 
                onClick={finishGame}
                disabled={progress < 100}
                className={`w-full py-4 font-bold rounded-xl transition-all ${progress >= 100 ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 active:scale-95' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
              >
                {progress >= 100 ? 'FINALIZAR E LANÇAR' : 'TRABALHANDO...'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: REVIEW / RESULTADOS */}
      {isReviewOpen && lastGame && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
            <div className="bg-slate-800/50 p-6 border-b border-slate-800 text-center">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                {lastGame.type === 'Rede Social' || lastGame.type === 'Plataforma Digital' ? 'Recepção do Público' : 'Recepção da Crítica'}
              </h2>
              <h3 className="text-2xl font-bold text-white">{lastGame.name}</h3>
            </div>

            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-4 mb-6 shadow-2xl"
                style={{
                  borderColor: lastGame.score >= 8 ? '#10b981' : lastGame.score >= 5 ? '#f59e0b' : '#ef4444',
                  backgroundColor: lastGame.score >= 8 ? 'rgba(16,185,129,0.1)' : lastGame.score >= 5 ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)',
                  color: lastGame.score >= 8 ? '#34d399' : lastGame.score >= 5 ? '#fbbf24' : '#f87171'
                }}
              >
                <span className="text-5xl font-black">{lastGame.score.toFixed(1)}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                    {lastGame.type === 'Rede Social' || lastGame.type === 'Plataforma Digital' ? 'Usuários Ativos' : 'Unidades Vendidas'}
                  </p>
                  <p className="text-xl font-bold text-white">{formatNumber(lastGame.sales)}</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Receita Total</p>
                  <p className="text-xl font-bold text-emerald-400">{formatMoney(lastGame.revenue)}</p>
                </div>
              </div>

              <button 
                onClick={() => setIsReviewOpen(false)}
                className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all active:scale-95"
              >
                VOLTAR AO ESTÚDIO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EVENTOS */}
      {isEventOpen && currentEvent && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-slate-900 w-full max-w-lg rounded-2xl border border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.2)] overflow-hidden">
            <div className="bg-amber-500/10 p-6 border-b border-amber-500/20 text-center">
              <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h2 className="text-sm font-bold text-amber-500 uppercase tracking-wider mb-1">Evento Especial</h2>
              <h3 className="text-3xl font-black text-white">{currentEvent.name}</h3>
            </div>

            <div className="p-8 text-center">
              <p className="text-lg text-slate-300 mb-8">{currentEvent.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{currentEvent.reward < 0 ? 'Multa' : 'Prêmio em Dinheiro'}</p>
                  <p className={`text-xl font-bold ${currentEvent.reward < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {currentEvent.reward > 0 ? '+' : ''}{formatMoney(currentEvent.reward)}
                  </p>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{currentEvent.fans < 0 ? 'Fãs Perdidos' : 'Novos Fãs'}</p>
                  <p className={`text-xl font-bold ${currentEvent.fans < 0 ? 'text-red-400' : 'text-indigo-400'}`}>
                    {currentEvent.fans > 0 ? '+' : ''}{formatNumber(currentEvent.fans)}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => {
                  setMoney(m => m + currentEvent.reward);
                  setFans(f => Math.max(0, f + currentEvent.fans));
                  if (currentEvent.reward > 0) {
                    setAwardsWon(a => [...a, { name: currentEvent.name, description: currentEvent.description, date: gameDate }]);
                  }
                  setIsEventOpen(false);
                  setCurrentEvent(null);
                }}
                className={`w-full py-4 font-bold rounded-xl transition-all active:scale-95 shadow-lg text-white ${currentEvent.reward < 0 ? 'bg-red-600 hover:bg-red-500 shadow-red-500/20' : 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/20'}`}
              >
                {currentEvent.reward < 0 ? 'PAGAR MULTA' : 'RECEBER PRÊMIO'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SEARCH */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 pt-20">
          <div className="bg-slate-900 w-full max-w-3xl rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-4 border-b border-slate-800 flex items-center gap-4 bg-slate-800/50">
              <Search className="w-6 h-6 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos, empresas..."
                className="flex-1 bg-transparent border-none text-white text-lg focus:outline-none focus:ring-0 placeholder-slate-500"
                autoFocus
              />
              <button onClick={() => setIsSearchOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              {searchQuery.trim() === '' ? (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                  <p className="text-slate-500">Digite algo para buscar em todo o jogo.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Produtos */}
                  {history.filter(h => h.name.toLowerCase().includes(searchQuery.toLowerCase()) || h.type.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 && (
                    <div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Seus Produtos</h3>
                      <div className="space-y-2">
                        {history.filter(h => h.name.toLowerCase().includes(searchQuery.toLowerCase()) || h.type.toLowerCase().includes(searchQuery.toLowerCase())).map(game => (
                          <div key={game.id} className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex justify-between items-center">
                            <div>
                              <h4 className="font-bold text-white">{game.name}</h4>
                              <span className="text-xs text-slate-500">
                                {game.type} • {game.genre}
                                {game.theme && ` • ${game.theme}`}
                                {game.visualStyle && ` • ${game.visualStyle}`}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-emerald-400 font-bold">{formatMoney(game.revenue)}</div>
                              <div className="text-xs text-slate-500">Nota: {game.score.toFixed(1)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Subsidiárias */}
                  {companies.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.type.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 && (
                    <div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Subsidiárias</h3>
                      <div className="space-y-2">
                        {companies.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.type.toLowerCase().includes(searchQuery.toLowerCase())).map(company => (
                          <div key={company.id} className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex justify-between items-center">
                            <div>
                              <h4 className="font-bold text-white">{company.name}</h4>
                              <span className="text-xs text-slate-500">{company.type}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-emerald-400 font-bold">Nível {company.level}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Empty State */}
                  {history.filter(h => h.name.toLowerCase().includes(searchQuery.toLowerCase()) || h.type.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && 
                   companies.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.type.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-slate-500">Nenhum resultado encontrado para "{searchQuery}".</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

