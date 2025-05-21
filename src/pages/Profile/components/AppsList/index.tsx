
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserApp } from "../../types";
import AppCard from "../AppCard";
import { PROFILE_STRINGS } from "../../constants";

interface AppsListProps {
  apps: UserApp[];
}

const AppsList: React.FC<AppsListProps> = React.memo(({ apps }) => {
  return (
    <div className="space-y-6">
      {apps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {apps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-muted-foreground text-center">{PROFILE_STRINGS.APPS.EMPTY}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
});

AppsList.displayName = 'AppsList';

export default AppsList;
