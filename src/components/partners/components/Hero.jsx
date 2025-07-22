import { motion } from 'framer-motion'
import { FaSearch } from 'react-icons/fa'

const Hero = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: -20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.5, ease: 'easeOut' },
    }),
  }

  return (
    <section className='h-fit py-20 px-4 md:px-10'>
      <div className='mx-auto flex max-w-screen-lg flex-col items-center gap-6 text-center'>
        <motion.h1
          variants={fadeIn}
          initial='hidden'
          animate='visible'
          custom={0}
          className='text-2xl font-bold leading-tight sm:text-3xl md:text-4xl'
        >
          Explore all the partners of <span className='text-rwa'>RWA Inc</span>
        </motion.h1>

        <motion.div
          variants={fadeIn}
          initial='hidden'
          animate='visible'
          custom={1}
          className='relative w-full max-w-md'
        >
          <input
            type='text'
            placeholder='Search partners...'
            className='w-full rounded-full bg-[#F3F3F4] py-4 pl-5 pr-12 text-gray-800 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-rwa/50'
          />
          <button
            type='button'
            aria-label='Search'
            className='absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-rwa p-3 text-white transition-colors hover:bg-rwa/90 focus:outline-none focus:ring-2 focus:ring-white'
          >
            <FaSearch />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
