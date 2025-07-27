'use client'
import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import partnersData, { type Partner } from '../../data/partners'
import servicesData, { type Service } from '../../data/services'
import PartnerCard from '../ui/PartnerCard'

// Determine number of items per page based on viewport
const getItemsPerPage = (): number => {
  if (typeof window === 'undefined') return 12
  const width = window.innerWidth
  if (width < 640) return 4 // mobile
  if (width < 1024) return 6 // tablets / small desktop
  return 12 // desktop (3 columns x 4 rows)
}

const AllPartners = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(getItemsPerPage())

  // Adapt itemsPerPage on resize
  useEffect(() => {
    const handleResize = () => setItemsPerPage(getItemsPerPage())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Compute tags for each partner (max 3) derived from its services
  const partnersWithTags = useMemo(() => {
    return partnersData.map((partner: Partner) => {
      const relatedServices = servicesData.filter(
        (svc: Service) => svc.partnerId === partner.id && svc.tag
      )
      const uniqueTags = [
        ...new Set(relatedServices.map((svc: Service) => svc.tag)),
      ].slice(0, 3)
      return { ...partner, tags: uniqueTags }
    })
  }, [])

  // Pagination logic
  const totalPages = Math.ceil(partnersWithTags.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const currentPartners = partnersWithTags.slice(
    startIdx,
    startIdx + itemsPerPage
  )

  // Reset page when itemsPerPage changes
  useEffect(() => setCurrentPage(1), [itemsPerPage])

  return (
    <section className='pb-10 sm:pb-15 px-4 md:px-10 max-w-screen-xl mx-auto overflow-hidden'>
      <motion.div
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
        initial='hidden'
        animate='visible'
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
        }}
      >
        {currentPartners.map((partner: Partner & { tags: string[] }) => (
          <motion.div
            key={partner.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <PartnerCard partner={partner} tags={partner.tags} />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='mt-8 sm:mt-12 flex items-center justify-center gap-2 sm:gap-3'>
          {/* Prev */}
          <div
            onClick={() => currentPage > 1 && setCurrentPage((p) => p - 1)}
            className='cursor-pointer rounded-full border border-gray-400 p-1.5 sm:p-2 text-gray-800 transition-colors hover:border-rwa hover:text-rwa'
          >
            <FaChevronLeft className='text-sm sm:text-base' />
          </div>

          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`text-sm sm:text-base px-2 py-1 ${
                  page === currentPage
                    ? 'font-semibold text-rwa underline underline-offset-4'
                    : 'text-gray-800 transition-colors hover:text-rwa'
                }`}
              >
                {page}
              </button>
            )
          })}

          {/* Next */}
          <div
            onClick={() =>
              currentPage < totalPages && setCurrentPage((p) => p + 1)
            }
            className='cursor-pointer rounded-full border border-gray-400 p-1.5 sm:p-2 text-gray-800 transition-colors hover:border-rwa hover:text-rwa'
          >
            <FaChevronRight className='text-sm sm:text-base' />
          </div>
        </div>
      )}
    </section>
  )
}

export default AllPartners
