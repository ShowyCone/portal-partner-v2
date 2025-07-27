'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import LoginForm from '../forms/LoginForm'
import Stepper from '../steper/Stepper'
import ProviderFormSteps from '../forms/ProviderFormSteps'
import Success from '../Success'
import { useRouter } from 'next/navigation'

interface LogoSliderRowProps {
  reverse?: boolean
}

function LogoSliderRow({ reverse = false }: LogoSliderRowProps) {
  const visibleLogos = Array.from({ length: 6 }).map(() => '/logoipsum.svg')
  // Triplicamos los logos para asegurar un scroll infinito suave
  const logos = [...visibleLogos, ...visibleLogos, ...visibleLogos]

  return (
    <div className='relative w-full overflow-hidden px-4 sm:px-8'>
      <div className='absolute inset-y-0 left-0 h-full w-16 sm:w-24 bg-gradient-to-r from-rwa to-rwa/0 pointer-events-none z-10' />
      <div className='absolute inset-y-0 right-0 h-full w-16 sm:w-24 bg-gradient-to-l from-rwa to-rwa/0 pointer-events-none z-10' />

      <motion.div
        className='flex gap-4 sm:gap-8'
        animate={{
          x: reverse ? ['-50%', '0%'] : ['0%', '-50%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear',
          },
        }}
        style={{
          width: 'max-content',
        }}
      >
        {logos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt='partner logo'
            className='shrink-0 h-8 sm:h-12 opacity-95 bg-white border-2 border-gray-300 rounded-lg p-1 sm:p-2'
            style={{ minWidth: '32px' }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default function Apply() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const totalSteps = 4
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [file, setFile] = useState<File | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()
  const lastUpdated = '16/06/2025'

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowSuccess(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  return (
    <section className='flex flex-col lg:flex-row p-4 sm:p-8 lg:p-12 gap-4 lg:gap-0'>
      <div className='w-full lg:w-3/5 bg-rwa relative overflow-hidden p-6 sm:p-8 border border-[#E0E0E0] rounded-lg flex flex-col justify-between min-h-[300px] lg:min-h-auto'>
        <img src='/isotipo.webp' alt='isotipo' className='w-20 sm:w-25' />
        <div>
          <div className='mt-8 sm:mt-12 space-y-4 pr-0 sm:pr-12 lg:pr-30'>
            <p className='text-white text-sm font-medium'>
              Apply to be a partner with RWA inc
            </p>
            <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white'>
              Become part of a +250 partner network and start listing your
              services
            </h1>
          </div>
          <div className='mt-8 sm:mt-12 space-y-4 sm:space-y-6'>
            <LogoSliderRow />
            <LogoSliderRow reverse />
          </div>
        </div>
      </div>

      <div className='w-full lg:w-2/5 p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 border border-[#E0E0E0] rounded-lg relative max-h-[600px] lg:max-h-none'>
        {!isLoggedIn ? (
          <LoginForm showApplyNotice onSuccess={handleLoginSuccess} />
        ) : showSuccess ? (
          <div className='flex items-center justify-center h-full min-h-[400px]'>
            <Success show={true} onClose={() => router.push('/')} />
            <div className='absolute top-6 right-2 w-16 sm:w-25 h-16 sm:h-25 bg-rwa rounded-full' />
            <div className='absolute top-18 left-20 w-6 sm:w-10 h-6 sm:h-10 bg-rwa rounded-full' />
            <div className='absolute bottom-8 left-2 w-16 sm:w-25 h-16 sm:h-25 bg-rwa rounded-full' />
            <div className='absolute bottom-16 right-10 w-10 sm:w-16 h-10 sm:h-16 bg-rwa rounded-full' />
          </div>
        ) : (
          <>
            <Stepper currentStep={currentStep} totalSteps={totalSteps} />
            <hr className='my-4 border-gray-200' />
            <ProviderFormSteps
              currentStep={currentStep}
              formData={formData}
              setFormData={setFormData}
              file={file}
              setFile={setFile}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              lastUpdated={lastUpdated}
              onNext={handleNext}
              onBack={handleBack}
            />
            {currentStep < totalSteps - 1 && (
              <div className='flex flex-col items-center w-full gap-3 mt-4 px-4 sm:px-8 lg:px-12'>
                <button
                  onClick={handleNext}
                  className='w-full py-3 bg-rwa text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-sm sm:text-base'
                >
                  Next
                </button>
                {currentStep > 0 && (
                  <button
                    onClick={handleBack}
                    className='w-full py-3 bg-white text-rwa font-semibold rounded-xl hover:bg-rwa hover:text-white transition-colors shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-sm sm:text-base'
                  >
                    Back
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
