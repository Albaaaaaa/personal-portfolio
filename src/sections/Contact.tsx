import { useRef, useState } from 'react'
import Section, { Reveal, Stagger, StaggerItem } from '../components/Section'
import { GlowingCard } from '../components/ui/glowing-card'
import { LiquidMetalButton } from '../components/ui/liquid-metal-button'
import { CvDownloadButton } from '../components/ui/cv-download-button'
import { PROFILE, WEB3FORMS_ACCESS_KEY } from '../data/portfolio'
import {
  MailIcon,
  PinIcon,
} from '../components/icons'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  /**
   * Submissions go to Web3Forms, which forwards them to the email registered
   * on the account. The access key is public by design — it only permits
   * creating submissions, never reading them.
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return

    setStatus('sending')
    setErrorMessage('')

    const payload = new FormData(event.currentTarget)
    payload.set('access_key', WEB3FORMS_ACCESS_KEY)
    payload.set('subject', `Pesan baru dari portfolio — ${form.name}`)
    payload.set('from_name', 'Portfolio Website')
    // Supaya tombol Reply di inbox langsung tertuju ke pengirim pesan.
    payload.set('replyto', form.email)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload,
      })
      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
        formRef.current?.reset()
      } else {
        setStatus('error')
        setErrorMessage(
          typeof data?.message === 'string'
            ? data.message
            : 'Pesan gagal terkirim. Coba lagi atau email langsung.',
        )
      }
    } catch {
      setStatus('error')
      setErrorMessage(
        'Tidak bisa menghubungi server. Periksa koneksi Anda, atau email langsung.',
      )
    }
  }

  const field =
    'w-full rounded-2xl border border-ink/12 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-accent disabled:opacity-60'

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
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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
                  disabled={status === 'sending'}
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
                  disabled={status === 'sending'}
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
                  disabled={status === 'sending'}
                  className={`${field} resize-y`}
                />
              </div>

              {/* Honeypot: bots fill this, humans never see it. */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                aria-hidden="true"
                className="hidden"
              />

              <div className="flex justify-center sm:justify-start">
                <LiquidMetalButton
                  type="submit"
                  label={status === 'sending' ? 'Mengirim…' : 'Kirim Pesan'}
                />
              </div>

              <p
                role="status"
                aria-live="polite"
                className={`text-xs ${
                  status === 'success'
                    ? 'text-accent'
                    : status === 'error'
                      ? 'text-red-600'
                      : 'text-ink/40'
                }`}
              >
                {status === 'success'
                  ? 'Pesan terkirim. Terima kasih — saya akan membalas lewat email.'
                  : status === 'error'
                    ? errorMessage
                    : `Pesan dikirim langsung ke ${PROFILE.email}.`}
              </p>
            </form>
          </GlowingCard>
        </Reveal>

        {/* Direct details */}
        <Reveal className="lg:col-span-2" delay={140}>
          <Stagger>
          <div className="flex h-full flex-col gap-4">
            <StaggerItem>
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
              <p className="mt-2 text-xs text-ink/40">
                Balasan biasanya dalam 1–2 hari kerja.
              </p>
            </GlowingCard>
            </StaggerItem>

            <StaggerItem>
            <GlowingCard innerClassName="!p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/50">
                Lokasi
              </p>
              <p className="mt-2 flex items-start gap-2 text-sm text-ink/75">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {PROFILE.location}
              </p>
            </GlowingCard>
            </StaggerItem>

            <StaggerItem>
            <GlowingCard innerClassName="!p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/50">
                Sosial Media
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <LiquidMetalButton
                  label="GitHub"
                  onClick={() => window.open(PROFILE.github, '_blank')}
                />
                <LiquidMetalButton
                  label="LinkedIn"
                  onClick={() => window.open(PROFILE.linkedin, '_blank')}
                />
              </div>
            </GlowingCard>
            </StaggerItem>

            <StaggerItem>
            <GlowingCard innerClassName="flex flex-1 flex-col justify-center !p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/50">
                Resume / CV
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-3">
                <CvDownloadButton />
              </div>
            </GlowingCard>
            </StaggerItem>
          </div>
          </Stagger>
        </Reveal>
      </div>
    </Section>
  )
}