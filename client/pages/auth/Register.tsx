import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await register(name, email, password);
  };

  return (
    <main id="content" className="container grid min-h-[70vh] place-items-center py-10">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 rounded-lg border bg-card p-6 shadow-sm" aria-label="Register form">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-sm text-muted-foreground">Set up an account to start learning.</p>
        <label className="block text-sm font-medium" htmlFor="name">Name</label>
        <Input id="name" required value={name} onChange={(e)=>setName(e.target.value)} />

        <label className="block text-sm font-medium" htmlFor="email">Email</label>
        <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e)=>setEmail(e.target.value)} />

        <label className="block text-sm font-medium" htmlFor="password">Password</label>
        <Input id="password" type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} />

        <Button type="submit" className="w-full">Create account</Button>
        <p className="text-center text-sm text-muted-foreground">Already have an account? <Link to="/login" className="text-primary underline">Sign in</Link></p>
      </form>
    </main>
  );
}
