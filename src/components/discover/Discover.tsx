'use client'
import Hero from './components/Hero'
import AllServices from './components/AllServices'
import SuggestedServicesSection from './components/SuggestedServicesSection'
import CTABanner from './components/CTABanner'

const Discover: React.FC = () => {
  return (
    <main className='flex flex-col'>
      <Hero />
      <AllServices />
      <SuggestedServicesSection />
      <CTABanner />
    </main>
  )
}

export default Discover
