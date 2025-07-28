// @ts-nocheck
import React from 'react'
import { FaUser, FaStar, FaQuoteLeft } from 'react-icons/fa'
import { motion } from 'framer-motion'

const ReviewCard = ({ reviewer, serviceName, rating, text }) => (
  <motion.article
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className='flex flex-col sm:flex-row gap-3 sm:gap-4 p-4 sm:p-6 bg-white border rounded-lg h-full'
  >
    <div className='flex flex-row sm:flex-col items-center sm:items-center gap-3 sm:gap-0 sm:min-w-[80px]'>
      <div className='w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0'>
        <FaUser className='text-gray-400 text-xl sm:text-3xl' />
      </div>
      <span className='mt-0 sm:mt-2 text-sm font-medium text-rwa'>
        {reviewer}
      </span>
    </div>
    <div className='flex-1 flex flex-col'>
      <FaQuoteLeft className='text-2xl sm:text-3xl text-rwa' />
      <div className='mt-2 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm'>
        <span className='font-semibold'>
          Service&nbsp;–&nbsp;<span className='text-rwa'>{serviceName}</span>
        </span>
        <div className='flex items-center gap-1'>
          <FaStar className='text-rwa text-xs sm:text-sm' />
          <span className='text-xs font-semibold'>
            {rating.toFixed ? rating.toFixed(1) : rating}
          </span>
        </div>
      </div>
      <p className='mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed'>
        {text}
      </p>
    </div>
  </motion.article>
)

export default ReviewCard
