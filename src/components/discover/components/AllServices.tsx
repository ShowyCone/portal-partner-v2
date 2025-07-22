'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FaChevronLeft, FaChevronRight, FaAngleDown } from 'react-icons/fa'
import { IoFilter } from 'react-icons/io5'
import ServiceCard from '../../ui/ServiceCard'
import servicesData from '../../../data/services'

const getItemsPerPage = () => {
  if (typeof window === 'undefined') return 16
  const width = window.innerWidth
  if (width < 640) return 4 // mobile
  if (width < 1024) return 8 // tablets / small desktop
  return 16 // large screens
}

const categoryTagMap = {
  DeFi: 'DeFi',
  NFTs: 'NFT',
  'Smart Contracts': 'Solidity',
  Audits: 'Security',
  'Token Creation': 'Tokens',
  'Marketing & Growth': 'Strategy',
}

const AllServices: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>('Popular')
  const [category, setCategory] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(getItemsPerPage())

  // Update items per page on resize
  useEffect(() => {
    const handleResize = () => setItemsPerPage(getItemsPerPage())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Duplicate the base list to simulate pagination, while keeping the original UUID id. We add a separate cloneIdx to guarantee unique React keys.
  const extendedServices = useMemo(() => {
    const target = 20
    const result = []
    let cloneIdx = 0
    while (result.length < target) {
      servicesData.forEach((service) => {
        if (result.length < target) {
          result.push({ ...service, cloneIdx })
          cloneIdx += 1
        }
      })
    }
    return result
  }, [])

  // Apply category filter & sorting
  const filteredServices = useMemo(() => {
    let list = [...extendedServices]

    // Category filtering
    if (category !== 'All') {
      const tagToMatch = categoryTagMap[category] || category
      list = list.filter((service) =>
        service.tag?.toLowerCase().includes(tagToMatch.toLowerCase())
      )
    }

    // Sorting
    switch (sortBy) {
      case 'Price':
        list.sort((a, b) => a.price - b.price)
        break
      case 'Recent':
        list.sort((a, b) => b.cloneIdx - a.cloneIdx)
        break
      case 'Popular':
      default:
        list.sort((a, b) => b.rating - a.rating)
        break
    }

    return list
  }, [sortBy, category, extendedServices])

  // Pagination logic
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const currentServices = filteredServices.slice(
    startIdx,
    startIdx + itemsPerPage
  )

  // Reset to first page when filters or itemsPerPage change
  useEffect(() => {
    setCurrentPage(1)
  }, [sortBy, category, itemsPerPage])

  return (
    <section className='pb-5 px-4 md:px-10 max-w-screen-xl mx-auto overflow-hidden'>
      {/* Filters & Ordering */}
      <div className='flex justify-between flex-wrap gap-4 items-center mb-8'>
        {/* Left selects */}
        <div className='flex gap-4 flex-wrap'>
          {/* Sort select */}
          <div className='relative'>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className='appearance-none border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-rwa focus:border-rwa block w-full pl-4 pr-10 py-2.5'
            >
              <option value='Popular'>Popular</option>
              <option value='Recent'>Recent</option>
              <option value='Price'>Price</option>
            </select>
            <FaAngleDown className='absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none' />
          </div>

          {/* Category select */}
          <div className='relative'>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='appearance-none border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-rwa focus:border-rwa block w-full pl-4 pr-10 py-2.5'
            >
              <option value='All'>All</option>
              <option value='DeFi'>DeFi</option>
              <option value='NFTs'>NFTs</option>
              <option value='Smart Contracts'>Smart Contracts</option>
              <option value='Audits'>Audits</option>
              <option value='Token Creation'>Token Creation</option>
              <option value='Marketing & Growth'>Marketing & Growth</option>
            </select>
            <FaAngleDown className='absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none' />
          </div>
        </div>

        {/* Right filter button */}
        <button className='flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-800 rounded-lg text-sm hover:border-rwa hover:text-rwa transition-colors duration-300'>
          <IoFilter />
          <span>Filters</span>
        </button>
      </div>

      {/* Services grid */}
      <motion.div
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
        initial='hidden'
        animate='visible'
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
        }}
      >
        {currentServices.map((service, index) => (
          <motion.div
            key={`${service.id}-${service.cloneIdx ?? index}`}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <ServiceCard
              key={`${service.id}-${service.cloneIdx ?? index}`}
              service={service}
              index={index}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      <div className='flex justify-center items-center mt-12 gap-3'>
        {/* Previous page */}
        <div
          onClick={() => currentPage > 1 && setCurrentPage((prev) => prev - 1)}
          className='rounded-full border border-gray-400 text-gray-800 p-2 cursor-pointer hover:border-rwa hover:text-rwa transition-colors'
        >
          <FaChevronLeft />
        </div>

        {/* Page numbers */}
        {Array.from({ length: totalPages }).map((_, idx) => {
          const page = idx + 1
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={
                page === currentPage
                  ? 'text-rwa underline underline-offset-4 font-semibold'
                  : 'text-gray-800 hover:text-rwa transition'
              }
            >
              {page}
            </button>
          )
        })}

        {/* Next page */}
        <div
          onClick={() =>
            currentPage < totalPages && setCurrentPage((prev) => prev + 1)
          }
          className='rounded-full border border-gray-400 text-gray-800 p-2 cursor-pointer hover:border-rwa hover:text-rwa transition-colors'
        >
          <FaChevronRight />
        </div>
      </div>
    </section>
  )
}

export default AllServices
