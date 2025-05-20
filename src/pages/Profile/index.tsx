
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail } from "lucide-react";

// Mock data - In a real app, this would come from an API or context
const userData = {
  email: "user@example.com",
  name: "John Doe",
  plan: "Premium",
  tokensLeft: 850,
  avatarUrl: ""
};

// Mock apps data
const userApps = [
  { id: 1, name: "Blog App", createdAt: "2025-04-15", status: "Active" },
  { id: 2, name: "E-commerce Store", createdAt: "2025-05-01", status: "Active" },
  { id: 3, name: "Portfolio Site", createdAt: "2025-05-12", status: "In Progress" }
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-8">Мой профиль</h1>
      
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Дата создания</TableHead>
                      <TableHead>Статус</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userApps.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">{app.name}</TableCell>
                        <TableCell>{app.createdAt}</TableCell>
                        <TableCell>{app.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
