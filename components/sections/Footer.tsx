import { NAV_LINKS } from "@/components/sections/Header"
import Link from "next/link"

const CONTACTS = [
  { label: "Biuro", email: "biuro@gami-pack.pl", tel: "+48 666 053 734" },
  {
    label: "Dział handlowy",
    email: "biuro@gami-pack.pl",
    tel: "+48 666 051 009",
  },
  { label: "Magazyn", email: "magazyn@gami-pack.pl", tel: "+48 664 451 890" },
  { label: "Faktury", email: "e-faktury@gami-pack.pl", tel: "+48 666 053 734" },
]

// "+48 666 053 734" -> "+48666053734"
const telHref = (tel: string) => `tel:${tel.replace(/\s/g, "")}`

const headingClass = "mb-4 text-lg font-bold"
const linkClass =
  "rounded-sm transition-colors hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"

export function Footer() {
  return (
    <footer className="bg-footer text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_2fr] lg:gap-12">
          {/* Dane firmowe */}
          <div>
            <h2 className={headingClass}>Dane firmowe</h2>
            <address className="space-y-1 text-sm not-italic">
              <p className="text-base font-semibold text-balance">
                GAMI-PACK D. STACH SPÓŁKA KOMANDYTOWA
              </p>
              <p className="pb-3 text-primary-foreground/70 italic">
                dawniej P.P.H.U. GAMI PACK S.C. I. STACH, D. STACH
              </p>
              <p>ul. Tadeusza Kościuszki 2</p>
              <p>41-253 Czeladź</p>
              <p className="pt-3">NIP: 6252353072</p>
              <p>KRS: 0001234120</p>
            </address>
          </div>

          {/* Nawigacja */}
          <nav aria-label="Stopka">
            <h2 className={headingClass}>Firma</h2>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`inline-block text-primary-foreground/80 ${linkClass}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={"/assets/OWD-PL-2026.pdf"}
                  className={`inline-block text-primary-foreground/80 ${linkClass}`}
                >
                  OWD
                </Link>
              </li>
            </ul>
          </nav>

          {/* Kontakt */}
          <div className="md:col-span-2 lg:col-span-1">
            <h2 className={headingClass}>Dane kontaktowe</h2>
            <ul className="grid gap-6 text-sm sm:grid-cols-2">
              {CONTACTS.map((c) => (
                <li key={c.label}>
                  <p className="mb-1 font-semibold">{c.label}</p>
                  <dl className="space-y-0.5">
                    <div className="flex gap-2">
                      <dt className="text-primary-foreground/70">tel:</dt>
                      <dd>
                        <a
                          href={telHref(c.tel)}
                          className={`whitespace-nowrap ${linkClass}`}
                        >
                          {c.tel}
                        </a>
                      </dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-primary-foreground/70">email:</dt>
                      <dd className="min-w-0">
                        <a
                          href={`mailto:${c.email}`}
                          className={`break-all ${linkClass}`}
                        >
                          {c.email}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dolny pasek */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/20 pt-8 text-sm sm:flex-row">
          <p className="text-primary-foreground/80">
            © {new Date().getFullYear()} Gami-Pack. Wszelkie prawa zastrzeżone.
          </p>
          {/* <Link
            href="/polityka-prywatnosci"
            className={`text-primary-foreground/80 underline-offset-4 hover:underline ${linkClass}`}
          >
            Polityka prywatności
          </Link> */}
        </div>
      </div>
    </footer>
  )
}
