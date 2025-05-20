
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail } from "lucide-react";
import { UserData } from "../../types";
import { PROFILE_STRINGS } from "../../constants";

interface ProfileInfoProps {
  userData: UserData;
}

const ProfileInfo: React.FC<ProfileInfoProps> = React.memo(({ userData }) => {
  const userInitials = React.useMemo(() => {
    return userData.name.substring(0, 2).toUpperCase();
  }, [userData.name]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{PROFILE_STRINGS.PROFILE_INFO.TITLE}</CardTitle>
        <CardDescription>{PROFILE_STRINGS.PROFILE_INFO.DESCRIPTION}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-8">
          <Avatar className="h-24 w-24">
            <AvatarImage src={userData.avatarUrl} alt={userData.name} />
            <AvatarFallback className="text-2xl">{userInitials}</AvatarFallback>
          </Avatar>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{PROFILE_STRINGS.PROFILE_INFO.NAME}</h3>
              <p className="text-lg">{userData.name}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{PROFILE_STRINGS.PROFILE_INFO.EMAIL}</h3>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p className="text-lg">{userData.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{PROFILE_STRINGS.PROFILE_INFO.PLAN}</h3>
                <p className="text-lg">{userData.plan}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{PROFILE_STRINGS.PROFILE_INFO.TOKENS_LEFT}</h3>
                <p className="text-lg">{userData.tokensLeft}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

ProfileInfo.displayName = 'ProfileInfo';

export default ProfileInfo;
