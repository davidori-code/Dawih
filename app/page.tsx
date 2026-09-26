import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AboutSection from "@/components/sections/AboutSection";
import PastorSection from "@/components/sections/PastorSection";
import LocationsSection from "@/components/sections/LocationsSection";
import MinistriesSection from "@/components/sections/MinistriesSection";
import ConnectSection from "@/components/sections/ConnectSection";
import GivingSection from "@/components/sections/GivingSection";
import SermonCard from "@/components/SermonCard";

// Edited directly here since this rarely changes. Drop the photo in
// public/hero.jpg (or change the path below to whatever you name it).
const HERO_IMAGE = "/hero.png";

// This runs on the server, so the sermon/event previews below always
// show whatever the admin has actually added — no separate "publish"
// step needed. Ministries, Locations, and About are plain code (see
// lib/content/) since they rarely change.
export default async function Home() {
  const [latestSermon, upcomingEvent, announcement] = await Promise.all([
    prisma.sermon.findFirst({ orderBy: { date: "desc" } }),
    prisma.event.findFirst({ where: { date: { gte: new Date() } }, orderBy: { date: "asc" } }),
    prisma.announcement.findFirst({ orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }] }),
  ]);

  return (
    <div className="min-h-screen bg-linen">
      <SiteHeader />

      {/* Hero — full-bleed dark section, centered headline, one accent CTA */}
      <section id="home" className="relative scroll-mt-24 overflow-hidden bg-ink">
        <Image src={HERO_IMAGE} alt="" fill priority className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-ink/60" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 15% 10%, rgba(185,52,44,0.20), transparent), radial-gradient(50% 60% at 85% 80%, rgba(185,52,44,0.12), transparent)",
          }}
        />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pb-28 pt-20 text-center md:px-12 md:pt-28">
          {announcement && (
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-bone/10 px-4 py-1.5 text-xs uppercase tracking-wide text-bone/80">
              <span className="h-1.5 w-1.5 rounded-full bg-ember" />
              {announcement.title}
            </div>
          )}
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-bone sm:text-6xl md:text-7xl">
            Welcome Home,
            <br />
            We're Glad You're Here.
          </h1>
          <p className="mt-6 max-w-md text-lg text-bone/70">
            A community gathering in person and online to worship, grow, and
            serve together.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="#locations"
              className="rounded-full bg-ember px-7 py-3.5 font-medium text-bone transition hover:bg-ember-dim"
            >
              Join Us This Sunday
            </Link>
            <Link
              href="/sermons"
              className="rounded-full border border-bone/25 px-7 py-3.5 font-medium text-bone transition hover:border-bone/50"
            >
              ▷ Watch Online
            </Link>
          </div>
        </div>
      </section>

      <AboutSection />
      <MinistriesSection />
      <LocationsSection />

      {/* Sermons + Events previews — full archives live on their own pages */}
      <section id="sermons" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 md:px-12">
        <div className="grid gap-6 md:grid-cols-5">
          <div className="md:col-span-3">
            <p className="mb-3 text-xs uppercase tracking-wide text-ember">Latest sermon</p>
            {latestSermon ? (
              <SermonCard {...latestSermon} />
            ) : (
              <div className="rounded-3xl border border-ink/10 bg-white p-8 text-slate">
                No sermons posted yet — check back soon.
              </div>
            )}
            <Link href="/sermons" className="mt-4 inline-block text-sm font-medium text-ember hover:underline">
              Watch the full library →
            </Link>
          </div>
          <div id="events" className="scroll-mt-24 overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm md:col-span-2">
            {upcomingEvent?.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={upcomingEvent.coverImage} alt={upcomingEvent.title} className="h-40 w-full object-cover" />
            )}
            <div className="p-8">
              <p className="text-xs uppercase tracking-wide text-ember">Coming up</p>
              {upcomingEvent ? (
                <>
                  <h2 className="font-display mt-3 text-2xl text-ink">{upcomingEvent.title}</h2>
                  <p className="mt-2 text-slate">{new Date(upcomingEvent.date).toLocaleDateString()}</p>
                  <p className="text-sm text-slate">{upcomingEvent.location}</p>
                </>
              ) : (
                <p className="mt-3 text-slate">No upcoming events posted yet.</p>
              )}
              <Link href="/events" className="mt-6 inline-block text-sm font-medium text-ink hover:underline">
                See all events →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PastorSection />
      <ConnectSection />
      <GivingSection />

      <SiteFooter />
    </div>
  );
}
