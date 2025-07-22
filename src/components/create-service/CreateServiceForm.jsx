import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaCloudUploadAlt, FaTimes, FaCheck } from 'react-icons/fa'
import { AiOutlineCheck } from 'react-icons/ai'
import { useNavigate } from 'react-router'

import Stepper from '../../components/steper/Stepper'
import StepWrapper from '../../components/steper/StepWrapper'
import Success from '../../components/Success'

const CATEGORIES = [
  'Smart Contract Dev',
  'Token Audit',
  'NFT Mint',
  'DeFi Support',
  'Web3 Consulting',
  'Tokenomics Design',
]

const PRICE_PLANS = ['Basic', 'Standard', 'Pro']

const fadeVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const Separator = () => <div className='w-full h-px bg-gray-200' />

export default function CreateServiceForm() {
  const [companyName] = useState('Your Company')
  const [step, setStep] = useState(0)
  const [thumbnail, setThumbnail] = useState(null)
  const [form, setForm] = useState({
    title: '',
    category: '',

    description: '',
    tags: [],

    priceType: 'fixed',
    fixedSale: '',
    fixedPartner: '',
    plans: {
      Basic: { enabled: false, sale: '', partner: '' },
      Standard: { enabled: false, sale: '', partner: '' },
      Pro: { enabled: false, sale: '', partner: '' },
    },

    contentFixed: '',
    contentPlans: { Basic: '', Standard: '', Pro: '' },
    faqEnabled: false,
    faqs: [],
  })

  const tagInputRef = useRef(null)
  const navigate = useNavigate()

  const totalSteps = 6
  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0))

  const isStepValid = () => {
    switch (step) {
      case 1:
        return form.title.trim() && form.category
      case 2:
        return form.description.trim() && form.tags.length
      case 3:
        if (form.priceType === 'fixed')
          return (
            form.fixedSale &&
            form.fixedPartner &&
            Number(form.fixedPartner) < Number(form.fixedSale)
          )
        return PRICE_PLANS.some(
          (p) =>
            form.plans[p].enabled &&
            form.plans[p].sale &&
            form.plans[p].partner &&
            Number(form.plans[p].partner) < Number(form.plans[p].sale)
        )
      case 4:
        if (form.priceType === 'fixed') return form.contentFixed.trim()
        return PRICE_PLANS.every(
          (p) => !form.plans[p].enabled || form.contentPlans[p].trim()
        )
      case 5:
        return !!thumbnail
      default:
        return true
    }
  }

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handlePlanToggle = (plan) =>
    setForm((p) => ({
      ...p,
      plans: {
        ...p.plans,
        [plan]: { ...p.plans[plan], enabled: !p.plans[plan].enabled },
      },
    }))

  const handlePlanField = (plan, field, value) =>
    setForm((p) => ({
      ...p,
      plans: {
        ...p.plans,
        [plan]: { ...p.plans[plan], [field]: value },
      },
    }))

  const addTag = (value) => {
    const tag = value.trim()
    if (tag && !form.tags.includes(tag) && form.tags.length < 6) {
      setForm((p) => ({ ...p, tags: [...p.tags, tag] }))
    }
  }

  const handleTagKeyDown = (e) => {
    if (['Enter', ' '].includes(e.key)) {
      e.preventDefault()
      addTag(e.target.value)
      e.target.value = ''
    }
  }

  const removeTag = (t) =>
    setForm((p) => ({ ...p, tags: p.tags.filter((tag) => tag !== t) }))

  const addFaq = () =>
    setForm((p) => ({
      ...p,
      faqs: [...p.faqs, { q: '', a: '' }].slice(0, 6),
    }))

  const updateFaq = (idx, field, value) =>
    setForm((p) => ({
      ...p,
      faqs: p.faqs.map((f, i) => (i === idx ? { ...f, [field]: value } : f)),
    }))

  const removeFaq = (idx) =>
    setForm((p) => ({ ...p, faqs: p.faqs.filter((_, i) => i !== idx) }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // API call
    nextStep()
  }

  return (
    <section className='flex items-center justify-center min-h-screen py-15 relative'>
      <div className='absolute top-10 right-60 w-45 h-45 bg-rwa rounded-full' />
      <div className='absolute bottom-30 left-65 w-35 h-35 bg-rwa rounded-full' />
      <motion.form
        onSubmit={handleSubmit}
        variants={fadeVariants}
        initial='hidden'
        animate='visible'
        className='w-full max-w-3xl min-h-[450px] bg-white/30 backdrop-blur-lg shadow-xl rounded-2xl flex flex-col border-b-rwa border-r-rwa border border-t-rwa/50 border-l-rwa/50'
      >
        {step > 0 && step < 6 && (
          <div className='px-10 py-5'>
            <Stepper currentStep={step} totalSteps={totalSteps} />
          </div>
        )}

        <div className='flex-grow flex flex-col'>{renderStepContent()}</div>

        {step < 6 && (
          <div className='flex justify-between px-10 pb-5'>
            {step > 0 ? (
              <button
                type='button'
                onClick={prevStep}
                className='px-6 py-2 border border-rwa text-rwa rounded-2xl hover:bg-rwa/10 transition'
              >
                Go Back
              </button>
            ) : (
              <span />
            )}
            {step > 0 && step < 5 ? (
              <button
                type='button'
                onClick={nextStep}
                disabled={!isStepValid()}
                className={`px-6 py-2 rounded-2xl text-white transition ${
                  isStepValid()
                    ? 'bg-rwa hover:opacity-90'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            ) : step === 5 ? (
              <button
                type='submit'
                disabled={!isStepValid()}
                className={`px-6 py-2 rounded-2xl text-white ${
                  isStepValid()
                    ? 'bg-rwa hover:opacity-90'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Submit Service
              </button>
            ) : (
              <span />
            )}
          </div>
        )}
      </motion.form>
    </section>
  )

  function renderStepContent() {
    switch (step) {
      case 0:
        return (
          <div className='flex-1 flex flex-col justify-between h-full '>
            <div className='flex flex-col gap-4 px-10 py-5'>
              <p className='text-sm font-medium'>
                You will submit your request as{' '}
                <span className='italic font-medium'>{companyName}</span>
              </p>
            </div>
            <Separator />
            <div className='flex flex-col px-10 py-10'>
              <h1 className='text-3xl font-bold'>
                Request a <span className='text-rwa'>listing service</span>
              </h1>
              <p className='text-gray-600 max-w-md'>
                All service request will be reviewed by the RWA Inc team before
                being approved.
              </p>
            </div>
            <div className='mt-auto px-10 pb-10'>
              <button
                type='button'
                onClick={nextStep}
                className='bg-rwa text-white px-6 py-3 rounded-2xl hover:opacity-90 transition w-fit'
              >
                Submit a service
              </button>
            </div>
          </div>
        )

      case 1:
        return (
          <div className='flex flex-col gap-4 flex-grow'>
            <Separator />
            <div className='px-10 flex flex-col gap-4'>
              <div>
                <h2 className='text-2xl font-bold'>
                  About your <span className='text-rwa'>service</span>
                </h2>
                <p className='text-sm text-gray-600'>
                  All service request will be reviewed by the RWA Inc team
                  before being approved.
                </p>
              </div>

              <label className='flex flex-col gap-2 mt-4'>
                <span className='text-rwa font-medium'>
                  Title of the service
                </span>
                <input
                  type='text'
                  name='title'
                  placeholder='Example: NFT Mint development Ethereum'
                  value={form.title}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-rwa rounded-lg focus:outline-none focus:ring-2 focus:ring-rwa'
                />
              </label>

              <label className='flex flex-col gap-2'>
                <span className='text-rwa font-medium'>
                  Select a category that identity your service
                </span>
                <select
                  name='category'
                  value={form.category}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-rwa rounded-lg focus:outline-none focus:ring-2 focus:ring-rwa'
                >
                  <option value=''>Select a category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        )

      case 2:
        return (
          <div className='flex flex-col gap-4 flex-grow'>
            <Separator />
            <div className='px-10 pb-5 flex flex-col gap-4'>
              <div>
                <h2 className='text-2xl font-bold'>
                  Description &amp; <span className='text-rwa'>Tags</span>
                </h2>
                <p className='text-sm text-gray-600'>
                  All service request will be reviewed by the RWA Inc team
                  before being approved.
                </p>
              </div>

              <label className='flex flex-col gap-2 mt-4'>
                <span className='font-medium'>
                  Full description of the service
                </span>
                <textarea
                  name='description'
                  rows={5}
                  placeholder='Full explanation of what you offer in this service'
                  value={form.description}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-rwa rounded-lg focus:outline-none focus:ring-2 focus:ring-rwa resize-none'
                />
              </label>

              <label className='flex flex-col gap-2'>
                <span className='font-medium'>
                  Write max 6 tags for your service
                </span>
                <div className='w-full px-4 py-2 border border-rwa rounded-lg focus-within:ring-2 focus-within:ring-rwa flex flex-wrap gap-2 items-center'>
                  {form.tags.map((t) => (
                    <span
                      key={t}
                      className='flex items-center gap-1 bg-rwa/10 text-rwa px-3 py-1 rounded-full text-sm cursor-pointer'
                      onClick={() => removeTag(t)}
                    >
                      {t}
                      <FaTimes size={10} />
                    </span>
                  ))}
                  <input
                    ref={tagInputRef}
                    type='text'
                    placeholder='Press space or enter to add'
                    onKeyDown={handleTagKeyDown}
                    className='flex-1 min-w-[100px] border-none focus:ring-0 focus:outline-none p-0 bg-transparent'
                  />
                </div>
              </label>
            </div>
          </div>
        )

      case 3:
        return (
          <div className='flex flex-col gap-4 flex-grow'>
            <Separator />
            <div className='px-10 pb-5 flex flex-col gap-4'>
              <div>
                <h2 className='text-2xl font-bold'>
                  Offer &amp; <span className='text-rwa'>Price</span>
                </h2>
                <p className='text-sm text-gray-600'>
                  All service request will be reviewed by the RWA Inc team
                  before being approved.
                </p>
              </div>

              <div className='flex gap-4 mt-4'>
                {['fixed', 'plans'].map((type) => (
                  <label
                    key={type}
                    className='flex items-center gap-2 cursor-pointer'
                  >
                    <input
                      type='radio'
                      name='priceType'
                      value={type}
                      checked={form.priceType === type}
                      onChange={handleChange}
                      className='peer hidden'
                    />
                    <div className='w-5 h-5 border-2 rounded-full border-gray-300 peer-checked:border-4 peer-checked:border-rwa transition-all duration-150' />
                    <span>
                      {type === 'fixed' ? 'Fixed Price' : 'Based on plans'}
                    </span>
                  </label>
                ))}
              </div>

              {form.priceType === 'fixed' ? (
                <div className='grid md:grid-cols-2 gap-4 mt-4'>
                  <label className='flex flex-col gap-2'>
                    <span className='font-medium text-rwa'>Price of sale</span>
                    <input
                      type='number'
                      name='fixedSale'
                      placeholder='Example: 500'
                      value={form.fixedSale}
                      onChange={handleChange}
                      className='px-4 py-2 border border-rwa rounded-lg focus:outline-none focus:ring-2 focus:ring-rwa'
                    />
                  </label>

                  <label className='flex flex-col gap-2'>
                    <span className='font-medium text-rwa'>
                      Price for other partners
                    </span>
                    <input
                      type='number'
                      name='fixedPartner'
                      placeholder='Example: 400'
                      value={form.fixedPartner}
                      onChange={handleChange}
                      className='px-4 py-2 border border-rwa rounded-lg focus:outline-none focus:ring-2 focus:ring-rwa'
                    />
                    {form.fixedPartner &&
                      Number(form.fixedPartner) >= Number(form.fixedSale) && (
                        <span className='text-xs text-red-500'>
                          Price need to be lower price of sale
                        </span>
                      )}
                  </label>
                </div>
              ) : (
                <>
                  <label className='font-medium mt-4'>
                    Select the plans that you want to adjust
                  </label>

                  <div className='flex flex-wrap gap-4'>
                    {PRICE_PLANS.map((p) => (
                      <label
                        key={p}
                        className='flex items-center gap-2 cursor-pointer'
                      >
                        <input
                          type='checkbox'
                          checked={form.plans[p].enabled}
                          onChange={() => handlePlanToggle(p)}
                          className='peer hidden'
                        />
                        <div className='w-5 h-5 border-2 border-gray-300 rounded-md flex items-center justify-center peer-checked:bg-rwa peer-checked:border-rwa transition-all duration-150'>
                          <FaCheck
                            className={`text-white transition-opacity duration-150 ${
                              form.plans[p].enabled
                                ? 'opacity-100'
                                : 'opacity-0'
                            }`}
                            size={12}
                          />
                        </div>
                        <span>{p}</span>
                      </label>
                    ))}
                  </div>

                  {PRICE_PLANS.filter((p) => form.plans[p].enabled).map((p) => (
                    <div key={p} className='mt-4'>
                      <div className='grid md:grid-cols-2 gap-4'>
                        <label className='flex flex-col gap-2'>
                          <p className='font-medium'>
                            {p} Plan{' '}
                            <span className='text-rwa'>Price of sale</span>
                          </p>
                          <input
                            type='number'
                            value={form.plans[p].sale}
                            onChange={(e) =>
                              handlePlanField(p, 'sale', e.target.value)
                            }
                            className='px-4 py-2 border border-rwa rounded-lg focus:outline-none focus:ring-2 focus:ring-rwa'
                          />
                        </label>

                        <label className='flex flex-col gap-2'>
                          <p className='font-medium'>
                            {p} Plan{' '}
                            <span className='text-rwa'>
                              Price for other partners
                            </span>
                          </p>
                          <input
                            type='number'
                            value={form.plans[p].partner}
                            onChange={(e) =>
                              handlePlanField(p, 'partner', e.target.value)
                            }
                            className='px-4 py-2 border border-rwa rounded-lg focus:outline-none focus:ring-2 focus:ring-rwa'
                          />
                          {form.plans[p].partner &&
                            Number(form.plans[p].partner) >=
                              Number(form.plans[p].sale) && (
                              <span className='text-xs text-red-500'>
                                Price need to be lower price of sale
                              </span>
                            )}
                        </label>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )

      case 4:
        return (
          <div className='flex flex-col gap-4 flex-grow'>
            <Separator />
            <div className='px-10 pb-5 flex flex-col gap-4'>
              <div>
                <h2 className='text-2xl font-bold'>
                  Information <span className='text-rwa'>Content</span>
                </h2>
                <p className='text-sm text-gray-600'>
                  All service request will be reviewed by the RWA Inc team
                  before being approved.
                </p>
              </div>

              {form.priceType === 'fixed' ? (
                <label className='flex flex-col gap-2 mt-4'>
                  <span className='font-medium'>
                    Please describe what include your service in detail
                  </span>
                  <textarea
                    rows={4}
                    name='contentFixed'
                    value={form.contentFixed}
                    onChange={handleChange}
                    placeholder='The content of what your offer with this service a package'
                    className='w-full px-4 py-2 border border-rwa rounded-lg focus:outline-none focus:ring-2 focus:ring-rwa resize-none'
                  />
                </label>
              ) : (
                PRICE_PLANS.filter((p) => form.plans[p].enabled).map((p) => (
                  <label key={p} className='flex flex-col gap-2 mt-4'>
                    <p className='font-medium'>
                      Please describe what include your{' '}
                      <span className='text-rwa'>{p} Plan</span>
                    </p>
                    <textarea
                      rows={3}
                      value={form.contentPlans[p]}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          contentPlans: {
                            ...prev.contentPlans,
                            [p]: e.target.value,
                          },
                        }))
                      }
                      className='w-full px-4 py-2 border border-rwa rounded-lg focus:outline-none focus:ring-2 focus:ring-rwa resize-none'
                    />
                  </label>
                ))
              )}

              <div className='mt-6'>
                <span className='font-medium'>
                  Do you want to add a FAQ into your service? (Max 6 QA)
                </span>
                <div className='flex gap-4 mt-2'>
                  {['Yes', 'No'].map((opt) => (
                    <label
                      key={opt}
                      className='flex items-center gap-2 cursor-pointer'
                    >
                      <input
                        type='radio'
                        name='faqEnabled'
                        value={opt === 'Yes'}
                        checked={form.faqEnabled === (opt === 'Yes')}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            faqEnabled: e.target.value === 'true',
                            faqs: [],
                          }))
                        }
                        className='peer hidden'
                      />
                      <div className='w-5 h-5 border-2 rounded-full border-gray-300 peer-checked:border-4 peer-checked:border-rwa transition-all duration-150' />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {form.faqEnabled && (
                <div className='mt-4 flex flex-col gap-6'>
                  {form.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className='rounded-xl flex flex-col gap-2 relative'
                    >
                      <div className='relative'>
                        <input
                          type='text'
                          placeholder='Question'
                          value={faq.q}
                          onChange={(e) => updateFaq(idx, 'q', e.target.value)}
                          className='px-4 py-2 border border-rwa rounded-lg focus:outline-none focus:ring-2 focus:ring-rwa w-full pr-10'
                        />
                        <button
                          type='button'
                          onClick={() => removeFaq(idx)}
                          className='absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-red-500'
                          tabIndex={-1}
                          aria-label='Delete question'
                        >
                          <FaTimes />
                        </button>
                      </div>
                      <textarea
                        rows={3}
                        placeholder='Answer'
                        value={faq.a}
                        onChange={(e) => updateFaq(idx, 'a', e.target.value)}
                        className='px-4 py-2 border border-rwa rounded-lg focus:outline-none focus:ring-2 focus:ring-rwa resize-none'
                      />
                    </div>
                  ))}

                  {form.faqs.length < 6 && (
                    <button
                      type='button'
                      onClick={addFaq}
                      className='self-start px-4 py-2 border border-rwa text-rwa rounded-2xl hover:bg-rwa/10 transition'
                    >
                      + Add QA
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )

      case 5:
        return (
          <div className='flex flex-col gap-4 flex-grow'>
            <Separator />
            <div className='px-10 pb-5 flex flex-col gap-4'>
              <div>
                <h2 className='text-2xl font-bold'>
                  Thumbnails &amp; <span className='text-rwa'>Media</span>
                </h2>
                <p className='text-sm text-gray-600'>
                  All service request will be reviewed by the RWA Inc team
                  before being approved.
                </p>
              </div>

              <label className='flex flex-col gap-2 mt-4 font-medium'>
                Upload the thumbnail for your service (aspect ratio 7:5)
                <div className='border-dashed border-2 border-gray-300 p-6 rounded-md flex flex-col items-center justify-center text-center'>
                  <FaCloudUploadAlt size={48} className='text-rwa mb-2' />
                  <span className='font-semibold'>
                    Choose a file or drag &amp; drop it here
                  </span>
                  <span className='text-xs text-gray-500'>
                    JPEG, PNG, PDF and MP4 formats, up to 10MB
                  </span>
                  <input
                    type='file'
                    accept='image/*,video/mp4,application/pdf'
                    className='hidden'
                    onChange={(e) => setThumbnail(e.target.files[0])}
                  />
                  {thumbnail && (
                    <span className='text-xs text-green-600 mt-2'>
                      {thumbnail.name}
                    </span>
                  )}
                </div>
              </label>
            </div>
          </div>
        )

      case 6:
        return (
          <div className='flex flex-col items-center justify-center flex-grow px-10 py-10 text-center'>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              className='backdrop-blur-sm  flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-rwa z-10 border border-r-rwa/30 border-b-rwa/30 border-gray-400 shadow-[0_3px_10px_rgb(0,0,100,0.2)]'
            >
              <AiOutlineCheck className='text-white' size={48} />
            </motion.div>
            <h3 className='text-2xl font-extrabold mt-4'>
              Your Service was{' '}
              <span className='text-rwa'>Successfully Submitted</span>
            </h3>
            <p className='text-sm text-gray-700 mt-2 max-w-md'>
              Our team will review your service request to be listing in the
              platform. The process will take approximately 24-36 hours. We will
              let you know when your service goes live.
            </p>
            <button
              type='button'
              onClick={() => navigate('/dashboard')}
              className='mt-4 px-6 py-1.5 rounded-2xl bg-rwa text-white font-medium hover:opacity-90 transition'
            >
              Go to dashboard
            </button>
          </div>
        )

      default:
        return null
    }
  }
}
