'use client'
import { use } from 'react'
import SingleService from '@/components/service/SingleService'

interface Props {
  params: Promise<{ id: string }>
}

export default function ServicePage({ params }: Props) {
  const { id } = use(params)
  return <SingleService id={id} />
}
