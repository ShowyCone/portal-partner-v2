import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ReviewCard from './ReviewCard'
import reviewsData from '../data/reviews'

interface ReviewsSectionProps {
  partnerId: string
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ partnerId }) => {
  const [showAll, setShowAll] = useState(false)
  const filteredReviews = reviewsData.filter(
    (review) => review.partnerId === partnerId
  )
  const displayedReviews = showAll
    ? filteredReviews
    : filteredReviews.slice(0, 6)

  return (
    <section className='container mx-auto px-4 py-12'>
      <hr className='border-gray-200 mb-8' />
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='text-2xl font-semibold text-rwa mb-8'
      >
        Reviews
      </motion.h2>
      <div className='grid md:grid-cols-2 gap-8 auto-rows-fr'>
        {displayedReviews.map((rev) => (
          <ReviewCard key={rev.id} {...rev} />
        ))}
      </div>
      {!showAll && (
        <button
          onClick={() => setShowAll(true)}
          className='mt-4 text-rwa underline text-left'
        >
          View all reviews
        </button>
      )}
    </section>
  )
}

export default ReviewsSection
