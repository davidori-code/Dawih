"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImageField from "@/components/ImageField";

type Sermon = {
  id: string;
  title: string;
  speaker: string;
  series: string | null;
  description: string | null;
  videoUrl: string | null;
  coverImage: string | null;
  date: string;
};

type EventItem = {
  id: string;
  title: string;
  description: string | null;
  date: string;
  location: string;
  coverImage: string | null;
};

type Announcement = {
  id: string;
  title: string;
  body: string;
  isPinned: boolean;
};

// Shared styling so every field across every panel looks the same —
// generous padding, a soft background, and a clear focus state.
const fieldClasses =
  "w-full rounded-xl border border-ink/10 bg-linen/60 px-4 py-2.5 text-sm text-ink outline-none transition focus:border-ember focus:bg-white focus:ring-4 focus:ring-ember/10";
const fieldLabelClasses = "block text-xs font-medium uppercase tracking-wide text-slate";
const submitButtonClasses =
  "w-full rounded-full bg-ember px-5 py-3 text-sm font-semibold text-bone shadow-sm transition hover:bg-ember-dim hover:shadow-md disabled:opacity-60";

export default function AdminDashboardClient() {
  const router = useRouter();

  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    fetch("/api/sermons").then((r) => r.json()).then((d) => setSermons(d.sermons));
    fetch("/api/events").then((r) => r.json()).then((d) => setEvents(d.events));
    fetch("/api/announcements").then((r) => r.json()).then((d) => setAnnouncements(d.announcements));
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-linen px-6 py-12 md:px-12">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-4xl text-ink">Admin dashboard</h1>
          <button
            onClick={handleLogout}
            className="rounded-full border border-ink/20 px-4 py-2 text-sm text-ink hover:bg-ink/5"
          >
            Log out
          </button>
        </div>

        <p className="mt-2 text-sm text-slate">
          Home, About, Locations, and Ministries photos are edited directly in
          code now — see lib/content/ and the section components. This
          dashboard covers what actually changes week to week.
        </p>

        {/* Each panel gets its own full-width row — plenty of room for
            every field, nothing cramped or overlapping. */}
        <div className="mt-10 flex flex-col gap-10">
          <SermonsPanel sermons={sermons} setSermons={setSermons} />
          <EventsPanel events={events} setEvents={setEvents} />
          <AnnouncementsPanel announcements={announcements} setAnnouncements={setAnnouncements} />
        </div>
      </div>
    </main>
  );
}

/* ---------- Sermons ---------- */

function SermonsPanel({
  sermons,
  setSermons,
}: {
  sermons: Sermon[];
  setSermons: (s: Sermon[]) => void;
}) {
  const [title, setTitle] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [series, setSeries] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/sermons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, speaker, series, description, videoUrl, coverImage, date }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Couldn't add sermon.");
        return;
      }
      setSermons([data.sermon, ...sermons]);
      setTitle("");
      setSpeaker("");
      setSeries("");
      setDescription("");
      setVideoUrl("");
      setCoverImage("");
      setDate("");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/sermons/${id}`, { method: "DELETE" });
    setSermons(sermons.filter((s) => s.id !== id));
  }

  return (
    <section className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
      <h2 className="font-display text-2xl text-ink">Sermons</h2>

      <form onSubmit={handleAdd} className="mt-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={fieldLabelClasses}>Title</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`${fieldClasses} mt-1.5`}
            />
          </div>
          <div>
            <label className={fieldLabelClasses}>Speaker</label>
            <input
              required
              value={speaker}
              onChange={(e) => setSpeaker(e.target.value)}
              className={`${fieldClasses} mt-1.5`}
            />
          </div>
          <div>
            <label className={fieldLabelClasses}>Topic / series</label>
            <input
              placeholder="Shown as a tag on the thumbnail"
              value={series}
              onChange={(e) => setSeries(e.target.value)}
              className={`${fieldClasses} mt-1.5`}
            />
          </div>
          <div>
            <label className={fieldLabelClasses}>Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`${fieldClasses} mt-1.5`}
            />
          </div>
        </div>

        <div>
          <label className={fieldLabelClasses}>Short description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className={`${fieldClasses} mt-1.5`}
          />
        </div>

        <div>
          <label className={fieldLabelClasses}>Video URL</label>
          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className={`${fieldClasses} mt-1.5`}
          />
        </div>

        <ImageField label="Cover image" value={coverImage} onChange={setCoverImage} onError={setError} />

        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={isSubmitting} className={submitButtonClasses}>
          {isSubmitting ? "Adding…" : "Add sermon"}
        </button>
      </form>

      <ul className="mt-6 divide-y divide-ink/10 border-t border-ink/10">
        {sermons.map((s) => (
          <li key={s.id} className="flex items-center justify-between gap-3 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">{s.title}</p>
              <p className="text-xs text-slate">{s.speaker} &middot; {new Date(s.date).toLocaleDateString()}</p>
            </div>
            <button
              onClick={() => handleDelete(s.id)}
              className="shrink-0 rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Events ---------- */

function EventsPanel({
  events,
  setEvents,
}: {
  events: EventItem[];
  setEvents: (e: EventItem[]) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, date, location, coverImage }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Couldn't add event.");
        return;
      }
      setEvents([...events, data.event].sort((a, b) => a.date.localeCompare(b.date)));
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setCoverImage("");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/events/${id}`, { method: "DELETE" });
    setEvents(events.filter((e) => e.id !== id));
  }

  return (
    <section className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
      <h2 className="font-display text-2xl text-ink">Events</h2>

      <form onSubmit={handleAdd} className="mt-5 space-y-4">
        <div>
          <label className={fieldLabelClasses}>Title</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${fieldClasses} mt-1.5`}
          />
        </div>

        <div>
          <label className={fieldLabelClasses}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className={`${fieldClasses} mt-1.5`}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={fieldLabelClasses}>Location</label>
            <input
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`${fieldClasses} mt-1.5`}
            />
          </div>
          <div>
            <label className={fieldLabelClasses}>Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`${fieldClasses} mt-1.5`}
            />
          </div>
        </div>

        <ImageField label="Flyer image" value={coverImage} onChange={setCoverImage} onError={setError} />

        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={isSubmitting} className={submitButtonClasses}>
          {isSubmitting ? "Adding…" : "Add event"}
        </button>
      </form>

      <ul className="mt-6 divide-y divide-ink/10 border-t border-ink/10">
        {events.map((e) => (
          <li key={e.id} className="flex items-center justify-between gap-3 py-3">
            <div className="flex min-w-0 items-center gap-3">
              {e.coverImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={e.coverImage} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover" />
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{e.title}</p>
                <p className="text-xs text-slate">{new Date(e.date).toLocaleDateString()} &middot; {e.location}</p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(e.id)}
              className="shrink-0 rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Announcements ---------- */

function AnnouncementsPanel({
  announcements,
  setAnnouncements,
}: {
  announcements: Announcement[];
  setAnnouncements: (a: Announcement[]) => void;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, isPinned }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Couldn't add announcement.");
        return;
      }
      setAnnouncements([data.announcement, ...announcements]);
      setTitle("");
      setBody("");
      setIsPinned(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/announcements/${id}`, { method: "DELETE" });
    setAnnouncements(announcements.filter((a) => a.id !== id));
  }

  return (
    <section className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
      <h2 className="font-display text-2xl text-ink">Announcements</h2>

      <form onSubmit={handleAdd} className="mt-5 space-y-4">
        <div>
          <label className={fieldLabelClasses}>Title</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${fieldClasses} mt-1.5`}
          />
        </div>
        <div>
          <label className={fieldLabelClasses}>Message</label>
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={2}
            className={`${fieldClasses} mt-1.5`}
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate">
          <input
            type="checkbox"
            checked={isPinned}
            onChange={(e) => setIsPinned(e.target.checked)}
            className="h-4 w-4 rounded border-ink/20 text-ember focus:ring-ember/30"
          />
          Pin to top
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={isSubmitting} className={submitButtonClasses}>
          {isSubmitting ? "Adding…" : "Add announcement"}
        </button>
      </form>

      <ul className="mt-6 divide-y divide-ink/10 border-t border-ink/10">
        {announcements.map((a) => (
          <li key={a.id} className="flex items-center justify-between gap-3 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">
                {a.isPinned ? "\ud83d\udccc " : ""}
                {a.title}
              </p>
              <p className="truncate text-xs text-slate">{a.body}</p>
            </div>
            <button
              onClick={() => handleDelete(a.id)}
              className="shrink-0 rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
