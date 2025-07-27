import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
} from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className='relative text-white overflow-hidden px-4 sm:px-8 lg:px-10'>
      <div className='absolute inset-0 z-0'>
        <div className='absolute inset-0 z-0 bg-blue-900/20 backdrop-blur-md'></div>
        <Image
          src='/backgroundbanner.webp'
          alt='Background overlay'
          layout='fill'
          objectFit='cover'
          priority
        />
      </div>
      <div className='relative z-10 max-w-[90rem] mx-auto py-12 sm:py-16 lg:py-26 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-sm'>
        <div className='space-y-4 sm:space-y-6 text-center sm:text-left'>
          <Image
            src='/rwamainlogo2.svg'
            alt='RWA Logo'
            width={112}
            height={40}
            className='w-24 sm:w-28 h-auto mx-auto sm:mx-0'
            priority
          />
          <p className='text-white/80 text-sm sm:text-base leading-relaxed max-w-xs mx-auto sm:mx-0'>
            Discover, collaborate, and grow through trusted partnerships waiting
            for you.
          </p>
          <div className='flex justify-center sm:justify-start space-x-4 sm:space-x-6 mt-4 sm:mt-6'>
            <FaFacebookF className='w-5 h-5 sm:w-6 sm:h-6 hover:text-blue-400 transition cursor-pointer' />
            <FaTwitter className='w-5 h-5 sm:w-6 sm:h-6 hover:text-blue-400 transition cursor-pointer' />
            <FaInstagram className='w-5 h-5 sm:w-6 sm:h-6 hover:text-pink-400 transition cursor-pointer' />
            <FaPinterestP className='w-5 h-5 sm:w-6 sm:h-6 hover:text-red-400 transition cursor-pointer' />
          </div>
        </div>
        <div className='space-y-3 sm:space-y-4 text-center sm:text-left'>
          <h3 className='text-rwa font-semibold text-base sm:text-lg'>Help</h3>
          <div className='space-y-2 sm:space-y-3'>
            <p className='hover:text-gray-300 cursor-pointer transition-colors duration-200'>
              Support Center
            </p>
            <p className='hover:text-gray-300 cursor-pointer transition-colors duration-200'>
              Payment Gateway
            </p>
            <p className='hover:text-gray-300 cursor-pointer transition-colors duration-200'>
              FAQ
            </p>
          </div>
        </div>
        <div className='space-y-3 sm:space-y-4 text-center sm:text-left'>
          <h3 className='text-rwa font-semibold text-base sm:text-lg'>
            RWA Inc
          </h3>
          <div className='space-y-2 sm:space-y-3'>
            <p className='hover:text-gray-300 cursor-pointer transition-colors duration-200'>
              About us
            </p>
            <p className='hover:text-gray-300 cursor-pointer transition-colors duration-200'>
              SRWA
            </p>
            <p className='hover:text-gray-300 cursor-pointer transition-colors duration-200'>
              Media Kit
            </p>
            <p className='hover:text-gray-300 cursor-pointer transition-colors duration-200'>
              Team
            </p>
          </div>
        </div>
        <div className='space-y-3 sm:space-y-4 text-center sm:text-left'>
          <h3 className='text-rwa font-semibold text-base sm:text-lg'>
            Partners
          </h3>
          <div className='space-y-2 sm:space-y-3'>
            <Link
              href='/provider/apply'
              className='hover:text-gray-300 cursor-pointer block transition-colors duration-200'
            >
              Be a provider, apply now
            </Link>
            <p className='hover:text-gray-300 cursor-pointer transition-colors duration-200'>
              List of Partners
            </p>
            <p className='hover:text-gray-300 cursor-pointer transition-colors duration-200'>
              Find a Partner
            </p>
          </div>
        </div>
      </div>
      <div className='relative z-10 border-t border-rwa/30 mx-4 sm:mx-8 lg:mx-12 mt-8 sm:mt-12'>
        <p className='text-center py-4 sm:py-6 text-xs sm:text-sm text-gray-400'>
          © 2025 <span className='text-rwa font-medium'>RWA Inc.</span> All
          rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
