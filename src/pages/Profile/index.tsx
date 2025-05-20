
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Star, Package, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  // Function to render appropriate status badge
  const renderStatusBadge = (status: string) => {
    switch(status) {
      case "Active":
        return <Badge variant="default" className="bg-green-500">Активно</Badge>;
      case "In Progress":
        return <Badge variant="secondary" className="bg-amber-400 text-amber-900">В работе</Badge>;
      default:
        return <Badge variant="outline">Другое</Badge>;
    }
  };

  return (
    <div 
      className="container mx-auto py-20 px-4 min-h-screen"
      style={{
        background: "linear-gradient(180deg, rgba(240,240,255,0.5) 0%, rgba(255,255,255,1) 100%)"
      }}
    >
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
        Мой профиль
      </h1>
      
      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
        <TabsList className="mb-8 w-full justify-center bg-white/50 backdrop-blur-sm rounded-xl p-1 border">
          <TabsTrigger value="profile" className="text-base px-6 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all">
            Профиль
          </TabsTrigger>
          <TabsTrigger value="apps" className="text-base px-6 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all">
            Мои приложения
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card className="overflow-hidden border-none shadow-xl bg-white/80 backdrop-blur-sm">
            <div className="h-32 bg-gradient-to-r from-purple-600 to-blue-500 relative">
              <div className="absolute -bottom-16 left-8">
                <Avatar className="h-32 w-32 ring-4 ring-white">
                  <AvatarImage src={userData.avatarUrl} alt={userData.name} />
                  <AvatarFallback className="text-3xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                    {userData.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            
            <CardHeader className="pt-20 pb-4">
              <CardTitle className="text-2xl font-bold">{userData.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-purple-600" />
                <span>{userData.email}</span>
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <div className="bg-purple-50 p-6 rounded-xl transition-transform transform hover:scale-105 duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-600 rounded-lg text-white">
                      <Package className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-purple-900">Тарифный план</h3>
                      <p className="text-xl font-bold mt-1 text-purple-700">{userData.plan}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-xl transition-transform transform hover:scale-105 duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-600 rounded-lg text-white">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-blue-900">Остаток токенов</h3>
                      <p className="text-xl font-bold mt-1 text-blue-700">
                        {userData.tokensLeft}
                        <span className="text-sm text-blue-500 ml-1">токенов</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="apps">
          <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b pb-6">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                    Мои приложения
                  </CardTitle>
                  <CardDescription>
                    Список ваших созданных приложений
                  </CardDescription>
                </div>
                <div className="bg-purple-100 px-4 py-2 rounded-lg">
                  <span className="text-purple-800 font-medium">{userApps.length} приложений</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {userApps.length > 0 ? (
                <div className="overflow-hidden rounded-xl">
                  <Table>
                    <TableHeader className="bg-purple-50">
                      <TableRow>
                        <TableHead className="font-medium text-purple-900">Название</TableHead>
                        <TableHead className="font-medium text-purple-900">Дата создания</TableHead>
                        <TableHead className="font-medium text-purple-900">Статус</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userApps.map((app) => (
                        <TableRow key={app.id} className="hover:bg-purple-50/50 transition-colors">
                          <TableCell className="font-medium flex items-center gap-2">
                            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                              {app.name.charAt(0)}
                            </div>
                            <span>{app.name}</span>
                          </TableCell>
                          <TableCell>{app.createdAt}</TableCell>
                          <TableCell>{renderStatusBadge(app.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-16 bg-purple-50/30 rounded-xl">
                  <div className="inline-flex justify-center items-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                    <Star className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-medium text-purple-900 mb-2">
                    Нет созданных приложений
                  </h3>
                  <p className="text-purple-500 max-w-sm mx-auto">
                    Вы пока не создали ни одного приложения. Начните прямо сейчас!
                  </p>
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
