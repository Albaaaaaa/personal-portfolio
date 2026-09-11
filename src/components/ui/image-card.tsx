import * as React from "react"
import { cn } from "../../lib/utils"

interface ImageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string
  imageAlt: string
  logo?: React.ReactNode
  title: string
  subtitle?: string
  indexLabel?: string
  statusLabel?: string
  children?: React.ReactNode
  /** Content revealed on hover at bottom */
  footer?: React.ReactNode
  /** Object-fit behaviour. Default: cover */
  objectFit?: 'cover' | 'contain'
  /** When set, only the image area becomes a clickable link */
  imageHref?: string
  /** Removes border/shadow/rounded — for use inside GlowingCard */
  plain?: boolean
}

const ImageCard = React.forwardRef<HTMLDivElement, ImageCardProps>(
  (
    {
      className,
      imageUrl,
      imageAlt,
      logo,
      title,
      subtitle,
      indexLabel,
      statusLabel,
      children,
      footer,
      objectFit = 'cover',
      imageHref,
      plain = false,
      ...props
    },
    ref
  ) => {
    const image = (
      <img
        src={imageUrl}
        alt={imageAlt}
        className={cn(
          "absolute inset-0 h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]",
          objectFit === 'cover' ? 'object-cover' : 'object-contain p-4'
        )}
      />
    )

    return (
      <div
        ref={ref}
        className={cn(
          "group relative w-full overflow-hidden bg-card",
          !plain && "rounded-xl border border-border shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl",
          "min-h-[320px]",
          className
        )}
        {...props}
      >
        {imageHref ? (
          <a
            href={imageHref}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10 block"
          >
            {image}
          </a>
        ) : (
          image
        )}

        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />

        <div className="pointer-events-none relative z-20 flex h-full min-h-[320px] flex-col justify-between p-5 text-white">
          <div className="flex items-start justify-between gap-3">
            {logo && (
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/50 bg-black/20 backdrop-blur-sm">
                {logo}
              </div>
            )}

            {(indexLabel || statusLabel) && (
              <div className={cn(
                "flex w-full items-center justify-between gap-3",
                logo && "w-auto"
              )}>
                {indexLabel && (
                  <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-white/70">
                    {indexLabel}
                  </span>
                )}
                {statusLabel && (
                  <span className="flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {statusLabel}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2 transition-transform duration-500 ease-in-out group-hover:-translate-y-14">
            <h3 className="text-lg font-bold leading-snug text-white">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-white/75">{subtitle}</p>
            )}
            {children && (
              <div className="pt-2">{children}</div>
            )}
          </div>

          {footer && (
            <div className="pointer-events-auto absolute -bottom-20 left-0 z-30 w-full p-5 opacity-0 transition-all duration-500 ease-in-out group-hover:bottom-0 group-hover:opacity-100">
              {footer}
            </div>
          )}
        </div>
      </div>
    )
  }
)
ImageCard.displayName = "ImageCard"

export { ImageCard }