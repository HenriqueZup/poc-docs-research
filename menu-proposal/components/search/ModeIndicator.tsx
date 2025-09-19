import { Search, Bot, Zap } from 'lucide-react';
import { cn } from 'lib/utils';

interface ModeIndicatorProps {
  mode: 'search' | 'chat';
  className?: string;
}

export const ModeIndicator = ({ mode, className }: ModeIndicatorProps) => {
  if (mode === 'search') {
    return (
      <div className={cn(
        "flex items-center gap-2 px-3 py-2 bg-search-input border border-search-border rounded-lg",
        className
      )}>
        <Search className="w-4 h-4 text-search-accent" />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">Search Mode</span>
          <span className="text-xs text-search-muted">Find content in documentation</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-2 bg-gradient-ai border border-ai-primary/20 rounded-lg",
      className
    )}>
      <div className="relative">
        <Bot className="w-4 h-4 text-ai-primary" />
        <Zap className="w-2 h-2 text-ai-accent absolute -top-1 -right-1" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">AI Chat Mode</span>
        <span className="text-xs text-search-muted">Ask StackSpot about anything</span>
      </div>
    </div>
  );
};