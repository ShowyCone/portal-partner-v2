'use client';
import SingleService from '@/components/service/SingleService';

interface Props {
  params: { id: string };
}

export default function ServicePage({ params }: Props) {
  return <SingleService id={params.id} />;
} 