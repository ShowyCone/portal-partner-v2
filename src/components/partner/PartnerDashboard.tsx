import React from 'react'
import { FaHome } from 'react-icons/fa'
import { useRouter } from 'next/router'
import partnersData from '../../data/partners'
import PartnerProfile from './PartnerProfile'
import servicesData from '../../data/services'
import ServiceSlider from '../../components/ServiceSlider'
import ReviewsSection from '../../components/ReviewsSection'

interface Partner {
  id: string
  name: string
  // Add other partner properties here
}

interface Service {
  id: string
  partnerId: string
  tag: string
  // Add other service properties here
}

const PartnerDashboard = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const partner = partnersData.find((p: Partner) => p.id === id)
  
  // Filter partner services and obtain up to three unique tags
  const partnerServices = servicesData.filter((s: Service) => s.partnerId === id)
  const uniqueTags = [...new Set(partnerServices.map((s: Service) => s.tag))].slice(0, 3)

  if (!partner) {
    return (
      <section className='container mx-auto px-4 py-12'>
        <p className='text-center text-gray-600'>Socio no encontrado.</p>
      </section>
    )
  }

  return (
    <section className='container mx-auto px-4 py-12'>
      <div className='flex items-center gap-2 text-sm text-gray-500'>
        <FaHome />
        <span>/</span>
        <span>partners</span>
        <span>/</span>
        <span className='text-rwa'>{partner.name}</span>
      </div>
      <PartnerProfile partner={partner} />
      {/* Service sliders by tag */}
      {uniqueTags.map((tag) => {
        const tagServices = partnerServices.filter((s: Service) => s.tag === tag)
        return (
          <ServiceSlider
            key={tag}
            partnerName={partner.name}
            tag={tag}
            services={tagServices}
          />
        )
      })}

      <ReviewsSection />
    </section>
  )
}

export default PartnerDashboard