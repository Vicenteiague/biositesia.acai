import React, { useState, useEffect, useMemo } from 'react';
import {
  MapPin,
  ChevronRight,
  ChevronDown,
  ShoppingBag,
  Star,
  Copy,
  Check,
  Search,
  LayoutGrid,
  List,
  Phone,
  Plus,
  Minus,
  Trash2,
  X,
  Sparkles,
} from 'lucide-react';
import { STORE_CONFIG, IMAGES, Product, CustomSize } from './data/storeData';

interface CartItem {
  cartItemId: string;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  img: string;
  customDetails?: string;
}

function formatBRL(value: number): string {
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

function WhatsAppIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.031 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.994 9.994 0 004.779 1.217h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.037-5.176-2.922-7.062A9.935 9.935 0 0012.031 2zm5.829 14.148c-.246.693-1.432 1.325-1.988 1.411-.51.078-1.156.111-1.869-.115-.432-.137-.986-.32-1.695-.626-2.984-1.288-4.933-4.293-5.082-4.492-.149-.199-1.214-1.615-1.214-3.081 0-1.466.768-2.187 1.041-2.485.273-.298.595-.373.794-.373.198 0 .397.002.57.01.183.009.428-.07.67.511.248.596.843 2.061.917 2.21.075.149.124.323.025.521-.099.199-.149.323-.298.497-.149.174-.313.388-.447.521-.149.149-.303.31-.13.608.174.298.771 1.272 1.656 2.061 1.138 1.014 2.097 1.329 2.395 1.478.298.149.471.124.645-.075.174-.199.744-.869.942-1.167.199-.298.397-.248.67-.149.273.099 1.736.819 2.034.968.298.149.496.224.57.348.075.124.075.72-.171 1.413z" />
    </svg>
  );
}

function PixDiamondIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2L2 12l10 10 10-10L12 2z" />
      <path d="M8.5 8.5l7 7" />
      <path d="M15.5 8.5l-7 7" />
    </svg>
  );
}

function SafeImage({
  src,
  alt,
  className,
  fallbackSrc = IMAGES.cupLayers,
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
      className={className}
      loading="lazy"
    />
  );
}

export default function App() {
  // Pix Accordion & Copy state
  const [pixOpen, setPixOpen] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);

  // Catalog filter, search, sort, view mode, pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<'relevancia' | 'menor-preco' | 'maior-preco'>('relevancia');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  // Custom Açaí Builder State (Inline + Modal)
  const [selectedSize, setSelectedSize] = useState<CustomSize>(STORE_CONFIG.customSizes[1]); // 400ml default
  const [selectedToppings, setSelectedToppings] = useState<string[]>([
    'Leite em Pó (Ninho)',
    'Leite Condensado',
    'Morango Fresco',
    'Creme de Ninho',
  ]);
  const [builderModalOpen, setBuilderModalOpen] = useState(false);

  // Shopping Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [addedToast, setAddedToast] = useState<string | null>(null);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  // FAQ open states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Weekly Promo Countdown State (Matches screenshot: 5 dias, 12 horas, 38 min, 32 seg)
  const [countdown, setCountdown] = useState({
    days: 5,
    hours: 12,
    minutes: 38,
    seconds: 32,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              days = days > 0 ? days - 1 : 5;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg: string) => {
    setAddedToast(msg);
    setTimeout(() => {
      setAddedToast((prev) => (prev === msg ? null : prev));
    }, 2400);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(STORE_CONFIG.pixCode);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2500);
  };

  const toggleTopping = (topping: string) => {
    setSelectedToppings((prev) => {
      if (prev.includes(topping)) {
        return prev.filter((t) => t !== topping);
      }
      if (prev.length >= 4) {
        showToast('Máximo de 4 acompanhamentos grátis atingido!');
        return prev;
      }
      return [...prev, topping];
    });
  };

  const addProductToCart = (product: Product) => {
    if (product.isCustomizable) {
      const matchedSize = STORE_CONFIG.customSizes.find(
        (s) => s.id === product.defaultSizeId
      );
      if (matchedSize) {
        setSelectedSize(matchedSize);
      }
      setBuilderModalOpen(true);
      return;
    }

    const cartItemId = `prod-${product.id}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          img: product.img,
        },
      ];
    });
    showToast(`${product.name} adicionado!`);
  };

  const addCustomAcaiToCart = () => {
    const toppingsText =
      selectedToppings.length > 0
        ? selectedToppings.join(', ')
        : 'Sem acompanhamentos';
    const customName = `Açaí Montado (${selectedSize.label})`;
    const cartItemId = `custom-${selectedSize.id}-${toppingsText}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: 999,
          name: customName,
          price: selectedSize.price,
          quantity: 1,
          img: IMAGES.cupLayers,
          customDetails: `Acompanhamentos: ${toppingsText}`,
        },
      ];
    });

    setBuilderModalOpen(false);
    showToast(`${customName} adicionado ao pedido!`);
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalCartItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const totalCartPrice = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  const openExternalLink = (url: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const sendOrderToWhatsApp = () => {
    if (cart.length === 0) {
      const defaultUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
        'Olá! Quero fazer um pedido no Açaí do Bela.'
      )}`;
      openExternalLink(defaultUrl);
      return;
    }

    const lines = [
      '🍇 *NOVO PEDIDO - AÇAÍ DO BELA* 🍇',
      '',
      ...cart.map((item) => {
        const sub = formatBRL(item.price * item.quantity);
        const detail = item.customDetails ? `\n   _${item.customDetails}_` : '';
        return `• *${item.quantity}x ${item.name}* — ${sub}${detail}`;
      }),
      '',
      `*Total do Pedido: ${formatBRL(totalCartPrice)}*`,
      '',
      'Poderia confirmar o tempo de entrega / retirada?',
    ];

    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
      lines.join('\n')
    )}`;
    openExternalLink(url);
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let list = [...STORE_CONFIG.products];

    if (activeCategory === 'mais-vendidos') {
      list = list.filter((p) => p.bestSeller);
    } else if (activeCategory !== 'todos') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'menor-preco') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'maior-preco') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, sortBy]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleCategorySelect = (catId: string) => {
    setActiveCategory(catId);
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#e9e3f4] text-[#1e122b] flex justify-center">
      {/* Main Mobile-First Container (matches Nour BioSite mobile frame) */}
      <main className="w-full max-w-[480px] bg-[#f6f4fa] min-h-screen shadow-2xl overflow-x-hidden relative pb-28">
        {/* 1. HERO / CABEÇALHO COM SPLASH DE FRUTAS E ONDA */}
        <header className="relative bg-[#09020f] text-white overflow-hidden">
          {/* Background Splash Image */}
          <div className="absolute inset-0">
            <SafeImage
              src={IMAGES.heroSplash}
              alt="Açaí do Bela Splash"
              className="w-full h-full object-cover object-center opacity-80 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#150524]/75 to-[#1b072e]/95" />
          </div>

          <div className="relative z-10 pt-10 pb-16 px-6 text-center flex flex-col items-center">
            {/* Circular Store Logo with Purple Halo Ring */}
            <div className="w-28 h-28 rounded-full p-2 bg-[#9c73d1]/50 backdrop-blur-md border-2 border-[#b996e8]/60 shadow-2xl mb-4 flex items-center justify-center">
              <SafeImage
                src={IMAGES.logo}
                fallbackSrc={IMAGES.garrafinhaLeiteCondensado}
                alt="Logo de Açaí do Bela"
                className="w-full h-full object-cover rounded-full border-2 border-white/80"
              />
            </div>

            <h1 className="text-[28px] font-extrabold tracking-tight text-white leading-tight">
              {STORE_CONFIG.name}
            </h1>

            <p className="text-[14px] text-white/90 mt-2 max-w-[310px] leading-relaxed font-normal">
              {STORE_CONFIG.slogan}
            </p>

            {/* Especialidades */}
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[11px] tracking-[0.14em] uppercase text-white/95 mt-4 font-semibold">
              <span>AÇAÍ NA GARRAFA</span>
              <span className="text-[#a46ede]">•</span>
              <span>MONTE SEU AÇAÍ</span>
              <span className="text-[#a46ede]">•</span>
              <span>COPOS</span>
              <span className="text-[#a46ede]">•</span>
              <span>COMBOS</span>
            </div>

            {/* Cidade Pill */}
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById('onde-estamos')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="mt-4 inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-xs text-white font-medium transition cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#7c3aed] fill-[#7c3aed]" />
              <span>{STORE_CONFIG.city}</span>
            </button>
          </div>

          {/* Wave Separator at the bottom of the Hero */}
          <div className="relative z-10 -mb-1">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-10 preserve-3d"
              preserveAspectRatio="none"
            >
              <path
                d="M0 64L80 58.7C160 53 320 43 480 48C640 53 800 75 960 80C1120 85 1280 75 1360 69.3L1440 64V120H1360C1280 120 1120 120 960 120C800 120 640 120 480 120C320 120 160 120 80 120H0V64Z"
                fill="#f6f4fa"
              />
            </svg>
          </div>
        </header>

        {/* 2. LETREIRO ANIMADO (MARQUEE ROXO INCLINADO COMO NA FOTO) */}
        <div className="relative z-20 -mt-2 mb-3 -mx-2 transform -rotate-[1.2deg]">
          <div className="bg-[#311052] text-white py-2.5 overflow-hidden shadow-md border-y border-purple-800/40 font-bold text-xs tracking-[0.12em] uppercase">
            <div className="animate-marquee flex items-center gap-6">
              <span>AÇAÍ SUPERCREMOSO</span>
              <span className="text-white">★</span>
              <span>SEM CRISTAIS DE GELO</span>
              <span className="text-white">★</span>
              <span>AÇAÍ SUPERCREMOSO</span>
              <span className="text-white">★</span>
              <span>SEM CRISTAIS DE GELO</span>
              <span className="text-white">★</span>
              <span>AÇAÍ SUPERCREMOSO</span>
              <span className="text-white">★</span>
              <span>SEM CRISTAIS DE GELO</span>
              <span className="text-white">★</span>
            </div>
          </div>
        </div>

        {/* 3. LINKS DE NAVEGAÇÃO RÁPIDA (EXATAMENTE COMO NAS FOTOS) */}
        <section className="px-4 pt-2 pb-3 space-y-3" aria-label="Links principais">
          {/* CTA 1: Fazer pedido no WhatsApp (Card Roxo Degradê) */}
          <a
            href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              'Olá! Quero fazer um pedido no Açaí do Bela.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-[24px] bg-gradient-to-r from-[#662d99] via-[#7c45b0] to-[#986bc4] text-white shadow-md hover:brightness-105 transition active:scale-[0.99]"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                <WhatsAppIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-white/20 px-2.5 py-0.5 rounded-full mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#31e679]" />
                  <span>Atendimento rápido</span>
                </span>
                <b className="block text-[16px] font-bold leading-snug">
                  Fazer pedido no WhatsApp
                </b>
                <small className="text-white/90 text-xs block mt-0.5">
                  Monte o seu açaí
                </small>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/90 shrink-0" />
          </a>

          {/* CTA 2: Ver cardápio */}
          <button
            type="button"
            onClick={() =>
              document
                .getElementById('catalogo')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="w-full text-left flex items-center justify-between p-4 rounded-[24px] bg-white hover:bg-purple-50/50 border border-purple-100 shadow-sm transition active:scale-[0.99] cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 bg-[#6d32a0] text-white rounded-2xl flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <b className="block text-[15px] font-bold text-[#1e122b]">
                  Ver cardápio
                </b>
                <small className="text-slate-500 text-xs block mt-0.5">
                  Tamanhos e acompanhamentos
                </small>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-500 shrink-0" />
          </button>

          {/* CTA 3: Sabor da semana */}
          <button
            type="button"
            onClick={() => {
              setActiveCategory('copos');
              document
                .getElementById('catalogo')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full text-left relative flex items-center justify-between p-4 rounded-[24px] bg-white hover:bg-purple-50/50 border border-purple-100 shadow-sm transition active:scale-[0.99] overflow-hidden cursor-pointer"
          >
            {/* Badge NOVO no canto superior direito */}
            <span className="absolute top-0 right-4 px-3 py-1 text-[10px] font-extrabold uppercase bg-[#2d0c4e] text-white rounded-b-xl tracking-wider">
              NOVO
            </span>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 bg-[#6d32a0] text-white rounded-2xl flex items-center justify-center shrink-0">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <b className="block text-[15px] font-bold text-[#1e122b]">
                  Sabor da semana
                </b>
                <small className="text-slate-500 text-xs block mt-0.5">
                  Novidade na casa
                </small>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-500 shrink-0 mt-2" />
          </button>

          {/* CTA 4: Pagar com Pix (Expansível) */}
          <div className="rounded-[24px] bg-white border border-purple-100 shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setPixOpen((prev) => !prev)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-purple-50/40 transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 bg-[#6d32a0] text-white rounded-2xl flex items-center justify-center shrink-0">
                  <PixDiamondIcon className="w-5 h-5" />
                </div>
                <div>
                  <b className="block text-[15px] font-bold text-[#1e122b]">
                    Pagar com Pix
                  </b>
                  <small className="text-slate-500 text-xs block mt-0.5">
                    QR Code e Pix copia e cola
                  </small>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
                  pixOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {pixOpen && (
              <div className="px-5 pb-5 pt-3 border-t border-purple-100 text-center space-y-3 bg-[#faf8fd]">
                <div className="w-40 h-40 mx-auto rounded-2xl p-2.5 bg-white border border-purple-200 shadow-sm flex items-center justify-center">
                  <SafeImage
                    src={STORE_CONFIG.pixQrUrl}
                    alt="QR Code Pix Açaí do Bela"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs text-slate-600">
                  Recebedor: <b className="text-[#1e122b]">{STORE_CONFIG.name}</b>
                </p>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  No aplicativo do seu banco, escolha <b>Pix › Ler QR Code</b>. Se
                  estiver no celular, copie o código abaixo e use{' '}
                  <b>Pix copia e cola</b>.
                </p>
                <button
                  type="button"
                  onClick={handleCopyPix}
                  className="w-full py-3 px-4 rounded-2xl bg-[#5c238e] hover:bg-[#491973] text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm"
                >
                  {pixCopied ? (
                    <>
                      <Check className="w-4 h-4 text-lime-300" />
                      <span>Código Pix Copiado com Sucesso!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Chave / Código Pix</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* 4. PLATAFORMAS DE DELIVERY (iFood & 99Food Empilhados como na Foto) */}
          <div className="pt-1 space-y-3">
            {/* Peça pelo iFood */}
            <a
              href={STORE_CONFIG.ifoodUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-[24px] bg-gradient-to-r from-[#d81b27] to-[#b5121d] text-white shadow-md hover:brightness-105 transition active:scale-[0.99]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full border-2 border-white flex flex-col items-center justify-center shrink-0 bg-white/10">
                  <span className="text-[11px] font-black tracking-tight lowercase leading-none">
                    ifood
                  </span>
                  <span className="text-[10px] leading-none mt-0.5">◡</span>
                </div>
                <div>
                  <b className="block text-[16px] font-bold text-white leading-snug">
                    Peça pelo iFood
                  </b>
                  <small className="text-xs text-white/90 block mt-0.5">
                    Entrega rápida no seu endereço
                  </small>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            </a>

            {/* Peça pelo 99Food */}
            <a
              href={STORE_CONFIG.food99Url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-[24px] bg-gradient-to-r from-[#ffcf00] to-[#f4b400] text-[#1a1300] shadow-md hover:brightness-105 transition active:scale-[0.99]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full border-2 border-white bg-black/5 flex flex-col items-center justify-center shrink-0">
                  <span className="text-sm font-black leading-none">99</span>
                  <span className="text-[9px] font-bold leading-none mt-0.5">
                    Food
                  </span>
                </div>
                <div>
                  <b className="block text-[16px] font-bold text-[#1a1300] leading-snug">
                    Peça pelo 99Food
                  </b>
                  <small className="text-xs text-[#1a1300]/80 block mt-0.5">
                    Peça e receba em casa
                  </small>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center shrink-0">
                <ChevronRight className="w-5 h-5 text-[#1a1300]" />
              </div>
            </a>
          </div>
        </section>

        {/* 5. CARROSSEL "MAIS PEDIDOS" */}
        <section className="py-5 px-4">
          <h2 className="text-[22px] font-bold text-[#1e122b] tracking-tight">
            Mais pedidos
          </h2>
          <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-[#4a1875] to-[#9b67d1] mt-1.5 mb-2" />
          <p className="text-xs text-slate-500 mb-4">Deslize para ver mais.</p>

          <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2">
            {STORE_CONFIG.bestSellersCarousel.map((item) => (
              <article
                key={item.id}
                onClick={() => addProductToCart(item)}
                className="flex-shrink-0 w-[210px] rounded-[24px] bg-white border border-purple-100/90 shadow-sm overflow-hidden flex flex-col justify-between cursor-pointer hover:shadow-md transition group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-purple-950">
                    {item.topBadge && (
                      <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-[#2b0c49]/95 text-white font-bold text-[10px] uppercase tracking-wider shadow">
                        {item.topBadge}
                      </span>
                    )}
                    <SafeImage
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-3.5">
                    <h3 className="text-[14px] font-bold text-[#1e122b] line-clamp-2 leading-snug">
                      {item.name}
                    </h3>
                    <div className="text-[16px] font-bold text-[#521d82] mt-1.5">
                      {formatBRL(item.price)}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 6. MONTE SEU AÇAÍ PERSONALIZADO (INTERATIVO DO CÓDIGO) */}
        <section className="mx-4 my-3 p-5 rounded-[28px] bg-gradient-to-br from-[#2d0c4e] via-[#3f1668] to-[#5a238c] text-white shadow-lg space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-extrabold uppercase bg-lime-400 text-purple-950 rounded-full">
                <Sparkles className="w-3 h-3" />
                Personalizado
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1.5">
                Monte seu Açaí em Camadas
              </h2>
              <p className="text-xs text-purple-200 mt-0.5">
                Escolha o tamanho do copo e até 4 acompanhamentos inclusos.
              </p>
            </div>
          </div>

          {/* Passo 1: Tamanho */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-lime-300 block">
              1. Escolha o tamanho:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {STORE_CONFIG.customSizes.map((s) => {
                const isSelected = selectedSize.id === s.id;
                return (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => setSelectedSize(s)}
                    className={`p-2.5 rounded-2xl border text-center transition ${
                      isSelected
                        ? 'bg-lime-400 text-purple-950 border-lime-300 font-extrabold shadow-md'
                        : 'bg-white/10 border-white/20 text-purple-100 hover:bg-white/15'
                    }`}
                  >
                    <div className="text-xs font-bold">{s.label}</div>
                    <div className="text-[11px] opacity-90 mt-0.5">
                      {formatBRL(s.price)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Passo 2: Acompanhamentos */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-lime-300">
                2. Acompanhamentos grátis (até 4):
              </label>
              <span className="text-[11px] text-purple-200 font-semibold">
                {selectedToppings.length}/4 escolhidos
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {STORE_CONFIG.toppings.map((t) => {
                const active = selectedToppings.includes(t);
                return (
                  <button
                    type="button"
                    key={t}
                    onClick={() => toggleTopping(t)}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                      active
                        ? 'bg-white text-[#2d0c4e] border-white font-bold shadow-sm'
                        : 'bg-white/10 border-white/15 text-purple-100 hover:bg-white/15'
                    }`}
                  >
                    <span className="truncate pr-1">{t}</span>
                    {active && <Check className="w-3.5 h-3.5 text-[#5a238c] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={addCustomAcaiToCart}
            className="w-full py-3.5 rounded-2xl bg-lime-400 hover:bg-lime-300 text-purple-950 font-extrabold text-xs uppercase tracking-wide transition shadow-lg active:scale-[0.99]"
          >
            + Adicionar Açaí Montado ({formatBRL(selectedSize.price)})
          </button>
        </section>

        {/* 7. CATÁLOGO COMPLETO (EXATAMENTE COMO NAS FOTOS) */}
        <section id="catalogo" className="py-5 px-4 space-y-4">
          <div>
            <h2 className="text-[22px] font-bold text-[#1e122b] tracking-tight">
              Catálogo
            </h2>
            <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-[#4a1875] to-[#9b67d1] mt-1.5 mb-2.5" />
            <p className="text-[13px] text-slate-600 leading-relaxed">
              Escolha os produtos, toque em <b className="text-[#1e122b]">Adicionar</b> e
              envie o pedido pelo WhatsApp.
            </p>
          </div>

          {/* Barra de Busca */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar no catálogo"
              className="w-full py-3.5 pl-4 pr-10 rounded-2xl bg-white border border-purple-200/80 text-sm text-[#1e122b] placeholder:text-slate-400 focus:outline-none focus:border-[#69309c] shadow-xs"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Limpar busca"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <Search className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            )}
          </div>

          {/* Categorias em Círculos (Story Style igual à foto) */}
          <div className="flex gap-3.5 overflow-x-auto no-scrollbar py-1">
            {STORE_CONFIG.categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex flex-col items-center shrink-0 w-[76px] group"
                >
                  <div
                    className={`w-[72px] h-[72px] rounded-full p-1 transition ${
                      isActive
                        ? 'border-[2.5px] border-[#5c238e] bg-purple-100/60 shadow-sm'
                        : 'border-2 border-purple-200/90 bg-white'
                    }`}
                  >
                    {cat.isGridIcon ? (
                      <div className="w-full h-full rounded-full bg-[#e3daf2] flex items-center justify-center text-[#4a1875]">
                        <LayoutGrid className="w-6 h-6 stroke-[2.2]" />
                      </div>
                    ) : (
                      <SafeImage
                        src={cat.img || IMAGES.garrafinhaLeiteCondensado}
                        alt={cat.label}
                        className="w-full h-full object-cover rounded-full"
                      />
                    )}
                  </div>
                  <span
                    className={`text-[11px] mt-1.5 w-full truncate text-center ${
                      isActive
                        ? 'font-bold text-[#4a1875]'
                        : 'font-medium text-slate-700'
                    }`}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Linha de Relevância + Toggle Grid/Lista */}
          <div className="flex items-center justify-between pt-1">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as 'relevancia' | 'menor-preco' | 'maior-preco'
                  )
                }
                aria-label="Ordenar produtos"
                className="appearance-none bg-white border border-purple-200/80 rounded-full py-2.5 pl-4 pr-9 text-xs font-medium text-[#1e122b] shadow-2xs focus:outline-none focus:border-[#5c238e]"
              >
                <option value="relevancia">Relevância</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="flex items-center bg-white border border-purple-200/80 rounded-full p-1 shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-label="Visualização em grade"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                  viewMode === 'grid'
                    ? 'bg-[#6c309c] text-white'
                    : 'text-slate-600 hover:text-[#1e122b]'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                aria-label="Visualização em lista"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                  viewMode === 'list'
                    ? 'bg-[#6c309c] text-white'
                    : 'text-slate-600 hover:text-[#1e122b]'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Contador de produtos e página */}
          <div className="text-xs text-slate-500">
            Exibindo {filteredProducts.length} produtos · página {currentPage} de{' '}
            {totalPages}
          </div>

          {/* Grid / Lista de Produtos */}
          {paginatedProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-purple-100 space-y-2">
              <p className="text-sm font-semibold text-slate-700">
                Nenhum produto encontrado para "{searchQuery}".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('todos');
                }}
                className="text-xs font-bold text-[#6c309c] underline"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 gap-3'
                  : 'grid grid-cols-1 gap-3'
              }
            >
              {paginatedProducts.map((product) => (
                <article
                  key={product.id}
                  className={`rounded-[24px] bg-white border border-purple-100/90 shadow-xs overflow-hidden flex ${
                    viewMode === 'list'
                      ? 'flex-row items-center p-2.5 gap-3'
                      : 'flex-col justify-between p-2'
                  }`}
                >
                  {/* Imagem do Produto */}
                  <div
                    className={`relative overflow-hidden rounded-[18px] bg-purple-950 shrink-0 ${
                      viewMode === 'list' ? 'w-28 h-28' : 'w-full h-44'
                    }`}
                  >
                    {product.topBadge && (
                      <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 rounded-full bg-[#2b0c49]/95 text-white font-bold text-[10px] uppercase tracking-wider">
                        {product.topBadge}
                      </span>
                    )}
                    <SafeImage
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Corpo do Card */}
                  <div className="flex flex-col justify-between flex-1 px-1.5 pt-2.5 pb-1">
                    <div>
                      <h3 className="text-[14px] font-bold text-[#1e122b] line-clamp-2 leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-[11.5px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                        {product.desc}
                      </p>

                      {product.pillTag && (
                        <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-[#eae2f6] text-[#3c1463] font-bold text-[10px] uppercase tracking-wide">
                          {product.pillTag}
                        </span>
                      )}
                    </div>

                    <div className="mt-2.5">
                      <div className="text-[16px] font-bold text-[#4a1875]">
                        {formatBRL(product.price)}
                      </div>

                      <button
                        type="button"
                        onClick={() => addProductToCart(product)}
                        className="mt-2.5 w-full py-2.5 rounded-full border border-slate-300 hover:border-[#5c238e] hover:bg-purple-50/60 bg-white text-[#1e122b] font-semibold text-xs transition active:scale-[0.98]"
                      >
                        Adicionar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Paginação (1, 2, > como na foto) */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4 pb-2">
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                (page) => (
                  <button
                    type="button"
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                      document
                        .getElementById('catalogo')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-11 h-11 rounded-2xl font-semibold text-sm transition ${
                      currentPage === page
                        ? 'bg-[#5c238e] text-white shadow-sm'
                        : 'bg-white border border-purple-200/80 text-[#1e122b] hover:bg-purple-50'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              {currentPage < totalPages && (
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                    document
                      .getElementById('catalogo')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  aria-label="Próxima página"
                  className="w-11 h-11 rounded-2xl bg-white border border-purple-200/80 text-slate-600 hover:bg-purple-50 flex items-center justify-center font-semibold text-sm transition"
                >
                  ›
                </button>
              )}
            </div>
          )}
        </section>

        {/* 8. PROMOÇÃO DA SEMANA COM CONTADOR REGRESSIVO (EXATAMENTE COMO NA FOTO) */}
        <section className="px-4 py-3">
          <div className="rounded-[28px] overflow-hidden shadow-lg bg-gradient-to-b from-[#69329c] via-[#7c4ab0] to-[#8e62bd] text-white">
            {/* Banner Superior com Badge -33% */}
            <div className="relative h-60 w-full bg-[#240b3b] overflow-hidden">
              <SafeImage
                src={IMAGES.promoThreeBottles}
                alt="Promoção Compre 2 e Leve 3 Garrafinhas"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Overlay Tipográfico COMPRE 2 LEVE 3 */}
              <div className="absolute top-4 left-4 bg-[#2d0c4e]/90 backdrop-blur-xs border border-amber-400/40 rounded-2xl px-3.5 py-2 shadow-lg">
                <span className="block text-[11px] font-black uppercase text-amber-300 tracking-wider">
                  COMPRE 2
                </span>
                <span className="block text-xl font-black uppercase text-amber-400 leading-none">
                  LEVE 3
                </span>
                <span className="block text-[10px] font-bold text-white mt-0.5">
                  Garrafinhas 300ml
                </span>
              </div>

              {/* Selo -33% inclinado no canto superior direito */}
              <span className="absolute top-4 right-4 px-3.5 py-1.5 rounded-xl bg-[#270942] text-white font-bold text-xs rotate-6 shadow-md">
                -33%
              </span>
            </div>

            {/* Conteúdo da Promoção */}
            <div className="p-5 space-y-4">
              <div>
                <h2 className="text-[22px] font-bold text-white leading-snug">
                  Promoção da semana
                </h2>
                <div className="w-12 h-1.5 rounded-full bg-[#240b3b] mt-1.5 mb-3" />
                <p className="text-[13.5px] text-white/95 leading-relaxed">
                  Escolha 3 garrafinhas de açaí de 300 ml nos seus sabores
                  favoritos e pague só 2. De R$ 98,70 por R$ 65,90.
                </p>
              </div>

              {/* Caixa Destacada */}
              <div className="rounded-2xl bg-white/10 border border-white/25 p-4 flex items-center justify-between gap-3">
                <div className="text-sm font-medium text-white leading-snug">
                  Compre 2 e Leve 3 |
                  <br />
                  Garrafinhas de 300 ml
                </div>
                <div className="text-lg font-bold text-white whitespace-nowrap">
                  R$ 65,90
                </div>
              </div>

              {/* Cronômetro 4 Colunas */}
              <div className="grid grid-cols-4 gap-2.5">
                <div className="rounded-2xl bg-white/10 border border-white/25 py-3 text-center">
                  <div className="text-xl font-bold text-white tabular-nums">
                    {countdown.days}
                  </div>
                  <div className="text-[11px] text-white/85 mt-0.5">dias</div>
                </div>
                <div className="rounded-2xl bg-white/10 border border-white/25 py-3 text-center">
                  <div className="text-xl font-bold text-white tabular-nums">
                    {String(countdown.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] text-white/85 mt-0.5">horas</div>
                </div>
                <div className="rounded-2xl bg-white/10 border border-white/25 py-3 text-center">
                  <div className="text-xl font-bold text-white tabular-nums">
                    {String(countdown.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] text-white/85 mt-0.5">min</div>
                </div>
                <div className="rounded-2xl bg-white/10 border border-white/25 py-3 text-center">
                  <div className="text-xl font-bold text-white tabular-nums">
                    {String(countdown.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] text-white/85 mt-0.5">seg</div>
                </div>
              </div>

              {/* Botão Pedir no iFood */}
              <a
                href={STORE_CONFIG.ifoodUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 rounded-2xl bg-[#240b3b] hover:bg-[#1a072c] text-white font-bold text-sm text-center shadow-md transition active:scale-[0.99]"
              >
                Pedir no iFood
              </a>
            </div>
          </div>
        </section>

        {/* 9. SOBRE AÇAÍ DO BELA + PERGUNTAS FREQUENTES (COMO NA FOTO) */}
        <section className="px-4 py-6 space-y-6">
          <div>
            <h2 className="text-[22px] font-bold text-[#1e122b] tracking-tight">
              Sobre Açaí do Bela
            </h2>
            <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-[#4a1875] to-[#9b67d1] mt-1.5 mb-3.5" />
            <p className="text-[13.5px] text-slate-600 leading-relaxed">
              O Açaí do Bela é açaí supercremoso e sem cristais de gelo, no Setor
              Bela Vista, em Goiânia. Temos açaí na garrafa em vários sabores
              (leite condensado, Ninho, Nutella, maracujá, Ovomaltine e
              Paçoquita), copos para montar do seu jeito com adicionais grátis e
              combos para compartilhar. Peça pelo iFood, pelo 99Food ou chame no
              WhatsApp.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-[11px] tracking-[0.14em] uppercase text-[#4a1875] font-semibold text-center mt-5 px-2">
              <span>AÇAÍ NA GARRAFA</span>
              <span className="text-purple-400">•</span>
              <span>MONTE SEU AÇAÍ EM CAMADAS</span>
              <span className="text-purple-400">•</span>
              <span>COPOS DE AÇAÍ</span>
              <span className="text-purple-400">•</span>
              <span>COMBOS</span>
            </div>
          </div>

          {/* Perguntas Frequentes */}
          <div>
            <h2 className="text-[22px] font-bold text-[#1e122b] tracking-tight">
              Perguntas frequentes
            </h2>
            <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-[#4a1875] to-[#9b67d1] mt-1.5 mb-4" />

            <div className="space-y-2.5">
              {STORE_CONFIG.faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={faq.question}
                    className="rounded-2xl bg-[#ece6f5] border border-purple-200/80 overflow-hidden transition"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaqIndex(isOpen ? null : index)
                      }
                      className="w-full p-4 text-left flex items-center gap-2.5 font-semibold text-[14px] text-[#1e122b] hover:bg-purple-200/40 transition"
                    >
                      <span
                        className={`text-xs text-[#1e122b] transition-transform duration-200 ${
                          isOpen ? 'rotate-90' : ''
                        }`}
                      >
                        ▶
                      </span>
                      <span>{faq.question}</span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-purple-200/50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 10. ONDE ESTAMOS + RODAPÉ ROXO BIOSITE (EXATAMENTE COMO NA FOTO) */}
        <section id="onde-estamos" className="px-4 pt-2 pb-4 space-y-5">
          <div>
            <h2 className="text-[22px] font-bold text-[#1e122b] tracking-tight">
              Onde estamos
            </h2>
            <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-[#4a1875] to-[#9b67d1] mt-1.5 mb-2" />
            <p className="text-sm text-slate-600">{STORE_CONFIG.cityShort}</p>

            {/* Botões Como chegar e Ligar */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <a
                href={STORE_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#5a228b] to-[#8c5cb8] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm hover:brightness-105 transition"
              >
                <MapPin className="w-4 h-4" />
                <span>Como chegar</span>
              </a>
              <a
                href={`tel:+${STORE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-4 rounded-2xl bg-white border-[1.5px] border-[#4a1875] text-[#321052] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-purple-50 transition"
              >
                <Phone className="w-4 h-4" />
                <span>Ligar</span>
              </a>
            </div>
          </div>
        </section>

        {/* Card Roxo de Rodapé (Nour BioSite style) */}
        <footer className="mt-2 rounded-t-[36px] bg-gradient-to-b from-[#591f8c] via-[#7b4ba6] to-[#966ec0] text-white px-5 pt-9 pb-12 text-center space-y-4 shadow-inner">
          {/* Logo Circular com Borda Branca */}
          <div className="w-20 h-20 mx-auto rounded-full p-1 bg-white/20 border-2 border-white shadow-md">
            <SafeImage
              src={IMAGES.logo}
              fallbackSrc={IMAGES.garrafinhaLeiteCondensado}
              alt="Logo Açaí do Bela"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">
              {STORE_CONFIG.name}
            </h3>
            <p className="text-xs text-white/90 max-w-xs mx-auto leading-relaxed">
              {STORE_CONFIG.slogan}
            </p>
          </div>

          {/* Card Goiânia */}
          <div className="space-y-3 pt-1">
            <a
              href={STORE_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/15 border border-white/25 text-left hover:bg-white/20 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-white">
                {STORE_CONFIG.cityShort}
              </span>
            </a>

            {/* Card Telefone */}
            <a
              href={`tel:+${STORE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/15 border border-white/25 text-left hover:bg-white/20 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-white">
                {STORE_CONFIG.phoneDisplay}
              </span>
            </a>
          </div>

          {/* Botão Pill Instagram */}
          <div className="pt-1">
            <a
              href={STORE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-sm font-medium text-white transition"
            >
              <span className="w-5 h-5 rounded-md bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  className="w-3.5 h-3.5 text-white"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </span>
              <span>Instagram</span>
            </a>
          </div>

          <hr className="border-white/20 my-4" />

          {/* Ícones Sociais Menores */}
          <div className="flex items-center justify-center gap-3">
            <a
              href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full border border-white/25 bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
            </a>
            <a
              href={STORE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-white/25 bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4 text-white"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>

          {/* Créditos do Rodapé */}
          <div className="space-y-1.5 text-xs text-white/85 pt-1">
            <p>
              Feito com ♥️ por <b className="text-white">BiositesAi</b>
            </p>
            <p className="text-white/90">
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                67993174612
              </a>
            </p>
            <button
              type="button"
              onClick={() => setTermsModalOpen(true)}
              className="text-white/90 hover:underline pt-1 block mx-auto"
            >
              Termos de uso e privacidade
            </button>
          </div>
        </footer>

        {/* TOAST DE ITEM ADICIONADO */}
        {addedToast && (
          <div className="fixed top-4 inset-x-4 max-w-[440px] mx-auto z-50 bg-[#2d0c4e] text-white px-4 py-3 rounded-2xl shadow-xl border border-purple-400/30 flex items-center justify-between text-xs font-semibold animate-bounce">
            <span>✓ {addedToast}</span>
            <button
              type="button"
              onClick={() => setCartDrawerOpen(true)}
              className="text-lime-300 font-bold underline ml-2"
            >
              Ver sacola
            </button>
          </div>
        )}

        {/* 11. BARRA FLUTUANTE DO CARRINHO + BOTÃO FLUTUANTE WHATSAPP */}
        {cart.length > 0 && (
          <div className="fixed bottom-4 left-4 right-20 max-w-[380px] mx-auto bg-[#2d0c4e] text-white p-3.5 rounded-2xl shadow-2xl flex items-center justify-between z-40 border border-purple-400/30">
            <div
              onClick={() => setCartDrawerOpen(true)}
              className="cursor-pointer"
            >
              <b className="text-xs block">
                {totalCartItems} {totalCartItems === 1 ? 'item' : 'itens'} na sacola
              </b>
              <small className="text-lime-300 text-xs font-extrabold">
                Total: {formatBRL(totalCartPrice)}
              </small>
            </div>
            <button
              type="button"
              onClick={() => setCartDrawerOpen(true)}
              className="px-3.5 py-2 bg-lime-400 text-purple-950 font-extrabold text-xs rounded-xl hover:bg-lime-300 transition"
            >
              Finalizar
            </button>
          </div>
        )}

        {/* Botão Redondo Verde do WhatsApp no Canto Inferior Direito (Igual às Fotos) */}
        <button
          type="button"
          onClick={() => {
            if (cart.length > 0) {
              setCartDrawerOpen(true);
            } else {
              sendOrderToWhatsApp();
            }
          }}
          aria-label="Fazer pedido pelo WhatsApp"
          className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl flex items-center justify-center z-50 transition transform hover:scale-105 active:scale-95"
        >
          <WhatsAppIcon className="w-7 h-7 text-white" />
          {totalCartItems > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#2d0c4e] text-white text-[10px] font-extrabold flex items-center justify-center border border-white">
              {totalCartItems}
            </span>
          )}
        </button>

        {/* MODAL: PERSONALIZAR AÇAÍ EM CAMADAS */}
        {builderModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white w-full max-w-[460px] rounded-t-3xl sm:rounded-3xl p-5 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between border-b border-purple-100 pb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-purple-100 text-[#4a1875]">
                    +4 Acompanhamentos Grátis
                  </span>
                  <h3 className="text-lg font-extrabold text-[#1e122b] mt-1">
                    Monte seu Açaí em Camadas
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setBuilderModalOpen(false)}
                  className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#4a1875] block">
                  1. Tamanho do Copo:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {STORE_CONFIG.customSizes.map((s) => (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => setSelectedSize(s)}
                      className={`p-3 rounded-2xl border text-left flex items-center justify-between transition ${
                        selectedSize.id === s.id
                          ? 'bg-[#5c238e] text-white border-[#5c238e] font-bold'
                          : 'bg-purple-50/50 border-purple-200 text-[#1e122b]'
                      }`}
                    >
                      <span className="text-xs">{s.label}</span>
                      <span className="text-xs font-extrabold">
                        {formatBRL(s.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#4a1875]">
                    2. Escolha até 4 acompanhamentos:
                  </label>
                  <span className="text-xs font-semibold text-slate-500">
                    {selectedToppings.length}/4
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {STORE_CONFIG.toppings.map((t) => {
                    const active = selectedToppings.includes(t);
                    return (
                      <button
                        type="button"
                        key={t}
                        onClick={() => toggleTopping(t)}
                        className={`p-2.5 rounded-xl border text-left text-xs flex items-center justify-between transition ${
                          active
                            ? 'bg-purple-100 border-[#5c238e] text-[#321052] font-bold'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="truncate pr-1">{t}</span>
                        {active && (
                          <Check className="w-3.5 h-3.5 text-[#5c238e] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={addCustomAcaiToCart}
                className="w-full py-3.5 rounded-2xl bg-[#5c238e] hover:bg-[#4a1875] text-white font-bold text-sm shadow-md transition"
              >
                Confirmar e Adicionar ({formatBRL(selectedSize.price)})
              </button>
            </div>
          </div>
        )}

        {/* DRAWER DO CARRINHO / SACOLA WHATSAPP */}
        {cartDrawerOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white w-full max-w-[460px] rounded-t-3xl sm:rounded-3xl p-5 space-y-4 max-h-[88vh] flex flex-col shadow-2xl">
              <div className="flex items-center justify-between border-b border-purple-100 pb-3">
                <div>
                  <h3 className="text-lg font-extrabold text-[#1e122b]">
                    Seu Pedido no Açaí do Bela
                  </h3>
                  <p className="text-xs text-slate-500">
                    Confira os itens antes de enviar para o WhatsApp
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCartDrawerOpen(false)}
                  className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 py-1">
                {cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#f8f6fc] border border-purple-100"
                  >
                    <SafeImage
                      src={item.img}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#1e122b] truncate">
                        {item.name}
                      </h4>
                      {item.customDetails && (
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                          {item.customDetails}
                        </p>
                      )}
                      <div className="text-xs font-extrabold text-[#5c238e] mt-1">
                        {formatBRL(item.price * item.quantity)}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white border border-purple-200 rounded-xl p-1">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.cartItemId, -1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:bg-purple-50"
                        aria-label="Diminuir quantidade"
                      >
                        {item.quantity === 1 ? (
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
                        ) : (
                          <Minus className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <span className="text-xs font-bold w-5 text-center tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.cartItemId, 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[#5c238e] hover:bg-purple-50"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-purple-100 pt-3 space-y-3">
                <div className="flex items-center justify-between text-base font-extrabold text-[#1e122b]">
                  <span>Total do Pedido</span>
                  <span className="text-[#5c238e]">
                    {formatBRL(totalCartPrice)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={sendOrderToWhatsApp}
                  className="w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#1fb858] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>Enviar Pedido no WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL TERMOS DE USO E PRIVACIDADE */}
        {termsModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-[420px] rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#1e122b]">
                  Termos de uso e privacidade
                </h3>
                <button
                  type="button"
                  onClick={() => setTermsModalOpen(false)}
                  className="p-1.5 rounded-full bg-slate-100 text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Este catálogo digital facilita a montagem e envio do seu pedido
                diretamente para o WhatsApp oficial do <b>Açaí do Bela</b> em
                Goiânia/GO. Nenhum dado pessoal ou bancário é armazenado neste
                site. Pagamentos via Pix são processados diretamente pelo
                aplicativo do seu banco.
              </p>
              <button
                type="button"
                onClick={() => setTermsModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#5c238e] text-white font-semibold text-xs"
              >
                Entendi
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
