import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaHome,
  FaShoppingCart,
  FaShare,
  FaEllipsisH,
  FaBuilding,
  FaChevronDown,
  FaStar,
  FaCcStripe,
  FaCcVisa,
  FaCcMastercard,
  FaSearch,
} from 'react-icons/fa'
import { useParams, useNavigate, Link } from 'react-router'
import servicesData from '../data/services'
import partnersData from '../data/partners'
import ServiceCard from '../components/ui/ServiceCard'

const SearchBar = () => (
  <div className='relative w-full md:w-2/5'>
    <input
      type='text'
      placeholder='Search services, categories or partners...'
      className='w-full rounded-full bg-[#F3F3F4] py-3 pl-5 pr-12 text-gray-800 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-rwa/50'
    />
    <button
      className='absolute inset-y-0 right-4 top-1/2 -translate-y-1/2 flex items-center p-2 rounded-full bg-rwa w-8 h-8 justify-center cursor-pointer hover:bg-rwa/80 z-10'
      type='button'
      tabIndex={-1}
      aria-label='search'
    >
      <FaSearch className='text-white' />
    </button>
  </div>
)

const SingleService = () => {
  const { id: serviceId } = useParams()
  const navigate = useNavigate()

  // Detect numeric legacy IDs and map them to current UUID records
  const isLegacyNumeric = /^\d+$/.test(serviceId)

  // Helper to find service
  const getService = () => {
    if (isLegacyNumeric) {
      // Legacy IDs were 1-based; convert to zero-based index
      const idx = parseInt(serviceId, 10) - 1
      return servicesData[idx]
    }
    return servicesData.find((s) => s.id === serviceId)
  }

  const service = getService() || servicesData[0]

  // If legacy numeric ID, redirect once to the canonical UUID URL
  if (isLegacyNumeric && service && service.id !== serviceId) {
    navigate(`/service/${service.id}`, { replace: true })
  }
  const providerServices = servicesData.filter(
    (s) => s.partnerId === service.partnerId && s.id !== service.id
  )
  const otherServices = servicesData
    .filter((s) => s.partnerId !== service.partnerId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2)

  const faqs = [
    {
      q: 'What is included in this service?',
      a: 'You will receive full access to the deliverables listed, a dedicated support channel and detailed documentation to ensure smooth implementation.',
    },
    {
      q: 'How long does delivery take?',
      a: 'Delivery time varies according to scope, but on average most clients receive the initial draft within 5 business days.',
    },
    {
      q: 'Is there a money-back guarantee?',
      a: 'Absolutely. If you are not satisfied with the final deliverables, you have 7 days to request a full refund—no questions asked.',
    },
  ]

  const defaultIncludes = [
    'Dedicated project manager',
    'Weekly progress reports',
    'Post-delivery support (30 days)',
  ]

  const [openFaq, setOpenFaq] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState('Standard')

  const handleFaqToggle = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx)
  }

  const partner = partnersData.find((p) => p.id === service.partnerId)
  const partnerName = partner ? partner.name : 'Unknown Partner'

  return (
    <section className='container mx-auto px-4 py-12'>
      <div className='flex justify-center md:justify-start'>
        <SearchBar />
      </div>

      <div className='mt-8 flex items-center justify-between'>
        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <FaHome />
          <span>/</span>
          <span>{service.tag}</span>
          <span>/</span>
          <Link
            to={`/partner/${partner.id}`}
            className='text-rwa hover:underline'
          >
            {partnerName}
          </Link>
        </div>

        <div className='flex items-center gap-3 text-lg text-gray-500'>
          <button
            aria-label='Add to cart'
            className='rounded-md px-3 py-2 transition-colors hover:bg-gray-100 text-rwa border border-gray-300'
          >
            <FaShoppingCart />
          </button>
          <button
            aria-label='Share'
            className='rounded-md px-3 py-2 transition-colors hover:bg-gray-100 border border-gray-300'
          >
            <FaShare />
          </button>
          <button
            aria-label='More options'
            className='rounded-md px-3 py-2 transition-colors hover:bg-gray-100 border border-gray-300'
          >
            <FaEllipsisH />
          </button>
        </div>
      </div>

      <div className='mt-10 grid gap-10 lg:grid-cols-3'>
        <div className='flex flex-col gap-10 lg:col-span-2'>
          <h1 className='text-3xl font-bold'>{service.title}</h1>

          <Link
            to={`/partner/${partner.id}`}
            className='flex items-center gap-4 hover:opacity-90'
          >
            {service.image ? (
              <img
                src={service.image}
                alt={partnerName}
                className='h-14 w-14 rounded-full object-cover'
              />
            ) : (
              <div className='flex h-14 w-14 items-center justify-center rounded-full bg-gray-100'>
                <FaBuilding className='text-2xl text-gray-400' />
              </div>
            )}

            <div>
              <p className='font-semibold'>{partnerName}</p>
              <div className='flex items-center gap-1 text-rwa'>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.round(service.rating)
                          ? 'fill-current'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                <span className='ml-2 text-sm text-gray-500'>
                  ({service.reviews || 0} Reviews)
                </span>
              </div>
            </div>
          </Link>

          <div className='space-y-3'>
            <h2 className='text-xl font-bold text-rwa'>About this service</h2>
            <p className='text-gray-700'>{service.description}</p>
            <button className='underline decoration-1 underline-offset-4 text-rwa hover:text-rwa/80'>
              Learn More
            </button>
          </div>

          <div className='space-y-3'>
            <h2 className='text-xl font-bold text-rwa'>FAQ</h2>
            <div className='divide-y divide-gray-200'>
              {faqs.map((item, idx) => (
                <div key={idx} className='py-3'>
                  <button
                    onClick={() => handleFaqToggle(idx)}
                    className='flex w-full items-center justify-between text-left'
                  >
                    <span>{item.q}</span>
                    <motion.span
                      animate={{ rotate: openFaq === idx ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaChevronDown />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className='overflow-hidden pt-2 text-sm text-gray-600'
                      >
                        {item.a}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <div className='space-y-3'>
            <h2 className='text-xl font-bold text-rwa'>Tags</h2>
            <div className='flex flex-wrap gap-2'>
              {service.tag && (
                <span className='rounded-full bg-gray-100 px-3 py-1 text-sm'>
                  {service.tag}
                </span>
              )}
            </div>
          </div>

          <div className='space-y-6'>
            <h2 className='text-xl font-bold text-rwa'>
              More services from {partnerName}
            </h2>
            <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3'>
              {providerServices.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
            <button className='underline decoration-1 underline-offset-4 text-rwa hover:text-rwa/80'>
              View More
            </button>
          </div>

          <div className='space-y-6'>
            <h2 className='text-xl font-bold text-rwa'>
              More services from other Partners
            </h2>
            <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3'>
              {otherServices.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </div>
        </div>

        <div className='space-y-6 relative'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm'
          >
            <div className='flex rounded-full bg-rwa/10 p-1'>
              {['Basic', 'Standard', 'Pro'].map((plan) => (
                <button
                  key={plan}
                  onClick={() => setSelectedPlan(plan)}
                  className={`flex-1 rounded-full py-2 text-sm transition-colors ${
                    selectedPlan === plan
                      ? 'bg-white text-gray-800 shadow'
                      : 'text-gray-600'
                  }`}
                >
                  {plan}
                </button>
              ))}
            </div>

            <Link
              to={`/partner/${partner.id}`}
              className='flex gap-4 hover:opacity-90'
            >
              <img
                src={service.image}
                alt={partnerName}
                className='h-20 w-20 rounded-md object-cover'
              />
              <div className='space-y-1'>
                <p className='text-sm font-semibold'>{partnerName}</p>
                <p className='text-sm text-rwa'>{service.title}</p>
                <p className='text-lg font-bold'>${service.price}</p>
                <div className='flex items-center gap-1 text-sm text-rwa'>
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < Math.round(service.rating)
                            ? 'fill-current'
                            : 'text-gray-300'
                        }
                      />
                    ))}
                  <span>({service.rating})</span>
                </div>
                <span className='inline-block rounded bg-rwa px-2 py-0.5 text-xs text-white'>
                  {service.tag}
                </span>
              </div>
            </Link>

            <hr className='my-2 text-gray-200' />

            <div>
              <h3 className='mb-2 text-sm font-bold text-rwa'>Include:</h3>
              <ul className='list-inside list-disc space-y-1 text-sm text-gray-700'>
                {(service.includes || defaultIncludes).map((inc, idx) => (
                  <li key={idx}>{inc}</li>
                ))}
              </ul>
            </div>
            <hr className='my-2 text-gray-200' />

            <p className='flex items-center gap-2 text-xs text-gray-500'>
              Your payment will be processed through{' '}
              <FaCcStripe className='text-2xl' />
            </p>
            <hr className='my-2 text-gray-200' />

            <div>
              <h3 className='mb-2 text-sm font-bold text-rwa'>Price Details</h3>
              <div className='flex justify-between text-sm'>
                <span>Service Cost</span>
                <span>${service.price}</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span>
                  Service Fee{' '}
                  <span className='text-xs text-gray-400'>(5%)</span>
                </span>
                <span>
                  <span className='text-rwa'>
                    ${(+service.price * 0.05).toFixed(2)}
                  </span>
                </span>
              </div>
              <div className='flex justify-between text-sm'>
                <span>Tax</span>
                <span className='text-rwa'>
                  ${(+service.price * 0.1).toFixed(2)}
                </span>
              </div>
              <hr className='my-2 text-gray-200' />
              <div className='flex justify-between font-bold'>
                <span>Total (USD)</span>
                <span className='text-rwa'>
                  ${(service.price * 1.15).toFixed(2)}
                </span>
              </div>
            </div>

            <button className='w-full rounded-full bg-rwa py-3 text-white transition-colors hover:bg-rwa/90'>
              Pay Now
            </button>
            <div className='flex items-center justify-center gap-3 text-2xl text-gray-500'>
              <FaCcVisa />
              <FaCcMastercard />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SingleService
