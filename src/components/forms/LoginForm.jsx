import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { FiMail, FiLock } from 'react-icons/fi'

const slideIn = (direction = 'left') => ({
  hidden: {
    opacity: 0,
    x: direction === 'left' ? -50 : 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
})

export default function LoginForm({
  showApplyNotice = false,
  onSuccess = () => {},
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const randomMiddle = Math.random()
      .toString(36)
      .substring(2, 12)
      .toUpperCase()
    const addressNumber = `0xd123${randomMiddle}23FG2`

    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('addressNumber', addressNumber)

    window.dispatchEvent(new Event('login'))

    onSuccess()
  }

  return (
    <motion.div
      className={`w-full md:w-auto p-12 py-6 flex flex-col justify-center items-center gap-8 rounded-xl min-w-2/5 ${
        showApplyNotice ? '' : 'border border-[#E0E0E0]'
      }`}
      initial='hidden'
      animate='visible'
      variants={slideIn('left')}
    >
      <div className='flex justify-center md:justify-start'>
        <img src='/rwamainlogo.svg' alt='RWA Logo' className='h-12 w-auto' />
      </div>

      <h2 className='text-xl md:text-2xl font-semibold text-rwa text-center md:text-left'>
        Log in your user account
      </h2>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-3 w-full max-w-md mx-auto md:mx-0'
      >
        <div className='flex flex-col gap-2'>
          <label htmlFor='email' className='text-sm font-medium text-gray-700'>
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
              className='w-full pr-12 pl-4 py-2 border border-gray-100 bg-[#F6FAFF] rounded-xl focus:outline-none focus:ring-2 focus:ring-rwa focus:border-transparent'
            />
            <span className='absolute inset-y-0 right-0 flex items-center'>
              <span className='h-full flex items-center bg-rwa p-3.5 rounded-xl'>
                <FiMail className='text-white' />
              </span>
            </span>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <label
            htmlFor='password'
            className='text-sm font-medium text-gray-700'
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
              className='w-full pr-12 pl-4 py-2 border border-gray-100 bg-[#F6FAFF] rounded-xl focus:outline-none focus:ring-2 focus:ring-rwa focus:border-transparent'
            />
            <span className='absolute inset-y-0 right-0 flex items-center'>
              <span className='h-full flex items-center bg-rwa p-3.5 rounded-xl'>
                <FiLock className='text-white' />
              </span>
            </span>
          </div>
          <div className='text-right mt-1'>
            <Link className='text-sm text-rwa underline'>Forgot Password?</Link>
          </div>
        </div>

        <button
          type='submit'
          className='w-full py-3 bg-rwa text-white font-semibold rounded hover:opacity-90 transition-opacity cursor-pointer shadow-lg'
        >
          Login Now
        </button>

        <div className='flex items-center gap-4'>
          <hr className='flex-grow border-gray-300' />
          <span className='text-gray-500 text-sm'>or</span>
          <hr className='flex-grow border-gray-300' />
        </div>

        <Link
          to=''
          className='w-full py-3 border-2 border-rwa text-rwa font-semibold rounded text-center hover:bg-rwa hover:text-white transition-colors cursor-pointer'
        >
          Signup Now
        </Link>

        {showApplyNotice ? (
          <p className='text-center text-xs text-red-500 mt-2'>
            You need a regular user account to apply as partner
          </p>
        ) : (
          <p className='text-center text-sm text-gray-600'>
            Are you a partner?{' '}
            <Link to='/apply' className='text-rwa underline'>
              Login as provider.
            </Link>
          </p>
        )}
      </form>
    </motion.div>
  )
}
