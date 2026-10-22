"use client"

import { SectionWrapper } from "@/components/SectionWrapper"
import Image from "next-image-export-optimizer"

export function AboutUsSection() {
  return (
    <SectionWrapper id="o-nas">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl leading-snug font-bold text-balance text-foreground sm:text-4xl">
            Łączymy tradycję z&nbsp;nowoczesną technologią
          </h2>
          <p className="mt-6 leading-relaxed text-balance text-muted-foreground">
            Gami-Pack to polska firma z 20-letnim doświadczeniem w&nbsp;branży
            opakowań kartonowych. Lata pracy na rynku pozwalają nam spełniać
            oczekiwania klientów i&nbsp;realizować nawet najbardziej wymagające
            zamówienia.
          </p>
          <p className="mt-4 text-lg leading-relaxed font-medium text-balance text-muted-foreground italic">
            Tworzymy innowacyjne rozwiązania opakowaniowe, łącząc tradycję
            z&nbsp;nowoczesnością. W&nbsp;naszej ofercie znajdują się opakowania
            z&nbsp;nadrukiem Flexo, Offset, Cyfrowym. Wykonujemy opakowania
            z&nbsp;tektury falistej i&nbsp;litej.
            <br />
          </p>
        </div>

        <div className="relative aspect-4/3 overflow-hidden rounded-xl select-none">
          <Image
            src={"/assets/img/realizacje.jpg"}
            alt="Zakład produkcyjny Gami-Pack"
            fill
            sizes="(min-width: 1024px) 584px, calc(100vw-24px)"
            draggable={false}
            className="object-cover"
          />
        </div>
      </div>
    </SectionWrapper>
  )
}
