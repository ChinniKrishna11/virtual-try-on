export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl tracking-[0.15em] mb-4">ATELIER</h3>
            <p className="font-body text-sm opacity-60 leading-relaxed">
              Timeless fashion, virtually yours.
            </p>
          </div>
          {[
            { title: "Shop", links: ["New Arrivals", "Outerwear", "Tops", "Bottoms", "Accessories"] },
            { title: "Help", links: ["Sizing Guide", "Shipping", "Returns", "Contact"] },
            { title: "Company", links: ["About", "Sustainability", "Careers", "Press"] },
          ].map(({ title, links }) => (
            <div key={title}>
              <p className="font-body text-xs tracking-[0.2em] uppercase mb-4">{title}</p>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="font-body text-sm opacity-60 hover:opacity-100 transition-opacity"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="font-body text-xs opacity-40">
            © 2026 Atelier. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
