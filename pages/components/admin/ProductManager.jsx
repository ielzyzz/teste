// arquivo gerado automaticamente
import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Save, X, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProductManager() {
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '', category: 'guarana', description: '', image_url: '', is_active: true,
    prices: { '250ml': 0, '300ml': 0, '400ml': 0, '500ml': 0 },
    available_sizes: ['300ml', '400ml', '500ml']
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Product.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Product.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Product.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setFormData({
      name: product.name, category: product.category,
      description: product.description || '', image_url: product.image_url || '',
      is_active: product.is_active,
      prices: product.prices || { '250ml': 0, '300ml': 0, '400ml': 0, '500ml': 0 },
      available_sizes: product.available_sizes || ['300ml', '400ml', '500ml']
    });
  };

  const handleSave = () => {
    const slug = formData.name.toLowerCase().replace(/\s+/g, '-');
    const dataToSave = { ...formData, slug };
    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct, data: dataToSave });
    } else {
      createMutation.mutate(dataToSave);
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setIsCreating(false);
    setFormData({
      name: '', category: 'guarana', description: '', image_url: '', is_active: true,
      prices: { '250ml': 0, '300ml': 0, '400ml': 0, '500ml': 0 },
      available_sizes: ['300ml', '400ml', '500ml']
    });
  };

  const handleImageUpload = async (file) => {
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setFormData({ ...formData, image_url: file_url });
  };

  return (
    <div className="space-y-8">
      {(isCreating || editingProduct) && (
        <Card className="bg-[#1F7A1F]/20 border-[#4CAF50] backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex justify-between">
              {editingProduct ? 'Editar Produto' : 'Novo Produto'}
              <Button variant="ghost" size="icon" onClick={resetForm} className="text-white">
                <X className="w-5 h-5" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-[#FFCC00] text-lg">Nome</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-[#0B3D14]/50 border-[#4CAF50] text-white text-lg"
                />
              </div>
              <div>
                <Label className="text-[#FFCC00] text-lg">Categoria</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger className="bg-[#0B3D14]/50 border-[#4CAF50] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guarana">Guaraná</SelectItem>
                    <SelectItem value="combo">Combo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-[#FFCC00] text-lg">Descrição</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-[#0B3D14]/50 border-[#4CAF50] text-white"
              />
            </div>

            <div>
              <Label className="text-[#FFCC00] text-lg">Imagem</Label>
              <div className="flex gap-3">
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="bg-[#0B3D14]/50 border-[#4CAF50] text-white"
                />
                <Button onClick={() => document.getElementById('img-up').click()} className="bg-[#FFCC00] text-[#0B3D14]">
                  <Upload className="w-5 h-5" />
                </Button>
                <input
                  id="img-up"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0])}
                />
              </div>
            </div>

            <div>
              <Label className="text-[#FFCC00] text-lg mb-4 block">Preços por Tamanho</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['250ml', '300ml', '400ml', '500ml'].map((size) => (
                  <div key={size}>
                    <Label className="text-gray-300">{size}</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.prices[size]}
                      onChange={(e) => setFormData({
                        ...formData,
                        prices: { ...formData.prices, [size]: parseFloat(e.target.value) || 0 }
                      })}
                      className="bg-[#0B3D14]/50 border-[#4CAF50] text-white"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Switch
                checked={formData.is_active}
                onCheckedChange={(c) => setFormData({ ...formData, is_active: c })}
              />
              <Label className="text-white text-lg">Produto Ativo</Label>
            </div>

            <Button onClick={handleSave} className="bg-[#4CAF50] hover:bg-[#1F7A1F] text-white font-bold">
              <Save className="w-5 h-5 mr-2" />
              Salvar
            </Button>
          </CardContent>
        </Card>
      )}

      {!isCreating && !editingProduct && (
        <Button onClick={() => setIsCreating(true)} className="bg-[#FFCC00] hover:bg-[#D62828] text-[#0B3D14] font-bold">
          <Plus className="w-5 h-5 mr-2" />
          Adicionar Produto
        </Button>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <Card key={p.id} className="bg-[#1F7A1F]/20 border-[#4CAF50] backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white text-xl">{p.name}</CardTitle>
                  <Badge className={p.is_active ? 'bg-[#4CAF50]' : 'bg-[#D62828]'}>{p.is_active ? 'Ativo' : 'Inativo'}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(p)} className="text-[#FFCC00]">
                    <Edit className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(p.id)} className="text-[#D62828]">
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {p.image_url && <img src={p.image_url} alt={p.name} className="w-full h-40 object-cover rounded-xl mb-4" />}
              <p className="text-gray-300 text-sm mb-3">{p.description}</p>
              {Object.entries(p.prices || {}).map(([size, price]) => (
                price > 0 && (
                  <div key={size} className="flex justify-between text-sm">
                    <span className="text-gray-400">{size}</span>
                    <span className="text-[#FFCC00] font-bold">R$ {price.toFixed(2)}</span>
                  </div>
                )
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}