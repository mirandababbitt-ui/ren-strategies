import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import mirandaPortrait from "@assets/Miranda Babbitt-103.jpg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  services: z.string().min(2, "Please indicate what services you are interested in"),
  challenge: z.string().min(10, "Please provide a bit more detail about your challenge"),
});

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      services: "",
      challenge: "",
    },
  });

  // FIXED: Moved this function inside the component properly
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("https://formspree.io/f/mojnyezd", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          Accept: "application/json" 
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast({
          title: "Message sent.",
          description: "Thanks for reaching out! I'll get back to you within 48 hours.",
        });
        form.reset();
      } else {
        toast({ 
          title: "Something went wrong.", 
          description: "Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({ 
        title: "Connection error.", 
        description: "Please check your internet connection and try again.",
        variant: "destructive"
      });
    }
  }

  return (
    <div className="pt-32 pb-32 min-h-[90vh]">
      <SEO
        title="Contact & Book a Discovery Call"
        description="Ready to fix your website? Book a free discovery call or send a message. Let's figure out why your site isn't converting and what to do about it."
        path="/contact"
        keywords="book website audit, free discovery call, website consultation, therapist website help, contact Ren Strategies"
      />
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-20 max-w-6xl mx-auto">

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-xl grayscale hover:grayscale-0 transition-all duration-700">
                <img 
                  src={mirandaPortrait} 
                  alt="Miranda Babbitt" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl mb-8 leading-tight">
              Let's figure <br/> this out.
            </h1>
            <p className="text-xl text-foreground/70 font-light leading-relaxed mb-12">
              I'd love to hear what's bringing you here. Fill out the form, and we can discuss if an audit or custom strategy is the right next step for your business.
            </p>

            <div className="bg-[#e8e6e1] p-8 border border-border">
              <h3 className="font-serif text-2xl mb-4">Want to skip the form?</h3>
              <p className="font-light mb-6">If you already know you want an audit, you can book your kickoff call directly.</p>
              <a href="https://calendly.com/miranda-sambrook/ren-strategies-intro-chat" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background w-full">
                  Book via Calendly
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card p-10 md:p-14 text-card-foreground"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-card-foreground font-sans tracking-wide text-sm uppercase">Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Jane Doe" 
                          {...field} 
                          className="rounded-none border-0 border-b border-card-foreground/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-card-foreground font-sans tracking-wide text-sm uppercase">Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="jane@example.com" 
                          {...field} 
                          className="rounded-none border-0 border-b border-card-foreground/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="services"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-card-foreground font-sans tracking-wide text-sm uppercase">What services are you interested in?</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Website Audit, Strategy, etc." 
                          {...field} 
                          className="rounded-none border-0 border-b border-card-foreground/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="challenge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-card-foreground font-sans tracking-wide text-sm uppercase">What's your biggest challenge right now?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="I'm getting traffic but no one is booking calls..." 
                          {...field} 
                          className="rounded-none border-0 border-b border-card-foreground/20 bg-transparent px-0 min-h-[100px] resize-none focus-visible:ring-0 focus-visible:border-primary transition-colors"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg mt-4"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}