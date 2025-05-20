
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Link, ExternalLink, Edit, LogOut } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link as RouterLink } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock data - In a real app, this would come from an API or context
const userData = {
  email: "user@example.com",
  name: "John Doe",
  plan: "Premium",
  tokensLeft: 850,
  avatarUrl: ""
};

// Extended mock apps data
const userApps = [
  { 
    id: 1, 
    name: "Blog App", 
    createdAt: "2025-04-15", 
    status: "Active", 
    aiModel: "GPT-4o", 
    tokensUsed: 3200, 
    tokensTotal: 5000,
    url: "https://blog-app.example.com"
  },
  { 
    id: 2, 
    name: "E-commerce Store", 
    createdAt: "2025-05-01", 
    status: "Active", 
    aiModel: "GPT-4o-mini", 
    tokensUsed: 1500, 
    tokensTotal: 5000,
    url: "https://store.example.com"
  },
  { 
    id: 3, 
    name: "Portfolio Site", 
    createdAt: "2025-05-12", 
    status: "In Progress", 
    aiModel: "GPT-4.5-preview", 
    tokensUsed: 4800, 
    tokensTotal: 5000,
    url: "https://portfolio.example.com"
  }
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();

  const handleLogout = () => {
    // In a real app, this would call an authentication service to log the user out
    toast({
      title: "Выход из системы",
      description: "Вы успешно вышли из системы",
    });
    // Redirect to home page after logout
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Мой профиль</h1>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Выйти
        </Button>
      </div>
      
      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="apps">Мои приложения</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Информация профиля</CardTitle>
              <CardDescription>Ваши персональные данные и информация о подписке</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-8">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={userData.avatarUrl} alt={userData.name} />
                  <AvatarFallback className="text-2xl">{userData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Имя</h3>
                    <p className="text-lg">{userData.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Электронная почта</h3>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p className="text-lg">{userData.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Тарифный план</h3>
                      <p className="text-lg">{userData.plan}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Остаток токенов</h3>
                      <p className="text-lg">{userData.tokensLeft}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="apps">
          <Card>
            <CardHeader>
              <CardTitle>Мои приложения</CardTitle>
              <CardDescription>Список ваших созданных приложений</CardDescription>
            </CardHeader>
            <CardContent>
              {userApps.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {userApps.map((app) => (
                    <AccordionItem key={app.id} value={app.id.toString()}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center justify-between w-full pr-4">
                          <div className="font-medium">{app.name}</div>
                          <Badge variant={app.status === "Active" ? "default" : "secondary"}>
                            {app.status}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Дата создания</h3>
                              <p>{app.createdAt}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Модель ИИ</h3>
                              <p>{app.aiModel}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Использовано токенов</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Progress value={(app.tokensUsed / app.tokensTotal) * 100} className="h-2" />
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {app.tokensUsed} / {app.tokensTotal}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Ссылка на приложение</h3>
                              <a 
                                href={app.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-primary hover:underline mt-1"
                              >
                                {app.url} <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="gap-1"
                            >
                              <RouterLink to={`/constructor?appId=${app.id}`}>
                                <Edit className="h-4 w-4" />
                                Редактировать
                              </RouterLink>
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">У вас пока нет созданных приложений</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
