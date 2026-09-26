import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-linen px-6 py-10 text-sm text-slate md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:justify-between">
        <span>&copy; {new Date().getFullYear()} God&rsquo;s Church</span>
        <div className="flex gap-6">
          <Link href="/connect" className="hover:text-ink">Contact</Link>
          <Link href="/giving" className="hover:text-ink">Give</Link>
          <Link href="/login" className="text-slate/60 hover:text-ink">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
