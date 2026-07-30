import { useState } from 'react'
import Section, { Reveal } from '../components/Section'
import { GlowingCard } from '../components/ui/glowing-card'
import { LiquidButton } from '../components/ui/liquid-glass-button'
import { PROFILE } from '../data/portfolio'
import {
  DownloadIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  PinIcon,
} from '../components/icons'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  /**
   * No backend is wired up, so submitting opens the visitor's mail client
   * with the message prefilled. Swap this for a real endpoint (Formspree,
   * Resend, a serverless function) when one is available.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Portfolio contact — ${form.name}`)
    const body = encodeURIComponent(
      `Nama: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    )
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
  }

  const field =
    'w-full rounded-2xl border border-ink/12 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-accent'

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Mari terhubung."
      subtitle="Terbuka untuk peluang sebagai Software Engineer atau AI Engineer, kolaborasi project, dan diskusi teknis."
      tone="mist"
    >
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Contact form */}
        <Reveal className="lg:col-span-3" delay={60}>
          <GlowingCard className="h-full" innerClassName="h-full">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-ink/50"
                >
                  Nama
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nama lengkap Anda"
                  className={field}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-ink/50"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="nama@email.com"
                  className={field}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-ink/50"
                >
                  Pesan
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Tulis pesan Anda di sini…"
                  className={`${field} resize-y`}
                />
              </div>

              <LiquidButton
                type="submit"
                size="lg"
                className="w-full rounded-full bg-accent/85 px-6 py-3.5 text-sm font-semibold text-white sm:w-auto"
              >
                <MailIcon className="h-4 w-4" />
                Kirim Pesan
              </LiquidButton>

              <p className="text-xs text-ink/40">
                Form ini membuka aplikasi email Anda dengan pesan yang sudah
                terisi. Belum ada backend yang menerima submission.
              </p>
            </form>
          </GlowingCard>
        </Reveal>

        {/* Direct details */}
        <Reveal className="lg:col-span-2" delay={140}>
          <div className="flex h-full flex-col gap-4">
            <GlowingCard innerClassName="!p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/50">
                Email
              </p>
              <a
                href={`mailto:${PROFILE.email}`}
                className="mt-2 flex items-center gap-2 text-sm font-medium text-accent hover:underline"
              >
                <MailIcon className="h-4 w-4 shrink-0" />
                {PROFILE.email}
              </a>
              <p className="mt-2 text-xs italic text-ink/40">
                Alamat email asli menyusul.
              </p>
            </GlowingCard>

            <GlowingCard innerClassName="!p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/50">
                Lokasi
              </p>
              <p className="mt-2 flex items-start gap-2 text-sm text-ink/75">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {PROFILE.location}
              </p>
            </GlowingCard>

            <GlowingCard innerClassName="!p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/50">
                Sosial Media
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <LiquidButton
                  asChild
                  size="sm"
                  className="rounded-full px-4 py-2 text-xs font-semibold text-ink/75 hover:text-ink"
                >
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <GithubIcon className="h-4 w-4" />
                    GitHub
                  </a>
                </LiquidButton>
                <LiquidButton
                  asChild
                  size="sm"
                  className="rounded-full px-4 py-2 text-xs font-semibold text-ink/75 hover:text-ink"
                >
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <LinkedinIcon className="h-4 w-4" />
                    LinkedIn
                  </a>
                </LiquidButton>
              </div>
            </GlowingCard>

            <GlowingCard innerClassName="flex flex-1 flex-col justify-center !p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/50">
                Resume / CV
              </p>
              <LiquidButton
                asChild
                size="lg"
                className="mt-3 w-full rounded-full bg-ink/90 px-5 py-3 text-sm font-semibold text-white"
              >
                <a href={PROFILE.cvUrl} download>
                  <DownloadIcon className="h-4 w-4" />
                  Download CV (PDF)
                </a>
              </LiquidButton>
            </GlowingCard>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}