// @ts-nocheck
import React, { useRef, useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { motion } from 'framer-motion'
import ServiceCard from './ui/ServiceCard'

const ServiceSlider = ({
  services = [],
  partnerName = '',
  tag = '',
  title = '',
}) => {
  const containerRef = useRef(null)
  const [showControls, setShowControls] = useState(false)

  // Check if overflow exists to toggle navigation arrows
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

  // Scroll carousel by 80% of visible width
  const scroll = (direction = 'right') => {
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
    <section className='mb-12'>
      {partnerName && tag ? (
        <h3 className='text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2 flex-wrap'>
          <span>{partnerName}</span>
          <span>-</span>
          <span className='text-rwa'>{`${tag} Services`}</span>
          <span className='ml-1 bg-rwa text-white text-sm font-semibold p-1 rounded-lg'>
            {tag}
          </span>
        </h3>
      ) : (
        title && (
          <h3 className='text-xl md:text-2xl font-bold text-gray-900 mb-4'>
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
              className='absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur rounded-full p-2 shadow hover:scale-105 transition-transform'
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label='Scroll right'
              className='absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur rounded-full p-2 shadow hover:scale-105 transition-transform'
            >
              <FaChevronRight />
            </button>
          </>
        )}

        <motion.div
          ref={containerRef}
          className='flex gap-6 overflow-x-auto scrollbar-hide pr-4'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.05 }}
        >
          {services.map((svc, idx) => (
            <div key={svc.id} className='flex-shrink-0 w-72'>
              <ServiceCard service={svc} index={idx} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ServiceSlider
