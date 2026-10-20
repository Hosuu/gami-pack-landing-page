"use client"

import { SectionWrapper } from "@/components/SectionWrapper"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "cn"
import Image from "next/image"
import { useEffect, useState } from "react"

type Product = {
  id: string
  label: string
  imageUrl: string
  description: string
}

const PRODUCTS: Product[] = [
  {
    id: "01",
    label: "01 - Rolki i arkusze",
    imageUrl: "/assets/img/gp01.jpg",
    description:
      "Rolki z tektury jedno lub dwuwarstwowej. Arkusze tekturowe służące do przekładania towaru.",
  },
  {
    id: "02",
    label: "02 - Pudełka klapowe",
    imageUrl: "/assets/img/gp02.jpg",
    description:
      "Pudełka klapowe są zrobione z jednej części. Najczęściej klejone, mogą też być zszyte lub wzmocnione taśmą klejącą.",
  },
  {
    id: "03",
    label: "03 - Pudełka teleskopowe",
    imageUrl: "/assets/img/gp03.jpg",
    description:
      "Pudełka składające się z więcej niż jednej części. Najczęściej wieko i spód które zachodzą na siebie.",
  },
  {
    id: "04",
    label: "04 - Pudełka składane i tace",
    imageUrl: "/assets/img/gp04.jpg",
    description:
      "Pudełka składające się z jednej części. Po złożeniu tworzą dwie lub większą ilość ścian. Często spotykane z uchwytami lub okienkami.",
  },
  {
    id: "05",
    label: "05 - Pudełka wsuwane",
    imageUrl: "/assets/img/gp05.jpg",
    description:
      "Pudełka składające się z większej ilości elementów. Obwoluty często służące jako komplet do innych pudeł.",
  },
  {
    id: "06",
    label: "06 - Pudełka trwale łączone",
    imageUrl: "/assets/img/gp06.jpg",
    description:
      "Pudełka składające się z kilku elementów, które są ze sobą zszywane/sklejane przed użyciem.",
  },
  {
    id: "07",
    label: "07 - Pudełka klejone jednoczęściowe",
    imageUrl: "/assets/img/gp07.jpg",
    description:
      "Pudełka składające się z jednej części, dostarczane w wersji złożonej. Gotowe do użycia po ich prostym rozłożeniu.",
  },
  {
    id: "08",
    label: "08 - Pudełka e-commerce z paskiem klejowym",
    imageUrl: "/assets/img/gp08.jpg",
    description:
      "Pudełka e-commerce przyśpieszają proces pakowania. Pasek klejowy zapewnia szybkie zapakowanie produktu.",
  },
  {
    id: "09",
    label: "09 - Wypełnienia",
    imageUrl: "/assets/img/gp09.jpg",
    description:
      "Wypełnienia umożliwiają bezpieczny transport towaru pomagając w jego zabezpieczeniu oraz unieruchomieniu.",
  },
]

const ROTATE_MS = 2000

export function ProductsSection() {
  const [activeId, setActiveId] = useState(PRODUCTS[0].id)
  const [autoRotate, setAutoRotate] = useState(true)

  useEffect(() => {
    if (!autoRotate) return

    const timeout = setTimeout(() => {
      const index = PRODUCTS.findIndex((p) => p.id === activeId)
      setActiveId(PRODUCTS[(index + 1) % PRODUCTS.length].id)
    }, ROTATE_MS)

    return () => clearTimeout(timeout)
  }, [autoRotate, activeId])

  const handleValueChange = (value: unknown[]) => {
    const next = value[0]
    if (typeof next !== "string") return
    setAutoRotate(false)
    setActiveId(next)
  }

  return (
    <SectionWrapper id="produkty">
      <div className="mx-auto mb-4 max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-balance text-foreground sm:text-4xl">
          Nasza oferta produktowa
        </h2>
        <p className="mt-4 text-lg text-pretty text-muted-foreground">
          Szeroki wybór rozwiązań opakowaniowych dla każdej branży
        </p>
      </div>

      <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
        <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-[#fe5d1c]">
          {PRODUCTS.map((product, i) => (
            <Image
              key={product.id}
              src={product.imageUrl}
              alt={product.id === activeId ? product.label : ""}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 560px, 100vw"
              className={cn(
                `object-cover transition-all duration-500`,
                product.id === activeId ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
        </div>

        <Accordion value={[activeId]} onValueChange={handleValueChange}>
          {PRODUCTS.map(({ id, label, description }) => (
            <AccordionItem value={id} key={id}>
              <AccordionTrigger className="aria-expanded:font-bold aria-expanded:text-primary">
                {label}
              </AccordionTrigger>
              {/* min-h-14 to prevent section resizing when where is one or two lines of description text */}
              <AccordionContent className={"min-h-14"}>
                {description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionWrapper>
  )
}
