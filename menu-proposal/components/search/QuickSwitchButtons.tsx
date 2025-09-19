import { useState, useEffect } from 'react';
import { Search, Bot, Command, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchModal } from './SearchModal';
import { cn } from 'lib/utils';

interface QuickSwitchButtonsProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'horizontal' | 'vertical';
  showLabels?: boolean;
}

export const QuickSwitchButtons = ({ 
  className, 
  size = 'md',
  variant = 'horizontal',
  showLabels = true
}: QuickSwitchButtonsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialMode, setInitialMode] = useState<'search' | 'chat'>('search');

  const openSearch = () => {
    setInitialMode('search');
    setIsModalOpen(true);
  };

  const openChat = () => {
    setInitialMode('chat');
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // Handle global keyboard shortcuts (Cmd+K for search, Cmd+J for chat)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey)) {
        if (e.key === 'k') {
          e.preventDefault();
          setInitialMode('search');
          setIsModalOpen(true);
        } else if (e.key === 'j') {
          e.preventDefault();
          setInitialMode('chat');
          setIsModalOpen(true);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const buttonSizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <>
      <div className={cn(
        "flex gap-3",
        variant === 'vertical' && "flex-col",
        className
      )}>
        {/* Search Button */}
        <Button
          onClick={openSearch}
          variant="outline"
          className={cn(
            "group hover:border-search-accent hover:shadow-search transition-all duration-200",
            buttonSizes[size]
          )}
        >
          <Search className={cn(iconSizes[size], "text-search-accent group-hover:scale-110 transition-transform")} />
          {showLabels && <span className="ml-2">Search Docs</span>}
          <div className="ml-auto hidden sm:flex items-center gap-1 opacity-60">
            <kbd className="px-1 py-0.5 bg-muted rounded text-xs">
              <Command className="w-2 h-2" />
            </kbd>
            <kbd className="px-1 py-0.5 bg-muted rounded text-xs">K</kbd>
          </div>
        </Button>

        {/* AI Chat Button */}
        <Button
          onClick={openChat}
          className={cn(
            "group bg-gradient-ai border border-ai-primary/20 hover:border-ai-primary hover:shadow-ai transition-all duration-200",
            buttonSizes[size]
          )}
        >
          <div className="relative">
            <Bot className={cn(iconSizes[size], "text-ai-primary group-hover:scale-110 transition-transform")} />
            <Zap className="w-2 h-2 text-ai-accent absolute -top-1 -right-1 group-hover:animate-pulse" />
          </div>
          {showLabels && <span className="ml-2 text-foreground">Ask StackSpot</span>}
          <div className="ml-auto hidden sm:flex items-center gap-1 opacity-60">
            <kbd className="px-1 py-0.5 bg-background/20 rounded text-xs">
              <Command className="w-2 h-2" />
            </kbd>
            <kbd className="px-1 py-0.5 bg-background/20 rounded text-xs">J</kbd>
          </div>
        </Button>
      </div>

      <SearchModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialMode={initialMode}
        searchPlaceholder="Search documentation..."
        chatPlaceholder="Ask StackSpot about docs..."
      />
    </>
  );
};