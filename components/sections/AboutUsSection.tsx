"use client"

import { SectionWrapper } from "@/components/SectionWrapper"
import Image from "next/image"

export function AboutUsSection() {
  return (
    <SectionWrapper id="o-nas">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-balance text-foreground sm:text-4xl">
            Łączymy tradycję z nowoczesną technologią
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Gami-Pack to polska firma z ponad 15-letnim doświadczeniem w branży
            opakowań kartonowych. Lata pracy na rynku pozwalają nam spełniać
            oczekiwania klientów i realizować nawet najbardziej wymagające
            zamówienia.
          </p>
          <p className="mt-4 text-lg leading-relaxed font-medium text-muted-foreground italic">
            W naszej ofercie znajdują się opakowania z nadrukiem Flexo, Offset,
            Cyfrowym. Wykonujemy opakowania z tektury 3, 4, 5, 7 warstwowej.{" "}
            <br />
          </p>
        </div>

        <div className="relative aspect-4/3 overflow-hidden rounded-xl">
          <Image
            src={"/assets/img/realizacje.jpg"}
            alt="Zakład produkcyjny Gami-Pack"
            sizes="(min-width: 1024px) 560px, 100vw"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
    </SectionWrapper>
  )
}
