import Section, { Reveal } from '../components/Section'
import { GlowingCard } from '../components/ui/glowing-card'
import { EDUCATION, EXPERIENCE } from '../data/portfolio'
import { PinIcon, YoutubeIcon } from '../components/icons'

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience & Education"
      title="Pengalaman dan pendidikan."
      subtitle="Praktik langsung di instansi pemerintah, dilandasi pendidikan formal Informatics Engineering."
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
        {/* Work experience */}
        <div>
          <Reveal delay={60}>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-ink/45">
              Pengalaman Kerja
            </h3>
          </Reveal>

          <div className="space-y-5">
            {EXPERIENCE.map((job, index) => (
              <Reveal key={job.company} delay={100 + index * 80}>
                <GlowingCard>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h4 className="text-lg font-semibold text-ink">
                        {job.role}
                      </h4>
                      <p className="mt-1 text-sm text-accent">{job.company}</p>
                    </div>
                    <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-ink/60">
                      {job.period}
                    </span>
                  </div>

                  <p className="mt-3 flex items-center gap-1.5 text-xs text-ink/50">
                    <PinIcon className="h-3.5 w-3.5" />
                    {job.location}
                  </p>

                  <ul className="mt-5 space-y-3">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        <p className="text-sm leading-relaxed text-ink/70">
                          {point}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {job.videos && job.videos.length > 0 && (
                    <div className="mt-6 border-t border-ink/8 pt-5">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">
                        Hasil Konten Video
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {job.videos.map((video) => (
                          <a
                            key={video.url}
                            href="#konten-publikasi"
                            className="flex items-center gap-2 rounded-full border border-ink/12 px-4 py-2 text-xs font-semibold text-ink/75 transition-colors hover:border-red-500/40 hover:text-red-600"
                          >
                            <YoutubeIcon className="h-4 w-4 text-red-600" />
                            {video.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </GlowingCard>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <Reveal delay={60}>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-ink/45">
              Pendidikan
            </h3>
          </Reveal>

          <div className="space-y-5">
            {EDUCATION.map((school, index) => (
              <Reveal key={school.school} delay={100 + index * 80}>
                <GlowingCard>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h4 className="text-lg font-semibold text-ink">
                        {school.school}
                      </h4>
                      <p className="mt-1 text-sm text-accent">
                        {school.program}
                      </p>
                    </div>
                    <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-ink/60">
                      {school.period}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-3">
                    {school.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        <p className="text-sm leading-relaxed text-ink/70">
                          {point}
                        </p>
                      </li>
                    ))}
                  </ul>
                </GlowingCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
