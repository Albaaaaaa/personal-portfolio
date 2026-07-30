type LogoProps = {
  className?: string
  size?: number
  /** Renders dark ink instead of white, for use on light backgrounds. */
  dark?: boolean
}

/**
 * "MUA" monogram inside an angular geometric frame.
 */
export default function Logo({ className, size = 32, dark = false }: LogoProps) {
  const tone = dark ? '#1d1d1f' : '#ffffff'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Muhammad Ulil Albab — home"
    >
      <path
        d="M24 2 44 13v22L24 46 4 35V13L24 2Z"
        fill="none"
        stroke={tone}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <text
        x="24"
        y="30"
        textAnchor="middle"
        fill={tone}
        fontSize="13"
        fontWeight="600"
        fontFamily="Inter, sans-serif"
        letterSpacing="0.5"
      >
        MUA
      </text>
    </svg>
  )
}