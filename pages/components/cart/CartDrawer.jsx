// arquivo gerado automaticamente
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CartDrawer({ isOpen, onClose, cart, setCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const removeItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('cart_count', newCart.length);
  };

  const sendToWhatsApp = () => {
    if (cart.length === 0) return;

    let message = "🌿 *Pedido DS Guaraná Amazônia* 🌿\n\n";
    
    cart.forEach((item, i) => {
      message += `${i + 1}. *${item.product_name}* - ${item.size}\n`;
      if (item.toppings?.length > 0) {
        message += `   🍯 Coberturas: ${item.toppings.join(', ')}\n`;
      }
      if (item.sides?.length > 0) {
        item.sides.forEach(side => {
          message += `   + ${side.name} (R$ ${side.price.toFixed(2)})\n`;
        });
      }
      message += `   💰 Subtotal: R$ ${item.price.toFixed(2)}\n\n`;
    });

    message += `━━━━━━━━━━━━━━━━\n`;
    message += `💵 *TOTAL: R$ ${total.toFixed(2)}*\n\n`;
    message += "📍 Rua Aniceto Cavalcante, 186 - Aldeia\n";
    message += "Aguardo confirmação! 😊🌿";

    const whatsappUrl = `https://wa.me/5589981029890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-3xl font-bold text-[#0B3D14] flex items-center gap-3">
            <ShoppingBag className="w-7 h-7" />
            Meu Carrinho
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-8 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">🛒</div>
              <p className="text-gray-500 text-xl">Seu carrinho está vazio</p>
              <p className="text-gray-400 mt-2">Adicione produtos deliciosos!</p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={item.id} className="bg-white border-2 border-[#1F7A1F]/30 rounded-2xl p-5 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-[#0B3D14] text-xl">{item.product_name}</h4>
                    <Badge className="mt-2 bg-[#4CAF50] text-white">{item.size}</Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
                
                {item.toppings?.length > 0 && (
                  <div className="text-sm text-gray-600 mt-3 bg-[#FFCC00]/10 p-2 rounded-lg">
                    <strong>🍯 Coberturas:</strong> {item.toppings.join(', ')}
                  </div>
                )}
                
                {item.sides?.length > 0 && (
                  <div className="text-sm text-gray-600 mt-2 bg-[#6B3E26]/10 p-2 rounded-lg">
                    <strong>🥜 Acompanhamentos:</strong>
                    <ul className="mt-1 ml-4">
                      {item.sides.map((side, idx) => (
                        <li key={idx}>• {side.name} (+R$ {side.price.toFixed(2)})</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="text-right mt-4 pt-3 border-t border-gray-200">
                  <span className="text-2xl font-bold text-[#D62828]">
                    R$ {item.price.toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <SheetFooter className="border-t-2 border-[#1F7A1F] pt-6">
          <div className="w-full space-y-6">
            <div className="flex justify-between items-center text-2xl font-bold bg-[#4CAF50]/10 p-4 rounded-xl">
              <span className="text-[#0B3D14]">Total:</span>
              <span className="text-[#D62828] text-3xl">R$ {total.toFixed(2)}</span>
            </div>
            <Button
              onClick={sendToWhatsApp}
              disabled={cart.length === 0}
              className="w-full btn-primary text-xl py-8"
            >
              Finalizar Pedido pelo WhatsApp 💬
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}