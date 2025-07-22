import React, { useState } from 'react'
import { motion } from 'framer-motion'
import LoginForm from '../../components/forms/LoginForm'
import Stepper from '../../components/steper/Stepper'
import ProviderFormSteps from '../../components/forms/ProviderFormSteps'
import Success from '../../components/Success'
import { useNavigate } from 'react-router'

function LogoSliderRow({ reverse = false }) {
  const visibleLogos = Array.from({ length: 4 }).map(() => '/logoipsum.svg')
  const logos = [...visibleLogos, ...visibleLogos]

  return (
    <div className='relative w-full overflow-hidden px-8'>
      <div className='absolute inset-y-0 left-0 h-full w-24 bg-gradient-to-r from-rwa to-rwa/0 pointer-events-none z-10' />
      <div className='absolute inset-y-0 right-0 h-full w-24 bg-gradient-to-l from-rwa to-rwa/0 pointer-events-none z-10' />

      <motion.div
        className='flex gap-8'
        animate={{ x: reverse ? ['0%', '100%'] : ['0%', '-100%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 25,
            ease: 'linear',
          },
        }}
      >
        {logos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt='partner logo'
            className='shrink-0 h-12 opacity-95 bg-white border-2 border-gray-300 rounded-lg p-2'
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
  const [formData, setFormData] = useState({})
  const [file, setFile] = useState(null)
  const [selectedTags, setSelectedTags] = useState([])
  const [showSuccess, setShowSuccess] = useState(false)
  const navigate = useNavigate()
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
    <section className='flex p-12'>
      <div className='w-3/5 bg-rwa relative overflow-hidden p-8 border border-[#E0E0E0] rounded-lg flex flex-col justify-between'>
        <img src='/isotipo.webp' alt='isotipo' className='w-25' />
        <div>
          <div className='mt-12 space-y-4 pr-30'>
            <p className='text-white text-sm font-medium'>
              Apply to be a partner with RWA inc
            </p>
            <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-white'>
              Become part of a +250 partner network and start listing your
              services
            </h1>
          </div>
          <div className='mt-12 space-y-6'>
            <LogoSliderRow />
            <LogoSliderRow reverse />
          </div>
        </div>
      </div>

      <div className='w-2/5 p-6 overflow-y-auto space-y-6 border border-[#E0E0E0] rounded-lg relative'>
        {!isLoggedIn ? (
          <LoginForm showApplyNotice onSuccess={handleLoginSuccess} />
        ) : showSuccess ? (
          <div className='flex items-center justify-center h-full'>
            <Success show={true} onClose={() => navigate('/')} />
            <div className='absolute top-6 right-2 w-25 h-25 bg-rwa rounded-full' />
            <div className='absolute top-18 left-20 w-10 h-10 bg-rwa rounded-full' />
            <div className='absolute bottom-8 left-2 w-25 h-25 bg-rwa rounded-full' />
            <div className='absolute bottom-16 right-10 w-16 h-16 bg-rwa rounded-full' />
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
              <div className='flex flex-col items-center w-full gap-3 mt-4 px-12'>
                <button
                  onClick={handleNext}
                  className='w-full py-2 bg-rwa text-white font-semibold rounded-xl hover:opacity-90 transition-opacity'
                >
                  Next
                </button>
                {currentStep > 0 && (
                  <button
                    onClick={handleBack}
                    className='w-full py-2 bg-white text-rwa font-semibold rounded-xl hover:bg-rwa hover:text-white transition-colors shadow-[0_3px_10px_rgb(0,0,0,0.2)]'
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
