'use client'
import { useState } from 'react'
import {
  FiUser,
  FiMail,
  FiPhone,
  FiTerminal,
  FiMonitor,
  FiSettings,
} from 'react-icons/fi'
import { HiOutlineBuildingOffice2, HiOutlineMegaphone } from 'react-icons/hi2'
import { motion } from 'framer-motion'
import Stepper from '../steper/Stepper'
import StepWrapper from '../steper/StepWrapper'
import { executives } from '../../data/executives'

interface Purpose {
  id: number
  label: string
  icon: React.ComponentType<{ className?: string }>
}

interface Executive {
  id: number
  name: string
  role: string
  image?: string
}

interface FormData {
  name: string
  email: string
  company: string
  phone: string
  purpose: string | null
  executive: string | null
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  Icon: React.ComponentType<{ className?: string }>
}

interface SelectCardProps {
  active: boolean
  onClick: () => void
  icon: React.ComponentType<{ className?: string }>
  label: string
}

interface ExecCardProps {
  exec: Executive
  active: boolean
  onClick: () => void
}

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'ghost'
  children: React.ReactNode
}

const purposes: Purpose[] = [
  { id: 1, label: 'Platform Support / Technical Issues', icon: FiTerminal },
  { id: 2, label: 'Business Proposals', icon: FiMonitor },
  { id: 3, label: 'Marketing Visibility', icon: HiOutlineMegaphone },
  { id: 4, label: 'Other', icon: FiSettings },
]

export default function ScheduleMeeting() {
  const [step, setStep] = useState<number>(0)
  const [data, setData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    purpose: null,
    executive: null,
  })

  const handleNext = () => step < 3 && setStep(step + 1)
  const handlePrev = () => step > 0 && setStep(step - 1)

  const update =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement> | string) => {
      const value = typeof e === 'string' ? e : e.target.value
      setData((prev) => ({ ...prev, [field]: value }))
    }

  return (
    <section className='mx-auto mt-6 sm:mt-10 max-w-3xl px-4 py-6 sm:py-10 min-h-screen'>
      <h1 className='text-center text-xl sm:text-2xl md:text-3xl font-semibold px-2'>
        Schedule a Meeting With Our{' '}
        <span className='text-rwa'>Executive Team</span>
      </h1>
      <p className='mt-2 text-center text-xs sm:text-sm text-gray-400 px-2'>
        As part our Partner Program, you can request 1:1 meetings with our core
        team members to align on strategy, growth opportunities, or technical
        collaboration.
      </p>

      <div className='mt-6 sm:mt-8 rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm'>
        <Stepper currentStep={step} totalSteps={4} />
        <div className='my-4 sm:my-6 h-px w-full bg-gray-200' />

        {step === 0 && (
          <StepWrapper>
            <h2 className='text-lg sm:text-xl font-semibold'>Request a Meeting</h2>
            <p className='text-xs sm:text-sm text-gray-400'>
              We value our partners' insights and are committed to fostering
              collaboration. Request a meeting with our executive team to
              discuss opportunities, challenges, or strategic initiatives.
            </p>

            <form className='mx-auto grid max-w-lg grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 w-full'>
              <Input
                label='Name'
                Icon={FiUser}
                value={data.name}
                onChange={update('name')}
              />
              <Input
                label='Email'
                Icon={FiMail}
                type='email'
                value={data.email}
                onChange={update('email')}
              />
              <Input
                label='Company'
                Icon={HiOutlineBuildingOffice2}
                value={data.company}
                onChange={update('company')}
              />
              <Input
                label='Phone Number'
                Icon={FiPhone}
                value={data.phone}
                onChange={update('phone')}
              />
            </form>
          </StepWrapper>
        )}

        {step === 1 && (
          <StepWrapper>
            <h2 className='text-lg sm:text-xl font-semibold'>
              What's the Purpose of Your Meeting?
            </h2>
            <p className='text-xs sm:text-sm text-gray-400'>
              Please select the main topic you'd like to discuss.
            </p>

            <div className='grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2'>
              {purposes.map((p) => (
                <SelectCard
                  key={p.id}
                  active={data.purpose === p.label}
                  onClick={() => update('purpose')(p.label)}
                  icon={p.icon}
                  label={p.label}
                />
              ))}
            </div>
          </StepWrapper>
        )}

        {step === 2 && (
          <StepWrapper className='items-center'>
            <h2 className='text-lg sm:text-xl font-semibold text-center'>
              Who Would You Like to Meet With?
            </h2>
            <p className='text-xs sm:text-sm text-gray-400 text-center px-2'>
              Choose the team member you'd prefer to connect with. Each of our
              executives brings unique expertise to support your goals. Select
              the profile that best aligns with your topic or interest.
            </p>

            <div className='grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
              {executives.map((ex) => (
                <ExecCard
                  key={ex.id}
                  active={data.executive === ex.name}
                  onClick={() => update('executive')(ex.name)}
                  exec={ex}
                />
              ))}
            </div>
          </StepWrapper>
        )}

        {step === 3 && (
          <StepWrapper className='items-center text-center'>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className='mb-2 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-rwa text-white text-2xl sm:text-3xl mx-auto'
            >
              ✓
            </motion.div>
            <h2 className='text-lg sm:text-xl font-semibold'>You're Almost Done</h2>
            <p className='text-xs sm:text-sm text-gray-400 px-2'>
              Please review all the information you've provided before
              submitting your request. Once submitted, a confirmation email will
              be sent, and our team will follow up shortly.
            </p>
          </StepWrapper>
        )}
      </div>

      <div className='mt-4 sm:mt-6 flex w-full justify-between flex-col sm:flex-row gap-3 sm:gap-0'>
        {step > 0 ? (
          <NavButton variant='ghost' onClick={handlePrev}>
            Previous step
          </NavButton>
        ) : (
          <span />
        )}

        {step < 3 && (
          <NavButton
            onClick={handleNext}
            disabled={
              (step === 1 && !data.purpose) || (step === 2 && !data.executive)
            }
          >
            Next step
          </NavButton>
        )}

        {step === 3 && (
          <NavButton variant='solid' onClick={() => alert('Submitted!')}>
            Submit
          </NavButton>
        )}
      </div>
    </section>
  )
}

function Input({ label, Icon, ...props }: InputProps) {
  return (
    <label className='relative flex flex-col gap-2 sm:gap-4 text-xs sm:text-sm text-rwa'>
      {label}
      <div className='h-fit w-full border border-gray-200 rounded-3xl py-2 sm:py-3 px-2 flex items-center'>
        <input
          className='w-full h-full focus:border-rwa focus:ring-rwa focus:outline-none text-sm'
          {...props}
        />
        <Icon className='pointer-events-none h-5 w-5 sm:h-6 sm:w-6 text-rwa' />
      </div>
    </label>
  )
}

function NavButton({ children, variant = 'solid', ...props }: NavButtonProps) {
  const base =
    'rounded-3xl px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-semibold transition cursor-pointer w-full sm:w-auto'
  const styles =
    variant === 'solid'
      ? 'bg-rwa text-white hover:bg-rwa/90'
      : 'text-gray-500 hover:text-rwa border border-rwa'
  return (
    <button className={`${base} ${styles}`} {...props}>
      {children}
    </button>
  )
}

function SelectCard({ active, onClick, icon: Icon, label }: SelectCardProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`flex items-center gap-2 sm:gap-3 rounded-md border p-3 sm:p-4 text-left shadow-sm transition ${
        active
          ? 'bg-rwa text-white'
          : 'border-gray-200 hover:border-rwa bg-white'
      }`}
    >
      <div
        className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full text-rwa ${
          active ? 'bg-white' : 'bg-rwa/20'
        }`}
      >
        <Icon className='h-4 w-4 sm:h-5 sm:w-5' />
      </div>
      <span className='text-xs sm:text-sm font-medium'>{label}</span>
    </button>
  )
}

function ExecCard({ exec, active, onClick }: ExecCardProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`flex flex-col items-center gap-2 rounded-lg border p-3 sm:p-4 transition ${
        active ? 'border-rwa bg-rwa/10' : 'border-gray-200 hover:border-rwa'
      }`}
    >
      {exec.image ? (
        <img
          src={exec.image}
          alt={exec.name}
          className='h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full object-cover'
        />
      ) : (
        <div className='flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-gray-100 text-gray-400'>
          <FiUser className='h-8 w-8 sm:h-10 sm:w-10' />
        </div>
      )}
      <span className='text-sm sm:text-base md:text-lg font-semibold text-center'>{exec.name}</span>
      <span className='rounded-lg bg-rwa px-2 py-0.5 text-white w-full text-xs sm:text-sm text-center'>
        {exec.role}
      </span>
    </button>
  )
}
