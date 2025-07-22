import { motion } from 'framer-motion'

const fadeIn = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
}

export default function AuthBox({ children, footerText = '' }) {
  return (
    <motion.div
      variants={fadeIn}
      initial='hidden'
      animate='visible'
      className='bg-white/70 backdrop-blur-md rounded-xl shadow-lg p-8 w-full max-w-md space-y-4'
    >
      {children}
      {footerText && (
        <p className='text-center text-xs text-red-500'>{footerText}</p>
      )}
    </motion.div>
  )
}
