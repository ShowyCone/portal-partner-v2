'use client'
import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaUserCircle, FaAngleDown } from 'react-icons/fa'

const Header: React.FC = () => {
  const [logged, setLogged] = useState<boolean>(false)

  useEffect(() => {
    const handler = () => {
      if (typeof window !== 'undefined') {
        setLogged(localStorage.getItem('isAuthenticated') === 'true')
      }
    }
    handler()
    window.addEventListener('login', handler)
    window.addEventListener('logout', handler)
    return () => {
      window.removeEventListener('login', handler)
      window.removeEventListener('logout', handler)
    }
  }, [])

  return (
    <motion.header
      className='w-full min-h-20 px-6 flex justify-between items-center border-b-1 border-black/10'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className='flex items-center space-x-8'>
        <Link href='/' passHref legacyBehavior>
          <a>
            <img
              src='/rwamainlogo.svg'
              alt='Logo'
              className='h-8 object-contain'
            />
          </a>
        </Link>

        <nav className='flex items-center space-x-6'>
          <NavItem href='/' label='Home' />
          <NavItem href='/discover' label='Discover' />
        </nav>
      </div>

      <div className='flex items-center space-x-4'>
        {logged ? (
          <AddressIndicator />
        ) : (
          <>
            <Link href='/login' passHref legacyBehavior>
              <a className='text-gray-700 hover:text-rwa cursor-pointer transition-colors duration-200 font-medium'>
                Sign In
              </a>
            </Link>
            <Link href='/login' passHref legacyBehavior>
              <a className='bg-rwa text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium'>
                Sign Up
              </a>
            </Link>
          </>
        )}
      </div>
    </motion.header>
  )
}

type NavItemProps = {
  href: string
  label: string
}

const NavItem: React.FC<NavItemProps> = ({ href, label }) => {
  const isActive = typeof window !== 'undefined' ? window.location.pathname === href : false
  return (
    <Link href={href} passHref legacyBehavior>
      <a
        className={`cursor-pointer transition-colors duration-200 font-medium ${
          isActive ? 'text-rwa' : 'text-gray-700 hover:text-rwa'
        }`}
      >
        {label}
      </a>
    </Link>
  )
}

const AddressIndicator: React.FC = () => {
  const [fullAddress, setFullAddress] = useState<string>('0xd123A4B5C6D7E8F923FG2')
  const [expanded, setExpanded] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const address = localStorage.getItem('addressNumber')
      if (address) setFullAddress(address)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAuthenticated')
      window.dispatchEvent(new Event('logout'))
    }
    setMenuOpen(false)
    router.push('/login')
  }

  useEffect(() => {
    const refresh = () => {
      setExpanded(false)
      setMenuOpen(false)
    }
    window.addEventListener('login', refresh)
    window.addEventListener('logout', refresh)
    return () => {
      window.removeEventListener('login', refresh)
      window.removeEventListener('logout', refresh)
    }
  }, [])

  const truncateAddress = (addr: string) => `${addr.slice(0, 7)}...${addr.slice(-5)}`

  return (
    <div className='flex items-center gap-2'>
      <motion.button
        onClick={() => setExpanded(!expanded)}
        className='flex items-center gap-2 bg-gradient-to-r from-rwa to-rwa/80 text-white px-4 py-2 rounded-md overflow-hidden focus:outline-none'
        initial={{ width: 'auto' }}
        animate={{
          paddingRight: expanded ? '1.5rem' : '1rem',
          transition: { type: 'spring', stiffness: 200, damping: 20 },
        }}
      >
        <span className='whitespace-nowrap font-mono text-sm'>
          {expanded ? fullAddress : truncateAddress(fullAddress)}
        </span>
      </motion.button>

      <div className='relative' ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='flex items-center gap-2 p-2 bg-white border border-rwa rounded-md hover:bg-gray-50 text-rwa cursor-pointer'
        >
          <FaAngleDown
            size={18}
            className={`text-rwa transition-transform ${menuOpen ? 'rotate-180' : ''}`}
          />
          <FaUserCircle size={18} className='text-rwa' />
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className='absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-50 p-2'
            >
              <li>
                <Link href='/cart' passHref legacyBehavior>
                  <a className='block px-4 py-2 text-gray-700 hover:bg-gray-100' onClick={() => setMenuOpen(false)}>
                    Cart
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/profile' passHref legacyBehavior>
                  <a className='block px-4 py-2 text-gray-700 hover:bg-gray-100' onClick={() => setMenuOpen(false)}>
                    Profile
                  </a>
                </Link>
              </li>
              <li className='border-t border-gray-200 my-1' />
              <li>
                <button
                  className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                  onClick={() => {
                    setMenuOpen(false)
                  }}
                >
                  Disconnect Wallet
                </button>
              </li>
              <li>
                <Link href='/support' passHref legacyBehavior>
                  <a className='block px-4 py-2 text-gray-700 hover:bg-gray-100' onClick={() => setMenuOpen(false)}>
                    Support Center
                  </a>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className='block w-full text-left px-4 py-2 text-rwa hover:bg-gray-100 font-medium'
                >
                  Log Out
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Header
