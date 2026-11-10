import heroSplashImg from '../assets/images/hero_acai_splash_1794325347372.jpg';
import bottleNinhoNutellaImg from '../assets/images/acai_bottle_ninho_nutella_1794325347428.jpg';
import cupLayersImg from '../assets/images/acai_cup_layers_1794325349780.jpg';
import promoThreeBottlesImg from '../assets/images/acai_promo_three_bottles_1794325351270.jpg';
import bottleMaracujaImg from '../assets/images/acai_bottle_maracuja_1794325351124.jpg';

export interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  originalPrice?: number;
  topBadge?: string;
  pillTag?: string;
  category: 'mais-vendidos' | 'garrafas' | 'monte-seu' | 'copos' | 'combos' | 'semana';
  bestSeller?: boolean;
  isCustomizable?: boolean;
  defaultSizeId?: string;
  img: string;
}

export interface CustomSize {
  id: string;
  label: string;
  volume: string;
  price: number;
}

export interface CategoryItem {
  id: string;
  label: string;
  img?: string;
  isGridIcon?: boolean;
}

export const IMAGES = {
  logo: 'https://ngksyecksqqrsumcmisr.supabase.co/storage/v1/object/public/fotos/3d3c936c6e90cf314738458d2ca0e07f.jpg',
  garrafinhaLeiteCondensado: 'https://ngksyecksqqrsumcmisr.supabase.co/storage/v1/object/public/fotos/a8e3302b20c2dc39740d6e991bf32d10.webp',
  heroSplash: heroSplashImg,
  bottleNinhoNutella: bottleNinhoNutellaImg,
  cupLayers: cupLayersImg,
  promoThreeBottles: promoThreeBottlesImg,
  bottleMaracuja: bottleMaracujaImg,
};

export const STORE_CONFIG = {
  name: 'Açaí do Bela',
  slogan: 'Açaí com sabor de verdade! Feito com carinho para adoçar o seu dia.',
  city: 'Goiânia/GO',
  cityShort: 'Goiânia',
  neighborhood: 'Setor Bela Vista',
  phoneDisplay: '(67) 99317-4612',
  whatsappNumber: '5567993174612',
  instagramUrl: 'https://www.instagram.com/',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Setor+Bela+Vista+Goiania+GO',
  ifoodUrl:
    'https://www.ifood.com.br/delivery/goiania-go/acai-do-bela-setor-bela-vista/798edf69-6d2a-410b-9a07-9c4ad3b7aa45?utm_medium=share',
  food99Url: 'https://oia.99app.com/dlp9/SBnztI',
  pixCode:
    '00020126360014BR.GOV.BCB.PIX0114+55679931746125204000053039865802BR5912Acai do Bela6007Goiania62070503***6304',
  pixQrUrl:
    'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020126360014BR.GOV.BCB.PIX0114+55679931746125204000053039865802BR5912Acai%20do%20Bela6007Goiania62070503***6304',
  customSizes: [
    { id: '300ml', label: 'Copo 300ml', volume: '300 ml', price: 22.9 },
    { id: '400ml', label: 'Copo 400ml', volume: '400 ml', price: 39.9 },
    { id: '500ml', label: 'Copo 500ml', volume: '500 ml', price: 44.9 },
    { id: '700ml', label: 'Copo 700ml', volume: '700 ml', price: 52.9 },
  ] as CustomSize[],
  toppings: [
    'Leite em Pó (Ninho)',
    'Leite Condensado',
    'Granola Crocante',
    'Paçoca',
    'Morango Fresco',
    'Banana',
    'Gotas de Chocolate',
    'Creme de Ninho',
    'Confete / Disqueti',
    'Calda de Morango',
  ],
  categories: [
    { id: 'todos', label: 'Tudo', isGridIcon: true },
    {
      id: 'mais-vendidos',
      label: 'Mais vendidos',
      img: IMAGES.garrafinhaLeiteCondensado,
    },
    {
      id: 'garrafas',
      label: 'Açaí na garrafa',
      img: IMAGES.bottleMaracuja,
    },
    {
      id: 'monte-seu',
      label: 'Monte seu açaí',
      img: IMAGES.cupLayers,
    },
    {
      id: 'copos',
      label: 'Copos prontos',
      img: IMAGES.bottleNinhoNutella,
    },
    {
      id: 'combos',
      label: 'Combos',
      img: IMAGES.promoThreeBottles,
    },
  ] as CategoryItem[],
  bestSellersCarousel: [
    {
      id: 1,
      topBadge: 'MAIS PEDIDO',
      name: 'Garrafinha 300 ml com Leite Condensado',
      desc: 'Açaí batido supercremoso na garrafinha com leite condensado.',
      price: 27.9,
      category: 'garrafas',
      img: IMAGES.garrafinhaLeiteCondensado,
    },
    {
      id: 2,
      topBadge: 'TRUFADO',
      name: 'Garrafa com Nutella + Ninho',
      desc: 'Garrafa trufada com camadas de Nutella original e creme de Ninho.',
      price: 32.9,
      category: 'garrafas',
      img: IMAGES.bottleNinhoNutella,
    },
    {
      id: 11,
      topBadge: '+4 GRÁTIS',
      name: 'Monte seu Açaí em Camadas 400 ml',
      desc: 'Monte seu copo em camadas com até 4 acompanhamentos inclusos.',
      price: 39.9,
      category: 'monte-seu',
      isCustomizable: true,
      defaultSizeId: '400ml',
      img: IMAGES.cupLayers,
    },
    {
      id: 12,
      topBadge: 'NOVO',
      name: 'Sabor da Semana: Açaí Pistache & Morango',
      desc: 'Edição especial da semana com creme de pistache, morango fresco e Ninho.',
      price: 34.9,
      category: 'semana',
      img: IMAGES.cupLayers,
    },
  ] as Product[],
  products: [
    {
      id: 1,
      topBadge: 'MAIS PEDIDO',
      pillTag: 'MAIS PEDIDO',
      name: 'Garrafinha 300 ml | Açaí com Leite Condensado',
      desc: 'Açaí supercremoso e sem cristais de gelo, com camadas generosas de leite condensado.',
      price: 27.9,
      category: 'garrafas',
      bestSeller: true,
      img: IMAGES.garrafinhaLeiteCondensado,
    },
    {
      id: 2,
      name: 'Garrafinha 300 ml | Açaí Tentação de Morango e Nutella',
      desc: 'Açaí premium, sem cristais de gelo, com Nutella original e morangos selecionados.',
      price: 32.9,
      category: 'garrafas',
      bestSeller: true,
      img: IMAGES.bottleNinhoNutella,
    },
    {
      id: 3,
      topBadge: '-33%',
      pillTag: '-33%',
      name: 'Compre 2 e Leve 3 | Garrafinhas de 300 ml',
      desc: 'Escolha 3 garrafinhas de 300 ml nos seus sabores favoritos e pague só 2.',
      price: 65.9,
      originalPrice: 98.7,
      category: 'combos',
      bestSeller: true,
      img: IMAGES.promoThreeBottles,
    },
    {
      id: 4,
      name: 'Garrafa de Açaí com Leite Condensado',
      desc: 'Açaí cremoso com leite condensado. A combinação clássica perfeita.',
      price: 27.9,
      category: 'garrafas',
      img: IMAGES.bottleMaracuja,
    },
    {
      id: 5,
      name: 'Garrafa de Açaí Puro',
      desc: 'Açaí tradicional, puro, supercremoso e sem cristais de gelo.',
      price: 29.9,
      category: 'garrafas',
      img: IMAGES.garrafinhaLeiteCondensado,
    },
    {
      id: 6,
      name: 'Garrafa de Açaí com Paçoquita',
      desc: 'Açaí cremoso com Paçoquita. Perfeito para quem ama amendoim.',
      price: 29.9,
      category: 'garrafas',
      img: IMAGES.promoThreeBottles,
    },
    {
      id: 7,
      name: 'Garrafa de Açaí com Mousse de Maracujá',
      desc: 'Açaí cremoso com mousse de maracujá artesanal super aerado.',
      price: 31.9,
      category: 'garrafas',
      img: IMAGES.bottleMaracuja,
    },
    {
      id: 8,
      name: 'Garrafa de Açaí com Creme de Leite Ninho',
      desc: 'Açaí cremoso com leite em pó e creme de Ninho especial.',
      price: 31.9,
      category: 'garrafas',
      bestSeller: true,
      img: IMAGES.garrafinhaLeiteCondensado,
    },
    {
      id: 9,
      name: 'Garrafa de Açaí com Nutella',
      desc: 'Açaí cremoso com creme de avelã. Cremoso e intenso.',
      price: 32.9,
      category: 'garrafas',
      img: IMAGES.bottleNinhoNutella,
    },
    {
      id: 10,
      topBadge: 'MAIS PEDIDO',
      pillTag: 'MAIS PEDIDO',
      name: 'Garrafa de Açaí com Nutella + Creme de Ninho',
      desc: 'Açaí cremoso com creme de Ninho e Nutella original em camadas.',
      price: 32.9,
      category: 'garrafas',
      bestSeller: true,
      img: IMAGES.bottleNinhoNutella,
    },
    {
      id: 11,
      topBadge: '+4 GRÁTIS',
      pillTag: '+4 GRÁTIS',
      name: 'Monte seu Açaí em Camadas 400 ml',
      desc: 'Copo de 400 ml em camadas com até 4 acompanhamentos grátis à sua escolha.',
      price: 39.9,
      category: 'monte-seu',
      bestSeller: true,
      isCustomizable: true,
      defaultSizeId: '400ml',
      img: IMAGES.cupLayers,
    },
    {
      id: 12,
      topBadge: 'NOVO',
      pillTag: 'SABOR DA SEMANA',
      name: 'Sabor da Semana: Açaí Pistache & Morango',
      desc: 'Edição especial da semana com creme de pistache, morango fresco e Ninho.',
      price: 34.9,
      category: 'copos',
      bestSeller: true,
      img: IMAGES.cupLayers,
    },
    {
      id: 13,
      topBadge: '+4 GRÁTIS',
      name: 'Monte seu Açaí em Camadas 300 ml',
      desc: 'Copo de 300 ml montado do seu jeito com 4 acompanhamentos inclusos.',
      price: 22.9,
      category: 'monte-seu',
      isCustomizable: true,
      defaultSizeId: '300ml',
      img: IMAGES.cupLayers,
    },
    {
      id: 14,
      topBadge: '+4 GRÁTIS',
      name: 'Monte seu Açaí em Camadas 500 ml',
      desc: 'Copo de 500 ml caprichado em camadas com até 4 acompanhamentos grátis.',
      price: 44.9,
      category: 'monte-seu',
      isCustomizable: true,
      defaultSizeId: '500ml',
      img: IMAGES.cupLayers,
    },
    {
      id: 15,
      topBadge: '+4 GRÁTIS',
      name: 'Monte seu Açaí em Camadas 700 ml',
      desc: 'Para quem tem muita fome de açaí! 700 ml com 4 adicionais grátis.',
      price: 52.9,
      category: 'monte-seu',
      isCustomizable: true,
      defaultSizeId: '700ml',
      img: IMAGES.cupLayers,
    },
    {
      id: 16,
      name: 'Garrafa de Açaí com Ovomaltine',
      desc: 'Açaí supercremoso com creme crocante e flocos de Ovomaltine.',
      price: 31.9,
      category: 'garrafas',
      img: IMAGES.bottleNinhoNutella,
    },
    {
      id: 17,
      name: 'Garrafa de Açaí com Morango e Leite Condensado',
      desc: 'Açaí batido com pedaços de morango fresco e leite condensado.',
      price: 31.9,
      category: 'garrafas',
      img: IMAGES.garrafinhaLeiteCondensado,
    },
    {
      id: 18,
      topBadge: 'COMBO CASAL',
      pillTag: 'COMBO CASAL',
      name: 'Combo 2 Copos 500 ml Completos',
      desc: '2 copos de 500 ml com leite condensado, Ninho, morango e banana.',
      price: 46.9,
      category: 'combos',
      bestSeller: true,
      img: IMAGES.cupLayers,
    },
    {
      id: 19,
      name: 'Copo Pronto 400 ml | Clássico Bela',
      desc: 'Açaí, banana, morango, granola crocante, leite em pó e leite condensado.',
      price: 32.9,
      category: 'copos',
      img: IMAGES.cupLayers,
    },
    {
      id: 20,
      topBadge: 'TRUFADO',
      name: 'Copo Pronto 500 ml | Explosão de Ninho & Nutella',
      desc: 'Camadas generosas de creme de Leite Ninho, Nutella original e morangos.',
      price: 42.9,
      category: 'copos',
      bestSeller: true,
      img: IMAGES.cupLayers,
    },
    {
      id: 21,
      name: 'Combo Dupla Garrafinha | Ninho + Nutella',
      desc: '2 garrafinhas de 300 ml trufadas com creme de Ninho e Nutella.',
      price: 58.9,
      category: 'combos',
      img: IMAGES.promoThreeBottles,
    },
    {
      id: 22,
      topBadge: 'FAMÍLIA',
      name: 'Combo Família | 4 Garrafinhas 300 ml Sortidas',
      desc: '4 garrafinhas de 300 ml nos sabores que toda a família mais ama.',
      price: 99.9,
      category: 'combos',
      img: IMAGES.promoThreeBottles,
    },
    {
      id: 23,
      name: 'Garrafa 500 ml | Açaí com Leite Ninho e Morango',
      desc: 'Garrafa grande de 500 ml trufada com creme de Ninho e morangos.',
      price: 41.9,
      category: 'garrafas',
      img: IMAGES.garrafinhaLeiteCondensado,
    },
    {
      id: 24,
      name: 'Garrafa 500 ml | Açaí Trufado com Nutella',
      desc: 'Garrafa grande de 500 ml com camadas intensas de Nutella original.',
      price: 44.9,
      category: 'garrafas',
      img: IMAGES.bottleNinhoNutella,
    },
  ] as Product[],
  faqs: [
    {
      question: 'O que o Açaí do Bela vende?',
      answer:
        'Vendemos açaí na garrafa trufado em diversos sabores (Leite Condensado, Ninho, Nutella, Mousse de Maracujá, Ovomaltine, Paçoquita e Puro), copos montados em camadas do seu jeito com até 4 adicionais grátis, copos prontos e combos promocionais.',
    },
    {
      question: 'Como faço meu pedido?',
      answer:
        'É super simples! Escolha seus produtos aqui no catálogo, toque em "Adicionar" para montar seu carrinho e clique em "Enviar Pedido no WhatsApp". Se preferir, você também pode pedir direto pelo iFood ou 99Food.',
    },
    {
      question: 'Onde fica o Açaí do Bela?',
      answer:
        'Estamos localizados no Setor Bela Vista, em Goiânia/GO. Atendemos pedidos via delivery rápido para toda a região e também retirada combinada pelo WhatsApp.',
    },
    {
      question: 'O açaí tem cristais de gelo?',
      answer:
        'Não! Nosso açaí tem receita exclusiva supercremosa, batida na temperatura ideal e 100% livre de cristais de gelo, garantindo textura aveludada do início ao fim.',
    },
  ],
};
