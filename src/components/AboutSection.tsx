import modelImage from "@/assets/model-base.jpg";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={modelImage}
              alt="About Atelier"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="space-y-6">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-accent">Our Philosophy</p>
            <h2 className="font-display text-4xl md:text-5xl font-light leading-tight">
              Fashion That
              <br />
              <em>Speaks Volumes</em>
            </h2>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              At Atelier, we believe in the power of thoughtful design. Every piece in our collection
              is crafted with precision, using only the finest materials sourced from around the world.
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Our virtual try-on experience lets you envision each outfit before committing, ensuring
              every purchase feels intentional and personal.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
              {[
                { num: "150+", label: "Styles" },
                { num: "12", label: "Countries" },
                { num: "98%", label: "Satisfaction" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <p className="font-display text-2xl">{num}</p>
                  <p className="font-body text-xs text-muted-foreground tracking-[0.1em] uppercase mt-1">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
