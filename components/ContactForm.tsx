"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2, Send } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? ""

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Imię i nazwisko musi mieć co najmniej 2 znaki."),
  email: z.email("Proszę podać prawidłowy adres email."),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?[\d\s-]{9,15})?$/, "Podaj prawidłowy numer telefonu.")
    .optional(),
  message: z
    .string()
    .trim()
    .min(10, "Wiadomość musi mieć co najmniej 10 znaków."),
  terms: z.literal(true, { error: "Musisz zaakceptować regulamin." }),

  // honeypot
  website: z.string().max(0).optional(),
})

type FormValues = z.input<typeof formSchema>

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", message: "", website: "" },
  })

  async function onSubmit(values: FormValues) {
    setStatus("idle")

    if (values.website) return setStatus("success")

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { website, terms, ...payload } = values
      const res = await fetch(ENDPOINT, {
        method: "POST",
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      setStatus("success")
      reset()
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-1 flex-col items-center justify-center gap-3 py-10 text-center"
      >
        <CheckCircle2 className="size-10 text-primary" aria-hidden="true" />
        <p className="text-lg font-semibold text-foreground">
          Dziękujemy za wiadomość!
        </p>
        <p className="text-sm text-muted-foreground">
          Skontaktujemy się z Tobą wkrótce.
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Wyślij kolejną
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-1 flex-col gap-4"
    >
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">Imię i nazwisko</FieldLabel>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Jan Kowalski"
            className="text-base md:text-sm"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          <FieldError>{errors.name?.message}</FieldError>
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Adres email</FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="jan@firma.pl"
            className="text-base md:text-sm"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          <FieldError>{errors.email?.message}</FieldError>
        </Field>

        <Field data-invalid={!!errors.phone}>
          <FieldLabel htmlFor="phone">Telefon</FieldLabel>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+48 123 456 789"
            className="text-base md:text-sm"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          <FieldDescription>Opcjonalne</FieldDescription>
          <FieldError>{errors.phone?.message}</FieldError>
        </Field>

        <Field data-invalid={!!errors.message} className="flex flex-1 flex-col">
          <FieldLabel htmlFor="message">Wiadomość</FieldLabel>
          <Textarea
            id="message"
            placeholder="Opisz swoje potrzeby..."
            className="min-h-28 flex-1 resize-none text-base md:text-sm"
            aria-invalid={!!errors.message}
            {...register("message")}
          />
          <FieldError>{errors.message?.message}</FieldError>
        </Field>

        {/* Honeypot */}
        <div
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
        >
          <label htmlFor="website">Nie wypełniaj tego pola</label>
          <input
            id="website"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>

        <Controller
          name="terms"
          control={control}
          render={({ field }) => (
            <Field orientation="horizontal" data-invalid={!!errors.terms}>
              <Checkbox
                id="terms"
                name={field.name}
                ref={field.ref}
                checked={field.value === true}
                onCheckedChange={(checked) => field.onChange(checked)}
                onBlur={field.onBlur}
                aria-invalid={!!errors.terms}
              />
              <div className="flex flex-col gap-1">
                <div className="text-sm leading-snug">
                  <FieldLabel htmlFor="terms" className="inline font-normal">
                    Akceptuję{" "}
                  </FieldLabel>
                  <Dialog>
                    <DialogTrigger className="cursor-pointer text-primary underline-offset-4 hover:underline">
                      regulamin i politykę prywatności
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Regulamin</DialogTitle>
                        <DialogDescription className="text-justify">
                          Wyrażam zgodę na przetwarzanie danych osobowych
                          zgodnie z ustawą o&nbsp;ochronie danych osobowych w
                          związku z wysłaniem zapytania przez formularz
                          kontaktowy. Podanie danych jest dobrowolne, ale
                          niezbędne do przetworzenia zapytania. Zostałem
                          poinformowany, że przysługuje mi prawo dostępu do
                          swoich danych, możliwości ich poprawiania, żądania
                          zaprzestania ich przetwarzania przez wysłanie
                          wiadomości e-mail na adres biuro@gami-pack.pl.
                          <br />
                          <br />
                          Administratorem danych osobowych jest GAMI-PACK D.
                          STACH SPÓŁKA KOMANDYTOWA (dawniej: P.P.H.U. GAMI PACK
                          S.C. I. STACH, D. STACH) ul. Poniatowskiego 2, 41-253
                          Czeladź.
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
                <FieldError>{errors.terms?.message}</FieldError>
              </div>
            </Field>
          )}
        />
      </FieldGroup>

      {status === "error" && (
        <p role="alert" className="text-sm text-destructive">
          Nie udało się wysłać wiadomości. <br />
          Spróbuj ponownie lub napisz na biuro@gami-pack.pl.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
        <Send className="ml-2 size-4" aria-hidden="true" />
      </Button>
    </form>
  )
}
