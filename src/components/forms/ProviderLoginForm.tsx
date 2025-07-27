import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiMail, FiLock } from 'react-icons/fi'

interface ProviderLoginFormProps {
  onSuccess?: () => void
}

const slideIn = (direction: 'left' | 'right' = 'left') => ({
  hidden: { opacity: 0, x: direction === 'left' ? -50 : 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
})

export default function ProviderLoginForm({
  onSuccess = () => {},
}: ProviderLoginFormProps) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAuthenticated', 'true')
      window.dispatchEvent(new Event('login'))
    }
    onSuccess()
  }

  return (
    <motion.div
      className='w-full md:w-auto p-4 sm:p-8 md:p-12 py-6 sm:py-8 flex flex-col justify-center items-center gap-6 sm:gap-8 rounded-xl bg-gray-900'
      initial='hidden'
      animate='visible'
      variants={slideIn('left')}
    >
      <div className='flex justify-center md:justify-start'>
        <img
          src='/rwamainlogo2.svg'
          alt='RWA Logo'
          className='h-10 sm:h-12 w-auto'
        />
      </div>

      <h2 className='text-lg sm:text-xl md:text-2xl font-semibold text-white text-center md:text-left'>
        Log in your provider account
      </h2>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 w-full max-w-md mx-auto md:mx-0'
      >
        <div className='flex flex-col gap-2'>
          <label htmlFor='email' className='text-sm font-medium text-gray-300'>
            Email Address
          </label>
          <div className='relative'>
            <input
              id='email'
              type='email'
              placeholder='alex@email.com'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full pr-12 pl-4 py-2 sm:py-3 outline outline-gray-700 bg-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-rwa focus:border-transparent focus:text-white placeholder:text-gray-200 text-sm sm:text-base'
            />
            <span className='absolute inset-y-0 right-0 flex items-center'>
              <span className='h-full flex items-center bg-white px-2 sm:px-3 rounded-r-xl'>
                <FiMail className='text-rwa text-sm sm:text-base' />
              </span>
            </span>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <label
            htmlFor='password'
            className='text-sm font-medium text-gray-300'
          >
            Password
          </label>
          <div className='relative'>
            <input
              id='password'
              type='password'
              placeholder='Enter your password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full pr-12 pl-4 py-2 sm:py-3 outline outline-gray-700 bg-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-rwa focus:border-transparent focus:text-white placeholder:text-gray-200 text-sm sm:text-base'
            />
            <span className='absolute inset-y-0 right-0 flex items-center'>
              <span className='h-full flex items-center bg-white px-2 sm:px-3 rounded-r-xl'>
                <FiLock className='text-rwa text-sm sm:text-base' />
              </span>
            </span>
          </div>
          <div className='text-right'>
            <Link
              href='/forgot-password'
              className='text-sm text-white underline'
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <button
          type='submit'
          className='w-full py-3 bg-white text-rwa font-semibold rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-lg text-sm sm:text-base'
        >
          Login Now
        </button>

        <p className='text-center text-xs sm:text-sm text-gray-400'>
          You wanna be a partner and list your services?{' '}
          <Link href='apply' className='text-rwa underline'>
            Apply now
          </Link>
        </p>

        <p className='text-center text-xs sm:text-sm text-gray-400'>
          Are you a regular user?{' '}
          <Link href='/login' className='text-rwa underline'>
            Login as user
          </Link>
        </p>
      </form>
    </motion.div>
  )
}
