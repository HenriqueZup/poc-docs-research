//import Link from 'next/link';
import { SearchTrigger, QuickSwitchButtons } from "@/components/search";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-backdrop">
      {/* Header */}
      <header className="border-b border-search-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-bold text-foreground">StackSpot</h1>
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <a href="#" className="text-search-muted hover:text-foreground transition-colors">Welcome</a>
                <a href="#" className="text-search-muted hover:text-foreground transition-colors">Developer Platform</a>
                <a href="#" className="text-search-muted hover:text-foreground transition-colors">StackSpot Code</a>
                <a href="#" className="text-search-muted hover:text-foreground transition-colors">API Reference</a>
                <a href="#" className="text-search-muted hover:text-foreground transition-colors">Resources</a>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <SearchTrigger 
                variant="compact"
                placeholder="Search for anything..."
                chatPlaceholder="Ask StackSpot about docs..."
                className="w-80 hidden sm:flex"
              />
              <SearchTrigger 
                variant="icon"
                className="sm:hidden"
              />
              <Button variant="default" size="sm">
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Build with <span className="bg-gradient-ai bg-clip-text text-transparent">StackSpot</span>
          </h1>
          <p className="text-lg text-search-muted mb-8 max-w-2xl mx-auto leading-relaxed">
            Learn how to get started with the StackSpot.
          </p>
          
          <div className="mb-12">
            <SearchTrigger 
              placeholder="Ask StackSpot about docs..."
              initialMode="chat"
              className="max-w-md mx-auto"
            />
          </div>

          {/* Developer Platform Section */}
          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8">Developer Platform</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg border border-search-border bg-search hover:bg-search-hover transition-colors group">
                <div className="w-12 h-12 bg-gradient-search rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <div className="w-6 h-6 bg-ai-primary rounded"></div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Get started</h3>
                <p className="text-search-muted text-sm">Make your first API call in minutes.</p>
              </div>
              
              <div className="p-6 rounded-lg border border-search-border bg-search hover:bg-search-hover transition-colors group">
                <div className="w-12 h-12 bg-gradient-search rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <div className="w-6 h-6 bg-ai-accent rounded-full"></div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Features overview</h3>
                <p className="text-search-muted text-sm">Explore the advanced features and capabilities now available in StackSpot.</p>
              </div>
              
              <div className="p-6 rounded-lg border border-search-border bg-search hover:bg-search-hover transition-colors group">
                <div className="w-12 h-12 bg-gradient-search rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <div className="w-6 h-6 bg-ai-success rounded-sm"></div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">API reference</h3>
                <p className="text-search-muted text-sm">Integrate and scale using our API and SDKs.</p>
              </div>
            </div>
          </section>

         
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-search-border bg-search/50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-search-muted text-sm">
          <p>Built with Fumadocs • Powered by StackSpot TW Team </p>
        </div>
      </footer>
    </div>
  );
}