import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export type User = {
  email: string;
  name: string;
  points: number;
  badges: string[];
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  addPoints: (delta: number) => void;
  awardBadge: (badge: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const storageKey = "ise_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as User;
        setUser(parsed);
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem(storageKey, JSON.stringify(user));
    else localStorage.removeItem(storageKey);
  }, [user]);

  const login = async (email: string, _password: string) => {
    setUser((prev) =>
      prev ?? { email, name: email.split("@")[0], points: 0, badges: [] },
    );
    navigate("/dashboard");
  };

  const register = async (name: string, email: string, _password: string) => {
    setUser({ email, name, points: 0, badges: [] });
    navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  const addPoints = (delta: number) => {
    setUser((u) => (u ? { ...u, points: Math.max(0, u.points + delta) } : u));
  };

  const awardBadge = (badge: string) => {
    setUser((u) =>
      u && !u.badges.includes(badge)
        ? { ...u, badges: [...u.badges, badge] }
        : u,
    );
  };

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, login, register, logout, addPoints, awardBadge }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
