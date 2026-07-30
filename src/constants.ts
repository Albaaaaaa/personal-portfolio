/**
 * Hero assets. All three are placeholders until the real files land in
 * /public/images and /public/video — see public/images/README.md.
 */

/** Dark, moody background image behind the hero. */
export const BG_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260713_140344_79e1296a-86d7-43fd-9b5f-63ffe560f291.png&w=1280&q=85'

/** Looping showcase clip revealed by the spotlight. */
export const FRONT_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260713_162101_0d7498c5-29bb-47bf-a99f-2773c0a880a9.mp4'

/** Semi-transparent PNG adding haze/depth. Set to null to disable. */
export const OVERLAY_IMAGE: string | null =
  'https://soft-zoom-63098134.figma.site/_assets/v11/3f10f1876e118f72a396e05a6c2d099569478272.png'

/** Radius, in CSS pixels, of the cursor-following spotlight reveal. */
export const SPOTLIGHT_RADIUS = 260

/** Lerp factor for cursor smoothing (higher = snappier). */
export const CURSOR_LERP = 0.1

/** Lerp factor for the grid parallax drift. */
export const GRID_LERP = 0.06

/** Maximum grid parallax travel, in pixels. */
export const GRID_PARALLAX_STRENGTH = 16