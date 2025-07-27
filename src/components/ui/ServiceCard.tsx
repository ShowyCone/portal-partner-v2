import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import partnersData from '@/data/partners'
import { motion } from 'framer-motion'
import { FaRegHeart, FaStar } from 'react-icons/fa'

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
}

export interface Service {
  id: string
  title: string
  description: string
  image: string
  price: number
  rating: number
  tag: string
  partnerId: string
  favorite?: boolean
  reviews?: number
}

interface Props {
  service: Service
  index?: number
  variant?: 'default' | 'suggested'
}

const ServiceCard: React.FC<Props> = ({
  service,
  index = 0,
  variant = 'default',
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(!!service.favorite)
  const router = useRouter()

  const partner = partnersData.find((p) => p.id === service.partnerId)
  const partnerName = partner ? partner.name : 'Unknown Partner'

  const isSuggested = variant === 'suggested'

  const handleCardClick = () => {
    router.push(`/service/${service.id}`)
  }

  const handlePartnerClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (partner) {
      router.push(`/partner/${partner.id}`)
    }
  }

  return (
    <motion.div
      className='rounded-lg bg-white shadow-xl flex flex-col transition-transform duration-300 hover:-translate-y-2 cursor-pointer'
      custom={index}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.5 }}
      variants={cardVariants}
      onClick={handleCardClick}
    >
      <div className='relative h-40 sm:h-48 rounded-t-lg overflow-hidden'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.image}
          alt={service.title}
          className='w-full h-full object-cover'
        />
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsFavorite((prev) => !prev)
          }}
          className={`absolute cursor-pointer top-0 right-0 z-10 backdrop-blur-3xl bg-black/20 group active:scale-100 [text-shadow:0_1px_4px_rgba(0,0,0,0.7)] rounded-bl-lg p-2 sm:p-3 ${
            isFavorite ? 'text-rwa' : 'text-white'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FaRegHeart
            className='group-hover:scale-125 transition-all duration-300'
            size={18}
          />
        </button>
      </div>

      <div className='p-3 sm:p-4 flex flex-col flex-grow text-gray-800'>
        <div className='flex justify-between items-start gap-2'>
          <div className='relative group flex-1 min-w-0'>
            <h3 className='font-bold text-sm sm:text-base text-rwa truncate'>
              {service.title}
            </h3>
            <div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none z-10'>
              {service.title}
              <div className='absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-900' />
            </div>
          </div>

          <div className='flex items-center gap-1 flex-shrink-0'>
            <FaStar className='text-rwa text-sm sm:text-lg' />
            <span className='text-sm sm:text-lg'>{service.rating.toFixed(1)}</span>
          </div>
        </div>

        <div
          className={
            isSuggested
              ? 'flex flex-col items-center gap-1 mt-2'
              : 'flex items-center gap-2 mt-2'
          }
        >
          <p className='font-bold text-gray-900 text-sm sm:text-base'>${service.price}</p>
          <span className='bg-rwa/10 text-rwa text-xs font-semibold px-2 py-0.5 rounded-full'>
            {service.tag}
          </span>
        </div>

        {!isSuggested && (
          <div className='mt-2 sm:mt-3 flex-grow'>
            <div className='relative group w-fit'>
              <p className='text-gray-600 text-xs sm:text-sm line-clamp-2'>
                {service.description}
              </p>
              <div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-sm bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none z-20'>
                {service.description}
                <div className='absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-900' />
              </div>
            </div>
          </div>
        )}

        {!isSuggested && (
          <div className='border-t border-gray-200 mt-3 sm:mt-4 pt-2 sm:pt-3 flex justify-between items-center text-xs sm:text-sm text-gray-500'>
            {partner ? (
              <button
                onClick={handlePartnerClick}
                className='hover:underline hover:text-rwa text-left truncate'
              >
                {partnerName}
              </button>
            ) : (
              <span className="truncate">{partnerName}</span>
            )}
            <span className="whitespace-nowrap">{service.reviews ?? 0} reviews</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ServiceCard
