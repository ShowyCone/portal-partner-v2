import React from 'react'
import { motion } from 'framer-motion'
import ProviderLoginForm from '../../components/forms/ProviderLoginForm'

const slideIn = (direction = 'right') => ({
  hidden: { opacity: 0, x: direction === 'left' ? -50 : 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
})

const ProviderLogin = () => (
  <section className='flex flex-col md:flex-row bg-white min-h-[calc(100vh-5rem)] justify-center items-center gap-12 p-12'>
    <ProviderLoginForm />

    <div className='hidden md:block h-full w-px bg-gray-200' />

    <motion.div
      className='w-full h-full md:w-auto p-8 flex flex-col justify-center items-center gap-6 max-w-2/5'
      initial='hidden'
      animate='visible'
      variants={slideIn('right')}
    >
      <h3 className='text-center text-lg md:text-xl font-semibold text-gray-800'>
        Manage your profile, publish your services, and connect with clients
        directly through the{' '}
        <span className='text-rwa'>RWA Partner Platform</span>
      </h3>

      <div className='h-72 w-full bg-gray-300 rounded-lg' />

      <p className='text-gray-600 text-lg text-center'>
        Log in to start managing{' '}
        <span className='text-rwa'>your offerings</span>.
      </p>
    </motion.div>
  </section>
)

export default ProviderLogin
