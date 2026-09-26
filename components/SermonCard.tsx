type SermonCardProps = {
  title: string;
  speaker: string;
  series?: string | null;
  description?: string | null;
  date: string | Date;
  videoUrl?: string | null;
  coverImage?: string | null;
};

export default function SermonCard({
  title,
  speaker,
  series,
  description,
  date,
  videoUrl,
  coverImage,
}: SermonCardProps) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm transition hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden bg-charcoal">
        {coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage}
            alt={title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent" />

        {/* Play button — gives the thumbnail a "video" feel even for audio-only entries */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-bone/90 text-ink shadow-md transition group-hover:scale-110">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {series && (
          <span className="absolute right-3 top-3 rounded-full bg-ember px-3 py-1 text-xs font-medium text-bone">
            {series}
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate">
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {new Date(date).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
            </svg>
            {speaker}
          </span>
        </div>
        <h3 className="font-display mt-2 text-xl text-ink">{title}</h3>
        {description && <p className="mt-2 line-clamp-2 text-sm text-slate">{description}</p>}
        {videoUrl && (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-ember hover:underline"
          >
            Watch sermon →
          </a>
        )}
      </div>
    </div>
  );
}
