export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} ISE — Interactive Skills Enhancer
        </p>
        <nav className="flex items-center gap-4 text-sm" aria-label="Footer">
          <a
            className="text-muted-foreground hover:text-foreground"
            href="/support"
          >
            Support
          </a>
          <a className="text-muted-foreground hover:text-foreground" href="/">
            Privacy
          </a>
          <a className="text-muted-foreground hover:text-foreground" href="/">
            Terms
          </a>
        </nav>
      </div>
    </footer>
  );
}
