import Section, { Reveal } from '../components/Section'
import { GlowingCard } from '../components/ui/glowing-card'
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
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, index) => (
          <Reveal key={`${project.title}-${index}`} delay={60 + (index % 3) * 70}>
            <GlowingCard
              className={`flex h-full flex-col ${
                project.placeholder ? 'opacity-55' : ''
              }`}
              innerClassName="flex-1"
            >
              <h3 className="text-base font-semibold leading-snug text-ink">
                {project.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60">
                {project.description}
              </p>

              {project.stack.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full bg-accent/10 px-3 py-1 text-[11px] font-medium text-accent"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              )}

              {(project.demo || project.repo) && (
                <div className="mt-6 flex flex-wrap gap-2 border-t border-ink/8 pt-5">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-85"
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
                      className="flex items-center gap-1.5 rounded-full border border-ink/12 px-4 py-2 text-xs font-semibold text-ink/75 transition-colors hover:border-ink/30 hover:text-ink"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      Source Code
                    </a>
                  )}
                </div>
              )}

              {project.placeholder && (
                <p className="mt-6 border-t border-ink/8 pt-5 text-xs italic text-ink/40">
                  Menunggu detail project.
                </p>
              )}
            </GlowingCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}