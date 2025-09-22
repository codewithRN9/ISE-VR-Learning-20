import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <main id="content" className="container grid min-h-[70vh] place-items-center py-10">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 rounded-lg border bg-card p-6 shadow-sm" aria-label="Sign in form">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Sign in to access your dashboard.</p>
        <label className="block text-sm font-medium" htmlFor="email">Email</label>
        <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e)=>setEmail(e.target.value)} aria-describedby="email-help"/>
        <p id="email-help" className="text-xs text-muted-foreground">We'll never share your email.</p>

        <label className="block text-sm font-medium" htmlFor="password">Password</label>
        <Input id="password" type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} />

        <Button type="submit" className="w-full">Sign in</Button>
        <p className="text-center text-sm text-muted-foreground">No account? <Link to="/register" className="text-primary underline">Create one</Link></p>
      </form>
    </main>
  );
}
