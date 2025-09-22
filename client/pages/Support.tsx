import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

export default function Support() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent", description: "Our team will get back to you within 1 business day." });
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <main id="content" className="container py-10">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>We're here to help with accessibility, setup, and feedback.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4" aria-label="Support contact form">
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="email">Email</label>
                <Input id="email" type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="subject">Subject</label>
                <Input id="subject" required value={subject} onChange={(e)=>setSubject(e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="message">Message</label>
                <textarea id="message" required value={message} onChange={(e)=>setMessage(e.target.value)} className="min-h-[140px] w-full rounded-md border bg-background p-3 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2" />
              </div>
              <Button type="submit">Send</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
