import * as React from "react"
import { cn } from "../../lib/utils"

interface ImageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string
  imageAlt: string
  logo?: React.ReactNode
  title: string
  subtitle?: string
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
          "absolute inset-0 h-full w-full transition-transform duration-500 ease-in-out group-hover:scale-110",
          objectFit === 'cover' ? 'object-cover' : 'object-contain p-4'
        )}
      />
    )

    return (
      <div
        ref={ref}
        className={cn(
          "group relative w-full overflow-hidden bg-card",
          !plain && "rounded-xl border border-border shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2",
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />

        <div className="relative flex h-full min-h-[320px] flex-col justify-between p-5 text-white">
          <div className="flex items-start">
            {logo && (
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/50 bg-black/20 backdrop-blur-sm">
                {logo}
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
            <div className="absolute -bottom-20 left-0 w-full p-5 opacity-0 transition-all duration-500 ease-in-out group-hover:bottom-0 group-hover:opacity-100">
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