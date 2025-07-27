import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';

interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  stats: {
    services: number;
  };
}

interface PartnerCardProps {
  partner: Partner;
  tags?: string[];
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner, tags = [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='flex flex-col gap-3 sm:gap-4 rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm'
    >
      {/* Top section: logo, name, services count */}
      <div className='flex items-center justify-between gap-2 sm:gap-3'>
        <img
          src={partner.logo}
          alt={partner.name}
          className='h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 object-contain'
        />
        <h3 className='flex-1 text-base sm:text-lg font-semibold text-gray-800 truncate'>
          {partner.name}
        </h3>
        <span className='text-xs sm:text-sm font-semibold text-rwa whitespace-nowrap'>
          {partner.stats.services} services
        </span>
      </div>

      {/* Separator */}
      <hr className='border-gray-200' />

      {/* Description + call-to-action */}
      <p className='text-xs sm:text-sm text-gray-700 line-clamp-3'>{partner.description}</p>
      <div className='flex justify-end'>
        <Link
          href={`/partner/${partner.id}`}
          className='rounded-md border border-rwa px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-rwa transition-colors hover:bg-rwa hover:text-white'
        >
          View Services
        </Link>
      </div>

      {/* Separator */}
      <hr className='border-gray-200' />

      {/* Website + tags */}
      <div className='flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-2'>
        <a
          href={partner.website}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-1 text-xs sm:text-sm text-rwa underline underline-offset-2 transition-colors hover:text-rwa/80 truncate'
        >
          {new URL(partner.website).hostname}
          <FaExternalLinkAlt className='h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0' />
        </a>
        <div className='flex flex-wrap gap-1.5 sm:gap-2'>
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className='rounded-md bg-rwa px-1.5 sm:px-2 py-0.5 text-xs text-white'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PartnerCard;