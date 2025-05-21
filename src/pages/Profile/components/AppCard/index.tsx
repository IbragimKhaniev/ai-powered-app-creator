
import React from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, ExternalLink } from "lucide-react";
import { UserApp } from "../../types";
import TokenProgress from "../TokenProgress";
import { formatDate } from "../../utils/profileUtils";
import { APP_STATUS, PROFILE_STRINGS } from "../../constants";

interface AppCardProps {
  app: UserApp;
}

const AppCard: React.FC<AppCardProps> = React.memo(({ app }) => {
  const formattedDate = React.useMemo(() => {
    return formatDate(app.createdAt);
  }, [app.createdAt]);

  const badgeVariant = React.useMemo(() => {
    return app.status === APP_STATUS.ACTIVE ? "default" : "secondary";
  }, [app.status]);

  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{app.name}</CardTitle>
          <Badge variant={badgeVariant}>
            {app.status}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{formattedDate}</p>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{PROFILE_STRINGS.APPS.MODEL}</h3>
              <p>{app.aiModel}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{PROFILE_STRINGS.APPS.APP_LINK}</h3>
              <a 
                href={app.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:underline mt-1 text-sm"
              >
                {new URL(app.url).hostname} <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
          
          <TokenProgress tokensUsed={app.tokensUsed} tokensTotal={app.tokensTotal} />
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 bg-muted/20 mt-auto">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="w-full gap-1"
        >
          <Link to={`/constructor?appId=${app.id}`}>
            <Edit className="h-4 w-4" />
            {PROFILE_STRINGS.APPS.EDIT}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
});

AppCard.displayName = 'AppCard';

export default AppCard;
