import { cn } from "cn"
import React from "react"

type Props = React.HTMLProps<HTMLElement> & {
  id: string
}

export function SectionWrapper({ id, className, children, ...props }: Props) {
  return (
    <section
      id={id}
      className={cn(className, "scroll-mt-16 py-24 even:bg-card")}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}
