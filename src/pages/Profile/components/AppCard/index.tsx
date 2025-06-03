
import React from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, ExternalLink, Cpu, Zap, Database } from "lucide-react";
import { UserApp } from "../../types";
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
    <Card className="h-full flex flex-col transition-all hover:shadow-lg border-l-4 border-l-primary/20 hover:border-l-primary/50">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold">{app.name}</CardTitle>
          <Badge variant={badgeVariant} className="shrink-0">
            {app.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{formattedDate}</p>
      </CardHeader>

      <CardContent className="flex-grow space-y-6">
        {/* AI Model */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Cpu className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Модель ИИ</h3>
            <p className="font-semibold">{app.aiModel}</p>
          </div>
        </div>

        {/* Token Usage */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Использование токенов
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-xs text-green-600 font-medium">Входящие</div>
              <div className="text-lg font-bold text-green-700">{app.usedTokensInput.toLocaleString()}</div>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-xs text-blue-600 font-medium">Исходящие</div>
              <div className="text-lg font-bold text-blue-700">{app.usedTokensOutput.toLocaleString()}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="text-xs text-purple-600 font-medium">Кэшированные</div>
              <div className="text-lg font-bold text-purple-700">{app.cachedTokens.toLocaleString()}</div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-600 font-medium">Итого</div>
              <div className="text-lg font-bold text-gray-700">{app.tokensTotal.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* App Link */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-50 rounded-lg">
            <ExternalLink className="h-4 w-4 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-muted-foreground">Ссылка на приложение</h3>
            <a 
              href={app.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline truncate block"
            >
              {new URL(app.url).hostname}
            </a>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-4 bg-muted/20 mt-auto">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="w-full gap-2 hover:bg-primary hover:text-white transition-colors"
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
