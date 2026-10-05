// Curated visual representations, mockups, and technical craft specifications
// strictly derived from the provided PDF documents:
// 1. "gifti Club MUKUPS.pdf"
// 2. "Gifti Club - Guía de Marca e Identidad Visual (Versión Final).pdf"
// 3. Brand Board artifact "169336377_1791133196778971.jpg"

export interface ProductVisualAssets {
  primaryMockup: string;
  badgeVisual?: string;
  pdfReference: string;
  artStyle: string;
  material: string;
  packagingDetails: string;
  highlightSpecs: string[];
}

export const PDF_PRODUCT_VISUALS: Record<string, ProductVisualAssets> = {
  'prod-llavero-axolotl': {
    primaryMockup: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    pdfReference: 'gifti Club MUKUPS.pdf - Pág. 2',
    artStyle: 'Grabado Láser en Madera de Haya con Corte CNC',
    material: 'Madera de haya maciza 5mm de origen sustentable',
    packagingDetails: 'Caja rígida azul noche con base de espuma troquelada y sello de lacre',
    highlightSpecs: ['Grabado a 1200 DPI', 'Argolla de acero inoxidable 316L', 'Tratamiento con cera de abeja natural']
  },
  'prod-llavero-conejito': {
    primaryMockup: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    pdfReference: 'gifti Club MUKUPS.pdf - Pág. 3',
    artStyle: 'Acrílico Cristal Óptico 4mm de Alto Brillo con Dije 3D',
    material: 'Acrílico fundido grado óptico bicapa de alto impacto',
    packagingDetails: 'Bolsa de terciopelo coral con tarjeta de dedicatoria caligráfica',
    highlightSpecs: ['Bordes pulidos al fuego', 'Charm 3D zanahoria esmaltada', 'Grabado caligráfico frontal']
  },
  'prod-llavero-muertos-luna': {
    primaryMockup: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80',
    pdfReference: 'gifti Club MUKUPS.pdf - Pág. 4',
    artStyle: 'Pirograbado Láser Botánico con Flores de Cempasúchil',
    material: 'Madera de tilo seleccionado con veta cálida',
    packagingDetails: 'Caja de madera con viruta natural y moño satín terracotta',
    highlightSpecs: ['Corona botánica de cempasúchil', 'Calaverita felina tradicional', 'Espacio para nombre en relieve']
  },
  'prod-termo-muertos-husky': {
    primaryMockup: 'https://images.unsplash.com/photo-1578387453818-6c42a46df520?auto=format&fit=crop&w=800&q=80',
    pdfReference: 'gifti Club MUKUPS.pdf - Pág. 5',
    artStyle: 'Impresión UV 360° con Papel Picado y Acabado Cerámico',
    material: 'Acero inoxidable 18/8 doble pared con aislamiento al vacío',
    packagingDetails: 'Cilindro rígido protector con ilustración festiva y lazo coral',
    highlightSpecs: ['Capacidad 40oz (1,180 ml)', 'Mantiene frío 24h / calor 12h', 'Tapa FlowState con popote ergonómico']
  },
  'prod-placa-acero-luna': {
    primaryMockup: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80',
    pdfReference: 'gifti Club MUKUPS.pdf - Pág. 6',
    artStyle: 'Acero Inoxidable Quirúrgico 316L Cepillado con Fibra Láser',
    material: 'Acero inoxidable hipoalergénico de 2mm',
    packagingDetails: 'Estuche miniatura tipo joyero azul noche con sello dorado',
    highlightSpecs: ['Grabado de nombre y teléfono indeleble', 'Argolla doble reforzada antirrobo', 'Resistente al agua de mar']
  },
  'prod-termo-witch-husky': {
    primaryMockup: 'https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=800&q=80',
    pdfReference: 'gifti Club MUKUPS.pdf - Pág. 8',
    artStyle: 'Powder-Coat Negro Mate con Grabado Láser Plateado',
    material: 'Acero térmico con recubrimiento en polvo anti-rayones',
    packagingDetails: 'Caja premium color carbón con lazo satín coral',
    highlightSpecs: ['Grabado láser que expone el brillo del acero', 'Asa reforzada soft-touch', 'Libre de BPA']
  },
  'prod-cuadro-memorial-recuerdo': {
    primaryMockup: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=800&q=80',
    pdfReference: 'gifti Club MUKUPS.pdf - Pág. 10',
    artStyle: 'Madera de Roble Tallada con Banderines de Tela y Cempasúchil',
    material: 'Madera maciza ensamblada a inglete con vidrio antireflejante',
    packagingDetails: 'Caja reforzada con esquineros acolchados y dedicatoria conmemorativa',
    highlightSpecs: ['Marco con profundidad para ofrenda', 'Placa de latón con nombre', 'Soporte para muro o repisa']
  },
  'prod-vela-three-brother-cats': {
    primaryMockup: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=800&q=80',
    pdfReference: 'gifti Club MUKUPS.pdf - Pág. 11',
    artStyle: 'Cera 100% Soya Vertida a Mano con Vaso Negro Boticario',
    material: 'Cera de soya natural, mecha de algodón y esencias botánicas',
    packagingDetails: 'Caja cilíndrica con grabado de cera en la tapa y cerillos largos Gifti',
    highlightSpecs: ['Aroma a vainilla ahumada y canela', 'Duración de quemado: 55 horas', 'Vaso reutilizable']
  },
  'prod-hoodie-wolf-lovers': {
    primaryMockup: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    pdfReference: 'gifti Club MUKUPS.pdf - Pág. 1 & 18',
    artStyle: 'Felpa Francesa 320gsm con Serigrafía Tinta Sumi-e Japonesa',
    material: '100% Algodón peinado de alto gramaje pre-encogido',
    packagingDetails: 'Papel seda impreso con isotipos Gifti en caja kraft azul noche',
    highlightSpecs: ['Ilustración wolf lovers con luna carmesí', 'Capucha forrada con cordón grueso', 'Bolsillo canguro reforzado']
  },
  'prod-mousepad-rgb-howl': {
    primaryMockup: 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?auto=format&fit=crop&w=800&q=80',
    pdfReference: 'gifti Club MUKUPS.pdf - Pág. 15',
    artStyle: 'Microfibra Speed con Borde Óptico RGB 14 Modos',
    material: 'Base de caucho natural antideslizante con microtejido',
    packagingDetails: 'Tubo cilíndrico rígido con cable mallado tipo C incluido',
    highlightSpecs: ['Tamaño XXL 900 x 400 mm', 'Superficie impermeable micro-nano', 'Control de iluminación touch']
  },
  'prod-figura-accion-royal': {
    primaryMockup: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80',
    pdfReference: 'Guía de Marca e Identidad - Pág. 32 (Brand Board)',
    artStyle: 'Tarjeta Blister Retro Series 1 No. 007 con Escudo y Cetro',
    material: 'Resina poliuretánica moldeada a mano y tarjeta laminada mate',
    packagingDetails: 'Burbuja termoconformada sobre tarjeta ilustrada estilo vintage',
    highlightSpecs: ['Edición limitada numerada', 'Accesorios de cetro y escudo real', 'Certificado de autenticidad Gifti']
  },
  'prod-cojin-alebrije-dog': {
    primaryMockup: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    pdfReference: 'Guía de Marca e Identidad - Pág. 40 (Brand Board)',
    artStyle: 'Terciopelo Soft-Touch con Arte Huichol y Neón de Oaxaca',
    material: 'Funda de terciopelo premium con relleno de microfibra siliconada',
    packagingDetails: 'Envoltura con faja de cartón artesanal y listón coral',
    highlightSpecs: ['Medidas 45 x 45 cm', 'Cierre invisible reforzado', 'Colores fluorescentes reactivos']
  },
  'prod-stickers-halloween-akame': {
    primaryMockup: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=800&q=80',
    pdfReference: 'Guía de Marca e Identidad - Pág. 23 (Brand Board)',
    artStyle: 'Vinil 3M Troquelado Kiss-Cut Laminado a Prueba de Agua',
    material: 'Película vinílica impermeable con adhesivo de alta fijación',
    packagingDetails: 'Sobre de celofán con tarjeta protectora y agradecimiento',
    highlightSpecs: ['6 disfraces temáticos Akame', 'Acabado laminado mate anti-rayones', 'No deja residuos']
  },
  'prod-playera-editorial-diademuertos': {
    primaryMockup: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
    pdfReference: 'Guía de Marca - Pág. 74 (Brand Board)',
    artStyle: 'Algodón Peinado 200gsm con Impresión Digital de Alta Densidad',
    material: '100% Algodón peinado suave al tacto',
    packagingDetails: 'Bolsa zip reusable biodegradable con sello de marca',
    highlightSpecs: ['Calce regular streetwear', 'Tinta ecológica base agua de larga duración', 'Cuello rib reforzado']
  }
};

// Official Brand Board Data derived directly from uploaded visual artifact
export const OFFICIAL_BRAND_BOARD = {
  title: 'Brand Board Oficial Gifti Club',
  subtitle: 'Guía de Marca e Identidad Visual (Versión Final) • Pág. 32',
  tagline: 'Regalos que hablan • Pequeños gestos, grandes historias',
  colors: [
    { name: 'Azul Noche Profundo', hex: '#0B1B3D', role: 'Color Principal / Fondos Prémium' },
    { name: 'Coral Terracota', hex: '#E06A55', role: 'Acento Emocional / Call-To-Action' },
    { name: 'Menta Neón', hex: '#38FFD0', role: 'Detalle Luminoso / Sincronización' },
    { name: 'Gris Neutro Frío', hex: '#F8F9FA', role: 'Lienzo / Superficies Limpias' },
  ],
  packagingSystem: {
    box: 'Caja rígida azul noche con hot-stamping dorado',
    ribbon: 'Listón satinado de 25mm en tono Coral Terracota',
    seal: 'Sello de lacre artesanal con relieve de Isotipo G',
    card: 'Tarjeta con dedicatoria en papel de algodón de 300g'
  },
  featuredMockups: [
    {
      name: 'Black Canine Royal Guardian Blister',
      category: 'Coleccionable',
      source: 'Brand Board Pág. 32',
      image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80',
      badge: 'Series 1 No. 007'
    },
    {
      name: 'Sticker Sheet Akame 6 Costumes',
      category: 'Accesorios',
      source: 'Brand Board Pág. 32',
      image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=600&q=80',
      badge: 'Vinil 3M'
    },
    {
      name: 'Hoodie Wolf Lovers 月 & Bambú',
      category: 'Streetwear',
      source: 'MUKUPS.pdf Pág. 1 & 18',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
      badge: 'French Terry 320g'
    },
    {
      name: 'Termo 40oz Día de los Muertos Husky',
      category: 'Bebidas & Hogar',
      source: 'MUKUPS.pdf Pág. 5',
      image: 'https://images.unsplash.com/photo-1578387453818-6c42a46df520?auto=format&fit=crop&w=600&q=80',
      badge: 'Stanley Style 40oz'
    },
    {
      name: 'Llavero Madera Axolotl Gamer',
      category: 'Llaveros',
      source: 'MUKUPS.pdf Pág. 2',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      badge: 'Láser 1200 DPI'
    },
    {
      name: 'Cojín Velvet Alebrije Moon Dog',
      category: 'Decoración',
      source: 'Brand Board Pág. 40',
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80',
      badge: 'Soft-Touch Velvet'
    }
  ]
};
