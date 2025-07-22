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
    className='flex flex-col md:flex-row gap-4 p-6 bg-white border rounded-lg h-full'
  >
    <div className='flex flex-col items-center min-w-[80px]'>
      <div className='w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center'>
        <FaUser className='text-gray-400 text-3xl' />
      </div>
      <span className='mt-2 text-sm font-medium text-rwa'>{reviewer}</span>
    </div>
    <div className='flex-1 flex flex-col'>
      <FaQuoteLeft className='text-3xl text-rwa' />
      <div className='mt-2 flex items-center gap-2 text-sm'>
        <span className='font-semibold'>
          Service&nbsp;–&nbsp;<span className='text-rwa'>{serviceName}</span>
        </span>
        <div className='flex items-center gap-1'>
          <FaStar className='text-rwa' />
          <span className='text-xs font-semibold'>
            {rating.toFixed ? rating.toFixed(1) : rating}
          </span>
        </div>
      </div>
      <p className='mt-2 text-sm text-gray-600'>{text}</p>
    </div>
  </motion.article>
)

export default ReviewCard
