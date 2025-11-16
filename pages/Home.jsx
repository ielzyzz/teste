import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Leaf, Sparkles, Award, Heart, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

import ProductCard from "../components/products/ProductCard";
import ProductModal from "../components/products/ProductModal";
import CartDrawer from "../components/cart/CartDrawer";

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
  });

  const { data: toppings = [] } = useQuery({
    queryKey: ['toppings'],
    queryFn: () => base44.entities.Topping.list(),
  });

  const { data: sides = [] } = useQuery({
    queryKey: ['sides'],
    queryFn: () => base44.entities.Side.list(),
  });

  const { data: content = [] } = useQuery({
    queryKey: ['content'],
    queryFn: () => base44.entities.SiteContent.list(),
  });

  const heroContent = content.find(c => c.section === 'hero') || {
    title: 'Guaraná da Amazônia',
    subtitle: 'Energia pura da floresta',
    content: 'Experimente o sabor autêntico do guaraná amazônico'
  };

  const aboutContent = content.find(c => c.section === 'about') || {
    title: 'Sobre Nós',
    content: 'Trazemos o melhor da Amazônia direto para você em São Raimundo Nonato - PI.'
  };

  const activeProducts = products.filter(p => p.is_active);
  const guaranaProducts = activeProducts.filter(p => p.category === 'guarana');
  const comboProducts = activeProducts.filter(p => p.category === 'combo');

  const addToCart = (item) => {
    const newCart = [...cart, { ...item, id: Date.now() }];
    setCart(newCart);
    localStorage.setItem('cart_count', newCart.length);
    window.dispatchEvent(new Event('storage'));
  };

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cart_count', cart.length);
  }, [cart]);

  return (
    <div className="organic-pattern min-h-screen">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .leaf-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0C30 0 20 20 20 40c0 20 30 60 30 60s30-40 30-60c0-20-10-40-30-40z' fill='%234CAF50' opacity='0.05'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* Hero Section */}
      <section className="forest-bg relative overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0 opacity-10 leaf-pattern"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFCC00] rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4CAF50] rounded-full blur-3xl opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <div className="flex justify-center mb-8">
              <div className="bg-[#FFCC00] text-[#0B3D14] px-8 py-3 rounded-full font-bold text-base flex items-center gap-3 shadow-xl">
                <Sparkles className="w-5 h-5" />
                100% Natural da Amazônia
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              {heroContent.title}
            </h1>
            <p className="text-2xl md:text-3xl text-white/95 mb-5 font-semibold drop-shadow-lg">
              {heroContent.subtitle}
            </p>
            <p className="text-xl text-white/85 mb-12 max-w-3xl mx-auto">
              {heroContent.content}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="#cardapio">
                <Button className="btn-primary text-xl px-12 py-8 text-white shadow-2xl">
                  Ver Cardápio 🥤
                </Button>
              </a>
              <a href="https://wa.me/5589981029890" target="_blank" rel="noopener noreferrer">
                <Button className="bg-white/20 backdrop-blur-md text-white border-2 border-white/40 hover:bg-white/30 text-xl px-12 py-8 rounded-2xl font-bold shadow-2xl">
                  Fazer Pedido 📱
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: '100% Natural', desc: 'Ingredientes da Amazônia', color: 'from-[#1F7A1F] to-[#4CAF50]' },
              { icon: Sparkles, title: 'Energia Pura', desc: 'Guaraná autêntico', color: 'from-[#D62828] to-[#FFCC00]' },
              { icon: Award, title: 'Qualidade', desc: 'Produtos selecionados', color: 'from-[#4CAF50] to-[#1F7A1F]' },
              { icon: Heart, title: 'Feito com Amor', desc: 'Cuidado em cada detalhe', color: 'from-[#FFCC00] to-[#D62828]' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="text-center p-8 rounded-2xl hover:bg-[#4CAF50]/5 transition-all hover:shadow-xl"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg`}>
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-[#0B3D14] text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="cardapio" className="py-24 bg-gradient-to-b from-white to-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-[#0B3D14] mb-6">
              Nosso Cardápio 🌿
            </h2>
            <p className="text-2xl text-gray-600">
              Escolha seu sabor favorito da Amazônia
            </p>
          </motion.div>

          {guaranaProducts.length > 0 && (
            <div className="mb-20">
              <h3 className="text-4xl font-bold text-[#0B3D14] mb-10 flex items-center gap-4">
                <span className="text-5xl">🥤</span>
                Guaraná da Amazônia
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {guaranaProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            </div>
          )}

          {comboProducts.length > 0 && (
            <div>
              <h3 className="text-4xl font-bold text-[#0B3D14] mb-10 flex items-center gap-4">
                <span className="text-5xl">✨</span>
                Combos Especiais
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {comboProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About */}
      <section id="sobre" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <h2 className="text-5xl font-bold text-[#0B3D14] mb-8">
                {aboutContent.title}
              </h2>
              <div className="prose prose-xl text-gray-700 leading-relaxed">
                <p className="mb-6">{aboutContent.content}</p>
                <p>
                  Nosso guaraná é 100% natural, preparado com ingredientes selecionados da floresta amazônica. 
                  Cada copo traz a essência e energia da natureza para você!
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#1F7A1F] to-[#4CAF50] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=800&q=80"
                  alt="Guaraná"
                  className="w-full h-full object-cover mix-blend-overlay"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contato" className="py-24 forest-bg text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Faça Seu Pedido Agora! 📱
          </h2>
          <p className="text-2xl mb-10 text-white/90">
            Entre em contato e experimente o sabor da Amazônia
          </p>
          <a href="https://wa.me/5589981029890" target="_blank" rel="noopener noreferrer">
            <Button className="btn-primary text-2xl px-16 py-10">
              Pedir pelo WhatsApp 💬
            </Button>
          </a>
        </div>
      </section>

      {/* Cart Button Float */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-28 right-8 z-40 bg-[#D62828] text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform"
      >
        <ShoppingCart className="w-7 h-7" />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#FFCC00] text-[#0B3D14] w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
            {cart.length}
          </span>
        )}
      </button>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          toppings={toppings.filter(t => t.is_active)}
          sides={sides.filter(s => s.is_active)}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        setCart={setCart}
      />
    </div>
  );
}