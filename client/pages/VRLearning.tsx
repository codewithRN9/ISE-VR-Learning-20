import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { SimpleScene } from "@/components/vr/SimpleScene";
import { toast } from "@/components/ui/use-toast";

export default function VRLearning() {
  const { addPoints, awardBadge } = useAuth();

  const completeTask = () => {
    addPoints(25);
    awardBadge("VR Explorer");
    toast({ title: "Great job!", description: "You earned 25 points and a badge." });
  };

  const narrate = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.95;
      speechSynthesis.speak(utter);
    }
  };

  return (
    <main id="content" className="container py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Practice: Cross the Street</CardTitle>
            <CardDescription>Look left and right, wait for the signal, and cross safely.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video overflow-hidden rounded-lg border">
              <SimpleScene onHint={() => narrate("Look left and right, wait for the signal, and cross safely.")} />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button onClick={()=>narrate("Look left and right, wait for the signal, and cross safely.")}>Play Instructions</Button>
              <Button variant="secondary" onClick={completeTask}>Mark Step Complete</Button>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Steps</CardTitle>
              <CardDescription>Follow each step at your pace</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-inside list-decimal space-y-2">
                <li>Stop at the curb.</li>
                <li>Look left and right for cars.</li>
                <li>Wait for the walk signal.</li>
                <li>Walk straight to the other side.</li>
              </ol>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Rewards</CardTitle>
              <CardDescription>Consistent effort is celebrated</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Finish this module to earn a star and unlock the "VR Explorer" badge.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
