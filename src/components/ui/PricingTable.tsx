import { PRICING_SUMMARY } from '@/lib/content/services'
import type { PricingSummaryRow } from '@/types'

export interface PricingTableProps {
  rows?: PricingSummaryRow[]
  highlightBundle?: boolean
}

/**
 * PricingTable — pricing summary table (Service / Price / Payment).
 *
 * Server Component. Wrapped in an `overflow-x-auto` container so the table
 * scrolls horizontally on narrow viewports rather than forcing the whole page
 * to scroll. When `highlightBundle` is true, the row whose service name
 * includes "Bundle" is visually emphasised.
 *
 * Colours: navy text on white surfaces for readability, with a navy header row.
 */
export default function PricingTable({
  rows = PRICING_SUMMARY,
  highlightBundle = false,
}: PricingTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-navy text-white">
            <th scope="col" className="px-4 py-3 font-semibold">
              Service
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Price
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Payment
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const isBundle = highlightBundle && row.service.includes('Bundle')
            const rowClasses = [
              'border-b border-grey-dark text-navy',
              isBundle ? 'bg-amber/10 font-semibold' : '',
            ]
              .filter(Boolean)
              .join(' ')

            return (
              <tr key={row.service} className={rowClasses}>
                <td className="px-4 py-3">{row.service}</td>
                <td className="px-4 py-3">{row.price}</td>
                <td className="px-4 py-3">{row.payment}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
