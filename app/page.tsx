"use client"

import { ScrollToTop } from "@/components/ScrollToTop"
import { AboutUsSection } from "@/components/sections/AboutUsSection"
import { CertSection } from "@/components/sections/CertSection"
import { ContactSection } from "@/components/sections/ContactSection"
import { Footer } from "@/components/sections/Footer"
import { Header } from "@/components/sections/Header"
import { HeroSection } from "@/components/sections/HeroSection"
import { ProductsSection } from "@/components/sections/ProductsSection"
import { WhyUsSection } from "@/components/sections/WhyUsSection"

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutUsSection />
        <WhyUsSection />
        <ProductsSection />
        <CertSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop showTreshold={600} />
    </>
  )
}
