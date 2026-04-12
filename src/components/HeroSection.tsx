import heroImage from "@/assets/hero-fashion.jpg";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Fashion editorial"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 md:px-8">
        <div className="max-w-xl space-y-6">
          <p
            className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground animate-fade-in"
            style={{ animationDelay: "0.2s", opacity: 0 }}
          >
            New Collection 2026
          </p>
          <h1
            className="font-display text-5xl md:text-7xl font-light leading-tight animate-fade-in"
            style={{ animationDelay: "0.4s", opacity: 0 }}
          >
            Redefine
            <br />
            <em className="font-light">Your Style</em>
          </h1>
          <p
            className="font-body text-base text-muted-foreground max-w-md animate-fade-in"
            style={{ animationDelay: "0.6s", opacity: 0 }}
          >
            Try on our curated collection virtually before you buy. Experience fashion that fits your life.
          </p>
          <div
            className="flex flex-wrap gap-4 pt-2 animate-fade-in"
            style={{ animationDelay: "0.8s", opacity: 0 }}
          >
            <button onClick={() => scrollTo("collection")} className="btn-fashion">
              Shop Collection
            </button>
            <button onClick={() => scrollTo("try-on")} className="btn-fashion-outline">
              Try On Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
