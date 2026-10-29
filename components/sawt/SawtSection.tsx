import { SectionHeader } from "@/components/ui/SectionHeader";
import { SawtShowcase } from "./SawtShowcase";

export function SawtSection() {
  return (
    <section id="sawt" className="section">
      <div className="container-max">
        <SectionHeader
          index="01"
          eyebrow="Flagship · Sawt صوت"
          title={
            <>
              An AI that{" "}
              <em className="font-display italic aurora-text">
                picks up the phone
              </em>
              <br />— in your dialect.
            </>
          }
          description="Sawt runs real phone calls for clinics, restaurants and real-estate teams across the Gulf and Levant. Switch dialects, flip the voice engine, and watch each stage of the live pipeline fire as the call plays."
        />
        <SawtShowcase />
      </div>
    </section>
  );
}
