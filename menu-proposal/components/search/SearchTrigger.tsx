"use client";
import { useState, useEffect } from 'react';
import { Search, Command } from 'lucide-react';
import { SearchModal } from './SearchModal';
import { cn } from '@/lib/utils';

interface SearchTriggerProps {
  variant?: 'default' | 'compact' | 'icon';
  placeholder?: string;
  chatPlaceholder?: string;
  initialMode?: 'search' | 'chat';
  showShortcut?: boolean;
  className?: string;
}

export const SearchTrigger = ({ 
  variant = 'default',
  placeholder = "Search documentation...",
  chatPlaceholder = "Ask Stackspot about docs...",
  initialMode = 'search',
  showShortcut = true,
  className
}: SearchTriggerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle keyboard shortcut (Ctrl/Cmd + K for search, Ctrl/Cmd + J for chat)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey)) {
        if (e.key === 'k') {
          e.preventDefault();
          setIsModalOpen(true);
        } else if (e.key === 'j') {
          e.preventDefault();
          // Open directly in chat mode if using Cmd+J
          setIsModalOpen(true);
          // Set initial mode to chat for Cmd+J shortcut
          if (initialMode !== 'chat') {
            // We'll pass this as a prop or handle it in the modal
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (variant === 'icon') {
    return (
      <>
        <button
          onClick={openModal}
          className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            "hover:bg-fd-accent hover:text-fd-accent-foreground h-9 w-9",
            className
          )}
        >
          <Search className="w-4 h-4" />
        </button>
        
        <SearchModal
          isOpen={isModalOpen}
          onClose={closeModal}
          initialMode={initialMode}
          searchPlaceholder={placeholder}
          chatPlaceholder={chatPlaceholder}
        />
      </>
    );
  }

  if (variant === 'compact') {
    return (
      <>
        <button
          onClick={openModal}
          className={cn(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            "border border-fd-border bg-fd-background hover:bg-fd-accent hover:text-fd-accent-foreground h-10 px-4 py-2 justify-start text-fd-muted-foreground",
            className
          )}
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">{placeholder}</span>
          {showShortcut && (
            <div className="ml-auto hidden sm:flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-fd-muted rounded text-xs">
                <Command className="w-3 h-3" />
              </kbd>
              <kbd className="px-1.5 py-0.5 bg-fd-muted rounded text-xs">K</kbd>
            </div>
          )}
        </button>
        
        <SearchModal
          isOpen={isModalOpen}
          onClose={closeModal}
          initialMode={initialMode}
          searchPlaceholder={placeholder}
          chatPlaceholder={chatPlaceholder}
        />
      </>
    );
  }

  return (
    <>
      <button
        onClick={openModal}
        className={cn(
          "flex items-center gap-3 w-full max-w-md px-4 py-3 rounded-lg border border-fd-border bg-fd-background hover:bg-fd-accent transition-colors text-left group",
          className
        )}
      >
        <Search className="w-4 h-4 text-fd-muted-foreground group-hover:text-fd-foreground" />
        <span className="text-fd-muted-foreground group-hover:text-fd-foreground text-sm flex-1">
          {placeholder}
        </span>
        {showShortcut && (
          <div className="flex items-center gap-1 opacity-60">
            <kbd className="px-1.5 py-0.5 bg-fd-muted rounded text-xs">
              <Command className="w-3 h-3" />
            </kbd>
            <kbd className="px-1.5 py-0.5 bg-fd-muted rounded text-xs">K</kbd>
          </div>
        )}
      </button>
      
      <SearchModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialMode={initialMode}
        searchPlaceholder={placeholder}
        chatPlaceholder={chatPlaceholder}
      />
    </>
  );
};