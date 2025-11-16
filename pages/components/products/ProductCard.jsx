// arquivo gerado automaticamente
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function ProductCard({ product, onSelect }) {
  const prices = product.prices || {};
  const validPrices = Object.values(prices).filter(p => p > 0);
  const minPrice = validPrices.length > 0 ? Math.min(...validPrices) : 0;
  const maxPrice = validPrices.length > 0 ? Math.max(...validPrices) : 0;

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border-3 border-[#1F7A1F]/20 hover:border-[#1F7A1F] transition-all duration-300 shadow-xl hover:shadow-2xl rounded-2xl">
        <div className="aspect-square bg-gradient-to-br from-[#4CAF50]/30 to-[#1F7A1F]/30 relative overflow-hidden">
          {product.image_url ? (
            <img 
              src={product.image_url} 
              alt={product.name}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1F7A1F] to-[#4CAF50]">
              <span className="text-9xl drop-shadow-2xl">
                {product.category === 'guarana' ? '🥤' : '✨'}
              </span>
            </div>
          )}
          {!product.is_active && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm">
              <Badge className="bg-[#D62828] text-white text-xl px-6 py-3 shadow-xl">
                Esgotado
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-7">
          <h3 className="text-3xl font-bold text-[#0B3D14] mb-3">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-gray-600 text-base mb-5 line-clamp-2">
              {product.description}
            </p>
          )}
          <div className="mb-6">
            <span className="text-sm text-gray-500 block mb-1">A partir de</span>
            <div className="text-3xl font-bold text-[#D62828]">
              R$ {minPrice.toFixed(2)}
            </div>
            {maxPrice > minPrice && (
              <span className="text-sm text-gray-500">até R$ {maxPrice.toFixed(2)}</span>
            )}
          </div>
          <Button 
            onClick={onSelect}
            disabled={!product.is_active}
            className="w-full btn-primary text-lg py-6"
          >
            {product.is_active ? 'Adicionar ao Carrinho' : 'Indisponível'}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}