import Section, { Reveal, Stagger, StaggerItem } from '../components/Section'
import { GlowingCard } from '../components/ui/glowing-card'
import { InfiniteSlider } from '../components/ui/infinite-slider'
import { SKILL_GROUPS } from '../data/portfolio'

export default function Skills() {
  // Flatten all skill items for the carousel
  const allSkills = SKILL_GROUPS.flatMap((g) => g.items)

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Keahlian teknis & profesional."
      subtitle="Web, mobile, AI, data, sistem, keamanan, desain, dan kemampuan profesional."
      chapter="04"
      tone="mist"
    >
      {/* Infinite skill carousel */}
      <Reveal delay={40}>
        <div className="mb-3 flex items-center justify-between border-b border-ink/10 pb-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
            Skill index
          </p>
          <p className="font-mono text-[10px] text-ink/40">
            {String(allSkills.length).padStart(2, '0')} skills
          </p>
        </div>
        <div className="relative mb-10 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-mist to-transparent" />
          <InfiniteSlider
            gap={12}
            duration={60}
            durationOnHover={120}
            className="py-3"
          >
            {allSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-medium text-ink/75 shadow-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
                {skill}
              </span>
            ))}
          </InfiniteSlider>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-mist to-transparent" />
        </div>
      </Reveal>

      {/* Skill category cards */}
      <Stagger>
        <div className="grid gap-5 sm:grid-cols-2">
          {SKILL_GROUPS.map((group, index) => (
            <StaggerItem key={group.category} className="h-full">
              <GlowingCard
                className="h-full"
                innerClassName="group overflow-hidden !p-0"
              >
                <div className="flex items-center justify-between border-b border-ink/8 px-6 py-3.5">
                  <span className="font-mono text-[9px] font-semibold tracking-[0.18em] text-accent/70">
                    CAT-{String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                    {String(group.items.length).padStart(2, '0')} skills
                  </span>
                </div>

                <div className="relative flex flex-1 flex-col p-6">
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-8 -right-2 font-instrument-serif text-[7rem] leading-none text-ink/[0.025] transition-colors duration-300 group-hover:text-accent/[0.045]"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="relative flex items-center gap-3">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-ink/8 bg-ink/[0.035] text-xl"
                      aria-hidden="true"
                    >
                      {group.icon}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-ink sm:text-lg">
                        {group.category}
                      </h3>
                      <span className="mt-2 block h-0.5 w-8 rounded-full bg-accent/50 transition-[width] duration-300 group-hover:w-14" />
                    </div>
                  </div>

                  <ul className="relative mt-6 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-ink/10 bg-white px-3.5 py-1.5 text-xs font-medium text-ink/75 sm:text-sm"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowingCard>
            </StaggerItem>
          ))}
        </div>
      </Stagger>
    </Section>
  )
}