"use client"

import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Image from "next-image-export-optimizer"
import Link from "next/link"
import { useState } from "react"

export const NAV_LINKS = [
  { href: "#o-nas", label: "O nas" },
  { href: "#dlaczego-my", label: "Dlaczego my?" },
  { href: "#produkty", label: "Produkty" },
  { href: "#certyfikat", label: "Certyfikat" },
  { href: "#kontakt", label: "Kontakt" },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-card/85 backdrop-blur-sm select-none">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 lg:gap-6 lg:px-8">
        <Link href="#" className="shrink-0">
          <Image
            src="/assets/img/Gami-Pack_Logo_Full.svg"
            alt="Logo"
            width={210}
            height={40}
            priority
            draggable={false}
            className="h-8 w-auto lg:h-10 dark:hidden"
          />
          <Image
            src="/assets/img/Gami-Pack_Logo_Full_Light.svg"
            alt="Logo"
            width={210}
            height={40}
            priority
            draggable={false}
            className="hidden h-8 w-auto lg:h-10 dark:block"
          />
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-4">
          <ThemeToggle />

          <Button
            render={<Link href="#kontakt" />}
            nativeButton={false}
            className="hidden lg:inline-flex"
          >
            Zapytaj o ofertę
          </Button>

          {/* Moblie menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Otwórz menu"
                  className="text-primary lg:hidden"
                />
              }
            >
              <Menu className="size-6" />
            </SheetTrigger>

            <SheetContent side="right" showCloseButton={false}>
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Nawigacja po sekcjach strony
              </SheetDescription>

              <nav aria-label="Menu mobilne" className="mt-14 px-6">
                <ul className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-md px-3 py-3 text-lg font-medium"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <Button
                  render={
                    <Link href="#kontakt" onClick={() => setOpen(false)} />
                  }
                  nativeButton={false}
                  size="lg"
                  className="mt-8 w-full"
                >
                  Zapytaj o ofertę
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
