import { useState } from 'react'
import Section, { Reveal } from '../components/Section'
import { EXPERIENCE } from '../data/portfolio'
import { YoutubeIcon, XIcon } from '../components/icons'
import { LiquidButton } from '../components/ui/liquid-glass-button'

type Video = {
  label: string
  url: string
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

function VideoModal({
  video,
  onClose,
}: {
  video: Video | null
  onClose: () => void
}) {
  if (!video) return null

  const videoId = getYouTubeId(video.url)
  if (!videoId) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <LiquidButton
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full"
        >
          <XIcon className="w-5 h-5 text-white" />
        </LiquidButton>

        {/* Video player */}
        <div className="relative aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={video.label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Video title */}
        <div className="px-6 py-4">
          <h3 className="text-lg font-medium text-white/90">{video.label}</h3>
        </div>
      </div>
    </div>
  )
}

export default function VideoGallery() {
  const videos = (EXPERIENCE[0]?.videos || []) as unknown as Video[]
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  if (videos.length === 0) return null

  return (
    <>
      <Section
        id="konten-publikasi"
        eyebrow="Konten Publikasi"
        title="Video dokumentasi selama bekerja."
        subtitle="Konten video yang dibuat selama masa kerja di Dinas Perpustakaan dan Kearsipan Kota Samarinda."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {videos.map((video, index) => {
            const videoId = getYouTubeId(video.url)
            const thumbnail = videoId
              ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
              : ''

            return (
              <Reveal key={video.url} delay={100 + index * 80}>
                <button
                  onClick={() => setSelectedVideo(video)}
                  className="group relative w-full overflow-hidden rounded-xl bg-[#0a0a0a] border border-white/10 transition-all hover:border-white/30 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-black/60">
                    {thumbnail && (
                      <img
                        src={thumbnail}
                        alt={video.label}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
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
                    <YoutubeIcon className="w-4 h-4 text-red-500 shrink-0" />
                    <span className="text-sm font-medium text-white/80 truncate">
                      {video.label}
                    </span>
                  </div>
                </button>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* Modal */}
      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </>
  )
}