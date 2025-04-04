
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SupportTab = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Contacte-nos</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="text-primary mt-1 flex-shrink-0" size={18} />
            <span>Edifício Diplomata, 4450-075 Matosinhos, Portugal</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-primary flex-shrink-0" size={18} />
            <span>+351 220 145 169</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="text-primary flex-shrink-0" size={18} />
            <span>suporte@legalflux.pt</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Formulários</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Suporte Técnico</h4>
            <form className="space-y-3">
              <Input placeholder="Assunto" />
              <Textarea placeholder="Descreva o seu problema" />
              <Button type="submit">Enviar</Button>
            </form>
          </div>

          <div>
            <h4 className="font-medium mb-2">Informações Comerciais</h4>
            <form className="space-y-3">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de pedido" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="demo">Demonstração</SelectItem>
                  <SelectItem value="pricing">Informação de Preços</SelectItem>
                  <SelectItem value="partnership">Parceria</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Empresa" />
              <Input placeholder="Email" type="email" />
              <Button type="submit">Solicitar</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTab;
