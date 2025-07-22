import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import partnersData from '../../../data/partners'
import servicesData from '../../../data/services'
import PartnerCard from '../../../components/ui/PartnerCard'

// Determine number of items per page based on viewport
const getItemsPerPage = () => {
  if (typeof window === 'undefined') return 12
  const width = window.innerWidth
  if (width < 640) return 4 // mobile
  if (width < 1024) return 6 // tablets / small desktop
  return 12 // desktop (3 columns x 4 rows)
}

const AllPartners = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage())

  // Adapt itemsPerPage on resize
  useEffect(() => {
    const handleResize = () => setItemsPerPage(getItemsPerPage())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Compute tags for each partner (max 3) derived from its services
  const partnersWithTags = useMemo(() => {
    return partnersData.map((partner) => {
      const relatedServices = servicesData.filter(
        (svc) => svc.partnerId === partner.id && svc.tag
      )
      const uniqueTags = [
        ...new Set(relatedServices.map((svc) => svc.tag)),
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
    <section className='pb-5 px-4 md:px-10 max-w-screen-xl mx-auto overflow-hidden'>
      <motion.div
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
        initial='hidden'
        animate='visible'
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
        }}
      >
        {currentPartners.map((partner) => (
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
        <div className='mt-12 flex items-center justify-center gap-3'>
          {/* Prev */}
          <div
            onClick={() => currentPage > 1 && setCurrentPage((p) => p - 1)}
            className='cursor-pointer rounded-full border border-gray-400 p-2 text-gray-800 transition-colors hover:border-rwa hover:text-rwa'
          >
            <FaChevronLeft />
          </div>

          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={
                  page === currentPage
                    ? 'font-semibold text-rwa underline underline-offset-4'
                    : 'text-gray-800 transition-colors hover:text-rwa'
                }
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
            className='cursor-pointer rounded-full border border-gray-400 p-2 text-gray-800 transition-colors hover:border-rwa hover:text-rwa'
          >
            <FaChevronRight />
          </div>
        </div>
      )}
    </section>
  )
}

export default AllPartners
