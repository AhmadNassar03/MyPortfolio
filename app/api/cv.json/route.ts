import { NextResponse } from "next/server";
import {
  profile,
  skills,
  experience,
  projects,
  certifications,
  education,
  leadership,
  languages,
} from "@/content/cv";

/**
 * /api/cv.json
 *
 * Structured CV endpoint for AI agents and integrations.
 * Returns the full canonical Ahmad Nassar profile as JSON.
 *
 * Cached aggressively — content changes rarely.
 */

export const revalidate = 86400;

export async function GET() {
  return NextResponse.json(
    {
      $schema: "https://ahmadnassar.dev/api/cv.schema.json",
      generatedAt: new Date().toISOString(),
      profile,
      skills,
      experience,
      projects,
      certifications,
      education,
      leadership,
      languages,
    },
    {
      headers: {
        "Cache-Control":
          "public, s-maxage=86400, stale-while-revalidate=604800",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}
