
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Mail, Crown, User } from "lucide-react";
import { UserData } from "../../types";
import { PROFILE_STRINGS } from "../../constants";

interface ProfileInfoProps {
  userData: UserData;
}

const ProfileInfo: React.FC<ProfileInfoProps> = React.memo(({ userData }) => {
  const userInitials = React.useMemo(() => {
    return userData.name.substring(0, 2).toUpperCase();
  }, [userData.name]);

  const tokenPercentage = React.useMemo(() => {
    const totalTokens = 1000;
    return (userData.tokensLeft / totalTokens) * 100;
  }, [userData.tokensLeft]);

  return (
    <Card className="w-full">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userData.avatarUrl} alt={userData.name} />
              <AvatarFallback className="text-2xl bg-primary/10">{userInitials}</AvatarFallback>
            </Avatar>
          </div>

          {/* User Info Section */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {PROFILE_STRINGS.PROFILE_INFO.NAME}
                </h3>
                <p className="text-lg font-semibold">{userData.name}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {PROFILE_STRINGS.PROFILE_INFO.EMAIL}
                </h3>
                <p className="text-sm">{userData.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Crown className="h-4 w-4" />
                  {PROFILE_STRINGS.PROFILE_INFO.PLAN}
                </h3>
                <p className="text-lg font-semibold">{userData.plan}</p>
                
                {userData.plan !== "PRO" && (
                  <div className="mt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-2"
                    >
                      <Crown className="h-4 w-4" />
                      {PROFILE_STRINGS.PROFILE_INFO.UPGRADE_TO_PRO}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  {PROFILE_STRINGS.PROFILE_INFO.TOKENS_LEFT}
                </h3>
                <div className="space-y-2">
                  <Progress value={tokenPercentage} className="h-3" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Использовано</span>
                    <span className="font-medium">{userData.tokensLeft} / 1000</span>
                  </div>
                </div>
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
