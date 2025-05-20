
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import { UserApp } from "../../types";
import AppListItem from "../AppListItem";
import { PROFILE_STRINGS } from "../../constants";

interface AppsListProps {
  apps: UserApp[];
}

const AppsList: React.FC<AppsListProps> = React.memo(({ apps }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{PROFILE_STRINGS.APPS.TITLE}</CardTitle>
        <CardDescription>{PROFILE_STRINGS.APPS.DESCRIPTION}</CardDescription>
      </CardHeader>
      <CardContent>
        {apps.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {apps.map((app) => (
              <AppListItem key={app.id} app={app} />
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">{PROFILE_STRINGS.APPS.EMPTY}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
});

AppsList.displayName = 'AppsList';

export default AppsList;
