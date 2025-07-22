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
          className='relative w-full text-blue-950 border-b-1 border-black/10'
        >
          <div className='container mx-auto flex items-center justify-center px-4 py-4 text-center md:px-6'>
            <p className='text-[1rem]'>
              <span role='img' aria-label='bell-icon' className='mr-2'>
                🔔
              </span>
              Are you a service provider? Join our verified partner network to
              list your services and reach global clients.{' '}
              <a
                href='#'
                className='font-semibold text-blue-600 underline hover:text-blue-700'
                onClick={(e) => e.preventDefault()}
              >
                Apply Now!
              </a>
            </p>
            <button
              onClick={handleClose}
              className='absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-600 hover:text-gray-900 '
              aria-label='Close notification'
            >
              <FiX className='h-5 w-5' />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default NotificationBanner
