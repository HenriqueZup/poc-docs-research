import { Search, Bot } from 'lucide-react';
import { cn } from 'lib/utils';

interface SearchToggleProps {
  mode: 'search' | 'chat';
  onModeChange: (mode: 'search' | 'chat') => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SearchToggle = ({ mode, onModeChange, className, size = 'md' }: SearchToggleProps) => {
  const sizeClasses = {
    sm: "p-0.5 text-xs",
    md: "p-1 text-sm", 
    lg: "p-1.5 text-base"
  };

  const buttonSizeClasses = {
    sm: "px-2 py-1",
    md: "px-3 py-2",
    lg: "px-4 py-3"
  };

  return (
    <div className={cn(
      "flex bg-search-input rounded-lg border border-search-border transition-all duration-200 hover:border-ai-primary/50",
      sizeClasses[size],
      className
    )}>
      <button
        onClick={() => onModeChange('search')}
        className={cn(
          "flex items-center gap-2 rounded-md font-medium transition-all duration-200",
          buttonSizeClasses[size],
          mode === 'search'
            ? "bg-background text-foreground shadow-sm ring-1 ring-search-border"
            : "text-search-muted hover:text-foreground hover:bg-search-hover"
        )}
        title="Search documentation (Ctrl+1)"
      >
        <Search className={cn(
          size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
        )} />
        <span className="hidden sm:inline">Search</span>
      </button>
      <button
        onClick={() => onModeChange('chat')}
        className={cn(
          "flex items-center gap-2 rounded-md font-medium transition-all duration-200",
          buttonSizeClasses[size],
          mode === 'chat'
            ? "bg-background text-foreground shadow-sm ring-1 ring-search-border"
            : "text-search-muted hover:text-foreground hover:bg-search-hover"
        )}
        title="Ask StackSpot AI (Ctrl+2)"
      >
        <Bot className={cn(
          size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
        )} />
        <span className="hidden sm:inline">Ask AI</span>
      </button>
    </div>
  );
};