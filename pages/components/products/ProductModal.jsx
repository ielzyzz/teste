// arquivo gerado automaticamente
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle } from "lucide-react";

export default function ProductModal({ product, toppings, sides, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(product.available_sizes?.[0] || '300ml');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedSides, setSelectedSides] = useState([]);

  const currentPrice = product.prices?.[selectedSize] || 0;
  const sidesPrice = selectedSides.reduce((sum, sideName) => {
    const side = sides.find(s => s.name === sideName);
    return sum + (side?.price || 0);
  }, 0);
  const totalPrice = currentPrice + sidesPrice;

  const handleAddToCart = () => {
    const item = {
      product_name: product.name,
      size: selectedSize,
      price: totalPrice,
      toppings: selectedToppings,
      sides: selectedSides.map(sideName => {
        const side = sides.find(s => s.name === sideName);
        return { name: sideName, price: side?.price || 0 };
      })
    };
    onAddToCart(item);
    onClose();
  };

  const toggleTopping = (topping) => {
    if (selectedToppings.includes(topping)) {
      setSelectedToppings(prev => prev.filter(t => t !== topping));
    } else if (selectedToppings.length < 2) {
      setSelectedToppings(prev => [...prev, topping]);
    }
  };

  const toggleSide = (side) => {
    setSelectedSides(prev => 
      prev.includes(side) ? prev.filter(s => s !== side) : [...prev, side]
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-[#0B3D14] flex items-center gap-3">
            {product.category === 'guarana' ? '🥤' : '✨'}
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {product.image_url && (
            <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-[#4CAF50]/20 to-[#1F7A1F]/20">
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            </div>
          )}

          {product.description && (
            <p className="text-gray-600 text-lg">{product.description}</p>
          )}

          {/* Size */}
          <div>
            <Label className="text-xl font-bold text-[#0B3D14] mb-4 block">
              Escolha o Tamanho
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {product.available_sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`p-5 rounded-2xl border-3 transition-all ${
                    selectedSize === size
                      ? 'border-[#1F7A1F] bg-[#4CAF50]/20 shadow-lg scale-105'
                      : 'border-gray-300 hover:border-[#4CAF50]'
                  }`}
                >
                  <div className="font-bold text-[#0B3D14] text-lg">{size}</div>
                  <div className="text-[#D62828] font-bold text-xl mt-1">
                    R$ {product.prices?.[size]?.toFixed(2)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Toppings */}
          <div>
            <Label className="text-xl font-bold text-[#0B3D14] mb-2 block">
              Coberturas Grátis (Escolha até 2)
            </Label>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-[#FFCC00]" />
              <span className="text-sm text-gray-600">
                {selectedToppings.length}/2 selecionadas
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {toppings.map((topping) => (
                <div
                  key={topping.id}
                  onClick={() => toggleTopping(topping.name)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedToppings.includes(topping.name)
                      ? 'border-[#FFCC00] bg-[#FFCC00]/20 shadow-md'
                      : selectedToppings.length >= 2
                      ? 'border-gray-200 opacity-50 cursor-not-allowed'
                      : 'border-gray-300 hover:border-[#FFCC00]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox 
                      checked={selectedToppings.includes(topping.name)}
                      disabled={!selectedToppings.includes(topping.name) && selectedToppings.length >= 2}
                    />
                    <span className="font-semibold">{topping.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sides */}
          <div>
            <Label className="text-xl font-bold text-[#0B3D14] mb-4 block">
              Acompanhamentos (Opcional)
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {sides.map((side) => (
                <div
                  key={side.id}
                  onClick={() => toggleSide(side.name)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedSides.includes(side.name)
                      ? 'border-[#6B3E26] bg-[#6B3E26]/20 shadow-md'
                      : 'border-gray-300 hover:border-[#6B3E26]/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Checkbox checked={selectedSides.includes(side.name)} />
                      <span className="font-semibold text-sm">{side.name}</span>
                    </div>
                    <span className="text-[#D62828] font-bold">+R$ {side.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-[#4CAF50]/20 to-[#1F7A1F]/20 rounded-2xl p-6 border-2 border-[#1F7A1F]">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-[#0B3D14] text-lg">Produto:</span>
              <span className="text-2xl font-bold text-[#0B3D14]">
                R$ {currentPrice.toFixed(2)}
              </span>
            </div>
            {sidesPrice > 0 && (
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-[#0B3D14] text-lg">Acompanhamentos:</span>
                <span className="text-2xl font-bold text-[#0B3D14]">
                  R$ {sidesPrice.toFixed(2)}
                </span>
              </div>
            )}
            <div className="border-t-2 border-[#1F7A1F] pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#0B3D14] text-xl">Total:</span>
                <span className="text-4xl font-bold text-[#D62828]">
                  R$ {totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-3">
          <Button variant="outline" onClick={onClose} className="text-lg px-8 py-6">
            Cancelar
          </Button>
          <Button onClick={handleAddToCart} className="btn-primary text-lg px-8 py-6">
            Adicionar - R$ {totalPrice.toFixed(2)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}