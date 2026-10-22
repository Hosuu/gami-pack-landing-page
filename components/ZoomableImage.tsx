"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { Minus, Plus, RotateCcw, X } from "lucide-react"
import Image from "next-image-export-optimizer"
import { useRef, useState } from "react"
import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from "react-zoom-pan-pinch"

type Props = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

const controlBtn = "rounded-full text-white hover:bg-white/15 hover:text-white"

function ZoomControls({ onClose }: { onClose: () => void }) {
  const { zoomIn, zoomOut, resetTransform } = useControls()

  return (
    <div
      data-zoom-controls
      className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/70 p-1 backdrop-blur"
    >
      <Button
        type="button"
        size="icon"
        variant="ghost"
        aria-label="Pomniejsz"
        className={controlBtn}
        onClick={() => zoomOut()}
      >
        <Minus className="size-5" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        aria-label="Resetuj powiększenie"
        className={controlBtn}
        onClick={() => resetTransform()}
      >
        <RotateCcw className="size-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        aria-label="Powiększ"
        className={controlBtn}
        onClick={() => zoomIn()}
      >
        <Plus className="size-5" />
      </Button>

      <span aria-hidden="true" className="mx-1 h-5 w-px bg-white/30" />

      <Button
        type="button"
        size="icon"
        variant="ghost"
        aria-label="Zamknij"
        className={controlBtn}
        onClick={onClose}
      >
        <X className="size-5" />
      </Button>
    </div>
  )
}

export function ZoomableImage({ src, alt, width, height, className }: Props) {
  const [open, setOpen] = useState(false)
  const downPos = useRef<{ x: number; y: number } | null>(null)

  const handleBackdropClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (
      target.closest("[data-zoom-controls]") ||
      target.firstElementChild?.tagName === "IMG"
    )
      return

    console.log(target.firstElementChild?.tagName)

    const start = downPos.current
    if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > 6)
      return

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        aria-label={`Powiększ: ${alt}`}
        className={cn(
          "group relative cursor-zoom-in overflow-hidden rounded-lg border border-border bg-card shadow-lg transition-shadow hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
          className
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
          sizes="384px"
        />
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="touch-none bg-black/90 supports-backdrop-filter:backdrop-blur-none" />

        <DialogPrimitive.Popup className="fixed inset-0 z-50 touch-none outline-none">
          <DialogTitle className="sr-only">{alt}</DialogTitle>

          <div
            className="h-full w-full"
            onPointerDown={(e) =>
              (downPos.current = { x: e.clientX, y: e.clientY })
            }
            onClick={handleBackdropClick}
          >
            <TransformWrapper
              initialScale={1}
              minScale={1}
              maxScale={5}
              centerOnInit
              centerZoomedOut
              limitToBounds
              doubleClick={{ mode: "toggle", step: 2.5 }}
            >
              <ZoomControls onClose={() => setOpen(false)} />

              <TransformComponent
                wrapperStyle={{ width: "100vw", height: "100svh" }}
              >
                <Image
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  unoptimized
                  placeholder="empty"
                  draggable={false}
                  className="h-auto max-h-svh w-auto max-w-[100vw] select-none"
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  )
}
