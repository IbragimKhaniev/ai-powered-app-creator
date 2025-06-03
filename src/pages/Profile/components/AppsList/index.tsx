
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {apps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      ) : (
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground text-lg">{PROFILE_STRINGS.APPS.EMPTY}</p>
              <p className="text-sm text-muted-foreground">Создайте своё первое приложение, чтобы начать работу</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
});

AppsList.displayName = 'AppsList';

export default AppsList;
