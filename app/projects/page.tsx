import type { Metadata } from "next";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/nav/Footer";
import { FeaturedBento } from "@/components/projects/FeaturedBento";
import { NoiseLayer } from "@/components/ui/NoiseLayer";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "AI products built and shipped by Ahmad Nassar — Sawt (Arabic AI voice agents), Maskan, ArdAI, OmniAgent, LeadGrade, WorkForce AI and more.",
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="relative pt-32">
        <NoiseLayer />
        <FeaturedBento index="01" />
      </main>
      <Footer />
    </>
  );
}
