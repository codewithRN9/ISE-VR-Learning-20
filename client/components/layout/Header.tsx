import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Menu, Moon, Sun, Accessibility, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [easyRead, setEasyRead] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.style.setProperty("--base-font-size", `${16 * fontScale}px`);
  }, [fontScale]);

  useEffect(() => {
    document.body.classList.toggle("font-easyread", easyRead);
  }, [easyRead]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    document.documentElement.classList.toggle("hc", highContrast);
  }, [highContrast]);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            aria-label="ISE Home"
            className="flex items-center gap-2 font-extrabold"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              VR
            </span>
            <span>ISE</span>
          </Link>
          <nav className="hidden gap-6 md:flex" aria-label="Main">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/vr"
              className={({ isActive }) =>
                `text-sm ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`
              }
            >
              VR Learning
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-sm ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/support"
              className={({ isActive }) =>
                `text-sm ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`
              }
            >
              Support
            </NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle high contrast"
            className="rounded p-2 hover:bg-accent"
            onClick={() => setHighContrast((v) => !v)}
          >
            <Accessibility className="h-5 w-5" />
          </button>
          <button
            aria-label="Decrease text size"
            className="rounded p-2 hover:bg-accent"
            onClick={() =>
              setFontScale((s) => Math.max(0.85, +(s - 0.05).toFixed(2)))
            }
          >
            -A
          </button>
          <button
            aria-label="Increase text size"
            className="rounded p-2 hover:bg-accent"
            onClick={() =>
              setFontScale((s) => Math.min(1.3, +(s + 0.05).toFixed(2)))
            }
          >
            A+
          </button>
          <button
            aria-label="Toggle easy-to-read font"
            className="rounded p-2 hover:bg-accent"
            onClick={() => setEasyRead((v) => !v)}
          >
            Aa
          </button>
          <button
            aria-label="Toggle dark mode"
            className="rounded p-2 hover:bg-accent"
            onClick={() => setDark((v) => !v)}
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {user ? (
            <div className="hidden items-center gap-3 md:flex">
              <span className="text-sm text-muted-foreground">
                {user.name} · {user.points} pts
              </span>
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                My Dashboard
              </Button>
              <Button variant="secondary" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          ) : (
            <div className="hidden gap-2 md:flex">
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Sign in
              </Button>
              <Button onClick={() => navigate("/register")}>
                Create account
              </Button>
            </div>
          )}

          <button
            className="md:hidden"
            aria-label="Menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t bg-background p-4 md:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobile">
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/vr" onClick={() => setMenuOpen(false)}>
              VR Learning
            </NavLink>
            <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>
              Dashboard
            </NavLink>
            <NavLink to="/support" onClick={() => setMenuOpen(false)}>
              Support
            </NavLink>
            {user ? (
              <Button
                variant="secondary"
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                }}
              >
                Sign out
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/login");
                  }}
                >
                  Sign in
                </Button>
                <Button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/register");
                  }}
                >
                  Create account
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
