import { ReactNode } from 'react'
import { GlowingEffect } from './glowing-effect'
import { cn } from '../../lib/utils'

interface GlowingCardProps {
  children: ReactNode
  className?: string
  innerClassName?: string
  spread?: number
  glow?: boolean
  proximity?: number
  inactiveZone?: number
  borderWidth?: number
}

export function GlowingCard({
  children,
  className,
  innerClassName,
  spread = 40,
  glow = true,
  proximity = 64,
  inactiveZone = 0.01,
  borderWidth = 3,
}: GlowingCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3',
        className
      )}
    >
      <GlowingEffect
        spread={spread}
        glow={glow}
        disabled={false}
        proximity={proximity}
        inactiveZone={inactiveZone}
        borderWidth={borderWidth}
      />
      <div
        className={cn(
          'relative flex h-full flex-col rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]',
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}