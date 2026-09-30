import { WA_LINK } from "@/lib/catalog";
import { WhatsAppIcon } from "./icons";

export function FloatingWa() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-wa text-wa-ink shadow-[var(--shadow-float)] md:bottom-7 md:right-7"
      aria-label="Chat WhatsApp Moova"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
