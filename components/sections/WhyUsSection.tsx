import { SectionWrapper } from "@/components/SectionWrapper"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Award, Leaf, Settings, Truck, type LucideIcon } from "lucide-react"

type Reason = {
  icon: LucideIcon
  title: string
  description: string
}

const REASONS: Reason[] = [
  {
    icon: Leaf,
    title: "Ekologiczne materiały",
    description:
      "Używamy wyłącznie materiałów przyjaznych środowisku, w 100% nadających się do recyklingu.",
  },
  {
    icon: Award,
    title: "Najwyższa jakość",
    description:
      "Certyfikowane procesy produkcyjne gwarantują niezmiennie wysoką jakość naszych produktów.",
  },
  {
    icon: Settings,
    title: "Personalizacja",
    description:
      "Projektujemy opakowania na zamówienie, dopasowane do indywidualnych potrzeb klienta.",
  },
  {
    icon: Truck,
    title: "Dostawy",
    description:
      "Własny magazyn oraz flota pojazdów pozwalają nam na utrzymanie stanów i szybkie dostawy.",
  },
]

export function WhyUsSection() {
  return (
    <SectionWrapper id="dlaczego-my" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-balance text-foreground sm:text-4xl">
            Dlaczego warto wybrać Gami-Pack?
          </h2>
          <p className="mt-4 text-lg text-pretty text-muted-foreground">
            Łączymy innowacyjność, jakość i zrównoważony rozwój
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((feature, i) => (
            <li key={feature.title} className="flex">
              <Card className="relative w-full gap-2 overflow-hidden transition-shadow hover:shadow-lg">
                <span className="pointer-events-none absolute top-3 right-4 text-6xl font-bold text-foreground/5 select-none">
                  {i + 1}
                </span>

                <CardHeader>
                  <div className="mb-2 flex size-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <feature.icon className="size-6" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  )
}
