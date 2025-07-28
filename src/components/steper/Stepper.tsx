import React from 'react'

interface StepperProps {
  currentStep?: number
  totalSteps?: number
  stepLabels?: string[]
}

const Stepper: React.FC<StepperProps> = ({
  currentStep = 0,
  totalSteps = 1,
  stepLabels = [],
}) => {
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='flex items-center w-full'>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isCompleted = index < currentStep
          return (
            <React.Fragment key={index}>
              <div
                className={`relative z-10 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full font-bold text-xs sm:text-sm ${
                  isCompleted
                    ? 'bg-rwa text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {index + 1}
              </div>
              {index !== totalSteps - 1 && (
                <div
                  className={`flex-1 h-0.5 sm:h-1 mx-1 sm:mx-2 rounded-full ${
                    index < currentStep ? 'bg-rwa' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default Stepper
