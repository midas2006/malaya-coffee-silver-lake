import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Coffee,
  Heart,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  MoveRight,
  Phone,
  Sparkles,
  X,
} from "lucide-react";

type MenuCategory = "all" | "coffee" | "scoop" | "bites";

const menuItems = [
  {
    name: "Ube Cloud",
    description: "Ube ice cream, toasted coconut, ube crumble",
    price: "$7.50",
    category: "scoop" as const,
    color: "lavender",
  },
  {
    name: "Pandan Cold Brew",
    description: "Slow-steeped coffee, pandan cream, palm sugar",
    price: "$6.75",
    category: "coffee" as const,
    color: "mint",
  },
  {
    name: "Mango Graham",
    description: "Ripe mango, graham crumble, vanilla bean",
    price: "$7.50",
    category: "scoop" as const,
    color: "apricot",
  },
  {
    name: "Malaya Latte",
    description: "Philippine-grown Barako espresso, condensed milk, cinnamon",
    price: "$6.25",
    category: "coffee" as const,
    color: "coffee",
  },
  {
    name: "Ensaymada Toast",
    description: "Brioche, butter, sugar, aged cheese",
    price: "$5.75",
    category: "bites" as const,
    color: "sun",
  },
  {
    name: "Halo-Halo Sundae",
    description: "Three scoops, ube, coconut, jackfruit, leche flan",
    price: "$10.50",
    category: "scoop" as const,
    color: "berry",
  },
];

const filters: { label: string; value: MenuCategory }[] = [
  { label: "All cravings", value: "all" },
  { label: "Coffee + tea", value: "coffee" },
  { label: "Scoops", value: "scoop" },
  { label: "Little bites", value: "bites" },
];

const mapLink = "https://maps.google.com/?q=2839+W+Sunset+Blvd+Los+Angeles+CA+90026";
const instagramLink = "https://www.instagram.com/malayacoffeeshop/?hl=en";
const phoneLink = "tel:+18188505515";

export default function Home() {
  const [menuFilter, setMenuFilter] = useState<MenuCategory>("all");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const visibleItems = menuFilter === "all" ? menuItems : menuItems.filter((item) => item.category === menuFilter);
  const closeMobile = () => setMobileOpen(false);

  return (
    <main id="top" className="min-h-screen overflow-hidden bg-malaya-cream text-malaya-ink">
      <div className="border-b border-malaya-ink/10 bg-malaya-ink px-4 py-2 text-center text-[10px] font-bold uppercase tracking-[0.24em] text-malaya-cream sm:text-[11px]">
        Filipino-inspired coffee + ice cream in Silver Lake · come as you are
      </div>

      <section className="hero-shell relative min-h-[730px] overflow-hidden bg-malaya-ink text-white sm:min-h-[800px]">
        <img
          src="/manus-storage/malaya-hero_55c4a15e.jpg"
          alt="Ube soft serve and coffee on the Malaya cafe counter"
          className="absolute inset-0 h-full w-full object-cover object-[62%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(36,24,19,0.88)_0%,rgba(36,24,19,0.64)_37%,rgba(36,24,19,0.12)_73%,rgba(36,24,19,0.22)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(36,24,19,0.8)_0%,transparent_36%)]" />

        <header className="relative z-20 border-b border-white/20">
          <div className="container flex h-[74px] items-center justify-between">
            <a href="#top" className="group flex items-center gap-3" aria-label="Malaya home">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-malaya-sun text-malaya-ink shadow-[0_6px_0_rgba(36,24,19,0.12)] transition-transform duration-200 group-hover:rotate-6">
                <Coffee size={19} strokeWidth={2.4} />
              </span>
              <span className="font-display text-[27px] leading-none tracking-[-0.04em]">malaya</span>
            </a>

            <nav className="hidden items-center gap-9 text-[11px] font-bold uppercase tracking-[0.2em] lg:flex" aria-label="Main navigation">
              <a className="nav-link" href="#menu">Menu</a>
              <a className="nav-link" href="#story">Our story</a>
              <a className="nav-link" href="#visit">Visit</a>
            </nav>

            <div className="flex items-center gap-3">
              <a href={phoneLink} className="hidden items-center gap-2 rounded-full border border-white/35 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.17em] transition hover:border-malaya-sun hover:bg-malaya-sun hover:text-malaya-ink sm:flex">
                <Phone size={13} /> Call us
              </a>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 transition hover:border-malaya-sun hover:bg-malaya-sun hover:text-malaya-ink lg:hidden"
                onClick={() => setMobileOpen((value) => !value)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={19} /> : <MenuIcon size={19} />}
              </button>
            </div>
          </div>
        </header>

        {mobileOpen && (
          <div className="absolute left-4 right-4 top-[89px] z-40 rounded-[22px] border border-white/15 bg-malaya-ink/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden">
            <a href="#menu" onClick={closeMobile} className="mobile-nav-item">Menu <ArrowUpRight size={17} /></a>
            <a href="#story" onClick={closeMobile} className="mobile-nav-item">Our story <ArrowUpRight size={17} /></a>
            <a href="#visit" onClick={closeMobile} className="mobile-nav-item">Visit us <ArrowUpRight size={17} /></a>
            <a href={phoneLink} className="mobile-nav-item border-t border-white/15 text-malaya-sun">Call (818) 850-5515 <Phone size={16} /></a>
          </div>
        )}

        <div className="container relative z-10 flex min-h-[565px] items-center pb-20 pt-20 sm:min-h-[625px] sm:pb-28">
          <div className="max-w-[690px] animate-rise">
            <div className="mb-7 flex items-center gap-3 text-malaya-sun">
              <span className="h-px w-10 bg-malaya-sun" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em]">A little freedom in every cup</span>
            </div>
            <h1 className="max-w-[680px] font-display text-[clamp(4.2rem,11vw,9.6rem)] font-medium leading-[0.82] tracking-[-0.075em]">
              coffee,
              <br />
              <em className="text-malaya-sun">scoops</em>
              <br />
              <span className="ml-[14vw] sm:ml-[8vw]">& sunshine.</span>
            </h1>
            <p className="mt-9 max-w-[430px] text-[16px] leading-7 text-white/75 sm:text-[18px]">
              Filipino-inspired coffee and housemade ice cream for slow mornings, sweet afternoons, and everything in between.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#menu" className="inline-flex items-center gap-3 rounded-full bg-malaya-sun px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.19em] text-malaya-ink transition hover:-translate-y-0.5 hover:bg-white">
                See the menu <ArrowDownRight size={16} />
              </a>
              <a href={mapLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/35 px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.19em] transition hover:border-white hover:bg-white/10">
                <MapPin size={15} /> Get directions
              </a>
            </div>
          </div>
        </div>

        <div className="container absolute bottom-0 left-1/2 z-10 -translate-x-1/2 pb-7">
          <div className="grid grid-cols-1 gap-4 border-t border-white/25 pt-5 text-white/80 sm:grid-cols-3 sm:gap-6">
            <a href={mapLink} target="_blank" rel="noreferrer" className="flex items-start gap-3 text-sm transition hover:text-malaya-sun">
              <MapPin size={17} className="mt-0.5 shrink-0 text-malaya-sun" />
              <span><strong className="block text-[10px] uppercase tracking-[0.18em] text-white/45">Find us</strong>2839 W Sunset Blvd · Silver Lake</span>
            </a>
            <div className="flex items-start gap-3 text-sm">
              <Clock3 size={17} className="mt-0.5 shrink-0 text-malaya-sun" />
              <span><strong className="block text-[10px] uppercase tracking-[0.18em] text-white/45">Open daily</strong>8–6 weekdays · 9–6 weekends</span>
            </div>
            <a href={phoneLink} className="flex items-start gap-3 text-sm transition hover:text-malaya-sun sm:justify-self-end">
              <Phone size={17} className="mt-0.5 shrink-0 text-malaya-sun" />
              <span><strong className="block text-[10px] uppercase tracking-[0.18em] text-white/45">Call the shop</strong>(818) 850-5515</span>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-malaya-cream py-20 sm:py-28">
        <div className="container grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:gap-24">
          <div>
            <p className="section-kicker">Made for your kind of day</p>
            <h2 className="mt-5 max-w-[480px] font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.92] tracking-[-0.065em]">
              No rules.<br /><span className="text-malaya-purple">Just good stuff.</span>
            </h2>
            <a href="#story" className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] underline decoration-malaya-purple/35 underline-offset-8 transition hover:text-malaya-purple">Why Malaya <MoveRight size={15} /></a>
          </div>
          <div className="grid gap-8 sm:grid-cols-[1.12fr_0.88fr]">
            <p className="text-[clamp(1.35rem,2.2vw,2rem)] leading-[1.25] tracking-[-0.025em]">We’re here for the in-between moments: a first coffee, a second scoop, a catch-up that runs long. A neighborhood spot with a little more color.</p>
            <div className="border-l border-malaya-ink/20 pl-5 text-sm leading-6 text-malaya-muted">
              <p className="mb-5 font-bold uppercase tracking-[0.17em] text-malaya-ink">On the counter</p>
              <div className="flex flex-wrap gap-2">
                {['Barako espresso', 'Ube everything', 'Housemade scoops', 'Good energy'].map((tag) => <span key={tag} className="rounded-full border border-malaya-ink/15 px-3 py-1.5 text-[11px] font-semibold">{tag}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="bg-malaya-lilac py-20 sm:py-28">
        <div className="container">
          <div className="mb-12 flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
            <div>
              <p className="section-kicker">The good part</p>
              <h2 className="mt-4 font-display text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.86] tracking-[-0.07em]">A menu with<br /><em className="text-malaya-purple">main character</em> energy.</h2>
            </div>
            <a href={instagramLink} target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em]">See what’s new <span className="flex h-9 w-9 items-center justify-center rounded-full border border-malaya-ink/20 transition group-hover:bg-malaya-ink group-hover:text-malaya-cream"><ArrowUpRight size={15} /></span></a>
          </div>

          <div className="mb-9 flex flex-wrap gap-2 border-b border-malaya-ink/15 pb-5">
            {filters.map((filter) => (
              <button key={filter.value} type="button" onClick={() => setMenuFilter(filter.value)} className={`filter-pill ${menuFilter === filter.value ? 'filter-pill-active' : ''}`}>
                {filter.label}
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((item, index) => (
              <article key={item.name} className={`menu-card menu-card-${item.color} ${index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
                {index === 0 && <Sparkles size={18} className="absolute right-5 top-5 text-malaya-purple" />}
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="mb-10 text-[10px] font-bold uppercase tracking-[0.18em] opacity-55">0{index + 1} / {item.category}</p>
                    <h3 className="font-display text-[2rem] leading-none tracking-[-0.055em]">{item.name}</h3>
                    <p className="mt-3 max-w-[250px] text-sm leading-5 opacity-70">{item.description}</p>
                  </div>
                  <span className="font-display text-xl tracking-[-0.04em]">{item.price}</span>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-current/15 pt-4 text-[10px] font-bold uppercase tracking-[0.18em] opacity-65">
                  <span>{item.category === 'scoop' ? 'Sweet tooth approved' : item.category === 'coffee' ? 'Stay a little' : 'Made to share'}</span>
                  <Heart size={15} strokeWidth={1.8} />
                </div>
              </article>
            ))}
          </div>
          <p className="mt-7 text-center text-xs text-malaya-muted">Seasonal flavors rotate often. Follow along for the latest drops.</p>
        </div>
      </section>

      <section id="story" className="bg-malaya-cream py-20 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-24">
          <div className="relative max-w-[570px]">
            <div className="absolute -left-3 -top-3 h-16 w-16 rounded-full border border-malaya-purple/30 sm:-left-7 sm:-top-7 sm:h-24 sm:w-24" />
            <img src="/manus-storage/malaya-ube_d37fb45d.jpg" alt="Ube sundae topped with toasted coconut" className="aspect-[4/5] w-full rounded-[190px_190px_18px_18px] object-cover shadow-[18px_20px_0_#d8d0e9] sm:rounded-[240px_240px_24px_24px]" />
            <div className="absolute bottom-5 right-[-12px] rounded-full bg-malaya-sun px-5 py-4 font-display text-lg leading-none tracking-[-0.04em] shadow-lg sm:bottom-8 sm:right-[-28px]">Freedom<br />to indulge.</div>
          </div>
          <div>
            <p className="section-kicker">Our story</p>
            <h2 className="mt-5 max-w-[570px] font-display text-[clamp(3.2rem,6vw,6rem)] leading-[0.9] tracking-[-0.07em]">Malaya means<br /><em className="text-malaya-purple">to be free.</em></h2>
            <div className="mt-8 max-w-[510px] space-y-5 text-[16px] leading-7 text-malaya-muted">
              <p>So we built a place around that feeling. A Filipino-inspired café where bright flavors, Philippine-grown coffee, and housemade ice cream get to take up space.</p>
              <p>Come in for something familiar. Leave with something you didn’t know you needed.</p>
            </div>
            <a href={instagramLink} target="_blank" rel="noreferrer" className="mt-9 inline-flex items-center gap-2 rounded-full border border-malaya-ink/20 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] transition hover:border-malaya-ink hover:bg-malaya-ink hover:text-malaya-cream">Follow the feeling <Instagram size={16} /></a>
          </div>
        </div>
      </section>

      <section className="bg-malaya-purple px-4 py-5 sm:px-6">
        <div className="marquee flex min-w-max items-center gap-10 text-[11px] font-bold uppercase tracking-[0.28em] text-malaya-cream sm:gap-16">
          <span>pandan cream</span><span className="text-malaya-sun">✳</span><span>ube soft serve</span><span className="text-malaya-sun">✳</span><span>barako espresso</span><span className="text-malaya-sun">✳</span><span>come as you are</span><span className="text-malaya-sun">✳</span><span>pandan cream</span>
        </div>
      </section>

      <section id="visit" className="bg-malaya-ink py-20 text-malaya-cream sm:py-28">
        <div className="container grid gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-24">
          <div>
            <p className="section-kicker text-malaya-sun">Come by sometime</p>
            <h2 className="mt-5 max-w-[590px] font-display text-[clamp(3.6rem,7vw,7rem)] leading-[0.84] tracking-[-0.075em]">See you on<br /><em className="text-malaya-sun">Sunset.</em></h2>
            <p className="mt-7 max-w-[420px] text-[16px] leading-7 text-white/60">Find us in the heart of Silver Lake, where the coffee is strong, the scoops are generous, and there’s always room for one more.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={mapLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full bg-malaya-sun px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.19em] text-malaya-ink transition hover:-translate-y-0.5 hover:bg-white">Open in maps <MapPin size={16} /></a>
              <a href={instagramLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full border border-white/25 px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.19em] transition hover:border-white hover:bg-white/10">@malayacoffeeshop <Instagram size={16} /></a>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:pt-20">
            <div className="visit-card sm:col-span-2"><MapPin size={20} className="text-malaya-sun" /><p className="visit-label">Address</p><p className="mt-2 text-lg">2839 W Sunset Blvd<br />Los Angeles, CA 90026</p></div>
            <div className="visit-card"><Clock3 size={20} className="text-malaya-sun" /><p className="visit-label">Hours</p><p className="mt-2 text-lg">Mon–Fri 8–6<br />Sat–Sun 9–6</p></div>
            <a href={phoneLink} className="visit-card transition hover:bg-white/10"><Phone size={20} className="text-malaya-sun" /><p className="visit-label">Phone</p><p className="mt-2 text-lg">(818) 850-5515</p></a>
          </div>
        </div>
      </section>

      <section className="bg-malaya-sun py-16 sm:py-20">
        <div className="container grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="section-kicker">Stay in the loop</p>
            <h2 className="mt-4 max-w-[520px] font-display text-[clamp(3rem,5.5vw,5.5rem)] leading-[0.88] tracking-[-0.07em]">New flavors,<br />same good energy.</h2>
          </div>
          <div>
            {subscribed ? (
              <div className="flex items-center gap-3 border-b border-malaya-ink/30 pb-4 text-lg"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-malaya-ink text-malaya-sun"><Check size={16} /></span> You’re on the list. See you soon.</div>
            ) : (
              <form onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }} className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <label className="flex-1"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em]">Your email</span><input required type="email" placeholder="you@example.com" className="w-full border-b border-malaya-ink/35 bg-transparent px-0 py-3 text-lg outline-none placeholder:text-malaya-ink/45 focus:border-malaya-ink" /></label>
                <button type="submit" className="inline-flex items-center justify-center gap-3 rounded-full bg-malaya-ink px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.19em] text-malaya-cream transition hover:-translate-y-0.5 hover:bg-malaya-purple">Sign me up <ArrowUpRight size={16} /></button>
              </form>
            )}
            <p className="mt-4 text-xs text-malaya-ink/60">Occasional notes from the shop. No spam, promise.</p>
          </div>
        </div>
      </section>

      <footer className="bg-malaya-cream py-8">
        <div className="container flex flex-col justify-between gap-6 text-[10px] font-bold uppercase tracking-[0.18em] sm:flex-row sm:items-center">
          <a href="#top" className="font-display text-2xl normal-case tracking-[-0.05em]">malaya<span className="text-malaya-purple">.</span></a>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-malaya-muted"><a href={instagramLink} target="_blank" rel="noreferrer" className="hover:text-malaya-purple">Instagram</a><a href={mapLink} target="_blank" rel="noreferrer" className="hover:text-malaya-purple">Directions</a><a href={phoneLink} className="hover:text-malaya-purple">Call us</a><span>© 2026 Malaya</span></div>
        </div>
      </footer>
    </main>
  );
}
