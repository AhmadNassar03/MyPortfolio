import { sortedSkills } from "@/content/cv";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechPill } from "./TechPill";
import { FadeIn } from "@/components/motion/FadeIn";

export function SkillsMatrix() {
  return (
    <section id="skills" className="section">
      <div className="container-max">
        <SectionHeader
          index="02"
          eyebrow="Skills"
          title={
            <>
              The <em className="font-display italic aurora-text">stack</em>{" "}
              I ship with.
            </>
          }
          description="AI-first by design. Backend & full-stack fundamentals are the foundation underneath."
        />

        <div className="grid gap-3 lg:grid-cols-2">
          {sortedSkills.map((group, i) => {
            const isFeatured = group.category === "AI / LLM";
            return (
              <FadeIn
                key={group.category}
                delay={0.04 * i}
                className={isFeatured ? "lg:col-span-2" : ""}
              >
                <div className="glass p-6 rounded-2xl h-full">
                  <div className="mb-4 flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl text-[var(--text-primary)] md:text-2xl">
                      {group.category}
                    </h3>
                    {isFeatured && (
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)]">
                        // primary focus
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <TechPill key={item} featured={isFeatured}>
                        {item}
                      </TechPill>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
