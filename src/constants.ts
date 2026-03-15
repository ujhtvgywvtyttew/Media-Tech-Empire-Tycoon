export const CATEGORIES = {
  HARDWARE: 'Hardware',
  SOFTWARE: 'Software',
  MEDIA: 'Mídia',
  INFRASTRUCTURE: 'Infraestrutura',
  FURNITURE: 'Móveis',
};

export const PRODUCT_CATALOG = [
  { id: 'chip', name: 'Chip', category: CATEGORIES.HARDWARE, baseCost: 10000, baseIncome: 100 },
  { id: 'placa-video', name: 'Placa de Vídeo', category: CATEGORIES.HARDWARE, baseCost: 50000, baseIncome: 600 },
  { id: 'celular', name: 'Celular', category: CATEGORIES.HARDWARE, baseCost: 100000, baseIncome: 1200 },
  { id: 'tablet', name: 'Tablet', category: CATEGORIES.HARDWARE, baseCost: 150000, baseIncome: 1800 },
  { id: 'computador', name: 'Computador', category: CATEGORIES.HARDWARE, baseCost: 300000, baseIncome: 4000 },
  { id: 'tv', name: 'TV', category: CATEGORIES.HARDWARE, baseCost: 200000, baseIncome: 2500 },
  
  { id: 'sistema-operacional', name: 'Sistema Operacional', category: CATEGORIES.SOFTWARE, baseCost: 500000, baseIncome: 8000 },
  { id: 'programa', name: 'Programa', category: CATEGORIES.SOFTWARE, baseCost: 50000, baseIncome: 700 },
  { id: 'ia', name: 'Inteligência Artificial', category: CATEGORIES.SOFTWARE, baseCost: 1000000, baseIncome: 20000 },
  
  { id: 'filme', name: 'Filme', category: CATEGORIES.MEDIA, baseCost: 200000, baseIncome: 3000 },
  { id: 'serie', name: 'Série', category: CATEGORIES.MEDIA, baseCost: 300000, baseIncome: 5000 },
  { id: 'animacao', name: 'Animação', category: CATEGORIES.MEDIA, baseCost: 250000, baseIncome: 4000 },
  { id: 'emissora-tv', name: 'Emissora de TV', category: CATEGORIES.MEDIA, baseCost: 5000000, baseIncome: 100000 },
  { id: 'emissora-radio', name: 'Emissora de Rádio', category: CATEGORIES.MEDIA, baseCost: 1000000, baseIncome: 20000 },
  
  { id: 'construcao', name: 'Construção', category: CATEGORIES.INFRASTRUCTURE, baseCost: 2000000, baseIncome: 50000 },
  { id: 'apartamento', name: 'Apartamento', category: CATEGORIES.INFRASTRUCTURE, baseCost: 1000000, baseIncome: 25000 },
  
  { id: 'moveis', name: 'Móveis', category: CATEGORIES.FURNITURE, baseCost: 20000, baseIncome: 200 },
];

export const PHASES = ['Design', 'Tecnologia', 'Polimento'];
