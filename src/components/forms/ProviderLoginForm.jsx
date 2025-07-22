import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { FiMail, FiLock } from 'react-icons/fi'

const slideIn = (direction = 'left') => ({
  hidden: { opacity: 0, x: direction === 'left' ? -50 : 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
})

export default function ProviderLoginForm({ onSuccess = () => {} }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('isAuthenticated', 'true')
    window.dispatchEvent(new Event('login'))
    onSuccess()
  }

  return (
    <motion.div
      className='w-full md:w-auto p-12 py-8 flex flex-col justify-center items-center gap-8 rounded-xl bg-gray-900 min-w-2/5'
      initial='hidden'
      animate='visible'
      variants={slideIn('left')}
    >
      <div className='flex justify-center md:justify-start'>
        <img src='/rwamainlogo2.svg' alt='RWA Logo' className='h-12 w-auto' />
      </div>

      <h2 className='text-xl md:text-2xl font-semibold text-white text-center md:text-left'>
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
              className='w-full pr-12 pl-4 py-2 outline outline-gray-700 bg-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-rwa focus:border-transparent focus:text-white placeholder:text-gray-200'
            />
            <span className='absolute inset-y-0 right-0 flex items-center'>
              <span className='h-full flex items-center bg-white px-3 rounded-r-xl'>
                <FiMail className='text-rwa' />
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
              className='w-full pr-12 pl-4 py-2 outline outline-gray-700 bg-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-rwa focus:border-transparent focus:text-white placeholder:text-gray-200'
            />
            <span className='absolute inset-y-0 right-0 flex items-center'>
              <span className='h-full flex items-center bg-white px-3 rounded-r-xl'>
                <FiLock className='text-rwa' />
              </span>
            </span>
          </div>
          <div className='text-right'>
            <Link className='text-sm text-white underline'>
              Forgot Password?
            </Link>
          </div>
        </div>

        <button
          type='submit'
          className='w-full py-3 bg-white text-rwa font-semibold rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-lg'
        >
          Login Now
        </button>

        <p className='text-center text-sm text-gray-400'>
          You wanna be a partner and list your services?{' '}
          <Link to='/apply' className='text-rwa underline'>
            Apply now
          </Link>
        </p>

        <p className='text-center text-sm text-gray-400'>
          Are you a regular user?{' '}
          <Link to='/login' className='text-rwa underline'>
            Login as user
          </Link>
        </p>
      </form>
    </motion.div>
  )
}
