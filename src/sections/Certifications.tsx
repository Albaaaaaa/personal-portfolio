import Section, { Reveal } from '../components/Section'
import { ImageCard } from '../components/ui/image-card'
import { GlowingCard } from '../components/ui/glowing-card'
import { ExternalLink } from 'lucide-react'
import {
  ParallaxCard,
  ParallaxCards,
} from '../components/ui/parallax-cards'
import { CERTIFICATIONS } from '../data/portfolio'

/** Two-letter badge derived from the issuer name. */
function badgeFor(issuer: string) {
  if (issuer === 'edX') return 'eX'
  if (issuer === 'BNSP') return 'BN'
  return issuer.slice(0, 2).toUpperCase()
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop'

export default function Certifications() {
  return (
    <Section
      id="sertifikasi"
      eyebrow="Sertifikasi"
      title="Kredensial dan sertifikasi."
      subtitle="Sertifikasi profesional di bidang IT support, data science, statistika, dan bahasa."
    >
      <ParallaxCards className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((cert) => (
          <ParallaxCard key={cert.title}>
            <GlowingCard className="h-full" innerClassName="p-0">
              <ImageCard
                className="h-full min-h-[340px]"
                imageUrl={cert.image ?? FALLBACK_IMAGE}
                imageAlt={cert.title}
                objectFit="contain"
                imageHref={cert.credentialUrl}
                plain
                logo={
                  <span className="flex items-center gap-1 text-xs font-bold text-white">
                    {badgeFor(cert.issuer)}
                    {cert.credentialUrl && <ExternalLink size={12} />}
                  </span>
                }
                title={cert.title}
                subtitle={cert.issuer}
                footer={
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                      Terbit {cert.issued}
                    </span>
                    {cert.expires ? (
                      <span className="rounded-full bg-green-400/20 px-3 py-1 text-[11px] font-medium text-green-200 backdrop-blur-sm">
                        Berlaku s.d. {cert.expires}
                      </span>
                    ) : (
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur-sm">
                        Tanpa kedaluwarsa
                      </span>
                    )}
                  </div>
                }
              />
            </GlowingCard>
          </ParallaxCard>
        ))}
      </ParallaxCards>

      <Reveal delay={140}>
        <p className="mt-6 text-xs italic text-ink/40">
          Link verifikasi kredensial akan ditambahkan menyusul.
        </p>
      </Reveal>
    </Section>
  )
}