"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Ministries", href: "/ministries" },
  { label: "Locations", href: "/locations" },
  { label: "Sermons", href: "/sermons" },
  { label: "Events", href: "/events" },
  { label: "Connect", href: "/connect" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-ink">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-12">
        <Link
          href="/"
          className="flex items-center gap-3 font-display text-2xl text-bone"
        >
          <Image
            src="/logo.png"
            alt="Dawih Global logo"
            width={42}
            height={42}
            className="h-10 w-10 object-contain"
          />

          <span>Dawih Global</span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm uppercase tracking-wide md:flex">
          {nav.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1.5 transition ${
                  isActive
                    ? "bg-bone/15 text-bone"
                    : "text-bone/70 hover:text-bone"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/giving"
            className="ml-3 rounded-full bg-ember px-5 py-2 text-xs font-medium text-bone transition hover:bg-ember-dim"
          >
            Give
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-bone transition ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-bone transition ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-bone transition ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-bone/10 px-6 py-4 text-sm uppercase tracking-wide md:hidden">
          {nav.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`w-fit rounded-full px-3 py-1.5 ${
                  isActive ? "bg-bone/15 text-bone" : "text-bone/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/giving"
            onClick={() => setOpen(false)}
            className="mt-2 w-fit rounded-full bg-ember px-5 py-2 text-xs font-medium text-bone"
          >
            Give
          </Link>
        </nav>
      )}
    </header>
  );
}