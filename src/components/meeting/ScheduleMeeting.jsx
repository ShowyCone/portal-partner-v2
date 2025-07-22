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
import Stepper from '../../components/steper/Stepper'
import StepWrapper from '../../components/steper/StepWrapper'
import { executives } from '../../data/executives'

const purposes = [
  { id: 1, label: 'Platform Support / Technical Issues', icon: FiTerminal },
  { id: 2, label: 'Business Proposals', icon: FiMonitor },
  { id: 3, label: 'Marketing Visibility', icon: HiOutlineMegaphone },
  { id: 4, label: 'Other', icon: FiSettings },
]

export default function ScheduleMeeting() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    purpose: null,
    executive: null,
  })

  const handleNext = () => step < 3 && setStep(step + 1)
  const handlePrev = () => step > 0 && setStep(step - 1)

  const update = (field) => (e) =>
    setData({ ...data, [field]: e.target ? e.target.value : e })

  return (
    <section className='mx-auto mt-10 max-w-3xl px-4 py-10 min-h-screen'>
      <h1 className='text-center text-3xl font-semibold'>
        Schedule a Meeting With Our{' '}
        <span className='text-rwa'>Executive Team</span>
      </h1>
      <p className='mt-2 text-center text-sm text-gray-400'>
        As part our Partner Program, you can request 1:1 meetings with our core
        team members to align on strategy, growth opportunities, or technical
        collaboration.
      </p>

      <div className='mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm'>
        <Stepper currentStep={step} totalSteps={4} />
        <div className='my-6 h-px w-full bg-gray-200' />

        {step === 0 && (
          <StepWrapper>
            <h2 className='text-xl font-semibold'>Request a Meeting</h2>
            <p className='text-sm text-gray-400'>
              We value our partners' insights and are committed to fostering
              collaboration. Request a meeting with our executive team to
              discuss opportunities, challenges, or strategic initiatives.
            </p>

            <form className='mx-auto grid max-w-lg grid-cols-1 gap-4 sm:grid-cols-2'>
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

            {/* Navigation handled outside */}
          </StepWrapper>
        )}

        {step === 1 && (
          <StepWrapper>
            <h2 className='text-xl font-semibold'>
              What's the Purpose of Your Meeting?
            </h2>
            <p className='text-sm text-gray-400'>
              Please select the main topic you'd like to discuss.
            </p>

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
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

            {/* Navigation handled outside */}
          </StepWrapper>
        )}

        {step === 2 && (
          <StepWrapper>
            <h2 className='text-xl font-semibold'>
              Who Would You Like to Meet With?
            </h2>
            <p className='text-sm text-gray-400'>
              Choose the team member you’d prefer to connect with. Each of our
              executives brings unique expertise to support your goals. Select
              the profile that best aligns with your topic or interest.
            </p>

            <div className='grid gap-4 sm:grid-cols-3'>
              {executives.map((ex) => (
                <ExecCard
                  key={ex.id}
                  active={data.executive === ex.name}
                  onClick={() => update('executive')(ex.name)}
                  exec={ex}
                />
              ))}
            </div>

            {/* Navigation handled outside */}
          </StepWrapper>
        )}

        {step === 3 && (
          <StepWrapper className='items-center text-center'>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rwa text-white'
            >
              ✓
            </motion.div>
            <h2 className='text-xl font-semibold'>You’re Almost Done</h2>
            <p className='text-sm text-gray-400'>
              Please review all the information you’ve provided before
              submitting your request. Once submitted, a confirmation email will
              be sent, and our team will follow up shortly.
            </p>

            {/* Navigation handled outside */}
          </StepWrapper>
        )}
      </div>

      {/* ————— External Navigation ————— */}
      <div className='mx-auto mt-6 flex w-full max-w-lg justify-between'>
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

/* —————————————— sub-components —————————————— */

function Input({ label, Icon, ...props }) {
  return (
    <label className='relative flex flex-col gap-1 text-sm text-rwa'>
      {label}
      <input
        className='w-full rounded-md border-gray-300 pr-10 text-sm focus:border-rwa focus:ring-rwa'
        {...props}
      />
      <Icon className='pointer-events-none absolute right-3 top-8 h-5 w-5 text-rwa' />
    </label>
  )
}

function NavButton({ children, variant = 'solid', ...props }) {
  const base = 'rounded-md px-5 py-2 text-sm font-semibold transition'
  const styles =
    variant === 'solid'
      ? 'bg-rwa text-white hover:bg-rwa/90'
      : 'text-gray-500 hover:text-rwa'
  return (
    <button className={`${base} ${styles}`} {...props}>
      {children}
    </button>
  )
}

// Removed NavGroup – navigation now centralized outside bordered container

function SelectCard({ active, onClick, icon: Icon, label }) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`flex items-center gap-3 rounded-md border bg-white p-4 text-left shadow-sm transition ${
        active ? 'border-rwa bg-rwa/10' : 'border-gray-200 hover:border-rwa'
      }`}
    >
      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-rwa/20 text-rwa'>
        <Icon className='h-5 w-5' />
      </div>
      <span className='text-sm font-medium'>{label}</span>
    </button>
  )
}

function ExecCard({ exec, active, onClick }) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition ${
        active ? 'border-rwa bg-rwa/10' : 'border-gray-200 hover:border-rwa'
      }`}
    >
      {exec.image ? (
        <img
          src={exec.image}
          alt={exec.name}
          className='h-24 w-24 rounded-full object-cover'
        />
      ) : (
        <div className='flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-gray-400'>
          <FiUser className='h-10 w-10' />
        </div>
      )}
      <span className='text-sm font-semibold'>{exec.name}</span>
      <span className='rounded-lg bg-rwa px-2 py-0.5 text-xs text-white'>
        {exec.role}
      </span>
    </button>
  )
}
