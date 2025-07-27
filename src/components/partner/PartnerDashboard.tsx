import React from 'react'
import Link from 'next/link'
import { FaHome } from 'react-icons/fa'
import { useRouter, useParams } from 'next/navigation'
import partnersData from '../../data/partners'
import PartnerProfile from './PartnerProfile'
import servicesData from '../../data/services'
import ServiceSlider from '../../components/ServiceSlider'
import ReviewsSection from '../../components/ReviewsSection'

interface PartnerProfileProps {
  logo: string
  name: string
  description: string
  tags?: string[]
  media: Array<{
    type: 'image' | 'video'
    src: string
  }>
  stats: {
    closedClients: number
    rating: number
    ratingCount: number
    services: number
  }
  introduction?: string
}

interface PartnerDashboardProps {
  partnerId?: string
}

const PartnerDashboard = ({
  partnerId: propPartnerId,
}: PartnerDashboardProps = {}) => {
  const router = useRouter()
  const params = useParams()

  const partnerId = propPartnerId || (params.id as string)

  const partner = partnersData.find((p) => p.id === partnerId)

  const partnerServices = servicesData.filter((s) => s.partnerId === partnerId)

  if (!partner) {
    return (
      <section className='container mx-auto px-4 py-8 sm:py-12'>
        <p className='text-center text-gray-600 text-sm sm:text-base'>
          Partner not found: {partnerId}
        </p>
        <div className='mt-4 text-center text-sm text-gray-500'>
          <Link
            href={'/partners'}
            className='bg-rwa px-4 sm:px-5 py-2 sm:py-1 rounded-2xl text-white text-base sm:text-xl inline-block'
          >
            Go to all partners
          </Link>
        </div>
      </section>
    )
  }

  const partnerProfileData: PartnerProfileProps = {
    logo: partner.logo,
    name: partner.name,
    description: partner.description,
    tags: [],
    media: partner.media,
    stats: {
      closedClients: partner.stats.closedClients,
      rating: partner.stats.rating,
      ratingCount: partner.stats.ratingCount,
      services: partner.stats.services,
    },
    introduction: partner.introduction,
  }

  const uniqueTags = [...new Set(partnerServices.map((s) => s.tag))].slice(0, 3)

  return (
    <section className='container mx-auto px-4 py-6 sm:py-8 md:py-12'>
      <div className='flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500'>
        <FaHome className='text-xs sm:text-sm' />
        <span>/</span>
        <span>partners</span>
        <span>/</span>
        <span className='text-rwa truncate'>{partner.name}</span>
      </div>

      <PartnerProfile partner={partnerProfileData} />

      {uniqueTags.map((tag) => (
        <ServiceSlider
          key={tag}
          partnerName={partner.name}
          tag={tag}
          services={partnerServices.filter((s) => s.tag === tag)}
        />
      ))}

      <ReviewsSection partnerId={partnerId} />
    </section>
  )
}

export default PartnerDashboard
