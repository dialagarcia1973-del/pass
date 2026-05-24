import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { BookOpen, Zap, Shield, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { ConsultationForm } from "@/components/ConsultationForm";

const queryClient = new QueryClient();

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border h-16 flex items-center px-6">
      <div className="max-w-6xl mx-auto w-full flex items-center gap-3">
        <div className="bg-primary text-primary-foreground p-2 rounded-md">
          <BookOpen className="w-5 h-5" />
        </div>
        <span className="font-semibold text-lg text-foreground tracking-tight">
          Solicitud o Renovación del Pasaporte
        </span>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-24">
      <div className="max-w-6xl mx-auto px-6 text-center text-muted-foreground text-sm space-y-2">
        <p>Información orientativa. El trámite oficial se realiza en el portal del Gobierno de Colombia.</p>
        <p>&copy; {new Date().getFullYear()} Pasaporte Colombia</p>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col pt-16 bg-background selection:bg-primary/20">
      <Header />
      
      <main className="flex-1 flex flex-col">
        {/* HERO SECTION */}
        <section className="relative w-full py-24 md:py-32 px-6 flex flex-col items-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary)_0%,transparent_40%)] opacity-5 pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="z-10 max-w-3xl mx-auto space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight tracking-tight">
              Gestiona tu trámite de pasaporte fácilmente
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Consulta información y continúa el proceso oficial de manera rápida y segura.
            </p>
          </motion.div>
        </section>

        {/* BENEFITS SECTION */}
        <section className="w-full max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Proceso Rápido",
                description: "Optimiza tu tiempo antes de agendar tu cita oficial.",
                icon: Zap,
              },
              {
                title: "Información Segura",
                description: "Tus datos son verificados de forma privada.",
                icon: Shield,
              },
              {
                title: "Acceso Oficial",
                description: "Redirección directa a la plataforma gubernamental.",
                icon: Globe,
              }
            ].map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-card-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-start gap-4 group"
              >
                <div className="bg-secondary/10 text-secondary p-3 rounded-xl group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FORM SECTION */}
        <section className="w-full px-6 py-16 flex justify-center relative">
          {/* Decorative background element behind form */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg aspect-square bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          <ConsultationForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster position="top-center" />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

