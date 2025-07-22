import React, { useRef } from 'react'
import StepWrapper from '../steper/StepWrapper'
import { partnerTags } from '../../data/partnerTags'
import { termsOfService } from '../../data/termsOfService'
import { RiUploadCloudLine } from 'react-icons/ri'

export default function ProviderFormSteps({
  currentStep,
  formData,
  setFormData,
  file,
  setFile,
  selectedTags,
  setSelectedTags,
  lastUpdated,
  onNext,
  onBack,
}) {
  const scrollRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const inputClasses =
    'w-full px-4 py-2 border border-gray-100 bg-[#F6FAFF] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rwa focus:border-transparent'

  switch (currentStep) {
    case 0:
      return (
        <StepWrapper>
          <h2 className='text-xl md:text-2xl font-semibold text-center text-rwa'>
            Provide your Business information
          </h2>
          <div className='flex flex-col gap-2 w-full'>
            <label
              htmlFor='companyName'
              className='text-sm font-medium text-gray-700'
            >
              Company Name
            </label>
            <input
              id='companyName'
              type='text'
              name='companyName'
              placeholder='Company Name'
              className={inputClasses}
              value={formData.companyName || ''}
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col gap-2 w-full'>
            <label
              htmlFor='companyWebsite'
              className='text-sm font-medium text-gray-700'
            >
              Company Website
            </label>
            <input
              id='companyWebsite'
              type='url'
              name='companyWebsite'
              placeholder='https://yourcompany.com'
              className={inputClasses}
              value={formData.companyWebsite || ''}
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col gap-2 w-full'>
            <label
              htmlFor='companyDescription'
              className='text-sm font-medium text-gray-700'
            >
              Company Description
            </label>
            <textarea
              id='companyDescription'
              name='companyDescription'
              placeholder='Tell us about your company'
              rows='4'
              className={inputClasses}
              value={formData.companyDescription || ''}
              onChange={handleChange}
            />
          </div>
        </StepWrapper>
      )
    case 1:
      return (
        <StepWrapper>
          <h2 className='text-xl md:text-2xl font-semibold text-center text-rwa'>
            Business contact info
          </h2>
          <div className='flex flex-col gap-2 w-full'>
            <label
              htmlFor='businessEmail'
              className='text-sm font-medium text-gray-700'
            >
              Business Email
            </label>
            <input
              id='businessEmail'
              type='email'
              name='businessEmail'
              placeholder='business@mail.com'
              className={inputClasses}
              value={formData.businessEmail || ''}
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col gap-2 w-full'>
            <label
              htmlFor='phoneNumber'
              className='text-sm font-medium text-gray-700'
            >
              Phone Number
            </label>
            <input
              id='phoneNumber'
              type='tel'
              name='phoneNumber'
              placeholder='+1 (555) 123-4567'
              className={inputClasses}
              value={formData.phoneNumber || ''}
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col gap-2 w-full'>
            <label
              htmlFor='referral'
              className='text-sm font-medium text-gray-700'
            >
              How did you hear about RWA Inc?
            </label>
            <select
              id='referral'
              name='referral'
              className={inputClasses}
              value={formData.referral || ''}
              onChange={handleChange}
            >
              <option value=''>Select an option</option>
              <option value='Social Media'>Social Media</option>
              <option value='Friend'>Friend</option>
              <option value='Conference'>Conference</option>
              <option value='Other'>Other</option>
            </select>
          </div>
        </StepWrapper>
      )
    case 2:
      return (
        <StepWrapper>
          <h2 className='text-xl md:text-2xl font-semibold text-center text-rwa'>
            Company Media Files
          </h2>
          <p className='text-sm text-rwa mb-2'>
            Upload your logo (aspect ratio 1:1)
          </p>

          <label className='flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer p-6 text-center hover:bg-gray-50 transition'>
            <RiUploadCloudLine size={48} className='text-rwa' />
            <span className='font-semibold mt-2'>
              Choose a file or drag & drop it here
            </span>
            <span className='text-xs text-gray-500 mt-1'>
              JPEG, PNG, PDF and MP4 formats, up to 10MB
            </span>
            <input
              type='file'
              accept='image/*,video/mp4,application/pdf'
              className='hidden'
              onChange={(e) => setFile(e.target.files[0])}
            />
            {file && (
              <span className='mt-2 text-xs text-green-600'>{file.name}</span>
            )}
          </label>

          <p className='text-sm text-rwa mt-6'>
            Select the tags that fit better with your company
          </p>
          <div className='flex flex-wrap gap-2 mt-2 items-center justify-between'>
            {partnerTags.map((tag) => {
              const isActive = selectedTags.includes(tag)
              return (
                <button
                  key={tag}
                  type='button'
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full border ${
                    isActive ? 'bg-rwa text-white' : 'border-rwa text-rwa'
                  }`}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </StepWrapper>
      )
    case 3:
      return (
        <StepWrapper>
          <div className='flex flex-col gap-1'>
            <small className='uppercase text-xs tracking-wide text-gray-400'>
              PARTNERSHIP AGREEMENT
            </small>
            <h2 className='text-xl md:text-2xl font-bold text-rwa'>
              Terms Of Service
            </h2>
            <p className='text-xs text-gray-500 mb-3'>
              Last updated on {lastUpdated}
            </p>
          </div>
          {/* separator */}
          <div className='w-full h-[1px] bg-gray-200' />

          <div className='relative'>
            <div ref={scrollRef} className='overflow-y-auto max-h-[320px] pr-2'>
              <div className='p-4 pb-20 space-y-4 text-sm'>
                {termsOfService.map(({ clause, text }, idx) => (
                  <section key={idx} className='space-y-1'>
                    <h3 className='font-bold text-lg text-rwa'>{clause}</h3>
                    <p className='text-gray-500'>{text}</p>
                  </section>
                ))}
                <div className='flex flex-col gap-2'>
                  <button
                    type='button'
                    onClick={onNext}
                    className='mt-6 px-6 py-2 rounded-lg bg-rwa text-white font-medium hover:opacity-90 transition w-full text-lg'
                  >
                    Accept &amp; Continue
                  </button>
                  <p className='text-[11px] text-center text-gray-400 max-w-xs mx-auto'>
                    By accepting these you agree to all the terms and conditions
                    of RWA Inc regarding the Partnership agreement and will be
                    considered a{' '}
                    <span className='text-rwa'>virtual signature</span>.
                  </p>
                </div>
              </div>
              <div id='scrollBottomMarker' />
            </div>
            <div className='pointer-events-none absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-white to-transparent rounded-b-lg' />
            <button
              type='button'
              onClick={() =>
                scrollRef.current?.scrollTo({
                  top: scrollRef.current.scrollHeight,
                  behavior: 'smooth',
                })
              }
              className='absolute bottom-4 right-1/2 translate-x-1/2 p-1 px-3 text-md rounded-xl font-semibold bg-white border border-gray-200'
            >
              Scroll to <span className='text-rwa'>Bottom</span>
            </button>
          </div>
        </StepWrapper>
      )
    default:
      return null
  }
}
