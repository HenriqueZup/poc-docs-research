import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer = ({ content, className }: MarkdownRendererProps) => {
  return (
    <div className={cn("prose prose-sm max-w-none dark:prose-invert", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Customize link rendering
          a: ({ href, children, ...props }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ai-primary hover:text-ai-accent transition-colors underline underline-offset-2"
              {...props}
            >
              {children}
            </a>
          ),
          // Customize image rendering
          img: ({ src, alt, ...props }) => (
            <img
              src={src}
              alt={alt}
              className="rounded-lg shadow-sm max-w-full h-auto"
              loading="lazy"
              {...props}
            />
          ),
          // Customize code blocks
          pre: ({ children, ...props }) => (
            <pre className="bg-search-input border border-search-border rounded-lg p-4 overflow-x-auto" {...props}>
              {children}
            </pre>
          ),
          // Customize inline code
          code: ({ children, className, ...props }) => (
            <code
              className={cn(
                "bg-search-input px-1.5 py-0.5 rounded text-sm font-mono",
                !className && "text-foreground",
                className
              )}
              {...props}
            >
              {children}
            </code>
          ),
          // Customize headings
          h1: ({ children, ...props }) => (
            <h1 className="text-xl font-semibold text-foreground mb-3" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-lg font-semibold text-foreground mb-2" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-base font-semibold text-foreground mb-2" {...props}>
              {children}
            </h3>
          ),
          // Customize paragraphs
          p: ({ children, ...props }) => (
            <p className="text-foreground mb-3 leading-relaxed" {...props}>
              {children}
            </p>
          ),
          // Customize lists
          ul: ({ children, ...props }) => (
            <ul className="list-disc pl-5 mb-3 space-y-1" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal pl-5 mb-3 space-y-1" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="text-foreground" {...props}>
              {children}
            </li>
          ),
          // Customize blockquotes
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-ai-primary pl-4 italic text-search-muted mb-3" {...props}>
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};