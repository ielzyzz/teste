// arquivo gerado automaticamente
import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Save, X, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SideManager() {
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: 0 });

  const { data: sides = [] } = useQuery({
    queryKey: ['sides'],
    queryFn: () => base44.entities.Side.list(),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Side.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sides'] });
      setIsCreating(false);
      setFormData({ name: '', price: 0 });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Side.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sides'] });
      setEditingId(null);
      setFormData({ name: '', price: 0 });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Side.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sides'] }),
  });

  const handleSave = () => {
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate({ ...formData, is_active: true });
    }
  };

  const handleEdit = (side) => {
    setEditingId(side.id);
    setFormData({ name: side.name, price: side.price });
  };

  return (
    <div className="space-y-8">
      {(isCreating || editingId) && (
        <Card className="bg-[#6B3E26]/20 border-[#6B3E26] backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex justify-between">
              {editingId ? 'Editar Acompanhamento' : 'Novo Acompanhamento'}
              <Button variant="ghost" size="icon" onClick={() => { setIsCreating(false); setEditingId(null); }} className="text-white">
                <X className="w-5 h-5" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-white text-lg">Nome</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#0B3D14]/50 border-[#6B3E26] text-white text-lg"
                placeholder="Ex: Nutella"
              />
            </div>
            <div>
              <Label className="text-white text-lg">Preço (R$)</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                className="bg-[#0B3D14]/50 border-[#6B3E26] text-white text-lg"
              />
            </div>
            <Button
              onClick={handleSave}
              disabled={!formData.name.trim() || formData.price <= 0}
              className="bg-[#6B3E26] hover:bg-[#D62828] text-white font-bold"
            >
              <Save className="w-5 h-5 mr-2" />
              Salvar
            </Button>
          </CardContent>
        </Card>
      )}

      {!isCreating && !editingId && (
        <Button onClick={() => setIsCreating(true)} className="bg-[#6B3E26] hover:bg-[#D62828] text-white font-bold">
          <Plus className="w-5 h-5 mr-2" />
          Adicionar Acompanhamento
        </Button>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sides.map((s) => (
          <Card key={s.id} className="bg-[#6B3E26]/20 border-[#6B3E26] backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🥜</span>
                  <div>
                    <h3 className="text-white font-bold text-xl">{s.name}</h3>
                    <p className="text-[#FFCC00] font-bold text-lg">R$ {s.price.toFixed(2)}</p>
                    <Badge className={s.is_active ? 'bg-[#4CAF50]' : 'bg-[#D62828] mt-1'}>
                      {s.is_active ? 'Disponível' : 'Indisponível'}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(s)}
                    className="text-[#FFCC00] hover:bg-[#FFCC00]/20"
                  >
                    <Edit className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMutation.mutate(s.id)}
                    className="text-[#D62828] hover:bg-[#D62828]/20"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={s.is_active}
                  onCheckedChange={(c) => updateMutation.mutate({ id: s.id, data: { is_active: c } })}
                />
                <Label className="text-white">Ativo</Label>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}