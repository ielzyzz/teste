import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function ContentEditor() {
  const queryClient = useQueryClient();
  const { data: content = [] } = useQuery({
    queryKey: ['content'],
    queryFn: () => base44.entities.SiteContent.list(),
  });

  const [heroData, setHeroData] = useState({ title: '', subtitle: '', content: '' });
  const [aboutData, setAboutData] = useState({ title: '', content: '' });

  useEffect(() => {
    const hero = content.find(c => c.section === 'hero');
    const about = content.find(c => c.section === 'about');
    if (hero) setHeroData({ title: hero.title || '', subtitle: hero.subtitle || '', content: hero.content || '' });
    if (about) setAboutData({ title: about.title || '', content: about.content || '' });
  }, [content]);

  const upsertMutation = useMutation({
    mutationFn: async ({ section, data }) => {
      const existing = content.find(c => c.section === section);
      if (existing) {
        return base44.entities.SiteContent.update(existing.id, data);
      } else {
        return base44.entities.SiteContent.create({ section, ...data });
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['content'] }),
  });

  return (
    <div className="space-y-8">
      <Card className="bg-[#1F7A1F]/20 border-[#4CAF50] backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white text-2xl">Seção Hero (Topo)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-[#FFCC00] text-lg">Título Principal</Label>
            <Input
              value={heroData.title}
              onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
              className="bg-[#0B3D14]/50 border-[#4CAF50] text-white text-lg"
            />
          </div>
          <div>
            <Label className="text-[#FFCC00] text-lg">Subtítulo</Label>
            <Input
              value={heroData.subtitle}
              onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
              className="bg-[#0B3D14]/50 border-[#4CAF50] text-white text-lg"
            />
          </div>
          <div>
            <Label className="text-[#FFCC00] text-lg">Descrição</Label>
            <Textarea
              value={heroData.content}
              onChange={(e) => setHeroData({ ...heroData, content: e.target.value })}
              className="bg-[#0B3D14]/50 border-[#4CAF50] text-white"
            />
          </div>
          <Button onClick={() => upsertMutation.mutate({ section: 'hero', data: heroData })} className="bg-[#4CAF50] hover:bg-[#1F7A1F] text-white font-bold">
            <Save className="w-5 h-5 mr-2" />
            Salvar Hero
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-[#1F7A1F]/20 border-[#4CAF50] backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white text-2xl">Seção Sobre</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-[#FFCC00] text-lg">Título</Label>
            <Input
              value={aboutData.title}
              onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
              className="bg-[#0B3D14]/50 border-[#4CAF50] text-white text-lg"
            />
          </div>
          <div>
            <Label className="text-[#FFCC00] text-lg">Conteúdo</Label>
            <Textarea
              value={aboutData.content}
              onChange={(e) => setAboutData({ ...aboutData, content: e.target.value })}
              className="bg-[#0B3D14]/50 border-[#4CAF50] text-white h-32"
            />
          </div>
          <Button onClick={() => upsertMutation.mutate({ section: 'about', data: aboutData })} className="bg-[#4CAF50] hover:bg-[#1F7A1F] text-white font-bold">
            <Save className="w-5 h-5 mr-2" />
            Salvar Sobre
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
