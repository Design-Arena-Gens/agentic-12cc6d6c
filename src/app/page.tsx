import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  Home as HomeIcon,
  MapPin,
} from "lucide-react";

const highlights = [
  {
    label: "Properties Sold",
    value: "1,250+",
    subtext: "Across premium neighborhoods worldwide",
  },
  {
    label: "Average ROI",
    value: "15.6%",
    subtext: "Year-over-year for investors in 2023",
  },
  {
    label: "Client Satisfaction",
    value: "98%",
    subtext: "Based on post-booking feedback",
  },
];

const featuredResidences = [
  {
    title: "Skyline Penthouse",
    location: "Midtown Manhattan, New York",
    price: "$6.4M",
    details: "4 bed · 4.5 bath · 3,800 sqft",
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Seaside Villa",
    location: "Malibu Coast, California",
    price: "$4.9M",
    details: "5 bed · 5 bath · 5,200 sqft",
    image:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Modern Estate",
    location: "Upper Pacific Heights, San Francisco",
    price: "$3.2M",
    details: "4 bed · 3 bath · 4,100 sqft",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a07fce7a2?auto=format&fit=crop&w=1200&q=80",
  },
];

const services = [
  {
    title: "Tailored Property Discovery",
    description:
      "Curated shortlists based on lifestyle, investment goals, and neighborhood analytics.",
    icon: HomeIcon,
  },
  {
    title: "Concierge-Level Guidance",
    description:
      "Dedicated advisors managing inspections, legal documentation, and financing support.",
    icon: BadgeCheck,
  },
  {
    title: "Immersive Experience Tours",
    description:
      "Hybrid virtual and on-site walkthroughs with interactive market insights in real time.",
    icon: MapPin,
  },
  {
    title: "Streamlined Scheduling",
    description:
      "Access the BluePeak dashboard to coordinate meetings, inspections, and follow-ups effortlessly.",
    icon: Calendar,
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-hero-pattern" />
      <header className="sticky top-0 z-40 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold text-white"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg font-bold text-white shadow-glow">
              BP
            </span>
            BluePeak Estates
          </Link>
          <nav className="hidden items-center gap-10 text-sm font-medium text-slate-200 md:flex">
            <a href="#residences" className="transition hover:text-white">
              Residences
            </a>
            <a href="#services" className="transition hover:text-white">
              Services
            </a>
            <a href="#testimonials" className="transition hover:text-white">
              Testimonials
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard"
              className="hidden rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950 shadow-glow transition hover:bg-slate-100 md:inline-flex"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 pb-24 pt-14 md:pt-24">
        <section className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80 ring-1 ring-white/20">
              Tailored luxury matching for global buyers
            </div>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Invest in properties that elevate your life and portfolio.
            </h1>
            <p className="text-lg text-slate-200">
              BluePeak Estates pairs data-driven insights with high-touch
              advisory to connect you with residences that exemplify modern
              luxury. Schedule a consultation to explore listings before they
              reach the market.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-400"
              >
                Launch Booking Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#residences"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                View Featured Residences
              </a>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-brand-900/20">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
            <div className="absolute bottom-6 right-6 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Exclusive Network
            </div>
            <div
              className="aspect-[4/3] overflow-hidden rounded-2xl bg-slate-900/60 ring-1 ring-white/5"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="mt-6 grid grid-cols-3 gap-4 text-left text-sm text-slate-200">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{item.subtext}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="residences"
          className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
        >
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-semibold text-white">
                Curated Residences
              </h2>
              <p className="mt-3 max-w-2xl text-base text-slate-200">
                Explore hand-picked listings with architectural distinction,
                panoramic views, and lifestyle-driven amenities.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              Arrange a Private Tour
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredResidences.map((residence) => (
              <article
                key={residence.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60"
              >
                <div
                  className="aspect-[4/3] overflow-hidden bg-slate-900/70 transition duration-500 group-hover:scale-[1.02]"
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(9,16,28,0.75), rgba(9,16,28,0.05)), url('${residence.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="space-y-3 p-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
                    <span>{residence.details}</span>
                    <span>{residence.price}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {residence.title}
                  </h3>
                  <p className="flex items-center gap-2 text-sm text-slate-300">
                    <MapPin className="h-4 w-4 text-brand-400" />
                    {residence.location}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="services"
          className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur md:grid-cols-2"
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-white">
              A modern brokerage built around your time.
            </h2>
            <p className="text-base text-slate-200">
              With real-time analytics, integrated scheduling, and a concierge
              team dedicated to each engagement, BluePeak Estates orchestrates
              every touchpoint of your property journey.
            </p>
          </div>
          <div className="grid gap-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="flex gap-4 rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition hover:border-brand-400/40 hover:bg-slate-900/90"
              >
                <service.icon className="h-10 w-10 flex-shrink-0 rounded-xl bg-brand-500/20 p-2 text-brand-300" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-300">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="testimonials"
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/70 via-slate-900/50 to-slate-900/80 p-8"
        >
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
            <div className="max-w-md space-y-4">
              <p className="inline-flex items-center rounded-full bg-brand-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
                Client Stories
              </p>
              <h2 className="text-3xl font-semibold text-white">
                “BluePeak transformed our relocation. Their dashboard made
                coordination effortless.”
              </h2>
              <p className="text-sm text-slate-300">
                Claudia & Daniel Rivera, relocated from London to San Francisco
                in less than six weeks with BluePeak&apos;s concierge program.
              </p>
            </div>
            <div className="grid flex-1 gap-4 md:grid-cols-2">
              {["Market intel tailored to our portfolio.", "The scheduling portal kept every stakeholder aligned.", "Virtual previews felt like being there in person.", "Advisors negotiated terms we didn’t think possible."].map(
                (quote) => (
                  <div
                    key={quote}
                    className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-sm text-slate-200"
                  >
                    {quote}
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-400">
            <p>Trusted across 32 international property markets.</p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition hover:border-brand-500/60 hover:bg-brand-500/20"
            >
              Schedule Your Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} BluePeak Estates. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition hover:text-white">
              Terms
            </a>
            <a href="#" className="transition hover:text-white">
              Careers
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
