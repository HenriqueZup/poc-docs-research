//import Link from 'next/link';
import { DynamicLink } from 'fumadocs-core/dynamic-link';
import { SearchTrigger } from "@/components/search";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-backdrop">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Build with <span className="bg-gradient-ai bg-clip-text">StackSpot</span>
          </h1>
          <p className="text-lg text-search-muted mb-8 max-w-2xl mx-auto leading-relaxed">
            Learn how to get started with the StackSpot.
          </p>
          
          <div className="mb-12">
            <SearchTrigger 
              placeholder="Ask StackSpot about docs..."
              initialMode="search"
              className="max-w-md mx-auto"
            />
          </div>

          {/* Developer Platform Section */}
          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8">Developer Platform</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <DynamicLink href="/docs/onboarding">
                <div className="p-6 rounded-lg border border-search-border bg-search hover:bg-search-hover transition-colors group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-search rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <div className="w-6 h-6 bg-ai-primary rounded"></div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Get started</h3>
                  <p className="text-search-muted text-sm">Make your first API call in minutes.</p>
                </div>
              </DynamicLink>
              <DynamicLink href="/docs/features-overview">
                <div className="p-6 rounded-lg border border-search-border bg-search hover:bg-search-hover transition-colors group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-search rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <div className="w-6 h-6 bg-ai-accent rounded-full"></div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Features overview</h3>
                  <p className="text-search-muted text-sm">Explore the advanced features and capabilities now available in StackSpot.</p>
                </div>
              </DynamicLink>
              <DynamicLink href="/docs/api-reference">
                <div className="p-6 rounded-lg border border-search-border bg-search hover:bg-search-hover transition-colors group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-search rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <div className="w-6 h-6 bg-ai-success rounded-sm"></div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">API reference</h3>
                  <p className="text-search-muted text-sm">Integrate and scale using our API and SDKs.</p>
                </div>
              </DynamicLink>
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