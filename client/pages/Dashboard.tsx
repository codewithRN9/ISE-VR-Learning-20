import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Award, Star, Target, Trophy } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const level = user ? Math.floor(user.points / 100) + 1 : 1;
  const progress = user ? (user.points % 100) : 0;

  return (
    <main id="content" className="container py-10">
      <h1 className="text-3xl font-bold">Welcome{user ? `, ${user.name}` : ""} 👋</h1>
      <p className="mt-1 text-muted-foreground">Track progress, continue modules, and celebrate wins.</p>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5 text-primary"/> Level {level}</CardTitle>
            <CardDescription>Earn 100 pts to reach the next level.</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="h-3" />
            <div className="mt-2 text-sm text-muted-foreground">{progress} / 100</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Star className="h-5 w-5 text-primary"/> Points</CardTitle>
            <CardDescription>Total points earned</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold">{user?.points ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-primary"/> Current Goal</CardTitle>
            <CardDescription>Complete 2 VR tasks today</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild><Link to="/vr">Continue VR Module</Link></Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>Achievements unlocked</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {(user?.badges?.length ? user.badges : ["First Steps"]).map((b)=> (
                <Badge key={b} className="bg-primary"><Award className="mr-1 h-3 w-3"/> {b}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recommended Modules</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-disc text-sm text-muted-foreground">
              <li>Greetings & Eye Contact</li>
              <li>Crossing the Street Safely</li>
              <li>Asking for Help at a Store</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
