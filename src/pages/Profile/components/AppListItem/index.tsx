
import React from 'react';
import { UserApp } from "../../types";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import TokenProgress from "../TokenProgress";
import { formatDate } from "../../utils/profileUtils";
import { APP_STATUS, PROFILE_STRINGS } from "../../constants";

interface AppListItemProps {
  app: UserApp;
}

const AppListItem: React.FC<AppListItemProps> = React.memo(({ app }) => {
  const formattedDate = React.useMemo(() => {
    return formatDate(app.createdAt);
  }, [app.createdAt]);

  const badgeVariant = React.useMemo(() => {
    return app.status === APP_STATUS.ACTIVE ? "default" : "secondary";
  }, [app.status]);

  return (
    <AccordionItem key={app.id} value={app.id.toString()}>
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center justify-between w-full pr-4">
          <div className="font-medium">{app.name}</div>
          <Badge variant={badgeVariant}>
            {app.status}
          </Badge>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{PROFILE_STRINGS.APPS.DATE}</h3>
              <p>{formattedDate}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{PROFILE_STRINGS.APPS.MODEL}</h3>
              <p>{app.aiModel}</p>
            </div>
          </div>
          
          <TokenProgress tokensUsed={app.tokensUsed} tokensTotal={app.tokensTotal} />
          
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{PROFILE_STRINGS.APPS.APP_LINK}</h3>
              <a 
                href={app.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:underline mt-1"
              >
                {app.url} <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              asChild
              className="gap-1"
            >
              <Link to={`/constructor?appId=${app.id}`}>
                <Edit className="h-4 w-4" />
                {PROFILE_STRINGS.APPS.EDIT}
              </Link>
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
});

AppListItem.displayName = 'AppListItem';

export default AppListItem;
