
import React, { useState, useCallback, useMemo } from 'react';
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
  const [dialogOpen, setDialogOpen] = useState(false);
  
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-1">
          <ProfileInfo userData={profileData} />
        </div>
        
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">{PROFILE_STRINGS.APPS.TITLE}</h2>
            <Link to="/constructor">
              <Button 
                className="bg-primary text-white flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                {PROFILE_STRINGS.CREATE_APP_BUTTON}
              </Button>
            </Link>
          </div>
          
          <AppsList apps={appsData} />
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
