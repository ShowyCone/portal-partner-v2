// @ts-nocheck
'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const categories = [
  'Discover',
  'Smart Contract',
  'Legal & Compliance',
  'Marketing & Growth',
  'Technical Consulting',
  'More',
]

const popularTags = [
  'Growth',
  'Token Creation',
  'DeFi',
  'NFTs',
  'Audit',
  'Solutions',
]

const fadeInAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeInOut',
    },
  }),
}

const Hero = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0])

  return (
    <section className='relative flex items-center justify-center w-full min-h-[90vh] text-white overflow-hidden px-4 md:px-8'>
      <div className='absolute inset-0 z-[-2]'>
        <img
          src='/video_still.webp'
          alt='Background'
          className='object-cover w-full h-full'
        />
      </div>
      <div className='absolute inset-0 bg-black/30 z-[-1]'></div>

      <div className='container z-10 flex flex-col items-center justify-center w-full max-w-screen-xl gap-6 text-center'>
        {/* Swiper for mobile */}
        <motion.div
          className='w-full'
          initial='initial'
          animate='animate'
          variants={{
            animate: { transition: { staggerChildren: 0.05 } },
          }}
        >
          <Swiper
            spaceBetween={10}
            slidesPerView={'auto'}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={4000}
            allowTouchMove={true}
            modules={[Autoplay]}
            className='flex md:hidden'
          >
            {categories.map((category) => (
              <SwiperSlide key={category} className='!w-auto'>
                <motion.button
                  custom={1}
                  variants={fadeInAnimation}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 text-lg rounded-3xl cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-none whitespace-nowrap ${
                    activeCategory === category
                      ? 'bg-rwa'
                      : 'bg-rwa/20 hover:bg-rwa/50'
                  }`}
                >
                  {category}
                </motion.button>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Static buttons for larger screens */}
          <div className='hidden md:flex flex-wrap items-center justify-center gap-4'>
            {categories.map((category) => (
              <motion.button
                key={category}
                custom={1}
                variants={fadeInAnimation}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 text-lg rounded-3xl cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-none ${
                  activeCategory === category
                    ? 'bg-rwa'
                    : 'bg-rwa/20 hover:bg-rwa/50'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.h1
          custom={2}
          variants={fadeInAnimation}
          initial='initial'
          animate='animate'
          className='text-4xl font-bold md:text-5xl lg:text-6xl md:px-30'
        >
          Discover Premium Services from{' '}
          <span className='text-rwa'>RWA Inc</span> & Trusted Partners
        </motion.h1>

        <motion.p
          custom={3}
          variants={fadeInAnimation}
          initial='initial'
          animate='animate'
          className='max-w-3xl text-base text-gray-200 md:text-lg'
        >
          Your go-to marketplace for smart contracts, development, marketing,
          and more powered by a network of verified professionals.
        </motion.p>

        {/* search bar */}
        <motion.div
          custom={4}
          variants={fadeInAnimation}
          initial='initial'
          animate='animate'
          className='relative w-full max-w-xl mt-4'
        >
          <div className='absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none'>
            <FaSearch className='text-gray-400' />
          </div>
          <input
            type='text'
            placeholder='Search services, categories or partners...'
            className='w-full py-3 pl-12 pr-4 text-gray-900 bg-white/90 rounded-3xl focus:outline-none focus:ring-2 focus:ring-rwa'
          />
        </motion.div>

        <motion.div
          custom={5}
          variants={fadeInAnimation}
          initial='initial'
          animate='animate'
          className='flex flex-col items-center w-full gap-4 mt-6'
        >
          <span className='text-sm'>Most searches</span>
          <div className='flex flex-wrap items-center justify-center gap-3'>
            {popularTags.map((tag) => (
              <button
                key={tag}
                className='px-4 cursor-pointer py-1.5 text-sm text-white border border-white/80 rounded-3xl hover:bg-white/10 transition-colors duration-300'
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
