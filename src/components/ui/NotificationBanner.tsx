'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'

const NotificationBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  const handleClose = () => {
    setIsVisible(false)
  }

  const bannerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 },
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial='hidden'
          animate='visible'
          exit='exit'
          variants={bannerVariants}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className='relative w-full bg-blue-600 text-white z-50'
        >
          <div className='container mx-auto flex items-center justify-between px-3 sm:px-4 md:px-6 py-2 text-center'>
            <p className='text-xs sm:text-sm md:text-base flex-1 pr-2'>
              <span role='img' aria-label='bell-icon' className='mr-1 sm:mr-2'>
                🔔
              </span>
              Service provider? Join our network!{' '}
              <a
                href='#'
                className='font-semibold underline hover:text-blue-300'
                onClick={(e) => e.preventDefault()}
              >
                Apply Now
              </a>
            </p>
            <button
              onClick={handleClose}
              className='p-1 text-white hover:text-gray-200 flex-shrink-0'
              aria-label='Close notification'
            >
              <FiX className='h-4 w-4 sm:h-5 sm:w-5' />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default NotificationBanner
