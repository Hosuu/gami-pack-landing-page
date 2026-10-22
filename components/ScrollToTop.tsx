"use client"

import { Button } from "@/components/ui/button"
import { cn } from "cn"
import { ChevronUp } from "lucide-react"
import { useEffect, useState } from "react"

type Props = {
  showTreshold?: number
}

export function ScrollToTop({ showTreshold = 64 }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showTreshold)
    onScroll()

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [showTreshold])

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
  }

  return (
    <Button
      type="button"
      size="icon-lg"
      onClick={scrollToTop}
      aria-label="Przewiń do góry"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed right-5 bottom-5 z-40 size-11 lg:right-8 lg:bottom-8",
        "border border-secondary",
        `transition-opacity duration-300 ease-out`,
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      <ChevronUp className="size-6" />
    </Button>
  )
}
