"use client";

import { useState } from "react";
import { UploadButton } from "@/lib/uploadthing";

// Used everywhere a cover photo is needed. Two ways to set it:
// 1. Click Upload (needs an UploadThing account configured), or
// 2. Type a path directly — e.g. if you've placed a file yourself at
//    public/events/christmas.jpg, just type "/events/christmas.jpg".
//    No upload service involved at all for that path.
export default function ImageField({
  label,
  value,
  onChange,
  onError,
}: {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  onError?: (message: string) => void;
}) {
  const [manualInput, setManualInput] = useState("");

  return (
    <div>
      {label && <p className="text-sm font-medium text-ink">{label}</p>}
      <div className={`${label ? "mt-1.5" : ""} rounded-xl border border-dashed border-ink/15 bg-linen/40 p-4`}>
        {value ? (
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
            <span className="min-w-0 flex-1 truncate text-xs text-slate">{value}</span>
            <button
              type="button"
              onClick={() => {
                onChange("");
                setManualInput("");
              }}
              className="shrink-0 rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <UploadButton
                endpoint="coverImageUploader"
                onClientUploadComplete={(res) => {
                  if (res?.[0]?.url) onChange(res[0].url);
                }}
                onUploadError={(err) => onError?.(`Image upload failed: ${err.message}`)}
              />
            </div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-slate">
              <span className="h-px flex-1 bg-ink/10" />
              or type a path
              <span className="h-px flex-1 bg-ink/10" />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                placeholder="/events/christmas.jpg"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                className="min-w-0 flex-1 rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-ember focus:ring-2 focus:ring-ember/20"
              />
              <button
                type="button"
                onClick={() => manualInput.trim() && onChange(manualInput.trim())}
                className="shrink-0 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-bone hover:bg-ink/80"
              >
                Use
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
