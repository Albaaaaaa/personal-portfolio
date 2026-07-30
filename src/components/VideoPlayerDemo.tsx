import VideoPlayer from "./ui/video-player";

const VideoPlayerDemo = () => {
  return (
    <div className="w-full py-12 px-4 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
          Watch My Work
        </h2>
        <VideoPlayer src="https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4" />
      </div>
    </div>
  );
};

export { VideoPlayerDemo };