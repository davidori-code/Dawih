import Image from "next/image";

// Edited directly here since this rarely changes. Drop the photo in
// public/pastor.jpg (or change the path below to whatever you name it).
// Replace the name and bio text with the real details whenever ready.
const PASTOR_IMAGE = "/pastors.png";
const PASTOR_NAME = "Pastor Trevor Akpomughe";
const PASTOR_BIO =
  "Pastor Trevor Akpomughe is the lead pastor of God's Church, dedicated to teaching the Word with clarity and warmth. With a heart for discipleship and a passion for seeing lives transformed, they lead this community in worship, prayer, and genuine care for one another.";

export default function PastorSection() {
  return (
    <section id="pastor" className="scroll-mt-24 bg-charcoal px-6 py-20 md:px-12">
      <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-5 md:items-center">
        <div className="relative order-2 aspect-[4/5] overflow-hidden rounded-3xl bg-ink md:order-1 md:col-span-2">
          <Image src={PASTOR_IMAGE} alt={PASTOR_NAME} fill className="object-cover" />
        </div>
        <div className="order-1 text-center md:order-2 md:col-span-3 md:text-left">
          <p className="text-xs uppercase tracking-wide text-ember">Meet our pastor</p>
          <h2 className="font-display mt-2 text-3xl text-bone sm:text-4xl">{PASTOR_NAME}</h2>
          <p className="mt-4 text-bone/70">{PASTOR_BIO}</p>
        </div>
      </div>
    </section>
  );
}
