'use client'
import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FaAngleDown } from 'react-icons/fa'
import { IoFilter } from 'react-icons/io5'
import ServiceCard, { Service } from '../ui/ServiceCard'
import servicesData from '../../data/services'

type FilterType = 'popular' | 'recent' | 'price'

interface ServiceWithIndex extends Service {
  _idx?: number
}

// Variantes de animación
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
}

const ServicesSection: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('popular')

  const sortedServices = useMemo(() => {
    const services: Service[] = [...servicesData]

    switch (filter) {
      case 'popular':
        return services.sort((a, b) => b.rating - a.rating)
      case 'recent':
        return services // since we lack timestamps, treat the original order as recency
          .map((s, i) => ({ ...s, _idx: i } as ServiceWithIndex))
          .sort((a, b) => (b._idx || 0) - (a._idx || 0))
      case 'price':
        return services.sort((a, b) => a.price - b.price)
      default:
        return services
    }
  }, [filter])

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as FilterType)
  }

  return (
    <motion.section
      className='py-6 px-2 sm:px-8 lg:px-10 w-full overflow-hidden'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className='max-w-[90rem] mx-auto'>
        <div className='flex justify-between items-center mb-10'>
          <div className='relative'>
            <select
              value={filter}
              onChange={handleFilterChange}
              className='appearance-none border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-rwa focus:border-rwa block w-full pl-4 pr-10 py-2.5'
            >
              <option value='popular'>Popular</option>
              <option value='recent'>Recent</option>
              <option value='price'>Price</option>
            </select>
            <FaAngleDown className='absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none' />
          </div>
          <button
            type='button'
            className='flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-800 rounded-lg text-sm hover:border-rwa hover:text-rwa transition-colors duration-300'
          >
            <IoFilter />
            <span>Filters</span>
          </button>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {sortedServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <div className='text-center mt-16'>
          <button
            type='button'
            className='bg-rwa text-white font-bold px-16 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg shadow-rwa/20'
          >
            All Services
          </button>
        </div>
      </div>
    </motion.section>
  )
}

export default ServicesSection
