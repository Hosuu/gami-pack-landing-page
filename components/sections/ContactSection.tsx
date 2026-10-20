import ContactForm from "@/components/ContactForm"
import { SectionWrapper } from "@/components/SectionWrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react"

type ContactItem = {
  icon: LucideIcon
  label: string
  value: string
  href: string
  action?: string
  external?: boolean
}

const CONTACT_ITEMS: ContactItem[] = [
  {
    icon: Phone,
    label: "Telefon",
    value: "666 053 734",
    href: "tel:+48666053734",
  },
  {
    icon: Mail,
    label: "Email",
    value: "biuro@gami-pack.pl",
    href: "mailto:biuro@gami-pack.pl",
  },
  {
    icon: MapPin,
    label: "Adres",
    value: "ul. Tadeusza Kościuszki 2, 41-253 Czeladź",
    href: "https://maps.app.goo.gl/4XiGABXZwgrWJZXe6",
    action: "Sprawdź na Google Maps",
    external: true,
  },
]

export function ContactSection() {
  return (
    <SectionWrapper id="kontakt">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-balance text-foreground sm:text-4xl">
          Porozmawiajmy o Twoim projekcie
        </h2>
        <p className="mt-4 text-lg text-pretty text-muted-foreground">
          Skontaktuj się z nami, aby omówić szczegóły współpracy
        </p>
      </div>

      <div className="grid items-stretch gap-12 lg:grid-cols-2">
        <div>
          <h3 className="mb-6 text-xl font-semibold text-foreground">
            Dane kontaktowe
          </h3>

          <ul className="space-y-4">
            {CONTACT_ITEMS.map((item) => (
              <li key={item.label}>
                <Card className="group relative bg-accent py-4 transition-shadow focus-within:ring-2 focus-within:ring-primary hover:shadow-md">
                  <CardContent className="flex flex-row items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <item.icon className="size-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      <a
                        href={item.href}
                        {...(item.external && {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        })}
                        className="font-medium wrap-break-word text-foreground outline-none after:absolute after:inset-0 after:content-['']"
                      >
                        {item.value}
                      </a>
                      {item.action && (
                        <p className="text-sm font-medium text-primary group-hover:underline">
                          {item.action}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>

          <Card className="mt-8 border-none bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="size-4" aria-hidden="true" />
                Godziny pracy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid w-fit grid-cols-[auto_auto] gap-x-4 gap-y-1 text-sm">
                <dt>Poniedziałek - Piątek:</dt>
                <dd>7:00 - 15:00</dd>
                <dt>Sobota - Niedziela:</dt>
                <dd>Zamknięte</dd>
              </dl>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col">
          <h3 className="mb-6 text-xl font-semibold text-foreground">
            Wyślij zapytanie
          </h3>
          <Card className="flex-1 bg-accent">
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionWrapper>
  )
}
