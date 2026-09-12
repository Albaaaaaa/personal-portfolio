import { useState } from 'react'
import Section, { Reveal } from '../components/Section'
import { EXPERIENCE } from '../data/portfolio'
import { InstagramIcon, YoutubeIcon } from '../components/icons'
import { LiquidMetalButton } from '../components/ui/liquid-metal-button'
import { ParallaxCards } from '../components/ui/parallax-cards'

type Video = {
  label: string
  url: string
  source: string
}

function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

function getInstagramShortcode(url: string): string | null {
  const match = url.match(/instagram\.com\/(?:reel|reels|p)\/([^/?\n#]+)/)
  return match ? match[1] : null
}

function isInstagram(url: string): boolean {
  return url.includes('instagram.com')
}

function VideoModal({
  video,
  onClose,
}: {
  video: Video | null
  onClose: () => void
}) {
  if (!video) return null

  const igShortcode = isInstagram(video.url) ? getInstagramShortcode(video.url) : null
  const youtubeId = igShortcode ? null : getYouTubeId(video.url)
  if (!igShortcode && !youtubeId) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`relative bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-2xl ${
          igShortcode ? 'w-full max-w-md' : 'w-full max-w-4xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="absolute top-4 right-4 z-10">
          <LiquidMetalButton viewMode="icon" onClick={onClose} />
        </div>

        {/* Video player — reels are vertical, YouTube videos are 16:9 */}
        <div
          className={`relative bg-black ${
            igShortcode ? 'aspect-[9/16] max-h-[80vh] mx-auto' : 'aspect-video'
          }`}
        >
          <iframe
            src={
              igShortcode
                ? `https://www.instagram.com/reel/${igShortcode}/embed`
                : `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`
            }
            title={video.label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Video title */}
        <div className="px-6 py-4">
          <h3 className="text-lg font-medium text-white/90">{video.label}</h3>
          <p className="mt-0.5 text-sm text-white/50">{video.source}</p>
        </div>
      </div>
    </div>
  )
}

export default function VideoGallery() {
  const videos = EXPERIENCE.flatMap((job) =>
    ((job.videos || []) as unknown as { label: string; url: string }[]).map(
      (video) => ({ ...video, source: job.company }),
    ),
  )
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  if (videos.length === 0) return null

  return (
    <>
      <Section
        id="konten-publikasi"
        eyebrow="Konten Publikasi"
        title="Video dokumentasi selama bekerja."
        subtitle="Konten video yang dibuat selama masa kerja di Badan Pusat Statistik Provinsi Kalimantan Timur dan Dinas Perpustakaan dan Kearsipan Kota Samarinda."
      >
        <ParallaxCards className="grid gap-6 sm:grid-cols-2">
          {videos.map((video, index) => {
            const igShortcode = isInstagram(video.url)
              ? getInstagramShortcode(video.url)
              : null
            const videoId = igShortcode ? null : getYouTubeId(video.url)
            const thumbnail = videoId
              ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
              : ''

            return (
              <Reveal key={video.url} delay={100 + index * 80}>
                <button
                  onClick={() => setSelectedVideo(video)}
                  className="group relative w-full overflow-hidden rounded-xl bg-[#0a0a0a] border border-white/10 transition-all hover:border-white/30 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  {/* Thumbnail — Instagram has no public thumbnail, so use a gradient placeholder */}
                  <div className="relative aspect-video bg-black/60">
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt={video.label}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#405DE6]/30 via-[#C13584]/20 to-[#F77737]/30" />
                    )}
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <svg
                          className="w-8 h-8 text-white ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="px-4 py-3 flex items-center gap-2">
                    {igShortcode ? (
                      <InstagramIcon className="w-4 h-4 text-pink-400 shrink-0" />
                    ) : (
                      <YoutubeIcon className="w-4 h-4 text-red-500 shrink-0" />
                    )}
                    <span className="text-sm font-medium text-white/80 truncate">
                      {video.label}
                    </span>
                  </div>
                </button>
              </Reveal>
            )
          })}
        </ParallaxCards>
      </Section>

      {/* Modal */}
      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </>
  )
}
