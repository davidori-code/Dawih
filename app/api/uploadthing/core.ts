import { createUploadthing, type FileRouter } from "uploadthing/next";
import { verifySession } from "@/lib/auth";

const f = createUploadthing();

// UploadThing's middleware gets a plain fetch Request, not NextRequest,
// so we read the session cookie by hand rather than using req.cookies.
function getAdminSession(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(/session=([^;]+)/);
  const token = match?.[1];
  return token ? verifySession(token) : null;
}

export const ourFileRouter = {
  // One upload "slot", used for sermon (and later ministry) cover images.
  coverImageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const session = getAdminSession(req);
      if (!session) throw new Error("Not authorized");
      return { adminId: session.adminId };
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
