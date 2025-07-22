import { motion } from 'framer-motion'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { Link } from 'react-router'

const PartnerCard = ({ partner, tags = [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm'
    >
      {/* Top section: logo, name, services count */}
      <div className='flex items-center justify-between gap-3'>
        <img
          src={partner.logo}
          alt={partner.name}
          className='h-10 w-10 flex-shrink-0 object-contain'
        />
        <h3 className='flex-1 text-lg font-semibold text-gray-800'>
          {partner.name}
        </h3>
        <span className='text-sm font-semibold text-rwa'>
          {partner.stats.services} services
        </span>
      </div>

      {/* Separator */}
      <hr className='border-gray-200' />

      {/* Description + call-to-action */}
      <p className='text-sm text-gray-700'>{partner.description}</p>
      <div className='flex justify-end'>
        <Link
          to={`/partner/${partner.id}`}
          className='rounded-md border border-rwa px-4 py-1.5 text-sm font-medium text-rwa transition-colors hover:bg-rwa hover:text-white'
        >
          View Services
        </Link>
      </div>

      {/* Separator */}
      <hr className='border-gray-200' />

      {/* Website + tags */}
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <a
          href={partner.website}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-1 text-sm text-rwa underline underline-offset-2 transition-colors hover:text-rwa/80'
        >
          {new URL(partner.website).hostname}
          <FaExternalLinkAlt className='h-3 w-3' />
        </a>
        <div className='flex flex-wrap gap-2'>
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className='rounded-md bg-rwa px-2 py-0.5 text-xs text-white'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default PartnerCard
