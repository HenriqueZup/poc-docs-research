"use client";
import { useState, useEffect } from 'react';
import { Search, Bot, Command, Zap } from 'lucide-react';
import { SearchModal } from './SearchModal';
import { cn } from '@/lib/utils';

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
        <button
          onClick={openSearch}
          className={cn(
            "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            "border border-fd-border bg-fd-background hover:bg-fd-accent hover:text-fd-accent-foreground",
            buttonSizes[size]
          )}
        >
          <Search className={cn(iconSizes[size], "text-fd-primary group-hover:scale-110 transition-transform")} />
          {showLabels && <span className="ml-2">Search Docs</span>}
          <div className="ml-auto hidden sm:flex items-center gap-1 opacity-60">
            <kbd className="px-1 py-0.5 bg-fd-muted rounded text-xs">
              <Command className="w-2 h-2" />
            </kbd>
            <kbd className="px-1 py-0.5 bg-fd-muted rounded text-xs">K</kbd>
          </div>
        </button>

        {/* AI Chat Button */}
        <button
          onClick={openChat}
          className={cn(
            "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            "bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/90",
            buttonSizes[size]
          )}
        >
          <div className="relative">
            <Bot className={cn(iconSizes[size], "text-fd-primary-foreground group-hover:scale-110 transition-transform")} />
            <Zap className="w-2 h-2 text-fd-primary-foreground absolute -top-1 -right-1 group-hover:animate-pulse" />
          </div>
          {showLabels && <span className="ml-2">Ask StackSpot</span>}
          <div className="ml-auto hidden sm:flex items-center gap-1 opacity-60">
            <kbd className="px-1 py-0.5 bg-fd-primary-foreground/20 rounded text-xs">
              <Command className="w-2 h-2" />
            </kbd>
            <kbd className="px-1 py-0.5 bg-fd-primary-foreground/20 rounded text-xs">J</kbd>
          </div>
        </button>
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

