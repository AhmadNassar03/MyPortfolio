import type { Metadata } from "next";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/nav/Footer";
import { FeaturedBento } from "@/components/projects/FeaturedBento";
import { GithubFeed } from "@/components/projects/GithubFeed";
import { NoiseLayer } from "@/components/ui/NoiseLayer";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Featured AI products built and shipped by Ahmad Nassar — OmniAgent, LeadGrade, WorkForce AI, and more.",
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="relative pt-32">
        <NoiseLayer />
        <FeaturedBento />
        <GithubFeed />
      </main>
      <Footer />
    </>
  );
}
