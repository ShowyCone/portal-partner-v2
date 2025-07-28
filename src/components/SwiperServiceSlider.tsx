import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
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

const SwiperServiceSlider: React.FC<Props> = ({
  services = [],
  partnerName = '',
  tag = '',
  title = '',
}) => {
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
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        style={{ paddingBottom: '2.5rem' }}
      >
        {services.map((svc, idx) => (
          <SwiperSlide key={svc.id}>
            <div className='h-full flex'>
              <ServiceCard service={svc} index={idx} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default SwiperServiceSlider
