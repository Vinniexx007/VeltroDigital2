import Section from '@/components/layout/Section'
import FAQItem from '@/components/ui/FAQItem'
import type { FAQItemData } from '@/types'

/**
 * FAQSection — Services page "Common Questions" band.
 *
 * Server Component. Renders a heading and a vertical stack of eight
 * {@link FAQItem} accordions (each is a self-contained client component).
 * Questions and answers are taken from `veltro-digital-services-copy-v6.md`
 * (FAQ Section).
 */
const FAQS: FAQItemData[] = [
  {
    question: 'How long does it take?',
    answer:
      'Most sites are live within 2 weeks of receiving your photos and a brief description of your business.',
  },
  {
    question: 'Do I need to sort my own domain?',
    answer:
      'No — we handle domain registration and hosting completely, managed by us for £25/month. Your domain is always registered in your name so you own it outright.',
  },
  {
    question: 'Do I need to write all the content myself?',
    answer:
      'No. Send us your photos and a few bullet points about your business — we turn that into professional copy for you.',
  },
  {
    question: 'Will my website show up on Google?',
    answer:
      'We include local SEO basics with every site. Adding our Google Business Profile service (£99) significantly boosts your local visibility — it’s the fastest win available to most small businesses.',
  },
  {
    question: 'What happens after the free aftercare period?',
    answer:
      'You can sign up to our Care Plan at £29/month or request one-off updates at £40/hour.',
  },
  {
    question: 'Do I own my website?',
    answer:
      'Yes — 100%. Once built and paid for, it’s yours outright. Your domain is registered in your name from day one.',
  },
  {
    question: 'What kinds of businesses do you work with?',
    answer:
      'Restaurants, cafés, takeaways, print shops, retailers, local service providers — any small business across the North West that needs a better online presence.',
  },
  {
    question: 'I’m not technical — is that a problem?',
    answer:
      'Not at all. We handle every technical aspect from start to finish.',
  },
]

export default function FAQSection() {
  return (
    <Section background="white">
      <h2 className="text-h2 font-bold text-navy">Common Questions</h2>
      <div className="mt-8 max-w-3xl mx-auto space-y-4">
        {FAQS.map((faq) => (
          <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </Section>
  )
}
