import { useState, useEffect } from 'react';
import { X, Command } from 'lucide-react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { SearchToggle } from './SearchToggle';
import { SearchResults } from './SearchResults';
import { ChatInterface } from './ChatInterface';
import { Button } from '@/components/ui/button';
import { cn } from 'lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'search' | 'chat';
  searchPlaceholder?: string;
  chatPlaceholder?: string;
}

export const SearchModal = ({ 
  isOpen, 
  onClose, 
  initialMode = 'search',
  searchPlaceholder = "Search for anything...",
  chatPlaceholder = "Ask StackSpot about docs..."
}: SearchModalProps) => {
  const [mode, setMode] = useState<'search' | 'chat'>(initialMode);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setSearchQuery('');
    }
  }, [isOpen, initialMode]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      }
      
      // Ctrl+1 for Search, Ctrl+2 for Chat
      if (e.ctrlKey || e.metaKey) {
        if (e.key === '1') {
          e.preventDefault();
          setMode('search');
        } else if (e.key === '2') {
          e.preventDefault();
          setMode('chat');
        }
      }
      
      // Tab to switch between modes
      if (e.key === 'Tab' && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
        const activeElement = document.activeElement;
        // Only switch modes if Tab is pressed on the modal header area
        if (activeElement?.closest('[data-modal-header]')) {
          e.preventDefault();
          setMode(mode === 'search' ? 'chat' : 'search');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, mode]);

  const handleResultClick = (result: any) => {
    // In a real implementation, this would navigate to the result
    console.log('Navigate to:', result.url);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 animate-backdrop-in data-[state=closed]:animate-backdrop-out" />
      <DialogContent
        className={cn(
          "fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl max-h-[80vh] bg-search border border-search-border rounded-xl shadow-modal z-50",
          "animate-modal-in data-[state=closed]:animate-modal-out",
          "focus:outline-none"
        )}
        onPointerDownOutside={onClose}
      >
        <div className="flex flex-col h-full max-h-[80vh]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-search-border" data-modal-header>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gradient-search rounded-md flex items-center justify-center">
                <Command className="w-4 h-4 text-ai-primary" />
              </div>
              <h2 className="font-medium text-foreground">
                {mode === 'search' ? 'Search Documentation' : 'Ask StackSpot'}
              </h2>
            </div>
            
            <div className="flex items-center">
              <SearchToggle 
                mode={mode} 
                onModeChange={setMode}
                className="flex-shrink-0"
              />
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 text-search-muted hover:text-foreground hover:bg-search-hover"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {mode === 'search' ? (
              <div className="flex flex-col h-full">
                {/* Search Input */}
                <div className="p-4 border-b border-search-border">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full px-4 py-3 rounded-lg border border-search-border bg-search-input text-foreground placeholder-search-muted focus:outline-none focus:ring-2 focus:ring-ai-primary focus:border-transparent text-sm"
                    autoFocus
                  />
                </div>
                
                {/* Search Results */}
                <div className="flex-1 overflow-y-auto p-4">
                  <SearchResults 
                    query={searchQuery}
                    isVisible={true}
                    onResultClick={handleResultClick}
                  />
                </div>
              </div>
            ) : (
              <ChatInterface 
                isOpen={isOpen}
                placeholder={chatPlaceholder}
                onClose={onClose}
              />
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-search-border bg-search-input/50">
            <div className="flex items-center justify-between text-xs text-search-muted">
              <div className="flex items-center gap-4">
                <span>Press <kbd className="px-1.5 py-0.5 bg-search-border rounded text-xs">Esc</kbd> to close</span>
                <div className="hidden sm:flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-search-border rounded text-xs">Ctrl+1</kbd> 
                  <span className="text-xs">Search</span>
                  <span className="mx-1">•</span>
                  <kbd className="px-1.5 py-0.5 bg-search-border rounded text-xs">Ctrl+2</kbd> 
                  <span className="text-xs">Chat</span>
                </div>
                {mode === 'search' && (
                  <span>Press <kbd className="px-1.5 py-0.5 bg-search-border rounded text-xs">Enter</kbd> to search</span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs">
                <span>Powered by</span>
                <span className="font-medium text-ai-primary">Fumadocs</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};