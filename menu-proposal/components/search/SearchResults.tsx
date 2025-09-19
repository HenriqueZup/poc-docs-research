import { useState, useEffect } from 'react';
import { Search, FileText, ExternalLink, Loader2 } from 'lucide-react';
import { cn } from 'lib/utils';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  section?: string;
  score: number;
}

interface SearchResultsProps {
  query: string;
  isVisible: boolean;
  onResultClick?: (result: SearchResult) => void;
}

// Mock search function - in real implementation, this would use Orama
const searchDocuments = async (query: string): Promise<SearchResult[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!query.trim()) return [];
  
  // Mock results based on query
  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Getting Started with Authentication',
      description: 'Learn how to implement user authentication in your application using modern best practices.',
      url: '/docs/auth/getting-started',
      section: 'Authentication',
      score: 0.95
    },
    {
      id: '2',
      title: 'API Reference - User Management',
      description: 'Complete API documentation for user management endpoints including CRUD operations.',
      url: '/docs/api/users',
      section: 'API Reference',
      score: 0.87
    },
    {
      id: '3',
      title: 'Configuration Guide',
      description: 'Step-by-step guide to configure your application environment and settings.',
      url: '/docs/configuration',
      section: 'Guides',
      score: 0.82
    },
    {
      id: '4',
      title: 'Troubleshooting Common Issues',
      description: 'Solutions to frequently encountered problems and debugging techniques.',
      url: '/docs/troubleshooting',
      section: 'Support',
      score: 0.76
    },
    {
      id: '5',
      title: 'Advanced Integration Patterns',
      description: 'Learn advanced patterns for integrating with third-party services and APIs.',
      url: '/docs/advanced/integrations',
      section: 'Advanced',
      score: 0.71
    }
  ];
  
  // Filter results based on query relevance
  return mockResults.filter(result => 
    result.title.toLowerCase().includes(query.toLowerCase()) ||
    result.description.toLowerCase().includes(query.toLowerCase()) ||
    result.section?.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);
};

export const SearchResults = ({ query, isVisible, onResultClick }: SearchResultsProps) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const searchResults = await searchDocuments(query);
        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [query]);

  if (!isVisible) return null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center gap-2 text-search-muted">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Searching...</span>
        </div>
      </div>
    );
  }

  if (!query.trim()) {
    return (
      <div className="text-center py-8">
        <Search className="w-8 h-8 text-search-muted mx-auto mb-3" />
        <p className="text-search-muted text-sm">Start typing to search the documentation</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8">
        <Search className="w-8 h-8 text-search-muted mx-auto mb-3" />
        <p className="text-foreground font-medium mb-1">No results found</p>
        <p className="text-search-muted text-sm">Try adjusting your search terms</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-search-muted px-2 mb-3">
        Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
      </p>
      
      {results.map((result, index) => (
        <button
          key={result.id}
          onClick={() => onResultClick?.(result)}
          className={cn(
            "w-full text-left p-4 rounded-lg border border-search-border hover:border-ai-primary hover:bg-search-hover transition-all duration-200 group animate-slide-up",
            "focus:outline-none focus:ring-2 focus:ring-ai-primary focus:border-transparent"
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-search-input rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-ai-primary/10">
              <FileText className="w-4 h-4 text-search-muted group-hover:text-ai-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-foreground text-sm group-hover:text-ai-primary transition-colors">
                  {result.title}
                </h3>
                {result.section && (
                  <span className="px-2 py-0.5 bg-search-input text-xs text-search-muted rounded">
                    {result.section}
                  </span>
                )}
              </div>
              
              <p className="text-xs text-search-muted mb-2 line-clamp-2">
                {result.description}
              </p>
              
              <div className="flex items-center gap-1 text-xs text-search-muted">
                <span>{result.url}</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};