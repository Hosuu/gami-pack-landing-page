import { SectionWrapper } from "@/components/SectionWrapper"
import { Button } from "@/components/ui/button"
import { ZoomableImage } from "@/components/ZoomableImage"
import { Download } from "lucide-react"

export function CertSection() {
  return (
    <SectionWrapper id="certyfikat">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-balance text-foreground sm:text-4xl">
            Certyfikat FSC®
          </h2>
          <p className="mt-6 leading-relaxed text-pretty text-muted-foreground">
            Certyfikat FSC® oznacza, że korzystamy z materiałów pochodzących z
            odpowiedzialnych źródeł, dbając o środowisko, ludzi i przyszłe
            pokolenia.
          </p>

          <Button
            render={
              <a
                href="/assets/cert/2026_01_GAMI-PACK_FSC_Certyfikat_PL.EN.pdf"
                download
              />
            }
            nativeButton={false}
            variant="outline"
            className="mt-8"
          >
            <Download className="size-4" aria-hidden="true" />
            Pobierz certyfikat (PDF)
          </Button>
        </div>

        <div className="flex justify-center select-none">
          <ZoomableImage
            src="/assets/cert/FSC_CERT_RENDER.webp"
            alt="Certyfikat FSC"
            width={1606}
            height={2337}
            className="w-full max-w-sm"
          />
        </div>
      </div>
    </SectionWrapper>
  )
}
