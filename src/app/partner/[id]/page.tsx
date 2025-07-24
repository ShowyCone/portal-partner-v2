'use client'
import { use } from 'react'
import PartnerDashboard from '@/components/partner/PartnerDashboard'

interface Props {
  params: Promise<{ id: string }>
}

export default function PartnerPage({ params }: Props) {
  const { id } = use(params)
  return <PartnerDashboard partnerId={id} />
}
