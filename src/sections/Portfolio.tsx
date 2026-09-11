import Section, { Reveal, Stagger, StaggerItem } from '../components/Section'
import { GlowingCard } from '../components/ui/glowing-card'
import { ImageCard } from '../components/ui/image-card'
import {
  ParallaxCard,
  ParallaxCards,
} from '../components/ui/parallax-cards'
import { PROJECTS } from '../data/portfolio'
import { ExternalIcon, GithubIcon } from '../components/icons'

export default function Portfolio() {
  return (
    <Section
      id="portfolio"
      eyebrow="Portfolio"
      title="Project yang saya bangun."
      subtitle="Sistem web, aplikasi, dan riset machine learning — lengkap dengan demo dan source code."
      chapter="05"
    >
      <Reveal delay={40}>
        <div className="mb-8 grid grid-cols-3 divide-x divide-ink/10 border-y border-ink/10 py-4">
          <div className="pr-4">
            <p className="font-instrument-serif text-3xl leading-none text-ink">
              {String(PROJECTS.length).padStart(2, '0')}
            </p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/40">
              Selected work
            </p>
          </div>
          <div className="px-4 sm:px-6">
            <p className="font-instrument-serif text-3xl leading-none text-ink">
              {String(PROJECTS.filter((project) => project.demo).length).padStart(2, '0')}
            </p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/40">
              Live demos
            </p>
          </div>
          <div className="pl-4 sm:pl-6">
            <p className="font-instrument-serif text-3xl leading-none text-ink">
              {String(PROJECTS.filter((project) => project.repo).length).padStart(2, '0')}
            </p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/40">
              Repositories
            </p>
          </div>
        </div>
      </Reveal>

      <Stagger>
        <ParallaxCards className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <StaggerItem key={`${project.title}-${index}`}>
              <ParallaxCard>
                {project.image ? (
                  <ImageCard
                    className="h-full min-h-[360px]"
                    imageUrl={project.image}
                    imageAlt={project.title}
                    imageHref={project.demo ?? project.repo}
                    title={project.title}
                    subtitle={project.stack.join(' · ')}
                    indexLabel={`PRJ-${String(index + 1).padStart(2, '0')}`}
                    statusLabel={project.demo ? 'Live' : 'Case study'}
                    footer={
                      <div className="flex flex-wrap gap-2">
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-opacity hover:opacity-85"
                          >
                            Live Demo
                            <ExternalIcon className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {project.repo && (
                          <a
                            href={project.repo}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="flex items-center gap-1.5 rounded-full border border-white/40 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10"
                          >
                            <GithubIcon className="h-3.5 w-3.5" />
                            Source Code
                          </a>
                        )}
                      </div>
                    }
                  >
                    <p className="text-sm leading-relaxed text-white/70 line-clamp-3">
                      {project.description}
                    </p>
                  </ImageCard>
                ) : (
                  <GlowingCard
                    className="flex h-full min-h-[360px] flex-col opacity-70"
                    innerClassName="group flex-1 overflow-hidden"
                  >
                    <div className="mb-8 flex items-center justify-between border-b border-ink/8 pb-3">
                      <span className="font-mono text-[9px] font-semibold tracking-[0.18em] text-accent/65">
                        PRJ-{String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="rounded-full border border-ink/10 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                        Draft
                      </span>
                    </div>
                    <span
                      aria-hidden="true"
                      className="absolute -right-3 top-14 font-instrument-serif text-[7rem] leading-none text-ink/[0.035]"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="relative text-base font-semibold leading-snug text-ink">
                      {project.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60">
                      {project.description}
                    </p>
                    <p className="mt-6 border-t border-ink/8 pt-5 text-xs italic text-ink/40">
                      Menunggu detail project.
                    </p>
                  </GlowingCard>
                )}
              </ParallaxCard>
            </StaggerItem>
          ))}
        </ParallaxCards>
      </Stagger>
    </Section>
  )
}