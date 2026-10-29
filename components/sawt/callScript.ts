/**
 * Scripted demo call for the Sawt simulator — a clinic booking, written
 * once per dialect. The English gloss is shared across dialects.
 */

export type Dialect = "levantine" | "khaleeji" | "egyptian" | "msa";

export type CallEvent =
  | { kind: "caller" | "agent"; ar: string; en: string; ms: number }
  | { kind: "tool"; name: string; args: string; result: string; ms: number };

export const dialects: { id: Dialect; label: string; native: string }[] = [
  { id: "levantine", label: "Levantine", native: "شامي" },
  { id: "khaleeji", label: "Khaleeji", native: "خليجي" },
  { id: "egyptian", label: "Egyptian", native: "مصري" },
  { id: "msa", label: "MSA", native: "فصحى" },
];

const en = {
  ask: "Hi, I'd like to book an appointment with the doctor tomorrow morning.",
  offer: "Welcome! I have a slot at 10:30 — does that work for you?",
  confirm: "Perfect, book it for me please.",
  done: "You're booked. A confirmation is on its way on WhatsApp.",
};

const lines: Record<Dialect, [string, string, string, string]> = {
  levantine: [
    "مرحبا، بدي احجز موعد عند الدكتور بكرا الصبح.",
    "أهلين! في عندي موعد الساعة عشرة ونص، بيناسبك؟",
    "تمام، احجزلي ياه لو سمحت.",
    "تم الحجز. رح يوصلك تأكيد عالواتساب.",
  ],
  khaleeji: [
    "السلام عليكم، أبي أحجز موعد عند الدكتور باكر الصبح.",
    "وعليكم السلام! عندي موعد الساعة عشر ونص، يناسبك؟",
    "زين، احجزه لي الله يعافيك.",
    "تم الحجز، وبيوصلك تأكيد على الواتساب.",
  ],
  egyptian: [
    "ألو، عايز أحجز ميعاد عند الدكتور بكرة الصبح.",
    "أهلاً بيك! فيه ميعاد الساعة عشرة ونص، يناسبك؟",
    "تمام، احجزهولي لو سمحت.",
    "اتحجز خلاص، وهيوصلك تأكيد على الواتساب.",
  ],
  msa: [
    "مرحباً، أريد حجز موعد مع الطبيب صباح الغد.",
    "أهلاً بك! يتوفر موعد في الساعة العاشرة والنصف، هل يناسبك؟",
    "نعم، احجزه لي من فضلك.",
    "تم الحجز، وستصلك رسالة تأكيد عبر واتساب.",
  ],
};

export function callScript(d: Dialect): CallEvent[] {
  const [ask, offer, confirm, done] = lines[d];
  return [
    { kind: "caller", ar: ask, en: en.ask, ms: 2200 },
    {
      kind: "tool",
      name: "check_availability",
      args: `{ day: "tomorrow", period: "morning" }`,
      result: `["10:30", "11:15"]`,
      ms: 900,
    },
    { kind: "agent", ar: offer, en: en.offer, ms: 2400 },
    { kind: "caller", ar: confirm, en: en.confirm, ms: 1600 },
    {
      kind: "tool",
      name: "book_appointment",
      args: `{ slot: "10:30", doctor: "general" }`,
      result: `{ status: "confirmed" }`,
      ms: 800,
    },
    {
      kind: "tool",
      name: "send_whatsapp",
      args: `{ template: "booking_confirmed" }`,
      result: `{ delivered: true }`,
      ms: 700,
    },
    { kind: "agent", ar: done, en: en.done, ms: 2200 },
  ];
}
