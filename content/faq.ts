import type { FAQDataset } from "@/lib/types";

/**
 * Separate FAQ datasets for cleaning / organizing / general (brief section
 * 24). Empty until real, verified answers are written — do not fabricate
 * answers about pricing, guarantees, process, etc.
 */
export const FAQ_DATASETS: FAQDataset[] = [
  { id: "general", label: "General", items: [] },
  { id: "cleaning", label: "Cleaning", items: [] },
  { id: "organizing", label: "Home Organization", items: [] },
];

export function getFAQItems(id: FAQDataset["id"]) {
  return FAQ_DATASETS.find((set) => set.id === id)?.items ?? [];
}

export function getAllFAQItems() {
  return FAQ_DATASETS.flatMap((set) => set.items);
}
