import type { Project } from "@/content/cv";

export const statusColor: Record<Project["status"], string> = {
  live: "bg-[oklch(72%_0.18_145)]",
  building: "bg-[oklch(75%_0.16_200)]",
  private: "bg-[oklch(75%_0.16_75)]",
  archived: "bg-[oklch(60%_0.02_280)]",
};

export const statusLabel: Record<Project["status"], string> = {
  live: "live",
  building: "in build",
  private: "private",
  archived: "archived",
};
