import Section, { Reveal } from '../components/Section'
import { GlowingCard } from '../components/ui/glowing-card'
import { SKILL_GROUPS } from '../data/portfolio'

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Keahlian teknis."
      subtitle="Dari backend dan database sampai machine learning dan data engineering."
      tone="mist"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {SKILL_GROUPS.map((group, index) => (
          <Reveal key={group.category} delay={60 + index * 70}>
            <GlowingCard className="h-full">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ink/5 text-xl"
                  aria-hidden="true"
                >
                  {group.icon}
                </span>
                <h3 className="text-base font-semibold text-ink sm:text-lg">
                  {group.category}
                </h3>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-ink/10 bg-white px-3.5 py-1.5 text-xs font-medium text-ink/75 sm:text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </GlowingCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}