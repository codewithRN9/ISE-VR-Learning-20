import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Headphones, Gamepad2, Accessibility, ShieldCheck, ChevronRight, Stars, Rocket, Layers3 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const ctaPrimary = () => navigate(user ? "/vr" : "/register");
  const ctaSecondary = () => navigate(user ? "/dashboard" : "/login");

  return (
    <main id="content" className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 right-1/2 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 left-1/2 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="container py-24 md:py-32 text-center">
          <Badge aria-label="Project name" className="mb-6 inline-flex items-center gap-2 bg-primary/15 text-primary ring-1 ring-primary/20">
            <Sparkles className="h-4 w-4" /> Interactive Skills Enhancer (ISE)
          </Badge>
          <h1 className="mx-auto max-w-4xl text-balance text-4xl font-extrabold tracking-tight md:text-6xl">
            A VR-powered way to practice life skills for children with ASD and ID
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Engaging, accessible activities designed with therapists and educators. Learn safely through play with guidance, feedback, and rewards.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button onClick={ctaPrimary} className="h-12 px-8 text-base shadow-lg">
              Start Learning <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button onClick={ctaSecondary} variant="outline" className="h-12 px-8 text-base">
              {user ? "View Dashboard" : "Sign In"}
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> COPPA-friendly</div>
            <div className="flex items-center gap-2"><Headphones className="h-4 w-4" /> Audio guidance</div>
            <div className="flex items-center gap-2"><Accessibility className="h-4 w-4" /> Accessibility-first</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container grid grid-cols-1 gap-6 py-10 md:grid-cols-3">
        <Card role="article" aria-label="VR learning">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl"><Layers3 className="h-5 w-5 text-primary" /> VR Learning Modules</CardTitle>
            <CardDescription>Practice routines like shopping, crossing roads, and communication in a safe virtual environment.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-gradient-to-br from-primary/5 to-accent/10 p-4 text-sm">Interactive 3D scenes with narration and on-screen prompts.</div>
          </CardContent>
        </Card>
        <Card role="article" aria-label="Gamification">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl"><Gamepad2 className="h-5 w-5 text-primary" /> Gamified Progress</CardTitle>
            <CardDescription>Earn stars, unlock badges, and level up with personalized goals and gentle feedback.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Badge className="bg-primary"><Stars className="mr-1 h-3 w-3" /> 3 Stars</Badge>
              <Badge variant="secondary"><Rocket className="mr-1 h-3 w-3" /> Level 2</Badge>
            </div>
          </CardContent>
        </Card>
        <Card role="article" aria-label="Accessibility">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl"><Accessibility className="h-5 w-5 text-primary" /> Accessibility</CardTitle>
            <CardDescription>High contrast, easy-to-read fonts, captions, keyboard navigation, and narration everywhere.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">ISE is built to be inclusive by default.</p>
          </CardContent>
        </Card>
      </section>

      {/* How It Works */}
      <section className="border-t bg-card/30 py-16">
        <div className="container grid grid-cols-1 gap-6 md:grid-cols-3">
          {["Choose a module","Follow the guided steps","Earn rewards"].map((step, i) => (
            <Card key={step} aria-label={`Step ${i+1}`}>
              <CardHeader>
                <CardTitle className="text-xl">{i+1}. {step}</CardTitle>
                <CardDescription>
                  {i === 0 && "Pick a real-life skill to practice, like greetings or supermarket navigation."}
                  {i === 1 && "Visual prompts and voice instructions support each action at a comfortable pace."}
                  {i === 2 && "Positive reinforcement with stars, badges, and gentle celebration."}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16 text-center">
        <h2 className="text-3xl font-bold">Ready to explore?</h2>
        <p className="mt-2 text-muted-foreground">Create an account to access the dashboard and VR modules.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild className="px-6"><Link to={user ? "/vr" : "/register"}>Get Started</Link></Button>
          <Button asChild variant="outline" className="px-6"><Link to="/support">Contact Support</Link></Button>
        </div>
      </section>
    </main>
  );
}
