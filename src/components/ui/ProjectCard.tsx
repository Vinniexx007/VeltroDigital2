import Image from 'next/image'
import type { ProjectCardData } from '@/types'

export type ProjectCardProps = ProjectCardData

export default function ProjectCard({
  clientName,
  businessType,
  description,
  imageUrl,
  imageAlt,
  placeholder = false,
}: ProjectCardProps) {
  if (placeholder) {
    return (
      <div className="bg-grey rounded-card border-2 border-dashed border-grey-dark p-6 flex flex-col items-center justify-center text-center min-h-[280px]">
        <span className="text-navy/60 font-semibold uppercase tracking-wide text-sm">
          Coming soon
        </span>
        <span className="mt-3 inline-block rounded-btn bg-navy/10 px-3 py-1 text-sm font-medium text-navy">
          {businessType}
        </span>
        <p className="mt-4 text-body text-navy/70">{description}</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-card shadow-card overflow-hidden">
      <Image
        src={imageUrl}
        alt={imageAlt}
        width={600}
        height={400}
        className="w-full h-auto object-cover"
      />
      <div className="p-6">
        <h3 className="text-navy font-bold text-h4">{clientName}</h3>
        <span className="mt-2 inline-block rounded-btn bg-blue/10 px-3 py-1 text-sm font-medium text-blue">
          {businessType}
        </span>
        <p className="mt-4 text-body text-navy/80">{description}</p>
      </div>
    </div>
  )
}
