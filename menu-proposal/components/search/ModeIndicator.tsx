"use client";
import { Search, Bot, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModeIndicatorProps {
  mode: 'search' | 'chat';
  className?: string;
}

export const ModeIndicator = ({ mode, className }: ModeIndicatorProps) => {
  if (mode === 'search') {
    return (
      <div className={cn(
        "flex items-center gap-2 px-3 py-2 bg-fd-card border border-fd-border rounded-lg",
        className
      )}>
        <Search className="w-4 h-4 text-fd-primary" />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-fd-foreground">Search Mode</span>
          <span className="text-xs text-fd-muted-foreground">Find content in documentation</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-2 bg-fd-primary/10 border border-fd-primary/20 rounded-lg",
      className
    )}>
      <div className="relative">
        <Bot className="w-4 h-4 text-fd-primary" />
        <Zap className="w-2 h-2 text-fd-primary absolute -top-1 -right-1" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-fd-foreground">AI Chat Mode</span>
        <span className="text-xs text-fd-muted-foreground">Ask StackSpot about anything</span>
      </div>
    </div>
  );
};

