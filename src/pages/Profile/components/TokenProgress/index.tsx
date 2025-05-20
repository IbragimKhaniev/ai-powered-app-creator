
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { calculateTokenPercentage } from "../../utils/profileUtils";
import { PROFILE_STRINGS } from "../../constants";

interface TokenProgressProps {
  tokensUsed: number;
  tokensTotal: number;
}

const TokenProgress: React.FC<TokenProgressProps> = React.memo(({ tokensUsed, tokensTotal }) => {
  const progressPercentage = React.useMemo(() => {
    return calculateTokenPercentage(tokensUsed, tokensTotal);
  }, [tokensUsed, tokensTotal]);

  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground">{PROFILE_STRINGS.APPS.TOKENS_USED}</h3>
      <div className="flex items-center gap-2 mt-1">
        <Progress value={progressPercentage} className="h-2" />
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {tokensUsed} / {tokensTotal}
        </span>
      </div>
    </div>
  );
});

TokenProgress.displayName = 'TokenProgress';

export default TokenProgress;
