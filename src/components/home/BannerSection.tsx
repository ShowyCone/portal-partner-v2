// @ts-nocheck
'use client'
import React from 'react'
import { motion } from 'framer-motion'

const BannerSection = () => {
  return (
    <section className='overflow-hidden p-10 w-full'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className='relative z-10 flex flex-col items-center text-center gap-6 py-16 md:py-24 px-4 md:px-20 rounded-xl overflow-hidden'
      >
        <img
          src='/backgroundbanner.webp'
          alt=''
          className='absolute top-0 right-0 -z-10 w-full h-full object-cover'
        />

        <img
          src='/decorationbanner.webp'
          alt=''
          className='absolute right-0 bottom-0 h-full -z-10 object-cover opacity-20'
        />
        <p className='text-white text-sm md:text-base uppercase tracking-wide font-medium'>
          JOIN OUR NETWORK OF TRUSTED PROVIDERS
        </p>

        {/* Título principal */}
        <h2 className='text-rwa text-2xl md:text-4xl font-bold leading-tight'>
          Do you offer services that could help our clients grow?
        </h2>

        {/* CTA */}
        <a
          href='#apply'
          className='inline-block px-16 py-3 bg-white text-rwa rounded-md font-semibold hover:bg-white/80 transition'
        >
          Apply Now
        </a>
      </motion.div>
    </section>
  )
}

export default BannerSection
