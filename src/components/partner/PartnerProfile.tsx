import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FaGlobe,
  FaExclamationTriangle,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaVolumeMute,
  FaVolumeUp,
  FaExpand,
  FaStar,
} from 'react-icons/fa'

interface MediaItem {
  type: 'image' | 'video'
  src: string
  thumbnail?: string
}

interface PartnerStats {
  closedClients: number
  rating: number
  ratingCount: number
  services: number
}

interface PartnerProfileProps {
  logo: string
  name: string
  description: string
  introduction?: string
  tags?: string[]
  media?: MediaItem[]
  stats?: Partial<PartnerStats>
  rating?: number
  reviews?: number
  services?: number | Array<unknown>
}

const defaultPartner: PartnerProfileProps = {
  logo: 'https://placehold.co/80x80',
  name: 'Crypto Corp',
  description:
    'We are a leading blockchain solutions company, powering decentralized finance and Web3 innovation.',
  tags: ['Blockchain', 'DeFi', 'NFT'],
  media: [
    { type: 'image', src: 'https://placehold.co/800x450' },
    { type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { type: 'image', src: 'https://placehold.co/800x450?text=Imagen+2' },
  ],
  stats: {
    closedClients: 450,
    rating: 5,
    ratingCount: 656,
    services: 28,
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
  }),
}

const PartnerProfile: React.FC<{ partner?: PartnerProfileProps }> = ({
  partner = defaultPartner,
}: {
  partner?: PartnerProfileProps
}) => {
  const {
    logo = defaultPartner.logo,
    name = defaultPartner.name,
    description = defaultPartner.description,
    tags = [],
    media,
    stats,
    rating,
    reviews,
    services,
    introduction,
  } = partner

  const computedTags = tags?.length ? tags : []
  const computedMedia = media?.length ? media : [{ type: 'image', src: logo }]
  const computedStats = stats || {
    closedClients: 0,
    rating: rating || 0,
    ratingCount: reviews || 0,
    services: Array.isArray(services) ? services.length : 0,
  }
  const introductionText = introduction || description

  // Media carousel state
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentMedia = computedMedia[currentIndex]

  // Video player state
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const mainVideoRef = useRef<HTMLVideoElement>(null)
  const thumbContainerRef = useRef<HTMLDivElement>(null)

  // Video control handlers
  const togglePlay = () => {
    if (!mainVideoRef.current) return
    isPlaying ? mainVideoRef.current.pause() : mainVideoRef.current.play()
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (!mainVideoRef.current) return
    const percentage =
      (mainVideoRef.current.currentTime / mainVideoRef.current.duration) * 100
    setProgress(percentage || 0)
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!mainVideoRef.current) return
    const value = +e.target.value
    mainVideoRef.current.currentTime =
      (value * mainVideoRef.current.duration) / 100
    setProgress(value)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value
    setVolume(value)
    if (mainVideoRef.current) {
      mainVideoRef.current.volume = value
      setIsMuted(value === 0)
    }
  }

  const toggleMute = () => {
    if (!mainVideoRef.current) return
    mainVideoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const enterFullscreen = () => {
    if (!mainVideoRef.current) return
    mainVideoRef.current.requestFullscreen?.()
  }

  // Carousel handlers
  const changeIndex = (next = true) => {
    setCurrentIndex((prev) => {
      const newIdx = next ? prev + 1 : prev - 1
      if (newIdx < 0) return computedMedia.length - 1
      if (newIdx >= computedMedia.length) return 0
      return newIdx
    })
  }

  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (!thumbContainerRef.current) return
    const scrollAmount = direction === 'left' ? -150 : 150
    thumbContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    })
  }

  // Effects
  useEffect(() => {
    if (currentMedia.type !== 'video') {
      setIsPlaying(false)
      setProgress(0)
    }
  }, [currentMedia])

  return (
    <motion.div
      variants={fadeInUp}
      initial='hidden'
      animate='visible'
      className='max-w-7xl mx-auto py-8'
    >
      {/* Header section */}
      <motion.div
        variants={fadeInUp}
        custom={1}
        className='flex justify-between items-start'
      >
        <div className='flex items-center gap-4'>
          <img
            src={logo}
            alt={name}
            className='h-12 w-12 sm:h-16 sm:w-16 object-contain'
          />
          <h1 className='text-xl sm:text-2xl font-semibold'>{name}</h1>
        </div>
        <div className='flex gap-3'>
          <button className='border border-rwa text-rwa rounded-xl p-2 hover:bg-gray-50 transition-all hover:scale-105'>
            <FaGlobe className='text-lg' />
          </button>
          <button className='border border-gray-300 text-gray-400 rounded-xl p-2 hover:bg-gray-50 transition-all hover:scale-105'>
            <FaExclamationTriangle className='text-lg' />
          </button>
        </div>
      </motion.div>

      {/* Description */}
      <motion.p
        variants={fadeInUp}
        custom={2}
        className='text-sm sm:text-base text-gray-700 mt-2  max-w-1/2'
      >
        {description}
      </motion.p>

      {/* Tags */}
      <motion.div
        variants={fadeInUp}
        custom={3}
        className='flex flex-wrap gap-2 mt-4'
      >
        {computedTags.map((tag, i) => (
          <span
            key={i}
            className='text-xs sm:text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full shadow-sm cursor-default'
          >
            {tag}
          </span>
        ))}
      </motion.div>

      {/* Media & Stats */}
      <motion.div
        variants={fadeInUp}
        custom={4}
        className='flex flex-col lg:flex-row justify-between gap-8 mt-6 lg:items-stretch'
      >
        {/* Media Carousel */}
        <div className='relative w-full lg:w-[55%]'>
          {/* Main image / video */}
          <div className='rounded-xl overflow-hidden shadow-md relative aspect-video w-full'>
            {currentMedia.type === 'video' ? (
              <div className='relative h-full'>
                <video
                  ref={mainVideoRef}
                  src={currentMedia.src}
                  className='w-full h-full object-cover'
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                />

                {/* Play button centered */}
                {!isPlaying && (
                  <button
                    className='absolute inset-0 flex items-center justify-center text-white/90 bg-black/40 backdrop-blur-sm'
                    onClick={togglePlay}
                    aria-label='Play video'
                  >
                    <FaPlay className='text-4xl' />
                  </button>
                )}

                {/* Video controls */}
                <div className='absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-3 flex items-center gap-4 text-white text-xs'>
                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    aria-label='Play/Pause'
                    className='hover:scale-105 transition-transform'
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                  {/* Progress */}
                  <input
                    type='range'
                    min='0'
                    max='100'
                    value={progress}
                    onChange={handleProgressChange}
                    className='flex-1 accent-rwa cursor-pointer h-1 bg-gray-300 rounded-lg'
                  />
                  {/* Volume */}
                  <button
                    onClick={toggleMute}
                    aria-label='Mute'
                    className='hover:scale-105 transition-transform'
                  >
                    {isMuted || volume === 0 ? (
                      <FaVolumeMute />
                    ) : (
                      <FaVolumeUp />
                    )}
                  </button>
                  <input
                    type='range'
                    min='0'
                    max='1'
                    step='0.01'
                    value={volume}
                    onChange={handleVolumeChange}
                    className='w-24 accent-rwa cursor-pointer h-1 bg-gray-300 rounded-lg'
                  />
                  {/* Fullscreen */}
                  <button
                    onClick={enterFullscreen}
                    aria-label='Fullscreen'
                    className='hover:scale-105 transition-transform'
                  >
                    <FaExpand />
                  </button>
                </div>
              </div>
            ) : (
              <img
                src={currentMedia.src}
                alt={`media-${currentIndex}`}
                className='w-full h-full object-cover'
              />
            )}

            {/* Navigation arrows */}
            <button
              onClick={() => changeIndex(false)}
              className='absolute top-1/2 -translate-y-1/2 left-3 z-10 bg-white/80 backdrop-blur rounded-full p-2 shadow hover:scale-105 transition-transform'
              aria-label='Previous media'
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => changeIndex(true)}
              className='absolute top-1/2 -translate-y-1/2 right-3 z-10 bg-white/80 backdrop-blur rounded-full p-2 shadow hover:scale-105 transition-transform'
              aria-label='Next media'
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Thumbnails Carousel */}
          <div className='relative'>
            {/* Scroll thumbnails arrows */}
            <button
              onClick={() => scrollThumbnails('left')}
              className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur rounded-full p-1 shadow hover:scale-105 transition-transform'
              aria-label='Scroll left'
            >
              <FaChevronLeft />
            </button>
            <div
              ref={thumbContainerRef}
              className='flex gap-2 overflow-x-auto pt-4 pb-2 px-6 scrollbar-hide'
            >
              {computedMedia.map((m, i) => (
                <img
                  key={i}
                  src={m.type === 'video' ? m.thumbnail || m.src : m.src}
                  alt={`thumb-${i}`}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-24 h-16 rounded-md object-cover cursor-pointer border ${
                    i === currentIndex ? 'border-rwa' : 'border-gray-300'
                  } hover:border-rwa transition`}
                />
              ))}
            </div>
            <button
              onClick={() => scrollThumbnails('right')}
              className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur rounded-full p-1 shadow hover:scale-105 transition-transform'
              aria-label='Scroll right'
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className='flex flex-col justify-between w-[35%]'>
          <div className='flex flex-col gap-4'>
            {/* Closed Deals */}
            <div>
              <p className='text-3xl sm:text-4xl font-bold text-rwa'>
                +{computedStats.closedClients}
              </p>
              <p className='text-sm text-gray-500 uppercase tracking-wide'>
                Closed Deals
              </p>
            </div>
            <div className='h-px bg-gray-200 my-1' />

            {/* Rated */}
            <div>
              <div className='flex items-center gap-1'>
                <FaStar className='text-rwa text-3xl' />
                <p className='text-3xl sm:text-4xl font-bold text-rwa'>
                  {computedStats.rating}
                </p>
              </div>
              <p className='text-sm text-gray-500 uppercase tracking-wide'>
                ({computedStats.ratingCount}) Reviews
              </p>
            </div>
            <div className='h-px bg-gray-200 my-1' />
            {/* Services */}
            <div>
              <p className='text-3xl sm:text-4xl font-bold text-rwa'>
                {computedStats.services}
              </p>
              <p className='text-sm text-gray-500 uppercase tracking-wide'>
                Crypto Services
              </p>
            </div>
          </div>

          {/* Button */}
          <button className='self-start rounded-3xl border-4 border-rwa text-rwa w-full px-6 py-2 font-medium shadow hover:opacity-90 hover:scale-105 transition-all cursor-pointer'>
            View all services
          </button>
        </div>
      </motion.div>

      {/* Introduction Section */}
      <motion.div variants={fadeInUp} custom={5} className='mt-12'>
        <h2 className='text-2xl sm:text-3xl font-semibold text-gray-900'>
          {name} <span className='text-rwa'>Introduction</span>
        </h2>
        <p className='text-base sm:text-lg text-gray-700 leading-relaxed mt-4'>
          {introductionText}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default PartnerProfile
