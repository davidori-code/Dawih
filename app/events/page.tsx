import { prisma } from "@/lib/prisma";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default async function EventsPage() {
  const events = await prisma.event.findMany({ orderBy: { date: "asc" } });

  return (
    <div className="min-h-screen bg-linen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-16 md:px-12">
        <div className="text-center">
          <h1 className="font-display text-4xl text-ink sm:text-5xl">Events</h1>
          <p className="mt-2 text-slate">What&rsquo;s happening at Jubilee Christian Family.</p>
        </div>

        {events.length === 0 ? (
          <p className="mt-10 text-slate">No events posted yet — check back soon.</p>
        ) : (
          <ul className="mt-10 space-y-4">
            {events.map((e) => (
              <li key={e.id} className="overflow-hidden rounded-3xl border border-ink/10 bg-white sm:flex">
                {e.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={e.coverImage} alt={e.title} className="h-40 w-full object-cover sm:h-auto sm:w-48" />
                )}
                <div className="p-6">
                  <p className="text-xs text-ember">
                    {new Date(e.date).toLocaleDateString(undefined, {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="font-display mt-1 text-xl text-ink">{e.title}</h2>
                  <p className="mt-1 text-sm text-slate">{e.location}</p>
                  {e.description && <p className="mt-2 text-sm text-slate">{e.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
