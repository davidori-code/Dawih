import { prisma } from "@/lib/prisma";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SermonCard from "@/components/SermonCard";

export default async function SermonsPage() {
  const sermons = await prisma.sermon.findMany({ orderBy: { date: "desc" } });

  return (
    <div className="min-h-screen bg-linen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-16 md:px-12">
        <div className="text-center">
          <h1 className="font-display text-4xl text-ink sm:text-5xl">Sermons</h1>
          <p className="mt-2 text-slate">Watch or listen to past messages.</p>
        </div>

        {sermons.length === 0 ? (
          <p className="mt-10 text-center text-slate">No sermons posted yet — check back soon.</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sermons.map((s) => (
              <SermonCard key={s.id} {...s} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
