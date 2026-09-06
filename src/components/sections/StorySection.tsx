import Section from '@/components/layout/Section'

/**
 * StorySection — About page main story band.
 *
 * Server Component (no interactivity). Copy is taken verbatim from
 * `veltro-digital-about-copy-v4.md` (the "Main Story Section" and "Who We Are"
 * passages).
 */
export default function StorySection() {
  return (
    <Section background="white">
      <h2 className="text-h2 font-bold text-navy">
        We&apos;re Tech People Who Love Seeing Small Businesses Thrive Online
      </h2>

      <p className="text-body text-navy/80 mt-4 max-w-prose">
        Here&apos;s something that&apos;s always frustrated us.
      </p>
      <p className="text-body text-navy/80 mt-4 max-w-prose">
        You&apos;ll find brilliant small businesses all across the North West —
        restaurants with incredible food, print shops doing outstanding work,
        retailers with something genuinely special to offer. And yet when you
        search for them online, either nothing comes up, or what does come up
        looks nothing like the quality of the business behind it.
      </p>
      <p className="text-body text-navy/80 mt-4 max-w-prose">
        Meanwhile a bigger, blander competitor with a decent website is picking
        up customers that should rightfully be theirs.
      </p>
      <p className="text-body text-navy/80 mt-4 max-w-prose">
        That&apos;s the gap Veltro Digital was built to close.
      </p>

      <h3 className="text-h3 font-bold text-navy mt-12">Who We Are</h3>
      <p className="text-body text-navy/80 mt-4 max-w-prose">
        Veltro Digital is a North West based web design and digital consultancy
        built with one focus — helping small businesses get the online presence
        they deserve, at a price that actually makes sense.
      </p>
      <p className="text-body text-navy/80 mt-4 max-w-prose">
        We&apos;re tech and design people at heart. We got into this because we
        genuinely love building things on the web — clean, fast, well-crafted
        websites that do exactly what they&apos;re supposed to do. Over time we
        realised that passion was most valuable not in serving big companies
        with big budgets, but in helping local businesses that had been ignored
        or overcharged by agencies that didn&apos;t really understand them.
      </p>
      <p className="text-body text-navy/80 mt-4 max-w-prose">
        So that&apos;s what we do now — and we&apos;re proud of it.
      </p>
    </Section>
  )
}
