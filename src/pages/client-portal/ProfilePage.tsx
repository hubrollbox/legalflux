import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { User } from '@/types';

const ProfilePage = () => {
  const [user, setUser] = useState<Partial<User>>({
    id: '123456',
    name: 'Maria Silva',
    email: 'maria.silva@empresa.com',
    phone: '+351 912 345 678',
    role: 'client',
    isActive: true,
    hasTwoFactorEnabled: true,
    createdAt: '2023-09-15T10:30:00Z',
    lastLogin: '2023-11-22T08:45:00Z',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    // Aqui seria implementada a lógica para salvar as alterações do perfil
    setUser(prev => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    }));
    setIsEditing(false);
  };

  const handleToggle2FA = () => {
    // Aqui seria implementada a lógica para ativar/desativar 2FA
    setUser(prev => ({
      ...prev,
      hasTwoFactorEnabled: !prev.hasTwoFactorEnabled,
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Meu Perfil</h1>
        <p className="text-muted-foreground">
          Gerencie suas informações pessoais e configurações de segurança.
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          {user.avatar ? (
            <AvatarImage src={user.avatar} alt={user.name} />
          ) : (
            <AvatarFallback className="text-lg">
              {user.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-muted-foreground">{user.email}</p>
          <p className="text-sm text-muted-foreground">
            Cliente desde {new Date(user.createdAt || '').toLocaleDateString('pt-PT')}
          </p>
        </div>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Informações Pessoais</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="preferences">Preferências</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>
                Atualize suas informações pessoais e de contato.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={isEditing ? formData.name : user.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={isEditing ? formData.email : user.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={isEditing ? formData.phone : user.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="pt-4 flex justify-end space-x-2">
                  {isEditing ? (
                    <>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleSaveProfile}>
                        Salvar Alterações
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      Editar Perfil
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alterar Senha</CardTitle>
              <CardDescription>
                Atualize sua senha para manter sua conta segura.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Senha Atual</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova Senha</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <Button>
                    Atualizar Senha
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Autenticação de Dois Fatores</CardTitle>
              <CardDescription>
                Adicione uma camada extra de segurança à sua conta.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Autenticação de Dois Fatores</h4>
                  <p className="text-sm text-muted-foreground">
                    {user.hasTwoFactorEnabled
                      ? 'A autenticação de dois fatores está ativada.'
                      : 'A autenticação de dois fatores está desativada.'}
                  </p>
                </div>
                <Switch
                  checked={user.hasTwoFactorEnabled}
                  onCheckedChange={handleToggle2FA}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>
                Gerencie como e quando você recebe notificações.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Notificações por Email</h4>
                    <p className="text-sm text-muted-foreground">
                      Receba atualizações sobre seus processos por email.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Notificações por SMS</h4>
                    <p className="text-sm text-muted-foreground">
                      Receba alertas importantes por SMS.
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Resumo Semanal</h4>
                    <p className="text-sm text-muted-foreground">
                      Receba um resumo semanal das atividades dos seus processos.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Idioma e Região</CardTitle>
              <CardDescription>
                Configure suas preferências regionais.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <select
                    id="language"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="pt-PT"
                  >
                    <option value="pt-PT">Português (Portugal)</option>
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Español</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <select
                    id="timezone"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="Europe/Lisbon"
                  >
                    <option value="Europe/Lisbon">Lisboa (GMT+0/+1)</option>
                    <option value="Europe/London">Londres (GMT+0/+1)</option>
                    <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                    <option value="America/New_York">Nova Iorque (GMT-5/-4)</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;