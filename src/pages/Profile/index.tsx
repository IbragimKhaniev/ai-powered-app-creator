
import React, { useState, useCallback, useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProfileHeader from './components/ProfileHeader';
import ProfileInfo from './components/ProfileInfo';
import AppsList from './components/AppsList';
import AppSettingsDialog from '@/components/AppSettingsDialog';
import { userData, userApps } from './mockData';
import { PROFILE_STRINGS } from './constants';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  const handleCreateApp = useCallback(() => {
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const handleConfirmSettings = useCallback((settings: any) => {
    console.log('New app settings:', settings);
    // In a real app, this would create a new application
    setDialogOpen(false);
  }, []);

  // In a real app, you would fetch user data here with React Query or similar
  const profileData = useMemo(() => userData, []);
  const appsData = useMemo(() => userApps, []);

  return (
    <div className="container mx-auto py-20 px-4">
      <ProfileHeader title={PROFILE_STRINGS.TITLE} />
      
      <Tabs defaultValue="profile" value={activeTab} onValueChange={handleTabChange} className="w-full">
        <div className="flex justify-between items-center mb-8">
          <TabsList>
            <TabsTrigger value="profile">{PROFILE_STRINGS.TABS.PROFILE}</TabsTrigger>
            <TabsTrigger value="apps">{PROFILE_STRINGS.TABS.APPS}</TabsTrigger>
          </TabsList>
          
          <Button 
            onClick={handleCreateApp}
            className="bg-primary text-white flex items-center gap-2 rounded-full"
          >
            <Plus className="h-4 w-4" />
            {PROFILE_STRINGS.CREATE_APP_BUTTON}
          </Button>
        </div>
        
        <TabsContent value="profile">
          <ProfileInfo userData={profileData} />
        </TabsContent>
        
        <TabsContent value="apps">
          <AppsList apps={appsData} />
        </TabsContent>
      </Tabs>

      <AppSettingsDialog 
        isOpen={dialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmSettings}
      />
    </div>
  );
};

export default Profile;
