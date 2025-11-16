import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Package, FileText, LogOut, DollarSign, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

import ProductManager from "../components/admin/ProductManager";
import ToppingManager from "../components/admin/ToppingManager";
import SideManager from "../components/admin/SideManager";
import ContentEditor from "../components/admin/ContentEditor";

export default function AdminPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
  });

  const { data: orders = [] } = useQuery({
    queryKey: ['orders'],
    queryFn: () => base44.entities.Order.list(),
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await base44.auth.me();
        if (user.role === 'admin') {
          setIsAuthenticated(true);
        } else {
          base44.auth.redirectToLogin(createPageUrl("Admin"));
        }
      } catch (error) {
        base44.auth.redirectToLogin(createPageUrl("Admin"));
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B3D14] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-[#FFCC00] mx-auto mb-6"></div>
          <p className="text-white text-xl">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const activeProducts = products.filter(p => p.is_active).length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B3D14] to-[#1F7A1F]">
      {/* Header */}
      <div className="bg-[#0B3D14]/90 backdrop-blur-md border-b border-[#4CAF50]/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#FFCC00] rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-[#0B3D14]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Painel Admin</h1>
                <p className="text-[#4CAF50]">DS Guaraná Amazônia</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate(createPageUrl("Home"))}
                className="bg-[#4CAF50] hover:bg-[#1F7A1F] text-white font-bold"
              >
                Ver Site
              </Button>
              <Button
                onClick={() => base44.auth.logout()}
                variant="outline"
                className="border-[#FFCC00] text-[#FFCC00] hover:bg-[#FFCC00] hover:text-[#0B3D14]"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <Card className="bg-[#1F7A1F]/30 border-[#4CAF50] backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-[#FFCC00] text-sm flex items-center gap-2">
                <Package className="w-4 h-4" />
                Produtos Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white">{activeProducts}</div>
              <p className="text-xs text-gray-300 mt-1">de {products.length} total</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1F7A1F]/30 border-[#4CAF50] backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-[#FFCC00] text-sm flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Total Pedidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white">{orders.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1F7A1F]/30 border-[#4CAF50] backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-[#FFCC00] text-sm flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Receita Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white">R$ {totalRevenue.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1F7A1F]/30 border-[#4CAF50] backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-[#FFCC00] text-sm">Média/Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white">
                R$ {orders.length > 0 ? (totalRevenue / orders.length).toFixed(2) : '0.00'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products">
          <TabsList className="bg-[#0B3D14]/50 border border-[#4CAF50]/30 backdrop-blur-sm">
            <TabsTrigger value="products" className="data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white">
              <Package className="w-4 h-4 mr-2" />
              Produtos
            </TabsTrigger>
            <TabsTrigger value="toppings" className="data-[state=active]:bg-[#FFCC00] data-[state=active]:text-[#0B3D14]">
              🍯 Coberturas
            </TabsTrigger>
            <TabsTrigger value="sides" className="data-[state=active]:bg-[#6B3E26] data-[state=active]:text-white">
              🥜 Acompanhamentos
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white">
              <FileText className="w-4 h-4 mr-2" />
              Conteúdo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-8">
            <ProductManager />
          </TabsContent>

          <TabsContent value="toppings" className="mt-8">
            <ToppingManager />
          </TabsContent>

          <TabsContent value="sides" className="mt-8">
            <SideManager />
          </TabsContent>

          <TabsContent value="content" className="mt-8">
            <ContentEditor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
