// arquivo gerado automaticamente
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ShoppingCart, Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = parseInt(localStorage.getItem('cart_count') || '0');

  const isAdmin = currentPageName === "Admin";

  if (isAdmin) {
    return <div className="min-h-screen bg-[#0B3D14]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <style>{`
        :root {
          --amazon-dark: #0B3D14;
          --amazon-green: #1F7A1F;
          --amazon-light: #4CAF50;
          --guarana-red: #D62828;
          --fruit-yellow: #FFCC00;
          --seed-brown: #6B3E26;
        }

        .btn-primary {
          background: var(--guarana-red);
          color: white;
          border: none;
          font-weight: 700;
          padding: 14px 36px;
          border-radius: 16px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(214, 40, 40, 0.4);
        }

        .btn-primary:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 30px rgba(214, 40, 40, 0.6);
          background: #B81E1E;
        }

        .forest-bg {
          background: linear-gradient(135deg, #0B3D14 0%, #1F7A1F 50%, #4CAF50 100%);
        }

        .organic-pattern {
          background-image: 
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231F7A1F' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-lg shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-4">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691915ee79f147868eed2b13/05c6729e5_IMG-20250906-WA0007.jpg"
                alt="DS Guaraná Logo"
                className="h-16 w-16 object-contain"
              />
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-[#0B3D14] leading-tight">DS Guaraná</h1>
                <p className="text-sm text-[#1F7A1F] font-semibold">Amazônia</p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link 
                to={createPageUrl("Home")} 
                className={`font-semibold transition-colors hover:text-[#1F7A1F] ${
                  location.pathname === createPageUrl("Home") ? 'text-[#1F7A1F]' : 'text-gray-700'
                }`}
              >
                Início
              </Link>
              <a 
                href="#cardapio" 
                className="font-semibold text-gray-700 hover:text-[#1F7A1F] transition-colors"
              >
                Cardápio
              </a>
              <a 
                href="#sobre" 
                className="font-semibold text-gray-700 hover:text-[#1F7A1F] transition-colors"
              >
                Sobre
              </a>
              <a 
                href="#contato" 
                className="font-semibold text-gray-700 hover:text-[#1F7A1F] transition-colors"
              >
                Contato
              </a>
              <Link to={createPageUrl("Admin")}>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-[#0B3D14]">
                  <Shield className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-[#1F7A1F]"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <Link 
                to={createPageUrl("Home")} 
                className="block py-3 font-semibold text-gray-700 hover:text-[#1F7A1F] border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Início
              </Link>
              <a 
                href="#cardapio" 
                className="block py-3 font-semibold text-gray-700 hover:text-[#1F7A1F] border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cardápio
              </a>
              <a 
                href="#sobre" 
                className="block py-3 font-semibold text-gray-700 hover:text-[#1F7A1F] border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre
              </a>
              <a 
                href="#contato" 
                className="block py-3 font-semibold text-gray-700 hover:text-[#1F7A1F] border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contato
              </a>
              <Link to={createPageUrl("Admin")} onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full border-[#1F7A1F] text-[#1F7A1F]">
                  <Shield className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-24">
        {children}
      </main>

      {/* Footer */}
      <footer className="forest-bg text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691915ee79f147868eed2b13/05c6729e5_IMG-20250906-WA0007.jpg"
                  alt="DS Logo"
                  className="h-12 w-12"
                />
                <div>
                  <h3 className="text-xl font-bold text-[#FFCC00]">DS Guaraná Amazônia</h3>
                </div>
              </div>
              <p className="text-gray-200 text-sm leading-relaxed">
                O sabor autêntico da Amazônia em cada gole. 
                Guaraná natural e refrescante em São Raimundo Nonato - PI.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#FFCC00] text-lg">Contato</h4>
              <div className="space-y-3 text-sm text-gray-200">
                <p className="flex items-center gap-2">📱 <strong>WhatsApp:</strong> (89) 98102-9890</p>
                <p className="flex items-center gap-2">📍 <strong>Endereço:</strong></p>
                <p className="ml-6">Rua Aniceto Cavalcante, 186</p>
                <p className="ml-6">Aldeia - São Raimundo Nonato/PI</p>
                <p className="flex items-center gap-2">📷 <strong>Instagram:</strong> @dsguaranadaamazoniasrn</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#FFCC00] text-lg">Horário</h4>
              <p className="text-gray-200">
                <strong>Segunda a Sábado</strong><br />
                Das 10h às 22h
              </p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-12 pt-8 text-center text-sm text-gray-300">
            <p>© 2024 DS Guaraná Amazônia. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/5589981029890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 animate-pulse"
      >
        <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}