import React, { useRef, useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { motion } from 'framer-motion'
import ServiceCard from './ui/ServiceCard'

interface Service {
  id: string
  partnerId: string
  title: string
  rating: number
  reviews: number
  price: number
  tag: string
  description: string
  siteUrl: string
  image: string
  includes: string[]
  favorite: boolean
}

type Props = {
  services: Service[]
  partnerName?: string
  tag?: string
  title?: string
}

const ServiceSlider: React.FC<Props> = ({
  services = [],
  partnerName = '',
  tag = '',
  title = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [showControls, setShowControls] = useState(false)

  useEffect(() => {
    const checkOverflow = () => {
      if (!containerRef.current) return
      const { scrollWidth, clientWidth } = containerRef.current
      setShowControls(scrollWidth > clientWidth)
    }

    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [services])

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return
    const { clientWidth } = containerRef.current
    const amount = clientWidth * 0.8
    containerRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  if (!services.length) return null

  return (
    <section className='mb-8 sm:mb-12 px-4 sm:px-0'>
      {partnerName && tag ? (
        <h3 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 flex-wrap'>
          <span>{partnerName}</span>
          <span>-</span>
          <span className='text-rwa'>{`${tag} Services`}</span>
          <span className='ml-1 bg-rwa text-white text-xs sm:text-sm font-semibold p-1 rounded-lg'>
            {tag}
          </span>
        </h3>
      ) : (
        title && (
          <h3 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4'>
            {title}
          </h3>
        )
      )}

      <div className='relative'>
        {showControls && (
          <>
            <button
              onClick={() => scroll('left')}
              aria-label='Scroll left'
              className='absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur rounded-full p-1.5 sm:p-2 shadow hover:scale-105 transition-transform'
            >
              <FaChevronLeft className='text-sm sm:text-base' />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label='Scroll right'
              className='absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur rounded-full p-1.5 sm:p-2 shadow hover:scale-105 transition-transform'
            >
              <FaChevronRight className='text-sm sm:text-base' />
            </button>
          </>
        )}

        <motion.div
          ref={containerRef}
          className='flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide pr-4'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.05 }}
        >
          {services.map((svc, idx) => (
            <div key={svc.id} className='flex-shrink-0 w-64 sm:w-72'>
              <ServiceCard service={svc} index={idx} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ServiceSlider
