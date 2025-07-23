import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface StepWrapperProps {
  children: ReactNode
  className?: string
}

const variants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

export default function StepWrapper({ children, className = '' }: StepWrapperProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className={`flex flex-col gap-4 py-2 rounded-xl ${className}`}
    >
      {children}
    </motion.div>
  )
}