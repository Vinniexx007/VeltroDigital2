'use client'

import { useId, useState } from 'react'
import type { FAQItemData } from '@/types'

export interface FAQItemProps extends FAQItemData {
  id?: string
}

export default function FAQItem({ question, answer, id }: FAQItemProps) {
  const [open, setOpen] = useState(false)
  const generatedId = useId()
  const baseId = id ?? generatedId
  const panelId = `${baseId}-panel`
  const triggerId = `${baseId}-trigger`

  return (
    <div className="bg-white rounded-card shadow-card border border-grey-dark">
      <button
        type="button"
        id={triggerId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 p-6 text-left focus-visible:ring-2 focus-visible:ring-amber focus-visible:outline-none rounded-card"
      >
        <span className="text-navy font-semibold text-body-lg">{question}</span>
        <svg
          className={`h-5 w-5 shrink-0 text-navy transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            d="M5 7.5 10 12.5 15 7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        role="region"
        id={panelId}
        aria-labelledby={triggerId}
        hidden={!open}
        className="px-6 pb-6 text-navy/80 text-body"
      >
        {answer}
      </div>
    </div>
  )
}
