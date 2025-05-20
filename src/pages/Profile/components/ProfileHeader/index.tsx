
import React, { useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PROFILE_STRINGS } from "../../constants";

interface ProfileHeaderProps {
  title: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = React.memo(({ title }) => {
  const { toast } = useToast();

  const handleLogout = useCallback(() => {
    // In a real app, this would call an authentication service to log the user out
    toast({
      title: PROFILE_STRINGS.LOGOUT.TOAST_TITLE,
      description: PROFILE_STRINGS.LOGOUT.TOAST_DESCRIPTION,
    });
    // Redirect to home page after logout
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  }, [toast]);

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4" />
        {PROFILE_STRINGS.LOGOUT.BUTTON}
      </Button>
    </div>
  );
});

ProfileHeader.displayName = 'ProfileHeader';

export default ProfileHeader;
