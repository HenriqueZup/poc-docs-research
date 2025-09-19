import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MarkdownRenderer } from './MarkdownRenderer';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  isOpen: boolean;
  placeholder?: string;
  onClose?: () => void;
}

const EXAMPLE_PROMPTS = [
  "Como criar um plugin de aplicação?",
  "Como eu faço a migração de Starters para Workflows?",
  "Exemplos de plugins de infraestrutura",
  "Como faço o deploy da minha aplicação?",
  "Como autenticar minha app na StackSpot",
  "O que é uma Action?"
];

export const ChatInterface = ({ 
  isOpen, 
  placeholder = "Ask anything about the documentation...",
  onClose 
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate API call to BFF
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `# Response to: "${text}"

I'm a documentation assistant trained on help articles and content. Here's what I can help you with:

## Quick Answer
Based on your question about **${text.toLowerCase()}**, here are some key points:

- This involves understanding the core concepts
- Implementation typically requires following best practices
- Make sure to check the official documentation for latest updates

## Code Example
\`\`\`javascript
// Example implementation
const example = {
  question: "${text}",
  response: "This is a sample response",
  helpful: true
};
\`\`\`

## Related Resources
- [Documentation Link](https://docs.example.com)
- [API Reference](https://api.example.com)
- [Best Practices Guide](https://guide.example.com)

Would you like me to elaborate on any specific aspect?`,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (prompt: string) => {
    handleSend(prompt);
  };

  if (messages.length === 0) {
    return (
      <div id="center-chat">
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-12 h-12 bg-gradient-ai rounded-full flex items-center justify-center mb-4 animate-pulse">
            <Bot className="w-6 h-6 text-ai-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Hi! I'm an AI assistant trained on documentation.
          </h3>
          <p className="text-search-muted mb-6 max-w-md">
            I can help with technical questions, code examples, and finding specific information in the docs.
          </p>
          
            <div className="bg-ai-secondary/50 border border-ai-primary/20 rounded-lg p-3 mb-6 max-w-md">
              <p className="text-xs text-ai-primary font-medium mb-1">💡 Quick Switch</p>
              <p className="text-xs text-search-muted">
                Use <kbd className="px-1 py-0.5 bg-search-border rounded text-xs">Ctrl+1</kbd> for Search or 
                <kbd className="px-1 py-0.5 bg-search-border rounded text-xs ml-1">Ctrl+2</kbd> for Chat to switch modes quickly!
              </p>
            </div>
          
          <div className="space-y-3 w-full max-w-md">
            <p className="text-sm font-medium text-foreground mb-3">EXAMPLE QUESTIONS</p>
            {EXAMPLE_PROMPTS.slice(0, 3).map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(prompt)}
                className="w-full text-left p-3 rounded-lg border border-search-border hover:border-ai-primary hover:bg-search-hover transition-all duration-200 text-sm text-foreground group"
              >
                <div className="flex items-start gap-2">
                  <Bot className="w-4 h-4 text-ai-primary mt-0.5 group-hover:scale-110 transition-transform" />
                  <span>{prompt}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-search-border p-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={placeholder}
                className="w-full px-4 py-3 pr-12 rounded-lg border border-search-border bg-search-input text-foreground placeholder-search-muted focus:outline-none focus:ring-2 focus:ring-ai-primary focus:border-transparent"
              />
              <Button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0 bg-ai-primary hover:bg-ai-accent"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3 animate-slide-up",
              message.type === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {message.type === 'assistant' && (
              <div className="w-8 h-8 bg-gradient-ai rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-ai-primary" />
              </div>
            )}
            
            <div
              className={cn(
                "max-w-[80%] rounded-lg p-4",
                message.type === 'user'
                  ? "bg-ai-primary text-white"
                  : "bg-search-input border border-search-border"
              )}
            >
              {message.type === 'assistant' ? (
                <MarkdownRenderer content={message.content} />
              ) : (
                <p className="text-sm">{message.content}</p>
              )}
            </div>

            {message.type === 'user' && (
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3 animate-slide-up">
            <div className="w-8 h-8 bg-gradient-ai rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-ai-primary" />
            </div>
            <div className="bg-search-input border border-search-border rounded-lg p-4">
              <div className="flex items-center gap-2 text-search-muted">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-search-border p-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={placeholder}
              className="w-full px-4 py-3 pr-12 rounded-lg border border-search-border bg-search-input text-foreground placeholder-search-muted focus:outline-none focus:ring-2 focus:ring-ai-primary focus:border-transparent"
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0 bg-ai-primary hover:bg-ai-accent"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};