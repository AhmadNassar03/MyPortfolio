import { projects } from "@/content/cv";
import { ProjectCard } from "./ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";

export function FeaturedBento() {
  // Bento: Sawt feature (2×2) + WorkForce tall (1×2) on top; OmniAgent,
  // LeadGrade, SiyanahJo as three defaults filling the bottom row.
  const sawt = projects.find((p) => p.slug === "sawt")!;
  const omni = projects.find((p) => p.slug === "omniagent")!;
  const lead = projects.find((p) => p.slug === "leadgrade")!;
  const work = projects.find((p) => p.slug === "workforce-ai")!;
  const siyanah = projects.find((p) => p.slug === "siyanahjo")!;

  return (
    <section id="projects" className="section">
      <div className="container-max">
        <SectionHeader
          index="03"
          eyebrow="Featured Work"
          title={
            <>
              Real <em className="font-display italic aurora-text">AI products</em>
              ,
              <br />
              shipped to production.
            </>
          }
          description="Every project below is either live or a case study with full tech detail. AI is the through-line."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:auto-rows-[minmax(280px,auto)] lg:grid-cols-3">
          {/* Sawt — feature card spans 2 cols × 2 rows on lg */}
          <FadeIn className="md:col-span-2 lg:row-span-2">
            <ProjectCard project={sawt} className="h-full min-h-[420px]" />
          </FadeIn>

          {/* WorkForce AI — tall spans 1 col × 2 rows on lg */}
          <FadeIn delay={0.05} className="lg:row-span-2">
            <ProjectCard project={work} className="h-full min-h-[420px]" />
          </FadeIn>

          {/* Bottom row — three default cards fill the 3-col grid */}
          <FadeIn delay={0.1}>
            <ProjectCard project={omni} className="h-full" />
          </FadeIn>

          <FadeIn delay={0.15}>
            <ProjectCard project={lead} className="h-full" />
          </FadeIn>

          <FadeIn delay={0.2}>
            <ProjectCard project={siyanah} className="h-full" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
