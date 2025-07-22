import React from 'react'
import { motion } from 'framer-motion'
import ServiceCard from '../../ui/ServiceCard'
import servicesData from '../../../data/services'

const SuggestedServicesSection: React.FC = () => {
  const topRatedServices = [...servicesData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='py-5 px-4 md:px-10 w-full mx-auto flex flex-col gap-8 bg-[#E0E8FF40]'
    >
      {' '}
      <h2 className='text-3xl font-semibold mb-2'>
        Maybe you are <span className='text-rwa'>interested</span> on
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
        {topRatedServices.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
            variant='suggested'
          />
        ))}
      </div>
    </motion.section>
  )
}

export default SuggestedServicesSection
