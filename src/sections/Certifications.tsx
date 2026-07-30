import Section, { Reveal } from '../components/Section'
import { GlowingCard } from '../components/ui/glowing-card'
import { CERTIFICATIONS } from '../data/portfolio'

/** Two-letter badge derived from the issuer name. */
function badgeFor(issuer: string) {
  if (issuer === 'edX') return 'eX'
  if (issuer === 'BNSP') return 'BN'
  return issuer.slice(0, 2).toUpperCase()
}

export default function Certifications() {
  return (
    <Section
      id="sertifikasi"
      eyebrow="Sertifikasi"
      title="Kredensial dan sertifikasi."
      subtitle="Sertifikasi profesional di bidang IT support, data science, statistika, dan bahasa."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((cert, index) => (
          <Reveal key={cert.title} delay={60 + (index % 3) * 70}>
            <GlowingCard className="flex h-full flex-col" innerClassName="flex-1">
              <div className="flex items-start gap-4">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-sm font-bold text-accent"
                  aria-hidden="true"
                >
                  {badgeFor(cert.issuer)}
                </span>
                <div>
                  <h3 className="text-sm font-semibold leading-snug text-ink">
                    {cert.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-ink/55">{cert.issuer}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-1 flex-wrap items-end gap-2 border-t border-ink/8 pt-5">
                <span className="rounded-full bg-ink/5 px-3 py-1 text-[11px] font-medium text-ink/60">
                  Terbit {cert.issued}
                </span>
                {cert.expires ? (
                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-[11px] font-medium text-green-700">
                    Berlaku s.d. {cert.expires}
                  </span>
                ) : (
                  <span className="rounded-full bg-ink/5 px-3 py-1 text-[11px] font-medium text-ink/50">
                    Tanpa kedaluwarsa
                  </span>
                )}
              </div>
            </GlowingCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={140}>
        <p className="mt-6 text-xs italic text-ink/40">
          Link verifikasi kredensial akan ditambahkan menyusul.
        </p>
      </Reveal>
    </Section>
  )
}