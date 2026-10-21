"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loadVideo, setLoadVideo] = useState(false)
  const [playing, setPlaying] = useState(false)

  //Dont load video for users with reduced motion prefernce
  useEffect(() => {
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) return
    const enable = () => setLoadVideo(true)
    if (document.readyState === "complete") enable()
    else {
      window.addEventListener("load", enable, { once: true })
      return () => window.removeEventListener("load", enable)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!loadVideo || !video) return
    video.load()
    video.play().catch(() => setPlaying(false))
  }, [loadVideo])

  return (
    <section className="relative flex min-h-screen items-center">
      <Image
        src={"/assets/img/realizacje.jpg"}
        alt="background-fallback"
        sizes="100vw"
        fill
        priority
        draggable={false}
        className="object-cover select-none"
      />

      <video
        id="hero-video"
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 select-none data-[playing=true]:opacity-100 motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        tabIndex={-1}
        data-playing={playing}
        disablePictureInPicture
        onPlaying={() => setPlaying(true)}
        ref={videoRef}
      >
        {loadVideo && (
          <>
            <source src="/assets/video/hero.webm" type="video/webm" />
            <source src="/assets/video/hero.mp4" type="video/mp4" />
          </>
        )}
      </video>

      {/* Background dimming overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/45 to-black/65"></div>

      <div className="relative z-10 mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-5xl leading-tight font-bold tracking-tight text-balance text-white/95 sm:text-6xl lg:text-7xl">
          Producent opakowań z&nbsp;tektury falistej
        </h1>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <Button
            size="lg"
            className="w-full sm:w-auto"
            nativeButton={false}
            render={<Link href="#produkty" />}
          >
            Zobacz produkty <ArrowRight />
          </Button>

          <Button
            size="lg"
            variant="secondary"
            className="w-full sm:w-auto"
            nativeButton={false}
            render={<Link href="#kontakt" />}
          >
            Skontaktuj się
          </Button>
        </div>
      </div>
    </section>
  )
}
