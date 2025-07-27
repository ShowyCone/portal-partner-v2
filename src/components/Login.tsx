// @ts-nocheck
import React from 'react'
import { motion } from 'framer-motion'
import LoginForm from './forms/LoginForm'

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

const Login = () => {
  return (
    <section className='flex flex-col md:flex-row bg-white min-h-[calc(100vh-5rem)] justify-center items-center gap-8 md:gap-12 p-4 sm:p-8 md:p-12'>
      <LoginForm />

      <motion.div
        className='w-full h-full md:w-auto p-4 sm:p-8 md:p-12 flex flex-col justify-center items-center gap-4 border-t md:border-t-0 md:border-l border-gray-200 max-w-full md:max-w-2/5'
        initial='hidden'
        animate='visible'
        variants={slideIn('right')}
      >
        <h3 className='text-center text-base sm:text-lg md:text-xl font-semibold text-gray-800'>
          Browse, explore and purchase services from RWA and{' '}
          <span className='text-rwa'>verified partners</span>
        </h3>

        <div className='h-48 sm:h-64 bg-gray-300 rounded-lg w-full' />

        <p className='text-gray-600 text-sm sm:text-base md:text-lg text-center'>
          Start by logging in to your user account.
        </p>
      </motion.div>
    </section>
  )
}

export default Login
