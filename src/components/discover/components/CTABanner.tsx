import React from 'react'
import { motion } from 'framer-motion'

const CTABanner: React.FC = () => {
  return (
    <section className='overflow-hidden p-10 w-full'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className='flex items-center justify-center text-center gap-6 py-16 md:py-20 px-4 md:px-20 rounded-xl overflow-hidden bg-rwa'
      >
        <h2 className='text-white text-xl md:text-3xl font-bold'>
          Help us to improve
        </h2>

        <a
          href='/contact'
          className='bg-white text-rwa px-16 py-2 rounded-md font-medium hover:bg-white/90 transition'
        >
          Contact Us
        </a>
      </motion.div>
    </section>
  )
}

export default CTABanner
