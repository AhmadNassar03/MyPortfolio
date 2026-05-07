import { projects } from "@/content/cv";
import { ProjectCard } from "./ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";

export function FeaturedBento() {
  // Order: feature → wide → tall → default
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
          {/* OmniAgent — feature card spans 2 cols × 2 rows on lg */}
          <FadeIn className="md:col-span-2 lg:row-span-2">
            <ProjectCard project={omni} className="h-full min-h-[420px]" />
          </FadeIn>

          {/* WorkForce AI — tall spans 1 col × 2 rows on lg */}
          <FadeIn delay={0.05} className="lg:row-span-2">
            <ProjectCard project={work} className="h-full min-h-[420px]" />
          </FadeIn>

          {/* LeadGrade — wide spans 2 cols on md+ */}
          <FadeIn delay={0.1} className="md:col-span-2">
            <ProjectCard project={lead} className="h-full" />
          </FadeIn>

          {/* SiyanahJo — default 1 col */}
          <FadeIn delay={0.15}>
            <ProjectCard project={siyanah} className="h-full" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
