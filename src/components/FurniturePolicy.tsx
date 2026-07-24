import { furniturePolicy } from "@/lib/services";

export default function FurniturePolicy() {
  return (
    <p className="rounded-[16px] border border-sage/30 bg-sage/8 p-5 text-[15px] leading-relaxed text-ink-soft">
      <span className="label mr-2 text-sage-deep">Furniture policy</span>
      {furniturePolicy}
    </p>
  );
}
