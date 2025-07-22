// @ts-nocheck
import { motion } from 'framer-motion'
import { AiOutlineCheck } from 'react-icons/ai'

export default function Success({ show = false, onClose }) {
  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='backdrop-blur-sm rounded-xl p-12 py-18 w-full max-w-md mx-auto text-center bg-white/20 z-10 border border-r-rwa/30 border-b-rwa/30 border-gray-400 shadow-[0_3px_10px_rgb(0,0,100,0.2)]'
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        className='flex items-center justify-center w-20 h-20 mx-auto rounded-full border-4 border-rwa/70 bg-rwa/10'
      >
        <AiOutlineCheck className='text-rwa' size={48} />
      </motion.div>
      <h3 className='text-2xl font-extrabold mt-4'>
        Your Application was <br />
        <span className='text-rwa'>Successfully Submitted</span>
      </h3>
      <p className='text-sm text-gray-700 mt-2'>
        Thank you for reaching out and submit your application to be a partner
        of RWA Inc. A member of our team will get back to you soon ready to
        reply in your business email!
      </p>
      <button
        onClick={onClose}
        className='mt-4 px-6 py-1.5 rounded-2xl bg-rwa text-white font-medium hover:opacity-90 transition'
      >
        Return To Home
      </button>
    </motion.div>
  )
}
