import { ministries } from "@/lib/content/ministries";

export default function MinistriesSection() {
  return (
    <section id="ministries" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 md:px-12">
      <div className="text-center">
        <h2 className="font-display text-4xl text-ink sm:text-5xl">Ministries</h2>
        <p className="mt-2 text-slate">Ways to get involved and grow.</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ministries.map((m) => (
          <div
            key={m.name}
            className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm transition hover:shadow-lg"
          >
            {m.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.image} alt={m.name} className="h-40 w-full object-cover" />
            )}
            <div className="p-6">
              <h3 className="font-display text-xl text-ink">{m.name}</h3>
              <p className="mt-2 text-sm text-slate">{m.description}</p>
              {m.leader && <p className="mt-2 text-xs text-ember">Led by {m.leader}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
