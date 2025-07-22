// @ts-nocheck
'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

// Datos mock con tres conjuntos de servicios
const mockTracks = [
  {
    id: 1,
    companyLogo: '/rwamainlogo.svg',
    companyImg: '/Tread_Jailyn_OffTread.webp',
    services: [
      {
        category: 'Marketing & Growth',
        rating: 9.5,
        title: 'Engagement & Finance Advisory',
        price: '$1200',
        description:
          'Optimize your business growth with expert financial consuming and strategic engagement plans tailored to your company.',
      },
      {
        category: 'Technical',
        rating: 8.7,
        title: 'Dapp Auditions Web3',
        price: '$985',
        description:
          'Validate your decentralized application idea with expert audits and feedback from Web3 professionals.',
      },
    ],
  },
  {
    id: 2,
    companyLogo: '/rwamainlogo2.svg',
    companyImg: '/Tread_Jailyn_OffTread.webp',
    services: [
      {
        category: 'Design',
        rating: 9.2,
        title: 'Brand Identity Overhaul',
        price: '$1420',
        description:
          'Refresh your brand with new guidelines, a modern logo and dynamic visual storytelling that resonates with your audience.',
      },
      {
        category: 'Development',
        rating: 8.9,
        title: 'Smart Contract Engineering',
        price: '$2150',
        description:
          'Get production-ready self-auditing smart contracts built by blockchain veterans to secure your protocol.',
      },
    ],
  },
  {
    id: 3,
    companyLogo: '/rwamainlogo.svg',
    companyImg: '/Tread_Jailyn_OffTread.webp',
    services: [
      {
        category: 'Operations',
        rating: 9.1,
        title: 'Supply Chain Optimization',
        price: '$1780',
        description:
          'Streamline your logistics and reduce costs with data-driven optimization led by experienced operations consultants.',
      },
      {
        category: 'Analytics',
        rating: 8.8,
        title: 'Deep Market Insights',
        price: '$1090',
        description:
          'Leverage AI-powered analytics to uncover actionable insights and outperform competitors in emerging markets.',
      },
    ],
  },
]

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
}

const ServiceCard = ({ service }) => {
  const { category, rating, title, price, description } = service
  return (
    <div className='bg-white rounded-lg p-6 shadow-lg overflow-hidden h-full flex flex-col gap-2'>
      <div className='flex items-start justify-between mb-2'>
        <span className='bg-rwa text-sm text-white px-2 py-0.5 rounded font-semibold'>
          {category}
        </span>
        <span className='flex items-center gap-1 text-black text-sm font-semibold'>
          <FaStar className='text-rwa' /> {rating}
        </span>
      </div>
      <h3 className='text-rwa font-bold text-lg md:text-xl'>{title}</h3>
      <p className='text-gray-800 font-bold'>{price}</p>
      <p className='text-sm text-gray-600 line-clamp-3 hover:line-clamp-none transition-all'>
        {description}
      </p>
      <a
        href='#'
        className='block text-rwa font-medium hover:underline mt-auto underline underline-offset-4'
      >
        EXPLORE SERVICE
      </a>
    </div>
  )
}

const ChooseYourTrack = () => {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0) // 1 = next, -1 = prev

  const paginate = (dir) => {
    setDirection(dir)
    setIndex((prev) => (prev + dir + mockTracks.length) % mockTracks.length)
  }

  const currentTrack = mockTracks[index]

  return (
    <section className='py-10 md:px-35 relative overflow-hidden bg-[#E0E8FF40]'>
      <h2 className='text-center text-rwa font-bold text-3xl md:text-4xl mb-10'>
        Choose your Track with the best in the market
      </h2>

      <div className='flex flex-col lg:flex-row gap-6 relative'>
        <button
          aria-label='Previous track'
          onClick={() => paginate(-1)}
          className='absolute top-1/2 -translate-y-1/2 -left-20 z-20 bg-rwa text-white rounded-md p-3 px-4 hover:bg-rwa/80 transition cursor-pointer'
        >
          <FaChevronLeft />
        </button>

        <button
          aria-label='Next track'
          onClick={() => paginate(1)}
          className='absolute top-1/2 -translate-y-1/2 -right-20 z-20 bg-rwa text-white rounded-md p-3 px-4 hover:bg-rwa/80 transition cursor-pointer'
        >
          <FaChevronRight />
        </button>
        <AnimatePresence initial={false} custom={direction} mode='wait'>
          <motion.div
            key={currentTrack.id}
            custom={direction}
            variants={slideVariants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{ type: 'tween', duration: 0.3 }}
            className='flex flex-col lg:flex-row gap-6 w-full'
          >
            <div className='relative flex-1 h-80 lg:h-auto overflow-hidden rounded-lg'>
              <img
                src={currentTrack.companyImg}
                alt='Highlighted service visual'
                className='w-full h-full object-cover'
              />
              <div className='absolute top-4.5 left-4.5 z-10 bg-white py-1.5 px-3 rounded'>
                <img
                  src={currentTrack.companyLogo}
                  alt='Company logo'
                  className='h-5'
                />
              </div>
            </div>

            <div className='flex flex-col gap-4 justify-between flex-1'>
              {currentTrack.services.map((svc) => (
                <ServiceCard key={svc.title} service={svc} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default ChooseYourTrack
