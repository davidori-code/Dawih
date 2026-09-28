import Image from "next/image";

// Edited directly here since this rarely changes. Drop the photo in
// public/about.jpg (or change the path below to whatever you name it).
const ABOUT_IMAGE = "/about.png";

export default function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 md:px-12">
      <div className="text-center">
        <h2 className="font-display text-4xl text-ink sm:text-5xl">About us</h2>
      </div>
      <div className="mx-auto mt-10 grid max-w-4xl gap-10 md:grid-cols-5 md:items-center">
        <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-3xl bg-charcoal md:order-1 md:col-span-2 md:aspect-[4/5]">
          <Image src={ABOUT_IMAGE} alt="Our church community" fill className="object-cover" />
        </div>
        <div className="order-1 space-y-4 text-center text-slate md:order-2 md:col-span-3 md:text-left">
          <p>
            Jubilee Christian Family is a community built around worship, teaching,
            and life together. Whether you&rsquo;re exploring faith for the
            first time or looking for a new church home, there&rsquo;s a seat
            for you.
          </p>
          <p>
            Sunday services run at 8:00 and 10:30 AM, with a midweek gathering
            on Wednesdays at 6:00 PM. Every service is also streamed online.
          </p>
        </div>
      </div>
    </section>
  );
}
