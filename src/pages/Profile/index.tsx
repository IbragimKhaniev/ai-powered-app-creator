import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileHeader from './components/ProfileHeader';
import ProfileInfo from './components/ProfileInfo';
import AppsList from './components/AppsList';
import AppSettingsDialog from '@/components/AppSettingsDialog';
import { PROFILE_STRINGS } from './constants';
import { useGetUser, useGetApplications } from '@/api/core';
import { mapUserData, mapApplicationsData } from './utils/dataMappers';
import { useToast } from '@/hooks/use-toast';

const Profile: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Загрузка данных пользователя
  const { 
    data: userData, 
    isLoading: isUserLoading,
    error: userError 
  } = useGetUser({
    query: {
      enabled: true,
      retry: 3,
      staleTime: 1000 * 60 * 5, // 5 минут
    }
  });

  useEffect(() => {
    if (userData) {
      console.log('User data loaded:', userData);
    }
  }, [userData]);
  
  // Загрузка приложений пользователя
  const {
    data: applicationsData,
    isLoading: isAppsLoading,
    error: appsError
  } = useGetApplications({
    query: {
      enabled: true,
      retry: 3,
      refetchInterval: 3000,
    }
  });

  useEffect(() => {
    if (applicationsData) {
      console.log('Applications loaded:', applicationsData);
    }
  }, [applicationsData]);

  useEffect(() => {
    if (userError) {
      toast({
        title: 'Ошибка загрузки',
        description: 'Не удалось загрузить данные пользователя',
        variant: 'destructive'
      });
    }
    
    if (appsError) {
      toast({
        title: 'Ошибка загрузки',
        description: 'Не удалось загрузить список приложений',
        variant: 'destructive'
      });
    }
  }, [userError, appsError, toast]);

  const handleCreateApp = useCallback(() => {
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const handleConfirmSettings = useCallback((settings: any) => {
    console.log('New app settings:', settings);
    setDialogOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/';
  }, []);

  // Преобразуем данные пользователя в нужный формат
  const profileData = useMemo(() => {
    if (userData) {
      return mapUserData(userData);
    }
    return null;
  }, [userData]);

  // Преобразуем данные приложений в нужный формат
  const appsData = useMemo(() => {
    if (applicationsData?.applications) {
      return mapApplicationsData(applicationsData.applications);
    }
    return [];
  }, [applicationsData]);

  const isLoading = isUserLoading || isAppsLoading;
  const hasError = userError || appsError;

  if (isLoading) {
    return <div className="container mx-auto py-10 px-4">Загрузка данных...</div>;
  }

  if (hasError) {
    return <div className="container mx-auto py-10 px-4">Произошла ошибка при загрузке данных</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <ProfileHeader title={PROFILE_STRINGS.TITLE} />
      
      {/* Profile Info Card - Full Width on Top */}
      <div className="mt-8 mb-8">
        {profileData && <ProfileInfo userData={profileData} />}
      </div>
      
      {/* Apps Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Мои приложения</h2>
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

      <AppSettingsDialog 
        isOpen={dialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmSettings}
      />
    </div>
  );
};

export default Profile;
