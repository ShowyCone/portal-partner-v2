import servicesData from './services'

// Helper: compute dynamic statistics based on related services
const generateStats = (partnerId) => {
  const related = servicesData.filter((s) => s.partnerId === partnerId)
  const totalServices = related.length

  if (!totalServices) {
    return {
      totalServices: 0,
      averagePrice: 0,
      topCategory: null,
      averageRating: 0,
    }
  }

  const averagePrice = Number(
    (
      related.reduce((sum, s) => sum + (s.price || 0), 0) / totalServices
    ).toFixed(2)
  )

  const ratingCount = related.reduce((sum, s) => sum + (s.reviews || 0), 0)
  const averageRating = Number(
    (
      related.reduce((sum, s) => sum + (s.rating || 0), 0) / totalServices
    ).toFixed(2)
  )

  // Category frequency to find the most common
  const categoryCounts = related.reduce((acc, s) => {
    if (s.tag) acc[s.tag] = (acc[s.tag] || 0) + 1
    return acc
  }, {})
  const topCategory = Object.keys(categoryCounts).reduce((a, b) =>
    categoryCounts[a] > categoryCounts[b] ? a : b
  )

  const closedClients = ratingCount // assume each review ~ closed deal

  return {
    services: totalServices,
    averagePrice,
    topCategory,
    rating: averageRating,
    ratingCount,
    closedClients,
  }
}

// Base partner objects
const partners = [
  {
    id: '1e693596-ebca-4c73-9e36-d2026e0e5c5d',
    name: 'CryptoDevs',
    description: 'We build secure and scalable smart-contract solutions.',
    introduction:
      'CryptoDevs is a leading blockchain development firm specializing in smart-contract engineering and infrastructure. For more than eight years we have helped startups and enterprises launch secure, scalable dApps on EVM networks, optimizing gas fees and reinforcing auditability. Our team of full-stack engineers, cryptographers and security specialists blends agile development with exhaustive audits to guarantee maximum reliability for every project.',
    logo: '/rwamainlogo.svg',
    media: [{ type: 'image', src: '/container.webp' }],
    website: 'https://cryptodevs.io',
  },
  {
    id: 'de2b32d4-c003-4327-9f14-5eb5adb56c1f',
    name: 'SecureChain',
    description: 'Audits and threat-modeling for bullet-proof protocols.',
    introduction:
      'SecureChain focuses on vulnerability analysis and security architecture for Web3 protocols. Our analysts perform automated and manual audits, penetration tests and threat modeling to ensure that digital assets remain protected against sophisticated exploits. We collaborate with DeFi platforms and exchanges worldwide, delivering detailed reports and actionable recommendations that harden attack surfaces without compromising user experience.',
    logo: '/rwamainlogo.svg',
    media: [{ type: 'image', src: '/rectangle.webp' }],
    website: 'https://securechain.io',
  },
  {
    id: 'a9c78187-e359-4b2a-9a77-4f9a45e23c07',
    name: 'PixelPerfect',
    description: 'Designing interfaces that boost dApp adoption.',
    introduction:
      'PixelPerfect merges aesthetics and usability to craft user interfaces that drive adoption of decentralized applications. From wireframes to interactive prototypes, our user-centric process delivers intuitive flows and full accessibility without sacrificing brand identity. We have collaborated with more than 120 Web3 projects, designing marketplaces, dashboards and wallets for both mobile and desktop.',
    logo: '/rwamainlogo.svg',
    media: [{ type: 'image', src: '/rectangle_9.webp' }],
    website: 'https://pixelperfect.io',
  },
  {
    id: '2dda0ec5-6806-4bf4-ab80-f673aaa1c1a5',
    name: 'TokenFactory',
    description: 'Bringing real-world assets on-chain with compliant tokens.',
    introduction:
      'TokenFactory helps traditional enterprises tokenize real-world assets and issue custom ERC-20 tokens with full regulatory compliance. Our legal-tech team develops audited smart contracts and manages the entire token lifecycle, from tokenomics definition to listing on DEXs and CEXs. With over 50 successful launches, we provide liquidity, transparency and decentralized governance from day one.',
    logo: '/rwamainlogo.svg',
    media: [{ type: 'image', src: '/rectangle.webp' }],
    website: 'https://tokenfactory.io',
  },
]

// Enrich each partner with dynamic stats
const partnersData = partners.map((partner) => ({
  ...partner,
  stats: generateStats(partner.id),
}))

export default partnersData
