import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa'
import Image from 'next/image'

const Footer: React.FC = () => {
  return (
    <footer className="relative text-white overflow-hidden px-2 sm:px-8 lg:px-10">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-0 bg-blue-900/20 backdrop-blur-md"></div>
        <Image
          src="/overlayimage.webp"
          alt="Background overlay"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div className="relative z-10 max-w-[90rem] mx-auto py-26 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        <div className="space-y-4">
          <Image
            src="/rwamainlogo2.svg"
            alt="RWA Logo"
            width={112}
            height={40}
            className="w-28 h-auto"
            priority
          />
          <p className="text-white/80">
            Discover, collaborate, and grow through trusted partnerships waiting for you.
          </p>
          <div className="flex space-x-4 mt-4">
            <FaFacebookF className="hover:text-blue-400 transition" />
            <FaTwitter className="hover:text-blue-400 transition" />
            <FaInstagram className="hover:text-pink-400 transition" />
            <FaPinterestP className="hover:text-red-400 transition" />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-rwa font-semibold">Help</h3>
          <p className="hover:text-gray-300 cursor-pointer">Support Center</p>
          <p className="hover:text-gray-300 cursor-pointer">Payment Gateway</p>
          <p className="hover:text-gray-300 cursor-pointer">FAQ</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-rwa font-semibold">RWA Inc</h3>
          <p className="hover:text-gray-300 cursor-pointer">About us</p>
          <p className="hover:text-gray-300 cursor-pointer">SRWA</p>
          <p className="hover:text-gray-300 cursor-pointer">Media Kit</p>
          <p className="hover:text-gray-300 cursor-pointer">Team</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-rwa font-semibold">Partners</h3>
          <p className="hover:text-gray-300 cursor-pointer">Be a provider, apply now</p>
          <p className="hover:text-gray-300 cursor-pointer">List of Partners</p>
          <p className="hover:text-gray-300 cursor-pointer">Find a Partner</p>
        </div>
      </div>
      <div className="relative z-10 border-t border-rwa mx-12">
        <p className="text-center py-6 text-xs text-gray-400">
          © 2025 <span className="text-rwa">RWA Inc.</span> All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
