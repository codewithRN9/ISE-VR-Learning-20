import { Header } from "./Header";
import { Footer } from "./Footer";
import { ReactNode } from "react";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 z-50 rounded bg-primary px-3 py-2 text-primary-foreground">Skip to content</a>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
