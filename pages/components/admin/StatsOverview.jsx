// arquivo gerado automaticamente
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

export default function StatsOverview() {
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
    initialData: [],
  });

  const { data: orders = [] } = useQuery({
    queryKey: ['orders'],
    queryFn: () => base44.entities.Order.list(),
    initialData: [],
  });

  const activeProducts = products.filter(p => p.is_active).length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

  const stats = [
    {
      title: 'Produtos Ativos',
      value: activeProducts,
      total: products.length,
      icon: Package,
      color: 'bg-green-500'
    },
    {
      title: 'Total de Pedidos',
      value: orders.length,
      icon: ShoppingCart,
      color: 'bg-blue-500'
    },
    {
      title: 'Receita Total',
      value: `R$ ${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-yellow-500'
    },
    {
      title: 'Média por Pedido',
      value: orders.length > 0 ? `R$ ${(totalRevenue / orders.length).toFixed(2)}` : 'R$ 0,00',
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              {stat.title}
            </CardTitle>
            <div className={`${stat.color} p-2 rounded-lg`}>
              <stat.icon className="w-4 h-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            {stat.total && (
              <p className="text-xs text-gray-500 mt-1">
                de {stat.total} total
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}