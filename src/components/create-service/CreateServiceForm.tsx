import { useState, useRef, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { FaCloudUploadAlt, FaTimes, FaCheck } from 'react-icons/fa'
import { AiOutlineCheck } from 'react-icons/ai'
import { useRouter } from 'next/navigation'

// "Go to Dashboard" button in 696

const CATEGORIES = [
  'Smart Contract Dev',
  'Token Audit',
  'NFT Mint',
  'DeFi Support',
  'Web3 Consulting',
  'Tokenomics Design',
]

const PRICE_PLANS = ['Basic', 'Standard', 'Pro'] as const

type PricePlan = (typeof PRICE_PLANS)[number]

interface FormState {
  title: string
  category: string
  description: string
  tags: string[]
  priceType: 'fixed' | 'plans'
  fixedSale: string
  fixedPartner: string
  plans: Record<
    PricePlan,
    {
      enabled: boolean
      sale: string
      partner: string
    }
  >
  contentFixed: string
  contentPlans: Record<PricePlan, string>
  faqEnabled: boolean
  faqs: Array<{ q: string; a: string }>
}

const fadeVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const Separator = () => <div className='w-full h-px bg-gray-200' />

export default function CreateServiceForm() {
  const [companyName] = useState('Your Company')
  const [step, setStep] = useState(0)
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [form, setForm] = useState<FormState>({
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

  const tagInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const totalSteps = 6
  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0))

  const isStepValid = (): boolean => {
    switch (step) {
      case 1:
        return form.title.trim() !== '' && form.category !== ''
      case 2:
        return form.description.trim() !== '' && form.tags.length > 0
      case 3:
        if (form.priceType === 'fixed') {
          return (
            form.fixedSale !== '' &&
            form.fixedPartner !== '' &&
            Number(form.fixedPartner) < Number(form.fixedSale)
          )
        }
        return PRICE_PLANS.some(
          (p) =>
            form.plans[p].enabled &&
            form.plans[p].sale !== '' &&
            form.plans[p].partner !== '' &&
            Number(form.plans[p].partner) < Number(form.plans[p].sale)
        )
      case 4:
        if (form.priceType === 'fixed') return form.contentFixed.trim() !== ''
        return PRICE_PLANS.every(
          (p) => !form.plans[p].enabled || form.contentPlans[p].trim() !== ''
        )
      case 5:
        return !!thumbnail
      default:
        return true
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePlanToggle = (plan: PricePlan) => {
    setForm((prev) => ({
      ...prev,
      plans: {
        ...prev.plans,
        [plan]: { ...prev.plans[plan], enabled: !prev.plans[plan].enabled },
      },
    }))
  }

  const handlePlanField = (
    plan: PricePlan,
    field: 'sale' | 'partner',
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      plans: {
        ...prev.plans,
        [plan]: { ...prev.plans[plan], [field]: value },
      },
    }))
  }

  const addTag = (value: string) => {
    const tag = value.trim()
    if (tag && !form.tags.includes(tag) && form.tags.length < 6) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }))
    }
  }

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['Enter', ' '].includes(e.key)) {
      e.preventDefault()
      if (e.currentTarget.value) {
        addTag(e.currentTarget.value)
        e.currentTarget.value = ''
      }
    }
  }

  const removeTag = (tagToRemove: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const addFaq = () => {
    setForm((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { q: '', a: '' }].slice(0, 6),
    }))
  }

  const updateFaq = (idx: number, field: 'q' | 'a', value: string) => {
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f, i) => (i === idx ? { ...f, [field]: value } : f)),
    }))
  }

  const removeFaq = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== idx),
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // API call
    nextStep()
  }

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className='flex-1 flex flex-col justify-between h-full'>
            <div className='flex flex-col gap-4 px-4 md:px-10 py-3 md:py-5'>
              <p className='text-xs md:text-sm font-medium'>
                You will submit your request as{' '}
                <span className='italic font-medium'>{companyName}</span>
              </p>
            </div>
            <Separator />
            <div className='flex flex-col px-4 md:px-10 py-6 md:py-10'>
              <h1 className='text-2xl md:text-3xl font-bold'>
                Request a <span className='text-rwa'>listing service</span>
              </h1>
              <p className='text-gray-600 max-w-md text-sm md:text-base'>
                All service request will be reviewed by the RWA Inc team before
                being approved.
              </p>
            </div>
            <div className='mt-auto px-4 md:px-10 pb-6 md:pb-10'>
              <button
                type='button'
                onClick={nextStep}
                className='bg-rwa text-white px-4 md:px-6 py-2 md:py-3 rounded-2xl hover:opacity-90 transition w-fit text-sm md:text-base'
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
            <div className='px-4 md:px-10 flex flex-col gap-4'>
              <div>
                <h2 className='text-xl md:text-2xl font-bold'>
                  About your <span className='text-rwa'>service</span>
                </h2>
                <p className='text-xs md:text-sm text-gray-600'>
                  All service request will be reviewed by the RWA Inc team
                  before being approved.
                </p>
              </div>

              <label className='flex flex-col gap-2 mt-4'>
                <span className='text-rwa font-medium text-sm md:text-base'>
                  Title of the service
                </span>
                <input
                  type='text'
                  name='title'
                  placeholder='Example: NFT Mint development Ethereum'
                  value={form.title}
                  onChange={handleChange}
                  className='w-full px-3 md:px-4 py-2 border border-rwa rounded-lg focus:outline-none focus:ring-2 focus:ring-rwa text-sm md:text-base'
                />
              </label>

              <label className='flex flex-col gap-2'>
                <span className='text-rwa font-medium text-sm md:text-base'>
                  Select a category that identity your service
                </span>
                <select
                  name='category'
                  value={form.category}
                  onChange={handleChange}
                  className='w-full px-3 md:px-4 py-2 border border-rwa rounded-lg focus:outline-none focus:ring-2 focus:ring-rwa text-sm md:text-base'
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
            <div className='px-4 md:px-10 pb-3 md:pb-5 flex flex-col gap-4'>
              <div>
                <h2 className='text-xl md:text-2xl font-bold'>
                  Description &amp; <span className='text-rwa'>Tags</span>
                </h2>
                <p className='text-xs md:text-sm text-gray-600'>
                  All service request will be reviewed by the RWA Inc team
                  before being approved.
                </p>
              </div>

              <label className='flex flex-col gap-2 mt-4'>
                <span className='font-medium text-sm md:text-base'>
                  Full description of the service
                </span>
                <textarea
                  name='description'
                  rows={4}
                  placeholder='Full explanation of what you offer in this service'
                  value={form.description}
                  onChange={handleChange}
                  className='w-full px-3 md:px-4 py-2 border border-rwa rounded-lg focus:outline-none focus:ring-2 focus:ring-rwa resize-none text-sm md:text-base'
                />
              </label>

              <label className='flex flex-col gap-2'>
                <span className='font-medium text-sm md:text-base'>
                  Write max 6 tags for your service
                </span>
                <div className='w-full px-3 md:px-4 py-2 border border-rwa rounded-lg focus-within:ring-2 focus-within:ring-rwa flex flex-wrap gap-1 md:gap-2 items-center min-h-[44px]'>
                  {form.tags.map((t) => (
                    <span
                      key={t}
                      className='flex items-center gap-1 bg-rwa/10 text-rwa px-2 md:px-3 py-1 rounded-full text-xs md:text-sm cursor-pointer'
                      onClick={() => removeTag(t)}
                    >
                      {t}
                      <FaTimes size={8} className='md:size-[10px]' />
                    </span>
                  ))}
                  <input
                    ref={tagInputRef}
                    type='text'
                    placeholder='Press space or enter to add'
                    onKeyDown={handleTagKeyDown}
                    className='flex-1 min-w-[80px] md:min-w-[100px] border-none focus:ring-0 focus:outline-none p-0 bg-transparent text-sm md:text-base'
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
            <div className='px-4 md:px-10 pb-3 md:pb-5 flex flex-col gap-4'>
              <div>
                <h2 className='text-xl md:text-2xl font-bold'>
                  Offer &amp; <span className='text-rwa'>Price</span>
                </h2>
                <p className='text-xs md:text-sm text-gray-600'>
                  All service request will be reviewed by the RWA Inc team
                  before being approved.
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-3 md:gap-4 mt-4'>
                {(['fixed', 'plans'] as const).map((type) => (
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
                    <div className='w-4 h-4 md:w-5 md:h-5 border-2 rounded-full border-gray-300 peer-checked:border-4 peer-checked:border-rwa transition-all duration-150' />
                    <span className='text-sm md:text-base'>
                      {type === 'fixed' ? 'Fixed Price' : 'Based on plans'}
                    </span>
                  </label>
                ))}
              </div>

              {form.priceType === 'fixed' ? (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-4'>
                  <label className='flex flex-col gap-2'>
                    <span className='font-medium text-rwa text-sm md:text-base'>
                      Price of sale
                    </span>
                    <input
                      type='number'
                      name='fixedSale'
                      placeholder='Example: 500'
                      value={form.fixedSale}
                      onChange={handleChange}
                      className='px-3 md:px-4 py-2 border border-rwa rounded-lg focus:outline-none focus:ring-2 focus:ring-rwa text-sm md:text-base'
                    />
                  </label>

                  <label className='flex flex-col gap-2'>
                    <span className='font-medium text-rwa text-sm md:text-base'>
                      Price for other partners
                    </span>
                    <input
                      type='number'
                      name='fixedPartner'
                      placeholder='Example: 400'
                      value={form.fixedPartner}
                      onChange={handleChange}
                      className='px-3 md:px-4 py-2 border border-rwa rounded-lg focus:outline-none focus:ring-2 focus:ring-rwa text-sm md:text-base'
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
                  <label className='font-medium mt-4 text-sm md:text-base'>
                    Select the plans that you want to adjust
                  </label>

                  <div className='flex flex-wrap gap-3 md:gap-4'>
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
                        <div className='w-4 h-4 md:w-5 md:h-5 border-2 border-gray-300 rounded-md flex items-center justify-center peer-checked:bg-rwa peer-checked:border-rwa transition-all duration-150'>
                          <FaCheck
                            className={`text-white transition-opacity duration-150 ${
                              form.plans[p].enabled
                                ? 'opacity-100'
                                : 'opacity-0'
                            }`}
                            size={10}
                          />
                        </div>
                        <span className='text-sm md:text-base'>{p}</span>
                      </label>
                    ))}
                  </div>

                  {PRICE_PLANS.filter((p) => form.plans[p].enabled).map((p) => (
                    <div key={p} className='mt-4'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4'>
                        <label className='flex flex-col gap-2'>
                          <p className='font-medium text-sm md:text-base'>
                            {p} Plan{' '}
                            <span className='text-rwa'>Price of sale</span>
                          </p>
                          <input
                            type='number'
                            value={form.plans[p].sale}
                            onChange={(e) =>
                              handlePlanField(p, 'sale', e.target.value)
                            }
                            className='px-3 md:px-4 py-2 border border-rwa rounded-lg focus:outline-none focus:ring-2 focus:ring-rwa text-sm md:text-base'
                          />
                        </label>

                        <label className='flex flex-col gap-2'>
                          <p className='font-medium text-sm md:text-base'>
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
                            className='px-3 md:px-4 py-2 border border-rwa rounded-lg focus:outline-none focus:ring-2 focus:ring-rwa text-sm md:text-base'
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
            <div className='px-4 md:px-10 pb-3 md:pb-5 flex flex-col gap-4'>
              <div>
                <h2 className='text-xl md:text-2xl font-bold'>
                  Information <span className='text-rwa'>Content</span>
                </h2>
                <p className='text-xs md:text-sm text-gray-600'>
                  All service request will be reviewed by the RWA Inc team
                  before being approved.
                </p>
              </div>

              {form.priceType === 'fixed' ? (
                <label className='flex flex-col gap-2 mt-4'>
                  <span className='font-medium text-sm md:text-base'>
                    Please describe what include your service in detail
                  </span>
                  <textarea
                    rows={4}
                    name='contentFixed'
                    value={form.contentFixed}
                    onChange={handleChange}
                    placeholder='The content of what your offer with this service a package'
                    className='w-full px-3 md:px-4 py-2 border border-rwa rounded-lg focus:outline-none focus:ring-2 focus:ring-rwa resize-none text-sm md:text-base'
                  />
                </label>
              ) : (
                PRICE_PLANS.filter((p) => form.plans[p].enabled).map((p) => (
                  <label key={p} className='flex flex-col gap-2 mt-4'>
                    <p className='font-medium text-sm md:text-base'>
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
                      className='w-full px-3 md:px-4 py-2 border border-rwa rounded-lg focus:outline-none focus:ring-2 focus:ring-rwa resize-none text-sm md:text-base'
                    />
                  </label>
                ))
              )}

              <div className='mt-6'>
                <span className='font-medium text-sm md:text-base'>
                  Do you want to add a FAQ into your service? (Max 6 QA)
                </span>
                <div className='flex flex-col sm:flex-row gap-3 md:gap-4 mt-2'>
                  {['Yes', 'No'].map((opt) => (
                    <label
                      key={opt}
                      className='flex items-center gap-2 cursor-pointer'
                    >
                      <input
                        type='radio'
                        name='faqEnabled'
                        value={opt === 'Yes' ? 'true' : 'false'}
                        checked={form.faqEnabled === (opt === 'Yes')}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            faqEnabled: e.target.value === 'true',
                            faqs: [],
                          }))
                        }
                        className='peer hidden'
                      />
                      <div className='w-4 h-4 md:w-5 md:h-5 border-2 rounded-full border-gray-300 peer-checked:border-4 peer-checked:border-rwa transition-all duration-150' />
                      <span className='text-sm md:text-base'>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {form.faqEnabled && (
                <div className='mt-4 flex flex-col gap-4 md:gap-6'>
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
                          className='px-3 md:px-4 py-2 border border-rwa rounded-lg focus:outline-none focus:ring-2 focus:ring-rwa w-full pr-10 text-sm md:text-base'
                        />
                        <button
                          type='button'
                          onClick={() => removeFaq(idx)}
                          className='absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-red-500'
                          tabIndex={-1}
                          aria-label='Delete question'
                        >
                          <FaTimes size={14} />
                        </button>
                      </div>
                      <textarea
                        rows={3}
                        placeholder='Answer'
                        value={faq.a}
                        onChange={(e) => updateFaq(idx, 'a', e.target.value)}
                        className='px-3 md:px-4 py-2 border border-rwa rounded-lg focus:outline-none focus:ring-2 focus:ring-rwa resize-none text-sm md:text-base'
                      />
                    </div>
                  ))}

                  {form.faqs.length < 6 && (
                    <button
                      type='button'
                      onClick={addFaq}
                      className='self-start px-3 md:px-4 py-2 border border-rwa text-rwa rounded-2xl hover:bg-rwa/10 transition text-sm md:text-base'
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
            <div className='px-4 md:px-10 pb-3 md:pb-5 flex flex-col gap-4'>
              <div>
                <h2 className='text-xl md:text-2xl font-bold'>
                  Thumbnails &amp; <span className='text-rwa'>Media</span>
                </h2>
                <p className='text-xs md:text-sm text-gray-600'>
                  All service request will be reviewed by the RWA Inc team
                  before being approved.
                </p>
              </div>

              <label className='flex flex-col gap-2 mt-4 font-medium text-sm md:text-base cursor-pointer'>
                Upload the thumbnail for your service (aspect ratio 7:5)
                <div className='border-dashed border-2 border-gray-300 p-4 md:p-6 rounded-md flex flex-col items-center justify-center text-center min-h-[120px] md:min-h-[140px] hover:border-rwa transition-colors'>
                  <FaCloudUploadAlt
                    size={32}
                    className='md:size-12 text-rwa mb-2'
                  />
                  <span className='font-semibold text-sm md:text-base'>
                    Choose a file or drag &amp; drop it here
                  </span>
                  <span className='text-xs text-gray-500'>
                    JPEG, PNG, PDF and MP4 formats, up to 10MB
                  </span>
                  {thumbnail && (
                    <span className='text-xs text-green-600 mt-2 break-all'>
                      {thumbnail.name}
                    </span>
                  )}
                </div>
                <input
                  type='file'
                  accept='image/*,video/mp4,application/pdf'
                  className='hidden'
                  onChange={(e) =>
                    e.target.files && setThumbnail(e.target.files[0])
                  }
                />
              </label>
            </div>
          </div>
        )

      case 6:
        return (
          <div className='flex flex-col items-center justify-center flex-grow px-4 md:px-10 py-6 md:py-10 text-center'>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              className='backdrop-blur-sm flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-rwa z-10 border border-r-rwa/30 border-b-rwa/30 border-gray-400 shadow-[0_3px_10px_rgb(0,0,100,0.2)]'
            >
              <AiOutlineCheck className='text-white' size={32} />
            </motion.div>
            <h3 className='text-xl md:text-2xl font-extrabold mt-4'>
              Your Service was{' '}
              <span className='text-rwa'>Successfully Submitted</span>
            </h3>
            <p className='text-xs md:text-sm text-gray-700 mt-2 max-w-md'>
              Our team will review your service request to be listing in the
              platform. The process will take approximately 24-36 hours. We will
              let you know when your service goes live.
            </p>
            <button
              type='button'
              onClick={() => router.push('/')}
              className='mt-4 px-4 md:px-6 py-1.5 rounded-2xl bg-rwa text-white font-medium hover:opacity-90 transition text-sm md:text-base'
            >
              Go to dashboard
            </button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section className='flex items-center justify-center min-h-screen py-4 md:py-15 px-4 md:px-0 relative overflow-hidden'>
      {/* Background decorative circles */}
      <div className='absolute top-10 right-10 md:right-60 w-20 h-20 md:w-45 md:h-45 bg-rwa rounded-full opacity-60 md:opacity-80' />
      <div className='absolute bottom-10 left-10 md:bottom-30 md:left-65 w-16 h-16 md:w-35 md:h-35 bg-rwa rounded-full opacity-60 md:opacity-80' />
      <div className='absolute top-1/3 left-5 md:left-20 w-12 h-12 md:w-24 md:h-24 bg-rwa/40 rounded-full opacity-50' />
      <div className='absolute top-2/3 right-5 md:right-20 w-8 h-8 md:w-16 md:h-16 bg-rwa/60 rounded-full opacity-40' />
      <div className='absolute top-1/2 left-1/4 w-6 h-6 md:w-12 md:h-12 bg-rwa/30 rounded-full opacity-30' />
      <div className='absolute bottom-1/4 right-1/3 w-10 h-10 md:w-20 md:h-20 bg-rwa/50 rounded-full opacity-35' />
      <div className='absolute top-20 left-1/2 transform -translate-x-1/2 w-14 h-14 md:w-28 md:h-28 bg-rwa/25 rounded-full opacity-25' />
      
      <motion.form
        onSubmit={handleSubmit}
        variants={fadeVariants}
        initial='hidden'
        animate='visible'
        className='w-full max-w-3xl min-h-[450px] bg-white/30 backdrop-blur-lg shadow-xl rounded-2xl flex flex-col border-b-rwa border-r-rwa border border-t-rwa/50 border-l-rwa/50 relative z-10'
      >
        {step > 0 && step < 6 && (
          <div className='px-4 md:px-10 py-3 md:py-5'>
            {/* Stepper component would need to be implemented or imported */}
            <div className='flex items-center justify-between'>
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div key={i} className='flex items-center'>
                  <div
                    className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm ${
                      i <= step ? 'bg-rwa text-white' : 'bg-gray-200'
                    }`}
                  >
                    {i + 1}
                  </div>
                  {i < totalSteps - 1 && (
                    <div
                      className={`w-8 md:w-16 h-1 ${
                        i < step ? 'bg-rwa' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className='flex-grow flex flex-col'>{renderStepContent()}</div>

        {step < 6 && (
          <div className='flex justify-between px-4 md:px-10 pb-3 md:pb-5'>
            {step > 0 ? (
              <button
                type='button'
                onClick={prevStep}
                className='px-4 md:px-6 py-2 border border-rwa text-rwa rounded-2xl hover:bg-rwa/10 transition text-sm md:text-base'
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
                className={`px-4 md:px-6 py-2 rounded-2xl text-white transition text-sm md:text-base ${
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
                className={`px-4 md:px-6 py-2 rounded-2xl text-white text-sm md:text-base ${
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
}
