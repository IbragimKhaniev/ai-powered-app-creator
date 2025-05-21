
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Mail, Crown } from "lucide-react";
import { UserData } from "../../types";
import { PROFILE_STRINGS } from "../../constants";

interface ProfileInfoProps {
  userData: UserData;
}

const ProfileInfo: React.FC<ProfileInfoProps> = React.memo(({ userData }) => {
  const userInitials = React.useMemo(() => {
    return userData.name.substring(0, 2).toUpperCase();
  }, [userData.name]);

  // Calculate the percentage of tokens used
  const tokenPercentage = React.useMemo(() => {
    // Assuming the total tokens is 1000 for this example
    const totalTokens = 1000;
    return (userData.tokensLeft / totalTokens) * 100;
  }, [userData.tokensLeft]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{PROFILE_STRINGS.PROFILE_INFO.TITLE}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6">
          <Avatar className="h-32 w-32">
            <AvatarImage src={userData.avatarUrl} alt={userData.name} />
            <AvatarFallback className="text-3xl">{userInitials}</AvatarFallback>
          </Avatar>
          
          <div className="space-y-6 w-full">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{PROFILE_STRINGS.PROFILE_INFO.NAME}</h3>
              <p className="text-lg font-medium">{userData.name}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{PROFILE_STRINGS.PROFILE_INFO.EMAIL}</h3>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p>{userData.email}</p>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{PROFILE_STRINGS.PROFILE_INFO.PLAN}</h3>
                <p className="text-lg font-medium">{userData.plan}</p>
              </div>
              
              {userData.plan !== "PRO" && (
                <div className="mt-3">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="bg-primary text-white flex items-center gap-2"
                  >
                    <Crown className="h-4 w-4" />
                    {PROFILE_STRINGS.PROFILE_INFO.UPGRADE_TO_PRO}
                  </Button>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">{PROFILE_STRINGS.PROFILE_INFO.TOKENS_LEFT}</h3>
              <div className="space-y-2">
                <Progress value={tokenPercentage} className="h-2" />
                <p className="text-sm text-right">{userData.tokensLeft} tokens left</p>
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
