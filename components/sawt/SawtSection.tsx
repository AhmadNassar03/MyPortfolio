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
              An AI receptionist that{" "}
              <em className="font-display italic aurora-text">
                never misses
              </em>
              <br />a customer — in their dialect.
            </>
          }
          description="Sawt answers a business's calls and chats — website, WhatsApp, Instagram, Messenger and phone — in the customer's own dialect. Switch dialects, flip between a phone call and a WhatsApp chat, and watch each stage fire as the conversation plays."
        />
        <SawtShowcase />
      </div>
    </section>
  );
}
