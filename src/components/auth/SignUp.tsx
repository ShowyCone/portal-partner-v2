// @ts-nocheck
import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { LuSparkles } from 'react-icons/lu'

const slideIn = (direction = 'left') => ({
  hidden: { opacity: 0, x: direction === 'left' ? -50 : 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
})

const inputClasses =
  'w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-rwa'

const interestOptions = [
  'Blockchain',
  'Tokenization',
  'FinTech',
  'Real Estate',
  'DeFi',
  'Investments',
  'Consulting',
  'Education',
]

export default function SignUp() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirm: '',
    terms: false,
    country: '',
    dob: '',
    interests: [],
  })
  const [code, setCode] = useState(['', '', '', '', ''])
  const codeRefs = useRef([])

  const maxDob = (() => {
    const d = new Date()
    d.setFullYear(d.getFullYear() - 18)
    return d.toISOString().split('T')[0]
  })()

  const handleNext = () => setStep((s) => s + 1)
  const handleBack = () => setStep((s) => s - 1)

  const credentialsValid =
    form.email && form.password && form.password === form.confirm && form.terms

  const toggleInterest = (tag) => {
    setForm((p) => {
      const set = new Set(p.interests)
      set.has(tag) ? set.delete(tag) : set.add(tag)
      return { ...p, interests: Array.from(set).slice(0, 5) }
    })
  }

  const handleCode = (idx, val) => {
    if (/^\d?$/.test(val)) {
      const next = [...code]
      next[idx] = val
      setCode(next)
      if (val && idx < 4) codeRefs.current[idx + 1].focus()
      if (!val && idx > 0) codeRefs.current[idx - 1].focus()
    }
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.form
            variants={slideIn('left')}
            initial='hidden'
            animate='visible'
            className='flex flex-col gap-3 w-full max-w-md'
            onSubmit={(e) => {
              e.preventDefault()
              if (credentialsValid) handleNext()
            }}
          >
            <h2 className='text-xl md:text-2xl font-semibold text-center text-rwa'>
              Sign up
            </h2>

            <div className='flex flex-col gap-2'>
              <label
                htmlFor='email'
                className='text-sm font-medium text-gray-500'
              >
                Email
              </label>
              <input
                id='email'
                type='email'
                placeholder='you@mail.com'
                required
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                className={inputClasses}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label
                htmlFor='pass'
                className='text-sm font-medium text-gray-500'
              >
                Create password
              </label>
              <input
                id='pass'
                type='password'
                placeholder='••••••••'
                required
                value={form.password}
                onChange={(e) =>
                  setForm((p) => ({ ...p, password: e.target.value }))
                }
                className={inputClasses}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label
                htmlFor='confirm'
                className='text-sm font-medium text-gray-500'
              >
                Confirm password
              </label>
              <input
                id='confirm'
                type='password'
                placeholder='••••••••'
                required
                value={form.confirm}
                onChange={(e) =>
                  setForm((p) => ({ ...p, confirm: e.target.value }))
                }
                className={inputClasses}
              />
            </div>

            <label className='flex items-center gap-2 mt-1'>
              <input
                type='checkbox'
                checked={form.terms}
                onChange={(e) =>
                  setForm((p) => ({ ...p, terms: e.target.checked }))
                }
                className='accent-rwa w-4 h-4'
              />
              <span className='text-sm'>
                I accept the terms and privacy policy
              </span>
            </label>

            <button
              type='submit'
              disabled={!credentialsValid}
              className='self-end px-6 py-3 bg-rwa text-white font-semibold rounded hover:opacity-90 transition-opacity disabled:opacity-40'
            >
              Next step
            </button>
          </motion.form>
        )
      case 1:
        return (
          <motion.div
            variants={slideIn('right')}
            initial='hidden'
            animate='visible'
            className='flex flex-col gap-4 w-full max-w-md'
          >
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='country'
                className='text-sm font-medium text-gray-500'
              >
                Country
              </label>
              <select
                id='country'
                value={form.country}
                onChange={(e) =>
                  setForm((p) => ({ ...p, country: e.target.value }))
                }
                className={inputClasses}
              >
                <option value=''>Select country</option>
                {[
                  'Argentina',
                  'Brazil',
                  'Canada',
                  'Chile',
                  'Colombia',
                  'Mexico',
                  'Spain',
                  'United Kingdom',
                  'United States',
                ].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className='flex flex-col gap-2'>
              <label
                htmlFor='dob'
                className='text-sm font-medium text-gray-500'
              >
                Date of birth
              </label>
              <input
                id='dob'
                type='date'
                max={maxDob}
                value={form.dob}
                onChange={(e) =>
                  setForm((p) => ({ ...p, dob: e.target.value }))
                }
                className={inputClasses}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label
                htmlFor='interests'
                className='text-sm font-medium text-gray-500'
              >
                Interests (Max 5)
              </label>
              <select
                id='interests'
                value={form.interests}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions).map(
                    (o) => o.value
                  )
                  setForm((p) => ({
                    ...p,
                    interests: selected.slice(0, 5),
                  }))
                }}
                className={inputClasses}
              >
                {interestOptions.map((opt) => (
                  <option key={opt} value={opt} className='py-1'>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex justify-between mt-4'>
              <button
                type='button'
                onClick={handleBack}
                className='px-6 py-1.5 border-2 border-rwa text-rwa font-semibold rounded hover:bg-rwa hover:text-white transition-colors'
              >
                Go back
              </button>
              <button
                type='button'
                onClick={handleNext}
                className='px-6 py-1.5 bg-rwa text-white font-semibold rounded hover:opacity-90 transition-opacity'
              >
                Next step
              </button>
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            variants={slideIn('left')}
            initial='hidden'
            animate='visible'
            className='flex flex-col gap-6 w-full max-w-md'
          >
            <div className='text-center space-y-2'>
              <h2 className='text-xl md:text-2xl font-semibold text-rwa'>
                Please check your email
              </h2>
              <p className='text-sm text-gray-600'>
                We&apos;ve sent a code to{' '}
                <span className='font-medium'>{form.email}</span>
              </p>
            </div>

            <div className='flex justify-center gap-3'>
              {code.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (codeRefs.current[i] = el)}
                  type='text'
                  value={d}
                  maxLength={1}
                  onChange={(e) => handleCode(i, e.target.value)}
                  className='w-12 h-16 border-2 border-gray-200 rounded-xl text-center text-2xl focus:outline-none focus:border-rwa'
                />
              ))}
            </div>

            <button
              type='button'
              onClick={handleNext}
              className='w-full py-3 bg-rwa text-white font-semibold rounded hover:opacity-90 transition-opacity'
            >
              Verify
            </button>

            <p className='text-center text-sm text-gray-600'>
              I didn&apos;t receive a code{' '}
              <button
                type='button'
                onClick={() => setCode(['', '', '', '', ''])}
                className='text-rwa font-medium underline'
              >
                Resend
              </button>
            </p>
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            variants={slideIn('right')}
            initial='hidden'
            animate='visible'
            className='flex flex-col gap-6 w-full max-w-md text-center'
          >
            <LuSparkles className='text-rwa mx-auto' size={80} />
            <h2 className='text-2xl font-semibold text-rwa'>
              Register successfully!
            </h2>
            <p className='text-sm text-gray-600'>
              Welcome to the RWA Inc Service platform, your account is ready to
              explore all our services!
            </p>
            <Link
              to='/discover'
              className='w-full py-3 bg-rwa text-white font-semibold rounded hover:opacity-90 transition-opacity'
            >
              Explore services!
            </Link>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <section className='flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] gap-8 p-6 bg-white'>
      <div className='w-full max-w-md bg-white p-8 border border-gray-200 rounded-2xl shadow-lg'>
        <img
          src='/rwamainlogo.svg'
          alt='RWA Logo'
          className='h-12 mx-auto mb-4'
        />
        {renderStep()}
        {step !== 3 && (
          <p className='mt-4 text-center text-sm text-gray-600'>
            Already have account?{' '}
            <Link to='/login' className='text-rwa underline'>
              Login
            </Link>
          </p>
        )}
      </div>
    </section>
  )
}
