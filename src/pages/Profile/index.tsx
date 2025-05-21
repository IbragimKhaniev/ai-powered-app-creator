
import React, { useState, useCallback, useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
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
    <div className="container mx-auto py-10 px-4">
      <ProfileHeader title={PROFILE_STRINGS.TITLE} />
      
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <div className="w-full md:w-1/3">
          <ProfileInfo userData={profileData} />
        </div>
        
        <div className="w-full md:w-2/3">
          <Tabs defaultValue="apps" value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="apps">{PROFILE_STRINGS.TABS.APPS}</TabsTrigger>
              </TabsList>
              
              <Link to="/constructor">
                <Button 
                  className="bg-primary text-white flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  {PROFILE_STRINGS.CREATE_APP_BUTTON}
                </Button>
              </Link>
            </div>
            
            <TabsContent value="apps">
              <AppsList apps={appsData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AppSettingsDialog 
        isOpen={dialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmSettings}
      />
    </div>
  );
};

export default Profile;
