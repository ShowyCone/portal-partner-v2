// @ts-nocheck
'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

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
    <div className='bg-white rounded-lg p-4 md:p-6 shadow-lg overflow-hidden h-full flex flex-col gap-2'>
      <div className='flex items-start justify-between mb-2'>
        <span className='bg-rwa text-xs md:text-sm text-white px-2 py-0.5 rounded font-semibold'>
          {category}
        </span>
        <span className='flex items-center gap-1 text-black text-xs md:text-sm font-semibold'>
          <FaStar className='text-rwa' size={12} /> {rating}
        </span>
      </div>
      <h3 className='text-rwa font-bold text-base md:text-lg lg:text-xl leading-tight'>
        {title}
      </h3>
      <p className='text-gray-800 font-bold text-sm md:text-base'>{price}</p>
      <p className='text-xs md:text-sm text-gray-600 line-clamp-2 md:line-clamp-3 hover:line-clamp-none transition-all flex-grow'>
        {description}
      </p>
      <a
        href='#'
        className='block text-rwa font-medium hover:underline mt-auto underline underline-offset-4 text-xs md:text-sm'
      >
        EXPLORE SERVICE
      </a>
    </div>
  )
}

const ChooseYourTrack = () => {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0) // 1 = next, -1 = prev
  const [isMobile, setIsMobile] = useState(false)

  // Detectar si es mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const paginate = (dir) => {
    setDirection(dir)
    setIndex((prev) => (prev + dir + mockTracks.length) % mockTracks.length)
  }

  // Crear array de todos los servicios para mobile
  const allServices = mockTracks.flatMap((track, trackIndex) =>
    track.services.map((service, serviceIndex) => ({
      ...service,
      trackIndex,
      serviceIndex,
      track,
    }))
  )

  const currentTrack = mockTracks[index]

  return (
    <section className='py-10 px-4 md:px-8 lg:px-16 xl:px-35 relative overflow-hidden bg-[#E0E8FF40]'>
      <h2 className='text-center text-rwa font-bold text-2xl md:text-3xl lg:text-4xl mb-8 md:mb-10 px-4'>
        Choose your Track with the best in the market
      </h2>

      <div className='relative max-w-7xl mx-auto'>
        {/* MOBILE VERSION - Single service with Swiper */}
        <div className='md:hidden'>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: '.mobile-prev',
              nextEl: '.mobile-next',
            }}
            pagination={{
              el: '.mobile-pagination',
              clickable: true,
              bulletClass: 'swiper-pagination-bullet-custom',
              bulletActiveClass: 'swiper-pagination-bullet-active-custom',
            }}
            className='mb-8'
          >
            {allServices.map((service, i) => (
              <SwiperSlide
                key={`${service.trackIndex}-${service.serviceIndex}`}
              >
                <div className='flex flex-col gap-4'>
                  {/* Company image */}
                  <div className='relative h-64 overflow-hidden rounded-lg'>
                    <img
                      src={service.track.companyImg}
                      alt='Highlighted service visual'
                      className='w-full h-full object-cover'
                    />
                    <div className='absolute top-3 left-3 z-10 bg-white py-1.5 px-3 rounded'>
                      <img
                        src={service.track.companyLogo}
                        alt='Company logo'
                        className='h-4'
                      />
                    </div>
                  </div>

                  {/* Service card */}
                  <ServiceCard service={service} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Mobile Controls - Bottom */}
          <div className='flex flex-col items-center gap-4'>
            {/* Pagination bullets */}
            <div className='mobile-pagination flex justify-center items-center gap-2'></div>

            {/* Navigation buttons */}
            <div className='flex gap-3'>
              <button
                className='mobile-prev bg-rwa text-white rounded-md p-2.5 hover:bg-rwa/80 transition cursor-pointer'
                aria-label='Previous service'
              >
                <FaChevronLeft size={14} />
              </button>
              <button
                className='mobile-next bg-rwa text-white rounded-md p-2.5 hover:bg-rwa/80 transition cursor-pointer'
                aria-label='Next service'
              >
                <FaChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* DESKTOP VERSION - Original design */}
        <div className='hidden md:block'>
          <button
            aria-label='Previous track'
            onClick={() => paginate(-1)}
            className='absolute top-1/2 -translate-y-1/2 -left-16 lg:-left-20 z-20 bg-rwa text-white rounded-md p-3 px-4 hover:bg-rwa/80 transition cursor-pointer flex items-center justify-center'
          >
            <FaChevronLeft />
          </button>

          <button
            aria-label='Next track'
            onClick={() => paginate(1)}
            className='absolute top-1/2 -translate-y-1/2 -right-16 lg:-right-20 z-20 bg-rwa text-white rounded-md p-3 px-4 hover:bg-rwa/80 transition cursor-pointer flex items-center justify-center'
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
              {/* Company image */}
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

              {/* Services cards */}
              <div className='flex flex-col gap-4 justify-between flex-1'>
                {currentTrack.services.map((svc) => (
                  <ServiceCard key={svc.title} service={svc} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Desktop pagination */}
          <div className='flex justify-center gap-3 mt-8'>
            {mockTracks.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1)
                  setIndex(i)
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === index ? 'bg-rwa' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChooseYourTrack

// Estilos CSS para los bullets de paginación personalizados
const styles = `
  .swiper-pagination-bullet-custom {
    width: 10px !important;
    height: 10px !important;
    background: #d1d5db !important;
    border-radius: 50% !important;
    opacity: 1 !important;
    cursor: pointer !important;
    transition: all 0.3s ease !important;
  }
  
  .swiper-pagination-bullet-active-custom {
    background: var(--rwa-color, #1e40af) !important;
    transform: scale(1.2) !important;
  }
`

// Inyectar estilos en el DOM
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
}
