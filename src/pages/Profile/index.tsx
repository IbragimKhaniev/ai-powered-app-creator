
import React, { useState, useCallback, useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProfileHeader from './components/ProfileHeader';
import ProfileInfo from './components/ProfileInfo';
import AppsList from './components/AppsList';
import { userData, userApps } from './mockData';
import { PROFILE_STRINGS } from './constants';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  // In a real app, you would fetch user data here with React Query or similar
  const profileData = useMemo(() => userData, []);
  const appsData = useMemo(() => userApps, []);

  return (
    <div className="container mx-auto py-20 px-4">
      <ProfileHeader title={PROFILE_STRINGS.TITLE} />
      
      <Tabs defaultValue="profile" value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="profile">{PROFILE_STRINGS.TABS.PROFILE}</TabsTrigger>
          <TabsTrigger value="apps">{PROFILE_STRINGS.TABS.APPS}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <ProfileInfo userData={profileData} />
        </TabsContent>
        
        <TabsContent value="apps">
          <AppsList apps={appsData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
