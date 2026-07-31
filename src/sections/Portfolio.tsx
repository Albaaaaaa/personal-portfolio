import Section from '../components/Section'
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
    >
      <ParallaxCards className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, index) => (
          <ParallaxCard key={`${project.title}-${index}`}>
            {project.image ? (
              <ImageCard
                className="h-full min-h-[360px]"
                imageUrl={project.image}
                imageAlt={project.title}
                title={project.title}
                subtitle={project.stack.join(' · ')}
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
                className="flex h-full min-h-[360px] flex-col opacity-55"
                innerClassName="flex-1"
              >
                <h3 className="text-base font-semibold leading-snug text-ink">
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
        ))}
      </ParallaxCards>
    </Section>
  )
}