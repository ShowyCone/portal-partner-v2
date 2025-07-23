interface Review {
  id: string;
  userId: string;
  reviewer: string;
  serviceId: string;
  serviceName: string;
  rating: number;
  text: string;
}

const reviewsData: Review[] = [
  {
    id: 'e8f4c39b-2b8e-4f53-8f61-8dbf5c6e4671',
    userId: 'u101',
    reviewer: 'Sophia Li',
    serviceId: 'b3e1ef5a-947f-408b-8d46-962f8c3d3c31',
    serviceName: 'Smart Contract Development',
    rating: 4.9,
    text: 'CryptoDevs delivered our smart contracts with impeccable quality and exhaustive tests.',
  },
  {
    id: 'd1d2a3f7-9c4b-4d76-b3b2-4a83a5f7a4c0',
    userId: 'u102',
    reviewer: 'Michael Chen',
    serviceId: '3e6a7d9c-2fb2-45ee-9cfa-3dfec66f5341',
    serviceName: 'Web3 Security Audit',
    rating: 5.0,
    text: 'SecureChain uncovered critical issues we had missed and provided clear remediation steps.',
  },
  {
    id: '87bf6d0e-0347-46de-b9ee-f781b3c5e4a1',
    userId: 'u103',
    reviewer: 'Emma García',
    serviceId: '1dc3fdd4-e93e-4f6a-9ed4-67c2d78a7b27',
    serviceName: 'dApp Interface Design',
    rating: 4.8,
    text: 'PixelPerfect created a beautiful, responsive interface that our users love.',
  },
  {
    id: '9af3d822-5c7a-46d7-b26b-419fd4c7c520',
    userId: 'u104',
    reviewer: 'Daniel Johnson',
    serviceId: '8c46e2c5-6f7b-4b23-96df-574c88b54277',
    serviceName: 'Oracle Integration',
    rating: 4.7,
    text: 'Integration was smooth and documentation thorough; our contract now pulls external data flawlessly.',
  },
  {
    id: 'b3c9db29-4a12-4408-9fb5-3e2cb9d4e7c7',
    userId: 'u105',
    reviewer: 'Sara Ahmed',
    serviceId: '2bfd177f-271e-4fa0-86a8-7e3b58dce614',
    serviceName: 'ERC-20 Token Creation',
    rating: 4.9,
    text: 'TokenFactory guided us through compliance and delivered a gas-efficient token contract.',
  },
  {
    id: 'cdf5701d-5a8a-437d-9f31-8e2f27074e76',
    userId: 'u106',
    reviewer: 'Luis Martínez',
    serviceId: '993ad1cd-d8b4-4dfd-8a9a-1dcead967e74',
    serviceName: 'Blockchain Consulting',
    rating: 5.0,
    text: 'Their strategic insights saved us months of R&D and optimized our blockchain roadmap.',
  },
  {
    id: 'e3b17f9b-b1a9-41f7-9f90-0e4be7c63e59',
    userId: 'u107',
    reviewer: 'Isabella Rossi',
    serviceId: 'e027105c-19aa-4cc0-b4d2-e406963c7a22',
    serviceName: 'NFT Marketplace Development',
    rating: 4.8,
    text: 'Marketplace launched on time with seamless wallet integration and a sleek UI.',
  },
  {
    id: 'fc7e8c34-0a8e-44d1-8897-2ac1e9f4b0ff',
    userId: 'u108',
    reviewer: 'Tom Williams',
    serviceId: 'd1b4752a-8f57-4f38-8568-f4b5c6783372',
    serviceName: 'DeFi Treasury Management',
    rating: 4.9,
    text: 'Their yield strategies increased our APY by 20% while minimizing risk.',
  },
];

export default reviewsData;