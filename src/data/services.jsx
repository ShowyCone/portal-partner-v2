const servicesData = [
  {
    id: 'b3e1ef5a-947f-408b-8d46-962f8c3d3c31',
    partnerId: '1e693596-ebca-4c73-9e36-d2026e0e5c5d',
    title: 'Smart Contract Development',
    rating: 4.9,
    reviews: 112,
    price: 1250,
    tag: 'Solidity',
    description:
      'Creation and auditing of smart contracts on the Ethereum network to ensure security and efficiency.',
    siteUrl: '#',
    image: '/container.webp',
    includes: [
      'Custom Solidity development',
      'Comprehensive unit testing',
      'Deployment scripts & documentation',
    ],
    favorite: false,
  },
  {
    id: '3e6a7d9c-2fb2-45ee-9cfa-3dfec66f5341',
    partnerId: 'de2b32d4-c003-4327-9f14-5eb5adb56c1f',
    title: 'Web3 Security Audit',
    rating: 5.0,
    reviews: 87,
    price: 850,
    tag: 'Security',
    description:
      'Comprehensive vulnerability analysis of dApps and protocols to prevent attacks and protect digital assets.',
    siteUrl: '#',
    image: '/rectangle.webp',
    includes: [
      'Static code analysis',
      'Manual penetration testing',
      'Detailed audit report',
    ],
    favorite: true,
  },
  {
    id: '1dc3fdd4-e93e-4f6a-9ed4-67c2d78a7b27',
    partnerId: 'a9c78187-e359-4b2a-9a77-4f9a45e23c07',
    title: 'dApp Interface Design',
    rating: 4.8,
    reviews: 64,
    price: 980,
    tag: 'UI/UX',
    description:
      'Design of intuitive and attractive user interfaces for decentralized applications, optimized for adoption.',
    siteUrl: '#',
    image: '/rectangle_9.webp',
    includes: [
      'High-fidelity Figma mockups',
      'Responsive design assets',
      'Interactive prototypes',
    ],
    favorite: false,
  },
  {
    id: '8c46e2c5-6f7b-4b23-96df-574c88b54277',
    partnerId: '1e693596-ebca-4c73-9e36-d2026e0e5c5d',
    title: 'Oracle Integration',
    rating: 4.7,
    reviews: 51,
    price: 600,
    tag: 'Chainlink',
    description:
      'Connecting smart contracts with real-world data through decentralized oracles like Chainlink.',
    siteUrl: '#',
    image: '/container.webp',
    includes: [
      'End-to-end integration',
      'Testnet deployment',
      'Monitoring dashboard setup',
    ],
    favorite: false,
  },
  {
    id: '2bfd177f-271e-4fa0-86a8-7e3b58dce614',
    partnerId: '2dda0ec5-6806-4bf4-ab80-f673aaa1c1a5',
    title: 'ERC-20 Token Creation',
    rating: 4.9,
    reviews: 143,
    price: 720,
    tag: 'Tokens',
    description:
      'Development and deployment of custom ERC-20 standard fungible tokens for projects and ecosystems.',
    siteUrl: '#',
    image: '/rectangle_9.webp',
    includes: [
      'Token smart contract',
      'Mint & burn functions',
      'Deployment & verification',
    ],
    favorite: true,
  },
  {
    id: '993ad1cd-d8b4-4dfd-8a9a-1dcead967e74',
    partnerId: 'de2b32d4-c003-4327-9f14-5eb5adb56c1f',
    title: 'Blockchain Consulting',
    rating: 5.0,
    reviews: 99,
    price: 1500,
    tag: 'Strategy',
    description:
      'Strategic advisory for companies looking to implement blockchain and Web3 solutions in their business models.',
    siteUrl: '#',
    image: '/rectangle.webp',
    includes: [
      'Use-case analysis',
      'Road-map creation',
      'Cost-benefit assessment',
    ],
    favorite: false,
  },
  {
    id: 'e027105c-19aa-4cc0-b4d2-e406963c7a22',
    partnerId: 'a9c78187-e359-4b2a-9a77-4f9a45e23c07',
    title: 'NFT Marketplace Development',
    rating: 4.8,
    reviews: 73,
    price: 2500,
    tag: 'NFT',
    description:
      'Building marketplace platforms for buying, selling and exchanging Non-Fungible Tokens (NFTs).',
    siteUrl: '#',
    image: '/container.webp',
    includes: [
      'Custom smart contracts',
      'Responsive front-end',
      'Wallet integration (Metamask, WalletConnect)',
    ],
    favorite: false,
  },
  {
    id: 'd1b4752a-8f57-4f38-8568-f4b5c6783372',
    partnerId: '2dda0ec5-6806-4bf4-ab80-f673aaa1c1a5',
    title: 'DeFi Treasury Management',
    rating: 4.9,
    reviews: 58,
    price: 1800,
    tag: 'DeFi',
    description:
      'Strategies and tools for optimized management of digital assets in decentralized finance protocols.',
    siteUrl: '#',
    image: '/rectangle.webp',
    includes: [
      'Yield strategy design',
      'Risk assessment report',
      'Monthly performance dashboard',
    ],
    favorite: false,
  },
]

// Remove static siteName to avoid duplication; partner name will be looked up dynamically
servicesData.forEach((svc) => {
  if ('siteName' in svc) delete svc.siteName
})

export default servicesData
