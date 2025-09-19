"use client";
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
    <div className={cn("prose prose-sm max-w-none prose-fd", className)}>
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
              className="text-fd-primary hover:text-fd-primary/80 transition-colors underline underline-offset-2"
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
              className="rounded-lg shadow-sm max-w-full h-auto border border-fd-border"
              loading="lazy"
              {...props}
            />
          ),
          // Customize code blocks
          pre: ({ children, ...props }) => (
            <pre className="bg-fd-card border border-fd-border rounded-lg p-4 overflow-x-auto" {...props}>
              {children}
            </pre>
          ),
          // Customize inline code
          code: ({ children, className, ...props }) => (
            <code
              className={cn(
                "bg-fd-muted px-1.5 py-0.5 rounded text-sm font-mono",
                !className && "text-fd-foreground",
                className
              )}
              {...props}
            >
              {children}
            </code>
          ),
          // Customize headings
          h1: ({ children, ...props }) => (
            <h1 className="text-xl font-semibold text-fd-foreground mb-3" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-lg font-semibold text-fd-foreground mb-2" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-base font-semibold text-fd-foreground mb-2" {...props}>
              {children}
            </h3>
          ),
          // Customize paragraphs
          p: ({ children, ...props }) => (
            <p className="text-fd-foreground mb-3 leading-relaxed" {...props}>
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
            <li className="text-fd-foreground" {...props}>
              {children}
            </li>
          ),
          // Customize blockquotes
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-fd-primary pl-4 italic text-fd-muted-foreground mb-3" {...props}>
              {children}
            </blockquote>
          ),
          // Customize tables
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-fd-border rounded-lg" {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-fd-muted" {...props}>
              {children}
            </thead>
          ),
          th: ({ children, ...props }) => (
            <th className="border border-fd-border px-3 py-2 text-left font-medium text-fd-foreground" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="border border-fd-border px-3 py-2 text-fd-foreground" {...props}>
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

