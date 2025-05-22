
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
      staleTime: 1000 * 60 * 5, // 5 минут
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
    // В реальном приложении, здесь было бы создание приложения
    setDialogOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    // Удаляем признак авторизации из localStorage
    localStorage.removeItem('isAuthenticated');
    // Перенаправляем на главную страницу
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
    <div className="container mx-auto py-10 px-4">
      <ProfileHeader title={PROFILE_STRINGS.TITLE} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-1">
          {profileData && <ProfileInfo userData={profileData} />}
        </div>
        
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-6">
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
