import { locations } from "@/lib/content/locations";

export default function LocationsSection() {
  return (
    <section id="locations" className="scroll-mt-24 bg-ink px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-display text-4xl text-bone sm:text-5xl">Locations</h2>
          <p className="mt-2 text-bone/70">Join us at a campus near you, or online.</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((loc) => (
            <div
              key={loc.name}
              className="overflow-hidden rounded-3xl bg-charcoal shadow-sm transition hover:shadow-lg"
            >
              {loc.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={loc.image} alt={loc.name} className="h-36 w-full object-cover" />
              )}
              <div className="p-5">
                <h3 className="font-display text-lg text-bone">{loc.name}</h3>
                {loc.address && <p className="mt-1 text-xs text-bone/60">{loc.address}</p>}
                <p className="mt-2 text-sm text-ember">{loc.serviceTimes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
